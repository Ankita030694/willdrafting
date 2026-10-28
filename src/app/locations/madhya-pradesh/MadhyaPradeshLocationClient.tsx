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
  { id: "mp-overview", label: "OVERVIEW" },
  { id: "mp-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "mp-probate-rules", label: "PROBATE RULES" },
  { id: "mp-sro-directory", label: "SRO DIRECTORY" },
  { id: "mp-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-mp-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "mp-property-types", label: "PROPERTY TYPES" },
  { id: "mp-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const MP_SRO_HUBS = [
  {
    id: "indore-collectorate",
    name: "Indore 1 (Collectorate / Moti Bungalow)",
    sro: "SRO Indore 1 (District Registry Office)",
    address: "Collectorate Administrative Complex, Moti Bungalow, Moti Tabela, Indore - 452007",
    areas: "Old Palasia, MG Road, Rajwada, Chhavani, South Tukoganj, Navlakha, Bhanwarkuan, Collectorate Belt",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "indore-vijaynagar",
    name: "Indore 4 (Vijay Nagar / Scheme 78)",
    sro: "SRO Indore 4 (Scheme 78 Office)",
    address: "IDA Commercial Complex, Scheme 78, Near Vijay Nagar Square, Indore - 452010",
    areas: "Vijay Nagar, Super Corridor, Scheme 54, Scheme 78, AB Road, MR 10, Nipania, Mahalaxmi Nagar",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "bhopal-mpnagar",
    name: "Bhopal 2 (MP Nagar & TT Nagar)",
    sro: "SRO Bhopal 2 (Zone 1 MP Nagar)",
    address: "Commercial Tax Building, Zone 1, MP Nagar, Near DB City Mall, Bhopal - 462011",
    areas: "MP Nagar, TT Nagar, Arera Colony (E1 to E7), Char Imli, Shahpura, Chunabhatti, Kolar Road",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "bhopal-paribazar",
    name: "Bhopal 1 (Pari Bazar / Old City)",
    sro: "SRO Bhopal 1 (Old Tehsil Campus)",
    address: "Pari Bazar Administrative Complex, Near Shahjehanabad, Old Bhopal - 462001",
    areas: "Old City, Pari Bazar, Idgah Hills, Shamla Hills, Bairagarh (Sant Hirdaram Nagar), Karond",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "jabalpur-civillines",
    name: "Jabalpur 1 (Civil Lines Collectorate)",
    sro: "SRO Jabalpur 1 (Collectorate Campus)",
    address: "District Collectorate Compound, Civil Lines, Jabalpur - 482001",
    areas: "Civil Lines, Wright Town, Napier Town, South Civil Lines, Cantt Area, Gorakhpur, Adhartal",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "gwalior-citycenter",
    name: "Gwalior (City Center Collectorate)",
    sro: "SRO Gwalior (New Collectorate Building)",
    address: "New Collectorate Building Campus, City Center, Gwalior - 474011",
    areas: "City Center, Lashkar, Morar, Maharaj Bada, Thatipur, Pinto Park, Govindpuri, Kampoo",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "ujjain-kothi",
    name: "Ujjain (Kothi Palace Collectorate)",
    sro: "SRO Ujjain (District Registry)",
    address: "Kothi Palace Collectorate Campus, Dewas Road, Ujjain - 456010",
    areas: "Freeganj, Nanakheda, Mahakal Corridor, Rishi Nagar, Agar Road, Dewas Road, Nagziri Industrial",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Paper",
    detail: "Printed on standard white A4 sheets. Under Madhya Pradesh law, stamp paper is not required for drafting a Will.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo capture via MP Sampada 2.0.",
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
    detail: "Strongly recommended for senior citizens aged 60+. Certifies Will mental capacity and lucidity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "MP Sampada 2.0 Appointment Slip & Challan",
    detail: "Official slot booking receipt downloaded from the sampada.mpigr.gov.in portal with cyber challan confirmation.",
    checked: false,
  },
  {
    id: "item-6",
    label: "IDA, BDA, or JDA Allotment / City Tax Papers",
    detail: "Copy of development office lease deed, asset tax receipt, or MP Housing Board allotment paper.",
    checked: false,
  },
  {
    id: "item-7",
    label: "MP Bhulekh Khasra & Khatauni Records (For Farmland)",
    detail: "Recent computerized land records for farm acreage or rural farmhouses across Madhya Pradesh tehsils.",
    checked: false,
  },
];

export default function MadhyaPradeshLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("mp-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("indore-vijaynagar");
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

  const filteredHubs = MP_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    MP_SRO_HUBS.find((h) => h.id === selectedHub) || MP_SRO_HUBS[0];

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
                <span>MADHYA PRADESH ESTATE &amp; SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 59 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Madhya Pradesh: Online Estate
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally valid Will for your IDA and BDA plots, Bhopal lakeview residences, shop assets in Indore, and MP Bhulekh farm land. Get senior lawyer drafting, MP Sampada 2.0 filing guidance, and Section 31 doorstep signing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your MP Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#mp-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>MP SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>MP High Court Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 MP Stamp Duty</span>
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
                  src="/images/will-drafting-in-madhya-pradesh.jpg"
                  alt="Legal Will Drafting and Property Succession in Madhya Pradesh"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Madhya Pradesh Estate &amp; SRO Blueprint
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
                55 Districts
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                All MP Revenue Divisions
              </span>
            </div>
            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                MP Sampada 2.0
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Digital SRO Slot Booking
              </span>
            </div>
            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Nominal Filing Fee
              </span>
            </div>
            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                Non-Presidency
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Probate Exemption in MP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN LAYOUT: STICKY TOC SIDEBAR (LEFT) + CONTENT SECTIONS (RIGHT)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* =====================================================================
              LEFT COLUMN: STICKY DESKTOP TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#172228]/10">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#172228]">
                    ON THIS MP GUIDE
                  </span>
                </div>
                <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                  {TOC_ITEMS.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                          isActive
                            ? "bg-[#C65378] text-white shadow-xs translate-x-1"
                            : "text-[#55636D] hover:bg-slate-100 hover:text-[#172228]"
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* QUICK CTA CARD */}
              <div className="rounded-2xl bg-[#172228] text-white p-5 space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>MP Lawyer Support</span>
                </div>
                <div className="text-sm font-extrabold text-white leading-snug">
                  Need Help with MP Sampada Filing?
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our estate lawyers draft your Will, schedule your SRO slot, and guide you every step.
                </p>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors cursor-pointer text-center"
                >
                  <span>Start Drafting Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MOBILE FLOATING / ACCORDION TOC
              ===================================================================== */}
          <div className="lg:hidden col-span-1 mb-2">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-3.5 shadow-xs">
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#172228]"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>CURRENT: {currentActiveToc.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-600 transition-transform ${
                    mobileTocOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileTocOpen && (
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-1.5">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: DETAILED CONTENT SECTIONS (9 COLS)
              ===================================================================== */}
          <main className="lg:col-span-9 space-y-14 sm:space-y-16 lg:space-y-20">

            {/* SECTION 0: OVERVIEW & HIGHLIGHTS */}
            <section id="mp-overview" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>COMPREHENSIVE SUCCESSION BLUEPRINT</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in MP
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Making a Will in Madhya Pradesh protects your family from bitter estate battles and expensive asset name change delays. Under the Indian Succession Act, 1925, every adult of sound mind can bequeath their self-acquired assets, development office leaseholds, and their single joint family share in family estates. Whether you reside in Indore, Bhopal, Jabalpur, Gwalior, or manage assets from abroad as an NRI, this guide covers the complete legal step in Madhya Pradesh.
                </p>
              </div>

              {/* 4 FEATURE PILLARS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-sm">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>MP High Court Probate Exemption</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Madhya Pradesh is a non-presidency state. Under Section 213 of the Indian Succession Act, court probate is strictly non-needed for Hindu, Sikh, Jain, and Buddhist Wills across MP.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-sm">
                    <Stamp className="w-4 h-4 text-[#C65378]" />
                    <span>MP Sampada 2.0 Portal</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Filing slots are booked digitally via the Shop Tax Office portal (sampada.mpigr.gov.in) with cyber challan generation and nominal filing charges.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-sm">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>IDA, BDA &amp; City Name Change</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A filed Will enables direct name substitution in Indore Development Office (IDA), Bhopal Development Office (BDA), and MP Housing Board records without civil fights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-sm">
                    <Wheat className="w-4 h-4 text-[#C65378]" />
                    <span>MP Bhulekh Farmland Transfer</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farm land estate follows Section 109 and Section 110 of the MP Land Revenue Code, 1959. Namantran is recorded smoothly in Khasra and Khatauni land registers.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="mp-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY ARCHITECTURE &amp; REVENUE CODES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Madhya Pradesh
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will estate across Madhya Pradesh is governed by central statutes and state revenue laws. Understanding how these acts interact guarantees that your Will remains valid, contest-proof, and smoothly enforceable upon demise:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Indian Succession Act, 1925</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 59 establishes that any adult of sound mind can execute a Will. Section 63 mandates that the Will maker must sign or affix their mark in the presence of at least two independent adult witnesses who attest in the Will maker&apos;s sight.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Filing Act, 1908 (Section 18e)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 18(e) classifies Wills under a choice filing. However, registering before an MP SRO deposits the original instrument into permanent Book III government custody, eliminating allegations of tampering or fraud.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Wheat className="w-4 h-4 text-[#C65378]" />
                    <span>MP Land Revenue Code, 1959</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 109 and Section 110 of the MPLRC, every person acquiring an interest in land by Will estate must report it to the Patwari or Tehsildar for online Namantran on the MP Bhulekh portal.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Hindu Succession Act, 1956 (Section 30)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Mitakshara joint family law, a Hindu testator can bequeath their single undivided interest in joint family asset, alongside 100% of their self-acquired real estate and personal wealth.
                  </p>
                </div>
              </div>

              {/* TABLE: COMPARISON TABLE */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Comparative Overview: Plain vs. Filed Will in MP
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3 sm:p-3.5">Parameter</th>
                        <th className="p-3 sm:p-3.5">Plain Will (White Paper)</th>
                        <th className="p-3 sm:p-3.5">Filed Will (MP Sampada 2.0)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 sm:p-3.5 font-bold text-slate-900">Legal Validity</td>
                        <td className="p-3 sm:p-3.5">Valid if signed before 2 witnesses</td>
                        <td className="p-3 sm:p-3.5 text-emerald-700 font-bold">Valid with official government presumption</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-3.5 font-bold text-slate-900">Government Archive</td>
                        <td className="p-3 sm:p-3.5">None; retained in private custody</td>
                        <td className="p-3 sm:p-3.5 text-emerald-700 font-bold">Stored permanently in SRO Book III records</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-3.5 font-bold text-slate-900">IDA / BDA Name Change</td>
                        <td className="p-3 sm:p-3.5">May demand family NOCs &amp; court declarations</td>
                        <td className="p-3 sm:p-3.5 text-emerald-700 font-bold">Accepted as primary proof for lease transfer</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-3.5 font-bold text-slate-900">MP Bhulekh Name Change</td>
                        <td className="p-3 sm:p-3.5">Tehsildar may order lengthy inquiry if contested</td>
                        <td className="p-3 sm:p-3.5 text-emerald-700 font-bold">Streamlined Namantran under MPLRC Section 110</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-3.5 font-bold text-slate-900">Risk of Forgery Claim</td>
                        <td className="p-3 sm:p-3.5">High risk in contentious family fights</td>
                        <td className="p-3 sm:p-3.5 text-emerald-700 font-bold">Virtually zero due to photo &amp; biometrics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>SECTION 18(e) REGISTRATION ACT ANALYSIS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Madhya Pradesh?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Filing Act, 1908, Will filing is strictly <strong>a choice</strong> across Madhya Pradesh. A Will written or typed on plain A4 paper is legally enforceable if properly signed. However, legal advisors strongly encourage filing for several practical reasons:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Government Record</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When filed, the SRO scans and archives the Will in Book III. If physical copies are misplaced, certified copies can be retrieved from the district registry.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Biometric Authenticity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker and witnesses provide digital fingerprints and live photographs before the SRO, rendering false signature claims legally unsustainable.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black text-sm">
                    3
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Fast Name Change</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    City offices like IMC, BMC, and development offices process name name change swiftly without requiring prolonged court declarations or family sworn notes.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="mp-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT OF MADHYA PRADESH JURISPRUDENCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. MP Probate Law: Complete Exemption in Madhya Pradesh
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most common legal questions from asset owners in Madhya Pradesh is whether their executors must get a court probate before transferring assets. The legal answer under MP High Court precedents is clear and definitive:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-4">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SECTION 213 READ WITH SECTION 57 ISA EXEMPTION</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Court Probate is Non-Needed Across All 55 Districts of MP
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Under Section 213(2) read with Section 57 of the Indian Succession Act, 1925, probate is needed only for Wills signed within or concerning land and flats located in the historical presidency towns of Mumbai, Kolkata, and Chennai. 
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The High Court of Madhya Pradesh (through its Principal Seat at Jabalpur and Benches at Indore and Gwalior) has repeatedly held that a Hindu, Sikh, Jain, or Buddhist Will takes full legal effect right away upon the Will maker&apos;s demise. An executor does not need an expensive probate decree to apply for city name change or bank account transfers.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-rose-200">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15">Principal Seat Jabalpur</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15">Indore Bench</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15">Gwalior Bench</span>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="mp-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION HUBS &amp; DISTRICT OFFICES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. MP SRO Offices: District SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under MP Sampada 2.0, appointment slots can be booked at your local SRO office. Search our checked registry directory across Indore, Bhopal, Jabalpur, Gwalior, and Ujjain:
                </p>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by city, SRO name, or locality (e.g., Indore, Bhopal, City Center, Civil Lines)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#C65378]"
                />
              </div>

              {/* SRO TABS / CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHubs.map((hub) => {
                  const isSelected = hub.id === selectedHub;
                  return (
                    <div
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-white border-[#C65378] shadow-md ring-2 ring-[#C65378]/20"
                          : "bg-white/70 border-slate-200/90 hover:bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                            {hub.name}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            Book III Desk
                          </span>
                        </div>
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                          {hub.sro}
                        </h3>
                        <p className="text-xs text-slate-600 flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{hub.address}</span>
                        </p>
                        <p className="text-[11px] text-slate-500 pt-1">
                          <strong>Area:</strong> {hub.areas}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">{hub.timings}</span>
                        <a
                          href="/start"
                          onClick={handleStartDraft}
                          className="font-bold text-[#C65378] hover:underline"
                        >
                          Book Slot →
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES (EXACT SAME TYPE AS NASHIK LOCAL AREAS SECTION) */}
            <section id="mp-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: District-Wise Will Drafting in MP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Madhya Pradesh span shop hubs and IDA townships in Indore, government office colonies in Bhopal, legal and military cantonments in Jabalpur, historic Havelis in Gwalior, and extensive farm acreage on MP Bhulekh. Our estate lawyers deliver customized legal drafting, MP Sampada 2.0 slot booking, and SRO accompaniment across all key regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: INDORE & SUPER CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Shop Capital &amp; IT Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Indore 1 &amp; 4
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Indore &amp; Super Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vijay Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Super Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Scheme 54 / 78</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Old Palasia</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rau &amp; Pithampur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Indore</strong> for premium high-rise apartments, IDA home plots, plant units in Pithampur, and shop showrooms along AB Road. Codifies Indore City City Board (IMC) tax transfer protocols, mutual fund portfolios, and business estate structures.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Moti Bungalow &amp; Scheme 78</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        MP Sampada 2.0 digital booking, senior lawyer physical attendance, and Section 31 doorstep signing for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal SRO Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Indore"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Indore Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: BHOPAL & ARERA COLONY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        State Capital &amp; Lake Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bhopal 1 &amp; 2
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bhopal &amp; Arera Colony
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Arera Colony (E1-E7)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">MP Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kolar Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shahpura</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shamla Hills</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Bhopal</strong> for Bhopal Development Office (BDA) 99-year leasehold plots, MP Housing Board duplexes, lakeview bungalows, and shop office suites in MP Nagar. Clear clauses for surviving spouses and life-interest protection.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Zone 1 MP Nagar &amp; Pari Bazar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-net-worth estate structuring, private family asset mapping, and expedited Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Home</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bhopal"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bhopal Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: JABALPUR & CIVIL LINES */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Judicial Seat &amp; Mahakoshal Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jabalpur 1 &amp; 2
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Jabalpur &amp; Civil Lines
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wright Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Napier Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gorakhpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Adhartal</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Jabalpur</strong> for defense personnel, retired judicial officers, and civil service families. Addresses Jabalpur Development Office (JDA) schemes, cantonment estates, and farm land in surrounding Mahakoshal tehsils.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate, Civil Lines</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High Court lawyer drafting, Section 31 doorstep filing, and JDA name change support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Judicial &amp; Armed Forces</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jabalpur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Jabalpur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: GWALIOR & CITY CENTER */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Chambal Royal City &amp; HC Bench
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gwalior City Center
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gwalior &amp; City Center
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">City Center</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lashkar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Morar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Maharaj Bada</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thatipur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Reliable <strong>Will drafting services in Gwalior</strong> for family heritage Havelis and Kothis in Lashkar, shop establishments in Maharaj Bada, and GDA home plots in City Center and Morar. Protects multi-generational assets from estate claims.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: New Collectorate, City Center</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Family haveli asset mapping, e-filing booking, and Gwalior Development Office transfer.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Heritage &amp; Contemporary</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gwalior"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gwalior Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: UJJAIN & DEWAS CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Plant Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ujjain &amp; Dewas
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ujjain &amp; Dewas Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Freeganj</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nanakheda</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dewas Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mahakal Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dewas Plant</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Ujjain and Dewas</strong> covering Ujjain Development Office (UDA) plots, hospitality assets near the Mahakal Corridor, and plant manufacturing plants in Dewas. Seamless Will integration for family business enterprises.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kothi Palace Campus, Dewas Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Shop enterprise structuring, hospital and trust bequests, and district registry coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Agro-Plant</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ujjain"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ujjain Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: SAGAR & BUNDELKHAND */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Bundelkhand Divisional Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sagar Collectorate
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sagar &amp; Bundelkhand
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines Sagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Makronia</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cantt Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bina Refinery Zone</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Damoh Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Sagar</strong> for university faculty estates, Makronia home assets, Bina plant assets, and extensive Bundelkhand farmland. Complete guidance on revenue records and Patwari Namantran on MP Bhulekh.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sagar Collectorate Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Farm Khasra mapping, senior citizen home visits, and nominal SRO fee processing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Farmland &amp; Plotted Homes</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Sagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: SATNA & REWA VINDHYA HUB */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Vindhya Plant Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Satna &amp; Rewa
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Satna &amp; Rewa Region
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Satna Smart City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rewa Kothi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines Rewa</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Maihar Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cement Hub</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Satna and Rewa</strong> for cement and limestone business owners, traders, and farm landholders. Prevents complex joint-family court fights through clear asset allocation and executor appointments.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Satna &amp; Rewa District Collectorates</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Mineral rights clarity, joint-family business shares, and MP Sampada online filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Plant &amp; Mineral Belts</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Satna"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Satna Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: RATLAM & MALWA AGRO-MANDI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Malwa Mandi &amp; Railway Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ratlam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ratlam &amp; Western Malwa
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Do Batti</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Station Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alkapuri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jaora</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mandsaur Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Focused <strong>Will drafting services in Ratlam and Western Malwa</strong> for gold jewelry traders, shop mandi merchants, and farm landholders across Jaora and Mandsaur. Guarantees safe transfer of gold inventories, financial securities, and family farmland.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Ratlam Collectorate Campus</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Gold jewelry inventory estate, shop shop deeds, and Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Agro-Holdings</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ratlam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ratlam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP PROCESS SOP */}
            <section id="step-by-step-mp-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STANDARD OPERATING PROCEDURE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to MP Sampada Filing
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this five-step standard operating step to prepare, execute, and register an enforceable Will before any SRO across Madhya Pradesh:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Compile Asset Inventory &amp; Heir Allocations
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      List all land assets across Madhya Pradesh including IDA, BDA, or JDA plots, MP Housing Board apartments, and MP Bhulekh farm land. Enumerate cash assets like bank deposits, demat portfolios, family jewelry, and motor vehicles. Designate heirs and an executor clearly.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Draft Customized Clauses with Lawyer Review
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our senior estate lawyers draft your paper incorporating explicit revocation of previous wills, alternate heirs in case of simultaneous death, Will guardian appointments for minor children, and clear life-interest rules.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Execute Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the final draft on standard white A4 sheets. Sign or place your thumb impression at the foot of every page in the presence of two independent adult witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses must not be heirs under the Will.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Book MP Sampada 2.0 Slot &amp; Remit Nominal Fees
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Access the MP Shop Tax &amp; Filing Office portal (sampada.mpigr.gov.in). Select your district SRO office, enter KYC details for the Will maker and witnesses, upload the draft, generate the cyber challan for nominal filing fees, and secure a confirmed time slot.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Complete Biometrics &amp; Obtain Book III Paper
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Appear before the SRO with both witnesses carrying original Aadhaar cards. Complete live photography and digital biometric thumbprints. The SRO registers the instrument in Book III, stamps the filing endorsement, and returns the original filed Will.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP SUB-REGISTRAR EXECUTION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Filing for Senior Citizens
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visiting crowded government registry offices can be strenuous for elderly, bedridden, or medically unwell people. Section 31 of the Filing Act, 1908 provides a legal mechanism for doorstep filing:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-black">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Doorstep SRO Commission Across All MP Districts
                    </h3>
                    <p className="text-xs text-slate-500">
                      Legal home and hospital filing under Section 31 of the Filing Act, 1908
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                    <span className="font-bold text-slate-900 block">1. Medical Paper</span>
                    <p className="text-slate-600">
                      A filed MBBS or MD doctor issues a fitness paper confirming Will mental soundness and inability to travel.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                    <span className="font-bold text-slate-900 block">2. Commission Petition</span>
                    <p className="text-slate-600">
                      Our lawyer files an official commission request with the SRO attaching the medical paper and doctor&apos;s report.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                    <span className="font-bold text-slate-900 block">3. Home Visit &amp; Biometrics</span>
                    <p className="text-slate-600">
                      The SRO attends the residence with portable biometric equipment to record signatures, thumbprints, and photos.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">
                    Available in Indore, Bhopal, Jabalpur, Gwalior, Ujjain, Sagar, Satna, and all MP tehsils.
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="font-bold text-[#C65378] hover:underline flex items-center gap-1"
                  >
                    <span>Request Home Filing Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>VERIFICATION &amp; COMPLIANCE REQUIREMENTS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Paper Checklist for MP SRO Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ensure you carry all needed papers to prevent delays during your MP Sampada appointment. Use our free checklist to track your preparation:
                </p>
              </div>

              {/* PROGRESS BAR */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">Checklist Progress</span>
                  <span className="text-[#C65378]">{checkedCount} of {checklist.length} Completed</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#C65378] transition-all duration-300 rounded-full"
                    style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* CHECKLIST ITEMS */}
              <div className="space-y-2.5">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      item.checked
                        ? "bg-white border-slate-200/80 shadow-2xs"
                        : "bg-white/60 border-slate-200/50 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        item.checked
                          ? "bg-[#C65378] text-white"
                          : "border-2 border-slate-300 bg-white"
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="space-y-0.5">
                      <span className={`text-sm font-extrabold ${item.checked ? "text-slate-900" : "text-slate-700"}`}>
                        {item.label}
                      </span>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="mp-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>MADHYA PRADESH ASSET CATEGORIES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. MP Asset Types: IDA, BDA Plots &amp; Farmland
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate in Madhya Pradesh comprises distinct legal tenures. Your Will should address each asset category according to its specific estate dynamics:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Development Office Plots (IDA / BDA / JDA)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Allotment letters and 99-year leasehold deeds from IDA (Indore), BDA (Bhopal), or JDA (Jabalpur) require clear Will proof. An executor presents the filed Will to execute the tripartite lease assignment without court fights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>MP Housing Board &amp; Private Apartments</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Flats and duplexes built by the MP Housing &amp; Infrastructure Development Board or private builders require city tax name change. Nominations only transfer custody; lawful title requires a valid Will.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Wheat className="w-4 h-4 text-[#C65378]" />
                    <span>Farm Farmland (MP Bhulekh)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farm land estate follows Section 109 and Section 110 of the MP Land Revenue Code. Filed Wills allow Patwaris and Tehsildars to update the Khasra and Khatauni land extracts directly.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Factory className="w-4 h-4 text-[#C65378]" />
                    <span>Shop Units &amp; Financial Holdings</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Shop plots in plant parks (Pithampur, Mandideep, Govindpura), family business shares, demat accounts, and fixed deposits are structured with specific residual clauses.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="mp-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT CHARGES &amp; STAMP EXEMPTION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official MP Sampada Filing Fees &amp; Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds, signing and registering a Will in Madhya Pradesh does not attract ad-valorem stamp duty. The government charges are purely nominal:
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <table className="w-full text-xs text-left text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
                    <tr>
                      <th className="p-3 sm:p-3.5">Fee Component</th>
                      <th className="p-3 sm:p-3.5">Official MP Government Rate</th>
                      <th className="p-3 sm:p-3.5">Payment Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900">Stamp Duty on Will</td>
                      <td className="p-3 sm:p-3.5 text-emerald-700 font-bold">₹0 (100% Exempt)</td>
                      <td className="p-3 sm:p-3.5">Not Applicable</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900">SRO Filing Fee</td>
                      <td className="p-3 sm:p-3.5 font-semibold text-slate-900">₹200 to ₹500 (Nominal fixed fee)</td>
                      <td className="p-3 sm:p-3.5">MP Treasury Cyber Challan</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900">Paper Scanning &amp; Service Fee</td>
                      <td className="p-3 sm:p-3.5 font-semibold text-slate-900">₹100 to ₹200</td>
                      <td className="p-3 sm:p-3.5">MP Sampada 2.0 Portal</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900">Section 31 Doorstep Commission</td>
                      <td className="p-3 sm:p-3.5 font-semibold text-slate-900">Official legal travel fee</td>
                      <td className="p-3 sm:p-3.5">Treasury Challan upon permission</td>
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
                  <span>TRANSPARENT VALUE-BASED PACKAGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in MP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the estate planning package that fits your family&apos;s assets. All options feature lawyer drafting with zero hidden charges:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TIER 1 */}
                <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Self-Guided
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">Online Drafted Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for people with straightforward estates seeking a legally vetted Will paper.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Free estate asset mapping</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Standard Indian Succession Act clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant PDF &amp; Word download</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Witness signing instructions</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-2xl bg-slate-100 text-slate-900 text-xs font-extrabold hover:bg-slate-200 transition-colors text-center cursor-pointer"
                  >
                    Select Online Plan
                  </a>
                </div>

                {/* TIER 2 (FEATURED) */}
                <div className="rounded-3xl bg-[#172228] text-white p-6 flex flex-col justify-between shadow-xl relative border-2 border-[#C65378]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                      Lawyer-Guided
                    </span>
                    <h3 className="text-xl font-extrabold text-white">Lawyer Assisted Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">₹4,990</span>
                      <span className="text-xs text-slate-300">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Direct talk with a senior estate lawyer for complex urban and farm holdings.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-200 pt-2 border-t border-white/10">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>1-on-1 Senior Lawyer Talk</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Custom clauses for IDA / BDA / Farmland</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Doctor mental paper format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Unlimited revisions before signing</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-2xl bg-[#C65378] text-white text-xs font-extrabold hover:bg-[#a13c5d] transition-colors text-center cursor-pointer"
                  >
                    Get Lawyer Plan
                  </a>
                </div>

                {/* TIER 3 */}
                <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Full SRO Filing
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">Done-For-You Filing</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete end-to-end support including MP Sampada 2.0 booking and lawyer accompaniment at the SRO.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Full lawyer drafting &amp; review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>MP Sampada 2.0 slot scheduling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer attendance at SRO office</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit help</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-2xl bg-slate-900 text-white text-xs font-extrabold hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Select Filing Plan
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>MADHYA PRADESH SUCCESSION QUERIES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in MP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key legal questions about Will drafting, MP Sampada filing, probate exemption, and asset transfers in Madhya Pradesh:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="font-extrabold text-sm sm:text-base text-slate-900">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
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
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL STATUTES &amp; LEGAL PORTALS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Citations &amp; MP Legal Framework
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our estate planning services strictly adhere to applicable central statutes, state enactments, and authoritative online government portals across Madhya Pradesh:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-extrabold text-slate-900">Primary Statutes:</span>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li>Indian Succession Act, 1925 (Sections 59, 63, &amp; 213)</li>
                      <li>Filing Act, 1908 (Sections 18e, 31, &amp; Book III)</li>
                      <li>Madhya Pradesh Land Revenue Code, 1959 (Sections 109 &amp; 110)</li>
                      <li>Hindu Succession Act, 1956 (Section 30 joint family wills)</li>
                      <li>Indian Stamp Act (Schedule 1-A MP adaptations)</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-extrabold text-slate-900">Official Government Portals:</span>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li>MP Shop Tax &amp; Filing: <code>sampada.mpigr.gov.in</code></li>
                      <li>MP Revenue &amp; Land Records: <code>mpbhulekh.gov.in</code></li>
                      <li>High Court of Madhya Pradesh: <code>mphc.gov.in</code></li>
                      <li>Indore Development Office: <code>idaindore.org</code></li>
                      <li>Bhopal Development Office: <code>bda.nic.in</code></li>
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                  Disclaimer: Legal information presented on this portal is for educational and procedural guidance regarding Will estate in Madhya Pradesh. Talk with an lawyer ensures single facts and family dynamics are addressed effectively.
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
          HIGH-RESOLUTION MODAL VIEWER FOR BLUEPRINT IMAGE
          ========================================================================= */}
      {showHighResModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="relative max-w-5xl w-full bg-[#172228] rounded-2xl overflow-hidden border border-white/20 p-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-white">
              <span className="text-sm font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                Madhya Pradesh Estate &amp; Will Drafting Blueprint
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="/images/will-drafting-in-madhya-pradesh.jpg"
                alt="High Resolution Visual Blueprint: Madhya Pradesh Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
