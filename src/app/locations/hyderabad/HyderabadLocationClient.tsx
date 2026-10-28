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
  { id: "hyderabad-overview", label: "OVERVIEW" },
  { id: "hyderabad-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "hyderabad-probate-rules", label: "PROBATE RULES" },
  { id: "hyderabad-sro-directory", label: "SRO DIRECTORY" },
  { id: "hyderabad-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-hyderabad-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "hyderabad-property-types", label: "PROPERTY TYPES" },
  { id: "hyderabad-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const HYDERABAD_DISTRICTS = [
  {
    id: "hyderabad-central-west",
    name: "Hyderabad Central & Banjara Hills",
    sro: "SRO Banjara Hills & SRO Khairatabad",
    address: "Registration Complex, Red Hills, Nampally & Khairatabad, Hyderabad",
    areas: "Banjara Hills, Jubilee Hills, Somajiguda, Panjagutta, Khairatabad, Masab Tank, Anand Nagar",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "secunderabad-north",
    name: "Secunderabad & Cantonment",
    sro: "SRO Secunderabad & SRO Marredpally",
    address: "Clock Tower Complex, SD Road, Secunderabad & Near Trimulgherry Cross Roads",
    areas: "West Marredpally, East Marredpally, Begumpet, Karkhana, Bowenpally, Trimulgherry, Padmarao Nagar",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "ranga-reddy-cyberabad",
    name: "Ranga Reddy (HITEC City & Gachibowli)",
    sro: "SRO Serilingampally & SRO Rajendranagar",
    address: "MIG Complex, Chandanagar, Serilingampally & Pillar No 143, Attapur, Hyderabad",
    areas: "Gachibowli, HITEC City, Madhapur, Kondapur, Financial District, Nanakramguda, Tellapur, Kokapet",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "medchal-kukatpally",
    name: "Medchal-Malkajgiri (Kukatpally & Balanagar)",
    sro: "SRO Kukatpally & SRO Balanagar",
    address: "KPHB Colony 4th Phase, Kukatpally & Fathenagar Main Road, Hyderabad",
    areas: "KPHB Colony, Kukatpally, Miyapur, Nizampet, Bachupally, Pragathi Nagar, Balanagar, Moosapet",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "hyderabad-south-old-city",
    name: "Hyderabad South & Charminar",
    sro: "SRO Charminar & SRO Azampura",
    address: "Purani Haveli Complex, Charminar & Near Chanchalguda Central Jail Road, Hyderabad",
    areas: "Charminar, Moghalpura, Hussaini Alam, Malakpet, Azampura, Chanchalguda, Saidabad, Falaknuma",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "hyderabad-east-uppal",
    name: "Hyderabad East & Medchal (Uppal & Malkajgiri)",
    sro: "SRO Uppal & SRO Malkajgiri",
    address: "Survey Colony, IDB Uppal & Near Geeta Theatre, Malkajgiri, Hyderabad",
    areas: "Uppal, Habsiguda, Nacharam, Ramanthapur, Malkajgiri, Safilguda, Anandbagh, Neredmet, Sainikpuri",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "hyderabad-south-west-airport",
    name: "South West & Shamshabad Corridor",
    sro: "SRO Shamshabad & SRO Maheshwaram",
    address: "Near RGIA Police Station, Shamshabad & Main Road, Maheshwaram",
    areas: "Shamshabad, Rajendranagar, Attapur, Gandipet, Bandlaguda Jagir, Kismatpur, Tukkuguda",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "hyderabad-central-chikkadpally",
    name: "Hyderabad Central & Musheerabad",
    sro: "SRO Chikkadpally & SRO Golconda",
    address: "Street No 8, Habsiguda Main Road & Tolichowki Cross Roads, Hyderabad",
    areas: "Chikkadpally, Himayatnagar, Narayanguda, RTC X Roads, Musheerabad, Mehdipatnam, Tolichowki",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed clearly on standard white A4 sheets. Under Telangana law, no expensive stamp paper is required for a Will.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Required for biometric identity check and digital webcam photograph capture at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Original IDs",
    detail: "Both witnesses must carry their original Aadhaar cards and be people who are not heirs under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Medical Fitness Paper (For Seniors 60+)",
    detail: "Issued on the same day or within 48 hours by an MBBS doctor, confirming mental alertness and sound disposing memory.",
    checked: true,
  },
  {
    id: "item-5",
    label: "Asset Title Papers & GHMC PTIN / Dharani Passbook",
    detail: "Filed sale deeds, split deeds, GHMC asset tax receipts, or Dharani passbook survey numbers for exact asset schedule.",
    checked: false,
  },
  {
    id: "item-6",
    label: "IGRS Telangana Portal Appointment Slip",
    detail: "Downloaded e-appointment token from filing.telangana.gov.in confirming your SRO time slot.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs",
    detail: "Recent color photographs of the Will maker and both witnesses for physical record pasting in Book-III registers.",
    checked: false,
  },
];

export default function HyderabadLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("hyderabad-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("hyderabad-central-west");
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

  const filteredDistricts = HYDERABAD_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    HYDERABAD_DISTRICTS.find((d) => d.id === selectedDistrict) || HYDERABAD_DISTRICTS[0];

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
                <span>HYDERABAD ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 58 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Hyderabad: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally sound Will for your GHMC apartments, HMDA plots, and tech company shares.
                Get expert lawyer drafting, IGRS Telangana appointment support, and doorstep filing for senior citizens across Hyderabad, Secunderabad, and Cyberabad.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Hyderabad Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#hyderabad-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Hyderabad SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Court Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Telangana Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULLY VISIBLE IN MOBILE & DESKTOP */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-hyderabad.jpg"
                  alt="Online Will Drafting & Property Registration in Hyderabad"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 42vw"
                  priority
                />
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
                20+ SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Hyderabad &amp; RR Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Stamp Exempt
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                A Choice Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Non-Presidency Town Rules
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Home Visits for Seniors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: DROPDOWN TABLE OF CONTENTS (STICKY ON MOBILE)
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
          
          {/* =====================================================================
              DESKTOP VIEW: TABLE OF CONTENTS SIDEBAR
              ===================================================================== */}
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

          {/* =====================================================================
              MAIN EDITORIAL CONTENT AREA
              ===================================================================== */}
          <main className="min-w-0 flex-1 space-y-16">
            
            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="hyderabad-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>TELANGANA SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Hyderabad
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>A Choice Filing</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will filing is a choice under Section 18(e) of the Filing Act, 1908. An plain Will signed before two witnesses is valid, but filing via IGRS Telangana creates undeniable legal proof.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Needed</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Hyderabad is a non-presidency town. Unlike Mumbai, Kolkata, or Chennai, court probate is not needed in Telangana for Hindu, Sikh, Jain, or Buddhist Wills under Section 213 of the Indian Succession Act.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills incur ₹0 stamp duty across Telangana. At the SRO office, Will makers pay only a flat nominal filing fee and minimal computer processing charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>GHMC &amp; Dharani Name Change</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A filed Will enables swift ownership name change before the Greater Hyderabad City City Board (GHMC), HMDA, and on the Dharani portal for peri-urban farm lands.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="hyderabad-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Hyderabad
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate split in Hyderabad is governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Filing Act, 1908</strong>, and the rules of the Telangana Filing and Stamps Office (IGRS Telangana).
                  Any adult of sound mind can write a Will to dispose of self-acquired real estate, bank deposits, mutual funds, company shares, and family heirlooms.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Hyderabad features unique estate dynamics.
                  A family may own an family asset in Secunderabad, a shop showroom in Banjara Hills, an apartment in Kondapur, or tech equity options in HITEC City.
                  Telugu family traditions also involve clarifying <em>Pasupu-Kumkuma</em> (stridhana gifts given to daughters during marriage) against the residue estate to prevent subsequent split suits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Age</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker must be at least 18 years old and possess sound disposing mind and memory (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Choice</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will must be made voluntarily, without coercion, undue influence, deception, or misrepresentation.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2 W
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Signed before two independent adult witnesses who attest seeing the Will maker sign (Section 63(c)).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    100%
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Revocable</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker can modify, amend via codicil, or completely revoke the Will at any point during their lifetime.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT SECTION 18(E)</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Telangana?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 18(e) of the Filing Act, 1908</strong>, registering a Will is a choice across Hyderabad and the State of Telangana.
                  An plain Will signed on plain paper and signed before two witnesses is legally enforceable.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, filing before the SRO office via IGRS Telangana provides immense practical and proof advantages.
                  It permanently records the Will maker&apos;s physical presence, biometric thumb scan, and mental soundness in government Book-III archives, making fraudulent fights nearly impossible to sustain in court.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5 sm:p-4">Key Legal Parameter</th>
                      <th className="p-3.5 sm:p-4 text-[#C65378]">Filed Will (IGRS Telangana)</th>
                      <th className="p-3.5 sm:p-4 text-slate-600">Plain Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Legal Validity</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-medium">Valid with strong legal presumption</td>
                      <td className="p-3.5 sm:p-4 text-slate-600">Valid if signature &amp; witness signing are proven</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">SRO Biometric Record</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-medium">Official thumb impression &amp; digital webcam photo</td>
                      <td className="p-3.5 sm:p-4 text-rose-600 font-medium">None; depends on witness testimony later</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">GHMC &amp; Dharani Name Change</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-medium">Smooth city and revenue name change</td>
                      <td className="p-3.5 sm:p-4 text-amber-700 font-medium">Often delayed; offices seek indemnity bonds</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Court Fight Defense</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-medium">Very high proof weight in civil courts</td>
                      <td className="p-3.5 sm:p-4 text-rose-600 font-medium">Vulnerable to claims of forgery or coercion</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Government Record Backup</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-medium">Preserved in SRO Book-III archives; copies available</td>
                      <td className="p-3.5 sm:p-4 text-slate-600">If the original paper is lost, recovery is difficult</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="hyderabad-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>SECTION 213 INDIAN SUCCESSION ACT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Hyderabad Probate Rules: Non-Presidency Town Law
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most frequent misconceptions among Hyderabad asset owners is that court probate is needed.
                  Under <strong>Section 213(2) read with Section 57(a) and (b) of the Indian Succession Act, 1925</strong>, getting probate from a civil court is needed <em>only</em> if the Will is signed within the ordinary original civil area of Mumbai, Kolkata, or Chennai, or concerns land and flats situated in those three historic presidency cities.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Hyderabad and the State of Telangana are non-presidency areas.
                  The <strong>Hon&apos;ble High Court for the State of Telangana</strong> has settled in extensive jurisprudence that Hindu, Sikh, Jain, and Buddhist Wills signed in Hyderabad do not require needed probate.
                  Heirs can set up title directly before GHMC, banks, mutual fund registrars, and registrar offices without filing for court probate.
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2.5 font-bold text-amber-900 text-sm sm:text-base">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>When is Probate Recommended or Sought in Hyderabad?</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  While probate is not legal needed in Hyderabad, an executor may voluntarily apply for probate before the City Civil Court, Hyderabad or the High Court if:
                </p>
                <ul className="text-xs sm:text-sm text-amber-800 space-y-1.5 list-disc list-inside">
                  <li>Disgruntled legal heirs threaten intense court fights or claim the Will maker lacked mental capacity.</li>
                  <li>The Will maker bequeathed high-value shop assets in Jubilee Hills or Banjara Hills with complex corporate structures.</li>
                  <li>Certain foreign financial institutions or overseas asset registries request a court-certified grant of probate.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="hyderabad-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>IGRS TELANGANA SRO NETWORK</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Hyderabad SRO Offices: SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  The Hyderabad metropolitan region spans three key revenue filing districts: <strong>Hyderabad District</strong>, <strong>Ranga Reddy District</strong>, and <strong>Medchal-Malkajgiri District</strong>.
                  Find your local SRO office, area localities, and official working hours below:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search locality, area, or SRO name..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                />
              </div>

              {/* DIRECTORY CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDistricts.map((d) => (
                  <div
                    key={d.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#C65378]/40 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-900">{d.name}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-rose-50 text-[#C65378] font-bold">
                        IGRS Active
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-600">
                      <div>
                        <strong className="text-slate-800">SRO Offices:</strong> {d.sro}
                      </div>
                      <div>
                        <strong className="text-slate-800">Office Location:</strong> {d.address}
                      </div>
                      <div>
                        <strong className="text-slate-800">Key Localities:</strong> {d.areas}
                      </div>
                      <div>
                        <strong className="text-slate-800">Official Hours:</strong> {d.timings}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: LOCAL AREA COVERAGE */}
            <section id="hyderabad-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Hyderabad Regions
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally checked <strong>Will drafting services in Banjara Hills, HITEC City, Gachibowli, or Secunderabad</strong>? Assets across Greater Hyderabad range from luxury gated community villas in Kokapet and Tellapur to high-rise IT apartments in HITEC City, shop prime plots in Banjara Hills, and cantonment residences in Secunderabad.
                  Our senior lawyers provide full legal drafting, IGRS slot booking, and SRO accompaniment across all key micro-markets:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: BANJARA HILLS & JUBILEE HILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central HNI Corridors
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Banjara Hills
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Banjara Hills &amp; Jubilee Hills
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Banjara Hills (Roads 1-14)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jubilee Hills (Roads 36 &amp; 45)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Filmnagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Somajiguda</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for professional <strong>Will drafting services in Banjara Hills &amp; Jubilee Hills</strong>? Banjara Hills and Jubilee Hills house prominent plant families, film personalities, and business leaders.
                      Our lawyers draft sophisticated Will structures covering luxury independent villas, shop rental assets, family business shareholding, and private trust bequests.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Red Hills Complex, Nampally (SRO Banjara Hills)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        IGRS portal slot booking, lawyer representation, and Section 31 doorstep signing for elderly Will makers across Jubilee Hills and Banjara Hills.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal IGRS Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Banjara Hills &amp; Jubilee Hills"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Banjara Hills Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: HITEC CITY & GACHIBOWLI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Cyberabad IT Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Serilingampally
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in HITEC City &amp; Gachibowli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">HITEC City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gachibowli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Madhapur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Financial District</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Get specialized <strong>Will drafting services in HITEC City &amp; Gachibowli</strong>. Cyberabad represents software professionals, tech entrepreneurs, and corporate executives.
                      Wills for IT professionals incorporate full global asset clauses: US stocks, vested RSUs (Microsoft, Google, Oracle), Indian mutual funds, Demat accounts, and luxury gated community flats.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: MIG Complex, Chandanagar (SRO Serilingampally)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast-track appointment scheduling, dual-witness arrangement, and digital nominee-heir synchronization.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Global IT Assets · Zero Stamp Duty</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in HITEC City &amp; Gachibowli"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gachibowli Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: KONDAPUR, TELLAPUR & KOKAPET */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Luxury Growth Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Rajendranagar / Serilingampally
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kondapur, Tellapur &amp; Kokapet
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kondapur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kokapet Neopolis</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tellapur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nanakramguda</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Opt for premier <strong>Will drafting services in Kondapur, Tellapur &amp; Kokapet</strong>. West Hyderabad&apos;s luxury boom encompasses high-rise home towers, duplex villas, and premium shop projects.
                      Our legal experts structure clear Will bequests that specify builder-buyer agreements, undivided share of land (UDS), and society maintenance transfers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Pillar No 143, Attapur &amp; Serilingampally</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Specialized drafting for high-value gated community villas, NRI ownership clauses, and GHMC PTIN name change guidance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Gated Villas · UDS Clearances</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kokapet &amp; Tellapur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kokapet Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: SECUNDERABAD & MARREDPALLY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Twin City &amp; Cantonment
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Secunderabad / Marredpally
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Secunderabad &amp; Marredpally
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">West Marredpally</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">East Marredpally</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Trimulgherry</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Begumpet</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Secure expert <strong>Will drafting services in Secunderabad &amp; Marredpally</strong>. Secunderabad features established independent houses, heritage bungalows, and armed forces cantonment assets.
                      Our lawyers assist senior citizens and defence veterans with Section 31 home filing visits and precise split declarations for family family estates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Clock Tower Complex, SD Road &amp; Marredpally</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Senior lawyer talk, doorstep signing for retired veterans, and Secunderabad Cantonment Board title records help.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Cantonment &amp; Family Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Secunderabad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Secunderabad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: KUKATPALLY & MIYAPUR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-West Home Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kukatpally
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kukatpally &amp; Miyapur
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">KPHB Colony (Phases 1-9)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Miyapur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nizampet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bachupally</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Kukatpally &amp; Miyapur</strong>. KPHB and surrounding suburbs represent massive home clusters of double-income families and Telugu business owners.
                      We make sure smooth Will planning for home apartments, independent builder floors, shop retail units, and bank locker contents.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: KPHB Colony 4th Phase (SRO Kukatpally)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Local lawyer drafting, IGRS appointment token generation, and GHMC circle office name change coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Family Apartments &amp; Lockers</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kukatpally &amp; Miyapur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kukatpally Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: DILSUKHNAGAR & LB NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        East Hyderabad Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Chikkadpally / SRO Uppal
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Dilsukhnagar &amp; LB Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dilsukhnagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">LB Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kothapet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nagole</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Protect your family assets with <strong>Will drafting services in Dilsukhnagar &amp; LB Nagar</strong>. East Hyderabad features longstanding family residences, shop markets, and plotting ventures.
                      Drafting a filed Will clarifies joint family rights among multiple siblings, demarcates self-acquired assets, and prevents asset fights across generations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Chikkadpally &amp; Uppal SRO Offices</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete support for Telugu family wills, split deed references, and GHMC PTIN title transfers.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Independent Plots &amp; Homes</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Dilsukhnagar &amp; LB Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Dilsukhnagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP PROCESS */}
            <section id="step-by-step-hyderabad-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>5-STEP EXECUTION PROTOCOL</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Filing in Hyderabad
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Hyderabad is straightforward when backed by competent legal counsel.
                  Follow our checked five-step protocol to create an airtight Will and register it through the IGRS Telangana portal:
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Asset Inventory &amp; Heir Mapping
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile an exhaustive schedule of all land and cash assets: GHMC apartments, HMDA plots, Dharani farm lands, bank accounts, mutual funds, company equity, and locker contents.
                      Identify primary heirs, alternate heirs, and appoint an independent Executor.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Lawyer Drafting &amp; Custom Legal Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft the Will incorporating needed legal clauses: revocation of prior wills, sound mental capacity declaration, survivorship rules, and specific bequests.
                      For Telugu families, include clarifications regarding earlier split deeds (<em>Vibhaga Pathram</em>) or gifts given during marriage (<em>Pasupu-Kumkuma</em>).
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Signing Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the final Will on plain white A4 paper. Under Section 63(c) of the Indian Succession Act, the Will maker signs or affixes thumb impressions at the foot of each page in the simultaneous presence of two independent witnesses who are not heirs.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      IGRS Telangana Portal Slot Booking
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Book an official filing appointment on <strong>filing.telangana.gov.in</strong>.
                      Select your designated SRO office, input Will maker and witness KYC details, pay the nominal government fee online, and download the official appointment token.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      SRO Biometric Check &amp; Book-III Filing
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the SRO office with your two witnesses and original IDs. The SRO captures biometric thumb scans and digital webcam photos, records the Will in Book-III, and returns the filed paper with an official filing stamp and endorsement.
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
                  <span>DOORSTEP REGISTRATION FOR SENIOR CITIZENS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep Filing for Seniors
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visiting a crowded government SRO office can be physically exhausting for senior citizens, bedridden elders, or medically infirm Will makers.
                  <strong>Section 31 of the Filing Act, 1908</strong> allows the SRO to visit the Will maker&apos;s residence or hospital room to complete formal Will filing:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Doctor Fitness Paper</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Obtain a medical paper from a filed MBBS practitioner certifying that the Will maker is of sound mind, memory, and capable of understanding the gift.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Advance SRO Form</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Submit a formal requisition letter to the District Registrar along with the doctor&apos;s paper, requesting an official home visit under Section 31.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Doorstep Biometric Capture</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The SRO visits the residence with official registers and biometric scanners, completing thumb scans, photo capture, and Book-III entry at home.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION DOCUMENTATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Papers Checklist for IGRS SRO
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Keep these needed papers organized before visiting the SRO office in Hyderabad.
                  Use our free checklist below to track your preparation:
                </p>
              </div>

              {/* INTERACTIVE CHECKLIST */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-700">
                    Preparation Progress: <span className="text-[#C65378]">{checkedCount} of {checklist.length}</span> completed
                  </div>
                  <div className="w-28 sm:w-36 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C65378] transition-all duration-300"
                      style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className="p-3 sm:p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 cursor-pointer transition-all flex items-start gap-3.5 select-none"
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
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs sm:text-sm text-slate-900">
                          {item.label}
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: HYDERABAD PROPERTY TYPES */}
            <section id="hyderabad-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>MUNICIPAL &amp; REVENUE CLASSIFICATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Hyderabad Asset Types: GHMC, HMDA &amp; Plots
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate steps in Hyderabad differ depending on asset ownership category.
                  Here is how a legally valid Will addresses specific asset classes:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">GHMC Apartments &amp; Flats</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Apartments filed with GHMC Asset Tax ID Numbers (PTIN). A filed Will enables straightforward city name change and transfer of water (HMWSSB) and electricity connections.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">HMDA Approved Layout Plots</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Open home plots in HMDA layouts across Tellapur, Mokila, and Ghatkesar. The Will must accurately state layout permit numbers, plot numbers, and boundary measurements.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">Gated Community Villas</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Luxury duplex villas in Kokapet, Gandipet, and Narsingi. Precision drafting addresses undivided share of land (UDS) and clubhouse membership transfer rights.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">Dharani Farm Lands</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farmlands and peri-urban farmhouses in Ranga Reddy and Medchal. Estate requires name change through the Tahsildar on the Dharani portal based on clear Will title.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">IT Shares, RSUs &amp; Crypto</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    US equities, vested RSUs, ESOPs, and crypto holdings of Cyberabad software professionals. An appointed executor coordinates global transfer with brokerage platforms.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">Shop &amp; Trade Units</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Retail shops in General Bazaar, Secunderabad, or shop office spaces in Madhapur. Incorporate lease rental assignment clauses directly to named heirs.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="hyderabad-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>IGRS TELANGANA FEE SCHEDULE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Telangana Government Fees &amp; Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Many citizens mistakenly believe that registering a Will costs a percentage of asset market value.
                  In reality, Wills are <strong>completely exempt from stamp duty</strong> across Telangana under the Indian Stamp Act, 1899.
                  Only flat legal fees apply at the SRO office:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5 sm:p-4">Legal Fee Component</th>
                      <th className="p-3.5 sm:p-4">Government Charge</th>
                      <th className="p-3.5 sm:p-4">Legal Office &amp; Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Telangana Stamp Duty</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">₹0 (Zero)</td>
                      <td className="p-3.5 sm:p-4 text-slate-600">100% exempt under Indian Stamp Act, 1899</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">IGRS Filing Fee</td>
                      <td className="p-3.5 sm:p-4 text-slate-900 font-bold">₹200 to ₹1,000</td>
                      <td className="p-3.5 sm:p-4 text-slate-600">Nominal legal Book-III filing fee</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Computer Scanning Charges</td>
                      <td className="p-3.5 sm:p-4 text-slate-900 font-bold">₹100 to ₹200</td>
                      <td className="p-3.5 sm:p-4 text-slate-600">Digital archiving and biometric entry fee</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Section 31 Doorstep Visit Commission</td>
                      <td className="p-3.5 sm:p-4 text-slate-900 font-bold">Official Govt Attendance Fee</td>
                      <td className="p-3.5 sm:p-4 text-slate-600">Prescribed fee for SRO home visit for senior citizens</td>
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
                  <span>TRANSPARENT LEGAL PACKAGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the estate planning package tailored to your family situation.
                  All packages include lawyer review, customized Telugu estate clauses, and clear legal guidance:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plan 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      Essential
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900">₹1,990</div>
                      <div className="text-xs text-slate-500 mt-1">Single Will maker · Standard Assets</div>
                    </div>
                    <ul className="text-xs space-y-2.5 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Online lawyer-drafted Will</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>GHMC flats, bank FDs, jewellery</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant digital PDF download</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Witness signing instructions</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors block cursor-pointer"
                  >
                    Get Started
                  </a>
                </div>

                {/* Plan 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-xl relative flex flex-col justify-between space-y-6">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    Most Popular
                  </div>
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378]">
                      Full Lawyer
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900">₹4,990</div>
                      <div className="text-xs text-slate-500 mt-1">High Court Lawyer Talk</div>
                    </div>
                    <ul className="text-xs space-y-2.5 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 lawyer talk call</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for US RSUs &amp; tech equity</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Telugu joint family &amp; Pasupu-Kumkuma clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Doctor fitness paper format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>IGRS Telangana appointment guide</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-[#C65378] text-white font-bold text-xs text-center hover:bg-[#a13c5d] transition-colors block cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Select Full
                  </a>
                </div>

                {/* Plan 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      Executive Concierge
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900">₹9,990</div>
                      <div className="text-xs text-slate-500 mt-1">End-to-End Filing Support</div>
                    </div>
                    <ul className="text-xs space-y-2.5 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Senior lawyer drafting &amp; review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>IGRS Telangana portal slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Physical lawyer accompaniment at SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit filing for seniors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Priority support across Twin Cities</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors block cursor-pointer"
                  >
                    Select Concierge
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUERIES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Hyderabad Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key legal questions about Will drafting, SRO filing, and asset split in Hyderabad:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 13: STATUTORY REFS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL PORTALS &amp; CITATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal References &amp; Telangana Legal Links
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Authoritative statutes and official Telangana state web portals governing Will drafting and estate:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://registration.telangana.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C65378] transition-all space-y-1 block shadow-xs group"
                >
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#C65378] transition-colors flex items-center justify-between">
                    <span>IGRS Telangana Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Official Filing and Stamps Office appointment booking &amp; guidelines.
                  </p>
                </a>

                <a
                  href="https://www.ghmc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C65378] transition-all space-y-1 block shadow-xs group"
                >
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#C65378] transition-colors flex items-center justify-between">
                    <span>GHMC City City Board</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Asset tax name change and title transfer portal across Greater Hyderabad.
                  </p>
                </a>

                <a
                  href="https://registration.telangana.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C65378] transition-all space-y-1 block shadow-xs group"
                >
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#C65378] transition-colors flex items-center justify-between">
                    <span>Dharani Integrated Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Farm land records, passbooks, and estate name change in Telangana.
                  </p>
                </a>

                <a
                  href="https://tshc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C65378] transition-all space-y-1 block shadow-xs group"
                >
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#C65378] transition-colors flex items-center justify-between">
                    <span>High Court of Telangana</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Judicial decisions regarding Indian Succession Act, non-presidency probate, and joint family rights.
                  </p>
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

      
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Fast Step-by-Step Plan</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                First, list your flat, plot, bank cash, gold, and shares. Next, name the person who will get each share. Pick one adult you trust to carry out your plan. Keep a copy in a safe place at home.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Who Can Witness Your Will?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Any two adults of sound mind can sign as witnesses. Do not pick a person who gets a gift in the Will. A friend, neighbor, doctor, or peer is a great choice. They just watch you sign and add their names.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">When Should You Update It?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can change or cancel your Will at any time while you live. Make a fresh draft if you buy a new home, sell land, welcome a child, or move to a new city. Your last signed Will is the one that counts.
              </p>
            </div>
          </div>

      </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION BLUEPRINT MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            className="bg-white rounded-3xl p-4 sm:p-6 max-w-4xl w-full shadow-2xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-900">
                Visual Blueprint: Hyderabad Will Drafting &amp; SRO Filing
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative flex-1 min-h-[300px] sm:min-h-[420px] md:min-h-[520px] w-full mt-3 bg-[#172228] rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
              <Image
                src="/images/will-drafting-in-hyderabad.jpg"
                alt="High Resolution Visual Blueprint: Hyderabad Will Drafting and SRO Registration"
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
