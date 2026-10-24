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
  ExternalLink,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "delhi-overview", label: "OVERVIEW" },
  { id: "delhi-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "delhi-probate-rules", label: "PROBATE RULES" },
  { id: "delhi-sro-directory", label: "SRO DIRECTORY" },
  { id: "delhi-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-delhi-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "delhi-property-types", label: "PROPERTY TYPES" },
  { id: "delhi-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const DELHI_DISTRICTS = [
  {
    id: "south-delhi",
    name: "South Delhi (Saket & Hauz Khas)",
    sro: "SRO V (Mehrauli / Saket) & SRO VA (Hauz Khas)",
    address: "Tehsil Building, Mehrauli Badarpur Road, Saket, New Delhi - 110030",
    areas: "Saket, Hauz Khas, Vasant Kunj, Mehrauli, Malviya Nagar, Sainik Farm, Safdarjung Enclave, Green Park, Vasant Vihar, Greater Kailash I & II",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "south-west-delhi",
    name: "South West Delhi (Dwarka & Kapashera)",
    sro: "SRO IX (Kapashera) & SRO X (Dwarka Sector 10)",
    address: "DC Office Complex, Kapashera / SRO Complex, Sector 10, Dwarka, New Delhi - 110075",
    areas: "Dwarka (Sectors 1 to 24), Kapashera, Najafgarh, Palam, Mahavir Enclave, Bijwasan, Uttam Nagar South, Janakpuri South",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "south-east-delhi",
    name: "South East Delhi (Defence Colony & Lajpat Nagar)",
    sro: "SRO South East (Lajpat Nagar / Defence Colony)",
    address: "Old MCD Office Building, Opp. Defence Colony Flyover, Lajpat Nagar IV, New Delhi - 110024",
    areas: "Defence Colony, Lajpat Nagar, Kalkaji, CR Park, New Friends Colony, Okhla, Sarita Vihar, Jasola, Maharani Bagh",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "new-delhi",
    name: "New Delhi (INA Vikas Sadan & Chanakyapuri)",
    sro: "SRO VII (INA Vikas Sadan)",
    address: "DDA Office Complex, Vikas Sadan, INA Colony, New Delhi - 110023",
    areas: "Connaught Place, Barakhamba Road, Chanakyapuri, Sarojini Nagar, Lodhi Colony, Jor Bagh, Khan Market, Golf Links",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "west-delhi",
    name: "West Delhi (Janakpuri & Punjabi Bagh)",
    sro: "SRO II (Basai Darapur) & SRO IIA (Janakpuri)",
    address: "B-Block Community Centre, Janakpuri / Sub-Registrar Complex, Basai Darapur, New Delhi - 110058",
    areas: "Janakpuri, Punjabi Bagh, Rajouri Garden, Tilak Nagar, Vikaspuri, Paschim Vihar, Tagore Garden, Kirti Nagar, Patel Nagar",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "north-west-delhi",
    name: "North West Delhi (Rohini & Pitampura)",
    sro: "SRO VI (Pitampura) & SRO VIA (Rohini Sector 10)",
    address: "Sub-Divisional Magistrate Complex, MP Enclave, Pitampura / Sector 10 Rohini, Delhi - 110085",
    areas: "Rohini (Sectors 1 to 35), Pitampura, Shalimar Bagh, Rani Bagh, Saraswati Vihar, Mangolpuri, Sultanpuri, Prashant Vihar",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "central-delhi",
    name: "Central Delhi (Asaf Ali Road & Karol Bagh)",
    sro: "SRO III (Asaf Ali Road)",
    address: "DDA Commercial Complex, Asaf Ali Road, New Delhi - 110002",
    areas: "Daryaganj, Paharganj, Karol Bagh, Anand Parbat, Jhandewalan, Rajendra Nagar, Kamla Market, Chawri Bazar",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "north-delhi",
    name: "North Delhi (Kashmere Gate & Civil Lines)",
    sro: "SRO I (Kashmere Gate) & SRO IA (Civil Lines)",
    address: "Old Court Building, Kashmere Gate / Subzi Mandi, Delhi - 110006",
    areas: "Civil Lines, Kashmere Gate, Model Town, GTB Nagar, Kamla Nagar, Chandni Chowk, Sadar Bazar, Shakti Nagar",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "east-delhi",
    name: "East Delhi (Preet Vihar & Mayur Vihar)",
    sro: "SRO VIII (Geeta Colony) & SRO VIIIA (Preet Vihar)",
    address: "DC Office Complex, LM Bandh Marg, Geeta Colony / Vikas Marg, Delhi - 110031",
    areas: "Preet Vihar, Nirman Vihar, Laxmi Nagar, Mayur Vihar (Phases 1, 2, 3), Patparganj, Shakarpur, Anand Vihar",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "shahdara-north-east",
    name: "Shahdara & North East Delhi (Vivek Vihar & Seelampur)",
    sro: "SRO Shahdara (Vivek Vihar) & SRO IV (Nand Nagri)",
    address: "B-Block, DDA Community Centre, Vivek Vihar / Weaver Complex, Nand Nagri, Delhi - 110095",
    areas: "Vivek Vihar, Shahdara, Karkardooma, Dilshad Garden, Yamuna Vihar, Seelampur, Nand Nagri, Bhajanpura",
    timings: "9:30 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Under the Indian Stamp Act, 1899, stamp paper is zero rupees.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Testator",
    detail: "Required for biometric thumbprint scanning and live webcam photo capture on the Delhi DORIS portal.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original photo IDs and must not be beneficiaries receiving assets under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Capacity Certificate (For Seniors)",
    detail: "Issued by a registered MBBS practitioner certifying sound testamentary capacity to eliminate dementia challenges.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Delhi DORIS Portal e-Appointment Slip & Challan",
    detail: "Official appointment confirmation downloaded from doris.delhiservices.gov.in with selected SRO time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Property Chain Documents (DDA / MCD / Sale Deed)",
    detail: "Copies of registered conveyance deeds, DDA allotment letters, latest MCD property tax receipts, or sale deeds.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Recent Color Passport Photos Each",
    detail: "Clear passport photographs for the testator and both attesting witnesses to paste into SRO Book III registers.",
    checked: false,
  },
];

export default function DelhiNCTLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("delhi-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("south-delhi");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [searchFilter, setSearchFilter] = useState<string>("" );
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

  const filteredDistricts = DELHI_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    DELHI_DISTRICTS.find((d) => d.id === selectedDistrict) || DELHI_DISTRICTS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (PUNE THEME & PALETTE)
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
                <span>DELHI NCT ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 56 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Delhi NCT: Online Registration
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally valid Will for your DDA apartments, independent builder floors, ancestral land, mutual funds, and demat holdings.
                Get advocate drafting, DORIS portal e-appointment assistance, and doorstep execution for senior citizens across Delhi NCT.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Delhi NCT Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#delhi-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Delhi SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Delhi HC Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Delhi Stamp Duty</span>
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
                  src="/images/will-drafting-in-delhi-nct.jpg"
                  alt="Online Will Drafting and Registration Services in Delhi NCT"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
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
                22+ SRO Offices
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                11 Revenue Districts
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Exempt Under Stamp Act
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Non-Presidency
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Probate Optional in Delhi
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
          {/* =====================================================================
              DESKTOP VIEW: STICKY MINIMALIST TABLE OF CONTENTS
              ===================================================================== */}
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

          {/* =====================================================================
              MAIN EDITORIAL CONTENT AREA
              ===================================================================== */}
          <main className="min-w-0 flex-1 space-y-16">
            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="delhi-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>DELHI NCT SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Drafting &amp; Registration in Delhi NCT
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional SRO Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Registering a Will is optional under Section 18(e) of the Registration Act, 1908. A typed Will on plain paper is legally valid if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Delhi is a non-presidency town. Under Section 213 of the Indian Succession Act, probate is optional for Delhi properties, saving years of court delays and hefty fees.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>₹0 Delhi Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills carry zero stamp duty under the Indian Stamp Act, 1899. At Delhi Sub-Registrar offices, testators pay only a flat ₹100 registration fee plus nominal scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct DDA &amp; MCD Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will expedites property tax name transfer across MCD zones, DDA freehold conveyance deeds, and L&amp;DO leasehold mutations without legal hassles.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="delhi-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Succession Laws in Delhi NCT
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Drafting a Will in Delhi is governed by the <strong>Indian Succession Act, 1925</strong> and the <strong>Registration Act, 1908</strong>.
                  Any adult of sound mind who has attained 18 years of age can make a Will to bequeath self-acquired properties, bank deposits, mutual funds, demat equities, and personal effects.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Delhi presents a unique property fabric.
                  Families hold DDA freehold flats in Dwarka or Rohini, ancestral Havelis in Old Delhi, multi-story independent builder floors in Greater Kailash, and corporate equity portfolios in New Delhi.
                  A professionally drafted Will ensures your estate is transferred seamlessly without bitter family litigation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be at least 18 years old and possess sound testamentary capacity (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will must be made voluntarily without coercion, undue influence, or fraud (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You must sign in the direct visual presence of two adult witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Independent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses must not be beneficiaries receiving any asset under the Will (Section 67).
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Will Registration in Delhi NCT: DORIS Rules &amp; Value
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is <strong>optional</strong>.
                  A Will written on plain A4 paper is legally valid before Delhi courts if signed in the presence of two independent witnesses.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, registering your Will at a Delhi Sub-Registrar Office via the DORIS portal provides decisive advantages.
                  The document is preserved in government Book III registers, which stops false claims of forgery or tampering:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Factor</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Delhi SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Archival</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III archives of Delhi Revenue Department</td>
                      <td className="p-4 bg-slate-50/20">Held in private custody; vulnerable to physical loss, damage, or suppression</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Protection Against Forgery Claims</td>
                      <td className="p-4 bg-rose-50/20">Extremely high. Biometric thumbprints and digital photos recorded in DORIS</td>
                      <td className="p-4 bg-slate-50/20">Lower. Disgruntled legal heirs often claim forged signatures or coercion</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">DDA &amp; MCD Mutation</td>
                      <td className="p-4 bg-rose-50/20">Accepted directly for property tax name change and conveyance deed transfer</td>
                      <td className="p-4 bg-slate-50/20">Authorities frequently demand succession certificates or survivor affidavits</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Society Flat Transfer (CGHS)</td>
                      <td className="p-4 bg-rose-50/20">Simplifies share certificate transfer in Dwarka and Rohini housing societies</td>
                      <td className="p-4 bg-slate-50/20">Society managing committees may require family consensus and indemnity bonds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Statutory Government Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 registration fee plus nominal scanning</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 government fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES FOR DELHI NCT */}
            <section id="delhi-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JURISDICTION RULES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Is Probate Mandatory for Properties in Delhi NCT?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Probate is a court decree certifying the genuineness of a Will and appointing the executor to manage the deceased testator&apos;s assets.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 213(2) read with Section 57(a) and (b) of the Indian Succession Act, 1925</strong>, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai.
                  <strong> Delhi is a non-presidency territory.</strong> The Delhi High Court has held in multiple judgments that probate is non-compulsory for Hindu, Sikh, Jain, and Buddhist Wills in Delhi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Delhi Legal Exemption
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Probate Strictly Optional in Delhi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Landmark Delhi High Court rulings confirm that an executor or legatee can establish ownership rights over Delhi properties, bank deposits, and shares without applying for court probate decrees.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Saves high court fees and years of civil court litigation</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    When Court Intervention Arises
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate or Succession Advice Needed?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    While probate is optional in Delhi, an executor may voluntarily apply for probate if a contentious legal heir challenges the Will in the District Court (Tis Hazari, Saket, or Dwarka), or if institutional bodies raise objections.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>A registered Will drastically minimizes dispute vulnerabilities</span>
                  </div>
                </div>
              </div>

              {/* HELPFUL TOOL CALLOUT */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Do you also hold flats or ancestral property in Mumbai or Kolkata?
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    If your Delhi Will includes real estate located within Mumbai or Kolkata, presidency town probate mandates may apply to those specific properties.
                  </p>
                </div>
                <Link
                  href="/tools/succession-calculator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                >
                  <span>Check Succession Rights</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="delhi-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Delhi NCT Sub-Registrar Offices &amp; SRO Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration across Delhi NCT is administered by the Revenue Department, Government of NCT of Delhi.
                  Under Section 32 of the Registration Act, you can present your Will at the Sub-Registrar office having jurisdiction over your residence.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Dwarka, Saket, Rohini)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {DELHI_DISTRICTS.length} Key Delhi Jurisdictions
                  </span>
                </div>

                {/* DISTRICT PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {DELHI_DISTRICTS.map((district) => {
                    const isSelected = selectedDistrict === district.id;
                    return (
                      <button
                        key={district.id}
                        type="button"
                        onClick={() => setSelectedDistrict(district.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {district.name}
                      </button>
                    );
                  })}
                </div>

                {/* SELECTED JURISDICTION DISPLAY */}
                <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                        JURISDICTION &amp; SUB-REGISTRAR OFFICE
                      </span>
                      <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">
                        {activeDistrictData.sro}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold w-fit">
                      <Check className="w-3 h-3" /> Book III Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Complex Address:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.address}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours &amp; Public Window:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.timings}</p>
                    </div>

                    <div className="md:col-span-2 space-y-1 pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-900 block">Neighborhoods &amp; Pin Codes Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.areas}</p>
                    </div>
                  </div>
                </div>

                {/* DORIS PORTAL BOOKING NOTE */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      Registration slots must be pre-booked online via the Delhi DORIS portal before visiting the SRO counter.
                    </span>
                  </div>
                  <a
                    href="https://doris.delhiservices.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-900 underline hover:text-amber-950 shrink-0 ml-2"
                  >
                    DORIS Portal &rarr;
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5: LOCAL AREA COVERAGE */}
            <section id="delhi-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Delhi NCT Localities
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in South Delhi, Dwarka, Rohini, or Preet Vihar</strong>? Our senior succession advocates offer end-to-end legal drafting, DORIS portal slot booking, and Sub-Registrar accompaniment tailored to the specific property dynamics of Delhi NCT:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: SOUTH DELHI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Prime Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO V (Saket / Mehrauli)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vasant Kunj, Hauz Khas &amp; Saket
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vasant Kunj Enclave</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hauz Khas Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saket J-Block</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Green Park Extension</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Malviya Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in South Delhi</strong> for independent builder floors, DDA SFS flats, company equities, and mutual fund portfolios, preventing inheritance disputes among siblings.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Building, Mehrauli Badarpur Road, Saket</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        DORIS e-appointment scheduling, senior advocate representation, and Section 31 home visits for elderly testators across Saket, Hauz Khas, and Vasant Kunj.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in South Delhi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft South Delhi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: DWARKA & SOUTH WEST DELHI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Modern Sub-City
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO X (Dwarka Sector 10)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Dwarka Sub-City, Palam &amp; Uttam Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dwarka Sectors 1-23</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">CGHS Societies</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Palam Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mahavir Enclave</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kapashera Border</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Dwarka</strong> for cooperative group housing societies (CGHS), DDA HIG/MIG flats, commercial shops, and demat investments with clear society membership succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sub-Registrar Complex, Sector 10, Dwarka</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast-track DORIS token booking, doctor certificate coordination, and physical advocate assistance at the Dwarka SRO registry office.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Dwarka"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Dwarka Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: SOUTH EAST DELHI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South East Luxury Enclaves
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO South East (Lajpat Nagar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Defence Colony, GK &amp; Lajpat Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Defence Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Greater Kailash I &amp; II</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">CR Park</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">New Friends Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kalkaji</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Elite <strong>Will drafting services in Defence Colony</strong> and Greater Kailash for luxury builder floors, multi-crore bungalows, overseas bank accounts, and family business succession trusts.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Old MCD Office, Lajpat Nagar IV</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep commissioner execution under Section 31 for senior citizens residing in Defence Colony, Maharani Bagh, and GK.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Defence Colony"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Defence Colony Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: WEST DELHI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Residential Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO II (Janakpuri &amp; Punjabi Bagh)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Janakpuri, Punjabi Bagh &amp; Rajouri
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Janakpuri B &amp; C Blocks</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Punjabi Bagh Club Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajouri Garden</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Paschim Vihar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tilak Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Trusted <strong>Will drafting services in Janakpuri</strong> and Punjabi Bagh for independent kothis, builder floors with stilt parking, commercial shop succession, and family gold jewellery bequests.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Community Centre Janakpuri / Basai Darapur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete MCD property mutation guidance, terrace rights division clauses, and physical Sub-Registrar accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Janakpuri"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Janakpuri Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: ROHINI & NORTH WEST DELHI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North West Planned Sub-City
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO VI (Pitampura &amp; Rohini)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Rohini, Pitampura &amp; Shalimar Bagh
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rohini Sectors 1-35</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pitampura Kohat Enclave</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shalimar Bagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Prashant Vihar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Model Town</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Rohini</strong> and Pitampura for DDA plots, builder floor apartments, industrial units in Mangolpuri, and ancestral family assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SDM Complex, MP Enclave Pitampura / Rohini Sec 10</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Rapid DORIS portal slot confirmation, senior advocate review, and direct mutation guidance at the North West Delhi DM complex.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Rohini"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Rohini Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: EAST DELHI & TRANS-YAMUNA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        East Residential Townships
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO VIII (Geeta Colony / Preet Vihar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Preet Vihar, Mayur Vihar &amp; Laxmi Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Preet Vihar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mayur Vihar Phases 1-3</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Laxmi Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Patparganj CGHS</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nirman Vihar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in East Delhi</strong> for CGHS group housing societies in Patparganj, DDA flats in Mayur Vihar, and commercial properties on Vikas Marg.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, LM Bandh Marg, Geeta Colony</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online DORIS e-challan processing, society membership verification, and seamless Geeta Colony SRO Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in East Delhi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft East Delhi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: CENTRAL & NEW DELHI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Lutyens Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO III (Asaf Ali) &amp; VII (INA)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Connaught Place, Karol Bagh &amp; INA
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Connaught Place</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karol Bagh Ajmal Khan</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Daryaganj</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chanakyapuri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajendra Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Heritage <strong>Will drafting services in Central Delhi</strong> for high-value ancestral properties, commercial shops in Karol Bagh, L&amp;DO leasehold bungalows, and family business holdings.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DDA Vikas Sadan INA / Asaf Ali Road Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        L&amp;DO leasehold to freehold conversion consultation, doctor certificate coordination, and priority SRO registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Central Delhi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Central Delhi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: SHAHDARA & TRANS-YAMUNA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North East &amp; Shahdara
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Shahdara (Vivek Vihar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vivek Vihar, Shahdara &amp; Karkardooma
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vivek Vihar Blocks A-D</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karkardooma Court Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anand Vihar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dilshad Garden</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Surya Nagar Border</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Vivek Vihar</strong> and Shahdara for family bungalows, multi-floor residential properties, trading business equities, and bank safe deposit lockers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DDA Community Centre, B-Block, Vivek Vihar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Section 31 home visits for elderly citizens in Vivek Vihar and Karkardooma, with complete advocate support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Shahdara"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Shahdara Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-delhi-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP SOP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Will Drafting to DORIS Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified standard operating procedure to prepare, execute, and optionally register your Will in Delhi NCT:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Inventory Assets &amp; Identify Beneficiaries
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a complete list of your movable and immovable assets in Delhi and across India. Include DDA flat allotment details, builder floor numbers, MCD property tax IDs, bank accounts, and demat folios. Designate an executor to administer the estate.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Draft Legal Will with Succession Advocate
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Work with our specialized estate lawyers to frame custom legal clauses. Include explicit revocation of past Wills, specific bequests, survivorship provisions, and a residual clause to capture any future assets.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Execute &amp; Attest Before Two Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on plain A4 paper. Sign or place your thumb impression at the bottom of each page in the presence of two independent adult witnesses. Both witnesses then sign and provide their full names, addresses, and Aadhaar numbers.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Book Delhi DORIS Portal Appointment Online
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log in to the Delhi DORIS portal (doris.delhiservices.gov.in) and navigate to the e-appointment section. Select your designated Sub-Registrar office, upload party details, pay the nominal ₹100 registration fee via e-challan, and download the appointment receipt.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    5
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Complete Biometric Verification at Delhi SRO
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar office during your allotted slot with both witnesses, original Aadhaar cards, and passport photos. The Sub-Registrar captures biometric thumbprints and digital photographs, enters the Will into Book III registers, and returns the registered document.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: DOORSTEP REGISTRATION */}
            <section id="doorstep-home-registration" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP CONVENIENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration in Delhi NCT
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visiting bustling government registry offices can be exhausting for senior citizens, hospitalized individuals, or those with mobility challenges.
                  <strong> Section 31 of the Registration Act, 1908</strong> allows the Sub-Registrar to visit the testator&apos;s home or hospital in special cases.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <h3 className="text-lg font-bold text-slate-900">
                  How Home Registration Works Across Delhi NCT:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Doctor Fitness Certificate</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered MBBS practitioner examines the testator and issues a medical certificate stating they are mentally sound but physically unable to travel to the SRO.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">SRO Commission Application</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our legal team files a formal Section 31 petition before the concerned Delhi Sub-Registrar along with the doctor&apos;s certificate and pays the official commission visit fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Officer Home Visit</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar attends your residence or hospital (AIIMS, Max, Fortis, Apollo, Ganga Ram) with a portable biometric kit, verifies witnesses, records fingerprints, and registers the Will.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center gap-3 text-xs text-rose-950">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>
                    Our Delhi legal associates assist with complete doctor coordination, petition drafting, and Sub-Registrar schedule management.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PREPARATION CHECKLIST</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Mandatory Document Checklist for Delhi NCT Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Keep these verified records ready before executing and registering your Will in Delhi NCT:
                </p>
              </div>

              {/* INTERACTIVE CHECKLIST */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700">
                    Checklist Readiness: {checkedCount} of {checklist.length} Completed
                  </span>
                  <div className="w-36 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#C65378] transition-all duration-300"
                      style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200 text-slate-900"
                          : "bg-slate-50/50 border-slate-200/70 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 text-[#C65378] rounded-sm focus:ring-[#C65378] cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs sm:text-sm block">{item.label}</span>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="delhi-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Estate Asset Distribution: DDA Flats &amp; MCD Mutation
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A legally compliant Will should address the distinctive asset classes prevalent across the National Capital Territory of Delhi:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ASSET 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    DDA Freehold &amp; Leasehold Flats
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Delhi Development Authority (DDA) flats in Dwarka, Rohini, or Vasant Kunj require clear testamentary succession. If the flat is leasehold, the Will specifies conversion to freehold. A registered Will expedites mutation and conveyance deed execution at Vikas Sadan without probate.
                  </p>
                </div>

                {/* ASSET 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Independent Builder Floors &amp; Terrace Rights
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Multi-story builder floors in South and West Delhi demand explicit demarcation of individual floor ownership, stilt parking bays, terrace access rights, and undivided impartible ownership in the underlying plot, preventing costly disputes among floor owners.
                  </p>
                </div>

                {/* ASSET 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    MCD Property Tax Mutation (Aam Adalat / Portal)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Property tax records (*UPIC*) must reflect the heir&apos;s name after the testator&apos;s demise. Municipal Corporation of Delhi (MCD) accepts a registered Will along with an indemnity bond and death certificate for direct mutation without mandating court succession certificates.
                  </p>
                </div>

                {/* ASSET 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Cooperative Group Housing Societies (CGHS)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Delhi Cooperative Societies rules and Supreme Court rulings, society nominees hold the flat merely as fiduciary trustees. A registered Will directs the managing committee to transfer the official share certificate to the true legal beneficiary.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & STAMP DUTY */}
            <section id="delhi-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Registration Charges &amp; Zero Stamp Duty in Delhi NCT
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property conveyance sale deeds that attract 4% to 6% stamp duty in Delhi, Will registration is heavily subsidized by the Delhi Government:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-[#C65378]">₹0</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Delhi Stamp Duty</h4>
                  <p className="text-[11px] text-slate-500">100% exempt under the Indian Stamp Act, 1899</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">₹100</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">SRO Registration Fee</h4>
                  <p className="text-[11px] text-slate-500">Fixed statutory government fee across all 11 Delhi districts</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">₹100 - ₹200</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Scanning &amp; Pasting Fee</h4>
                  <p className="text-[11px] text-slate-500">Nominal per-page scanning charges for Book III records</p>
                </div>
              </div>
            </section>

            {/* SECTION 11: PRICING & PACKAGES */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>PLANS &amp; PRICING</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Pricing: Delhi NCT Will Making Packages
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the level of professional support best suited to your family&apos;s estate planning requirements across Delhi NCT:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Standard</span>
                    <h3 className="font-extrabold text-xl text-slate-900">Online Will Drafting</h3>
                    <div className="text-3xl font-black text-slate-900">₹1,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for individuals with straightforward assets like a single DDA flat, bank deposits, and mutual funds.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer-vetted legal format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Specific asset bequest clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant digital PDF download</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Execution &amp; attestation guide</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Start Drafting
                  </a>
                </div>

                {/* PLAN 2 - FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    MOST POPULAR
                  </span>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">Professional</span>
                    <h3 className="font-extrabold text-xl text-slate-900">Advocate Consultation &amp; Review</h3>
                    <div className="text-3xl font-black text-slate-900">₹4,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recommended for Delhi families owning builder floors, multiple DDA flats, or ancestral assets.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Advocate Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Custom clauses for DDA/MCD properties</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor certificate format included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Unlimited revisions until approval</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors text-center cursor-pointer"
                  >
                    Book Advocate Call
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Comprehensive</span>
                    <h3 className="font-extrabold text-xl text-slate-900">Complete SRO Registration</h3>
                    <div className="text-3xl font-black text-slate-900">₹9,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Full turnkey service including DORIS portal slot booking and physical advocate accompaniment.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete lawyer drafting &amp; review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>DORIS portal slot booking management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Physical advocate assistance at SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doorstep visit management for seniors</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Request Registration
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUERIES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Will Drafting in Delhi NCT
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key succession, DORIS registration, and property transfer questions for Delhi residents:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-bold text-sm sm:text-base text-slate-900">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          <p className="pt-3">{faq.a}</p>
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
                  <span>LEGAL REFERENCES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Statutory Citations &amp; Delhi High Court Precedents
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Every Will drafted through WillDrafting.in is constructed in strict adherence to authoritative Indian statutes and judicial rulings:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">
                    Indian Succession Act, 1925 (Sections 59, 61, 63, 67, 213):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Governs sound testamentary mind, voluntary consent, two-witness execution, and specifies that court probate is non-mandatory outside historical presidency limits.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Registration Act, 1908 (Sections 18(e), 31, 32, 51):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Establishes that Will registration is optional, authorizes Section 31 home visits for infirm or elderly testators, and mandates permanent custody in Book III archives.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Indian Stamp Act, 1899 (Exemption on Wills):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Grants complete exemption from ad-valorem stamp duty for Wills executed and presented for registration anywhere in the National Capital Territory of Delhi.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Delhi High Court Jurisprudence on Non-Presidency Probate:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Multiple landmark decisions (including <em>Rajinder Nath Sharma v. Rani Chander Kanta</em> and <em>Santosh Kakkar v. Ram Prakash Kakkar</em>) confirm that under Section 213 ISA, probate is optional in Delhi for establishing testamentary rights.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    DDA &amp; MCD Mutation Directives:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Administrative guidelines issued by DDA and MCD officially provide for property mutation upon production of a registered Will, death certificate, and standard indemnity bond without court probate.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION BLUEPRINT MODAL
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
                Visual Blueprint: Delhi NCT Will Drafting &amp; SRO Registration Architecture
              </span>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 mt-3">
              <Image
                src="/images/will-drafting-in-delhi-nct.jpg"
                alt="High Resolution Visual Blueprint: Delhi NCT Will Drafting and SRO Registration"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 95vw, 1000px"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FLOATING CTA BAR FOR MOBILE
          ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[11px] font-bold text-slate-500 truncate uppercase">
            Delhi NCT Will Services
          </span>
          <span className="block text-xs font-extrabold text-slate-900 truncate">
            Lawyer Drafted &amp; ₹0 Stamp Duty
          </span>
        </div>
        <a
          href="/start"
          onClick={handleStartDraft}
          className="px-5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-extrabold shadow-md shrink-0 cursor-pointer"
        >
          Draft Will Online
        </a>
      </div>
    </div>
  );
}
