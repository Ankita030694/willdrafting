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
  Stamp,
  Compass,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "ranchi-overview", label: "OVERVIEW" },
  { id: "ranchi-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "ranchi-probate-guidance", label: "PROBATE & HIGH COURT" },
  { id: "ranchi-sro-directory", label: "SRO DIRECTORY" },
  { id: "ranchi-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-ranchi-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "ranchi-property-types", label: "PROPERTY TYPES" },
  { id: "ranchi-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const RANCHI_SROS = [
  {
    id: "kutchery",
    name: "Ranchi Sadar (Kutchery Compound)",
    sro: "SRO Ranchi Sadar (District Registrar Office)",
    address: "District Registration Office Complex, Kutchery Compound, Near Civil Court, Court Road, Ranchi - 834001",
    areas: "Main Road, Upper Bazar, Lower Bazar, Lalpur, Circular Road, Hindpiri, Morabadi, Kutchery Chowk, Albert Ekka Chowk, Old Commissioner Compound, Daily Market",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "kanke",
    name: "Kanke & Morabadi North",
    sro: "SRO Kanke (Block Campus)",
    address: "Block Development Office Campus, Kanke Road, Near Central Institute of Psychiatry, Ranchi - 834006",
    areas: "Kanke Road, Boreya, Chandni Chowk, Birsa Agricultural University, Sukurhutu, Arsande, Pithoria Road, Misir Gonda, Rock Garden Environs",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "namkum",
    name: "Namkum & Doranda Corridor",
    sro: "SRO Namkum (Tata Road)",
    address: "Block Office Complex, Near Namkum Railway Station & Tata Road, Namkum, Ranchi - 834010",
    areas: "Doranda, Hinoo, Birsa Munda Airport Belt, Namkum, Dipatoli, Tupudana Industrial Area, Samlong, Chutia, Tatisilwai, Hatia",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "ratu",
    name: "Ratu & Kathitand Wholesale",
    sro: "SRO Ratu (Kathitand)",
    address: "Ratu Block Campus, NH-75, Near Kathitand Chowk & Ratu Fort, Ratu, Ranchi - 835222",
    areas: "Ratu Road, Kathitand, Hehal, Pandra Agricultural Wholesale Market, Bajra, Tilta, Itki Road, Kamre, Simaliya",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "ormanjhi",
    name: "Ormanjhi & NH-33 Belt",
    sro: "SRO Ormanjhi (Patna Highway)",
    address: "Block Office Complex, NH-33 (Ranchi-Ramgarh Highway), Ormanjhi, Ranchi - 835219",
    areas: "Ormanjhi, Irba, Sikidiri, BIT Mesra Campus Zone, Rukka Dam Environs, NH-33 Industrial & Farmhouse Corridor, Anandi",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "bundu",
    name: "Bundu Sub-Divisional Office",
    sro: "SRO Bundu (Sub-Divisional SRO)",
    address: "Sub-Divisional Office Compound, NH-33 (Tata-Ranchi Highway), Bundu, Ranchi - 835204",
    areas: "Bundu, Tamar, Sonahatu, Rahe, Surya Mandir Environs, NH-33 Highway Corridor, Edalhatu",
    timings: "10:00 AM to 5:00 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "item-1",
    title: "Aadhaar Card and PAN of Testator",
    desc: "Primary government photo identity proof verifying full legal name, date of birth, and permanent Ranchi residential address.",
  },
  {
    id: "item-2",
    title: "Khatiyan & Registered Land Title Deeds (CS/RS)",
    desc: "Cadastral Survey (CS) or Revisional Survey (RS) Khatiyan extract, registered sale deed, or partition deed showing undisputed raiyati ownership.",
  },
  {
    id: "item-3",
    title: "RRDA Allotment Letters & RMC Holding Tax Receipts",
    desc: "Ranchi Regional Development Authority (RRDA) layout approval, RMC municipal property tax receipt with holding number, or housing board allotment.",
  },
  {
    id: "item-4",
    title: "CNT Act Clearance & Register-II (Jamabandi) Copy",
    desc: "Latest online Jamabandi extract from Jharbhoomi portal confirming land classification, non-tribal ownership status, or customary compliance.",
  },
  {
    id: "item-5",
    title: "Details of Two Non-Beneficiary Adult Witnesses",
    desc: "Names, permanent addresses, phone numbers, and Aadhaar cards of two independent adult witnesses who will not receive any property under the Will.",
  },
  {
    id: "item-6",
    title: "MBBS Doctor Fitness Certificate (For Seniors)",
    desc: "Medical certificate from a registered physician verifying mental soundness and lucid testamentary disposing capacity of the testator.",
  },
];

export default function RanchiLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("ranchi-overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklist, setChecklist] = useState(
    CHECKLIST_ITEMS.map((item) => ({ ...item, checked: false }))
  );
  const [selectedSro, setSelectedSro] = useState<string>("kutchery");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  useEffect(() => {
    const targets = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

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

  const filteredSros = RANCHI_SROS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeSroData =
    RANCHI_SROS.find((d) => d.id === selectedSro) || RANCHI_SROS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (MUMBAI/VIZAG ARCHITECTURE)
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
                <span>RANCHI &amp; CHOTA NAGPUR ESTATE DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 49 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Ranchi: Online legal help
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect family residential properties, RRDA plots, Chota Nagpur raiyati lands, and commercial business assets across Ranchi.
                Get experienced advocate drafting, NGDRS Jharkhand slot booking, and Section 31 doorstep home visits for senior testators.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Ranchi Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#ranchi-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Ranchi SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Jharkhand HC Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Optional Probate</span>
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
                  src="/images/will-drafting-in-ranchi-jharkhand.jpg"
                  alt="Will Drafting in Ranchi Online Legal Guide"
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
                6+ SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Ranchi Sadar &amp; Blocks
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
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Section 213 ISA Exemption
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Home Visit for Seniors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: FLOATING / STICKY SELECTOR BAR FOR TABLE OF CONTENTS
          ========================================================================= */}
      <div className="block lg:hidden sticky top-0 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 shadow-2xs">
        <div className="relative max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setMobileTocOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs text-left"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-[#C65378] shrink-0" />
              <span className="text-xs font-mono font-bold text-slate-800 truncate uppercase">
                {currentActiveToc.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-slate-500">
              <span className="text-[11px] font-mono">SECTIONS</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileTocOpen ? "rotate-180 text-[#C65378]" : ""
                  }`}
              />
            </div>
          </button>

          {mobileTocOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 max-h-72 overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-40">
              {TOC_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileTocOpen(false)}
                    className={`flex items-center px-4 py-2 text-xs font-mono tracking-wider transition-all ${isActive
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-4 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                  >
                    <span
                      className={`mr-2.5 ${isActive ? "w-4 h-[1.5px] bg-[#C65378]" : "w-2.5 h-[1px] bg-slate-300"
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
                        className={`transition-all mr-2.5 rounded-full ${isActive
                            ? "w-6 h-[1.5px] bg-[#C65378]"
                            : "w-3.5 h-[1px] bg-slate-300 group-hover:w-5 group-hover:bg-slate-500"
                          }`}
                      />
                      <span
                        className={`transition-colors ${isActive
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
              MAIN EDITORIAL CONTENT AREA (14 SEQUENTIAL H2 SECTIONS)
              ===================================================================== */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="ranchi-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>RANCHI SUCCESSION BRIEF</span>
                </div>
                {/* H2: Exactly 52 characters (<= 70) */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Ranchi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Mandatory in Jharkhand</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ranchi is a non-presidency capital under the High Court of Jharkhand. Under Section 213 of the Indian Succession Act, court probate is strictly optional for Hindu, Jain, Sikh, and Buddhist Wills.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty across State</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills in Jharkhand are completely exempt from stamp duty. Sub-Registrars charge only a flat nominal registration fee of approximately ₹1,000 for official Book III archival.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>RMC &amp; RRDA Direct Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will enables swift municipal holding tax mutation in Ranchi Municipal Corporation (RMC) and hassle-free plot transmissions with RRDA without court delays.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Section 31 Doorstep Facility</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Elderly or bedridden citizens in Ashok Nagar, Morabadi, and Kanke Road can request the Sub-Registrar to visit their home or hospital with an MBBS doctor fitness certificate.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="ranchi-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FOUNDATION &amp; JURISPRUDENCE</span>
                </div>
                {/* H2: Exactly 46 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework for Will Drafting in Ranchi
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Testamentary succession in Ranchi and across Jharkhand is governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and state-specific land legislations including the <strong>Chota Nagpur Tenancy Act, 1908 (CNT Act)</strong>.
                  Whether you are planning succession for family residential bungalows in Ashok Nagar, modern apartments along Kanke Road, commercial shops in Upper Bazar, or agricultural lands in Namkum and Ormanjhi, your Will must satisfy precise legal standards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Testator Capacity</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 59 of the Indian Succession Act, every person of sound mind who has attained majority can make a Will. Senior citizens with physical ailments can validly execute provided they possess testamentary disposing clarity.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <FileCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Attestation by Two Witnesses</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 63, the Will must be signed by the testator in the presence of at least two independent adult witnesses. Under Section 67, witnesses must never be beneficiaries receiving any bequest under the document.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>RRDA &amp; Raiyati Scope</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Will can bequeath self-acquired properties, RRDA allocated residential plots, general raiyati land holdings, commercial partnership equities, bank accounts, and demat shares without encumbrance.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-start gap-3 text-xs md:text-sm text-slate-800">
                <AlertTriangle className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-[#C65378]">Crucial Chota Nagpur Tenancy Act (CNT Act) Nuance:</span>
                  <p className="text-slate-700 leading-relaxed">
                    Under Section 46 of the CNT Act, ancestral lands belonging to Scheduled Tribes cannot be alienated, transferred, or bequeathed to non-tribals or contrary to customary tribal succession. Our Ranchi legal team meticulously verifies Khatiyan entries, Jamabandi records, and land categories to ensure your Will is 100% compliant with local tenancy jurisprudence.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908 COMPLIANCE</span>
                </div>
                {/* H2: Exactly 45 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Compulsory in Ranchi?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 18(e) of the Registration Act, 1908</strong>, registering a Will is legally optional throughout Jharkhand.
                  An unregistered Will drafted on plain A4 paper and executed before two witnesses has lawful standing.
                  However, registering your Will before the Sub-Registrar provides critical legal protection against land grabbers, fraudulent partition claims, and property disputes.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                      <th className="p-3 sm:p-4 font-bold">Feature</th>
                      <th className="p-3 sm:p-4 font-bold text-slate-600">Unregistered Will</th>
                      <th className="p-3 sm:p-4 font-bold text-[#C65378]">Registered Will (NGDRS Jharkhand)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">Statutory Validity</td>
                      <td className="p-3 sm:p-4">Valid under Section 63 ISA</td>
                      <td className="p-3 sm:p-4 font-semibold text-slate-900">Valid under Section 63 ISA &amp; Registration Act</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 sm:p-4 font-semibold">Official Record</td>
                      <td className="p-3 sm:p-4">Private document only</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Archived in Book III at Ranchi SRO</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">RMC Holding Tax Mutation</td>
                      <td className="p-3 sm:p-4">Requires extensive legal heir affidavits &amp; notices</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Swift processing by RMC revenue inspectors</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 sm:p-4 font-semibold">RRDA &amp; Circle Office Mutation</td>
                      <td className="p-3 sm:p-4">High scrutiny; vulnerable to third-party objections</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Direct transmission in Jharbhoomi Jamabandi</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">Risk of Loss or Destruction</td>
                      <td className="p-3 sm:p-4 text-rose-600">Irrecoverable if physical paper is lost</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Certified copy retrievable from SRO anytime</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 sm:p-4 font-semibold">Protection Against Fraud Claims</td>
                      <td className="p-3 sm:p-4">Vulnerable to allegations of coercion or fabrication</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Biometrics &amp; digital photos confirm genuine intent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE JURISPRUDENCE */}
            <section id="ranchi-probate-guidance" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT OF JHARKHAND JURISPRUDENCE</span>
                </div>
                {/* H2: Exactly 49 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Jharkhand Probate Rules: Section 213 Exemption
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common question among property owners in Ranchi is whether a Will must receive court probate before heirs can take possession.
                  Under Indian succession law, this is completely optional for properties located in Jharkhand.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900">
                  The Non-Presidency Territory Rule under Section 213
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under <strong>Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925</strong>, obtaining probate or letters of administration is mandatory only for Wills executed inside the historical presidency towns of Bombay (Mumbai), Calcutta (Kolkata), and Madras (Chennai), or for properties situated within those territories.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Ranchi is a non-presidency capital under the jurisdiction of the <strong>High Court of Jharkhand</strong>.
                  The Supreme Court of India in the landmark decision of <em>Clarence Pais &amp; Ors. v. Union of India (AIR 2001 SC 1151)</em> and repeated rulings by the Jharkhand High Court confirm that probate is non-mandatory for Hindu, Jain, Sikh, and Buddhist testators outside historical presidency jurisdictions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#C65378] block">
                      Practical Consequence
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Beneficiaries in Ranchi do not need to spend years and lakhs of rupees in civil court to probate an uncontested Will before claiming bank accounts or mutating land title.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#C65378] block">
                      Why Registration is Vital
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Since court probate is not mandatory, registering your Will at the Ranchi Sub-Registrar Office serves as the gold standard of authenticity before RMC, banks, and revenue circle officers.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="ranchi-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Compass className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                {/* H2: Exactly 46 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Ranchi Sub-Registrar Office Directory &amp; SROs
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration across Ranchi is administered by the Department of Registration, Government of Jharkhand through the <strong>National Generic Document Registration System (NGDRS Jharkhand)</strong>.
                  Under Section 32 of the Registration Act, you can register your Will before the Sub-Registrar within whose sub-district you reside or where your property is situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Kutchery, Morabadi, Kanke)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredSros.length} of {RANCHI_SROS.length} Key Jurisdictions
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredSros.map((d, index) => {
                    const isSelected = selectedSro === d.id;
                    const isLastOdd =
                      filteredSros.length % 2 !== 0 && index === filteredSros.length - 1;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedSro(d.id)}
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                          } ${isSelected
                            ? "bg-[#C65378] text-white shadow-xs ring-2 ring-[#C65378]/25"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                          }`}
                      >
                        {d.name}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE SRO DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        {activeSroData.name}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeSroData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Register Operational
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
                      <span className="font-bold text-slate-900 block">Areas Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeSroData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official Appointment Booking: <strong>ngdrs.jharkhand.gov.in (NGDRS)</strong>
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Advocate Support for {activeSroData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: AREA COVERAGE */}
            <section id="ranchi-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; HUBS</span>
                </div>
                {/* H2: Exactly 48 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Ranchi
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Seeking advocate-supervised <strong>Will drafting services in Ashok Nagar, Morabadi, Bariatu, Kanke Road, Doranda, or Lalpur</strong>?
                  Ranchi encompasses distinct property ownership frameworks, RRDA housing board covenants, RMC municipal bylaws, and Chota Nagpur Tenancy Act classifications.
                  Whether you own an ancestral bungalow in Morabadi, an RRDA plot in Ashok Nagar, or commercial units on Main Road, our estate lawyers provide tailored legal solutions:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: ASHOK NAGAR, KADRU & ARGORA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        VIP &amp; Judicial Colony
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ranchi Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Ashok Nagar, Kadru &amp; Argora
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ashok Nagar Officers Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Argora Housing Board</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kadru Main Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Harmu Bypass Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Preferred by retired civil servants, judges, defense veterans, and senior corporate executives. We structure ironclad bequests for prime independent houses, cooperative society shares, and multi-tier generational inheritances.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Clear RMC holding numbers, RRDA plot allotment clauses, and life-interest protections prevent painful partition disputes among children.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Ranchi Sadar / Argora Anchal</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ashok Nagar Kadru Argora"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ashok Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: MORABADI & TAGORE HILL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Cultural &amp; Elite Enclave
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ranchi Sadar / Kanke
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Morabadi &amp; Tagore Hill
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Morabadi Ground Environs</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tagore Hill Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ranchi University Enclave</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Divyayan Krishi Vigyan Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Eminent for historical residences, expansive estates, educational leaders, and intellectuals. We formulate custom estate distributions for ancestral bungalows, high-rise luxury flats, and valuable family heirloom art or book collections.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Exact boundaries, Khatiyan survey verification, and specific bequeathals protect multi-crore estates from fraudulent land claims.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Ranchi Sadar / SRO Kanke</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Morabadi and Tagore Hill"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Morabadi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: BARIATU & BOOTY MORE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Healthcare &amp; Academic Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ranchi Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Bariatu &amp; Booty More
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">RIMS Medical Campus Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bariatu Housing Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Booty More Junction</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chiraundi &amp; Science City</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Home to senior doctors, RIMS professors, medical clinics, and modern residential townships. We assist medical professionals with clinical asset transmission, diagnostic equipment bequests, and mutual Wills for doctor spouses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Separation of commercial clinic leases from personal residential assets guarantees smooth inheritance without institutional roadblocks.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Ranchi Sadar / Town Anchal</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bariatu and Booty More"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bariatu Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: KANKE ROAD & CHANDNI CHOWK */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Lakeside &amp; Luxury Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kanke
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Kanke Road &amp; Chandni Chowk
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanke Dam Lakefront</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chandni Chowk Gated Layouts</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Boreya Farmhouse Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">BAU University Environs</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Fastest-growing upscale corridor with premium lakeside apartments, expansive farmhouses, and plotted colonies. We handle complex multi-property portfolios, NRI cross-border bequests, and lakeside property succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Rigorous verification of non-tribal raiyati land nature prevents post-death challenges before the Sub-Divisional Officer (SDO) or Circle Officer.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Kanke / Kanke Anchal</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kanke Road Chandni Chowk"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kanke Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: DORANDA, HINOO & AIRPORT ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Administrative &amp; Airport Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Namkum / Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Doranda, Hinoo &amp; Airport Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nepal House Secretariat Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Birsa Munda Airport Environs</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Doranda High Court Old Campus</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hinoo Chowk Commercial</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Historic administrative hub housing government secretariats, defense cantonment officers, and well-settled family households. We assist senior government pensioners and defense families with seamless testamentary planning.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Explicit pension nominee alignment and bank locker bequeathals prevent inter-family administrative impasses after death.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Namkum / Town Anchal</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Doranda Hinoo Airport Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Doranda Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: LALPUR, CIRCULAR ROAD & UPPER BAZAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Commercial &amp; Wholesale Center
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ranchi Sadar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Lalpur, Circular Road &amp; Upper Bazar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Upper Bazar Wholesale Mandi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lalpur Retail Hub</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Circular Road Commercial</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Main Road Showroom Strip</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Ranchi&apos;s business epicenter with wholesale traders, jewellers, textile merchants, and commercial complex owners. We formulate robust business succession plans protecting commercial freeholds, partnership shares, and warehouse leases.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Harmonization of partnership deeds, GST transfer clauses, and business debt indemnification guarantee corporate survival.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Ranchi Sadar (Kutchery)</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Lalpur Circular Road Upper Bazar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Commercial Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP NGDRS WILL REGISTRATION SOP */}
            <section id="step-by-step-ranchi-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>NGDRS JHARKHAND STANDARD OPERATING PROCEDURE</span>
                </div>
                {/* H2: Exactly 46 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Registration in Jharkhand
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Ranchi is conducted through the <strong>Department of Registration, Government of Jharkhand (NGDRS Jharkhand)</strong>.
                  Our senior advocates guide you seamlessly through each statutory phase:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    01
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Asset Inventory &amp; CNT Act Verification
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile complete ownership documents of your Ranchi properties, including RMC municipal holding tax receipts, RRDA plot allotment letters, bank account details, demat portfolios, and Khatiyan survey land records. Verify that lands are non-tribal general raiyati assets under CNT Act parameters.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    02
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Advocate Drafting &amp; Custom Legal Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our legal specialists draft a tailored testamentary document. We incorporate unequivocal revocation of prior Wills, specific asset bequeathals, residuary estate provisions, Jharkhand High Court probate exemption affirmations, and clear administrative powers for your executor.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    03
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Execution &amp; Attestation by Two Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the drafted Will on durable bond or standard executive paper. The testator signs or affixes their thumb impression at the bottom of each page in the concurrent presence of two independent adult witnesses who sign as attestors. If the testator is elderly, an MBBS doctor mental fitness certificate is appended.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    04
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      NGDRS Jharkhand Online Slot Booking &amp; e-Gras Challan
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our team logs into the NGDRS Jharkhand portal (<em>ngdrs.jharkhand.gov.in</em>), inputs document particulars under Book III, selects your jurisdictional Ranchi SRO (such as Ranchi Sadar Kutchery or Kanke), and pays the statutory ₹1,000 fee via e-Gras online government challan. We confirm your preferred time slot appointment slip.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    05
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      SRO Attendance, Biometrics &amp; Book III Archival
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The testator and both witnesses visit the Sub-Registrar Office with original Aadhaar cards and appointment slips. The Sub-Registrar captures digital photographs, verifies biometric fingerprints, records the entry into Book III, and hands over the certified registered Will copy with official endorsement stamps.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: DOORSTEP WILL REGISTRATION */}
            <section id="doorstep-home-registration" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>SECTION 31 REGISTRATION ACT</span>
                </div>
                {/* H2: Exactly 49 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Doorstep Will Registration for Senior Citizens
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly, infirm, or hospitalized testators residing in Ashok Nagar, Morabadi, Bariatu, or anywhere in Ranchi district, travelling to an SRO may be physically impossible.
                  The law provides a compassionate, lawful mechanism.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-rose-50 text-[#C65378]">
                    <ShieldCheck className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Sub-Registrar Home Visit under Section 31
                    </h3>
                    <p className="text-xs text-slate-500">
                      Applicable across all Sub-Registrar jurisdictions in Jharkhand
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar has discretionary authority to attend the private residence or hospital bedside of a testator who cannot travel to the registration office due to age or medical infirmity.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">Medical Certificate Mandate:</span>
                    <p className="text-slate-600">
                      A registered medical practitioner (MBBS doctor) must issue a written certificate confirming that the testator is mentally lucid and in sound testamentary disposing state of mind.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">Official Commission Fee:</span>
                    <p className="text-slate-600">
                      A statutory private attendance commission fee is paid through the Jharkhand e-Gras portal, covering the Sub-Registrar official visit and travel escort.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#172228] text-white text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all"
                  >
                    <span>Request Doorstep Will Registration in Ranchi</span>
                    <ArrowRight className="w-4 h-4 text-rose-300" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PREPARATION &amp; DOCUMENTATION</span>
                </div>
                {/* H2: Exactly 44 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Checklist for Ranchi Will Making
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Before visiting the Sub-Registrar Office in Ranchi or finalizing your document online, verify that you have gathered all necessary proofs. Use our interactive checklist to track your readiness:
                </p>
              </div>

              {/* INTERACTIVE CHECKLIST COMPONENT */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    Interactive Readiness Tracker
                  </span>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-rose-50 text-[#C65378]">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${item.checked
                          ? "bg-rose-50/50 border-[#C65378]/40 shadow-xs"
                          : "bg-slate-50/70 border-slate-200/70 hover:bg-slate-50"
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                          }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-3" />}
                      </div>
                      <div className="space-y-1">
                        <span
                          className={`font-bold text-xs sm:text-sm block leading-snug ${item.checked ? "text-[#C65378]" : "text-slate-900"
                            }`}
                        >
                          {item.title}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="ranchi-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET SPECIFIC SUCCESSION GUIDANCE</span>
                </div>
                {/* H2: Exactly 48 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Ranchi Real Estate: RRDA Plots &amp; CNT Act Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Asset bequeathal in Ranchi involves distinct municipal, urban development, and Chota Nagpur Tenancy Act requirements. Here is how our legal drafts ensure title clarity across local asset categories:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* RRDA PLOTS */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>RRDA Approved Residential Plots</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thousands of families in Ranchi own residential and commercial plots developed under Ranchi Regional Development Authority (RRDA) schemes. Our drafts record exact RRDA layout sanction numbers, plot measurements, and mutation rights to ensure smooth title transmission.
                  </p>
                </div>

                {/* RMC FLATS & RESIDENCES */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>RMC Freehold Apartments &amp; Houses</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Properties within Ranchi Municipal Corporation (RMC) limits require specific holding numbers, ward entries, and registered deed citations. A registered Will allows the beneficiary to achieve name mutation directly through the RMC citizen portal without bureaucratic delays.
                  </p>
                </div>

                {/* CNT ACT RAIYATI LAND */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Chota Nagpur Tenancy (CNT) Raiyati Land</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Agricultural and semi-urban lands in Kanke, Namkum, and Ormanjhi are governed by the CNT Act. We specify CS/RS Khatiyan numbers, Thana numbers, Khata and Khesra plot numbers, and Jharbhoomi Jamabandi details to prevent contentious tenancy litigations.
                  </p>
                </div>

                {/* COMMERCIAL ASSETS & BUSINESSES */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-[#C65378]" />
                    <span>Commercial Showrooms &amp; Small Enterprises</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Commercial assets in Upper Bazar, Lalpur, Main Road, or Tupudana industrial park require distinct clauses for business leases, GST transitions, partnership interests, and creditor liabilities to ensure uninterrupted business continuity.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: STAMP DUTY & FEES */}
            <section id="ranchi-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT STATUTORY COSTS</span>
                </div>
                {/* H2: Exactly 51 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Stamp Duty &amp; Registration Fees: Ranchi
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds that attract 4% stamp duty plus 3% registration fee in Jharkhand, registering a Will is exceptionally economical under state law:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                      <th className="p-3 sm:p-4 font-bold">Statutory Fee Component</th>
                      <th className="p-3 sm:p-4 font-bold text-[#C65378]">Official Jharkhand Tariff</th>
                      <th className="p-3 sm:p-4 font-bold text-slate-600">Remarks &amp; Mode of Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">Stamp Duty</td>
                      <td className="p-3 sm:p-4 font-bold text-emerald-700">₹0 (NIL)</td>
                      <td className="p-3 sm:p-4">100% exempt under Indian Stamp Act, 1899</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 sm:p-4 font-semibold">Book III Registration Fee</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">₹1,000</td>
                      <td className="p-3 sm:p-4">Flat statutory fee payable via e-Gras online challan</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">User &amp; Computer Charges</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">₹100 to ₹200</td>
                      <td className="p-3 sm:p-4">NGDRS electronic scanning and biometric data processing</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 sm:p-4 font-semibold">Section 31 Doorstep Attendance</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Prescribed Tariff</td>
                      <td className="p-3 sm:p-4">Official government commission for Sub-Registrar home visit</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">Certified Copy of Registered Will</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Nominal Application Fee</td>
                      <td className="p-3 sm:p-4">Available from SRO archives after registration</td>
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
                  <span>TRANSPARENT LEGAL PRICING</span>
                </div>
                {/* H2: Exactly 42 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the level of legal support tailored to your family&apos;s assets. No hidden consultation charges, no surprise fees:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TIER 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Self-Directed Online
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for nuclear families with straightforward residential apartments and bank accounts in Ranchi.
                    </p>

                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant Lawyer-Vetted Template</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Jharkhand Probate Exemption</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Residuary &amp; Executor Clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Self-Execution Guide</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all text-center block"
                  >
                    Start Online Draft
                  </a>
                </div>

                {/* TIER 2 - RECOMMENDED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-lg shadow-[#C65378]/10 flex flex-col justify-between relative hover:shadow-xl transition-all">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    RECOMMENDED FOR FAMILIES
                  </span>

                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                      Advocate Consultation &amp; Custom Draft
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹4,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Custom drafting by senior estate advocates for RRDA plots, CNT Act compliant lands, and business assets.
                    </p>

                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Senior Advocate Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>RRDA &amp; CNT Act Raiyati Review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Custom Succession Planning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor Fitness Template for Seniors</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-full bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-all text-center block shadow-md shadow-[#C65378]/25"
                  >
                    Consult Senior Advocate
                  </a>
                </div>

                {/* TIER 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Full SRO Registration &amp; Doorstep
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete end-to-end service including NGDRS Jharkhand slot booking, e-Gras challan, and physical SRO accompaniment.
                    </p>

                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Everything in ₹4,990 Tier</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>NGDRS Slot &amp; e-Gras Challan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Advocate Accompaniment at SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 Doorstep Coordination</span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-6 w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all text-center block"
                  >
                    Book Full Registration
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMONLY ASKED QUESTIONS</span>
                </div>
                {/* H2: Exactly 44 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Ranchi Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Essential legal answers regarding Will drafting, NGDRS Jharkhand registration, and probate exemption in Ranchi:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#C65378]" : ""
                            }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          <p>{faq.a}</p>
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
                  <span>LEGAL PROVISIONS &amp; AUTHORITIES</span>
                </div>
                {/* H2: Exactly 48 characters (<= 70) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory References &amp; Jharkhand NGDRS Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Every Will crafted on our platform adheres to strict Indian statutory law and Jharkhand state circulars:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] block">
                    ISA Section 59 &amp; 63
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Testamentary Capacity &amp; Attestation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mandates sound disposing mind and signature before two independent witnesses who are not beneficiaries.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] block">
                    ISA Section 213 &amp; 57
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Non-Presidency Probate Exemption
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Exempts Hindu, Sikh, Jain, and Buddhist testators in Jharkhand from mandatory court probate proceedings.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] block">
                    Registration Act Section 18(e) &amp; 51
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Optional Registration &amp; Book III
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Will registration is optional, but once registered, it is permanently preserved in official government Book III records.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] block">
                    Registration Act Section 31
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Sub-Registrar Doorstep Attendance
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Empowers the Sub-Registrar to visit homes or hospitals for testators unable to attend the office due to illness.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] block">
                    CNT Act, 1908 Section 46
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Chota Nagpur Tenancy Compliance
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Safeguards tribal land from unlawful alienation and clarifies raiyati non-tribal urban succession rights.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] block">
                    RRDA &amp; RMC Municipal Regulations
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Municipal &amp; Urban Land Mutation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Framework for transferring approved RRDA layouts and municipal holding tax records through Circle Offices and RMC.
                  </p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH RESOLUTION IMAGE MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative aspect-video w-full">
              <Image
                src="/images/will-drafting-in-ranchi-jharkhand.jpg"
                alt="Will Drafting in Ranchi Legal Guide - Full Resolution"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-medium">
                Online Will Drafting &amp; Registration Guidance in Ranchi (Ranchi District, Jharkhand)
              </span>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="text-xs px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
