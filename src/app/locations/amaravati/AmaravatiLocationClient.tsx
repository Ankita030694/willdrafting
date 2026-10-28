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
  { id: "amaravati-overview", label: "OVERVIEW" },
  { id: "amaravati-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "amaravati-probate-rules", label: "PROBATE RULES" },
  { id: "amaravati-sro-directory", label: "SRO DIRECTORY" },
  { id: "amaravati-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-amaravati-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "amaravati-property-types", label: "PROPERTY TYPES" },
  { id: "amaravati-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const AMARAVATI_SRO_HUBS = [
  {
    id: "sro-tullur",
    name: "Tullur SRO (Core Capital City)",
    sro: "Sub-Registrar Office Tullur (Thullur)",
    address: "Mandal Revenue Office Complex, Main Road, Tullur, Amaravati Capital Region - 522237",
    areas: "Velagapudi, Nelapadu (AP High Court Belt), Tullur, Mandadam, Rayapudi, Sakhamuru, Lingayapalem, Malkapuram, Uddandarayunipalem",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & General Holidays closed)",
  },
  {
    id: "sro-mangalagiri",
    name: "Mangalagiri SRO (Growth Corridor & AIIMS)",
    sro: "Sub-Registrar Office Mangalagiri",
    address: "Near Bus Station, Old Guntur Road, Mangalagiri, Guntur District - 522503",
    areas: "Mangalagiri Town, Nowlur, Kuragallu, Neerukonda, AIIMS Campus, NRI Hospital Corridor, Atmakur, Chinakakani",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & General Holidays closed)",
  },
  {
    id: "sro-tadepalli",
    name: "Tadepalli SRO (Riverfront Gateway)",
    sro: "Sub-Registrar Office Tadepalli",
    address: "Revenue Complex, Near Prakasam Barrage Road, Tadepalli, Guntur District - 522501",
    areas: "Tadepalli, Undavalli (Caves Belt), Kolanukonda, Vaddeswaram (KL University), Seethanagaram, Kunchanapalli, Mahanadu",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & General Holidays closed)",
  },
  {
    id: "sro-amaravati-town",
    name: "Amaravati Heritage Town SRO",
    sro: "Sub-Registrar Office Amaravati (Dharanikota)",
    address: "Tehsil Office Compound, Amaravati Town, Palnadu / Guntur District - 522020",
    areas: "Historic Amaravati Town, Dharanikota, Vaikuntapuram, Karlapudi, Didugu, Lemalle, Pedamaduru, Nemalipuri",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & General Holidays closed)",
  },
  {
    id: "sro-guntur",
    name: "Guntur SRO Hub (District Headquarters)",
    sro: "District Registrar & SRO Guntur (Pattabhipuram)",
    address: "Registration Bhavan, Pattabhipuram Main Road, Guntur - 522006",
    areas: "Brodipet, Arundelpet, Collectorate Area, Lakshmipuram, Gujjanagundla, Kaza, Syamala Nagar, Amaravati Road",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & General Holidays closed)",
  },
  {
    id: "sro-vijayawada",
    name: "Vijayawada SRO Hub (Northern Capital Link)",
    sro: "Sub-Registrar Office Governorpet & Gandhinagar",
    address: "Registration Complex, Near Ryves Canal, Governorpet, Vijayawada - 520002",
    areas: "Governorpet, Gandhinagar, Suryaraopeta, Benz Circle, Patamata, Bhavanipuram, One Town, Krishna Riverfront",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & General Holidays closed)",
  },
  {
    id: "sro-tenali",
    name: "Tenali & Ponnur Sub-District SRO",
    sro: "Sub-Registrar Office Tenali",
    address: "Sub-Registrar Office Complex, Taluk Office Road, Tenali - 522201",
    areas: "Tenali Urban, Chenchupet, Ramalingeswara Pet, Morrispet, Angalakuduru, Ponnur, Duggirala, Kollipara",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & General Holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Andhra Pradesh law, non-judicial stamp paper is not required.",
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
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be beneficiaries receiving any asset or plot under the Will.",
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
    label: "AP IGRS Appointment Slip & CFMS Challan",
    detail: "Official time-slot booking receipt from registration.ap.gov.in along with the paid CFMS challan.",
    checked: false,
  },
  {
    id: "item-6",
    label: "APCRDA Plot Allotment / LPOC Certificates",
    detail: "Copy of Land Pooling Ownership Certificate or development authority allotment for capital city plots.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Meebhoomi 1-B & Digital Pattadar Passbook",
    detail: "Recent computerized land records for agricultural parcels and farm lands across the capital region.",
    checked: false,
  },
];

export default function AmaravatiLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("amaravati-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("sro-tullur");
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

  const filteredHubs = AMARAVATI_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    AMARAVATI_SRO_HUBS.find((h) => h.id === selectedHub) || AMARAVATI_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (EXACT NASHIK ARCHITECTURE)
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
                <span>AMARAVATI CAPITAL REGION SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Starts with target phrase, length 53 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Amaravati: Legal Will Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will for your APCRDA returnable plots, capital region apartments, Meebhoomi farmlands, and commercial assets. Benefit from High Court advocate drafting, AP IGRS registration support, and Section 31 doorstep execution.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Amaravati Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#amaravati-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Amaravati SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AP High Court Advocate Vetted</span>
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
                  src="/images/will-drafting-in-amaravati.jpg"
                  alt="Legal Will Drafting and Property Succession in Amaravati Andhra Pradesh"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Amaravati Capital &amp; APCRDA Blueprint
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
                7 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Amaravati Capital Region
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Indian Stamp Act Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                AP High Court Section 213 Rule
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
                    className={`flex items-center px-3 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${isActive
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
                      className={`flex items-center text-xs font-mono tracking-wider uppercase transition-all duration-150 ${isActive
                          ? "text-[#C65378] font-bold pl-2 border-l-2 border-[#C65378]"
                          : "text-slate-500 hover:text-slate-900 hover:pl-1"
                        }`}
                    >
                      <span
                        className={`mr-2 ${isActive ? "w-3 h-[1.5px] bg-[#C65378]" : "w-1.5 h-[1px] bg-slate-300"
                          }`}
                      />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>AP High Court Jurisprudence</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Compliant with AP IGRS Book III guidelines, APCRDA plot transfer rules, and Meebhoomi succession protocols.
                </p>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="block w-full py-2.5 px-4 text-center rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors shadow-xs cursor-pointer"
                >
                  Start Your Will
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN EDITORIAL CONTENT AREA */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="amaravati-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>AMARAVATI ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Amaravati
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional under Section 18(e) of the Registration Act, 1908. An unregistered Will signed before two witnesses is legally valid, but official Book III AP IGRS registration provides indisputable proof against title disputes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Mandatory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Amaravati is governed under the High Court of Andhra Pradesh at Nelapadu. Under Section 213 of the Indian Succession Act, probate is non-mandatory, allowing direct property transfer with a registered Will without civil court probate delays.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Ad-Valorem Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are 100% exempt from ad-valorem market value stamp duty under the Indian Stamp Act. You only pay a flat statutory registration fee of ₹1,000 plus nominal scanning charges at Amaravati Sub-Registrar Offices.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>APCRDA &amp; Meebhoomi Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will guarantees streamlined title mutation for Land Pooling Scheme (LPS) reconstituted plots through APCRDA and enables swift 1-B Record of Rights and Pattadar Passbook updates on the Meebhoomi portal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="amaravati-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Amaravati
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate planning and succession across Amaravati and the Andhra Pradesh Capital Region are governed primarily by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Andhra Pradesh Capital Region Development Authority (APCRDA) Act, 2014</strong>. Any adult of sound mind can legally bequeath self-acquired residential real estate, commercial commercial shop freeholds, reconstituted LPS plots, agricultural farmlands, and financial assets.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Amaravati presents an intricate matrix of property classes. A family estate often combines returnable residential and commercial Land Pooling Ownership Certificates (LPOC) issued by APCRDA in Tullur and Mandadam, high-growth apartments in Mangalagiri and Tadepalli, agribusiness enterprises in Guntur, and ancestral agricultural lands on Meebhoomi records. Without an advocate-drafted Will, legal heirs face protracted administrative roadblocks across the APCRDA Land Wing, Tahsildar revenue offices, and local Ward Sachivalayams.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be a major aged 18 years or older possessing testamentary mental capacity and soundness of mind (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Executed voluntarily without undue influence, fraudulent misrepresentation, coercion, or family duress (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the simultaneous physical presence of at least two independent adult attesting witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Non-Beneficiary</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Attesting witnesses and their spouses must not receive any legacy, plot, or bequest under the Will (Section 67).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileQuestion className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION STATUS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Amaravati?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, the registration of a testamentary Will is strictly <strong>optional</strong>. An unregistered Will signed on standard white paper before two independent witnesses is legally enforceable and admissible in court.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, given the multi-crore valuations of capital region plots and land pooling assets across Amaravati, Tullur, and Mangalagiri, senior estate lawyers strongly advise formal registration. An official Book III entry in AP IGRS government custody shields your family from fraudulent claims, suspicious signatures, and prolonged mutation delays.
                </p>
              </div>

              {/* FULL-WIDTH COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Legal Parameter</th>
                      <th className="p-4 font-bold">Registered Will (AP IGRS Book III)</th>
                      <th className="p-4 font-bold">Unregistered Will (White Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Statutory Validity</td>
                      <td className="p-4 text-emerald-700 font-bold">Full legal validity under Section 17 &amp; 18</td>
                      <td className="p-4">Valid under Section 63 Indian Succession Act</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">APCRDA Plot Transmission</td>
                      <td className="p-4 text-emerald-700 font-bold">Immediate recognition by Land Administration Wing</td>
                      <td className="p-4">May require legal heir affidavits or no-objection bonds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Meebhoomi Revenue Mutation</td>
                      <td className="p-4 text-emerald-700 font-bold">Swift 1-B updating &amp; Pattadar Passbook issuance</td>
                      <td className="p-4">Subject to revenue inquiry and family notices</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Presumption of Authenticity</td>
                      <td className="p-4 text-emerald-700 font-bold">Strong evidentiary presumption under Section 114</td>
                      <td className="p-4">Burden of proving genuineness rests on propounder</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Official Govt Custody</td>
                      <td className="p-4 text-emerald-700 font-bold">Safeguarded permanently in SRO Book III record</td>
                      <td className="p-4">Risk of loss, physical destruction, or suppression</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="amaravati-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT JURISPRUDENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Probate Exemption for Amaravati: AP High Court Rule
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common misconception among property owners in Andhra Pradesh is that an executor must obtain court probate before transmitting real estate. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory strictly within the historical presidential territories of Mumbai, Kolkata, and Chennai.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Amaravati is a non-presidency capital governed under the <strong>High Court of Andhra Pradesh at Nelapadu</strong>. The Supreme Court in <em>Clarence Pais v. Union of India</em> and subsequent Andhra Pradesh High Court judgments have established that probate is non-mandatory for Hindu, Buddhist, Sikh, and Jain testators. Beneficiaries can directly execute property transmission using a registered Will.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 font-bold text-amber-950 text-sm sm:text-base">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Key Practical Impact for Amaravati Property Owners</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  Because probate is non-compulsory in Andhra Pradesh, heirs do not need to spend 1 to 3 years and tens of thousands of rupees on civil court fees. When your Will is drafted with precise legal descriptions and registered at the local Sub-Registrar Office, government authorities like APCRDA and local municipalities accept the registered instrument directly.
                </p>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="amaravati-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>SUB-REGISTRAR JURISDICTIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Amaravati Sub-Registrar Offices: SRO Jurisdiction
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under the Registration and Stamps Department of Andhra Pradesh (AP IGRS), testamentary Wills are registered in Book III. You can schedule an appointment at any of the key SRO hubs serving the Amaravati capital region:
                </p>
              </div>

              {/* SEARCH & ACCORDION HUB */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by area (e.g. Tullur, Mangalagiri, Velagapudi, Tadepalli, Guntur)..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378] text-slate-900 shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-5 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                    {filteredHubs.map((hub) => {
                      const isSelected = selectedHub === hub.id;
                      return (
                        <div
                          key={hub.id}
                          onClick={() => setSelectedHub(hub.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${isSelected
                              ? "bg-white border-[#C65378] shadow-md ring-1 ring-[#C65378]"
                              : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300"
                            }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                              {hub.name}
                            </span>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold">
                              SRO Hub
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                            {hub.sro}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <Building className="w-5 h-5 text-[#C65378]" />
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                        {activeHubData.sro}
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                      <div>
                        <span className="block text-[11px] font-mono uppercase font-bold text-slate-400">
                          Office Address
                        </span>
                        <p className="font-medium text-slate-800 mt-0.5">{activeHubData.address}</p>
                      </div>

                      <div>
                        <span className="block text-[11px] font-mono uppercase font-bold text-slate-400">
                          Jurisdiction &amp; Local Coverage
                        </span>
                        <p className="font-medium text-slate-800 mt-0.5 leading-relaxed">
                          {activeHubData.areas}
                        </p>
                      </div>

                      <div>
                        <span className="block text-[11px] font-mono uppercase font-bold text-slate-400">
                          Working Hours &amp; Slot Timings
                        </span>
                        <p className="font-medium text-slate-800 mt-0.5">{activeHubData.timings}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                          <Check className="w-3.5 h-3.5" />
                          AP IGRS CARD Online Slots Enabled
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold">
                          <Stamp className="w-3.5 h-3.5" />
                          Book III Custody Available
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: REGIONAL CITIES COVERAGE (EXACT SAME STYLE AS NASHIK LOCAL AREAS) */}
            <section id="amaravati-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES &amp; ASSET NUANCES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities &amp; Zones Across Amaravati Capital
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets across the Amaravati Capital Region span high-value Land Pooling Scheme (LPS) reconstituted plots in Velagapudi and Tullur, luxury riverfront high-rises in Tadepalli and Mangalagiri, agribusiness and industrial trading assets in Guntur, and commercial developments along the Vijayawada corridor. Our estate advocates deliver customized legal drafting, AP IGRS slot booking, and Sub-Registrar accompaniment across all key regional cities and growth nodes:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* REGIONAL CITY 1: VELAGAPUDI & NELAPADU */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Core Government &amp; Judicial Zone
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Tullur (Thullur)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Velagapudi &amp; Nelapadu
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Velagapudi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nelapadu</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">AP High Court Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Secretariat Complex</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Velagapudi</strong> and Nelapadu for civil servants, senior advocates, and capital zone landholders. Drafts clear succession terms for APCRDA residential plots, chamber properties, and financial investment portfolios to eliminate inter-generational ambiguity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tullur Mandal Revenue Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        AP IGRS slot scheduling at Tullur SRO, advocate physical presence, and Section 31 home visits for senior residents.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹1,000 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Velagapudi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Velagapudi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 2: MANGALAGIRI & TADEPALLI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Tech Corridor &amp; Riverfront Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mangalagiri &amp; Tadepalli
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mangalagiri &amp; Tadepalli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mangalagiri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tadepalli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">AIIMS Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Undavalli</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Mangalagiri</strong> and Tadepalli for premium gated villa communities, IT corridor apartments, and riverfront penthouses. Details apartment society share transfers, parking bays, and multi-currency NRI succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mangalagiri Town &amp; Tadepalli SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-net-worth estate planning, doctor capacity certifications, and streamlined Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Residential</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mangalagiri"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mangalagiri Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 3: TULLUR & MANDADAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Land Pooling LPS Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Tullur (Thullur)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Tullur &amp; Mandadam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tullur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mandadam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rayapudi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sakhamuru</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Tullur</strong> for Land Pooling Scheme (LPS) participants. Formulates legally bulletproof bequests for returnable commercial and residential plots, Land Pooling Ownership Certificates (LPOC), and annual government annuity entitlements.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tullur SRO &amp; APCRDA Land Wing</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Clear codification of LPS survey numbers, reconstituted plot allotments, and Tahsildar revenue mutation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">CRDA LPS Plots &amp; Annuity</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Tullur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Tullur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 4: GUNTUR CITY CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Twin City Commercial Anchor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Guntur (Pattabhipuram)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Guntur City Corridor
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Brodipet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Arundelpet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lakshmipuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amaravati Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Guntur</strong> for trading dynasties, cold storage operators, and doctors. Codifies succession of commercial buildings, partnership firm capital accounts, private company shares, and gold reserves.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Registration Bhavan, Pattabhipuram</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        GMC property tax record mutation, business succession structuring, and senior citizen home registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Business &amp; Real Estate</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Guntur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Guntur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 5: VIJAYAWADA URBAN LINK */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Krishna Riverfront Metro Link
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Governorpet &amp; Patamata
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vijayawada Link Zone
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Benz Circle</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Governorpet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhavanipuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ibrahimpatnam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Targeted <strong>Will drafting services in Vijayawada</strong> connecting commercial trading interests with Amaravati assets. Safeguards family businesses in Governorpet, auto ancillary units in Auto Nagar, and luxury riverview apartments.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Governorpet &amp; Patamata SROs</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        VMC mutation assistance, business continuity trusts, and Book III registration coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Wholesale</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Vijayawada"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vijayawada Link Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 6: HISTORIC AMARAVATI & DHARANIKOTA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage Town &amp; Riverfront Agro-Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Amaravati (Dharanikota)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Historic Amaravati
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Amaravati Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dharanikota</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vaikuntapuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karlapudi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting in Amaravati Heritage Town</strong> and Dharanikota for ancestral residential homes, riverfront agricultural orchards, and temple belt holdings. Protects Meebhoomi revenue records and prevents family land disputes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Amaravati Tehsil Compound</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Agricultural passbook transmission, Adangal verification, and local SRO registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Heritage &amp; Farmland</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Historic Amaravati"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Heritage Town Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 7: TENALI & DELTA AGRO-HUB */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Delta Wealth &amp; Urban Growth Center
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Tenali &amp; Ponnur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Tenali &amp; Delta Hub
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tenali Urban</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chenchupet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Morrispet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Duggirala</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting in Tenali</strong> for prosperous agricultural families, rice mill owners, and commercial property holders. Accurately specifies canal-irrigated farmland parcels, turmeric trade assets, and urban real estate.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Taluk Office Road, Tenali</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        1-B mutation compliance, digital passbook transmission, and Sub-Registrar appointment assistance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Delta Lands &amp; Rice Mills</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Tenali"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Tenali Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* REGIONAL CITY 8: GANNAVARAM & AIRPORT BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Airport Logistics &amp; Outer Ring Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gannavaram &amp; Kankipadu
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gannavaram Airport Belt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gannavaram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Medha IT Towers</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kankipadu</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">NH-16 Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting in Gannavaram</strong> for logistics hub operators, IT professionals, and plotted corridor investors. Structures succession of warehousing leases, commercial land investments, and corporate equity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Gannavaram &amp; Kankipadu SROs</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-growth asset protection, seamless corporate transfers, and fast-track Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Logistics &amp; IT Corridors</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gannavaram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gannavaram Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-amaravati-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>5-STEP EXECUTION PROTOCOL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting &amp; AP IGRS Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified legal procedure to create an unassailable Will and complete registration before an Amaravati Sub-Registrar:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Compile Asset Schedule &amp; Successors
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Assemble property documentation: APCRDA plot allotment letters, Land Pooling Ownership Certificates (LPOC), registered sale deeds for Mangalagiri/Tadepalli apartments, Meebhoomi 1-B extracts, bank accounts, and demat account folios. Designate trusted beneficiaries and appoint a capable executor.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Draft Legally Watertight Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Structure your Will using statutory terminology. Incorporate clear revocations of previous instruments, survivorship clauses, residual asset provisions, and testamentary guardian nominations for minor children. Our High Court advocates review the draft to ensure APCRDA alignment.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Physical Signing Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the document on standard white A4 paper. Under Section 63 of the Indian Succession Act, you sign or thumb-impress each page in the simultaneous presence of two independent adult witnesses who sign as attesting witnesses.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Schedule AP IGRS Appointment &amp; Generate CFMS Challan
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log onto the AP IGRS portal (<code>registration.ap.gov.in</code>), choose your jurisdictional SRO (Tullur, Mangalagiri, Tadepalli, or Guntur), enter party KYC details, and remit the flat statutory registration fee of ₹1,000 through the CFMS payment gateway.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Attend SRO for Biometric Registration
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Appear before the Sub-Registrar along with both witnesses. The Sub-Registrar conducts verbal verification of testamentary intent, captures electronic thumbprints, and photographs all parties. The Will is sealed into permanent Book III government custody and issued with a certified registration endorsement.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 HOME VISIT */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION FACILITY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration for Elders
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly, infirm, or bedridden citizens who cannot physically navigate Sub-Registrar offices, <strong>Section 31 of the Registration Act, 1908</strong> allows the Sub-Registrar to visit your home or hospital bed:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 space-y-2.5 shadow-xs">
                  <span className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Doctor Fitness Certificate</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A registered medical practitioner (MBBS doctor) issues a fitness certificate certifying testamentary sound mind and inability to travel to the SRO.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 space-y-2.5 shadow-xs">
                  <span className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Stamp className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Commission Fee via CFMS</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An official special commission fee (typically ₹500 to ₹1,000 plus travel allowance) is remitted through the government CFMS gateway.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 space-y-2.5 shadow-xs">
                  <span className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Portable Biometric Seal</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Sub-Registrar attends your residence with portable biometric sensors to record thumbprints and photographs at your bedside.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>INTERACTIVE REQUIREMENTS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Document Checklist for Amaravati Sub-Registrars
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Check off the documents required before visiting the Sub-Registrar Office in Tullur, Mangalagiri, Tadepalli, or Guntur:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="font-bold text-slate-800">
                    Prepared Items: <span className="text-[#C65378]">{checkedCount}</span> of {checklist.length}
                  </span>
                  <span className="text-slate-500 font-medium">Click items to toggle status</span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${item.checked
                          ? "bg-rose-50/40 border-rose-200/90 text-slate-900"
                          : "bg-slate-50/50 border-slate-200 text-slate-600"
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${item.checked ? "bg-[#C65378] text-white" : "border border-slate-300 bg-white"
                          }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-1">
                        <span className="font-extrabold text-xs sm:text-sm block">
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
            <section id="amaravati-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Amaravati Property Types: CRDA Plots &amp; Meebhoomi Land
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A legally compliant Amaravati Will can cover diverse real estate and movable assets across Andhra Pradesh:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-3 shadow-xs">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Building className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    APCRDA Land Pooling (LPS) Plots
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Reconstituted residential and commercial plots allocated in Tullur, Nelapadu, Mandadam, and Rayapudi under the Land Pooling Scheme. Specifies LPOC certificate numbers, layout sector codes, and government annuity payouts.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-3 shadow-xs">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Meebhoomi Agricultural Farmlands
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Canal-irrigated paddy fields, horticulture orchards, and delta farmlands in Tenali, Dharanikota, and Guntur rural. Details survey numbers, khata numbers, and computerized Pattadar Passbook succession.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-3 shadow-xs">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Home className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Gated Apartments &amp; Riverfront Villas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Apartments in Mangalagiri, riverfront villas in Tadepalli and Undavalli, and residential homes in Guntur. Codifies undivided share of land (UDS), dedicated car parking allocations, and society membership shares.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-3 shadow-xs">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                    <Factory className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Commercial Showrooms &amp; Agri-Businesses
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Commercial shop freeholds in Guntur Brodipet and Vijayawada Governorpet, cold storage facilities, partnership equities, demat portfolios, mutual funds, and bank locker authorizations.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES & CHARGES */}
            <section id="amaravati-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official AP IGRS Will Registration Fees &amp; Charges
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike commercial sale deeds or gift transfers that attract 5% to 7.5% stamp duty and registration fees in Andhra Pradesh, testamentary Wills are completely exempt from ad-valorem stamp duty. Official charges in Amaravati are nominal:
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
                      <td className="p-4 font-semibold">Andhra Pradesh Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt under Indian Stamp Act)</td>
                      <td className="p-4">Government of Andhra Pradesh</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Book III Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹1,000 (Flat Statutory Fee)</td>
                      <td className="p-4">AP IGRS via CFMS Portal</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer User &amp; Scanning Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹200</td>
                      <td className="p-4">Sub-Registrar Service Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Special Commission (Home Visit)</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Official Doorstep Commission Fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: PRICING & PACKAGES */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT PLANS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Drafting Packages in Amaravati
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal assistance package tailored to your family&apos;s estate planning and property portfolio in the Amaravati capital region:
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
                      Ideal for individual homeowners with apartments, bank deposits, and demat holdings.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Andhra Pradesh Will creator</span>
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
                    Most Popular in Amaravati
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
                      High Court advocate review for APCRDA plots, Meebhoomi farmlands, and multi-heir portfolios.
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
                        <span>Custom clauses for APCRDA LPS plots</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Executor vetting &amp; witness protocols</span>
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
                      End-to-end registration coordination across any Amaravati Sub-Registrar Office or home visit.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>AP IGRS slot booking &amp; CFMS challan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physically attends Amaravati SRO</span>
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
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Amaravati Will Drafting
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear, authoritative answers to common legal questions regarding Will drafting and property registration in Amaravati:
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CITATIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Citations &amp; Andhra Pradesh Legal Portals
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols comply strictly with codified Indian statutes and Andhra Pradesh state registration systems:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 61, 63, and Section 213 (Non-Presidency Town Probate Exemption in AP).
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
                    APCRDA Act 2014
                  </span>
                  <p className="text-xs text-slate-600">
                    Land Pooling Scheme (LPS) Rules and reconstituted plot succession regulations.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    AP IGRS &amp; Meebhoomi Portals
                  </span>
                  <p className="text-xs text-slate-600">
                    Official registration portal: <code>registration.ap.gov.in</code> &amp; <code>meebhoomi.ap.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Amaravati Properties &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Amaravati plots, homes, or farmlands to administrative gridlock. Draft a legally binding Will online today or consult our senior Andhra Pradesh High Court advocates.
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
                Visual Blueprint: Amaravati Will Drafting &amp; Property Succession Framework
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
                src="/images/will-drafting-in-amaravati.jpg"
                alt="High Resolution Visual Blueprint: Amaravati Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Amaravati SRO Registered &amp; APCRDA Mutation Compliant</span>
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
