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
  { id: "vijayawada-overview", label: "OVERVIEW" },
  { id: "vijayawada-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "vijayawada-probate-guidance", label: "PROBATE & HIGH COURT" },
  { id: "vijayawada-sro-directory", label: "SRO DIRECTORY" },
  { id: "vijayawada-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-vijayawada-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "vijayawada-property-types", label: "PROPERTY TYPES" },
  { id: "vijayawada-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const VIJAYAWADA_SROS = [
  {
    id: "governorpet",
    name: "Vijayawada Central (Governorpet)",
    sro: "SRO Vijayawada Central (District Registrar Office)",
    address: "District Registrar Office Complex, Opp. Sub-Collector Office, MG Road (Bandar Road), Governorpet, Vijayawada - 520002",
    areas: "Governorpet, Suryaraopeta, Arundelpet, Buckinghampet, Besant Road, Eluru Road, Museum Road, Labbipet, Old Bus Stand Colony",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "gandhinagar",
    name: "Gandhinagar & One Town",
    sro: "SRO Gandhinagar",
    address: "Near Old Railway Station, BRTS Corridor Road, Gandhinagar, Vijayawada - 520003",
    areas: "Gandhinagar, Satyanarayanapuram, Hanumanpet, Poornanandampet, Railway Quarters, Madhuranagar, Pezzonipeta, One Town Commercial Market",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "patamata",
    name: "Patamata & Benz Circle",
    sro: "SRO Patamata",
    address: "Bandar Road, Near Auto Nagar Gate & High School Road, Patamata, Vijayawada - 520010",
    areas: "Patamata, Patamata Lanka, Benz Circle, Gurunanak Colony, Pinnamaneni Polyclinic Road, Ashok Nagar, Pantakaluva Road, High School Road",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "gunadala",
    name: "Gunadala & Ramavarappadu",
    sro: "SRO Gunadala",
    address: "Near Mary Matha Shrine, Eluru Road, Gunadala, Vijayawada - 520004",
    areas: "Gunadala, Ramavarappadu, Padavalarevu, Christurajupuram, Payakapuram, Nunna, Kandrika, New Rajarajeswaripeta, Prasadampadu",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "bhavanipuram",
    name: "Bhavanipuram & Gollapudi",
    sro: "SRO Bhavanipuram",
    address: "Near Swathi Theatre & Gollapudi Bypass Road, Bhavanipuram, Vijayawada - 520012",
    areas: "Bhavanipuram, Gollapudi Wholesale Market Yard, Vidyadharapuram, Kummaripalem, HB Colony, Jupudi, Ibrahimpatnam Road, Milk Project",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "kankipadu",
    name: "Kankipadu & Penamaluru",
    sro: "SRO Kankipadu",
    address: "Main Road, Opp. RTC Bus Stand, Kankipadu, NTR District - 521151",
    areas: "Kankipadu, Poranki, Penamaluru, Kanuru, Gosala, Punadipadu, Edupugallu, Tadigadapa, Yanamalakuduru, Ganguru",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "gannavaram",
    name: "Gannavaram & Airport Corridor",
    sro: "SRO Gannavaram",
    address: "NH-16 Highway Road, Near Vijayawada International Airport, Gannavaram - 521101",
    areas: "Gannavaram, Medha IT Park, Kesarapalle, Atkur, Veerapanenigudem, Surampalli Industrial Corridor, Telaprolu, Mustabada",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "mangalagiri",
    name: "Mangalagiri & Amaravati Core",
    sro: "SRO Mangalagiri",
    address: "Near Old Bus Stand & Trunk Road, Mangalagiri, Guntur/Amaravati - 522503",
    areas: "Mangalagiri, Tadepalli, Undavalli Caves Area, Navuluru, Amaravati Capital Core, AIIMS Mangalagiri Belt, Vaddeswaram, Nutakki",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "item-1",
    title: "Aadhaar Card and PAN of Testator",
    desc: "Primary government identity proof showing full legal name, date of birth, and permanent Vijayawada residence address.",
  },
  {
    id: "item-2",
    title: "APCRDA Allotment Letters & VMC Property Tax Receipts",
    desc: "APCRDA plot allotment orders, VMC property tax assessment receipts, registered sale deeds, or apartment link documents in Vijayawada.",
  },
  {
    id: "item-3",
    title: "Commercial Enterprise & Trading Asset Records",
    desc: "Partnership deeds, shop establishment registrations, GST certificates, current accounts, and demat holding statements for family enterprises.",
  },
  {
    id: "item-4",
    title: "Pattadar Passbooks for Krishna Delta Farm Lands",
    desc: "Electronic Title Deed cum Pattadar Passbook, 1B ROR records, and Adangal land extracts from the Andhra Pradesh Meebhoomi portal.",
  },
  {
    id: "item-5",
    title: "Details of Two Non-Beneficiary Witnesses",
    desc: "Names, permanent addresses, phone numbers, and Aadhaar cards of two adult witnesses who will not receive any property under the Will.",
  },
  {
    id: "item-6",
    title: "MBBS Doctor Fitness Certificate (For Seniors)",
    desc: "Medical certificate from a registered physician verifying mental soundness and lucid testamentary disposing capacity of the testator.",
  },
];

export default function VijayawadaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("vijayawada-overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklist, setChecklist] = useState(
    CHECKLIST_ITEMS.map((item) => ({ ...item, checked: false }))
  );
  const [selectedSro, setSelectedSro] = useState<string>("governorpet");
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

  const filteredSros = VIJAYAWADA_SROS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeSroData =
    VIJAYAWADA_SROS.find((d) => d.id === selectedSro) || VIJAYAWADA_SROS[0];

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
                <span>VIJAYAWADA &amp; AMARAVATI ESTATE DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 51 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Vijayawada: Online legal help
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect family residential properties, APCRDA plots, commercial wholesale enterprises, and Krishna delta agricultural lands across Vijayawada.
                Get experienced advocate drafting, AP IGRS slot booking, and Section 31 doorstep home visits for senior testators.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Vijayawada Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#vijayawada-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Vijayawada SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 AP Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Non-Mandatory Probate</span>
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
                  src="/images/will-drafting-in-vijayawada-banner.jpg"
                  alt="Will Drafting in Vijayawada Online Legal Guide"
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
                8+ SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                NTR &amp; Krishna Region
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
                Section 213 AP Rules
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
              MAIN EDITORIAL CONTENT AREA
              ===================================================================== */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="vijayawada-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>VIJAYAWADA SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Probate in Vijayawada
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Vijayawada is a non-presidency town governed under the High Court of Andhra Pradesh. Under Section 213 of the Indian Succession Act, court probate is strictly optional for Hindu, Jain, Sikh, and Buddhist Wills.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty in AP</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills in Andhra Pradesh are completely exempt from stamp duty. Sub-Registrars charge only a flat ₹1,000 Book III registration fee plus nominal card computer charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>APCRDA &amp; VMC Direct Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will allows smooth property mutation across Vijayawada Municipal Corporation (VMC) and APCRDA Amaravati capital region layouts without civil court proceedings.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Section 31 Doorstep Facility</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Elderly or bedridden citizens in Benz Circle, Moghalrajpuram, and Patamata can request the Sub-Registrar to visit their residence with an MBBS doctor fitness certificate.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="vijayawada-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FOUNDATION &amp; JURISPRUDENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework for Will Drafting in Vijayawada
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Testamentary succession in Vijayawada and across Andhra Pradesh is governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Transfer of Property Act, 1882</strong>.
                  Whether you are planning succession for family residential apartments in Benz Circle, commercial shops in Governorpet, auto-ancillary industrial sheds in Jawahar Auto Nagar, or fertile agricultural lands in the Krishna delta, your Will must satisfy precise legal standards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Testator Capacity</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 59 of the Indian Succession Act, every person of sound mind who is not a minor may dispose of their property by Will. Persons who are deaf, dumb, or blind can make a Will if they understand its legal effect.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <FileCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Attestation by Two Witnesses</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 63, the Will must be signed by the testator and attested by at least two independent adult witnesses. Crucially, under Section 67, witnesses must not be beneficiaries receiving any bequest under the document.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Commercial &amp; APCRDA Scope</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Will can bequeath self-acquired properties, APCRDA pooling reconstituted plots, undivided share in commercial partnerships, proprietary trade assets, bank accounts, and demat shares without encumbrances.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-start gap-3 text-xs md:text-sm text-slate-800">
                <AlertTriangle className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-[#C65378]">Important Legal Nuance for Andhra Pradesh Families:</span>
                  <p className="text-slate-700 leading-relaxed">
                    Under Hindu Succession Act, 1956, ancestral property held as an undivided coparcenary interest cannot be arbitrarily willed away without partitioning or without recognizing daughters as equal coparceners post-2005 amendment. A skilled advocate ensures distinct bequeathal of self-acquired assets to eliminate future partition challenges.
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Compulsory in Vijayawada?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 18(e) of the Registration Act, 1908</strong>, registering a Will is legally optional throughout Andhra Pradesh.
                  An unregistered Will executed on plain A4 sheet before two witnesses holds valid legal force.
                  However, registered Wills provide immense legal protection against false allegations of coercion, fraud, or mental incapacity.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                      <th className="p-3 sm:p-4 font-bold">Feature</th>
                      <th className="p-3 sm:p-4 font-bold text-slate-600">Unregistered Will</th>
                      <th className="p-3 sm:p-4 font-bold text-[#C65378]">Registered Will (AP IGRS)</th>
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
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Archived in Book III at Sub-Registrar Office</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">VMC Property Mutation</td>
                      <td className="p-3 sm:p-4">May require legal heir no-objection affidavits</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Smooth mutation via Ward Sachivalayam</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 sm:p-4 font-semibold">APCRDA Plot Transfer</td>
                      <td className="p-3 sm:p-4">Higher scrutiny by planning authority</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Direct transmission on record</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">Risk of Loss or Destruction</td>
                      <td className="p-3 sm:p-4 text-rose-600">High risk if physical paper is misplaced</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Certified copy retrievable from SRO anytime</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 sm:p-4 font-semibold">Protection Against Fraud Claims</td>
                      <td className="p-3 sm:p-4">Easily challenged for suspicious circumstances</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-700">Biometrics &amp; photo prove genuine execution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE JURISPRUDENCE */}
            <section id="vijayawada-probate-guidance" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT OF ANDHRA PRADESH RULES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Andhra Pradesh Probate Rules: Section 213 Exemption
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most persistent misconceptions among property owners in Vijayawada is that a Will must be probated in court before assets can be transferred.
                  Under Indian succession law, this is strictly incorrect for Andhra Pradesh.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900">
                  The Non-Presidency Town Rule under Section 213
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under <strong>Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925</strong>, probate is compulsory only for Wills executed within the historical presidency towns of Bombay (Mumbai), Calcutta (Kolkata), and Madras (Chennai), or for Wills executed elsewhere if they affect immovable properties situated inside those three presidency cities.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Vijayawada is a non-presidency town governed under the <strong>High Court of Andhra Pradesh at Amaravati</strong>.
                  The Supreme Court of India in the landmark ruling of <em>Clarence Pais &amp; Ors. v. Union of India (AIR 2001 SC 1151)</em> affirmed that probate is strictly optional for Hindu, Jain, Sikh, and Buddhist testators outside historical presidency jurisdictions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#C65378] block">
                      Practical Consequence
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Beneficiaries in Vijayawada do NOT need to spend lakhs of rupees or wait 2 to 3 years for High Court probate before selling or mutating inherited assets.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#C65378] block">
                      Why Registration is Vital
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Because probate is not mandatory, registering your Will at the local SRO acts as the highest proof of authenticity during bank transmissions and municipal transfers.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="vijayawada-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Compass className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Vijayawada Sub-Registrar Office Directory &amp; SROs
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration across Vijayawada is administered by the Registration and Stamps Department, Government of Andhra Pradesh (AP IGRS).
                  Under Section 32 of the Registration Act, you can register your Will before the Sub-Registrar where you reside or where your immovable properties are situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Benz Circle, Patamata, Gunadala)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredSros.length} of {VIJAYAWADA_SROS.length} Key Jurisdictions
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
                      Official Appointment Booking: <strong>registration.ap.gov.in (AP IGRS)</strong>
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
            <section id="vijayawada-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Vijayawada
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Seeking advocate-supervised <strong>Will drafting services in Benz Circle, Governorpet, Patamata, Gunadala, or Gannavaram</strong>?
                  Property ownership frameworks, APCRDA pooling layout conditions, VMC guidelines, and Sub-Registrar jurisdictions vary across the NTR district.
                  Whether you own an ancestral commercial building in Governorpet, a luxury high-rise apartment in Moghalrajpuram, or agricultural land in Kankipadu, our estate lawyers provide customized legal drafting:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: BENZ CIRCLE, MOGHALRAJPURAM & SURYARAOPETA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Premier Residential Heart
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Patamata / Central
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Benz Circle &amp; Moghalrajpuram
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Benz Circle Flyover Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Moghalrajpuram Hill Views</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Suryaraopeta Civil Hospital</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pinnamaneni Polyclinic Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Esteemed for upscale residential complexes, prominent medical specialists, and commercial showrooms. We draft clear bequests for prime freehold flats, structured allocations among multiple siblings, and protective covenants for surviving spouses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Clear VMC door numbers, undivided land share (UDS) recitals, and life-interest protections prevent partition litigation in civil court.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Patamata / Governorpet</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Benz Circle and Moghalrajpuram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Benz Circle Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: GOVERNORPET & ONE TOWN */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Commercial Wholesale Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Governorpet / Gandhinagar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Governorpet &amp; One Town
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vastralatha Textile Complex</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Besant Road Commercial</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kaleswara Rao Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Eluru Road Retail Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Home to multi-generational wholesale merchant families, cloth traders, and jewelers. We formulate robust commercial business succession plans covering retail shops, trading partnerships, warehouse leases, and family firm shareholdings.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Partnership clause harmonization, GST transfer clarity, and executor authority ensure uninterrupted business continuity without freezing accounts.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Vijayawada Central</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Governorpet and One Town"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Governorpet Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: PATAMATA, KANURU & PORANKI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        High-Growth Residential Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Patamata / Kankipadu
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Patamata, Kanuru &amp; Poranki
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bandar Road Highway Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanuru Educational Zone</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Poranki Gated Villas</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tadigadapa Layouts</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Preferred by IT executives, professors, and non-resident Indian families with independent houses and modern gated villas. We assist with digital assets, overseas children inheritance structures, and NRI power-of-attorney execution.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Clear identification of bank lockers, demat portfolios, and explicit transmission clauses prevent contentious legal battles across overseas jurisdictions.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Patamata / SRO Kankipadu</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Patamata Kanuru Poranki"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Patamata Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: JAWAHAR AUTO NAGAR & GUNADALA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Industrial &amp; Auto Ancillary Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Patamata / Gunadala
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Jawahar Auto Nagar &amp; Gunadala
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jawahar Auto Nagar Industrial</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gunadala Church Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramavarappadu Ring</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nunna Agro Market Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Recognized as Asia&apos;s premier hub for automobile spare parts, body building, and light engineering fabrication. We draft legally sound enterprise Wills covering factory sheds, APIIC leasehold titles, heavy machinery, and commercial transport vehicles.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        APIIC allotment conditions, industrial leasehold renewal rights, and commercial debt indemnifications protect successor generations.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Gunadala / Patamata</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jawahar Auto Nagar and Gunadala"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Auto Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: BHAVANIPURAM & GOLLAPUDI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Logistics &amp; Wholesale Market
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bhavanipuram
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Bhavanipuram &amp; Gollapudi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gollapudi Market Yard</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhavanipuram Residential</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vidyadharapuram Depot</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ibrahimpatnam Power Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Hub for grain wholesale markets, transport fleet operators, cold storages, and commercial godowns. We handle complex commercial asset planning, warehouse ownership successions, and inter-vivos family trusts.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Clear separation between business fleet mortgages, commercial leases, and private ancestral residences prevents creditor interference upon demise.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Bhavanipuram</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bhavanipuram and Gollapudi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gollapudi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: GANNAVARAM & MANGALAGIRI (AMARAVATI CORRIDOR) */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Amaravati Capital &amp; Airport Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gannavaram / Mangalagiri
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Gannavaram &amp; Amaravati Core
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">APCRDA Land Pooling Plots</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gannavaram Airport Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Medha IT Park SEZ</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tadepalli &amp; Undavalli</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Characterized by APCRDA LPS returnable plots, airport development corridors, and Krishna river-facing luxury plots. We prepare specialized bequests for reconstituted plots under APCRDA guidelines and agricultural farms under Meebhoomi records.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Exact Land Pooling Scheme (LPS) plot identification numbers and annuity entitlement clauses guarantee unhindered transfer in APCRDA records.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Jurisdiction: SRO Gannavaram / SRO Mangalagiri</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gannavaram and Amaravati Corridor"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Amaravati Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP AP IGRS WILL REGISTRATION SOP */}
            <section id="step-by-step-vijayawada-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>AP IGRS STANDARD OPERATING PROCEDURE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Registration in Andhra Pradesh
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Vijayawada is conducted through the <strong>Registration &amp; Stamps Department of Andhra Pradesh (AP IGRS)</strong>.
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
                      Asset Inventory &amp; Beneficiary Mapping
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile complete ownership records of your Vijayawada properties, including VMC property tax assessment numbers, APCRDA plot allotment orders, bank account numbers, demat portfolios, and Krishna delta agricultural survey numbers. Appoint trusted beneficiaries, an executor, and a legal guardian for minor children.
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
                      Our legal specialists draft a tailored testamentary document. We incorporate unequivocal revocation of prior Wills, specific asset bequeathals, residuary estate provisions, non-presidency probate exemption affirmations, and explicit administrative powers for your executor.
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
                      AP IGRS Online Slot Booking &amp; CFMS Challan
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our team logs into the AP IGRS portal (<em>registration.ap.gov.in</em>), inputs document particulars under Book III, selects your local Vijayawada SRO, and generates the government fee challan through the Comprehensive Financial Management System (CFMS). We confirm your preferred time slot token.
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
                      SRO Attendance, Biometrics &amp; Book III Entry
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The testator and both witnesses visit the Sub-Registrar Office with original Aadhaar cards and appointment slips. The Sub-Registrar captures digital photographs, verifies biometric fingerprints, records the entry into Book III, and hands over the certified registered Will copy with official endorsement seals.
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Doorstep Will Registration for Senior Citizens
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly, infirm, or hospitalized testators residing in Benz Circle, Moghalrajpuram, Suryaraopeta, or anywhere in the Vijayawada metropolitan area, visiting an SRO may be physically unfeasible.
                  The law provides a compassionate, lawful solution.
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
                      Applicable across all Sub-Registrar jurisdictions in Andhra Pradesh
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar holds discretionary authority to attend the private residence or hospital room of a testator who cannot travel to the registration office due to age or medical disability.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">Medical Certificate Mandate:</span>
                    <p className="text-slate-600">
                      A registered medical practitioner (MBBS doctor) must issue a written certificate confirming that the testator is mentally lucid and in sound disposing state of mind.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">Official Commission Fee:</span>
                    <p className="text-slate-600">
                      A statutory private attendance commission fee is paid through the Andhra Pradesh CFMS portal, covering the Sub-Registrar official visit and travel escort.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#172228] text-white text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all"
                  >
                    <span>Request Doorstep Will Registration in Vijayawada</span>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Checklist for Vijayawada Will Making
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Before visiting the Sub-Registrar Office in Vijayawada or finalizing your document online, ensure you have gathered all necessary proofs. Use our interactive checklist to track your readiness:
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
            <section id="vijayawada-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET SPECIFIC SUCCESSION GUIDANCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Vijayawada Real Estate: APCRDA Plots &amp; VMC Estates
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Asset bequeathal in Vijayawada entails distinct municipal, urban development, and agricultural regulations. Here is how our legal drafts ensure title security across each local category:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* APCRDA PLOTS */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>APCRDA Land Pooling Scheme (LPS) Plots</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vijayawada borders the Amaravati capital region, where thousands of landholders own reconstituted residential and commercial plots under the Land Pooling Scheme. Our drafts specify exact APCRDA allotment numbers, survey particulars, and capital annuity transmission rights to avoid administrative rejection.
                  </p>
                </div>

                {/* VMC FLATS & RESIDENCES */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>VMC Freehold Apartments &amp; Homes</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Properties within Vijayawada Municipal Corporation (VMC) boundaries require municipal door numbers, assessment codes, and registered title deed citations. A registered Will enables the beneficiary to achieve name mutation directly through their local Ward Secretariat.
                  </p>
                </div>

                {/* WHOLESALE TRADING & AUTO UNITS */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Commercial Wholesale &amp; Industrial Units</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Commercial assets in Governorpet wholesale markets, One Town, or Jawahar Auto Nagar manufacturing sheds require distinct clauses for business leases, GST transitions, partnership interests, and creditor liabilities to ensure smooth family business succession.
                  </p>
                </div>

                {/* KRISHNA DELTA FARMS */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-[#C65378]" />
                    <span>Krishna Delta Agricultural Lands</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fertile agricultural lands in Kankipadu, Gannavaram, and Penamaluru mandals are recorded on the Andhra Pradesh Meebhoomi portal. We specify Electronic Title Deed cum Pattadar Passbook numbers, 1B ROR extracts, and survey bounds for seamless revenue mutation before the Tahsildar.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: STAMP DUTY & FEES */}
            <section id="vijayawada-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT STATUTORY COSTS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Stamp Duty &amp; Registration Fees: Vijayawada
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike conveyance deeds or gift deeds that attract 5% to 7.5% stamp duty plus transfer duty in Andhra Pradesh, registering a Will is exceptionally economical under state law:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                      <th className="p-3 sm:p-4 font-bold">Statutory Fee Component</th>
                      <th className="p-3 sm:p-4 font-bold text-[#C65378]">Official AP IGRS Tariff</th>
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
                      <td className="p-3 sm:p-4">Flat statutory fee payable via CFMS online challan</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">User &amp; Computer Charges</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">₹100 to ₹200</td>
                      <td className="p-3 sm:p-4">CARD electronic scanning and biometric processing</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 sm:p-4 font-semibold">Section 31 Doorstep Attendance</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Prescribed Tariff</td>
                      <td className="p-3 sm:p-4">Official government commission for Sub-Registrar home visit</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold">Certified Copy of Registered Will</td>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Nominal Application Fee</td>
                      <td className="p-3 sm:p-4">Available from SRO records after registration</td>
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
                      Ideal for nuclear families with straightforward residential apartments and bank accounts in Vijayawada.
                    </p>

                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant Lawyer-Vetted Template</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Non-Presidency Town Compliance</span>
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

                {/* TIER 2 - POPULAR */}
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
                      Custom drafting by senior estate advocates for APCRDA plots, commercial wholesale shops, and business assets.
                    </p>

                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Senior Advocate Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>APCRDA &amp; Commercial Bequests</span>
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
                      Complete end-to-end service including AP IGRS slot booking, CFMS challan assistance, and physical SRO accompaniment.
                    </p>

                    <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Everything in ₹4,990 Tier</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>AP IGRS Slot &amp; CFMS Challan</span>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Vijayawada Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Essential legal answers regarding Will drafting, AP IGRS registration, and probate exemption in Vijayawada:
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory References &amp; Andhra Pradesh IGRS Rules
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Every Will crafted on our platform adheres to strict Indian statutory law and Andhra Pradesh state circulars:
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
                    Exempts Hindu, Sikh, Jain, and Buddhist testators in Andhra Pradesh from mandatory court probate proceedings.
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
                    Indian Stamp Act Schedule I-A
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    100% Stamp Duty Exemption
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Wills carry ₹0 stamp duty in Andhra Pradesh; testators pay only nominal Book III registration charges.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] block">
                    APCRDA &amp; VMC Regulations
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Municipal &amp; Capital Region Mutation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Guidelines for transferring reconstituted LPS plots and municipal property assessments through Ward Sachivalayams.
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
                src="/images/will-drafting-in-vijayawada-banner.jpg"
                alt="Will Drafting in Vijayawada Legal Guide - Full Resolution"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-medium">
                Online Will Drafting &amp; Registration Guidance in Vijayawada (NTR District, Andhra Pradesh)
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
