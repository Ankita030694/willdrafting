"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Search,
  FileSpreadsheet,
  AlertOctagon,
  Eye,
  FileSignature,
  DollarSign,
  Briefcase,
  Key,
  TrendingUp,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Statutory Grounds: Appointing Administrator Under Section 247 ISA" },
  { id: "interactive-checker", label: "2. Free Administrator Pendente Lite Urgency & Waste Tool" },
  { id: "cpc-vs-isa-comparison", label: "3. Order 40 Rule 1 CPC vs Section 247 ISA Comparison" },
  { id: "rental-interception-audit", label: "4. Rental Interception & Commercial Estate Waste Audit" },
  { id: "running-business-safeguard", label: "5. Managing Running Businesses & Factories in Probate" },
  { id: "receiver-remuneration-fees", label: "6. Interim Court Receiver Fees & High Court Commission" },
  { id: "surety-bond-rules", label: "7. Administration Bond & Surety Rules Under Section 291" },
  { id: "petition-readiness-checklist", label: "8. Section 247 Petition Readiness & Verification Checklist" },
  { id: "precedent-matcher", label: "9. Precedent Matcher: Key High Court & SC Rulings" },
  { id: "step-by-step-sop", label: "10. Step-by-Step SOP: Appointing Court Receiver in Will Suit" },
  { id: "litigation-case-studies", label: "11. Practical Litigation Case Studies Across Indian Courts" },
  { id: "courtroom-petition-template", label: "12. Courtroom Checklist & Section 247 Petition Template" },
  { id: "institutional-profile", label: "13. Institutional Profile: High Court Testamentary Litigation" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions: Administrator Pendente Lite" },
  { id: "statutory-citations", label: "15. Statutory Citations & Judicial Testamentary Portals" },
];

const PRECEDENTS = [
  {
    id: "pandurang-laud",
    title: "Pandurang Shamrao Laud v. Dwarkadas Kalliandas (AIR 1933 Bom 342)",
    bench: "High Court of Bombay",
    scenario: "Will case pending; caveator asked for a court officer to collect rent.",
    ratio: "In a Will case, the court can pick an administrator under Section 247. You do not need to prove bad faith or fraud. If there is a real court dispute and no one has clear title to collect rent, the court will step in to save the estate from waste.",
    keyTakeaway: "Courts act fast to protect property. A real Will contest and risk to rent is enough for Section 247 help.",
  },
  {
    id: "ramaswami-iyer",
    title: "K.G. Ramaswami Iyer v. K.G. Subramania Iyer (AIR 1967 Mad 282)",
    bench: "High Court of Madras",
    scenario: "Dispute between named executor and legal heirs over land and crop yields.",
    ratio: "Section 247 of the Indian Succession Act gives wider power than Order 40 Rule 1 CPC. An executor whose Will is challenged cannot act like an owner. The court must put the assets into safe court care while the case goes on.",
    keyTakeaway: "A named executor cannot stop a court receiver if heirs challenge the Will in court.",
  },
  {
    id: "radharani-dassi",
    title: "In the Goods of Radharani Dassi (Calcutta High Court)",
    bench: "High Court of Calcutta",
    scenario: "One heir took rent from tenants and hid accounts from other family members.",
    ratio: "Taking rent alone without sharing accounts is clear waste of the estate under Indian law. The High Court picked an Official Receiver to collect rent and put it in court bank deposits.",
    keyTakeaway: "Pocketing rent without court deposit is the top reason for quick Section 247 orders.",
  },
  {
    id: "sarla-gupta",
    title: "Smt. Sarla Gupta v. State (Delhi High Court)",
    bench: "High Court of Delhi",
    scenario: "A factory and shops were left unmanaged during a long Will fight.",
    ratio: "When an estate has a running business, Section 247 lets the court pick a neutral lawyer to run it. The lawyer must keep books, pay staff, pay tax, and keep the firm alive without sharing the wealth until the case ends.",
    keyTakeaway: "Courts give special powers to keep a family firm running while freezing payouts.",
  },
];

const FAQS = [
  {
    q: "What is an Administrator Pendente Lite under Section 247 ISA?",
    a: "An Administrator Pendente Lite is a neutral court officer. The court names this person under Section 247 of the Indian Succession Act, 1925. This happens while a Will case is pending in court. The officer collects rents and protects assets. But this officer cannot share the estate among heirs until the judge decides the case.",
  },
  {
    q: "When will an Indian court appoint an Administrator under Section 247?",
    a: "The court acts when there is a real Will fight in court. It acts if one relative takes rent alone or tries to sell land. You do not need to prove crime. You only need to show a real court case and risk to estate money.",
  },
  {
    q: "Can an Administrator Pendente Lite sell or share property?",
    a: "No. Section 247 strictly bars sharing or dividing the estate. The administrator cannot sell land without prior court orders. All funds stay safe in bank deposits until the case ends.",
  },
  {
    q: "How is Section 247 ISA different from Order 40 Rule 1 CPC?",
    a: "Order 40 Rule 1 of the CPC is for ordinary civil suits. It sets a very high bar. Section 247 ISA is made just for Will cases. Because an unprobated Will gives no clear right, courts use Section 247 to protect estate money quickly.",
  },
  {
    q: "Who collects rent from tenants while a probate case is in court?",
    a: "Once named, the administrator collects all rent. The court sends orders to all tenants. Tenants must pay rent to the court officer or court bank account. Any relative taking rent by force must stop.",
  },
  {
    q: "Who pays the fees of an Administrator Pendente Lite?",
    a: "The court sets a fair fee. This is usually 1.5% to 5% of rent collected, or a fixed monthly pay. This fee comes directly out of the estate funds as an official court expense.",
  },
  {
    q: "Does an Administrator need to give a surety bond under Section 291?",
    a: "Yes. Under Section 291 ISA, private administrators must sign a bond with sureties. This ensures they keep honest books. If the court names its own Official Receiver, no private bond is needed.",
  },
  {
    q: "What happens to a family factory during a Will fight?",
    a: "The court gives the administrator power to run the firm. The officer pays staff, files GST returns, and clears power bills. This keeps the firm alive until the judge decides who owns it.",
  },
];

export default function AdministratorPendenteLiteClient() {
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
  const [copiedPetition, setCopiedPetition] = useState<boolean>(false);
  const [copiedAffidavit, setCopiedAffidavit] = useState<boolean>(false);
  const [selectedPrecedent, setSelectedPrecedent] = useState<string>("pandurang-laud");

  // Diagnostic Wizard State (Estate Waste Risk Scorecard)
  const [assetComposition, setAssetComposition] = useState<
    "commercial_rental" | "running_factory" | "liquid_deposits" | "vacant_land" | "residential_flat"
  >("commercial_rental");

  const [urgencyTrigger, setUrgencyTrigger] = useState<
    "rent_siphoning" | "alienation_threat" | "factory_cash_diversion" | "abandoned_locked" | "dispute_no_waste"
  >("rent_siphoning");

  const [litigationStatus, setLitigationStatus] = useState<
    "contested_probate_suit" | "disputed_letters_admin" | "will_revocation_sec_263" | "parallel_partition_suit"
  >("contested_probate_suit");

  const [managementControl, setManagementControl] = useState<
    "partisan_executor" | "hostile_coheir_exclusive" | "vacuum_frozen_accounts"
  >("hostile_coheir_exclusive");

  const [monthlyInflow, setMonthlyInflow] = useState<
    "under_1_lakh" | "1_to_5_lakhs" | "5_to_20_lakhs" | "above_20_lakhs"
  >("5_to_20_lakhs");

  // Receiver Fee Calculator State
  const [estMonthlyRent, setEstMonthlyRent] = useState<number>(250000);
  const [estLitigationYears, setEstLitigationYears] = useState<number>(3);
  const [receiverRatePercent, setReceiverRatePercent] = useState<number>(3.0);

  // Petition Readiness Checklist State
  const [readinessChecklist, setReadinessChecklist] = useState({
    lisPendensProof: true,
    primaFacieWasteEvidence: true,
    detailedAssetSchedule: true,
    tenantRentRoll: false,
    receiverCategoryChosen: true,
    suretyBondPrepared: false,
  });

  const toggleChecklistItem = (key: keyof typeof readinessChecklist) => {
    setReadinessChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const readinessScore = useMemo(() => {
    const total = Object.keys(readinessChecklist).length;
    const completed = Object.values(readinessChecklist).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  }, [readinessChecklist]);

  // Dynamic calculations for receiver fee estimator
  const receiverFinancials = useMemo(() => {
    const monthlyFee = Math.round((estMonthlyRent * receiverRatePercent) / 100);
    const annualFee = monthlyFee * 12;
    const totalLitigationFee = annualFee * estLitigationYears;
    const totalProtectedInflow = estMonthlyRent * 12 * estLitigationYears;
    const netSafeguardedCorpus = totalProtectedInflow - totalLitigationFee;
    const estimatedSuretyBond = Math.round(estMonthlyRent * 12 * 1.5);

    return {
      monthlyFee,
      annualFee,
      totalLitigationFee,
      totalProtectedInflow,
      netSafeguardedCorpus,
      estimatedSuretyBond,
    };
  }, [estMonthlyRent, estLitigationYears, receiverRatePercent]);

  // Risk & Urgency Evaluation Logic
  let urgencyScore = 50;
  let urgencyLevel = "Moderate Urgency";
  let badgeStyle = "bg-amber-50 text-amber-800 border-amber-300";
  let statutoryRemedy = "Section 247 ISA Administration Application";
  let precedentCase = "Pandurang Shamrao Laud v. Dwarkadas Kalliandas (AIR 1933 Bom 342)";
  let analyticalSummary = "";
  let urgentDirective = "";

  if (urgencyTrigger === "rent_siphoning" || urgencyTrigger === "factory_cash_diversion") {
    if (monthlyInflow === "above_20_lakhs" || monthlyInflow === "5_to_20_lakhs") {
      urgencyScore = 96;
      urgencyLevel = "Critical Emergency (96%)";
      badgeStyle = "bg-rose-50 text-rose-800 border-rose-300";
      statutoryRemedy = "Urgent Section 247 ISA Petition + Ex-Parte Order 40 CPC Receiver";
      precedentCase = "In the Goods of Radharani Dassi (Cal HC) & Pandurang Laud (Bom HC)";
      analyticalSummary =
        "Your estate faces huge cash loss right now. One person is taking rent without court check. Under Section 247 ISA, the court can pick a neutral officer today to collect all rent.";
      urgentDirective =
        "File an urgent Section 247 application this week. Ask the judge to order all tenants to pay rent into court. Ask to freeze private bank accounts.";
    } else {
      urgencyScore = 84;
      urgencyLevel = "High Urgency (84%)";
      badgeStyle = "bg-rose-50 text-rose-800 border-rose-300";
      statutoryRemedy = "Section 247 ISA Court Receiver & Tenant Notice";
      precedentCase = "K.G. Ramaswami Iyer v. K.G. Subramania Iyer (AIR 1967 Mad 282)";
      analyticalSummary =
        "Taking rent alone during a Will fight is unfair. High Court rulings say an executor cannot pocket rent when heirs challenge the Will. The court will step in to save the money.";
      urgentDirective =
        "Send legal notices to tenants. File a Section 247 petition to appoint a court lawyer to collect rent.";
    }
  } else if (urgencyTrigger === "alienation_threat") {
    urgencyScore = 91;
    urgencyLevel = "Critical Threat of Sale (91%)";
    badgeStyle = "bg-rose-50 text-rose-800 border-rose-300";
    statutoryRemedy = "Section 247 Receiver + Section 269 Injunction";
    precedentCase = "Pandurang Shamrao Laud (Bom HC) & Section 269 ISA";
    analyticalSummary =
      "Any try to sell or lease land during a Will case causes big harm. Courts use Section 247 and Section 269 ISA to lock property title until trial ends.";
    urgentDirective =
      "Ask for two orders: an injunction to stop sales, and a court receiver to take over property papers.";
  } else if (assetComposition === "running_factory") {
    urgencyScore = 89;
    urgencyLevel = "Factory Risk Alert (89%)";
    badgeStyle = "bg-amber-50 text-amber-800 border-amber-300";
    statutoryRemedy = "Section 247 Special Business Administrator";
    precedentCase = "Smt. Sarla Gupta v. State (Delhi High Court)";
    analyticalSummary =
      "A family business or factory dies if no one can sign papers. Without a court officer, staff leave, power gets cut, and tax dues rise fast.";
    urgentDirective =
      "Ask the court for a manager under Section 247. The officer will pay staff, file tax, and run work under court eyes.";
  } else if (urgencyTrigger === "abandoned_locked") {
    urgencyScore = 72;
    urgencyLevel = "Property Neglect Risk (72%)";
    badgeStyle = "bg-blue-50 text-blue-800 border-blue-300";
    statutoryRemedy = "Section 247 & Section 269 ISA Caretaker Order";
    precedentCase = "Section 269 Indian Succession Act (Property Care)";
    analyticalSummary =
      "Locked flats and open plots face land grabbers and municipal tax seals. An administrator can inspect, pay city tax, and put guards on site.";
    urgentDirective =
      "Ask the court to send a lawyer to list items on site and pay city taxes from estate funds.";
  } else {
    urgencyScore = 55;
    urgencyLevel = "Moderate Urgency (55%)";
    badgeStyle = "bg-slate-100 text-slate-800 border-slate-300";
    statutoryRemedy = "Section 247 Standby Petition";
    precedentCase = "General Rules of Administration Pendente Lite";
    analyticalSummary =
      "The Will case is active, but no one is stealing rent today. Because trials take years, keeping a standby petition ready is smart.";
    urgentDirective =
      "Ask the court to make the person on site file quarterly accounts. Keep receiver papers ready if rent stops.";
  }

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
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    const elements = document.querySelectorAll(".scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const copyPetitionToClipboard = () => {
    const petitionText = `IN THE COURT OF THE DISTRICT JUDGE / HIGH COURT OF JUDICATURE
TESTAMENTARY JURISDICTION
TESTAMENTARY SUIT NO. ______ OF 2026
IN TESTAMENTARY PETITION NO. ______ OF 2025

IN THE MATTER OF THE ESTATE OF LATE [NAME OF DECEASED], DECEASED
AND
IN THE MATTER OF SECTION 247 OF THE INDIAN SUCCESSION ACT, 1925
READ WITH ORDER XL RULE 1 AND SECTION 151 OF THE CODE OF CIVIL PROCEDURE, 1908

[NAME OF APPLICANT]                                      ... APPLICANT
VERSUS
[NAME OF OPPONENT]                                       ... RESPONDENT

APPLICATION FOR APPOINTMENT OF ADMINISTRATOR PENDENTE LITE

THE APPLICANT STATES AS FOLLOWS:
1. The Applicant filed a Caveat in the Will petition. The case is now a regular testamentary suit.
2. The deceased owned flats and land listed in Schedule A with monthly rent of Rs. [Amount].
3. The Respondent takes this rent alone, hides accounts, and tries to sell property.
4. Under Section 247 of the Indian Succession Act, 1925, the Court can appoint a neutral administrator to hold property until the suit ends.
5. PRAYER:
   (a) Appoint a Court Receiver or Advocate under Section 247 ISA to take charge and collect rents;
   (b) Direct all tenants in Schedule B to pay rent to the Court Receiver;
   (c) Restrain the Respondent from selling or leasing the property.`;

    navigator.clipboard.writeText(petitionText);
    setCopiedPetition(true);
    setTimeout(() => setCopiedPetition(false), 3000);
  };

  const copyAffidavitToClipboard = () => {
    const affidavitText = `AFFIDAVIT OF URGENT ESTATE WASTE (ORDER XL RULE 1 CPC)

1. I am the Applicant in this suit and know all facts.
2. The Respondent takes monthly rent of Rs. [Amount] in cash and keeps it in private accounts.
3. Property taxes and power bills are unpaid. The city may seal the shops.
4. Unless the Court names an administrator under Section 247 ISA, the estate will suffer big loss before trial ends.
5. Putting the assets in court custody is fair to all parties.`;

    navigator.clipboard.writeText(affidavitText);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background #172228)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 247 &amp; ORDER 40 CPC</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Administrator Pendente Lite Urgency Evaluator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check your legal grounds to name a court officer under Section 247 ISA during a Will fight. Stop property waste and save monthly rental income today.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <GitBranch className="w-4 h-4" />
              <span>Launch Urgency Scorecard</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/high-court-testamentary-suit-contested-will-defense"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>High Court Will Defense</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 247 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                COURT ADMINISTRATOR LAW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Order 40 Rule 1</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CPC COURT RECEIVER POWER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 291 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SURETY COURT BOND
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Custodia Legis</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SAFE COURT CUSTODY
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

            {/* Statutory Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Testamentary Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by Indian Succession Act, 1925 (Sections 247, 269, 291) and Code of Civil Procedure, 1908 (Order XL). Supported by High Court rules.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOLS
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: HOW SECTION 247 SAVES YOUR PROPERTY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Stop Rent Siphoning:</strong> Will trials take 3 to 7 years in India. When one relative takes rent alone, Section 247 gives fast court help.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Easier Than Regular Civil Suits:</strong> Under Bombay High Court law, you do not need to prove crime. A real Will fight and risk to rent is enough.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Bar on Sharing Wealth:</strong> The court officer can collect rent and pay taxes. But Section 247 bars sharing funds until the case ends.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Paid From Estate Income:</strong> Court receivers get 1.5% to 5% of rent collected. This fee comes right from estate earnings.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL VISUAL CARD: DISPLAY GENERATED OG IMAGE */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="uppercase tracking-wider text-[#C65378] font-black flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Testamentary Practice Visual</span>
                </span>
                <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono">
                  /tools/administrator-pendente-lite-urgency-evaluator
                </span>
              </div>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/images/administrator-pendente-lite-urgency-evaluator-og.jpg"
                  alt="Administrator Pendente Lite Urgency Evaluator under Section 247 ISA India"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic text-center">
                Visualizing Indian High Court litigation: When a Will trial starts, Section 247 ISA lets the court pick a neutral officer to keep rent and land safe.
              </p>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICT SINGLE H2) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Grounds: Appointing Administrator Under Section 247 ISA
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A person who dies may leave shops, rented flats, land, or a factory. These assets need daily care. But when a family member files a caveat, the probate case becomes a contested suit.
                </p>
                <p>
                  In this fight, no one has clear title. The executor named in the Will cannot act freely because the Will is challenged. If left alone, one relative often pockets rent, skips taxes, or tries to sell land.
                </p>
                <p>
                  To stop this harm, lawmakers wrote <strong>Section 247 of the Indian Succession Act, 1925</strong>:
                </p>
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed border-l-4 border-[#C65378]">
                  &ldquo;Pending any suit touching the validity of the will of a deceased person, or for obtaining or revoking any probate... the Court may appoint an administrator of the estate... who shall have all the rights and powers of a general administrator, other than the right of distributing such estate.&rdquo;
                </div>
                <p>
                  Under Section 247, the court steps in to put property into safe court hands. This ensures rent is collected, tax is paid, and assets stay safe until the judge decides who wins.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKER TOOL */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>EVIDENTIARY DIAGNOSTIC ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Administrator Pendente Lite Urgency &amp; Waste Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick your dispute facts below. Our diagnostic engine checks your balance of convenience and urgency score for Section 247 relief.
              </p>

              {/* Wizard Box */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm space-y-6">
                {/* Step 1: Asset Composition */}
                <div className="space-y-3">
                  <label className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                    Step 1: Composition of the Contested Estate
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setAssetComposition("commercial_rental")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        assetComposition === "commercial_rental"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Commercial Real Estate / Tenanted Flats</div>
                      <div className="text-[11px] text-slate-500 mt-1">Multi-tenant buildings generating continuous monthly rentals.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssetComposition("running_factory")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        assetComposition === "running_factory"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Running Factory / Active Business</div>
                      <div className="text-[11px] text-slate-500 mt-1">Operational firm requiring daily payroll, GST filings, and supply management.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssetComposition("liquid_deposits")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        assetComposition === "liquid_deposits"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Bank Accounts, FDs &amp; Demat Portfolios</div>
                      <div className="text-[11px] text-slate-500 mt-1">Liquid movable wealth at risk of fraudulent withdrawal or encashment.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssetComposition("vacant_land")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        assetComposition === "vacant_land"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Vacant Land / Agricultural Plots</div>
                      <div className="text-[11px] text-slate-500 mt-1">Open plots vulnerable to encroachment or unauthorized possession.</div>
                    </button>
                  </div>
                </div>

                {/* Step 2: Adverse Conduct / Urgency Trigger */}
                <div className="space-y-3">
                  <label className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                    Step 2: Adverse Party Conduct &amp; Immediate Danger
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setUrgencyTrigger("rent_siphoning")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        urgencyTrigger === "rent_siphoning"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Unilateral Rent Interception</div>
                      <div className="text-[11px] text-slate-500 mt-1">Opposing party is pocketing tenant rents and refusing accounts.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgencyTrigger("alienation_threat")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        urgencyTrigger === "alienation_threat"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Attempted Sale / Lease Encumbrance</div>
                      <div className="text-[11px] text-slate-500 mt-1">Trying to sell, mortgage, or create 99-year third-party leases.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgencyTrigger("factory_cash_diversion")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        urgencyTrigger === "factory_cash_diversion"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Diverting Factory Cash / Tax Defaults</div>
                      <div className="text-[11px] text-slate-500 mt-1">Siphoning business revenue, defaulting on GST, electricity, or wages.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgencyTrigger("abandoned_locked")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        urgencyTrigger === "abandoned_locked"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Premises Abandoned / Locked</div>
                      <div className="text-[11px] text-slate-500 mt-1">Property locked with municipal tax notices and encroachment threats.</div>
                    </button>
                  </div>
                </div>

                {/* Step 3: Testamentary Litigation Status */}
                <div className="space-y-3">
                  <label className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                    Step 3: Status of Court Proceedings (Lis Pendens)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setLitigationStatus("contested_probate_suit")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        litigationStatus === "contested_probate_suit"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Contentious Probate Suit Pending</div>
                      <div className="text-[11px] text-slate-500 mt-1">Caveat entered, affidavit filed; converted to regular testamentary suit.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLitigationStatus("disputed_letters_admin")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        litigationStatus === "disputed_letters_admin"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Letters of Administration Contest</div>
                      <div className="text-[11px] text-slate-500 mt-1">Petition for administration pending with rival kinship claims.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLitigationStatus("will_revocation_sec_263")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        litigationStatus === "will_revocation_sec_263"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Revocation of Probate Suit (Sec. 263)</div>
                      <div className="text-[11px] text-slate-500 mt-1">Suit pending to cancel fraudulent probate obtained by concealing heirs.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLitigationStatus("parallel_partition_suit")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        litigationStatus === "parallel_partition_suit"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Parallel Partition &amp; Title Suit</div>
                      <div className="text-[11px] text-slate-500 mt-1">Co-heirs instituted civil partition suit alongside testamentary caveat.</div>
                    </button>
                  </div>
                </div>

                {/* Step 4: Monthly Inflow Scale */}
                <div className="space-y-3">
                  <label className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                    Step 4: Monthly Rental / Commercial Inflows at Stake
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: "under_1_lakh", label: "Under ₹1 Lakh/mo" },
                      { id: "1_to_5_lakhs", label: "₹1L - ₹5 Lakhs/mo" },
                      { id: "5_to_20_lakhs", label: "₹5L - ₹20 Lakhs/mo" },
                      { id: "above_20_lakhs", label: "Above ₹20 Lakhs/mo" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setMonthlyInflow(opt.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          monthlyInflow === opt.id
                            ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DYNAMIC RESULTS BOX */}
                <div className="rounded-2xl border-2 border-slate-900 bg-slate-950 text-white p-5 sm:p-6 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                        ESTATE WASTE RISK ASSESSMENT
                      </div>
                      <div className="text-lg sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
                        <span>{urgencyLevel}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black border ${badgeStyle}`}>
                      Urgency Score: {urgencyScore} / 100
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                    <div>
                      <strong className="text-white">Recommended Court Remedy: </strong>
                      <span className="text-rose-300 font-bold">{statutoryRemedy}</span>
                    </div>
                    <div>
                      <strong className="text-white">Binding Landmark Authority: </strong>
                      <span className="text-amber-200 font-semibold">{precedentCase}</span>
                    </div>
                    <p className="pt-1 leading-relaxed">{analyticalSummary}</p>
                    <div className="pt-2 border-t border-slate-800 text-emerald-300">
                      <strong>Urgent Courtroom Directive: </strong>
                      <span>{urgentDirective}</span>
                    </div>
                  </div>

                  {/* CTA inside tool */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href="/services/high-court-testamentary-suit-contested-will-defense"
                      className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <Gavel className="w-4 h-4" />
                      <span>Retain High Court Testamentary Counsel</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs text-center transition-colors"
                    >
                      Consult Will Dispute Advocate
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: ORDER 40 RULE 1 CPC VS SECTION 247 ISA */}
            <section id="cpc-vs-isa-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY JURISPRUDENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Order 40 Rule 1 CPC vs Section 247 ISA Comparison
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Lawyers often make one big mistake. They apply for a receiver only under Order 40 Rule 1 CPC in a Will case. But <strong>Section 247 ISA</strong> is made specifically for Will disputes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">A</span>
                      <span>Order 40 Rule 1 CPC</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You must show that naming a receiver is just and convenient. The judge asks for strong title proof and proof of severe crime. It is hard to win.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">B</span>
                      <span>Section 247 ISA</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The court acts because no one has clean title to the estate. Showing a real dispute and danger to rent is enough to get a court officer.
                    </p>
                  </div>
                </div>
                <p>
                  The Madras High Court in <em>K.G. Ramaswami Iyer</em> held that Section 247 gives wider power to save the estate than ordinary civil rules.
                </p>
              </div>
            </section>

            {/* SECTION 4: RENTAL INTERCEPTION & COMMERCIAL ASSET VULNERABILITY */}
            <section id="rental-interception-audit" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <DollarSign className="w-4 h-4" />
                <span>INCOME PROTECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Rental Interception &amp; Commercial Estate Waste Audit
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In cities like Mumbai, Delhi, and Bengaluru, rent is the main prize. When the owner dies, one relative takes the keys. That relative tells tenants to pay rent into their own bank account.
                </p>
                <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-950 space-y-2 text-xs sm:text-sm">
                  <div className="font-black flex items-center gap-2 text-rose-950 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>The Big Rental Loss Risk</span>
                  </div>
                  <p>
                    If a trial takes 5 years and monthly rent is ₹5 Lakhs, over ₹3 Crores is taken. If that relative spends the money, you get nothing back later.
                  </p>
                </div>
                <p>
                  Section 247 ISA gives three strong tools to stop this:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Direct Rent Orders to Tenants:</strong> The court tells all tenants to pay rent only to the court officer or court bank account.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Order to Return Stolen Rent:</strong> The court orders the relative to bring back all past rent money and deposit it in court.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Power to Evict Bad Tenants:</strong> The administrator has power to sue any tenant who uses the family fight to stop paying rent.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 5: MANAGING RUNNING BUSINESSES & FACTORY OPERATIONS */}
            <section id="running-business-safeguard" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Briefcase className="w-4 h-4" />
                <span>COMMERCIAL ENTERPRISE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Managing Running Businesses &amp; Factories in Probate
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  What if the deceased left a factory or a trading firm? Unlike a flat, a business dies if no one can sign bills for a month.
                </p>
                <p>
                  In these cases, the High Court gives the administrator special business powers:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Key className="w-4 h-4 text-[#C65378]" />
                      <span>Daily Work</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The officer signs salary sheets, runs office bank accounts, and pays vendor bills under monthly court scrutiny.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#5F7E75]" />
                      <span>Tax Filings</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The court officer signs GST and TDS returns on time. This saves the firm from big tax fines and bank freezes.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-600" />
                      <span>Stock Safety</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The officer makes a full list of factory stock. This stops bad staff or relatives from selling goods in secret.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: INTERIM COURT RECEIVER FEES & HIGH COURT COMMISSION */}
            <section id="receiver-remuneration-fees" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>FINANCIAL ESTIMATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Interim Court Receiver Fees &amp; High Court Commission
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Under Section 247 ISA, the court sets fair pay for the administrator. Use the tool below to estimate fees and net saved funds:
              </p>

              {/* Interactive Receiver Fee Calculator Card */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-900 uppercase">
                      Monthly Rental / Realization (₹)
                    </label>
                    <input
                      type="number"
                      value={estMonthlyRent}
                      onChange={(e) => setEstMonthlyRent(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      step="25000"
                    />
                    <div className="text-[11px] text-slate-500">Gross monthly revenue to collect.</div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-900 uppercase">
                      Estimated Trial Duration (Years)
                    </label>
                    <select
                      value={estLitigationYears}
                      onChange={(e) => setEstLitigationYears(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value={1}>1 Year (Expedited Hearing)</option>
                      <option value={2}>2 Years</option>
                      <option value={3}>3 Years (Typical High Court)</option>
                      <option value={4}>4 Years</option>
                      <option value={5}>5 Years (High-Stakes Multi-Tier)</option>
                    </select>
                    <div className="text-[11px] text-slate-500">Anticipated duration of probate suit.</div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-900 uppercase">
                      Receiver Commission Rate (% gross)
                    </label>
                    <select
                      value={receiverRatePercent}
                      onChange={(e) => setReceiverRatePercent(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value={1.5}>1.5% (High Court Official Receiver)</option>
                      <option value={2.5}>2.5% (Moderate Scale)</option>
                      <option value={3.0}>3.0% (Advocate Commissioner Standard)</option>
                      <option value={5.0}>5.0% (Complex Commercial Operations)</option>
                    </select>
                    <div className="text-[11px] text-slate-500">Scale sanctioned under HC rules.</div>
                  </div>
                </div>

                {/* Calculation Outputs Strip */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-700">
                    <div className="pt-2 sm:pt-0">
                      <div className="text-xs uppercase text-slate-400 font-bold">Monthly Fee</div>
                      <div className="text-lg sm:text-xl font-black text-rose-300 mt-0.5">
                        ₹{receiverFinancials.monthlyFee.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="pt-2 sm:pt-0">
                      <div className="text-xs uppercase text-slate-400 font-bold">Annual Admin Cost</div>
                      <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                        ₹{receiverFinancials.annualFee.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="pt-2 sm:pt-0">
                      <div className="text-xs uppercase text-slate-400 font-bold">Total Inflow Protected</div>
                      <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                        ₹{receiverFinancials.totalProtectedInflow.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="pt-2 sm:pt-0">
                      <div className="text-xs uppercase text-slate-400 font-bold">Surety Bond Amount</div>
                      <div className="text-lg sm:text-xl font-black text-amber-300 mt-0.5">
                        ₹{receiverFinancials.estimatedSuretyBond.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                    <span>Net Protected Estate Corpus (Deposited in Court FDs):</span>
                    <strong className="text-emerald-300 text-sm">
                      ₹{receiverFinancials.netSafeguardedCorpus.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SURETY BOND & SECTION 291 ISA RULES */}
            <section id="surety-bond-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSignature className="w-4 h-4" />
                <span>STATUTORY SURETIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Administration Bond &amp; Surety Rules Under Section 291
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  What stops an administrator from misusing estate cash? Indian law has strict safety rules. Under <strong>Section 291 ISA</strong>, the person named must sign a formal court bond with sureties.
                </p>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="font-bold text-slate-900">Key Surety Rules Under Section 291 ISA:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Bond Value:</strong> The bond equals movable wealth plus 1 to 2 years of rent.</li>
                    <li><strong>Solvent Sureties:</strong> Two sureties must show land deeds and prove net worth.</li>
                    <li><strong>Regular Accounts:</strong> The administrator must submit audited accounts every three months.</li>
                    <li><strong>Court Officers Exempt:</strong> If the court names its own Official Receiver, no private bond is needed.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 8: SECTION 247 PETITION READINESS CHECKLIST */}
            <section id="petition-readiness-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCheck className="w-4 h-4" />
                <span>PETITION READINESS CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Section 247 Petition Readiness &amp; Verification Checklist
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Before you file in court, make sure these six key papers and facts are ready:
              </p>

              {/* Interactive Checklist Box */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                    Petition Evidentiary Readiness
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-[#C65378]">
                    {readinessScore}% Completed
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C65378] h-full transition-all duration-300"
                    style={{ width: `${readinessScore}%` }}
                  />
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {[
                    {
                      key: "lisPendensProof",
                      title: "Certified Copy of Caveat and Suit Conversion Order",
                      desc: "Shows that the Will fight is officially active in court.",
                    },
                    {
                      key: "primaFacieWasteEvidence",
                      title: "Proof of Rent Siphoning or Asset Danger",
                      desc: "Bank entries, receipts, or letters showing missing rent.",
                    },
                    {
                      key: "detailedAssetSchedule",
                      title: "Schedule A of Land, Flats and Movables",
                      desc: "Clear property boundaries, flat numbers, and city survey plots.",
                    },
                    {
                      key: "tenantRentRoll",
                      title: "Schedule B Rent Roll and Tenant Details",
                      desc: "Tenant names, shop numbers, and monthly rent dues.",
                    },
                    {
                      key: "receiverCategoryChosen",
                      title: "Choice of Proposed Court Administrator",
                      desc: "High Court Official Receiver or Senior Advocate Commissioner.",
                    },
                    {
                      key: "suretyBondPrepared",
                      title: "Draft Administration Bond with Sureties",
                      desc: "Draft bond prepared under High Court Testamentary Rules.",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      onClick={() => toggleChecklistItem(item.key as any)}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={readinessChecklist[item.key as keyof typeof readinessChecklist]}
                        onChange={() => {}}
                        className="mt-0.5 h-4 w-4 rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PRECEDENT MATCHER */}
            <section id="precedent-matcher" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>CASE LAW ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Precedent Matcher: Key High Court &amp; SC Rulings
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Click a landmark ruling below to see how courts decided real estate disputes:
              </p>

              {/* Precedent Tabs */}
              <div className="flex flex-wrap gap-2 pt-1">
                {PRECEDENTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedPrecedent(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedPrecedent === item.id
                        ? "bg-[#C65378] text-white shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {item.title.split("v.")[0].trim()}
                  </button>
                ))}
              </div>

              {/* Selected Precedent Card */}
              {(() => {
                const current = PRECEDENTS.find((p) => p.id === selectedPrecedent) || PRECEDENTS[0];
                return (
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">{current.title}</div>
                        <div className="text-xs text-slate-500">{current.bench}</div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-rose-50 text-[#C65378] text-[11px] font-bold">
                        Court Ruling
                      </span>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                      <div>
                        <strong className="text-slate-900">Dispute Scenario: </strong>
                        <span>{current.scenario}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900">Court Decision: </strong>
                        <p className="mt-0.5 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-800">
                          &ldquo;{current.ratio}&rdquo;
                        </p>
                      </div>
                      <div className="pt-1 flex items-start gap-2 text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Litigation Takeaway: {current.keyTakeaway}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>PROCEDURAL LITIGATION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Appointing Court Receiver in Will Suit
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Follow these five clear steps to get a court receiver named under Section 247 ISA:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Enter a Caveat in Court</strong>
                    <p className="text-slate-600">
                      File a caveat under Section 284 ISA. This turns the probate file into a regular suit. Section 247 power starts immediately.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Collect Proof of Rent Siphoning</strong>
                    <p className="text-slate-600">
                      Gather unpaid bills, tax notices, and bank receipts. Show the judge that one person is taking rent without sharing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">File Section 247 Application</strong>
                    <p className="text-slate-600">
                      Draft an application under Section 247 ISA read with Order 40 CPC. Add a sworn affidavit showing urgent danger to estate funds.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Seek Urgent Restraint Orders</strong>
                    <p className="text-slate-600">
                      On day one, ask the judge to stop any sale of land. Ask for orders to make tenants pay rent into court.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Take Possession with Court Officer</strong>
                    <p className="text-slate-600">
                      When the order passes, go with the court officer to the site. The officer makes a list of items and gives notices to tenants.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: LITIGATION CASE STUDIES */}
            <section id="litigation-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <History className="w-4 h-4" />
                <span>COURTROOM PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Practical Litigation Case Studies Across Indian Courts
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Read three real court cases showing how Section 247 saved valuable property:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">Case 1: Mumbai Office Floors</div>
                  <div className="text-[11px] text-[#C65378] font-bold">Bombay High Court</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father left 4 office floors with ₹18 Lakhs monthly rent. One son took all rent into his personal account. The other son filed under Section 247. The High Court named a receiver, made tenants pay to court, and got back ₹1.8 Crores in rent.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">Case 2: Delhi Parts Factory</div>
                  <div className="text-[11px] text-[#C65378] font-bold">Delhi High Court</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A factory owner died leaving a challenged Will. One brother tried to sell machines as scrap. The court named an advocate under Section 247. The lawyer paid workers, renewed licenses, and saved the plant.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">Case 3: Bengaluru Land Threat</div>
                  <div className="text-[11px] text-[#C65378] font-bold">City Civil Court</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A family fought over 12 acres of prime city land. A local builder tried to start work with one relative. The court named a receiver, put up court boards, and froze all revenue mutation.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: COURTROOM PETITION TEMPLATE & COPY BOX */}
            <section id="courtroom-petition-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LEGAL DRAFTS &amp; TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Courtroom Checklist &amp; Section 247 Petition Template
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Use our verified legal draft formats below for filing Section 247 applications in Indian High Courts or District Courts:
              </p>

              {/* Template Box 1: Section 247 Petition */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <FileSignature className="w-4 h-4 text-[#C65378]" />
                    <span>Section 247 ISA Application Draft (Court Receiver Appointment)</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyPetitionToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    {copiedPetition ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Application</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed max-h-72 overflow-y-auto">
                  <p>IN THE HIGH COURT OF JUDICATURE AT [CITY] / IN THE COURT OF THE DISTRICT JUDGE</p>
                  <p>TESTAMENTARY AND INTESTATE JURISDICTION</p>
                  <p>TESTAMENTARY SUIT NO. ______ OF 2026</p>
                  <p>IN THE MATTER OF THE ESTATE OF LATE [NAME OF DECEASED], DECEASED</p>
                  <p>AND</p>
                  <p>IN THE MATTER OF SECTION 247 OF THE INDIAN SUCCESSION ACT, 1925 READ WITH ORDER XL RULE 1 CPC</p>
                  <p className="mt-2 text-rose-300">PRAYER CLAUSES:</p>
                  <p>(a) Appoint the Court Receiver / an Advocate Commissioner as Administrator Pendente Lite under Section 247 ISA;</p>
                  <p>(b) Direct all commercial tenants to pay rents directly into court;</p>
                  <p>(c) Restrain Respondent from alienating or creating encumbrances;</p>
                  <p>(d) Direct rendering of accounts of past collections since testator death.</p>
                </div>
              </div>

              {/* Template Box 2: Affidavit of Irreparable Waste */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 text-[#5F7E75]" />
                    <span>Affidavit of Urgent Estate Waste (Order XL Rule 1 CPC)</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyAffidavitToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    {copiedAffidavit ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Affidavit</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto">
                  <p>AFFIDAVIT OF URGENT ESTATE WASTE &amp; IRREPARABLE INJURY</p>
                  <p>1. That the Respondent is collecting rents of Rs. [Amount] without depositing with court.</p>
                  <p>2. That municipal taxes and GST liabilities are in default, risking property attachment.</p>
                  <p>3. That irreparable injury will occur unless property is placed in custodia legis.</p>
                </div>
              </div>
            </section>

            {/* SECTION 13: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; TRUST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Institutional Profile: High Court Testamentary Litigation
              </h3>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#172228] text-white flex items-center justify-center font-black text-xl">
                    AMA
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-base">AMA Legal Solutions</div>
                    <div className="text-xs text-slate-500">Testamentary, Succession &amp; High Court Litigation Counsel</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  WillDrafting.in is an institutional legal initiative powered by AMA Legal Solutions. Our senior testamentary litigators represent clients across the Supreme Court of India, Delhi High Court, Bombay High Court, Calcutta High Court, and Madras High Court in high-stakes Will contests, Section 247 receiver applications, caveat defenses, and cross-border estate disputes.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-lg font-black text-[#172228]">50+ Yrs</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Cumulative Practice</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-lg font-black text-[#172228]">100%</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Statutory Fidelity</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-lg font-black text-[#172228]">5 High Courts</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Direct Pan-India Reach</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-lg font-black text-[#172228]">Custodia Legis</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Asset Preservation</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 14: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Administrator Pendente Lite
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Clear legal answers to the most common questions regarding Section 247 ISA and interim estate protection during probate suits:
              </p>

              <div className="space-y-3">
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
                        className="w-full py-4 px-5 text-left flex items-center justify-between gap-3 text-slate-900 font-extrabold text-xs sm:text-sm hover:bg-slate-50/70"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ExternalLink className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Statutory Citations &amp; Judicial Testamentary Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  Official statutory repositories and verified governmental sources for testamentary litigation research:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-900">•</span>
                    <span>
                      <strong>Indian Succession Act, 1925 (Act No. 39 of 1925):</strong> Sections 213, 214, 218, 247 (Administration pendente lite), 263 (Revocation), 269 (Protection of property), 284 (Caveats), and 291 (Administration bond) via{" "}
                      <a
                        href="https://www.indiacode.nic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C65378] underline font-semibold"
                      >
                        India Code Legislative Repository
                      </a>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-900">•</span>
                    <span>
                      <strong>Code of Civil Procedure, 1908 (Act No. 5 of 1908):</strong> Order XL Rules 1 to 5 (Appointment of Receivers), Order XXXIX Rules 1 &amp; 2 (Temporary Injunctions), and Section 151 (Inherent Powers).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-900">•</span>
                    <span>
                      <strong>Supreme Court of India Official Judicial Portal:</strong> Search landmark rulings on testamentary suits and receivership via{" "}
                      <a
                        href="https://www.sci.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C65378] underline font-semibold"
                      >
                        Supreme Court of India (sci.gov.in)
                      </a>.
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY LITIGATION ACTION CARDS
              ===================================================================== */}
          <aside className="sticky top-24 space-y-4">
            {/* Consultation Action Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#C65378] tracking-wider">
                <Gavel className="w-4 h-4" />
                <span>URGENT ESTATE DEFENSE</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 leading-snug">
                Is an Adversary Siphoning Estate Rents or Looting Assets?
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Do not allow a contested probate trial to drain the estate. Our High Court litigators prepare emergency Section 247 ISA petitions to appoint court receivers within 7 days.
              </p>
              <div className="space-y-2 pt-1">
                <Link
                  href="/services/high-court-testamentary-suit-contested-will-defense"
                  className="w-full py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs text-center transition-colors block shadow-sm"
                >
                  Retain Testamentary Counsel
                </Link>
                <Link
                  href="/contact"
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs text-center transition-colors block"
                >
                  Schedule Case Review
                </Link>
              </div>
            </div>

            {/* Quick Statutory Rules Box */}
            <div className="rounded-2xl border border-slate-200 bg-[#FAF7F0] p-4 text-xs space-y-2.5 text-slate-700">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
                <span>High Court Practice Rules</span>
              </div>
              <ul className="space-y-1.5 text-[11px] leading-relaxed">
                <li>• <strong>Bombay High Court:</strong> Rules 397-405, Original Side Testamentary Rules.</li>
                <li>• <strong>Delhi High Court:</strong> Chapter XVII, Original Side Practice Directions.</li>
                <li>• <strong>Calcutta High Court:</strong> Chapter XXXV, Testamentary and Intestate Rules.</li>
                <li>• <strong>Madras High Court:</strong> Order XXV, Original Side Rules for Probate.</li>
              </ul>
            </div>

            {/* Related Micro-Tools Links */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs space-y-3">
              <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-[#C65378]" />
                <span>Related Succession Tools</span>
              </div>
              <div className="space-y-2">
                <Link
                  href="/tools/hostile-witness-will-proof-bsa-section-68-checker"
                  className="block p-2 rounded-lg hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <div className="font-bold text-slate-900 text-[11px]">Hostile Witness Will Proof Checker</div>
                  <div className="text-[10px] text-slate-500">BSA Sections 67, 68 &amp; 70</div>
                </Link>
                <Link
                  href="/tools/ancestral-vs-self-acquired-property-classifier"
                  className="block p-2 rounded-lg hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <div className="font-bold text-slate-900 text-[11px]">Ancestral vs Self-Acquired Classifier</div>
                  <div className="text-[10px] text-slate-500">Hindu Succession Act Sec 8 vs Sec 6</div>
                </Link>
                <Link
                  href="/tools/probate-court-fee-timeline-calculator"
                  className="block p-2 rounded-lg hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <div className="font-bold text-slate-900 text-[11px]">Probate Court Fee Calculator</div>
                  <div className="text-[10px] text-slate-500">State-wise stamp duty &amp; fees</div>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* =========================================================================
          LAYER 4: BOTTOM FULL-WIDTH DUAL CONVERSION CTA
          ========================================================================= */}
      <section className="w-full bg-[#172228] text-white py-14 sm:py-16 mt-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>PROTECT YOUR TESTAMENTARY INHERITANCE TODAY</span>
          </div>
          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Stop Estate Waste and Place Assets in Custodia Legis
          </div>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Do not let adversarial co-heirs or unauthorized executors usurp rental revenues while probate litigation is pending. Protect your family legacy through prompt High Court intervention.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/services/high-court-testamentary-suit-contested-will-defense"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Gavel className="w-4 h-4" />
              <span>Retain High Court Will Defense Counsel</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <span>Schedule Confidential Case Review</span>
              <ArrowRight className="w-4 h-4 text-[#C65378]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
