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
  Cpu,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "karnataka-overview", label: "OVERVIEW" },
  { id: "karnataka-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "karnataka-probate-rules", label: "PROBATE RULES" },
  { id: "karnataka-sro-directory", label: "SRO DIRECTORY" },
  { id: "karnataka-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-karnataka-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "karnataka-property-types", label: "PROPERTY TYPES" },
  { id: "karnataka-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const KARNATAKA_SRO_HUBS = [
  {
    id: "bengaluru-central",
    name: "Bengaluru Central (Gandhinagar / Shivajinagar)",
    sro: "SRO Gandhinagar & SRO Shivajinagar",
    address: "Mini Vidhana Soudha, Sheshadri Road, Near K.G. Road, Bengaluru - 560009",
    areas: "CBD, MG Road, Brigade Road, Richmond Town, Lavelle Road, Vasanth Nagar, Malleshwaram, Rajajinagar",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 1st & 3rd Sat open, 2nd & 4th Sat closed)",
  },
  {
    id: "bengaluru-south",
    name: "Bengaluru South (Jayanagar & Basavanagudi)",
    sro: "SRO Jayanagar (4th Block Complex)",
    address: "BDA Shopping Complex, 4th Block, Jayanagar, Bengaluru - 560011",
    areas: "Jayanagar, Basavanagudi, JP Nagar, Banashankari, BTM Layout, Kumaraswamy Layout, Padmanabhanagar",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 1st & 3rd Sat open, 2nd & 4th Sat closed)",
  },
  {
    id: "bengaluru-tech-corridor",
    name: "Bengaluru Tech Corridor (Koramangala, HSR & Whitefield)",
    sro: "SRO Koramangala & SRO K.R. Puram / Whitefield",
    address: "BDA Complex Koramangala & Old Madras Road, K.R. Puram, Bengaluru - 560034",
    areas: "Koramangala, Indiranagar, HSR Layout, Bellandur, Sarjapur Road, Whitefield, Marathahalli, Electronic City",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 1st & 3rd Sat open, 2nd & 4th Sat closed)",
  },
  {
    id: "mysuru-hub",
    name: "Mysuru Urban & Rural Sub-Divisions",
    sro: "SRO Mysuru North & South",
    address: "Mini Vidhana Soudha, Nazarbad, Near District Court Complex, Mysuru - 570010",
    areas: "Jayalakshmipuram, Gokulam, Kuvempunagar, Saraswathipuram, Vijayanagar, Chamundi Hill Road, Nanjangud",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 1st & 3rd Sat open, 2nd & 4th Sat closed)",
  },
  {
    id: "mangaluru-udupi",
    name: "Mangaluru & Coastal Karnataka Hub",
    sro: "SRO Mangaluru Taluk & SRO Udupi",
    address: "Mini Vidhana Soudha Compound, Hampankatta, Mangaluru - 575001",
    areas: "Kadri, Bejai, Urwa, Falnir, Hampankatta, Surathkal, Manipal, Udupi, Kundapura, Puttur",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 1st & 3rd Sat open, 2nd & 4th Sat closed)",
  },
  {
    id: "hubballi-dharwad",
    name: "Hubballi & Dharwad Twin Cities",
    sro: "SRO Hubballi City & SRO Dharwad",
    address: "Mini Vidhana Soudha, Court Circle, Lamington Road, Hubballi - 580020",
    areas: "Vidyanagar, Keshwapur, Shirur Park, Navanagar, Rayapur, Dharwad Old City, Sattur, Gokul Road",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 1st & 3rd Sat open, 2nd & 4th Sat closed)",
  },
  {
    id: "belagavi-north",
    name: "Belagavi Industrial & Border Hub",
    sro: "SRO Belagavi City & Rural",
    address: "Deputy Commissioner Office Compound, Club Road, Belagavi - 590001",
    areas: "Tilakwadi, Camp, Udyambag, Hindwadi, Vadgaon, Shahapur, Khanapur, Chikkodi, Gokak",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 1st & 3rd Sat open, 2nd & 4th Sat closed)",
  },
  {
    id: "kalaburagi-ballari",
    name: "Kalaburagi & Ballari (Kalyana-Karnataka)",
    sro: "SRO Kalaburagi & SRO Ballari",
    address: "Mini Vidhana Soudha Complex, Sedam Road, Kalaburagi - 585105",
    areas: "Brahmpur, Sedam Road, MSK Mill Area, Cantonment Ballari, Brucepet, Hospet, Raichur, Bidar",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 1st & 3rd Sat open, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Paper",
    detail: "Printed on standard white A4 sheets. Under Karnataka law, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo on Kaveri 2.0.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be heirs receiving any asset under the Will.",
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
    label: "Kaveri 2.0 Appointment Slip & KII-Challan",
    detail: "Official time-slot booking receipt and ₹200 fee challan from the kaveri.karnataka.gov.in portal.",
    checked: false,
  },
  {
    id: "item-6",
    label: "BBMP e-Khata ('A' / 'B') or BDA / MUDA Allotment Deeds",
    detail: "Copy of city asset tax assessment, e-Aasthi statement, or development office transfer deed.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Bhoomi RTC / Pahani Extracts (For Farmland / Plantation)",
    detail: "Recent computerized land records for coffee plantations, coconut groves, and farm farmlands.",
    checked: false,
  },
];

export default function KarnatakaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("karnataka-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("bengaluru-tech-corridor");
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

  const filteredHubs = KARNATAKA_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    KARNATAKA_SRO_HUBS.find((h) => h.id === selectedHub) || KARNATAKA_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (NASHIK / DELHI ARCHITECTURE)
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
                <span>KARNATAKA STATE SUCCESSION &amp; KAVERI 2.0 DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 59 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Karnataka: Legal Estate Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will for BBMP apartments, BDA &amp; MUDA plots, tech startup ESOPs, US equities, and Bhoomi farm farmlands across Karnataka. Senior lawyer drafting, Kaveri 2.0 filing guidance, and Section 31 doorstep signing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Karnataka Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#karnataka-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Karnataka SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Karnataka HC Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Karnataka Stamp Duty</span>
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
                  src="/images/will-drafting-in-karnataka.jpg"
                  alt="Legal Will Drafting and Property Succession in Karnataka"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Karnataka Urban &amp; Tech Estate Blueprint
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
                250+ SROs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                All Karnataka Districts
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Karnataka Stamp Act Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                Kaveri 2.0
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Online Portal Filing
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                A Choice Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Sec 213 Non-Presidency Exemption
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN TWO-COLUMN LAYOUT: STICKY DESKTOP TOC + CONTENT
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* DESKTOP TOC: LEFT COLUMN (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black tracking-wider uppercase text-slate-700">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>ON THIS PAGE</span>
                </div>
                <nav className="space-y-1">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeId === item.id
                          ? "bg-rose-50 text-[#C65378] translate-x-1"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* QUICK CTAs SIDEBAR */}
              <div className="p-5 rounded-2xl bg-[#172228] text-white space-y-4">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-extrabold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>STATEWIDE LEGAL ADVICE</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need senior lawyer review for tech equity, BBMP flats, or Bhoomi farmland across Karnataka?
                </p>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="block w-full py-2.5 text-center text-xs font-extrabold rounded-xl bg-[#C65378] text-white hover:bg-[#a13c5d] transition-all cursor-pointer shadow-md"
                >
                  Start Will Online
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA: RIGHT COLUMN (9 COLS) */}
          <main className="lg:col-span-9 space-y-12 sm:space-y-16">

            {/* MOBILE QUICK-NAVIGATION ACCORDION */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-left"
              >
                <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-slate-800">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>SECTION: {currentActiveToc.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    mobileTocOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileTocOpen && (
                <div className="mt-2 p-3 rounded-2xl bg-white border border-slate-200 shadow-md grid grid-cols-2 gap-1.5 text-xs">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className="px-2.5 py-2 rounded-lg text-slate-700 hover:bg-rose-50 hover:text-[#C65378] font-bold"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION: OVERVIEW & COMPARISON TABLE */}
            <section id="karnataka-overview" className="scroll-target space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>KARNATAKA ESTATE TRANSMISSION OVERVIEW</span>
                </div>

                {/* H2: Length 54 chars <= 70 */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Karnataka
                </h2>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Drafting an enforceable Will in Karnataka requires harmonizing modern digital wealth (startup stock options, tech equity, US RSUs) with tangible real estate (BBMP &apos;A&apos; Khata apartments, BDA layouts, MUDA plots, and Bhoomi farm lands). Under the <strong>Indian Succession Act, 1925</strong> and the <strong>Filing Act, 1908</strong>, Karnataka is a non-presidency area where court probate is non-needed. A properly filed Will at the SRO office via the Kaveri 2.0 portal guarantees swift city name change and complete protection against family fights.
                </p>

                {/* COMPARISON TABLE */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3.5 font-bold">Estate Parameter</th>
                        <th className="p-3.5 font-bold">Plain Will</th>
                        <th className="p-3.5 font-bold text-rose-300">Filed Will (Kaveri 2.0)</th>
                        <th className="p-3.5 font-bold">No Will (Without a Will)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">Legal Validity in Karnataka</td>
                        <td className="p-3.5">Valid if signed by 2 witnesses</td>
                        <td className="p-3.5 font-semibold text-emerald-700">Highest proof presumption</td>
                        <td className="p-3.5 text-rose-600">State estate laws apply</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">BBMP e-Khata Name Change</td>
                        <td className="p-3.5">May require sworn notes / NOC</td>
                        <td className="p-3.5 font-semibold text-emerald-700">Direct e-Aasthi substitution</td>
                        <td className="p-3.5">Estate paper required</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">Bhoomi Farmland Name Change</td>
                        <td className="p-3.5">Revenue inquiries / objections</td>
                        <td className="p-3.5 font-semibold text-emerald-700">Direct Pahani / RTC update</td>
                        <td className="p-3.5">Equal division among Class-I heirs</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">High Court Probate Rule</td>
                        <td className="p-3.5">A Choice in Karnataka</td>
                        <td className="p-3.5 font-semibold text-emerald-700">Completely non-needed</td>
                        <td className="p-3.5">Estate petition needed</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">Tech Stocks &amp; Startup ESOPs</td>
                        <td className="p-3.5">Company board review delays</td>
                        <td className="p-3.5 font-semibold text-emerald-700">Smooth corporate transfer</td>
                        <td className="p-3.5">Lengthy legal heir certification</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">Karnataka Govt Filing Fee</td>
                        <td className="p-3.5">Nil (Not filed)</td>
                        <td className="p-3.5 font-semibold text-emerald-700">Flat ₹200 fee + ₹200 scanning</td>
                        <td className="p-3.5">Court fees up to 3% to 5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK IN KARNATAKA */}
            <section id="karnataka-legal-framework" className="scroll-target space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CODIFICATION IN KARNATAKA</span>
                </div>
                {/* H2: Length 47 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Karnataka
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will estate in Karnataka is regulated by central statutes alongside specialized state land revenue and city laws:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                    <span>Indian Succession Act, 1925</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Section 59 establishes sound mind (sound mind and legal age). Section 63 governs signing formalities: the Will maker must sign or affix their mark in the concurrent presence of two independent witnesses.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                    <span>Filing Act, 1908 (Section 18 &amp; 31)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Section 18(e) classifies Will filing as a choice. Section 31 empowers Sub-Registrars to attend private residences for elderly or medically infirm citizens to record filing biometrics.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                    <span>Karnataka Stamp Act, 1957</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Wills are completely exempt from ad valorem stamp duty across Karnataka. Regardless of whether an estate is worth fifty lakhs or fifty crores, zero stamp duty is payable on the Will deed.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                    <span>Karnataka Land Revenue Act, 1964</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Section 128 regulates acquisition of land rights by estate. Will bequests of farm land are updated on computerized Bhoomi RTC / Pahani records without civil court intervention.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>KAVERI 2.0 REGISTRATION PROTOCOLS</span>
                </div>
                {/* H2: Length 46 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Karnataka?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  While Will filing is legally a choice under Section 18(e) of the Filing Act, 1908, senior estate lawyers universally advise formal Book III filing in Karnataka for three critical reasons:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        1. Strong Proof Value Under Section 60
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        When a SRO registers a Will on the Kaveri 2.0 portal, the officer verifies the Will maker&apos;s physical presence, mental competence, and identity via Aadhaar biometrics. Indian courts attach a strong presumption of genuine signing to filed instruments.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        2. Permanent Book III Government Archive
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        An plain Will kept in private drawers risks being misplaced, stolen, or surreptitiously destroyed by disgruntled heirs. A filed Will remains permanently encrypted in the Karnataka Office of Stamps and Filing archives. Certified copies can always be retrieved upon providing the Will maker&apos;s death paper.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        3. Friction-Free BBMP e-Aasthi &amp; Bhoomi Name Change
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        Bengaluru civic bodies (BBMP, BDA), Mysuru MUDA, and rural revenue offices readily process name change entries when presented with an authenticated Book III filed Will, bypassing lengthy public objection notices and civil estate fights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES IN KARNATAKA */}
            <section id="karnataka-probate-rules" className="scroll-target space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT OF KARNATAKA JURISPRUDENCE</span>
                </div>
                {/* H2: Length 56 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Karnataka Probate Law: High Court Exemption Standards
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A widespread misconception among asset owners in Bengaluru and across Karnataka is that probate from a civil court is needed before inherited real estate or bank accounts can be transferred.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed">
                  <strong>The Law in Karnataka:</strong> Under Section 213(2) read with Section 57(a) and (b) of the Indian Succession Act, 1925, probate is needed <strong>only</strong> for Wills signed within the territorial limits of the former ordinary original civil area of the High Courts of Bombay, Calcutta, and Madras, or where land and flats falls within those presidency territories.
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    Karnataka is a <strong>non-presidency territory</strong>. The High Court of Karnataka has established that probate or letters of management are <strong>not needed</strong> for establishing Will rights in Karnataka for Indian citizens, including Hindus, Buddhists, Sikhs, Jains, Christians, and Muslims.
                  </p>
                  <p>
                    This means heirs do not need to incur exorbitant civil court filing fees (up to 3% to 5% of asset value) or endure years of court court fights. Producing the original filed Will, death paper, and legal heir tree enables direct transfer across Karnataka.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY & KAVERI 2.0 BOOKING */}
            <section id="karnataka-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>DEPARTMENT OF STAMPS &amp; REGISTRATION DIRECTORY</span>
                </div>
                {/* H2: Length 52 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Karnataka SRO Directory: Kaveri 2.0 Online Booking
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will filing across all 31 districts of Karnataka is processed through the state government&apos;s modernized <strong>Kaveri 2.0 Portal</strong> (kaveri.karnataka.gov.in). Use the directory below to explore major SRO office hubs, operational timings, and territorial areas:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by city, locality (e.g., Koramangala, Whitefield, Mysuru, Hubballi, Belagavi)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                />
              </div>

              {/* INTERACTIVE HUB SELECTOR */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {filteredHubs.map((hub) => (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      selectedHub === hub.id
                        ? "bg-[#172228] text-white border-[#172228] shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{hub.name}</div>
                    <div className={`text-[11px] truncate mt-1 ${selectedHub === hub.id ? "text-rose-300" : "text-slate-500"}`}>
                      {hub.sro}
                    </div>
                  </button>
                ))}
              </div>

              {/* SELECTED HUB DETAILS CARD */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-extrabold text-[#C65378] uppercase tracking-wider">
                      Selected Registry Hub
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900">{activeHubData.name}</h3>
                  </div>
                  <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#C65378] border border-rose-100">
                    Kaveri 2.0 Enabled
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block font-semibold">SRO Office:</span>
                    <span className="font-bold text-slate-900">{activeHubData.sro}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Office Address:</span>
                    <span className="font-bold text-slate-900">{activeHubData.address}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Citizen Timings:</span>
                    <span className="font-bold text-slate-900">{activeHubData.timings}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-500 block text-xs font-semibold mb-1">Area Coverage:</span>
                  <p className="text-xs text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {activeHubData.areas}
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 5: REGIONAL CITIES COVERAGE (EXACT SAME COMPONENT TYPE AS NASHIK)
                ========================================================================= */}
            <section id="karnataka-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                {/* H2: Length 55 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: City-Wise Will Drafting in Karnataka
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate holdings across Karnataka vary widely, from multi-crore tech equity, unvested ESOPs, and BBMP luxury apartments in Bengaluru, to MUDA home layouts in Mysuru, coastal export and tile units in Mangaluru, engineering foundries in Belagavi, and APMC wholesale firms in Hubballi. Our estate lawyers deliver customized legal drafting, Kaveri 2.0 online slot scheduling, and SRO accompaniment across all key regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: BENGALURU URBAN & TECH CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Metropolitan &amp; Global IT Capital
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gandhinagar &amp; Koramangala
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bengaluru &amp; Tech Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Indiranagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Koramangala</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Whitefield</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">HSR Layout</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Electronic City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jayanagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Bengaluru</strong> for tech executives, startup founders, and NRIs. Protects vested and unvested ESOPs, US RSUs (Morgan Stanley / Charles Schwab), intellectual asset, and BBMP &apos;A&apos; Khata gated community villas to prevent family fight.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sheshadri Road, BDA Koramangala &amp; Jayanagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Kaveri 2.0 digital token booking, biometric appointment coordination, and Section 31 home visits across Bengaluru.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹200 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bengaluru"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bengaluru Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: MYSURU & MANDYA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Cultural Capital
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mysuru North &amp; South
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mysuru &amp; Mandya
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jayalakshmipuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gokulam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kuvempunagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saraswathipuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vijayanagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chamundi Hill</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Mysuru</strong> for family heritage bungalows, MUDA home plots, and silk/handicraft trading businesses. Features clear life-interest rules for surviving spouses and clean MUDA Khata transfer guidelines.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Vidhana Soudha, Nazarbad</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Kaveri 2.0 e-KYC slot booking at Nazarbad SRO, senior citizen doorstep filing, and doctor capacity witness signing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">MUDA Plots &amp; Heritage Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mysuru"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mysuru Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: MANGALURU & UDUPI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Coastal Port &amp; NRI Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mangaluru Taluk &amp; Udupi
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mangaluru &amp; Udupi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kadri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bejai</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Urwa</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Falnir</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Manipal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Surathkal</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Mangaluru and Udupi</strong> for coastal shop businesses, tile/cashew export enterprises, and Gulf/overseas NRI repatriated assets. Drafted to make sure seamless Mangaluru City City Board (MCC) name change and bank transfer.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Hampankatta Mini Vidhana Soudha</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Hampankatta Mini Vidhana Soudha SRO appointments, NRI power of attorney alignment, and Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Coastal &amp; NRI Estate</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mangaluru"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mangaluru Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: HUBBALLI & DHARWAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Karnataka Shop Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Hubballi City &amp; Dharwad
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Hubballi &amp; Dharwad
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vidyanagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Keshwapur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shirur Park</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Navanagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rayapur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gokul Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Hubballi-Dharwad</strong> tailored to wholesale APMC trade enterprises, manufacturing units in Gokul Road plant estate, and HDMC home assets under Karnataka High Court Dharwad Bench area.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Court Circle, Lamington Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Mini Vidhana Soudha slot booking, business asset inventorying, and physical lawyer accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop Trade &amp; HDMC Flats</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Hubballi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Hubballi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: BELAGAVI & NORTH-WEST BORDER */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Foundry &amp; Engineering Center
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Belagavi City &amp; Rural
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Belagavi &amp; Border Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tilakwadi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Camp</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Udyambag</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hindwadi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vadgaon</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shahapur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Structured <strong>Will drafting services in Belagavi</strong> for precision engineering foundries in Udyambag MIDC/KIADB, Cantonment home leaseholds, and cross-border Maharashtra-Karnataka family assets with bilingual legal precision.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Compound, Club Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Belagavi SRO Kaveri 2.0 booking, Cantonment Board estate check, and Section 31 home visits.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Plant &amp; Cantonment Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Belagavi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Belagavi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: KALABURAGI, BALLARI & AGRO-BELTS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Kalyana-Karnataka &amp; Mineral Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kalaburagi &amp; Ballari
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kalaburagi &amp; Ballari
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Brahmpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sedam Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">MSK Mill Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cantonment Ballari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Brucepet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hospet</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Kalaburagi and Ballari</strong> for dal mill agro-industries, shop mining equipment, and farm farmlands under Bhoomi. Integrates Section 128 of Karnataka Land Revenue Act for smooth RTC name change.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sedam Road &amp; Station Road Ballari</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Mini Vidhana Soudha registry facilitation, Bhoomi portal estate guidance, and farm land check.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Agro-Farms &amp; Bhoomi RTC Name Change</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kalaburagi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Karnataka Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-karnataka-sop" className="scroll-target space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>SYSTEMATIC 5-STEP PROTOCOL</span>
                </div>
                {/* H2: Length 55 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to Kaveri 2.0 Filing
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this checked standard operating step to draft, execute, and register your Will under Karnataka area:
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Compile Asset Schedule &amp; Successor List
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile full asset particulars: BBMP e-Khata numbers, BDA/MUDA allottee papers, survey numbers for Bhoomi farm land, stock broker demat client IDs, tech company ESOP grants, and bank account numbers. Identify primary and alternate heirs, and appoint a capable executor.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Draft Customized Clauses with Lawyer Review
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our legal experts craft legal clauses: unequivocal revocation of prior instruments, specific legacy bequests, residuary clauses, Will trusts for minor children, and clear life-interest allocations for surviving spouses.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Physical Witness Signing by Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on clean A4 paper. Under Section 63 of the Indian Succession Act, sign or thumbprint every page in the simultaneous presence of two adult witnesses who have no beneficial stake in the bequests.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Book Kaveri 2.0 Appointment &amp; Pay KII-Challan
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log into the Kaveri 2.0 portal (kaveri.karnataka.gov.in), enter Will maker and witness KYC details, generate the KII-challan for the ₹200 filing fee plus ₹200 scanning charges, and reserve your preferred time slot at the local SRO.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      SRO Biometrics &amp; Book III Filing
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the SRO office with both witnesses. The SRO verifies mental soundness, captures live webcam photographs and digital thumb impressions, endorses the paper under Section 60, and hands over the filed Will deed.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION IN KARNATAKA</span>
                </div>
                {/* H2: Length 59 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Filing for Senior Citizens
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly citizens, bedridden people, or patients who cannot physically travel to congested SRO offices in Bengaluru, Mysuru, or Mangaluru, Karnataka law provides a compassionate legal remedy:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Section 31 Special Commission Rules
                    </h3>
                    <p>
                      Under <strong>Section 31 of the Filing Act, 1908</strong>, the SRO is legally empowered to attend the private residence, nursing home, or hospital of a Will maker to accept a Will for Book III filing.
                    </p>
                    <p>
                      A filed medical practitioner (MBBS/MD) issues a paper confirming that while the Will maker is physically unable to travel, their mental faculties, cognitive comprehension, and Will understanding are 100% sound.
                    </p>
                    <p>
                      Our lawyer team handles the entire Section 31 requisition petition, schedules the commissioner date with the local SRO, and coordinates the biometric capture equipment directly at your home.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>VERIFICATION AUDIT CHECKLIST</span>
                </div>
                {/* H2: Length 57 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Paper Checklist for Karnataka SRO Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Use this free checklist to verify that all necessary paperwork is ready before your Kaveri 2.0 SRO appointment:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Checklist Readiness: {checkedCount} / {checklist.length} Completed
                  </span>
                  <span className="text-xs font-extrabold text-[#C65378]">
                    {checkedCount === checklist.length ? "All Ready for SRO" : "Pending Documents"}
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200 text-slate-900"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-1 h-4 w-4 rounded-sm border-slate-300 text-[#C65378] focus:ring-[#C65378] cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs sm:text-sm font-bold text-slate-900">{item.label}</div>
                        <div className="text-[11px] sm:text-xs text-slate-500">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: KARNATAKA PROPERTY TYPES */}
            <section id="karnataka-property-types" className="scroll-target space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ESTATE CLASSES &amp; ASSET SPECIFICITIES</span>
                </div>
                {/* H2: Length 59 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Karnataka Asset Types: Tech Assets, BBMP &amp; Bhoomi Land
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate planning across Karnataka requires distinct legal clauses for each asset class:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                    <Cpu className="w-4 h-4 text-[#C65378]" />
                    <span>Tech Startup Equity, ESOPs &amp; RSUs</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Will treatment for unvested and vested employee stock options, founder shares, US tech equities (RSUs via overseas brokerages), and intellectual asset portfolios. Ensures clear transfer without corporate board fights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>BBMP &apos;A&apos; Khata &amp; &apos;B&apos; Khata Apartments</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Addresses undivided share of land (UDS), dedicated basement car parking slots, and e-Aasthi city filing for home high-rises and gated societies across Bengaluru Urban and Rural.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>BDA &amp; MUDA Allottee Plots</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Will bequests of development office plots in Bengaluru and Mysuru. Includes lease-cum-sale agreements, conditional allotment clauses, and possession papers to make sure seamless office transfer.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                    <Wheat className="w-4 h-4 text-[#C65378]" />
                    <span>Bhoomi Farm Lands &amp; Plantations</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Farmland, coconut groves, and coffee plantations across Mandya, Hassan, and Kodagu governed by the Karnataka Land Reforms Act. Bequeathed lands are mutated via Bhoomi RTC records without civil court court fights.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: OFFICIAL REGISTRATION FEES */}
            <section id="karnataka-registration-fees" className="scroll-target space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT GOVERNMENT TARIFFS</span>
                </div>
                {/* H2: Length 50 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Kaveri 2.0 Filing Fees &amp; Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds which attract substantial ad valorem stamp duty in Karnataka, registering a Will involves nominal government fees:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-bold">Government Fee Head</th>
                      <th className="p-3.5 font-bold">Legal Rate in Karnataka</th>
                      <th className="p-3.5 font-bold">Payment Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Stamp Duty on Will</td>
                      <td className="p-3.5 font-semibold text-emerald-700">₹0 (Completely Exempt)</td>
                      <td className="p-3.5">Exempt under Karnataka Stamp Act</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Legal Filing Fee</td>
                      <td className="p-3.5 font-semibold text-slate-900">₹200 (Nominal flat fee)</td>
                      <td className="p-3.5">KII-Challan on Kaveri 2.0 portal</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Computer Scanning Charges</td>
                      <td className="p-3.5 font-semibold text-slate-900">₹200 (Flat data processing)</td>
                      <td className="p-3.5">Included in Kaveri 2.0 e-challan</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Section 31 Doorstep Visit Fee</td>
                      <td className="p-3.5 font-semibold text-slate-900">₹1,000 + conveyance charges</td>
                      <td className="p-3.5">Paid at SRO with medical paper</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: TRANSPARENT PACKAGES & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT PROFESSIONAL PLANS</span>
                </div>
                {/* H2: Length 53 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in Karnataka
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the drafting and filing package suited to your estate complexity. Fixed transparent pricing with zero hidden fees:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TIER 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      ESSENTIAL PLAN
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">Online Lawyer-Drafted Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#172228]">₹1,990</span>
                      <span className="text-xs text-slate-500 font-semibold">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for standard home flats, bank accounts, and simple single-family inheritances.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Customized legal drafting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>BBMP e-Khata clauses included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Witness signing instructions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="block w-full py-3 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold text-center text-xs transition-colors cursor-pointer"
                    >
                      Choose Essential Plan
                    </a>
                  </div>
                </div>

                {/* TIER 2 - FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 flex flex-col justify-between shadow-lg relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[11px] font-black uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                      ADVOCATE CONSULTATION
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">Senior Lawyer Review</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#C65378]">₹4,990</span>
                      <span className="text-xs text-slate-500 font-semibold">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recommended for tech founders, ESOP holders, NRI assets, and multi-asset estates.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>1-on-1 Senior Lawyer call</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Tech equity &amp; US RSU structuring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Bhoomi farm clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Doctor capacity paper format</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="block w-full py-3 rounded-xl bg-[#C65378] text-white hover:bg-[#a13c5d] font-bold text-center text-xs transition-colors cursor-pointer shadow-md"
                    >
                      Choose Lawyer Review
                    </a>
                  </div>
                </div>

                {/* TIER 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      FULL REGISTRY EXECUTION
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">Done-For-You Filing</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#172228]">₹9,990</span>
                      <span className="text-xs text-slate-500 font-semibold">one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete end-to-end service including Kaveri 2.0 slot booking, SRO accompaniment or home visit.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Everything in Lawyer Review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Kaveri 2.0 portal slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Lawyer presence at SRO registry</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Section 31 doorstep help</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="block w-full py-3 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold text-center text-xs transition-colors cursor-pointer"
                    >
                      Choose Full Filing
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMONLY ASKED LEGAL QUESTIONS</span>
                </div>
                {/* H2: Length 58 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in Karnataka
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Get clear, lawyer-checked answers to common questions regarding Will drafting, Kaveri 2.0 filing, and asset estate across Karnataka:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-extrabold text-sm sm:text-base text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                          openFaq === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS & LEGAL PORTALS */}
            <section id="statutory-citations" className="scroll-target space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CITATIONS &amp; GOVERNMENT PORTALS</span>
                </div>
                {/* H2: Length 48 chars <= 70 */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Citations &amp; Karnataka Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will instruments in Karnataka operate under the office of key statutes and official government digital platforms:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Kaveri 2.0 Portal</span>
                  <p className="text-slate-600 text-xs">
                    kaveri.karnataka.gov.in - Office of Stamps &amp; Filing portal for online slot bookings, KII-challan payments, and Book III filing records.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Bhoomi Karnataka Portal</span>
                  <p className="text-slate-600 text-xs">
                    bhoomi.karnataka.gov.in - Revenue Office portal for land records, online name change (Pahani / RTC), and name change status tracking under Section 128 KLRA.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <span className="font-bold text-slate-900 block">BBMP e-Aasthi &amp; Khata Services</span>
                  <p className="text-slate-600 text-xs">
                    bbmpeaasthi.karnataka.gov.in - Bruhat Bengaluru Mahanagara Palike portal for digital &apos;A&apos; Khata and &apos;B&apos; Khata estate mutations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <span className="font-bold text-slate-900 block">High Court of Karnataka</span>
                  <p className="text-slate-600 text-xs">
                    karnatakahiighcourt.kar.nic.in - Principal Bench Bengaluru, Dharwad Bench, and Kalaburagi Bench judicial precedents confirming non-needed probate.
                  </p>
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
          HIGH-RES IMAGE MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative max-w-5xl w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black">
            <Image
              src="/images/will-drafting-in-karnataka.jpg"
              alt="Legal Will Drafting and Property Succession in Karnataka"
              width={1200} height={675}
              className="absolute inset-0 w-full h-full object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
