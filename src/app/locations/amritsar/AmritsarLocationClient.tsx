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
  Globe,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "amritsar-overview", label: "OVERVIEW" },
  { id: "amritsar-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "amritsar-probate-rules", label: "PROBATE RULES" },
  { id: "amritsar-sro-directory", label: "SRO DIRECTORY" },
  { id: "amritsar-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-amritsar-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "amritsar-property-types", label: "PROPERTY TYPES" },
  { id: "amritsar-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const AMRITSAR_SRO_HUBS = [
  {
    id: "amritsar-1",
    name: "Amritsar 1 (Kachehri Compound)",
    sro: "SRO Amritsar 1 (District Courts Complex)",
    address: "District Court & Tehsil Complex, Kachehri Compound, Amritsar - 143001",
    areas: "Walled City, Katra Ahluwalia, Katra Jaimal Singh, Hall Bazaar, Civil Lines, Lawrence Road, Mall Road, Court Road, Albert Road",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, Punjab Govt holidays closed)",
  },
  {
    id: "amritsar-2",
    name: "Amritsar 2 (Majitha Road)",
    sro: "SRO Amritsar 2 (Mini Secretariat / Majitha Road)",
    address: "Sub-Registrar Complex, Majitha Road, Near Guru Nanak Dev Hospital, Amritsar - 143002",
    areas: "Ranjit Avenue (Blocks A-D), Green Avenue, Basant Avenue, Majitha Road, Medical Enclave, Fatehgarh Churian Road, Gumtala, Verka",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, Punjab Govt holidays closed)",
  },
  {
    id: "amritsar-ajnala",
    name: "Ajnala Sub-District",
    sro: "SRO Ajnala Sub-District Registry",
    address: "Tehsil & SDM Complex, Court Road, Ajnala, Amritsar District - 143102",
    areas: "Ajnala Tehsil, Rajasansi Airport Belt, Ramdas, Bhindi Saidan, Chogawan, Lopoke Rural Farmlands",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, Punjab Govt holidays closed)",
  },
  {
    id: "amritsar-baba-bakala",
    name: "Baba Bakala Sahib",
    sro: "SRO Baba Bakala Sub-Division",
    address: "Tehsil Complex, Baba Bakala Sahib, GT Road, Amritsar District - 143201",
    areas: "Baba Bakala, Rayya Mandi, Beas, Sathiala, Wazir Bhullar, Butala, Jalalabad Rural Belt",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, Punjab Govt holidays closed)",
  },
  {
    id: "amritsar-attari",
    name: "Attari / Chogawan Sub-Tehsil",
    sro: "SRO Attari Sub-Tehsil Office",
    address: "Sub-Tehsil Administrative Complex, Attari Road, Amritsar District - 143108",
    areas: "Attari, Khasa, Gharinda, Mode, Roranwala, Indo-Pak Border Belt Agro-Holdings",
    timings: "9:00 AM to 5:00 PM (Mon-Fri, Punjab Govt holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Punjab law, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN / Passport of Testator",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo at NGDRS counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be beneficiaries receiving any asset under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Registered Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Strongly advised for senior citizens aged 60+ to certify sound testamentary capacity and lucidity.",
    checked: false,
  },
  {
    id: "item-5",
    label: "NGDRS Punjab Appointment Slip & Cyber Treasury Challan",
    detail: "Official time-slot booking receipt downloaded from igr.punjab.gov.in portal with statutory ₹500 fee paid.",
    checked: false,
  },
  {
    id: "item-6",
    label: "ADA Allotment Letters & MCA Property Tax Receipts",
    detail: "Ownership records for Amritsar Development Authority plots or Municipal Corporation Amritsar assessments.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Jamabandi Fard & Khasra / Khewat Extracts",
    detail: "Recent computerized land records from plrs.org.in for agricultural farmlands in Ajnala, Majitha, or Baba Bakala.",
    checked: false,
  },
  {
    id: "item-8",
    label: "NRI Passport & Foreign Residence Proof (If Applicable)",
    detail: "Essential for NRI testators bequeathing ancestral Punjabi properties or cross-border assets.",
    checked: false,
  },
];

export default function AmritsarLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("amritsar-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("amritsar-2");
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

  const filteredHubs = AMRITSAR_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    AMRITSAR_SRO_HUBS.find((h) => h.id === selectedHub) || AMRITSAR_SRO_HUBS[0];

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
                <span>AMRITSAR &amp; MAJHA REGION SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 56 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Amritsar: NRI Succession Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will for your ADA residential plots, Ranjit Avenue bungalows, commercial havelis, and NRI ancestral farmlands in Ajnala and Majitha. Get senior Punjab &amp; Haryana High Court advocate drafting, NGDRS Punjab slot booking, and Section 31 doorstep execution.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Amritsar Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#amritsar-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Amritsar SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Punjab &amp; Haryana HC Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Punjab Stamp Duty</span>
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
                  src="/images/will-drafting-in-amritsar.jpg"
                  alt="Will Drafting and NRI Property Succession in Amritsar Punjab"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Amritsar Urban &amp; NRI Agro-Succession Blueprint
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
                5 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Amritsar District Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Testamentary Asset Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Punjab &amp; Haryana HC Rule
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
            <section id="amritsar-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>AMRITSAR ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Amritsar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills written on plain paper before two witnesses are legally binding under Section 18(e) of the Registration Act. However, Book III registration on NGDRS Punjab shields against fraudulent mutation challenges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 213 read with Section 57 of the Indian Succession Act, court probate is strictly non-mandatory across Punjab. A registered Will enables direct mutation with ADA and the Revenue Department.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>NRI Ancestral Land Protection</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Custom cross-border testamentary bequests prevent illegal encroachers (kabza) from forging power of attorney deeds over valuable farmlands in Ajnala, Majitha, and Baba Bakala during overseas stays.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <Stamp className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Flat ₹500 Government Fee</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Zero ad-valorem stamp duty applies on testamentary Wills in Punjab. Registration requires solely a statutory fee of ₹500 plus nominal computer scanning charges via the official Cyber Treasury portal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="amritsar-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FRAMEWORK &amp; ESTATE JURISDICTION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Punjab Estate Framework: Indian Succession Act Rules
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession in Amritsar is governed by the Indian Succession Act, 1925, alongside the Hindu Succession Act, 1956 and the Punjab Land Revenue Act, 1887. Whether you own self-acquired bungalows in Ranjit Avenue, ancestral agricultural land in Ajnala, or commercial havelis near the Golden Temple, executing a verified Will eliminates ambiguous intestate inheritance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-[#C65378] font-bold text-xs">
                    01
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Section 59: Testamentary Capacity
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every major of sound mind, including married women, can dispose of their property by Will. Senior citizens can protect their Will from undue influence challenges by obtaining an MBBS mental fitness certificate.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-[#C65378] font-bold text-xs">
                    02
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Section 63: Attestation Requirements
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must sign or affix their thumb impression in the presence of at least two adult witnesses. Each witness must attest the Will in the visual presence of the testator to ensure statutory validity.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-[#C65378] font-bold text-xs">
                    03
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Section 67: Beneficiary Disqualification
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Any bequest or appointment made to an attesting witness, or their spouse, is void. In Amritsar, ensure your witnesses are independent individuals with no beneficial interest in the bequeathed properties.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION RULES */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION LEGALITIES &amp; EVIDENTIARY VALUE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Voluntary Registration: NGDRS Punjab Book III Rules
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Punjab. A Will written on ordinary white paper is legally valid if properly executed. However, registering your Will at an Amritsar Sub-Registrar Office through NGDRS Punjab provides decisive evidentiary advantages.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378]">
                      Unregistered Will
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      Vulnerable to Forgery Allegations
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>Disgruntled legal heirs often allege the document was signed under duress, coercion, or mental illness.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>The Amritsar Development Authority (ADA) mandates public newspaper notices with a mandatory 30-day objection window.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>Revenue Patwaris may refuse fast-track Inteqal (mutation) without exhaustive civil indemnity bonds.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                      NGDRS Registered Will
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      Book III Permanent Custody
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>The original copy is permanently archived in Book III of the government registry, preventing loss or destruction.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Sub-Registrar verbal inquiry and biometric thumbprints create an official presumption of genuine execution.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Direct ownership substitution on ADA records, MCA house tax registers, and the Punjab Jamabandi portal.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="amritsar-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PRECEDENTS &amp; COURT EXEMPTION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Probate Exemption: Punjab &amp; Haryana High Court Law
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most persistent misconceptions among property owners in Amritsar is that a court-issued probate is mandatory to inherit or mutate property. Under the Indian Succession Act, probate is compulsory only within the presidency towns of Mumbai, Kolkata, and Chennai.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                    Punjab &amp; Haryana HC Precedent
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Ram Chand v. Sardara Singh (AIR 1962 P&amp;H 382)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The High Court of Punjab &amp; Haryana has conclusively reaffirmed in <em>Ram Chand v. Sardara Singh</em> and subsequent rulings (including <em>Madan Lal v. Dev Raj</em>) that Section 213(2) of the Indian Succession Act exempts Wills executed by Hindus, Sikhs, Jains, and Buddhists in Punjab from mandatory probate.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No civil court fee of 3% to 7% or 18-month court delay</span>
                  </div>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                    Voluntary Filings: High-Value Disputes
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Filed in Amritsar District Court?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An executor may voluntarily file for probate or letters of administration before the District Judge in Amritsar only if hostile co-heirs initiate partition suits or challenge testamentary capacity. A decree of probate acts as a judgment <em>in rem</em> that conclusively settles ownership.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Conclusive judicial decree against any collateral claims</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: AMRITSAR SRO DIRECTORY */}
            <section id="amritsar-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Amritsar Sub-Registrar Offices: SRO District Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Amritsar district operates designated Sub-Registrar Offices under the Department of Revenue, Rehabilitation and Disaster Management Punjab (NGDRS Punjab). Under Section 32 of the Registration Act, your Will can be registered at the Sub-Registrar Office having jurisdiction over your permanent residence or where any part of your real estate is situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Ranjit Avenue, Majitha, Ajnala)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredHubs.length} of {AMRITSAR_SRO_HUBS.length} Amritsar Registration Hubs
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredHubs.map((h, index) => {
                    const isSelected = selectedHub === h.id;
                    const isLastOdd =
                      filteredHubs.length % 2 !== 0 && index === filteredHubs.length - 1;
                    return (
                      <button
                        key={h.id}
                        onClick={() => setSelectedHub(h.id)}
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                          isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                        } ${
                          isSelected
                            ? "bg-[#C65378] text-white shadow-xs ring-2 ring-[#C65378]/25"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                        }`}
                      >
                        {h.name}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE SRO DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        Amritsar Registration District
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Registry Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Location:</span>
                      <p className="text-slate-600">{activeHubData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <p className="text-slate-600">{activeHubData.timings}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold text-slate-900 block">Key Localities in Jurisdiction:</span>
                      <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official Portal: <strong>igr.punjab.gov.in (NGDRS Punjab)</strong>
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Advocate Assistance for {activeHubData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: LOCALITIES COVERED IN AMRITSAR */}
            <section id="amritsar-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Localities Covered: Area-Wise Will Drafting in Amritsar
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate in Amritsar spans prestigious planned residential sectors in Ranjit Avenue and Green Avenue, historic commercial trade hubs around the Golden Temple, defense bungalows in Cantonment, and NRI ancestral farmlands in Ajnala and Baba Bakala. Our estate planning advocates provide specialized drafting, NGDRS slot booking, and Sub-Registrar accompaniment across all key micro-markets:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: RANJIT AVENUE & GREEN AVENUE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-West Premium Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Amritsar 2 (Majitha Road)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ranjit Avenue &amp; Green Avenue
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ranjit Avenue (Blocks A-D)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Green Avenue</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gumtala Bypass</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Basant Avenue</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Ranjit Avenue</strong> and Green Avenue for premium independent kothis, ADA plotted developments, and corporate business assets. Drafts clear clauses for Amritsar Development Authority plot re-allotment, Municipal Corporation tax record substitutions, and liquid financial assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SRO 2, Majitha Road Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        NGDRS Punjab slot scheduling, advocate physical attendance, and Section 31 doorstep execution for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹500 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ranjit Avenue"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ranjit Avenue Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: MALL ROAD & CIVIL LINES */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage Administrative Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Amritsar 1 (Kachehri)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mall Road &amp; Civil Lines
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mall Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lawrence Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Taylor Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Mall Road</strong> and Civil Lines for historic colonial-era bungalows, doctors&apos; clinics, boutique commercial showrooms, and prominent family trusts. Includes life-interest clauses for surviving spouses and doctor mental capacity certifications.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Courts, Kachehri Compound</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-net-worth estate structuring, private family asset mapping, and expedited Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Residential</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mall Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mall Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: GOLDEN TEMPLE CORRIDOR & WALLED CITY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Landmark className="w-3.5 h-3.5" />
                        Historic Walled City Trade
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Amritsar 1 (Kachehri)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Golden Temple Heritage Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Katra Ahluwalia</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Katra Jaimal Singh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Guru Bazaar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hall Bazaar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Golden Temple Corridor</strong> for traditional textile, dry fruit, shawl manufacturing, and gold jewelry merchants. Resolves multi-generation coparcenary tenancy rights, partitioned shop allocations, and family partnership equity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Kachehri Compound, Amritsar 1</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Ancestral haveli succession, partnership deed alignment, and seamless registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Ancestral Havelis &amp; Shops</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Golden Temple Corridor"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Heritage Area Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: MAJITHA ROAD & FATEHGARH CHURIAN ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Suburban Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Amritsar 2 (Majitha Road)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Majitha Road &amp; Fatehgarh Churian
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Majitha Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Medical Enclave</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gopal Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fatehgarh Churian Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Majitha Road</strong> and Medical Enclave for doctors, healthcare operators, and plotted housing residents. Ensures unambiguous division of duplex homes, clinic equipment, commercial rentals, and safe deposit lockers between sons and daughters.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SRO 2, Near GND Hospital</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast-track documentation review, biometric scheduling, and certified copy delivery.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Plotted Homes &amp; Clinics</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Majitha Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Majitha Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: CANTONMENT & CIRCULAR ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Home className="w-3.5 h-3.5" />
                        Defence &amp; Pensioner Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Amritsar 1 (Kachehri)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Amritsar Cantt &amp; Circular Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cantonment Board</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Circular Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Albert Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Railway Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Amritsar Cantt</strong> and Circular Road for defence veterans, railway officers, and senior pensioners. Integrates Cantonment Board lease rules, defence pension gratuities, bank fixed deposits, and direct survivorship nominations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Courts Kachehri Compound</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep registration for elderly veterans, NGDRS booking, and advocate accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Defence &amp; Pension Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Amritsar Cantt"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Cantt Area Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: AJNALA & BORDER FARMLANDS (NRI HUB) */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        NRI Agricultural Heart
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ajnala Sub-District
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ajnala &amp; Rural Farmlands
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ajnala Tehsil</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajasansi Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramdas &amp; Bhindi Saidan</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chogawan / Lopoke</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Ajnala</strong> for agricultural farmlands and NRI ancestral holdings. Specifies Khasra and Khewat numbers, prevents illegal encroachments (kabza) during overseas absence, and streamlines revenue mutation under Section 34 of the Punjab Land Revenue Act.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil &amp; SDM Complex, Ajnala</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Jamabandi fard verification, Halqa Patwari Inteqal guidance, and NRI cross-border compliance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Jamabandi Fard &amp; Farmland</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ajnala"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ajnala NRI Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: BABA BAKALA & RAYYA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        Agro-Commercial Sub-District
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Baba Bakala Sahib
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Baba Bakala &amp; Rayya
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Baba Bakala Sahib</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rayya Mandi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Beas Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sathiala &amp; Butala</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Baba Bakala</strong> and Rayya Mandi for grain merchants, cold storage owners, and ancestral agricultural estates along GT Road. Codifies clear partitions to avoid inter-generational land fragmentation and revenue court litigation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Complex, Baba Bakala</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Agricultural land succession, GT Road commercial showroom transfer, and Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Grain Mandis &amp; Farms</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Baba Bakala"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Baba Bakala Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: GT ROAD INDUSTRIAL BELT & VERKA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5" />
                        Industrial &amp; Processing
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Amritsar 1 &amp; 2
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Verka &amp; GT Road Industrial
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Verka Bypass</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Focal Point Amritsar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vallah Mandi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jahajgarh Transport Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Verka and Focal Point</strong> for manufacturing founders, dairy processing units, logistics owners, and PSIEC industrial plot holders. Outlines transfer of private limited shares, machinery, trademark licenses, and executive authority.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Majitha Road / Kachehri Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Industrial asset audit, partnership continuity clauses, and PSIEC leasehold transfer guidance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">PSIEC Plots &amp; Factories</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Verka Industrial"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Industrial Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-amritsar-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>SYSTEMATIC REGISTRATION PROTOCOL</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Online Will Registration in Amritsar
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Amritsar through the NGDRS Punjab portal ensures seamless legal protection. Our five-step standard operating procedure guarantees full compliance with the Registration Act and Punjab Revenue department standards:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-extrabold text-base shrink-0">
                    1
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Asset Inventory &amp; NRI Property Compilation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile an exhaustive schedule of all immovable and movable assets. For Amritsar properties, gather ADA plot allotment numbers, MCA property tax assessments, and computerized Jamabandi fards with Khasra/Khewat numbers from plrs.org.in. Designate specific beneficiaries and an independent executor.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-extrabold text-base shrink-0">
                    2
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      High Court Advocate Will Drafting &amp; Review
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our senior Punjab &amp; Haryana High Court advocates draft your customized Will. The draft incorporates unambiguous revocation of previous wills, clear survivorship clauses, minor guardianship provisions under Section 60 of the Indian Succession Act, and anti-litigation no-contest clauses.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-extrabold text-base shrink-0">
                    3
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Attestation by Two Independent Adult Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the final Will on standard white A4 sheets. The testator signs or affixes thumb impressions on every page in the simultaneous presence of two independent adult witnesses. Under Section 67, witnesses must have zero beneficial interest in the bequeathed properties.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-extrabold text-base shrink-0">
                    4
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      NGDRS Punjab Appointment Booking &amp; Fee Payment
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our legal operations desk logs into the NGDRS Punjab portal (igr.punjab.gov.in), uploads the document data, inputs testator and witness KYC, generates the Cyber Treasury e-Challan for the statutory ₹500 fee, and reserves an appointment slot at the jurisdictional SRO.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#C65378] font-extrabold text-base shrink-0">
                    5
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Biometric SRO Execution &amp; Book III Certified Copy
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The testator and both witnesses appear before the Amritsar Sub-Registrar. Following verbal attestation, live digital webcam photos and biometric thumbprints are captured. The Will receives its Book III registration seal, and certified true copies are delivered to your residence.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP REGISTRY */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION FOR ELDERLY &amp; BEDRIDDEN</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep Registry: Senior Citizen Home Visits
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visiting the busy Kachehri or Majitha Road Sub-Registrar offices can be physically challenging for elderly testators, ailing individuals, or persons with mobility restrictions. Section 31 of the Registration Act, 1908 provides a legal mechanism for official home visits across Amritsar.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Medical Certificate
                    </span>
                    <h3 className="font-bold text-base text-slate-900">
                      Doctor Fitness Affidavit
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered medical practitioner (MBBS/MD) issues a certificate confirming the testator&apos;s physical inability to visit the SRO while affirming complete testamentary soundness of mind.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Official Requisition
                    </span>
                    <h3 className="font-bold text-base text-slate-900">
                      Sub-Registrar Order
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our advocates draft and file the formal Section 31 application along with the statutory government visit fee, obtaining prior approval from the Amritsar Sub-Registrar.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Portable Biometrics
                    </span>
                    <h3 className="font-bold text-base text-slate-900">
                      Doorstep Execution
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar visits your residence in Ranjit Avenue, Civil Lines, or Mall Road with mobile biometric scanners and digital cameras to complete Book III registration at home.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>INTERACTIVE DOCUMENT AUDIT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Amritsar Will Document Checklist: Verification Protocol
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Before booking your NGDRS Punjab appointment, ensure you have all mandatory original documents and verified copies ready. Check off each item below:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="font-bold text-slate-700">
                    Checklist Progress: {checkedCount} of {checklist.length} Completed
                  </span>
                  <span className="font-mono font-bold text-[#C65378]">
                    {Math.round((checkedCount / checklist.length) * 100)}% Ready
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200/80"
                          : "bg-slate-50/50 border-slate-200/70 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <span
                          className={`font-bold text-xs sm:text-sm block ${
                            item.checked ? "text-slate-900" : "text-slate-700"
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

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="amritsar-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATIONS &amp; CLAUSE DRAFTING</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Amritsar Property Bequests: ADA, MCA &amp; Farmlands
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Amritsar represent varied legal ownership structures. Each property category requires custom statutory clauses to ensure clean transmission:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] uppercase">
                    <Building className="w-4 h-4" />
                    <span>ADA Residential &amp; Commercial Schemes</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Amritsar Development Authority Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    ADA urban estates in Ranjit Avenue and surrounding sectors require specific reference to the original allotment letter, transfer permissions, and dues clearance. Registered Wills allow direct mutation under ADA policy without mandatory public notice delays.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] uppercase">
                    <Landmark className="w-4 h-4" />
                    <span>Walled City Ancestral Havelis</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Historic Residential &amp; Trade Properties
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Multi-generational havelis inside the 12 historic gates of Amritsar often feature undivided coparcenary shares. A legally drafted Will specifies the exact partitioned floors, access easements, and rooftop rights, preventing family partition suits.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] uppercase">
                    <Wheat className="w-4 h-4" />
                    <span>Agricultural Farmlands &amp; Jamabandi</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Farmland Succession in Ajnala &amp; Majitha
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Agricultural land succession follows Section 34 of the Punjab Land Revenue Act. Bequests must identify Murabba, Khasra, and Khewat numbers. A registered Will enables the Patwari to record Inteqal in Parat Patwar and update the digital Jamabandi fard on plrs.org.in.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] uppercase">
                    <Factory className="w-4 h-4" />
                    <span>Industrial &amp; Business Assets</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Manufacturing Units &amp; Commercial Firms
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Succession for industrial units in Focal Point or Verka involves private limited share transfers, machinery ownership, and partnership capital distributions. Appointing an executor ensures business continuity without frozen operational bank accounts.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & STAMP EXEMPTION */}
            <section id="amritsar-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT PUNJAB REVENUE SCHEDULE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Government Fees: Punjab Registration &amp; Stamp Exemption
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds that attract 5% to 7% stamp duty in Punjab, testamentary Wills are completely exempt from ad-valorem stamp duty under the Indian Stamp Act, 1899.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200/80">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    Official Fee Schedule for Will Registration in Amritsar
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Applicable across all Amritsar Sub-Registrar Offices under NGDRS Punjab
                  </p>
                </div>

                <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <div className="p-4 sm:p-5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Punjab Stamp Duty</span>
                      <span className="text-xs text-slate-500">Indian Stamp Act testamentary exemption</span>
                    </div>
                    <span className="font-mono font-extrabold text-emerald-600 text-sm sm:text-base">
                      ₹0 (100% Exempt)
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Statutory Registration Fee</span>
                      <span className="text-xs text-slate-500">Government fee deposited via Cyber Treasury</span>
                    </div>
                    <span className="font-mono font-extrabold text-slate-900 text-sm sm:text-base">
                      ₹500 (Flat Fee)
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Computer Scanning &amp; Service Charges</span>
                      <span className="text-xs text-slate-500">NGDRS digital archiving and database fee</span>
                    </div>
                    <span className="font-mono font-bold text-slate-700 text-sm sm:text-base">
                      ₹100 to ₹200
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Section 31 Doorstep Visit Fee (Optional)</span>
                      <span className="text-xs text-slate-500">Home attendance fee for senior citizens</span>
                    </div>
                    <span className="font-mono font-bold text-slate-700 text-sm sm:text-base">
                      Statutory SRO Tariffs
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: PRICING PLANS */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL ASSISTANCE PLANS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Pricing: Amritsar Will Drafting Plans
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the plan that suits your family&apos;s estate planning needs. No hidden charges, no percentage-based commissions:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Essential Online
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Lawyer-Drafted Will
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for individual homeowners in Ranjit Avenue, Green Avenue, or Basant Avenue bequeathing standard residential and financial assets.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>High Court advocate drafted template</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>ADA plot &amp; MCA property clauses</span>
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
                    className="w-full py-3 rounded-xl bg-slate-100 text-slate-900 font-bold text-xs hover:bg-slate-200 transition-colors text-center cursor-pointer block"
                  >
                    Select Essential Plan
                  </a>
                </div>

                {/* PLAN 2 (FEATURED) */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between space-y-6 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Most Popular
                  </span>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Advocate Consultation
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Senior Counsel Review
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹4,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recommended for NRIs with ancestral farmlands, business owners in Katra Ahluwalia, or families with multiple heirs.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior High Court Counsel call</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>NRI cross-border &amp; Jamabandi clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Life-interest &amp; minor guardianship</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>NGDRS appointment filing guidance</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-xl bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-colors text-center cursor-pointer block shadow-sm shadow-[#C65378]/25"
                  >
                    Get Senior Counsel Review
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Complete Registry
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Amritsar SRO Assistance
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500">/ one-time</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Comprehensive end-to-end service including physical advocate accompaniment at Amritsar SRO or Section 31 home visits.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physical accompaniment at SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Complete NGDRS slot &amp; challan management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Book III certified copy retrieval</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-xl bg-slate-100 text-slate-900 font-bold text-xs hover:bg-slate-200 transition-colors text-center cursor-pointer block"
                  >
                    Select Complete Registry
                  </a>
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Amritsar Will Services
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Essential legal answers regarding Will drafting, Punjab registration, probate non-mandatory status, and NRI succession:
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
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-extrabold text-sm sm:text-base text-slate-900">
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
                  <span>AUTHORITATIVE STATUTES &amp; CODES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Provisions: Governing Succession in Punjab
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Every Will drafted by our legal team is constructed strictly in accordance with Indian testamentary jurisprudence and Punjab State land codes:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">
                    The Indian Succession Act, 1925 (Act No. 39 of 1925)
                  </span>
                  <p>
                    Sections 59 (testamentary capacity), 63 (execution &amp; attestation), 67 (void bequests to witnesses), 70 (revocation), 213 &amp; 57 (presidency town probate limitations confirming non-mandatory status in Punjab).
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    The Registration Act, 1908 (Act No. 16 of 1908)
                  </span>
                  <p>
                    Sections 18(e) (optional registration of Wills), 31 (registration at private residence in special cases), 32 (persons to present documents), 40 (persons entitled to present Wills), 51 (Book III registry custody).
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    The Punjab Land Revenue Act, 1887 (Act No. 17 of 1887)
                  </span>
                  <p>
                    Section 34 (making of that part of annual record which relates to landowners, Inteqal mutation entries by Halqa Patwari based on registered testament).
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    The Bharatiya Sakshya Adhiniyam, 2023 (BSA 2023)
                  </span>
                  <p>
                    Section 68 read with Section 114 (proof of execution of document required by law to be attested; judicial presumption of registered documents).
                  </p>
                </div>
              </div>
            </section>

            {/* FINAL CTA BANNER */}
            <section className="rounded-3xl bg-[#172228] text-white p-8 sm:p-12 text-center space-y-5 border border-white/10 shadow-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-rose-200 border border-white/15">
                <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                Amritsar Estate Planning Desk
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Protect Your Amritsar Properties &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Amritsar plots, commercial assets, or ancestral farmlands to administrative gridlock and disputes. Draft a legally binding Will online today or consult our senior Punjab &amp; Haryana High Court advocates.
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
                Visual Blueprint: Amritsar Will Drafting &amp; Property Succession Framework
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
                src="/images/will-drafting-in-amritsar.jpg"
                alt="High Resolution Visual Blueprint: Amritsar Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Amritsar SRO Registered &amp; ADA Mutation Compliant</span>
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
