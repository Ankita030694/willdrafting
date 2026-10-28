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
  { id: "rajasthan-overview", label: "OVERVIEW" },
  { id: "rajasthan-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "rajasthan-probate-rules", label: "PROBATE RULES" },
  { id: "rajasthan-sro-directory", label: "SRO DIRECTORY" },
  { id: "rajasthan-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-rajasthan-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "rajasthan-property-types", label: "PROPERTY TYPES" },
  { id: "rajasthan-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const RAJASTHAN_REGIONS = [
  {
    id: "jaipur-hub",
    name: "Jaipur Metropolitan & JDA Zone",
    sro: "SRO Jaipur 1, 2, 3, 4, 5, 6 & 7 (Collectorate & JDA Circles)",
    address: "District Collectorate Complex, Bani Park & JDA Single Window Complex, JLN Marg, Jaipur - 302016",
    areas: "Vaishali Nagar, Malviya Nagar, Mansarovar, C-Scheme, Civil Lines, Jagatpura, Vidhyadhar Nagar, Bani Park, Raja Park, Tonk Road, Ajmer Road",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "jodhpur-marwar",
    name: "Jodhpur & Marwar Division",
    sro: "SRO Jodhpur 1 & 2 (High Court Principal Seat Zone)",
    address: "Collectorate Administrative Building, Near High Court Circle, Paota, Jodhpur - 342001",
    areas: "Shastri Nagar, Sardarpura, Ratanada, Paota, Mandore Road, Pal Road, Basni Industrial Area, Chopasni Housing Board, Circuit House Road",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "udaipur-mewar",
    name: "Udaipur & Mewar Belt",
    sro: "SRO Udaipur 1 & 2 (UIT / UDA Complex)",
    address: "Collectorate Compound & UIT Administrative Building, Saheli Marg, Udaipur - 313001",
    areas: "Panchwati, Fatehpura, Hiran Magri (Sectors 3 to 14), Sukher, Shobhagpura, Madhuban, New Bhupalpura, Goverdhan Vilas, Bhuwana",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "kota-hadoti",
    name: "Kota & Hadoti Division",
    sro: "SRO Kota 1 & 2 (KDA / CAD Circle)",
    address: "Mini Secretariat Complex, CAD Circle, Rawatbhata Road, Kota - 324009",
    areas: "Vigyan Nagar, Talwandi, Mahaveer Nagar (Phases 1-3), Kunhari, Dadabari, Chawani, Gumanpura, Rangbari, Indra Vihar, Landmark City",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "ajmer-pushkar",
    name: "Ajmer & Central Rajasthan",
    sro: "SRO Ajmer 1 & 2 (ADA Authority Zone)",
    address: "District Collectorate Complex, Civil Lines, Near Railway Station, Ajmer - 305001",
    areas: "Civil Lines, Vaishali Nagar Ajmer, Panchsheel Nagar, Adarsh Nagar, Makarwali Road, JLN Hospital Area, Pushkar Road, Anasagar Circular",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "bikaner-desert",
    name: "Bikaner & Northern Desert Circle",
    sro: "SRO Bikaner 1 & 2 (UIT Bikaner Circle)",
    address: "Collectorate Administrative Complex, Near Kote Gate, Bikaner - 334001",
    areas: "Kanta Khaturia Colony, Sadul Ganj, Jai Narayan Vyas Colony, Rani Bazar, Lalgarh, Sadul Colony, Nokha Road, Pavanpuri",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "alwar-bhiwadi",
    name: "Alwar & NCR-Bhiwadi Industrial Corridor",
    sro: "SRO Alwar 1 & 2, SRO Bhiwadi & Neemrana",
    address: "Mini Secretariat, Alwar - 301001 / RIICO Administrative Complex, Bhiwadi - 301019",
    areas: "Alwar Scheme 1 to 8, Manu Marg, Bhiwadi Industrial Area, Neemrana Japanese Zone, Tapukara, Tijara, Behror, Shahjahanpur",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
  {
    id: "bhilwara-shekhawati",
    name: "Bhilwara, Sikar & Shekhawati Zone",
    sro: "SRO Bhilwara & SRO Sikar (Collectorate Buildings)",
    address: "Collectorate Compound, Bhilwara - 311001 / Court Campus, Sikar - 332001",
    areas: "Bhilwara Subhash Nagar, Shastri Nagar Bhilwara, Textile City RIICO, Sikar Fatehpur Road, Radhakishanpura, Jhunjhunu, Churu Heritage Havelis",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, official state holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Under the Rajasthan Stamp Act, 1998, stamp paper is zero rupees.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Testator",
    detail: "Mandatory for biometric thumbprint authentication and live photo capture on the ePanjiyan Rajasthan portal.",
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
    detail: "Issued by a registered MBBS practitioner certifying sound testamentary capacity to eliminate cognitive dispute claims.",
    checked: false,
  },
  {
    id: "item-5",
    label: "ePanjiyan Rajasthan Appointment Slip & e-GRAS Challan",
    detail: "Official appointment confirmation downloaded from epanjiyan.rajasthan.gov.in with paid ₹100 registration fee challan.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Property Chain Documents (JDA / UIT Patta / Apna Khata)",
    detail: "Copies of registered lease deeds, JDA/UIT allotment letters, registry deeds, or Apna Khata Jamabandi land records.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Recent Color Passport Photos Each",
    detail: "Clear passport photographs of the testator and both attesting witnesses to paste into Sub-Registrar Book III registers.",
    checked: false,
  },
];

export default function RajasthanLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("rajasthan-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("jaipur-hub");
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

  const filteredRegions = RAJASTHAN_REGIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeRegionData =
    RAJASTHAN_REGIONS.find((d) => d.id === selectedRegion) || RAJASTHAN_REGIONS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (PUNE THEME)
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
                <span>RAJASTHAN STATE ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 58 characters (30-65 chars target) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Rajasthan: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your JDA and UIT plots, ancestral Havelis, Apna Khata agricultural land, mutual funds, and demat assets.
                Get advocate drafting, ePanjiyan portal registration support, and doorstep execution for senior citizens across Rajasthan.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Rajasthan Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#rajasthan-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Rajasthan SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Rajasthan HC Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Rajasthan Stamp Duty</span>
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
                  src="/images/will-drafting-in-rajasthan.jpg"
                  alt="Online Will Drafting and Property Succession in Rajasthan"
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
                33+ Districts
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Statewide SRO Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Rajasthan Stamp Act
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Non-Compulsory
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Probate in Rajasthan
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
            <section id="rajasthan-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>RAJASTHAN ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Rajasthan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional SRO Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Registering a Will is optional under Section 18(e) of the Registration Act, 1908. A handwritten or typed Will on plain paper is legally valid if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Rajasthan is a non-presidency state under Section 213 of the Indian Succession Act. Beneficiaries inherit real estate without obtaining costly court probate decrees unless contested.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>₹0 Rajasthan Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills carry zero stamp duty across Rajasthan under the Rajasthan Stamp Act, 1998. Testators pay only a flat one hundred rupee fee plus nominal scanning charges at local Sub-Registrars.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Fast JDA &amp; Apna Khata Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will expedites leasehold and patta transfers across JDA and UITs, alongside smooth Jamabandi land revenue mutation (Namantran) on the Apna Khata portal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="rajasthan-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Succession Laws Across Rajasthan
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Making a Will in Rajasthan is regulated by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Rajasthan Land Revenue Act, 1956</strong>.
                  Any individual of sound mind who has attained 18 years of age can make a Will to distribute self-acquired real estate, bank deposits, mutual funds, and business holdings.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Rajasthan presents unique estate structures.
                  Families hold historic ancestral Havelis in Jaipur and Shekhawati, JDA residential plots, agricultural farmland recorded in Apna Khata Jamabandis, and modern industrial units in Bhiwadi.
                  Under Section 30 of the Hindu Succession Act, 1956, a testator can lawfully bequeath their individual undivided Mitakshara coparcenary interest alongside self-acquired assets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be at least 18 years of age and in sound mental mind (Section 59).
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
                  2. Will Registration in Rajasthan: Rules &amp; Legal Value
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is <strong>optional</strong>.
                  A Will written on plain white paper is legally enforceable across Indian courts if attested by two independent witnesses.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, registering your Will at a Rajasthan Sub-Registrar Office provides undeniable evidentiary advantages.
                  The document is preserved in government Book III registers, preventing claims of forgery or unlawful suppression:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Factor</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Rajasthan SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Archival</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III archives of Rajasthan Registration &amp; Stamps Dept</td>
                      <td className="p-4 bg-slate-50/20">Held in private custody; exposed to physical loss, damage, or concealment</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Protection Against Forgery Claims</td>
                      <td className="p-4 bg-rose-50/20">Extremely high. Biometric thumbprints and digital photos recorded in ePanjiyan</td>
                      <td className="p-4 bg-slate-50/20">Lower. Disgruntled legal heirs often allege forged signatures or undue influence</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">JDA &amp; UIT Plot Transfer</td>
                      <td className="p-4 bg-rose-50/20">Accepted directly for leasehold patta transfer and municipal mutation</td>
                      <td className="p-4 bg-slate-50/20">Authorities may demand civil court succession certificates or family indemnity bonds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Apna Khata Land Mutation</td>
                      <td className="p-4 bg-rose-50/20">Expedites Patwari and Tehsildar Namantran in Jamabandi revenue records</td>
                      <td className="p-4 bg-slate-50/20">Revenue officials often require prolonged family hearings and consensus affidavits</td>
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

            {/* SECTION 3: PROBATE RULES FOR RAJASTHAN */}
            <section id="rajasthan-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JURISDICTION RULES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Is Probate Mandatory for Properties in Rajasthan?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Probate is a court certification issued by a competent civil court establishing the validity of a Will.
                  It confers official legal authority upon the designated executor to administer the estate.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 213(2) read with Section 57 of the Indian Succession Act, 1925</strong>, probate is compulsory only for Wills executed within Mumbai, Kolkata, and Chennai, or where immovable property falls within those historical presidency boundaries.
                  <strong> Rajasthan is a non-presidency state.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Rajasthan Legal Exemption
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Probate Non-Compulsory Across Rajasthan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Rajasthan High Court (Principal Seat at Jodhpur and Bench at Jaipur) has consistently affirmed that for Hindu, Sikh, Jain, and Buddhist Wills in Rajasthan, court probate is not mandatory to claim ownership over local real estate or bank balances.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Saves years of civil court delays and expensive ad-valorem fees</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    When Court Intervention Arises
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When Court Probate or Succession Advice Arises
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    While probate is non-compulsory in Rajasthan, families may file for probate or Letters of Administration if an estranged legal heir files a partition suit, or if nationalized banks demand court confirmation for large intestate balances.
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
                    Do you also hold property in Mumbai, Kolkata, or Chennai?
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    If your Rajasthan Will bequeaths real estate situated in historical presidency limits, High Court probate rules may apply to those specific properties.
                  </p>
                </div>
                <Link
                  href="/tools/probate-checker"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                >
                  <span>Check Probate Applicability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="rajasthan-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Rajasthan Sub-Registrar Offices &amp; ePanjiyan Circles
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration across Rajasthan is administered by the Registration and Stamps Department, Government of Rajasthan.
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
                      placeholder="Search locality or city (e.g. Jaipur, Jodhpur, Udaipur)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredRegions.length} of {RAJASTHAN_REGIONS.length} Key Rajasthan Jurisdictions
                  </span>
                </div>

                {/* REGION PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {RAJASTHAN_REGIONS.map((region) => {
                    const isSelected = selectedRegion === region.id;
                    return (
                      <button
                        key={region.id}
                        type="button"
                        onClick={() => setSelectedRegion(region.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {region.name}
                      </button>
                    );
                  })}
                </div>

                {/* SELECTED JURISDICTION DISPLAY */}
                <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                        JURISDICTION &amp; SUB-REGISTRAR CIRCLE
                      </span>
                      <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">
                        {activeRegionData.sro}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold w-fit">
                      <Check className="w-3 h-3" /> Book III Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Complex Address:</span>
                      <p className="text-slate-600 leading-relaxed">{activeRegionData.address}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours &amp; Public Window:</span>
                      <p className="text-slate-600 leading-relaxed">{activeRegionData.timings}</p>
                    </div>

                    <div className="md:col-span-2 space-y-1 pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-900 block">Neighborhoods &amp; Tehsils Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeRegionData.areas}</p>
                    </div>
                  </div>
                </div>

                {/* EPANJIYAN PORTAL BOOKING NOTE */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      Registration slots must be pre-booked online via the ePanjiyan Rajasthan portal before visiting the SRO.
                    </span>
                  </div>
                  <a
                    href="https://epanjiyan.rajasthan.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-900 underline hover:text-amber-950 shrink-0 ml-2"
                  >
                    ePanjiyan Portal &rarr;
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES */}
            <section id="rajasthan-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; SRO HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities &amp; District Will Drafting Services
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in Jaipur, Jodhpur, Udaipur, or Kota</strong>? Our senior estate planning advocates provide comprehensive legal drafting, ePanjiyan Rajasthan portal slot scheduling, and Sub-Registrar accompaniment tailored to the specific property dynamics across Rajasthan:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: JAIPUR & JDA URBAN ZONE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        State Capital &amp; JDA Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jaipur 1 to 7 (Collectorate)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Jaipur &amp; JDA Urban Zone
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vaishali Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Malviya Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mansarovar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">C-Scheme &amp; Civil Lines</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jagatpura</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Jaipur</strong> for JDA leasehold and freehold plots, multistory society apartments, ancestral Havelis, and demat portfolios, preventing costly legal battles among family members.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate, Bani Park &amp; JDA Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        ePanjiyan Rajasthan token scheduling, advocate representation, and Section 31 home visits for senior citizens across Jaipur.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jaipur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Jaipur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: JODHPUR & MARWAR DIVISION */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Judicial Seat &amp; Marwar Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jodhpur 1 &amp; 2 (Paota)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Jodhpur &amp; Marwar Region
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shastri Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sardarpura</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ratanada</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Paota &amp; Mandore</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pal Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Jodhpur</strong> under the direct jurisdiction of the Rajasthan High Court Principal Seat. Protects joint Mitakshara coparcenary interests, handicraft export units, and stone quarry assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Compound, Near High Court, Paota</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Jodhpur Development Authority patta transfer assistance, ePanjiyan fee payment, and seamless Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jodhpur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Jodhpur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: UDAIPUR & MEWAR BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Mewar Heritage &amp; Mineral Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Udaipur 1 &amp; 2 (Saheli Marg)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Udaipur &amp; Mewar Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panchwati</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fatehpura</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hiran Magri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sukher &amp; Bhuwana</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shobhagpura</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom <strong>Will drafting services in Udaipur</strong> for heritage hotels, marble processing leases, UIT residential plots, and tourism enterprises, ensuring conflict-free intergenerational succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: UIT Complex, Saheli Marg, Udaipur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        UIT Udaipur mutation coordination, NRI inheritance structuring, and local Sub-Registrar execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
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

                {/* CITY 4: KOTA & HADOTI INDUSTRIAL/EDUCATION BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Hadoti Education &amp; Commercial Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kota 1 &amp; 2 (CAD Circle)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kota &amp; Hadoti Region
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vigyan Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Talwandi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mahaveer Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kunhari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dadabari</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Kota</strong> for student hostel commercial properties, coaching infrastructure, KDA residential plots, and agricultural land along the Chambal river basin.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariat Complex, CAD Circle, Kota</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        KDA property mutation advisory, hostel commercial asset protection, and doorstep registration for seniors.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kota"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kota Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: AJMER & PUSHKAR URBAN ZONE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central Rajasthan Cultural Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ajmer 1 &amp; 2 (Civil Lines)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ajmer &amp; Pushkar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines Ajmer</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vaishali Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panchsheel Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Adarsh Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pushkar Bypass</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Trusted <strong>Will drafting services in Ajmer</strong> and Pushkar for residential freeholds, ADA development plots, institutional trusts, and ancestral commercial shops around the historic bazaars.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate Complex, Civil Lines, Ajmer</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Ajmer Development Authority single-window support and ePanjiyan Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ajmer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ajmer Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: BIKANER & NORTHERN DESERT BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Northern Heritage &amp; Agro Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bikaner 1 &amp; 2 (Kote Gate)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bikaner &amp; Thar Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanta Khaturia Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sadul Ganj</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">JNV Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rani Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pavanpuri</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Bikaner</strong> for heritage ancestral Havelis, Indira Gandhi Canal irrigated agricultural land, ceramic industries, and confectionery business assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Administrative Complex, Bikaner</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        UIT Bikaner land mutation verification and fast-track Book III registration assistance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bikaner"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bikaner Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: ALWAR & BHIWADI NCR INDUSTRIAL CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        NCR-Rajasthan Manufacturing Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bhiwadi, Neemrana &amp; Alwar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Alwar, Bhiwadi &amp; Neemrana
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhiwadi Industrial Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Neemrana Japanese Zone</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alwar Schemes 1-8</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tapukara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tijara</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Bhiwadi</strong> and Neemrana tailored for factory promoters, MSME manufacturing units, RIICO industrial plots, and modern NCR residential apartments.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariat Alwar &amp; RIICO Complex Bhiwadi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        RIICO plot transfer structuring, partnership succession clauses, and prompt SRO execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bhiwadi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bhiwadi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: BHILWARA & SIKAR SHEKHAWATI BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Textile Capital &amp; Shekhawati Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bhilwara &amp; SRO Sikar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bhilwara &amp; Sikar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhilwara Subhash Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shastri Nagar Bhilwara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">RIICO Textile Hub</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sikar Fatehpur Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shekhawati Havelis</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Bhilwara</strong> and Sikar for textile weaving mills, trading businesses, ancestral Shekhawati frescoes and Havelis, alongside agricultural farms in Apna Khata.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate Compounds, Bhilwara &amp; Sikar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep registration under Section 31 for elderly family heads and business succession advice.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bhilwara"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bhilwara Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-rajasthan-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP SOP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Will Drafting to Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified standard operating procedure to prepare, execute, and optionally register your Will in Rajasthan:
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
                      Compile a comprehensive inventory of your real estate and financial assets in Rajasthan. Include JDA and UIT plot lease deeds, Apna Khata Khasra and Jamabandi details, bank accounts, and demat accounts. Appoint a trustworthy executor to administer the estate.
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
                      Work with our specialized succession lawyers to structure customized clauses. Clearly distinguish between self-acquired properties and individual undivided shares in Mitakshara coparcenary property, and include explicit revocation and residual bequest clauses.
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
                      Print the Will on plain A4 paper. Sign or place your thumb impression on each page in the continuous presence of two independent adult witnesses. Both witnesses then sign and record their complete names, residential addresses, and Aadhaar numbers.
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
                      Book ePanjiyan Rajasthan Appointment Online
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log in to the ePanjiyan Rajasthan portal (epanjiyan.rajasthan.gov.in) and navigate to the online appointment booking section. Select your designated district Sub-Registrar circle, input party details, pay the nominal ₹100 registration fee through e-GRAS, and print the appointment receipt.
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
                      Complete Biometric Verification at Rajasthan SRO
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar office during your allotted slot with both attesting witnesses, original Aadhaar cards, and passport photos. The Sub-Registrar records biometric fingerprints and digital webcam photos, registers the Will into official Book III records, and returns the original document.
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
                  7. Section 31 Doorstep SRO Registration in Rajasthan
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visiting government registration offices can be difficult for senior citizens, ailing individuals, or persons with mobility constraints.
                  <strong> Section 31 of the Registration Act, 1908</strong> authorizes the Sub-Registrar to visit the testator&apos;s residence or hospital in special cases.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <h3 className="text-lg font-bold text-slate-900">
                  How Home Registration Operates Across Rajasthan:
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Doctor Fitness Certificate</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered MBBS practitioner examines the testator and issues a medical certificate stating they possess sound mental capacity but are physically unable to travel.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">SRO Commission Application</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our legal team files a formal Section 31 petition before the local Rajasthan Sub-Registrar along with the doctor&apos;s certificate and pays the official government commission visit fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Officer Home Visit</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar attends your residence or hospital room with portable biometric equipment, verifies witnesses, records fingerprints, and registers the Will into Book III records.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center gap-3 text-xs text-rose-950">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>
                    Our Rajasthan legal associates provide full assistance with medical certificate formats, petition drafting, and SRO appointment scheduling.
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
                  8. Mandatory Document Checklist for Rajasthan Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Keep these verified records ready before executing and registering your Will in Rajasthan:
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
            <section id="rajasthan-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Estate Asset Distribution: JDA, UIT &amp; Apna Khata
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A legally robust Will must accurately address the distinct categories of immovable and movable assets situated across Rajasthan:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ASSET 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    JDA &amp; UIT Leasehold and Freehold Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Plots allotted by the Jaipur Development Authority (JDA) or Urban Improvement Trusts (UITs in Jodhpur, Udaipur, Kota, Ajmer) under 99-year leases require unambiguous testamentary devolution. A registered Will facilitates direct name substitution in development authority registers without civil court intervention.
                  </p>
                </div>

                {/* ASSET 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Agricultural Land &amp; Apna Khata Mutation (Namantran)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Agricultural land recorded on the Apna Khata portal requires mutation (Namantran) in the Jamabandi under the Rajasthan Land Revenue Act, 1956. A registered Will accompanied by a death certificate allows the local Patwari and Tehsildar to update revenue records smoothly.
                  </p>
                </div>

                {/* ASSET 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Ancestral Havelis &amp; Mitakshara Coparcenary Interests
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Mitakshara coparcenary law prevalent across Rajasthan, ancestral Havelis belong collectively to all coparceners. While the whole estate cannot be willed away unilaterally, Section 30 of the Hindu Succession Act, 1956 permits the testator to bequeath their individual undivided coparcenary share.
                  </p>
                </div>

                {/* ASSET 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Financial Securities, Mutual Funds &amp; Bank Deposits
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Bank accounts, fixed deposits, demat shares, and gold jewellery must be clearly bequeathed. Under Indian law, bank nominees serve solely as fiduciary trustees for the beneficiaries designated in the Will. A precise Will ensures immediate transmission without inter-family conflict.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & STAMP DUTY */}
            <section id="rajasthan-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Registration Charges &amp; Zero Stamp Duty in Rajasthan
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds that attract significant stamp duty across Rajasthan, Will registration is exempt from property valuation tax:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-[#C65378]">₹0</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Rajasthan Stamp Duty</h4>
                  <p className="text-[11px] text-slate-500">100% exempt under the Rajasthan Stamp Act, 1998</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">₹100</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">SRO Registration Fee</h4>
                  <p className="text-[11px] text-slate-500">Fixed statutory government fee paid via e-GRAS challan</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">₹100 - ₹200</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">CSI &amp; Scanning Fee</h4>
                  <p className="text-[11px] text-slate-500">Nominal computer scanning charges for official Book III archives</p>
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
                  11. Transparent Pricing: Rajasthan Will Making Plans
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the level of professional estate planning support tailored to your family&apos;s assets across Rajasthan:
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
                      Ideal for individuals with straightforward assets such as a single residential plot, bank deposits, and mutual funds.
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
                      Recommended for families with multiple JDA/UIT plots, Apna Khata agricultural land, or ancestral coparcenary properties.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Advocate Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Mitakshara &amp; coparcenary share clarity</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor certificate format included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Unlimited revisions until final approval</span>
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
                      Full turnkey service including ePanjiyan portal token booking, fee challan generation, and doorstep registration.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete lawyer drafting &amp; review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>ePanjiyan portal token management</span>
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
                  Frequently Asked Questions: Will Drafting in Rajasthan
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key succession, registration, and property transfer questions for Rajasthan residents:
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
                  12. Statutory Citations &amp; Legal Precedents in Rajasthan
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
                    Governs sound testamentary capacity, voluntary consent, two-witness execution, and specifies that court probate is non-mandatory outside historical presidency limits.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Registration Act, 1908 (Sections 18(e), 31, 32, 51):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Establishes that Will registration is optional, authorizes Section 31 home visits for infirm or senior testators, and mandates permanent custody in Book III archives.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Rajasthan Stamp Act, 1998:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Grants complete exemption from ad-valorem stamp duty for Wills executed and presented for registration across the State of Rajasthan.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Rajasthan Land Revenue Act, 1956 &amp; Apna Khata Rules:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Regulates succession mutation (Namantran) for agricultural and rural land holdings in village Jamabandis based on registered or attested testamentary bequests.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Rajasthan High Court Judgments on Non-Presidency Probate:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Multiple Rajasthan High Court rulings affirm that for properties situated in Jaipur, Jodhpur, and across Rajasthan, a beneficiary can establish ownership rights without obtaining formal court probate decrees.
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
                Visual Blueprint: Rajasthan Will Drafting &amp; SRO Registration Architecture
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
                src="/images/will-drafting-in-rajasthan.jpg"
                alt="High Resolution Visual Blueprint: Rajasthan Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
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
            Rajasthan Will Services
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
