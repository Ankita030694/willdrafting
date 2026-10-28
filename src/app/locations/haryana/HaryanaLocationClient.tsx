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
  Users,
  Briefcase,
  ExternalLink,
  Laptop,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "haryana-overview", label: "OVERVIEW" },
  { id: "haryana-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "haryana-probate-rules", label: "PROBATE RULES" },
  { id: "hsvp-and-builder-floors", label: "HSVP & FLOORS" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "haryana-sro-directory", label: "TEHSIL DIRECTORY" },
  { id: "haryana-regional-coverage", label: "REGIONAL CITIES" },
  { id: "step-by-step-haryana-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "haryana-property-types", label: "PROPERTY TYPES" },
  { id: "haryana-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const HARYANA_DIVISIONS = [
  {
    id: "gurugram-division",
    name: "Gurugram Division (Millennium City)",
    sro: "Gurugram Tehsil (Mini Secretariat), Wazirabad & Badshahpur",
    address: "Mini Secretariat, Civil Lines, Gurugram - 122001 / Tehsil Complex, Wazirabad, Gurugram - 122003",
    areas: "DLF Phases 1 to 5, Cyber City, Golf Course Road, Sohna Road, Sushant Lok, South City, Nirvana Country, Manesar, Pataudi, Kadipur",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "faridabad-division",
    name: "Faridabad & Ballabgarh Division",
    sro: "Faridabad Tehsil, Ballabgarh & Badkhal Sub-Tehsil",
    address: "Mini Secretariat, Sector 12, Faridabad - 121007 / Tehsil Complex, Ballabgarh, Faridabad - 121004",
    areas: "Sector 14, 15, 16, 21C, Green Field Colony, Greater Faridabad (Neharpar), Ballabgarh, Surajkund, Badkhal, Dhauj, Mohna, Tigaon",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "panchkula-ambala",
    name: "Panchkula & Ambala Division (Tricity Suburb)",
    sro: "Panchkula Tehsil (Sector 1) & Ambala City/Cantt Tehsil",
    address: "District Administrative Complex, Sector 1, Panchkula - 134109 / Mini Secretariat, Ambala City - 134003",
    areas: "Panchkula Sectors 2 to 21, MDC Sector 4 to 6, Pinjore, Kalka, Barwala, Raipur Rani, Ambala Cantt, Ambala City, Barara, Naraingarh",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "karnal-panipat",
    name: "Karnal & Panipat Division (GT Road Belt)",
    sro: "Karnal Tehsil (Sector 12) & Panipat Sub-Registrar Office",
    address: "Mini Secretariat, Sector 12, Karnal - 132001 / Tehsil Complex, Near Red Cross Market, Panipat - 132103",
    areas: "Karnal City, Model Town, Sector 4 to 9, Gharaunda, Indri, Assandh, Nilokheri, Panipat Model Town, Samalkha, Bapoli, Israna",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "rohtak-sonipat",
    name: "Rohtak & Sonipat Division (NCR Central)",
    sro: "Rohtak Tehsil (Mini Secretariat) & Sonipat Sub-Registrar Office",
    address: "Tehsil Administrative Office, Mini Secretariat, Rohtak - 124001 / Tehsil Complex, Kakroi Road, Sonipat - 131001",
    areas: "Rohtak City, Model Town, Sampla, Meham, Kalanaur, Sonipat City, Rai Industrial Area, Kundli, Ganaur, Kharkhoda, Murthal",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "hisar-sirsa",
    name: "Hisar & Western Haryana Division",
    sro: "Hisar Tehsil & Sirsa District Administrative Complex",
    address: "Mini Secretariat, Hisar - 125001 / District Courts Complex, Sirsa - 125055",
    areas: "Hisar City, Urban Estate 1 & 2, Model Town, Hansi, Barwala, Narnaund, Sirsa City, Ellenabad, Dabwali, Rania, Kalanwali",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Under Haryana Stamp Rules, stamp paper is zero rupees.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Will maker",
    detail: "Required for biometric check, thumbprint scanning, and web camera photo capture at the Tehsil office.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original government photo IDs and must not be heirs receiving assets under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Capacity Paper (For Seniors)",
    detail: "Issued on the signing date by a filed MBBS physician certifying sound mind and Will understanding.",
    checked: true,
  },
  {
    id: "item-5",
    label: "HSVP Allotment Letter / Conveyance Deed Copy",
    detail: "Necessary to verify plot number, sector allotment, and builder floor title under Haryana urban planning rules.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Jamabandi Fard / Farmland Revenue Paper",
    detail: "Relevant for farm plots, killa numbers, and khewat details recorded on jamabandi.nic.in.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Asset Tax Receipt (MCG / MCF / City)",
    detail: "Demonstrates up-to-date city records for smooth Will name change after the Will maker's demise.",
    checked: false,
  },
  {
    id: "item-8",
    label: "Bank Account & Demat Folio Details",
    detail: "List of fixed deposits, mutual funds, and trading account folios to enable clear residuary bequests.",
    checked: false,
  },
];

export default function HaryanaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("haryana-overview");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>(HARYANA_DIVISIONS[0].id);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [showHighResModal, setShowHighResModal] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
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

  const filteredDivisions = HARYANA_DIVISIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDivisionData =
    HARYANA_DIVISIONS.find((d) => d.id === selectedDivision) || HARYANA_DIVISIONS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (PUNE / MAHARASHTRA STRICT THEME)
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
                <span>HARYANA ESTATE PLANNING &amp; SUCCESSION DESK</span>
              </div>

              {/* Top Heading under SEO Guidelines: Exactly 53 chars, starts with Will Drafting Services in Haryana */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Haryana: Online Legal Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your HSVP plots, independent builder floors, condominium flats, and farm holdings across Haryana.
                Benefit from senior lawyer review, Jamabandi portal token booking help, and doorstep signing for senior citizens.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Haryana Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#haryana-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Haryana Tehsil Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Punjab &amp; Haryana HC Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>HSVP &amp; Jamabandi Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULLY VISIBLE IN MOBILE & DESKTOP */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-haryana.jpg"
                  alt="Online Will Drafting and SRO Registration Services in Haryana"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 42vw"
                  priority
                />
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
                140+ Tehsils
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Statewide Haryana Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Haryana Stamp Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Non-Needed
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Probate Under High Court
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep Visits for Seniors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: DROPDOWN TABLE OF CONTENTS (STICKY BELOW NAVBAR ON MOBILE)
          ========================================================================= */}
      <div className="block lg:hidden sticky top-0 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 shadow-2xs">
        <div className="relative max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#C65378] animate-pulse" />
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Section:
              </span>
              <span className="text-xs font-bold text-[#172228] truncate max-w-[200px]">
                {currentActiveToc.label}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                mobileTocOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileTocOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-40 max-h-72 overflow-y-auto">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileTocOpen(false)}
                  className={`block px-4 py-2.5 text-xs font-bold transition-colors border-b border-slate-50 last:border-0 ${
                    activeId === item.id
                      ? "bg-[#C65378]/10 text-[#C65378] font-extrabold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN BODY CONTAINER WITH TWO-COLUMN DESKTOP LAYOUT (STICKY TOC SIDEBAR)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* DESKTOP STICKY SIDEBAR (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-extrabold tracking-wider uppercase text-slate-500">
                  Contents Navigator
                </span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      activeId === item.id
                        ? "bg-[#C65378] text-white shadow-xs translate-x-1"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#172228]"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#172228] text-white text-xs font-bold hover:bg-[#C65378] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Drafting Now</span>
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA (9 COLS) */}
          <main className="lg:col-span-9 space-y-16">

            {/* -----------------------------------------------------------------
                SECTION 1: OVERVIEW
                ----------------------------------------------------------------- */}
            <section id="haryana-overview" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#5F7E75]/10 text-[#5F7E75] text-xs font-bold uppercase tracking-wider">
                Estate Estate in Haryana
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                1. Estate Planning in Haryana: Overview
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  Haryana represents a dynamic mix of prime metropolitan real estate and vast farm wealth.
                  In urban hubs like Gurugram and Faridabad, estate planning centers on luxury condominiums, high-value shop assets, and independent builder floors.
                  In districts like Karnal, Sonipat, Hisar, and Rohtak, family farmland and village home plots form the core of family patrimony.
                </p>
                <p>
                  Without a legally drafted Will, the estate of a deceased Hindu, Sikh, Jain, or Buddhist is partitioned under Section 8 of the Hindu Succession Act, 1956.
                  This often triggers prolonged split suits (Batwara) before civil courts and revenue tehsildars, freezing bank accounts and stalling asset mutations for decades.
                </p>
                <p>
                  A properly drafted Will Will allows you to clearly distribute your self-acquired assets to chosen heirs.
                  It prevents family discord and ensures seamless transfer across the <strong>Haryana Jamabandi portal</strong> and <strong>HSVP Estate Offices</strong>.
                </p>
              </div>

              {/* HIGHLIGHT BOX */}
              <div className="bg-white p-6 rounded-2xl border border-amber-200/80 bg-linear-to-r from-amber-50/50 to-white flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <h3 className="font-bold text-slate-900">
                    Why Haryana Asset Owners Need Clear Wills
                  </h3>
                  <p>
                    HSVP (formerly HUDA) plots and independent builder floors in Haryana are governed by distinct allotment bye-laws.
                    Ambiguous wording or handwritten notes can lead to rejection of name change requests, forcing legal heirs to file costly declaratory suits in civil court.
                  </p>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 2: LEGAL FRAMEWORK
                ----------------------------------------------------------------- */}
            <section id="haryana-legal-framework" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                Legal Compliance
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                2. Haryana Estate Laws &amp; Legal Basis
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  Will estate in Haryana is governed by the <strong>Indian Succession Act, 1925</strong>, along with state-specific land revenue and filing rules:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                    <Scale className="w-4 h-4" />
                    <span>Section 63: Witness Signing Mandate</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                    The Will maker must sign or affix their mark in the presence of at least two adult witnesses.
                    Each witness must sign the Will in the presence of the Will maker.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-[#5F7E75] font-bold text-sm">
                    <FileCheck className="w-4 h-4" />
                    <span>Section 18(e): Filing A Choice</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                    Under the Filing Act, 1908, registering a Will is strictly a choice in Haryana.
                    A Will written on plain paper is legally binding once signed and witnessed.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-[#172228] font-bold text-sm">
                    <Landmark className="w-4 h-4" />
                    <span>Punjab Land Revenue Act, 1887</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                    Governs farm land mutations (Intiqal) across Haryana revenue circles through local Halqa Patwaris and Circle Revenue Officers.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Section 59: Will Capacity</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                    Every person of sound mind not being a minor may dispose of their asset by Will.
                    A medical fitness paper from an MBBS doctor confirms capacity.
                  </p>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 3: PROBATE RULES
                ----------------------------------------------------------------- */}
            <section id="haryana-probate-rules" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#172228]/10 text-[#172228] text-xs font-bold uppercase tracking-wider">
                Judicial Precedent
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                3. Probate Rules: Punjab &amp; Haryana HC
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  A frequent question among Haryana residents is whether a court probate is needed before assets can be transferred.
                  Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is needed <strong>only in historical presidency towns</strong> (Mumbai, Kolkata, Chennai).
                </p>
                <p>
                  The Hon&apos;ble <strong>Punjab and Haryana High Court</strong> has reaffirmed in multiple landmark judgments that probate is <strong>strictly a choice</strong> in Haryana.
                  Neither HSVP, MCG, nor banks have legal office to compel legal heirs to get probate if the Will is properly filed and unencumbered by court stay orders.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 sm:p-4 font-bold">Feature</th>
                      <th className="p-3.5 sm:p-4 font-bold">Plain Will</th>
                      <th className="p-3.5 sm:p-4 font-bold bg-[#C65378]">Filed Will (Tehsil SRO)</th>
                      <th className="p-3.5 sm:p-4 font-bold">Court Probate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Legal Validity</td>
                      <td className="p-3 sm:p-4">Valid under Section 63</td>
                      <td className="p-3 sm:p-4 bg-rose-50/40 font-semibold text-rose-950">Valid with Strong Proof Presumption</td>
                      <td className="p-3 sm:p-4">Strong Court Order</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">HSVP Name Change</td>
                      <td className="p-3 sm:p-4">Requires scrutiny and NOCs</td>
                      <td className="p-3 sm:p-4 bg-rose-50/40 font-semibold text-rose-950">Direct processing with public notice</td>
                      <td className="p-3 sm:p-4">Accepted automatically</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Jamabandi Revenue Name Change</td>
                      <td className="p-3 sm:p-4">Risk of Patwari objections</td>
                      <td className="p-3 sm:p-4 bg-rose-50/40 font-semibold text-rose-950">Streamlined Intiqal approval</td>
                      <td className="p-3 sm:p-4">Required only if fight exists</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Time Required</td>
                      <td className="p-3 sm:p-4">Immediate drafting</td>
                      <td className="p-3 sm:p-4 bg-rose-50/40 font-semibold text-rose-950">1 to 2 days for Tehsil token &amp; visit</td>
                      <td className="p-3 sm:p-4">12 to 24 months in court</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Government Cost</td>
                      <td className="p-3 sm:p-4">₹0</td>
                      <td className="p-3 sm:p-4 bg-rose-50/40 font-semibold text-rose-950">₹100 to ₹200 nominal SRO fee</td>
                      <td className="p-3 sm:p-4">Court fees up to tens of thousands</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 4: HSVP PLOTS & BUILDER FLOORS
                ----------------------------------------------------------------- */}
            <section id="hsvp-and-builder-floors" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#5F7E75]/10 text-[#5F7E75] text-xs font-bold uppercase tracking-wider">
                Urban Asset Nuances
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                4. HSVP Plots &amp; Independent Builder Floors
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  Estate planning in Haryana presents unique architectural and regulatory considerations:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#172228]">
                    HSVP (HUDA) Home &amp; Shop Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Haryana Shehri Vikas Pradhikaran requires an explicit chain of title upon the death of an allottee.
                    The Estate Officer requires the filed Will, death paper, sworn note by the heir, indemnity bond, and NOCs from other Class-I legal heirs (or a 30-day public notice).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#5F7E75]">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#172228]">
                    Independent Builder Floors (Stilt + 4 Policy)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Haryana&apos;s builder floor policy in Gurugram, Faridabad, and Panchkula, each floor has an undivided proportionate share in the land.
                    The Will must explicitly designate floor numbers, car parking stilt spots, and rooftop access rights to prevent future injunction suits between siblings.
                  </p>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 5: REGISTRATION RULES
                ----------------------------------------------------------------- */}
            <section id="mandatory-vs-optional" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                Book III Filing
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                5. Will Filing: Needed vs A Choice
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  While registering a Will is not legally needed, experienced estate lawyers strongly recommend registering it at your local Tehsil office.
                  Here is why filing offers unmatched protection:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li>
                    <strong>Official Government Archive:</strong> A scanned copy is placed permanently in Book III at the SRO office, protecting against loss or theft.
                  </li>
                  <li>
                    <strong>Check of Will Capacity:</strong> The SRO records biometrics and photos, preventing allegations of forgery or coercion.
                  </li>
                  <li>
                    <strong>Expedited Name Change:</strong> Halqa Patwaris and HSVP Estate Officers process filed Wills with minimal office resistance.
                  </li>
                  <li>
                    <strong>Bank Locker &amp; Asset Liquidation:</strong> Financial institutions release fixed deposits and mutual funds quickly upon inspecting filed papers.
                  </li>
                </ul>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 6: SRO DIRECTORY
                ----------------------------------------------------------------- */}
            <section id="haryana-sro-directory" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#172228]/10 text-[#172228] text-xs font-bold uppercase tracking-wider">
                Tehsil &amp; SRO Offices
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                6. Haryana Tehsil &amp; SRO Directory
              </h3>
              <p className="text-sm text-slate-600">
                Search and explore the major filing divisions across Haryana for Jamabandi token booking:
              </p>

              {/* SEARCH INPUT */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Filter by city, area, or tehsil..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C65378] text-[#172228]"
                />
              </div>

              {/* DIVISION TABS */}
              <div className="flex flex-wrap gap-2 pt-2">
                {filteredDivisions.map((div) => (
                  <button
                    key={div.id}
                    onClick={() => setSelectedDivision(div.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedDivision === div.id
                        ? "bg-[#172228] text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {div.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* ACTIVE DIVISION CARD */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-base sm:text-lg text-[#172228]">
                    {activeDivisionData.name}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-extrabold uppercase">
                    Jamabandi Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-500 block">Designated SRO / Tehsil:</span>
                    <span className="text-[#172228] font-medium">{activeDivisionData.sro}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block">Office Timings:</span>
                    <span className="text-[#172228] font-medium">{activeDivisionData.timings}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-bold text-slate-500 block">Address / Location:</span>
                    <span className="text-[#172228] font-medium">{activeDivisionData.address}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-bold text-slate-500 block">Key Local Sectors &amp; Areas:</span>
                    <span className="text-slate-600 font-normal">{activeDivisionData.areas}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 7: REGIONAL CITIES COVERAGE
                ----------------------------------------------------------------- */}
            <section id="haryana-regional-coverage" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#5F7E75]/10 text-[#5F7E75] text-xs font-bold uppercase tracking-wider">
                Full State Reach
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                7. Statewide Coverage Across Haryana
              </h3>
              <p className="text-sm text-slate-600">
                AMA Legal Solutions provides full online Will drafting and Tehsil filing accompaniment across all 22 districts of Haryana:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-bold text-slate-800">
                {[
                  "Will Drafting Services in Gurugram",
                  "Will Drafting Services in Faridabad",
                  "Will Drafting Services in Panchkula",
                  "Will Drafting Services in Rohtak",
                  "Will Drafting Services in Panipat",
                  "Will Drafting Services in Karnal",
                  "Will Drafting Services in Ambala",
                  "Will Drafting Services in Hisar",
                  "Will Drafting Services in Sonipat",
                  "Will Drafting Services in Yamunanagar",
                  "Will Drafting Services in Sirsa",
                  "Will Drafting Services in Bhiwani",
                  "Will Drafting Services in Bahadurgarh",
                  "Will Drafting Services in Jind",
                  "Will Drafting Services in Kurukshetra",
                  "Will Drafting Services in Kaithal",
                  "Will Drafting Services in Rewari",
                  "Will Drafting Services in Palwal",
                  "Will Drafting Services in Hansi",
                  "Will Drafting Services in Narnaul",
                  "Will Drafting Services in Fatehabad",
                  "Will Drafting Services in Charkhi Dadri",
                ].map((name, idx) => (
                  <button
                    key={idx}
                    type="button"
                    data-open-signup="true"
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
                      }
                    }}
                    className="w-full text-left bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-[#C65378] hover:text-[#C65378] transition-all flex items-center gap-2.5 shadow-2xs group cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-[#C65378] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="leading-snug">{name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 8: 5-STEP SOP
                ----------------------------------------------------------------- */}
            <section id="step-by-step-haryana-sop" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                Standard Operating Step
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                8. Step-by-Step SOP: Haryana Will Drafting
              </h3>

              <div className="space-y-4">
                {[
                  {
                    step: "Step 1",
                    title: "Compile Asset Inventory & Revenue Details",
                    desc: "Gather HSVP allotment papers, conveyance deeds for builder floors, Jamabandi Fards for farm land, and banking folio numbers.",
                  },
                  {
                    step: "Step 2",
                    title: "Draft with Lawyer & Custody Clauses",
                    desc: "Customize Will bequests, designate alternate executors, and define specific shares in common terrace and parking areas.",
                  },
                  {
                    step: "Step 3",
                    title: "Execute Before Two Independent Witnesses",
                    desc: "Print the finalized paper on clean A4 paper. Will maker and two independent adult witnesses sign every page simultaneously.",
                  },
                  {
                    step: "Step 4",
                    title: "Book Jamabandi Portal Appointment",
                    desc: "Generate an appointment token via jamabandi.nic.in for your local Tehsil or Sub-Tehsil office and pay the nominal government fee.",
                  },
                  {
                    step: "Step 5",
                    title: "Complete Biometric Check at Tehsil",
                    desc: "Visit the registry office with your witnesses for live photography, fingerprint capture, and official entry into Book III records.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-start gap-4">
                    <span className="px-3 py-1.5 rounded-xl bg-[#172228] text-white font-extrabold text-xs shrink-0">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 9: HOME REGISTRATION
                ----------------------------------------------------------------- */}
            <section id="doorstep-home-registration" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#5F7E75]/10 text-[#5F7E75] text-xs font-bold uppercase tracking-wider">
                Senior Citizen Facility
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                9. Doorstep Home Filing: Section 31
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  Senior citizens, ailing Will makers, and hospital-bound patients in Haryana can register their Will without physically traveling to crowded Tehsil premises.
                  Under <strong>Section 31 of the Filing Act, 1908</strong>, the SRO has the legal power to conduct a filing commission at the Will maker&apos;s residence or hospital room.
                </p>
                <p>
                  AMA Legal Solutions coordinates the entire doorstep commission process across DLF Phases 1 to 5, Golf Course Road, Sushant Lok, Faridabad sectors, Panchkula, and all major cities in Haryana.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                <h3 className="font-bold text-sm sm:text-base text-[#172228] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Rules for Section 31 Home Filing</span>
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                  <li>Formal written requisition submitted to the local Tehsildar / SRO.</li>
                  <li>Medical fitness and immobility paper issued by a filed MBBS doctor.</li>
                  <li>Payment of official government commission conveyance charges.</li>
                  <li>Physical presence of the Will maker and two independent witnesses at the home or hospital.</li>
                </ul>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 10: DOCUMENTS CHECKLIST
                ----------------------------------------------------------------- */}
            <section id="documents-checklist" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                Free Checklist
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                  10. Checklist: Papers for Will in Haryana
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                  {checkedCount} of {checklist.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3 cursor-pointer hover:border-[#C65378] transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {}}
                      className="w-4 h-4 mt-1 accent-[#C65378] rounded-xs cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-xs sm:text-sm text-[#172228]">
                        {item.label}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 11: PROPERTY TYPES
                ----------------------------------------------------------------- */}
            <section id="haryana-property-types" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#172228]/10 text-[#172228] text-xs font-bold uppercase tracking-wider">
                Asset Allocation
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                11. Asset Types: HSVP, Floors &amp; Farmland
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs font-extrabold text-[#C65378] uppercase">Urban Real Estate</span>
                  <h3 className="font-bold text-sm text-[#172228]">HSVP Plots &amp; Condominiums</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Clear assignment of home plots, luxury DLF apartments, shop shops, and SCO units.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs font-extrabold text-[#5F7E75] uppercase">Rural Patrimony</span>
                  <h3 className="font-bold text-sm text-[#172228]">Farmland &amp; Village Abadi</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farm land recorded under Khewat, Khatoni, and Killa numbers in Jamabandi land records.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs font-extrabold text-[#172228] uppercase">Liquid Wealth</span>
                  <h3 className="font-bold text-sm text-[#172228]">Demat, FDs &amp; Business</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Shares, mutual fund portfolios, bank fixed deposits, jewelry, and partnership firm equity.
                  </p>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 12: REGISTRATION FEES
                ----------------------------------------------------------------- */}
            <section id="haryana-registration-fees" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#5F7E75]/10 text-[#5F7E75] text-xs font-bold uppercase tracking-wider">
                Government Charges
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                12. Haryana SRO Filing Fees &amp; Duty
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  Registering a Will in Haryana is very affordable because Will instruments are exempt from stamp duty.
                  There are zero percentage-based taxes on asset value:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 sm:p-4 font-bold">Item</th>
                      <th className="p-3.5 sm:p-4 font-bold">Legal Rate</th>
                      <th className="p-3.5 sm:p-4 font-bold">Practical Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Stamp Duty</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-extrabold">₹0 (Exempt)</td>
                      <td className="p-3 sm:p-4">Execute directly on clean white A4 paper. No e-stamp required.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Filing Fee</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">₹100 to ₹200</td>
                      <td className="p-3 sm:p-4">Paid online or via treasury challan during Jamabandi token booking.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Computer Scanning Charges</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">₹100 to ₹300</td>
                      <td className="p-3 sm:p-4">Nominal IT office charges for Book III digital archiving.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Home Commission Fee</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Standard SRO Tariff</td>
                      <td className="p-3 sm:p-4">Applicable only for Section 31 doorstep visits for senior citizens.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 13: PLANS & PRICING
                ----------------------------------------------------------------- */}
            <section id="service-pricing" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                Transparent Pricing
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                13. Transparent Plans: Haryana Will Drafting
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Basic Online</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-[#172228]">₹1,990</span>
                      <span className="text-xs text-slate-500">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Standard lawyer-drafted Will Will for simple estates with urban apartments or bank accounts.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant legal platform generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Revocation and executor clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Witness signing guidelines</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-xl bg-slate-100 text-[#172228] text-center text-xs font-bold hover:bg-slate-200 transition-colors"
                  >
                    Select Plan
                  </a>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="bg-[#172228] text-white p-6 rounded-2xl border-2 border-[#C65378] shadow-xl flex flex-col justify-between space-y-6 relative">
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Most Popular
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-extrabold text-rose-300 uppercase tracking-wider">Lawyer Assisted</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white">₹4,990</span>
                      <span className="text-xs text-slate-400">one-time</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Customized drafting with senior lawyer talk for HSVP plots, builder floors, and multi-heir split.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>Senior lawyer review &amp; phone talk</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>Independent builder floor clause customization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>Jamabandi token booking advisory</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-xl bg-[#C65378] text-white text-center text-xs font-extrabold hover:bg-[#a13c5d] transition-colors shadow-md shadow-[#C65378]/30"
                  >
                    Choose Lawyer Plan
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Tehsil Filing</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-[#172228]">₹9,990</span>
                      <span className="text-xs text-slate-500">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      End-to-end service including lawyer drafting, Jamabandi token booking, and physical SRO accompaniment.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>All features of Lawyer Plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer accompaniment at Tehsil office</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep help support</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/services/will-registration"
                    className="w-full py-3 rounded-xl bg-slate-100 text-[#172228] text-center text-xs font-bold hover:bg-slate-200 transition-colors"
                  >
                    Explore Filing
                  </a>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 14: FAQs
                ----------------------------------------------------------------- */}
            <section id="frequently-asked-questions" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#172228]/10 text-[#172228] text-xs font-bold uppercase tracking-wider">
                Common Questions
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                14. Frequently Asked Questions: Haryana Wills
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#172228] hover:text-[#C65378] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 15: STATUTORY CITATIONS
                ----------------------------------------------------------------- */}
            <section id="statutory-citations" className="scroll-mt-32 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#5F7E75]/10 text-[#5F7E75] text-xs font-bold uppercase tracking-wider">
                Legal Offices
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172228]">
                15. Legal Citations &amp; Legal References
              </h3>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Landmark className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <p>
                    <strong>Indian Succession Act, 1925:</strong> Section 59 (capacity to make Will), Section 63 (signing and witness signing rules), and Section 213 (probate applicability limited to presidency towns).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Landmark className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <p>
                    <strong>Filing Act, 1908:</strong> Section 18(e) (a choice filing of Will papers) and Section 31 (special commission filing at residence or hospital).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Landmark className="w-4 h-4 text-[#172228] shrink-0 mt-0.5" />
                  <p>
                    <strong>Punjab &amp; Haryana High Court Jurisprudence:</strong> Confirms that getting probate of a Will is not a condition precedent to set up legal right in civil courts or revenue records in Haryana.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Landmark className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <p>
                    <strong>Haryana Shehri Vikas Pradhikaran (HSVP) Regulations:</strong> Transfer and name change policies under Haryana Urban Development Act, 1977 for home and builder floor assets.
                  </p>
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
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION IMAGE MODAL (DESKTOP & MOBILE ACCESSIBLE)
          ========================================================================= */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full aspect-video bg-[#172228] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            <Image
              src="/images/will-drafting-in-haryana.jpg"
              alt="Will Drafting in Haryana Hero Banner"
              width={1200} height={675}
              className="absolute inset-0 w-full h-full object-contain"
              priority
            />
            <button
              onClick={() => setShowHighResModal(false)}
              className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold hover:bg-white/30 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
