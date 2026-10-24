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
  Layers,
  Scroll,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "tripura-overview", label: "OVERVIEW" },
  { id: "tripura-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "tripura-probate-rules", label: "PROBATE RULES" },
  { id: "tripura-sro-directory", label: "SRO DIRECTORY" },
  { id: "tripura-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-tripura-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "tripura-property-types", label: "PROPERTY TYPES" },
  { id: "tripura-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const TRIPURA_SRO_HUBS = [
  {
    id: "agartala-sadar",
    name: "Agartala Sadar (West Tripura)",
    sro: "Office of the Sub-Registrar, Agartala Sadar",
    address: "District Registry Office Complex, Old Secretariat Road, Agartala, West Tripura - 799001",
    areas: "Banamalipur, Krishnanagar, Ramnagar, Dhaleswar, Indranagar, Kunjaban, Melarmath, Radhanagar, AMC Municipal Wards",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "greater-agartala-rural",
    name: "Greater Agartala & West Rural",
    sro: "Sub-Registrar Office Jirania & Mohanpur",
    address: "Sub-Divisional Magistrate Complex, Mohanpur / Jirania, West Tripura - 799035",
    areas: "Amtali, Badharghat, Arundhatinagar, Khayerpur, Ranirbazar, Mohanpur, Jirania, Bodhjungnagar Industrial Zone",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "udaipur-gomati",
    name: "Udaipur & Gomati District Hub",
    sro: "Office of the Sub-Registrar, Udaipur",
    address: "District Magistrate & Collectorate Complex, Radhakishorepur, Udaipur, Gomati - 799120",
    areas: "Udaipur Town, Matabari, Radhakishorepur, Kakraban, Amarpur, Karbook, Gomati River Valley Belt",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "dharmanagar-north",
    name: "Dharmanagar (North Tripura)",
    sro: "Office of the Sub-Registrar, Dharmanagar",
    address: "SDM Office Complex, Office Tilla, Dharmanagar, North Tripura - 799250",
    areas: "Dharmanagar Municipal Area, Panisagar, Kanchanpur, Kadamtala, Churaibari, Jampui Hills Corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "kailashahar-unakoti",
    name: "Kailashahar & Kumarghat (Unakoti)",
    sro: "Sub-Registrar Office Kailashahar",
    address: "District Administration Complex, Court Road, Kailashahar, Unakoti - 799277",
    areas: "Kailashahar Town, Kumarghat, Fatikroy, Pecharthal, Unakoti Heritage Zone, Tea Plantation Corridors",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "belonia-sabroom-south",
    name: "Belonia & Sabroom (South Tripura)",
    sro: "Office of the Sub-Registrar, Belonia",
    address: "SDM Complex, Belonia Municipal Town, South Tripura - 799155",
    areas: "Belonia Town, Santirbazar, Sabroom International Border SEZ, Maitri Setu Belt, Jolaibari, Baikhora",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "bishalgarh-sepahijala",
    name: "Bishalgarh & Sonamura (Sepahijala)",
    sro: "Sub-Registrar Office Bishalgarh",
    address: "District Administrative Complex, Bishalgarh Town, Sepahijala - 799102",
    areas: "Bishalgarh, Melaghar, Sonamura, Rudrasagar Lake Zone, Jampuijala, Boxanagar Border Corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "ambassa-dhalai",
    name: "Ambassa & Kamalpur (Dhalai)",
    sro: "District Sub-Registrar Office Ambassa",
    address: "DM & Collectorate Building, Ambassa, Dhalai District - 799289",
    areas: "Ambassa HQ, Kamalpur Town, Gandacherra, Longtharai Valley, Manu, Chawmanu ADC Belt",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Tripura and central stamp law, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Essential for biometric identity verification, electronic thumbprint, and digital photo at the Tripura SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Photo IDs",
    detail: "Must carry original photo IDs and must not be beneficiaries receiving any asset or bequest under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Strongly advised for senior testators aged 60+. Certifies sound testamentary disposition, memory, and understanding.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Tripura Land Records (Khatian / Jamabandi Extract)",
    detail: "Revenue Record of Rights (RoR) issued by the Directorate of Land Records & Settlement for Nal, Lunga, or Tilla land.",
    checked: false,
  },
  {
    id: "item-6",
    label: "AMC / Municipal Property Tax Assessment Receipts",
    detail: "Holding tax receipts or title deeds proving ownership of Agartala residential apartments or urban commercial buildings.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Section 187 TLR & LR Act Compliance Verification",
    detail: "Ensures bequests of tribal lands in Scheduled or ADC areas strictly comply with statutory transfer restrictions.",
    checked: false,
  },
  {
    id: "item-8",
    label: "SRO Fee Receipt & Book III Registration Requisition",
    detail: "Statutory registration fee challan and application form submitted before the Sub-Registrar Office.",
    checked: false,
  },
];

export default function TripuraLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("tripura-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectedHub, setSelectedHub] = useState<string>("agartala-sadar");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const targets = document.querySelectorAll(".scroll-target");
      const scrollPosition = window.scrollY + 180;

      targets.forEach((target) => {
        const top = (target as HTMLElement).offsetTop;
        const height = (target as HTMLElement).offsetHeight;
        const id = target.getAttribute("id");

        if (scrollPosition >= top && scrollPosition < top + height && id) {
          setActiveId(id);
        }
      });
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

  const filteredHubs = TRIPURA_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    TRIPURA_SRO_HUBS.find((h) => h.id === selectedHub) || TRIPURA_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (STRICT NASHIK ARCHITECTURE)
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
                <span>TRIPURA &amp; AGARTALA ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 60 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Tripura: Property Succession Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally enforceable Will for your Agartala Municipal Corporation (AMC) residential holdings, Nal, Lunga, and Tilla land Khatians, and commercial business assets. Ensure full compliance with the TLR &amp; LR Act 1960 and TTAADC protections with advocate verification and SRO registration support.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Tripura Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#tripura-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Tripura SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tripura High Court Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Indian Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep SRO Visits</span>
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
                  src="/images/will-drafting-in-tripura.jpg"
                  alt="Legal Will Drafting and Property Succession in Tripura"
                  fill
                  className="object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Tripura Estate Succession &amp; TLR Blueprint
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
                8 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Tripura District Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Indian Stamp Act Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                High Court of Tripura Rule
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
            <section id="tripura-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>TRIPURA ESTATE SUCCESSION BRIEF</span>
                </div>
                {/* H2 <= 70 chars: 55 chars */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Tripura
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional under Section 18(e) of the Registration Act, 1908. An unregistered Will signed before two witnesses is legally valid, but official Book III SRO registration provides statutory authenticity against property disputes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Tripura lies outside the historical presidency towns of Mumbai, Kolkata, and Chennai. Under Section 213 of the Indian Succession Act, court probate is strictly non-compulsory in Tripura, enabling direct revenue mutation with a registered Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Indian Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills attract ₹0 stamp duty in Tripura under the Indian Stamp Act, 1899 as applicable to the State. You only pay nominal Book III registration and computerized scanning fees at the Sub-Registrar Office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>TLR &amp; LR Act &amp; TTAADC Nuances</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Section 187 of the TLR &amp; LR Act 1960 restricts transfer of tribal land to non-tribals, and TTAADC Sixth Schedule customs govern ancestral tribal inheritances. Our advocates ensure complete statutory alignment.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="tripura-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                {/* H2 <= 70 chars: 47 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Tripura
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Testamentary succession in Tripura operates at the intersection of the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Tripura Land Revenue and Land Reforms Act, 1960 (TLR &amp; LR Act)</strong>. Any adult of sound mind possesses testamentary capacity to bequeath self-acquired urban properties, residential apartments, bank deposits, mutual funds, commercial ventures, and agricultural land holdings.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Tripura features unique land classifications and constitutional protections. While urban properties in Agartala Municipal Corporation (AMC) and non-tribal municipal councils follow general succession principles, rural agricultural lands (Nal, Lunga, and Tilla) and holdings within the <strong>Tripura Tribal Areas Autonomous District Council (TTAADC)</strong> require careful navigation of Section 187 restrictions and Sixth Schedule customary safeguards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be a major aged 18 years or older with sound testamentary mental capacity (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Executed voluntarily without undue influence, coercion, misrepresentation, or family pressure (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be attested by two independent adult witnesses who hold zero beneficial interest in the estate (Section 63 &amp; 67).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    A4
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Plain Paper</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Can be executed on plain white A4 paper. Stamp paper is not required under Indian Stamp Act provisions.
                  </p>
                </div>
              </div>

              {/* STATUTORY HIGHLIGHT BOX */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                  <span>Section 187 of TLR &amp; LR Act 1960: Safeguarding Tribal Land Rights</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Under Section 187 of the Tripura Land Revenue and Land Reforms Act, 1960, no transfer of land by a person belonging to a Scheduled Tribe to a person not belonging to a Scheduled Tribe is valid without previous written permission of the Collector. The High Court of Tripura has affirmed that testamentary dispositions cannot circumvent Section 187. When drafting a Will involving tribal land holdings, bequests must stay within eligible tribal heirs or comply with statutory procedures, protecting families against title voids and litigation.
                </p>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION PARADIGM</span>
                </div>
                {/* H2 <= 70 chars: 55 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Mandatory vs Optional: Registering a Will in Tripura
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the <strong>Registration Act, 1908</strong>, the registration of a Will is strictly optional across India, including Tripura. An unregistered Will drafted on standard A4 paper, signed by the testator in the physical presence of two independent witnesses, holds full legal force.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, registering your Will before the Sub-Registrar in Agartala Sadar, Udaipur, Dharmanagar, or other district registries elevates the instrument from a private agreement into a verified public record placed under government seal in Book III.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">Parameter</th>
                      <th className="py-3 px-4 font-bold">Unregistered Will in Tripura</th>
                      <th className="py-3 px-4 font-bold">Registered Will (Book III SRO)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Legal Validity</td>
                      <td className="py-3 px-4">Valid under Section 63 Indian Succession Act</td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold bg-emerald-50/50">
                        Valid with statutory presumption under Section 57/60
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Risk of Challenge</td>
                      <td className="py-3 px-4 text-amber-700">Higher risk of forgery or mental incapacity claims</td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold bg-emerald-50/50">
                        Minimal; SRO verifies physical presence &amp; identity
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">AMC / Revenue Mutation</td>
                      <td className="py-3 px-4">May require legal heir NOCs or court testimony</td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold bg-emerald-50/50">
                        Smooth, expedited Khatian and AMC holding mutation
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Document Security</td>
                      <td className="py-3 px-4">Risk of loss, tampering, or physical misplacement</td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold bg-emerald-50/50">
                        Permanent digital and hardcopy archival at SRO registry
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Government Stamp Duty</td>
                      <td className="py-3 px-4">₹0 Stamp Duty</td>
                      <td className="py-3 px-4">₹0 Stamp Duty (only nominal SRO fees)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="tripura-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT OF TRIPURA JURISPRUDENCE</span>
                </div>
                {/* H2 <= 70 chars: 55 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. High Court of Tripura: Succession &amp; Probate Mandates
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most frequent legal misconceptions among estate owners in Tripura is that a Will must be probated in court before properties can be transferred. Under <strong>Section 213 read with Section 57 of the Indian Succession Act, 1925</strong>, probate is mandatory only for Wills made within or involving immovable properties located in the historical presidency towns of Mumbai, Kolkata, and Chennai.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  The <strong>High Court of Tripura at Agartala</strong> has clearly held that court probate is non-mandatory for Hindu, Buddhist, Sikh, and Jain testators. Beneficiaries inheriting apartments in Agartala, tea estate interests in Kailashahar, or farmlands in Udaipur can directly apply for mutation before the Tehsildar or AMC municipal revenue officer with a registered Will.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>When Probate is Non-Compulsory</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                    <li>Properties situated within Tripura state boundaries (Agartala, Udaipur, Dharmanagar, etc.).</li>
                    <li>Testator and beneficiaries belong to Hindu, Buddhist, Jain, or Sikh communities.</li>
                    <li>Direct mutation on Khatian / Jamabandi records before Tehsil Revenue Officers.</li>
                    <li>Mutation of holding numbers with Agartala Municipal Corporation (AMC).</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>When Court Probate is Advisable</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                    <li>Will includes real estate located inside Kolkata, Greater Mumbai, or Chennai presidency limits.</li>
                    <li>Disputed estates where estranged legal heirs threaten caveat petitions or challenge testamentary capacity.</li>
                    <li>Certain central financial institutions or foreign asset custodians requiring letters of administration.</li>
                    <li>Christian testamentary dispositions under specific clauses of the Indian Succession Act.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="tripura-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>DISTRICT REGISTRATION HUBS</span>
                </div>
                {/* H2 <= 70 chars: 50 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Tripura SRO Directory: Agartala &amp; District Hubs
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Tripura operates Sub-Registrar Offices (SROs) administered by the Directorate of Land Records &amp; Settlement under the Revenue Department. Find your designated SRO hub, jurisdiction coverage, and operational details below:
                </p>
              </div>

              {/* SEARCH BAR */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by area, town, or SRO hub..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]/30 focus:border-[#C65378]"
                />
              </div>

              {/* HUBS INTERACTIVE TABS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-2">
                  {filteredHubs.map((hub) => {
                    const isSelected = selectedHub === hub.id;
                    return (
                      <button
                        key={hub.id}
                        type="button"
                        onClick={() => setSelectedHub(hub.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white border-[#C65378] shadow-md ring-1 ring-[#C65378]"
                            : "bg-white/70 border-slate-200/90 hover:bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">{hub.name}</span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-rose-50 text-[#C65378]"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            Active SRO
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{hub.areas}</p>
                      </button>
                    );
                  })}
                  {filteredHubs.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
                      No matching Sub-Registrar Office found. Search another city or locality.
                    </div>
                  )}
                </div>

                {/* SELECTED HUB DETAIL PANEL */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                        Designated Sub-Registrar
                      </span>
                      <h3 className="font-extrabold text-lg text-slate-900">{activeHubData.sro}</h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Book III Registry
                    </span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-slate-900 block">Office Address:</span>
                      <span className="text-slate-600">{activeHubData.address}</span>
                    </div>

                    <div>
                      <span className="font-bold text-slate-900 block">Key Localities &amp; Sub-Divisions:</span>
                      <span className="text-slate-600">{activeHubData.areas}</span>
                    </div>

                    <div>
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <span className="text-slate-600">{activeHubData.timings}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <span className="text-xs text-slate-500 font-medium">
                        Advocate accompaniment &amp; token coordination available
                      </span>
                      <a
                        href="/start"
                        onClick={handleStartDraft}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-all cursor-pointer"
                      >
                        <span>Book Tripura Will Registration</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES (EXACT NASHIK CARD LAYOUT RENAMED TO REGIONAL CITIES) */}
            <section id="tripura-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                {/* H2 <= 70 chars: 54 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Area-Wise Will Drafting in Tripura
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Tripura span high-value urban residential flats in Agartala Municipal Corporation wards, commercial holdings along national highways, border trade developments in Sabroom and Sonamura, tea garden interests in Unakoti, and agricultural Nal, Lunga, and Tilla lands in Gomati and North Tripura. Our estate advocates deliver customized legal drafting and SRO accompaniment across all key regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* REGIONAL CITY 1: AGARTALA URBAN CORE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Capital Urban Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Agartala Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Agartala Urban Core
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Banamalipur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Krishnanagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramnagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dhaleswar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kunjaban</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Agartala</strong> for premium multi-story apartments, independent family houses, commercial buildings, and mutual fund portfolios. Codifies Agartala Municipal Corporation (AMC) holding tax mutation clauses, undivided land share distribution, and life-interest protections for surviving spouses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Agartala Sadar Registry</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Registration at District Registry Office, Old Secretariat Road, advocate accompaniment, and Section 31 doorstep execution for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Agartala"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Agartala Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 2: GREATER AGARTALA & WEST TRIPURA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Rapid Growth Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jirania &amp; Mohanpur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Greater Agartala &amp; West Rural
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amtali</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Badharghat</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mohanpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jirania</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bodhjungnagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting in Greater Agartala</strong> for suburban residential layouts, highway commercial plots, Bodhjungnagar industrial MSMEs, and rural homesteads. Formulates clear boundary delineations and Khatian mutation procedures under the TLR &amp; LR Act 1960.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mohanpur &amp; Jirania Sub-Divisions</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Registry coordination at SDM complexes with comprehensive title deed and boundary schedule validation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Greater Agartala"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Greater Agartala Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 3: UDAIPUR & GOMATI DISTRICT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Temple &amp; Agri Basin
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Udaipur (Gomati)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Udaipur &amp; Gomati District
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Udaipur Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Matabari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Radhakishorepur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amarpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kakraban</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting in Udaipur</strong> for urban ancestral houses, market establishments near Matabari, Gomati fertile agricultural river lands, and horticultural orchards. Manages partition rules, family succession settlements, and revenue circle records.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Radhakishorepur Registry</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        District Magistrate &amp; Collectorate Complex SRO, advocate token assistance, and Tehsil Khatian synchronization.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Udaipur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Udaipur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 4: DHARMANAGAR & NORTH TRIPURA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Commercial Interstate Gate
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Dharmanagar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Dharmanagar &amp; North Hub
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dharmanagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panisagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanchanpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kadamtala</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Churaibari</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Legal <strong>Will drafting in Dharmanagar</strong> for commercial wholesale traders, transport logistics operators, residential estates, and North Tripura plantations. Integrates business succession mandates, debt-free bequest clauses, and multi-district asset schedules.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Office Tilla, Dharmanagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Sub-Divisional Magistrate Complex SRO, biometric attestation coordination, and multi-state cross-border asset planning.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Dharmanagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Dharmanagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 5: KAILASHAHAR & UNAKOTI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Plantation Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kailashahar (Unakoti)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kailashahar &amp; Kumarghat
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kailashahar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kumarghat</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fatikroy</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pecharthal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Unakoti Tea Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting in Kailashahar</strong> for tea garden holdings, historic family homesteads, agricultural lowlands, and municipal commercial properties. Provides precise testamentary trusts and executor appointments for smooth intergenerational handover.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Registry, Kailashahar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        District Administration Complex registry, elderly home registration under Section 31, and tea lease succession advice.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kailashahar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kailashahar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 6: BELONIA & SOUTH TRIPURA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Border Trade Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Belonia &amp; Sabroom
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Belonia &amp; Sabroom
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Belonia</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Santirbazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sabroom</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Maitri Setu SEZ</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jolaibari</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting in Belonia and Sabroom</strong> for prime commercial plots along the international trade highway, border SEZ investments, and ancestral agricultural properties. Preempts co-owner disputes and simplifies revenue record updating.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Belonia SDM Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Sub-Registrar Office Belonia, Sabroom logistics corridor documentation, and advocate consultation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Belonia"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Belonia Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 7: BISHALGARH & SEPAHIJALA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Sepahijala Agri-Cultural Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bishalgarh
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bishalgarh &amp; Sonamura
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bishalgarh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Melaghar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sonamura</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rudrasagar Lake</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jampuijala</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting in Bishalgarh</strong> covering rubber plantations, fishery water bodies around Rudrasagar, agro-trading stores, and suburban residential houses. Resolves boundary schedules and joint family ownership structures.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bishalgarh Administrative Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Sub-Registrar Office Bishalgarh, Sonamura sub-division legal attestation, and plantation succession drafting.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bishalgarh"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bishalgarh Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 8: AMBASSA & DHALAI DISTRICT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Highlands &amp; ADC Headquarters
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ambassa (Dhalai)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ambassa &amp; Kamalpur
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ambassa HQ</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kamalpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gandacherra</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Longtharai Valley</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Manu ADC Zone</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting in Ambassa</strong> for civil servants, business owners, and planters in Dhalai. Ensures complete harmony between statutory Indian Succession Act rules and TTAADC Sixth Schedule customary land protections.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DM &amp; Collectorate, Ambassa</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Sub-Registrar Office Ambassa, Kamalpur registry assistance, and Sixth Schedule customary law vetting.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ambassa"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ambassa Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-tripura-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                {/* H2 <= 70 chars: 52 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. 5-Step Process: Will Drafting to SRO Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this standardized 5-step legal protocol to draft, attest, and register your Will in Tripura with absolute compliance under the Indian Succession Act, 1925 and the TLR &amp; LR Act, 1960:
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    01
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Asset &amp; Khatian Documentation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a complete inventory of your immovable and movable assets in Tripura. Gather title deeds, AMC holding receipts, Khatian extracts for Nal, Lunga, and Tilla lands, bank account numbers, mutual fund folios, and insurance policies. Clearly identify your intended beneficiaries and nominate a reliable executor.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    02
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Legal Drafting &amp; Tribal Land Vetting
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our senior estate advocates formulate customized legal clauses, including revocation of prior instruments, specific bequests, survivorship terms, and guardian nominations for minors. In Tripura, our lawyers carefully review Section 187 of the TLR &amp; LR Act 1960 to guarantee that bequests involving tribal lands stay strictly compliant.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    03
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Execution &amp; Attestation by Two Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on standard A4 paper. Under Section 63 of the Indian Succession Act, sign the bottom of each page in the simultaneous presence of two independent adult witnesses who hold no beneficial interest under the Will. For senior testators aged 60+, attach an MBBS doctor mental fitness certificate.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    04
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      SRO Scheduling &amp; Requisition Preparation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Prepare the registration docket for your designated Sub-Registrar Office in Agartala Sadar, Udaipur, Dharmanagar, or other district registries. Remit the nominal Book III statutory registration and computer scanning fees.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <span className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    05
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Biometric Attestation &amp; Book III Archival
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office accompanied by our legal coordinator and both attesting witnesses. The Sub-Registrar verifies personal identity, captures digital photographs and biometric thumbprints, and seals the Will into permanent Book III government custody.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 HOME VISIT */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION FACILITY</span>
                </div>
                {/* H2 <= 70 chars: 52 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Home Visit: Doorstep Will Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, an individual who is physically unable to attend the Sub-Registrar Office due to advanced age, severe illness, or medical immobility can lawfully petition for registration at their private residence or hospital room in Tripura.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  This statutory provision ensures that senior citizens across Agartala, Udaipur, Dharmanagar, and all district towns can execute and register their Will comfortably without undergoing arduous travel or courthouse congestion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Doctor Medical Certificate</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A registered medical practitioner (MBBS/MD) issues a certificate confirming testamentary lucidity and certifying that travel to the SRO presents health risks.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">SRO Doorstep Requisition</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our legal team submits a formal Section 31 petition along with the medical certificate and pays the nominal statutory home-visit fee to the Sub-Registrar.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Bedside Biometrics</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Sub-Registrar attends the testator&apos;s residence with portable biometric apparatus, records signatures and thumbprints, and seals the document.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION READINESS</span>
                </div>
                {/* H2 <= 70 chars: 56 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Checklist: Documents for Will Registration in Tripura
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Use this interactive checklist to verify that all necessary documents and statutory credentials are in order before attending your Sub-Registrar Office appointment:
                </p>
              </div>

              {/* INTERACTIVE CHECKLIST COMPONENT */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Checklist Progress: {checkedCount} of {checklist.length} Completed
                  </span>
                  <span className="text-xs font-bold text-[#C65378]">
                    {Math.round((checkedCount / checklist.length) * 100)}% Ready
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200"
                          : "bg-slate-50/50 border-slate-200 hover:bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 text-[#C65378] rounded border-slate-300 focus:ring-[#C65378] cursor-pointer"
                      />
                      <div className="space-y-0.5 flex-1">
                        <div
                          className={`text-xs sm:text-sm font-bold ${
                            item.checked ? "text-[#C65378]" : "text-slate-900"
                          }`}
                        >
                          {item.label}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="tripura-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>TRIPURA ASSET CLASSIFICATIONS</span>
                </div>
                {/* H2 <= 70 chars: 52 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Property Types: TTAADC Land, Patta &amp; Urban Flats
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession planning in Tripura requires precise legal classification of each asset category to avoid conflicts with local land revenue laws, tribal autonomy councils, and municipal rules:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Asset 1: AMC Urban Flats */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>AMC Apartments &amp; Urban Holdings</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Residential apartments, commercial shops, and independent bungalows in Agartala Municipal Corporation (AMC). Succession requires updating the Municipal Holding Tax register and water connection records. A registered Will eliminates succession disputes among distant relatives.
                  </p>
                </div>

                {/* Asset 2: Nal, Lunga & Tilla Farmlands */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Wheat className="w-4 h-4 text-[#C65378]" />
                    <span>Nal, Lunga &amp; Tilla Farmlands</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Tripura agricultural land is classified into Nal (plains/paddy), Lunga (low-lying valleys), and Tilla (elevated highlands). All parcels are recorded in Khatians under the Revenue Department. A Will enables smooth mutation of Khatians under the TLR &amp; LR Act 1960 through the Circle Tehsildar.
                  </p>
                </div>

                {/* Asset 3: TTAADC Sixth Schedule Lands */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Scroll className="w-4 h-4 text-[#C65378]" />
                    <span>TTAADC Sixth Schedule Tribal Lands</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Lands situated inside the Tripura Tribal Areas Autonomous District Council (TTAADC) follow community customary rules. Section 187 of the TLR &amp; LR Act prohibits transfer to non-tribals. Our lawyers verify that bequests respect tribal lineage and customary laws.
                  </p>
                </div>

                {/* Asset 4: Movable & Financial Assets */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Stamp className="w-4 h-4 text-[#C65378]" />
                    <span>Bank Deposits, Tea Gardens &amp; Shares</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Savings accounts, fixed deposits, demat shares, vehicles, and tea garden leasehold shares in Kailashahar and Dharmanagar. Nominees act solely as temporary trustees; only a valid Will dictates true beneficial inheritance.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="tripura-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FEE BREAKDOWN</span>
                </div>
                {/* H2 <= 70 chars: 50 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Stamp Duty &amp; Govt Registration Fees in Tripura
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Tripura does not attract heavy property conveyance taxes. Here is the official fee framework:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">Fee Component</th>
                      <th className="py-3 px-4 font-bold">Government Schedule</th>
                      <th className="py-3 px-4 font-bold">Statutory Exemption Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">State Stamp Duty</td>
                      <td className="py-3 px-4 text-emerald-800 font-bold bg-emerald-50/50">₹0 (Completely Exempt)</td>
                      <td className="py-3 px-4">Wills are testamentary, not inter-vivos transfers</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Book III SRO Registration</td>
                      <td className="py-3 px-4 font-semibold">Nominal Statutory Fee</td>
                      <td className="py-3 px-4">Flat fee under Tripura Registration Rules</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Scanning &amp; Data Archival</td>
                      <td className="py-3 px-4 font-semibold">₹100 to ₹300 approx</td>
                      <td className="py-3 px-4">Nominal computerized record digitization charge</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Section 31 Home Visit Fee</td>
                      <td className="py-3 px-4 font-semibold">Statutory Visit Fee</td>
                      <td className="py-3 px-4">Applicable only for bedside home registration requests</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL PACKAGES</span>
                </div>
                {/* H2 <= 70 chars: 55 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Packages &amp; Pricing: Lawyer Will Drafting in Tripura
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal support tier that matches your estate complexity. Fixed transparent pricing with zero hidden charges:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plan 1 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      Self-Directed Online
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">Essential Online Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500">all-inclusive</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for simple nuclear estates with residential flats, bank savings, and clear direct bequests.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Interactive online questionnaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant legal clause generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Two-witness execution guide</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Start Essential Draft
                  </a>
                </div>

                {/* Plan 2: FEATURED */}
                <div className="bg-white rounded-3xl border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between space-y-6 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C65378] text-white shadow-xs">
                    Most Popular in Tripura
                  </span>
                  <div className="space-y-3 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-[#C65378]">
                      Advocate Consultation
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">Advocate Vetted Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#C65378]">₹4,990</span>
                      <span className="text-xs text-slate-500">all-inclusive</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recommended for estates with Nal/Lunga lands, AMC apartments, multi-heir distribution, or business assets.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Estate Advocate consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>TLR &amp; LR Act and Khatian clause vetting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Custom life-interest &amp; trust safeguards</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor certificate format for seniors</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl bg-[#C65378] text-white font-bold text-xs text-center hover:bg-[#a13c5d] transition-all cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Consult Estate Advocate
                  </a>
                </div>

                {/* Plan 3 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      End-to-End Execution
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900">Complete SRO Assistance</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500">all-inclusive</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Full-service support covering drafting, advocate review, SRO token coordination, and Section 31 home visits.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Comprehensive lawyer drafting &amp; review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Sub-Registrar appointment scheduling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Physical advocate accompaniment at SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep assistance for elderly</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Select Full SRO Support
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>CLEAR ANSWERS</span>
                </div>
                {/* H2 <= 70 chars: 53 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Tripura Will Drafting
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Authoritative legal answers on Will drafting, TLR &amp; LR Act rules, SRO registration, and property inheritance in Tripura:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY REFERENCES */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>AUTHORITATIVE STATUTES</span>
                </div>
                {/* H2 <= 70 chars: 46 chars */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Legal Acts &amp; Land Law Precedents
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our estate planning instruments adhere strictly to primary statutory codes and High Court precedents:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-xs">
                  <div className="font-extrabold text-slate-900">
                    Indian Succession Act, 1925 (Act No. 39 of 1925)
                  </div>
                  <p className="text-slate-600 text-xs">
                    Sections 59 (testamentary capacity), 61 (free consent), 63 (execution &amp; attestation), 67 (disqualification of witness beneficiaries), and 213 read with 57 (probate exemption outside presidency towns).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-xs">
                  <div className="font-extrabold text-slate-900">
                    Registration Act, 1908 (Act No. 16 of 1908)
                  </div>
                  <p className="text-slate-600 text-xs">
                    Sections 18(e) (optional registration of Wills), 31 (registration at private residence / home visit), 57 &amp; 60 (evidentiary value of registered documents in Book III).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-xs">
                  <div className="font-extrabold text-slate-900">
                    Tripura Land Revenue &amp; Land Reforms Act, 1960
                  </div>
                  <p className="text-slate-600 text-xs">
                    Section 187 (restrictions on the transfer of land belonging to Scheduled Tribes to non-tribals) and mutation protocols for updating RoR Khatians before Circle Tehsildars.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-xs">
                  <div className="font-extrabold text-slate-900">
                    Constitution of India: Sixth Schedule (TTAADC)
                  </div>
                  <p className="text-slate-600 text-xs">
                    Governs customary tribal self-rule and village council land administration across the Tripura Tribal Areas Autonomous District Council boundaries.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CALL TO ACTION CARD */}
            <div className="rounded-3xl bg-[#172228] text-white p-8 sm:p-10 relative overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C65378]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-4 max-w-2xl text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Protected Family Wealth in Tripura
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Ready to Draft Your Tripura Will?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Protect your AMC residential property, agricultural Khatians, and business investments from costly family disputes. Get verified legal drafting and Sub-Registrar registration support today.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-extrabold text-xs sm:text-sm hover:bg-[#a13c5d] transition-all cursor-pointer shadow-lg shadow-[#C65378]/25"
                  >
                    <span>Start Your Tripura Will Online</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#tripura-sro-directory"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/15 transition-all border border-white/15"
                  >
                    <span>Explore Tripura SRO Directory</span>
                  </a>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION IMAGE MODAL LIGHTBOX
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#172228] rounded-2xl overflow-hidden border border-white/20 shadow-2xl p-2 sm:p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 px-2 border-b border-white/10 text-white">
              <span className="text-xs sm:text-sm font-bold text-slate-200">
                Will Drafting in Tripura: Social &amp; Legal Blueprint
              </span>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] mt-3 rounded-xl overflow-hidden">
              <Image
                src="/images/will-drafting-in-tripura.jpg"
                alt="Legal Will Drafting and Property Succession in Tripura"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
