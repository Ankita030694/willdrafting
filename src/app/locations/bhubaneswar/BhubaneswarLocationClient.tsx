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
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "bhubaneswar-overview", label: "OVERVIEW" },
  { id: "bhubaneswar-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "bhubaneswar-probate-guidance", label: "PROBATE & HIGH COURT" },
  { id: "bhubaneswar-sro-directory", label: "SRO DIRECTORY" },
  { id: "bhubaneswar-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-bhubaneswar-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "bhubaneswar-property-types", label: "PROPERTY TYPES" },
  { id: "bhubaneswar-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const BHUBANESWAR_DISTRICTS = [
  {
    id: "bhubaneswar-dsr",
    name: "Bhubaneswar Sadar / DSR (Unit-2 & Capital Area)",
    sro: "District Sub-Registrar (DSR) Office Bhubaneswar",
    address: "Near Capital Hospital & District Treasury, Unit-2, Ashok Nagar, Bhubaneswar - 751009",
    areas: "Ashok Nagar, Unit 1 to Unit 9, Bapuji Nagar, Forest Park, Master Canteen, Saheed Nagar, Satya Nagar, Kharavela Nagar, Raj Bhavan area, Surya Nagar",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat / Govt Holidays closed)",
  },
  {
    id: "bhubaneswar-sro-2",
    name: "Bhubaneswar-II / Khandagiri (South-West)",
    sro: "Sub-Registrar Office Bhubaneswar-II (Khandagiri)",
    address: "Near Khandagiri Square, NH-16 Link Road, Baramunda / Khandagiri, Bhubaneswar - 751030",
    areas: "Khandagiri, Baramunda, Pokhariput, Jagamara, Dumduma, Ghatikia, AIIMS Nagar, Kalinga Nagar, Sundarpada, Bharatpur, Aiginia",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat / Govt Holidays closed)",
  },
  {
    id: "chandaka-patia",
    name: "Chandaka & Patia IT Corridor (North)",
    sro: "Sub-Registrar Office Chandaka / Patia",
    address: "Near Infocity Square & KIIT Road, Chandaka / Patia, Bhubaneswar - 751024",
    areas: "Patia, Infocity, Chandrasekharpur, Sailashree Vihar, Niladri Vihar, Kalarahanga, Raghunathpur, KIIT campus, Infovalley link, Mancheswar",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat / Govt Holidays closed)",
  },
  {
    id: "balianta-pahal",
    name: "Balianta & Pahala (East Cuttack Corridor)",
    sro: "Sub-Registrar Office Balianta",
    address: "Near Balianta Block Office, Pahal NH-16 Bypass, Balianta, Bhubaneswar - 752101",
    areas: "Pahala, Hanspal, Rasulgarh, Jharpada, Bomikhal, Laxmisagar, Balianta, Kuakhai river belt, Cuttack-Puri bypass corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat / Govt Holidays closed)",
  },
  {
    id: "jatni-infovalley",
    name: "Jatni & Info Valley (South-West / IIT Hub)",
    sro: "Sub-Registrar Office Jatni",
    address: "Tehsil Administrative Complex, Main Road, Jatni, Khordha District - 752050",
    areas: "Jatni Town, Info Valley (TCS & Infosys II), IIT Bhubaneswar campus, NISER corridor, Retang, Madanpur, Khurda Road Junction",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat / Govt Holidays closed)",
  },
  {
    id: "pipili-dhauli",
    name: "Pipili & Dhauli Corridor (South Puri Road)",
    sro: "Sub-Registrar Office Pipili / Uttara",
    address: "Near Toll Gate / Block Complex, Old Cuttack-Puri Road, Pipili - 752104",
    areas: "Uttara, Dhauli Shanti Stupa foothills, Daya river corridor, Sisupalgarh, Lingipur, Samantarapur, Pipili applique cluster, Puri highway zone",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat / Govt Holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Final Will",
    detail: "Printed on clean white A4 paper. No non-judicial stamp paper is required under Odisha stamp laws.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Required for biometric fingerprint authentication and web-camera photography at the Bhubaneswar SRO.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Photo IDs",
    detail: "Both witnesses must carry original photo IDs and must not be beneficiaries receiving property in the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Certificate (For Seniors)",
    detail: "Issued by an MBBS doctor. Confirms sound testamentary capacity and protects against incapacity disputes.",
    checked: false,
  },
  {
    id: "item-5",
    label: "IGR Odisha e-Registration Slot Booking Slip",
    detail: "Online booking confirmation from igrodisha.gov.in displaying your application token and time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "BDA / GA Lease Deed, ROR (Patta) & Tax Receipt",
    detail: "Copies verifying BDA allotment, GA lease deed, Bhulekh Odisha RoR, and BMC holding tax payment receipts.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs Each",
    detail: "Recent color photographs of the testator and both witnesses for pasting into the official Book III registers.",
    checked: false,
  },
];

export default function BhubaneswarLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("bhubaneswar-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("bhubaneswar-dsr");
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

  const filteredDistricts = BHUBANESWAR_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    BHUBANESWAR_DISTRICTS.find((d) => d.id === selectedDistrict) || BHUBANESWAR_DISTRICTS[0];

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
                <span>BHUBANESWAR &amp; ODISHA ESTATE PLANNING DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 58 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Bhubaneswar: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your family with an advocate-drafted Will tailored for Bhubaneswar properties.
                Secure your BDA plots, GA Department leasehold flats, freehold ancestral lands, and bank investments under Odisha succession laws.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all text-center shadow-lg shadow-[#C65378]/25 cursor-pointer"
                >
                  Draft Your Bhubaneswar Will Online
                </Link>
                <a
                  href="#bhubaneswar-sro-directory"
                  className="px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all text-center border border-white/20 cursor-pointer"
                >
                  View Bhubaneswar SRO Directory
                </a>
              </div>

              {/* 3-ITEM TRUST BAR */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/15 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Odisha Stamp Duty Exempt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 16:9 IMAGE WITH LIGHTBOX MODAL (5 COLS) */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative aspect-16/9 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl cursor-pointer group bg-slate-900"
              >
                <Image
                  src="/images/will-drafting-in-bhubaneswar.jpg"
                  alt="Will Drafting in Bhubaneswar: Plan Today, Protect Your Family, Preserve Your Legacy"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="font-semibold truncate">Bhubaneswar Estate Succession Architecture</span>
                  <span className="text-[10px] text-rose-300 font-bold shrink-0">Click to expand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY STATS STRIP
          ========================================================================= */}
      <section className="bg-[#FAF7F0] border-b border-[#172228]/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-0 text-center">
            {/* Stat 1 */}
            <div className="bg-white/80 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                6 SRO Hubs
              </span>
              <span className="text-[10px] min-[390px]:text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 leading-tight">
                DSR Unit-2 &amp; Khandagiri
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/80 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#C65378] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[10px] min-[390px]:text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 leading-tight">
                Odisha Stamp Rules
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/80 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Probate Optional
              </span>
              <span className="text-[10px] min-[390px]:text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 leading-tight">
                Section 213 (Non-Presidency)
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/80 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-emerald-700 tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[10px] min-[390px]:text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 leading-tight">
                Doorstep Senior Visits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STICKY MOBILE TOC DROPDOWN
          ========================================================================= */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#172228]/10 px-4 py-3">
        <button
          onClick={() => setMobileTocOpen(!mobileTocOpen)}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-900 bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-xs"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#C65378]" />
            <span className="truncate">Jump to: {currentActiveToc?.label}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-600 transition-transform ${
              mobileTocOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {mobileTocOpen && (
          <div className="mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-2 max-h-72 overflow-y-auto space-y-1">
            {TOC_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileTocOpen(false)}
                className={`block px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeId === item.id
                    ? "bg-[#C65378] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT GRID WITH STICKY SIDEBAR
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* DESKTOP STICKY SIDEBAR */}
          <aside className="hidden lg:block w-64 lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="px-3 py-2 text-[11px] font-black tracking-widest uppercase text-slate-400">
                NAVIGATION CONTENTS
              </div>
              <nav className="space-y-1 border-l-2 border-slate-200">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 pl-4 text-xs font-mono uppercase tracking-wider transition-all relative ${
                        isActive
                          ? "text-[#C65378] font-bold"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-[#C65378]" />
                      )}
                      <span className="truncate block">{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* MAIN EDITORIAL CONTENT AREA */}
          <main className="min-w-0 flex-1 space-y-16">
            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="bhubaneswar-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>BHUBANESWAR SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Probate in Bhubaneswar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional in Bhubaneswar under Section 18(e) of the Registration Act, 1908. An unregistered Will on plain white paper is legally valid if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No Mandatory Probate</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Probate is not mandatory in Odisha under Section 213 of the Indian Succession Act. Beneficiaries can mutate BDA, GA Department, and private freehold lands directly before municipal and revenue authorities.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills attract zero ad valorem stamp duty across Odisha. At the Sub-Registrar Office, testators pay only a flat nominal registration fee of ₹100 plus standard scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Doorstep Senior Visits</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 31 of the Registration Act, senior citizens or unwell testators can request the Bhubaneswar Sub-Registrar to conduct biometric registration directly at their home or hospital.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="bhubaneswar-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FOUNDATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework for Will Drafting in Bhubaneswar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Making a Will in Bhubaneswar is governed by the Indian Succession Act, 1925, and the Registration Act, 1908.
                  Whether you reside in Nayapalli, own a BDA residential plot in Patia, or hold ancestral farmland in Khordha, your testamentary instrument must meet strict statutory rules to remain enforceable.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-base">
                    59
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">Testamentary Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 59, any person of sound mind who is not a minor can make a Will. For elderly testators in Bhubaneswar, securing an MBBS doctor fitness certificate prevents testamentary incapacity challenges.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-base">
                    63
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">Valid Execution &amp; Attestation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 63 mandates that the testator must sign or affix their mark to the Will in the presence of at least two independent adult witnesses. Each witness must sign in the testator&apos;s physical presence.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-base">
                    67
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">Witness Disqualification</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 67, an attesting witness cannot be a beneficiary under the Will. If a beneficiary or their spouse signs as an attesting witness, the bequest to that person becomes completely void.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Important Rule for Bhubaneswar Property Owners:</strong> A Will only applies to your self-acquired assets and your defined separate share in ancestral property. You cannot bequeath an undivided coparcenary interest without proper partition under the Hindu Succession Act, 1956.
                </p>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION PERSPECTIVE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Compulsory in Bhubaneswar?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is optional throughout Odisha. An unregistered Will drafted on standard paper is legally binding if signed before two witnesses.
                  However, registering your Will at the local Sub-Registrar Office provides undeniable evidentiary advantages.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-900 font-extrabold">
                        <th className="p-4 sm:p-5">Legal Metric</th>
                        <th className="p-4 sm:p-5 text-emerald-800 bg-emerald-50/60">Registered Will (Odisha SRO)</th>
                        <th className="p-4 sm:p-5 text-slate-600">Unregistered Will (White Paper)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="p-4 sm:p-5 font-bold text-slate-900">Statutory Presumption</td>
                        <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                          Strong presumption of genuine execution under Sections 58 &amp; 60 of the Registration Act.
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600">
                          Carries no statutory presumption; propounder must prove authenticity if contested.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 sm:p-5 font-bold text-slate-900">Government Archival</td>
                        <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                          Stored permanently in government Book III registers at the Bhubaneswar Sub-Registrar Office.
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600">
                          Risk of physical loss, theft, mutilation, or suppression by dissatisfied relatives.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 sm:p-5 font-bold text-slate-900">BDA &amp; GA Mutation</td>
                        <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                          Smoothly processed by BDA and GA Department after standard 30-day public notice.
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600">
                          Frequent objections by legal heirs; authorities may demand court succession orders.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 sm:p-5 font-bold text-slate-900">Tamper &amp; Coercion Defense</td>
                        <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                          Biometric thumbprints and digital web-camera photos confirm voluntary presence.
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600">
                          Vulnerable to allegations of forgery, undue influence, or backdated signing.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 sm:p-5 font-bold text-slate-900">Government Cost</td>
                        <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                          Nominal ₹100 registration fee plus ₹100-₹200 user charges; zero stamp duty.
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600">
                          Zero registration fee; however, defending it in court can cost lakhs.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE & HIGH COURT */}
            <section id="bhubaneswar-probate-guidance" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PROCEEDING RULES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Orissa High Court Probate Rules: Section 213
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Many Bhubaneswar property owners mistakenly believe that every Will must undergo probate in court before property can be transferred.
                  Understanding the legal distinction between presidency and non-presidency jurisdictions saves significant time and legal expenses.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Why Probate is Not Mandatory in Bhubaneswar
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, probate is mandatory only for Wills executed by Hindus, Buddhists, Sikhs, or Jains within the historical Presidency towns of Bombay, Calcutta, and Madras, or where immovable property falls within those municipal boundaries.
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    The Orissa High Court has affirmed in multiple landmark rulings that probate is optional for properties situated in Bhubaneswar, Cuttack, and throughout Odisha.
                    Beneficiaries can initiate property mutation before the Tahsildar, BDA, or BMC immediately upon presenting the registered Will and death certificate.
                  </p>
                </div>

                <div className="border-t border-slate-200/80 pt-5 space-y-3">
                  <h3 className="text-base font-extrabold text-slate-900">
                    When is Probate or Letters of Administration Recommended in Odisha?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span>
                        <strong>Disputed Wills:</strong> When legal heirs challenge the authenticity of the Will or claim unequal distribution.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span>
                        <strong>Multi-City Estate:</strong> When the testator owned additional real estate in Mumbai, Kolkata, or Chennai requiring mandatory probate.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span>
                        <strong>Institutional Demands:</strong> When major public sector banks, mutual funds, or corporate registries require court orders before releasing high-value assets.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span>
                        <strong>No Named Executor:</strong> When a Will does not name an executor, heirs apply for Letters of Administration with Will Annexed before the District Judge, Khordha.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="bhubaneswar-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Bhubaneswar Sub-Registrar Directory &amp; SROs
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration across Bhubaneswar is administered by the Directorate of Registration, Revenue and Disaster Management Department, Government of Odisha.
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
                      placeholder="Search locality (e.g. Patia, Nayapalli, Khandagiri)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {BHUBANESWAR_DISTRICTS.length} Key Jurisdictions
                  </span>
                </div>

                {/* DISTRICT PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {filteredDistricts.map((d, index) => {
                    const isSelected = selectedDistrict === d.id;
                    const isLastOdd =
                      filteredDistricts.length % 2 !== 0 && index === filteredDistricts.length - 1;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDistrict(d.id)}
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                          isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                        } ${
                          isSelected
                            ? "bg-[#C65378] text-white shadow-xs ring-2 ring-[#C65378]/25"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                        }`}
                      >
                        {d.name}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE DISTRICT DETAILS BENTO */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/70 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block">
                        {activeDistrictData.name}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeDistrictData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Register Operational
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Location &amp; Landmark:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Operational Timings:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.timings}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1 pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-900 block">Key Localities Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.areas}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: AREA COVERAGE */}
            <section id="bhubaneswar-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services in Bhubaneswar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Bhubaneswar features distinct property markets ranging from government-planned GA leasehold sectors and BDA plotted developments to high-rise IT corridor apartments.
                  Our senior Odisha estate advocates provide customized legal drafting, IGR Odisha e-Registration appointment scheduling, and Sub-Registrar accompaniment across all key micro-markets:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: PATIA & INFOCITY CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North IT Corridor / Tech Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Chandaka / Patia
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Patia &amp; Infocity Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Patia</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Infocity</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chandrasekharpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sailashree Vihar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">KIIT Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Patia</strong> and Infocity for tech professionals, NRI families, and high-rise apartment owners in projects like DLF Cybercity, Tata Ariyana, and Falcon Crest. Seamlessly codifies multi-story apartment shares, equity portfolios, overseas NRE accounts, and digital assets with clear dispute-free succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Chandaka / Patia (Near Infocity Square)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online e-Registration booking on igrodisha.gov.in, advocate biometric assistance, and Section 31 doorstep execution for elderly testators.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Patia"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Patia Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: NAYAPALLI & JAYADEV VIHAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Prime Central / BDA Estates
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Bhubaneswar &amp; SRO 2
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Nayapalli &amp; Jayadev Vihar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nayapalli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jayadev Vihar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">IRC Village</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">CRPF Square</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ekamra Kanan</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Nayapalli</strong> and Jayadev Vihar for premium BDA plotted bungalows, independent floors, and commercial complexes. Incorporates floor-wise property partition clauses, doctor mental capacity certificates for seniors, and life-interest provisions ensuring surviving spouses retain uninterrupted residential rights.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DSR Unit-2 &amp; SRO Khandagiri</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        BDA mutation compliance, expedited Book III registration, and private advocate verification for high-net-worth family estates.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">BDA Plots &amp; Commercial</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nayapalli"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nayapalli Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: SAHEED NAGAR & SATYA NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage Business &amp; GA Leases
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Bhubaneswar (Unit-2)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Saheed Nagar &amp; Satya Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saheed Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Satya Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kharavela Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bapuji Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Unit 1-9</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Saheed Nagar</strong> and central capital zones for legacy General Administration (GA) Department 90-year leasehold plots, commercial showrooms, and multi-generational business firms. Details GA lease renewal rights, conversion to freehold status under Odisha land policies, and partnership asset transmission to avert probate delays.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Sub-Registrar Unit-2 (Ashok Nagar)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Specialized GA leasehold transfer documentation, treasury e-Challan handling, and legal heir succession mapping.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">GA Leasehold &amp; Commercial</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Saheed Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Saheed Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: KHANDAGIRI, POKHARIPUT & JAGAMARA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South-West Residential Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bhubaneswar-II (Khandagiri)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Khandagiri &amp; Pokhariput
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Khandagiri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pokhariput</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jagamara</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Baramunda</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">AIIMS Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in Khandagiri</strong> and Pokhariput for retired civil servants, defense veterans, and healthcare professionals in Pokhariput, Jagamara, and Khandagiri duplex colonies. Enforces clean partition among non-resident adult children, bank locker bequests, and medical fitness verification under Section 59 of the Indian Succession Act.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Khandagiri Square (Near NH-16)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Senior citizen priority biometric capture, doorstep hospital/home visits under Section 31, and verified Book III archival.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Khandagiri"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Khandagiri Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: OLD TOWN, LINGARAJ & FOREST PARK */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Historic Core &amp; Ancestral Holdings
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        DSR Bhubaneswar (Ashok Nagar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Old Town &amp; Forest Park
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Old Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Forest Park</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lingaraj Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ashok Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Raj Bhavan</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Old Town</strong> and Forest Park for historic family residences, ancestral properties, and trust-endowed holdings in Old Town and Forest Park. Strictly segregates personal self-acquired assets from coparcenary Hindu joint family estates, preventing long-drawn title objections before civil courts and revenue Tahsils.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DSR Unit-2 (Capital Hospital Road)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Ancestral land title vetting, Bhulekh Odisha RoR verification, and conclusive Book III registration under Section 60.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Ancestral &amp; Freehold Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Old Town"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Old Town Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: PAHALA, HANSPAL & BALIANTA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        NH-16 Twin-City Expansion Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Balianta (Pahal Bypass)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Pahala, Hanspal &amp; Balianta
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pahala</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hanspal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Balianta</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rasulgarh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kuakhai Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Pahala</strong> and Hanspal for newly developed residential townships, gated villa colonies, and commercial godowns along the Bhubaneswar-Cuttack NH-16 corridor. Coordinates smooth Bhulekh Odisha e-Mutation, BMC municipal holding updates, and clear bequests of agricultural or converted homestead plots.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Balianta Block Office (NH-16 Bypass)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        e-Token registration, Tahsil land record matching, and advocate accompaniment for hassle-free execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Freehold &amp; Plotted Layouts</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Pahala"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Pahala Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-bhubaneswar-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>SYSTEMATIC PROCEDURE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Registration in Odisha
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering your Will in Bhubaneswar follows a streamlined protocol under the Directorate of Registration, Government of Odisha.
                  Follow these five statutory steps to ensure your Will is registered flawlessly.
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                    01
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      Step 1: Inventory Assets &amp; Appoint Trusted Executor
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile an exhaustive schedule of all immovable and movable assets.
                      Include BDA allotment details, GA lease numbers, Bhulekh Odisha Khata/Plot numbers, bank accounts, and demat folios.
                      Nominate a trustworthy executor who will carry out your bequests impartially.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                    02
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      Step 2: Draft Will with High Court Advocate Vetting
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft your Will incorporating statutory revocation of past testaments, specific bequests, survivorship clauses, and residuary clauses.
                      Our senior Odisha advocates ensure the draft is completely unambiguous to prevent future misinterpretations.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                    03
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      Step 3: Execute Before Two Independent Adult Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the final document on clean white A4 sheets.
                      The testator signs or places their thumb impression on each page in the simultaneous presence of two independent adult witnesses who are not beneficiaries.
                      For senior testators, obtain a doctor&apos;s fitness certificate on the execution date.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                    04
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      Step 4: Book Appointment on IGR Odisha Portal
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Access the IGR Odisha portal (igrodisha.gov.in).
                      Navigate to the e-Registration module, input testator and witness identification details, upload deed drafts, and schedule an e-Token appointment slot.
                      Pay the nominal ₹100 registration fee via the Odisha Treasury e-Challan gateway.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                    05
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      Step 5: Attend SRO for Biometric Verification
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office with both witnesses carrying original Aadhaar cards and PAN cards.
                      The registering officer verifies identities, captures digital photographs and biometric thumb impressions, and issues the official Book III registration endorsement.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: DOORSTEP REGISTRATION */}
            <section id="doorstep-home-registration" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>SPECIAL CITIZEN PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Doorstep Will Registration for Senior Citizens
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly citizens, bedridden individuals, or hospital patients in Bhubaneswar, visiting a crowded government office can be stressful or physically impossible.
                  The Registration Act provides an official legal remedy.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <div className="space-y-3">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Section 31 Commission Visit by Sub-Registrar
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Under Section 31 of the Registration Act, 1908, the Sub-Registrar is legally empowered to attend the private residence, nursing home, or hospital of a testator to complete document registration.
                    This statutory accommodation ensures full legal validity without requiring the testator to travel.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-black uppercase text-[#C65378] tracking-wider block">
                      Requirement 1
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Medical Certificate</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered MBBS practitioner must certify that the testator is physically unable to travel to the Sub-Registrar Office while possessing full mental clarity.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-black uppercase text-[#C65378] tracking-wider block">
                      Requirement 2
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Formal Requisition</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submit a written application to the jurisdictional Bhubaneswar Sub-Registrar specifying the residential address and requesting a commission visit.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-black uppercase text-[#C65378] tracking-wider block">
                      Requirement 3
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Commission Fee</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deposit the prescribed government commission travel fee (typically ₹500 to ₹1,000 depending on distance) through the official government treasury portal.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                  During the doorstep visit, the Sub-Registrar brings portable biometric fingerprint scanners and digital cameras.
                  Both attesting witnesses must be physically present at the residence with their original photo identity cards to complete the registration.
                </p>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>PREPARATION CHECKLIST</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Checklist for Will Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Keep these necessary documents organized before scheduling your appointment at the Bhubaneswar Sub-Registrar Office.
                  Use this interactive checklist to verify your preparation.
                </p>
              </div>

              {/* INTERACTIVE CHECKLIST WIDGET */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      DOCUMENT READINESS
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {checkedCount} of {checklist.length} Documents Ready
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    {Math.round((checkedCount / checklist.length) * 100)}% Complete
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#C65378] transition-all duration-300"
                    style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                  />
                </div>

                {/* Items */}
                <div className="space-y-3 pt-2">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200/80"
                          : "bg-slate-50/60 border-slate-200/70 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES & REAL ESTATE */}
            <section id="bhubaneswar-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>BHUBANESWAR LAND TENURES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Bhubaneswar Real Estate: BDA Plots &amp; GA Leases
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Bhubaneswar is unique among Indian state capitals due to its complex mix of General Administration (GA) leasehold lands, Bhubaneswar Development Authority (BDA) allotments, and private freehold plots.
                  Each category requires specific testamentary drafting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C65378] bg-rose-50 px-2.5 py-1 rounded-lg">
                    <Building className="w-3.5 h-3.5" />
                    <span>GA Department Leases</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    General Administration (GA) Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Most residential lands in Units 1 to 9, Saheed Nagar, and Surya Nagar were originally allotted on 90-year or 99-year leases by the GA Department, Government of Odisha.
                    A Will must explicitly reference the original lease deed, lease renewal entitlements, and conversion rights to freehold status under the state&apos;s freehold conversion policy.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C65378] bg-rose-50 px-2.5 py-1 rounded-lg">
                    <Home className="w-3.5 h-3.5" />
                    <span>BDA Housing &amp; Sites</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Bhubaneswar Development Authority Sites
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    BDA plotted developments in Chandrasekharpur, Pokhariput, Kalinga Nagar, and Jayadev Vihar require succession mutation before BDA.
                    A registered Will with accurate allotment letter numbers and NOC prerequisites allows seamless transfer of leasehold or freehold title without civil court suits.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C65378] bg-rose-50 px-2.5 py-1 rounded-lg">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Freehold Farmland &amp; RoR</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Bhulekh Odisha Record of Rights (RoR)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Freehold lands across Balianta, Pahala, Jatni, and Khordha require mutation in the state Bhulekh portal.
                    Clearly itemizing the Khata number, Plot number, Mouza, and Tahsil details ensures the Tahsildar completes e-Mutation under the Odisha Land Reforms Act without title objections.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C65378] bg-rose-50 px-2.5 py-1 rounded-lg">
                    <FileText className="w-3.5 h-3.5" />
                    <span>BMC Municipal Properties</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    BMC Holding Tax &amp; Apartment Shares
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For high-rise apartments and commercial establishments in Patia and Nayapalli, the Bhubaneswar Municipal Corporation (BMC) assesses property holding tax.
                    The Will should instruct the executor to mutate the municipal holding assessment and update apartment society membership records immediately upon demise.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="bhubaneswar-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT TARIFF STRUCTURE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Stamp Duty &amp; Registration Fees: Odisha
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property sale deeds or gift deeds that attract substantial percentage-based stamp duties, registering a Will in Odisha is completely exempt from ad valorem stamp duty.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 font-bold uppercase block mb-1">
                      Stamp Duty
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-700">₹0</span>
                    <span className="text-xs text-slate-600 block mt-1">Exempt under Stamp Act</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 font-bold uppercase block mb-1">
                      Registration Fee
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900">₹100</span>
                    <span className="text-xs text-slate-600 block mt-1">Flat nominal SRO fee</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 font-bold uppercase block mb-1">
                      Scanning Charges
                    </span>
                    <span className="text-2xl font-extrabold text-[#C65378]">₹100 - ₹200</span>
                    <span className="text-xs text-slate-600 block mt-1">Government user fees</span>
                  </div>
                </div>

                <div className="border-t border-slate-200/80 pt-5 space-y-3">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Comparison: Will vs Gift Deed for Bhubaneswar Property
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Executing a Gift Deed in Odisha requires paying 5% stamp duty plus a 2% registration fee based on the prevailing benchmark valuation of the property.
                    For a property valued at ₹1 crore in Patia or Nayapalli, a Gift Deed costs approximately ₹7,00,000 in government charges alone.
                    In contrast, transferring the exact same property through a registered Will costs merely ₹200 to ₹300 in official government fees.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT SERVICE PACKAGES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the right estate planning plan for your family. We offer transparent, flat-fee pricing with zero hidden costs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plan 1 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase text-[#C65378] tracking-wider block">
                      BASIC PLAN
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">Online Will Drafting</h3>
                    <div className="text-3xl font-extrabold text-slate-900">₹1,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for individuals with straightforward estates seeking a legally valid, lawyer-verified Will format.
                    </p>
                    <ul className="space-y-2 pt-2 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive online questionnaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom bequests &amp; executor appointment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer verification within 24 hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Ready-to-print execution copy</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all text-center cursor-pointer"
                  >
                    Start Online Draft
                  </Link>
                </div>

                {/* Plan 2: FEATURED */}
                <div className="bg-white rounded-3xl border-2 border-[#C65378] p-6 shadow-xl relative flex flex-col justify-between space-y-5">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase text-[#C65378] tracking-wider block">
                      EXPERT CONSULT
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">Advocate Consultation</h3>
                    <div className="text-3xl font-extrabold text-[#C65378]">₹4,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Tailored for families with BDA plots, GA leases, commercial properties, or multi-heir distribution needs.
                    </p>
                    <ul className="space-y-2 pt-2 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Online Drafting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Odisha Advocate video call</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>BDA, GA &amp; business asset clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Dispute-prevention &amp; life-interest clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Doctor fitness certificate format</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full py-3 rounded-full bg-[#C65378] text-white font-bold text-xs sm:text-sm hover:bg-[#a13c5d] transition-all text-center cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Book Advocate Call
                  </Link>
                </div>

                {/* Plan 3 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase text-[#C65378] tracking-wider block">
                      FULL CONCIERGE
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">SRO Registration Concierge</h3>
                    <div className="text-3xl font-extrabold text-slate-900">₹9,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete end-to-end guidance including advocate drafting, IGR Odisha slot booking, and SRO assistance.
                    </p>
                    <ul className="space-y-2 pt-2 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Advocate Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>IGR Odisha token &amp; e-Challan handling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Local advocate accompaniment at SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit assistance</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all text-center cursor-pointer"
                  >
                    Select Registration Plan
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>ANSWERS TO KEY QUESTIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Bhubaneswar Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear, authoritative answers to common legal inquiries regarding Will drafting, SRO registration, and property succession in Bhubaneswar.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY REFS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileQuestion className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL PROVISIONS &amp; PORTAL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory References &amp; Odisha IGR Portal
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  All Will drafting and registration protocols in Bhubaneswar operate under established Indian statutes and Odisha state departmental guidelines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 63, 67, and Section 213 read with Section 57 (Probate Jurisdiction).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Registration Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional Registration) and Section 31 (Doorstep Commission Visits).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Odisha IGR e-Registration
                  </span>
                  <p className="text-xs text-slate-600">
                    Official registration portal: <code>igrodisha.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Orissa High Court Precedents
                  </span>
                  <p className="text-xs text-slate-600">
                    Settled judicial rulings establishing probate exemption for non-presidency Odisha cities.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Bhubaneswar Properties &amp; Family Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Ensure your BDA plots, GA Department leasehold flats, and financial investments transition seamlessly to your loved ones.
                Draft a legally sound Will online or consult our experienced Odisha estate planning advocates today.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all cursor-pointer shadow-lg shadow-[#C65378]/25"
                >
                  Start Your Will Online Now
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all border border-white/20"
                >
                  Book Lawyer Consultation
                </Link>
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
                Visual Blueprint: Bhubaneswar Estate Succession &amp; Will Registration Architecture
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative flex-1 min-h-[400px] md:min-h-[550px] w-full mt-3 bg-[#172228] rounded-2xl overflow-hidden">
              <Image
                src="/images/will-drafting-in-bhubaneswar.jpg"
                alt="High Resolution Visual: Will Drafting in Bhubaneswar with Lingaraj Temple Landmark"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
