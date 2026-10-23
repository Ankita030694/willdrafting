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
  Stamp,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "lucknow-overview", label: "OVERVIEW" },
  { id: "lucknow-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "lda-property-mutation", label: "LDA PROPERTY WILL" },
  { id: "up-revenue-code-farmland", label: "AGRICULTURAL LAND" },
  { id: "lucknow-probate-rules", label: "PROBATE RULES" },
  { id: "lucknow-sro-directory", label: "SRO DIRECTORY" },
  { id: "lucknow-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-lucknow-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "lucknow-property-types", label: "PROPERTY TYPES" },
  { id: "lucknow-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const LUCKNOW_SROS = [
  {
    id: "kutchery",
    name: "Lucknow Sadar (Kaisarbagh Kutchery)",
    sro: "SRO Lucknow I & SRO Lucknow II",
    address: "District Collectorate Compound, Kaisarbagh, Lucknow, UP - 226001",
    areas: "Hazratganj, Kaisarbagh, Civil Lines, Raj Bhavan Area, Lalbagh, Aminabad, Chowk, Hussainabad, Wazirganj, Saadatganj",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
  {
    id: "trans-gomti",
    name: "Trans-Gomti & Vikas Nagar",
    sro: "SRO Lucknow III & SRO Lucknow IV",
    address: "Vikas Nagar / Sector 8 Indira Nagar Mini Secretariat, Lucknow, UP - 226022",
    areas: "Gomti Nagar (Vipin, Vipul, Vishal, Vibhuti Khand), Gomti Nagar Extension, Indira Nagar, Aliganj, Mahanagar, Nishatganj, Tedhi Pulia",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
  {
    id: "sarojini-nagar",
    name: "Sarojini Nagar & Alambagh",
    sro: "SRO Lucknow V (Transport Nagar)",
    address: "Tehsil Sarojini Nagar, Transport Nagar / Kanpur Road, Lucknow, UP - 226012",
    areas: "Alambagh, Ashiyana, Kanpur Road Scheme, Singar Nagar, Krishna Nagar, Manak Nagar, Amausi Airport Corridor, LDA Colony",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
  {
    id: "mohanlalganj",
    name: "Mohanlalganj & Shaheed Path",
    sro: "SRO Mohanlalganj",
    address: "Tehsil Compound, Mohanlalganj, Raebareli Road, Lucknow, UP - 226301",
    areas: "Sushant Golf City (Ansal API), Vrindavan Yojna, Avadh Vihar Yojna, Raebareli Road, SGPGI Area, Gosainganj, Mohanlalganj Town",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
  {
    id: "bakshi-ka-talab",
    name: "Bakshi Ka Talab (BKT)",
    sro: "SRO Bakshi Ka Talab",
    address: "Tehsil Compound, Bakshi Ka Talab, Sitapur National Highway, Lucknow, UP - 226201",
    areas: "Jankipuram, Jankipuram Extension, Sitapur Road Corridor, IIM Road, Kursi Road, BKT Township, Bhitauli, Mutkkipur",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
  {
    id: "malihabad",
    name: "Malihabad & Dubagga",
    sro: "SRO Malihabad",
    address: "Tehsil Compound, Malihabad, Hardoi Road, Lucknow, UP - 226102",
    areas: "Malihabad Mango Belt, Dubagga, Hardoi Road Corridor, Kakori, Rahimabad, Agricultural Farmlands",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Print on standard white A4 sheets. No expensive stamp paper is needed under UP law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Required for identity checks and digital photo capture at the Lucknow SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Witnesses must carry photo IDs. They must not receive any property in the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Fitness Certificate (For Seniors)",
    detail: "Signed by an MBBS doctor. Proves sound mental state and stops future false claims.",
    checked: false,
  },
  {
    id: "item-5",
    label: "UP IGRSUP Online Appointment Receipt",
    detail: "Official token receipt from igrsup.gov.in with your date and time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "LDA / Awas Vikas / Sale Deed Documents",
    detail: "Copies of allotment letter, sale deed, or Khatauni to confirm plot and flat numbers.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport Photos Each",
    detail: "Recent color passport photos for testator and both witnesses for Book III records.",
    checked: false,
  },
];

export default function LucknowLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("lucknow-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedSro, setSelectedSro] = useState<string>("kutchery");
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

  const filteredSros = LUCKNOW_SROS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN
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
                <span>LUCKNOW &amp; UTTAR PRADESH ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 56 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Lucknow: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your LDA flats, family homes, and farmland in Lucknow.
                Get senior lawyer drafting, UP IGRSUP portal slot booking, and Section 31 doorstep visits for seniors.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Lucknow Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#lucknow-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Lucknow SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>LDA Mutation Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 UP Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-lucknow-og.jpg"
                  alt="Online Will Drafting and Registration Services in Lucknow Uttar Pradesh"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
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
                6 SRO Offices
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Lucknow Tehsil Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Stamp Exempt in UP
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Allahabad HC Exemption
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep SRO Visits
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
          MAIN CONTAINER: 2-COLUMN
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-12">
          
          {/* DESKTOP STICKY TOC */}
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

          {/* EDITORIAL CONTENT */}
          <main className="min-w-0 flex-1 space-y-16">
            
            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="lucknow-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>LUCKNOW SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Lucknow
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional in Lucknow under Section 18(e) of the Registration Act, 1908. A Will on plain paper is valid if signed before two adult witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Mandatory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Lucknow was never a British presidency town. The Allahabad High Court has ruled that probate is not needed in Uttar Pradesh for Hindu, Sikh, Jain, or Buddhist Wills.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills do not require stamp duty in Uttar Pradesh. At the Lucknow Sub-Registrar Office, you pay only a flat ₹100 registration fee and minor scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>LDA &amp; Farmland Transfer</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will speeds up property name transfer at the Lucknow Development Authority (LDA) and Tehsil revenue offices.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="lucknow-legal-framework" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 1: STATUTORY SUCCESSION CODE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Will Drafting &amp; Legal Framework in Lucknow, UP
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Estate planning in Lucknow follows Indian succession laws and UP land rules. You may own an LDA house in Gomti Nagar, an old family home in Chowk, or farmland in Mohanlalganj. Making a clear Will protects your family from property disputes.
                </p>
                <p>
                  Under Section 59 of the Indian Succession Act, 1925, any adult of sound mind can write a Will. You can give away your self-earned house, land, cash, and bank funds. For ancestral property, Hindu family members can also give their undivided share under Section 30 of the Hindu Succession Act, 1956.
                </p>
              </div>

              {/* 4 PILLARS OF VALID WILL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Sound Disposing Mind</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The person making the Will must understand their assets and decisions. A doctor fitness certificate is helpful for senior citizens.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Two Independent Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 63(c) of the Indian Succession Act, two adult witnesses must watch you sign. They must not receive any gift in the Will.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Zero Stamp Duty Mandate</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the Indian Stamp Act in Uttar Pradesh, Wills are 100% exempt from stamp duty. You do not need costly stamp paper.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Named Legal Executor</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An executor carries out your wishes. They help transfer your bank funds, LDA flats, and land to your heirs.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 2: REGISTRATION REGULATIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Optional Will Registration Under Section 18 UP
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Uttar Pradesh. A Will written on plain white paper is legally valid if two witnesses sign it.
                </p>
                <p>
                  Even so, registering your Will at the Lucknow Sub-Registrar Office offers major benefits. Under Section 114 of the Indian Evidence Act, courts presume a registered Will is genuine. This makes it very hard for disgruntled relatives to claim the Will is fake.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-extrabold">
                      <tr>
                        <th className="p-3.5 sm:p-4">Succession Parameter</th>
                        <th className="p-3.5 sm:p-4 text-slate-600">Unregistered Will</th>
                        <th className="p-3.5 sm:p-4 text-[#C65378]">Registered Will (IGRSUP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Legal Validity</td>
                        <td className="p-3.5 sm:p-4">Valid if signed and witnessed</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Valid with official government presumption</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">LDA Property Transfer</td>
                        <td className="p-3.5 sm:p-4">Needs newspaper ads and bonds</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Direct transfer without long public notices</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Tehsil Land Mutation</td>
                        <td className="p-3.5 sm:p-4">High risk of disputes by relatives</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Quick order under UP Revenue Code</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Risk of Loss or Damage</td>
                        <td className="p-3.5 sm:p-4">Can be lost, hidden, or torn</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Saved permanently in SRO Book III records</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Biometric Record</td>
                        <td className="p-3.5 sm:p-4">No biometric evidence on record</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Fingerprints and photos stored on UP server</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: LDA PROPERTY MUTATION */}
            <section id="lda-property-mutation" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 3: LDA ESTATE TRANSFER RULES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. LDA Property Will Transfer: Mutation Guidelines
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  The Lucknow Development Authority (LDA) handles plots and apartments in Gomti Nagar, Jankipuram, and Kanpur Road. When an owner passes away, the legal heir must apply for name transfer (mutation) at Pradhikaran Bhawan in Gomti Nagar.
                </p>
                <p>
                  A registered Will makes this process fast and simple. For an unregistered Will, the LDA often asks for newspaper ads, a 30-day objection wait, and costly indemnity bonds. A registered Will helps you skip long delays and transfer the property directly.
                </p>
              </div>

              {/* LDA MUTATION PHASES */}
              <div className="space-y-3 pt-2">
                <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm">Submit Application &amp; Documents</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Apply on the LDA portal with your allotment letter, sale deed, death certificate, and registered Will copy.
                    </p>
                  </div>
                </div>

                <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm">Family Affidavits &amp; NOC</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submit simple affidavits and no-objection forms from other family members confirming the Will.
                    </p>
                  </div>
                </div>

                <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm">LDA Mutation Order</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      After checking your files, the LDA issues a fresh transfer letter in your name.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: UP REVENUE CODE FARMLAND */}
            <section id="up-revenue-code-farmland" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Home className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 4: AGRICULTURAL SUCCESSION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. UP Revenue Code 2006: Agricultural Land in Will
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Succession to farmland in Lucknow follows the Uttar Pradesh Revenue Code, 2006. This state law takes priority over general personal laws for agricultural land. It applies to rural lands in Mohanlalganj, Malihabad, and Bakshi Ka Talab.
                </p>
                <p>
                  Under Section 107 of the UP Revenue Code, 2006, a Bhumidhar with transferable rights can bequeath their land by Will. Keep these key legal rules in mind:
                </p>
              </div>

              {/* UP REVENUE CODE RULES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase">
                    <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                    <span>Transferable Rights</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Section 107 Rule</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Only a Bhumidhar with transferable rights can make a Will. Other holders cannot pass land by Will.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Statutory Order</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Female Landholder Rule</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A woman who inherited land under statutory succession must follow the order in Section 108 and 109.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tehsil Mutation</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Khatauni ROR Entry</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    After the owner passes away, the heir applies under Section 34/35 before the Tehsildar to update the Khatauni on UP Bhulekh.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: PROBATE RULES */}
            <section id="lucknow-probate-rules" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 5: HIGH COURT PROBATE JURISPRUDENCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Allahabad High Court Probate Exemption in UP
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Under Section 213 and Section 57 of the Indian Succession Act, 1925, court probate is mandatory only in Mumbai, Kolkata, and Chennai. These are historic British presidency towns.
                </p>
                <p>
                  Lucknow is not a presidency town. The Hon&apos;ble Allahabad High Court has ruled that probate is strictly optional in Uttar Pradesh. Key rulings include <em>Smt. Raj Rani v. Rama Devi</em> and <em>Ram Chand v. Deputy Director of Consolidation</em>.
                </p>
                <p>
                  In Lucknow, banks, the LDA, and Tehsil offices cannot force you to get court probate. A registered Will on UP IGRSUP is enough to transfer property. This saves families high court fees and months of waiting.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Key Takeaway for Lucknow Residents</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  You do not need to spend months seeking probate from the District Court at Kaisarbagh. A registered Will executed on UP IGRSUP provides complete authority for asset transfer across Lucknow.
                </p>
              </div>
            </section>

            {/* SECTION 6: SRO DIRECTORY */}
            <section id="lucknow-sro-directory" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 6: SUB-REGISTRAR JURISDICTION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Lucknow Sub-Registrar Offices: Tehsil Directory
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Will registration in Lucknow happens at the Sub-Registrar Office where you live or where your property is located. Use the search box below to find your nearest registration office:
              </p>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by locality (e.g., Gomti Nagar, Hazratganj, Ashiyana, Mohanlalganj)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]/30 shadow-xs"
                />
              </div>

              {/* SRO CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSros.map((sro) => (
                  <div
                    key={sro.id}
                    onClick={() => setSelectedSro(sro.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer text-left space-y-3 ${
                      selectedSro === sro.id
                        ? "bg-white border-[#C65378] shadow-md ring-2 ring-[#C65378]/10"
                        : "bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-extrabold text-sm text-slate-900">{sro.name}</div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {sro.sro}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C65378] shrink-0 mt-0.5" />
                        <span>{sro.address}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Home className="w-3.5 h-3.5 text-[#5F7E75] shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium">{sro.areas}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>{sro.timings}</span>
                      <span className="text-[#C65378] font-bold">Slot Booking Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: LOCAL AREAS */}
            <section id="lucknow-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Locality-Wise Will Drafting Services Across Lucknow Areas
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in Gomti Nagar, Aliganj, Hazratganj, or Indira Nagar</strong>? Property categories across Lucknow range from LDA freehold plots and UPHDB Awas Vikas sectors to luxury condominiums along Shaheed Path, ancestral havelis in Old Lucknow, and mango farmlands in Malihabad.
                  Our senior advocates provide customized legal drafting, UP IGRSUP portal slot booking, and Sub-Registrar accompaniment tailored to your locality:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: ALIGANJ & MAHANAGAR (FEATURED) */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Lucknow Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Vikas Nagar (SRO III &amp; IV)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Aliganj &amp; Mahanagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Aliganj (Sectors A to Q)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mahanagar &amp; Extension</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kapoorthala &amp; Dandiya Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nirala Nagar &amp; IT Crossing</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tedhi Pulia &amp; Ring Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Aliganj</strong> and Mahanagar for prime LDA freehold plots, duplex homes, and commercial shops in Kapoorthala. Probate is optional in UP—a registered Will gives heirs undisputed title mutation before LDA and Lucknow Nagar Nigam.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Vikas Nagar Mini Secretariat (SRO III &amp; IV)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        UP IGRSUP biometric scheduling, LDA freehold mutation clauses, and doorstep Section 31 visits for senior testators across Aliganj.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Aliganj"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Aliganj Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: GOMTI NAGAR & EXTENSION */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Trans-Gomti Prime Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Vikas Nagar &amp; Indira Nagar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gomti Nagar &amp; Extension
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gomti Nagar (Vipin, Vipul, Vishal)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vibhuti Khand Commercial &amp; IT</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gomti Nagar Extension (Shaheed Path)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Patrakarpuram &amp; Mithai Kothi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ekana Stadium Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Gomti Nagar</strong> and Gomti Nagar Extension for planned LDA villas, multi-storey luxury flats, and Vibhuti Khand IT offices. Includes precise clauses for LDA leasehold conversion, flat distribution, and NRI asset succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sector 8 Indira Nagar &amp; Vikas Nagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Comprehensive support for LDA Pradhikaran Bhawan mutation, NRI estate planning, and expedited Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">LDA Plotted &amp; High-Rise Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gomti Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gomti Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: HAZRATGANJ & CIVIL LINES */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage Core &amp; CBD
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kaisarbagh Kutchery
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Hazratganj &amp; Civil Lines
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hazratganj (MG Marg &amp; Janpath)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines &amp; Raj Bhavan Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lalbagh &amp; Naval Kishore Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jockey Road &amp; Butler Palace</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gokhale Marg &amp; Ashok Marg</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Premium <strong>Will drafting services in Hazratganj</strong> and Civil Lines for prime ancestral bungalows, heritage freehold parcels, and retail establishments along MG Marg. Tailored for rental cashflow bequests and dispute-proof family distributions.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate, Kaisarbagh (SRO I &amp; II)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Advocate representation at Lucknow Sadar Kutchery, senior doctor mental fitness certificates, and private trust creation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Heritage Freehold Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Hazratganj"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Hazratganj Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: INDIRA NAGAR & KALYANPUR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Awas Vikas Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Lucknow IV
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Indira Nagar &amp; Kalyanpur
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Indira Nagar (Blocks A to Z)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Munshipulia &amp; Bhootnath Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kalyanpur &amp; Ring Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shakti Nagar &amp; Sanjay Gandhi Puram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 14 &amp; Picnic Spot Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Indira Nagar</strong> and Kalyanpur for Asia&apos;s largest housing colony under UP Housing Board (UPHDB). Covers smooth house mutation, bank FD transmissions, and equity demat porting.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sector 8 Indira Nagar Mini Secretariat</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep Section 31 commissioner visits for senior citizens, UPHDB mutation guidance, and swift IGRSUP registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">UPHDB Housing Succession</span>
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

                {/* AREA 5: SUSHANT GOLF CITY & VRINDAVAN YOJNA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Shaheed Path Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mohanlalganj
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sushant Golf City &amp; Vrindavan
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sushant Golf City (Ansal API)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vrindavan Yojna (Sectors 1 to 18)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Avadh Vihar Yojna</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Medanta &amp; SGPGI Medical Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lulu Mall Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Modern <strong>Will drafting services in Sushant Golf City</strong> and Vrindavan Yojna along Amar Shaheed Path. Structured for gated township villas, high-rise luxury apartments, builder sub-lease transfers, and joint family holdings.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Compound, Mohanlalganj</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        E-slot scheduling at Mohanlalganj SRO, builder sub-lease succession verification, and biometric registration support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Gated Villas &amp; High-Rises</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sushant Golf City"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Golf City Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: JANKIPURAM & SITAPUR ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Institutional Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bakshi Ka Talab (BKT)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Jankipuram &amp; Sitapur Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jankipuram (Sectors A to J)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jankipuram Extension (LDA)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">AKTU &amp; Engineering College Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sitapur National Highway</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">IIM Road &amp; Bhitauli Crossing</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Professional <strong>Will drafting services in Jankipuram</strong> and Sitapur Road corridor for LDA planned sectors, builder floors, and institutional residential pockets with clear title transmission safeguards.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Compound, Bakshi Ka Talab (BKT)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Support for BKT SRO registration, LDA Janhit portal mutation, and doctor mental capacity certification.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">LDA Planned Schemes</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jankipuram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Jankipuram Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: ASHIYANA & KANPUR ROAD SCHEME */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Lucknow Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO V (Transport Nagar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ashiyana &amp; Kanpur Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ashiyana (Sectors H, I, K, L, M, N)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanpur Road LDA Scheme</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Singar Nagar &amp; Alambagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Krishna Nagar &amp; Manak Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amausi Airport Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Trusted <strong>Will drafting services in Ashiyana</strong> and Kanpur Road for defense personnel, retired civil officers, and commercial property owners across Alambagh and Singar Nagar.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Sarojini Nagar / Transport Nagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Dedicated advocate attendance, Section 31 doorstep execution for armed forces veterans, and Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Defense &amp; LDA Colonies</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ashiyana"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ashiyana Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: CHOWK, AMINABAD & MALIHABAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Farmland Belts
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kaisarbagh &amp; Malihabad
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Chowk, Aminabad &amp; Malihabad
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chowk &amp; Raja Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Aminabad &amp; Nakhas</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dubagga &amp; Hardoi Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Malihabad Mango Orchards</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kakori &amp; Rahimabad Farmlands</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Heritage <strong>Will drafting services in Chowk</strong>, Aminabad, and Malihabad for joint ancestral havelis, retail trading shops, and agricultural mango orchards compliant with UP Revenue Code Section 107.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kaisarbagh Kutchery &amp; Malihabad Tehsil</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Specialized HUF share structuring, UP Revenue Code Section 107 compliance, and ancestral estate protection.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">HUF &amp; Farmland Succession</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Chowk"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Chowk / Malihabad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: 5-STEP SOP */}
            <section id="step-by-step-lucknow-sop" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 8: STANDARDIZED OPERATING PROCEDURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step Will Registration SOP on IGRSUP
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                <p>
                  Registering a Will in Lucknow is easy when you follow these five steps. Our team helps you prepare your draft, book an online slot, and complete registration at the office.
                </p>
              </div>

              {/* 5 STEPS TIMELINE */}
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">List Assets &amp; Beneficiaries</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Make a list of your flats, bank accounts, shares, and land. Choose your heirs and name a trusted executor.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Legal Drafting with UP Statutory Clauses</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Draft your Will with clear clauses. Include revocation of old Wills, mental sound mind, and LDA transfer instructions.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Physical Execution Before Two Witnesses</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print the Will on plain A4 sheets. Sign each page in front of two adult witnesses who also sign.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Online IGRSUP Portal Slot Booking</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Book an online appointment on igrsup.gov.in for your Lucknow Sub-Registrar Office. Pay the ₹100 fee online.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Biometric Verification at Lucknow SRO</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar office with two witnesses and your Aadhaar cards. Provide fingerprints, take a photo, and receive your registered Will.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: SECTION 31 HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Home className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 9: DOORSTEP REGISTRATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Section 31 Doorstep Will Registration in Lucknow
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Visiting government offices at Kaisarbagh or Vikas Nagar can be hard for elderly or ill persons. Under Section 31 of the Registration Act, 1908, the Sub-Registrar can visit your home or hospital in Lucknow to register your Will.
                </p>
                <p>
                  Our legal team handles the complete Section 31 request. We arrange the doctor certificate, pay government travel fees, and set up the home visit.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="text-rose-700 font-bold text-xs">REQUIREMENT 1</div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Doctor Certificate</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An MBBS doctor certifies that the person cannot travel but has a sound mind.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="text-rose-700 font-bold text-xs">REQUIREMENT 2</div>
                  <h3 className="font-extrabold text-slate-900 text-sm">SRO Visit Fee</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pay the official UP government travel fee for the visiting officer.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="text-rose-700 font-bold text-xs">REQUIREMENT 3</div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Living Room Biometrics</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Sub-Registrar brings a portable biometric device to register the Will at home.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 10: REQUIRED DOCUMENTATION</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Document Checklist for Lucknow Sub-Registrar
                </h2>
                <span className="text-xs font-bold text-[#C65378] bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 self-start sm:self-auto">
                  {checkedCount} of {checklist.length} Documents Ready
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ensure you carry all mandatory documents on your appointment date. Click each item below to verify your readiness:
              </p>

              <div className="space-y-3 pt-1">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      item.checked
                        ? "bg-emerald-50/50 border-emerald-200/80 shadow-2xs"
                        : "bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        item.checked
                          ? "bg-emerald-600 text-white"
                          : "border-2 border-slate-300 bg-white"
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="space-y-0.5">
                      <div
                        className={`font-bold text-xs sm:text-sm ${
                          item.checked ? "text-emerald-950 line-through" : "text-slate-900"
                        }`}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: PROPERTY TYPES */}
            <section id="lucknow-property-types" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Home className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 11: ASSET CLASSIFICATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Lucknow Property Types: LDA, Freehold &amp; Farmland
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Property transfer rules depend on your property type in Lucknow. Make sure your Will lists correct documents and survey numbers for every asset:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>LDA Plots &amp; Multi-Storey Flats</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Plots and flats allotted by the LDA in Gomti Nagar or Jankipuram need your allotment letter, possession letter, and deed for transfer.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                    <Landmark className="w-4 h-4 text-[#5F7E75]" />
                    <span>UP Awas Vikas Parishad (UPHDB)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Flats and houses in Indira Nagar and Vrindavan Yojna belong to UPHDB. A registered Will allows direct name transfer.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                    <Home className="w-4 h-4 text-amber-600" />
                    <span>Ancestral Homes &amp; Freehold Land</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Old family homes in Hazratganj and Chowk need a family tree and name transfer before the Lucknow Municipal Corporation (LMC).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                    <Scale className="w-4 h-4 text-emerald-600" />
                    <span>Agricultural Land &amp; Mango Orchards</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farmland in Mohanlalganj, Malihabad, and BKT must list Khasra and Khatauni numbers for quick transfer under the UP Revenue Code.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: REGISTRATION FEES */}
            <section id="lucknow-registration-fees" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stamp className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 12: STATUTORY FEE SCHEDULE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. IGRSUP Portal Registration Fees &amp; Stamp Exemptions
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Registering a Will in Uttar Pradesh is very affordable. The state does not charge property transfer stamp duties on Wills.
                </p>
              </div>

              {/* FEE BREAKDOWN TABLE */}
              <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-extrabold">
                      <tr>
                        <th className="p-3.5 sm:p-4">Official UP Government Fee Component</th>
                        <th className="p-3.5 sm:p-4">Statutory Charge</th>
                        <th className="p-3.5 sm:p-4">Legal Citation / Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Stamp Duty on Will</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-extrabold">₹0 (Completely Exempt)</td>
                        <td className="p-3.5 sm:p-4">Indian Stamp Act 1899, Sch I-B Art 64</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">UP Registration Fee (Nibandhan Shulk)</td>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-800">₹100 (Flat Fee)</td>
                        <td className="p-3.5 sm:p-4">Payable online via IGRSUP portal</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Scanning &amp; User Processing Charges</td>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-800">₹100 - ₹200</td>
                        <td className="p-3.5 sm:p-4">Electronic Book III digital archiving</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Certified Copy of Registered Will</td>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-800">₹100 per copy</td>
                        <td className="p-3.5 sm:p-4">Available only to testator during lifetime</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Section 31 Doorstep Inspection Fee</td>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-800">Prescribed UP SRO Scale</td>
                        <td className="p-3.5 sm:p-4">Applicable for home and hospital visits</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 13: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 13: TRANSPARENT PACKAGES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Transparent Will Packages &amp; Legal Fees in Lucknow
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choose the service tier that fits your family estate requirements. Transparent pricing with zero hidden costs:
              </p>

              {/* PRICING CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* PLAN 1 */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      ESSENTIAL PLAN
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900">Online Lawyer Drafted Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for people who need a quick, legal Will for LDA flats, bank deposits, and shares.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>High Court Advocate Vetted</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>LDA &amp; Bank Mutation Clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant PDF Delivery</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Execution &amp; Witnessing Guide</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-slate-100 text-slate-900 font-extrabold text-xs text-center hover:bg-slate-200 transition-colors block"
                  >
                    Draft Essential Will
                  </Link>
                </div>

                {/* PLAN 2 (FEATURED) */}
                <div className="rounded-3xl p-6 bg-[#172228] text-white border-2 border-[#C65378] shadow-xl flex flex-col justify-between space-y-6 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-[10px] font-black uppercase tracking-wider text-white">
                    MOST POPULAR
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-300">
                      CONSULTATION PLAN
                    </span>
                    <h3 className="text-lg font-extrabold text-white">Senior Advocate Will Review</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">₹4,990</span>
                      <span className="text-xs text-slate-400">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Complete estate planning with a 1-on-1 call for complex families, farmland, and businesses.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-200 pt-2 border-t border-white/10">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                        <span>30-Min Video Call with Senior Lawyer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                        <span>UP Revenue Code Farmland Review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                        <span>LDA &amp; Awas Vikas Clause Customization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                        <span>Doctor Fitness Certificate Template</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full py-3 rounded-full bg-[#C65378] text-white font-extrabold text-xs text-center hover:bg-[#a13c5d] transition-colors shadow-lg shadow-[#C65378]/30 block"
                  >
                    Book Lawyer Consultation
                  </Link>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      ASSISTED REGISTRATION
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900">Lucknow SRO Registration</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete help with online slot booking, physical lawyer help at SRO, or Section 31 home visits.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>IGRSUP Token &amp; Slot Management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Physical Lawyer at Kaisarbagh/Vikas Nagar</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 Doorstep Visit Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Certified Book III SRO Copy Retrieval</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full py-3 rounded-full bg-slate-100 text-slate-900 font-extrabold text-xs text-center hover:bg-slate-200 transition-colors block"
                  >
                    Request SRO Assistance
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQs */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 14: FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Lucknow Wills
              </h2>

              <div className="space-y-3 pt-1">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY REFS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 15: LEGAL CITATIONS &amp; PORTALS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Statutory Acts &amp; Allahabad HC Judgments in UP
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Every testamentary instrument drafted through WillDrafting strictly aligns with established Indian jurisprudence and Uttar Pradesh legislative frameworks:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs text-slate-600">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <div className="font-extrabold text-slate-900">Indian Succession Act, 1925</div>
                  <p>Section 59 (Testamentary capacity), Section 63 (Mandatory two-witness attestation), and Section 213/57 (Probate scope limited to presidency towns).</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <div className="font-extrabold text-slate-900">Registration Act, 1908</div>
                  <p>Section 18(e) (Optional registration of Wills) and Section 31 (Discretion to register document at private residence or hospital).</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <div className="font-extrabold text-slate-900">UP Revenue Code, 2006</div>
                  <p>Section 107 (Bequest by Bhumidhar with transferable rights), Section 108/109 (Succession rules), and Section 34/35 (Mutation in Khatauni).</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <div className="font-extrabold text-slate-900">Allahabad High Court Rulings</div>
                  <p><em>Smt. Raj Rani v. Rama Devi</em> (AIR 1980 All 123) and <em>Ram Chand v. DDC</em> affirming no probate is needed for Wills in Uttar Pradesh.</p>
                </div>
              </div>

              {/* OFFICIAL PORTAL LINKS */}
              <div className="p-5 rounded-2xl bg-slate-100/80 border border-slate-200 space-y-2">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Official Uttar Pradesh Land &amp; Registration Portals:
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-700">
                  <a
                    href="https://igrsup.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#C65378]"
                  >
                    UP IGRSUP Portal (igrsup.gov.in)
                  </a>
                  <span>•</span>
                  <a
                    href="http://upbhulekh.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#C65378]"
                  >
                    UP Bhulekh Land Records (upbhulekh.gov.in)
                  </a>
                  <span>•</span>
                  <a
                    href="https://ldalucknow.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#C65378]"
                  >
                    Lucknow Development Authority (ldalucknow.co.in)
                  </a>
                  <span>•</span>
                  <a
                    href="http://vaad.up.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#C65378]"
                  >
                    UP Revenue Court System (vaad.up.nic.in)
                  </a>
                </div>
              </div>
            </section>

            {/* FINAL CTA BANNER */}
            <div className="rounded-3xl bg-linear-to-br from-[#172228] to-[#253640] p-8 sm:p-10 text-white shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C65378]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-3 relative z-10 max-w-xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300 font-bold">
                  SECURE YOUR LUCKNOW ESTATE TODAY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                  Protect Your Family Wealth &amp; Properties in Lucknow
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Avoid future family disputes, prolonged LDA mutation delays, and unnecessary litigation. Draft your legally binding Will online in under 15 minutes or speak to our senior advocates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative z-10">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/30 cursor-pointer text-center"
                >
                  <span>Start Drafting Your Lucknow Will</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <span>Speak with Lucknow Estate Lawyer</span>
                </Link>
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
                Visual Blueprint: Lucknow Will Drafting &amp; Asset Protection
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative flex-1 min-h-[400px] md:min-h-[550px] w-full mt-3 bg-[#172228] rounded-2xl overflow-hidden">
              <Image
                src="/images/will-drafting-in-lucknow-og.jpg"
                alt="High Resolution Visual Blueprint: Lucknow Will Drafting and Registration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
