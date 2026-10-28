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
  { id: "wb-overview", label: "OVERVIEW" },
  { id: "wb-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "wb-probate-rules", label: "PROBATE RULES" },
  { id: "wb-sro-directory", label: "SRO DIRECTORY" },
  { id: "west-bengal-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-wb-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "wb-property-types", label: "PROPERTY TYPES" },
  { id: "wb-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const WB_SRO_HUBS = [
  {
    id: "ara-kolkata",
    name: "ARA Kolkata (Council House St / B.B.D. Bagh)",
    sro: "Additional Registrar of Assurances I, II, III & IV Kolkata",
    address: "5, Council House Street, Near Writers' Buildings, B.B.D. Bagh, Kolkata - 700001",
    areas: "Kolkata Presidency Limits, Dalhousie, Park Street, Ballygunge, Bhawanipore, Burrabazar, Shyambazar, Alipore, New Alipore",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "sro-alipore",
    name: "Alipore & South 24 Parganas Hub",
    sro: "District Sub-Registrar I & II South 24 Parganas",
    address: "New Treasury Building, Alipore Judges Court Compound, Kolkata - 700027",
    areas: "Alipore, Behala, Jadavpur, Tollygunge, Garia, Kasba, Sonarpur, Diamond Harbour, Baruipur",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "sro-bidhannagar",
    name: "Bidhannagar (Salt Lake) & Rajarhat New Town",
    sro: "Sub-Registrar Office Bidhannagar & Rajarhat",
    address: "Administrative Complex, Near Bikash Bhavan, DF Block, Sector I, Salt Lake, Kolkata - 700091",
    areas: "Salt Lake Sectors I to V, Action Area I, II & III New Town, Rajarhat, Lake Town, Kestopur, Baguiati",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "dsr-howrah",
    name: "Howrah & Hooghly Industrial Belt",
    sro: "District Sub-Registrar Howrah (Collectorate)",
    address: "Howrah Collectorate Complex, Mahatma Gandhi Road, Howrah - 711101",
    areas: "Howrah City, Shibpur, Salkia, Liluah, Bally, Santragachi, Uluberia, Serampore, Chandannagar",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "dsr-asansol",
    name: "Asansol Industrial Hub (Paschim Bardhaman)",
    sro: "District Sub-Registrar Office Asansol",
    address: "Asansol Court Compound, Court Road, Asansol, Paschim Bardhaman - 713304",
    areas: "Asansol City, Raniganj, Kulti, Burnpur, Jamuria, Barakar, Chittaranjan Industrial Belt",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "sro-durgapur",
    name: "Durgapur Steel Township Hub",
    sro: "Sub-Registrar Office Durgapur",
    address: "Administrative Building, City Centre, Durgapur, Paschim Bardhaman - 713216",
    areas: "Durgapur Steel Township, City Centre, Bidhannagar Durgapur, Benachity, Andal, Waria",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "dsr-siliguri",
    name: "Siliguri & North Bengal Gateway",
    sro: "District Sub-Registrar Siliguri (Darjeeling Plains)",
    address: "Siliguri Court Compound, Kutcheri Road, Siliguri, Darjeeling - 734001",
    areas: "Siliguri Municipal Corporation, Matigara, Pradhan Nagar, Sevoke Road, Bagdogra, Jalpaiguri, Darjeeling Foothills",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Paper",
    detail: "Printed on standard white A4 sheets. Under West Bengal law, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo capture at the SRO/ARA counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Photo IDs",
    detail: "Must carry original photo IDs and must not be heirs receiving any legacy or bequest under the Will.",
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
    label: "wbregistration.gov.in e-Appointment Slip & GRIPS Challan",
    detail: "Official token receipt generated from the West Bengal Filing portal with confirmed time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "KMC Asset Tax Receipts & City Name Change Records",
    detail: "Copy of Kolkata City City Board tax bills, society share papers, or town office assessment records.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Banglarbhumi RoR (Khatian / Parcha) for Rural Land",
    detail: "Recent computerized land records for farm parcels or homesteads across West Bengal districts.",
    checked: false,
  },
];

export default function WestBengalLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("wb-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("ara-kolkata");
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

  const filteredHubs = WB_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    WB_SRO_HUBS.find((h) => h.id === selectedHub) || WB_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI/NASHIK ARCHITECTURE)
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
                <span>WEST BENGAL ESTATE PLANNING &amp; PROBATE DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 52 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in West Bengal: Probate Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally sound Will under West Bengal Dayabhaga Hindu law. Get Calcutta High Court probate guidance, wbregistration.gov.in e-District appointments, and Section 31 doorstep filing across Kolkata and all 23 districts.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your West Bengal Will</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#wb-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>West Bengal SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Calcutta HC Probate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 WB Stamp Duty</span>
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
                  src="/images/will-drafting-in-west-bengal.jpg"
                  alt="Legal Will Drafting and Property Succession in West Bengal"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  West Bengal Probate &amp; Estate Blueprint
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
                23 Districts + ARAs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Statewide Filing Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Legal Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 213 Rule
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Calcutta HC Probate Mandate
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
                      className={`group flex items-center text-xs tracking-wider transition-all duration-200 font-mono uppercase ${isActive
                          ? "text-[#C65378] font-bold translate-x-1"
                          : "text-slate-500 hover:text-slate-900 hover:translate-x-0.5"
                        }`}
                    >
                      <span
                        className={`mr-2.5 transition-all duration-200 ${isActive
                            ? "w-4 h-[1.5px] bg-[#C65378]"
                            : "w-2 h-[1px] bg-slate-300 group-hover:bg-slate-500"
                          }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Dayabhaga Law Protected</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Drafted by checked lawyers in compliance with Calcutta High Court rules and West Bengal Filing Directorate.
                </p>
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold text-center block transition-colors cursor-pointer"
                >
                  Start Online Will
                </Link>
              </div>
            </div>
          </aside>

          {/* EDITORIAL CONTENT BODY (RIGHT COLUMN) */}
          <main className="flex-1 min-w-0 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY / OVERVIEW */}
            <section id="wb-overview" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>EXECUTIVE OVERVIEW</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Executive Summary: Will Drafting &amp; Filing in West Bengal
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-3xl p-6 bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3>Key Legal Facts in West Bengal</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <li>• <strong>Dayabhaga School:</strong> Will makers enjoy total Will freedom over family and self-acquired assets without joint family restrictions.</li>
                    <li>• <strong>Dual Probate Rule:</strong> Section 213 ISA makes probate needed in Kolkata presidency town, but a choice across remaining district areas.</li>
                    <li>• <strong>100% Stamp Duty Exemption:</strong> Wills attract zero ad-valorem stamp duty across West Bengal; only nominal ₹100 filing fee applies.</li>
                    <li>• <strong>Online Token System:</strong> e-District portal (wbregistration.gov.in) enables slot booking across ARAs and Sub-Registrars.</li>
                  </ul>
                </div>

                <div className="rounded-3xl p-6 bg-rose-50/50 border border-rose-100 shadow-xs space-y-3">
                  <div className="flex items-center gap-2.5 text-[#C65378] font-bold text-base">
                    <AlertTriangle className="w-5 h-5 text-[#C65378] shrink-0" />
                    <h3>Risks of Dying Without a Will in Bengal</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <li>• <strong>Unwanted Fragmentation:</strong> Without a Will death triggers equal split among Class I heirs, leading to gridlock over heritage family homes.</li>
                    <li>• <strong>KMC Name Change Freezes:</strong> Kolkata City City Board blocks name substitution when conflicting legal heir claims emerge.</li>
                    <li>• <strong>Salt Lake Lease Fights:</strong> Urban Development Office leasehold transfers stall indefinitely without explicit Will bequest.</li>
                    <li>• <strong>Estate Paper Costs:</strong> District civil court estate suits consume 2 to 5 years with heavy legal expenses.</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Whether you own a high-value flat in Ballygunge or Salt Lake, an plant unit in Asansol or Durgapur, or tea gardens and farmlands in North Bengal, a legally watertight Will is indispensable. Our dedicated legal platform delivers customized lawyer drafting, Calcutta High Court Will petition support, and SRO appointment coordination.
              </p>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK & DAYABHAGA LAW */}
            <section id="wb-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>SUCCESSION JURISPRUDENCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. West Bengal Legal Framework: Estate &amp; Dayabhaga Law
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate in West Bengal is governed by a distinct legal heritage that separates it from other Indian states:
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <h3 className="font-extrabold text-base text-slate-900">
                  The Dayabhaga Advantage: Absolute Will Freedom
                </h3>
                <p>
                  In the vast majority of India, Hindu property estate follows the <strong>Mitakshara School</strong>, where sons and daughters acquire an automatic joint family share by birth in family asset. So, a parent under Mitakshara cannot easily will away family joint family asset without potential fights from children.
                </p>
                <p>
                  In contrast, West Bengal historically adheres to the <strong>Dayabhaga School of Hindu Law</strong>. Under Dayabhaga principles:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#C65378]">
                      No Birthright in Family Assets
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Children do not acquire any ownership interest by birth. The father or titleholder maintains exclusive ownership and control during their entire lifetime.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#C65378]">
                      Complete Will Right
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The asset holder can bequeath both family and self-acquired assets to any chosen person or charity through a Will, without requiring children&apos;s consent.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900">
                    Codified Statutes Governing West Bengal Wills:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    <li>• <strong>Indian Succession Act, 1925 (ISA):</strong> Sections 59 (sound mind), 61 (freedom from coercion), 63 (needed witness signing by two witnesses), and 213 (probate rules).</li>
                    <li>• <strong>Filing Act, 1908:</strong> Section 18(e) (a choice filing) and Section 31 (doorstep filing by special commission).</li>
                    <li>• <strong>West Bengal Land Reforms Act, 1955:</strong> Sets ceiling limits and farm name change steps on the Banglarbhumi portal.</li>
                    <li>• <strong>West Bengal Co-operative Societies Act, 2006:</strong> Governs share transfer steps in housing societies.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION STATUTE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed Across West Bengal?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Indian law, filing of a Will remains a choice, but the strategic advantages of registering in West Bengal are immense:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Legal Parameter</th>
                      <th className="p-4 font-bold">Plain Will</th>
                      <th className="p-4 font-bold text-[#C65378]">Filed Will (Book III WB)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Legal Validity (Sec 18e)</td>
                      <td className="p-4">Legally valid if signed by 2 witnesses</td>
                      <td className="p-4 text-emerald-700 font-bold">Valid with official government presumption</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Custody &amp; Loss Protection</td>
                      <td className="p-4">Risk of loss, tampering, or concealment</td>
                      <td className="p-4">Permanently archived in Book III SRO vault</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">KMC / Town Office Name Change</td>
                      <td className="p-4">Frequently contested; lengthy scrutiny</td>
                      <td className="p-4 font-bold text-slate-900">Accelerated name change across city bodies</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Proof Value in Court</td>
                      <td className="p-4">High burden to prove genuine signing</td>
                      <td className="p-4 text-emerald-700 font-bold">Strong proof presumption of sanity &amp; signing</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Government Fee in WB</td>
                      <td className="p-4">₹0 (No stamp paper needed)</td>
                      <td className="p-4">Flat ₹100 filing fee + scanning</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-amber-900 space-y-1.5">
                <strong className="block font-bold">Legal Recommendation for West Bengal Residents:</strong>
                <p>
                  While plain Wills are technically valid under Section 18(e), asset offices such as Kolkata City City Board (KMC), Bidhannagar Town Office, and BL&amp;LRO offices subject plain Wills to strict inquiry. Registering your Will before an ARA or SRO establishes undeniable official proof of signing.
                </p>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES & CALCUTTA HIGH COURT MANDATE */}
            <section id="wb-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT TESTAMENTARY DIVISION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Calcutta High Court Probate Rules &amp; District Exemptions
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Probate is the official court process where a competent court certifies the authenticity of a Will. In West Bengal, Section 213 of the Indian Succession Act establishes a crucial local distinction:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* JURISDICTION 1: KOLKATA PRESIDENCY */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378]/30 p-6 shadow-xs space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                    <Building className="w-3.5 h-3.5" />
                    Kolkata Presidency Town (Needed Probate)
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Calcutta High Court OOCJ Area
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under <strong>Section 213 read with Section 57(a) and 57(b) of the ISA</strong>, probate is <strong>legally needed</strong> for Wills signed by Hindus, Buddhists, Sikhs, and Jains where:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li>• The Will was signed within the historical presidency limits of Kolkata.</li>
                    <li>• Land and flats bequeathed under the Will is situated within Kolkata city presidency limits.</li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    Financial institutions, KMC, and registry offices in Kolkata will not transfer title without a Probate or Letters of Care granted by the Calcutta High Court.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/services/probate-lawyer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:underline"
                    >
                      <span>Explore Calcutta High Court Probate Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* JURISDICTION 2: DISTRICTS OUTSIDE KOLKATA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <MapPin className="w-3.5 h-3.5" />
                    District Areas (Probate A Choice)
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    All Districts Outside Kolkata Presidency
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For assets situated outside Kolkata presidency town (such as Howrah, Paschim Bardhaman, Siliguri, Hooghly, North/South 24 Parganas districts, Murshidabad, and Medinipur), <strong>probate is NOT needed</strong> under Section 213.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li>• A filed Will allows direct name change with local city corporations and BL&amp;LRO offices.</li>
                    <li>• Probate becomes necessary only if a disgruntled legal heir fights the Will in a civil district court.</li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    District judges possess Will area under Section 264 ISA if a probate petition is filed voluntarily to silence future fights.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/tools/probate-checker"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:underline"
                    >
                      <span>Check Your Probate Rule Online</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="wb-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION HUBS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. West Bengal SRO &amp; ARA Office Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  West Bengal operates Additional Registrar of Assurances (ARA) offices in Kolkata and District SRO (DSR) complexes across its 23 districts. Search key offices below:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by city, SRO name, district, or locality (e.g., Alipore, Salt Lake, Howrah, Asansol)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#C65378] shadow-xs"
                />
              </div>

              {/* SRO TABS / CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {filteredHubs.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${selectedHub === hub.id
                          ? "bg-[#172228] text-white border-[#172228] shadow-md"
                          : "bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50"
                        }`}
                    >
                      <span className="font-bold text-xs sm:text-sm block">
                        {hub.name}
                      </span>
                      <span className="text-[11px] opacity-75 truncate block mt-0.5">
                        {hub.sro}
                      </span>
                    </button>
                  ))}
                  {filteredHubs.length === 0 && (
                    <div className="p-4 text-xs text-slate-500 bg-white rounded-2xl border border-slate-200 text-center">
                      No matching filing office found.
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                      JURISDICTIONAL DETAILS
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {activeHubData.sro}
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                    <div>
                      <strong className="text-slate-900 block font-semibold mb-1">Official Address:</strong>
                      <p className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-xs text-slate-800">
                        {activeHubData.address}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-900 block font-semibold mb-1">Coverage &amp; Localities:</strong>
                      <p className="leading-relaxed">
                        {activeHubData.areas}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-900 block font-semibold mb-1">Public Counter Hours:</strong>
                      <p className="text-slate-700">
                        {activeHubData.timings}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 font-medium">
                      Token booking via wbregistration.gov.in
                    </span>
                    <Link
                      href="/services/will-registration"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors"
                    >
                      <span>Book SRO Help</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES IN WEST BENGAL (EXACT SAME AS NASHIK LOCAL AREAS) */}
            <section id="west-bengal-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Will Drafting in West Bengal
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in West Bengal span high-value heritage mansions and modern condominiums in Kolkata, dense urban enclaves in Howrah, planned plant townships in Asansol and Durgapur, tea gardens and tourism hubs in Siliguri, port assets in Haldia, and farm lands across Bardhaman and Murshidabad. Our legal team delivers customized legal drafting, wbregistration.gov.in appointment booking, and SRO accompaniment across all key regional hubs:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: KOLKATA & SOUTH 24 PARGANAS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Presidency &amp; Metropolitan Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        ARA I-IV &amp; SRO Alipore
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kolkata &amp; South 24 Parganas
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ballygunge</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alipore</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Salt Lake</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">New Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jadavpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Behala</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Kolkata</strong> covering luxury high-rises, heritage assets, and housing society apartments. Structures clear clauses addressing Calcutta High Court probate mandates under Section 213 ISA, KMC name change compliance, and Salt Lake 99-year leasehold estate.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: ARA Council House St &amp; Alipore Court</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        e-Deed token booking at Council House Street ARA, Alipore Collectorate, and Section 31 doorstep visits across Kolkata.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kolkata"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kolkata Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: HOWRAH & HOOGHLY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Plant &amp; Riverbank Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Howrah &amp; Serampore
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Howrah &amp; Hooghly Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Howrah City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shibpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bally</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Salkia</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Serampore</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chandannagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting in Howrah</strong> and the historic Hooghly riverbank for shop warehouses, foundry enterprises, and home family assets. Clarifies probate exemption outside Kolkata presidency limits for rapid Howrah City City Board name change.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Howrah Collectorate &amp; Serampore Court</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Direct filing at Howrah DSR on MG Road, Serampore SRO, and home signing help across Shibpur and Liluah.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Howrah"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Howrah Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: ASANSOL & PASCHIM BARDHAMAN */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Mining &amp; Heavy Plant Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Asansol &amp; Raniganj
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Asansol &amp; Raniganj Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Asansol Court</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Burnpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Raniganj</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kulti</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jamuria</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Legal Will drafting for shop holdings, plant machinery leases, home plots, and mining transport fleets in Asansol City City Board (AMC) wards. Ensures seamless Asansol District Court probate exemption recognition.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Asansol Court Compound, Court Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast-track appointment scheduling on wbregistration.gov.in and lawyer check at Asansol DSR counter.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Asansol"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Asansol Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: DURGAPUR STEEL TOWNSHIP */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Steel Township &amp; Education Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Durgapur (City Centre)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Durgapur &amp; Andal
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">City Centre</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bidhannagar Durgapur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Benachity</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Steel Township</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Andal Aerotropolis</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting in Durgapur</strong> for retired PSU engineers, SAIL/DSP employees, and plotted homeowners in City Centre and Bidhannagar. Codifies bank savings, mutual funds, and DMC asset estate.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: City Centre Office Building</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Smooth biometric recording at Durgapur SRO, GRIPS e-payment, and Section 31 home visits for elderly pensioners.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Durgapur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Durgapur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: SILIGURI & NORTH BENGAL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Bengal Shop Gateway
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Siliguri &amp; Darjeeling
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Siliguri &amp; Darjeeling
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sevoke Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Matigara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pradhan Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bagdogra</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Darjeeling Hills</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting in Siliguri</strong> for shop logistics hubs, retail complexes along Sevoke Road, tea estate interests, and home assets. Ensures compliant Banglarbhumi land record updates across Darjeeling and Jalpaiguri.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Siliguri Court Compound, Kutcheri Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Help with biometric appointments at Siliguri DSR and doorstep signing in Matigara and tea estate bungalows.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Siliguri"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Siliguri Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: KHARAGPUR & PASCHIM MEDINIPUR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Railway Township &amp; Port Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Midnapore &amp; Kharagpur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kharagpur &amp; Midnapore
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kharagpur Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">IIT Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Midnapore Sadar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jhargram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Haldia Port Hub</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Estate planning for railway personnel, academic faculty, and port-adjacent shop plot holders across Paschim and Purba Medinipur. Smooth transfer of railway colony private assets and shop holdings.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Midnapore Collectorate &amp; Kharagpur SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        e-Filing slot booking, paper review, and SRO accompaniment across Medinipur region.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kharagpur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kharagpur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: BARDHAMAN & PURBA BARDHAMAN */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Farm Granary &amp; Heritage
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Purba Bardhaman
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bardhaman &amp; Katwa
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bardhaman Sadar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Katwa</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kalna</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Memari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rice Mill Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Farm estate planning for rice mill owners, family farmland holders, and urban home assets in Bardhaman town. Prevents fragmenting farm tracts and secures Banglarbhumi land name change.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bardhaman Collectorate Court Compound</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Appointment coordination at DSR Bardhaman and doorstep signing for senior farm estate holders.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bardhaman"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bardhaman Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: BERHAMPORE & MURSHIDABAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Textile Trade Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Murshidabad (Berhampore)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Berhampore &amp; Malda
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Berhampore</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lalbagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jiaganj</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Malda Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">English Bazar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated legal support for family Rajbaris, silk trading businesses, mango orchard parcels, and home assets across Murshidabad and Malda. Resolves multi-branch estate complexity under Dayabhaga law.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Berhampore Court &amp; Malda Collectorate</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        End-to-end token generation on wbregistration.gov.in and lawyer check at Berhampore DSR.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Berhampore"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Berhampore Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-wb-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Will Drafting to WB Filing
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this checked 5-stage legal operating step to draft, execute, and register your Will in West Bengal:
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
                      Compile full details of KMC/town office flats, Salt Lake leaseholds, Banglarbhumi land records, bank accounts, and investments.
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
                      Draft customized legal clauses reflecting Dayabhaga freedom, survivorship, executor powers, and minor guardian appointments.
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
                      e-Deed Token
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Schedule your slot on wbregistration.gov.in and remit the flat ₹100 filing fee online through the GRIPS gateway.
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
                      Attend the ARA or SRO counter with witnesses for verbal witness signing, photo capture, and biometric thumbprinting.
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
                  For elderly, unwell, or bedridden citizens residing in Kolkata heritage homes, Salt Lake, New Town, or across West Bengal districts, visiting the registry office can be physically burdensome. Under <strong>Section 31 of the Filing Act, 1908</strong>, the registering officer is legally empowered to attend a private residence or hospital.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Doorstep Filing Operates Across West Bengal:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Medical Paper</strong>
                      <span className="text-slate-600">A filed MBBS or MD doctor certifies that the senior citizen is mentally lucid but physically unable to travel.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Commission Form</strong>
                      <span className="text-slate-600">Our legal lawyers draft and submit the formal Section 31 special commission petition before the local ARA or SRO.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Legal Commission Fee</strong>
                      <span className="text-slate-600">A nominal government commissioner fee is paid through the GRIPS portal to schedule the official officer home visit.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Portable Biometric Equipment</strong>
                      <span className="text-slate-600">The SRO visits your home with portable biometric scanners and cameras to register the Will in Book III.</span>
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
                  8. Paper Checklist for West Bengal Filing Offices
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

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="wb-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>PROPERTY DYNAMICS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Asset Classes &amp; Estate Rules Across West Bengal
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate steps in West Bengal depend substantially on the nature of asset title and regulatory office:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    City &amp; Society Flats
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    KMC &amp; Housing Societies
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under the West Bengal Co-operative Societies Act, a society nominee acts as a trustee. True ownership passes through a Will. For flats inside Kolkata presidency limits, a Calcutta High Court probate grant is submitted alongside the KMC Form A name change petition.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Farm &amp; Rural Lands
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Banglarbhumi RoR (Parcha)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Farmland parcels and rural homesteads in Purba Bardhaman, Nadia, or Hooghly require careful drafting to respect land ceilings. The heir submits the filed Will to the local BL&amp;LRO to update the Khatian on banglarbhumi.gov.in.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    99-Year Leasehold Plots
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Salt Lake &amp; New Town Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Home plots leased by the Urban Development Office in Salt Lake (Bidhannagar) or WBHIDCO in New Town demand explicit Will bequest. Fresh lease substitution deeds are signed upon submission of Will proof.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES & CHARGES */}
            <section id="wb-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Filing Fees &amp; Stamp Duty in West Bengal
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike shop asset sales that incur 5% to 7% stamp duty in West Bengal, Will Wills are completely exempt from stamp duty. Government charges at ARAs and SRO offices are purely nominal:
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
                      <td className="p-4 font-semibold">West Bengal Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (100% Statutorily Exempt)</td>
                      <td className="p-4">Government of West Bengal</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Book III Filing Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 (Flat Legal Fee)</td>
                      <td className="p-4">Directorate of Filing via GRIPS</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer Scanning &amp; Service Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹240</td>
                      <td className="p-4">SRO / ARA Counter</td>
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
                  11. Transparent Pricing Plans for West Bengal Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal help package tailored to your family&apos;s estate planning and asset portfolio in West Bengal:
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
                      Ideal for single homeowners with Kolkata/district apartments, bank savings, and demat assets.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Free West Bengal Will creator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Dayabhaga compliant legal clauses</span>
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
                    Most Popular in West Bengal
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
                      Senior estate lawyer review for KMC flats, Salt Lake leaseholds, and Calcutta High Court probate evaluation.
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
                        <span>Calcutta High Court probate strategy</span>
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
                      Doorstep SRO / ARA
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Complete SRO Filing
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      End-to-end filing coordination across ARA Kolkata or any West Bengal District SRO office.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>wbregistration.gov.in e-Deed booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer physically attends SRO / ARA</span>
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
                  12. Frequently Asked Questions: West Bengal Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Authoritative answers to common legal questions regarding Will drafting, probate, and asset filing in West Bengal:
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
                  13. Legal Citations &amp; West Bengal Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our estate drafting complies strictly with codified Indian statutes and West Bengal filing systems:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 63, and Section 213 (Calcutta Presidency Needed Probate Mandate).
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
                    Indian Stamp Act (WB)
                  </span>
                  <p className="text-xs text-slate-600">
                    Will Wills are 100% exempt from ad-valorem stamp duty across West Bengal.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    WB Filing Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official e-District portal: <code>wbregistration.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your West Bengal Assets &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned West Bengal apartments, business enterprises, or family lands to estate fights. Draft a legally binding Will online today or consult our senior Calcutta High Court lawyers.
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
                Visual Blueprint: West Bengal Will Drafting &amp; Asset Estate Framework
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
                src="/images/will-drafting-in-west-bengal.jpg"
                alt="High Resolution Visual Blueprint: West Bengal Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>West Bengal SRO Filed &amp; Calcutta High Court Probate Compliant</span>
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
