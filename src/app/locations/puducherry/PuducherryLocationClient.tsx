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
  BookOpen,
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
  { id: "puducherry-overview", label: "OVERVIEW" },
  { id: "puducherry-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "puducherry-probate-rules", label: "PROBATE RULES" },
  { id: "puducherry-sro-directory", label: "SRO DIRECTORY" },
  { id: "puducherry-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-puducherry-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "puducherry-property-types", label: "PROPERTY TYPES" },
  { id: "puducherry-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "legal-citations", label: "STATUTORY REFS" },
];

const PUDUCHERRY_SRO_HUBS = [
  {
    id: "sro-puducherry",
    name: "SRO Puducherry (Saram / Boulevard)",
    sro: "Sub-Registrar Office Puducherry",
    address: "Saravanan Complex, Villianur Main Road, Saram, Puducherry - 605013",
    areas: "White Town, Heritage Town, French Quarter, Goubert Avenue, Boulevard, Muthialpet, Orleanpet, Uppalam",
    timings: "9:00 AM to 5:45 PM (Monday to Friday, closed on public holidays)",
  },
  {
    id: "sro-oulgaret",
    name: "SRO Oulgaret (Reddiarpalayam)",
    sro: "Sub-Registrar Office Oulgaret (Ulgaret)",
    address: "Jawahar Nagar, Boomianpet, Reddiarpalayam, Puducherry - 605005",
    areas: "Lawspet, Reddiarpalayam, Boomianpet, Saram, Gorimedu, Ellaipillaichavady, Kalapet, PIMS Medical Belt",
    timings: "9:00 AM to 5:45 PM (Monday to Friday, closed on public holidays)",
  },
  {
    id: "sro-villianur",
    name: "SRO Villianur (Suburban Core)",
    sro: "Sub-Registrar Office Villianur",
    address: "Sub-Taluk Office Road, Villianur, Puducherry - 605110",
    areas: "Villianur Town, Thiruvandarkoil, Kottaimedu, Arumparthapuram, Sedarapet Industrial Zone, Koodapakkam",
    timings: "9:00 AM to 5:45 PM (Monday to Friday, closed on public holidays)",
  },
  {
    id: "sro-bahour",
    name: "SRO Bahour (Southern Agrarian Hub)",
    sro: "Sub-Registrar Office Bahour",
    address: "Main Road, Near Bus Stand, Bahour, Puducherry - 607402",
    areas: "Bahour Town, Karikalampakkam, Nettapakkam, Madagadipet, Seliamedu, Kirumampakkam, Manapet",
    timings: "9:00 AM to 5:45 PM (Monday to Friday, closed on public holidays)",
  },
  {
    id: "sro-ariyankuppam",
    name: "SRO Ariyankuppam (Coastal Corridor)",
    sro: "Sub-Registrar Office Ariyankuppam",
    address: "Cuddalore Main Road, Ariyankuppam, Puducherry - 605007",
    areas: "Ariyankuppam, Veerampattinam, Nonankuppam, Chunnambar, Kakkayanthope, Manavely, Murungapakkam",
    timings: "9:00 AM to 5:45 PM (Monday to Friday, closed on public holidays)",
  },
  {
    id: "sro-karaikal",
    name: "SRO Karaikal (Port District Hub)",
    sro: "Sub-Registrar Office Karaikal",
    address: "Collectorate Complex, Beach Road, Karaikal - 609602",
    areas: "Karaikal Town, Karaikal Port, Neravy, TR Pattinam, Nedungadu, Kovilpathu, Keezhakasakudy",
    timings: "9:00 AM to 5:45 PM (Monday to Friday, closed on public holidays)",
  },
  {
    id: "sro-thirunallar",
    name: "SRO Thirunallar (Temple Town)",
    sro: "Sub-Registrar Office Thirunallar",
    address: "Temple Car Street, Thirunallar, Karaikal District - 609607",
    areas: "Thirunallar Town, Ambagarathur, Kottucherry, Poovam, Varichikudy, Pettai, Subrayapuram",
    timings: "9:00 AM to 5:45 PM (Monday to Friday, closed on public holidays)",
  },
  {
    id: "sro-mahe",
    name: "SRO Mahe (Malabar Coast Enclave)",
    sro: "Sub-Registrar Office Mahe",
    address: "Civil Station Complex, Near Railway Station Road, Mahe Enclave - 673310",
    areas: "Mahe Town, Mayyazhi Riverfront, Pandakkal, Chalakkara, Cherukallayi, Parakkal (surrounded by Kerala)",
    timings: "9:00 AM to 5:45 PM (Monday to Friday, closed on public holidays)",
  },
  {
    id: "sro-yanam",
    name: "SRO Yanam (Godavari Delta Enclave)",
    sro: "Sub-Registrar Office Yanam",
    address: "Government Administrative Complex, Pillaraya Street, Yanam - 533464",
    areas: "Yanam Town, Kanakalapeta, Agraharam, Dariyalatippa, Gueryampeta, Farampeta (surrounded by Andhra Pradesh)",
    timings: "9:00 AM to 5:45 PM (Monday to Friday, closed on public holidays)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Paper",
    detail: "Printed on standard white A4 sheets. Under Puducherry law, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Needed for biometric identity validation, digital photo capture, and official thumbprint at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Neutral Adult Witnesses with Valid Photo IDs",
    detail: "Must carry original government photo IDs and must not be heirs receiving any asset under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Sound Mind Note (MBBS / MD)",
    detail: "Advised for senior Will makers aged 60+. Certifies sound mind, memory, and full sound mind.",
    checked: false,
  },
  {
    id: "item-5",
    label: "French Renonçant Status Paper (If Applicable)",
    detail: "Required for Will makers governed by the French Civil Code to confirm legal reserve quotas.",
    checked: false,
  },
  {
    id: "item-6",
    label: "City House Tax Receipts (Puducherry / Oulgaret)",
    detail: "Recent asset tax assessment receipts confirming city assessment numbers and door addresses.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Patta / Chitta & Filed Title Deeds",
    detail: "Computerized revenue records from Nilamagal portal and original sale or split deeds for all assets.",
    checked: false,
  },
];

export default function PuducherryLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("puducherry-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("sro-puducherry");
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

  const filteredHubs = PUDUCHERRY_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    PUDUCHERRY_SRO_HUBS.find((h) => h.id === selectedHub) || PUDUCHERRY_SRO_HUBS[0];

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
                <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                <span>PUDUCHERRY UT ESTATE &amp; SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 59 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Puducherry: Legal Estate Planning
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Make a legally valid Will in Puducherry, Karaikal, Mahe, or Yanam. We guide you on French Civil Code and Indian Succession Act rules. Our lawyers assist with SRO booking and doorstep home visits.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Puducherry Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#puducherry-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Puducherry SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Madras HC Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>French Code Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULL VISIBILITY GUARANTEED */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group flex items-center justify-center"
              >
                <Image
                  src="/images/will-drafting-in-puducherry.jpg"
                  alt="Legal Will Drafting and Estate Planning in Puducherry"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Puducherry Heritage &amp; Estate Blueprint
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
                9 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                All 4 Enclaves Covered
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Dual Legal Heritage
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                French Code &amp; ISA 1925
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                A Choice Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Outside Chennai Presidency Town
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
          MAIN CONTAINER: 2-COLUMN
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
            <section id="puducherry-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>PUDUCHERRY ESTATE SUCCESSION BRIEF</span>
                </div>
                {/* H2 <= 70 chars (55 chars) */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Puducherry
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Dual Legal Heritage</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      French Renonçants follow the French Civil Code. All other citizens follow the Indian Succession Act of 1925.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>A Choice Filing</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will filing is a choice under Section 18(e). Registering in Book III at a Puducherry SRO prevents asset court fights.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Is Not Needed</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Puducherry lies outside the Chennai presidency town limits. Under Section 213 of the ISA, probate is non-needed.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Section 31 Doorstep SRO Visits</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Seniors and bedridden Will makers can book a doorstep SRO visit. A basic doctor fitness paper is all that is required.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="puducherry-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FOUNDATION &amp; JURISPRUDENCE</span>
                </div>
                {/* H2 <= 70 chars (48 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Puducherry
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Puducherry has a unique legal history. Under the 1956 Treaty of Cession, the territory has two legal systems for Wills:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                      FR
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      French Civil Code (Code Civil) for Renonçants
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    In 1881 and 1884, some local residents renounced their personal laws for French civil status. The Supreme Court confirmed in <em>Krishnamurthy Gounder v. Pavunambal</em> that French Civil Code rules still apply to these Renonçants.
                  </p>
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1">
                    <span className="font-bold block">Forced Heirship (Réserve Héréditaire):</span>
                    <span>
                      Renonçants cannot disinherit their children. A protected quota must be preserved for surviving descendants. Only the remaining disposable fraction (quotité disponible) can be freely bequeathed.
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
                      IN
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Indian Succession Act, 1925 for General Citizens
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Most Puducherry residents did not renounce their personal laws. For them, self-acquired assets follow Sections 59 and 63 of the Indian Succession Act, 1925. Hindu residents follow Section 30 of the Hindu Succession Act, 1956.
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-900 space-y-1">
                    <span className="font-bold block">Absolute Will Freedom:</span>
                    <span>
                      General citizens enjoy complete freedom to bequeath self-acquired assets, bank deposits, and shares to any chosen heir without needed family reservations.
                    </span>
                  </div>
                </div>
              </div>

              {/* COMPARISON TABLE */}
              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold tracking-wide">
                    Legal Comparison: French Civil Code vs. Indian Succession Act in Puducherry
                  </span>
                  <span className="text-[11px] font-mono text-rose-300">Puducherry UT Law</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                    <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5 sm:p-4">Legal Parameter</th>
                        <th className="p-3.5 sm:p-4">French Renonçants (Code Civil)</th>
                        <th className="p-3.5 sm:p-4">General Citizens (Indian Succession Act)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Governing Statute</td>
                        <td className="p-3.5 sm:p-4">French Civil Code (1804) via 1881 Decree</td>
                        <td className="p-3.5 sm:p-4">Indian Succession Act, 1925 / Personal Laws</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Will Freedom</td>
                        <td className="p-3.5 sm:p-4 text-amber-800 font-medium">Restricted by Réserve Héréditaire quotas</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-medium">100% full freedom over self-acquired assets</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Disinheriting Children</td>
                        <td className="p-3.5 sm:p-4">Legally void; children can claim reserve share</td>
                        <td className="p-3.5 sm:p-4">Permissible for self-acquired assets</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Witness Rule</td>
                        <td className="p-3.5 sm:p-4">Two adult witnesses or notarial act</td>
                        <td className="p-3.5 sm:p-4">Two neutral non-heir witnesses</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Filing at SRO</td>
                        <td className="p-3.5 sm:p-4">A Choice, but Book III highly recommended</td>
                        <td className="p-3.5 sm:p-4">A Choice under Section 18(e), Book III filed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION RULES */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>SECTION 18(E) REGISTRATION ACT ANALYSIS</span>
                </div>
                {/* H2 <= 70 chars (48 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Puducherry?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Filing Act, 1908, registering a Will is a choice in Puducherry. A Will on plain paper is valid if signed before two neutral witnesses.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Plain Will Risks</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span>Subject to forgery and suspicious circumstance fights in local courts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span>Physical copies can be destroyed, misplaced, or concealed by dissatisfied relatives.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span>Puducherry and Oulgaret Municipalities often mandate lengthy family inquiries.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Filed Will Legal Shield</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>Preserved permanently in official Book III government registers at the SRO.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>Biometric thumbprints and digital photographs confirm the Will maker's direct presence.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>Enables seamless Patta and city tax name change on the Nilamagal portal.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="puducherry-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>MADRAS HIGH COURT JURISDICTION</span>
                </div>
                {/* H2 <= 70 chars (49 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Puducherry Probate Law: Madras High Court Rules
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Many asset owners worry about court probate. Under Section 213 of the Indian Succession Act, 1925, probate is required only in three old presidency towns. These are Chennai, Mumbai, and Kolkata. Other regions are exempt.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-50 text-[#C65378]">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Why Probate Is Strictly A Choice in Puducherry
                    </h3>
                    <p className="text-xs text-slate-500">
                      Territorial boundaries of Ordinary Original Civil Area (OOCJ)
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The Madras High Court handles judicial appeals for Puducherry. But Puducherry lies outside the Chennai presidency limits. Therefore, Will makers in Puducherry, Karaikal, Mahe, and Yanam do not need court probate to pass on asset.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">General Transfer Route:</span>
                    <span className="text-slate-600">
                      Heirs submit the death paper, filed Will copy, and legal heir statement to city and revenue offices directly.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">When Probate Helps:</span>
                    <span className="text-slate-600">
                      Advised if family members launch contentious civil fights or if substantial overseas banking assets are involved.
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/services/probate-lawyer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] hover:underline"
                  >
                    <span>Read Madras High Court Probate Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:underline"
                  >
                    <span>Use Free Probate Checker Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="puducherry-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Compass className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT REGISTRATION OFFICES</span>
                </div>
                {/* H2 <= 70 chars (49 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Puducherry SRO Offices: SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Puducherry has 9 SRO Offices across its four enclaves. Use our locator to find your local filing office:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search by area, enclave (e.g. White Town, Oulgaret, Karaikal, Mahe, Yanam)..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#C65378] transition-colors"
                />
              </div>

              {/* SRO TABS & ACTIVE CARD */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {filteredHubs.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        selectedHub === hub.id
                          ? "bg-rose-50/80 border-[#C65378] shadow-xs"
                          : "bg-white border-slate-200/80 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-slate-900">{hub.name}</div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">{hub.areas}</div>
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                          JURISDICTIONAL SRO
                        </span>
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                          {activeHubData.sro}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-slate-600 shrink-0">
                        PY Filing
                      </span>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Physical Address:</span>
                        <span>{activeHubData.address}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Localities Covered:</span>
                        <span>{activeHubData.areas}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Working Hours:</span>
                        <span>{activeHubData.timings}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Government Book III Archive</span>
                      <a
                        href="/start"
                        onClick={handleStartDraft}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d]"
                      >
                        <span>Schedule Filing</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES (FORMER LOCAL AREAS) */}
            <section id="puducherry-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES &amp; ENCLAVE COVERAGE</span>
                </div>
                {/* H2 <= 70 chars (48 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Coverage Across Puducherry UT
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Asset in Puducherry includes colonial villas in White Town, apartments in Oulgaret, factories in Sedarapet, and farmlands in Villianur. It also includes coastal plots in Karaikal, Mahe, and Yanam. Our lawyers cover every region:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* REGION 1: WHITE TOWN & BOULEVARD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage French Quarter
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Puducherry (Saram)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in White Town &amp; Heritage Boulevard
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">White Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Goubert Avenue</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rue Dumas</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Heritage Town</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting in White Town</strong> for high-value colonial villas, French heritage mansions, and shop boutiques. Accommodates French Civil Code reserve quotas for Renonçants families, multi-owner shared party walls, and heritage covenants.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Saram, Villianur Main Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Filing at SRO Puducherry, lawyer support, and Section 31 home visits for senior residents.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">French Heritage Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in White Town"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft White Town Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGION 2: OULGARET & LAWSPET */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Major Urban Town Office
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Oulgaret
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Oulgaret Town Office &amp; Lawspet
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lawspet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Reddiarpalayam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gorimedu</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Muthialpet</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Complete <strong>Will drafting in Oulgaret</strong> and Lawspet for modern multi-storey apartments, neutral row houses, and plotted layouts. Formulates clear bequest shares, smooth Oulgaret city asset tax name change, and bank deposit nominations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Jawahar Nagar, Boomianpet</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Book III filing, lawyer check, and swift city name change compliance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Apartments &amp; Urban Houses</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in Oulgaret"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Oulgaret Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGION 3: VILLIANUR COMMUNE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Suburban &amp; Plant
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Villianur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Villianur Commune &amp; Sedarapet
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Villianur Core</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sedarapet MIDC</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thiruvandarkoil</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Arumparthapuram</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting in Villianur</strong> for traditional family residences, shop shops, and plant plots in the Sedarapet PIPDIC zone. Resolves family joint family questions and structures business estate seamlessly.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sub-Taluk Office Road, Villianur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        PIPDIC lease transfer clauses, farm survey record check, and SRO filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Plant</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in Villianur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Villianur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGION 4: ARIYANKUPPAM & NONANKUPPAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Coastal Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ariyankuppam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Ariyankuppam &amp; Nonankuppam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ariyankuppam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Veerampattinam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nonankuppam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chunnambar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting in Ariyankuppam</strong> and Nonankuppam for coastal residences, tourism assets, and coconut plantations near Chunnambar. Establishes legal certainty for family heirs, preventing title clouds and split fights.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Cuddalore Main Road, Ariyankuppam</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Coastal land check, patta records checks, and Book III official filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Coastal Belts &amp; Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in Ariyankuppam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ariyankuppam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGION 5: BAHOUR COMMUNE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Agrarian Southern Enclave
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bahour
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Bahour Commune &amp; Farmland Belts
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bahour Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karikalampakkam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nettapakkam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Madagadipet</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting in Bahour</strong> for farm wetlands, lake basin paddy farms, and village family holdings. Enables direct name change in Directorate of Survey records and Nilamagal patta updates after the Will maker's demise.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Main Road, Near Bus Stand, Bahour</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Revenue patta chitta mapping, family split check, and SRO Bahour booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Paddy Land &amp; Agriculture</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in Bahour"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bahour Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGION 6: KARAIKAL DISTRICT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Eastern Port Enclave
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Karaikal &amp; Thirunallar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Karaikal District &amp; Thirunallar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karaikal Port</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thirunallar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">TR Pattinam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nedungadu</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting in Karaikal</strong> for port logistics warehouses, shop temple assets in Thirunallar, and fertile Cauvery delta farmlands. Protects family inheritances from regional boundary fights with Tamil Nadu.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Complex, Beach Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete SRO Karaikal and Thirunallar filing support and certified copy delivery.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Port Logistics &amp; Town Flats</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in Karaikal"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Karaikal Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGION 7: MAHE DISTRICT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Arabian Sea Enclave
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mahe
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Mahe District (Malabar Coast)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mayyazhi Riverfront</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pandakkal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chalakkara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cherukallayi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting in Mahe</strong> for scenic riverfront estates, spice plantations, and family residences in this Kerala-enclosed enclave. Aligns local French civil traditions with Indian inheritance laws without cross-state delays.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Station Complex, Mahe</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Filing at Civil Station Mahe, NRI estate planning, and doorstep signing for elderly residents.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Spice Estates &amp; Villas</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in Mahe"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mahe Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGION 8: YANAM DISTRICT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Godavari Delta Enclave
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Yanam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Yanam District (Godavari Delta)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Yanam Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanakalapeta</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Agraharam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dariyalatippa</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Complete <strong>Will drafting in Yanam</strong> for Godavari riverfront shop assets, aquaculture farms, and family home homes enclosed within Andhra Pradesh. Resolves bilingual estate nuances cleanly.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Pillaraya Street, Government Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        SRO Yanam appointment booking, Telugu-French estate alignment, and Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Delta Plots &amp; Shop</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting in Yanam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Yanam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-puducherry-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>SYSTEMATIC PROCEDURE</span>
                </div>
                {/* H2 <= 70 chars (48 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to SRO Filing
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Making a valid Will in Puducherry is straightforward. Follow our simple 5-step guide:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Estate Regime Audit &amp; Asset Inventory
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Establish whether you fall under the French Civil Code (Renonçant status) or the Indian Succession Act. Compile all assets including home homes in White Town or Oulgaret, farmlands, bank accounts, and gold jewelry.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Draft Customized Legal Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Include legal clauses defining specific bequests, residuary clauses, executor appointments, and guardian choices for minor children. For Renonçants, make sure gifts stay strictly within the disposable quota.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Physical Signing Before Two Neutral Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the final draft on white A4 paper. The Will maker and two neutral adult witnesses who are not heirs sign every page together under Section 63 of the Indian Succession Act.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      SRO office Slot Scheduling
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Schedule your appointment at the local SRO office in Puducherry, Oulgaret, Villianur, Bahour, Karaikal, Mahe, or Yanam. Pay the nominal government filing fee online or at the treasury counter.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-extrabold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Biometric Witness Signing &amp; Book III Storage
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the SRO with your two witnesses. Complete verbal confirmation, digital photographs, and biometric thumb impressions. The SRO archives the original Will in Book III government custody and issues your filed copy.
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
                  <span>DOORSTEP CONVENIENCE FOR SENIORS</span>
                </div>
                {/* H2 <= 70 chars (50 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Filing for Seniors
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 31 of the Filing Act, 1908, senior citizens and unwell persons do not need to visit the registry office:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-50 text-[#C65378]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Official SRO Home Commission Protocol
                    </h3>
                    <p className="text-xs text-slate-500">
                      Home and hospital visits across White Town, Lawspet, and retirement communities
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">1. Medical Paper:</span>
                    <span className="text-slate-600">
                      A filed medical doctor (MBBS) certifies the Will maker's physical inability to visit the office and confirms sound mental capacity.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">2. Commission Order:</span>
                    <span className="text-slate-600">
                      Our lawyer files a formal Section 31 form before the District Registrar or SRO to secure a commission visit order.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">3. Bedside Filing:</span>
                    <span className="text-slate-600">
                      The SRO visits your home with portable biometric scanners to execute Book III filing in person.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION READINESS CHECK</span>
                </div>
                {/* H2 <= 70 chars (47 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Paper Checklist for Puducherry SRO Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Keep these documents ready before your SRO visit. Use our checklist to track your progress ({checkedCount} of {checklist.length} completed):
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      item.checked
                        ? "bg-rose-50/50 border-[#C65378]/40"
                        : "bg-slate-50/60 border-slate-200/80 hover:bg-slate-100/60"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        item.checked
                          ? "bg-[#C65378] border-[#C65378] text-white"
                          : "bg-white border-slate-300"
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-0.5 text-xs sm:text-sm">
                      <span className="font-extrabold text-slate-900 block">{item.label}</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="puducherry-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL REAL ESTATE SUCCESSION</span>
                </div>
                {/* H2 <= 70 chars (51 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Puducherry Asset Types: Heritage Villas &amp; Land
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Each type of asset in Puducherry needs clear clauses for smooth name transfer:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    HV
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Heritage Villas in White Town
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    French colonial assets feature shared party walls and historic conservation covenants. Wills must precisely allocate separate physical units and specify maintenance duties.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
                    AP
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Oulgaret &amp; Lawspet Flats
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Modern apartments require undivided share of land (UDS) specifications, parking space allocations, and direct nomination clauses for city tax rolls.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    AG
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Farmlands in Villianur &amp; Bahour
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Paddy fields and farm tracts require explicit survey numbers, sub-division boundaries, and patta references for automatic name change on the Nilamagal portal.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="puducherry-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT GOVERNMENT EXPENSES</span>
                </div>
                {/* H2 <= 70 chars (43 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Puducherry SRO Filing Fees
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Puducherry is very affordable. Unlike sale or gift deeds, a Will has no percentage-based stamp duty:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                    <thead className="bg-slate-900 text-white font-bold">
                      <tr>
                        <th className="p-3.5 sm:p-4">Fee Head</th>
                        <th className="p-3.5 sm:p-4">Official Government Rate</th>
                        <th className="p-3.5 sm:p-4">Legal Explanation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Stamp Duty on Will</td>
                        <td className="p-3.5 sm:p-4 text-emerald-600 font-bold">₹0 (100% Exempt)</td>
                        <td className="p-3.5 sm:p-4">Wills attract zero stamp duty across Puducherry UT.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">SRO Filing Fee</td>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">₹100 - ₹200</td>
                        <td className="p-3.5 sm:p-4">Fixed nominal filing charge paid at the SRO.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Scanning &amp; Data Fee</td>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">₹100 - ₹250</td>
                        <td className="p-3.5 sm:p-4">Official scanning charge for Book III records.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Section 31 Home Visit Commission</td>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Nominal Govt Fee</td>
                        <td className="p-3.5 sm:p-4">Prescribed official fee for SRO home attendance.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL ASSISTANCE</span>
                </div>
                {/* H2 <= 70 chars (47 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in PY
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the plan that suits your estate rules. All packages include lawyer check and full compliance with Puducherry legal rules:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                      BASIC ONLINE DRAFT
                    </span>
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-slate-900">₹1,990</div>
                      <p className="text-xs text-slate-500">One-time fee · No hidden charges</p>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Online lawyer-drafted customized Will</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 63 ISA witness signing format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Executor &amp; heir allocation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Digital delivery in editable &amp; PDF format</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs text-center block hover:bg-slate-800 transition-colors"
                    >
                      Start Online Draft
                    </a>
                  </div>
                </div>

                {/* PLAN 2 - FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    MOST POPULAR IN PY
                  </div>
                  <div className="space-y-4 pt-1">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#C65378]">
                      ADVOCATE CONSULTATION
                    </span>
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-slate-900">₹4,990</div>
                      <p className="text-xs text-slate-500">One-time fee · Complete legal advice</p>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Senior lawyer review &amp; video advice</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>French Civil Code vs. ISA regime analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Réserve héréditaire compliance check</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Puducherry &amp; Oulgaret city clauses</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full py-3 rounded-2xl bg-[#C65378] text-white font-bold text-xs text-center block hover:bg-[#a13c5d] transition-colors shadow-md shadow-[#C65378]/25"
                    >
                      Book Lawyer Review
                    </a>
                  </div>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                      COMPLETE SRO REGISTRATION
                    </span>
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-slate-900">₹9,990</div>
                      <p className="text-xs text-slate-500">Full lawyer attendance &amp; home visits</p>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Customized drafting &amp; legal check</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Puducherry SRO appointment slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Physical lawyer support at the SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep home visit help</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs text-center block hover:bg-slate-800 transition-colors"
                    >
                      Book SRO Filing
                    </a>
                  </div>
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
                {/* H2 <= 70 chars (50 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Wills in Puducherry
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Find clear answers to key questions on Will drafting, French estate rules, and SRO filing in Puducherry:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60"
                        aria-expanded={isOpen}
                      >
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="legal-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <BookOpen className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL SOURCES &amp; OFFICIAL PORTALS</span>
                </div>
                {/* H2 <= 70 chars (50 chars) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Citations &amp; Puducherry Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Wills and asset transfers in Puducherry are governed by these key laws and official portals:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-slate-900 block">
                    Indian Succession Act, 1925 (Sections 59, 63 &amp; 213)
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Defines sound mind criteria, valid witness signing by two witnesses, and restricts needed probate to Chennai presidency town limits.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-slate-900 block">
                    French Civil Code (Articles 913-930: Code Civil)
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Governs estate for French Renonçants in Puducherry, codifying reserve hereditary shares and protected rights of descendants.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-slate-900 block">
                    Filing Act, 1908 (Sections 18(e), 31 &amp; 51)
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Governs a choice filing, Section 31 doorstep home visits for seniors, and permanent government custody in Book III.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 shadow-xs">
                  <span className="font-extrabold text-slate-900 block">
                    Nilamagal Land Records &amp; City Portals
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Directorate of Survey and Land Records, Puducherry Filing Office, and Puducherry City City Board guidelines.
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
          HIGH RESOLUTION MODAL PREVIEW FOR BLUEPRINT
          ========================================================================= */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#172228] rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Puducherry Estate &amp; SRO Filing Blueprint
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] max-h-[75vh] bg-[#172228] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/will-drafting-in-puducherry.jpg"
                alt="High Resolution Visual Blueprint: Puducherry Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>SRO Filed &amp; City Name Change Ready</span>
              <a
                href="/start"
                onClick={(e) => {
                  setShowHighResModal(false);
                  handleStartDraft(e);
                }}
                className="font-bold text-[#C65378] hover:text-white transition-colors"
              >
                Draft Your Will Now &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STICKY MOBILE CONVERSION BAR
          ========================================================================= */}
      <div className="block sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#172228] border-t border-white/10 p-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="text-left">
            <span className="block text-[11px] font-bold text-slate-300">Will Drafting in Puducherry</span>
            <span className="block text-xs font-extrabold text-[#C65378]">Starting at ₹1,990</span>
          </div>
          <a
            href="/start"
            onClick={handleStartDraft}
            className="px-5 py-2.5 rounded-full bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#a13c5d] transition-all shadow-md shrink-0 cursor-pointer"
          >
            Draft Will Now
          </a>
        </div>
      </div>
    </div>
  );
}
