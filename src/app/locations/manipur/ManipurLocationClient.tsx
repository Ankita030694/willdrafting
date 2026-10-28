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
  Scroll,
  Layers,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "manipur-overview", label: "OVERVIEW" },
  { id: "manipur-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "valley-vs-hill-succession", label: "VALLEY & HILL LAWS" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "manipur-probate-rules", label: "PROBATE RULES" },
  { id: "manipur-sro-directory", label: "SRO DIRECTORY" },
  { id: "manipur-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-manipur-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "manipur-property-types", label: "PROPERTY TYPES" },
  { id: "manipur-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const MANIPUR_SRO_HUBS = [
  {
    id: "imphal-west",
    name: "Imphal West (Lamphelpat)",
    sro: "SRO Imphal West (DC Office Complex)",
    address: "Deputy Commissioner Office Complex, Lamphelpat, Imphal West - 795004",
    areas: "Lamphelpat, Uripok, Sagolband, Keishamthong, Singjamei, Thangmeiband, Patsoi, Wangoi, Lamsang",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "imphal-east",
    name: "Imphal East (Porompat)",
    sro: "SRO Imphal East (DC Office Complex)",
    address: "Deputy Commissioner Office Complex, Porompat, Imphal East - 795005",
    areas: "Porompat, Palace Compound, Wangkhei, Khurai, Heingang, Ayangpalli, Lamlong, Sawombung, Andro",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "thoubal-kakching",
    name: "Thoubal & Kakching Hub",
    sro: "SRO Thoubal & Kakching Registration Circle",
    address: "Mini Secretariat Complex, Thoubal Bazar, Thoubal - 795138",
    areas: "Thoubal Bazar, Wangjing, Yairipok, Lilong, Kakching Bazar, Sugnu, Heirok, Waikhong",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "bishnupur-moirang",
    name: "Bishnupur & Moirang Hub",
    sro: "SRO Bishnupur (Loktak Lake Basin)",
    address: "Mini Secretariat Complex, Bishnupur Town - 795126",
    areas: "Bishnupur, Moirang, Nambol, Ningthoukhong, Oinam, Kumbi, Thanga (Loktak Lake Belt)",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "churachandpur-lamka",
    name: "Churachandpur (Tuibong / Lamka)",
    sro: "SRO Churachandpur District",
    address: "Deputy Commissioner Complex, Tuibong, Churachandpur - 795128",
    areas: "Tuibong, Lamka Town, Rengkai, Tedim Road, Hill Town, Bungmual, Singngat, New Lamka",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "ukhrul-hunphun",
    name: "Ukhrul (Hunphun)",
    sro: "SRO Ukhrul District",
    address: "Mini Secretariat Complex, Viewland, Ukhrul - 795142",
    areas: "Ukhrul Town, Hunphun, Viewland, Phungyar, Kamjong Road, Kharasom, Chingai",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "senapati-kangpokpi",
    name: "Senapati & Kangpokpi Hub",
    sro: "SRO Senapati District",
    address: "DC Office Complex, Senapati Town - 795106",
    areas: "Senapati Town, Maram, Mao, Kangpokpi Bazar, Motbung, Saitu Gamphazol, Karong",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "jiribam-western",
    name: "Jiribam Western Gateway",
    sro: "SRO Jiribam Sub-Division",
    address: "DC / Sub-Divisional Complex, Babupara, Jiribam - 795116",
    areas: "Jiribam Town, Babupara, Borobekra, Uchathol, Gularthol, Western Border Commercial Corridor",
    timings: "10:00 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on clean, durable white A4 paper. Stamp paper is not required under Manipur stamp law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Testator",
    detail: "Mandatory for identity verification, photograph capture, and thumbprint impression before the Sub-Registrar.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Photo IDs",
    detail: "Must carry original Aadhaar cards and must not be beneficiaries receiving any property under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (MBBS / MD)",
    detail: "Recommended for elderly testators. Confirms testamentary mental clarity, memory, and sound disposition.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Land Records (Patta / Jamabandi / Dag Numbers)",
    detail: "Recent Jamabandi copy from Loucha Pathap portal verifying clear title and Dag numbers across valley districts.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Passport Size Photographs of Testator & Witnesses",
    detail: "Recent passport-sized color photos for official Book III registry registers and Sub-Registrar records.",
    checked: true,
  },
];

export default function ManipurLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedHub, setSelectedHub] = useState("imphal-west");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [activeId, setActiveId] = useState("manipur-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [showHighResModal, setShowHighResModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const item = TOC_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const filteredHubs = MANIPUR_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    MANIPUR_SRO_HUBS.find((h) => h.id === selectedHub) || MANIPUR_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (NASHIK THEME ARCHITECTURE)
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
                <span>MANIPUR &amp; NORTHEAST SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Starts with requested heading, Length 54 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Manipur: Property Succession
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally sound Will for your Imphal valley Patta land, residential homesteads (Ingkhol), urban commercial assets, and hill district self-acquired holdings. Get verified lawyer drafting, Section 158 MLR &amp; LR Act compliance, and Sub-Registrar registration assistance.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Manipur Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#manipur-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Manipur SRO Directory</span>
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
                  <span>₹0 Ad-Valorem Stamp Duty</span>
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
                  src="/images/will-drafting-in-manipur.jpg"
                  alt="Legal Will Drafting and Property Succession in Manipur"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Manipur Valley &amp; Hill Succession Blueprint
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
                8 District Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Valley &amp; Hill Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                No Ad-Valorem Duty on Wills
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Non-Presidency Exemption
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
              className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${mobileTocOpen ? "rotate-180 text-[#C65378]" : ""
                }`}
            />
          </button>

          {mobileTocOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-40 max-h-80 overflow-y-auto">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileTocOpen(false)}
                  className={`block px-4 py-2.5 text-xs font-bold transition-colors border-b border-slate-100 last:border-0 ${activeId === item.id
                    ? "bg-rose-50 text-[#C65378]"
                    : "text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTAINER: 2-COLUMN WITH STICKY SIDEBAR
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

          {/* DESKTOP STICKY SIDEBAR TABLE OF CONTENTS */}
          <aside className="w-64 shrink-0 hidden lg:block sticky top-28 space-y-4">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] pb-2 border-b border-slate-100">
                <Scroll className="w-4 h-4 text-[#C65378]" />
                <span>CONTENTS OUTLINE</span>
              </div>
              <nav className="space-y-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeId === item.id
                      ? "bg-rose-50 text-[#C65378] translate-x-1"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-5 space-y-3 shadow-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-300 block">
                LEGAL CONSULTATION
              </span>
              <div className="text-sm font-extrabold leading-snug">
                Need Assistance with Valley Pattas or Hill Land Wills?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our senior estate advocates for personalized guidance under Manipur land and succession laws.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors"
              >
                <span>Consult Legal Expert</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </aside>

          {/* MAIN EDITORIAL CONTENT AREA */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="manipur-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>MANIPUR ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Manipur
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional under Section 18(e) of the Registration Act, 1908. While an unregistered Will signed before two witnesses is legally valid, formal Book III SRO registration provides indisputable public proof against succession disputes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 213 of the Indian Succession Act, probate is mandatory solely in presidency towns. Manipur lies outside presidency limits. The High Court of Manipur confirms that court probate is non-mandatory for direct title mutation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Ad-Valorem Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills in Manipur do not attract percentage-based stamp duty on market property valuations. Testators only pay nominal Sub-Registrar registration and computerized scanning fees of ₹200 to ₹500 at the registry office.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Loucha Pathap Land Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will expedites Record of Rights (Jamabandi) mutation with Sub-Deputy Collectors (SDCs) and updates Dag/Patta records seamlessly on the official Loucha Pathap portal across Imphal, Thoubal, and Bishnupur.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="manipur-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Manipur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession planning and testamentary disposition in Manipur are guided by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Manipur Land Revenue and Land Reforms Act, 1960</strong>. Any adult of sound mind can legally bequeath self-acquired residential property, agricultural fields (Lou), homestead land (Ingkhol), and financial savings.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate planning in Manipur requires careful balance between codified revenue statutes in the valley districts and customary tribal traditions in the hill regions. Without an advocate-drafted Will, surviving family members often face prolonged administrative delay before revenue offices, civil courts, and local municipal desks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be a major aged 18 years or older with sound testamentary mental capacity (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Executed voluntarily without undue influence, coercion, fraudulent representations, or duress (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the physical presence of at least two independent adult attesting witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Non-Beneficiary</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Attesting witnesses and their spouses must not receive any legacy or property under the Will (Section 67).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: VALLEY VS HILL SUCCESSION */}
            <section id="valley-vs-hill-succession" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>JURISDICTIONAL DUALITY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Valley Land Deeds &amp; Hill Customary Succession
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Manipur has a distinct legal duality in land tenure and property succession between its central valley districts and autonomous hill districts. Understanding this distinction is vital to ensure your Will remains legally enforceable.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Valley Districts (MLR &amp; LR Act 1960)
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Imphal West, Imphal East, Thoubal, Kakching, Bishnupur
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Governed by the Manipur Land Revenue and Land Reforms Act, 1960. Landholders hold individual Patta rights recorded in the Jamabandi. Self-acquired Patta plots, residential homesteads (Ingkhol), and agricultural fields (Lou) can be bequeathed freely via a Will. However, under Section 158 of the Act, land belonging to a Scheduled Tribe person cannot be bequeathed to a non-tribal person.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Enables smooth digital mutation on the state Loucha Pathap portal</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold uppercase">
                    Hill Districts (Customary Law &amp; Article 371C)
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Churachandpur, Ukhrul, Senapati, Tamenglong, Chandel
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ancestral village lands are administered under customary tribal practices and Village Authorities. While ancestral clan lands often follow customary patrilineal rules, an individual possesses clear testamentary freedom under the Indian Succession Act to bequeath self-acquired town properties, residential buildings in district headquarters, bank accounts, and transport assets.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Protects self-acquired urban assets from customary family disputes</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: WILL REGISTRATION STATUS */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileQuestion className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION STATUS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Is Will Registration Mandatory in Manipur?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, the registration of a Will is strictly <strong>optional</strong>. A Will executed on standard white paper and signed in the presence of two witnesses is legally valid and admissible before judicial authorities in Manipur.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, with rising land values across Imphal, Porompat, and Greater Imphal corridors, legal professionals strongly recommend formal registration. An official Book III registration at your jurisdictional Sub-Registrar Office establishes high legal credibility and prevents claims of forged signatures or post-demise tampering.
                </p>
              </div>

              {/* FULL-WIDTH COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Parameter</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Manipur SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Record</td>
                      <td className="p-4 bg-rose-50/20">Stored securely in Book III government registry archives</td>
                      <td className="p-4 bg-slate-50/20">Retained privately; susceptible to loss, destruction, or concealment</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Protection from Challenge</td>
                      <td className="p-4 bg-rose-50/20">Strong legal presumption of valid testamentary execution</td>
                      <td className="p-4 bg-slate-50/20">Prone to allegations of forgery, coercion, or undue pressure</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Loucha Pathap Land Mutation</td>
                      <td className="p-4 bg-rose-50/20">SDC and SDO process mutation swiftly on presenting certified copy</td>
                      <td className="p-4 bg-slate-50/20">Revenue officers may insist on succession certificates or NOCs</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Imphal Municipal Corporation</td>
                      <td className="p-4 bg-rose-50/20">Direct property tax assessment update for residential homes</td>
                      <td className="p-4 bg-slate-50/20">Heirs often referred to civil court for legal heir verification</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Bank &amp; Demat Transmission</td>
                      <td className="p-4 bg-rose-50/20">Swift asset transmission without demanding indemnity bonds</td>
                      <td className="p-4 bg-slate-50/20">Lengthy legal scrutiny and co-heir disclaimer affidavits required</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Government Registration Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Nominal fee (₹200 to ₹500 total)</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: PROBATE RULES */}
            <section id="manipur-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PRECEDENTS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Manipur Probate Law: High Court Exemption Rules
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common point of confusion among property owners in Manipur is whether an executor must obtain court probate before distributing real estate. Under prevailing law, the answer is <strong>no</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, obtaining probate is mandatory only for Wills executed in or covering properties situated in the historical presidency towns of Mumbai, Kolkata, and Chennai. The territorial jurisdiction of Manipur has never formed part of a presidency town. The High Court of Manipur in Imphal consistently follows this settled legal principle.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Settled Law: Non-Compulsory
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    High Court of Manipur Position
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Probate is not a legal prerequisite for establishing rights under a Will in Manipur for Hindus, Christians, Sikhs, Buddhists, or Jains. A legally registered Will, supported by the testator&apos;s death certificate and legal heir documentation, is completely sufficient for revenue authorities to effect mutation in the Jamabandi.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Enables immediate asset transmission without lengthy civil court litigation</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Voluntary Filings: Contested Estates
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Filed in Manipur District Courts?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An executor may voluntarily petition for probate or letters of administration before the District Judge (e.g., at Lamphelpat Court Complex for Imphal West) if disgruntled legal heirs initiate partition suits, allege suspicious circumstances, or dispute the testator&apos;s mental soundness. A grant of probate conclusively binds all parties as a judgment <em>in rem</em>.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Provides conclusive judicial validation against hostile collateral challenges</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: MANIPUR SRO DIRECTORY */}
            <section id="manipur-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Manipur Sub-Registrar Offices: District Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Manipur operates Sub-Registrar Offices under the Department of Taxes &amp; Registration, Government of Manipur. Under Section 32 of the Registration Act, your Will can be registered at the Sub-Registrar Office having jurisdiction over your place of residence or where your immovable property is located.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Lamphelpat, Porompat, Thoubal)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredHubs.length} of {MANIPUR_SRO_HUBS.length} Manipur Registration Hubs
                  </span>
                </div>

                {/* SRO PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {MANIPUR_SRO_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${selectedHub === hub.id
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>

                {/* ACTIVE SRO DETAILS CARD */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-[#C65378] font-bold block">
                        JURISDICTIONAL REGISTRY OFFICE
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold self-start sm:self-auto">
                      Book III Wills Registry
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 block">Office Address:</span>
                      <p className="text-slate-600">{activeHubData.address}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 block">Operating Hours:</span>
                      <p className="text-slate-600">{activeHubData.timings}</p>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold text-slate-700 block">Coverage Localities:</span>
                      <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200/60">
                    <span className="text-xs text-slate-500">
                      Standard registration timeline: 1 to 2 business days upon submission.
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                    >
                      <span>Book SRO Assistant</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: REGIONAL CITIES (EXACT NASHIK CARD LAYOUT RENAMED TO REGIONAL CITIES) */}
            <section id="manipur-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Regional Cities: Area-Wise Will Drafting in Manipur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate holdings in Manipur span prime commercial markets and residential colonies in Greater Imphal, fertile agricultural valley belts in Thoubal and Kakching, lake basin fishery holdings in Bishnupur, and autonomous hill district properties in Churachandpur and Ukhrul. Our legal specialists deliver tailored drafting and SRO registration support across all key regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: IMPHAL WEST & LAMPHELPAT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Capital Administrative Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Imphal West (Lamphelpat)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Imphal West &amp; Lamphelpat
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lamphelpat</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Uripok</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sagolband</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Keishamthong</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Singjamei</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thangmeiband</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Imphal West</strong> for high-value residential homesteads (Ingkhol), commercial showroom spaces, and multi-story apartments along RIMS Road and Singjamei. Formulates clear clauses for Dag/Patta succession, Imphal Municipal Corporation property tax mutation, and bank deposit bequests.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Lamphelpat DC Office Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Book III registration at Lamphelpat, advocate legal verification, and Section 31 doorstep execution for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal SRO Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Imphal West"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Imphal West Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: IMPHAL EAST & POROMPAT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Imphal East (Porompat)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Imphal East &amp; Porompat
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Porompat</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Palace Compound</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wangkhei</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Khurai</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lamlong</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Andro Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Imphal East</strong> for family homesteads, ancestral residential compounds around Palace Compound, and commercial plots near Lamlong Bazar. Incorporates life-interest protection for surviving spouses and clear Jamabandi division among legal successors.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Porompat DC Office Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Loucha Pathap title mapping, Sub-Deputy Collector mutation facilitation, and expedited SRO registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Heritage Homesteads &amp; Urban Pattas</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Imphal East"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Imphal East Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: THOUBAL & KAKCHING */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Agricultural &amp; Trade Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Thoubal &amp; Kakching
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Thoubal &amp; Kakching
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Thoubal Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wangjing</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Yairipok</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lilong</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kakching Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sugnu</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Thoubal and Kakching</strong> focusing on agricultural paddy land (Lou), private fish farming ponds (Pukhri), and commercial market shops. Prevents land fragmentation and complies with MLR &amp; LR Act ceiling and partition guidelines.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariat Thoubal &amp; Kakching</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Paddy land succession clauses, SDC Thoubal revenue mutation, and SRO Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Paddy Land &amp; Commercial Shops</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Thoubal"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Thoubal Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: BISHNUPUR & MOIRANG */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Loktak Lake Basin
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bishnupur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bishnupur &amp; Moirang
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bishnupur Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Moirang</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nambol</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ningthoukhong</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Oinam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kumbi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Bishnupur and Moirang</strong> for residential land, fishery leases, tourism commercial ventures near Loktak Lake, and traditional homestead plots. Ensures seamless ownership transfer without family disputes or revenue court objections.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariat Bishnupur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Patta land verification, Loktak commercial asset bequeathals, and Sub-Registrar Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Residential &amp; Fishery Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bishnupur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bishnupur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: CHURACHANDPUR / LAMKA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Southern Hill Commercial Center
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Churachandpur (Tuibong)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Churachandpur &amp; Lamka
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lamka Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tuibong</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rengkai</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tedim Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">New Lamka</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bungmual</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Churachandpur</strong> for self-acquired urban properties, town buildings, commercial establishments along Tedim Road, and banking portfolios. Balances local customary succession practices with written testamentary protections for daughters, surviving spouses, and younger sons.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Tuibong, Churachandpur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Customary law harmonization, self-acquired urban asset bequeathals, and Sub-Registrar registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Urban Buildings &amp; Business Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Churachandpur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Lamka Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: UKHRUL & SENAPATI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Northern Hill Districts
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ukhrul &amp; Senapati
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ukhrul &amp; Senapati
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ukhrul Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hunphun</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Viewland</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Senapati Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kangpokpi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Maram</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Ukhrul and Senapati</strong> for self-acquired residential homes in town centers, commercial fleets, retail stores, and financial savings. Clarifies individual property ownership alongside customary village authority principles to secure harmonious family succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariats Ukhrul &amp; Senapati</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Individual asset inventories, Village Authority customary alignment, and SRO Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Town Residences &amp; Financial Wealth</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ukhrul"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Hill District Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-manipur-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Step-by-Step SOP: Drafting to Registration in Manipur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified 5-stage legal operating procedure to draft, execute, and register your Will before the Sub-Registrar in Manipur:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Asset Audit
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Compile complete details of valley Patta land, Dag numbers, Jamabandi records, town buildings, bank deposits, and vehicles.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Advocate Drafting
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Draft customized legal clauses covering revocation of prior wills, survivorship, executor powers, and minor guardianships.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Valid Execution
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print on clean white paper and sign each page in the physical presence of two independent non-beneficiary adult witnesses.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      SRO Scheduling
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Schedule your presentation slot with your local Manipur Sub-Registrar Office and pay the nominal statutory registration fees.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      5
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Book III Entry
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar with witnesses for verbal confirmation, photo capture, and thumbprint impression to seal Book III entry.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: SECTION 31 DOORSTEP REGISTRATION */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION FOR SENIORS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Section 31 Doorstep SRO Registration for Seniors
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly, unwell, or bedridden citizens residing in Imphal West, Imphal East, or other districts of Manipur, visiting the registry office in person can be medically difficult. Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar has statutory authority to attend a private home or hospital to register a Will.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Doorstep SRO Registration Operates in Manipur:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Mental Fitness Certificate</strong>
                      <span className="text-slate-600">A registered MBBS doctor certifies that the senior citizen is of sound testamentary mind but physically advised against traveling.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Commission Application</strong>
                      <span className="text-slate-600">Our estate legal team prepares and submits the formal Section 31 home visit commission petition before the jurisdictional Sub-Registrar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Nominal Commission Fee</strong>
                      <span className="text-slate-600">The statutory government commission fee is paid through the designated treasury challan to schedule the officer visit.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Official Officer Attendance</strong>
                      <span className="text-slate-600">The Sub-Registrar visits your residence, verifies the testator and witnesses in person, captures signatures, and logs Book III records.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>INTERACTIVE CHECKLIST</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Document Checklist for Manipur Sub-Registrar Offices
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Prepare your documentation before scheduling your Sub-Registrar appointment. You have organized <strong>{checkedCount} of {checklist.length}</strong> required documents:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${item.checked
                        ? "bg-rose-50/50 border-rose-300 text-slate-900"
                        : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${item.checked
                          ? "bg-[#C65378] border-[#C65378] text-white"
                          : "border-slate-300 bg-white"
                          }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm block">
                          {item.label}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-500">
                          {item.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: MANIPUR PROPERTY TYPES */}
            <section id="manipur-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>PROPERTY DYNAMICS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Manipur Property Assets: Valley Pattas &amp; Hill Lands
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession procedures in Manipur vary significantly depending on whether the asset is valley revenue land, urban commercial property, or hill district holdings:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    Valley Revenue Land
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Patta Lands &amp; Ingkhol Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under the MLR &amp; LR Act 1960, individual landholders hold Patta rights recorded in the Jamabandi. The Will must accurately state the Dag and Patta numbers. A registered Will enables the SDC to process mutation directly on the Loucha Pathap portal.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Hill District Assets
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Customary Lands &amp; Town Homes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ancestral tribal land is governed by customary traditions. For self-acquired town buildings, residential plots, and shops in Churachandpur, Ukhrul, or Senapati, a written Will ensures clear transmission to intended heirs without clan disputes.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    Movable &amp; Digital Assets
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Banks, Demat &amp; Commercial Units
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Bank accounts with SBI, Punjab National Bank, or Manipur Rural Bank, commercial vehicles, gold ornaments, and demat shares require explicit executor powers and residuary clauses to enable swift transmission.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: REGISTRATION FEES & CHARGES */}
            <section id="manipur-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Manipur SRO Registration Fees &amp; Stamp Duty Schedule
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike commercial sale deeds or gift transfers that incur substantial stamp duties in Manipur, testamentary Wills are completely exempt from ad-valorem stamp duty. Statutory registry fees in Manipur are purely nominal:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Fee Component</th>
                      <th className="p-4 font-bold">Statutory Amount</th>
                      <th className="p-4 font-bold">Remittance Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Manipur Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt from Ad-Valorem Duty)</td>
                      <td className="p-4">Government of Manipur</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Book III Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 – ₹200 (Nominal Statutory Fee)</td>
                      <td className="p-4">Manipur Registration Department</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computerized Scanning &amp; Archive Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹300</td>
                      <td className="p-4">Sub-Registrar Service Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Special Commission (Home Visit)</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Doorstep Official Commissioner Fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 12: PRICING & PACKAGES */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT PLANS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Transparent Will Packages &amp; Legal Fees in Manipur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal assistance package tailored to your family&apos;s estate planning and property portfolio in Manipur:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Standard
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Online Will Drafting
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹1,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Ideal for individual homeowners with Imphal valley Patta land, bank accounts, and vehicles.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Manipur Will creator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted statutory clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download &amp; execution guide</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Draft Online Now
                  </a>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Most Popular in Manipur
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Comprehensive
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Advocate Consultation
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Senior estate advocate review for valley Pattas, hill holdings, and multi-heir distribution.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 video call with senior advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 158 MLR &amp; LR Act verification</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for Lou farmland &amp; Ingkhol</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer"
                  >
                    Book Advocate Call
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
                      End-to-end registration coordination across any Manipur Sub-Registrar Office or home visit.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Sub-Registrar appointment slot scheduling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physically attends Manipur SRO</span>
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

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Frequently Asked Questions: Will Drafting in Manipur
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear, authoritative answers to common legal questions regarding Will drafting and property registration in Manipur:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-[#C65378]" : ""
                            }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
                  <span>STATUTORY CITATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  14. Statutory References &amp; Manipur Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols comply strictly with codified Indian statutes and Manipur state land registration frameworks:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 61, 63, and Section 213 (Non-Presidency Town Probate Exemption).
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
                    MLR &amp; LR Act 1960
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 158 (Tribal land transfer restrictions) and Sub-Deputy Collector Jamabandi mutation.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Loucha Pathap Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official Manipur land records &amp; Jamabandi verification portal: <code>louchapathap.nic.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Manipur Properties &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Manipur Patta land, family homesteads, or commercial savings to administrative confusion. Draft a legally binding Will online today or consult our senior advocates.
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
                Visual Blueprint: Manipur Will Drafting &amp; Property Succession Framework
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
                src="/images/will-drafting-in-manipur.jpg"
                alt="High Resolution Visual Blueprint: Manipur Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Manipur SRO Registered &amp; Loucha Pathap Mutation Compliant</span>
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
