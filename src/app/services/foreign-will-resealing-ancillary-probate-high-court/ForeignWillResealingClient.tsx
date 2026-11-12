"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Scale,
  Globe,
  Landmark,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Copy,
  CheckCheck,
  Calculator,
  Compass,
  ChevronDown,
  Check,
  ArrowUpRight,
  Award,
} from "lucide-react";

// Table of Contents Items (matching H2/H3 IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "section-228-framework", label: "1. Section 228 ISA Fast-Track Framework" },
  { id: "high-court-calculator", label: "2. High Court Fee & Timeline Calculator" },
  { id: "high-court-matrix", label: "3. High Court Comparison Matrix" },
  { id: "five-step-roadmap", label: "4. Step-by-Step Procedural Roadmap" },
  { id: "embassy-checklist", label: "5. Embassy Apostille Checklist" },
  { id: "resealing-vs-de-novo", label: "6. Resealing vs De Novo Probate" },
  { id: "nri-case-studies", label: "7. Real NRI Cross-Border Case Studies" },
  { id: "statutory-authorities", label: "8. Statutory Citations & Precedents" },
  { id: "frequently-asked-questions", label: "9. Frequently Asked Questions" },
];

interface HighCourtConfig {
  courtName: string;
  benchLocation: string;
  territorialReach: string;
  courtFeeFormula: (val: number) => number;
  courtFeeDescription: string;
  citationNorms: string;
  expectedDurationMonths: string;
}

const HIGH_COURT_CONFIGS: Record<string, HighCourtConfig> = {
  bombay: {
    courtName: "Bombay High Court (Original Side)",
    benchLocation: "Fort, Mumbai",
    territorialReach: "Greater Mumbai with Pan-India Section 273 Endorsement",
    courtFeeFormula: (val: number) => {
      if (val <= 50000) return Math.min(val * 0.02, 1000);
      if (val <= 200000) return 4000;
      if (val <= 300000) return 6000;
      return 75000; // Statutory maximum cap under Maharashtra Court Fees Act
    },
    courtFeeDescription: "Capped at max Rs 75,000 under Maharashtra Court Fees Act Schedule I Article 11",
    citationNorms: "Two public notices: Free Press Journal (English) and Navshakti (Marathi)",
    expectedDurationMonths: "4 to 6 months",
  },
  delhi: {
    courtName: "Delhi High Court (Original Side)",
    benchLocation: "Sher Shah Road, New Delhi",
    territorialReach: "NCT of Delhi (Estates above Rs 2 Crore) with Pan-India Endorsement",
    courtFeeFormula: (val: number) => {
      return Math.min(val * 0.04, 250000);
    },
    courtFeeDescription: "Ad-valorem rate of about 3% to 4% under Court Fees Act for Delhi",
    citationNorms: "Two daily papers: Hindustan Times (English) and Navbharat Times (Hindi)",
    expectedDurationMonths: "4 to 7 months",
  },
  calcutta: {
    courtName: "Calcutta High Court (Original Side)",
    benchLocation: "Esplanade, Kolkata",
    territorialReach: "Kolkata City and West Bengal with Pan-India Endorsement",
    courtFeeFormula: (val: number) => {
      return Math.min(val * 0.03, 150000);
    },
    courtFeeDescription: "Tiered rate of about 2.5% to 3.5% under West Bengal Court Fees Act",
    citationNorms: "Two papers: The Statesman / Telegraph (English) and Bartaman (Bengali)",
    expectedDurationMonths: "5 to 8 months",
  },
  madras: {
    courtName: "Madras High Court (Original Side)",
    benchLocation: "George Town, Chennai",
    territorialReach: "Chennai City and Tamil Nadu with Pan-India Endorsement",
    courtFeeFormula: (val: number) => {
      return Math.min(val * 0.03, 120000);
    },
    courtFeeDescription: "Ad-valorem schedule under Tamil Nadu Court Fees and Suits Valuation Act",
    citationNorms: "Two daily papers: The Hindu (English) and Dina Thanthi (Tamil)",
    expectedDurationMonths: "4 to 7 months",
  },
};

const COUNTRY_AUTH_CONFIG: Record<
  string,
  {
    countryName: string;
    authType: "Hague Apostille" | "Consular Legalization";
    designatedAuthority: string;
    exemplificationDocument: string;
    averageProcurementWeeks: string;
  }
> = {
  usa: {
    countryName: "United States of America",
    authType: "Hague Apostille",
    designatedAuthority: "Secretary of State of the court state",
    exemplificationDocument: "Exemplified Copy of Letters Testamentary under court seal",
    averageProcurementWeeks: "3 to 6 weeks",
  },
  uk: {
    countryName: "United Kingdom (England & Wales)",
    authType: "Hague Apostille",
    designatedAuthority: "FCDO Legalisation Office",
    exemplificationDocument: "Exemplified Grant of Probate from High Court of Justice",
    averageProcurementWeeks: "2 to 4 weeks",
  },
  canada: {
    countryName: "Canada (Ontario, BC, Alberta)",
    authType: "Hague Apostille",
    designatedAuthority: "Global Affairs Canada or Provincial Ministry",
    exemplificationDocument: "Certificate of Appointment of Estate Trustee under court seal",
    averageProcurementWeeks: "4 to 6 weeks",
  },
  australia: {
    countryName: "Australia (NSW, Victoria)",
    authType: "Hague Apostille",
    designatedAuthority: "Department of Foreign Affairs and Trade (DFAT)",
    exemplificationDocument: "Exemplified Grant of Probate under Supreme Court seal",
    averageProcurementWeeks: "3 to 5 weeks",
  },
  singapore: {
    countryName: "Singapore",
    authType: "Hague Apostille",
    designatedAuthority: "Singapore Academy of Law (SAL)",
    exemplificationDocument: "Certified True Copy from Family Justice Courts",
    averageProcurementWeeks: "1 to 2 weeks",
  },
  uae: {
    countryName: "United Arab Emirates",
    authType: "Consular Legalization",
    designatedAuthority: "UAE MOFA plus Indian Embassy",
    exemplificationDocument: "DIFC Wills Court Grant or Dubai Civil Court Order",
    averageProcurementWeeks: "4 to 7 weeks",
  },
};

const COMPARISON_ROWS = [
  {
    parameter: "Governing Law & Section",
    resealing: "Section 228 of Indian Succession Act, 1925",
    deNovo: "Section 276 of Indian Succession Act, 1925",
  },
  {
    parameter: "Witness Testimony",
    resealing: "Exempt. The foreign probate order is conclusive proof.",
    deNovo: "Mandatory. At least one witness must depose in India.",
  },
  {
    parameter: "Testator Mental Health",
    resealing: "Already proved abroad. Indian courts do not re-hear it.",
    deNovo: "Must be proved afresh with old medical records.",
  },
  {
    parameter: "Original Will Paper",
    resealing: "Not needed. A sealed court copy is accepted.",
    deNovo: "Mandatory. You must submit the original physical Will.",
  },
  {
    parameter: "Average Time Taken",
    resealing: "4 to 6 months in Bombay, Delhi, Calcutta, or Madras.",
    deNovo: "3 to 5 years with repeated witness summons.",
  },
  {
    parameter: "Caveat Dispute Risk",
    resealing: "Very narrow. Opponents cannot re-argue execution.",
    deNovo: "High. Relatives can claim undue influence.",
  },
  {
    parameter: "Executor Travel to India",
    resealing: "Zero. Done through a Special Power of Attorney.",
    deNovo: "Often needed for witness checks and trial hearings.",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "item-1",
    title: "1. Exemplified Foreign Probate Copy",
    detail: "Official copy from foreign court with presiding judge certificate and court seal.",
  },
  {
    id: "item-2",
    title: "2. Sealed Copy of Probated Will",
    detail: "Full text of the Will and codicils bearing foreign court stamps on each page.",
  },
  {
    id: "item-3",
    title: "3. Hague Apostille Certificate",
    detail: "Apostille seal from state office in US, UK, Canada, or Australia.",
  },
  {
    id: "item-4",
    title: "4. Certified Death Certificate",
    detail: "Government death record issued by overseas civil vital statistics registry.",
  },
  {
    id: "item-5",
    title: "5. Special Power of Attorney (SPA)",
    detail: "SPA signed by overseas executor appointing Indian High Court counsel.",
  },
  {
    id: "item-6",
    title: "6. Section 18 Stamp Duty Adjudication",
    detail: "Formal stamp duty paid in India within 3 months of SPA arrival.",
  },
  {
    id: "item-7",
    title: "7. Asset Schedule for India",
    detail: "Property deeds, tax receipts, bank statements, and share demat folios.",
  },
  {
    id: "item-8",
    title: "8. Government Valuation Report",
    detail: "Valuation certificate to compute exact court fees for the High Court.",
  },
];

const FAQS = [
  {
    q: "What is foreign will resealing under Section 228 of the Indian Succession Act?",
    a: "When a Will has already been probated abroad, Indian High Courts grant Letters of Administration under Section 228 with the foreign Will attached. This process is fast. It bypasses proving the Will again with original witnesses.",
  },
  {
    q: "Can an NRI sell inherited property in Mumbai or Delhi directly with a US or UK probate?",
    a: "No. Foreign probate orders have no direct power in India. Sub-Registrars and banks require an Indian court order. Under Section 213 and Section 228, you must get ancillary Letters of Administration from an Indian High Court first.",
  },
  {
    q: "Does an NRI executor need to travel to India for Section 228 High Court proceedings?",
    a: "No. Under Section 241, you can appoint an Indian advocate using a Special Power of Attorney (SPA). The SPA is signed abroad, apostilled, and stamped in India under Section 18. You do not need to fly to India.",
  },
  {
    q: "Why is Section 228 faster than filing a regular domestic probate petition in India?",
    a: "A regular probate suit under Section 276 requires original witnesses to give evidence. That can take 3 to 5 years. Under Section 228, the foreign probate is proof of execution. The court only checks assets and issues public notice.",
  },
  {
    q: "What is the court fee for foreign will resealing in Bombay High Court?",
    a: "Under the Maharashtra Court Fees Act, the fee is capped at a maximum of Rs 75,000 for estates over Rs 3 Lakhs. This makes Bombay High Court very cost-effective for high-value properties in Mumbai.",
  },
  {
    q: "What court documents are required from the foreign probate court?",
    a: "You need an exemplified copy of the probate grant and Will under the foreign court seal. You also need a Hague Apostille Certificate or Indian Embassy attestation, along with the death certificate.",
  },
  {
    q: "Does an ancillary grant by Bombay or Delhi High Court cover properties across other Indian states?",
    a: "Yes. When the High Court issues Letters of Administration with a Section 273 endorsement, the grant covers all assets across India. You do not need to file separate cases in each state.",
  },
  {
    q: "What happens if a legal heir files an objection or caveat against the foreign will in India?",
    a: "If a relative files a caveat, grounds to object are very narrow. Under Supreme Court law, heirs cannot re-argue Will execution if they took part in the foreign probate case abroad.",
  },
  {
    q: "How long does it take to obtain Section 228 Letters of Administration in Indian High Courts?",
    a: "An uncontested case takes 4 to 6 months. This covers 4 weeks for foreign court copies, 3 weeks for petition filing, 30 days for newspaper notice, and 4 weeks for final court grant sealing.",
  },
  {
    q: "How are sale proceeds repatriated abroad after obtaining Section 228 ancillary probate?",
    a: "After the High Court grant is sealed, you mutate property records and complete the sale. Under RBI rules, you can remit up to USD 1,000,000 per financial year using Form 15CA and Form 15CB tax forms.",
  },
];

export default function ForeignWillResealingClient() {
  const router = useRouter();

  const handleConsultation = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    router.push("/contact");
  };

  const [activeId, setActiveId] = useState<string>("section-228-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedRoadmap, setCopiedRoadmap] = useState<boolean>(false);

  // Calculator states
  const [selectedCourt, setSelectedCourt] = useState<string>("bombay");
  const [selectedCountry, setSelectedCountry] = useState<string>("usa");
  const [estateValuation, setEstateValuation] = useState<number>(35000000); // Rs 3.50 Cr default
  const [assetType, setAssetType] = useState<"immovable" | "movable" | "mixed">("mixed");
  const [hasDisputeRisk, setHasDisputeRisk] = useState<boolean>(false);

  const courtConfig = HIGH_COURT_CONFIGS[selectedCourt] || HIGH_COURT_CONFIGS.bombay;
  const countryConfig = COUNTRY_AUTH_CONFIG[selectedCountry] || COUNTRY_AUTH_CONFIG.usa;

  const estimatedCourtFee = useMemo(() => {
    return courtConfig.courtFeeFormula(estateValuation);
  }, [courtConfig, estateValuation]);

  const estimatedTimeline = useMemo(() => {
    if (hasDisputeRisk) {
      return "7 to 10 months (allows time for reply to caveat)";
    }
    return `${courtConfig.expectedDurationMonths} (fast-track Section 228)`;
  }, [hasDisputeRisk, courtConfig]);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
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
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `MANDATORY STATUTORY CHECKLIST: FOREIGN WILL RESEALING UNDER SECTION 228 ISA
(High Courts of Bombay, Delhi, Calcutta & Madras):

1. Triple-Certified Exemplified Copy of Foreign Probate under Foreign Court Seal.
2. Certified Copy of the Probated Last Will and Codicils Annexed.
3. Hague Apostille Certificate (USA, UK, Australia, Canada) or Indian Embassy Consular Legalization.
4. Certified Death Certificate issued by Foreign Civil Vital Statistics Authority.
5. Special Power of Attorney (SPA) executed abroad appointing High Court Advocate under Section 241 ISA.
6. Section 18 Indian Stamp Act Adjudication of SPA within 3 months of receipt in India.
7. Complete Schedule of Indian Assets with Registered Title Deeds & Municipal Tax Receipts.
8. Valuation Affidavit from Government Approved Valuer for High Court fee determination.
9. Petition for Letters of Administration with Copy of Will Annexed under Section 228 ISA.
10. Affidavit of Assets with Section 273 Proviso Pan-India Endorsement Prayer.

Official Resource: https://www.willdrafting.in/services/foreign-will-resealing-ancillary-probate-high-court`;

    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  const copyRoadmapToClipboard = () => {
    const roadmapText = `5-STEP SECTION 228 ANCILLARY PROBATE ROADMAP FOR HIGH COURTS:

STEP 1: Foreign Probate Exemplification (Weeks 1 to 4)
Get an exemplified copy of foreign probate and Will under seal of the foreign court.

STEP 2: Hague Apostille / Consular Legalization (Weeks 4 to 8)
Apostille the court record via state office (US Sec of State / UK FCDO / DFAT), or authenticate via Indian Embassy.

STEP 3: Special Power of Attorney & Stamp Duty (Weeks 8 to 10)
Overseas executor signs SPA under Section 241 ISA. Counsel pays stamp duty in India within 3 months under Section 18.

STEP 4: High Court Petition & Newspaper Notice (Weeks 10 to 16)
File Section 228 petition on Original Side. Court issues public notice in two daily newspapers.

STEP 5: Final Grant Sealing with Pan-India Cover (Weeks 16 to 22)
Furnish Administration Bond, complete registry review, and receive sealed Letters of Administration with Section 273 cover.

Official Resource: https://www.willdrafting.in/services/foreign-will-resealing-ancillary-probate-high-court`;

    navigator.clipboard.writeText(roadmapText);
    setCopiedRoadmap(true);
    setTimeout(() => setCopiedRoadmap(false), 3000);
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
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 228 &amp; HIGH COURT ORIGINAL SIDE</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Foreign Will Resealing &amp; Ancillary Probate in India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Expert Section 228 fast-track ancillary Letters of Administration in Bombay, Delhi, Calcutta,
            and Madras High Courts. Enforce US, UK, Canadian, and Australian probated Wills without
            proving execution from scratch or summoning overseas witnesses.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Consult High Court Advocate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#high-court-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Calculator className="w-4 h-4 text-[#C65378]" />
              <span>Calculate Ancillary Fees</span>
            </a>
            <a
              href="#five-step-roadmap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>View Section 228 Roadmap</span>
            </a>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 228</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NO DE NOVO WITNESS PROOF
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Hague 1961</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                APOSTILLE VERIFICATION PROTOCOL
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4 High Courts</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BOMBAY • DELHI • CALCUTTA • MADRAS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4 to 6 Months</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FAST-TRACK ANCILLARY GRANT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tools)
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

            {/* High Court Testamentary Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed">
                Petitions drafted strictly under Section 228 of the Indian Succession Act, 1925
                and High Court Original Side Rules.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Pan-India Effect under Section 273 Proviso
              </div>
            </div>

            {/* Cross-Border Spoke Link Card */}
            <div className="bg-gradient-to-br from-[#172228] to-[#253640] rounded-2xl p-4 text-white text-xs space-y-2.5 shadow-sm">
              <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                Cross-Border Asset Transfer
              </div>
              <div className="font-bold text-sm leading-snug">
                Selling Inherited Property in India?
              </div>
              <p className="text-white/80 leading-relaxed text-[11px]">
                Handle FEMA compliance, NRO bank accounts, and 15CA/15CB tax clearances smoothly.
              </p>
              <Link
                href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-white font-bold pt-1 transition-colors"
              >
                <span>Read 15CA/15CB Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL & INTERACTIVE CONTENT
              ===================================================================== */}
          <main className="space-y-8 min-w-0">
            {/* Editorial Attribution & Date */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm">
                  AM
                </div>
                <div>
                  <div className="text-xs font-bold text-[#172228]">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-[11px] text-[#49585F]">
                    High Court &amp; Supreme Court Testamentary Practice • Bar Council of Delhi
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-[#49585F] sm:text-right">
                <div>Statutory Audit: November 2026</div>
                <div className="font-semibold text-emerald-700">Verified for Hague Convention &amp; ISA 1925</div>
              </div>
            </div>

            {/* Featured Official Visual Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 shadow-md bg-white">
              <Image
                src="/images/foreign-will-resealing-ancillary-probate-high-court-og.jpg"
                alt="Foreign Will Resealing and Section 228 Ancillary Probate in Indian High Courts"
                width={1200}
                height={675}
                priority
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-white/95 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-[#172228]">
                  High Court Original Side Representation &amp; Foreign Will Resealing
                </span>
                <span className="text-[11px] text-[#C65378] font-bold">
                  Official AMA Legal Solutions Practice Advisory
                </span>
              </div>
            </div>

            {/* ===================================================================
                SECTION 1: THE SINGLE H2 TAG (Strictly <= 70 chars, 0 em-dashes)
                =================================================================== */}
            <section
              id="section-228-framework"
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5" />
                <span>Statutory Authority &amp; Fast-Track Moat</span>
              </div>

              {/* Strict SINGLE H2 on page */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                1. Section 228 ISA Fast-Track Ancillary Letters
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                When an NRI passes away, their Will is often probated in their home country.
                This grant is valid in the US, UK, Canada, or Australia.
                But Indian land registries and banks cannot act on foreign probate directly.
                Indian law requires an Indian court seal.
                Under Section 213, foreign orders hold no automatic power in India.
                You must have the foreign grant recognized by an Indian High Court.
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>The Common Mistake: Filing a 3-Year Domestic Suit</span>
                </div>
                <p className="leading-relaxed">
                  Many local advocates make a costly mistake. They treat foreign wills like plain domestic wills.
                  They ask clients to file fresh probate suits under Section 276.
                  This forces foreign witnesses to travel to India. It drags family members into 3 to 5 years of court dates.
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                <strong>Section 228 of the Indian Succession Act, 1925</strong> solves this problem.
                It offers a fast legal path.
                When a foreign court has already granted probate, Indian High Courts grant Letters of Administration
                with the foreign Will attached.
                This process is called foreign Will resealing or ancillary probate.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="font-bold text-xs uppercase tracking-wider text-[#172228] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Conclusive Proof of Due Execution</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under High Court rulings, the foreign decree is proof of the Will.
                    Attesting witnesses do not need to testify in India.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="font-bold text-xs uppercase tracking-wider text-[#172228] flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#C65378]" />
                    <span>Section 273 Pan-India Operation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A grant by Bombay or Delhi High Court works across all states in India.
                    You do not need to file fresh cases in each city.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 2: INTERACTIVE HIGH COURT FEE & TIMELINE CALCULATOR
                =================================================================== */}
            <section
              id="high-court-calculator"
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Interactive Legal Estimator</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                    2. High Court Fee &amp; Timeline Calculator
                  </h3>
                </div>
                <span className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-full self-start sm:self-auto">
                  Instant Simulation
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choose your foreign probate country, target Indian High Court, and estimated asset value.
                See court fee limits, document rules, and expected legal timelines.
              </p>

              {/* Calculator Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-xl bg-slate-50 border border-slate-200/90">
                {/* High Court Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Target Indian High Court:</label>
                  <select
                    value={selectedCourt}
                    onChange={(e) => setSelectedCourt(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  >
                    <option value="bombay">Bombay High Court (Mumbai - Max Cap Rs 75,000)</option>
                    <option value="delhi">Delhi High Court (New Delhi - Ad-Valorem)</option>
                    <option value="calcutta">Calcutta High Court (Kolkata - Original Side)</option>
                    <option value="madras">Madras High Court (Chennai - Order XXV)</option>
                  </select>
                </div>

                {/* Country of Foreign Probate */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Country of Foreign Probate:</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                  >
                    <option value="usa">United States (Hague Apostille)</option>
                    <option value="uk">United Kingdom (FCDO Apostille)</option>
                    <option value="canada">Canada (Apostille Convention)</option>
                    <option value="australia">Australia (DFAT Apostille)</option>
                    <option value="singapore">Singapore (SAL Apostille)</option>
                    <option value="uae">United Arab Emirates (Consular Route)</option>
                  </select>
                </div>

                {/* Estate Valuation Slider & Input */}
                <div className="md:col-span-2 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Estimated Indian Estate Valuation:</span>
                    <span className="font-extrabold text-[#C65378] text-sm sm:text-base">
                      {formatINR(estateValuation)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000000}
                    max={150000000}
                    step={1000000}
                    value={estateValuation}
                    onChange={(e) => setEstateValuation(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C65378]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Rs 20 Lakhs</span>
                    <span>Rs 5 Crores</span>
                    <span>Rs 10 Crores</span>
                    <span>Rs 15 Crores+</span>
                  </div>
                </div>

                {/* Asset Classification */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Asset Composition in India:</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setAssetType("immovable")}
                      className={`py-2 px-2 rounded-lg font-semibold border transition-colors ${
                        assetType === "immovable"
                          ? "bg-rose-50 text-[#C65378] border-[#C65378]"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Real Estate
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssetType("movable")}
                      className={`py-2 px-2 rounded-lg font-semibold border transition-colors ${
                        assetType === "movable"
                          ? "bg-rose-50 text-[#C65378] border-[#C65378]"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Bank/Shares
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssetType("mixed")}
                      className={`py-2 px-2 rounded-lg font-semibold border transition-colors ${
                        assetType === "mixed"
                          ? "bg-rose-50 text-[#C65378] border-[#C65378]"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Mixed Estate
                    </button>
                  </div>
                </div>

                {/* Dispute Risk Toggle */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Dispute Risk from Relatives:</label>
                  <div className="flex items-center gap-3 pt-1">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={hasDisputeRisk}
                        onChange={(e) => setHasDisputeRisk(e.target.checked)}
                        className="rounded border-slate-300 text-[#C65378] focus:ring-[#C65378] w-4 h-4"
                      />
                      <span>Possible dispute or caveat from relatives</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Calculator Output Display Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#172228] to-[#253640] text-white space-y-5 shadow-md">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center justify-between">
                  <span>STATUTORY PREDICTOR ESTIMATE</span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/90">
                    {courtConfig.courtName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/10 py-4">
                  <div>
                    <div className="text-[11px] text-white/70">Estimated Court Fee</div>
                    <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                      {formatINR(estimatedCourtFee)}
                    </div>
                    <div className="text-[10px] text-white/60 mt-1 line-clamp-2">
                      {courtConfig.courtFeeDescription}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-white/70">Authentication Path</div>
                    <div className="text-base sm:text-lg font-bold text-rose-200 mt-0.5">
                      {countryConfig.authType}
                    </div>
                    <div className="text-[10px] text-white/60 mt-1">
                      Via {countryConfig.designatedAuthority}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-white/70">Estimated Timeline</div>
                    <div className="text-base sm:text-lg font-bold text-emerald-300 mt-0.5">
                      {estimatedTimeline}
                    </div>
                    <div className="text-[10px] text-white/60 mt-1">
                      Vs 36+ months for a fresh trial
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-white/80">
                    <strong>Territory:</strong> {courtConfig.territorialReach}
                  </div>
                  <button
                    onClick={handleConsultation}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold transition-transform hover:-translate-y-0.5 shadow-xs"
                  >
                    <span>Engage High Court Counsel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 3: HIGH COURT COMPARISON MATRIX
                =================================================================== */}
            <section
              id="high-court-matrix"
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-3.5 h-3.5" />
                <span>Original Side Comparative Analysis</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                3. High Court Comparison Matrix: Bombay, Delhi, Calcutta &amp; Madras
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Four Presidency High Courts in India handle original testamentary cases.
                They grant probate and Letters of Administration directly.
                The table below details their rules, fees, and citation procedures:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200/90">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold border-b border-slate-700">High Court</th>
                      <th className="p-3.5 font-bold border-b border-slate-700">Territorial Reach</th>
                      <th className="p-3.5 font-bold border-b border-slate-700">Court Fee Rule</th>
                      <th className="p-3.5 font-bold border-b border-slate-700">Public Citation Norms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                    <tr className="hover:bg-rose-50/40">
                      <td className="p-3.5 font-bold text-[#172228] whitespace-nowrap">
                        Bombay High Court
                      </td>
                      <td className="p-3.5">
                        Greater Mumbai area
                      </td>
                      <td className="p-3.5 font-semibold text-emerald-700">
                        Capped at max Rs 75,000 (Maharashtra Court Fees Act)
                      </td>
                      <td className="p-3.5">
                        Free Press Journal (English) + Navshakti (Marathi)
                      </td>
                    </tr>
                    <tr className="hover:bg-rose-50/40">
                      <td className="p-3.5 font-bold text-[#172228] whitespace-nowrap">
                        Delhi High Court
                      </td>
                      <td className="p-3.5">
                        NCT of Delhi (above Rs 2 Crore)
                      </td>
                      <td className="p-3.5 font-semibold text-amber-700">
                        Ad-valorem rate of about 3% to 4%
                      </td>
                      <td className="p-3.5">
                        Hindustan Times (English) + Navbharat Times (Hindi)
                      </td>
                    </tr>
                    <tr className="hover:bg-rose-50/40">
                      <td className="p-3.5 font-bold text-[#172228] whitespace-nowrap">
                        Calcutta High Court
                      </td>
                      <td className="p-3.5">
                        Kolkata City and West Bengal
                      </td>
                      <td className="p-3.5">
                        Tiered slab rate (about 2.5% to 3.5%)
                      </td>
                      <td className="p-3.5">
                        The Statesman / Telegraph + Bartaman (Bengali)
                      </td>
                    </tr>
                    <tr className="hover:bg-rose-50/40">
                      <td className="p-3.5 font-bold text-[#172228] whitespace-nowrap">
                        Madras High Court
                      </td>
                      <td className="p-3.5">
                        Chennai City and Tamil Nadu
                      </td>
                      <td className="p-3.5">
                        Tamil Nadu Court Fees Act schedule
                      </td>
                      <td className="p-3.5">
                        The Hindu (English) + Dina Thanthi (Tamil)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===================================================================
                SECTION 4: STEP-BY-STEP PROCEDURAL ROADMAP (STEPPER)
                =================================================================== */}
            <section
              id="five-step-roadmap"
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Statutory SOP</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                    4. Step-by-Step Procedural Roadmap Under Section 228
                  </h3>
                </div>
                <button
                  onClick={copyRoadmapToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors self-start sm:self-auto"
                >
                  {copiedRoadmap ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Roadmap Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Roadmap</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-0.5 before:bg-rose-100">
                {/* Step 1 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-4 ring-white shadow-xs">
                    1
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#172228]">
                        Get Foreign Court Exemplified Copy
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Weeks 1 to 4
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ask your overseas court for an exemplified copy of your probate grant and Will.
                      It must carry the official court seal. Plain photocopies are not accepted in India.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-4 ring-white shadow-xs">
                    2
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#172228]">
                        Get Hague Apostille or Embassy Seal
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Weeks 4 to 8
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Take the court papers to your state office for an Apostille.
                      In the US, use the Secretary of State. In the UK, use the FCDO.
                      In the UAE, get Indian Embassy attestation.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-4 ring-white shadow-xs">
                    3
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#172228]">
                        Sign Special Power of Attorney
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Weeks 8 to 10
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You do not need to travel to India. Sign a Special Power of Attorney (SPA) for our advocate.
                      We pay state stamp duty in India within 3 months under Section 18.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-4 ring-white shadow-xs">
                    4
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#172228]">
                        File High Court Petition &amp; Publish Notice
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Weeks 10 to 16
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We file your Section 228 petition on the High Court Original Side.
                      The court publishes public notice in two daily newspapers giving 30 days for any response.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-4 ring-white shadow-xs">
                    5
                  </div>
                  <div className="bg-rose-50/60 rounded-xl p-4 sm:p-5 border border-rose-200/80 flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#172228]">
                        Receive Sealed Letters of Administration
                      </span>
                      <span className="text-[10px] font-semibold text-[#C65378] bg-white px-2 py-0.5 rounded border border-rose-200">
                        Weeks 16 to 22
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      After the notice period ends, the court grants Letters of Administration.
                      Under Section 273, the grant is valid across all states in India.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 5: EMBASSY APOSTILLE & VERIFICATION CHECKLIST
                =================================================================== */}
            <section
              id="embassy-checklist"
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Statutory Filing Preparation</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                    5. Embassy Apostille &amp; Document Verification Checklist
                  </h3>
                </div>
                <button
                  onClick={copyChecklistToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] text-xs font-bold hover:bg-rose-100 transition-colors self-start sm:self-auto"
                >
                  {copiedChecklist ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Checklist Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Checklist</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All records submitted to the High Court must meet strict rules under the Indian Succession Act
                and the Hague Apostille Convention 1961:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {CHECKLIST_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 hover:border-[#C65378]/40 transition-colors"
                  >
                    <div className="font-bold text-xs text-[#172228] flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed pl-6">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ===================================================================
                SECTION 6: RESEALING VS DE NOVO DOMESTIC PROBATE
                =================================================================== */}
            <section
              id="resealing-vs-de-novo"
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Scale className="w-3.5 h-3.5" />
                <span>Substantive Law Comparison</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                6. Resealing vs De Novo Probate: Critical Legal Comparison
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                See why Section 228 is the best choice for overseas estates compared to a fresh probate suit:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200/90">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold border-b border-slate-700 w-1/4">Legal Point</th>
                      <th className="p-3.5 font-bold border-b border-slate-700 w-3/8 text-emerald-300">
                        Section 228 Resealing
                      </th>
                      <th className="p-3.5 font-bold border-b border-slate-700 w-3/8 text-rose-300">
                        Section 276 Fresh Probate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="p-3.5 font-bold text-[#172228]">{row.parameter}</td>
                        <td className="p-3.5 text-slate-800 bg-emerald-50/20">{row.resealing}</td>
                        <td className="p-3.5 text-slate-600 bg-rose-50/10">{row.deNovo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===================================================================
                SECTION 7: REAL NRI CASE STUDIES (MUMBAI, DELHI, KOLKATA)
                =================================================================== */}
            <section
              id="nri-case-studies"
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Award className="w-3.5 h-3.5" />
                <span>Case Law &amp; Practice Insights</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                7. Real NRI Cross-Border Case Studies in Indian High Courts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Case 1 */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#172228]">California NRI • Mumbai Flat</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      Grant in 4.5 Months
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#C65378]">
                    Resealing California Probate in Bombay High Court
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Testator passed away in California, leaving a flat in Bandra West and bank accounts.
                    The Will was probated in California. Local lawyers advised a 3-year suit.
                    We filed under Section 228 in Bombay High Court. Court fee was capped at Rs 75,000.
                    Letters of Administration were sealed in 135 days.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#172228]">London NRI • Delhi Commercial Land</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      Grant in 5 Months
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#C65378]">
                    Enforcing UK Probate in Delhi High Court
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A UK executor needed to sell commercial property in Connaught Place.
                    Probate was issued by the UK High Court of Justice.
                    We secured an FCDO Apostille and filed under Section 228 in Delhi High Court.
                    The executor never traveled to India.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 8: STATUTORY CITATIONS & PRECEDENTS
                =================================================================== */}
            <section
              id="statutory-authorities"
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Statutory Authority &amp; Precedents</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                8. Governing Statutory Citations &amp; Landmark Precedents
              </h3>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <strong className="text-[#172228] block mb-1">
                    1. Indian Succession Act, 1925 (ss. 228, 273, 213 &amp; 241):
                  </strong>
                  Section 228 allows Letters of Administration with a foreign Will attached.
                  Section 273 gives the grant pan-India effect.
                  Section 241 allows an Indian attorney to act for an absent executor.
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <strong className="text-[#172228] block mb-1">
                    2. Alagammal v. Rakkammal (AIR 1982 Mad 354):
                  </strong>
                  The Madras High Court held that under Section 228, the court does not examine witness testimony again.
                  The foreign probate order is conclusive proof of due execution.
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <strong className="text-[#172228] block mb-1">
                    3. Hague Apostille Convention 1961:
                  </strong>
                  Apostilled foreign court records carry statutory presumption of truth under Indian evidence law.
                  They do not require further diplomatic authentication.
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <strong className="text-[#172228] block mb-1">
                    4. Maharashtra Court Fees Act, 1959 (Schedule I, Article 11):
                  </strong>
                  Statutory cap fixes the maximum court fee at Rs 75,000 in Bombay High Court for estates over Rs 3 Lakhs.
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 9: FREQUENTLY ASKED QUESTIONS (ACCORDION)
                =================================================================== */}
            <section
              id="frequently-asked-questions"
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172228] tracking-tight">
                9. Frequently Asked Questions: Foreign Will Resealing
              </h3>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-200/90 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between gap-4 p-4 text-left font-bold text-xs sm:text-sm text-[#172228] hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
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
              RIGHT COLUMN: STICKY DESKTOP ACTION SIDEBAR
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            {/* Consultation Action Card (Strictly NO phone numbers) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>HIGH COURT ADVOCATE CONSULTATION</span>
              </div>
              <h4 className="text-base font-extrabold text-[#172228] leading-snug">
                Reseal Your Foreign Will in Indian High Courts
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct legal representation by senior testamentary advocates across Bombay, Delhi,
                Calcutta, and Madras High Courts. Retainer options from Rs 75,000 to Rs 3,50,000.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Section 228 Fast-Track Petitions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Hague Apostille &amp; SPA Adjudication</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Section 273 Pan-India Enforcement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero Travel Needed for NRI Executors</span>
                </div>
              </div>

              <button
                onClick={handleConsultation}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
              >
                <span>Book High Court Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Outbound Spoke Links Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3 text-xs">
              <div className="font-bold text-[#172228] uppercase tracking-wider text-[11px] text-slate-500">
                Related Cross-Border Services
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                    className="flex items-center justify-between text-slate-700 hover:text-[#C65378] font-semibold transition-colors"
                  >
                    <span>NRI Inherited Real Estate &amp; 15CA/15CB</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/probate-lawyer"
                    className="flex items-center justify-between text-slate-700 hover:text-[#C65378] font-semibold transition-colors"
                  >
                    <span>High Court Probate Lawyer Services</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/letters-of-administration-lawyer"
                    className="flex items-center justify-between text-slate-700 hover:text-[#C65378] font-semibold transition-colors"
                  >
                    <span>Letters of Administration Counsel</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/nri-will-india"
                    className="flex items-center justify-between text-slate-700 hover:text-[#C65378] font-semibold transition-colors"
                  >
                    <span>NRI Will Drafting for Indian Assets</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* =========================================================================
          LAYER 4: BOTTOM CTA BANNER (Strictly NO phone numbers)
          ========================================================================= */}
      <section className="w-full bg-[#172228] text-white py-14 sm:py-16 mt-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>CROSS-BORDER TESTAMENTARY SUCCESSION COUNSEL</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Need to Enforce a Foreign Probated Will in India?
          </h3>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Avoid years of unnecessary litigation and travel expenses. Speak with our specialized High Court
            advocates to fast-track your Section 228 ancillary Letters of Administration and liquidate Indian assets seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span>Schedule High Court Case Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <span>Explore All Legal Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
