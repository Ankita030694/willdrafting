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
  { id: "sikkim-overview", label: "OVERVIEW" },
  { id: "sikkim-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "sikkim-probate-rules", label: "PROBATE RULES" },
  { id: "sikkim-sro-directory", label: "SRO DIRECTORY" },
  { id: "sikkim-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-sikkim-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "sikkim-property-types", label: "PROPERTY TYPES" },
  { id: "sikkim-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const SIKKIM_SRO_HUBS = [
  {
    id: "gangtok-sadar",
    name: "Gangtok Sadar (East Sikkim)",
    sro: "Office of the Sub-Registrar / District Collectorate Gangtok",
    address: "District Administrative Centre, Sichey, Gangtok, Sikkim - 737101",
    areas: "Gangtok City, MG Marg, Deorali, Sichey, Tadong, Ranipool, Burtuk, Chandmari, Development Area",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Sikkim Govt holidays closed)",
  },
  {
    id: "namchi-dac",
    name: "Namchi District (South Sikkim)",
    sro: "Office of the Sub-Registrar / District Administrative Centre Namchi",
    address: "District Administrative Centre, Namchi, South Sikkim - 737126",
    areas: "Namchi Town, Jorethang, Ravangla, Temi Tarku, Namthang, Mellim, Kitam, Damthang",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Sikkim Govt holidays closed)",
  },
  {
    id: "gyalshing-kyongsa",
    name: "Gyalshing / Rabdentse (West Sikkim)",
    sro: "Office of the Sub-Registrar / District Administrative Centre Gyalshing",
    address: "District Administrative Centre, Kyongsa, Gyalshing, West Sikkim - 737111",
    areas: "Gyalshing Town, Pelling, Dentam, Tashiding, Yuksom, Legship, Gerethang",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Sikkim Govt holidays closed)",
  },
  {
    id: "mangan-north",
    name: "Mangan District (North Sikkim)",
    sro: "Office of the Sub-Registrar / District Collectorate Mangan",
    address: "District Collectorate Complex, Pentok, Mangan, North Sikkim - 737116",
    areas: "Mangan Bazaar, Chungthang, Lachen, Lachung, Singhik, Kabi Tingda, Dzongu Protected Zone",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Sikkim Govt holidays closed)",
  },
  {
    id: "pakyong-hub",
    name: "Pakyong Sub-Division (Pakyong District)",
    sro: "Office of the Sub-Registrar / DAC Pakyong",
    address: "District Administrative Centre, Pakyong, Sikkim - 737106",
    areas: "Pakyong Airport Belt, Rorathang, Rhenock, Rongli, Reshi, Dikling, Central Pendam",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Sikkim Govt holidays closed)",
  },
  {
    id: "soreng-dac",
    name: "Soreng Sub-Division (Soreng District)",
    sro: "Office of the Sub-Registrar / DAC Soreng",
    address: "District Administrative Complex, Soreng, Sikkim - 737121",
    areas: "Soreng Town, Nayabazar, Chakung, Timberbong, Mangalbaria, Rinchenpong, Kaluk",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Sikkim Govt holidays closed)",
  },
  {
    id: "rangpo-singtam",
    name: "Rangpo & Singtam Sub-Division",
    sro: "Sub-Divisional Registry Office, Rangpo / Singtam",
    address: "Sub-Divisional Magistrate Complex, National Highway 10, Rangpo, Sikkim - 737132",
    areas: "Rangpo Industrial Belt, Singtam Bazaar, Majhitar, Mining Ground, Bagey Khola Pharma Corridor",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, Sikkim Govt holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Paper",
    detail: "Printed on standard white A4 sheets. Under Sikkim state regulations, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Photo IDs",
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
    label: "Sikkim Paper of ID (COI) / Home Proof",
    detail: "Local home check or Paper of ID confirming legal status and community lineage.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Land Parcha / GMC City Tax Receipts",
    detail: "Official record of rights (Parcha / Khasra) or Gangtok City City Board asset tax assessment receipts.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Revenue Order No. 1 Compliance Check",
    detail: "Check that bequests of Bhutia-Lepcha family lands strictly respect legal community protections.",
    checked: false,
  },
];

export default function SikkimLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("sikkim-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("gangtok-sadar");
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

  const filteredHubs = SIKKIM_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    SIKKIM_SRO_HUBS.find((h) => h.id === selectedHub) || SIKKIM_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN ARCHITECTURE
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
                <span>SIKKIM &amp; HIMALAYAN ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 57 characters (starts with requested heading, under 65 chars) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Sikkim: Land Law &amp; Estate Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will for your Gangtok apartments, shop buildings, cardamom plantations, and family businesses. Full legal guidance on Article 371F, Revenue Order No. 1 compliance, and SRO filing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Sikkim Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#sikkim-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Sikkim SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Article 371F Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Revenue Order No. 1 Checks</span>
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
                  src="/images/will-drafting-in-sikkim.jpg"
                  alt="Legal Will Drafting and Property Succession in Sikkim"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Sikkim Land Laws &amp; Estate Blueprint
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
                6 District SROs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Complete Sikkim Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Will Will Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Non-Needed Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Direct Land &amp; GMC Name Change
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep SRO Filing
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
          MAIN CONTAINER: 2-COLUMN (DESKTOP STICKY MINIMALIST TOC + EDITORIAL CONTENT)
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
            <section id="sikkim-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>SIKKIM ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Sikkim
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>A Choice Filing</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will filing is a choice under Section 18(e) of the Filing Act, 1908. A handwritten or printed Will signed before two witnesses is valid. Official Book III filing at District Collectorate SROs provides strong protection against asset fights.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Revenue Order No. 1 Compliance</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sikkim land laws strictly prohibit the transfer of Bhutia-Lepcha family and farm land to non-Bhutia-Lepcha people. Will gifts cannot circumvent Revenue Order No. 1 protections preserved under Article 371F.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Needed</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sikkim lies outside historical presidency towns. Under Section 213 of the Indian Succession Act, court probate is strictly non-needed in Sikkim, enabling direct land name change and city transfer with a filed Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty Exemption</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are 100% exempt from ad-valorem stamp duty across Sikkim. You can execute your Will on standard A4 paper and remit only a nominal flat filing fee of ₹100 to ₹200 at the SRO office.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="sikkim-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Sikkim
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate planning and Will in Sikkim operate under a unique constitutional and legal framework. While the <strong>Indian Succession Act, 1925</strong> provides core procedural principles for signing a Will, estate in Sikkim is strongly anchored in <strong>Article 371F of the Constitution of India</strong>, the <strong>Filing Act, 1908</strong>, and historic land protection regulations.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Article 371F(k), all laws in force in Sikkim prior to its 1975 accession continue to apply until modified by the state legislature. This constitutional protection safeguards local customary estate norms and ensures that family holdings remain governed by indigenous tenancy statutes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <ShieldCheck className="w-5 h-5 text-[#C65378]" />
                    <span>Article 371F Constitutional Shield</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Article 371F preserves Sikkim&apos;s pre-accession laws, customary estate practices, and land ownership safeguards. Any Will signed in Sikkim must respect community-specific customary estate and home land tenure rules to withstand scrutiny before the High Court of Sikkim.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Preserves community customary estate rights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Shields indigenous land tenures from alienation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Scale className="w-5 h-5 text-[#C65378]" />
                    <span>Revenue Order No. 1 of 1917</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Revenue Order No. 1 strictly protects land owned by Bhutia and Lepcha communities. A Bhutia or Lepcha Will maker cannot transfer or bequeath farm or family land to a non-Bhutia-Lepcha single through a Will. Any Will clause violating this legal prohibition is void ab initio.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Absolute ban on land transfer to non-indigenous persons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Preserves clan farm estates and orchards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION DISCLOSURE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Sikkim?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Indian Registration Act, 1908, the filing of a Will is strictly <strong>a choice</strong> throughout Sikkim. An plain Will signed on plain white A4 paper before two competent witnesses carries full legal validity upon the Will maker&apos;s death.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, filing before the SRO at the District Office Centre in Gangtok, Namchi, Gyalshing, or Mangan provides decisive legal proof advantages:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-4 font-bold">Estate Parameter</th>
                      <th className="p-4 font-bold text-rose-200">Filed Will (Book III)</th>
                      <th className="p-4 font-bold text-slate-300">Plain Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Legal Validity</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-emerald-700">Valid under Filing Act 1908</td>
                      <td className="p-4 bg-slate-50/20">Valid if attested by two witnesses</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Proof Strength</td>
                      <td className="p-4 bg-rose-50/20">Strong government custody in Book III</td>
                      <td className="p-4 bg-slate-50/20">Higher risk to forgery allegations</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Gangtok City (GMC) Name Change</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-emerald-700">Fast name change on city asset tax register</td>
                      <td className="p-4 bg-slate-50/20">Requires legal heir NOCs and sworn notes</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Land Revenue Office Parcha Transfer</td>
                      <td className="p-4 bg-rose-50/20">Accepted by Revenue Inspector for smooth record update</td>
                      <td className="p-4 bg-slate-50/20">Prone to delays and objections by collateral heirs</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Official Filing Cost</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 - ₹200 fee + scanning charges</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="sikkim-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PRECEDENTS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Sikkim Probate Law: Exemption Outside Presidency Towns
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common question among asset owners in Sikkim is whether probate from the High Court of Sikkim or District Court is needed before asset transfer. The established legal answer is <strong>no</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, court probate is needed solely for Wills signed within or concerning assets located inside the historical presidency towns of Mumbai, Kolkata, and Chennai. Sikkim lies completely outside these presidency town boundaries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Settled Law: Non-Needed
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    High Court of Sikkim Jurisprudence
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The High Court of Sikkim has consistently held that getting court probate is a choice for residents in Sikkim. Heirs can directly present a filed Will along with the Will maker&apos;s death paper to the Land Revenue Office and Gangtok City City Board for immediate name change.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Enables immediate asset transfer without High Court delays</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Voluntary Filings: High-Value Fights
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Filed in Sikkim Courts?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An executor may voluntarily file for probate or letters of management before the District Court in Gangtok or Namchi if disgruntled legal heirs fight the Will maker&apos;s sound mind or allege coercion. A grant of probate provides an undisputed judgment <em>in rem</em> that conclusively settles ownership.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Strong judicial decree against any collateral claims</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SIKKIM SRO DIRECTORY */}
            <section id="sikkim-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Sikkim SRO Offices: District SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Filing of papers in Sikkim is administered by the Land Revenue and Disaster Management Office through SRO Offices located within District Office Centres (DAC) and Sub-Divisional Magistrate (SDM) complexes. Under Section 32 of the Filing Act, your Will can be filed at the SRO having area over your permanent residence or where your asset is situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Gangtok, Namchi, Gyalshing)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredHubs.length} of {SIKKIM_SRO_HUBS.length} Sikkim Registration Hubs
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredHubs.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                        selectedHub === hub.id
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>

                {/* ACTIVE SRO CARD */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                        Designated Filing Office
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold self-start sm:self-auto">
                      Operational
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                        Office Location &amp; Address
                      </span>
                      <p className="text-slate-800 leading-relaxed font-medium">
                        {activeHubData.address}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                        Operating Timings &amp; Working Days
                      </span>
                      <p className="text-slate-800 leading-relaxed font-medium">
                        {activeHubData.timings}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-200/80 text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                      Local Local Coverage
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {activeHubData.areas}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES IN SIKKIM (EXACT SAME TYPE AS NASHIK LOCAL AREAS SECTION) */}
            <section id="sikkim-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; LAND LAWS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: District-Wise Will Drafting in Sikkim
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Sikkim span high-value urban home flats in Gangtok, shop hotels in Pelling and Ravangla, pharmaceutical facilities along the Rangpo corridor, and protected farm holdings in Mangan and Namchi. Our estate lawyers deliver customized legal drafting, Revenue Order No. 1 compliance check, and SRO accompaniment across all key regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: GANGTOK & SICHEY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        East Sikkim Capital Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gangtok (Sichey)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gangtok &amp; Sichey
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gangtok City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sichey</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tadong</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Deorali</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Gangtok</strong> and Sichey for multi-storey home buildings, shop shops along MG Marg, and modern apartments. Codifies smooth name change on Gangtok City City Board (GMC) tax registers, mutual fund portfolios, and bank locker bequests to prevent future family fights.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Office Centre, Sichey</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Slot booking at Gangtok SRO, lawyer physical attendance, and Section 31 doorstep signing for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal SRO Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gangtok"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gangtok Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: NAMCHI & JORETHANG */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Sikkim Shop Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DAC SRO Namchi
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Namchi &amp; Jorethang
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Namchi Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jorethang</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mellim</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kitam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Namchi</strong> and Jorethang for wholesale businesses, shop warehousing, and home homes. Includes clear rules for family business estate, doctor mental capacity papers, and life-interest protection for surviving spouses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Office Centre, Namchi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        South Sikkim estate structuring, private asset mapping, and expedited Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Home</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Namchi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Namchi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: GYALSHING & PELLING */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Sikkim Heritage Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DAC SRO Gyalshing
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gyalshing &amp; Pelling
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gyalshing</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pelling</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Yuksom</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dentam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Gyalshing</strong> and Pelling for boutique resorts, tourist homestays, and terraced orchards. Formulates clear share allocations among legal heirs, tenancy leasehold estate, and smooth Land Revenue Parcha record updates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Office Centre, Kyongsa</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Tourism asset estate, independent witness witness signing, and doorstep check for seniors.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Resorts &amp; Homestays</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gyalshing"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gyalshing Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: MANGAN & DZONGU */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Sikkim Protected Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DC Office SRO Mangan
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mangan &amp; Dzongu
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mangan</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dzongu Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chungthang</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kabi Tingda</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Rigorous <strong>Will drafting services in Mangan</strong> and the Dzongu reserve for indigenous Bhutia-Lepcha families. Guarantees 100% compliance with Revenue Order No. 1 of 1917, protecting cardamom estates, traditional family lands, and community estate protocols from legal contestation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate Complex, Pentok</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Strict legal scrutiny under Article 371F, Revenue Order compliance, and Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Revenue Order No. 1 Protection</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mangan"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mangan Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: PAKYONG & RANIPOOL */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Airport &amp; Institutional Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DAC SRO Pakyong
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Pakyong &amp; Ranipool
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pakyong Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ranipool</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rhenock</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dikling</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Professional <strong>Will drafting services in Pakyong</strong> and Ranipool for airport-adjacent home estates, educational campus housing, and shop assets. Structures clear bequests for bank fixed deposits, vehicle fleets, and self-acquired freehold plots.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Office Centre, Pakyong</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-growth plotted estate planning, digital inventory structuring, and local SRO accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Airport &amp; Plotted Lands</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Pakyong"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Pakyong Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: RANGPO & SINGTAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Plant &amp; Border Gateway
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SDM SRO Rangpo
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Rangpo &amp; Singtam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rangpo</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Singtam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Majhitar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mining Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Rangpo</strong> and Singtam for plant logistics hubs, pharmaceutical warehousing, and highway retail businesses. Drafts partnership share transfers, corporate estate clauses, and bank guarantee releases upon probate exemption.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SDM Office Complex, National Highway 10</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Pharma enterprise asset planning, shop asset bequests, and seamless local filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Pharma</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Rangpo"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Rangpo Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: SORENG & NAYABAZAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South-West Agrarian District
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DAC SRO Soreng
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Soreng &amp; Nayabazar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Soreng</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nayabazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chakung</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rinchenpong</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Soreng</strong> and Nayabazar for horticultural farmland, ginger estates, and terraced farm assets. Coordinates clear boundary demarcations, family split settlements, and Land Revenue Office name change entries.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Office Complex, Soreng</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Horticultural farmland bequests, local witness check, and SRO Book III filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Horticultural &amp; Rural Land</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Soreng"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Soreng Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: RAVANGLA & TEMI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central Eco-Tourism &amp; Tea Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Namchi / Ravangla
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ravangla &amp; Temi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ravangla</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Temi Tarku</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Buddha Park Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Damthang</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Ravangla</strong> and the Temi tea garden belt for eco-cottages, mountain view assets, and family-owned tea estates. Formulates precise guardian nominations for minor children and ensures fair split among heirs.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Office Centre, Namchi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Eco-tourism asset split, mental capacity validation, and SRO filing support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Tea Estates &amp; Cottages</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ravangla"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ravangla Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-sikkim-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP WORKFLOW</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to SRO Filing in Sikkim
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Drafting and signing a legally enforceable Will in Sikkim follows five structured stages designed to make sure complete adherence to both central estate acts and local land protection regulations:
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">
                      Compile Asset Inventory &amp; Revenue Order No. 1 Checks
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      List all land and flats in Gangtok, Namchi, or rural areas, together with bank accounts, mutual funds, and vehicles. Crucially, verify whether any land falls under Bhutia-Lepcha protections under Revenue Order No. 1 to avoid unlawful bequests.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">
                      Draft Customized Legal Clauses with Estate Lawyers
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Incorporate essential legal clauses including clear heir ID, survivorship rights, guardian appointments for minors, executor designations, and an explicit revocation of all prior wills.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">
                      Physical Witness Signing Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print the Will on standard white A4 sheets. The Will maker signs or affixes thumb impressions at the bottom of each page in the continuous visual presence of two adult witnesses who have no beneficial interest under the Will.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">
                      SRO Challan Payment &amp; Papers Filing
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Remit the official government filing fee (flat ₹100 - ₹200) through the designated Sikkim treasury portal or bank counter. Prepare the ID docket with Aadhaar, PAN, and witness KYC proofs.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">
                      Biometric Appearance &amp; Book III SRO Filing
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the SRO office at the District Collectorate in Gangtok, Namchi, Gyalshing, or Mangan. Complete biometric thumb scans and digital photography. The filed Will is officially entered into permanent government Book III records.
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
                  <span>DOORSTEP SRO REGISTRATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Filing for Senior Citizens
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Navigating Sikkim&apos;s steep Himalayan topography and traveling to District Office Centres can pose severe physical fights for elderly or bedridden citizens. <strong>Section 31 of the Filing Act, 1908</strong> provides a legal solution through home commission visits.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-50 text-[#C65378]">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Doorstep SRO Commission Process in Sikkim
                    </h3>
                    <p className="text-xs text-slate-500">
                      Legal home signing facility under Section 31 of the Filing Act, 1908
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block">
                      1. Medical Paper
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Obtain a medical paper from a filed physician (MBBS / MD) certifying physical inability to travel and mental fitness to execute the Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block">
                      2. Formal Requisition
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submit an form under Section 31 to the District SRO along with the medical paper and standard travel commission fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block">
                      3. Home Officer Attendance
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The SRO attends your residence with portable biometric devices, validates ID, and registers the Will in Book III.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                  <span>PREPARATION AUDIT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Paper Checklist for Sikkim SRO Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ensure all legal identity, asset, and community lineage records are organized prior to your SRO appointment. Check off items below:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-600">
                    Free Readiness Checklist
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-extrabold">
                    {checkedCount} of {checklist.length} Documents Ready
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-slate-100/70 transition-all flex items-start gap-3 cursor-pointer border border-slate-100"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-0.5 h-4 w-4 rounded-md border-slate-300 text-[#C65378] focus:ring-[#C65378] cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span className={`text-xs sm:text-sm font-bold block ${item.checked ? "text-slate-900" : "text-slate-700"}`}>
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="sikkim-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Sikkim Asset Types: Gangtok Flats &amp; Family Land
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Asset bequeathals in Sikkim require tailored clauses depending on whether the asset consists of self-acquired urban real estate, protected farm land, or financial investments:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Urban Gangtok Flats &amp; Shops
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Self-acquired home apartments, multi-storey buildings in Sichey and Tadong, and retail shops along MG Marg. 100% Will freedom allows bequests to children, spouse, or non-relatives with clear GMC name change directives.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Wheat className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Cardamom Estates &amp; Farmland
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farm parcels, large cardamom plantations, and terraced farmlands. If owned by Bhutia or Lepcha Will makers, bequests must strictly comply with Revenue Order No. 1 and pass exclusively to eligible community members.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Factory className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Hotels, Homestays &amp; Deposits
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Leasehold or freehold resorts in Pelling, shop homestays, pharma supply firms in Rangpo, bank fixed deposits, and mutual funds. Detailed bequest schedules prevent freezing of shop bank accounts upon demise.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES */}
            <section id="sikkim-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY TARIFF</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Sikkim Filing Fees &amp; Stamp Duty Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike asset gift deeds or conveyance deeds that attract percentage-based state stamp duty, Will Wills in Sikkim enjoy full legal exemptions from ad-valorem stamp duty:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-4 font-bold">Government Fee Head</th>
                      <th className="p-4 font-bold text-rose-200">Applicable Rate (Sikkim SRO)</th>
                      <th className="p-4 font-bold text-slate-300">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Stamp Duty on Will Paper</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-emerald-700">₹0 (100% Exempt)</td>
                      <td className="p-4 bg-slate-50/20">Will exemption</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Filing Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 - ₹200</td>
                      <td className="p-4 bg-slate-50/20">Sikkim Filing Tariff (Book III)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer Scanning &amp; Data Entry</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-slate-900">₹100 - ₹200</td>
                      <td className="p-4 bg-slate-50/20">Official digital archival fee</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Doorstep Visit Commission</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-slate-900">Prescribed Govt Commission + Travel</td>
                      <td className="p-4 bg-slate-50/20">Doorstep attendance for bedridden Will makers</td>
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
                  <span>TRANSPARENT SERVICE PLANS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in Sikkim
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose from our structured estate planning packages tailored mainly for Sikkim residents, families, and asset owners:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Online Quick Draft
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Standard Lawyer-Drafted Will
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹1,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Ideal for people with straightforward home flats, bank accounts, and personal savings in Sikkim.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for Sikkim cash assets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer-reviewed legal phrasing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Print-ready digital PDF delivery</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Signing &amp; witness signing instructions</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Start Quick Draft
                  </a>
                </div>

                {/* PLAN 2 */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Recommended for Landowners
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Full Talk
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Senior Lawyer Estate Review
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Designed for estates with multiple assets, Revenue Order No. 1 land checks, and family business estate.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>High Court lawyer direct talk</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Revenue Order No. 1 legal compliance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Bhutia-Lepcha customary estate checks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Doctor mental fitness template included</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Book Lawyer Talk
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Doorstep SRO
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Complete SRO Filing
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      End-to-end filing coordination across any Sikkim SRO office or doorstep home visit.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Treasury challan &amp; slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer physically attends Sikkim SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Collection of certified Book III record</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Get SRO Support
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENT QUESTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in Sikkim
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Essential legal and practical answers regarding will drafting, land protections, and filing in Sikkim:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                        aria-expanded={isOpen}
                      >
                        <span className="font-bold text-sm sm:text-base text-slate-900">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
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
                  <span>STATUTORY CITATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Citations &amp; Sikkim Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols comply strictly with codified Indian statutes and Sikkim state office frameworks:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Article 371F of Constitution
                  </span>
                  <p className="text-xs text-slate-600">
                    Clause (k) preserves Sikkim&apos;s pre-accession laws and indigenous customary estate rules.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Revenue Order No. 1 of 1917
                  </span>
                  <p className="text-xs text-slate-600">
                    Legal protection barring transfer of Bhutia-Lepcha family land to non-BL people.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Filing Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (A Choice Filing) and Section 31 (Special Commission Home Visit).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 59 (Will Capacity), Section 63 (Witness Signing), and Section 213 (Probate Rules).
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Sikkim Assets &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Gangtok homes, family estates, or bank savings to office gridlock. Draft a legally binding Will online today or consult our senior Himalayan estate lawyers.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all cursor-pointer shadow-lg shadow-[#C65378]/25"
                >
                  Start Your Will Online Now
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all border border-white/20"
                >
                  Book Lawyer Talk
                </a>
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
          HIGH-RESOLUTION MODAL
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
                Visual Blueprint: Sikkim Will Drafting &amp; Asset Estate Framework
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
                src="/images/will-drafting-in-sikkim.jpg"
                alt="High Resolution Visual Blueprint: Sikkim Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Sikkim SRO Filed &amp; Revenue Order No. 1 Compliant</span>
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
