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
  Wheat,
  Factory,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "nashik-overview", label: "OVERVIEW" },
  { id: "nashik-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "nashik-probate-rules", label: "PROBATE RULES" },
  { id: "nashik-sro-directory", label: "SRO DIRECTORY" },
  { id: "nashik-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-nashik-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "nashik-property-types", label: "PROPERTY TYPES" },
  { id: "nashik-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const NASHIK_SRO_HUBS = [
  {
    id: "nashik-1",
    name: "Nashik 1 (Old Agra Road)",
    sro: "SRO Nashik 1 (Old Tehsil Building)",
    address: "Old Tehsil Office Complex, Old Agra Road, Near CBS, Nashik - 422001",
    areas: "Old City, Ravivar Peth, Raviwar Karanja, MG Road, Shalimar, Bhadrakali, Tiwandha, Sharanpur",
    timings: "9:45 AM to 6:15 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "nashik-2",
    name: "Nashik 2 (Canada Corner)",
    sro: "SRO Nashik 2 (Sharanpur Road)",
    address: "Administrative Building, Canada Corner, Sharanpur Road, Nashik - 422002",
    areas: "Gangapur Road, College Road, Mahatma Nagar, Tidke Colony, Anandwalli, Serene Meadows, Thatte Nagar",
    timings: "9:45 AM to 6:15 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "nashik-3",
    name: "Nashik 3 (Panchavati)",
    sro: "SRO Nashik 3 (Dindori Road)",
    address: "Near Nimani Bus Stand, Dindori Road, Panchavati, Nashik - 422003",
    areas: "Panchavati, Ramkund, Makhmalabad, Tapovan, Dindori Road, Adgaon, Meri Colony, Konark Nagar",
    timings: "9:45 AM to 6:15 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "nashik-4",
    name: "Nashik 4 (CIDCO / Ambad)",
    sro: "SRO Nashik 4 (Lekha Nagar)",
    address: "Lekha Nagar, Near Ambad Link Road, CIDCO, Nashik - 422009",
    areas: "CIDCO (Sectors 1 to 6), Lekha Nagar, Indira Nagar, Govind Nagar, Ambad, Pathardi Phata, Kamatwada",
    timings: "9:45 AM to 6:15 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "nashik-road",
    name: "Nashik Road (Jail Road)",
    sro: "SRO Nashik Road (Railway Station Belt)",
    address: "Near Nashik Road Railway Station, Jail Road, Nashik Road - 422101",
    areas: "Nashik Road, Deolali Camp, Jail Road, Upnagar, Datir Nagar, Sinnar Phata, Bytco Point, Artillary Centre",
    timings: "9:45 AM to 6:15 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "satpur-midc",
    name: "Satpur MIDC Sub-Division",
    sro: "SRO Satpur Industrial Zone",
    address: "Administrative Sub-Division Office, Trimbak Road, Satpur, Nashik - 422007",
    areas: "Satpur MIDC, Ambad MIDC Industrial Areas, ITI Signal, Trimbak Road, Ashok Nagar, Carbon Naka",
    timings: "9:45 AM to 6:15 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "dindori-niphad",
    name: "Dindori & Niphad Agro-Hub",
    sro: "SRO Dindori & Niphad Rural",
    address: "Tehsil Karyalaya Compound, Dindori & Niphad Sub-District Registry Offices, Nashik Rural",
    areas: "Dindori, Niphad, Ozar, Pimpalgaon Baswant, Vinchur, Trimbakeshwar, Sinnar Agro-Belts & Vineyards",
    timings: "9:45 AM to 6:15 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Paper",
    detail: "Printed on standard white A4 sheets. Under Maharashtra law, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be heirs receiving any asset under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Sound Mind Note (MBBS / MD)",
    detail: "Strongly advised for senior citizens aged 60+. Certifies Will mental soundness and lucidity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "IGR Maharashtra e-Stepin Appointment Slip",
    detail: "Official time-slot booking receipt downloaded from the igrmaharashtra.gov.in portal with GRAS challan.",
    checked: false,
  },
  {
    id: "item-6",
    label: "NMC Asset Tax Receipts & Society Share Papers",
    detail: "Copy of Nashik City City Board tax assessment and cooperative housing society share records.",
    checked: false,
  },
  {
    id: "item-7",
    label: "7/12 (Satbara) & 8A Extracts (For Farmland / Vineyards)",
    detail: "Recent computerized land records for farm parcels and grape orchards in Dindori, Niphad, or Sinnar.",
    checked: false,
  },
];

export default function NashikLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("nashik-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("nashik-2");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  useEffect(() => {
    const targets = document.querySelectorAll(".scroll-target");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -40% 0px",
        threshold: 0.05,
      }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

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

  const filteredHubs = NASHIK_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    NASHIK_SRO_HUBS.find((h) => h.id === selectedHub) || NASHIK_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI STYLE ARCHITECTURE)
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
                <span>NASHIK &amp; NORTHERN MAHARASHTRA SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 51 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Legal Will Drafting &amp; Asset Estate in Nashik
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will for your NMC home flats, cooperative housing societies, MIDC plant plots, and Dindori vineyard farmlands. Get senior lawyer drafting, IGR Maharashtra e-Stepin booking, and Section 31 doorstep signing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Nashik Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#nashik-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Nashik SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bombay HC Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Maharashtra Stamp Duty</span>
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
                  src="/images/will-drafting-in-nashik.jpg"
                  alt="Legal Will Drafting and Property Succession in Nashik Maharashtra"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Nashik Urban &amp; Agro-Estate Blueprint
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
          KEY STATS STRIP
          ========================================================================= */}
      <section className="bg-[#FAF7F0] border-b border-[#172228]/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-0 text-center">
            {/* Stat 1 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                7 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Nashik District Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Article 64 Maharashtra Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                A Choice Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Outside Greater Mumbai Rule
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep SRO Home Visits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: DROPDOWN TABLE OF CONTENTS
          ========================================================================= */}
      <div className="block lg:hidden sticky top-0 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 shadow-2xs">
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
              className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${mobileTocOpen ? "rotate-180 text-[#C65378]" : ""
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
                    className={`flex items-center px-3 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${isActive
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-4 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                  >
                    <span
                      className={`mr-2.5 ${isActive ? "w-4 h-[1.5px] bg-[#C65378]" : "w-2.5 h-[1px] bg-slate-300"
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
                        className={`transition-all mr-2.5 rounded-full ${isActive
                            ? "w-6 h-[1.5px] bg-[#C65378]"
                            : "w-3.5 h-[1px] bg-slate-300 group-hover:w-5 group-hover:bg-slate-500"
                          }`}
                      />
                      <span
                        className={`transition-colors ${isActive
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

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="nashik-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>NASHIK ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Nashik
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>A Choice Filing</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will filing is a choice under Section 18(e) of the Filing Act, 1908. An plain Will signed before two witnesses is valid, but official Book III SRO filing provides absolute authenticity against asset fights.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Needed</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Nashik lies outside the historical presidency limits of Mumbai. Under Section 213 of the Indian Succession Act, court probate is strictly non-needed in Nashik, enabling direct title transfer with a filed Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Maharashtra Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are completely exempt from stamp duty across Maharashtra under Article 64 of the Maharashtra Stamp Act. You only pay a flat ₹100 filing fee plus nominal scanning charges at the SRO office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>NMC &amp; 7/12 Land Name Change</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A filed Will expedites ownership name change (Varasdar Nond) with the Nashik City City Board (NMC) and enables seamless 7/12 extract transfer for farm land and vineyards in Dindori and Niphad.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="nashik-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Nashik
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will drafting and estate planning across Nashik district are governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Filing Act, 1908</strong>, and the <strong>Maharashtra Co-operative Societies Act, 1960</strong>. Any adult of sound mind can legally bequeath self-acquired home asset, farm land, plant assets, and financial investments.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Nashik presents a unique convergence of asset classes. A family may own an upscale apartment on Gangapur Road or College Road, an plant MSME manufacturing unit in Satpur or Ambad MIDC, and prime farm grape vineyards in Dindori or Niphad. Without a meticulously drafted Will, surviving heirs encounter multi-office bureaucratic friction across city tax desks, cooperative society committees, and rural revenue talathis.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker must be a major aged 18 years or older with sound Will mental capacity (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Signed voluntarily without undue influence, fraudulent representations, or family coercion (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the physical presence of at least two independent adult witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Non-Heir</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses and their spouses must not receive any legacy or asset under the Will (Section 67).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileQuestion className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION STATUS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Nashik?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Filing Act, 1908, the filing of a Will Will is strictly <strong>a choice</strong>. An plain Will signed on standard white paper before two independent witnesses is legally valid and admissible in court.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, with rapidly escalating real estate valuations along Gangapur Road, College Road, and CIDCO, senior lawyers strongly advise formal filing at the SRO office. An official Book III filing eliminates suspicion of forged signatures and guarantees seamless ownership transfer across government agencies.
                </p>
              </div>

              {/* FULL-WIDTH COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Estate Parameter</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Filed Will (Nashik SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Plain Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Record</td>
                      <td className="p-4 bg-rose-50/20">Stored securely in Book III government registry</td>
                      <td className="p-4 bg-slate-50/20">Stored privately; susceptible to misplacement or theft</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Protection from Fight</td>
                      <td className="p-4 bg-rose-50/20">High legal presumption of genuine signing</td>
                      <td className="p-4 bg-slate-50/20">Vulnerable to allegations of fraud or coercion</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">NMC Asset Tax Name Change</td>
                      <td className="p-4 bg-rose-50/20">Direct transfer on presenting certified copy</td>
                      <td className="p-4 bg-slate-50/20">NMC officials often demand indemnity bonds or NOCs</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Housing Society Transfer</td>
                      <td className="p-4 bg-rose-50/20">Smooth share transfer under Section 30 MCS Act</td>
                      <td className="p-4 bg-slate-50/20">Managing committee may refer heirs to civil court</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">7/12 Land Name Change (Ferfar)</td>
                      <td className="p-4 bg-rose-50/20">Accepted by Revenue Talathi for rapid entry</td>
                      <td className="p-4 bg-slate-50/20">Frequent objections from other legal heirs during notice</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Government Filing Cost</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 fee + scanning charges</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="nashik-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PRECEDENTS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Nashik Probate Law: Exemption Outside Greater Mumbai
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most frequent misconceptions among Nashik asset owners is whether probate from the Bombay High Court is needed before inheriting real estate. The clear legal answer is <strong>no</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, probate is needed solely for Wills signed within or assets situated within the historical presidency towns of Mumbai, Kolkata, and Chennai. The territorial area of the original side of the Bombay High Court applies strictly to Greater Mumbai. Nashik is a mofussil district outside Mumbai presidency limits.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Settled Law: Non-Needed
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Bombay High Court Precedents
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Bombay High Court in landmark rulings including <em>Jyoti v. Snehalata</em> and <em>Percival Joseph Pareira</em> affirmed that probate is not needed for Hindu, Buddhist, Sikh, or Jain Wills signed outside the original civil area of Greater Mumbai. A filed Will is fully operational for NMC name change, banking access, and society flat estate.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Enables immediate asset transfer without High Court delays</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Voluntary Filings: High-Value Fights
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Filed in Nashik District Court?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An executor may voluntarily file for probate or letters of management before the Principal District Judge in Nashik only if hostile co-heirs file split suits or contest the Will maker&apos;s mental capacity. A grant of probate provides an undisputed judgment <em>in rem</em> that conclusively settles ownership.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Strong judicial decree against any collateral claims</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: NASHIK SRO DIRECTORY */}
            <section id="nashik-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Nashik SRO Offices: SRO Area Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Nashik district operates designated SRO Offices under the Inspector General of Filing Maharashtra (IGR Maharashtra). Under Section 32 of the Filing Act, your Will can be filed at the SRO office having area over your permanent residence or where any portion of your land and flats is located.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Gangapur, CIDCO, Panchavati)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredHubs.length} of {NASHIK_SRO_HUBS.length} Nashik Registration Hubs
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredHubs.map((h, index) => {
                    const isSelected = selectedHub === h.id;
                    const isLastOdd =
                      filteredHubs.length % 2 !== 0 && index === filteredHubs.length - 1;
                    return (
                      <button
                        key={h.id}
                        onClick={() => setSelectedHub(h.id)}
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                          } ${isSelected
                            ? "bg-[#C65378] text-white shadow-xs ring-2 ring-[#C65378]/25"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                          }`}
                      >
                        {h.name}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE SRO DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        Nashik Filing District
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Registry Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Location:</span>
                      <p className="text-slate-600">{activeHubData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <p className="text-slate-600">{activeHubData.timings}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold text-slate-900 block">Key Localities in Area:</span>
                      <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official IGR Portal: <strong>igrmaharashtra.gov.in (e-Stepin)</strong>
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Lawyer Help for {activeHubData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: LOCALITIES COVERED IN NASHIK */}
            <section id="nashik-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Localities Covered: Area-Wise Will Drafting in Nashik
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Nashik span upscale home societies along Gangapur Road and College Road, high-growth plotted row houses in CIDCO and Indira Nagar, plant factories in Satpur and Ambad MIDC, and farm grape vineyards in Dindori and Niphad. Our estate lawyers deliver customized legal drafting, IGR Maharashtra e-Stepin slot scheduling, and SRO accompaniment across all key micro-markets:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: GANGAPUR ROAD & ANANDWALLI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-West Luxury Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nashik 2 (Canada Corner)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gangapur Road &amp; Anandwalli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gangapur Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anandwalli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Serene Meadows</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Navshya Ganpati Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Gangapur Road</strong> and Anandwalli for premium high-rise apartments, penthouses, and gated bungalows. Codifies cooperative housing society share paper transfers under Section 30 of the MCS Act, exclusive car parking allocations, and mutual fund portfolios to prevent estate friction.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Canada Corner, Sharanpur Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        e-Stepin booking at Canada Corner SRO, lawyer physical attendance, and Section 31 doorstep signing for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gangapur Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gangapur Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: COLLEGE ROAD & MAHATMA NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Prime Central / Shop
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nashik 1 &amp; 2
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in College Road &amp; Mahatma Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">College Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mahatma Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thatte Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tidke Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in College Road</strong> and Mahatma Nagar for established family homes, shop showrooms, and doctors&apos; clinics. Includes clauses for family business estate, doctor mental capacity papers, and clear life-interest rules for surviving spouses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Canada Corner &amp; Old Agra Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-net-worth estate structuring, private family asset mapping, and expedited Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Home</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in College Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft College Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: INDIRA NAGAR & GOVIND NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Nashik Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nashik 4 (CIDCO)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Indira Nagar &amp; Govind Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Indira Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Govind Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mumbai-Agra Highway</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Guru Gobind Singh College Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Indira Nagar</strong> and Govind Nagar for home row houses, cooperative apartments, and plotted developments along Mumbai-Agra Highway. Formulates clear share allocations for sons and daughters, bank locker nominations, and smooth NMC asset tax assessment updates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Lekha Nagar, CIDCO (SRO 4)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Seamless IGR Maharashtra slot booking, independent witness witness signing, and doorstep check for seniors.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Row Houses &amp; Apartments</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Indira Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Indira Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: CIDCO & AMBAD RESIDENTIAL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Planned CIDCO Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nashik 4 (Lekha Nagar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in CIDCO &amp; Ambad Link Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Trimurti Chowk</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Uttam Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pawan Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pathardi Phata</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in CIDCO</strong> and Ambad Link Road for planned CIDCO leasehold and freehold housing schemes across Sectors 1 to 6. Eliminates risks of title clouds and estate fights, facilitating direct name substitution in CIDCO and NMC records upon the Will maker&apos;s demise.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SRO 4 CIDCO Lekha Nagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete papers review, biometric scheduling, and certified copy delivery.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">CIDCO Schemes &amp; Societies</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in CIDCO Nashik"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft CIDCO Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: PANCHAVATI & MAKHMALABAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; North Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nashik 3 (Panchavati)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Panchavati &amp; Makhmalabad
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panchavati Core</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramkund / Tapovan</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Makhmalabad Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Adgaon &amp; Meri Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Panchavati</strong> and Makhmalabad for historical family wadas, shop riverfront shops, and new suburban home complexes. Resolves complex co-parcenary split questions and ensures single self-acquired bequests remain legally unassailable.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Nimani Bus Stand, Dindori Road (SRO 3)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Support for family asset estate, family wada partitions, and Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Family Wadas &amp; New Flats</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Panchavati"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Panchavati Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: NASHIK ROAD & DEOLALI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Railway &amp; Cantonment
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nashik Road
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Nashik Road &amp; Deolali Camp
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nashik Road Terminus</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Deolali Cantonment</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jail Road &amp; Upnagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bytco Point &amp; Sinnar Phata</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Nashik Road</strong> and Deolali Camp for railway pensioners, defence personnel, and bungalow owners. Clarifies Cantonment Board lease rules, defence pension gratuities, and home asset transfers without contentious probate steps.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Near Railway Station, Jail Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep filing for elderly veterans and pensioners, IGR e-Stepin booking, and lawyer accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Cantonment &amp; Railway Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nashik Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nashik Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: SATPUR & AMBAD MIDC */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5" />
                        Plant &amp; MSME Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Satpur / Ambad
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Satpur &amp; Ambad MIDC
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Satpur MIDC Estate</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ambad Plant Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Trimbak Road Engineering</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sinnar Malegaon MIDC</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Satpur and Ambad MIDC</strong> for plant entrepreneurs, auto ancillary manufacturers, and MSME founders. Structures transfer of MIDC plant leasehold rights, private limited company shareholdings, intellectual asset, and factory machinery.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Trimbak Road Sub-Division / Lekha Nagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Plant asset inventory, cross-director share estate, and MIDC transfer compliance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">MIDC Plots &amp; MSME Shares</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Satpur Ambad MIDC"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Plant Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: DINDORI, NIPHAD & WINE BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        Vineyards &amp; Farmland
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Dindori / Niphad
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Dindori &amp; Niphad Farmland
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dindori Wine Valley</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Niphad Grape Orchards</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pimpalgaon Baswant</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Trimbakeshwar Agro-Parcels</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Dindori and Niphad</strong> for vineyard estates, grape orchards, polyhouse agriculture, and family farmland. Formulates watertight bequests that satisfy Maharashtra Land Revenue Code (MLRC) 1966 rules and prevents fragmentation under the Bombay Prevention of Fragmentation Act.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Registry Offices, Dindori &amp; Niphad</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        7/12 Satbara extract name change, Form 6 Ferfar guidance, and rural revenue compliance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">7/12 Extracts &amp; Vineyards</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Dindori Farmland"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Farmland Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-nashik-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to IGR Filing in Nashik
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this checked 5-stage legal operating step to create, execute, and register your Will before the SRO in Nashik:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Asset Audit
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Compile complete details of NMC flats, society shares, 7/12 survey numbers, bank accounts, and demat portfolios.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Lawyer Drafting
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Draft customized legal clauses covering revocation of past wills, survivorship, executor powers, and minor guardianships.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Valid Signing
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print on A4 paper and sign each page in the physical presence of two independent non-heir adult witnesses.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      e-Stepin Booking
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Schedule your slot on IGR Maharashtra (igrmaharashtra.gov.in) and pay the ₹100 filing fee online via GRAS challan.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      5
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      SRO Biometrics
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit Nashik SRO with witnesses for verbal check, photo capture, and biometric thumbprint to seal Book III entry.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP REGISTRATION */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION FOR SENIORS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Filing for Senior Citizens
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly, unwell, or bedridden citizens residing in Gangapur Road, Mahatma Nagar, Indira Nagar, or rural estates, traveling to the SRO office can be a physical ordeal. Under <strong>Section 31 of the Filing Act, 1908</strong>, the SRO possesses legal office to attend a private residence or hospital to register a Will.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Doorstep SRO Filing Operates in Nashik District:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Medical Paper</strong>
                      <span className="text-slate-600">A filed MBBS or MD doctor certifies that the senior citizen is of sound mind but medically advised against traveling.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Commission Form</strong>
                      <span className="text-slate-600">Our legal team drafts and submits the formal Section 31 special commission petition before the local Nashik SRO.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Official Commission Fee</strong>
                      <span className="text-slate-600">A nominal government commission fee is paid through the GRAS Maharashtra portal to schedule the official officer home visit.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Portable Biometric Equipment</strong>
                      <span className="text-slate-600">The SRO visits your home with portable biometric thumb scanners and webcams to capture checked identity records.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>INTERACTIVE CHECKLIST</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Paper Checklist for Nashik SRO Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Prepare your papers before scheduling your SRO appointment. You have organized <strong>{checkedCount} of {checklist.length}</strong> required papers:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${item.checked
                          ? "bg-rose-50/50 border-rose-300 text-slate-900"
                          : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                          }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm block">
                          {item.label}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-500">
                          {item.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: NASHIK PROPERTY TYPES */}
            <section id="nashik-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>PROPERTY DYNAMICS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Nashik Asset Types: NMC Flats, Farmland &amp; MIDC Plots
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate steps in Nashik vary considerably depending on the nature of asset title and regulatory office:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    Cooperative Housing Societies
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    NMC Society Flats &amp; Shares
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 30 of the MCS Act, 1960, a society nominee holds shares only in fiduciary trust. The filed Will directs the managing committee to transfer the official share paper and apartment rights without court intervention.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Vineyards &amp; Farmland
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    7/12 Satbara &amp; Orchard Parcels
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Farmland and vineyards in Dindori and Niphad require careful drafting to prevent violations of land ceiling limits or fragmentation. A certified copy of the filed Will is presented to the Talathi for a smooth Ferfar entry under Section 149 MLRC.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    Plant Enterprises
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Satpur &amp; Ambad MIDC Units
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For plant factory plots in Satpur or Ambad, leasehold transfer with Maharashtra Plant Development City Board (MIDC) demands explicit Will bequeathal of lease rights, partner capital, and factory machinery.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES & CHARGES */}
            <section id="nashik-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official IGR Maharashtra Filing Fees &amp; Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike shop sale conveyances or gift deeds that attract 5% to 7% stamp duty in Maharashtra, Will Wills are completely exempt from stamp duty under Article 64. Government filing fees in Nashik are purely nominal:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Fee Component</th>
                      <th className="p-4 font-bold">Legal Amount</th>
                      <th className="p-4 font-bold">Remittance Office</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Maharashtra Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt under Art 64)</td>
                      <td className="p-4">Government of Maharashtra</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Book III Filing Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 (Flat Legal Fee)</td>
                      <td className="p-4">IGR Maharashtra via GRAS Portal</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer Scanning &amp; Pasting Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹300</td>
                      <td className="p-4">SRO Service Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Special Commission (Home Visit)</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Doorstep Official Commissioner Fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: PRICING & PACKAGES */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT PLANS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in Nashik
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal help package tailored to your family&apos;s estate planning and asset portfolio in Nashik:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Standard
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Online Will Drafting
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹1,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Ideal for single homeowners with NMC apartments, bank accounts, and demat assets.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Free Maharashtra Will creator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted legal clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download &amp; signing guide</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Draft Online Now
                  </a>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Most Popular in Nashik
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Full
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Lawyer Talk
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Senior estate lawyer review for NMC flats, Dindori farmland, and multi-heir portfolios.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 video call with senior lawyer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for farmland &amp; MIDC shares</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Executor vetting &amp; witness protocols</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer"
                  >
                    Book Lawyer Call
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Doorstep SRO
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Complete SRO Filing
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      End-to-end filing coordination across any Nashik SRO office or home visit.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>IGR Maharashtra e-Stepin booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer physically attends Nashik SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Collection of certified Book III record</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Get SRO Support
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in Nashik
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear, authoritative answers to common legal questions regarding Will drafting and asset filing in Nashik:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-[#C65378]" : ""
                            }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CITATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Citations &amp; Maharashtra Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols comply strictly with codified Indian statutes and Maharashtra state filing systems:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 61, 63, and Section 213 (Non-Presidency Town Probate Exemption).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Filing Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (A Choice Filing) and Section 31 (Special Commission Home Visit).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Maharashtra Stamp Act 1958
                  </span>
                  <p className="text-xs text-slate-600">
                    Article 64 of Schedule I (100% Stamp Duty Exemption for Will Wills).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    IGR Maharashtra Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official e-Stepin appointment portal: <code>igrmaharashtra.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Nashik Assets &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Nashik flats, businesses, or farmlands to office gridlock. Draft a legally binding Will online today or consult our senior Bombay High Court lawyers.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all cursor-pointer shadow-lg shadow-[#C65378]/25"
                >
                  Start Your Will Online Now
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all border border-white/20"
                >
                  Book Lawyer Talk
                </a>
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

        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden p-4 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-900">
                Visual Blueprint: Nashik Will Drafting &amp; Asset Estate Framework
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] max-h-[75vh] mt-3 bg-[#172228] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/will-drafting-in-nashik.jpg"
                alt="High Resolution Visual Blueprint: Nashik Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Nashik SRO Filed &amp; NMC Name Change Compliant</span>
              <a
                href="/start"
                onClick={(e) => {
                  setShowHighResModal(false);
                  handleStartDraft(e);
                }}
                className="font-bold text-[#C65378] hover:underline"
              >
                Start Drafting Your Will →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
