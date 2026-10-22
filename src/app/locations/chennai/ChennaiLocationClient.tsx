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
  { id: "chennai-overview", label: "OVERVIEW" },
  { id: "chennai-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "madras-probate-rules", label: "PROBATE JURISDICTION" },
  { id: "chennai-sro-directory", label: "SRO DIRECTORY" },
  { id: "chennai-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-chennai-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "chennai-property-types", label: "PROPERTY TYPES" },
  { id: "chennai-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const CHENNAI_DISTRICTS = [
  {
    id: "mylapore",
    name: "Mylapore & Mandaveli",
    sro: "SRO Mylapore (Registration District Chennai Central)",
    address: "Taluk Office Complex, Kutchery Road, Mylapore, Chennai - 600004",
    areas: "Mylapore, Mandaveli, Santhome, Royapettah, Alwarpet, R.A. Puram, Gopalapuram",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "central",
    name: "Central Chennai (Periamet)",
    sro: "SRO Central Chennai (Periamet) & SRO Triplicane",
    address: "182, Bharathi Salai, Royapettah / EVR Periyar Salai, Periamet, Chennai - 600003",
    areas: "George Town, Periamet, Triplicane, Sowcarpet, Chintadripet, Park Town, Egmore",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "saidapet",
    name: "South Chennai (Saidapet)",
    sro: "Joint Sub-Registrar I & II South Chennai (Saidapet)",
    address: "Integrated Registration Complex, 571, Anna Salai, Saidapet, Chennai - 600015",
    areas: "Saidapet, Guindy, Nandanam, West Mambalam, Ashok Nagar, Jafferkhanpet, Kotturpuram",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "adyar",
    name: "Adyar & Besant Nagar",
    sro: "SRO Adyar (Chennai South)",
    address: "4th Cross Street, Gandhi Nagar, Adyar, Chennai - 600020",
    areas: "Adyar, Besant Nagar, Gandhi Nagar, Kasturba Nagar, Thiruvanmiyur, Kottur, Shastri Nagar",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "t-nagar",
    name: "T. Nagar & Central Suburbs",
    sro: "SRO T. Nagar & SRO Kodambakkam",
    address: "9, Ranganathan Street / Usman Road Complex, T. Nagar, Chennai - 600017",
    areas: "T. Nagar, Pondy Bazaar, Kodambakkam, Vadapalani, Choolaimedu, Panagal Park",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "anna-nagar",
    name: "Anna Nagar & West Chennai",
    sro: "SRO Anna Nagar & SRO Villivakkam",
    address: "W-Block, 3rd Main Road, Anna Nagar West, Chennai - 600040",
    areas: "Anna Nagar (East & West), Shenoy Nagar, Kilpauk, Villivakkam, Aminjikarai, Mogappair",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "north",
    name: "North Chennai (Royapuram)",
    sro: "SRO Royapuram & SRO North Chennai",
    address: "Singaravelar Maaligai, Rajaji Salai, Royapuram, Chennai - 600013",
    areas: "Royapuram, Tondiarpet, Washermanpet, Perambur, Vyasarpadi, Kasimedu, Madhavaram",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "velachery",
    name: "Velachery & South Suburbs",
    sro: "SRO Velachery",
    address: "Taramani Link Road / Baby Nagar, Velachery, Chennai - 600042",
    areas: "Velachery, Taramani, IIT Madras Campus, Madipakkam, Ram Nagar, Perungudi",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "omr",
    name: "OMR & Sholinganallur",
    sro: "SRO Neelankarai & SRO Sholinganallur",
    address: "Rajiv Gandhi Salai (OMR), Sholinganallur / East Coast Road (ECR), Chennai - 600119",
    areas: "Sholinganallur, Thoraipakkam, Karapakkam, Navalur, Siruseri, Neelankarai, Palavakkam",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "ambattur",
    name: "Ambattur & Industrial Corridor",
    sro: "SRO Ambattur",
    address: "OT Bus Stand Road, Ambattur Industrial Estate, Chennai - 600053",
    areas: "Ambattur, Mogappair East/West, Padi, Korattur, Nolambur, Ayapakkam",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "tambaram",
    name: "Tambaram & Chromepet",
    sro: "SRO Tambaram & SRO Chromepet",
    address: "GST Road, West Tambaram, Chennai - 600045",
    areas: "Tambaram, Chromepet, Pallavaram, Sanatorium, Chitlapakkam, Selaiyur, Medavakkam",
    timings: "9:30 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed on standard white A4 sheets. No expensive stamp paper is required under Tamil Nadu law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Required for biometric identity verification and digital photograph capture at the Chennai SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Witnesses must carry original photo IDs and must not be beneficiaries receiving property in the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (For Seniors)",
    detail: "Signed by an MBBS doctor. Confirms sound mental capacity and protects against future probate challenges.",
    checked: false,
  },
  {
    id: "item-5",
    label: "TNREGINET Online Appointment Token Slip",
    detail: "Official appointment receipt downloaded from tnreginet.gov.in with designated time slot and fee challan.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Chennai Property Documents (Patta / GCC Tax / Deeds)",
    detail: "Copies of registered parent deeds, Patta/Chitta, and latest Greater Chennai Corporation property tax receipts.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs Each",
    detail: "Recent color passport photos for the testator and both witnesses for pasting in official Book III registers.",
    checked: false,
  },
];

export default function ChennaiLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("chennai-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("mylapore");
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

  const filteredDistricts = CHENNAI_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    CHENNAI_DISTRICTS.find((d) => d.id === selectedDistrict) || CHENNAI_DISTRICTS[0];

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
                <span>CHENNAI ESTATE &amp; SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 52 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Legal Will Drafting &amp; Succession Planning in Chennai
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally valid Will for your Chennai flats, CMDA plots, and bank investments.
                Get expert Madras High Court probate guidance, TNREGINET online registration help, and doorstep execution for senior citizens.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Chennai Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#chennai-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Chennai SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Madras HC Probate Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Tamil Nadu Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
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
                  src="/images/will-drafting-in-chennai.jpg"
                  alt="Legal Will Drafting and Succession Planning in Chennai"
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
                11+ SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Chennai SRO Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Stamp Exempt
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 213 ISA
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Madras HC Probate Guidance
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Home Visits for Seniors
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
              DESKTOP VIEW: STICKY TABLE OF CONTENTS
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
            <section id="chennai-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>CHENNAI SUCCESSION BRIEF</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Executive Summary: Will Making &amp; Probate in Chennai
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Madras HC Probate Rule</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Chennai is a presidency town. Under Section 213 of the Indian Succession Act, probate is compulsory for Wills executed within Chennai or covering Chennai immovable properties.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>TNREGINET Digital Appointments</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Book online appointment tokens on <code>tnreginet.gov.in</code>. Pay nominal fees of ₹100 online and complete biometrics at your local Chennai Sub-Registrar Office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Greater Chennai Corporation Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will accelerates property tax name change with Greater Chennai Corporation (GCC) and Patta transfer through Tamil Nadu e-Sevai centers.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Section 31 Doorstep Service</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Senior citizens in Mylapore, Adyar, and Anna Nagar can request a Sub-Registrar home visit with an MBBS doctor fitness certificate under Section 31.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="chennai-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FOUNDATION</span>
                </div>
                {/* H2: Exactly 50 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework: Chennai Succession &amp; ISA Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession planning in Chennai operates under central and state statutes.
                  Every testamentary document must satisfy the Indian Succession Act, 1925 and Tamil Nadu Registration Rules.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Sound Mind &amp; Capacity
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 59 of the Indian Succession Act, any person of sound mind who is not a minor may dispose of property by Will. For senior citizens, obtaining a medical fitness certificate from an MBBS practitioner validates testamentary capacity against future challenges.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Two Independent Witnesses
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 63(c) requires the testator to sign in the presence of at least two adult witnesses. Under Section 67, beneficiaries and their spouses cannot be attesting witnesses. Choosing independent friends, doctors, or neighbours ensures complete legal validity.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Executor Appointment
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Appointing an executor is essential in Chennai because probate is compulsory under Section 213. The executor petitions the Madras High Court or City Civil Court to secure probate and oversee the legal distribution of your assets.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION RULES */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION COMPARISON</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Registration Rules: Optional vs SRO Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Tamil Nadu.
                  However, registration before the Sub-Registrar offers decisive evidentiary advantages in Chennai courts and municipal bodies.
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Key Legal Parameter</th>
                      <th className="p-4 font-bold">Unregistered Will</th>
                      <th className="p-4 font-bold text-[#C65378]">Registered Will (TNREGINET Book III)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Legal Validity</td>
                      <td className="p-4">Legally valid if signed before 2 witnesses</td>
                      <td className="p-4 text-emerald-700 font-bold">Valid with high evidentiary presumption</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Tampering &amp; Loss Risk</td>
                      <td className="p-4 text-rose-600">High: No official government archive copy</td>
                      <td className="p-4 text-emerald-700 font-bold">Zero: Safely archived in SRO Book III records</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Patta &amp; GCC Mutation</td>
                      <td className="p-4">Requires detailed inquiry and survivor consents</td>
                      <td className="p-4 text-emerald-700 font-bold">Fast-track name mutation with GCC and e-Sevai</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Madras HC Probate</td>
                      <td className="p-4">Requires intensive proof of testator signature</td>
                      <td className="p-4 text-emerald-700 font-bold">Biometrics and officer verification simplify probate</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Bank &amp; Demat Transmission</td>
                      <td className="p-4">Banks often demand indemnity bonds or court orders</td>
                      <td className="p-4 text-emerald-700 font-bold">Accepted smoothly by Chennai bank branches</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: MADRAS HIGH COURT PROBATE RULES */}
            <section id="madras-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>SECTION 213 COMPLIANCE</span>
                </div>
                {/* H2: Exactly 52 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Madras High Court: Mandatory Probate Jurisdiction
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Chennai holds a distinct legal status in Indian succession law.
                  Along with Mumbai and Kolkata, Chennai was one of the historical presidency towns established by Royal Charter.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-2 md:w-1/2">
                    <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Section 213 Indian Succession Act Applies</span>
                    </div>
                    <p>
                      Section 213(1) establishes that no right as executor or legatee can be established in any court unless probate or letters of administration have been granted.
                    </p>
                    <p>
                      By virtue of Section 57(a) and 57(b), this rule compulsorily applies to Hindu, Buddhist, Sikh, and Jain Wills made within the Ordinary Original Civil Jurisdiction of the Madras High Court, or involving immovable property situated within Chennai city limits.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs leading-relaxed space-y-2 md:w-1/2">
                    <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Chennai vs Rest of Tamil Nadu</span>
                    </div>
                    <p>
                      For Wills made outside Chennai concerning properties outside Chennai limits (such as Coimbatore, Madurai, Trichy, or Salem), probate is <strong>not mandatory</strong> unless contested.
                    </p>
                    <p>
                      However, if a resident in Coimbatore executes a Will bequeathing an apartment in Mylapore or Anna Nagar, that Will <strong>must be probated</strong> in Chennai courts to establish clean title.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-600">
                    Need to verify whether your property falls under mandatory Madras High Court probate jurisdiction?
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/tools/probate-checker"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      <span>Check Probate Status</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/service/probate-lawyer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold transition-colors"
                    >
                      <span>Probate Lawyer Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: CHENNAI SRO DIRECTORY */}
            <section id="chennai-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                {/* H2: Exactly 47 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Chennai Sub-Registrar Offices: SRO Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Chennai registration is administered across Chennai Central, Chennai South, and Chennai North zones.
                  Under Section 32 of the Registration Act, your Will can be registered at the Sub-Registrar Office where the testator resides, or where any real estate is situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Mylapore, Adyar, OMR)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {CHENNAI_DISTRICTS.length} Chennai SRO Zones
                  </span>
                </div>

                {/* DISTRICT PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredDistricts.map((d, index) => {
                    const isSelected = selectedDistrict === d.id;
                    const isLastOdd =
                      filteredDistricts.length % 2 !== 0 && index === filteredDistricts.length - 1;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDistrict(d.id)}
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                          isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                        } ${
                          isSelected
                            ? "bg-[#C65378] text-white shadow-xs ring-2 ring-[#C65378]/25"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                        }`}
                      >
                        {d.name}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE DISTRICT DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        {activeDistrictData.name} Zone
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeDistrictData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Register Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">SRO Office Complex:</span>
                      <p className="text-slate-600">{activeDistrictData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <p className="text-slate-600">{activeDistrictData.timings}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold text-slate-900 block">Localities Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official Appointment Portal: <strong>tnreginet.gov.in</strong>
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Advocate Assistance for {activeDistrictData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: LOCAL COVERAGE ACROSS CHENNAI GCC */}
            <section id="chennai-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL LOCALITIES</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Local Coverage: Will Services Across Chennai GCC
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our network of advocates and succession experts provides home visits and Sub-Registrar support throughout the Greater Chennai Corporation area:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: MYLAPORE & MANDAVELI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central &amp; Heritage Chennai
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mylapore
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Mylapore &amp; Mandaveli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mylapore</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mandaveli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Santhome</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">R.A. Puram</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Ancestral family homes, traditional agraharams, and undivided family properties in Mylapore and Mandaveli require meticulous boundary definitions, life interest bequests for surviving spouses, and Madras High Court probate structuring.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Taluk Office Complex, Kutchery Road (SRO Mylapore)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        TNREGINET portal appointment booking, advocate accompaniment, and Section 31 doorstep execution for senior citizens across Mylapore.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Mandatory Probate · ₹0 Stamp Duty</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mylapore Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: ALWARPET & GEORGE TOWN */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Elite Suburbs &amp; Commercial Hubs
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Central / Triplicane
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Alwarpet &amp; George Town
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alwarpet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">George Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sowcarpet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Triplicane</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Covers wholesale commercial trading units and ancestral godowns in George Town alongside elite residential apartments in Alwarpet. Precision drafting handles commercial lease rentals, business succession, and coparcenary partition records.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: 182 Bharathi Salai, Royapettah (SRO Central Chennai)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Comprehensive assistance for high-value business succession wills, bank locker inventory bequests, and TNREGINET Book-III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial Assets · High Court Probate</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Alwarpet Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: ANNA NAGAR & KILPAUK */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West &amp; North Chennai Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Anna Nagar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Anna Nagar &amp; Kilpauk
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anna Nagar East</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anna Nagar West</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kilpauk</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shenoy Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Prime residential plots, multi-floor builder homes, and commercial establishments in Anna Nagar and Kilpauk require precise asset allocation, CMDA layout specifications, and legal guardianship clauses for minor children.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: W-Block, 3rd Main Road, Anna Nagar West (SRO Anna Nagar)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Advocate consultation, token scheduling on tnreginet.gov.in, and Greater Chennai Corporation (GCC) property tax mutation guidance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">CMDA Plots · Minor Guardianship</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Anna Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: ADYAR, BESANT NAGAR & ECR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Chennai &amp; Coastal Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Adyar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Adyar, Besant Nagar &amp; ECR
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Adyar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Besant Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thiruvanmiyur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">East Coast Road (ECR)</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      High-value bungalows, seaside villas, and luxury residential floors in Adyar and Besant Nagar demand robust revocation clauses, MBBS doctor medical capacity certifications, and named executors for Madras High Court probate.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: 4th Cross Street, Gandhi Nagar (SRO Adyar)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep advocate consultation for elderly residents, dual-witness coordination, and coastal property succession planning.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Beachside Villas · High Court Probate</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Adyar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: VELACHERY & OMR CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        OMR IT Corridor &amp; South Gate
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Velachery / Sholinganallur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Velachery &amp; OMR Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Velachery</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sholinganallur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">OMR IT Highway</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Perungudi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tech professionals and NRIs owning multistory apartments in gated communities along the OMR corridor benefit from digital drafting, US stocks and vested RSUs bequests, Demat account transmissions, and nominee harmonization.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Rajiv Gandhi Salai (OMR), Sholinganallur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online consultation, remote witness scheduling, and cross-border tech asset succession planning for software professionals.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Tech Equities &amp; RSUs · NRI Drafting</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Velachery Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: T. NAGAR & NUNGAMBAKKAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Prime Retail &amp; Central District
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO T. Nagar / Saidapet
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in T. Nagar &amp; Nungambakkam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">T. Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nungambakkam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saidapet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">West Mambalam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Traditional family estates, commercial showrooms near Panagal Park, and multi-generational family flats in T. Nagar and Nungambakkam. Clear testamentary shares among siblings to prevent costly family title disputes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Integrated Registration Complex, 571 Anna Salai (Saidapet)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Experienced High Court advocate drafting, fast-track SRO appointment booking, and GCC property tax title transfer support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Retail Units · Bank Lockers</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft T. Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-chennai-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION PROTOCOL</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Chennai Will Registration Flow
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Chennai is straightforward when following this 5-step standard operating procedure:
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Inventory Assets &amp; Designate an Executor
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      List all Chennai immovable properties (GCC survey numbers, Patta numbers, flat details), bank accounts, demat holdings, and life insurance policies. Appoint a trustworthy executor who will administer the estate under Madras High Court probate proceedings.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Draft Will with Custom Legal Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Use our online drafting platform or consult a senior estate advocate. Ensure the Will contains express revocation of prior testaments, clear division of shares, alternate bequests, and residuary estate distribution clauses.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Execute Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on plain A4 sheets. The testator must sign or place a thumb impression on each page in the presence of two independent adult witnesses. Under Section 67 ISA, witnesses must not be beneficiaries under the Will.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Book Online Token on TNREGINET Portal
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log into <code>tnreginet.gov.in</code>. Enter party details for Book III registration, select your jurisdictional Chennai SRO (e.g. Mylapore, Saidapet, Anna Nagar), and pay the nominal ₹100 registration fee online. Download the appointment token receipt.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Biometric Verification &amp; Official Book III Registration
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office at the appointed slot with your two witnesses. The Sub-Registrar captures biometric thumbprints and digital photographs, examines the testator, and records the document permanently in official Book III registers.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION</span>
                </div>
                {/* H2: Exactly 47 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31: Doorstep Home Visits for Seniors
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 31 of the Registration Act, 1908, senior citizens, bedridden persons, or hospitalised testators can register their Will without visiting the Sub-Registrar Office in person.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Doorstep Procedure in Chennai
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      An application is submitted to the jurisdictional Sub-Registrar citing medical grounds under Section 31.
                      Upon paying the prescribed government commission and travel fee, the Sub-Registrar personally visits the testator&apos;s residence or hospital room with official recording equipment.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Doctor Fitness Certificate Required
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered medical practitioner (MBBS or higher) must examine the testator on the day of registration and issue a certificate of mental soundness. This confirms the testator acted freely without coercion or dementia.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    Our Chennai advocates manage Section 31 petitions and doctor coordination across all 11 zones.
                  </span>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                  >
                    <span>Request Doorstep Registration Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                  <span>PREPARATION CHECKLIST</span>
                </div>
                {/* H2: Exactly 53 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Required Documents: Chennai Registration Checklist
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Interactive checklist for registering your Will in Chennai. Click each item to track your progress before visiting the Sub-Registrar:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="font-bold text-slate-700">
                    Checklist Progress: {checkedCount} of {checklist.length} Completed
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs">
                    {Math.round((checkedCount / checklist.length) * 100)}% Ready
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-slate-50/80 border-slate-300"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <span
                          className={`text-xs sm:text-sm font-bold block ${
                            item.checked ? "text-slate-900" : "text-slate-700"
                          }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    Need the complete downloadable checklist for your files?
                  </span>
                  <Link
                    href="/tools/will-checklist"
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                  >
                    <span>Download Interactive Will Checklist</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 9: CHENNAI PROPERTY TYPES */}
            <section id="chennai-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL ASSET CLASSES</span>
                </div>
                {/* H2: Exactly 52 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Chennai Property Types: GCC, Patta &amp; CMDA Layouts
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Drafting a Will in Chennai requires specific clauses tailored to local real estate tenure and documentation systems:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase">
                    Municipal
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    GCC Residential Apartments
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Multistory flats in Besant Nagar, Alwarpet, and Kilpauk require specific mentions of Undivided Share of Land (UDS), car park allocations, and Greater Chennai Corporation property tax assessment numbers.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase">
                    Revenue &amp; Land
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    CMDA Layout Plots &amp; Patta
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Independent residential plots approved by Chennai Metropolitan Development Authority (CMDA) must cite town survey numbers, Patta passbook numbers, and registered parent title deeds for seamless e-Sevai transfer.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase">
                    Government
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    TNHB Housing Board Allotments
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tamil Nadu Housing Board (TNHB) flats and plots in Anna Nagar, KK Nagar, and Mogappair require sale deed copies and clearance certificates from the Executive Engineer before executing succession transfers.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES */}
            <section id="chennai-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT EXPENSES</span>
                </div>
                {/* H2: Exactly 49 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Government Fees: TNREGINET Registration Costs
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property sale deeds that incur high stamp duty in Tamil Nadu, Wills are 100% exempt from stamp duty across India under the Indian Stamp Act, 1899.
                  Government fees for registering a Will on TNREGINET are completely nominal:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Fee Component</th>
                      <th className="p-4 font-bold">Official Amount</th>
                      <th className="p-4 font-bold">Payable To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Tamil Nadu Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Government of Tamil Nadu</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 (Flat Fee)</td>
                      <td className="p-4">TNREGINET / Sub-Registrar</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Scanning &amp; User Charges</td>
                      <td className="p-4 font-bold">₹100 to ₹150</td>
                      <td className="p-4">Sub-Registrar Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Home Visit Commission</td>
                      <td className="p-4 font-bold">Prescribed Official Attendance Fee</td>
                      <td className="p-4">Doorstep Official Visit Fee</td>
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
                  <span>PLANS &amp; PRICING</span>
                </div>
                {/* H2: Exactly 47 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Service Packages: Transparent Pricing Plans
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the level of legal assistance that fits your estate planning needs in Chennai:
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
                      Ideal for simple estates with bank accounts, mutual funds, and residential flats.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Chennai Will engine</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted statutory clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download &amp; instructions</span>
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
                    Most Popular in Chennai
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Comprehensive
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Advocate Consultation
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Senior estate advocate review for GCC apartments, CMDA plots, and probate planning.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 consultation with senior advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for probate &amp; minor heirs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Executor advisory &amp; witness vetting</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer"
                  >
                    Book Advocate Call
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Doorstep SRO
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Complete SRO Registration
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      End-to-end registration assistance at any Chennai Sub-Registrar office.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>TNREGINET online appointment booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physically attends SRO with you</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Collection of registered Book III deed</span>
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
                {/* H2: Exactly 49 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Chennai Will Drafting
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to common questions about making and registering a Will in Chennai and Tamil Nadu:
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
                  <span>STATUTORY CITATIONS</span>
                </div>
                {/* H2: Exactly 46 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Statutory Citations: Indian Succession Law
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols strictly follow codified Indian statutes and official Tamil Nadu registration portals:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 63, 67, and Section 213 read with Section 57 (Presidency Town Probate Rules).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Registration Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional Registration), Section 31 (Doorstep Commission), and Section 51 (Book III).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    TNREGINET Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official Registration Department portal: <code>tnreginet.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Madras High Court Rules
                  </span>
                  <p className="text-xs text-slate-600">
                    Original Side Rules governing Testamentary and Intestate Jurisdiction for probate grant.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Chennai Properties &amp; Family Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Chennai assets to lengthy partition litigation.
                Draft a legally binding Will in minutes or consult our senior estate lawyers.
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
                  Book Lawyer Consultation
                </a>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION MODAL - FULLY VISIBLE IN MOBILE & DESKTOP
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#172228] rounded-2xl sm:rounded-3xl border border-white/20 p-3 sm:p-5 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs sm:text-sm font-bold text-white">
                Visual Blueprint: Chennai Will Drafting &amp; Probate Architecture
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40">
              <Image
                src="/images/will-drafting-in-chennai.jpg"
                alt="High Resolution Visual Blueprint: Chennai Will Drafting and Probate Architecture"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
