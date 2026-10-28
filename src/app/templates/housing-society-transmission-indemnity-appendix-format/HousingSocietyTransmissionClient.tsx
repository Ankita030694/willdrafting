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
  Calculator,
  Percent,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  ArrowDownRight,
  Layers,
  Globe,
  Coins,
  ShieldAlert,
  ScrollText,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique IDs)
const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Legal Framework: MCS Act & Bye-Laws" },
  { id: "nominee-vs-legal-heir", label: "2. Nominee vs Legal Heir Rights: SC Precedent" },
  { id: "transmission-calculator", label: "3. CHS Transfer Route & Fee Tool" },
  { id: "appendix-15-format", label: "4. Appendix 15: Form by Nominee" },
  { id: "appendix-16-format", label: "5. Appendix 16: Form by Legal Heirs" },
  { id: "appendix-17-format", label: "6. Appendix 17: Public Notice Format" },
  { id: "appendix-19-format", label: "7. Appendix 19: Indemnity Bond Format" },
  { id: "transmission-paths-table", label: "8. Comparison Table: Transfer Paths" },
  { id: "society-transfer-charges", label: "9. Stopping Illegal Society Transfer Fees" },
  { id: "transmission-sop-timeline", label: "10. Step-by-Step SOP & 90-Day Timeline" },
  { id: "real-case-studies", label: "11. Case Studies: Mumbai, Pune & Thane CHS" },
  { id: "institutional-profile", label: "12. Legal Backing & Lawyer Profile" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Legal Citations & Portals" },
];

const FAQS = [
  {
    q: "Does nomination in a housing society make the nominee the absolute owner of the flat?",
    a: "No. In the landmark judgment Indrani Wahi v. Registrar of Co-operative Societies (2016) 6 SCC 440, the Supreme Court of India settled this question conclusively. The Court ruled that a cooperative housing society must transfer shares into the nominee's name, but the nominee holds those shares solely as a trustee or fiduciary on behalf of all lawful legal heirs. Nomination does not override no-Will estate laws or Will gifts in a Will. Legal heirs can file for split or enforce their estate rights at any time.",
  },
  {
    q: "Can a housing society demand ₹25,000 or ₹1,00,000 as transfer fee or donation upon death?",
    a: "Strictly NO. Under Maharashtra Government Circular No. CHS 2001/M.No.188/14-C dated 09-08-2001 issued under Section 79A of the MCS Act, the ₹25,000 transfer premium cap applies exclusively to voluntary sale transfers between living persons. In the case of TRANSMISSION (transfer upon death to a nominee or legal heir), the allowable transfer premium is ₹0. The society can only collect a ₹100 entrance fee and a ₹500 nominal share transfer fee. Any extortion under 'building repair fund' or 'corpus donation' is illegal.",
  },
  {
    q: "What is the difference between Appendix 15 and Appendix 16 in Maharashtra housing societies?",
    a: "Appendix 15 is used when the deceased member filed an official nomination form (Appendix 14) during their lifetime, and the nominated single applies for membership. Appendix 16 is used when the deceased member left NO nomination, or the nominee has predeceased the member, or the nominee refuses membership. Under Appendix 16, surviving legal heirs must apply collectively or authorize one heir through written consent, backed by an Appendix 17 newspaper notice and Appendix 19 indemnity bond.",
  },
  {
    q: "Is a Estate Paper or Probate needed if no nomination was made?",
    a: "No, a court-issued Estate Paper or Probate is not needed in every case. Under Model Bye-Law 35 of the Maharashtra Housing Society Bye-Laws, the managing committee has legal office to admit the legal heir upon receiving Appendix 16, an Appendix 17 public notice in two newspapers (without valid objections after 14 days), an Appendix 19 Indemnity Bond on stamp paper, and Appendix 20 consent letters from other legal heirs. Societies cannot force heirs to court unless there is a genuine title fight.",
  },
  {
    q: "What is an Appendix 19 Indemnity Bond and how much stamp duty is payable on it?",
    a: "Appendix 19 is a legal indemnity bond signed by the applicant legal heir or nominee. It legally indemnifies the cooperative housing society, its managing committee, and its office bearers against any future claims, losses, or legal costs arising from transferring the flat. In Maharashtra, it must be signed on non-judicial stamp paper of ₹200 or ₹500 (under Article 34 of the Maharashtra Stamp Act) and attested by a Notary Public with two witnesses.",
  },
  {
    q: "Why does the society publish a public notice (Appendix 17) in two newspapers?",
    a: "Under Model Bye-Law 35, when transfer is requested without a filed nomination or probated Will, the society must publish a 14-day public notice in two local newspapers (one in Marathi and one in English) at the applicant's expense. This provides formal notice to any unknown heirs, creditors, or claimants to file objections. If no objections are received within 14 days, the society can proceed safely to transfer the share paper.",
  },
  {
    q: "What should an heir do if the housing society delays flat transfer beyond 90 days?",
    a: "Under Section 154B-13 of the MCS Act and Model Bye-Law 35, the managing committee must communicate its decision on the transfer form within 90 days. If the society fails to decide or unlawfully rejects the form, the applicant can file an appeal under Section 23(2) before the Deputy Registrar of Co-operative Societies. The Deputy Registrar can pass an order for deemed membership and direct the society to hand over the share paper.",
  },
  {
    q: "Can a married daughter claim transfer of a deceased father's housing society flat?",
    a: "Yes. Under the Hindu Succession (Amendment) Act, 2005 and Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), married daughters are coparceners with equal estate rights. A housing society cannot deny transfer or membership to a daughter. Also, brothers cannot exclude sisters from the deceased parent's flat unless the sisters sign a filed Release Deed.",
  },
];

export default function HousingSocietyTransmissionClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Copy states for templates
  const [copiedApp15, setCopiedApp15] = useState<boolean>(false);
  const [copiedApp16, setCopiedApp16] = useState<boolean>(false);
  const [copiedApp17, setCopiedApp17] = useState<boolean>(false);
  const [copiedApp19, setCopiedApp19] = useState<boolean>(false);
  const [copiedApp20, setCopiedApp20] = useState<boolean>(false);
  const [copiedObjectionNotice, setCopiedObjectionNotice] = useState<boolean>(false);

  // Free Scenario Tool State
  const [scenarioType, setScenarioType] = useState<
    "nominee_bye_law_34" | "no_nominee_bye_law_35" | "nominee_with_will" | "multi_heir_noc" | "disputed_heirs"
  >("nominee_bye_law_34");
  const [region, setRegion] = useState<"mumbai" | "pune" | "maharashtra_other" | "delhi" | "other_state">("mumbai");
  const [hasNominationForm, setHasNominationForm] = useState<"yes" | "no">("yes");
  const [hasRegisteredWill, setHasRegisteredWill] = useState<"yes" | "no">("no");
  const [numberOfHeirs, setNumberOfHeirs] = useState<number>(2);
  const [allHeirsConsenting, setAllHeirsConsenting] = useState<"yes" | "no">("yes");
  const [societyDemandAmount, setSocietyDemandAmount] = useState<number>(50000);

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

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Fee calculation logic
  const legitimateEntranceFee = 100;
  const legitimateShareTransferFee = 500;
  const legitimateTotalFee = legitimateEntranceFee + legitimateShareTransferFee; // ₹600
  const legitimateTransferPremium = 0; // ₹0 on death transmission!
  const illegalExtortionAmount = Math.max(0, societyDemandAmount - legitimateTotalFee);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Copy helper functions
  const copyText = (text: string, setFn: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-[#C65378]" />
            <span>MCS ACT SECTION 154B-13 • MODEL BYE-LAWS 34 &amp; 35 • SUPREME COURT COMPLIANT</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Housing Society Transfer Form &amp; Appendix Formats
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Complete, lawyer-vetted transfer pack for flat transfer after a member passes away.
            Includes editable <strong>Appendix 15 (Nominee Form)</strong>, <strong>Appendix 16 (Legal Heir Form)</strong>,{" "}
            <strong>Appendix 17 (Public Notice)</strong>, and <strong>Appendix 19 (Indemnity Bond)</strong> with legal protection against illegal society fees.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#transmission-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Check Transfer Route &amp; Fees</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Will for Society Flat</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 Premium</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ON DEATH TRANSMISSION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">90-Day SOP</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STATUTORY DECISION LIMIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Indrani Wahi</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SC NOMINEE TRUSTEE RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Appendix 19</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STAMP DUTY INDEMNITY BOND
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
                Governed under Sections 26, 79A, 154B-13 of Maharashtra Co-operative Societies Act, 1960;
                Model Bye-Laws 34 &amp; 35; and Supreme Court precedent Indrani Wahi v. Registrar of Co-operative Societies.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED VISUAL: HIGH-RESOLUTION OG BANNER */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-md">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/housing-society-transmission-indemnity-appendix-format-og.jpg"
                  alt="Housing Society Share Transfer After Death Appendix 15 16 17 and 19 Indemnity Bond Formats"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[#FAF7F0] border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Building2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span className="font-medium">
                    Official Co-operative Housing Society Model Bye-Laws Transfer Papers Pack
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>MCS Act 2019 Ready</span>
                </span>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: HOUSING SOCIETY FLAT TRANSMISSION</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominee Holds Flat as Trustee:</strong> Under Supreme Court ruling in <em>Indrani Wahi</em>,
                    the society must transfer shares to the nominee. However, the nominee does not become the sole owner;
                    they hold the asset in trust for all lawful legal heirs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Transfer Premium on Death:</strong> Under Government Circular No. CHS 2001/M.No.188/14-C
                    and Section 79A of the MCS Act, transfer upon death attracts <strong>₹0 transfer premium</strong>.
                    Societies can only charge a ₹100 entrance fee and ₹500 nominal share transfer fee.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Appendix 15 vs Appendix 16:</strong> If a nomination was filed during the member's lifetime,
                    apply under Appendix 15. If no nomination exists, surviving heirs apply under Appendix 16 with an
                    Appendix 17 newspaper notice and Appendix 19 indemnity bond.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Legal 90-Day Decision Window:</strong> Under Section 154B-13, the managing committee
                    must decide on the transfer form within 90 days. Unlawful delays allow heirs to approach
                    the Deputy Registrar for deemed membership.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>GOVERNING LEGISLATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Framework: MCS Act &amp; Model Bye-Laws
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                When a flat owner passes away in a cooperative housing society (CHS) in Mumbai, Pune, Thane, or across Maharashtra,
                transferring the share paper and membership is governed by strict legal rules. Unlike an ordinary asset sale,
                this process is termed a <strong>transfer of shares</strong> rather than a transfer.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The Maharashtra Co-operative Societies Act, 1960 (MCS Act) was amended by Maharashtra Act No. 23 of 2019 to introduce
                Chapter XIII-B (Sections 154B-1 to 154B-31), mainly tailored for housing societies. Under Section 154B-13, upon
                the death of a member, the society is obligated to transfer the deceased member's share and interest to the nominee or,
                in the absence of a nominee, to the legal heir or agent recognized by the committee.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Model Bye-Law 34 (With Nomination)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Applies when the deceased member submitted an Appendix 14 nomination form in the society records.
                    The nominee files an form in <strong>Appendix 15</strong> along with the certified death paper,
                    original share paper, and undertaking.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <ScrollText className="w-4 h-4 text-[#5F7E75]" />
                    <span>Model Bye-Law 35 (Without Nomination)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Applies when no nomination was submitted or the nominee has died. Surviving legal heirs apply in{" "}
                    <strong>Appendix 16</strong>, supported by <strong>Appendix 17</strong> (14-day public notice in two newspapers),
                    and <strong>Appendix 19</strong> (Indemnity Bond on stamp paper).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: NOMINEE VS LEGAL HEIR RIGHTS */}
            <section id="nominee-vs-legal-heir" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK SUPREME COURT DOCTRINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Nominee vs Legal Heir Rights: The Supreme Court Rule
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                One of the most persistent misconceptions in Indian real estate is that a nominee named in housing society records
                becomes the absolute owner of the flat upon the member's death. This misconception leads to bitter family fights and
                fraudulent sales.
              </p>
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-3">
                <div className="font-black text-amber-950 flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Landmark Precedent: Indrani Wahi v. Registrar of Co-operative Societies (2016) 6 SCC 440</span>
                </div>
                <p>
                  The Supreme Court of India settled this debate definitively. The apex court ruled that while a cooperative housing
                  society is legally bound to transfer the shares and flat into the name of the valid nominee under cooperative law,
                  the nominee holds that title <strong>solely in a fiduciary capacity as a trustee</strong> for all lawful legal heirs.
                </p>
                <p>
                  Nomination does not create a third line of estate. It does not extinguish the rights of other Class-I legal heirs
                  under the Hindu Succession Act, 1956 or the Indian Succession Act, 1925, nor does it override a filed Will.
                  The nominee cannot sell, mortgage, or gift the flat without the consent or filed release deeds of all legal heirs.
                </p>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Following this judgment and the 2019 MCS Act amendments, Maharashtra introduced the concept of a <strong>Provisional Member</strong>{" "}
                under Section 154B-1(18)(c). A nominee admitted to the society is officially designated as a provisional member until
                the formal succession proceedings or family settlements among legal heirs are concluded.
              </p>
            </section>

            {/* SECTION 3: INTERACTIVE TRANSMISSION CALCULATOR & ROUTE SELECTOR */}
            <section id="transmission-calculator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE COMPLIANCE TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. CHS Transfer Route &amp; Legal Fee Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your family situation below to identify the exact legal route, required appendices, and audit whether your
                society is charging illegal transfer fees:
              </p>

              {/* Calculator Box */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-md space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Selector 1: Scenario */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Transfer Scenario
                    </label>
                    <select
                      value={scenarioType}
                      onChange={(e) => setScenarioType(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="nominee_bye_law_34">Nominee applying under Bye-Law 34 (Nomination on Record)</option>
                      <option value="no_nominee_bye_law_35">Surviving Legal Heirs applying (No Nomination Recorded)</option>
                      <option value="nominee_with_will">Nominee possesses Filed / Probated Will in their favor</option>
                      <option value="multi_heir_noc">Multiple Legal Heirs agreeing on transfer to one heir (NOC)</option>
                      <option value="disputed_heirs">Competing claims / Family fight over flat ownership</option>
                    </select>
                  </div>

                  {/* Selector 2: Jurisdiction */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      City / Area
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="mumbai">Mumbai / MMR / Thane / Navi Mumbai (MCS Act)</option>
                      <option value="pune">Pune / Pimpri-Chinchwad (MCS Act)</option>
                      <option value="maharashtra_other">Rest of Maharashtra (MCS Act)</option>
                      <option value="delhi">Delhi NCR (Delhi Co-operative Societies Act)</option>
                      <option value="other_state">Other Indian State (Cooperative Framework)</option>
                    </select>
                  </div>

                  {/* Selector 3: Number of Surviving Heirs */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Total Surviving Class-I Legal Heirs
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={numberOfHeirs}
                      onChange={(e) => setNumberOfHeirs(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    />
                  </div>

                  {/* Selector 4: Society Demand Amount */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Society Demanding Fee / Donation (₹)
                    </label>
                    <input
                      type="number"
                      step={5000}
                      min={0}
                      value={societyDemandAmount}
                      onChange={(e) => setSocietyDemandAmount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    />
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                        STATUTORY AUDIT RESULT
                      </div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">
                        {scenarioType === "nominee_bye_law_34"
                          ? "Model Bye-Law 34 Route (Nominee Transmission)"
                          : scenarioType === "no_nominee_bye_law_35"
                          ? "Model Bye-Law 35 Route (Legal Heir Transmission Without Nomination)"
                          : scenarioType === "nominee_with_will"
                          ? "Testamentary Succession Route (Will + Nominee)"
                          : scenarioType === "multi_heir_noc"
                          ? "Consensual Family Settlement Route (NOC / Appendix 20)"
                          : "Disputed Title / Section 91 Co-operative Court Route"}
                      </div>
                    </div>
                    <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                      90-Day Legal Mandate
                    </span>
                  </div>

                  {/* Required Appendices Checklist */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Needed Forms &amp; Appendices Required:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {scenarioType === "nominee_bye_law_34" || scenarioType === "nominee_with_will" ? (
                        <>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span><strong>Appendix 15:</strong> Form by Nominee</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span><strong>Death Paper:</strong> Original/Certified copy</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span><strong>Share Paper:</strong> Original for endorsement</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span><strong>Appendix 18 / 19:</strong> Indemnity Bond</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span><strong>Appendix 16:</strong> Form by Legal Heirs</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span><strong>Appendix 17:</strong> 14-day Newspaper Notice</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span><strong>Appendix 19:</strong> Indemnity Bond on Stamp Paper</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span><strong>Appendix 20:</strong> Consent Letters / NOC from {numberOfHeirs - 1} co-heirs</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Fee Audit Card */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-600">Legal Society Fees Allowed by Law:</span>
                      <span className="font-extrabold text-slate-900">
                        {formatINR(legitimateTotalFee)} (₹100 Entrance + ₹500 Transfer Fee)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-600">Transfer Premium / "Donation" on Transfer:</span>
                      <span className="font-extrabold text-emerald-700">₹0 (Strictly Prohibited under Section 79A)</span>
                    </div>

                    {societyDemandAmount > legitimateTotalFee ? (
                      <div className="pt-2 border-t border-slate-100 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                        <div className="flex items-center justify-between font-black text-xs sm:text-sm">
                          <span className="flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 text-rose-600" />
                            <span>ILLEGAL OVERCHARGE DETECTED:</span>
                          </span>
                          <span className="text-rose-700 font-extrabold">{formatINR(illegalExtortionAmount)}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-rose-800">
                          Your society is demanding {formatINR(societyDemandAmount)}. By law, you are only liable to pay{" "}
                          <strong>₹600</strong> plus actual newspaper publication bills. You can save{" "}
                          <strong>{formatINR(illegalExtortionAmount)}</strong> by issuing our legal objection notice citing
                          Government Circular No. CHS 2001/M.No.188/14-C.
                        </p>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-slate-100 text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Society fee demand is within legal limits.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: APPENDIX 15 FORMAT */}
            <section id="appendix-15-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>EDITABLE TEMPLATE 1</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Appendix 15: Form of Form by Nominee Member
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this legal form format under <strong>Model Bye-Law 34</strong> if the deceased member previously submitted
                a valid nomination in your name. Fill in the bracketed placeholders and submit it to the Society Secretary along with
                the death paper and original share paper.
              </p>

              {/* Template Box 1: Appendix 15 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Appendix 15: Form of Form for Membership by Nominee
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `FORM NO. 15 (Under the Bye-Law No. 34)
FORM OF APPLICATION FOR MEMBERSHIP OF THE SOCIETY BY THE NOMINEE

To,
The Secretary / Chairman,
[Exact Registered Name of the Co-operative Housing Society Ltd.],
[Registered Address of the Society],
[City, District, State - PIN Code]

Sir / Madam,

1. I, [Full Legal Name of Applicant/Nominee], residing at [Complete Residential Address], hereby apply for membership of the [Name of the Society Ltd.] and for transfer of the shares and interest of late [Full Name of Deceased Member], who was holding Flat No. [Flat/Unit Number] in the building of the Society, and Share Certificate No. [Certificate Number] for 5 fully paid-up shares bearing distinctive numbers from [Start No.] to [End No.] (both inclusive).

2. The said [Full Name of Deceased Member] departed this life on [Date of Death] at [Place of Death]. A certified true copy of the Death Certificate issued by the Municipal Corporation / Competent Authority bearing Registration No. [Reg No.] dated [Date] is enclosed herewith as Exhibit 'A'.

3. The deceased member had, during his/her lifetime, duly nominated me as his/her nominee in accordance with Rule 25 of the Maharashtra Co-operative Societies Rules, 1961, and Bye-Law No. 32 of the Society, under Nomination Form No. [Nomination Ref Number if known] dated [Date of Nomination], which is on record in the Society's Nomination Register.

4. I declare that I hold the said shares and interest in the flat subject to the rights of all lawful legal heirs under the applicable law of succession as enunciated by the Hon'ble Supreme Court of India in Indrani Wahi v. Registrar of Co-operative Societies.

5. I enclose herewith:
   (a) Certified true copy of the Death Certificate of late [Name of Deceased Member].
   (b) Original Share Certificate No. [Certificate No.] for necessary endorsement.
   (c) Entrance fee of Rs. 100/- and Share Transfer Fee of Rs. 500/- vide Cheque/NEFT No. [Transaction Details] dated [Date].
   (d) My recent passport-size photograph and copy of PAN Card and Aadhaar Card.
   (e) Undertaking / Indemnity Bond in Appendix 18/19.

6. I undertake to abide by the Bye-Laws of the Society and the amendments made thereto from time to time.

I request you to kindly place this application before the Managing Committee at its next meeting and admit me as a Member of the Society.

Yours faithfully,

_______________________________
(Signature of Applicant / Nominee)
Name: [Full Legal Name of Nominee]
Mobile No.: [Mobile Number]
Email: [Email Address]
Date: [Date of Application]
Place: [City/Place]`,
                        setCopiedApp15
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedApp15 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Appendix 15</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96">
{`FORM NO. 15 (Under the Bye-Law No. 34)
FORM OF APPLICATION FOR MEMBERSHIP OF THE SOCIETY BY THE NOMINEE

To,
The Secretary / Chairman,
[Exact Registered Name of the Co-operative Housing Society Ltd.],
[Registered Address of the Society],
[City, District, State - PIN Code]

Sir / Madam,

1. I, [Full Legal Name of Applicant/Nominee], residing at [Complete Residential Address], hereby apply for membership of the [Name of the Society Ltd.] and for transfer of the shares and interest of late [Full Name of Deceased Member], who was holding Flat No. [Flat/Unit Number] in the building of the Society, and Share Certificate No. [Certificate Number] for 5 fully paid-up shares bearing distinctive numbers from [Start No.] to [End No.] (both inclusive).

2. The said [Full Name of Deceased Member] departed this life on [Date of Death] at [Place of Death]. A certified true copy of the Death Certificate issued by the Municipal Corporation / Competent Authority bearing Registration No. [Reg No.] dated [Date] is enclosed herewith as Exhibit 'A'.

3. The deceased member had, during his/her lifetime, duly nominated me as his/her nominee in accordance with Rule 25 of the Maharashtra Co-operative Societies Rules, 1961, and Bye-Law No. 32 of the Society, under Nomination Form No. [Nomination Ref Number if known] dated [Date of Nomination], which is on record in the Society's Nomination Register.

4. I declare that I hold the said shares and interest in the flat subject to the rights of all lawful legal heirs under the applicable law of succession as enunciated by the Hon'ble Supreme Court of India in Indrani Wahi v. Registrar of Co-operative Societies.

5. I enclose herewith:
   (a) Certified true copy of the Death Certificate of late [Name of Deceased Member].
   (b) Original Share Certificate No. [Certificate No.] for necessary endorsement.
   (c) Entrance fee of Rs. 100/- and Share Transfer Fee of Rs. 500/- vide Cheque/NEFT No. [Transaction Details] dated [Date].
   (d) My recent passport-size photograph and copy of PAN Card and Aadhaar Card.
   (e) Undertaking / Indemnity Bond in Appendix 18/19.

6. I undertake to abide by the Bye-Laws of the Society and the amendments made thereto from time to time.

I request you to kindly place this application before the Managing Committee at its next meeting and admit me as a Member of the Society.

Yours faithfully,

_______________________________
(Signature of Applicant / Nominee)
Name: [Full Legal Name of Nominee]
Date: [Date of Application]
Place: [City/Place]`}
                </pre>
              </div>
            </section>

            {/* SECTION 5: APPENDIX 16 FORMAT */}
            <section id="appendix-16-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>EDITABLE TEMPLATE 2</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Appendix 16: Form by Legal Heirs (No Nominee)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this legal form format under <strong>Model Bye-Law 35</strong> when the deceased member did NOT make
                any nomination during their lifetime, or when the nominee has died. Surviving legal heirs can apply jointly, or one heir
                can apply with written consent (Appendix 20) from all other heirs.
              </p>

              {/* Template Box 2: Appendix 16 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Appendix 16: Form of Form by Legal Heirs (Without Nomination)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `FORM NO. 16 (Under the Bye-Law No. 35)
FORM OF APPLICATION FOR MEMBERSHIP BY THE HEIR AT LAW / LEGAL REPRESENTATIVE WHERE NO NOMINATION EXISTS

To,
The Secretary / Chairman,
[Exact Registered Name of the Co-operative Housing Society Ltd.],
[Registered Address of the Society],
[City, District, State - PIN Code]

Sir / Madam,

1. I/We, [Full Legal Name(s) of Applicant(s)], residing at [Residential Address], hereby apply for membership of [Name of Society Ltd.] and for transfer of the shares and interest of the deceased member late [Full Name of Deceased Member], in Flat No. [Flat Number] and Share Certificate No. [Certificate Number] for 5 fully paid-up shares.

2. The late [Full Name of Deceased Member] passed away intestate on [Date of Death] at [Place of Death]. A certified copy of the Death Certificate is annexed as Exhibit 'A'.

3. To the best of our knowledge and according to the records of the Society, the deceased member did not make any nomination during his/her lifetime / the nominee nominated by the deceased has passed away on [Date].

4. The deceased is survived by the following Class-I legal heirs and no other heirs:
   (i) [Name of Heir 1], Age: [Age], Relationship: [e.g. Widow/Son], Address: [Address]
   (ii) [Name of Heir 2], Age: [Age], Relationship: [e.g. Daughter], Address: [Address]
   (iii) [Name of Heir 3], Age: [Age], Relationship: [e.g. Son], Address: [Address]

5. All other legal heirs have executed their Consent Letters / Affidavits in Appendix 20, relinquishing their right to membership in favor of the Applicant [Name of Applicant], while reserving their statutory succession rights.

6. In accordance with Bye-Law No. 35, I/We request the Society to publish the Public Notice in Appendix 17 in two local newspapers (one in Marathi and one in English) at our cost, inviting claims or objections within 14 days.

7. I/We enclose herewith:
   (a) Certified Death Certificate.
   (b) Original Share Certificate No. [Number].
   (c) Certified Genealogical Tree / Pedigree Affidavit of Legal Heirs.
   (d) Consent Letters / Affidavits in Appendix 20 from other legal heirs.
   (e) Statutory Indemnity Bond in Appendix 19 on Non-Judicial Stamp Paper.
   (f) Entrance fee of Rs. 100/- and Share Transfer Fee of Rs. 500/-.

Yours faithfully,

_______________________________
(Signature of Applicant Legal Heir)
Name: [Full Legal Name]
Date: [Date of Application]
Place: [City/Place]`,
                        setCopiedApp16
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedApp16 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Appendix 16</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96">
{`FORM NO. 16 (Under the Bye-Law No. 35)
FORM OF APPLICATION FOR MEMBERSHIP BY THE HEIR AT LAW / LEGAL REPRESENTATIVE WHERE NO NOMINATION EXISTS

To,
The Secretary / Chairman,
[Exact Registered Name of the Co-operative Housing Society Ltd.],
[Registered Address of the Society],
[City, District, State - PIN Code]

Sir / Madam,

1. I/We, [Full Legal Name(s) of Applicant(s)], residing at [Residential Address], hereby apply for membership of [Name of Society Ltd.] and for transfer of the shares and interest of the deceased member late [Full Name of Deceased Member], in Flat No. [Flat Number] and Share Certificate No. [Certificate Number] for 5 fully paid-up shares.

2. The late [Full Name of Deceased Member] passed away intestate on [Date of Death] at [Place of Death]. A certified copy of the Death Certificate is annexed as Exhibit 'A'.

3. To the best of our knowledge and according to the records of the Society, the deceased member did not make any nomination during his/her lifetime / the nominee nominated by the deceased has passed away on [Date].

4. The deceased is survived by the following Class-I legal heirs and no other heirs:
   (i) [Name of Heir 1], Age: [Age], Relationship: [e.g. Widow/Son], Address: [Address]
   (ii) [Name of Heir 2], Age: [Age], Relationship: [e.g. Daughter], Address: [Address]
   (iii) [Name of Heir 3], Age: [Age], Relationship: [e.g. Son], Address: [Address]

5. All other legal heirs have executed their Consent Letters / Affidavits in Appendix 20, relinquishing their right to membership in favor of the Applicant [Name of Applicant], while reserving their statutory succession rights.

6. In accordance with Bye-Law No. 35, I/We request the Society to publish the Public Notice in Appendix 17 in two local newspapers (one in Marathi and one in English) at our cost, inviting claims or objections within 14 days.

7. I/We enclose herewith:
   (a) Certified Death Certificate.
   (b) Original Share Certificate No. [Number].
   (c) Certified Genealogical Tree / Pedigree Affidavit of Legal Heirs.
   (d) Consent Letters / Affidavits in Appendix 20 from other legal heirs.
   (e) Statutory Indemnity Bond in Appendix 19 on Non-Judicial Stamp Paper.
   (f) Entrance fee of Rs. 100/- and Share Transfer Fee of Rs. 500/-.

Yours faithfully,

_______________________________
(Signature of Applicant Legal Heir)
Name: [Full Legal Name]
Date: [Date of Application]
Place: [City/Place]`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: APPENDIX 17 FORMAT */}
            <section id="appendix-17-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>EDITABLE TEMPLATE 3</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Appendix 17: Public Notice Format for Newspapers
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under Model Bye-Law 35, when transfer is processed without a nomination or probate, the housing society must publish
                this legal 14-day public notice in two local newspapers (one in English and one in Marathi/regional language) at
                the applicant's expense.
              </p>

              {/* Template Box 3: Appendix 17 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Appendix 17: Legal Public Notice for Newspaper Publication
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `FORM NO. 17 (Under the Bye-Law No. 35)
PUBLIC NOTICE

[Name of the Co-operative Housing Society Ltd.]
[Registration No. and Registered Address of the Society]

NOTICE is hereby given that Shri / Smt. [Full Name of Deceased Member], a Member of the [Name of Society Ltd.], holding Flat No. [Flat No.], situated on the [Floor No.] floor in the building known as "[Building Name]", and holding Share Certificate No. [Cert No.] for 5 fully paid-up shares bearing distinctive numbers from [Start No.] to [End No.] (both inclusive), died on [Date of Death] at [Place of Death], without making any nomination.

The Society has received an application for transfer of the said shares and interest of the deceased member in the capital/property of the Society from Shri / Smt. [Full Legal Name of Applicant], residing at [Address], claiming to be the lawful heir / legal representative of the deceased.

The Society hereby invites claims or objections from any other legal heir(s), claimant(s), or persons who have any right, title, interest, or claim in or to the said shares and flat of the deceased member, within a period of 14 (fourteen) days from the date of publication of this notice.

Such claims or objections should be submitted in writing along with documentary evidence in support thereof to the Hon. Secretary of the Society at the address mentioned above.

If no claims or objections are received within the period of 14 days, the Society shall be at liberty to process the transfer of the said shares and interest of the deceased member in favor of the applicant Shri / Smt. [Applicant Name], in accordance with the Bye-Laws of the Society, without any further notice or reference to any person.

Claims or objections received after the expiry of the 14-day period shall not be entertained.

FOR AND ON BEHALF OF
[Name of the Co-operative Housing Society Ltd.]

_______________________________
Hon. Secretary / Chairman
Date: [Date of Publication]
Place: [City/Place]`,
                        setCopiedApp17
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedApp17 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Appendix 17</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-80">
{`FORM NO. 17 (Under the Bye-Law No. 35)
PUBLIC NOTICE

[Name of the Co-operative Housing Society Ltd.]
[Registration No. and Registered Address of the Society]

NOTICE is hereby given that Shri / Smt. [Full Name of Deceased Member], a Member of the [Name of Society Ltd.], holding Flat No. [Flat No.], situated on the [Floor No.] floor in the building known as "[Building Name]", and holding Share Certificate No. [Cert No.] for 5 fully paid-up shares bearing distinctive numbers from [Start No.] to [End No.] (both inclusive), died on [Date of Death] at [Place of Death], without making any nomination.

The Society has received an application for transfer of the said shares and interest of the deceased member in the capital/property of the Society from Shri / Smt. [Full Legal Name of Applicant], residing at [Address], claiming to be the lawful heir / legal representative of the deceased.

The Society hereby invites claims or objections from any other legal heir(s), claimant(s), or persons who have any right, title, interest, or claim in or to the said shares and flat of the deceased member, within a period of 14 (fourteen) days from the date of publication of this notice.

Such claims or objections should be submitted in writing along with documentary evidence in support thereof to the Hon. Secretary of the Society at the address mentioned above.

If no claims or objections are received within the period of 14 days, the Society shall be at liberty to process the transfer of the said shares and interest of the deceased member in favor of the applicant Shri / Smt. [Applicant Name], in accordance with the Bye-Laws of the Society, without any further notice or reference to any person.

Claims or objections received after the expiry of the 14-day period shall not be entertained.

FOR AND ON BEHALF OF
[Name of the Co-operative Housing Society Ltd.]

_______________________________
Hon. Secretary / Chairman
Date: [Date of Publication]
Place: [City/Place]`}
                </pre>
              </div>
            </section>

            {/* SECTION 7: APPENDIX 19 FORMAT */}
            <section id="appendix-19-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>EDITABLE TEMPLATE 4</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Appendix 19: Indemnity Bond Format on Stamp Paper
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under Model Bye-Law 35, the applicant legal heir or nominee must execute an Indemnity Bond in <strong>Appendix 19</strong>.
                This must be printed on Non-Judicial Stamp Paper of <strong>₹200 or ₹500</strong> (as per Article 34 of the Maharashtra Stamp Act),
                signed in the presence of two witnesses, and attested by a Notary Public.
              </p>

              {/* Template Box 4: Appendix 19 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Appendix 19: Form of Indemnity Bond on Non-Judicial Stamp Paper
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `FORM NO. 19 (Under the Bye-Law No. 35)
FORM OF INDEMNITY BOND
(To be executed on Non-Judicial Stamp Paper of Rs. 200/- or Rs. 500/- and Notarized)

THIS INDEMNITY BOND is executed at [City/Place] on this [Day] day of [Month], [Year], by:

Shri / Smt. [Full Legal Name of Applicant Heir], son/daughter/wife of late [Parent/Spouse Name], aged about [Age] years, Indian Inhabitant, residing at [Complete Residential Address], hereinafter called the "OBLIGOR" (which expression shall unless repugnant to the context or meaning thereof include their heirs, executors, administrators, and assigns) of the ONE PART;

IN FAVOR OF:
[Exact Registered Name of Co-operative Housing Society Ltd.], a cooperative society registered under the Maharashtra Co-operative Societies Act, 1960 under Registration No. [Reg No.], having its registered office at [Society Address], hereinafter called the "OBLIGEE" or the "SOCIETY" (which expression shall include its successors, committee members, and assigns) of the OTHER PART.

WHEREAS:
1. One late Shri / Smt. [Full Name of Deceased Member] was a member of the Society holding Flat No. [Flat No.] in the building known as "[Building Name]" and was the holder of Share Certificate No. [Cert No.] for 5 fully paid-up shares bearing distinctive numbers from [Start No.] to [End No.] (both inclusive).

2. The said [Name of Deceased Member] departed this life on [Date of Death] leaving behind the Obligor as his/her lawful legal heir / legal representative under the provisions of personal law of succession.

3. The deceased member had not made any nomination during his/her lifetime / the nominee has predeceased the member, and no succession certificate or letters of administration have been obtained by any person.

4. The Obligor has submitted an application under Form No. 16 requesting the Society to transfer the said shares and interest in the flat to the name of the Obligor.

5. In accordance with Model Bye-Law No. 35, the Society has agreed to transfer the said shares and interest in Flat No. [Flat No.] to the Obligor upon the Obligor executing this Indemnity Bond indemnifying the Society against all claims, demands, and losses.

NOW THIS INDEMNITY BOND WITNESSETH AS FOLLOWS:
1. In consideration of the Society agreeing to transfer the said Share Certificate No. [Cert No.] and interest in Flat No. [Flat No.] into the name of the Obligor, the Obligor hereby agrees and covenants to keep the Society, its Managing Committee, office bearers, and their successors indemnified and harmless at all times against:
   (a) All claims, actions, suits, demands, and proceedings that may be brought or made against the Society by any other legal heir(s), claimants, creditors, or third parties claiming any share, title, or interest in the said flat or shares.
   (b) All losses, damages, costs, charges, legal expenses, advocate fees, and liabilities which the Society may incur or suffer by reason of having transferred the said shares and flat to the Obligor.

2. In the event of any dispute, claim, or adverse claim being made by any other heir or third party, the Obligor shall, at their own expense and cost, defend and resolve such dispute and shall reimburse the Society all costs incurred in relation thereto.

3. The Obligor declares that they hold the said flat and shares subject to the lawful claims and shares of all other co-heirs, if any, under the applicable personal law of succession.

IN WITNESS WHEREOF, the Obligor has put their signature hereto on the day, month, and year first above written.

SIGNED, SEALED AND DELIVERED by the Obligor:

_______________________________
(Signature of Obligor / Applicant)
Name: [Full Legal Name of Applicant]

IN THE PRESENCE OF WITNESSES:
1. Signature: _________________________
   Name: [Witness 1 Name]
   Address: [Witness 1 Address]

2. Signature: _________________________
   Name: [Witness 2 Name]
   Address: [Witness 2 Address]

BEFORE ME,
NOTARY PUBLIC / ADVOCATE`,
                        setCopiedApp19
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedApp19 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Appendix 19</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96">
{`FORM NO. 19 (Under the Bye-Law No. 35)
FORM OF INDEMNITY BOND
(To be executed on Non-Judicial Stamp Paper of Rs. 200/- or Rs. 500/- and Notarized)

THIS INDEMNITY BOND is executed at [City/Place] on this [Day] day of [Month], [Year], by:

Shri / Smt. [Full Legal Name of Applicant Heir], son/daughter/wife of late [Parent/Spouse Name], aged about [Age] years, Indian Inhabitant, residing at [Complete Residential Address], hereinafter called the "OBLIGOR" of the ONE PART;

IN FAVOR OF:
[Exact Registered Name of Co-operative Housing Society Ltd.], registered under Registration No. [Reg No.], having its registered office at [Society Address], hereinafter called the "SOCIETY" of the OTHER PART.

WHEREAS:
1. One late Shri / Smt. [Full Name of Deceased Member] was a member of the Society holding Flat No. [Flat No.] in building "[Building Name]" and holder of Share Certificate No. [Cert No.] for 5 fully paid-up shares.
2. The said member died on [Date of Death] leaving behind the Obligor as lawful legal heir.
3. The deceased member had not made any nomination, and the Obligor has applied in Form No. 16 for transfer of membership.
4. The Society has agreed to transfer the shares and interest upon the Obligor executing this Indemnity Bond.

NOW THIS INDEMNITY BOND WITNESSETH:
1. The Obligor agrees and covenants to keep the Society, its Managing Committee, and office bearers indemnified and harmless at all times against all claims, actions, suits, demands, losses, damages, costs, charges, and legal expenses arising from transferring the said shares and flat to the Obligor.
2. In the event of any adverse claim by any other heir or third party, the Obligor shall, at their own cost, defend and resolve such dispute and reimburse the Society.

SIGNED, SEALED AND DELIVERED by the Obligor:
_______________________________
(Signature of Obligor)

WITNESSES:
1. [Name & Address]
2. [Name & Address]

NOTARIZED BEFORE ME`}
                </pre>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="transmission-paths-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPARATIVE STATUTORY ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparison Table: Transfer Paths &amp; Papers
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Housing societies across Maharashtra follow different procedural standards depending on whether a nomination, Will,
                or family consensus exists. The table below outlines the legal rules for each path:
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs text-slate-700 divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-900 font-extrabold">
                    <tr>
                      <th className="p-3.5">Transfer Route</th>
                      <th className="p-3.5">Legal Bye-Law</th>
                      <th className="p-3.5">Key Papers Required</th>
                      <th className="p-3.5">Newspaper Notice?</th>
                      <th className="p-3.5">Membership Nature</th>
                      <th className="p-3.5">Max Society Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Valid Nomination Recorded</td>
                      <td className="p-3.5">Model Bye-Law 34</td>
                      <td className="p-3.5">Appendix 15, Death Cert, Original Shares</td>
                      <td className="p-3.5 text-slate-500 font-semibold">Not Required</td>
                      <td className="p-3.5 text-blue-700 font-bold">Provisional Member (Trustee)</td>
                      <td className="p-3.5 font-bold text-emerald-700">₹600 Max</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors bg-rose-50/30">
                      <td className="p-3.5 font-bold text-slate-900">No Nomination on Record</td>
                      <td className="p-3.5">Model Bye-Law 35</td>
                      <td className="p-3.5">Appendix 16, Appendix 19 Bond, Pedigree Tree</td>
                      <td className="p-3.5 text-rose-700 font-bold">Needed (14 Days)</td>
                      <td className="p-3.5 text-slate-800 font-bold">Regular Member (Post Notice)</td>
                      <td className="p-3.5 font-bold text-emerald-700">₹600 + Ad Cost</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Probated / Filed Will</td>
                      <td className="p-3.5">Bye-Law 34 / 35</td>
                      <td className="p-3.5">Appendix 15/16, Probate Copy / Will Deed</td>
                      <td className="p-3.5 text-slate-500 font-semibold">Usually Waived</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Absolute Regular Member</td>
                      <td className="p-3.5 font-bold text-emerald-700">₹600 Max</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors bg-slate-50/50">
                      <td className="p-3.5 font-bold text-slate-900">Multiple Consenting Heirs</td>
                      <td className="p-3.5">Model Bye-Law 35</td>
                      <td className="p-3.5">Appendix 16, Appendix 20 NOCs from all co-heirs</td>
                      <td className="p-3.5 text-rose-700 font-bold">Needed (14 Days)</td>
                      <td className="p-3.5 text-slate-800 font-bold">Regular Member (Lead Heir)</td>
                      <td className="p-3.5 font-bold text-emerald-700">₹600 + Ad Cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STOPPING ILLEGAL SOCIETY TRANSFER CHARGES */}
            <section id="society-transfer-charges" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>LEGAL DEFENSE &amp; CONSUMER PROTECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Society Transfer Charges: Defeating Illegal Demands
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Managing committees often exploit grieving families by claiming that "society bye-laws require a ₹50,000 donation"
                or "₹1,00,000 building development fund" to process a flat transfer. These demands are completely illegal under Maharashtra law.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>The Law: Government Circular No. CHS 2001/M.No.188/14-C</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Under Government Circular dated 09-08-2001 issued under Section 79A of the MCS Act, the State Government fixed a statutory
                  ceiling of ₹25,000 on voluntary sale transfers. Crucially, the Government issued explicit directions that{" "}
                  <strong>in case of transfer upon death to a nominee or legal heir, NO TRANSFER PREMIUM (₹0) can be charged</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 space-y-1">
                    <div className="font-black flex items-center gap-1.5 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Legitimate Legal Fees Only</span>
                    </div>
                    <div>• Entrance Fee: <strong>₹100</strong></div>
                    <div>• Nominal Transfer Fee: <strong>₹500</strong></div>
                    <div>• Newspaper Advertisement: <strong>Actual bills only</strong></div>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-950 border border-rose-200 space-y-1">
                    <div className="font-black flex items-center gap-1.5 text-rose-800">
                      <X className="w-3.5 h-3.5 text-rose-600" />
                      <span>Strictly Illegal Extortion Demands</span>
                    </div>
                    <div>• "Building Repair Donation": <strong>Illegal (₹0)</strong></div>
                    <div>• "Society Development Premium": <strong>Illegal (₹0)</strong></div>
                    <div>• "No Objection Paper Fee": <strong>Illegal (₹0)</strong></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-600">
                    Need to send a formal legal objection to your managing committee?
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `LEGAL NOTICE / OBJECTION LETTER TO HOUSING SOCIETY MANAGING COMMITTEE
AGAINST ILLEGAL DEMAND OF TRANSFER CHARGES / DONATION ON TRANSMISSION

To,
The Chairman / Secretary / Managing Committee,
[Name of Co-operative Housing Society Ltd.],
[Address of Society]

SUBJECT: OBJECTION TO UNLAWFUL DEMAND OF TRANSFER CHARGES / DONATION FOR TRANSMISSION OF FLAT NO. [FLAT NO.] UPON DEATH OF MEMBER LATE [NAME OF DECEASED]

Ref: 
1. Application for Transmission dated [Date of Application].
2. Your oral/written demand for payment of Rs. [Demanded Amount]/- under head "[Donation / Building Fund / Transfer Fee]".

Sir / Madam,

1. I am in receipt of your communication demanding payment of Rs. [Amount]/- as a precondition for transferring the shares and membership of Flat No. [Flat No.] into my name following the demise of my late [Parent/Spouse], Shri/Smt. [Name of Deceased].

2. I hereby place on record my formal objection to this demand as being ultra vires, illegal, and in direct contempt of statutory directives issued by the Government of Maharashtra under Section 79A of the Maharashtra Co-operative Societies Act, 1960.

3. Under Government Circular No. CHS 2001/M.No.188/14-C dated 09-08-2001, the State Government has explicitly clarified that NO TRANSFER PREMIUM OR DONATION CAN BE CHARGED IN RESPECT OF TRANSMISSION OF SHARES TO A NOMINEE OR LEGAL HEIR UPON DEATH.

4. The only permissible fees on transmission are:
   - Entrance Fee: Rs. 100/-
   - Nominal Share Transfer Fee: Rs. 500/-
   - Actual reimbursement of newspaper advertisement charges for Form 17 public notice (supported by vendor invoices).

5. In the landmark judgment of the Hon'ble Bombay High Court in The New India Co-operative Housing Society v. State of Maharashtra, it has been settled that housing societies cannot extract coercive donations or fees from legal heirs as a condition for recognizing inheritance.

6. I have already tendered the sum of Rs. 600/- towards the entrance fee and transfer fee.

PLEASE TAKE NOTICE that if the Managing Committee does not place my transmission application on record and issue the share certificate endorsement within 15 days of this letter, I shall be constrained to initiate:
(a) An official complaint before the Deputy Registrar of Co-operative Societies under Section 79A and Section 154B of the MCS Act for disciplinary action and supersession of the Committee;
(b) An appeal under Section 23(2) of the MCS Act for deemed membership; and
(c) Legal proceedings before the Consumer Disputes Redressal Commission for mental agony and unfair trade practice.

Yours faithfully,

_______________________________
[Signature of Applicant Heir/Nominee]
Name: [Full Legal Name]
Flat No.: [Flat Number]
Date: [Date]`,
                        setCopiedObjectionNotice
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#C65378] font-bold text-xs transition-colors shrink-0"
                  >
                    {copiedObjectionNotice ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied Objection Letter!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Legal Objection Letter</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP & 90-DAY TIMELINE */}
            <section id="transmission-sop-timeline" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>CHRONOLOGICAL EXECUTION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Transfer Approval Timeline
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow this 5-stage standard operating step to secure flat transfer within the legal 90-day window
                mandated by Section 154B-13:
              </p>

              {/* Steps Stack */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    01
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                    <div className="font-extrabold text-slate-900">Days 1–15: Intimation of Demise &amp; Nomination Check</div>
                    <p className="leading-relaxed">
                      Submit a formal intimation letter along with a certified city death paper to the Society Secretary.
                      Inspect the society's Nomination Register (Appendix 14) to confirm whether a nomination is officially on record.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    02
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                    <div className="font-extrabold text-slate-900">Days 15–30: Submission of Appendix 15 / 16 &amp; Appendix 19 Bond</div>
                    <p className="leading-relaxed">
                      Execute Appendix 15 (if nominee) or Appendix 16 (if legal heir). Execute the Appendix 19 Indemnity Bond on
                      ₹200/₹500 stamp paper before a Notary Public. Attach original share paper and tender ₹600 fee via bank transfer.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    03
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                    <div className="font-extrabold text-slate-900">Days 30–60: Newspaper Notice (Appendix 17) Publication</div>
                    <p className="leading-relaxed">
                      For Appendix 16 forms, the society issues Appendix 17 in two local newspapers (one Marathi and one English).
                      A needed 14-day window is provided for any competing claimants to submit written objections.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    04
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                    <div className="font-extrabold text-slate-900">Days 60–75: Managing Committee Resolution Approval</div>
                    <p className="leading-relaxed">
                      Upon expiry of the 14 days without objection, the Secretary places the form before the next Managing
                      Committee meeting. The committee formally passes a resolution approving admission of the applicant.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    05
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                    <div className="font-extrabold text-slate-900">Days 75–90: Share Paper Endorsement &amp; Member Register</div>
                    <p className="leading-relaxed">
                      The Chairman and Secretary endorse the applicant's name on the back of the original Share Paper, update
                      the Register of Members (Form I) and List of Members (Form J), and issue a formal Welcome Letter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contextual Link to Capital Gains Calculator */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200/80 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-slate-800">
                  <strong>Selling an Inherited Flat?</strong> Calculate your Budget 2024 grandfathered capital gains tax (12.5% flat vs 20% indexation) with our free tool:
                </div>
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Tax Tool</span>
                </Link>
              </div>
            </section>

            {/* SECTION 11: REAL CASE STUDIES */}
            <section id="real-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>GROUND VALIDATION &amp; PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Real Case Studies: Mumbai, Pune &amp; Thane CHS
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Real-world examples of how Indian families navigated society transfer fights:
              </p>

              <div className="space-y-4">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case 1: Bandra West CHS Demanding ₹1.5 Lakh Building Donation
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Mumbai
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Following his mother's demise, a resident in Bandra West applied for transfer under Appendix 15. The society
                    refused to table his form unless he paid a ₹1,50,000 "sinking fund contribution". The heir issued our
                    legal objection notice citing Government Circular 09-08-2001 and copied the Deputy Registrar. The society backed
                    down within 10 days and transferred the share paper for ₹600.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case 2: Kothrud CHS Flat Without Nomination (Two Daughters)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Pune
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father passed away in Pune without nominating anyone. His two married daughters agreed that the elder sister would
                    be the filed member. They submitted Appendix 16 along with the younger sister's Appendix 20 consent letter,
                    published Appendix 17 in Sakal and Indian Express, and signed an Appendix 19 bond on ₹500 stamp paper. The flat was
                    transmitted smoothly in 55 days without court probate.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case 3: Nominee Brother Excluding Sisters in Navi Mumbai
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Navi Mumbai
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A brother nominated by his late father attempted to sell the Vashi flat claiming exclusive ownership. His sisters
                    filed an objection with the society citing <em>Indrani Wahi</em>. The society admitted the brother solely as a
                    Provisional Member (trustee) and refused to issue an NOC for sale without filed release deeds from both sisters.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>INSTITUTIONAL EXPERTISE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Professional Legal Backing &amp; Lawyer Profile
              </h3>
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-slate-900">Lawyer Anuj Anand Malik</div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Estate &amp; Real Estate Counsel • AMA Legal Solutions
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Bar Council of Maharashtra &amp; Goa / Delhi Bar Council
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Lawyer Anuj Anand Malik leads the Asset Name Change and Estate Practice at AMA Legal Solutions. With over a
                  decade of courtroom and advisory experience across the Bombay High Court, Cooperative Courts, and Maharashtra Real Estate
                  Regulatory Office (MahaRERA), he has advised over 1,500 families on resolving contested flat transmissions, defeating
                  illegal society extortion fees, and drafting bulletproof Will trusts.
                </p>
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600 font-medium">
                    Checked Member: Supreme Court Bar Association (SCBA)
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                  >
                    <span>Request Legal Talk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: CHS Flat Transfer
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plain-English answers to common questions about housing society flat transfer after death in Maharashtra:
              </p>

              {/* Accordion Stack */}
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Citations &amp; Official Cooperative Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Rules of the Maharashtra Co-operative Societies Act, 1960:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Section 26:</strong> Rights and liabilities of members upon cessation or transfer.
                    </li>
                    <li>
                      <strong>Section 79A:</strong> Government powers to issue binding directives and fee caps.
                    </li>
                    <li>
                      <strong>Section 154B-13:</strong> Transfer of interest on death of member in housing societies.
                    </li>
                    <li>
                      <strong>Model Bye-Laws 34 &amp; 35:</strong> Transfer steps with and without nomination.
                    </li>
                    <li>
                      <strong>Supreme Court Judgment:</strong> Indrani Wahi v. Registrar of Co-operative Societies (2016) 6 SCC 440.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://mahasahakar.maharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>MahaSahakar Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: MCS Act 1960</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Estate Services
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/services/property-mutation-dakhil-kharij-service"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Asset Name Change After Death Service
                    </Link>
                    <Link
                      href="/templates/indemnity-bond-format-bank-deceased-claim"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Bank Deceased Claim Indemnity Bond
                    </Link>
                    <Link
                      href="/templates/no-objection-certificate-noc-legal-heirs-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir NOC Paper Format
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Rule Checker
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      SRO Will Filing Service
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear Will keeps your spouse and kids safe. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Do not wait to put your plan in writing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two adult witnesses. Each witness signs in your view to make it valid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team checks your asset list and tax bills. We write your Will in clear words with no mix-ups. Then we guide you step by step so your heirs get their share fast.
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
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Maharashtra Co-operative Societies court fights, flat transfer fights,
                Indrani Wahi nominee trustee defense, and Will Will filing.
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
                  <span>PREVENT FUTURE SOCIETY FLAT DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Children from Flat Estate Hurdles
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A clearly drafted Will filed with the SRO establishes indisputable ownership,
                  bypassing society transfer delays and protecting your family from unlawful fee extortion.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
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
                  <span>DEPUTY REGISTRAR &amp; CHS DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Society Delay or Demands for Illegal Donations?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our cooperative law litigators issue legal Section 79A notices and handle Section 23(2)
                  deemed membership appeals before the Deputy Registrar pan-Maharashtra.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Schedule Lawyer Talk</span>
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
                      <strong>100% Bye-Law Compliant:</strong> Formats checked against Model Bye-Laws 34 &amp; 35.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Fee Protection:</strong> Prevents extortionate society transfer demands.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Supreme Court Backed:</strong> Integrates Indrani Wahi nominee trustee safeguards.
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
          href="#transmission-calculator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Fee Tool</span>
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
