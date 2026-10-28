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
  { id: "pune-overview", label: "OVERVIEW" },
  { id: "pune-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "pune-probate-rules", label: "PROBATE RULES" },
  { id: "pune-sro-directory", label: "SRO DIRECTORY" },
  { id: "pune-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-pune-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "pune-property-types", label: "PROPERTY TYPES" },
  { id: "pune-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const PUNE_DISTRICTS = [
  {
    id: "haveli-core",
    name: "Central Pune & Haveli Core",
    sro: "SRO Haveli 1, 2, 3, 4 & 5 (Central Building)",
    address: "Photozinco Press Compound, Near Central Building & Pune Railway Station, Pune - 411001",
    areas: "Shivaji Nagar, Deccan Gymkhana, FC Road, Model Colony, Sadashiv Peth, Narayan Peth, Shaniwar Peth, Camp, MG Road, Bund Garden",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "kothrud-west",
    name: "Kothrud, Karve Nagar & West Pune",
    sro: "SRO Haveli 17 & 21 (Kothrud / Paud Road)",
    address: "Tehsil Administrative Complex, Near Kothrud Bus Stand, Paud Road, Pune - 411038",
    areas: "Kothrud, Karve Nagar, Erandwane, Warje, Bavdhan, Paud Road, Mayur Colony, Dahanukar Colony, Ideal Colony, Cummins College Area",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "baner-aundh",
    name: "Baner, Balewadi, Aundh & Pashan",
    sro: "SRO Haveli 8 & 9 (Aundh / Shivaji Nagar Zone)",
    address: "Government Administrative Complex, Near Bremen Square, Aundh, Pune - 411007",
    areas: "Baner, Balewadi High Street, Aundh, Pashan, Sus Road, Someshwarwadi, University Road, Range Hills, Mahalunge",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "hinjewadi-pc-west",
    name: "Hinjewadi IT Belt & Wakad Corridor",
    sro: "SRO Hinjewadi / Paud & PCMC West Sub-District",
    address: "MIDC Administrative Complex, Hinjewadi Phase 1 / Paud Office, Pune - 411057",
    areas: "Hinjewadi (Phases 1, 2, 3), Wakad, Tathawade, Punawale, Marunji, Maan, Ravet, Kiwale, Dange Chowk",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "pcmc-industrial",
    name: "Pimpri-Chinchwad & PCMC Belt",
    sro: "SRO Haveli 16, 18 & 20 (Pimpri & Akurdi)",
    address: "PCMC Sub-Divisional Office, Near Morwadi Court & Akurdi Pradhikaran, Pune - 411018",
    areas: "Pimpri, Chinchwad, Akurdi, Nigdi Pradhikaran, Bhosari, Thergaon, Pimple Saudagar, Pimple Nilakh, Rahatani, Sangvi",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "hadapsar-east",
    name: "Hadapsar, Magarpatta & Solapur Road",
    sro: "SRO Haveli 14 & 24 (Hadapsar)",
    address: "Administrative Office Complex, Solapur Road, Near Gadital Chowk, Hadapsar, Pune - 411028",
    areas: "Hadapsar, Magarpatta Cybercity, Amanora Park Town, Mundhwa, Manjri, Handewadi, Saswad Road, Fursungi, Phursungi",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "kharadi-viman-nagar",
    name: "Kharadi, Viman Nagar & Nagar Road",
    sro: "SRO Haveli 6 & 23 (Vadgaon Sheri / Yerwada)",
    address: "Yerwada Registry Office Complex, Off Nagar Road, Near Gunjan Talkies, Pune - 411006",
    areas: "Kharadi (EON Free Zone), Viman Nagar, Kalyani Nagar, Wadgaon Sheri, Yerwada, Dhanori, Lohegaon, Tingre Nagar, Wagholi",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "bibwewadi-south",
    name: "Bibwewadi, Swargate & Sinhagad Road",
    sro: "SRO Haveli 12 & 15 (Bibwewadi / Market Yard)",
    address: "Market Yard Commercial Building, Gultekdi SRO Office, Pune - 411037",
    areas: "Bibwewadi, Sahakar Nagar, Dhankawadi, Katraj, Sinhagad Road (Vadgaon Budruk, Anand Nagar), Market Yard, Salisbury Park, Mukund Nagar, Ambegaon",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Under Article 64 of the Maharashtra Stamp Act, stamp paper is zero rupees.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Testator",
    detail: "Required for biometric thumbprint scanning and live webcam photo capture on the IGR Maharashtra SARITA system.",
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
    label: "IGR Maharashtra Sarita / e-Stepin Appointment Slip",
    detail: "Official appointment confirmation downloaded from igrmaharashtra.gov.in with selected SRO time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Property Chain Documents (PMC / PCMC / Society Share)",
    detail: "Copies of registered sale deeds, Index-II, latest PMC/PCMC property tax receipts, or cooperative society share certificates.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Recent Color Passport Photos Each",
    detail: "Clear passport photographs for the testator and both attesting witnesses to paste into SRO Book III registers.",
    checked: false,
  },
];

export default function PuneLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("pune-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("haveli-core");
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

  const filteredDistricts = PUNE_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    PUNE_DISTRICTS.find((d) => d.id === selectedDistrict) || PUNE_DISTRICTS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI / MUMBAI THEME)
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
                <span>PUNE &amp; PCMC ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 53 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Pune: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your PMC and PCMC apartments, bungalow plots, mutual funds, and tech equity.
                Get advocate drafting, IGR Maharashtra Sarita registration assistance, and doorstep execution for senior citizens across Pune.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Pune Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#pune-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Pune SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bombay HC Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Maharashtra Stamp Duty</span>
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
                  src="/images/will-drafting-in-pune.jpg"
                  alt="Online Will Drafting and Registration Services in Pune"
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
                27 SRO Offices
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Pune &amp; Haveli Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Article 64 Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Non-Compulsory
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Probate Outside Mumbai
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
            <section id="pune-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>PUNE &amp; PCMC SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Pune
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional SRO Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Registering a Will is optional under Section 18(e) of the Registration Act, 1908. A handwritten or typed Will on white paper is legally binding if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Unlike Greater Mumbai, court probate is non-compulsory in Pune under Section 213 of the Indian Succession Act. Beneficiaries inherit without expensive court petitions unless challenged.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>₹0 Maharashtra Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills carry zero stamp duty under Article 64 of the Maharashtra Stamp Act. At Pune Sub-Registrar offices, testators pay only a flat one hundred rupee fee plus scanning costs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Fast PMC &amp; PCMC Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will expedites property tax name transfer (Varasdar Nond) across PMC and PCMC, as well as cooperative housing society share certificate transfers.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="pune-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Succession Laws in Pune
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Writing a Will in Pune is governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Maharashtra Co-operative Societies Act, 1960</strong>.
                  Any adult of sound mind who is at least 18 years old can make a Will to transfer self-acquired real estate, bank deposits, mutual funds, and business shares.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Pune possesses a diverse estate landscape.
                  Families hold ancestral wadas in the Peths, independent bungalows in Kothrud, high-rise society apartments in Baner or Wakad, and tech stock options in Hinjewadi.
                  A well-structured Will ensures that your life savings reach your intended family members without court disputes.
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
                  2. Will Registration in Pune: Rules &amp; Legal Value
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is <strong>optional</strong>.
                  A Will written on plain A4 paper is fully valid in Indian courts if properly executed and attested by two witnesses.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, registering your Will at a Pune Sub-Registrar Office provides vital legal advantages.
                  The document is preserved in government Book III registers, which stops false claims of forgery or tampering:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Factor</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Pune SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Archival</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III archives of Maharashtra Registration Department</td>
                      <td className="p-4 bg-slate-50/20">Held in private custody; exposed to physical damage, loss, or intentional concealment</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Protection Against Forgery Claims</td>
                      <td className="p-4 bg-rose-50/20">Extremely high. Biometric thumbprints and digital photos recorded in SARITA</td>
                      <td className="p-4 bg-slate-50/20">Lower. Disgruntled legal heirs often allege forged signatures or coercion</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">PMC &amp; PCMC Mutation</td>
                      <td className="p-4 bg-rose-50/20">Accepted smoothly for property tax name change and city survey updates</td>
                      <td className="p-4 bg-slate-50/20">Municipal officers may require supplementary affidavits, NOCs, or legal heir bonds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Cooperative Society Transfer</td>
                      <td className="p-4 bg-rose-50/20">Simplifies share certificate transfer under MCS Model Bye-Law 30</td>
                      <td className="p-4 bg-slate-50/20">Managing committees frequently ask for indemnity bonds and family consensus</td>
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

            {/* SECTION 3: PROBATE RULES FOR PUNE */}
            <section id="pune-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JURISDICTION RULES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Is Probate Mandatory for Properties in Pune?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Probate is a court decree issued by a competent court certifying the legal validity of a Will.
                  It confers official authority on the appointed executor to administer the deceased testator&apos;s estate.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 213(2) read with Section 57(a) and (b) of the Indian Succession Act, 1925</strong>, probate is mandatory only for Wills made within the historical presidency towns of Mumbai, Kolkata, and Chennai, or where immovable property is situated within those presidency limits.
                  <strong> Pune is not a presidency town.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Pune Legal Exemption
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Probate Non-Compulsory in Pune
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Bombay High Court has consistently held that for Hindu, Sikh, Jain, and Buddhist Wills executed in Pune, obtaining court probate is not mandatory to establish ownership rights over local real estate or financial assets.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Saves months of litigation and high court fees</span>
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
                    While probate is non-compulsory in Pune, families may still seek probate or Letters of Administration if an estranged legal heir disputes the Will in the Pune District Court, or if institutional financial bodies insist on court confirmation.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>A registered Will drastically minimizes any dispute risks</span>
                  </div>
                </div>
              </div>

              {/* HELPFUL TOOL CALLOUT */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Do you also hold ancestral property or flats in Mumbai?
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    If your Pune Will covers assets situated within Greater Mumbai, Bombay High Court probate rules may apply to those specific properties.
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
            <section id="pune-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Pune Sub-Registrar Offices &amp; SRO Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration across Pune and Pimpri-Chinchwad is supervised by the Department of Registration and Stamps (IGR Maharashtra).
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
                      placeholder="Search locality (e.g. Kothrud, Baner, Wakad)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {PUNE_DISTRICTS.length} Key Pune Jurisdictions
                  </span>
                </div>

                {/* DISTRICT PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {PUNE_DISTRICTS.map((district) => {
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

                {/* SARITA PORTAL BOOKING NOTE */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      Registration slots must be pre-booked online via the IGR Maharashtra SARITA / e-Stepin portal before visiting the SRO.
                    </span>
                  </div>
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-900 underline hover:text-amber-950 shrink-0 ml-2"
                  >
                    IGR Portal &rarr;
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5: LOCAL AREA COVERAGE */}
            <section id="pune-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Pune Localities
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in Hinjewadi, Kothrud, Baner, or Kharadi</strong>? Our senior estate planning advocates provide end-to-end legal drafting, IGR Maharashtra Sarita portal slot booking, and Sub-Registrar accompaniment tailored to the specific property dynamics of Pune and Pimpri-Chinchwad:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: KOTHRUD, KARVE NAGAR & ERANDWANE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Prime Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Haveli 17 &amp; 21 (Kothrud)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kothrud, Karve Nagar &amp; Erandwane
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mayur Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ideal Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Erandwane Wadas</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dahanukar Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cummins College Area</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Kothrud</strong>, Karve Nagar, and Erandwane for ancestral wadas, independent bungalows, cooperative housing society flats, and bank fixed deposits, preventing bitter inheritance conflicts among legal heirs.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Administrative Complex, Paud Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        IGR Maharashtra Sarita slot scheduling, advocate representation, and Section 31 home visits for elderly testators across Kothrud and Karve Road.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kothrud"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kothrud Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: BANER, BALEWADI & AUNDH */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-West Premium Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Haveli 8 &amp; 9 (Aundh)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Baner, Balewadi &amp; Aundh
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Baner High Street</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Balewadi High Street</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Aundh Bremen Square</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pashan Lake Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sus Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Premium <strong>Will drafting services in Baner</strong>, Balewadi, and Aundh for luxury gated enclaves, high-rise penthouses, company equities, mutual fund portfolios, and seamless PMC property tax mutation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Government Administrative Complex, Aundh</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Rapid e-Stepin appointment scheduling, advocate representation, and smooth Book III registration for Baner, Balewadi, and Aundh homeowners.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Baner"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Baner Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: HINJEWADI & WAKAD IT CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West IT &amp; Tech Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Hinjewadi / Paud
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Hinjewadi, Wakad &amp; Tathawade
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hinjewadi Phases 1-3</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wakad Datta Mandir</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tathawade &amp; Punawale</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Marunji &amp; Maan</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Hinjewadi</strong>, Wakad, and Tathawade tailored for tech architects, IT engineering leaders, and young homeowners. Covers US equity holdings (RSUs, ESOPs), crypto assets, demat investments, and mortgaged flats.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: MIDC Administrative Annex, Hinjewadi Phase 1</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast online draft finalization, cross-border NRI asset structuring, and priority weekend SRO registration slots for IT professionals.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Hinjewadi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Hinjewadi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: KHARADI, VIMAN NAGAR & KALYANI NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        East Pune Tech &amp; Luxury
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Haveli 6 &amp; 23 (Yerwada)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kharadi, Viman Nagar &amp; Kalyani Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kharadi EON Zone</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">World Trade Center Pune</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Viman Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kalyani Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wadgaon Sheri</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Kharadi</strong>, Viman Nagar, and Kalyani Nagar for upscale condominiums, MNC leaders, and NRI properties. Includes bilingual Marathi-English drafts and CHS share certificate transfers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Yerwada Registry Complex, Off Nagar Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online Sarita token generation, doctor certificate coordination, and physical advocate assistance at the Yerwada Sub-Registrar counter.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kharadi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kharadi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: HADAPSAR, MAGARPATTA & AMANORA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        East Residential Townships
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Haveli 14 (Hadapsar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Hadapsar, Magarpatta &amp; Amanora
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Magarpatta City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amanora Park Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mundhwa</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Manjri Greens</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saswad Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Hadapsar</strong>, Magarpatta City, and Amanora Park Town. Ensures Model Bye-Law 30 cooperative society compliance, guaranteeing true ownership transfer rather than a nominal nominee claim.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Solapur Road Administrative Office, Hadapsar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Comprehensive verification of township allotment letters, society membership documents, and fast-track Haveli 14 SRO execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Hadapsar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Hadapsar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: SHIVAJI NAGAR, DECCAN & PUNE CAMP */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Commercial Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Haveli 1 to 5 (Central)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Shivaji Nagar, Deccan &amp; Pune Camp
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Deccan Gymkhana</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">FC Road &amp; JM Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Model Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Prabhat Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Camp &amp; MG Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Heritage <strong>Will drafting services in Shivaji Nagar</strong>, Deccan Gymkhana, and Pune Camp for high-value ancestral wadas, commercial buildings, multi-tier testamentary trusts, and business succession safeguarding.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Photozinco Press Compound, Central Building</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Expert advocate liaison, doorstep medical examination, and Book III registration at Pune&apos;s apex Sub-Registrar registry office.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Shivaji Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Shivaji Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: PIMPRI, CHINCHWAD & PIMPLE SAUDAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        PCMC Industrial &amp; Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Haveli 16, 18 &amp; 20
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Pimpri, Chinchwad &amp; Pimple Saudagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pimple Saudagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nigdi Pradhikaran</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pimple Nilakh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhosari MIDC</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Akurdi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom <strong>Will drafting services in Pimpri</strong>, Chinchwad, and Pimple Saudagar for auto ancillary entrepreneurs, MSME factory owners, and modern society apartments with clear demarcation between personal and industrial assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: PCMC Sub-Divisional Office, Akurdi Pradhikaran</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        PCMC property tax mutation guidance, industrial land ferfar advisory, and Morwadi court legal verification.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Pimpri"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft PCMC Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: BIBWEWADI, SAHAKAR NAGAR & SINHAGAD ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Pune Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Haveli 12 &amp; 15
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bibwewadi, Sahakar Nagar &amp; Sinhagad Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bibwewadi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sahakar Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Market Yard</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sinhagad Road Anand Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Katraj &amp; Ambegaon</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Trusted <strong>Will drafting services in Bibwewadi</strong>, Sahakar Nagar, and Sinhagad Road for dense residential societies, Market Yard traders, and ancestral family jewellery bequests.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Gultekdi Market Yard Commercial Building</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep home registration under Section 31 for senior citizens and fast-track property tax mutation with Pune Municipal Corporation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bibwewadi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bibwewadi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-pune-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP SOP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Will Drafting to Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified standard operating procedure to prepare, execute, and optionally register your Will in Pune:
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
                      Compile a comprehensive schedule of your movable and immovable assets in Pune and beyond. Include PMC/PCMC property tax numbers, index-II registered sale deeds, bank accounts, demat folios, and insurance policies. Designate an executor to administer the estate.
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
                      Work with our specialized succession lawyers to frame custom legal clauses. Include explicit revocation of past Wills, specific bequests, survivorship provisions, and a residual clause to capture any future assets.
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
                      Print the Will on plain A4 paper. Sign or place your thumb impression at the foot of each page in the presence of two independent adult witnesses. Both witnesses then sign and write their full names, addresses, and Aadhaar numbers.
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
                      Book IGR Maharashtra Sarita Appointment Online
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log in to the IGR Maharashtra Sarita portal (igrmaharashtra.gov.in) and navigate to the e-Stepin appointment module. Select your designated Haveli Sub-Registrar office, upload party details, pay the nominal ₹100 registration fee online, and download the appointment receipt.
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
                      Complete Biometric Verification at Pune SRO
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
                  7. Section 31 Doorstep SRO Registration in Pune
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visiting crowded government registry offices can be exhausting for senior citizens, hospitalized individuals, or those with mobility challenges.
                  <strong> Section 31 of the Registration Act, 1908</strong> allows the Sub-Registrar to visit the testator&apos;s home or hospital in special cases.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <h3 className="text-lg font-bold text-slate-900">
                  How Home Registration Works Across Pune &amp; PCMC:
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Doctor Fitness Certificate</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered MBBS practitioner examines the testator and issues a medical certificate stating they are mentally sound but physically unable to travel.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">SRO Commission Application</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our legal team files a formal Section 31 petition before the Haveli Sub-Registrar along with the doctor&apos;s certificate and pays the official government commission visit fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Officer Home Visit</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar attends your Pune residence or hospital room with portable biometric kit, verifies witnesses, records fingerprints, and registers the Will.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center gap-3 text-xs text-rose-950">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>
                    Our Pune legal associates assist with complete doctor coordination, petition drafting, and officer schedule management.
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
                  8. Mandatory Document Checklist for Pune Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Keep these verified records ready before executing and registering your Will in Pune:
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
            <section id="pune-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Estate Asset Distribution: PMC Flats &amp; Land
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A legally compliant Will should address the distinctive asset classes prevalent across Pune and Haveli taluka:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ASSET 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Cooperative Housing Society (CHS) Flats
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 30 of the Maharashtra Co-operative Societies Act, 1960 and Supreme Court rulings, a society nominee acts merely as a trustee. A nominee does not inherit the flat. Only a valid Will grants beneficial ownership and directs the managing committee to transfer the share certificate.
                  </p>
                </div>

                {/* ASSET 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    PMC &amp; PCMC Municipal Mutation (Varasdar Nond)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Property tax records (*Milkat Kar*) must reflect the heir&apos;s name post-demise. A registered Will accompanied by an application for mutation (*Farkhat* / *Varasdar Nond*) and Death Certificate ensures swift name transfer without costly court succession papers.
                  </p>
                </div>

                {/* ASSET 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Agricultural Land &amp; 7/12 Extract (Satbara Ferfar)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For ancestral farmland or Gunthewari plots in Haveli, Mulshi, or Shirur, mutation on the 7/12 extract (*Satbara Utara*) is carried out by the Talathi under the Maharashtra Land Revenue Code, 1966 using the registered Will as proof of succession.
                  </p>
                </div>

                {/* ASSET 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Financial Securities, RSUs &amp; Demat Accounts
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Pune IT professionals frequently hold mutual funds, US tech stocks, RSUs, and company shares. While nominations must be updated with depositories (CDSL/NSDL), specifying these assets in your Will guarantees foolproof transfer to intended family members.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & STAMP DUTY */}
            <section id="pune-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Registration Charges &amp; Zero Stamp Duty in Pune
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property purchase sale deeds that attract 6% to 7% stamp duty in Pune, Will registration is heavily subsidized by the Maharashtra State Government:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-[#C65378]">₹0</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Maharashtra Stamp Duty</h4>
                  <p className="text-[11px] text-slate-500">100% exempt under Article 64 of Maharashtra Stamp Act</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">₹100</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">SRO Registration Fee</h4>
                  <p className="text-[11px] text-slate-500">Fixed statutory government registration fee across Haveli</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">₹100 - ₹300</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Scanning &amp; Data Fee</h4>
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
                  11. Transparent Pricing: Pune Will Making Packages
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the level of professional support best suited to your family&apos;s estate planning requirements across Pune and PCMC:
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
                      Ideal for individuals with straightforward assets like a single flat, bank deposits, and mutual funds.
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
                      Recommended for Pune families owning multiple flats, tech RSUs, or ancestral properties.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Advocate Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Custom clauses for PMC/PCMC properties</span>
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
                      Full turnkey service including IGR Maharashtra Sarita booking and doorstep assistance.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete lawyer drafting &amp; review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>IGR Sarita slot booking management</span>
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
                  Frequently Asked Questions: Will Drafting in Pune
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key succession, registration, and property transfer questions for Pune residents:
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
                  12. Statutory Citations &amp; Legal Precedents in Pune
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
                    Maharashtra Stamp Act (Article 64):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Grants complete exemption from ad-valorem stamp duty for Wills executed and presented for registration anywhere in the State of Maharashtra.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Maharashtra Co-operative Societies Act, 1960 (Section 30 &amp; Model Bye-Law 30):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Establishes that a society nominee holds flat rights as a fiduciary trustee for the true legal beneficiaries named in the deceased member&apos;s Will (reaffirmed in Supreme Court ruling <em>Indrani Wahi v. Registrar of Co-operative Societies</em>).
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Bombay High Court Precedents on Non-Presidency Probate:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Multiple Bombay High Court decisions affirm that for properties in Pune and mofussil Maharashtra, an executor or legatee can establish rights without obtaining formal probate decrees.
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
                Visual Blueprint: Pune Will Drafting &amp; SRO Registration Architecture
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
                src="/images/will-drafting-in-pune.jpg"
                alt="High Resolution Visual Blueprint: Pune Will Drafting and SRO Registration"
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
            Pune Will Services
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
