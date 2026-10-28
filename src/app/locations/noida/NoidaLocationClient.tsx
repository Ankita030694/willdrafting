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
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "noida-overview", label: "OVERVIEW" },
  { id: "noida-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "noida-leasehold-transfer", label: "LEASEHOLD FLATS" },
  { id: "noida-probate-rules", label: "PROBATE RULES" },
  { id: "noida-sro-directory", label: "SRO DIRECTORY" },
  { id: "noida-area-coverage", label: "LOCAL SECTORS" },
  { id: "step-by-step-noida-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "noida-property-types", label: "PROPERTY TYPES" },
  { id: "noida-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const NOIDA_SROS = [
  {
    id: "noida-sec33",
    name: "Noida (Sector 33)",
    sro: "SRO Noida I & SRO Noida II",
    address: "Sub-Registrar Office, Administrative Complex, Sector 33, Noida, UP - 201301",
    areas: "Sectors 1 to 168 (Noida Expressway, Sector 15, 18, 50, 62, 74, 75, 76, 78, 79, 93A, 128, 137, 143, 150)",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
  {
    id: "surajpur",
    name: "Greater Noida (Surajpur)",
    sro: "SRO Greater Noida (Surajpur Collectorate)",
    address: "District Collectorate Complex, Surajpur, Greater Noida, UP - 201306",
    areas: "Alpha, Beta, Gamma, Delta, Swarn Nagri, Omega, Chi, Pi, Zeta, Pari Chowk, Knowledge Park I-IV",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
  {
    id: "dadri",
    name: "Greater Noida West & Dadri",
    sro: "SRO Dadri (Noida Extension)",
    address: "Tehsil Compound, Dadri, Gautam Buddha Nagar, UP - 203207",
    areas: "Greater Noida West (Noida Extension), Tech Zone 4, Sectors 1, 4, 10, 12, 16B, 16C, Dadri town",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
  {
    id: "jewar",
    name: "Jewar & Yamuna Expressway",
    sro: "SRO Jewar (YEIDA Corridor)",
    address: "Tehsil Compound, Jewar, Gautam Buddha Nagar, UP - 203135",
    areas: "Jewar Airport region, YEIDA Sectors 17, 18, 20, 22D, 29, Yamuna Expressway residential and industrial belts",
    timings: "10:00 AM to 5:00 PM (Monday to Friday, UP Govt Calendar)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed on standard white A4 sheets. No expensive stamp paper is required under Uttar Pradesh law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Required for biometric identity check and digital photograph capture at SRO Sector 33 or Surajpur.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Witnesses must carry original photo IDs and must not be heirs receiving asset in the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Paper (For Seniors)",
    detail: "Signed by a filed MBBS doctor. Confirms sound mental capacity and protects against future court fights.",
    checked: false,
  },
  {
    id: "item-5",
    label: "IGRSUP Online Appointment Confirmation Slip",
    detail: "Official token receipt downloaded from igrsup.gov.in confirming designated date and time window.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Noida Office Sub-Lease Deed / Allotment Letter",
    detail: "Copies of tripartite sub-lease deed or builder-buyer pact to verify exact flat and tower numbers.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs Each",
    detail: "Recent color passport photos for Will maker and both witnesses for pasting in SRO Book III records.",
    checked: false,
  },
];

export default function NoidaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("noida-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedSro, setSelectedSro] = useState<string>("noida-sec33");
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

  const filteredSros = NOIDA_SROS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeSroData =
    NOIDA_SROS.find((s) => s.id === selectedSro) || NOIDA_SROS[0];

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
                <span>GAUTAM BUDDHA NAGAR SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 54 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Noida: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your 90-year leasehold flats, builder floors, and Office plots.
                Get lawyer drafting, IGRSUP token guidance, and physical SRO support at Sector 33 Noida and Surajpur Greater Noida.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Noida Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#noida-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Noida SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Court Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 UP Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-noida-og.jpg"
                  alt="Legal Will Drafting and Apartment Succession in Noida NCR"
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
                4 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Gautam Buddha Nagar
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% UP Stamp Exempt
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                90-Yr Leasehold
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Office Direct Name Change
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
            <section id="noida-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>NOIDA NCR SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Noida NCR
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>A Choice Filing in UP</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will filing is a choice across Uttar Pradesh under Section 18(e) of the Filing Act, 1908. An plain Will signed before two witnesses is legally valid.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Strictly A Choice</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Noida falls under Allahabad High Court area. Unlike presidency towns like Mumbai, court probate is not needed in Uttar Pradesh for Hindu, Sikh, Jain, or Muslim estates.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Tripartite Leasehold Transfer</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Noida &amp; GNIDA flats operate on 90-year leases. A filed Will prevents needed newspaper notices, heavy surety bonds, and multi-year Office name change fights.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero UP Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills incur ₹0 stamp duty in UP. At Sector 33 Noida or Surajpur SRO, Will makers pay only a flat ₹100 filing fee and nominal scanning charges on the IGRSUP portal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="noida-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Noida NCR
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will in Gautam Buddha Nagar is governed primarily by the <strong>Indian Succession Act, 1925</strong>, the <strong>Filing Act, 1908</strong>, and legal guidelines framed under the <strong>UP Plant Area Development Act, 1976</strong>.
                  Any adult of sound mind can bequeath their self-acquired real estate, bank deposits, mutual funds, and shop interests.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-black text-sm">
                    § 59
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Will Capacity
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Section 59 confirms that every person of sound mind not being a minor may dispose of their asset by Will. Seniors in Noida high-rises can safeguard their estate against coercion claims.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-black text-sm">
                    § 63
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Needed Witness Signing
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 63(c), the Will maker must sign or affix their mark in the presence of at least two independent witnesses, each of whom must attest the paper in the Will maker&apos;s physical presence.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-black text-sm">
                    UP 2010
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    UP Apartment Act 2010
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Governs apartment ownership across Noida and Greater Noida. Section 5 guarantees that an apartment along with its undivided interest in common areas is heritable and transferable land and flats.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT SECTION 18</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. A Choice Will Filing Under Section 18 UP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Filing Act, 1908, the filing of a Will is legally a choice throughout Uttar Pradesh.
                  An plain Will signed on plain paper is valid in law, provided signing and witness signing satisfy Section 63 of the Indian Succession Act.
                  However, filing in Gautam Buddha Nagar offers decisive practical benefits:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                      <span>Proof Sanctity Under Indian Law</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      A filed Will enters the official government repository in <strong>Book III</strong> at SRO Sector 33 Noida or Surajpur. Under Section 68 of the Indian Evidence Act, filing creates an official presumption of genuine signing and mental capacity, making judicial fights extraordinarily difficult.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                      <span>Safe Custody &amp; Elimination of Tampering</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Once filed, the paper cannot be destroyed, stolen, or surreptitiously replaced by disgruntled relatives. Even if original paper sheets are misplaced during apartment shifts, a legally certified copy can be retrieved instantly from the UP IGRS system.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                      <span>Instant Banking &amp; Demat Asset Transfer</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Nationalized and private banks across Noida (SBI, HDFC, ICICI, Axis) release deceased locker contents, fixed deposits, and mutual funds smoothly when backed by an officially filed Will and death paper, avoiding high-expense indemnity bonds.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                      <span>Noida Office Direct Name Change</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Noida Office and GNIDA officers process title transfer and sub-lease rights smoothly when presented with an officially filed Will, bypassing cumbersome public notice rules and office stalls.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: NOIDA LEASEHOLD NUANCE */}
            <section id="noida-leasehold-transfer" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>AUTHORITY LEASEHOLD SYSTEM</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Noida &amp; Greater Noida 90-Year Leasehold Transfer
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike Delhi or Mumbai where assets often feature freehold titles, <strong>all land in Noida, Greater Noida, and Yamuna Expressway is leasehold</strong> owned by the Uttar Pradesh Government.
                  The New Okhla Plant Development Office (NOIDA) and Greater Noida Plant Development Office (GNIDA) execute master leases to developers, who in turn execute 90-year <strong>Tripartite Sub-Lease Deeds</strong> to apartment buyers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-rose-200/80 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>The Plain Will Bottleneck</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    What Happens Without a Filed Will?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    When a flat owner passes away leaving only an plain Will or no Will:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>Office mandates publication of public notices in national English and Hindi dailies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>Needed 30-day waiting period for third-party objections and claims.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>Signing of expensive personal indemnity bonds with two local solvent sureties.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>If any Class-I legal heir fights the transfer, the Office freezes name change and refers parties to civil court.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-3xl border border-emerald-200/80 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>The Filed Will Advantage</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Direct Name Change in Office Records
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    With an officially filed Will signed before the Gautam Buddha Nagar SRO:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Noida Office accepts the filed Will as strong proof of Will bequest.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Newspaper notices and punitive indemnity surety rules are generally dispensed with.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Direct name change endorsement on original tripartite lease deeds within 30 to 45 business days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Heir can right away execute a sale, rent pact, or gift deed without title clouds.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 4: ALLAHABAD HC PROBATE EXEMPTION */}
            <section id="noida-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PRECEDENTS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Allahabad High Court Probate Exemption in UP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most persistent misconceptions among Noida asset buyers relocating from Mumbai or Kolkata is that court probate is needed to inherit flats.
                  Under the Indian Succession Act, 1925, <strong>probate is strictly a choice in Uttar Pradesh</strong>:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-rose-50 text-[#C65378] shrink-0">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Section 213 vs. Non-Presidency Towns
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Section 213(1) of the Indian Succession Act stipulates that an executor or legatee cannot set up any right under a Will unless a court of competent area has granted probate.
                      Crucially, Section 213(2) read with Section 57 restricts this mandate exclusively to Wills made within the historical presidency towns of Calcutta, Madras, and Bombay, or Wills relating to land and flats situated inside those city areas.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Because Gautam Buddha Nagar and Uttar Pradesh were never presidency towns, the Hon&apos;ble Allahabad High Court has repeatedly established that <strong>probate is not a condition precedent</strong> to set up rights under a Will in UP courts or office offices (<em>Smt. Raj Rani v. Chief Deal Commissioner</em>; <em>Ram Chand v. Deputy Director of Consolidation</em>).
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    Applicable Offices: <strong>Noida Office, GNIDA, YEIDA, and Gautam Buddha Nagar SROs</strong>
                  </span>
                  <a
                    href="#legal-citations"
                    className="inline-flex items-center gap-1 font-bold text-[#C65378] hover:underline"
                  >
                    <span>Read Allahabad HC Citations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5: SRO DIRECTORY */}
            <section id="noida-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION OFFICES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Gautam Buddha Nagar SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Gautam Buddha Nagar district houses four key SRO Offices.
                  Under Section 32 of the Filing Act, your Will can be filed at the SRO within whose sub-district you reside or where your apartment is located.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search sector (e.g. Sector 50, 137, Pari Chowk)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredSros.length} of {NOIDA_SROS.length} Gautam Buddha Nagar SROs
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredSros.map((s, index) => {
                    const isSelected = selectedSro === s.id;
                    const isLastOdd =
                      filteredSros.length % 2 !== 0 && index === filteredSros.length - 1;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSro(s.id)}
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                          isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                        } ${
                          isSelected
                            ? "bg-[#C65378] text-white shadow-xs ring-2 ring-[#C65378]/25"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                        }`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE SRO DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        {activeSroData.name} Zone
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeSroData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Register Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">SRO Office Complex:</span>
                      <p className="text-slate-600">{activeSroData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <p className="text-slate-600">{activeSroData.timings}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold text-slate-900 block">Area Sectors &amp; Localities:</span>
                      <p className="text-slate-600 leading-relaxed">{activeSroData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official Appointment Portal: <strong>igrsup.gov.in</strong>
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Lawyer Help for {activeSroData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section id="noida-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; HUBS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Area-Wise Will Drafting Services Across Noida Localities
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally checked <strong>Will drafting services in Noida Expressway, Sector 50, Noida Extension, or Greater Noida</strong>? Asset categories across Gautam Buddha Nagar range from luxury high-rise condominium towers along Noida Expressway to established sector kothis and sprawling Greater Noida townships.
                  Our senior lawyers provide checked legal drafting, IGRSUP slot booking, and SRO accompaniment across all key home clusters:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: NOIDA EXPRESSWAY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Noida Expressway
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sector 33
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Noida Expressway (Sectors 128 to 150)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 128 (Jaypee Greens)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 137 (Paras Tierra, Purvanchal)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 143 &amp; 150 (Tata Eureka, ATS)</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for professional <strong>Will drafting services in Noida Expressway</strong>? Expressway sectors house luxury gated condominiums with substantial NRI and senior citizen residency. Our lawyers draft tailored tripartite sub-lease clauses, survivorship nominations, and Section 31 home visit petitions for gated societies.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sector 33 Office Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Tripartite sub-lease deed check, NRI cross-border estate bequests, and doorstep biometric coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Expressway Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Noida Expressway"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Expressway Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: CENTRAL NOIDA SECTORS 50 & 74-79 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central Noida
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sector 33
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sector 50 &amp; Sectors 74 to 79
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 50 Kothis</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 78 (Mahagun Moderne)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 74 (Supertech Capetown)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 76 &amp; 79</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Get specialized <strong>Will drafting services in Sector 50 &amp; Sectors 74 to 79</strong>. A blend of established Office-allotted independent bungalows in Sector 50 and dense high-rise clusters in 74–79. We draft specific division clauses for multi-child estates, parking space allocations, and AOA transfer protocols under the UP Apartment Act.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sector 33 Office Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Office plot name change advisory, multi-heir bequest structures, and fast-track IGRSUP token generation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Central Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Central Noida Sectors"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Central Noida Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: GREATER NOIDA WEST / NOIDA EXTENSION */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Noida Extension
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Dadri
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Greater Noida West (Noida Extension)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sectors 1, 4, 10, 12, 16B &amp; 16C</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tech Zone 4</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gaur City 1 &amp; 2</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Opt for premier <strong>Will drafting services in Greater Noida West (Noida Extension)</strong>. Noida Extension features hundreds of thousands of home flats with varying registry statuses. Our legal team assists Will makers in properly documenting builder-buyer agreements (BBA), pending sub-lease rights, and home loan liability indemnities.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Compound, Dadri</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Builder allotment estate clauses, bank home loan mortgage disclosures, and Dadri SRO filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Extension Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Greater Noida West"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Extension Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: GREATER NOIDA CORE (PARI CHOWK, ALPHA, BETA, GAMMA) */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Greater Noida Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Surajpur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Greater Noida (Pari Chowk &amp; Sectors)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alpha, Beta, Gamma, Delta</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Omega, Chi, Pi, Zeta</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Swarn Nagri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pari Chowk</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Secure expert <strong>Will drafting services in Greater Noida (Pari Chowk &amp; Sectors)</strong>. GNIDA home sectors consist of planned single plots, institutional housing societies, and group housing schemes. We draft precise GNIDA transfer clauses that guarantee hassle-free single-window name change at the Greater Noida Office office.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Surajpur Collectorate Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        GNIDA office plot name change protocols, institutional asset bequests, and Surajpur SRO appointments.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Greater Noida Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Greater Noida"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Greater Noida Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-noida-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>5-STEP EXECUTION PROTOCOL</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Step-by-Step Will Drafting &amp; Filing SOP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this standardized 5-step Standard Operating Step to draft your Will online and secure physical or doorstep filing in Gautam Buddha Nagar:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-lg shrink-0">
                    01
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Step 1: Inventory Noida Assets &amp; Assign Heirs
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      List your Noida and Greater Noida assets, specifying exact flat numbers, tower names, society registrations, and Office allotment dates. Include bank accounts, fixed deposits, demat shares, vehicles, and jewelry. Appoint a trustworthy executor to oversee split.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-lg shrink-0">
                    02
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Step 2: Legal Drafting with Tripartite Leasehold Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft your custom Will through our free platform or have our senior estate lawyers review it. We insert legal revocation clauses, residuary estate terms, alternate guardian appointments for minors, and specific Noida Office name change instructions.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-lg shrink-0">
                    03
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Step 3: Signing Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the finalized Will on clean white A4 paper sheets. Under Section 63 of the Indian Succession Act, sign the bottom of each page and sign your full legal signature on the final signing page in the joint physical presence of two independent adult witnesses who are not heirs.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-lg shrink-0">
                    04
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Step 4: Book SRO Slot on the UP IGRSUP Portal
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log onto <code>igrsup.gov.in</code>. Enter Will maker and witness Aadhaar numbers, select your area SRO office (Sector 33 Noida, Surajpur Greater Noida, or Dadri), and pay the nominal ₹100 filing fee online. Download your official e-appointment slip with token number.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-lg shrink-0">
                    05
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Step 5: Biometric Check &amp; Book III Filing
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the SRO office with your two witnesses and original photo IDs. The SRO captures digital facial photographs and biometric fingerprints. The Will is recorded in Book III, and the original endorsed paper is returned to you.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: SECTION 31 HOME VISIT */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Section 31 Doorstep Will Filing in Noida
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For senior citizens, bedridden people, or medically vulnerable residents across Noida and Greater Noida condominiums, visiting the bustling Sector 33 SRO can be challenging.
                  The law provides a dignified, fully legal alternative through <strong>Section 31 of the Filing Act, 1908</strong>:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-[#C65378] flex items-center justify-center font-black text-xs">
                      1
                    </div>
                    <strong className="text-slate-900 block text-sm">MBBS Doctor Paper</strong>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Obtain a medical paper from a filed MBBS physician confirming the Will maker is mentally sound but physically unable to travel.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-[#C65378] flex items-center justify-center font-black text-xs">
                      2
                    </div>
                    <strong className="text-slate-900 block text-sm">Official Commission Fee</strong>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our lawyers file an official commission petition before the SRO and deposit the nominal government home visit fee online.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-[#C65378] flex items-center justify-center font-black text-xs">
                      3
                    </div>
                    <strong className="text-slate-900 block text-sm">Home Biometric Visit</strong>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The SRO visits your Noida apartment with portable biometric equipment, records fingerprints, and completes Book III filing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <span className="text-slate-700">
                    Need doorstep filing in Sectors 50, 78, 128, 137, or Greater Noida?
                  </span>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1 font-bold text-[#C65378] hover:underline shrink-0"
                  >
                    <span>Schedule Section 31 Home Visit</span>
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
                  <span>INTERACTIVE CHECKLIST</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Paper Checklist for Noida SRO
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Assemble your paperwork before heading to the SRO office.
                  You have completed <strong>{checkedCount} of {checklist.length}</strong> items:
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

            {/* SECTION 10: PROPERTY TYPES */}
            <section id="noida-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>PROPERTY SUCCESSION RULES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Noida Leasehold Apartments &amp; Shop Assets
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate in Gautam Buddha Nagar depends heavily on whether your asset is an apartment tripartite sub-lease, an single Office plot, or a shop space:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    High-Rise Flats
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Tripartite Sub-Lease Flats
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Signed between Noida/GNIDA Office, developer, and buyer. A filed Will allows the nominee to apply directly for Office leasehold transfer and AOA membership.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Office Plots
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Office Home Kothis
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Independent plots in Sectors 14, 15, 19, 40, 44, 50, and Greater Noida sectors. Clear Will drafting specifies floor-wise division, terrace rights, and parking access.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase">
                    Shop
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    IT Parks &amp; Shop Units
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Office spaces in Sector 62, 63, and Expressway IT hubs. Will clauses address shop lease rentals, partnership ownership, and corporate board representation.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: REGISTRATION FEES */}
            <section id="noida-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL UP TARIFF</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. IGRSUP Portal Filing Fees &amp; Stamp Exemptions
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will filing in Uttar Pradesh is remarkably affordable because Wills are completely exempt from ad-valorem stamp duty:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-900 font-extrabold">
                    <tr>
                      <th className="p-4">Fee Head</th>
                      <th className="p-4">Official Amount (UP)</th>
                      <th className="p-4">Payment Office</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">UP Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Govt of Uttar Pradesh</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Filing Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 (Flat Fee)</td>
                      <td className="p-4">IGRSUP Portal Online Payment</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Scanning &amp; User Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹200</td>
                      <td className="p-4">SRO Counter Receipt</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Commission Fee</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Doorstep Home Visit Government Fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 12: PRICING & PACKAGES */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>PLANS &amp; PRICING</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Transparent Will Packages &amp; Legal Fees in Noida
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the level of legal help that fits your family&apos;s estate planning needs in Gautam Buddha Nagar NCR:
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
                      Ideal for simple estates with high-rise flats, bank accounts, and mutual funds.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Free Noida Will builder</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant lawyer-vetted template download</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Standard two-witness witness signing clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>IGRSUP token self-booking guide</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Start Online Draft
                  </a>
                </div>

                {/* PLAN 2 */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                    Most Popular
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Lawyer Vetted
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Lawyer Talk &amp; Review
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Recommended for complex multi-asset estates, Office plots, and business owners.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Estate Lawyer talk</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom Noida Office leasehold clause drafting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Minor child care &amp; life-interest clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Doctor fitness paper format provided</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Consult an Lawyer
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Concierge
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Complete SRO Filing
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Full end-to-end filing help at Sector 33 Noida, Surajpur, or Dadri SRO.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>IGRSUP online slot booking &amp; fee payment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer physically attends SRO with you</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit petition coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Collection of filed Book III deed</span>
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

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Frequently Asked Questions: Noida Wills &amp; Probate
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear legal answers to common questions about making and registering a Will in Gautam Buddha Nagar:
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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CITATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  14. Legal Acts &amp; Allahabad HC Judgments in UP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols strictly follow codified Indian succession statutes and official Uttar Pradesh filing channels:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 62, 63, and Section 213 (Non-Presidency Town Probate Exemption in UP).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Filing Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (A Choice Filing) and Section 31 (Doorstep SRO Commission).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    UP IGRSUP Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official Uttar Pradesh filing portal: <code>igrsup.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Allahabad High Court Rulings
                  </span>
                  <p className="text-xs text-slate-600">
                    <em>Smt. Raj Rani</em> and <em>Ram Chand</em> confirming a choice probate in UP.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Noida Assets &amp; Family Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your 90-year leasehold apartment to prolonged Noida Office fights.
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
                Visual Blueprint: Noida NCR Will Drafting &amp; Filing Architecture
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
                src="/images/will-drafting-in-noida-og.jpg"
                alt="High Resolution Visual Blueprint: Noida Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
