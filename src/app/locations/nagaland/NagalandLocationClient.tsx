"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  Award,
  Scale,
  Building,
  Sparkles,
  HelpCircle,
  FileCheck,
  Check,
  Landmark,
  Home,
  MapPin,
  Search,
  FileQuestion,
  Stamp,
  Scroll,
  Layers,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "nagaland-overview", label: "OVERVIEW" },
  { id: "nagaland-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "nagaland-probate-rules", label: "PROBATE RULES" },
  { id: "nagaland-sro-directory", label: "DISTRICT DIRECTORY" },
  { id: "nagaland-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-nagaland-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "nagaland-property-types", label: "PROPERTY TYPES" },
  { id: "nagaland-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const NAGALAND_SRO_HUBS = [
  {
    id: "kohima-central",
    name: "Kohima Central (DC Office)",
    sro: "DC & Sub-Registrar Office Kohima",
    address: "Deputy Commissioner Office Complex, Treasury Directorate Road, Kohima - 797001",
    areas: "Ministers' Hill, High School Colony, PR Hill, Chandmari, Midland, Naga Hospital Colony, Kohima Village, Jakhama, Meriema",
    timings: "9:30 AM to 4:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "dimapur-urban",
    name: "Dimapur Urban & Commercial Hub",
    sro: "DC & SDO (Civil) Registry Dimapur",
    address: "Deputy Commissioner Office Complex, Circular Road, Dimapur - 797112",
    areas: "Purana Bazaar, Circular Road, Duncan Basti, Supermarket, Burma Camp, Khermahal, Notun Bosti, Signal Angami, Nagarjan",
    timings: "9:30 AM to 4:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "chumoukedima-niuland",
    name: "Chumoukedima & Niuland Hub",
    sro: "DC Office Registry Chumoukedima",
    address: "Deputy Commissioner Complex, National Highway 29, Chumoukedima - 797103",
    areas: "Chumoukedima Town, 4th Mile to 7th Mile, Sovima Village, Seithekema, Niuland Subdivision, Medziphema Town",
    timings: "9:30 AM to 4:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "mokokchung-hub",
    name: "Mokokchung Cultural & Urban Hub",
    sro: "DC Office Registry Mokokchung",
    address: "Deputy Commissioner Office Complex, Main Town, Mokokchung - 798601",
    areas: "Mokokchung Town, Arkong, Dilong, Kumlong, Ungma, Mopungchuket, Chuchuyimlang, Changtongya, Tuli Town",
    timings: "9:30 AM to 4:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "wokha-doyang",
    name: "Wokha & Doyang Agro-Hub",
    sro: "DC Office Registry Wokha",
    address: "Deputy Commissioner Office Complex, Tiyi Hall Road, Wokha - 797111",
    areas: "Wokha Town, Tiyi Foothills, Doyang Hydro Belt, Bhandari Sub-Division, Sanis, Baghty Valley, Pangti Village",
    timings: "9:30 AM to 4:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "tuensang-eastern",
    name: "Tuensang Eastern Nagaland Hub",
    sro: "DC Office Registry Tuensang",
    address: "Deputy Commissioner Office Complex, Tower Clock Area, Tuensang - 798612",
    areas: "Tuensang Town, High School Sector, Bazar Ward, Longkhim Subdivision, Shamator Belt, Noklak Border Corridor",
    timings: "9:30 AM to 4:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "mon-konyak",
    name: "Mon Konyak Territorial Hub",
    sro: "DC Office Registry Mon",
    address: "Deputy Commissioner Office Complex, Mon Town Headquarters - 798621",
    areas: "Mon Town, Tanlao Ward, Chingai, Aboi Sub-Division, Tizit Industrial Belt, Naginimora Border Trade Zone, Tobu",
    timings: "9:30 AM to 4:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed clearly on standard white A4 sheets. Non-judicial stamp paper is not required under Indian and Nagaland succession law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card / Voter ID of Testator",
    detail: "Mandatory for verifying identity and recording official signatures before the Deputy Commissioner or Sub-Registrar.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Attesting Witnesses",
    detail: "Must possess valid photo identity cards and must not be beneficiaries receiving any bequest or property under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Highly recommended for senior testators aged 60 and above to certify complete testamentary mental capacity and lucidity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Self-Acquired Asset Ownership Records",
    detail: "Title deeds, leasehold registration papers, Dimapur/Kohima municipal tax receipts, bank fixed deposit receipts, and demat folios.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Article 371A & Tribal Customary Compliance Review",
    detail: "Verification by legal counsel that ancestral land clauses comply with customary tribal norms and the 1978 land regulation.",
    checked: true,
  },
];

export default function NagalandLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState("nagaland-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState(NAGALAND_SRO_HUBS[0].id);
  const [searchFilter, setSearchFilter] = useState("");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [showHighResModal, setShowHighResModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const item = TOC_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
      }
    } else {
      router.push("/start");
    }
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const filteredHubs = NAGALAND_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    NAGALAND_SRO_HUBS.find((h) => h.id === selectedHub) || NAGALAND_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (NASHIK ARCHITECTURE & THEME)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* LEFT COLUMN: HERO VALUE PROP & CTAs (7 COLS) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs text-xs font-semibold text-rose-200">
                <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                <span>NAGALAND &amp; NORTHEAST SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 52 characters (Compliant with SEO Guidelines & User Heading Requirement) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Nagaland: Asset Protection
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally enforceable Will safeguarding your family assets in Nagaland. Protect urban residential houses in Kohima, commercial properties in Dimapur, bank deposits, and family businesses while respecting Article 371A customary safeguards and the 1978 Land Regulation.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Nagaland Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#nagaland-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Nagaland DC Registry</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Gauhati HC Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Article 371A Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULL VISIBILITY GUARANTEED ACROSS MOBILE & DESKTOP */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group flex items-center justify-center"
              >
                <Image
                  src="/images/will-drafting-in-nagaland.jpg"
                  alt="Legal Will Drafting and Property Succession in Nagaland"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Nagaland Customary &amp; Urban Estate Blueprint
                </span>
                <button
                  onClick={() => setShowHighResModal(true)}
                  className="text-xs text-rose-300 hover:text-white font-bold inline-flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  <span>Enlarge</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUST STATS BAR (MATCHING NASHIK COLOR PALETTE & ARCHITECTURE)
          ========================================================================= */}
      <section className="bg-[#FAF7F0] border-b border-[#172228]/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-0 text-center">
            <div className="p-2 sm:p-3 border-r-0 md:border-r border-slate-200">
              <div className="text-xl sm:text-2xl font-black text-[#C65378]">100%</div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Article 371A Aligned</div>
            </div>
            <div className="p-2 sm:p-3 border-r-0 md:border-r border-slate-200">
              <div className="text-xl sm:text-2xl font-black text-slate-900">16 Districts</div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium">DC Office Registration</div>
            </div>
            <div className="p-2 sm:p-3 border-r-0 md:border-r border-slate-200">
              <div className="text-xl sm:text-2xl font-black text-[#5F7E75]">₹0 Stamp Duty</div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Testamentary Exemption</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-black text-slate-900">48 Hours</div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Lawyer-Drafted Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE STICKY NAVIGATION BAR
          ========================================================================= */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5">
        <div className="relative max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setMobileTocOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs font-bold text-slate-800 cursor-pointer"
            aria-expanded={mobileTocOpen}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#C65378] font-bold">
                JUMP TO:
              </span>
              <span className="truncate text-slate-900 font-extrabold text-xs">
                {currentActiveToc.label}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                mobileTocOpen ? "rotate-180 text-[#C65378]" : ""
              }`}
            />
          </button>

          {mobileTocOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-3 z-40 max-h-[60vh] overflow-y-auto space-y-1">
              {TOC_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileTocOpen(false);
                      const el = document.getElementById(item.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className={`flex items-center px-3 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                      isActive
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-4 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`mr-2.5 ${
                        isActive ? "w-4 h-[1.5px] bg-[#C65378]" : "w-2.5 h-[1px] bg-slate-300"
                      }`}
                    />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTAINER: 2-COLUMN (DESKTOP STICKY MINIMALIST TOC + EDITORIAL CONTENT)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-12">

          {/* DESKTOP VIEW: STICKY SIDEBAR TABLE OF CONTENTS */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]">
              <nav className="space-y-3.5">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="group flex items-center text-[11px] font-mono tracking-[0.14em] uppercase transition-all cursor-pointer"
                    >
                      <span
                        className={`transition-all mr-2.5 rounded-full ${
                          isActive
                            ? "w-6 h-[1.5px] bg-[#C65378]"
                            : "w-3.5 h-[1px] bg-slate-300 group-hover:w-5 group-hover:bg-slate-500"
                        }`}
                      />
                      <span
                        className={`transition-colors ${
                          isActive
                            ? "text-[#C65378] font-bold"
                            : "text-slate-600 group-hover:text-slate-900 font-medium"
                        }`}
                      >
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* MAIN EDITORIAL CONTENT AREA */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 1: EXECUTIVE OVERVIEW */}
            <section id="nagaland-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>EXECUTIVE LEGAL SUMMARY &amp; CONSTITUTIONAL STATUS</span>
                </div>
                {/* H2 <= 70 chars: 55 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Nagaland Succession: Article 371A &amp; Asset Protection
                </h2>
                <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Estate planning in Nagaland presents a unique constitutional landscape in India. Under <strong>Article 371A of the Constitution of India</strong>, customary tribal laws and practices regarding ownership, transfer of land, and civil succession are granted special autonomy against general central statutes. Consequently, succession over ancestral clan land, community terraced fields, and traditional village village sites is governed by specific Naga tribal traditions (such as Angami, Ao, Sumi, Lotha, and Konyak customs).
                  </p>
                  <p>
                    However, the rapid economic expansion of commercial centers like <strong>Dimapur, Kohima, and Chumoukedima</strong> has created substantial modern wealth. Urban RCC residences, commercial markets, transport fleets, corporate shares, insurance policies, and large bank fixed deposits represent <strong>self-acquired assets</strong>. Under the Indian Succession Act, 1925, an individual possesses uninhibited testamentary power to bequeath these self-acquired assets to chosen beneficiaries, including daughters, surviving spouses, and minor children.
                  </p>
                  <p>
                    Without an advocate-drafted Will, families often face protracted inheritance disputes between traditional village elders and urban successors. Our specialized legal platform bridges Naga customary traditions with statutory precision to ensure your hard-earned wealth is securely transferred without ambiguity.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: LEGAL FRAMEWORK */}
            <section id="nagaland-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>CUSTOMARY PROTECTIONS &amp; STATUTORY CODES</span>
                </div>
                {/* H2 <= 70 chars: 58 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Legal Framework: Customary Law vs Indian Succession Act
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate devolution in Nagaland operates under two concurrent legal mechanisms: constitutional protections safeguarding tribal customary heritage, and statutory provisions governing self-acquired property and movable assets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Article 371A &amp; Ancestral Land</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Ancestral Clan &amp; Village Landholdings
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ancestral land held within traditional village boundaries is governed by tribal customary law administered through Dobashi (DB) Courts and Village Councils under the Nagaland Village and Tribal Councils Act. Such lands generally follow patrilineal succession within clan lineage. A Will cannot unlawfully alienate customary clan land outside tribal lineage, preventing village council intervention.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-[#5F7E75] font-bold text-sm">
                    <FileCheck className="w-4 h-4" />
                    <span>Self-Acquired &amp; Movable Wealth</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Urban Real Estate &amp; Financial Portfolios
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 59 of the Indian Succession Act, 1925, any adult of sound mind has full testamentary freedom to bequeath self-acquired properties. Commercial showrooms in Dimapur, town bungalows in Kohima, bank savings, and businesses can be bequeathed freely to daughters, wives, sons, or trusts without customary restrictions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Critical statutory safeguard:</strong> The Nagaland Land and Revenue Regulation (Amendment) Act, 1978 restricts the transfer of agricultural and tribal lands to non-indigenous persons. When executing a Will involving non-indigenous spouses or outside heirs, legal drafting must structure life-interests and financial bequests accurately to avoid regulatory forfeiture.
                </p>
              </div>
            </section>

            {/* SECTION 3: REGISTRATION RULES: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908 COMPLIANCE</span>
                </div>
                {/* H2 <= 70 chars: 54 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Will Registration in Nagaland: DC Office &amp; Book III
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Nagaland. An unwritten or unregistered Will signed before two witnesses is legally valid. However, formal registration before the Deputy Commissioner provides decisive legal advantages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Book III Government Custody
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Registration enters your Will into permanent Book III government records at the Deputy Commissioner registry. This permanently eliminates risks of physical tampering, theft, or deliberate destruction by disinherited parties.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Presumption of Genuineness
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Indian courts and customary Dobashi benches place a strong statutory presumption of testamentary capacity on registered instruments because the registering officer personally verifies the testator&apos;s identity and sound mind.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Swift Municipal Mutation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Kohima Municipal Council (KMC) and Dimapur Municipal Council (DMC) recognize registered Wills for immediate property tax mutation, share certificate substitution, and water connection transfer without expensive court declarations.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: PROBATE RULES */}
            <section id="nagaland-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>GAUHATI HIGH COURT JURISDICTION</span>
                </div>
                {/* H2 <= 70 chars: 55 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Gauhati High Court: Probate Rules for Nagaland Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most frequent misconceptions among property owners in Nagaland is whether an executor must secure court probate before executing a Will. The legal position under Gauhati High Court jurisprudence is unequivocal:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Court Probate Is Not Mandatory in Nagaland
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, probate is mandatory only for Wills executed within or involving properties situated in the historical presidency towns of Mumbai, Kolkata, and Chennai. Because Nagaland falls outside these presidency jurisdictions, <strong>probate is strictly non-compulsory</strong>.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      The Gauhati High Court (Kohima Bench) has consistently held that beneficiaries and executors can establish title and effectuate property transfers directly on the strength of a validly executed and registered Will without obtaining court probate.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 font-medium">
                    Saves beneficiaries ₹50,000 to ₹2,50,000 in civil court probate stamp duty and 2+ years of litigation.
                  </span>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:text-[#a13c5d]"
                  >
                    <span>Draft Probate-Exempt Will</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 5: DISTRICT DIRECTORY */}
            <section id="nagaland-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION OFFICES ACROSS NAGALAND</span>
                </div>
                {/* H2 <= 70 chars: 54 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. District Directory: Nagaland SRO &amp; DC Legal Registry
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  In Nagaland, the Deputy Commissioner (DC), Additional Deputy Commissioner (ADC), or Sub-Divisional Officer (Civil) functions as the District Registrar and Sub-Registrar under the Registration Act, 1908. Select your district hub below to view administrative registry details:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
                {/* SEARCH INPUT */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search by city, district hub, or local ward (e.g. Dimapur, Kohima, Mokokchung, Purana Bazaar)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                  />
                </div>

                {/* SRO TABS */}
                <div className="flex flex-wrap gap-2">
                  {filteredHubs.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedHub === hub.id
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>

                {/* ACTIVE SRO DETAILS CARD */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-[#C65378] font-bold block">
                        JURISDICTIONAL REGISTRY OFFICE
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold self-start sm:self-auto">
                      Book III Wills Registry
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 block">Office Address:</span>
                      <p className="text-slate-600">{activeHubData.address}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 block">Operating Hours:</span>
                      <p className="text-slate-600">{activeHubData.timings}</p>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold text-slate-700 block">Coverage Localities:</span>
                      <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200/60">
                    <span className="text-xs text-slate-500">
                      Standard registration timeline: 1 to 2 business days upon submission.
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                    >
                      <span>Book DC Registry Assistant</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: REGIONAL CITIES (EXACT NASHIK CARD LAYOUT RENAMED TO REGIONAL CITIES) */}
            <section id="nagaland-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                {/* H2 <= 70 chars: 53 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Regional Cities: Area-Wise Will Drafting in Nagaland
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Asset portfolios in Nagaland vary widely from high-value commercial properties in Dimapur and administrative family estates in Kohima to educational infrastructure in Chumoukedima and cultural town holdings in Mokokchung. Our estate advocates provide customized legal drafting, Article 371A safeguards, and Deputy Commissioner registry accompaniment across all key regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: DIMAPUR URBAN & COMMERCIAL CORE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Commercial Capital &amp; Urban Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Dimapur SRO
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Dimapur Urban Core
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Purana Bazaar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Circular Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Duncan Basti</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Supermarket Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Dimapur</strong> for high-value commercial complexes, transport enterprises, wholesale warehouses, and urban residential plots. Formulates legally compliant bequests under the 1978 Land Regulation, shielding commercial income streams and lease contracts from succession disputes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Circular Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Deputy Commissioner registry booking, advocate physical attendance, and Section 31 doorstep execution for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal DC Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Dimapur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Dimapur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: KOHIMA CAPITAL HILL & ADMINISTRATIVE BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        State Capital &amp; Judiciary Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Kohima SRO
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kohima Capital District
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ministers&apos; Hill</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">PR Hill</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">High School Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Midland</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Kohima</strong> for government officials, business proprietors, and established families. Balances Angami customary land norms with the Indian Succession Act for multi-storey town houses, KMC municipal assets, and bank savings to guarantee seamless mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Treasury Directorate Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Senior advocate review, Kohima Bench jurisprudence alignment, and verified Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Administrative &amp; High-Value</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kohima"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kohima Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: CHUMOUKEDIMA & NIULAND CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Highway &amp; Institutional Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Chumoukedima SRO
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Chumoukedima &amp; Niuland
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chumoukedima Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sovima Village</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">4th to 7th Mile</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Seithekema</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Estate planning for rapidly expanding plotted developments along National Highway 29, private institutional properties, sports academies, and agricultural plots in Niuland. Includes clear succession structures for educational and business ventures.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Complex, NH-29, Chumoukedima</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Registration assistance at newly established district registries with door-to-door legal assistance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Highway &amp; Institutional Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Chumoukedima"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Chumoukedima Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: MOKOKCHUNG CULTURAL CENTER */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Ao Pioneer Heartland
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Mokokchung SRO
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mokokchung District
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mokokchung Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Arkong &amp; Dilong</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kumlong</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ungma &amp; Tuli</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative Will drafting across Mokokchung town and surrounding Ao regions. Structured to address Ao customary land inheritance principles, industrial assets in Tuli, and self-acquired town residential complexes without family conflict.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Mokokchung Town</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Comprehensive customary clause drafting and Book III registration before the Mokokchung registry.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Cultural &amp; Urban Wealth</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mokokchung"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mokokchung Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: WOKHA & DOYANG VALLEY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Lotha Heartland &amp; Agro-Basin
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Wokha SRO
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Wokha &amp; Doyang
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wokha Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tiyi Foothills</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhandari Sub-Division</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Baghty Valley</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized legal solutions for oil palm plantations, agro-forestry estates, fishery farms along the Doyang River, and commercial property holdings in Wokha town. Incorporates clear guardianship and life-interest protections for agricultural heirs.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Tiyi Hall Road, Wokha</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Assistance for plantation estates and town registry filings before Wokha administration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Agro-Plantations &amp; Town Homes</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Wokha"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Wokha Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: TUENSANG EASTERN NAGALAND HUB */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Eastern Nagaland Center
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Tuensang SRO
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Tuensang District
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tuensang Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bazar Ward</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">High School Sector</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Longkhim</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Succession planning for multi-tribal communities in Eastern Nagaland (Chang, Khiamniungan, Sangtam, Yimkhiung). Drafts watertight wills for commercial shop rights, timber businesses, town buildings, and transport networks.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Complex, Tower Clock Area, Tuensang</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Local advocate coordination, custom clause formatting, and official registration assistance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Trade Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Tuensang"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Tuensang Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: MON & TIZIT CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Konyak Belt &amp; Industrial Border
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Mon SRO
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mon &amp; Tizit
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mon Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tizit Industrial Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Aboi Sub-Division</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Naginimora</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Legal Will drafting tailored to Konyak traditional governance and commercial enterprises along the Assam border. Encompasses tea plantation interests, coal-mining leasing rights, commercial logistics fleets, and private residences in Mon town.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Mon Headquarters</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Industrial asset mapping, trade lease succession, and DC office registration accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Industrial &amp; Tea Plantations</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mon"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mon Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: PHEK & ZUNHEBOTO MOUNTAIN TOWNS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Chakhesang &amp; Sumi Heartlands
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Phek &amp; Zunheboto SRO
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Phek &amp; Zunheboto
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Phek Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pfutsero Altitude Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Zunheboto Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Project Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized Will drafting for families in Pfutsero, Phek, and Zunheboto. Protects terraced organic horticulture farms, commercial retail centers, timber operations, and bank financial assets, providing smooth succession for surviving heirs.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complexes, Phek &amp; Zunheboto</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Terraced farm asset codification, customary council harmonization, and Book III execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Terraced Farms &amp; Town Retail</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Phek"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Phek Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: 5-STEP PROCESS */}
            <section id="step-by-step-nagaland-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP LEGAL PROCEDURE</span>
                </div>
                {/* H2 <= 70 chars: 50 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. 5-Step Process: Legal Will Drafting in Nagaland
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Executing a legally binding Will in Nagaland requires strict adherence to constitutional safeguards, statutory attestation, and district registration protocols:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 1: Inventory &amp; Categorize Estate Assets
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Prepare a complete catalog of all properties. Clearly separate tribal ancestral clan holdings (subject to customary lineage rules) from self-acquired urban real estate in Dimapur or Kohima, bank accounts, mutual funds, insurance policies, and family businesses.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 font-black text-base flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 2: Custom Legal Drafting &amp; Customary Alignment
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our senior estate advocates draft customized clauses ensuring complete compliance with Article 371A and the Nagaland Land and Revenue Regulation (Amendment) Act, 1978. Clear executor designations and minor guardianship provisions are codified.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 font-black text-base flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 3: Execution Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on standard A4 paper. Under Section 63 of the Indian Succession Act, you must sign or affix your thumb impression on every page in the simultaneous presence of two independent adult witnesses who hold no beneficial interest under the instrument.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 font-black text-base flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 4: Presentation at Deputy Commissioner Registry
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Present the executed Will at the Office of the Deputy Commissioner or SDO (Civil) in your district center. Remit the nominal statutory fee (₹200 to ₹500) and submit testator and witness KYC documents.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 font-black text-base flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Step 5: Identity Verification &amp; Book III Endorsement
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The registering officer verifies testamentary soundness and confirms signatures with both attesting witnesses. The official seal and registration number are affixed, and the Will is safely archived in permanent Book III custody.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: HOME REGISTRATION / SECTION 31 */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP ADVOCATE &amp; REGISTRATION SERVICE</span>
                </div>
                {/* H2 <= 70 chars: 51 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Doorstep Execution: Section 31 Home Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly testators, bedridden individuals, or persons with mobility restrictions in Kohima, Dimapur, or district hill areas, visiting government offices can be challenging. Under <strong>Section 31 of the Registration Act, 1908</strong>, registration can take place directly at your residence.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block text-xs sm:text-sm">Doctor Medical Certificate</strong>
                      <span className="text-slate-600 text-xs">A registered MBBS or MD doctor certifies that the senior citizen is of sound mind but medically advised against traveling.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block text-xs sm:text-sm">DC Commission Requisition</strong>
                      <span className="text-slate-600 text-xs">Our legal team files an application before the Deputy Commissioner detailing medical necessity and scheduling the visit.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block text-xs sm:text-sm">Doorstep Biometric Capture</strong>
                      <span className="text-slate-600 text-xs">The registering officer attends the residence to examine the testator, record signatures, and complete official Book III attestation.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block text-xs sm:text-sm">100% Equal Legal Validity</strong>
                      <span className="text-slate-600 text-xs">A Will registered at home under Section 31 enjoys identical legal force as one executed at the district administrative headquarters.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    <span>Request Section 31 Home Visit Coordination</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 9: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION PREPARATION</span>
                </div>
                {/* H2 <= 70 chars: 52 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Essential Documents for Nagaland Will Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Interactive checklist for registering your Will in Nagaland. Click each document as you assemble your paperwork:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold">
                  <span className="text-slate-600">
                    Ready Documents: {checkedCount} of {checklist.length}
                  </span>
                  <span className="text-[#C65378]">
                    {Math.round((checkedCount / checklist.length) * 100)}% Prepared
                  </span>
                </div>

                <div className="space-y-2.5">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-100"
                          : "bg-slate-50 border-slate-200/70 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] text-white"
                            : "border-2 border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                          {item.label}
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: PROPERTY TYPES */}
            <section id="nagaland-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION &amp; CLAUSES</span>
                </div>
                {/* H2 <= 70 chars: 58 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Property Categories: Ancestral vs Self-Acquired Assets
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate planning in Nagaland requires precise demarcation across four distinct asset classes to ensure complete enforceability:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-xs uppercase tracking-wider">
                    <Building className="w-4 h-4" />
                    <span>Urban Residential Real Estate</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Town Houses, Flats &amp; RCC Buildings
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Houses and residential plots in Kohima, Dimapur, and Chumoukedima purchased through personal savings are 100% self-acquired. Wills specify municipal survey numbers, tax assessment IDs, and exact share partitions for surviving spouses and children.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-[#5F7E75] font-bold text-xs uppercase tracking-wider">
                    <Landmark className="w-4 h-4" />
                    <span>Financial Portfolios &amp; Moveables</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Bank Accounts, FDs &amp; Commercial Shares
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Financial assets fall entirely under the Indian Succession Act. Your Will overrides bank nominations under Supreme Court precedent, ensuring that bank deposits, mutual fund units, vehicles, and jewelry are distributed precisely according to your wishes.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                    <Building className="w-4 h-4" />
                    <span>Commercial Enterprises &amp; Shops</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Market Tenancies &amp; Business Incomes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Commercial shops, godowns, logistics agencies, and wholesale businesses across Dimapur and Kohima markets can be bequeathed along with tenancy goodwill, operating licenses, and partnership equity to guarantee continuous business operation.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                    <Scroll className="w-4 h-4" />
                    <span>Ancestral Village &amp; Clan Lands</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Article 371A Customary Alignments
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Village lands and hereditary clan terraced fields must respect tribal customary rules. Our advocates draft express testamentary declarations recording ancestral clan lineage, preventing illegal alienation and avoiding village council disputes.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: REGISTRATION FEES & CHARGES */}
            <section id="nagaland-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FEE SCHEDULE</span>
                </div>
                {/* H2 <= 70 chars: 54 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Registration Fees &amp; Stamp Duty Schedule in Nagaland
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property gifts or sale deeds which attract heavy ad-valorem stamp duty and registration fees, Wills are testamentary instruments and enjoy substantial statutory exemptions across Nagaland:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4 sm:px-6">Devolution Method</th>
                        <th className="py-3 px-4 sm:px-6">Stamp Duty</th>
                        <th className="py-3 px-4 sm:px-6">Registration Fee</th>
                        <th className="py-3 px-4 sm:px-6">Legal Enforceability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="bg-rose-50/30">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                          Registered Will (Recommended)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-emerald-700 font-bold">
                          ₹0 (Exempt)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-semibold">
                          ₹200 to ₹500 (Nominal)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-emerald-700 font-medium">
                          High (Book III archive)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900">
                          Lifetime Gift Deed
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-rose-700 font-semibold">
                          3% to 5% Market Value
                        </td>
                        <td className="py-3.5 px-4 sm:px-6">1% to 2%</td>
                        <td className="py-3.5 px-4 sm:px-6 text-slate-600">Immediate transfer</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900">
                          Intestate Succession Certificate
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-rose-700 font-semibold">
                          2% to 3% Court Fees
                        </td>
                        <td className="py-3.5 px-4 sm:px-6">Advocate Fees + Court Filing</td>
                        <td className="py-3.5 px-4 sm:px-6 text-amber-700">
                          Prolonged (1 to 3 years)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 12: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT FIXED FEES</span>
                </div>
                {/* H2 <= 70 chars: 50 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Professional Will Drafting Packages in Nagaland
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Fixed pricing packages with zero hidden fees. All options include legally vetted clauses, Article 371A safeguards, and complete testamentary protection:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      Basic
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">Standard Legal Will</h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹1,990
                      <span className="text-xs font-medium text-slate-500 block mt-1">One-time transparent fee</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer-drafted testamentary document</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Coverage for urban houses &amp; bank accounts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Digital PDF ready within 48 hours</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Draft Standard Will
                  </a>
                </div>

                {/* PLAN 2 */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                    MOST POPULAR
                  </div>
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378] bg-rose-50 px-3 py-1 rounded-full">
                      Comprehensive
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">Customary Review &amp; Consultation</h3>
                    <div className="text-3xl font-black text-[#C65378]">
                      ₹4,990
                      <span className="text-xs font-medium text-slate-500 block mt-1">Full advocate advisory</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 consultation with senior advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Article 371A &amp; 1978 Land Act compliance check</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Commercial assets &amp; Dimapur tenancy clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Doctor mental fitness template included</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer"
                  >
                    Book Advocate Consultation
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      Complete Concierge
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">DC Registry &amp; Doorstep Visit</h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                      <span className="text-xs font-medium text-slate-500 block mt-1">Full execution &amp; registration</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Senior advocate drafting &amp; custom review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Physical advocate accompaniment at DC Registry</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit coordination for seniors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Book III archival certification support</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Get Registry Support
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 13: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL FAQ &amp; ADVISORY</span>
                </div>
                {/* H2 <= 70 chars: 51 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Nagaland Will Drafting
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key legal questions about making a Will in Nagaland, Article 371A safeguards, and property succession:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs divide-y divide-slate-100">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 text-left font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY AUTHORITIES</span>
                </div>
                {/* H2 <= 70 chars: 57 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Statutory References: Nagaland Succession &amp; Property Laws
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Key constitutional and legal statutes governing estate planning, customary protections, and registration in Nagaland:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900">
                    Article 371A, Constitution of India
                  </div>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    Provides special constitutional immunity for Naga customary law, procedure, and ownership and transfer of land against central parliamentary legislation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900">
                    Indian Succession Act, 1925 (Sections 59 &amp; 63)
                  </div>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    Codifies testamentary capacity to dispose of self-acquired property, defining the requirements of sound mind, writing, and attestation by two witnesses.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900">
                    Registration Act, 1908 (Sections 18(e) &amp; 31)
                  </div>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    Governs the optional registration of Wills in permanent Book III custody and authorizes doorstep commission visits for infirm or elderly testators.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900">
                    Nagaland Land &amp; Revenue Regulation (Amendment) Act, 1978
                  </div>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    Restricts the acquisition and transfer of agricultural and tribal lands to non-indigenous inhabitants of Nagaland, safeguarding state landholdings.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900">
                    Rules for Administration of Justice &amp; Police in Nagaland
                  </div>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    Empowers Deputy Commissioners, ADCs, and Dobashi (DB) Courts to administer justice according to customary procedures while respecting written legal instruments.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900">
                    Nagaland Village and Tribal Councils Act, 1978
                  </div>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    Recognizes the authority of Village Councils in customary matters, boundary delineations, and traditional disputes over village community lands.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 15: FINAL CTA CONVERSION BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Nagaland Assets &amp; Family Legacy
              </h3>
              <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
                Whether you own commercial complexes in Dimapur, town bungalows in Kohima, or financial investments across Nagaland, ensure your life&apos;s work passes smoothly to the people you love.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  Draft Your Will Online Today
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all border border-white/20 text-center"
                >
                  Book Advocate Consultation
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* HIGH RESOLUTION IMAGE MODAL */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#172228] rounded-2xl overflow-hidden border border-white/20 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/will-drafting-in-nagaland.jpg"
                alt="Legal Will Drafting and Property Succession in Nagaland"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold text-white">
                Will Drafting in Nagaland: Customary Succession &amp; Asset Protection
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
