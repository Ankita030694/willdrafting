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
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Sikkim state regulations, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Photo IDs",
    detail: "Must carry original photo IDs and must not be beneficiaries receiving any asset under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Strongly advised for senior citizens aged 60+. Certifies testamentary mental soundness and lucidity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Sikkim Certificate of Identification (COI) / Residential Proof",
    detail: "Local residential verification or Certificate of Identification confirming legal status and community lineage.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Land Parcha / GMC Municipal Tax Receipts",
    detail: "Official record of rights (Parcha / Khasra) or Gangtok Municipal Corporation property tax assessment receipts.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Revenue Order No. 1 Compliance Verification",
    detail: "Verification that bequests of Bhutia-Lepcha ancestral lands strictly respect statutory community protections.",
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
                Draft a legally watertight Will for your Gangtok apartments, commercial buildings, cardamom plantations, and family businesses. Comprehensive legal guidance on Article 371F, Revenue Order No. 1 compliance, and Sub-Registrar registration.
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
                  fill
                  className="object-contain group-hover:scale-102 transition-transform duration-500"
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
                Testamentary Will Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Non-Mandatory Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Direct Land &amp; GMC Mutation
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep SRO Registration
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
                  Key Highlights: Will Making &amp; Registration in Sikkim
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional under Section 18(e) of the Registration Act, 1908. A handwritten or printed Will signed before two witnesses is valid. Official Book III registration at District Collectorate SROs provides conclusive protection against property disputes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Revenue Order No. 1 Compliance</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sikkim land laws strictly prohibit the transfer of Bhutia-Lepcha ancestral and agricultural land to non-Bhutia-Lepcha individuals. Testamentary dispositions cannot circumvent Revenue Order No. 1 protections preserved under Article 371F.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sikkim lies outside historical presidency towns. Under Section 213 of the Indian Succession Act, court probate is strictly non-compulsory in Sikkim, enabling direct land mutation and municipal transfer with a registered Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty Exemption</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are 100% exempt from ad-valorem stamp duty across Sikkim. You can execute your Will on standard A4 paper and remit only a nominal flat registration fee of ₹100 to ₹200 at the Sub-Registrar Office.
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Sikkim
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession planning and testamentary disposition in Sikkim operate under a unique constitutional and statutory framework. While the <strong>Indian Succession Act, 1925</strong> provides core procedural principles for executing a Will, succession in Sikkim is strongly anchored in <strong>Article 371F of the Constitution of India</strong>, the <strong>Registration Act, 1908</strong>, and historic land protection regulations.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Article 371F(k), all laws in force in Sikkim prior to its 1975 accession continue to apply until modified by the state legislature. This constitutional protection safeguards local customary succession norms and ensures that ancestral holdings remain governed by indigenous tenancy statutes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <ShieldCheck className="w-5 h-5 text-[#C65378]" />
                    <span>Article 371F Constitutional Shield</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Article 371F preserves Sikkim&apos;s pre-accession laws, customary inheritance practices, and land ownership safeguards. Any Will executed in Sikkim must respect community-specific customary succession and residential land tenure rules to withstand scrutiny before the High Court of Sikkim.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Preserves community customary inheritance rights</span>
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
                    Revenue Order No. 1 strictly protects land owned by Bhutia and Lepcha communities. A Bhutia or Lepcha testator cannot transfer or bequeath agricultural or ancestral land to a non-Bhutia-Lepcha individual through a Will. Any testamentary clause violating this statutory prohibition is void ab initio.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Absolute ban on land transfer to non-indigenous persons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Preserves clan agricultural estates and orchards</span>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Sikkim?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Indian Registration Act, 1908, the registration of a Will is strictly <strong>optional</strong> throughout Sikkim. An unregistered Will signed on plain white A4 paper before two competent witnesses carries full legal validity upon the testator&apos;s death.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, registration before the Sub-Registrar at the District Administrative Centre in Gangtok, Namchi, Gyalshing, or Mangan provides decisive legal evidentiary advantages:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-4 font-bold">Succession Parameter</th>
                      <th className="p-4 font-bold text-rose-200">Registered Will (Book III)</th>
                      <th className="p-4 font-bold text-slate-300">Unregistered Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Statutory Validity</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-emerald-700">Valid under Registration Act 1908</td>
                      <td className="p-4 bg-slate-50/20">Valid if attested by two witnesses</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Evidentiary Strength</td>
                      <td className="p-4 bg-rose-50/20">Conclusive government custody in Book III</td>
                      <td className="p-4 bg-slate-50/20">Higher vulnerability to forgery allegations</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Gangtok Municipal (GMC) Mutation</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-emerald-700">Fast mutation on municipal property tax register</td>
                      <td className="p-4 bg-slate-50/20">Requires legal heir NOCs and affidavits</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Land Revenue Department Parcha Transfer</td>
                      <td className="p-4 bg-rose-50/20">Accepted by Revenue Inspector for smooth record update</td>
                      <td className="p-4 bg-slate-50/20">Prone to delays and objections by collateral heirs</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Official Registration Cost</td>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Sikkim Probate Law: Exemption Outside Presidency Towns
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common question among property owners in Sikkim is whether probate from the High Court of Sikkim or District Court is compulsory before property transmission. The established legal answer is <strong>no</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, court probate is compulsory solely for Wills executed within or concerning properties located inside the historical presidency towns of Mumbai, Kolkata, and Chennai. Sikkim lies completely outside these presidency town boundaries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Settled Law: Non-Compulsory
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    High Court of Sikkim Jurisprudence
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The High Court of Sikkim has consistently held that obtaining court probate is optional for residents in Sikkim. Beneficiaries can directly present a registered Will along with the testator&apos;s death certificate to the Land Revenue Department and Gangtok Municipal Corporation for immediate mutation.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Enables immediate asset transmission without High Court delays</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Voluntary Filings: High-Value Disputes
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Filed in Sikkim Courts?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An executor may voluntarily file for probate or letters of administration before the District Court in Gangtok or Namchi if disgruntled legal heirs challenge the testator&apos;s testamentary capacity or allege coercion. A grant of probate provides an undisputed judgment <em>in rem</em> that conclusively settles ownership.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Conclusive judicial decree against any collateral claims</span>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Sikkim Sub-Registrar Offices: District SRO Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registration of documents in Sikkim is administered by the Land Revenue and Disaster Management Department through Sub-Registrar Offices located within District Administrative Centres (DAC) and Sub-Divisional Magistrate (SDM) complexes. Under Section 32 of the Registration Act, your Will can be registered at the SRO having jurisdiction over your permanent residence or where your property is situated.
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
                        Designated Registration Authority
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
                      Local Jurisdictional Coverage
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: District-Wise Will Drafting in Sikkim
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Sikkim span high-value urban residential flats in Gangtok, commercial hotels in Pelling and Ravangla, pharmaceutical facilities along the Rangpo corridor, and protected agricultural holdings in Mangan and Namchi. Our estate advocates deliver customized legal drafting, Revenue Order No. 1 compliance verification, and Sub-Registrar accompaniment across all key regional cities:
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
                      Specialized <strong>Will drafting services in Gangtok</strong> and Sichey for multi-storey residential buildings, commercial shops along MG Marg, and modern apartments. Codifies smooth mutation on Gangtok Municipal Corporation (GMC) tax registers, mutual fund portfolios, and bank locker bequests to prevent future family disputes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Administrative Centre, Sichey</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Slot booking at Gangtok SRO, advocate physical attendance, and Section 31 doorstep execution for senior citizens.
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
                        South Sikkim Commercial Hub
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
                      Customized <strong>Will drafting services in Namchi</strong> and Jorethang for wholesale businesses, commercial warehousing, and residential homes. Includes clear provisions for family business succession, doctor mental capacity certificates, and life-interest protection for surviving spouses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Administrative Centre, Namchi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        South Sikkim estate structuring, private asset mapping, and expedited Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Residential</span>
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
                      Comprehensive <strong>Will drafting services in Gyalshing</strong> and Pelling for boutique resorts, tourist homestays, and terraced orchards. Formulates unambiguous share allocations among legal heirs, tenancy leasehold succession, and smooth Land Revenue Parcha record updates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Administrative Centre, Kyongsa</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Tourism asset succession, independent witness attestation, and doorstep verification for seniors.
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
                      Rigorous <strong>Will drafting services in Mangan</strong> and the Dzongu reserve for indigenous Bhutia-Lepcha families. Guarantees 100% compliance with Revenue Order No. 1 of 1917, protecting cardamom estates, traditional ancestral lands, and community succession protocols from legal contestation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Collectorate Complex, Pentok</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Strict statutory scrutiny under Article 371F, Revenue Order compliance, and Book III registration.
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
                      Professional <strong>Will drafting services in Pakyong</strong> and Ranipool for airport-adjacent residential estates, educational campus housing, and commercial properties. Structures clear bequests for bank fixed deposits, vehicle fleets, and self-acquired freehold plots.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Administrative Centre, Pakyong</span>
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
                        Industrial &amp; Border Gateway
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
                      Strategic <strong>Will drafting services in Rangpo</strong> and Singtam for industrial logistics hubs, pharmaceutical warehousing, and highway retail businesses. Drafts partnership share transfers, corporate succession clauses, and bank guarantee releases upon probate exemption.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SDM Office Complex, National Highway 10</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Pharma enterprise asset planning, commercial property bequests, and seamless local registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Pharma</span>
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
                      Dedicated <strong>Will drafting services in Soreng</strong> and Nayabazar for horticultural farmland, ginger estates, and terraced agricultural properties. Coordinates clear boundary demarcations, ancestral partition settlements, and Land Revenue Department mutation entries.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Administrative Complex, Soreng</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Horticultural farmland bequests, local witness verification, and Sub-Registrar Book III filing.
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
                      Specialized <strong>Will drafting services in Ravangla</strong> and the Temi tea garden belt for eco-cottages, mountain view properties, and family-owned tea estates. Formulates precise guardian nominations for minor children and ensures fair distribution among heirs.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Administrative Centre, Namchi</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Eco-tourism property distribution, mental capacity validation, and SRO registration support.
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to SRO Registration in Sikkim
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Drafting and executing a legally enforceable Will in Sikkim follows five structured stages designed to ensure complete adherence to both central succession acts and local land protection regulations:
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
                      List all immovable properties in Gangtok, Namchi, or rural areas, together with bank accounts, mutual funds, and vehicles. Crucially, verify whether any land falls under Bhutia-Lepcha protections under Revenue Order No. 1 to avoid unlawful bequests.
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
                      Draft Customized Legal Clauses with Estate Advocates
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Incorporate essential statutory clauses including unambiguous beneficiary identification, survivorship rights, guardian appointments for minors, executor designations, and an explicit revocation of all prior wills.
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
                      Physical Attestation Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print the Will on standard white A4 sheets. The testator signs or affixes thumb impressions at the bottom of each page in the continuous visual presence of two adult witnesses who have no beneficial interest under the Will.
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
                      SRO Challan Payment &amp; Documentation Filing
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Remit the official government registration fee (flat ₹100 - ₹200) through the designated Sikkim treasury portal or bank counter. Prepare the identification docket with Aadhaar, PAN, and witness KYC proofs.
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
                      Biometric Appearance &amp; Book III SRO Registration
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office at the District Collectorate in Gangtok, Namchi, Gyalshing, or Mangan. Complete biometric thumb scans and digital photography. The registered Will is officially entered into permanent government Book III records.
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration for Senior Citizens
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Navigating Sikkim&apos;s steep Himalayan topography and traveling to District Administrative Centres can pose severe physical challenges for elderly or bedridden citizens. <strong>Section 31 of the Registration Act, 1908</strong> provides a statutory solution through home commission visits.
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
                      Statutory home execution facility under Section 31 of the Registration Act, 1908
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block">
                      1. Medical Certificate
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Obtain a medical certificate from a registered physician (MBBS / MD) certifying physical inability to travel and mental fitness to execute the Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block">
                      2. Formal Requisition
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submit an application under Section 31 to the District Sub-Registrar along with the medical certificate and standard travel commission fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-xs text-slate-900 block">
                      3. Home Officer Attendance
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar attends your residence with portable biometric devices, validates identification, and registers the Will in Book III.
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Document Checklist for Sikkim Sub-Registrar Offices
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ensure all statutory identity, property, and community lineage records are organized prior to your SRO appointment. Check off items below:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-600">
                    Interactive Readiness Checklist
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Sikkim Property Types: Gangtok Flats &amp; Ancestral Land
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Asset bequeathals in Sikkim require tailored clauses depending on whether the property consists of self-acquired urban real estate, protected agricultural land, or financial investments:
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
                    Self-acquired residential apartments, multi-storey buildings in Sichey and Tadong, and retail shops along MG Marg. 100% testamentary freedom allows bequests to children, spouse, or non-relatives with clear GMC mutation directives.
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
                    Agricultural parcels, large cardamom plantations, and terraced farmlands. If owned by Bhutia or Lepcha testators, bequests must strictly comply with Revenue Order No. 1 and pass exclusively to eligible community members.
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
                    Leasehold or freehold resorts in Pelling, commercial homestays, pharma supply firms in Rangpo, bank fixed deposits, and mutual funds. Detailed bequest schedules prevent freezing of commercial bank accounts upon demise.
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Sikkim Registration Fees &amp; Stamp Duty Charges
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property gift deeds or conveyance deeds that attract percentage-based state stamp duty, testamentary Wills in Sikkim enjoy full statutory exemptions from ad-valorem stamp duty:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-4 font-bold">Government Fee Head</th>
                      <th className="p-4 font-bold text-rose-200">Applicable Rate (Sikkim SRO)</th>
                      <th className="p-4 font-bold text-slate-300">Statutory Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Stamp Duty on Will Document</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-emerald-700">₹0 (100% Exempt)</td>
                      <td className="p-4 bg-slate-50/20">Testamentary disposition exemption</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Sub-Registrar Registration Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 - ₹200</td>
                      <td className="p-4 bg-slate-50/20">Sikkim Registration Tariff (Book III)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer Scanning &amp; Data Entry</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-slate-900">₹100 - ₹200</td>
                      <td className="p-4 bg-slate-50/20">Official digital archival fee</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Doorstep Visit Commission</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-slate-900">Prescribed Govt Commission + Travel</td>
                      <td className="p-4 bg-slate-50/20">Doorstep attendance for bedridden testators</td>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees in Sikkim
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose from our structured estate planning packages tailored specifically for Sikkim residents, families, and property owners:
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
                      Ideal for individuals with straightforward residential flats, bank accounts, and personal savings in Sikkim.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for Sikkim movable assets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate-reviewed legal phrasing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Print-ready digital PDF delivery</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Execution &amp; attestation instructions</span>
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
                      Comprehensive Consultation
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Senior Advocate Succession Review
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Designed for estates with multiple properties, Revenue Order No. 1 land checks, and family business succession.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>High Court advocate direct consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Revenue Order No. 1 statutory compliance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Bhutia-Lepcha customary succession checks</span>
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
                    Book Advocate Consultation
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Doorstep SRO
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Complete SRO Registration
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      End-to-end registration coordination across any Sikkim Sub-Registrar Office or doorstep home visit.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Treasury challan &amp; slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physically attends Sikkim SRO</span>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Will Drafting in Sikkim
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Essential legal and practical answers regarding will drafting, land protections, and registration in Sikkim:
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Citations &amp; Sikkim Legal Portals
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols comply strictly with codified Indian statutes and Sikkim state administrative frameworks:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Article 371F of Constitution
                  </span>
                  <p className="text-xs text-slate-600">
                    Clause (k) preserves Sikkim&apos;s pre-accession laws and indigenous customary succession rules.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Revenue Order No. 1 of 1917
                  </span>
                  <p className="text-xs text-slate-600">
                    Statutory protection barring transfer of Bhutia-Lepcha ancestral land to non-BL individuals.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Registration Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional Registration) and Section 31 (Special Commission Home Visit).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 59 (Testamentary Capacity), Section 63 (Attestation), and Section 213 (Probate Rules).
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Sikkim Properties &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Gangtok homes, family estates, or bank savings to administrative gridlock. Draft a legally binding Will online today or consult our senior Himalayan estate advocates.
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
                  Book Advocate Consultation
                </a>
              </div>
            </section>

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
                Visual Blueprint: Sikkim Will Drafting &amp; Property Succession Framework
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
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Sikkim SRO Registered &amp; Revenue Order No. 1 Compliant</span>
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
