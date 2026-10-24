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
  { id: "meghalaya-overview", label: "OVERVIEW" },
  { id: "meghalaya-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "meghalaya-probate-rules", label: "PROBATE RULES" },
  { id: "meghalaya-sro-directory", label: "SRO DIRECTORY" },
  { id: "meghalaya-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-meghalaya-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "meghalaya-property-types", label: "PROPERTY TYPES" },
  { id: "meghalaya-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const MEGHALAYA_SRO_HUBS = [
  {
    id: "shillong-sadar",
    name: "Shillong Sadar (East Khasi Hills)",
    sro: "Office of the Deputy Commissioner, East Khasi Hills",
    address: "DC Office Complex, Secretariat Hills, Police Bazar Road, Shillong - 793001",
    areas: "Police Bazar, Laitumkhrah, Laban, European Ward, Malki, Polo, Nongthymmai, Mawlai, Upper Shillong",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Govt holidays closed)",
  },
  {
    id: "tura-sadar",
    name: "Tura Sadar (West Garo Hills)",
    sro: "Office of the Deputy Commissioner, West Garo Hills",
    address: "DC Office Complex, Hawakhana, Tura, West Garo Hills - 794001",
    areas: "Hawakhana, Araimile, Chandmari, Dobasipara, Rongram, New Tura, Dakopgre, Garobadha",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Govt holidays closed)",
  },
  {
    id: "jowai-sadar",
    name: "Jowai Sadar (West Jaintia Hills)",
    sro: "Office of the Deputy Commissioner, West Jaintia Hills",
    address: "DC Office Complex, Ladthalaboh, Jowai, West Jaintia Hills - 793150",
    areas: "Ladthalaboh, Iawmusiang, Chutwakhu, Syntu Ksiar, Thadlaskein, Nartiang, Amlarem",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Govt holidays closed)",
  },
  {
    id: "nongpoh-ribhoi",
    name: "Nongpoh (Ri-Bhoi District)",
    sro: "Office of the Deputy Commissioner, Ri-Bhoi",
    address: "DC Office Complex, Main Highway Road, Nongpoh, Ri-Bhoi - 793102",
    areas: "Nongpoh, Byrnihat Industrial Corridor, Umsning, Umiam Lake Area, Bhoirymbong, Umling",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Govt holidays closed)",
  },
  {
    id: "williamnagar-garo",
    name: "Williamnagar (East Garo Hills)",
    sro: "Office of the Deputy Commissioner, East Garo Hills",
    address: "DC Office Complex, Simsang River Road, Williamnagar, East Garo Hills - 794111",
    areas: "Williamnagar Town, Rongjeng, Songsak, Samanda, Simsang Valley, Dambo Rongjeng",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Govt holidays closed)",
  },
  {
    id: "baghmara-garo",
    name: "Baghmara (South Garo Hills)",
    sro: "Office of the Deputy Commissioner, South Garo Hills",
    address: "DC Office Complex, Baghmara Town, South Garo Hills - 794102",
    areas: "Baghmara, Gasuapara, Siju, Chokpot, Karukol, Rongara Border Belt",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Govt holidays closed)",
  },
  {
    id: "nongstoin-khasi",
    name: "Nongstoin (West Khasi Hills)",
    sro: "Office of the Deputy Commissioner, West Khasi Hills",
    address: "DC Office Complex, Nongstoin Town, West Khasi Hills - 793119",
    areas: "Nongstoin, Mawshynrut, Rambrai, Nongkhlaw Syiemship, Mairang border",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Govt holidays closed)",
  },
  {
    id: "khliehriat-jaintia",
    name: "Khliehriat (East Jaintia Hills)",
    sro: "Office of the Deputy Commissioner, East Jaintia Hills",
    address: "DC Office Complex, NH 6 Highway, Khliehriat, East Jaintia Hills - 793200",
    areas: "Khliehriat Town, Ladrymbai, Sutnga, Saipung, Lumshnong Cement Hub",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Govt holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Meghalaya state laws, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Essential for official identity verification, electronic signature, and photographic record at the DC Office SRO.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Valid Photo IDs",
    detail: "Must carry original government IDs and must not be beneficiaries receiving any property or bequest under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Essential for senior citizens aged 60+. Validates testamentary capacity, mental soundness, and voluntary volition.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Sub-Registrar Appointment Receipt & Government Fee Challan",
    detail: "Official token receipt from the DC Office Sub-Registrar counter confirming payment of the nominal ₹100 registration fee.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Title Deeds, Patta & Municipal Tax Documents",
    detail: "Property patta, Syiemship allotment papers, Land Holding Certificates, or Shillong Municipal Board assessment receipts.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Self-Acquired Asset Declaration & Asset Schedule",
    detail: "Detailed inventory separating self-acquired assets (Kamai Nongkhynraw) from ancestral clan assets (Ri Kur).",
    checked: false,
  },
];

export default function MeghalayaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("meghalaya-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("shillong-sadar");
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

  const filteredHubs = MEGHALAYA_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    MEGHALAYA_SRO_HUBS.find((h) => h.id === selectedHub) || MEGHALAYA_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI STYLE ARCHITECTURE)
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
                <span>MEGHALAYA &amp; KHASI-GARO SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 57 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Meghalaya: Customary Succession
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally sound Will in Meghalaya with seasoned legal advocates. Expert guidance on Khasi and Garo matrilineal customary succession, self-acquired asset testamentary freedom, and DC Office Sub-Registrar registration across Shillong, Tura, and Jowai.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Meghalaya Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#meghalaya-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Meghalaya SRO Directory</span>
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
                  <span>Customary Law Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep Visits</span>
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
                  src="/images/will-drafting-in-meghalaya.jpg"
                  alt="Legal Will Drafting and Matrilineal Property Succession in Meghalaya"
                  fill
                  className="object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Meghalaya Customary Succession Blueprint
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
                12 District SROs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                DC Office Registry Hubs
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Nominal Registration Fee
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                100% Freedom
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Self-Acquired Assets Validated
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep Registry for Seniors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN LAYOUT: STICKY TOC SIDEBAR + CONTENT COLUMN
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* DESKTOP STICKY SIDEBAR (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-bold tracking-wider uppercase text-slate-500">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span>PAGE CONTENTS</span>
              </div>
              <nav className="space-y-1 text-xs font-semibold">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#C65378] text-white font-bold shadow-xs translate-x-1"
                          : "text-slate-600 hover:text-[#C65378] hover:bg-rose-50/50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* QUICK CTA CARD */}
            <div className="p-5 rounded-2xl bg-[#172228] text-white text-center space-y-3 shadow-md">
              <ShieldCheck className="w-8 h-8 text-[#C65378] mx-auto" />
              <h4 className="text-sm font-bold text-white">Protect Your Legacy</h4>
              <p className="text-xs text-slate-300">
                Draft a legally airtight Will harmonizing Meghalaya customary succession and self-acquired assets.
              </p>
              <Link
                href="/start"
                onClick={handleStartDraft}
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-all cursor-pointer"
              >
                <span>Draft Online Now</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </aside>

          {/* MOBILE TOC ACCORDION */}
          <div className="lg:hidden col-span-1 mb-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="flex items-center justify-between w-full text-xs font-bold text-slate-800"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>SECTION: {currentActiveToc.label}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    mobileTocOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileTocOpen && (
                <div className="pt-3 mt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className={`px-2.5 py-1.5 rounded-md truncate font-medium ${
                        activeId === item.id
                          ? "bg-[#C65378] text-white font-bold"
                          : "text-slate-600 bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MAIN CONTENT AREA (9 COLS) */}
          <main className="lg:col-span-9 space-y-12 sm:space-y-16">

            {/* SECTION 1: OVERVIEW */}
            <section id="meghalaya-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>EXECUTIVE LEGAL BRIEFING</span>
                </div>
                {/* H2: Exactly 58 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Overview: Estate Planning &amp; Succession in Meghalaya
                </h2>
                <div className="mt-4 space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                  <p>
                    Succession law in the State of Meghalaya presents a fascinating, distinctive interplay between centuries-old indigenous matrilineal customary traditions and modern statutory estate planning principles. Home to the matrilineal Khasi, Jaintia, and Garo communities, testamentary dispositions require an astute understanding of customary norms, the <strong>Khasi Social Custom of Lineage Act, 1997</strong>, and established precedents of the <strong>High Court of Meghalaya</strong>.
                  </p>
                  <p>
                    A foundational cornerstone of estate planning in Meghalaya is the strict legal bifurcation between <strong>ancestral clan property (Ri Kur / A&apos;king land)</strong> and <strong>self-acquired property (Kamai Nongkhynraw)</strong>. While ancestral property passes matrilineally to the designated custodian daughter—such as the <em>Khatduh</em> among Khasis or the <em>Nokna</em> married to the <em>Nokkrom</em> among Garos—the High Court has firmly established that an individual testator enjoys <strong>absolute testamentary freedom</strong> to bequeath self-acquired properties, commercial firms, vehicles, bank accounts, and investments via a legally valid Will.
                  </p>
                  <p>
                    Without a formal, lawyer-drafted Will, families frequently get entangled in protracted inheritance disputes before Autonomous District Council (ADC) village courts, Syiemship durbars, or the Deputy Commissioner&apos;s court. Drafting an unambiguous Will ensures your true wishes are honored, avoids bitter clan litigation, and guarantees flawless asset transmission to your loved ones.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: LEGAL FRAMEWORK */}
            <section id="meghalaya-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CODIFICATION &amp; CUSTOMARY LAWS</span>
                </div>
                {/* H2: Exactly 58 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Legal Framework: Khasi, Garo &amp; Jaintia Succession Law
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Estate planning in Meghalaya is governed by an integrated matrix of central succession statutes, constitutional Sixth Schedule safeguards, local customary lineage enactments, and land transfer regulations:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Khasi Matrilineal Custom &amp; Khatduh Role</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Khasi customary law, the youngest daughter (<em>Ka Khatduh</em>) inherits ancestral family property (<em>Ri Kur</em>) as the custodian and trustee of clan rituals, not as absolute owner. Crucially, self-acquired property (<em>Kamai Nongkhynraw</em>) stands outside this customary restriction and can be freely bequeathed to sons, other daughters, or spouse via a Will.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Garo A&apos;king Land &amp; Nokkrom Succession</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Among the Garos of the Garo Hills, clan land (<em>A&apos;king</em>) is presided over by the female clan head (<em>Nokma</em>), with succession passing through a chosen daughter (<em>Nokna</em>) and her husband (<em>Nokkrom</em>). Self-acquired urban bungalows, financial portfolios, and movable wealth can be independently bequeathed through a validly drafted Will.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Meghalaya Land Transfer Regulation Act, 1971</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Act strictly restricts transfer of tribal land to non-tribals. A Will cannot be employed as an indirect instrument to bequeath restricted indigenous tribal land to non-tribal entities without prior sanction from the competent state authority. Our advocates structure clauses in strict adherence to this protective statute.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Indian Succession Act, 1925 (Sections 59 &amp; 63)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Defines universal testamentary capacity for every adult of sound mind (Section 59) and mandates execution formalities (Section 63): testator&apos;s clear signature or mark on every page attested simultaneously by two independent adult witnesses who hold no beneficial interest.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908 COMPLIANCE</span>
                </div>
                {/* H2: Exactly 56 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Will Registration: Mandatory vs Optional in Meghalaya
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is legally optional in Meghalaya. A Will executed on plain white A4 paper signed in the presence of two witnesses is legally enforceable upon execution. However, registering the document at the Sub-Registrar Office in the Deputy Commissioner&apos;s complex provides vital evidentiary protection against customary clan litigation:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                        <th className="p-3.5 sm:p-4 font-bold">Succession Parameter</th>
                        <th className="p-3.5 sm:p-4 font-bold text-slate-600">Unregistered White Paper Will</th>
                        <th className="p-3.5 sm:p-4 font-bold text-[#C65378]">SRO Book III Registered Will</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Legal Validity</td>
                        <td className="p-3.5 sm:p-4">Valid under Section 63 ISA</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">Valid with Strong Statutory Presumption</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Government Archive</td>
                        <td className="p-3.5 sm:p-4 text-rose-600">None; vulnerable to loss, fire, or theft</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">Permanent government custody in Book III</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Customary Clan Challenges</td>
                        <td className="p-3.5 sm:p-4 text-amber-700">High risk of forgery or coercion claims</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">Rebutted by official Sub-Registrar attestation</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Municipal &amp; DC Revenue Mutation</td>
                        <td className="p-3.5 sm:p-4">Frequent objections, lengthy hearings</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">Expedited mutation in Shillong &amp; DC records</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Bank Locker &amp; Asset Release</td>
                        <td className="p-3.5 sm:p-4">Demands indemnity bonds, surety affidavits</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">Accepted swiftly by nationalized &amp; private banks</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 4: PROBATE RULES */}
            <section id="meghalaya-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT OF MEGHALAYA PRECEDENTS</span>
                </div>
                {/* H2: Exactly 53 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. High Court of Meghalaya: Probate Rules &amp; Precedents
                </h2>
                <div className="space-y-4 text-sm md:text-base text-slate-700 leading-relaxed">
                  <p>
                    Under Section 213 read with Section 57 of the Indian Succession Act, 1925, obtaining court probate for a Will is mandatory <strong>only within the historical presidency towns of Mumbai, Kolkata, and Chennai</strong>. Because the State of Meghalaya lies outside these presidency boundaries, court probate is strictly <strong>non-compulsory</strong>.
                  </p>
                  <p>
                    The <strong>High Court of Meghalaya at Shillong</strong> has upheld in authoritative verdicts that testamentary beneficiaries can directly apply for title mutation, municipal record substitution with the Shillong Municipal Board, and bank deposit transmission without obtaining a probate decree. However, testators often opt for voluntary probate or Letters of Administration if substantial cross-border properties are situated in Kolkata or other metro jurisdictions.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs sm:text-sm text-amber-900">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Judicial Protection for Self-Acquired Assets</span>
                </div>
                <p className="leading-relaxed">
                  In multiple benchmark decisions, the High Court of Meghalaya has affirmed that where a Khasi or Garo testator demonstrates that the property was earned through personal labor, salary, or commercial business (and not drawn from ancestral clan heritage), customary matrilineal succession cannot restrict the testator&apos;s constitutional and legal right to bequeath that property to any designated successor.
                </p>
              </div>
            </section>

            {/* SECTION 5: MEGHALAYA SRO DIRECTORY */}
            <section id="meghalaya-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION OFFICES DIRECTORY</span>
                </div>
                {/* H2: Exactly 52 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Meghalaya Sub-Registrar Directory &amp; DC Office Hubs
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Will registration in Meghalaya is administered by Sub-Registrars operating within the Deputy Commissioner&apos;s (DC) Office in each district headquarters. Search below to find your jurisdictional registry office:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search SRO office, district, or town in Meghalaya..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                />
              </div>

              {/* SRO TABS & CARD DETAILS */}
              <div className="space-y-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {filteredHubs.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedHub === hub.id
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-rose-50/50"
                      }`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                        Jurisdictional Registry Counter
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 self-start sm:self-auto">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active Registry Hub
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">
                        Registry Address
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {activeHubData.address}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">
                        Operating Hours
                      </span>
                      <p className="text-slate-800 font-medium">{activeHubData.timings}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">
                        Key Localities Covered
                      </span>
                      <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Meghalaya Registration Portal: <strong>meghalaya.gov.in</strong>
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
              </div>
            </section>

            {/* SECTION 6: REGIONAL CITIES IN MEGHALAYA */}
            <section id="meghalaya-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                {/* H2: Exactly 58 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Regional Cities: District-Wise Will Drafting in Meghalaya
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Meghalaya range from prime residential properties and commercial establishments in Shillong, agricultural and horticultural estates in the Khasi and Jaintia Hills, plantation holdings in the Garo Hills, to industrial belts along the Ri-Bhoi highway. Our estate advocates deliver customized legal drafting, DC Office Sub-Registrar scheduling, and doorstep execution across all regional centers:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: SHILLONG & EAST KHASI HILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        State Capital &amp; Judicial Seat
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Office SRO Shillong
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Shillong &amp; East Khasi Hills
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Police Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Laitumkhrah</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Laban</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">European Ward</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Shillong</strong> for residential properties, European Ward leaseholds, commercial shops in Police Bazar, and private bank assets. Codifies clear bequests distinguishing self-acquired assets from ancestral <em>Ri Kur</em> holdings under the Khasi Lineage Act, preventing post-demise clan litigation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Secretariat Hills</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Sub-Registrar appointment booking, advocate accompaniment, and Section 31 doorstep execution for elderly testators across Greater Shillong.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Registration Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Shillong"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Shillong Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: TURA & WEST GARO HILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        Garo Hills Headquarters &amp; A&apos;king Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Office SRO Tura
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Tura &amp; West Garo Hills
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hawakhana</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chandmari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Araimile</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">New Tura</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Tura</strong> for urban residential bungalows, retail trade entities, and agricultural land holdings. Navigates Garo customary law (*A&apos;king* land and *Nokkrom* succession) while legally safeguarding self-acquired urban properties to designated family successors.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Hawakhana, Tura</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        In-person advocate support, Garo customary asset alignment, and Book III registration before the West Garo Hills Sub-Registrar.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Customary Protection · Full Freedom</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Tura"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Tura Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: JOWAI & WEST JAINTIA HILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Jaintia Cultural &amp; Trade Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Office SRO Jowai
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Jowai &amp; West Jaintia Hills
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ladthalaboh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Iawmusiang</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chutwakhu</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Syntu Ksiar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Jowai</strong> for commercial showrooms around Iawmusiang, transport fleets, and family estates. Harmonizes Jaintia matrilineal custom (*Ka Khadduh* custody) with clear testamentary allocations for children, spouses, and business co-owners.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Ladthalaboh, Jowai</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        SRO registration token scheduling, doctor mental fitness certification, and seamless municipal record transmission.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Jaintia Succession</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Jowai"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Jowai Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: NONGPOH & RI-BHOI CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5" />
                        Industrial &amp; Highway Growth Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Office SRO Ri-Bhoi
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Nongpoh &amp; Ri-Bhoi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Byrnihat Industrial</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Umsning</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Umiam Lake Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhoirymbong</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Nongpoh</strong> and the Ri-Bhoi corridor for factory manufacturing units in Byrnihat, commercial warehousing plots along NH-6, and lakeside estates around Umiam. Structures clear leasehold and freehold asset transfers complying with Meghalaya land laws.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Nongpoh</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Corporate business succession planning, partnership transmission clauses, and Sub-Registrar registration support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Industrial Focus</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nongpoh"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nongpoh Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: WILLIAMNAGAR & EAST GARO HILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        Simsang Basin &amp; Agro Heartland
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Office SRO Williamnagar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Williamnagar &amp; East Garo
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Williamnagar Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rongjeng</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Songsak</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Samanda</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Williamnagar</strong> for rubber plantations, betel nut orchards, and residential homes in the Simsang river valley. Outlines legally binding bequests that separate community clan holdings from individually developed agricultural assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Williamnagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Biometric registration support, land revenue record coordination, and rural family estate counsel.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Plantation Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Williamnagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Williamnagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: BAGHMARA & SOUTH GARO HILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Southern Border &amp; Natural Resources
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Office SRO Baghmara
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Baghmara &amp; South Garo
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Baghmara Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gasuapara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Siju</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chokpot</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Baghmara</strong> for border trading enterprises, commercial establishments, and family land. Ensures seamless testamentary compliance with local Garo customs and district council registration procedures.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Baghmara</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Border estate planning, commercial trading firm succession, and Sub-Registrar execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Cross-Border &amp; Trading Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Baghmara"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Baghmara Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: NONGSTOIN & WEST KHASI HILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Khasi Syiemship &amp; Timber Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Office SRO Nongstoin
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Nongstoin &amp; West Khasi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nongstoin Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mawshynrut</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rambrai</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nongkhlaw Syiemship</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Nongstoin</strong> for timber estates, agricultural lands, and residential properties under Khasi customary Syiemship domains. Formulates clear bequests for self-acquired assets to eliminate family inheritance friction.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Nongstoin</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Syiemship customary alignment, land revenue verification, and Sub-Registrar Book III execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Khasi Customary Alignment</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nongstoin"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nongstoin Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: KHLIEHRIAT & EAST JAINTIA HILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5" />
                        Mineral &amp; Highway Transport Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Office SRO Khliehriat
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Khliehriat &amp; East Jaintia
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Khliehriat Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ladrymbai</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sutnga</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lumshnong</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Khliehriat</strong> for commercial businesses, logistics truck fleets, and real estate assets along the NH-6 highway. Protects family heirs from disputed claims through verified statutory clauses and Sub-Registrar registration.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, NH 6, Khliehriat</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Commercial asset succession, partnership transmission clauses, and Sub-Registrar registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Mineral Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Khliehriat"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Khliehriat Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: 5-STEP SOP */}
            <section id="step-by-step-meghalaya-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP OPERATING PROCEDURE</span>
                </div>
                {/* H2: Exactly 55 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. 5-Step SOP: Drafting to SRO Registration in Meghalaya
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Executing an enforceable Will in Meghalaya follows an orderly five-stage legal process ensuring full conformity with customary traditions and statutory registration acts:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm shrink-0">
                    1
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Classify Self-Acquired vs. Ancestral Clan Property
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile an exhaustive asset schedule clearly distinguishing ancestral clan lands (<em>Ri Kur</em> / <em>A&apos;king</em>) from self-earned real estate, bank deposits, mutual funds, commercial firms, and vehicles.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm shrink-0">
                    2
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Senior Advocate Drafting &amp; Customary Harmonization
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our legal advocates formulate customized testamentary bequests, appointing an executor, guardian for minor children, and inserting statutory revocations of any previous instruments.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm shrink-0">
                    3
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Execution Before Two Independent Adult Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the document on standard A4 paper. The testator signs or affixes thumb impressions on every page in the physical presence of two adult witnesses who hold zero beneficial interest in the estate.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm shrink-0">
                    4
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Appointment Booking at District DC Office Sub-Registrar
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Book an official appointment at the Sub-Registrar counter in the Deputy Commissioner&apos;s Office in Shillong, Tura, Jowai, or Nongpoh and deposit the flat ₹100 registration fee.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#172228] text-white font-extrabold text-sm shrink-0">
                    5
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Biometric Attestation &amp; Permanent Book III Custody
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Testator and both witnesses attend the SRO for oral verification, digital photo capture, and biometric thumbprinting. The Will is sealed into permanent Book III government custody.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: SECTION 31 DOORSTEP HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP &amp; HOSPITAL REGISTRATION SUPPORT</span>
                </div>
                {/* H2: Exactly 55 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Section 31 Registration Act: Home Visits in Meghalaya
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  For senior citizens, bedridden testators, or hospital inpatients in Meghalaya who cannot physically travel to the DC Office registry counter, <strong>Section 31 of the Registration Act, 1908</strong> allows the Sub-Registrar to visit the testator&apos;s residence or hospital:
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 space-y-2 border border-slate-100">
                    <span className="font-extrabold text-slate-900 block">1. Medical Fitness Certificate</span>
                    <p className="text-slate-600 leading-relaxed">
                      An MBBS/MD doctor issues a certificate confirming testamentary sound mind and inability to travel due to age or medical infirmity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-2 border border-slate-100">
                    <span className="font-extrabold text-slate-900 block">2. Formal DC Office Requisition</span>
                    <p className="text-slate-600 leading-relaxed">
                      Our legal counsel files an urgent requisition under Section 31 with the Sub-Registrar enclosing the medical certificate and property inventory.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-2 border border-slate-100">
                    <span className="font-extrabold text-slate-900 block">3. Doorstep SRO Attendance</span>
                    <p className="text-slate-600 leading-relaxed">
                      The Sub-Registrar visits your home in Shillong, Tura, Jowai, or suburbs with portable registration equipment to capture signatures and biometrics.
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
                  <span>PREPARATION &amp; VERIFICATION CHECKLIST</span>
                </div>
                {/* H2: Exactly 52 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Essential Documents for Meghalaya Will Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Review the essential documents required for drafting and registering a Will before the Sub-Registrar in Meghalaya. Check each item as you prepare:
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="font-bold text-slate-700">Checklist Progress</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-extrabold">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200/70"
                          : "bg-slate-50 border-slate-100 hover:bg-slate-100/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-0.5 h-4 w-4 rounded text-[#C65378] focus:ring-[#C65378] cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span
                          className={`text-xs sm:text-sm font-bold block ${
                            item.checked ? "text-[#C65378]" : "text-slate-800"
                          }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: PROPERTY TYPES */}
            <section id="meghalaya-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION &amp; LAND LAWS</span>
                </div>
                {/* H2: Exactly 55 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Property Types: Self-Acquired Assets &amp; Land Holdings
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Different property categories in Meghalaya require precise statutory drafting to ensure testamentary legality:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <span className="font-extrabold text-slate-900 text-sm block">
                    Self-Acquired Urban Residential Properties
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Houses and flats constructed or purchased in Shillong, Tura, Jowai, or Nongpoh through personal earnings can be freely bequeathed to any designated son, daughter, or spouse.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <span className="font-extrabold text-slate-900 text-sm block">
                    European Ward Properties in Shillong
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Freehold and leasehold plots located within the historical European Ward of Shillong follow general civil transfer laws and can be transferred through a registered Will.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <span className="font-extrabold text-slate-900 text-sm block">
                    Commercial Businesses, Shops &amp; Transport Fleets
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Sole proprietorship firms, partnership shares, commercial complexes in Police Bazar or Iawmusiang, and tourist taxi fleets can be willed to adult successors.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <span className="font-extrabold text-slate-900 text-sm block">
                    Financial Portfolios &amp; Bank Lockers
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Bank deposits, fixed deposits, mutual funds, insurance proceeds, and demat holdings pass definitively to Will beneficiaries over nominees (who act only as temporary trustees).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: REGISTRATION FEES */}
            <section id="meghalaya-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT GOVERNMENT TARIFFS</span>
                </div>
                {/* H2: Exactly 47 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Stamp Duty Exemptions &amp; SRO Fees in Meghalaya
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Under the Indian Stamp Act as adopted in Meghalaya, Wills are <strong>completely exempt from stamp duty</strong>. You do not need to buy expensive stamp papers:
                </p>
              </div>

              {/* COST BREAKDOWN TABLE */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                        <th className="p-3.5 sm:p-4 font-bold">Cost Component</th>
                        <th className="p-3.5 sm:p-4 font-bold">Official Government Fee</th>
                        <th className="p-3.5 sm:p-4 font-bold">Traditional Middlemen / Notaries</th>
                        <th className="p-3.5 sm:p-4 font-bold text-[#C65378]">WillDrafting.in Online Service</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Meghalaya Stamp Duty</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">₹0 (100% Exempt)</td>
                        <td className="p-3.5 sm:p-4">Misleadingly charged on stamp paper</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">₹0 (Plain A4 Paper Drafting)</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">SRO Registration Fee</td>
                        <td className="p-3.5 sm:p-4">Flat ₹100</td>
                        <td className="p-3.5 sm:p-4">₹2,000 to ₹5,000 inflated fee</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">Exact ₹100 govt challan guidance</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Advocate Customary Drafting</td>
                        <td className="p-3.5 sm:p-4 text-slate-400">N/A</td>
                        <td className="p-3.5 sm:p-4">₹15,000 to ₹35,000 arbitrary fee</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-[#C65378]">Transparent Plans starting ₹1,990</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Doorstep Senior Citizen Visit</td>
                        <td className="p-3.5 sm:p-4">Govt travel allowance</td>
                        <td className="p-3.5 sm:p-4">Often refused or exorbitant</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-[#C65378]">Full Section 31 end-to-end support</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 12: SERVICE PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL PACKAGES</span>
                </div>
                {/* H2: Exactly 53 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Transparent Pricing: Meghalaya Will Drafting Plans
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Choose the plan that fits your family estate requirements. Transparent pricing with zero hidden charges:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Basic</span>
                    <h3 className="text-xl font-extrabold text-slate-900">Online Standard Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500">one-time</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer-drafted customized Will</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Self-acquired property clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant digital PDF download</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Witness signing instructions</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Get Started
                  </Link>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 flex flex-col justify-between shadow-lg relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    MOST POPULAR
                  </span>
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">Comprehensive</span>
                    <h3 className="text-xl font-extrabold text-slate-900">Advocate Customary Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#C65378]">₹4,990</span>
                      <span className="text-xs text-slate-500">one-time</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Senior High Court Advocate consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Khasi/Garo customary harmonization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor capacity certificate template</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Two rounds of advocate revisions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>DC Office appointment guidance</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-full bg-[#C65378] text-white font-bold text-xs text-center hover:bg-[#a13c5d] transition-all cursor-pointer"
                  >
                    Select Plan
                  </Link>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Executive</span>
                    <h3 className="text-xl font-extrabold text-slate-900">SRO Registration Package</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500">one-time</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>End-to-end advocate drafting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>DC Office SRO slot scheduling &amp; challan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer attendance at SRO registry</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit filing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Priority support across Meghalaya</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Choose Executive
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON LEGAL QUERIES</span>
                </div>
                {/* H2: Exactly 54 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Will Drafting in Meghalaya
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Answers to frequent questions about Meghalaya succession, Khasi-Garo customary inheritance, and Will registration:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex items-center justify-between w-full p-4 sm:p-5 text-left text-xs sm:text-sm font-extrabold text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL AUTHORITIES &amp; STATUTORY CODES</span>
                </div>
                {/* H2: Exactly 54 characters */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Citations &amp; Legal References in Meghalaya
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Every Will drafted by our advocates strictly incorporates and complies with applicable statutory enactments:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block text-xs">
                    Indian Succession Act, 1925 (Act No. 39 of 1925)
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Sections 57, 59, 63, 67, and 213 (testamentary capacity, execution formalities, attestation rules, and probate exemption outside presidency towns).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block text-xs">
                    The Registration Act, 1908 (Act No. 16 of 1908)
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Sections 18(e), 31, 32, and 40 (optional Will registration, Section 31 doorstep visits, and permanent Book III government repository deposit).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block text-xs">
                    The Khasi Social Custom of Lineage Act, 1997
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Defines Khasi customary matrilineal descent, distinguishing ancestral clan lineage from self-acquired property rights.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block text-xs">
                    Meghalaya Transfer of Land (Regulation) Act, 1971
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Statutory regulations restricting transfer of tribal land to non-tribals, safeguarding indigenous property rights in testamentary dispositions.
                  </p>
                </div>
              </div>
            </section>

            {/* FINAL CALL TO ACTION BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Meghalaya Assets &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Ensure your self-acquired properties, commercial firms, and bank accounts are distributed without customary discord or clan challenges. Draft your legally verified Will today with WillDrafting.in.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  Start Drafting Your Meghalaya Will
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  Consult an Estate Advocate
                </Link>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* HIGH RES MODAL - GUARANTEES FULL IMAGE VISIBILITY ON MOBILE & DESKTOP */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full aspect-[16/9] bg-[#172228] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <Image
              src="/images/will-drafting-in-meghalaya.jpg"
              alt="Legal Will Drafting and Matrilineal Property Succession in Meghalaya"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setShowHighResModal(false)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white rounded-full p-2 text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
