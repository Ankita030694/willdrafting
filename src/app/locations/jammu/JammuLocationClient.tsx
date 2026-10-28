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
  { id: "jammu-overview", label: "OVERVIEW" },
  { id: "jammu-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "jammu-probate-rules", label: "PROBATE RULES" },
  { id: "jammu-sro-directory", label: "SRO DIRECTORY" },
  { id: "jammu-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-jammu-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "jammu-property-types", label: "PROPERTY TYPES" },
  { id: "jammu-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const JAMMU_SRO_HUBS = [
  {
    id: "jammu-south",
    name: "Jammu South (Bahu Tehsil / Gandhi Nagar)",
    sro: "SRO Jammu South (Mini Secretariat Bahu)",
    address: "Tehsil Complex Bahu, Near Bahu Plaza, Gandhi Nagar / Rail Head, Jammu - 180004",
    areas: "Gandhi Nagar, Trikuta Nagar, Channi Himmat, Sainik Colony, Greater Kailash, Shastri Nagar, Nanak Nagar, Bahu Fort",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 1st & 3rd Sat working)",
  },
  {
    id: "jammu-north",
    name: "Jammu North (Janipur Court Complex)",
    sro: "SRO Jammu North (District Court Complex)",
    address: "District Courts Complex, Janipur, Jammu - 180007",
    areas: "Janipur, Roop Nagar, Bantalab, Chinore, Muthi, Paloura, Barnai, Subash Nagar, High Court Belt",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 1st & 3rd Sat working)",
  },
  {
    id: "jammu-central",
    name: "Jammu Central (Old Secretariat / Khas)",
    sro: "SRO Jammu Central (Khas Tehsil)",
    address: "Old Secretariat Complex, Mubarak Mandi / Panjtirthi, Jammu - 180001",
    areas: "Old City, Raghunath Bazaar, Panjtirthi, Pakka Danga, City Chowk, Residency Road, Gujjar Nagar, Kachi Chawni",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 1st & 3rd Sat working)",
  },
  {
    id: "jammu-west",
    name: "Jammu West (Talab Tillo / Canal Road)",
    sro: "SRO Jammu West (Revenue Complex)",
    address: "Revenue Complex, Talab Tillo Road, Near Canal Head, Jammu - 180002",
    areas: "Talab Tillo, Bakshi Nagar, Canal Road, Jewel Chowk, Shakti Nagar, Resham Ghar Colony, GMC Jammu Belt",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 1st & 3rd Sat working)",
  },
  {
    id: "nagrota-sidhra",
    name: "Nagrota & Sidhra (Tawi Valley Belt)",
    sro: "SRO Nagrota (Tehsil Complex)",
    address: "Tehsil Office Complex, National Highway 44, Nagrota, Jammu - 181221",
    areas: "Nagrota, Sidhra, Jagti, Ban, Bajalta, Golf Course Belt, Tawi Riverfront",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 1st & 3rd Sat working)",
  },
  {
    id: "gangyal-digiana",
    name: "Gangyal & Digiana (Industrial & Satwari)",
    sro: "SRO Gangyal (Sub-Division Office)",
    address: "Sub-Divisional Office, Industrial Area, Digiana / Gangyal, Jammu - 180010",
    areas: "Gangyal Industrial Area, Digiana, Satwari, Babliana, Kunjwani, Jeevan Nagar, Airport Belt",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 1st & 3rd Sat working)",
  },
  {
    id: "rs-pura-bishnah",
    name: "RS Pura & Bishnah (Agricultural Belt)",
    sro: "SRO RS Pura & Bishnah (Sub-District Registry)",
    address: "SDM Office Complex, Main Bazaar, RS Pura, Jammu - 181102",
    areas: "RS Pura, Bishnah, Marh, Suchetgarh, Miran Sahib, Agricultural & Basmati Rural Belts",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 1st & 3rd Sat working)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Paper",
    detail: "Printed on standard white A4 sheets. Under Jammu and Kashmir law, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Essential for NGDRS biometric identity validation, electronic thumbprint, and digital photo at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be heirs receiving any asset or bequest under the Will.",
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
    label: "NGDRS J&K Appointment Token & Payment Receipt",
    detail: "Official time-slot booking receipt downloaded from the ngdrs.jk.gov.in portal with fee transaction slip.",
    checked: false,
  },
  {
    id: "item-6",
    label: "JDA Plot Allotment / Lease Deed / JMC Tax Receipt",
    detail: "Ownership records for Jammu Development Office colony plots or Jammu City City Board house tax files.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Revenue Jamabandi & Fard (For Farm Land)",
    detail: "Recent computerized land revenue records for farmlands and orchard parcels in RS Pura, Bishnah, or Marh.",
    checked: false,
  },
];

export default function JammuLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("jammu-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("jammu-south");
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

  const filteredHubs = JAMMU_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    JAMMU_SRO_HUBS.find((h) => h.id === selectedHub) || JAMMU_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (NASHIK STYLE ARCHITECTURE)
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
                <span>JAMMU &amp; KASHMIR SUCCESSION &amp; NGDRS DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 49 characters (Target: 30-65 chars) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Jammu: Asset Protection
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your JDA home plots, JMC urban houses, plant units in Gangyal, and RS Pura farm lands. Complete NGDRS token booking, High Court lawyer check, and Section 31 doorstep signing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Jammu Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#jammu-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Jammu SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Court J&amp;K Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Ad-Valorem Stamp Duty</span>
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
                  src="/images/will-drafting-in-jammu.jpg"
                  alt="Legal Will Drafting and Property Succession in Jammu"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Jammu Urban &amp; JDA Estate Blueprint
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
                Jammu District Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Nominal NGDRS Fixed Fees
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                A Choice Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Section 213(2) Exemption
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

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Jammu Legal Support
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need senior High Court lawyer guidance for JDA lease transfers or NGDRS slot booking in Jammu?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] transition-colors"
                >
                  <span>Connect with Jammu Lawyer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* MAIN EDITORIAL CONTENT AREA */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="jammu-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>EXECUTIVE SUMMARY &amp; STATUTORY PROTOCOL</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Jammu
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <span className="font-bold text-slate-900 block flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#C65378]" />
                      JDA &amp; JMC Asset Estate
                    </span>
                    <p>
                      Transferring plots in Jammu Development Office (JDA) colonies such as Gandhi Nagar, Trikuta Nagar, and Roop Nagar, or freehold assets under Jammu City City Board (JMC), requires verifiable legal estate proof. A filed Will eliminates civil title fights and speeds up name change.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <span className="font-bold text-slate-900 block flex items-center gap-2">
                      <Stamp className="w-4 h-4 text-[#C65378]" />
                      NGDRS J&amp;K Digital Token Filing
                    </span>
                    <p>
                      Jammu operates on the National Generic Paper Filing System (NGDRS J&K). Will makers upload draft details, submit KYC, pay nominal government filing charges, and reserve exact biometric check appointments at their local SRO office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <span className="font-bold text-slate-900 block flex items-center gap-2">
                      <Home className="w-4 h-4 text-[#C65378]" />
                      Section 31 Doorstep SRO Filing
                    </span>
                    <p>
                      Senior citizens aged 60+, retired defence veterans, and people with medical mobility limitations across Jammu can request a home visit commission under Section 31 of the Filing Act, 1908. Sub-Registrars conduct biometrics at your residence.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                    <span className="font-bold text-slate-900 block flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      Indian Succession Act, 1925 Form
                    </span>
                    <p>
                      Following the Jammu and Kashmir Reorganisation Act, 2019, Will estate across Jammu is strictly governed by the Indian Succession Act, 1925. Wills require sound mind, voluntary intent, two witnesses, and clear bequests.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-amber-900 space-y-1">
                    <span className="font-bold block">Advisory Note on Nominee vs Legal Heir</span>
                    <p className="leading-relaxed">
                      Bank account nominations with J&amp;K Bank, SBI, or PNB, as well as society record nominations, do not convey absolute ownership. Under Supreme Court and High Court precedents, a nominee acts strictly as a temporary trustee. Only a legally drafted Will legally establishes strong title for your successors.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="jammu-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CODIFICATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Jammu
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will estate in the Union Territory of Jammu and Kashmir has transitioned to unified central Indian statutes. Understanding this codified framework protects your family against estate fights and revenue record deadlocks:
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  Prior to October 2019, asset transfers and estate in Jammu were regulated under state-specific enactments. Following the implementation of the Jammu and Kashmir Reorganisation Act, 2019, the <strong>Indian Succession Act, 1925</strong> applies universally to Will gifts for Hindus, Sikhs, Jains, Buddhists, and Christians in Jammu. Muslim personal law governs bequests within the prescribed one-third (Wasaya) limitations.
                </p>

                <p>
                  Under Section 59 of the Indian Succession Act, every person of sound mind not being a minor may dispose of their self-acquired and absolute asset by Will. Section 63 mandates that the Will maker must sign or affix their mark to the Will, and it must be attested by two or more credible witnesses who have seen the Will maker sign and who sign the paper in the presence of the Will maker.
                </p>
              </div>

              {/* STATUTORY COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200">
                      <th className="p-3.5 font-extrabold">Estate Parameter</th>
                      <th className="p-3.5 font-extrabold">Without a Will (Without a Will)</th>
                      <th className="p-3.5 font-extrabold">With Lawyer-Drafted Jammu Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">JDA Colony Plot Transfer</td>
                      <td className="p-3.5">Requires legal heir estate papers from District Judge or contested Tehsildar sworn notes; takes 12-24 months.</td>
                      <td className="p-3.5 text-emerald-800 bg-emerald-50/40 font-semibold">Direct name change through filed Will and indemnity bond within 30-45 days.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">JMC House Tax Name Change</td>
                      <td className="p-3.5">Requires consent sworn notes from all Class-I heirs, leading to hold-ups if one sibling dissents.</td>
                      <td className="p-3.5 text-emerald-800 bg-emerald-50/40 font-semibold">Immediate assessment register name update based on Book III filed Will.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Farmland Intiqal (RS Pura)</td>
                      <td className="p-3.5">Equal division among all legal heirs regardless of contribution, causing land fragmentation.</td>
                      <td className="p-3.5 text-emerald-800 bg-emerald-50/40 font-semibold">Specific Khasra allocations preserved to avoid farm parcel splitting.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Bank Accounts &amp; Demat</td>
                      <td className="p-3.5">Nominees must get estate papers if balance exceeds bank threshold limit.</td>
                      <td className="p-3.5 text-emerald-800 bg-emerald-50/40 font-semibold">Executor submits probated or filed Will with indemnity bond for prompt release.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION RULES */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Jammu?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Filing Act, 1908, the filing of a Will is <strong>a choice in Jammu</strong>. A Will signed on plain white paper signed by the Will maker in the presence of two adult witnesses is legally valid. However, choosing not to register introduces severe procedural and legal risks:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* UNREGISTERED WILL RISKS */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-rose-900 font-extrabold text-base">
                    <AlertTriangle className="w-5 h-5 text-rose-700" />
                    <span>Risks of an Plain Will in Jammu</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-rose-950/80">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-700 font-bold shrink-0">✕</span>
                      <span>Disgruntled heirs often allege forged signatures, dementia, or coercion by co-heirs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-700 font-bold shrink-0">✕</span>
                      <span>Jammu Development Office (JDA) scrutinizes plain Wills rigorously, often requiring civil court decrees.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-700 font-bold shrink-0">✕</span>
                      <span>High risk of destruction, loss, or intentional concealment by interested family members.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-700 font-bold shrink-0">✕</span>
                      <span>No government custody copy exists to disprove fabricated subsequent revocations.</span>
                    </li>
                  </ul>
                </div>

                {/* REGISTERED WILL ADVANTAGES */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span>Legal Benefits of NGDRS Filing</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950/80">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span>
                      <span>Legal presumption of genuine signing under the Indian Evidence Act / BSA.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span>
                      <span>Enters permanent Book III custody at the Jammu SRO office; cannot be forged or lost.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span>
                      <span>Instant credibility during JMC name change and JDA leasehold transfer verifications.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span>
                      <span>SRO captures biometric thumbprints and digital photographs of Will maker and witnesses.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="jammu-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT OF J&amp;K AND LADAKH JURISPRUDENCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Jammu Probate Law: High Court Estate Rules
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common question for Jammu asset owners is whether getting probate from a civil court is needed before heirs can inherit assets. Here is the settled legal position:
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-4 text-sm text-slate-700 leading-relaxed shadow-xs">
                <h3 className="text-base font-extrabold text-slate-900">
                  Section 213(2) Read with Section 57: Probate is Non-Needed in Jammu
                </h3>
                <p>
                  Under Section 213(1) of the Indian Succession Act, 1925, an executor must set up their right through probate or letters of management. However, Section 213(2) explicitly limits this rule to Wills falling within clauses (a) and (b) of Section 57:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block uppercase tracking-wider">
                      Presidency Towns (Needed)
                    </span>
                    <p className="text-xs text-slate-600">
                      Wills signed within the historical presidency towns of Mumbai, Kolkata, and Chennai, or concerning land and flats situated within those territorial limits.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1.5">
                    <span className="font-bold text-xs text-emerald-950 block uppercase tracking-wider">
                      Jammu &amp; Northern India (Exempt)
                    </span>
                    <p className="text-xs text-emerald-900">
                      Jammu lies entirely outside historical presidency towns. The High Court of Jammu &amp; Kashmir and Ladakh has repeatedly affirmed that getting probate is non-needed for Hindu, Sikh, Jain, and Buddhist Wills in Jammu.
                    </p>
                  </div>
                </div>

                <p className="pt-2 text-xs sm:text-sm text-slate-600">
                  So, heirs in Jammu can directly present a filed Will along with the Will maker&apos;s death paper to the Jammu Development Office (JDA), Jammu City City Board (JMC), and revenue offices for title substitution without paying hefty court fees or enduring multi-year civil court probate trials.
                </p>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="jammu-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION OFFICES DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Jammu SRO Offices: NGDRS SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Jammu district is divided into distinct filing areas under the Revenue Office of J&amp;K. Use the free directory below to locate your designated SRO office:
                </p>
              </div>

              {/* SEARCH & SELECT CONTROLS */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by locality, area, or office name (e.g. Gandhi Nagar, Janipur, Bahu)..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#C65378] transition-colors"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {JAMMU_SRO_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedHub === hub.id
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* SELECTED HUB DETAIL CARD */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#C65378] font-bold block">
                      SRO office Details
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                      {activeHubData.sro}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    NGDRS J&amp;K Active Hub
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C65378]" />
                      Official Physical Address
                    </span>
                    <p className="text-slate-600 pl-6 leading-relaxed">
                      {activeHubData.address}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#C65378]" />
                      Key Localities Covered
                    </span>
                    <p className="text-slate-600 pl-6 leading-relaxed">
                      {activeHubData.areas}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">Working Hours &amp; Public Tokens:</span>
                    <span className="text-slate-600">{activeHubData.timings}</span>
                  </div>
                  <a
                    href="https://ngdrs.jk.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                  >
                    <span>Visit NGDRS J&amp;K Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5: LOCALITIES COVERED IN JAMMU (EXACT SAME TYPE AS NASHIK) */}
            <section id="jammu-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Localities Covered: Area-Wise Will Drafting in Jammu
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Jammu span prestigious JDA planned sectors in Gandhi Nagar and Trikuta Nagar, high-growth suburban corridors in Channi Himmat and Sainik Colony, judicial home hubs around Janipur and Roop Nagar, plant factories in Gangyal, and fertile Basmati farmlands in RS Pura. Our estate lawyers deliver customized legal drafting, NGDRS J&amp;K slot scheduling, and SRO accompaniment across all key micro-markets:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: GANDHI NAGAR & TRIKUTA NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Jammu Luxury Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jammu South (Bahu)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gandhi Nagar &amp; Trikuta Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gandhi Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Trikuta Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gole Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rail Head Complex</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Gandhi Nagar</strong> and Trikuta Nagar for prime JDA home sectors, luxury independent bungalows, shop showrooms near Gole Market, and multi-asset investment portfolios. Codifies clear split of freehold plots, banking portfolios, and mutual fund holdings, making sure complete fight prevention.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariat, Bahu Tehsil Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        NGDRS token booking at Bahu SRO, lawyer physical attendance, and Section 31 doorstep signing for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal NGDRS Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gandhi Nagar Jammu"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gandhi Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: CHANNI HIMMAT, SAINIK COLONY & GREATER KAILASH */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Highway &amp; Elite Home
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jammu South (Bahu)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Channi Himmat &amp; Sainik Colony
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Channi Himmat</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sainik Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Greater Kailash</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chowadi Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Channi Himmat</strong> and Sainik Colony for expansive defense personnel residences, retired senior officers&apos; estates, and private duplex homes along NH-44. Formulates seamless heir apportionments, defense pension gratuity nominations, and JDA leasehold transfer clauses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bahu Sub-Division Registry, Bahu Plaza Belt</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Defense veteran estate guidance, private family estate structuring, and expedited Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Defense &amp; Plotted Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Channi Himmat"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Channi Himmat Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: OLD JAMMU CITY & RAGHUNATH BAZAAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Shop Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jammu Central (Old Secretariat)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Old City &amp; Raghunath Bazaar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Raghunath Bazaar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panjtirthi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pakka Danga</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanak Mandi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Old Jammu City</strong> and Raghunath Bazaar for historical multi-generational Havelis, shop shops, and wholesale merchant assets across Kanak Mandi and Residency Road. Clarifies co-parcenary split rights, protects family business continuity, and ensures seamless city title transfers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Old Secretariat Complex, Mubarak Mandi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Shop asset inventory, split fight prevention, and seamless JMC record updates.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Havelis &amp; Shop Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Old Jammu City"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Old City Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: TALAB TILLO, BAKSHI NAGAR & CANAL ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Jammu Home &amp; Medical
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jammu West (Talab Tillo)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Talab Tillo &amp; Bakshi Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Talab Tillo</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bakshi Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Canal Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jewel Chowk Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Talab Tillo</strong> and Bakshi Nagar for home houses, doctors&apos; clinics, and plotted colonies near Government Medical College (GMC) Jammu. Details clear life-interest rules for surviving spouses, bank locker bequests, and smooth JMC asset tax record mutations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Revenue Complex, Talab Tillo Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete papers review, doctor fitness certification support, and biometric scheduling.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Houses &amp; Medical Clinics</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Talab Tillo"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Talab Tillo Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: JANIPUR, ROOP NAGAR & BANTALAB */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-West Judicial &amp; Plotted
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jammu North (Janipur)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Janipur &amp; Roop Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Janipur Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Roop Nagar JDA</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bantalab</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chinore &amp; Muthi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Janipur</strong> and Roop Nagar adjacent to the High Court of J&amp;K and Ladakh (Jammu Wing) and District Court Complex. Covers planned JDA sectors, builder floors, and home colonies, guaranteeing watertight Will validity vetted by senior lawyers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Courts Complex, Janipur (SRO North)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High Court lawyer drafting, JDA Roop Nagar transfer compliance, and Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">JDA Sectors &amp; Plotted Houses</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Janipur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Janipur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: SIDHRA, NAGROTA & TAWI BYPASS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Tawi Valley &amp; Foothill
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nagrota / Jammu North
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sidhra &amp; Nagrota Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sidhra Valley</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nagrota</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jagti Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jammu Tawi Bypass</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Sidhra</strong> and Nagrota for picturesque riverfront villas, Golf Course luxury assets, and new institutional home hubs along Jammu Bypass. Eliminates title ambiguity, specifying exact boundary demarcations and smooth revenue record updates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Office Complex, Nagrota</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Riverfront villa estate, boundary specifications, and SRO accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Riverfront Villas &amp; Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sidhra"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Sidhra Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: BARI BRAHMANA & GANGYAL INDUSTRIAL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5" />
                        Plant &amp; MSME Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gangyal / Digiana
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gangyal &amp; Bari Brahmana
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gangyal Plant Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bari Brahmana SIDCO</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Digiana</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Satwari &amp; Babliana</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Gangyal and Bari Brahmana</strong> for plant entrepreneurs, manufacturing unit owners, and warehouse proprietors. Structures estate of SIDCO leasehold factory land, private company shareholdings, trade receivables, and manufacturing plant machinery.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Sub-Division, Digiana / Gangyal</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Plant asset inventory, cross-director share estate, and SIDCO lease compliance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">SIDCO Plots &amp; MSME Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gangyal"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Plant Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: RS PURA, BISHNAH & MARH AGRICULTURAL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        Farmland &amp; Basmati Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO RS Pura / Bishnah
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in RS Pura &amp; Bishnah Farmland
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">RS Pura Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bishnah</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Marh Farm Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Miran Sahib</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in RS Pura</strong> and Bishnah for farm landholdings, famous Basmati rice farms, orchards, and family rural assets. Drafts precise bequests compliant with the J&amp;K Land Revenue Act, making sure frictionless Intiqal (name change) before the Halqa Patwari.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SDM &amp; Tehsil Complex, RS Pura &amp; Bishnah</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Jamabandi revenue name change guidance, Patwari Fard check, and rural land estate.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Basmati Farms &amp; Rural Land</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in RS Pura Farmland"
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
            <section id="step-by-step-jammu-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to NGDRS Filing in Jammu
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Drafting and registering an unassailable Will in Jammu follows an orderly, legally checked 5-stage protocol:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#C65378] uppercase tracking-wider">
                      STEP 1 · ASSET IDENTIFICATION
                    </span>
                    <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold">
                      Day 1
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Full Inventory of Jammu Assets &amp; Heirs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Compile complete records of your land and cash assets. This includes JDA plot numbers in Gandhi Nagar or Roop Nagar, JMC house tax assessments, RS Pura farm Khasra details, J&amp;K Bank savings accounts, fixed deposits, and demat holdings. Designate trusted primary and contingent heirs.
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#C65378] uppercase tracking-wider">
                      STEP 2 · ADVOCATE DRAFTING
                    </span>
                    <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold">
                      Day 1-2
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Precision Drafting with Legal Clauses
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our estate lawyers craft your customized Will incorporating express declarations of sound mental health, appointment of an independent executor, specific bequest schedules, minor child care trusts, and express revocation of all prior Will instruments.
                  </p>
                </div>

                {/* STEP 3 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#C65378] uppercase tracking-wider">
                      STEP 3 · ATTESTATION
                    </span>
                    <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold">
                      Day 2-3
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Signing Before Two Independent Witnesses
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Print the Will on plain A4 sheets. Sign or place your thumb impression at the foot of each page in the direct physical presence of two independent adult witnesses. Crucially, under Section 67 of the Indian Succession Act, neither witness can be a heir under the Will.
                  </p>
                </div>

                {/* STEP 4 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#C65378] uppercase tracking-wider">
                      STEP 4 · NGDRS PORTAL BOOKING
                    </span>
                    <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold">
                      Day 3
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    NGDRS J&amp;K Token Booking &amp; Fee Remittance
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We initiate filing on the official National Generic Paper Filing System (NGDRS J&amp;K). We upload party details, Will maker KYC, witness ID, pay the nominal government fee online, and lock in an exact token time slot at your designated Jammu SRO.
                  </p>
                </div>

                {/* STEP 5 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#C65378] uppercase tracking-wider">
                      STEP 5 · FINAL REGISTRATION
                    </span>
                    <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold">
                      Day 4
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Biometric Capture at SRO or Doorstep Commission
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Will maker and two witnesses appear before the SRO in Jammu (or host the SRO at home under Section 31). Biometric thumbprints and photographs are recorded electronically, the Will is filed in permanent Book III custody, and certified copies are delivered.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP CONVENIENCE FOR SENIORS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Filing for Senior Citizens
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 31 of the Filing Act, 1908, senior citizens, bedridden people, and persons suffering from acute medical infirmities in Jammu can register their Will from the comfort of their home:
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-900 block">1. Medical Certification</span>
                    <p className="text-slate-600">
                      An MBBS/MD doctor issues a fitness paper confirming that the Will maker is mentally sound but physically unable to travel to the SRO office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-900 block">2. Commission Request</span>
                    <p className="text-slate-600">
                      We file a formal form under Section 31 before the SRO, Jammu, remitting the standard government commission inspection fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-900 block">3. Home Visit &amp; Biometrics</span>
                    <p className="text-slate-600">
                      The SRO visits the residence in Gandhi Nagar, Channi Himmat, Janipur, or other localities with portable biometric scanners to register the Will.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center justify-between gap-4">
                  <div className="space-y-1 text-xs text-rose-950">
                    <span className="font-bold block">Need Doorstep SRO Help in Jammu?</span>
                    <p className="text-rose-900/80">
                      Our legal team manages doctor certification formats, Section 31 petitions, and SRO home appointment coordination.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="shrink-0 px-4 py-2 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors"
                  >
                    Request Home Visit
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>MANDATORY DOCUMENTATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Paper Checklist for Jammu SRO Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ensure you carry all needed papers to avoid rejection or multiple visits to the SRO office in Jammu:
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-600">
                    Checklist Readiness: <strong className="text-slate-900">{checkedCount} of {checklist.length} verified</strong>
                  </span>
                  <span className="text-xs font-mono text-[#C65378] font-bold">
                    {Math.round((checkedCount / checklist.length) * 100)}% COMPLETE
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-emerald-50/40 border-emerald-200"
                          : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/70"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-[#C65378] focus:ring-[#C65378] cursor-pointer"
                      />
                      <div className="space-y-0.5 text-left">
                        <span
                          className={`text-xs sm:text-sm font-bold block ${
                            item.checked ? "text-emerald-950" : "text-slate-900"
                          }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: JAMMU PROPERTY TYPES */}
            <section id="jammu-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ESTATE ASSET INVENTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Jammu Asset Types: JDA Plots, JMC Houses &amp; Farmland
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Each asset class in Jammu entails distinct legal and city transfer rules upon estate:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-2 shadow-xs">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 block flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    JDA Plotted Colonies
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Gandhi Nagar, Trikuta Nagar, Roop Nagar, Bantalab, and Channi Himmat. Bequests must specify leasehold terms or freehold title, plot demarcations, and authorize the executor to remit transfer fees and file indemnity bonds with the JDA Vice Chairman.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-2 shadow-xs">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 block flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    JMC Freehold Houses &amp; Havelis
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Old Jammu City, Panjtirthi, Raghunath Bazaar, and Talab Tillo. Codifies division of multi-storey family homes, separate floor ownerships, staircase easements, and city asset tax name change with Jammu City City Board.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-2 shadow-xs">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 block flex items-center gap-2">
                    <Wheat className="w-4 h-4 text-[#C65378]" />
                    Farm &amp; Basmati Farmlands
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    RS Pura, Bishnah, Marh, and border farm belts. Wills must incorporate revenue Khasra numbers, Khewat/Khatauni identifiers, and comply with the J&amp;K Land Revenue Act to enable prompt Intiqal (name change) by the Halqa Patwari.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-2 shadow-xs">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 block flex items-center gap-2">
                    <Factory className="w-4 h-4 text-[#C65378]" />
                    Plant &amp; Financial Portfolios
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    SIDCO Bari Brahmana &amp; Gangyal plant factory leases, private limited shareholdings, J&amp;K Bank fixed deposits, bank lockers, mutual funds, and demat shares. Clear legacy bequests override conflicting nominee fights.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES */}
            <section id="jammu-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT GOVERNMENT TARIFFS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official NGDRS J&amp;K Filing Fees &amp; Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds, Will Wills in Jammu and Kashmir do not attract asset price check stamp duty. Here is the exact official government cost structure:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200">
                      <th className="p-3.5 font-extrabold">Fee Component</th>
                      <th className="p-3.5 font-extrabold">Official Jammu &amp; Kashmir Government Tariff</th>
                      <th className="p-3.5 font-extrabold">Applicable Legal Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Stamp Duty on Will</td>
                      <td className="p-3.5 font-extrabold text-emerald-800">₹0 (Completely Exempt)</td>
                      <td className="p-3.5 text-slate-600">Court Fees &amp; Stamp Act Schedule (No ad-valorem duty on Will instruments)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">NGDRS Filing Fee</td>
                      <td className="p-3.5 font-semibold text-slate-800">₹100 to ₹500 (Nominal Fixed Fee)</td>
                      <td className="p-3.5 text-slate-600">J&amp;K Filing Rules Table of Fees</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Scanning &amp; Portal Charges</td>
                      <td className="p-3.5 font-semibold text-slate-800">₹100 to ₹250 (Per Paper)</td>
                      <td className="p-3.5 text-slate-600">NGDRS J&amp;K digital archiving and biometric record capture charges</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Section 31 Doorstep Commission</td>
                      <td className="p-3.5 font-semibold text-slate-800">₹1,000 to ₹2,500 (Nominal Govt Fee)</td>
                      <td className="p-3.5 text-slate-600">Filing Act Section 31 special commission for home visit</td>
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in Jammu
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose from our lawyer-led Will drafting and filing packages tailored for Jammu families:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PACKAGE 1 */}
                <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      Standard Online
                    </span>
                    <div>
                      <span className="text-3xl font-extrabold text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-600 block mt-1">One-time transparent fee</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for people with straightforward home assets and bank deposits in Jammu.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer-drafted valid Indian Will</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>JDA &amp; JMC compliant clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Signing &amp; witness signing guide</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Digital delivery within 24 hours</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors block cursor-pointer"
                  >
                    Select Online Will
                  </a>
                </div>

                {/* PACKAGE 2 (FEATURED) */}
                <div className="rounded-3xl border-2 border-[#C65378] bg-white p-6 space-y-5 shadow-lg relative flex flex-col justify-between">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    MOST POPULAR IN JAMMU
                  </div>

                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378]">
                      Lawyer Talk
                    </span>
                    <div>
                      <span className="text-3xl font-extrabold text-slate-900">₹4,990</span>
                      <span className="text-xs text-slate-600 block mt-1">Full estate review</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recommended for estates with multiple assets, JDA plots, farm farmland, and business shares.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 High Court lawyer talk</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>JDA leasehold &amp; RS Pura land clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Customized doctor paper format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Fight prevention clauses &amp; minor trusts</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-[#C65378] text-white font-bold text-xs text-center hover:bg-[#a13c5d] transition-colors block cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Select Lawyer Talk
                  </a>
                </div>

                {/* PACKAGE 3 */}
                <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      End-to-End Filing
                    </span>
                    <div>
                      <span className="text-3xl font-extrabold text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-600 block mt-1">Complete SRO / Doorstep Support</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete end-to-end service including NGDRS token booking, SRO accompaniment, or Section 31 doorstep visit.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Full senior lawyer drafting &amp; review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>NGDRS J&amp;K online token &amp; fee booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer accompaniment at Jammu SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 home commission coordination</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors block cursor-pointer"
                  >
                    Select Full Filing
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
                  12. Frequently Asked Questions: Will Drafting in Jammu
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear, authoritative answers to common legal questions regarding Will drafting and asset filing in Jammu:
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Citations &amp; Jammu Legal Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols comply strictly with codified Indian statutes and Jammu filing systems:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 61, 63, and Section 213(2) (Non-Presidency Town Probate Exemption).
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
                    J&amp;K Land Revenue Act
                  </span>
                  <p className="text-xs text-slate-600">
                    Samvat 1996 and amendments for farm land name change (Intiqal) by Halqa Patwari.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    NGDRS J&amp;K Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official filing appointment portal: <code>ngdrs.jk.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Jammu Assets &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Jammu plots, houses, or Basmati farmlands to office gridlock and fights. Draft a legally binding Will online today or consult our senior High Court lawyers.
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
                Visual Blueprint: Jammu Will Drafting &amp; Asset Estate Framework
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
                src="/images/will-drafting-in-jammu.jpg"
                alt="High Resolution Visual Blueprint: Jammu Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Jammu NGDRS Filed &amp; JDA Name Change Compliant</span>
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
