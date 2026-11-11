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
  Receipt,
  FileSpreadsheet,
  ArrowUpRight,
  Send,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "cross-border-tax-architecture", label: "1. Cross-Border Tax Architecture: German ErbStG & Indian Assets" },
  { id: "interactive-tax-calculator", label: "2. Free German Erbschaftsteuer & Freibetrag Calculator Tool" },
  { id: "tax-classes-freibetrag-allowances", label: "3. German ErbStG Tax Classes & Freibetrag Allowances Explained" },
  { id: "dtaa-treaty-gap-analysis", label: "4. The India-Germany DTAA Gap: Why Article 13 Excludes Inheritance" },
  { id: "indian-domestic-tax-framework", label: "5. Indian Domestic Tax Status: Section 56(2)(x) & Capital Gains" },
  { id: "fema-repatriation-sop", label: "6. Step-by-Step SOP: Repatriating Inherited Funds Under FEMA" },
  { id: "property-valuation-protocol", label: "7. Valuation Protocol: Proving Fair Market Value to Finanzamt" },
  { id: "practical-case-studies", label: "8. Practical Case Studies: Frankfurt, Munich & Berlin Tech NRIs" },
  { id: "legal-compliance-checklist", label: "9. Legal & Tax Compliance Checklist for German NRI Heirs" },
  { id: "institutional-profile", label: "10. Institutional Profile: Cross-Border Succession Services" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions: Germany NRI Inheritance Tax" },
  { id: "statutory-citations", label: "12. Statutory Citations & Judicial Portals" },
];

const FAQS = [
  {
    q: "Does German inheritance tax apply to Indian property inherited by an NRI in Germany?",
    a: "Yes. Under Section 2 of the German Inheritance Tax Act (ErbStG), Germany taxes worldwide assets. If you live in Germany on a work visa, Blue Card, or permanent stay, you have unlimited tax liability. This rule covers your flat in Pune, your house in Bengaluru, or land in India.",
  },
  {
    q: "What is the statutory Freibetrag tax-free allowance for children inheriting Indian assets?",
    a: "Under Section 16 of the German ErbStG, children belong to Tax Class 1. Each child gets a personal tax-free allowance of 400,000 Euros per parent. If your share of the Indian property is under 400,000 Euros (about 3.68 Crore rupees), you owe zero German inheritance tax.",
  },
  {
    q: "Does the India-Germany DTAA protect against German inheritance tax?",
    a: "No. The double tax treaty between India and Germany covers income tax and wealth tax only. It does not cover inheritance tax. India has no inheritance tax. Because you pay no tax in India, you get zero tax credit in Germany under Section 21.",
  },
  {
    q: "Is inheritance of real estate taxed in India under the Income-tax Act?",
    a: "No. Under Section 56 of the Indian Income-tax Act, inheritance is 100% tax-free. You pay zero tax when you receive the property. If you sell the property later, Indian capital gains tax applies under Section 45.",
  },
  {
    q: "What are the German inheritance tax brackets under Steuerklasse I, II, and III?",
    a: "Under Section 19 ErbStG, progressive tax rates apply above your allowance. For Class 1 (children and spouses), rates range from 7% to 30%. For Class 2 (brothers, sisters, and nephews), rates start at 15%. For Class 3 (unrelated persons), rates reach 50%.",
  },
  {
    q: "What is the 3-month notification requirement (Anzeigepflicht) to the German Finanzamt?",
    a: "Under Section 30 ErbStG, you must notify your local tax office within 3 months of learning about the inheritance. Indian registries do not notify German tax offices. Failure to report can lead to tax penalties and audits.",
  },
  {
    q: "How can an NRI legally repatriate sale proceeds of an inherited Indian property to Germany?",
    a: "Under RBI FEMA rules, an NRI can send up to 1 Million US Dollars per year from their NRO account. You must mutate property title in India, sell the flat, deposit funds in an NRO account, obtain Form 15CB from a CA, file Form 15CA online, and complete wire transfer.",
  },
  {
    q: "How does the German Finanzamt value inherited real estate located in India?",
    a: "German tax rules require fair market value on the date of death under the Valuation Act. The Finanzamt rejects Indian circle rates because market rates are higher. You need a valuation report from a registered Indian valuer, translated into German, and converted at ECB rates.",
  },
];

export default function GermanyNriTaxCalculatorClient() {
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

  const [activeId, setActiveId] = useState<string>("cross-border-tax-architecture");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Conversion rate: 1 EUR = 92 INR
  const EUR_TO_INR = 92;

  // Diagnostic Calculator State
  const [propertyValueInr, setPropertyValueInr] = useState<number>(30000000); // Default 3 Crore INR (~€326,087)
  const [kinshipRelation, setKinshipRelation] = useState<
    | "child"
    | "spouse"
    | "grandchild_parent_alive"
    | "grandchild_parent_deceased"
    | "parent"
    | "sibling"
    | "niece_nephew"
    | "unrelated"
  >("child");
  const [assetType, setAssetType] = useState<
    "residential_flat" | "commercial_property" | "agricultural_land" | "bank_deposits" | "mixed_portfolio"
  >("residential_flat");
  const [taxResidencyStatus, setTaxResidencyStatus] = useState<
    "nri_german_resident" | "deceased_german_resident" | "neither_german_resident"
  >("nri_german_resident");
  const [intendedAction, setIntendedAction] = useState<"retain_rent" | "sell_repatriate" | "family_settlement">(
    "sell_repatriate"
  );
  const [priorGiftsLast10Years, setPriorGiftsLast10Years] = useState<number>(0);

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

  // Convert current property value to EUR
  const propertyValueEur = Math.round(propertyValueInr / EUR_TO_INR);

  // Determine Steuerklasse and statutory Freibetrag (§ 16 ErbStG)
  let steuerklasseLabel = "Steuerklasse I";
  let steuerklasseNumber = 1;
  let statutoryFreibetrag = 400000;
  let relationshipText = "Child / Adopted Child (ErbStG § 16 Abs. 1 Nr. 2)";

  if (kinshipRelation === "spouse") {
    steuerklasseLabel = "Steuerklasse I";
    steuerklasseNumber = 1;
    statutoryFreibetrag = 500000;
    relationshipText = "Surviving Spouse / Registered Partner (ErbStG § 16 Abs. 1 Nr. 1)";
  } else if (kinshipRelation === "child") {
    steuerklasseLabel = "Steuerklasse I";
    steuerklasseNumber = 1;
    statutoryFreibetrag = 400000;
    relationshipText = "Child / Stepchild (ErbStG § 16 Abs. 1 Nr. 2)";
  } else if (kinshipRelation === "grandchild_parent_deceased") {
    steuerklasseLabel = "Steuerklasse I";
    steuerklasseNumber = 1;
    statutoryFreibetrag = 400000;
    relationshipText = "Grandchild with Deceased Parent (ErbStG § 16 Abs. 1 Nr. 2)";
  } else if (kinshipRelation === "grandchild_parent_alive") {
    steuerklasseLabel = "Steuerklasse I";
    steuerklasseNumber = 1;
    statutoryFreibetrag = 200000;
    relationshipText = "Grandchild with Living Parent (ErbStG § 16 Abs. 1 Nr. 3)";
  } else if (kinshipRelation === "parent") {
    steuerklasseLabel = "Steuerklasse I";
    steuerklasseNumber = 1;
    statutoryFreibetrag = 100000;
    relationshipText = "Parent / Grandparent upon inheritance (ErbStG § 16 Abs. 1 Nr. 4)";
  } else if (kinshipRelation === "sibling") {
    steuerklasseLabel = "Steuerklasse II";
    steuerklasseNumber = 2;
    statutoryFreibetrag = 20000;
    relationshipText = "Sibling / Brother / Sister (ErbStG § 16 Abs. 1 Nr. 5)";
  } else if (kinshipRelation === "niece_nephew") {
    steuerklasseLabel = "Steuerklasse II";
    steuerklasseNumber = 2;
    statutoryFreibetrag = 20000;
    relationshipText = "Niece / Nephew / In-Law (ErbStG § 16 Abs. 1 Nr. 5)";
  } else {
    steuerklasseLabel = "Steuerklasse III";
    steuerklasseNumber = 3;
    statutoryFreibetrag = 20000;
    relationshipText = "Unrelated Person / Cohabitant / Friend (ErbStG § 16 Abs. 1 Nr. 7)";
  }

  // Statutory lump-sum deduction for estate administration (§ 10 Abs. 5 Nr. 3 ErbStG)
  const erbfallkostenpauschale = 10300;

  // Remaining Freibetrag after subtracting prior gifts in last 10 years (§ 14 ErbStG)
  const effectiveFreibetrag = Math.max(0, statutoryFreibetrag - priorGiftsLast10Years);

  // Net taxable estate in EUR
  const taxableAcquisition =
    taxResidencyStatus === "neither_german_resident"
      ? 0
      : Math.max(0, propertyValueEur - effectiveFreibetrag - erbfallkostenpauschale);

  // Compute progressive tax rate under § 19 ErbStG
  let marginalRate = 0;
  if (taxableAcquisition > 0) {
    if (steuerklasseNumber === 1) {
      if (taxableAcquisition <= 75000) marginalRate = 7;
      else if (taxableAcquisition <= 300000) marginalRate = 11;
      else if (taxableAcquisition <= 600000) marginalRate = 15;
      else if (taxableAcquisition <= 6000000) marginalRate = 19;
      else if (taxableAcquisition <= 13000000) marginalRate = 23;
      else if (taxableAcquisition <= 26000000) marginalRate = 27;
      else marginalRate = 30;
    } else if (steuerklasseNumber === 2) {
      if (taxableAcquisition <= 75000) marginalRate = 15;
      else if (taxableAcquisition <= 300000) marginalRate = 20;
      else if (taxableAcquisition <= 600000) marginalRate = 25;
      else if (taxableAcquisition <= 6000000) marginalRate = 30;
      else if (taxableAcquisition <= 13000000) marginalRate = 35;
      else if (taxableAcquisition <= 26000000) marginalRate = 40;
      else marginalRate = 43;
    } else {
      if (taxableAcquisition <= 6000000) marginalRate = 30;
      else marginalRate = 50;
    }
  }

  // Estimated German inheritance tax
  const estimatedTaxEur = Math.round((taxableAcquisition * marginalRate) / 100);
  const estimatedTaxInr = Math.round(estimatedTaxEur * EUR_TO_INR);
  const effectiveTaxPercent =
    propertyValueEur > 0 ? ((estimatedTaxEur / propertyValueEur) * 100).toFixed(1) : "0.0";

  const handlePresetSelect = (inrVal: number) => {
    setPropertyValueInr(inrVal);
  };

  const copySummaryToClipboard = () => {
    const summaryText = `GERMANY NRI ERBSCHAFTSTEUER (INHERITANCE TAX) ASSESSMENT
Property Value: ₹${(propertyValueInr / 10000000).toFixed(2)} Crore (€${propertyValueEur.toLocaleString()})
Asset Type: ${assetType.replace(/_/g, " ").toUpperCase()}
Beneficiary Kinship: ${relationshipText}
Applicable Tax Class: ${steuerklasseLabel}
Statutory Freibetrag (§ 16 ErbStG): €${statutoryFreibetrag.toLocaleString()}
Estate Administration Deduction (§ 10(5) ErbStG): €${erbfallkostenpauschale.toLocaleString()}
Net Taxable German Acquisition: €${taxableAcquisition.toLocaleString()}
Marginal ErbStG Tax Rate (§ 19 ErbStG): ${marginalRate}%
Estimated German Inheritance Tax: €${estimatedTaxEur.toLocaleString()} (~₹${(estimatedTaxInr / 100000).toFixed(2)} Lakh)
Effective Tax Rate: ${effectiveTaxPercent}%
Indian Tax at Inheritance: 0% EXEMPT under Section 56(2)(x) proviso (e)
India-Germany DTAA Status: EXCLUDED from Treaty. Zero Foreign Tax Credit under § 21 ErbStG.
Mandatory Filing: 3-Month Notification (§ 30 ErbStG) to German Finanzamt.
Repatriation Protocol: RBI FEMA Remittance of Assets (USD 1,000,000 / year via Form 15CA & 15CB).
Prepared via WillDrafting.in Cross-Border Succession Services`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `DOCUMENT CHECKLIST: GERMAN NRI INHERITING INDIAN PROPERTY
1. Registered Indian Will or Legal Heir Certificate / Succession Certificate.
2. Death Certificate of deceased parent issued by Municipal Authority in India.
3. Updated Indian Revenue Mutation Records (Patta / Khata / Property Card / Jamabandi).
4. Independent Valuation Report by Government Approved Valuer in India (Fair Market Value on date of death).
5. Sworn German translation (Beglaubigte Übersetzung) of Indian title and valuation documents.
6. Formal notification letter under Section 30 ErbStG to local German Finanzamt within 3 months.
7. European Central Bank (ECB) official INR/EUR exchange rate printout on date of death.
8. Indian PAN Card for NRI heir and designated Non-Resident Ordinary (NRO) Bank Account.
9. Form 15CB Certificate issued by Indian Chartered Accountant (for repatriation of sale proceeds).
10. Form 15CA electronic declaration filed on the Indian Income Tax e-Filing portal.
11. Section 67 AWV statistical reporting declaration to Deutsche Bundesbank (for incoming wires > €12,500).`;

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
            <Globe className="w-3.5 h-3.5 text-[#C65378]" />
            <span>GERMAN ERBSTG §§ 15 &amp; 16 • INDIA-GERMANY DTAA ARTICLE 13 • FEMA 1999</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            German Inheritance Tax on Indian Assets: NRI Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate German inheritance tax on Indian real estate, bank deposits, and family estates.
            Model tax classes, tax-free allowances, treaty rules, and money transfer steps to Germany.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-tax-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate German Inheritance Tax</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Send className="w-4 h-4 text-[#C65378]" />
              <span>Repatriation &amp; 15CA/CB Service</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">€400,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CHILD TAX-FREE FREIBETRAG
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% DTAA Relief</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INHERITANCE EXCLUDED FROM TREATY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">7% to 30%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STEUERKLASSE I BRACKETS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">$1,000,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ANNUAL FEMA REPATRIATION CAP
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
                <span>Cross-Border Tax Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under German ErbStG §§ 2, 15, 16 and 19, India-Germany DTAA, Section 56 of the Income-tax Act,
                and RBI FEMA Remittance Rules.
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
                <span>EXECUTIVE BRIEF: GERMAN TAX RESIDENTS INHERITING IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Worldwide Tax Exposure:</strong> If you live in Germany on a work visa or Blue Card, you
                    have worldwide tax liability under Section 2 ErbStG. All inherited Indian flats, land, and bank
                    balances face German tax review.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Bilateral Tax Treaty Gap:</strong> The India-Germany tax treaty covers income tax only.
                    It excludes inheritance tax. Because India charges zero inheritance tax, you get zero foreign tax
                    credit in Germany under Section 21.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tax-Free Allowance Limits:</strong> Children enjoy a 400,000 Euro tax-free allowance per
                    parent. Spouses receive 500,000 Euros. Tax applies only to amounts above these thresholds.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict 3-Month Notice Rule:</strong> Section 30 ErbStG requires notifying your local tax
                    office within 3 months of learning about the inheritance. Large bank transfers to Germany trigger
                    automatic tax reviews.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (Strict Single H2 on page) */}
            <section id="cross-border-tax-architecture" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>CROSS-BORDER STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Cross-Border Tax Architecture: German ErbStG &amp; Indian Assets
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many Indian expats in Germany face tax surprises when parents pass away. In India, real estate
                  inheritance is 100% tax-free. Under Section 56 of the Indian Income-tax Act, you pay zero tax on
                  inherited flats or family land.
                </p>
                <p>
                  German tax law has very different rules. Under Section 2 of the German Inheritance Tax Act, Germany
                  taxes worldwide wealth. If you live in Germany, you have unlimited tax liability. This rule covers
                  your flat in Pune, your house in Bengaluru, or farmland in Punjab.
                </p>
                <p>
                  The local German tax office assesses tax on foreign assets. You must value the property on the date
                  of death. You must test your tax-free allowance, called Freibetrag. Knowing these tax rules helps you
                  avoid tax fines or unexpected tax bills.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-tax-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE DIAGNOSTIC ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free German Erbschaftsteuer &amp; Freibetrag Calculator Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your property details below to calculate your German inheritance tax, tax-free allowance, and
                FEMA money transfer rules in real time.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Kinship & Steuerklasse Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Your Relationship to the Deceased Property Owner</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "child",
                        label: "Child / Adopted Child",
                        sub: "Steuerklasse I",
                        freibetrag: "€400,000 (~₹3.68 Cr)",
                      },
                      {
                        id: "spouse",
                        label: "Surviving Spouse",
                        sub: "Steuerklasse I",
                        freibetrag: "€500,000 (~₹4.60 Cr)",
                      },
                      {
                        id: "grandchild_parent_alive",
                        label: "Grandchild (Parent Alive)",
                        sub: "Steuerklasse I",
                        freibetrag: "€200,000 (~₹1.84 Cr)",
                      },
                      {
                        id: "grandchild_parent_deceased",
                        label: "Grandchild (Parent Deceased)",
                        sub: "Steuerklasse I",
                        freibetrag: "€400,000 (~₹3.68 Cr)",
                      },
                      {
                        id: "parent",
                        label: "Parent / Grandparent",
                        sub: "Steuerklasse I",
                        freibetrag: "€100,000 (~₹92.0 L)",
                      },
                      {
                        id: "sibling",
                        label: "Sibling (Brother / Sister)",
                        sub: "Steuerklasse II",
                        freibetrag: "€20,000 (~₹18.4 L)",
                      },
                      {
                        id: "niece_nephew",
                        label: "Niece / Nephew / In-Law",
                        sub: "Steuerklasse II",
                        freibetrag: "€20,000 (~₹18.4 L)",
                      },
                      {
                        id: "unrelated",
                        label: "Unrelated / Friend / Partner",
                        sub: "Steuerklasse III",
                        freibetrag: "€20,000 (~₹18.4 L)",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setKinshipRelation(item.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          kinshipRelation === item.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{item.label}</div>
                        <div className="text-[11px] text-[#C65378] font-bold mt-0.5">{item.sub}</div>
                        <div className="text-[10px] text-slate-500 mt-1">Allowance: {item.freibetrag}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Property Value in India */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Coins className="w-4 h-4 text-[#C65378]" />
                      <span>Step 2: Fair Market Value of Inherited Indian Estate</span>
                    </label>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <span>Rate benchmark:</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] font-bold text-slate-800">
                        1 EUR ≈ ₹92.00 INR
                      </span>
                    </div>
                  </div>

                  {/* Preset quick buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { inr: 7500000, label: "₹75 Lakh", eur: "€81.5k" },
                      { inr: 15000000, label: "₹1.5 Crore", eur: "€163k" },
                      { inr: 30000000, label: "₹3.0 Crore", eur: "€326k" },
                      { inr: 50000000, label: "₹5.0 Crore", eur: "€543k" },
                      { inr: 100000000, label: "₹10.0 Crore", eur: "€1.08M" },
                    ].map((preset) => (
                      <button
                        key={preset.inr}
                        type="button"
                        onClick={() => handlePresetSelect(preset.inr)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          propertyValueInr === preset.inr
                            ? "bg-[#172228] text-white border-[#172228]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {preset.label} <span className="text-[10px] opacity-75 font-normal">({preset.eur})</span>
                      </button>
                    ))}
                  </div>

                  {/* Dual Currency Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <span className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Indian Rupee Value (INR ₹)
                      </span>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="500000"
                          value={propertyValueInr}
                          onChange={(e) => setPropertyValueInr(Math.max(0, Number(e.target.value)))}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                        />
                      </div>
                      <span className="block text-[11px] text-slate-500 mt-1">
                        ≈ {(propertyValueInr / 10000000).toFixed(2)} Crore INR
                      </span>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Equivalent Euro Value (EUR €)
                      </span>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">€</span>
                        <input
                          type="number"
                          min="0"
                          value={propertyValueEur}
                          onChange={(e) => setPropertyValueInr(Math.max(0, Math.round(Number(e.target.value) * EUR_TO_INR)))}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                        />
                      </div>
                      <span className="block text-[11px] text-slate-500 mt-1">
                        Computed at 1 EUR = ₹92.00 INR
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Prior Gifts & German Tax Residency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <History className="w-4 h-4 text-[#C65378]" />
                      <span>Prior Gifts Received from Same Parent in Last 10 Years (€)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={priorGiftsLast10Years}
                      onChange={(e) => setPriorGiftsLast10Years(Math.max(0, Number(e.target.value)))}
                      placeholder="0"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    />
                    <span className="block text-[11px] text-slate-500">
                      Under ErbStG § 14, gifts in the last 10 years lower your tax-free allowance.
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-[#C65378]" />
                      <span>Asset Classification in India</span>
                    </label>
                    <select
                      value={assetType}
                      onChange={(e) => setAssetType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="residential_flat">Residential Flat / Apartment / Villa</option>
                      <option value="commercial_property">Commercial Office / Retail Shop</option>
                      <option value="agricultural_land">Agricultural Farmland (FEMA Restrictions Apply)</option>
                      <option value="bank_deposits">Bank Fixed Deposits / Mutual Funds / Demat Shares</option>
                      <option value="mixed_portfolio">Mixed Real Estate &amp; Liquid Portfolio</option>
                    </select>
                    <span className="block text-[11px] text-slate-500">
                      Farmland requires special Reserve Bank of India sale rules.
                    </span>
                  </div>
                </div>

                {/* Calculation Results Card */}
                <div className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#253741] text-white p-5 sm:p-7 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300">
                        CROSS-BORDER TAX ASSESSMENT
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                        {taxableAcquisition === 0 ? "Zero German Inheritance Tax" : `Estimated Tax: €${estimatedTaxEur.toLocaleString()}`}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-rose-200">
                      <span>{steuerklasseLabel}</span>
                      <span>•</span>
                      <span>{marginalRate}% Marginal Rate</span>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <div className="pt-2 md:pt-0">
                      <div className="text-xs text-white/70">Gross Estate Value</div>
                      <div className="text-base sm:text-lg font-extrabold text-white mt-0.5 font-mono">
                        €{propertyValueEur.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-white/50">₹{(propertyValueInr / 10000000).toFixed(2)} Cr</div>
                    </div>

                    <div className="pt-2 md:pt-0">
                      <div className="text-xs text-white/70">Freibetrag Allowance</div>
                      <div className="text-base sm:text-lg font-extrabold text-emerald-300 mt-0.5 font-mono">
                        €{effectiveFreibetrag.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-white/50">ErbStG § 16</div>
                    </div>

                    <div className="pt-2 md:pt-0">
                      <div className="text-xs text-white/70">Net Taxable Base</div>
                      <div className="text-base sm:text-lg font-extrabold text-rose-300 mt-0.5 font-mono">
                        €{taxableAcquisition.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-white/50">After €10.3k Pauschale</div>
                    </div>

                    <div className="pt-2 md:pt-0">
                      <div className="text-xs text-white/70">Estimated Tax Payable</div>
                      <div className="text-base sm:text-lg font-extrabold text-amber-300 mt-0.5 font-mono">
                        €{estimatedTaxEur.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-amber-200/80">≈ ₹{(estimatedTaxInr / 100000).toFixed(2)} Lakh</div>
                    </div>
                  </div>

                  {/* Diagnostic Banner */}
                  {taxableAcquisition === 0 ? (
                    <div className="rounded-2xl bg-emerald-950/60 border border-emerald-500/40 p-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>100% Tax-Free Under German Freibetrag Allowance</span>
                      </div>
                      <p className="text-xs text-emerald-100/90 leading-relaxed">
                        Your inherited Indian estate value of €{propertyValueEur.toLocaleString()} is fully covered
                        by your statutory allowance of €{effectiveFreibetrag.toLocaleString()} plus the €10,300
                        standard deduction. You owe zero German inheritance tax. However, you must still send an official
                        Section 30 notice to your local tax office.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-rose-950/60 border border-rose-500/40 p-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Taxable Amount Exceeds Allowance by €{taxableAcquisition.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-rose-100/90 leading-relaxed">
                        The India-Germany tax treaty does not cover inheritance tax. Because India charges zero estate
                        tax, no foreign tax credit applies under Section 21. German tax of €{estimatedTaxEur.toLocaleString()}{" "}
                        (~₹{(estimatedTaxInr / 100000).toFixed(2)} Lakh) will be billed by your tax office.
                      </p>
                    </div>
                  )}

                  {/* Actions & Copy */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={copySummaryToClipboard}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                    >
                      {copiedSummary ? <CheckCheck className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSummary ? "Copied Assessment!" : "Copy Full Tax Assessment"}</span>
                    </button>

                    <Link
                      href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-all shadow-md"
                    >
                      <span>Get Legal Repatriation Assistance</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT (Embedding Official OG Image) */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: GERMAN ERBSCHAFTSTEUER &amp; INDIAN ASSETS</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">German ErbStG &amp; India DTAA</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/germany-nri-erbschaftsteuer-indian-property-tax-calculator-og.jpg"
                  alt="Germany NRI Erbschaftsteuer Indian Property Tax Calculator Guide"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Cross-border estate tax planning for NRIs in Germany: tax classes, tax-free allowances, and RBI money
                transfer rules.
              </p>
            </div>

            {/* SECTION 3: GERMAN TAX CLASSES & FREIBETRAG */}
            <section id="tax-classes-freibetrag-allowances" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY BRACKETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. German ErbStG Tax Classes &amp; Freibetrag Allowances Explained
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  German tax law groups all heirs into three tax classes. These are Steuerklasse 1, 2, and 3 under
                  Section 15. Your tax class sets your personal tax-free allowance. It also sets your tax rate under
                  Section 19.
                </p>

                {/* Comparison Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-slate-100 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-3.5 border-b">Tax Class (Steuerklasse)</th>
                        <th className="p-3.5 border-b">Beneficiary Relationship</th>
                        <th className="p-3.5 border-b">Tax-Free Allowance (Freibetrag)</th>
                        <th className="p-3.5 border-b">Progressive Tax Rates</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td className="p-3.5 font-bold text-[#172228]">Steuerklasse I</td>
                        <td className="p-3.5">Spouse / Civil Partner</td>
                        <td className="p-3.5 font-mono font-bold text-emerald-700">€500,000</td>
                        <td className="p-3.5 font-mono">7% – 30%</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-[#172228]">Steuerklasse I</td>
                        <td className="p-3.5">Children / Stepchildren</td>
                        <td className="p-3.5 font-mono font-bold text-emerald-700">€400,000</td>
                        <td className="p-3.5 font-mono">7% – 30%</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-[#172228]">Steuerklasse I</td>
                        <td className="p-3.5">Grandchildren</td>
                        <td className="p-3.5 font-mono font-bold text-emerald-700">€200,000 / €400,000</td>
                        <td className="p-3.5 font-mono">7% – 30%</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-[#172228]">Steuerklasse I</td>
                        <td className="p-3.5">Parents / Grandparents</td>
                        <td className="p-3.5 font-mono font-bold text-emerald-700">€100,000</td>
                        <td className="p-3.5 font-mono">7% – 30%</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-[#172228]">Steuerklasse II</td>
                        <td className="p-3.5">Siblings, Nieces, Nephews, In-laws</td>
                        <td className="p-3.5 font-mono font-bold text-amber-700">€20,000</td>
                        <td className="p-3.5 font-mono">15% – 43%</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-[#172228]">Steuerklasse III</td>
                        <td className="p-3.5">Unrelated Beneficiaries / Friends</td>
                        <td className="p-3.5 font-mono font-bold text-rose-700">€20,000</td>
                        <td className="p-3.5 font-mono">30% – 50%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="pt-2">
                  <strong>The 10-Year Rolling Rule:</strong> All gifts and inheritances from the same parent over 10
                  years are added together. If your father gave you money 5 years ago, that prior gift reduces your
                  available tax allowance upon his death.
                </p>
              </div>
            </section>

            {/* SECTION 4: THE DTAA GAP */}
            <section id="dtaa-treaty-gap-analysis" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>BILATERAL TREATY DEFECT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. The India-Germany DTAA Gap: Why Article 13 Excludes Inheritance
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many NRIs think the India-Germany tax treaty protects them from inheritance tax. This is a common
                  error. Article 2 of the tax treaty lists only income taxes and wealth taxes.
                </p>
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 space-y-2 text-xs sm:text-sm text-amber-900">
                  <div className="font-bold">Article 2(1) India-Germany Tax Treaty:</div>
                  <p>
                    <em>
                      The treaty covers income tax, corporate tax, trade tax, and wealth tax. It does not list German
                      inheritance tax.
                    </em>
                  </p>
                  <p className="font-bold text-rose-700">
                    Key Legal Fact: Inheritance tax is completely left out of the treaty!
                  </p>
                </div>
                <p>
                  India ended estate duty in 1985. India levies zero inheritance tax on death. Because you pay no tax in
                  India, you get zero foreign tax credit in Germany under Section 21. Germany grants tax credits only for
                  foreign inheritance taxes actually paid abroad.
                </p>
                <p>
                  <strong>Where Treaty Article 13 Applies:</strong> If you later sell the inherited flat in India,
                  Article 13 gives India the first right to tax capital gains. Germany then excludes these capital gains
                  from German income tax under Article 23. But this relief covers only sale gains, never inheritance tax
                  on death.
                </p>
              </div>
            </section>

            {/* SECTION 5: INDIAN DOMESTIC TAX LAWS */}
            <section id="indian-domestic-tax-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>INDIAN SUCCESSION &amp; TAX CODE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Indian Domestic Tax Status: Section 56(2)(x) &amp; Capital Gains
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  You must separate the act of receiving an inheritance from the act of selling it. Each step has its
                  own tax rules.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="text-xs font-bold uppercase text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Phase 1: Receiving the Estate (Zero Tax)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 56 of the Indian Income-tax Act, real estate or funds received by inheritance are
                      100% tax-free. The heir owes zero tax to the Indian tax office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="text-xs font-bold uppercase text-[#C65378] flex items-center gap-1.5">
                      <Coins className="w-4 h-4" />
                      <span>Phase 2: Selling the Estate in India</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      When the NRI heir sells the flat, Indian capital gains tax applies under Section 45. The original
                      purchase cost is passed down from the parent under Section 49.
                    </p>
                  </div>
                </div>

                <p>
                  <strong>Budget 2024 Capital Gains Rules:</strong> Long-term capital gains on property sales face a
                  12.5% tax rate. Properties bought before July 2024 have special grandfathered tax rules.
                </p>
                <p>
                  <strong>Section 195 Tax Deduction at Source:</strong> Indian buyers must deduct tax upfront when buying
                  from an NRI. The standard rate is 20% plus fees. You can lower this tax deduction by getting a Form 13
                  certificate from the tax officer in advance.
                </p>
              </div>
            </section>

            {/* SECTION 6: FEMA REPATRIATION SOP */}
            <section id="fema-repatriation-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Send className="w-4 h-4" />
                <span>CROSS-BORDER SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Step-by-Step SOP: Repatriating Inherited Funds Under FEMA
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Sending inherited sale money from India to your bank in Frankfurt, Munich, or Berlin requires following
                RBI rules and German banking notices.
              </p>

              {/* 6-Step Visual Stepper */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    step: "01",
                    title: "Revenue Mutation & Title Update",
                    desc: "Update the property title in local revenue books using the registered Will or Legal Heir Certificate. Get the new Khata or Patta in your name.",
                  },
                  {
                    step: "02",
                    title: "Section 197 Form 13 Lower TDS Application",
                    desc: "Apply for a lower tax certificate before signing the sale deed. This prevents the buyer from locking up 20% of your gross sale money.",
                  },
                  {
                    step: "03",
                    title: "Sale Deed Execution & NRO Account Credit",
                    desc: "Sign the sale deed via Power of Attorney or in person. Deposit all sale proceeds directly into your Indian NRO bank account.",
                  },
                  {
                    step: "04",
                    title: "Form 15CB Chartered Accountant Certificate",
                    desc: "Have an Indian CA compute capital gains tax, verify payments, and sign Form 15CB certifying that all Indian taxes are fully paid.",
                  },
                  {
                    step: "05",
                    title: "Form 15CA Online Filing & Bank Transfer",
                    desc: "Submit Form 15CA online on the Indian tax portal. Give your bank your 15CA, 15CB, sale deed, and wire instructions to send the funds.",
                  },
                  {
                    step: "06",
                    title: "German Bank Notice & AWV Compliance",
                    desc: "Alert your German bank before funds arrive. Under Section 67 AWV, report foreign incoming money over 12,500 Euros to Deutsche Bundesbank.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-200/90">
                    <span className="font-mono text-base font-black text-[#C65378] shrink-0 mt-0.5">{item.step}</span>
                    <div className="space-y-1">
                      <div className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: VALUATION PROTOCOL */}
            <section id="property-valuation-protocol" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>VALUATION STANDARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Valuation Protocol: Proving Fair Market Value to Finanzamt
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  German tax rules require fair market value on the date of death. This is called the Stichtag value.
                </p>
                <p>
                  <strong>Why Circle Rates Are Rejected:</strong> Many NRIs try to report state circle rates to the
                  Finanzamt. German tax auditors often reject circle rates because they are baseline rates, not market
                  rates. Real sale prices are usually higher.
                </p>
                <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2 text-xs sm:text-sm">
                  <div className="font-bold text-slate-900">What the German Tax Office Requires:</div>
                  <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                    <li>A valuation report by an IBBI registered property valuer in India.</li>
                    <li>Property valuation using local market sales comparisons.</li>
                    <li>A sworn German translation by a certified legal translator.</li>
                    <li>Euro conversion using the official European Central Bank rate on the date of death.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 8: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Practical Case Studies: Frankfurt, Munich &amp; Berlin Tech NRIs
              </h3>

              <div className="space-y-4 pt-1">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Case Study 1: Frankfurt IT Architect</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                      Zero Tax Result
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-900">
                    Inheriting a ₹3.2 Crore Apartment in Pune as an Only Child
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Rohit lives in Frankfurt on permanent residency. His father passed away in Pune, leaving a flat
                    worth ₹3.2 Crore (€347,800). As a biological child, Rohit has a €400,000 tax allowance. Because his
                    share is under €400,000, his German inheritance tax was zero Euros. We helped him file his Section 30
                    notice and complete title mutation in Pune.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Case Study 2: Munich Senior Engineer</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold">
                      Tax Optimized
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-900">
                    Inheriting a ₹6.5 Crore Residential Plot in Bengaluru
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Priya works in Munich and inherited a plot in Bengaluru worth ₹6.5 Crore (€706,500). After her
                    €400,000 allowance and standard deductions, her taxable base was €296,200. At the 11% tax rate, tax
                    was €32,582. By documenting estate debts and legal fees in India, we lowered her net taxable base.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Case Study 3: Berlin Startup Co-Founder</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold">
                      Class 2 Rates
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-900">
                    Inheriting a Commercial Shop in Mumbai from an Uncle
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Karan in Berlin inherited a shop worth ₹1.8 Crore (€195,650) from his uncle. As a nephew, Karan falls
                    into Tax Class 2 with an allowance of only €20,000. The taxable base of €165,350 faced a 20% tax
                    rate. Our desk helped him plan an orderly sale and transfer through Form 15CA and 15CB.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: COMPLIANCE CHECKLIST */}
            <section id="legal-compliance-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STATUTORY AUDIT READY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Legal &amp; Tax Compliance Checklist for German NRI Heirs
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this simple 12-point checklist to prepare your documents for both Indian revenue offices and the
                German tax office.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  {[
                    "Registered Indian Will or Court Succession Certificate",
                    "Municipal Death Certificate with official apostille",
                    "Revenue mutation paper (Khata, Patta, or 7/12 extract)",
                    "IBBI certified property valuation report on date of death",
                    "Sworn German translation by a certified legal translator",
                    "Section 30 notice letter to your local German tax office",
                    "ECB official currency exchange rate printout on date of death",
                    "Active Indian PAN Card and designated NRO bank account",
                    "Form 15CB Certificate signed by an Indian Chartered Accountant",
                    "Form 15CA filed declaration on the Indian tax portal",
                    "Section 67 AWV Bundesbank reporting for wires over €12,500",
                    "German bank Mittelherkunft proof of origin packet",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172228] hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    {copiedChecklist ? <CheckCheck className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedChecklist ? "Copied Checklist!" : "Copy 12-Point Checklist"}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 10: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>PRACTICE SPECIALIZATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Institutional Profile: Cross-Border Succession Services
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  WillDrafting.in is powered by <strong>AMA Legal Solutions</strong>. We specialize in Indian estate law,
                  Will drafting, and cross-border property transfers for NRIs.
                </p>
                <p>
                  Our German NRI Desk supports Indian professionals living in Frankfurt, Munich, Berlin, Stuttgart,
                  Hamburg, and Düsseldorf with complete legal guidance:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">Title Mutation &amp; Probate</div>
                    <p className="text-[11px] text-slate-600">
                      Legal help before Indian Tehsildars, Sub-Registrars, and High Courts.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">15CA &amp; 15CB Transfers</div>
                    <p className="text-[11px] text-slate-600">
                      In-house CA certificates, lower tax orders, and authorized bank approvals.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">German Tax Coordination</div>
                    <p className="text-[11px] text-slate-600">
                      Registered property valuations, sworn translations, and Section 30 notice filing.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: Germany NRI Inheritance Tax
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Read clear answers to common questions about German inheritance tax, allowances, and Indian property
                repatriation.
              </p>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 12: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LEGAL AUTHORITIES &amp; STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Statutory Citations &amp; Judicial Portals
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-xs sm:text-sm">
                <p>
                  All legal references and rules are based on authoritative Indian and German statutes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://www.gesetze-im-internet.de/erbstg_1974/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                        German ErbStG (Federal Law Gazette)
                      </div>
                      <div className="text-[11px] text-slate-500">Sections 2, 15, 16, 19 and 30 ErbStG</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                  </a>

                  <a
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                        Indian Income Tax Department
                      </div>
                      <div className="text-[11px] text-slate-500">Section 56(2)(x) &amp; Form 15CA/15CB</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                  </a>

                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                        India Code: Indian Succession Act 1925
                      </div>
                      <div className="text-[11px] text-slate-500">Testamentary &amp; Intestate Succession</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                  </a>

                  <a
                    href="https://www.rbi.org.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                        Reserve Bank of India (RBI)
                      </div>
                      <div className="text-[11px] text-slate-500">FEMA Remittance of Assets Regulations</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                  </a>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY CONVERSION SIDEBAR (Zero Phone Numbers!)
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-5">
            {/* CTA 1: Cross-Border Repatriation Service */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Send className="w-4 h-4" />
                <span>CROSS-BORDER REPATRIATION</span>
              </div>
              <div className="font-extrabold text-base text-slate-900 leading-snug">
                Repatriating Inherited Funds from India to Germany?
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our institutional cross-border desk handles Form 15CA, Form 15CB CA certification, Lower TDS Form 13
                clearances, and AD Bank SWIFT transfers up to $1M per year.
              </p>
              <Link
                href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-colors shadow-xs"
              >
                <span>Explore 15CA/15CB Repatriation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* CTA 2: Will Drafting Consultation */}
            <div className="bg-[#172228] text-white rounded-3xl shadow-md p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
                <Sparkles className="w-4 h-4" />
                <span>CROSS-BORDER ESTATE WILL</span>
              </div>
              <div className="font-extrabold text-base text-white leading-snug">
                Protect Your Family with a Conflict-Free Indian Will
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Draft a legally resilient Indian Will specifying your overseas NRI beneficiaries, avoiding lengthy probate
                delays, and structuring optimal Freibetrag utilization.
              </p>
              <button
                type="button"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-[#172228] hover:bg-slate-100 font-bold text-xs transition-colors shadow-sm"
              >
                <span>Draft Legally Resilient Will</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
              </button>
            </div>

            {/* Quick Contact Link */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 text-center space-y-2">
              <div className="text-xs font-bold text-[#172228]">Need Legal Consultation?</div>
              <p className="text-[11px] text-slate-600">
                Schedule a confidential cross-border case evaluation with our senior legal team.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C65378] hover:underline"
              >
                <span>Submit Legal Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
