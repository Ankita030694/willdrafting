"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  FileText,
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
  Laptop,
  Coins,
  Cpu,
  PhoneCall,
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
  { id: "bengaluru-overview", label: "OVERVIEW" },
  { id: "karnataka-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "kaveri-portal-registration", label: "KAVERI 2.0 PORTAL" },
  { id: "tech-estate-planning", label: "TECH ASSETS & KHATA" },
  { id: "bengaluru-probate-rules", label: "PROBATE RULES" },
  { id: "step-by-step-bengaluru-sop", label: "ONLINE SOP" },
  { id: "bengaluru-sro-directory", label: "SRO DIRECTORY" },
  { id: "bengaluru-area-coverage", label: "LOCAL AREAS" },
  { id: "section-31-home-visit", label: "DOORSTEP SRO" },
  { id: "bengaluru-documents-checklist", label: "DOCUMENTS" },
  { id: "bengaluru-service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "LEGAL CITATIONS" },
];

const BENGALURU_DISTRICTS = [
  {
    id: "east-it-corridor",
    name: "East Bengaluru & IT Corridor",
    sro: "SRO Mahadevapura, SRO Varthur (Whitefield) & SRO Shivajinagar",
    address: "Old Madras Road, K.R. Puram & Hope Farm Circle, Whitefield, Bengaluru",
    areas: "Whitefield, ITPL, Marathahalli, Bellandur, Outer Ring Road, Mahadevapura, Kadugodi, Varthur, Brookefield, Hoodi, Indiranagar, Domlur, HAL",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "south-tech-hubs",
    name: "South Bengaluru (Koramangala, HSR & E-City)",
    sro: "SRO Koramangala / BTM Layout, SRO Bommanahalli & SRO Begur",
    address: "9th Block Jayanagar, Agara HSR Sector 2 & Hosur Main Road, Bengaluru",
    areas: "Koramangala (Blocks 1-8), HSR Layout (Sectors 1-7), BTM Layout, Electronic City (Phases 1 & 2), Bommanahalli, Kudlu Gate, Begur, Singasandra, Sarjapur Road, Haralur",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "central-cbd",
    name: "Central & Heritage Bengaluru (CBD)",
    sro: "SRO Gandhinagar, SRO Basavanagudi & SRO Malleshwaram",
    address: "Mini Vidhana Soudha, K.G. Road & Bull Temple Road, Netkallappa Circle",
    areas: "MG Road, Lavelle Road, Richmond Town, Vasanth Nagar, Malleshwaram, Sadashivanagar, Basavanagudi, Chamarajpet, Shankarapuram, Gandhi Bazaar",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "north-airport",
    name: "North Bengaluru & Airport Corridor",
    sro: "SRO Yelahanka, SRO Byatarayanapura (Hebbal) & SRO Devanahalli",
    address: "Mini Vidhana Soudha, Yelahanka New Town & Bellary Road, Hebbal",
    areas: "Hebbal, Sahakar Nagar, Yelahanka, Manyata Tech Park, Thanisandra, Hennur Road, Jakkur, Nagawara, Vidyaranyapura, Devanahalli, Airport Road",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "west-industrial",
    name: "West Bengaluru & Mysore Road",
    sro: "SRO Rajajinagar, SRO Vijayanagar & SRO Kengeri",
    address: "2nd Block Rajajinagar & Kengeri Satellite Town, Mysore Road",
    areas: "Rajajinagar, Vijayanagar, Basaveshwaranagar, Mahalakshmi Layout, Nagarbhavi, Chandra Layout, Kengeri, Mysore Road, RR Nagar",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "rural-anekal",
    name: "Anekal & South Rural Hub",
    sro: "SRO Anekal & SRO Chandapura",
    address: "Taluk Office Compound, Anekal & Chandapura Circle, Bengaluru Rural",
    areas: "Chandapura, Attibele, Anekal Town, Jigani Industrial Area, Bannerghatta Road outer belt",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Final Will Document",
    desc: "Print cleanly on plain white A4 paper. Number all pages in order.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Aadhaar Card of the Testator",
    desc: "Carry your original Aadhaar card and photocopies for ID check.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Adult Witnesses with Valid ID Cards",
    desc: "Witnesses must not get any property in the Will. Both must bring original IDs.",
    checked: false,
  },
  {
    id: "item-4",
    label: "BBMP Khata Certificate & Property Tax Receipt",
    desc: "Bring your A Khata or B Khata slip, sale deed, or BDA allotment letter.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Tech Assets & Demat Share Account Details",
    desc: "List your startup stock grant letters, US share accounts, and demat numbers.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Doctor Certificate of Mental Fitness for Seniors",
    desc: "A brief letter from an MBBS doctor confirming sound mind and memory.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Kaveri 2.0 Slot Booking Slip & Fee Receipt",
    desc: "Your appointment time slip and ₹200 fee receipt from the Kaveri portal.",
    checked: false,
  },
  {
    id: "item-8",
    label: "Recent Passport Size Color Photos",
    desc: "Two passport photos with a clear white background for the office file.",
    checked: false,
  },
];

const TECH_ASSETS = [
  {
    title: "Startup Stock & Unlisted ESOPs",
    category: "Startup Wealth",
    challenge: "Stock options can expire after death if company policy is not met.",
    solution: "List vested shares, folio numbers, and nominee names in your Will.",
    icon: Laptop,
  },
  {
    title: "US Stocks & Global RSUs",
    category: "Global Assets",
    challenge: "US broker portals ask for court probate if your Will is unclear.",
    solution: "Add clear cross-border terms that follow Indian law and foreign broker rules.",
    icon: Cpu,
  },
  {
    title: "BBMP A Khata & B Khata Flats",
    category: "Real Estate",
    challenge: "Family fights can block municipal tax transfer on the e-Aasthi site.",
    solution: "A registered Will gives clear legal proof for fast Khata name transfer.",
    icon: Building,
  },
  {
    title: "Demat Accounts & Mutual Funds",
    category: "Investments",
    challenge: "A nominee is only a caretaker, not the legal owner of your shares.",
    solution: "Your Will names the true owner. This stops fights between heirs and nominees.",
    icon: Coins,
  },
];

export default function BengaluruLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("bengaluru-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("east-it-corridor");
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

  const filteredDistricts = BENGALURU_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    BENGALURU_DISTRICTS.find((d) => d.id === selectedDistrict) || BENGALURU_DISTRICTS[0];

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
                <Cpu className="w-3.5 h-3.5 text-[#C65378]" />
                <span>BENGALURU TECH &amp; PROPERTY SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 58 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Bengaluru: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Create a legally binding Will in Bengaluru. Secure your startup ESOPs, US RSUs, BBMP Khata apartments, and investment portfolios with senior estate lawyers. Get complete Kaveri 2.0 portal registration support across Bengaluru Urban and Rural.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Bengaluru Will</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all text-center"
                >
                  <PhoneCall className="w-4 h-4 text-rose-200" />
                  <span>Talk to an Estate Lawyer</span>
                </Link>
              </div>

              {/* TRUST BADGES ROW */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/15 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kaveri 2.0 Slot Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Karnataka Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Startup ESOPs &amp; RSUs</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO VISUAL & VERIFIED BADGE (5 COLS) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/60 group">
                <Image
                  src="/images/will-drafting-in-bengaluru.jpg"
                  alt="Online Will Drafting and Property Succession in Bengaluru"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <button
                  type="button"
                  onClick={() => setShowHighResModal(true)}
                  aria-label="View Full Bengaluru Estate Blueprint"
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-md bg-[#172228]/85 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 hover:bg-[#C65378] transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview Blueprint</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          QUICK VALUE BANNER
          ========================================================================= */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 border-r border-slate-100 last:border-none">
              <span className="block text-xl sm:text-2xl font-extrabold text-[#172228]">₹0 Stamp Duty</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#55636D]">Under Karnataka Stamp Act</span>
            </div>
            <div className="p-3 border-r border-slate-100 last:border-none">
              <span className="block text-xl sm:text-2xl font-extrabold text-[#C65378]">Kaveri 2.0</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#55636D]">Direct Slot Booking</span>
            </div>
            <div className="p-3 border-r border-slate-100 last:border-none">
              <span className="block text-xl sm:text-2xl font-extrabold text-[#172228]">43+ SROs</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#55636D]">Across Urban &amp; Rural</span>
            </div>
            <div className="p-3">
              <span className="block text-xl sm:text-2xl font-extrabold text-emerald-700">BBMP A &amp; B</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#55636D]">Seamless Khata Transfer</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN LAYOUT: STICKY TOC ON LEFT (3 COLS) + MAIN CONTENT ON RIGHT (9 COLS)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =====================================================================
              LEFT SIDEBAR: DESKTOP TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Bengaluru Guide Index</span>
              </div>
              <nav className="space-y-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378] translate-x-1"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* =====================================================================
              MOBILE FLOATING TOC BAR
              ===================================================================== */}
          <div className="lg:hidden col-span-1 fixed bottom-4 left-4 right-4 z-40">
            <div className="bg-[#172228] text-white rounded-full shadow-2xl p-2 px-4 flex items-center justify-between border border-white/15 backdrop-blur-md">
              <span className="text-xs font-medium truncate max-w-[200px]">
                {currentActiveToc?.label || "TABLE OF CONTENTS"}
              </span>
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="px-3 py-1.5 rounded-full bg-[#C65378] text-xs font-bold flex items-center gap-1.5"
              >
                <span>Navigate</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileTocOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {mobileTocOpen && (
              <div className="mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-h-80 overflow-y-auto">
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className="px-3 py-2 rounded-lg text-slate-700 hover:bg-rose-50 hover:text-[#C65378]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* =====================================================================
              RIGHT MAIN CONTENT: 9 COLUMNS
              ===================================================================== */}
          <main className="col-span-1 lg:col-span-9 space-y-12">
            {/* -----------------------------------------------------------------
                SECTION 0: OVERVIEW
                ----------------------------------------------------------------- */}
            <section id="bengaluru-overview" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                <span>Bengaluru Urban &amp; Rural Jurisdiction</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Estate Succession for India&apos;s Technology Capital
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Bengaluru is India&apos;s tech capital. Over one million engineers, founders, and creators live here. Their wealth includes flats, startup stock, foreign shares, and digital assets.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Without a Will, your family may face painful delays in government offices. Land titles can get stuck in BBMP Khata files. Also, startup stock options can expire if not claimed in time. WillDrafting makes it fast and safe to draft your Will online with expert lawyers.
              </p>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 1: LEGAL FRAMEWORK
                H2 Length: 56 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="karnataka-legal-framework" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Scale className="w-3.5 h-3.5" />
                <span>Statutory Compliance</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                1. Karnataka Succession Law: Legal Framework in Bengaluru
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Every Will made in Bengaluru follows the Indian Succession Act, 1925. Whether you own a flat in Indiranagar or startup equity in Koramangala, three key rules make your Will valid:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#172228] text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Sound Mind</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 59, you must be of sound mind. You must make the Will freely, without force.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 63, you must sign the Will before two adult witnesses who see you sign.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#5F7E75] text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Neutral Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 67, witnesses cannot receive gifts in the Will. Beneficiaries must never sign as witnesses.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Self-Acquired Assets vs Family Property</span>
                </div>
                <p>
                  You can give away all property that you bought or earned yourself. This includes savings, startup shares, and flats. For ancestral Hindu property, you can only give your own share under Section 30 of the Hindu Succession Act.
                </p>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 2: KAVERI 2.0 PORTAL
                H2 Length: 58 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="kaveri-portal-registration" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Paperless Governance</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                2. Kaveri 2.0 Portal: Online Will Registration in Karnataka
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Karnataka created the Kaveri 2.0 site to make registration fast and simple. Registering a Will is optional under Section 18(e) of the Registration Act, 1908. But registering on Kaveri 2.0 stores your Will safely in Book III records.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                      <th className="p-3.5 font-bold">Key Point</th>
                      <th className="p-3.5 font-bold text-[#C65378]">Kaveri 2.0 Registered Will</th>
                      <th className="p-3.5 font-bold text-slate-600">Unregistered Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3.5 font-medium text-slate-900">Official Record</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Stored safely in official Book III</td>
                      <td className="p-3.5 text-slate-600">No public record; risk of loss or damage</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-900">Identity Proof</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Thumb scan &amp; photo on file</td>
                      <td className="p-3.5 text-slate-600">Signature only; risk of false claims</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-900">BBMP Khata Transfer</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Fast processing on e-Aasthi</td>
                      <td className="p-3.5 text-slate-600">May need court succession papers</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-900">Official Fee</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Low flat fee of ₹200</td>
                      <td className="p-3.5 text-slate-600">₹0 fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 italic">
                Note: Registering your Will does not make it public. Wills stay confidential in Book III registers during your lifetime.
              </p>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 3: TECH ESTATE PLANNING & BBMP KHATA
                H2 Length: 60 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="tech-estate-planning" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-xs font-bold uppercase tracking-wider text-blue-800">
                <Laptop className="w-3.5 h-3.5 text-blue-600" />
                <span>Startup Wealth Structuring</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                3. Tech Estates: Startup ESOPs, RSUs &amp; BBMP Khata Properties
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Tech professionals in Bengaluru need a Will that covers both land and digital wealth. Standard paper forms cannot handle stock grants or municipal land records.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {TECH_ASSETS.map((asset, idx) => {
                  const Icon = asset.icon;
                  return (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-white text-[#C65378] shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                          {asset.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{asset.title}</h3>
                      <div className="space-y-1.5 text-xs">
                        <p className="text-rose-700 font-medium">Risk: {asset.challenge}</p>
                        <p className="text-slate-600">Legal Fix: {asset.solution}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BBMP KHATA EXPLAINER BOX */}
              <div className="p-5 rounded-2xl bg-[#172228] text-white space-y-3">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>BBMP A Khata vs B Khata Succession Guide</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  BBMP maintains two property tax registers. An <strong>A Khata</strong> certificate shows full compliance with approved building plans. A <strong>B Khata</strong> entry is a tax listing for unapproved layouts or buildings without an Occupancy Certificate (OC).
                </p>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  You can give away both A Khata and B Khata property in your Will. A registered Will helps your heirs update property records on the BBMP e-Aasthi website without long disputes.
                </p>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 4: PROBATE IN BENGALURU
                H2 Length: 56 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="bengaluru-probate-rules" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-xs font-bold uppercase tracking-wider text-purple-800">
                <Landmark className="w-3.5 h-3.5 text-purple-600" />
                <span>Court Jurisprudence</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                4. Probate in Bengaluru: Is Court Certification Required?
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Many people ask if they must get probate from a court in Bengaluru. Probate is an official court order that certifies that a Will is genuine. Under Indian law:
              </p>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Probate is NOT Mandatory for Bengaluru Wills</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is only compulsory in the old presidency towns of Mumbai, Kolkata, and Chennai. The Karnataka High Court has held that probate is optional for Hindus, Sikhs, Jains, and Buddhists in Bengaluru.
                </p>
              </div>

              <h3 className="text-base font-bold text-slate-900 pt-2">
                When is Voluntary Court Certification Helpful in Karnataka?
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>When relatives fight over the property in court.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>When apartment societies ask for a court order.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>When foreign firms demand an Indian court order for shares.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>When multiple different Wills are produced by heirs.</span>
                </li>
              </ul>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 5: 5-STEP PROCESS SOP
                H2 Length: 60 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="step-by-step-bengaluru-sop" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                <span>Fast-Track Protocol</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                5. Step-by-Step SOP: Online Will Process for Bengaluru Techies
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                WillDrafting makes estate planning simple and fast. You can draft your complete Will online from your home or laptop:
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    num: "01",
                    title: "Share Your Details Online",
                    desc: "List your Bengaluru flats, bank accounts, startup shares, and family members in our simple online form.",
                  },
                  {
                    num: "02",
                    title: "Lawyer Drafts Your Custom Will",
                    desc: "Our legal team drafts clear terms to protect your property, startup equity, and children&apos;s future.",
                  },
                  {
                    num: "03",
                    title: "Print and Sign the Document",
                    desc: "Print your Will on clean A4 paper. Sign every page before two adult witnesses who see you sign.",
                  },
                  {
                    num: "04",
                    title: "Kaveri 2.0 Upload and Slot Booking",
                    desc: "We file your data on the Kaveri portal, pay the official ₹200 fee, and book your SRO appointment slot.",
                  },
                  {
                    num: "05",
                    title: "Quick Biometric Visit at the SRO",
                    desc: "Visit your local Sub-Registrar office once with your witnesses for a fast 15-minute photo and thumb scan.",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xl sm:text-2xl font-black text-[#C65378] tracking-tight shrink-0">
                      {step.num}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 6: SRO DIRECTORY
                H2 Length: 58 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="bengaluru-sro-directory" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Building className="w-3.5 h-3.5" />
                <span>Registration Directory</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                6. Bengaluru SRO Directory: Urban &amp; Rural Registration Zones
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Bengaluru has over 43 Sub-Registrar offices under the Stamps Department. You can register your Will at the office for your home locality. Search your area below:
              </p>

              {/* SEARCH & FILTER BAR */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search locality (e.g. Whitefield, Koramangala, Indiranagar, HSR Layout)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C65378] focus:border-transparent bg-slate-50/50"
                />
              </div>

              {/* DISTRICT TABS */}
              <div className="flex flex-wrap gap-2 pt-1">
                {BENGALURU_DISTRICTS.map((district) => (
                  <button
                    key={district.id}
                    type="button"
                    onClick={() => {
                      setSelectedDistrict(district.id);
                      setSearchFilter("");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedDistrict === district.id && !searchFilter
                        ? "bg-[#172228] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {district.name}
                  </button>
                ))}
              </div>

              {/* ACTIVE SRO CARD */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase text-[#C65378] tracking-wider">
                      Selected Registration Hub
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {activeDistrictData.name}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold self-start sm:self-auto">
                    Kaveri 2.0 Enabled
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block">Designated SRO Offices:</span>
                    <span className="text-slate-900 font-medium">{activeDistrictData.sro}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Office Timings:</span>
                    <span className="text-slate-900 font-medium">{activeDistrictData.timings}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 font-semibold block">Office Location:</span>
                    <span className="text-slate-900 font-medium">{activeDistrictData.address}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 font-semibold block">Major Localities Covered:</span>
                    <span className="text-slate-800 font-medium">{activeDistrictData.areas}</span>
                  </div>
                </div>
              </div>

              {searchFilter && filteredDistricts.length === 0 && (
                <p className="text-center py-4 text-xs text-slate-500">
                  No matching offices found. Please contact our Bengaluru desk for help with your area.
                </p>
              )}
            </section>

            {/* -----------------------------------------------------------------
                SECTION 7: AREA-WISE WILL DRAFTING ACROSS BENGALURU
                ----------------------------------------------------------------- */}
            <section id="bengaluru-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>LOCAL AREA COVERAGE &amp; TECH CORRIDORS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  7. Area-Wise Will Drafting Services Across Bengaluru Tech Belts &amp; Suburbs
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  Looking for legally verified <strong>Will drafting services in Whitefield, Koramangala, Indiranagar, or Jayanagar</strong>? Property governance and asset structures vary across Bengaluru—from BBMP &apos;A&apos; Khata apartments and startup ESOP portfolios in Koramangala to BDA plotted bungalows in Indiranagar and gated villa communities in Whitefield.
                  Our senior advocates provide tailored legal drafting, Kaveri 2.0 portal slot bookings, and SRO assistance across all zones:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: KORAMANGALA & HSR LAYOUT */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Startup Heartland
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Koramangala
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Koramangala &amp; HSR Layout
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Koramangala (Blocks 1 to 8)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">HSR Layout (Sectors 1 to 7)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">BTM Layout &amp; Madivala</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sarjapur Road Junction</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Koramangala</strong> and HSR Layout for high-growth tech founders, venture capitalists, and product leads. Codifies unvested startup ESOPs, US tech equities (RSUs in Morgan Stanley/E*TRADE), intellectual property rights, and BBMP &apos;A&apos; Khata apartment titles without civil court delays.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: BDA Complex, Koramangala &amp; Gandhinagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Kaveri 2.0 biometric scheduling, ESOP trust succession clauses, and prompt legal execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹200 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Koramangala"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Koramangala Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: INDIRANAGAR & DOMLUR */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central &amp; East Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Indiranagar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Indiranagar &amp; Domlur
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Indiranagar (100 Ft &amp; CMH Road)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Domlur &amp; Cambridge Layout</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">HAL 2nd &amp; 3rd Stages</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Defence Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Prime <strong>Will drafting services in Indiranagar</strong> and Domlur for BDA freehold plotted bungalows, heritage residential estates, and valuable retail commercial leases. Ensures clear single-heir succession or structured partition with smooth BBMP Khata bifurcation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: BDA Complex, Indiranagar &amp; Shivajinagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep Section 31 visits for senior testators, commercial rental bequest clauses, and Kaveri 2.0 booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">BDA Plotted Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Indiranagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Indiranagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: WHITEFIELD & MARATHAHALLI */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        IT Corridor East
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Whitefield &amp; KR Puram
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Whitefield &amp; Marathahalli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Whitefield (ITPL &amp; Hope Farm)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Marathahalli &amp; Brookefield</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Varthur &amp; Kadugodi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">KR Puram &amp; Mahadevapura</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Whitefield</strong> and Marathahalli for gated villa enclaves, luxury high-rises, and tech leaders. We craft dual-jurisdiction mirror Wills for NRIs holding multinational bank portfolios, RSUs, and properties across India and abroad.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Vidhana Soudha, KR Puram &amp; Whitefield</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        NRI remote consultation, Kaveri 2.0 biometric scheduling, and gated society succession support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Gated Villas &amp; NRI Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Whitefield"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Whitefield Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: JAYANAGAR & JP NAGAR */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Bengaluru Traditional
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Jayanagar &amp; Basavanagudi
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Jayanagar &amp; JP Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jayanagar (Blocks 1 to 9)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">JP Nagar (Phases 1 to 8)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Basavanagudi &amp; Banashankari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Padmanabhanagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Generational <strong>Will drafting services in Jayanagar</strong> and JP Nagar for traditional family residences, ancestral properties, and retail businesses. Multi-heir distribution plans, registered MBBS doctor mental fitness certificates, and Section 31 doorstep execution.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Jayanagar 9th Block &amp; Basavanagudi Mini Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Section 31 home visits for elderly citizens, doctor certificates, and ancestral wealth safeguarding.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Senior Citizen &amp; Family Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jayanagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Jayanagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: ELECTRONIC CITY & BOMMANAHALLI */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Tech Corridor South
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bommanahalli &amp; Anekal
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Electronic City &amp; Bommanahalli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Electronic City Phases 1 &amp; 2</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bommasandra Industrial Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Neeladri Road &amp; Bettadasanapura</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Begur Road &amp; Kudlu Gate</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Streamlined <strong>Will drafting services in Electronic City</strong> and Bommanahalli for IT engineers and dual-income couples. Includes mirror wills, digital asset transfer protocols (hardware crypto wallets, cloud accounts), and &apos;A&apos; / &apos;B&apos; Khata protection.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Begur Main Road, Bommanahalli &amp; Anekal</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online legal drafts created in 15 minutes, lawyer review, and Kaveri 2.0 fast-track slot booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Couples &amp; Tech Engineers</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Electronic City"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft E-City Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: YELAHANKA & HEBBAL */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Bengaluru Airport Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Yelahanka &amp; Gandhinagar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Yelahanka &amp; Hebbal
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Yelahanka New Town &amp; Satellite Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hebbal &amp; Kempapura</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sahakara Nagar &amp; Jakkur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thanisandra &amp; Manyata Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Yelahanka</strong> and Hebbal for Manyata tech park executives and senior defense retirees. Unambiguous succession deeds covering plotted BIAPPA layouts, commercial lands, and lakeside apartments.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Vidhana Soudha, Yelahanka</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Defense personnel estate planning, plotted layout succession, and doorstep SRO visit coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Plotted &amp; Airport Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Yelahanka"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Yelahanka Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: MALLESHWARAM & RAJAJINAGAR */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Bengaluru Heritage
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Rajajinagar &amp; Malleshwaram
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Malleshwaram &amp; Rajajinagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Malleshwaram (Margosa &amp; Sampige)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajajinagar (Blocks 1 to 6)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mahalakshmi Layout &amp; Yeshwanthpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sadashivanagar &amp; Vyalikaval</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      West Bengaluru is characterized by established business families, ancestral properties, and precious jewelry collections.
                      Our team guides testators in appointing unbiased executors, safeguarding gold bequests via bank locker inventories, and completing Kaveri 2.0 registration without family friction.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Rajajinagar Industrial Area &amp; Malleshwaram</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Family retail asset succession, executor appointment guidance, and independent witness attestation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Traditional Family Wealth</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Malleshwaram Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: BELLANDUR & OUTER RING ROAD */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        ORR Tech Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Shivajinagar &amp; Kaveri 2.0
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Bellandur &amp; Outer Ring Road (ORR)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bellandur &amp; Green Glen Layout</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kasavanahalli &amp; Haralur Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panathur &amp; Kadubeesanahalli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Doddanekundi &amp; Marathahalli ORR</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      With high-density gated communities housing engineers from global tech firms, ORR residents need agile digital estate planning.
                      We ensure seamless transmission of mutual fund units, demat stocks, offshore bank accounts, and high-rise apartments without intestate succession delays.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kaveri 2.0 Portal Online &amp; SRO Shivajinagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        End-to-end Kaveri 2.0 biometric scheduling, digital folio bequests, and senior advocate consultation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Modern Condominiums &amp; RSUs</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bellandur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 8: DOORSTEP HOME REGISTRATION
                H2 Length: 59 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="section-31-home-visit" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Home className="w-3.5 h-3.5 text-emerald-600" />
                <span>Doorstep SRO Service</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                8. Doorstep Registration: SRO Home Visits for Senior Citizens
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Senior citizens and bedridden individuals in Bengaluru do not have to stand in line at government offices. Under Section 31 of the Registration Act, 1908, the Sub-Registrar can visit private homes or hospitals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="p-2 w-fit rounded-lg bg-white text-[#C65378] shadow-xs">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Doctor Fitness Letter</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A registered MBBS doctor certifies that the person has a sound mind but cannot travel.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="p-2 w-fit rounded-lg bg-white text-[#C65378] shadow-xs">
                    <Stamp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Official Request</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We submit a formal request to the Sub-Registrar along with the official government visit fee.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="p-2 w-fit rounded-lg bg-white text-[#C65378] shadow-xs">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Home Biometrics</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The registration officer visits your home with a portable scanner and finishes in 20 minutes.
                  </p>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 9: DOCUMENTS CHECKLIST
                H2 Length: 59 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="bengaluru-documents-checklist" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>Interactive Verification</span>
                </div>
                <div className="text-xs font-bold text-slate-600">
                  Progress: <span className="text-[#C65378] font-black">{checkedCount}</span> / {checklist.length} Completed
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                9. Registration Checklist: Required Documents for Kaveri 2.0
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Get your papers ready before your Kaveri 2.0 visit in Bengaluru. Check off each item below to verify your file:
              </p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer ${
                      item.checked
                        ? "bg-rose-50/40 border-rose-200"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100/60"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        item.checked
                          ? "bg-[#C65378] border-[#C65378] text-white"
                          : "border-slate-400 bg-white"
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-0.5 text-xs sm:text-sm">
                      <p className={`font-bold ${item.checked ? "text-slate-900" : "text-slate-800"}`}>
                        {item.label}
                      </p>
                      <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 10: PLANS & PRICING
                H2 Length: 58 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="bengaluru-service-pricing" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Award className="w-3.5 h-3.5" />
                <span>Transparent Fees</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                10. Will Drafting Packages: Transparent Pricing for Bengaluru
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Old law firms charge high hourly fees. We offer fixed, fair pricing. You know the exact cost before we begin.
              </p>

              {/* OFFICIAL GOVERNMENT CHARGES TABLE */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-extrabold text-slate-900 block text-xs uppercase tracking-wider">
                  Official Karnataka Government Charges
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-500 block">Stamp Duty:</span>
                    <strong className="text-emerald-700 font-bold">₹0 (Completely Exempt)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-500 block">SRO Registration Fee:</span>
                    <strong className="text-slate-900 font-bold">₹200 (Flat Fee)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-500 block">Scanning &amp; User Fee:</span>
                    <strong className="text-slate-900 font-bold">₹100 to ₹300</strong>
                  </div>
                </div>
              </div>

              {/* 3 PRICING TIERS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {/* TIER 1 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">Standard</span>
                    <h3 className="text-lg font-bold text-slate-900">Online Lawyer Will</h3>
                    <div className="text-3xl font-black text-slate-900">₹1,990</div>
                    <p className="text-xs text-slate-600">
                      Great for professionals with flats, savings accounts, and mutual funds.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Clauses for Bengaluru apartments</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Executor and beneficiary terms</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Signing and witness guide</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center transition-colors"
                  >
                    Select Plan
                  </Link>
                </div>

                {/* TIER 2 (RECOMMENDED) */}
                <div className="p-6 rounded-2xl bg-[#172228] text-white border-2 border-[#C65378] flex flex-col justify-between shadow-xl relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-[10px] font-extrabold uppercase tracking-wider">
                    Recommended for Tech Workforce
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Advocate Consult</span>
                    <h3 className="text-lg font-bold text-white">Tech Estate &amp; ESOP Plan</h3>
                    <div className="text-3xl font-black text-white">₹4,990</div>
                    <p className="text-xs text-slate-300">
                      Made for startup founders, tech leads, and owners of unlisted stock or US shares.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-200 pt-2 border-t border-white/10">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                        <span>Startup ESOP &amp; foreign RSU planning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                        <span>1-on-1 talk with Senior Estate Advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                        <span>BBMP A &amp; B Khata advice</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                        <span>Digital asset and crypto terms</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold text-center transition-colors"
                  >
                    Select Plan
                  </Link>
                </div>

                {/* TIER 3 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5F7E75]">End-to-End</span>
                    <h3 className="text-lg font-bold text-slate-900">Kaveri 2.0 Registration</h3>
                    <div className="text-3xl font-black text-slate-900">₹9,990</div>
                    <p className="text-xs text-slate-600">
                      Complete lawyer drafting plus Kaveri slot booking and SRO support.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Everything in the Tech Estate plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Kaveri portal file upload and fee pay</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Sub-Registrar appointment booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doorstep home visit help for seniors</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center transition-colors"
                  >
                    Contact for Registration
                  </Link>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 11: FAQS
                H2 Length: 58 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="frequently-asked-questions" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
                <HelpCircle className="w-3.5 h-3.5 text-[#C65378]" />
                <span>Clear Clarifications</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                11. Frequently Asked Questions: Bengaluru Will &amp; Succession
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Common legal questions regarding Will drafting, Kaveri 2.0 registration, and property succession in Bengaluru:
              </p>

              <div className="space-y-3 pt-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/50"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 12: STATUTORY CITATIONS
                H2 Length: 58 chars (<= 70 chars, No em-dash)
                ----------------------------------------------------------------- */}
            <section id="statutory-citations" className="scroll-target bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
                <FileQuestion className="w-3.5 h-3.5 text-[#C65378]" />
                <span>Legal References</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                12. Statutory Authorities: Karnataka Acts &amp; Succession Rules
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Our drafting work in Bengaluru follows key legal rules and court orders:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">The Indian Succession Act, 1925</span>
                  <p className="text-slate-600">
                    Section 59 (mental fitness), Section 63 (witness rules), and Section 213 (probate limits).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">The Registration Act, 1908</span>
                  <p className="text-slate-600">
                    Section 18(e) (optional Will registration) and Section 31 (doorstep visits for seniors).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">The Karnataka Stamp Act, 1957</span>
                  <p className="text-slate-600">
                    Rules stating zero stamp duty on Wills across the State of Karnataka.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">BBMP Act, 2020</span>
                  <p className="text-slate-600">
                    Rules for property tax assessment, e-Aasthi records, and Khata name transfer.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Companies Act, 2013</span>
                  <p className="text-slate-600">
                    Section 62(1)(b) for employee stock options and share transfer on death.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Supreme Court of India Order</span>
                  <p className="text-slate-600">
                    <em>Shakti Yezdani case (2023)</em>: A nominee is a caretaker; the Will decides true ownership.
                  </p>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                BOTTOM CONSULTATION CALLOUT
                ----------------------------------------------------------------- */}
            <section className="bg-gradient-to-br from-[#172228] to-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C65378]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="max-w-2xl mx-auto space-y-3 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-rose-200 uppercase tracking-wider">
                  Ready to Protect Your Family?
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Draft Your Bengaluru Will in Under 20 Minutes
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Protect your real estate, ESOPs, and investments from future family disputes. Start drafting online or book a consultation with our Bengaluru succession advocates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/30 text-center"
                >
                  Start Your Will Online
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all text-center"
                >
                  Book Lawyer Consultation
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RES BLUEPRINT MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h4 className="text-base font-bold text-slate-900">
                Online Will Drafting &amp; Property Succession in Bengaluru
              </h4>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="py-4">
              <Image
                src="/images/will-drafting-in-bengaluru.jpg"
                alt="Online Will Drafting and Property Succession in Bengaluru"
                width={1200}
                height={675}
                className="w-full h-auto rounded-xl object-contain"
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
