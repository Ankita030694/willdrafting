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
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "kerala-overview", label: "OVERVIEW" },
  { id: "kerala-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "kerala-probate-rules", label: "PROBATE RULES" },
  { id: "kerala-sro-directory", label: "SRO DIRECTORY" },
  { id: "regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-kerala-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "kerala-property-types", label: "PROPERTY TYPES" },
  { id: "kerala-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const KERALA_SRO_HUBS = [
  {
    id: "kochi-ernakulam",
    name: "Kochi & Ernakulam (Revenue Tower)",
    sro: "SRO Ernakulam (Marine Drive)",
    address: "Revenue Tower Complex, Marine Drive, Ernakulam, Kochi - 682011",
    areas: "Ernakulam City, Marine Drive, MG Road, Panampilly Nagar, Kaloor, Edappally, Palarivattom, Ravipuram",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "kakkanad-it",
    name: "Kakkanad & Thrikkakara (IT Belt)",
    sro: "SRO Thrikkakara (Civil Station)",
    address: "District Collectorate & Civil Station, Kakkanad, Kochi - 682030",
    areas: "Kakkanad, SmartCity, Infopark Belt, Thrikkakara, Vazhakkala, Padamughal, Vennala, Kalamassery",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "trivandrum-central",
    name: "Thiruvananthapuram (Vanchiyoor)",
    sro: "SRO Thiruvananthapuram Central",
    address: "District Court Complex Road, Vanchiyoor, Thiruvananthapuram - 695035",
    areas: "Vanchiyoor, Kowdiar, Sasthamangalam, Statue, Palayam, Pattom, Vazhuthacaud, Jagathy, Fort",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "kazhakkoottam-technopark",
    name: "Kazhakkoottam (Technopark Corridor)",
    sro: "SRO Kazhakkoottam Sub-District",
    address: "National Highway Bypass, Near Kazhakkoottam Junction, Thiruvananthapuram - 695582",
    areas: "Kazhakkoottam, Technopark Phases 1-4, Kariavattom, Kulathoor, Attipra, Sreekaryam, Menamkulam",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "kozhikode-civil-station",
    name: "Kozhikode (Civil Station)",
    sro: "SRO Kozhikode Sub-District Registry",
    address: "Collectorate Civil Station, Wayanad Road, Kozhikode - 673020",
    areas: "Civil Station, Mavoor Road, Nadakkavu, Chevayur, Puthiyara, Pottammal, Malaparamba, Eranhipalam",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "thrissur-ayyanthole",
    name: "Thrissur (Ayyanthole Civil Station)",
    sro: "SRO Thrissur Central",
    address: "Civil Station Complex, Ayyanthole, Thrissur - 680003",
    areas: "Swaraj Round, Ayyanthole, Ollur, Cherpu, Punkunnam, Chembukkavu, Kuriachira, West Fort",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "kottayam-pala",
    name: "Kottayam & Pala (Plantation Belt)",
    sro: "SRO Kottayam Collectorate",
    address: "Mini Civil Station, Collectorate P.O., Kottayam - 686002",
    areas: "Kottayam Town, Kanjikuzhy, Changanassery, Pala, Ettumanoor, rubber estates, Meenachil taluk",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "kollam-civil-station",
    name: "Kollam (Chinnakada)",
    sro: "SRO Kollam Registry Office",
    address: "Civil Station Complex, Near Chinnakada, Kollam - 691013",
    areas: "Chinnakada, Asramam, Kadappakada, Tangasseri, Thirumullavaram, Kilikollur, Eravipuram",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Paper",
    detail: "Print on plain white A4 sheets. Under Kerala law, stamp paper is not needed for a Will.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Owner (or Passport for NRIs)",
    detail: "Needed for thumb scans, ID checks, and live photos at the SRO PEARLS desk.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Neutral Adult Witnesses with Aadhaar",
    detail: "Must bring original state photo IDs and must not be heirs who get any gift under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Fitness Note (MBBS / MD)",
    detail: "Wise for seniors aged 60+ and hospital signings. Proves a clear and sound mind.",
    checked: false,
  },
  {
    id: "item-5",
    label: "PEARLS Portal e-Token Slip & Fee Slip",
    detail: "Time-slot booking slip and e-Treasury fee receipt printed from keralasigning.gov.in.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Thandapper Tax Slips & Sale Deeds",
    detail: "Land tax slip, basic tax register (BTR) numbers, and buy deed copies for Kerala land.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Gulf NRI Asset List & Bank Account Details",
    detail: "Clear list of NRE/NRO deposits, mutual funds, stock accounts, and Gulf assets.",
    checked: false,
  },
];

export default function KeralaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("kerala-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("kochi-ernakulam");
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

  const filteredHubs = KERALA_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    KERALA_SRO_HUBS.find((h) => h.id === selectedHub) || KERALA_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (NASHIK ARCHITECTURE)
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
                <span>KERALA &amp; GULF NRI SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 59 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Kerala: Online Will &amp; NRI Support
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your Kerala apartments, family family tharavads, rubber plantations, and cross-border Gulf NRI assets. Benefit from expert legal drafting, PEARLS portal SRO signing, and Section 31 doorstep signing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Kerala Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#kerala-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Kerala SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kerala HC Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Kerala Stamp Duty</span>
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
                  src="/images/will-drafting-in-kerala.jpg"
                  alt="Legal Will Drafting and Property Succession in Kerala"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Kerala Legal &amp; NRI Estate Estate Blueprint
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
                8 Regional Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Kerala District Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Kerala Stamp Act Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                A Choice Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Non-Presidency Town Rule
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

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="kerala-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>KERALA QUICK GUIDE</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Kerala
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>A Choice Filing</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Filing a Will at the SRO is a choice under Section 18(e) of the Filing Act, 1908. While a Will signed on plain paper before two witnesses is valid, Book III SRO filing on the PEARLS portal gives strong proof against family fights.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No Court Probate Needed</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Kerala is a non-presidency state under the Kerala High Court. Under Section 213 of the Indian Succession Act, court probate is not required in Kerala, letting heirs complete direct title transfers and Pokkuvaravu with a filed Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Kerala Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills pay zero stamp duty across Kerala under the Kerala Stamp Act. You pay only a flat ₹100 state fee plus small page scan charges on the state e-Treasury portal.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Thandapper &amp; Pokkuvaravu</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A filed Will speeds up Thandapper account transfers and Pokkuvaravu (name change) at local Village Offices under the Kerala Transfer of Registry Rules, 1966, without a slow court case.
                    </p>
                  </div>
                </div>

                {/* PLAIN-ENGLISH QUICK SUMMARY FOR FAMILIES */}
                <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-slate-200/70">
                    <strong className="block text-slate-900 mb-1">1. Plain White Paper</strong>
                    You do not need stamp paper in Kerala. Print your Will on clean white A4 paper and sign each page.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-slate-200/70">
                    <strong className="block text-slate-900 mb-1">2. Two Adult Witnesses</strong>
                    Sign in front of two trusted adults who are not heirs in the Will. They sign right after you.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-slate-200/70">
                    <strong className="block text-slate-900 mb-1">3. Fast Village Transfer</strong>
                    Book a PEARLS slot for ₹100 so your heirs can update Thandapper records at the Village Office fast.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="kerala-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>CORE WILL LAWS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Kerala
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Making a Will in Kerala follows the <strong>Indian Succession Act, 1925</strong>, the <strong>Filing Act, 1908</strong>, and state land rules like the <strong>Kerala Transfer of Registry Rules, 1966</strong>. Any adult of sound mind can pass self-earned homes, family land, and bank funds to chosen heirs without legal limits.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kerala has unique family laws. After the landmark Supreme Court ruling in <em>Mary Roy v. State of Kerala (1986)</em>, Christian estate in Kerala follows Part V of the Indian Succession Act, giving equal rights to daughters and sons. For Hindu families, the <em>Kerala Joint Hindu Family System (Abolition) Act, 1975</em> ended the old joint birthright system and turned family land into clear personal shares. A well-written Will make sures smooth transfers across flats in Kochi, villas in Trivandrum, and spice farms in Central Travancore.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Sound Mind</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The owner must be an adult aged 18 years or older with a clear and sound mind (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Choice</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Signed freely without pressure, fraud, or force from any person (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in front of at least two neutral adult witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Neutral Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses and their spouses must not get any gift or land under the Will (Section 67).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileQuestion className="w-4 h-4 text-[#C65378]" />
                  <span>FILING RULES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Kerala?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Filing Act, 1908, filing a Will at the SRO is <strong>a choice</strong>. An plain Will signed on plain white paper before two witnesses is valid and accepted by law.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Still, with many Kerala families living abroad and land values rising across towns and coastal belts, senior lawyers strongly advise filing your Will on the PEARLS portal. Book III SRO filing keeps the sealed copy in state hands, stops fake signature claims, and speeds up Pokkuvaravu with Village Officers and city offices.
                </p>
              </div>

              {/* FULL-WIDTH COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Feature</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Filed Will (Kerala PEARLS SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Plain Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">State Record</td>
                      <td className="p-4 bg-rose-50/20">Stored safely in Book III state records</td>
                      <td className="p-4 bg-slate-50/20">Kept at home; risk of loss, fire, or damage</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Safety from Fights</td>
                      <td className="p-4 bg-rose-50/20">Strong legal proof of true signing</td>
                      <td className="p-4 bg-slate-50/20">Open to claims of fraud, force, or poor health</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Village Office Pokkuvaravu (Name Change)</td>
                      <td className="p-4 bg-rose-50/20">Direct transfer of Thandapper account</td>
                      <td className="p-4 bg-slate-50/20">Officers often ask for slow court orders</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">City House Tax Transfer</td>
                      <td className="p-4 bg-rose-50/20">Fast name update in Kochi, Trivandrum &amp; Calicut</td>
                      <td className="p-4 bg-slate-50/20">Long checks and extra indemnity bonds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Gulf NRI Asset Transfer</td>
                      <td className="p-4 bg-rose-50/20">Trusted by Indian banks, funds &amp; embassies</td>
                      <td className="p-4 bg-slate-50/20">Can face family objections and bank delays</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">State Filing Cost</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 fee + small scan charges</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="kerala-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT RULES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Kerala Probate Law: High Court Exemption Rules
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Many Kerala land owners and Gulf NRIs ask if court probate from the Kerala High Court or District Court is required by law before heirs can claim asset. The clear legal answer is <strong>no</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 and Section 57 of the Indian Succession Act, 1925, court probate is required only for Wills signed inside or covering asset in the old presidency cities of Mumbai, Kolkata, and Chennai. Kerala is a non-presidency state. The Kerala High Court has ruled again and again that probate is a choice for Hindu, Christian, Muslim, Buddhist, Sikh, and Jain Wills signed in Kerala.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Settled Law: Not Required
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Kerala High Court Rulings
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Division Bench rulings of the Kerala High Court state clearly that Section 213(1) does not apply to Wills signed outside old presidency cities. Village Offices, city corporations, and banks cannot force heirs to get court probate before updating land records or paying out bank deposits.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Allows fast asset transfer without High Court delays</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    A Choice Filing: Family Fights
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Filed in Kerala District Courts?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An executor may choose to file for probate before the District Court in Ernakulam, Trivandrum, or Kozhikode only if relatives file a land suit or fight the owner&apos;s sound mind. A court probate order settles the title once and for all.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Final court shield against hostile family claims</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: KERALA SRO DIRECTORY */}
            <section id="kerala-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Kerala SRO offices: SRO Area Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kerala operates over 300 SRO offices across 14 revenue districts under the Filing Office, Government of Kerala. Under Section 32 of the Filing Act, 1908, your Will can be filed at the SRO office having area over your permanent residence or where any parcel of your land and flats is situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Ernakulam, Kakkanad, Kowdiar)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredHubs.length} of {KERALA_SRO_HUBS.length} Kerala Registration Hubs
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
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                          isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                        } ${
                          isSelected
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
                        Kerala Filing Office
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      PEARLS Book III Registry Active
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
                      Official PEARLS Portal: <strong>keralasigning.gov.in</strong>
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Lawyer Help for {activeHubData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES IN KERALA (EXACT SAME TYPE AS NASHIK LOCAL AREAS SECTION, RENAMED) */}
            <section id="regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Will Drafting Across Kerala
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kerala possesses diverse regional wealth profiles, from maritime commerce and IT penthouses in Kochi to office estates in Trivandrum, trading enterprises in Calicut, and sprawling spice plantations in Central Travancore. Our legal team provides customized drafting, PEARLS portal slot scheduling, and SRO accompaniment across all primary regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: KOCHI & ERNAKULAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Shop &amp; Maritime Capital
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ernakulam &amp; Thrikkakara
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kochi &amp; Ernakulam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Marine Drive</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panampilly Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kakkanad IT Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Edappally</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mattancherry</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Kochi</strong> for luxury waterfront apartments, GCDA home layouts, tech startup equity, and family trading firms. Formulates clear clauses for cooperative society transfers, shared car park allocations, and Gulf NRI cross-border estate coordination.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Revenue Tower, Marine Drive &amp; Kakkanad Civil Station</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        PEARLS portal e-token generation, lawyer accompaniment at SRO, and Section 31 home visits for seniors in Panampilly Nagar.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kochi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kochi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: THIRUVANANTHAPURAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Capital &amp; Technopark Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Vanchiyoor &amp; Kazhakkoottam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Thiruvananthapuram
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kowdiar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sasthamangalam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kazhakkoottam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pattom</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vazhuthacaud</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Thiruvananthapuram</strong> for senior civil servants, Technopark IT professionals, and traditional home estates. Handles TRIDA plot transfers, family family home bequests, and bank deposit nominations with precision.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Court Road, Vanchiyoor &amp; Kazhakkoottam Bypass</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep signing for retired officials and seniors across Kowdiar and Sasthamangalam, with PEARLS token booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Capital &amp; Technopark Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Thiruvananthapuram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Trivandrum Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: KOZHIKODE & CALICUT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Malabar Shop Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kozhikode Civil Station
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kozhikode &amp; Calicut
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mavoor Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nadakkavu</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chevayur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Calicut Beach</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Feroke</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Kozhikode</strong> for prominent trading business houses, timber and export enterprises, and Gulf Malayali families. Structures bequests compliant with secular and Muslim estate norms, preventing title clouding on prime shop land.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Civil Station, Wayanad Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Seamless PEARLS signing, Calicut City Board name change help, and cross-border Gulf estate harmonization.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Malabar Trading &amp; Gulf Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kozhikode"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Calicut Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: THRISSUR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Cultural &amp; Banking Capital
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Thrissur Ayyanthole
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Thrissur &amp; Guruvayur
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Swaraj Round</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ayyanthole</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ollur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Punkunnam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Guruvayur Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Thrissur</strong> for gold jewellery merchants, private bankers, and NRI asset investors. Features clear asset inventory schedules for physical gold sovereigns, bank locker access, shop showrooms, and family temple-town assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Station Complex, Ayyanthole</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete papers review, Ayyanthole SRO appointment booking, and certified Book III delivery.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Jewellery, Banking &amp; Urban Land</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Thrissur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Thrissur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: KOLLAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Coastal &amp; Cashew Industry Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kollam Chinnakada
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kollam &amp; Ashtamudi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chinnakada</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Asramam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kadappakada</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tangasseri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ashtamudi Lake Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Kollam</strong> for cashew processing entrepreneurs, seafood exporters, and backwater resort assets. Formulates estate plans that secure shop operational continuity and resolve multi-heir coastal land partitions.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Station Complex, Near Chinnakada</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        PEARLS portal slot scheduling, doorstep commissioner visits, and Village Office Pokkuvaravu coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Coastal &amp; Export Enterprises</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kollam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kollam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: KANNUR & THALASSERY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Malabar &amp; NRI Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kannur &amp; Thalassery
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kannur &amp; Thalassery
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kannur City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thalassery</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Payyambalam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thavakkara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Payyanur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Kannur</strong> and Thalassery for Gulf non-resident Malayalis and handloom business proprietors. Resolves Marumakkathayam family asset split legacies and make sures clean title transfer of independent houses and airport-belt shop plots.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Station, Kannur &amp; Sub-Registry, Thalassery</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Overseas NRI online talk, PEARLS appointment booking, and local lawyer accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">North Malabar NRI Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kannur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kannur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: KOTTAYAM & PALA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        Plantation &amp; Central Travancore
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kottayam &amp; Pala
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kottayam &amp; Pala
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kottayam Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanjikuzhy</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pala</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Changanassery</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rubber Estates</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Kottayam and Pala</strong> for Syrian Christian families, rubber plantation owners, and farm estates. Formulates bequests governed by Part V of the Indian Succession Act, preventing fragmentation and safeguarding estate management powers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Civil Station, Collectorate, Kottayam &amp; Pala SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Christian estate compliance, estate inventory mapping, and Thandapper name change support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Rubber Estates &amp; Christian Law</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kottayam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kottayam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: PALAKKAD & OTTAPALAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Building className="w-3.5 h-3.5" />
                        Agro-Plant &amp; Granary Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Palakkad &amp; Chittur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Palakkad &amp; Ottapalam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Palakkad Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ottapalam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanjikode Plant</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chittur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alathur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Palakkad</strong> for farm paddy landholders, family agraharam assets, and Kanjikode plant manufacturing units. Ensures seamless revenue record transitions under the Kerala Land Reforms Act and state revenue rules.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Station, Palakkad &amp; Sub-District Registry, Ottapalam</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Farmland survey scheduling, Kanjikode leasehold transfer, and PEARLS portal signing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Paddy Land &amp; Plant Units</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Palakkad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Palakkad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-kerala-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP GUIDE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to PEARLS Portal Filing
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this clear 5-step process to write, sign, and record your Will before the SRO in Kerala:
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
                      List all your Kerala flats, Thandapper survey numbers, spice farm deeds, and Gulf NRI bank funds.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Lawyer Review
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Write clear clauses that cancel old Wills, set up heir shares, name your executor, and protect minor kids.
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
                      Print on plain white A4 paper and sign each page in front of two neutral adult witnesses who are not heirs.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      PEARLS Slot Booking
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Book your time slot on the PEARLS portal (keralasigning.gov.in) and pay the flat ₹100 state fee online.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      5
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      SRO Thumb Scan
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Kerala SRO with your witnesses for ID checks, live photos, and thumb scans to seal your Book III record.
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
                  <span>HOME VISIT FOR SENIORS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Filing for Senior Citizens
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For senior, unwell, or bedridden owners living across Kochi, Trivandrum, Kozhikode, or family tharavads, a trip to the SRO desk can be hard. Under <strong>Section 31 of the Filing Act, 1908</strong>, the SRO officer has the legal right to visit a private home, care home, or hospital room to record a Will.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Home SRO Visits Work Across Kerala:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Fitness Note</strong>
                      <span className="text-slate-600">An MBBS or MD doctor writes a note stating that the senior citizen has a sound mind but cannot travel.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Home Visit Request</strong>
                      <span className="text-slate-600">Our legal team writes and files the formal Section 31 home visit request with your local Kerala SRO officer.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Small State Visit Fee</strong>
                      <span className="text-slate-600">A small state fee is paid on the Kerala e-Treasury portal to book the officer&apos;s home visit.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Hand-Held Thumb Scanner</strong>
                      <span className="text-slate-600">The SRO officer visits your home with a hand-held thumb scanner and camera to take live ID records.</span>
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
                  <span>PAPER CHECKLIST</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Paper Checklist for Kerala SRO offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Keep your papers ready before you book your SRO slot. You have checked <strong>{checkedCount} of {checklist.length}</strong> needed items:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        item.checked
                          ? "bg-rose-50/50 border-rose-300 text-slate-900"
                          : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          item.checked
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

            {/* SECTION 9: KERALA PROPERTY TYPES */}
            <section id="kerala-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>LAND AND HOMES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Kerala Asset Types: Urban Flats, Farmland &amp; Gulf Assets
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Asset transfer rules in Kerala depend on the type of land and local office records:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    City Flats &amp; Plots
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Kochi &amp; Trivandrum Flats
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    High-rise flats and GCDA/TRIDA plots need clear details of undivided land share (UDS), car parking slots, and city house tax accounts for smooth name change.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Spice &amp; Tea Estates
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Rubber, Tea &amp; Spice Farms
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Farm estates in Kottayam, Idukki, and Wayanad need clear clauses that meet the Kerala Land Reforms Act, keeping farm operations smooth for your heirs.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    Gulf NRI Wealth
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Cross-Border NRI Assets
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For NRIs working in the UAE, Saudi Arabia, Qatar, or Oman, an India Will links NRE/NRO bank deposits, local homes, and overseas funds under clear legal rules.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES & CHARGES */}
            <section id="kerala-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATE FEE TABLE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Kerala Filing Fees &amp; PEARLS Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  While sale deeds charge 8% stamp duty and filing fees in Kerala, Wills pay zero stamp duty. State charges on the PEARLS portal are very small:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Fee Item</th>
                      <th className="p-4 font-bold">State Fee</th>
                      <th className="p-4 font-bold">Where to Pay</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Kerala Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (100% Free under Kerala Stamp Act)</td>
                      <td className="p-4">State of Kerala</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Book III Filing Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 (Flat State Fee)</td>
                      <td className="p-4">PEARLS Portal via e-Treasury</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Page Scan &amp; User Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹250</td>
                      <td className="p-4">SRO Service Desk</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Home Visit Fee</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Official Home Visit Slip</td>
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
                  <span>CLEAR FEE PLANS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in Kerala
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Pick the legal support plan that fits your family homes, spice farms, and savings across Kerala:
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
                      Best for single owners with flats, bank savings, and mutual funds.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Guided online Kerala Will builder</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer-checked legal clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Fast PDF file &amp; signing guide</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Draft Online Now
                  </Link>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Most Popular in Kerala
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Complete Plan
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Lawyer Talk
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Senior lawyer review for spice farms, Gulf NRI wealth, and multi-heir estates.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>All items in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 video call with senior lawyer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Gulf cross-border asset planning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Christian &amp; Hindu succession clauses</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer"
                  >
                    Book Lawyer Call
                  </Link>
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
                      Full help at any Kerala SRO desk or a Section 31 home visit for seniors.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>PEARLS portal e-token booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer joins you at the Kerala SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit setup</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Book III copy delivery</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Get SRO Support
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUESTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in Kerala
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Simple, clear answers to common questions on writing a Will, Christian estate, and SRO filing in Kerala:
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
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
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
                  <span>LAW REFERENCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Citations &amp; Kerala Filing Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our Will formats follow all central Indian laws and Kerala state land rules:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Part V (Christian Law), Sections 59, 61, 63, and Section 213 (No Court Probate Needed).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Filing Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (A Choice Filing) and Section 31 (Home Visit by SRO).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Transfer of Registry Rules 1966
                  </span>
                  <p className="text-xs text-slate-600">
                    Kerala rules for Pokkuvaravu (land transfer) and Thandapper updates.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Kerala PEARLS Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    State SRO booking website: <code>keralasigning.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Kerala Assets &amp; NRI Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Kerala flats, family farms, or Gulf savings to court delays. Draft a valid Will online today or speak with our senior Kerala High Court lawyers.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all cursor-pointer shadow-lg shadow-[#C65378]/25"
                >
                  Start Your Will Online Now
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all border border-white/20"
                >
                  Book Lawyer Talk
                </Link>
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
                Visual Blueprint: Kerala Will Drafting &amp; Asset Estate Framework
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
                src="/images/will-drafting-in-kerala.jpg"
                alt="High Resolution Visual Blueprint: Kerala Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Kerala SRO Filed &amp; PEARLS Portal Compliant</span>
              <Link
                href="/start"
                onClick={(e) => {
                  setShowHighResModal(false);
                  handleStartDraft(e);
                }}
                className="font-bold text-[#C65378] hover:underline"
              >
                Start Drafting Your Will →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
