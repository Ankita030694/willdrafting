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
  { id: "telangana-overview", label: "OVERVIEW" },
  { id: "telangana-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "telangana-probate-rules", label: "PROBATE RULES" },
  { id: "telangana-sro-directory", label: "SRO DIRECTORY" },
  { id: "telangana-regional-cities", label: "REGIONAL CITIES" },
  { id: "step-by-step-telangana-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "telangana-property-types", label: "PROPERTY TYPES" },
  { id: "telangana-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const TELANGANA_SRO_HUBS = [
  {
    id: "hyderabad-central",
    name: "Hyderabad Central (Chikkadpally)",
    sro: "SRO Hyderabad Central",
    address: "Registration Complex, Chikkadpally, Hyderabad - 500020",
    areas: "Chikkadpally, Himayatnagar, Narayanguda, Abids, Koti, Nampally, Basheerbagh",
    timings: "10:30 AM to 5:00 PM (Mon-Sat, 2nd Sat & Holidays closed)",
  },
  {
    id: "banjara-hills",
    name: "Banjara Hills & Jubilee Hills",
    sro: "SRO Banjara Hills",
    address: "Road No. 12, Near MLA Colony, Banjara Hills, Hyderabad - 500034",
    areas: "Banjara Hills, Jubilee Hills, Somajiguda, Panjagutta, Begumpet, Film Nagar",
    timings: "10:30 AM to 5:00 PM (Mon-Sat, 2nd Sat & Holidays closed)",
  },
  {
    id: "serilingampally",
    name: "Serilingampally (Cyberabad)",
    sro: "SRO Serilingampally",
    address: "Near Gachibowli Flyover, Gachibowli, Hyderabad - 500032",
    areas: "HITEC City, Gachibowli, Madhapur, Kondapur, Financial District, Tellapur, Nanakramguda",
    timings: "10:30 AM to 5:00 PM (Mon-Sat, 2nd Sat & Holidays closed)",
  },
  {
    id: "secunderabad",
    name: "Secunderabad (Cantonment Belt)",
    sro: "SRO Secunderabad",
    address: "Near Clock Tower, SD Road, Secunderabad - 500003",
    areas: "Secunderabad Cantonment, Marredpally, Begumpet, Bowenpally, Trimulgherry, Sainikpuri",
    timings: "10:30 AM to 5:00 PM (Mon-Sat, 2nd Sat & Holidays closed)",
  },
  {
    id: "kukatpally",
    name: "Kukatpally (North-West Zone)",
    sro: "SRO Kukatpally",
    address: "Near JNTU Metro Station, KPHB Colony, Kukatpally, Hyderabad - 500072",
    areas: "Kukatpally, KPHB Colony, Miyapur, Nizampet, Bachupally, Pragathi Nagar, Hafeezpet",
    timings: "10:30 AM to 5:00 PM (Mon-Sat, 2nd Sat & Holidays closed)",
  },
  {
    id: "warangal",
    name: "Warangal & Hanamkonda Hub",
    sro: "SRO Warangal / Hanamkonda",
    address: "Subedari Administrative Complex, Hanamkonda, Warangal - 506001",
    areas: "Warangal, Hanamkonda, Kazipet, Subedari, Kakatiya Colony, Naimnagar, KUDA Layouts",
    timings: "10:30 AM to 5:00 PM (Mon-Sat, 2nd Sat & Holidays closed)",
  },
  {
    id: "nizamabad",
    name: "Nizamabad District Registry",
    sro: "SRO Nizamabad",
    address: "Collectorate Road, Subhashnagar, Nizamabad - 503002",
    areas: "Nizamabad Urban, Bodhan, Armoor, Subhashnagar, Khaleelwadi, Varni Road Belts",
    timings: "10:30 AM to 5:00 PM (Mon-Sat, 2nd Sat & Holidays closed)",
  },
  {
    id: "karimnagar",
    name: "Karimnagar Registry Hub",
    sro: "SRO Karimnagar",
    address: "Near Court Complex, Collectorate Road, Karimnagar - 505001",
    areas: "Karimnagar City, Manair River Belt, Godavarikhani, Ramagundam, Jammikunta",
    timings: "10:30 AM to 5:00 PM (Mon-Sat, 2nd Sat & Holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Telangana law, non-judicial stamp paper is not required.",
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
    label: "IGRS Telangana Online Appointment & Challan Slip",
    detail: "Official slot receipt downloaded from registration.telangana.gov.in with Cyber Treasury e-Challan.",
    checked: false,
  },
  {
    id: "item-6",
    label: "GHMC / Municipal Property Tax Assessment (PTIN)",
    detail: "Copy of Greater Hyderabad Municipal Corporation property tax receipt or registered title deeds.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Dharani e-Pattadar Passbook / Khata Details",
    detail: "Computerized land record extract from dharani.telangana.gov.in for agricultural farmland parcels.",
    checked: false,
  },
];

export default function TelanganaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("telangana-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("serilingampally");
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

  const filteredHubs = TELANGANA_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    TELANGANA_SRO_HUBS.find((h) => h.id === selectedHub) || TELANGANA_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI / NASHIK ARCHITECTURE)
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
                <span>TELANGANA &amp; HYDERABAD SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 57 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Telangana: Legal Asset Planning
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally robust Will for your GHMC apartments, HMDA gated community villas, Dharani agricultural land records, and commercial assets. Benefit from experienced advocate review, IGRS Telangana slot scheduling, and Section 31 doorstep home visits.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Telangana Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#telangana-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Telangana SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Telangana HC Non-Probate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dharani Land Succession</span>
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
                  src="/images/will-drafting-in-telangana.jpg"
                  alt="Legal Will Drafting and Property Succession in Telangana"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Telangana Estate &amp; Land Succession Blueprint
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
                140+ SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                33 Districts in Telangana
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Will Duty Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Non-Presidency State Rule
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
                      className={`group flex items-center text-xs font-mono tracking-wider uppercase transition-all ${
                        isActive
                          ? "text-[#C65378] font-bold"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`mr-3 transition-all ${
                          isActive
                            ? "w-6 h-[2px] bg-[#C65378]"
                            : "w-3 h-[1px] bg-slate-300 group-hover:w-4 group-hover:bg-slate-400"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold text-slate-800">
                  Telangana Succession Desk
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Advocate drafting, Dharani land mutation, and IGRS registration across all 33 districts.
                </p>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors cursor-pointer text-center"
                >
                  <span>Start Online Will</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* EDITORIAL MAIN CONTENT COLUMN */}
          <main className="flex-1 min-w-0 space-y-16">

            {/* SECTION 1: OVERVIEW & KEY HIGHLIGHTS */}
            <section id="telangana-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-50 text-[#C65378] mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL CERTAINTY FOR TELANGANA RESIDENTS</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Telangana
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>100% Stamp Duty Exemption:</strong> Testamentary Wills attract ₹0 ad-valorem stamp duty across Telangana.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Non-Mandatory Probate:</strong> Properties in Hyderabad, Secunderabad, and rural districts mutate without High Court probate.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Dharani Portal Ready:</strong> Formatted for seamless succession of agricultural farmlands and e-Pattadar passbooks.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>GHMC Single-Window Mutation:</strong> Streamlines property tax and municipal title substitution under GHMC rules.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Section 31 Doorstep Service:</strong> Senior citizens and unwell individuals can complete biometrics from their residence.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Telugu NRI Legal Desk:</strong> Dual-will strategies for global assets across the USA, UK, UAE, and Telangana properties.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: LEGAL FRAMEWORK */}
            <section id="telangana-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY APPARATUS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Telangana
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession planning in Telangana is governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Telangana Rights in Land and Pattadar Pass Books Act, 2020</strong>. A properly drafted Will grants testators absolute legal authority to distribute self-acquired properties, shares, and agricultural land to designated successors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378] font-black text-sm">
                    01
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Statutory Attestation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 63 of the Indian Succession Act, the testator must sign or affix their thumbprint in the physical presence of at least two independent adult witnesses.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378] font-black text-sm">
                    02
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Government Book III Custody
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Registered Wills are archived in permanent government custody within Book III at the Sub-Registrar Office, safeguarding the original testament from loss or tampering.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378] font-black text-sm">
                    03
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Dharani Land Transfer
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The revolutionary Dharani digital land records platform requires registered testamentary proof for updating mutation records and generating electronic passbooks.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileQuestion className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ADVISORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Telangana?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 18(e) of the Registration Act, 1908</strong>, registering a Will is optional in the state of Telangana. An unregistered Will drafted on standard plain white paper is legally valid if executed properly before two independent witnesses. However, leaving a Will unregistered carries severe practical risks when dealing with revenue authorities:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Parameter</th>
                      <th className="p-4 font-bold text-slate-900">Registered Will (IGRS Telangana)</th>
                      <th className="p-4 font-bold text-slate-500">Unregistered Will (White Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Official Legal Presumption</td>
                      <td className="p-4 text-emerald-700 font-bold">Strong evidentiary presumption of genuine execution</td>
                      <td className="p-4 text-slate-500">Subject to skepticism; high risk of forgery claims</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Dharani Agricultural Mutation</td>
                      <td className="p-4 text-emerald-700 font-bold">Processed promptly upon Tahsildar verification</td>
                      <td className="p-4 text-slate-500">Frequently disputed or referred to civil revenue court</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">GHMC &amp; Municipal Mutation</td>
                      <td className="p-4 text-emerald-700 font-bold">Quick ownership change on property tax record</td>
                      <td className="p-4 text-slate-500">Requires extensive affidavits and indemnity bonds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Record Security &amp; Custody</td>
                      <td className="p-4 text-emerald-700 font-bold">Permanent digital archive in Book III SRO registers</td>
                      <td className="p-4 text-slate-500">Vulnerable to physical misplacement or suppression</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Commercial Bank Settlement</td>
                      <td className="p-4 text-emerald-700 font-bold">Swift locker and fixed deposit release to nominee</td>
                      <td className="p-4 text-slate-500">Banks may demand costly succession certificates</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: PROBATE RULES */}
            <section id="telangana-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>TELANGANA HIGH COURT JURISPRUDENCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Telangana Probate Law: Exemption Under High Court Rules
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most frequent misconceptions among Hyderabad and Telangana property owners is that court probate is compulsory. Under <strong>Section 213 read with Section 57 of the Indian Succession Act, 1925</strong>, probate is mandatory only within the historic presidency towns of Mumbai, Kolkata, and Chennai.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-6 md:p-8 space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-sm block">Non-Presidency State Jurisdiction:</strong>
                    <span>Telangana is entirely a non-presidency territory. The Telangana High Court at Hyderabad has reaffirmed in multiple judgments that obtaining probate or letters of administration is purely optional for Hindus, Buddhists, Sikhs, and Jains bequeathing properties within Telangana.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-sm block">Direct Municipal &amp; Revenue Transfers:</strong>
                    <span>GHMC, HMDA, TSIIC, and local Gram Panchayats do not demand court probate before effecting mutation, provided the claimant presents a legally registered Will and certified death certificate.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-sm block">Exception for Contested Estates:</strong>
                    <span>If disgruntled legal heirs formally file a civil suit alleging suspicious execution or forgery, the propounder may voluntarily initiate probate proceedings before the City Civil Court in Hyderabad or the relevant District Court to conclusively extinguish adverse claims.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: SRO DIRECTORY */}
            <section id="telangana-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION JURISDICTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Telangana Sub-Registrar Offices: SRO Jurisdiction Guide
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 31 &amp; Section 32 of the Registration Act</strong>, a Will can be presented at any Sub-Registrar Office within Telangana or at the office of the District Registrar. Locate your nearest registry hub:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search SRO by area or locality (e.g., Banjara Hills, Gachibowli, Warangal, Kukatpally)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm focus:outline-hidden focus:border-[#C65378] shadow-xs transition-colors"
                />
              </div>

              {/* SRO HUBS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHubs.map((hub) => (
                  <div
                    key={hub.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {hub.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 text-[#C65378] font-bold text-[10px] uppercase">
                          Active SRO
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium">
                        {hub.sro}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        <strong>Address:</strong> {hub.address}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        <strong>Jurisdiction Areas:</strong> {hub.areas}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <strong>Timings:</strong> {hub.timings}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-600">
                        Online Slots Available
                      </span>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] hover:text-[#a13c5d]"
                      >
                        <span>Book Assistance</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6: REGIONAL CITIES (EXACT SAME COMPONENT AS NASHIK LOCAL AREAS, RENAMED) */}
            <section id="telangana-regional-cities" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGIONAL CITIES COVERAGE &amp; ASSET NUANCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Regional Cities: Area-Wise Will Drafting in Telangana
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Telangana span upscale gated communities and high-rise apartments in Hyderabad and Cyberabad, urban plotted developments in Warangal and Nizamabad, industrial and granite enterprises in Karimnagar, and fertile farmlands on the Dharani portal across Mahabubnagar and Nalgonda. Our estate advocates provide customized legal drafting, IGRS Telangana slot scheduling, and Sub-Registrar accompaniment across all key regions:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CITY 1: HYDERABAD & SECUNDERABAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Capital &amp; Tech Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Banjara Hills &amp; Serilingampally
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Hyderabad &amp; Secunderabad
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Banjara Hills</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jubilee Hills</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">HITEC City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gachibowli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Secunderabad</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Hyderabad &amp; Secunderabad</strong> for luxury high-rise apartments, gated villas, commercial showrooms, and global tech equity portfolios. Streamlines GHMC property tax mutation, share transmission, and corporate shareholding succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Banjara Hills, Serilingampally &amp; Chikkadpally</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Cyber Treasury e-Challan generation, advocate accompaniment, and Section 31 doorstep execution across Hyderabad.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · Nominal IGRS Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Hyderabad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Hyderabad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 2: WARANGAL & HANAMKONDA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Second Urban Agglomeration
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Warangal &amp; Hanamkonda
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Warangal &amp; Hanamkonda
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hanamkonda</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kazipet</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Subedari</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">KUDA Layouts</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Naimnagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Warangal &amp; Hanamkonda</strong> for residential plots under KUDA (Kakatiya Urban Development Authority), educational institutions, retail commercial establishments, and family ancestral assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Subedari Administrative Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast slot booking, comprehensive asset mapping, and expedited Book III registration for tricity residents.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Residential &amp; Commercial</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Warangal"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Warangal Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 3: NIZAMABAD & BODHAN */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Agro-Commercial Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nizamabad &amp; Bodhan
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Nizamabad &amp; Bodhan
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Subhashnagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Khaleelwadi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bodhan</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Armoor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Varni Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Nizamabad &amp; Bodhan</strong> covering major turmeric processing businesses, commercial trading firms, and agricultural farmlands. Seamless Dharani integration prevents multi-generational partition litigations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Road &amp; Bodhan Tehsil</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Comprehensive family asset audits, doctor certificates for senior testators, and verified Book III custody.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Agro-Trading &amp; Farmland</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nizamabad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nizamabad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 4: KARIMNAGAR & RAMAGUNDAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Granite &amp; Industrial Power Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Karimnagar &amp; Ramagundam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Karimnagar &amp; Ramagundam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Manair River Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Collectorate Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Godavarikhani</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramagundam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">NTPC Township</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Karimnagar &amp; Ramagundam</strong> for granite quarry businesses, industrial employee savings, residential plots, and agricultural orchards along the Manair river basin.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Court Complex &amp; Ramagundam Sub-Tehsil</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Industrial asset bequeathal, retirement provident fund succession, and local Sub-Registrar accompaniment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Industrial &amp; Granite Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Karimnagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Karimnagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 5: KHAMMAM & KOTHAGUDEM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Eastern Agro-Industrial Gateway
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Khammam &amp; Kothagudem
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Khammam &amp; Kothagudem
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wyra Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mamillagudem</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kothagudem</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Palwancha</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Yellandu</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Khammam &amp; Kothagudem</strong> for chili trading estates, coal mining belt employees, commercial real estate, and extensive mango and cotton plantations requiring Dharani passbook updates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Khammam District Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Clear agricultural succession protocols, life-interest rights for spouses, and seamless SRO registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Chili Trade &amp; Coal Belt</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Khammam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Khammam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 6: MAHABUBNAGAR & JADCHERLA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Highway Gateway
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mahabubnagar &amp; Jadcherla
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mahabubnagar &amp; Jadcherla
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Yenugonda</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Christian Pally</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jadcherla SEZ</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhootpur Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">NH-44 Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in Mahabubnagar &amp; Jadcherla</strong> targeting pharmaceutical SEZ enterprises, high-value agricultural layouts on NH-44, and multi-heir ancestral estates across Palamuru.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mahabubnagar Collectorate &amp; Jadcherla</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online slot booking on IGRS Telangana, revenue mutation assistance, and senior citizen doorstep execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Pharma SEZ &amp; Highway Corridors</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mahabubnagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Mahabubnagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 7: NALGONDA & SURYAPET */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Hyderabad-Vijayawada Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Nalgonda &amp; Suryapet
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Nalgonda &amp; Suryapet
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Clock Tower</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Devarakonda Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Suryapet Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Miryalaguda</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">NH-65 Highway</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Nalgonda &amp; Suryapet</strong> covering prime commercial plots along the Hyderabad-Vijayawada highway, rice milling businesses, and vast wetland and dryland agricultural parcels.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Nalgonda Collectorate &amp; Suryapet Town</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Accurate survey number identification, minor trust mechanisms, and secure SRO Book III storage.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Highway Plots &amp; Farmlands</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nalgonda"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nalgonda Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CITY 8: MEDCHAL & SANGAREDDY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        ORR Expansion Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Medchal &amp; Sangareddy
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Medchal &amp; Sangareddy
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kompally</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Medchal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Patancheru</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sangareddy</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tellapur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Medchal &amp; Sangareddy</strong> for gated luxury villa townships along Outer Ring Road (ORR), industrial manufacturing factories, and suburban investment plots.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Medchal Highway &amp; Sangareddy Town</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-growth asset estate planning, digital share bequeathal, and streamlined Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Gated Villas &amp; ORR Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Medchal"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Medchal Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-telangana-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Drafting to IGR Registration in Telangana
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified 5-stage legal operating procedure to create, execute, and register your Will before the Sub-Registrar in Telangana:
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
                      Compile complete details of GHMC flats, HMDA plots, Dharani survey numbers, bank accounts, and demat portfolios.
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
                      Draft customized legal clauses covering revocation of past wills, survivorship, executor powers, and minor guardianships.
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
                      Print on A4 paper and sign each page in the physical presence of two independent non-beneficiary adult witnesses.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      IGRS Slot Booking
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Schedule your slot on the IGRS Telangana portal (registration.telangana.gov.in) and pay the nominal fee online via Cyber Treasury.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      5
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      SRO Biometrics
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Telangana SRO with witnesses for verbal verification, photo capture, and biometric thumbprint to seal Book III entry.
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
                  7. Section 31 Doorstep SRO Registration for Senior Citizens
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly, unwell, or bedridden citizens residing in Banjara Hills, Jubilee Hills, Secunderabad, Warangal, or regional towns, traveling to the Sub-Registrar Office can be a physical hardship. Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar possesses statutory authority to attend a private home or hospital room to complete registration.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Doorstep SRO Registration Operates Across Telangana:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Medical Certificate</strong>
                      <span className="text-slate-600">A registered MBBS or MD doctor certifies that the senior citizen possesses full testamentary capacity but is medically advised against traveling.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Commission Application</strong>
                      <span className="text-slate-600">Our legal team prepares and submits the formal Section 31 special commission petition before the jurisdictional Telangana Sub-Registrar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Official Commission Fee</strong>
                      <span className="text-slate-600">A nominal government commission fee is remitted through Cyber Treasury to schedule the official officer home visit.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Portable Biometric Equipment</strong>
                      <span className="text-slate-600">The Sub-Registrar visits your home with portable biometric scanners and webcams to capture verified identity records.</span>
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
                  8. Document Checklist for Telangana Sub-Registrar Offices
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
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        item.checked
                          ? "bg-rose-50/50 border-rose-300 text-slate-900"
                          : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          item.checked
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

            {/* SECTION 10: PROPERTY TYPES */}
            <section id="telangana-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>PROPERTY DYNAMICS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Telangana Property Types: GHMC Flats, Dharani &amp; Plots
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession procedures in Telangana vary considerably depending on whether the estate encompasses urban municipal assets or rural agricultural parcels:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    Urban Municipal Assets
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    GHMC Flats &amp; HMDA Gated Villas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For apartments in HITEC City, Gachibowli, and Secunderabad, the registered Will serves as conclusive evidence for GHMC property tax mutation and apartment owners association share transfer without dispute.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Agricultural Land Records
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Dharani Farmland &amp; e-Pattadar Passbooks
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Agricultural lands across Mahabubnagar, Nalgonda, and Nizamabad require accurate Khata and survey numbers in the Will. Upon death, the Tahsildar processes mutation directly on the Dharani portal.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    Commercial &amp; Financial Wealth
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Retail Units, Demat Shares &amp; RSUs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For tech professionals and family businesses, clear clauses govern multinational stock units (RSUs), demat holdings, commercial lease rentals, and proprietary partnership succession.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: REGISTRATION FEES & CHARGES */}
            <section id="telangana-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official IGRS Telangana Registration Fees &amp; Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike commercial sale deeds or gift transfers that incur high ad-valorem stamp duty in Telangana, testamentary Wills are completely exempt from stamp duty. Government registration fees are purely nominal:
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
                      <td className="p-4 font-semibold">Telangana Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Government of Telangana</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Book III Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 – ₹200 (Nominal Fee)</td>
                      <td className="p-4">IGRS Telangana via Cyber Treasury</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">User Charges &amp; Document Scanning</td>
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
                  11. Transparent Will Packages &amp; Legal Fees in Telangana
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal assistance package tailored to your family&apos;s estate planning and property portfolio across Telangana:
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
                      Ideal for individual homeowners with GHMC flats, bank accounts, and demat assets.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Telangana Will creator</span>
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
                    Most Popular in Telangana
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
                      Senior estate advocate review for GHMC villas, Dharani farmland, and multi-heir portfolios.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 consultation with senior advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for farmland &amp; business shares</span>
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
                      End-to-end registration coordination across any Telangana Sub-Registrar Office or home visit.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>IGRS Telangana appointment scheduling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advocate physically attends Telangana SRO</span>
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
                  12. Frequently Asked Questions: Will Drafting in Telangana
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Authoritative answers to common legal questions regarding Will drafting, Dharani land transfer, and registration in Telangana:
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
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
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
                  13. Statutory Citations &amp; Telangana Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our drafting protocols comply strictly with codified Indian statutes and Telangana state registration systems:
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
                    Telangana ROR Act 2020
                  </span>
                  <p className="text-xs text-slate-600">
                    Dharani digital land portal succession and e-Pattadar passbook transfer rules.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    IGRS Telangana Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official e-Challan &amp; slot scheduling portal: <code>registration.telangana.gov.in</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Telangana Properties &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Hyderabad apartments, commercial assets, or farmlands to administrative uncertainty. Draft a legally binding Will online today or consult our senior advocates.
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
                Visual Blueprint: Telangana Will Drafting &amp; Property Succession Framework
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
                src="/images/will-drafting-in-telangana.jpg"
                alt="High Resolution Visual Blueprint: Telangana Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Telangana SRO Registered &amp; Dharani Portal Compliant</span>
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
