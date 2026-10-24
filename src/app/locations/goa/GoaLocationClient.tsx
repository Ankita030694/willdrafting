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
  Palmtree,
  Ship,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "goa-overview", label: "OVERVIEW" },
  { id: "goa-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "goa-probate-rules", label: "PROBATE RULES" },
  { id: "goa-sro-directory", label: "SRO DIRECTORY" },
  { id: "goa-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-goa-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "goa-property-types", label: "PROPERTY TYPES" },
  { id: "goa-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const GOA_SRO_HUBS = [
  {
    id: "goa-panaji",
    name: "Tiswadi / Panaji Registry",
    sro: "Office of Civil Registrar-cum-Sub Registrar, Tiswadi",
    address: "Spaces Building, Near Old Patto Bridge / Junta House, Patto Plaza, Panaji, Goa - 403001",
    areas: "Panaji City, Fontainhas, Miramar, Dona Paula, Caranzalem, Bambolim, Taleigao, Santa Cruz, Ribandar, Old Goa",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "goa-margao",
    name: "Salcete / Margao Registry",
    sro: "Office of Civil Registrar-cum-Sub Registrar, Salcete",
    address: "Mathany Saldanha Administrative Complex, Near KTC Bus Stand, Margao, Goa - 403601",
    areas: "Margao City, Fatorda, Borda, Colva, Benaulim, Majorda, Nuvem, Curtorim, Navelim, Varca, Cavelossim",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "goa-mapusa",
    name: "Bardez / Mapusa Registry",
    sro: "Office of Civil Registrar-cum-Sub Registrar, Bardez",
    address: "Administrative Complex, Phadke Vaddo, Near Mapusa Municipal Market, Mapusa, Goa - 403507",
    areas: "Mapusa, Porvorim, Calangute, Candolim, Baga, Assagao, Anjuna, Vagator, Siolim, Aldona, Moira, Socorro",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "goa-vasco",
    name: "Mormugao / Vasco Registry",
    sro: "Office of Civil Registrar-cum-Sub Registrar, Mormugao",
    address: "Civil Court & Administrative Complex, Near Municipal Market, Vasco da Gama, Goa - 403802",
    areas: "Vasco City, Dabolim Airport Corridor, Chicalim, Bogmalo, Sancoale, Velsao, Cortalim, Headland Sada",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "goa-ponda",
    name: "Ponda Taluka Registry",
    sro: "Office of Civil Registrar-cum-Sub Registrar, Ponda",
    address: "Near Tisk Circle, Administrative Sub-Division Office, Ponda, Goa - 403401",
    areas: "Ponda Town, Farmagudi, Kundaim Industrial Area, Madkai, Priol, Usgao, Marcela, Shiroda, Borim",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "goa-pernem",
    name: "Pernem Northern Hub",
    sro: "Office of Civil Registrar-cum-Sub Registrar, Pernem",
    address: "Mini Secretariat Complex, Near Civil Court, Pernem, Goa - 403512",
    areas: "Pernem Town, Mopa Airport Corridor, Mandrem, Morjim, Arambol, Ashwem, Tuem, Agarwada",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "goa-bicholim",
    name: "Bicholim & Sattari Registry",
    sro: "Office of Civil Registrar-cum-Sub Registrar, Bicholim",
    address: "Government Administrative Complex, Court Road, Bicholim, Goa - 403504",
    areas: "Bicholim, Sanquelim, Mayem, Pale, Valpoi, Keri, Honda, Pissurlem, Sattari Agro-Belt",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "goa-canacona",
    name: "Canacona & South Coast",
    sro: "Office of Civil Registrar-cum-Sub Registrar, Canacona",
    address: "Taluka Administrative Complex, Chaudi, Canacona, Goa - 403702",
    areas: "Chaudi, Palolem, Agonda, Patnem, Poinguinim, Loliem, Galgibaga, Quepem, Sanguem Border",
    timings: "9:30 AM to 5:45 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Prepared on legal bond paper or plain sheets; formatted specifically to Portuguese Civil Code succession rules.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Mandatory for identity verification, thumbprint scanning, and photographic recording at the Civil Registrar.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Valid Photo IDs",
    detail: "Must not be beneficiaries or spouse of beneficiaries under the Will; must carry original Aadhaar or Passport.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Marriage Certificate & Antenuptial Contract (If Any)",
    detail: "Confirms matrimonial property regime (Communion of Assets or separation of assets under Goan law).",
    checked: true,
  },
  {
    id: "item-5",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Essential for senior citizens aged 60+ to certify complete testamentary mental capacity and lucidity.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Form I & XIV Extracts / Matriz Predial Receipts",
    detail: "Recent computerized land records from Directorate of Land Records or municipal house tax assessment papers.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Comunidade Share Certificates & Gated Villa Papers",
    detail: "Official certificates for Comunidade plots, apartment deeds, or cooperative housing society shares.",
    checked: false,
  },
];

export default function GoaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("goa-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("goa-panaji");
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

  const filteredHubs = GOA_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    GOA_SRO_HUBS.find((h) => h.id === selectedHub) || GOA_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (NASHIK ARCHITECTURE & PALETTE)
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
                <span>GOA CIVIL CODE &amp; ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Starts with 'Will Drafting Services in Goa' (Length: 60 characters) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Goa: Legal Estate Succession Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will under the Goa Civil Code and Portuguese succession principles. Protect your Portuguese ancestral homes, Comunidade shares, coastal villas, and mutual funds with expert guidance on forced heir legitime and Civil Registrar registration.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Goa Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#goa-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Goa Registrar Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Portuguese Civil Code Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Legitime Quota Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Public &amp; Sealed Will Support</span>
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
                  src="/images/will-drafting-in-goa.jpg"
                  alt="Will Drafting Services in Goa: Portuguese Civil Code and Succession Guide"
                  fill
                  className="object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Goa Estate Planning &amp; Succession Blueprint
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
                12 Taluka Registries
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                North &amp; South Goa Coverage
              </span>
            </div>
            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center md:border-l md:border-[#172228]/10">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                50% Legitime Law
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Forced Heir Protection
              </span>
            </div>
            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center md:border-l md:border-[#172228]/10">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                Comunhão de Bens
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Spousal Half-Share Shield
              </span>
            </div>
            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center md:border-l md:border-[#172228]/10">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                Book III Registration
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Official Government Records
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
          MAIN CONTAINER: 2-COLUMN (DESKTOP STICKY MINIMALIST TOC SIDEBAR + EDITORIAL CONTENT)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-12">

          {/* DESKTOP VIEW: STICKY SIDEBAR TABLE OF CONTENTS (MATCHING SCREENSHOT 1) */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]">
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

            {/* SECTION 1: OVERVIEW & KEY HIGHLIGHTS (MATCHING SCREENSHOT 1) */}
            <section id="goa-overview" className="scroll-target space-y-6">
              {/* KEY HIGHLIGHTS BRIEF CARD WITH PINK ACCENT BORDER (SCREENSHOT 1) */}
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>GOA CIVIL CODE SUCCESSION BRIEF</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Goa
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>50% Legitime Protection</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Portuguese Civil Code rules in Goa, forced heirs (children) legally retain a mandatory 50% non-disposable share (Legitime). Wills only apply to the remaining 50% disposable quota.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Communion of Assets (Meeação)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Marriages in Goa default to Comunhão de Bens. Each spouse holds an undivided 50% half-share. One spouse cannot will the other&apos;s half without formal registered consent.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Goa Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are completely exempt from ad-valorem stamp duty across Goa. Only nominal government registration and computerized scanning fees are payable at the Civil Registrar.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Public &amp; Sealed Wills</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Testators can execute an official Public Will inscribed in the Civil Registrar&apos;s Book of Wills or deposit a Sealed Will (Testamento Cerrado) for absolute lifelong privacy.
                    </p>
                  </div>
                </div>
              </div>

              {/* OVERVIEW EDITORIAL */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>THE UNIQUE JURISPRUDENCE OF GOAN SUCCESSION</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Goa Estate Law: Portuguese Civil Code Succession Guide
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
                  <p>
                    Succession and inheritance law in the State of Goa occupies a unique constitutional and statutory position in the Indian Union. While testamentary dispositions across Maharashtra, Karnataka, and Delhi NCR are governed by the general provisions of the Indian Succession Act, 1925, Goa retains its historical Uniform Civil Code heritage under the <strong>Portuguese Civil Code of 1867 (Código Civil Português)</strong>, complemented by the <strong>Goa Succession, Special Notaries and Inventory Proceeding Act, 2012 (Goa Act 23 of 2016)</strong>.
                  </p>
                  <p>
                    In Goa, the principle of absolute testamentary freedom is legally restricted. A parent or property owner cannot arbitrarily disinherit their legal descendants. The law statutorily divides every individual&apos;s estate into two distinct shares: the <em>Quota Indisponível</em> (the Legitime or reserved share that compulsorily belongs to forced heirs) and the <em>Quota Disponível</em> (the disposable quota that can be freely bequeathed via Will).
                  </p>
                  <p>
                    Whether you own an ancestral Portuguese townhouse in Fontainhas, an apartment overlooking the Arabian Sea in Miramar, a luxury holiday villa in Assagao, or inherited rights in Comunidade agrarian lands, drafting a valid Will requires precise calibration with Goan matrimonial and succession statutes to prevent contentious inventory proceedings in civil courts.
                  </p>
                </div>
              </div>

              {/* HIGHLIGHT CALLOUT CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      Uniform Civil Code Heritage: Protection Against Arbitrary Disinheritance
                    </h3>
                    <p className="text-xs text-slate-500">
                      Article 44 of the Constitution of India and Portuguese Civil Code of 1867
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Unlike common law regimes where testators can leave entire fortunes to third parties or charitable trusts while excluding their biological children, Goan law accords high priority to familial equity and spousal partnership. A Will written in violation of legitime reservations is not void entirely, but is statutorily subject to &apos;Inofficious Will Reduction&apos; in judicial inventory proceedings.
                </p>
              </div>
            </section>

            {/* SECTION 2: LEGAL FRAMEWORK */}
            <section id="goa-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>CORE STATUTORY PRINCIPLES</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Legal Framework: Legitime Quota &amp; Communion of Assets
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PRINCIPLE 1: COMMUNION OF ASSETS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    1. Communion of Assets (Comunhão de Bens)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    By default under Goan family law, every marriage solemnized in Goa operates under the regime of universal communion of assets, unless an Antenuptial Contract (<em>Escritura de Convenção Antenupcial</em>) was formally registered before the marriage.
                  </p>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-4">
                    <li>Both spouses hold equal 50% undivided co-ownership (<em>meeação</em>) over all assets acquired before or during marriage.</li>
                    <li>One spouse <strong>cannot</strong> bequeath the entire family house or plot; they can only make a Will over their undivided 50% half-share.</li>
                    <li>Attempting to will the surviving spouse&apos;s share without written concurrence renders the testamentary clause legally unenforceable.</li>
                  </ul>
                </div>

                {/* PRINCIPLE 2: LEGITIME VS DISPOSABLE QUOTA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    2. Legitime (Quota Indisponível) vs Disposable Quota
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Goa Civil Code strictly protects &apos;forced heirs&apos; (<em>herdeiros legitimários</em>), which primarily includes children, descendants, and in their absence, ascendant parents:
                  </p>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-4">
                    <li><strong>With Descendants (Children):</strong> 50% of the testator&apos;s estate is legally reserved as the Legitime. Only the remaining 50% (Disposable Quota) can be willed away.</li>
                    <li><strong>With Ascendants (Parents, No Children):</strong> If there are no children but parents survive, the Legitime is typically one-third to one-half, depending on the number of surviving parents.</li>
                    <li><strong>No Forced Heirs:</strong> If the testator leaves neither descendants nor ascendants, they possess 100% testamentary disposition over their estate.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3: WILL REGISTRATION IN GOA */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL PROCEDURAL MODES</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Will Registration in Goa: Public vs Private Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Goan law and the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012, individuals can execute their testamentary instruments through distinct statutory mechanisms:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TYPE 1: PUBLIC WILL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase">
                    Highest Legal Security
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Public Will (Testamento Público)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dictated directly to or presented before the Special Notary / Civil Registrar. Recorded into the permanent Book of Wills (<em>Livro de Notas para Testamentos</em>). The registrar reads it aloud to the testator in the presence of two witnesses, and all parties affix signatures.
                  </p>
                  <div className="pt-2 text-xs font-semibold text-emerald-700">
                    ✓ Immune to allegations of loss or physical tampering.
                  </div>
                </div>

                {/* TYPE 2: CLOSED / SEALED WILL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase">
                    Strict Confidentiality
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Closed Will (Testamento Cerrado)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Written and signed privately by the testator or legal advocate, placed in an envelope, and presented to the Special Notary. The Notary draws an official Act of Approval (<em>Instrumento de Aprovação</em>) on the envelope and seals it with wax stamps. Opened only upon testator demise.
                  </p>
                  <div className="pt-2 text-xs font-semibold text-blue-700">
                    ✓ Contents remain 100% confidential during testator lifetime.
                  </div>
                </div>

                {/* TYPE 3: UNREGISTERED / ISA WILL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase">
                    Prone to Challenges
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Indian Succession Act Will
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An instrument executed on plain paper signed before two attesting witnesses under the general provisions of Section 63 of the Indian Succession Act. While recognized, it faces severe procedural hurdles during mutation before Goan Mamlatdars and Panchayats without notarial verification.
                  </p>
                  <div className="pt-2 text-xs font-semibold text-amber-700">
                    ⚠ Strong risk of contestation during inventory proceedings.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: PROBATE & INVENTARIO */}
            <section id="goa-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL SETTLEMENT DYNAMICS</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Court Probate vs Inventory Proceedings in Goa Courts
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
                <p>
                  A major point of confusion for estate owners and NRIs in Goa is whether court probate is mandatory. In presidency towns like Mumbai, Kolkata, and Chennai, probate under Section 213 of the Indian Succession Act is compulsory for certain classes of property. <strong>In Goa, however, probate is not the customary route.</strong>
                </p>
                <p>
                  Instead, Goan succession is finalized through <strong>Inventory Proceedings (Processo de Inventário)</strong>. Under the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012, any co-heir or testamentary beneficiary can initiate an inventory proceeding before the Senior Civil Court or directly before the Special Notary (for uncontested estates) to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li>Appoint the head of the family or estate administrator, known as the <strong>Cabeça de Casal</strong>.</li>
                  <li>Compile an exhaustive, legally binding inventory of all movable and immovable assets left by the deceased.</li>
                  <li>Enforce the mandatory 50% Legitime protection for forced heirs and legally allocate the testator&apos;s Disposable Quota in accordance with the registered Will.</li>
                  <li>Issue an official final partition order (<em>Sentença de Partilha</em>) or deed of qualification of heirs (<em>Escritura de Habilitação de Herdeiros</em>) that directs the Mamlatdar and Sub-Registrar to effect absolute title mutation on Form I &amp; XIV.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 5: SRO DIRECTORY */}
            <section id="goa-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>TALUKA REGISTRATION HUBS</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Civil Registrar &amp; Sub-Registrar Directory in Goa
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Civil Registrars and Sub-Registrars in Goa possess dual statutory authority: recording Public Wills under the Portuguese Civil Code and registering testamentary deeds under Book III of the Registration Act, 1908. Search below to locate your jurisdictional office:
                </p>
              </div>

              {/* SRO SEARCH FILTER */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by city, taluka, or village (e.g. Panaji, Assagao, Margao)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                />
              </div>

              {/* HUB SELECTOR TABS & DETAIL VIEW */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
                <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
                  {filteredHubs.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedHub === hub.id
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-[#C65378]">
                      <Building className="w-3.5 h-3.5" />
                      {activeHubData.name}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {activeHubData.sro}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <strong>Official Address:</strong> {activeHubData.address}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <strong>Working Hours:</strong> {activeHubData.timings}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700">
                    <span className="font-bold text-slate-900 block">Jurisdictional Coverage:</span>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {activeHubData.areas}
                    </p>
                    <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200/70">
                      Services: Public Will dictation, Sealed Will approval, Book III indexation, and Section 31 home visits.
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                  <span className="text-slate-500">
                    Official Goa Portal: <strong>goaonline.gov.in &amp; ngdrs.goa.gov.in</strong>
                  </span>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                  >
                    <span>Request Legal Assistance for {activeHubData.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 6: REGIONAL CITIES IN GOA (EXACT SAME AS NASHIK LOCAL AREAS SECTION, RENAMED) */}
            <section id="goa-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES &amp; ESTATE NUANCES</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Regional Cities: Area-Wise Will Drafting in Goa
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate and estate assets in Goa span heritage colonial homes in Fontainhas, high-value luxury coastal villas in Bardez, commercial family enterprises in Margao, industrial leaseholds in Ponda, and port corridor flats in Vasco. Our estate lawyers deliver tailored Will drafting, Special Notary coordination, and inventory safeguards across all regional city hubs:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: PANAJI & TISWADI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Capital &amp; Administrative Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Tiswadi (Panaji)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Panaji &amp; Tiswadi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panaji City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fontainhas</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Miramar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dona Paula</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Caranzalem</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bambolim</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Panaji</strong> and Tiswadi for heritage Portuguese townhouses in Fontainhas, luxury sea-facing villas in Dona Paula, and prime residential flats in Miramar and Caranzalem. Protects undivided matrimonial shares (<em>meeação</em>), specifies City Corporation of Panaji (CCP) house tax transfer terms, and manages mutual fund portfolios.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Spaces Building, Patto Plaza, Panaji</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Special Notary Public Will entry, e-Challan payment, advocate attendance, and Section 31 home visits for senior residents.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Panaji"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Panaji Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: MARGAO & SALCETE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Goa Commercial Capital
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Salcete (Margao)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Margao &amp; Salcete
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Margao City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fatorda</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Borda</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Colva</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Benaulim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nuvem</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Margao</strong> and the Salcete coastal belt for established family retail enterprises, ancestral bungalows (<em>Casas Portuguesas</em>), and hospitality properties. Formulates airtight disposable quota bequests, safeguards minor heirs, and prevents lengthy judicial inventory disputes before the Margao Civil Courts.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mathany Saldanha Complex, Margao</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Civil Registrar slot coordination, Margao Municipal Council record mutation guidelines, and doorstep execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Margao"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Margao Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: MAPUSA & BARDEZ */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Goa Tourism &amp; Villa Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bardez (Mapusa)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mapusa &amp; Bardez
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mapusa</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Porvorim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Assagao</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anjuna</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Calangute</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Candolim</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Mapusa</strong>, Porvorim, and Assagao for premium designer villas, boutique holiday resorts, and Comunidade plots across North Goa. Integrates Coastal Regulation Zone (CRZ) statutory guidelines, Form I &amp; XIV mutation safeguards, and multi-jurisdictional estate planning for Non-Resident Indians (NRIs).
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Phadke Vaddo Administrative Complex, Mapusa</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High Court of Bombay at Goa (Porvorim) bench coordination, Special Notary registration, and doorstep execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mapusa"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mapusa Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: VASCO DA GAMA & MORMUGAO */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Port City &amp; Aviation Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mormugao (Vasco)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vasco da Gama &amp; Mormugao
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vasco da Gama</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dabolim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chicalim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bogmalo</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sancoale</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Vasco da Gama</strong> and the Mormugao peninsula for naval officers, port executives, corporate mariners, and Dabolim airport corridor apartment buyers. Covers apartment transmissions under the Goa Apartment Ownership Act, port town tenancy rights, and securities/demat accounts.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Court Complex, Vasco da Gama</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Mormugao Civil Registrar token booking, biometric authentication, and maritime legal succession advisory.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Vasco da Gama"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vasco Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: PONDA & INDUSTRIAL CENTRAL BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Cultural Heart &amp; Industrial Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ponda
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ponda &amp; Central Goa
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ponda Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Farmagudi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kundaim IDC</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Madkai</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Priol</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shiroda</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Ponda</strong> covering family business succession, spice plantations, ancestral family devasthan rights, and industrial leasehold plots in Kundaim and Madkai IDC. Guarantees legitimate succession planning without triggering lengthy partition disputes among co-heirs.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Near Tisk Circle, Ponda</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Ponda Sub-Registrar appointments, spice farm Form I &amp; XIV mutation advisory, and advocate representation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ponda"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ponda Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: PERNEM & COASTAL BELTS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Mopa Airport Belt &amp; South Coast
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Pernem &amp; Canacona
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Pernem &amp; Coastal Belts
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pernem Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mopa Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mandrem</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Morjim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Canacona / Palolem</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Pernem</strong> and Canacona for high-growth land parcels surrounding Manohar International Airport Mopa, cashew farms, and beachfront properties in Mandrem, Morjim, and Palolem. Establishes indisputable boundary bequests and Comunidade gaunkari rights continuity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hubs: Pernem Mini Secretariat &amp; Canacona Chaudi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Taluka Sub-Registrar bookings, rural land verification, and comprehensive legal succession consultation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Pernem"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Pernem Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 7: 5-STEP SOP */}
            <section id="step-by-step-goa-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP PROTOCOL</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. 5-Step Process: Legal Will Drafting &amp; Execution SOP
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow our verified standard operating procedure to prepare, execute, and register a dispute-free Will under Goan succession jurisprudence:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* STEP 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3 relative flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] text-xs font-extrabold flex items-center justify-center mb-3">
                      01
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Asset &amp; Marital Audit
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Verify matrimonial property regime (Communion or Antenuptial contract) and gather Form I &amp; XIV extracts, sale deeds, and investment records.
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-[#5F7E75] pt-2 border-t border-slate-100">
                    Determines 50% meeação
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3 relative flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] text-xs font-extrabold flex items-center justify-center mb-3">
                      02
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Legitime Calculation
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Calculate the compulsory 50% reserved portion for children or forced heirs and delineate the freely bequeathable Disposable Quota.
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-[#5F7E75] pt-2 border-t border-slate-100">
                    Prevents reduction suits
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3 relative flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] text-xs font-extrabold flex items-center justify-center mb-3">
                      03
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Custom Legal Drafting
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Draft customized clauses naming the executor (Cabeça de Casal), articulating specific asset devises, and revoking prior instruments.
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-[#5F7E75] pt-2 border-t border-slate-100">
                    Goa advocate vetted
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3 relative flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] text-xs font-extrabold flex items-center justify-center mb-3">
                      04
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Format Selection &amp; Slot
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Select either a Public Will (Testamento Público) or Sealed Will (Testamento Cerrado) and book an appointment with the Civil Registrar.
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-[#5F7E75] pt-2 border-t border-slate-100">
                    Official slot booking
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3 relative flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] text-xs font-extrabold flex items-center justify-center mb-3">
                      05
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Registry Execution
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Attend before the Special Notary with two independent witnesses for verbal attestation, biometric capture, and official Book III deposit.
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-[#5F7E75] pt-2 border-t border-slate-100">
                    Permanent state custody
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: HOME VISIT / SECTION 31 */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION FACILITY</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Doorstep Will Registration: Senior Citizen Home Visits
                </h2>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Under Section 31 of the Registration Act, 1908 and Goa registration procedural rules, senior citizens, bedridden persons, or testators with severe mobility restrictions are not required to physically travel to the Civil Registrar Office.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="font-bold text-xs text-slate-900 uppercase tracking-wide block">1. Medical Certificate</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      An MBBS or MD registered practitioner certifies the testator&apos;s physical inability to travel while confirming complete testamentary soundness of mind.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="font-bold text-xs text-slate-900 uppercase tracking-wide block">2. Official Petition</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our advocates file the formal home visit application with the jurisdictional Civil Registrar along with the doctor&apos;s certificate and requisite travel cess.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="font-bold text-xs text-slate-900 uppercase tracking-wide block">3. Residential Execution</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Civil Registrar visits the residence with mobile biometric equipment to complete verbal reading, attestation, and thumbprint capture in comfort.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION READINESS</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Document Checklist for Will Registration in Goa
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Use this interactive checklist to verify that all necessary identity, matrimonial, and property documents are in place before attending your appointment before the Civil Registrar:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs sm:text-sm font-bold text-slate-700">
                    Checklist Progress: {checkedCount} of {checklist.length} Verified
                  </span>
                  <span className="text-xs font-bold text-[#C65378] bg-rose-50 px-3 py-1 rounded-full">
                    {Math.round((checkedCount / checklist.length) * 100)}% Ready
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200 text-slate-900"
                          : "bg-slate-50/50 border-slate-200/80 text-slate-600 hover:bg-white"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                          item.checked ? "bg-[#C65378] text-white" : "border border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">{item.label}</h3>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: GOA PROPERTY TYPES */}
            <section id="goa-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASS GOVERNANCE</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Goa Property Types: Comunidade, Portuguese Villas &amp; Flats
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Portuguese Ancestral Villas &amp; Quintas
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Inherited family homes often held in coparcenary with siblings or overseas relatives. Clear testamentary clauses designating specific floor rights or appointing an executor prevent costly deadlocks in civil inventory proceedings.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Palmtree className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Comunidade Lands &amp; Gaunkari Shares
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governed under the Code of Comunidades. Residential plots leased or granted by a Comunidade can be willed for their superstructure, while annual dividend rights (<em>Zon</em>) follow customary rules of the individual village gaunkari.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Modern Apartments &amp; Gated Villas
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    High-rise apartments and holiday homes in Porvorim, Miramar, Caranzalem, and Dabolim governed by the Goa Apartment Ownership Act, 1988. Codifies nominee versus beneficial owner rights to ensure direct society share transfer.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: REGISTRATION FEES */}
            <section id="goa-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL CHARGES BREAKDOWN</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Registration Fees &amp; Stamp Duty Charges in Goa
                </h2>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Registering a Will in Goa is intentionally kept economical by the State Government to encourage legal documentation and prevent fraudulent property transfers:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                    <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Fee Component</th>
                        <th className="py-3 px-4">Statutory Charge</th>
                        <th className="py-3 px-4">Legal Authority / Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-4 font-bold">Stamp Duty</td>
                        <td className="py-3 px-4 text-emerald-700 font-extrabold">₹0 (Completely Exempt)</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Wills carry zero ad-valorem stamp duty across Goa.</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold">Civil Registrar Public Will Fee</td>
                        <td className="py-3 px-4 font-bold">₹500 to ₹1,500</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Official fee for transcription into the Book of Wills.</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold">Sealed Will (Approval Act)</td>
                        <td className="py-3 px-4 font-bold">₹300 to ₹800</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Charge for the Instrumento de Aprovação and wax seal.</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold">Scanning &amp; Portal Charges</td>
                        <td className="py-3 px-4 font-bold">₹100 to ₹300</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Computerized archiving and digital Book III indexing.</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold">Section 31 Doorstep Visit Fee</td>
                        <td className="py-3 px-4 font-bold">₹1,000 to ₹2,500 + TA</td>
                        <td className="py-3 px-4 text-xs text-slate-500">Statutory travel and inspection fee for home attendance.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 12: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL PACKAGES</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Will Drafting Plans: Transparent Pricing for Goa
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the service tier that fits your estate complexity. Fixed transparent pricing with zero hidden surcharges:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Standard</span>
                    <h3 className="text-xl font-extrabold text-slate-900">Online Lawyer-Drafted Will</h3>
                    <div className="text-3xl font-black text-slate-900">₹1,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for nuclear family estates with residential flats, bank deposits, and mutual funds.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">✓ Portuguese Civil Code compliance check</li>
                      <li className="flex items-center gap-2">✓ Legitime disposable quota structuring</li>
                      <li className="flex items-center gap-2">✓ Custom executor and guardian nomination</li>
                      <li className="flex items-center gap-2">✓ Ready-to-execute print-ready document</li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full text-center font-bold text-xs bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
                  >
                    Choose Standard Plan
                  </a>
                </div>

                {/* PLAN 2 - FEATURED */}
                <div className="rounded-3xl bg-[#172228] text-white border-2 border-[#C65378] p-6 shadow-xl flex flex-col justify-between space-y-6 relative">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C65378] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                  <div className="space-y-4 pt-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-rose-300">Advocate Vetted</span>
                    <h3 className="text-xl font-extrabold text-white">Senior Advocate Consultation</h3>
                    <div className="text-3xl font-black text-white">₹4,990</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Designed for multi-property estates, Comunidade plots, ancestral homes, and NRI assets.
                    </p>
                    <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-white/10">
                      <li className="flex items-center gap-2">✓ Everything in Standard Plan</li>
                      <li className="flex items-center gap-2">✓ 1-on-1 video call with Goan estate lawyer</li>
                      <li className="flex items-center gap-2">✓ Communion of assets (meeação) audit</li>
                      <li className="flex items-center gap-2">✓ Form I &amp; XIV land record title review</li>
                      <li className="flex items-center gap-2">✓ Inventory proceeding dispute prevention</li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full text-center font-extrabold text-xs bg-[#C65378] text-white hover:bg-[#a13c5d] transition-colors shadow-lg shadow-[#C65378]/25"
                  >
                    Choose Advocate Plan
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Comprehensive</span>
                    <h3 className="text-xl font-extrabold text-slate-900">Complete Registry &amp; Doorstep</h3>
                    <div className="text-3xl font-black text-slate-900">₹9,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Full white-glove registration support across Panaji, Margao, Mapusa, Vasco, and Ponda.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">✓ Everything in Advocate Consultation Plan</li>
                      <li className="flex items-center gap-2">✓ Civil Registrar / Special Notary slot booking</li>
                      <li className="flex items-center gap-2">✓ Physical advocate accompaniment at registry</li>
                      <li className="flex items-center gap-2">✓ Section 31 home visit paperwork handling</li>
                      <li className="flex items-center gap-2">✓ Certified true copy procurement from Book III</li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full text-center font-bold text-xs bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
                  >
                    Choose Comprehensive Plan
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Will Drafting in Goa
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          openFaq === index ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 14: STATUTORY REFERENCES */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY REFERENCES</span>
                </div>
                {/* H2 <= 70 chars, no em-dash */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  14. Statutory References &amp; Relevant Acts in Goa
                </h2>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every testamentary instrument drafted for Goan residents strictly conforms to statutory provisions under Indian and State enactments:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong>Portuguese Civil Code of 1867:</strong>
                    <p className="text-slate-500">Articles 1766 to 2166 governing succession, legitimate reservations (Legitime), and universal communion of assets.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong>Goa Succession &amp; Inventory Act, 2012:</strong>
                    <p className="text-slate-500">Goa Act 23 of 2016 establishing modern procedural codes for Special Notaries, qualification of heirs, and judicial inventory partitions.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong>Registration Act, 1908:</strong>
                    <p className="text-slate-500">Sections 18(e), 31, and 51 governing optional registration of Wills, Book III custodial entries, and home visits.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong>Code of Comunidades (Dec. 37:744):</strong>
                    <p className="text-slate-500">Statutory rules regulating the succession and transmission of residential long-term leases and Gaunkar rights.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* BOTTOM CTA BANNER */}
            <section className="rounded-3xl bg-[#172228] text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C65378]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Draft Your Goa-Compliant Will with Legal Certainty
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Safeguard your family legacy, honor the Portuguese Civil Code, protect forced heir shares, and ensure seamless mutation across Goan land registers.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25"
                  >
                    Start Drafting Your Will Online
                  </a>
                  <a
                    href="/contact"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/15 transition-all border border-white/20"
                  >
                    Schedule Legal Consultation
                  </a>
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden p-4 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-900">
                Visual Blueprint: Goa Will Drafting &amp; Portuguese Civil Code Framework
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
                src="/images/will-drafting-in-goa.jpg"
                alt="High Resolution Visual Blueprint: Goa Will Drafting and Special Notary Registration"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Goa Civil Registrar Registered &amp; Form I &amp; XIV Mutation Compliant</span>
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
