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
  Mountain,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "arunachal-overview", label: "OVERVIEW" },
  { id: "arunachal-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "arunachal-probate-rules", label: "PROBATE RULES" },
  { id: "arunachal-sro-directory", label: "SRO DIRECTORY" },
  { id: "arunachal-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-arunachal-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "arunachal-property-types", label: "PROPERTY TYPES" },
  { id: "arunachal-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const ARUNACHAL_SRO_HUBS = [
  {
    id: "itanagar-capital",
    name: "Itanagar Capital Complex (DC Office)",
    sro: "SRO Capital Complex (Office of Deputy Commissioner)",
    address: "District Administrative Complex, Itanagar Capital Complex, Itanagar - 791111",
    areas: "Ganga, Chimpu, Chandranagar, Niti Vihar, Vivek Vihar, Secretariat Belt, Raj Bhavan Road, Zero Point, Gohpur",
    timings: "9:30 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "naharlagun-papumpare",
    name: "Naharlagun & Yupia (Papum Pare)",
    sro: "SRO Papum Pare District (Yupia / Naharlagun)",
    address: "DC Office Complex, Yupia / Additional DC Office, Model Village, Naharlagun - 791110",
    areas: "Naharlagun Commercial Belt, Nirjuli, Doimukh, Banderdewa, Yupia HQ, NERIST Campus, Borum, Papu Nallah",
    timings: "9:30 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "pasighat-siang",
    name: "Pasighat & East Siang (Smart City)",
    sro: "SRO East Siang District (Pasighat)",
    address: "Office of the Deputy Commissioner, Pasighat, East Siang District - 791102",
    areas: "Pasighat Urban, Gensi, Mebo, Ruksin, Rani, Sille-Oyan, Bilat, Yagrung, Siang Riverfront",
    timings: "9:30 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "tawang-bomdila",
    name: "Tawang & West Kameng (Monpa Belt)",
    sro: "SRO Tawang & Bomdila Registry Hub",
    address: "DC Office Complex, Tawang - 790104 / DC Office Complex, Bomdila - 790001",
    areas: "Tawang Town, Lumla, Jang, Mukto, Bomdila, Dirang Valley, Bhalukpong, Rupa, Singchung",
    timings: "9:30 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "ziro-subansiri",
    name: "Ziro & Lower Subansiri (Apatani Plateau)",
    sro: "SRO Lower Subansiri District (Hapoli)",
    address: "Office of the Deputy Commissioner, Hapoli / Ziro, Lower Subansiri District - 791120",
    areas: "Hapoli Urban, Old Ziro, Hong, Hari, Bulla, Hija, Dutta, Tarin, Yachuli, Pistana",
    timings: "9:30 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "namsai-tezu",
    name: "Namsai, Tezu & Roing (Eastern Corridor)",
    sro: "SRO Namsai & Lohit Districts",
    address: "DC Office Complex, Namsai - 792103 / DC Office, Tezu, Lohit District - 792001",
    areas: "Namsai Town, Golden Pagoda Belt, Chowkham, Mahadevpur, Tezu Urban, Sunpura, Roing, Lower Dibang Valley",
    timings: "9:30 AM to 4:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Paper",
    detail: "Printed on standard white A4 sheets. Under Arunachal Pradesh legal practice, non-judicial stamp paper is not required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & Voter ID of Will maker",
    detail: "Essential for official identity check, electronic biometric thumbprint, and digital photo capture at the registry counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be heirs receiving any asset, parcel, or cash legacy under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Sound Mind Note (MBBS / MD)",
    detail: "Strongly recommended for senior Will makers aged 60+. Certifies Will mental capacity, lucidity, and free volition.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Land Holding Paper (LHC) Papers",
    detail: "Certified copy of the Land Holding Paper issued by the DC/ADC office specifying boundaries and circle details.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Arunachal Pradesh Scheduled Tribe (APST) Proof",
    detail: "Official APST paper verifying local status for legal compliance regarding local tribal land devolution.",
    checked: false,
  },
  {
    id: "item-7",
    label: "City House Tax Receipts & Trading Licenses",
    detail: "Copies of Itanagar or Pasighat city asset tax records, trading licenses, or shop lease papers.",
    checked: false,
  },
];

export default function ArunachalPradeshLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("arunachal-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("itanagar-capital");
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
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const filteredHubs = ARUNACHAL_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    ARUNACHAL_SRO_HUBS.find((h) => h.id === selectedHub) ||
    ARUNACHAL_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc =
    TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (NASHIK STYLE ARCHITECTURE)
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
                <span>ARUNACHAL PRADESH TRIBAL SUCCESSION &amp; ESTATE DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 56 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Arunachal Pradesh: Legal Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will for your Land Holding Paper (LHC) parcels, urban home buildings, shop businesses, and cash assets. Ensure compliance with local tribal estate, Bengal Eastern Frontier Regulation, and SRO Book III signing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Arunachal Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#arunachal-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Arunachal SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Gauhati HC Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>LHC Land Safety</span>
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
                  src="/images/will-drafting-in-arunachal-pradesh.jpg"
                  alt="Legal Will Drafting and Asset Estate in Arunachal Pradesh"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Arunachal Tribal Estate &amp; LHC Blueprint
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
                25+ Districts
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Arunachal Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center sm:border-l sm:border-[#172228]/10">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                LHC Compliant
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Land Records Act 2000
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center sm:border-l sm:border-[#172228]/10">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Non-Conveyance Exemption
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 shadow-2xs sm:shadow-none flex flex-col items-center justify-center sm:border-l sm:border-[#172228]/10">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight">
                0% Probate Required
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Gauhati High Court Rule
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN BODY LAYOUT: STICKY TOC SIDEBAR + STRUCTURED CONTENT
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT COLUMN: DESKTOP STICKY TABLE OF CONTENTS (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-[#172228]">
              <Scale className="w-4 h-4 text-[#C65378]" />
              <span className="font-extrabold text-xs tracking-wider uppercase text-slate-800">
                Arunachal Legal Guide
              </span>
            </div>

            <nav className="space-y-1">
              {TOC_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "text-slate-600 hover:text-[#C65378] hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-100">
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#172228] text-white text-xs font-extrabold hover:bg-slate-800 transition-colors shadow-xs"
              >
                <span>Draft Online Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </aside>

          {/* MOBILE TOC FLOATING BUTTON & DRAWER */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#172228] text-white font-extrabold text-xs shadow-xl border border-white/10"
              aria-label="Table of Contents"
            >
              <Scale className="w-4 h-4 text-[#C65378]" />
              <span>{mobileTocOpen ? "Close Menu" : currentActiveToc.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  mobileTocOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileTocOpen && (
              <div className="absolute bottom-14 right-0 w-64 max-h-96 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileTocOpen(false)}
                    className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-[#C65378] rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: MAIN EDITORIAL CONTENT (9 COLS) */}
          <main className="lg:col-span-9 space-y-14 sm:space-y-16">

            {/* KEY HIGHLIGHTS BOX */}
            <div className="rounded-3xl bg-gradient-to-br from-rose-50/50 via-white to-amber-50/30 border border-rose-100/80 p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                Key Highlights: Will Making &amp; Filing in Arunachal
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Land Holding Paper (LHC) Safety:</strong>
                    Directly bequeath surveyed land parcels recognized under the Arunachal Pradesh Land Deal and Records Act, 2000.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Local Tribal Harmony:</strong>
                    Structure bequests respecting Nyishi, Adi, Apatani, Galo, Tagin, and Monpa local traditions while securing written legal validity.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Non-Presidency Probate Exemption:</strong>
                    Gauhati High Court (Itanagar Permanent Bench) does not require needed probate under Section 213 of the Indian Succession Act.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Section 31 Doorstep Check:</strong>
                    Official DC/ADC registry attendance at residences for senior citizens and mobility-impaired Will makers across difficult terrains.
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 1: OVERVIEW & LEGAL FRAMEWORK */}
            <section id="arunachal-overview" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>FOUNDATIONAL SUCCESSION BLUEPRINT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Arunachal Pradesh
                </h3>
              </div>

              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
                <p>
                  Estate planning in Arunachal Pradesh operates under a distinctive legal architecture that blends legal civil codes with time-honored tribal local laws. Unlike mainland areas where asset is governed strictly by general revenue registers, land and flats in Arunachal Pradesh is anchored by local local community ownership and formalized through <strong>Land Holding Papers (LHC)</strong> issued under the <em>Arunachal Pradesh (Land Deal and Records) Act, 2000</em>.
                </p>
                <p>
                  A Will Will enables an person to declare precise estate instructions for their self-acquired urban assets, LHC land parcels, shop businesses in Itanagar and Naharlagun, vehicle fleets, bank deposits, and government pension accumulations. Without a properly signed written Will, without a Will estates are subject to local clan determinations or prolonged fights before old village councils (such as the Kebang among Adis or Bulyang among Apatanis) and legal civil courts.
                </p>
                <p>
                  Our specialized estate lawyers draft robust Wills that comply strictly with the <em>Indian Succession Act, 1925</em>, respect law protections under Article 371H, and make sure seamless transfer of Land Holding Papers without encountering bureaucratic or clan opposition.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Legal Enforceability</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Drafted under Section 59 and 63 of the Indian Succession Act, securing full validity across all courts of law.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Mountain className="w-4 h-4 text-[#C65378]" />
                    <span>LHC Title Precision</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Includes exact Land Holding Paper allotment details, DC office records, and geographical boundaries.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Local Alignment</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Harmonizes Will bequests with local tribal community norms to prevent post-demise fights.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A clear Will protects your spouse and kids. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Wait no more to put your plan in writing.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-900 mb-1">Who Needs One?</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every home owner, plot holder, trader, and NRI with assets in Arunachal should have a Will. Plain words make your wishes safe, clear, and strong in law.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-900 mb-1">How We Help You</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our lawyers check your land slips and tax bills. We write your Will in clear text. Then we help you sign it with two adult witnesses and file it at the local SRO.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION RULES (MANDATORY VS OPTIONAL) */}
            <section id="mandatory-vs-a choice" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908 ANALYSIS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Arunachal Pradesh?
                </h3>
              </div>

              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
                <p>
                  Under <strong>Section 18(e) of the Filing Act, 1908</strong>, registering a Will is entirely a choice in Arunachal Pradesh. A Will hand-written or typed on ordinary white paper is legally valid if it is signed voluntarily by a Will maker of sound mind in the presence of at least two adult witnesses.
                </p>
                <p>
                  However, relying solely on an plain Will in Arunachal Pradesh poses significant risks. Where valuable shop assets along Bank Tinali in Itanagar or vast family horticultural lands in Pasighat or Ziro are concerned, disgruntled kin may allege fraud, impersonation, or undue influence before village Kebangs or civil courts. Registering your Will before the areaal Deputy Commissioner or SRO places the paper into permanent government custody under <strong>Book III</strong>, set uping strong legal proof of signing.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-800">
                      <th className="p-3.5 sm:p-4 font-bold">Feature / Parameter</th>
                      <th className="p-3.5 sm:p-4 font-bold text-amber-900">Plain Will</th>
                      <th className="p-3.5 sm:p-4 font-bold text-emerald-900">Filed Will (Book III)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Legal Validity</td>
                      <td className="p-3.5 sm:p-4">Valid under Section 63 Indian Succession Act</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Fully valid with legal presumption of truth</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Government Archive</td>
                      <td className="p-3.5 sm:p-4">Held privately; vulnerable to loss, fire, or theft</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Permanently recorded in DC Office / SRO Book III register</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Risk of Fight</td>
                      <td className="p-3.5 sm:p-4">High risk of allegations of forgery or coercion</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Minimal risk; SRO verifies sanity and identity</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">LHC Revenue Name Change</td>
                      <td className="p-3.5 sm:p-4">Subject to detailed inquiries and family objections</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Fast-tracked transfer before DC/ADC revenue offices</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Stamp Duty Rule</td>
                      <td className="p-3.5 sm:p-4">₹0 (Zero Stamp Duty)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">₹0 Stamp Duty; nominal ₹100-₹500 registry fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="arunachal-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>GAUHATI HIGH COURT JURISDICTION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Probate Law: Gauhati High Court Itanagar Estate
                </h3>
              </div>

              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
                <p>
                  A common question among asset owners in Arunachal Pradesh is whether a Will must be probated by a court before heirs can claim their passing assets. Under <strong>Section 213 read with Section 57 of the Indian Succession Act, 1925</strong>, court probate is legally needed only for Wills signed within the historical presidency towns of Mumbai, Kolkata, and Chennai, or for Wills dealing with land and flats situated inside those colonial city limits.
                </p>
                <p>
                  Arunachal Pradesh falls under the territorial area of the <strong>Gauhati High Court (Itanagar Permanent Bench at Naharlagun)</strong>. The Gauhati High Court has consistently affirmed that geting probate is non-needed for Hindu, Buddhist, Christian, and local tribal Wills in Arunachal Pradesh. Heirs can directly apply for name change of Land Holding Papers (LHC), shop trading licenses, and city asset records backed simply by the certified death paper and the filed Will.
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-5 space-y-2 text-xs sm:text-sm text-amber-950">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Key Practical Implication for Heirs:</span>
                </div>
                <p className="leading-relaxed">
                  Because probate is non-needed in Arunachal Pradesh, your family avoids paying substantial ad valorem court fees (often 2% to 5% of estate value in presidency areas) and lengthy civil court court fights. A meticulously drafted filed Will allows immediate transfer of LHC plots and bank accounts upon demise.
                </p>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="arunachal-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>DISTRICT ADMINISTRATIVE DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Arunachal Pradesh SRO Directory: SRO Hubs
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  In Arunachal Pradesh, signing functions are administered under the Deputy Commissioner (DC) and Additional Deputy Commissioner (ADC) offices across each district headquarters. Search or select your areaal hub below for signing details:
                </p>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by district, city, or area (e.g., Itanagar, Pasighat, Tawang)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                />
              </div>

              {/* HUBS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredHubs.map((hub) => {
                  const isSelected = selectedHub === hub.id;
                  return (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-rose-50/70 border-[#C65378] shadow-xs"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
                          {hub.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#C65378] shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {hub.areas}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* SELECTED HUB DETAIL CARD */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Selected Registry Office
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {activeHubData.sro}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Book III Register Available</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Office Address:</span>
                    <p className="text-slate-600 leading-relaxed">{activeHubData.address}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Key Localities Covered:</span>
                    <p className="text-slate-600 leading-relaxed">{activeHubData.areas}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Official Working Hours:</span>
                    <p className="text-slate-600 leading-relaxed">{activeHubData.timings}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES (EXACT SAME AS NASHIK LOCAL AREAS CARDS) */}
            <section id="arunachal-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: City-Wise Will Drafting in Arunachal
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate holdings across Arunachal Pradesh span urban home buildings in Itanagar and Naharlagun, high-value shop set upments along arterial highways, horticultural kiwi and apple orchards in Tawang and Bomdila, and rich bamboo plantations in Ziro. Our estate lawyers provide customized legal drafting, Land Holding Paper (LHC) compliance, and SRO accompaniment across all key regional cities:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: ITANAGAR CAPITAL COMPLEX */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        State Capital &amp; Admin Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Capital Complex
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Itanagar Capital Complex
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ganga</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Niti Vihar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chandranagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Secretariat Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Itanagar</strong> for premium multi-storey residences, shop shop buildings, and government leaseholds. Codifies Land Holding Paper (LHC) transfer under the 2000 Act, bank deposit split, and vehicle ownership to prevent family discord.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Itanagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        SRO appointment coordination, lawyer accompaniment, and Section 31 doorstep signing for elderly citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal Registry</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Itanagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Itanagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: NAHARLAGUN & NIRJULI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Shop &amp; Trade Gateway
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Papum Pare (Yupia)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Naharlagun &amp; Nirjuli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Naharlagun Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Papu Nallah</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nirjuli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Banderdewa</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Naharlagun and Nirjuli</strong> for shop wholesale complexes, warehousing parcels, educational plots around NERIST, and logistics business fleets. Protects corporate and proprietary estate.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: ADC Office, Model Village &amp; Yupia DC Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Shop enterprise estate, business license continuity, and Book III SRO signing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Urban Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Naharlagun"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Naharlagun Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: PASIGHAT & EAST SIANG */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Oldest Town &amp; Smart City
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO East Siang (Pasighat)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Pasighat &amp; East Siang
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pasighat Smart City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mebo</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ruksin</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sille-Oyan</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom <strong>Will drafting services in Pasighat</strong> and the Siang River belt for urban homesteads, tea gardens, citrus orchards, and farm farm holdings. Reconciles Adi local passing assets practices with legal Will bequests.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Deputy Commissioner Office, Pasighat</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        LHC parcel check, riverfront asset estate, and SRO Book III appointment support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Orchards &amp; Urban Holdings</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Pasighat"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Pasighat Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: TAWANG & BOMDILA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Mountain className="w-3.5 h-3.5" />
                        Monpa Belt &amp; High Altitude
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Tawang &amp; Bomdila
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Tawang &amp; Bomdila
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tawang Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dirang Valley</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bomdila</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lumla</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Tawang and West Kameng</strong> for hospitality hotels, tourism homestays, apple and kiwi orchards, and family dwellings. Integrates Buddhist local nuances, executor appointments, and doctor papers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Tawang &amp; DC Office Bomdila</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-altitude estate planning, hotel asset estate, and Section 31 doorstep registry help.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Hospitality &amp; Horticultural</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Tawang"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Tawang Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: ZIRO VALLEY & LOWER SUBANSIRI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Apatani Cultural Plateau
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Lower Subansiri (Hapoli)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ziro Valley &amp; Hapoli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hapoli Urban</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Old Ziro</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hong Village</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hari &amp; Bulla</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Ziro Valley</strong> respecting the unique local land management of the Apatani community. Legally covers Land Holding Papers (LHCs), bamboo groves, pine forest plantations, and home plots in Hapoli.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Deputy Commissioner Office, Hapoli / Ziro</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Bulyang local alignment, agro-forestry bequest drafting, and DC office signing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Agro-Forestry &amp; Homes</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ziro"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ziro Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: NAMSAI, TEZU & ROING */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Wheat className="w-3.5 h-3.5" />
                        Agro-Plant &amp; River Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Namsai &amp; Lohit
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Namsai, Tezu &amp; Roing
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Namsai Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tezu Urban</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chowkham</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Roing Valley</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Namsai and Tezu</strong> for shop tea estates, wood processing units, ginger and mustard plantations, and cross-border shop trade investments across Lohit and Lower Dibang Valley districts.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: DC Office Complex, Namsai &amp; DC Office, Tezu</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Tea estate estate, shop sawmill and agribusiness assets, and SRO Book III signing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Plantations &amp; Plant Units</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Namsai"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Namsai Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-arunachal-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>SYSTEMATIC EXECUTION BLUEPRINT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to Filing in Arunachal
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Signing a legally foolproof Will in Arunachal Pradesh follows five structured phases from initial estate asset compilation to formal government Book III signing:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Compile Estate Assets &amp; Land Holding Papers (LHC)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Assemble all asset papers including certified copies of Land Holding Papers (LHC) issued by the Deputy Commissioner, allotment letters, building approvals from the Office of Town Planning, State Bank of India bank accounts, vehicle RC books, and shop business licenses.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Draft Local &amp; Legal Compliant Will Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our legal experts formulate precise Will clauses making sure bequests of local tribal lands are made exclusively to eligible tribal heirs under the Bengal Eastern Frontier Regulation, 1873, and the Arunachal Pradesh Land Deal and Records Act, 2000. Includes clear executor powers and alternate heir clauses.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Physical Witness Signing Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The Will is printed on durable standard white A4 sheets. The Will maker signs or affixes thumb impression on each page in the simultaneous presence of two independent adult witnesses who sign as witnesses under Section 63 of the Indian Succession Act. Witnesses must not be heirs under the Will.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Schedule SRO / DC Office Registry Appointment
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our legal team coordinates with the areaal Deputy Commissioner or SRO registry office in Itanagar, Naharlagun, Pasighat, Tawang, or Ziro, preparing the signing docket and paying nominal government signing and processing fees.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Biometric Check &amp; Book III Permanent Filing
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The Will maker and both witnesses attend the registry office accompanied by our lawyer. After identity validation, photograph capture, and electronic thumbprint recording, the SRO formally issues the official signing endorsement under Book III.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP HOME VISIT */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP LEGAL ACCESSIBILITY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep Will Filing in Arunachal
                </h3>
              </div>

              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
                <p>
                  Given the rugged mountain topography and travel distances in Arunachal Pradesh, traveling to the district office headquarters can be exceptionally challenging for elderly, unwell, or bedridden citizens. Under <strong>Section 31 of the Filing Act, 1908</strong>, the law explicitly empowers the SRO or registry officer to attend a private residence, nursing home, or hospital to execute signing in special cases of infirmity or illness.
                </p>
                <p>
                  Our legal team helps the complete Section 31 requisition process. We draft the formal petition to the Deputy Commissioner or SRO, procure the needed medical fitness paper from an authorized filed doctor, deposit the nominal government home visit conveyance fee, and coordinate the officer’s visit with mobile biometric recording kits directly to the Will maker's residence.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">
                  Protocol for Section 31 Doorstep Registry in Arunachal Pradesh:
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Medical practitioner’s paper certifying Will soundness and inability to travel.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Written requisition petition submitted to the areaal Deputy Commissioner or SRO.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Payment of official government inspection and conveyance fee at the treasury.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Officer presence at home for verbal confirmation, thumbprints, and photo recording before two witnesses.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION DOCKET PREPARATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Required Papers for Will Filing in Arunachal
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Free checklist for signing before the SRO or Deputy Commissioner office. Use this to prepare your paper file:
                </p>
              </div>

              {/* PROGRESS BAR */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-800">Checklist Completion Status:</span>
                  <span className="text-[#C65378]">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#C65378] transition-all duration-300 rounded-full"
                    style={{
                      width: `${(checkedCount / checklist.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* CHECKLIST ITEMS */}
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-start gap-3.5 select-none"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        item.checked
                          ? "bg-[#C65378] border-[#C65378] text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 block">
                        {item.label}
                      </span>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: ARUNACHAL PROPERTY TYPES */}
            <section id="arunachal-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATIONS &amp; REGULATORY RULES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Arunachal Asset Estate: LHC, Land &amp; Savings
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ASSET TYPE 1 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
                    <Mountain className="w-5 h-5 text-[#C65378]" />
                    <h3>Land Holding Paper (LHC) Plots</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under the Arunachal Pradesh Land Deal and Records Act, 2000, LHCs set up recognized possession rights over surveyed land plots. Wills must specify the LHC paper number, issuing DC office, revenue circle, boundary descriptions, and size. Bequests are restricted exclusively to local tribal persons (APST).
                  </p>
                </div>

                {/* ASSET TYPE 2 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
                    <Building className="w-5 h-5 text-[#C65378]" />
                    <h3>Urban Shop Buildings &amp; Markets</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Shop shopping complexes along Bank Tinali, E-Sector, and Main Market in Itanagar and Naharlagun generate vital rental revenue. A Will defines floor-wise split, shop lease management, trading license transfers, and partnership firm shares without business disruption.
                  </p>
                </div>

                {/* ASSET TYPE 3 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
                    <Wheat className="w-5 h-5 text-[#C65378]" />
                    <h3>Horticultural Orchards &amp; Tea Gardens</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Extensive kiwi and apple orchards in Dirang and Tawang, orange groves in Pasighat, and tea plantations in Namsai represent significant multi-generational wealth. Wills can grant life interest to surviving spouses while set uping clear joint management mechanisms among children.
                  </p>
                </div>

                {/* ASSET TYPE 4 */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
                    <Stamp className="w-5 h-5 text-[#C65378]" />
                    <h3>Bank Deposits, GPF, Gratuity &amp; Vehicles</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    State Bank of India savings accounts, fixed deposits, Government Provident Fund (GPF) accumulations, gratuity claims, and shop transport trucks can be distributed cleanly. A filed Will supersedes standard bank nominations, vesting unchallengeable title in the designated heir.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="arunachal-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT STATUTORY SCHEDULE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. SRO Filing Fees &amp; Stamp Duty in Arunachal
                </h3>
              </div>

              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
                <p>
                  Unlike sale deeds, gift deeds, or split deeds that attract ad valorem stamp duty based on circle rates, Will Wills in Arunachal Pradesh are <strong>completely exempt from ad valorem stamp duty</strong>. A Will takes effect only post-demise and does not convey asset inter vivos.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">
                  Government Fee Schedule for Will Filing
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-bold block mb-1">Stamp Duty:</span>
                    <span className="text-base font-extrabold text-emerald-600">₹0 (100% Exempt)</span>
                    <p className="text-[11px] text-slate-500 mt-1">Non-conveyance instrument exemption</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-bold block mb-1">Filing Fee:</span>
                    <span className="text-base font-extrabold text-slate-900">₹100 - ₹500</span>
                    <p className="text-[11px] text-slate-500 mt-1">Nominal flat government registry fee</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-bold block mb-1">Data &amp; Scanning Fee:</span>
                    <span className="text-base font-extrabold text-slate-900">₹100 - ₹200</span>
                    <p className="text-[11px] text-slate-500 mt-1">Computer scanning and entry into Book III</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL ASSISTANCE PLANS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Plans &amp; Pricing for Arunachal Residents
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* PLAN 1 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Essential Online</span>
                    <h3 className="font-extrabold text-lg text-slate-900">Standard Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500 font-medium">all-inclusive</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Online lawyer-drafted Will template</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Basic home &amp; bank assets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Witness signing instructions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF delivery in 24 hours</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors"
                    >
                      Choose Standard
                    </a>
                  </div>
                </div>

                {/* PLAN 2 (FEATURED) */}
                <div className="p-6 rounded-3xl bg-white border-2 border-[#C65378] shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black tracking-wider uppercase">
                    MOST POPULAR
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">Local &amp; LHC Vetted</span>
                    <h3 className="font-extrabold text-lg text-slate-900">Lawyer Talk</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">₹4,990</span>
                      <span className="text-xs text-slate-500 font-medium">all-inclusive</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Dedicated estate lawyer 1-on-1 review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>LHC boundary &amp; APST tribal compliance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Shop business &amp; orchard structuring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Doctor paper format + witness guidance</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#C65378] hover:bg-[#a13c5d] text-white font-extrabold text-xs transition-colors shadow-xs"
                    >
                      Choose Lawyer Review
                    </a>
                  </div>
                </div>

                {/* PLAN 3 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Complete Registry Support</span>
                    <h3 className="font-extrabold text-lg text-slate-900">SRO Filing &amp; Visit</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500 font-medium">all-inclusive</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Lawyer Talk plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Physical DC / SRO appointment booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer presence at registry counter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep help support</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors"
                    >
                      Choose Full Filing
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
                  <span>AUTHORITATIVE ANSWERS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Will Drafting in Arunachal
                </h3>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
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
                  <span>LEGAL CODE &amp; STATUTORY REFERENCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal Citations &amp; Arunachal Pradesh Land Laws
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Filing Act, 1908:</span>
                  <p>Section 18(e) a choice signing; Section 31 doorstep signing for infirm citizens.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Arunachal Pradesh Land Act, 2000:</span>
                  <p>Arunachal Pradesh (Land Deal and Records) Act, 2000 ruling Land Holding Papers.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Bengal Eastern Frontier Regulation, 1873:</span>
                  <p>Guarantees Inner Line protections and prohibits alienating tribal land to non-tribals.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Indian Succession Act, 1925:</span>
                  <p>Section 59 sound mind, Section 63 witness signing, Section 213 Gauhati HC probate exemption.</p>
                </div>
              </div>
            </section>

            {/* BOTTOM CTA BANNER */}
            <div className="rounded-3xl bg-[#172228] text-white p-8 sm:p-10 text-center space-y-5 border border-white/10 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Family Estate in Arunachal Pradesh Today
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Take the decisive step to secure your Land Holding Papers (LHC), shop assets, and family legacy. Draft an ironclad Will with lawyer oversight and complete Book III signing.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#a13c5d] transition-colors shadow-lg cursor-pointer"
                >
                  <span>Draft Your Arunachal Pradesh Will Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RES IMAGE MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#172228] rounded-3xl overflow-hidden border border-white/20 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
              <Image
                src="/images/will-drafting-in-arunachal-pradesh.jpg"
                alt="Legal Will Drafting and Asset Estate in Arunachal Pradesh"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                sizes="(max-width: 1200px) 90vw, 80vw"
              />
            </div>
            <div className="p-4 flex items-center justify-between text-white text-xs sm:text-sm">
              <span className="font-semibold">
                Will Drafting in Arunachal Pradesh: Tribal Land Estate &amp; LHC Guide
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
