"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  X,
  MapPin,
  Building2,
  Info,
  DollarSign,
  Gavel,
  Briefcase,
  FileText,
  AlertCircle,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";

interface TOCItem {
  id: string;
  label: string;
}

const TOC_ITEMS: TOCItem[] = [
  { id: "executive-summary", label: "1. Executive Summary: NRI Will & Succession" },
  { id: "diagnostic-tool", label: "2. Interactive Diagnostic: Do You Need an Indian Will?" },
  { id: "two-will-strategy", label: "3. The Two-Will Strategy: Separate Wills for India & Abroad" },
  { id: "fema-regulations", label: "4. FEMA Rules: Can NRIs Inherit Indian Land & Farmland?" },
  { id: "strategy-comparison", label: "5. Comparison: One Single Will vs Two Separate Wills" },
  { id: "section-228-probate", label: "6. Why Foreign Court Orders Don't Work Directly in India" },
  { id: "visual-blueprint", label: "7. Visual Flowchart: How NRI Inheritance Works" },
  { id: "execution-protocol", label: "8. How NRIs Can Legally Sign an Indian Will from Abroad" },
  { id: "asset-protection-grid", label: "9. Protecting Your Assets in India and Overseas" },
  { id: "repatriation-matrix", label: "10. Sending Inherited Money Abroad (RBI & FEMA Rules)" },
  { id: "transmission-timeline", label: "11. Expected Timelines for Claiming Inherited Indian Assets" },
  { id: "specialized-scenarios", label: "12. Four Common Scenarios for NRIs & OCIs" },
  { id: "institutional-backing", label: "13. Legal Backing & Expert NRI Support" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions" },
  { id: "statutory-citations", label: "15. Relevant Laws & Official Resources" },
];

interface CountryOption {
  code: string;
  name: string;
  currency: string;
  probateSystem: string;
}

const COUNTRIES: CountryOption[] = [
  { code: "US", name: "United States", currency: "USD", probateSystem: "State Probate Court / Living Trust" },
  { code: "UK", name: "United Kingdom", currency: "GBP", probateSystem: "High Court Probate Registry" },
  { code: "CA", name: "Canada", currency: "CAD", probateSystem: "Provincial Superior Court" },
  { code: "AE", name: "United Arab Emirates", currency: "AED", probateSystem: "DIFC Wills Court / Civil Court" },
  { code: "AU", name: "Australia", currency: "AUD", probateSystem: "Supreme Court Probate Division" },
  { code: "SG", name: "Singapore", currency: "SGD", probateSystem: "Family Justice Courts" },
  { code: "DE", name: "Germany / EU", currency: "EUR", probateSystem: "Nachlassgericht Succession" },
  { code: "SA", name: "Saudi Arabia / GCC", currency: "SAR", probateSystem: "Personal Status Court" },
  { code: "QA", name: "Qatar", currency: "QAR", probateSystem: "Civil Personal Status Court" },
  { code: "KW", name: "Kuwait", currency: "KWD", probateSystem: "Ministry of Justice Family Court" },
  { code: "NZ", name: "New Zealand", currency: "NZD", probateSystem: "High Court of New Zealand" },
  { code: "OTHER", name: "Other Country", currency: "USD", probateSystem: "Foreign Common / Civil Law Court" },
];

interface AssetOption {
  id: string;
  label: string;
  category: "immovable" | "movable";
  riskFactor: number;
  statutoryAlert: string;
}

const ASSET_TYPES: AssetOption[] = [
  {
    id: "residential_property",
    label: "Residential Apartment, Villa or Plot",
    category: "immovable",
    riskFactor: 5,
    statutoryAlert:
      "Governed by Indian land laws. Local registries reject foreign probate grants. A dedicated Indian Will enables direct property name transfer.",
  },
  {
    id: "commercial_property",
    label: "Commercial Shop, Office or Warehouse",
    category: "immovable",
    riskFactor: 5,
    statutoryAlert:
      "Subject to state stamp laws and tenant lease transfers. An Indian Will lets your executor take control without court battles.",
  },
  {
    id: "agricultural_land",
    label: "Agricultural Land, Farmhouse or Plantation",
    category: "immovable",
    riskFactor: 5,
    statutoryAlert:
      "FEMA ALERT: Section 6(5) allows NRIs to inherit farm land. But you can only sell it to an Indian citizen living in India.",
  },
  {
    id: "nre_nro_accounts",
    label: "NRE and NRO Bank Accounts or Fixed Deposits",
    category: "movable",
    riskFactor: 4,
    statutoryAlert:
      "Indian banks freeze accounts when a holder dies. Bank nominees are only trustees. A clear Will releases money quickly.",
  },
  {
    id: "demat_mutual_funds",
    label: "Demat Accounts, Listed Shares and Mutual Funds",
    category: "movable",
    riskFactor: 4,
    statutoryAlert:
      "Subject to SEBI rules. Brokers require clear proof of legal heirs. An Indian Will prevents months of paperwork.",
  },
  {
    id: "insurance_ppf",
    label: "Life Insurance Policies, EPF and PPF Balances",
    category: "movable",
    riskFactor: 3,
    statutoryAlert:
      "Claims require heir proof and death certificates. A clear Indian Will prevents disputes among family members.",
  },
  {
    id: "private_business",
    label: "Private Limited Shares or LLP Partnership Stake",
    category: "movable",
    riskFactor: 5,
    statutoryAlert:
      "Company law requires formal share transfer. Naming an executor in an Indian Will stops business operations from stalling.",
  },
  {
    id: "locker_jewelry",
    label: "Bank Lockers, Gold and Family Valuables",
    category: "movable",
    riskFactor: 3,
    statutoryAlert:
      "Opening bank lockers requires all legal heirs or an authorized executor named in a valid Indian Will.",
  },
];

const FAQS = [
  {
    q: "Do I need a separate Indian Will if I already have a Will abroad?",
    a: "Yes. Indian real estate follows Indian succession law. Foreign court orders have no direct power over Indian land registries. If you rely only on a foreign Will, your family must apply to an Indian High Court under Section 228 of the Indian Succession Act. This process takes 14 to 30 months. A separate Indian Will avoids this delay completely.",
  },
  {
    q: "What is the Two-Will Strategy for Non-Resident Indians?",
    a: "The Two-Will Strategy means making two separate Wills. You make one Will for your foreign assets like your home or pension abroad. You make a second Will only for your Indian property and bank accounts. Each Will contains a clause confirming it does not cancel the other. This keeps both estates safe and independent.",
  },
  {
    q: "Can an NRI or OCI inherit agricultural land in India through a Will?",
    a: "Yes. Under Section 6(5) of the Foreign Exchange Management Act (FEMA), an NRI or OCI can inherit agricultural land and farmhouses from a resident Indian. However, FEMA rules say you cannot sell or gift that farmland to another NRI. You can only sell it to an Indian citizen who lives in India.",
  },
  {
    q: "Does an NRI have to travel to India to sign or register an Indian Will?",
    a: "No. You can sign your Indian Will in your country of residence on plain A4 paper. Under Section 63 of the Indian Succession Act, you only need to sign before two adult witnesses who are physically present with you. Will registration is optional under Section 18 of the Registration Act. An unregistered Will on plain paper is 100% legal.",
  },
  {
    q: "What is Section 228 of the Indian Succession Act, and why is it a problem?",
    a: "Section 228 applies when a Will is proved in a foreign court. Indian banks and land registries do not accept foreign court decrees directly. Your heirs must file a second case in an Indian court for Letters of Administration with Will Annexed. This process requires apostilled court records, newspaper notices, and court hearings that add heavy costs and 1 to 2 years of delays.",
  },
  {
    q: "Can an NRI appoint an overseas citizen or foreign resident as executor?",
    a: "Yes, any adult of sound mind can be an executor under Section 222 of the Indian Succession Act. However, an executor living abroad may find it hard to visit Indian banks, tax offices, and land registries. We recommend naming a trusted relative in India or a legal firm as co-executor or alternate executor.",
  },
  {
    q: "How does an accidental revocation happen between foreign and Indian Wills?",
    a: "Many foreign Will templates say: 'I revoke all previous Wills made anywhere in the world.' If you sign a foreign Will with this clause, it cancels your Indian Will. To avoid this trap, your foreign Will must cover only foreign assets. Your Indian Will must state clearly that it applies only to assets in India.",
  },
  {
    q: "How do NRI heirs repatriate money from inherited Indian assets abroad?",
    a: "The Reserve Bank of India allows NRI heirs to send up to 1 million US Dollars abroad each financial year from an NRO account. You can send funds from property sales, bank deposits, and shares. Your chartered accountant must file Form 15CA and Form 15CB to certify tax compliance before the bank wires the funds.",
  },
  {
    q: "Is a US Revocable Living Trust effective for real estate located in India?",
    a: "No. Indian land registries and municipal bodies do not recognize US private living trusts for property title transfers. Moving Indian real estate into a foreign trust also breaks FEMA regulations. You must use a valid Indian Will to pass on Indian property cleanly.",
  },
  {
    q: "Does an Indian Will need Indian stamp paper or consular attestation?",
    a: "No Indian stamp paper is needed. Under the Indian Stamp Act, Wills are completely exempt from stamp duty. While getting your signature notarized or verified at an Indian Consulate adds strong proof of identity, it is not mandatory. Signing before two independent adult witnesses meets all legal rules under Section 63.",
  },
];

export default function NriWillCheckerClient() {
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
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([
    "residential_property",
    "nre_nro_accounts",
    "demat_mutual_funds",
  ]);
  const [foreignWillStatus, setForeignWillStatus] = useState<string>("yes_general");
  const [foreignWillMentionsIndia, setForeignWillMentionsIndia] = useState<string>("no");
  const [executorLocation, setExecutorLocation] = useState<string>("abroad");
  const [beneficiaryType, setBeneficiaryType] = useState<string>("nri");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const toggleAsset = (id: string) => {
    setSelectedAssets((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handlePrint = () => {
    window.print();
  };

  // Diagnostic calculations
  const hasImmovable = selectedAssets.some(
    (id) => id === "residential_property" || id === "commercial_property" || id === "agricultural_land"
  );
  const hasAgriLand = selectedAssets.includes("agricultural_land");
  const hasBankAccounts = selectedAssets.includes("nre_nro_accounts");
  const hasDematOrBusiness =
    selectedAssets.includes("demat_mutual_funds") || selectedAssets.includes("private_business");

  let calculatedScore = 20;
  if (hasImmovable) calculatedScore += 35;
  if (hasAgriLand) calculatedScore += 15;
  if (hasBankAccounts) calculatedScore += 10;
  if (hasDematOrBusiness) calculatedScore += 10;
  if (foreignWillStatus === "yes_general" || foreignWillStatus === "yes_worldwide") calculatedScore += 15;
  if (foreignWillMentionsIndia === "no" && foreignWillStatus !== "none") calculatedScore += 10;
  if (executorLocation === "abroad") calculatedScore += 10;
  if (beneficiaryType === "nri") calculatedScore += 10;
  const riskScore = Math.min(100, Math.max(25, calculatedScore));

  let recommendationHeadline = "Dedicated Indian Will Urgently Required";
  let recommendationSummary =
    "You have Indian assets governed by Indian law. Without a separate Indian Will, your family faces a 14 to 30 month court delay under Section 228 of the Indian Succession Act.";

  if (!hasImmovable && selectedAssets.length <= 1 && foreignWillStatus === "none") {
    recommendationHeadline = "Indian Will Strongly Advised for Bank Security";
    recommendationSummary =
      "Even for liquid bank accounts, Indian financial institutions demand succession certificates without an executed Will. Drafting a quick Indian Will prevents frozen accounts.";
  } else if (foreignWillStatus === "yes_worldwide") {
    recommendationHeadline = "High Risk of Accidental Revocation Detected";
    recommendationSummary =
      "Your foreign Will likely has a worldwide revocation clause. This creates legal ambiguity and can invalidate your Indian testamentary intentions. You require an explicit Two-Will structure.";
  }

  const selectedCountryObj = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy #172228)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Globe className="w-4 h-4 text-[#C65378]" />
            <span>CROSS-BORDER SUCCESSION &bull; FEMA COMPLIANCE DIAGNOSTIC</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Do I Need an Indian Will: NRI Estate Diagnostic Tool
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Check your cross-border succession status in 2 minutes. Calculate your legal exposure under FEMA, prevent the 14-month Section 228 foreign probate trap, and secure your Indian assets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#diagnostic-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Run Free NRI Diagnostic Check</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all cursor-pointer"
            >
              <span>Draft NRI Indian Will (15 Mins)</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (WillDrafting Social Proof & Cross-Border Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                NRI Succession Focus
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                NRI Estates Advised
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Indian Assets Secured
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
              <svg
                className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-base sm:text-lg font-extrabold text-[#172228] leading-none">
                    4.9
                  </span>
                  <div className="flex text-amber-500 text-xs">★★★★★</div>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-[#55636D] mt-0.5">
                  Verified NRI Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Widescreen Content Architecture)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_300px] 2xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block">
            <div className="bg-white rounded-2xl border border-[#172228]/10 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#172228]/10 text-xs font-bold uppercase tracking-wider text-[#172228]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span>Diagnostic Contents</span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-210px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
                      activeId === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 pt-3 border-t border-[#172228]/10 text-[11px] text-[#55636D] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                <span>Compliant with Indian Succession Act & FEMA 1999 rules.</span>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: EDITORIAL CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 md:space-y-14 min-w-0">
            {/* SECTION 0: EXECUTIVE SUMMARY BRIEF */}
            <section
              id="executive-summary"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs border-l-4 border-l-[#C65378]"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  EXECUTIVE SUMMARY &bull; NRI SUCCESSION BLUEPRINT
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                1. Executive Summary: NRI Will &amp; Cross-Border Succession
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                Many Non-Resident Indians (NRIs) own flats and bank accounts in India. They often make a Will in their home country like the US or UK. They assume this foreign Will covers their Indian property. Under Indian law, this creates severe problems. Foreign court orders do not transfer Indian land directly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Lex Loci Rei Sitae Applies</strong>
                    Indian real estate is governed by Indian law. Foreign courts have no direct power over Indian land registries.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">The Section 228 Trap</strong>
                    Foreign Wills require a second court grant in India. This process locks family assets for 14 to 30 months.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">The Two-Will Strategy</strong>
                    Make one Will for your foreign home. Make a second Will for Indian assets. This keeps both estates safe.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Zero Travel Required</strong>
                    You can sign your Indian Will on plain A4 paper abroad. Sign before two independent witnesses under Section 63.
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 1: THE INTERACTIVE NRI WILL CHECKER DIAGNOSTIC TOOL
                =================================================================== */}
            <section
              id="diagnostic-tool"
              className="scroll-target rounded-3xl bg-white border-2 border-[#C65378]/25 p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Real-Time Cross-Border Diagnostic</span>
                  </div>
                  <span className="text-xs text-[#55636D] font-medium">
                    Updated for FEMA 2026 &amp; Indian Succession Act
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] mb-3">
                  2. Interactive Diagnostic: Do You Need an Indian Will?
                </h2>
                <p className="text-sm md:text-base text-slate-600 mb-8 max-w-3xl">
                  Select your country of residence, Indian asset holdings, and existing Will status below. Our diagnostic engine evaluates your legal risk profile under Indian private international law in real time.
                </p>

                {/* STEP 1: RESIDENCE COUNTRY */}
                <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#C65378] mb-2">
                    Step 1: Your Country of Residence (Tax / Domicile Location)
                  </label>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4">
                    Succession rules vary based on where you live. Select your current home country to see your probate pathway.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => setSelectedCountry(country.code)}
                        className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          selectedCountry === country.code
                            ? "bg-[#172228] text-white border-[#172228] shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{country.name}</span>
                          <span className="text-[10px] opacity-75 font-mono">({country.currency})</span>
                        </div>
                        <div className="text-[10px] mt-1 opacity-75 truncate">{country.probateSystem}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEP 2: ASSET SELECTION */}
                <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#C65378]">
                      Step 2: Indian Assets You Currently Own (Select All That Apply)
                    </label>
                    <span className="text-xs text-[#55636D] font-bold">
                      {selectedAssets.length} of {ASSET_TYPES.length} Selected
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4">
                    Each asset class requires a specific legal pathway for title and fund release in India.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ASSET_TYPES.map((asset) => {
                      const isSelected = selectedAssets.includes(asset.id);
                      return (
                        <div
                          key={asset.id}
                          onClick={() => toggleAsset(asset.id)}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? "bg-white border-[#C65378] ring-1 ring-[#C65378] shadow-xs"
                              : "bg-white/70 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-[#C65378] border-slate-300 mt-1 cursor-pointer focus:ring-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span
                              className={`text-xs sm:text-sm font-bold block ${
                                isSelected ? "text-[#172228]" : "text-slate-700"
                              }`}
                            >
                              {asset.label}
                            </span>
                            <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug">
                              {asset.statutoryAlert}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 3 & 4: FOREIGN WILL STATUS & MENTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Step 3: Foreign Will Status */}
                  <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#C65378] mb-2">
                      Step 3: Existing Foreign Will Status
                    </label>
                    <p className="text-xs text-slate-600 mb-3">
                      Do you have a Will executed in {selectedCountryObj.name}?
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: "none", label: "No Foreign Will", sub: "I have not drafted a Will abroad" },
                        {
                          id: "yes_general",
                          label: "Yes: Standard Local Will",
                          sub: "Drafted for local assets with standard clauses",
                        },
                        {
                          id: "yes_worldwide",
                          label: "Yes: Worldwide Revocation Clause",
                          sub: "Contains 'Revoking all previous Wills everywhere'",
                        },
                        {
                          id: "yes_excluded",
                          label: "Yes: Country-Specific Foreign Will",
                          sub: "Explicitly excludes assets located in India",
                        },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            foreignWillStatus === item.id
                              ? "bg-white border-[#172228] font-bold"
                              : "bg-white/50 border-slate-200 text-slate-700 hover:bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="foreignWillStatus"
                            checked={foreignWillStatus === item.id}
                            onChange={() => setForeignWillStatus(item.id)}
                            className="mt-0.5 text-[#C65378] focus:ring-0"
                          />
                          <div>
                            <span className="text-slate-900 block">{item.label}</span>
                            <span className="text-[10px] text-slate-500 font-normal">{item.sub}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Mention of Indian Assets */}
                  <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#C65378] mb-2">
                      Step 4: Does Foreign Will Mention Indian Assets?
                    </label>
                    <p className="text-xs text-slate-600 mb-3">
                      Are your Indian properties explicitly scheduled in your foreign Will?
                    </p>
                    <div className="space-y-2">
                      {[
                        {
                          id: "no",
                          label: "No: Indian Assets Omitted",
                          sub: "Indian assets are not specifically mentioned",
                        },
                        {
                          id: "yes_blanket",
                          label: "Yes: Under Blanket Residuary Clause",
                          sub: "Covered by 'All the rest, residue & remainder of my estate'",
                        },
                        {
                          id: "yes_specific",
                          label: "Yes: Specifically Listed by Address",
                          sub: "Specific Indian addresses or bank folios listed",
                        },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            foreignWillMentionsIndia === item.id
                              ? "bg-white border-[#172228] font-bold"
                              : "bg-white/50 border-slate-200 text-slate-700 hover:bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="foreignWillMentionsIndia"
                            checked={foreignWillMentionsIndia === item.id}
                            onChange={() => setForeignWillMentionsIndia(item.id)}
                            className="mt-0.5 text-[#C65378] focus:ring-0"
                          />
                          <div>
                            <span className="text-slate-900 block">{item.label}</span>
                            <span className="text-[10px] text-slate-500 font-normal">{item.sub}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STEP 5: EXECUTOR & BENEFICIARY LOGISTICS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      Where Does Your Intended Executor Reside?
                    </label>
                    <select
                      value={executorLocation}
                      onChange={(e) => setExecutorLocation(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="india">Resident in India (Can visit offices in person)</option>
                      <option value="abroad">Resides Abroad (NRI / Foreign Citizen)</option>
                      <option value="none">No Executor Appointed Yet</option>
                    </select>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      A resident Indian executor avoids international travel during asset transfer.
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      Who Are Your Intended Beneficiaries?
                    </label>
                    <select
                      value={beneficiaryType}
                      onChange={(e) => setBeneficiaryType(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="nri">NRIs or OCIs Living Outside India</option>
                      <option value="resident">Resident Indians Living in India</option>
                      <option value="mixed">Mixed Family (Both NRIs and Indian Residents)</option>
                    </select>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      NRI heirs must file Form 15CA and Form 15CB to repatriate inheritance funds.
                    </span>
                  </div>
                </div>

                {/* ===============================================================
                    DIAGNOSTIC RESULT OUTPUT CARD
                    =============================================================== */}
                <div className="rounded-2xl bg-[#172228] text-white p-6 sm:p-8 shadow-xl border border-white/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/15">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
                        <AlertCircle className="w-4 h-4 text-[#C65378]" />
                        <span>Diagnostic Result &bull; {selectedCountryObj.name} to India</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        {recommendationHeadline}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                        {recommendationSummary}
                      </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end shrink-0">
                      <div className="text-right">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#C65378]">
                          {riskScore}%
                        </span>
                        <span className="text-xs text-slate-300 block uppercase font-bold tracking-wider">
                          Probate &amp; Friction Risk
                        </span>
                      </div>
                      <div className="w-44 bg-white/10 rounded-full h-2.5 mt-2 overflow-hidden">
                        <div
                          className="bg-[#C65378] h-full rounded-full transition-all duration-500"
                          style={{ width: `${riskScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-white/15 text-xs">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-rose-300 font-bold block uppercase tracking-wider text-[10px] mb-1">
                        1. Immovable Property Risk
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        {hasImmovable
                          ? "High Risk: Indian land offices reject foreign probate orders. Title transfer requires Section 228 ancillary probate unless an Indian Will exists."
                          : "Low Risk: No real estate selected. Focus is on liquid bank and depository transmission."}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-rose-300 font-bold block uppercase tracking-wider text-[10px] mb-1">
                        2. Foreign Probate Delay
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        Relying only on your foreign Will creates a 14 to 30 month court delay in India for apostilling and ancillary probate petitions.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-rose-300 font-bold block uppercase tracking-wider text-[10px] mb-1">
                        3. FEMA &amp; Repatriation
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        {hasAgriLand
                          ? "Strict FEMA Warning: Inherited farm land can only be sold to resident Indian citizens. Your Will must reflect FEMA Section 6(5)."
                          : "Sending funds abroad under the RBI 1 million dollar scheme requires Form 15CA and Form 15CB tax forms."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href="/start"
                        onClick={handleStartDraft}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all cursor-pointer text-xs sm:text-sm shadow-md"
                      >
                        <span>Draft NRI Indian Will Online</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href="/services/nri-will-india"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all"
                      >
                        <span>Consult Cross-Border Lawyers</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print / Save Assessment</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: THE TWO-WILL STRATEGY */}
            <section
              id="two-will-strategy"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  PRIVATE INTERNATIONAL LAW &bull; JURISDICTIONAL HARMONY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                3. Two-Will Strategy: Lex Loci Rei Sitae &amp; Jurisdiction
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Under the legal rule of <em>lex loci rei sitae</em>, real estate is governed by the laws of the place where it sits. This principle is set out in Section 5 of the Indian Succession Act. Foreign courts have no direct authority over Indian property records.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                Because of this rule, orders from probate courts in California, London, or Toronto are not recognized by Indian land registries. The Two-Will Strategy solves this problem. It divides your estate into two safe legal compartments.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2 text-sm">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Will 1: Foreign Domicile Will</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This Will covers your overseas home, 401(k), pensions, local bank accounts, and cars. It explicitly states that it does not cover any assets located in India.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2 text-sm">
                    <Landmark className="w-4 h-4 text-[#5F7E75]" />
                    <span>Will 2: Dedicated Indian Will</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This Will covers your Indian apartments, plots, bank deposits, and shares. It contains a non-revocation clause that protects your foreign Will from cancellation.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>The Revocation Trap:</strong> Standard Will templates abroad often say: <em>&ldquo;I revoke all previous Wills.&rdquo;</em> If you sign a foreign Will with this clause, it cancels your Indian Will. A Two-Will strategy prevents this accidental loss.
                </div>
              </div>
            </section>

            {/* SECTION 3: FEMA SUCCESSION RULES */}
            <section
              id="fema-regulations"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  RESERVE BANK OF INDIA &bull; STATUTORY FRAMEWORK
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                4. FEMA Succession Rules: Section 6(5) &amp; Land Rights
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                The Reserve Bank of India regulates Indian property owned by NRIs and OCIs under the Foreign Exchange Management Act (FEMA), 1999 and the FEMA Non-Debt Instruments Rules, 2019.
              </p>

              <div className="rounded-xl border border-slate-200 overflow-hidden mb-6">
                <div className="bg-[#172228] text-white p-3 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>FEMA Succession &amp; Acquisition Matrix for NRIs / OCIs</span>
                  <span className="text-rose-300 font-mono">FEMA (NDI) Rules 2019</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Asset Category</th>
                        <th className="p-3">Direct Purchase</th>
                        <th className="p-3">Inheritance via Will</th>
                        <th className="p-3">Subsequent Sale Rule</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Residential Property (Flats / Plots)</td>
                        <td className="p-3 text-emerald-700 font-bold">Permitted (General Permission)</td>
                        <td className="p-3 text-emerald-700 font-bold">Permitted (Section 6(5))</td>
                        <td className="p-3">Can sell to Resident, NRI, or OCI</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Commercial Office / Showroom</td>
                        <td className="p-3 text-emerald-700 font-bold">Permitted (General Permission)</td>
                        <td className="p-3 text-emerald-700 font-bold">Permitted (Section 6(5))</td>
                        <td className="p-3">Can sell to Resident, NRI, or OCI</td>
                      </tr>
                      <tr className="bg-rose-50/50">
                        <td className="p-3 font-bold text-rose-950">Agricultural Land / Farmhouses</td>
                        <td className="p-3 text-rose-700 font-bold">STRICTLY PROHIBITED</td>
                        <td className="p-3 text-emerald-700 font-bold">Permitted under Valid Will</td>
                        <td className="p-3 font-bold text-rose-900">
                          MUST be sold ONLY to Resident Indian Citizen
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">NRE / NRO Bank Accounts</td>
                        <td className="p-3 text-emerald-700 font-bold">Permitted</td>
                        <td className="p-3 text-emerald-700 font-bold">Transferred to Heirs</td>
                        <td className="p-3">Repatriable up to USD 1M/FY</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Indian Listed Shares &amp; Mutual Funds</td>
                        <td className="p-3 text-emerald-700 font-bold">Permitted (PIS / Non-PIS)</td>
                        <td className="p-3 text-emerald-700 font-bold">Transmitted via DP Form</td>
                        <td className="p-3">Sale proceeds credit to NRO account</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>Agricultural Land Rules:</strong> An NRI or OCI cannot buy farmland in India. However, Section 6(5) allows you to inherit farmland through an Indian Will. If you inherit farmland, you can only sell it to an Indian citizen who lives in India.
              </p>
            </section>

            {/* SECTION 4: STRATEGY COMPARISON TABLE */}
            <section
              id="strategy-comparison"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  STRATEGIC EVALUATION &bull; HEAD-TO-HEAD MATRIX
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                5. Strategy Comparison: Single Foreign Will vs Two Wills
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                Compare the single foreign Will approach with the Two-Will strategy below. Notice how having an Indian Will saves time, money, and court stress:
              </p>

              <div className="rounded-xl border border-slate-200 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left min-w-[620px]">
                    <thead className="bg-[#172228] text-white font-bold">
                      <tr>
                        <th className="p-3.5">Execution Parameter</th>
                        <th className="p-3.5 bg-rose-950/60 text-rose-200">Single Foreign Will Pathway</th>
                        <th className="p-3.5 bg-emerald-950/60 text-emerald-200">The NRI Two-Will Strategy</th>
                        <th className="p-3.5">Risk &amp; Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Time to Access Indian Assets</td>
                        <td className="p-3 text-rose-700 font-bold">14 to 30 Months (Dual Courts)</td>
                        <td className="p-3 text-emerald-700 font-bold">2 to 4 Months (Direct Transfer)</td>
                        <td className="p-3 text-slate-500">Saves 1+ years of frozen assets</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Indian High Court Petition</td>
                        <td className="p-3 text-rose-700 font-bold">Mandatory under Section 228 ISA</td>
                        <td className="p-3 text-emerald-700 font-bold">Not required (except presidency cities)</td>
                        <td className="p-3 text-slate-500">Eliminates court litigation</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Legal Documentation Costs</td>
                        <td className="p-3 text-rose-700 font-bold">High: Foreign probate + Apostille + India lawyers</td>
                        <td className="p-3 text-emerald-700 font-bold">Low: One-time drafting fee (₹4,999)</td>
                        <td className="p-3 text-slate-500">Saves thousands in court fees</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Real Estate Mutation at SRO</td>
                        <td className="p-3 text-rose-700 font-bold">Rejected until Indian court re-seals Will</td>
                        <td className="p-3 text-emerald-700 font-bold">Direct municipal mutation on Will basis</td>
                        <td className="p-3 text-slate-500">Immediate property title transfer</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">NRO Bank Account Release</td>
                        <td className="p-3 text-rose-700 font-bold">Bank legal department rejects foreign decrees</td>
                        <td className="p-3 text-emerald-700 font-bold">Fast release with death certificate &amp; Will</td>
                        <td className="p-3 text-slate-500">Smooth funds release</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Accidental Revocation Risk</td>
                        <td className="p-3 text-rose-700 font-bold">Severe: Boilerplate clauses wipe out Indian Will</td>
                        <td className="p-3 text-emerald-700 font-bold">Zero: Explicit territorial ring-fencing</td>
                        <td className="p-3 text-slate-500">Complete legal certainty</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  Ready to protect your Indian assets with a Two-Will strategy?
                </span>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172228] text-white text-xs font-bold hover:bg-[#2C3E49] transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Start Your Indian Will</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            {/* SECTION 5: SECTION 228 ISA 1925 */}
            <section
              id="section-228-probate"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Gavel className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  STATUTORY RE-SEALING &bull; SECTION 228 EXPLAINED
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                6. Section 228 ISA 1925: The Foreign Probate Hurdle
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Many NRIs think foreign court probate grants work directly in India. Indian banks and land registries do not accept foreign court grants. They cannot act on decrees from courts outside India.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                Section 228 of the Indian Succession Act governs foreign Wills. When a foreign Will is proved abroad, heirs must go through a four-step legal process in India:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="text-xs sm:text-sm">
                    <strong className="text-slate-900 block mb-0.5">Get Court Authenticated Copy</strong>
                    The family must get an authenticated copy of the foreign Will and probate grant from the foreign court.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="text-xs sm:text-sm">
                    <strong className="text-slate-900 block mb-0.5">Apostille or Embassy Attestation</strong>
                    Foreign records must get apostille verification or attestation at the nearest Indian Embassy.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="text-xs sm:text-sm">
                    <strong className="text-slate-900 block mb-0.5">File Ancillary Petition in India</strong>
                    An Indian advocate must file a petition under Section 228 in an Indian court for Letters of Administration.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div className="text-xs sm:text-sm">
                    <strong className="text-slate-900 block mb-0.5">Newspaper Notices and Objections</strong>
                    The court publishes notices in local newspapers. If a relative files an objection, delays increase.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-950 font-medium">
                <strong>Why This Matters:</strong> Having a separate Indian Will avoids Section 228 entirely. The Indian Will acts on its own, allowing direct property name transfer and bank fund release.
              </div>
            </section>

            {/* SECTION 6: VISUAL BLUEPRINT INFOGRAPHIC */}
            <section
              id="visual-blueprint"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  VISUAL BLUEPRINT &bull; CROSS-BORDER SUCCESSION PATHWAYS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                7. Succession Visual Blueprint: Cross-Border Flowchart
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                The visual flowchart below compares Path A (relying only on a foreign Will) with Path B (the Two-Will Strategy):
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-[#FAF7F0] p-2 sm:p-4 mb-4 shadow-xs">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/nri-two-will-strategy-infographic.svg"
                    alt="NRI Two-Will Strategy Infographic for Indian Property and Cross-Border Assets"
                    width={1200} height={675}
                    className="absolute inset-0 w-full h-full object-contain hover:scale-[1.01] transition-transform duration-300"
                    priority={false}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 gap-2">
                <span>Figure 1: Cross-Border Succession Flow &bull; Indian Succession Act 1925 &amp; FEMA 1999</span>
                <a
                  href="/images/nri-two-will-strategy-infographic.svg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#C65378] font-bold hover:underline"
                >
                  <span>View High-Resolution SVG</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP EXECUTION PROTOCOL */}
            <section
              id="execution-protocol"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  OPERATIONAL PROTOCOL &bull; STEP-BY-STEP EXECUTION
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                8. Execution Protocol: How NRIs Sign an Indian Will Abroad
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                You do not need to travel to India to sign a valid Indian Will. Under Section 63 of the Indian Succession Act, you can sign it in your home country:
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    step: 1,
                    title: "List Your Indian Assets and Numbers",
                    desc: "List your Indian properties, society share numbers, NRE and NRO bank accounts, Demat accounts, and PAN details.",
                  },
                  {
                    step: 2,
                    title: "Add Territorial and Non-Revocation Clauses",
                    desc: "State that the Will covers only assets in India. Make sure it states clearly that it does not cancel your foreign Will.",
                  },
                  {
                    step: 3,
                    title: "Print on Standard Plain A4 Paper",
                    desc: "Wills do not require Indian stamp paper. Under the Indian Stamp Act, Wills are 100% exempt from stamp duty across India.",
                  },
                  {
                    step: 4,
                    title: "Sign Before Two Independent Witnesses",
                    desc: "Sign each page before two adult witnesses who are with you in person. Witnesses must not be beneficiaries under the Will.",
                  },
                  {
                    step: 5,
                    title: "Optional: Notary or Consular Attestation",
                    desc: "Getting your signature notarized locally or stamped at an Indian Consulate adds strong proof of your identity.",
                  },
                  {
                    step: 6,
                    title: "Share Copies with Your Indian Executor",
                    desc: "Store your original signed Will safely. Send certified copies to your named executor in India.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 sm:p-5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-start gap-4"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#172228] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Section 67 Rule:</strong> Under Section 67, any bequest made to an attesting witness is void. Always use independent witnesses who are not your heirs.
                </span>
              </div>
            </section>

            {/* SECTION 8: 2X2 ASSET PROTECTION GRID */}
            <section
              id="asset-protection-grid"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  WEALTH SHIELD &bull; FOUR ASSET DEFENSE PILLARS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                9. 2x2 Asset Protection Grid: Protecting Overseas Wealth
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                A dedicated Indian Will protects each asset class against delays, disputes, and penalties:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    Real Estate &amp; Apartment Mutation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Lets your named executor submit the Will directly to the Sub-Registrar and Municipal Corporation to transfer title deeds and society share certificates cleanly.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    NRE &amp; NRO Bank Accounts
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Overrides conflicting bank nominee claims. Under Supreme Court law, nominees are only caretakers. A Will names the true owner and speeds up fund release.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    Demat Shares &amp; Mutual Funds
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Follows SEBI transmission rules. Gives depositories clear legal proof to transfer share portfolios to your heirs without requiring court succession certificates.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#C65378] flex items-center justify-center mb-3">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    Family Businesses &amp; Private LLPs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Prevents deadlocks in private companies. Passes voting shares and partnership rights to your chosen heirs under Section 56 of the Companies Act.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: REPATRIATION MATRIX */}
            <section
              id="repatriation-matrix"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  CROSS-BORDER BANKING &bull; RBI REPATRIATION SOP
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                10. Repatriation Matrix: NRO to NRE Remittance Compliance
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                After inheriting assets, NRI heirs often want to convert rupees into foreign currency and send them home. The Reserve Bank of India permits this under the NRI Repatriation Facility.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                You can remit up to 1 million US Dollars every financial year by following three simple steps:
              </p>

              <div className="rounded-xl border border-slate-200 overflow-hidden mb-6">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#172228] text-white font-bold">
                    <tr>
                      <th className="p-3">Stage</th>
                      <th className="p-3">Regulatory Requirement</th>
                      <th className="p-3">Statutory Form / Filing</th>
                      <th className="p-3">Permitted Limit &amp; Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Stage 1: Asset Sale</td>
                      <td className="p-3">Sale proceeds of real estate or deposits credited to your NRO account.</td>
                      <td className="p-3">Registered Sale Deed, Death Certificate, Indian Will</td>
                      <td className="p-3">No limit in INR; takes 15–30 days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Stage 2: Tax Check</td>
                      <td className="p-3">Verification that capital gains tax on property sale is cleared.</td>
                      <td className="p-3 font-bold text-[#C65378]">Form 15CA (Taxpayer) &amp; Form 15CB (CA Certificate)</td>
                      <td className="p-3">Direct inheritance is tax-free; 7–14 days for CA review</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Stage 3: Outward Wire</td>
                      <td className="p-3">Bank executes wire transfer to your overseas account.</td>
                      <td className="p-3">A2 Form and FEMA declaration to your bank</td>
                      <td className="p-3 font-bold text-emerald-700">Up to USD 1,000,000 per financial year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <strong>Tax-Free Inheritance:</strong> Under Section 56(2)(x) of the Indian Income Tax Act, assets received under a Will are tax-free in India. Capital gains tax applies only if you later sell the property.
              </div>
            </section>

            {/* SECTION 10: PROCEDURAL TIMELINE */}
            <section
              id="transmission-timeline"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  POST-DEATH TIMELINE &bull; TRANSMISSION MILESTONES
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                11. Post-Death Transmission Timeline: NRI Asset Recovery
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                Below is the expected timeline for settling Indian assets with an Indian Will compared to a foreign Will:
              </p>

              <div className="rounded-xl border border-slate-200 overflow-hidden mb-6">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#172228] text-white font-bold">
                    <tr>
                      <th className="p-3">Milestone</th>
                      <th className="p-3">With Dedicated Indian Will</th>
                      <th className="p-3">With Foreign Will Only (Section 228)</th>
                      <th className="p-3">Action Item</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Weeks 1–3</td>
                      <td className="p-3 text-emerald-700 font-semibold">Death Certificate issued &amp; executor notifies bank</td>
                      <td className="p-3 text-rose-700 font-semibold">Waiting for foreign country probate to commence</td>
                      <td className="p-3">Locate original signed Will</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Weeks 4–8</td>
                      <td className="p-3 text-emerald-700 font-semibold">Bank accounts unblocked; Demat transmission started</td>
                      <td className="p-3 text-rose-700 font-semibold">Overseas probate hearings in US/UK court</td>
                      <td className="p-3">Submit KYC &amp; Will to Indian banks</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Month 3</td>
                      <td className="p-3 text-emerald-700 font-semibold">Municipal property mutation complete</td>
                      <td className="p-3 text-rose-700 font-semibold">Overseas probate granted; apostille process begins</td>
                      <td className="p-3">Update land registry records</td>
                    </tr>
                    <tr className="bg-rose-50/50">
                      <td className="p-3 font-bold text-slate-900">Months 6–18</td>
                      <td className="p-3 text-emerald-700 font-bold">Estate fully distributed; funds repatriated</td>
                      <td className="p-3 text-rose-700 font-bold">Section 228 petition filed in Indian High Court</td>
                      <td className="p-3">Attend court hearings &amp; notices</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: FOUR SPECIALIZED SCENARIOS */}
            <section
              id="specialized-scenarios"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  CASE STUDIES &bull; COMPLEX CROSS-BORDER STRUCTURES
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                12. Four Specialized Cross-Border Succession Scenarios
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                Different legal rules apply based on your domicile and asset setup:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                    US Living Trusts vs. Indian Real Estate
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    US Living Trusts help avoid state probate in the US. However, Indian land registries do not recognize foreign trust deeds. Moving Indian real estate into a US trust also violates FEMA rules. You still need an Indian Will.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                    UAE Residents and DIFC Wills Courts
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Non-Muslims in the UAE can register Wills under DIFC or Abu Dhabi courts. However, DIFC court orders cannot be executed in Indian courts directly. A companion Indian Will is needed for your Indian flats.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                    OCI Cardholders Inheriting Farm Land
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    OCI holders have the same inheritance rights as Indian citizens under Section 6(5) of FEMA. However, land records require clear clauses stating your OCI card number and Indian PAN to prevent tax delays.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                    Foreign Executors &amp; Power of Attorney
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Appointing an executor who lives outside India can cause trouble. They may struggle to visit banks and land registries in person. Appointing a resident relative or legal firm as co-executor is much safer.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL BACKING */}
            <section
              id="institutional-backing"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  AMA LEGAL SOLUTIONS &bull; INSTITUTIONAL CREDIBILITY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                13. Institutional Backing: AMA Legal Solutions Advantage
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                WillDrafting.in is powered by <strong>AMA Legal Solutions</strong>, a trusted succession law firm in India. Every template and diagnostic tool on our site is designed and updated by practicing High Court advocates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <span className="text-2xl font-extrabold text-[#172228] block">15+</span>
                  <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
                    Years High Court Practice
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <span className="text-2xl font-extrabold text-[#172228] block">10,000+</span>
                  <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
                    Cross-Border Clients
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  <span className="text-2xl font-extrabold text-[#172228] block">100%</span>
                  <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
                    FEMA &amp; ISA Compliance
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#172228] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm sm:text-base">Need a Custom Cross-Border Legal Opinion?</h4>
                  <p className="text-xs text-slate-300">
                    Schedule a confidential video consultation with senior succession lawyers.
                  </p>
                </div>
                <a
                  href="/services/nri-will-india"
                  className="px-6 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-all whitespace-nowrap"
                >
                  Book NRI Legal Consult
                </a>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section
              id="frequently-asked-questions"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  EXPERT LEGAL ANSWERS &bull; STATUTORY FAQ
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                14. Frequently Asked Questions: NRI Wills in India
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-6">
                Clear answers to common questions regarding cross-border succession, witness rules abroad, and FEMA regulations:
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 overflow-hidden transition-all bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF7F0]/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: CITATIONS & OFFICIAL PORTALS */}
            <section
              id="statutory-citations"
              className="scroll-target rounded-2xl bg-white border border-[#172228]/10 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  VERIFIED SOURCES &bull; LEGAL CITATIONS &amp; LINKS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                15. Statutory Citations &amp; Verified Official Resources
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                This diagnostic framework is grounded in Indian statutory law, Supreme Court precedents, and RBI master directions:
              </p>

              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 mb-6 leading-relaxed">
                <li>
                  <strong>Indian Succession Act, 1925:</strong> Section 5 (Lex loci rei sitae), Section 57 (Applicability), Section 63 (Execution formalities), Section 67 (Witness forfeiture), Section 213 (Probate rules), Section 228 (Foreign Wills ancillary grant).
                </li>
                <li>
                  <strong>Foreign Exchange Management Act, 1999:</strong> Section 6(5) (Inheritance by persons resident outside India).
                </li>
                <li>
                  <strong>FEMA (Non-Debt Instruments) Rules, 2019:</strong> Rule 24 &amp; Rule 31 (Acquisition and transfer of immovable property in India by NRIs and OCIs).
                </li>
                <li>
                  <strong>Reserve Bank of India Master Directions:</strong> Remittance of Assets Facility for Non-Resident Indians (USD 1,000,000 scheme).
                </li>
                <li>
                  <strong>Income Tax Act, 1961:</strong> Section 56(2)(x) (Tax exemption on testamentary inheritances) and Form 15CA/15CB electronic certification.
                </li>
              </ul>

              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-900 block mb-2">Verified Government Portals:</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-slate-200 text-slate-700 text-xs hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    <span>Reserve Bank of India (RBI)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.mea.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-slate-200 text-slate-700 text-xs hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    <span>Ministry of External Affairs (MEA)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://eportal.incometax.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-slate-200 text-slate-700 text-xs hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    <span>Income Tax e-Filing (Form 15CA/CB)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-900 block mb-2">Related WillDrafting Guides &amp; Tools:</span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/services/nri-will-india"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    <span>NRI Will Drafting Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/blogs/nri-will-for-indian-property-two-will-strategy"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    <span>The Two-Will Strategy Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    <span>Probate Requirement Checker</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/tools/will-checklist"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    <span>Documents Required for Will</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (AUTHOR, CTA & TRUST CARDS)
              ===================================================================== */}
          <aside className="space-y-6 sticky top-6">
            <div className="bg-white rounded-2xl border border-[#172228]/10 shadow-xs p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-[#C65378]/20 flex items-center justify-center text-sm font-bold text-[#C65378] shrink-0">
                  AAM
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/in/iamanujmalik/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-slate-900 hover:text-[#C65378] transition-colors block text-sm"
                  >
                    Advocate Anuj Anand Malik
                  </a>
                  <span className="text-[11px] text-[#C65378] font-bold block uppercase tracking-wider">
                    Senior Succession Counsel
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Specialist in cross-border estate succession, FEMA compliance, and High Court probate matters with over 15 years of experience advising NRI families globally.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#55636D]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                  <span>Verified Legal Author</span>
                </span>
                <a
                  href="https://www.linkedin.com/in/iamanujmalik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077b5] font-semibold hover:underline"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6 desktop-sidebar-only">
<div className="hidden lg:block rounded-2xl bg-[#172228] text-white p-6 shadow-md text-center border border-white/10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-[10px] font-bold uppercase tracking-wider mb-4">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL NRI ADVISORY</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                Own Property or NRE/NRO Accounts in India?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
                Avoid the 14-month Section 228 court trap. Draft a legally valid Indian Will on plain A4 paper from abroad in 15 minutes.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all text-xs cursor-pointer shadow-md mb-3"
              >
                <span>Draft NRI Will Online &bull; ₹4,999</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all border border-white/15"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confidential NRI Legal Desk</span>
              </Link>
            </div>

            <div className="hidden lg:block bg-white rounded-2xl border border-[#172228]/10 shadow-xs p-5">
              <span className="text-xs font-bold text-slate-900 block mb-3 uppercase tracking-wider">
                Why NRIs Trust WillDrafting
              </span>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Section 63 ISA Compliant:</strong>
                    Valid on plain paper with 2 independent witnesses abroad.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">FEMA Compliant:</strong>
                    Incorporates Section 6(5) land and NRE/NRO remittance clauses.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Zero Stamp Duty:</strong>
                    No Indian stamp paper or consular travel required.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Advocate Backed:</strong>
                    Every draft reviewed by AMA Legal Solutions attorneys.
                  </div>
                </li>
              </ul>
            </div>

            <div className="hidden lg:block bg-white rounded-2xl border border-[#172228]/10 shadow-xs p-5">
              <span className="text-xs font-bold text-slate-900 block mb-3 uppercase tracking-wider">
                Cross-Border Legal Guides
              </span>
              <div className="space-y-2.5">
                <Link
                  href="/services/nri-will-india"
                  className="block p-2.5 rounded-xl border border-slate-200 hover:border-[#C65378] hover:bg-rose-50/30 transition-all text-xs group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-[#C65378] flex items-center justify-between">
                    <span>NRI Will Drafting Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Custom drafting &amp; Sub-Registrar guidance
                  </span>
                </Link>

                <Link
                  href="/blogs/nri-will-for-indian-property-two-will-strategy"
                  className="block p-2.5 rounded-xl border border-slate-200 hover:border-[#C65378] hover:bg-rose-50/30 transition-all text-xs group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-[#C65378] flex items-center justify-between">
                    <span>The Two-Will Strategy Guide</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Lex loci rei sitae &amp; foreign probate defense
                  </span>
                </Link>

                <Link
                  href="/tools/probate-checker"
                  className="block p-2.5 rounded-xl border border-slate-200 hover:border-[#C65378] hover:bg-rose-50/30 transition-all text-xs group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-[#C65378] flex items-center justify-between">
                    <span>Is Probate Required in India?</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Mumbai, Chennai &amp; Kolkata rules
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
                  href="/services/nri-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  NRI Will Drafting Service
                </Link>
                <Link
                  href="/tools/probate-checker"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Is Probate Required in India?
                </Link>
                <Link
                  href="/tools/will-checklist"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Preparation Checklist
                </Link>
                <Link
                  href="/services/succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Succession Certificate Lawyers
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
