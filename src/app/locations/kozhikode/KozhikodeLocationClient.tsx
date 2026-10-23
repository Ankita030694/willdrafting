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
  Users,
  Briefcase,
  ExternalLink,
  Laptop,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "kozhikode-overview", label: "OVERVIEW" },
  { id: "kozhikode-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "kerala-probate-rules", label: "PROBATE RULES" },
  { id: "kozhikode-sro-directory", label: "SRO DIRECTORY" },
  { id: "kozhikode-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-kozhikode-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "kozhikode-property-types", label: "PROPERTY TYPES" },
  { id: "kozhikode-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const KOZHIKODE_DISTRICTS = [
  {
    id: "civil-station-core",
    name: "Civil Station & Collectorate Hub",
    sro: "SRO Kozhikode (Civil Station)",
    address: "Civil Station Campus, Wayanad Road, Eranhikkal, Kozhikode - 673020",
    areas: "Civil Station, Eranhikkal, Karaparamba, Malaparamba, Florican Road, Paroppadi, East Hill, West Hill, Bilathikulam, Thadambattuthazham",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "beach-heritage-core",
    name: "Beach Road & Heritage Coastal Core",
    sro: "SRO Calicut Beach",
    address: "Registration Department Complex, Near Old Custom House, Beach Road, Vellayil, Kozhikode - 673032",
    areas: "Beach Road, South Beach, Vellayil, Gujarati Street, Silk Street, Valiyangadi (Big Bazaar), Kuttichira, Thekkepuram, Francis Road, Halwa Bazaar",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "mavoor-nadakkavu",
    name: "Mavoor Road, Nadakkavu & Commercial Hub",
    sro: "SRO Chevayur (Mini Civil Station)",
    address: "Mini Civil Station Complex, Chevayur - Medical College Road, Chevayur, Kozhikode - 673017",
    areas: "Chevayur, Mavoor Road, Nadakkavu, Vandipetta, Arayidathupalam, Pottammal, Kottooli, Puthiyara, Calicut Medical College Campus, Kovoor",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "palayam-smstreet",
    name: "SM Street, Palayam & Central City Core",
    sro: "SRO Kozhikode Sub-District (Joint SRO Office)",
    address: "District Registrar Office Campus, Mananchira Square, Kozhikode - 673001",
    areas: "Mananchira, SM Street (Mittai Theruvu), Palayam, Muthalakkulam, Kallai, Chalappuram, Francis Road, Pushpa Junction, Tali Temple Zone",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "feroke-ramanattukara",
    name: "Feroke, Ramanattukara & South Belt",
    sro: "SRO Feroke",
    address: "Chungam Junction, Old Calicut Road, Feroke, Kozhikode - 673631",
    areas: "Feroke, Chungam, Ramanattukara, Kadalundi, Nallalam, Meenchanda, Cheruvannur, Kundayi, Kolathara, Pantheerankavu Bypass",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "elathur-kappad",
    name: "Elathur & Northern Coastal Corridor",
    sro: "SRO Elathur",
    address: "Near Elathur Railway Station Road, NH-66 Corridor, Elathur, Kozhikode - 673303",
    areas: "Elathur, Puthiyangadi, Puthiyakavu, Pavangad, Mokavoor, Chemancheri, Vengali, Korapuzha River Basin, Kappad Beach Zone",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "kunnamangalam-institutions",
    name: "Kunnamangalam, Kakkodi & Education Belt",
    sro: "SRO Kunnamangalam",
    address: "Main Road, Near Kunnamangalam Bus Stand, Kunnamangalam, Kozhikode - 673571",
    areas: "Kunnamangalam, IIM Kozhikode Campus, NIT Calicut Belt, Kakkodi, Makkada, Kuruvattoor, Chathamangalam, Koduvally Highway Belt",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
  {
    id: "beypore-olavanna",
    name: "Beypore Port, Olavanna & Coastal Estuary",
    sro: "SRO Beypore",
    address: "Port Road, Near Beypore Harbour Police Station, Beypore, Kozhikode - 673015",
    areas: "Beypore Port, Gotheeswaram, Olavanna, Mathottam, Arakkinar, Marad, Karuvanthuruthy, Chaliyam Estuary Corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd Sat & public holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed on clean white A4 paper. Under Kerala Stamp Act, Wills are 100% exempt from stamp paper.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Essential for biometric fingerprint scanning and live digital photography at the Kozhikode SRO.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original photo IDs and must not be beneficiaries named in the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Certificate (For Seniors)",
    detail: "Issued by a registered MBBS doctor. Certifies sound testamentary capacity and prevents future challenges.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Kerala PEARLS Portal e-Token Slip",
    detail: "Online appointment booking confirmation from keralaregistration.gov.in with selected time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "e-Treasury Fee Payment Challan (₹1,000)",
    detail: "Official Kerala government registration fee receipt paid online through e-Treasury gateway.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Land Tax Receipt (Thandapper) & Title Deed Copies",
    detail: "Verified copies showing Kozhikode Municipal Corporation property tax and revenue Thandapper details.",
    checked: false,
  },
  {
    id: "item-8",
    label: "Passport & Gulf Residence Visa (For NRIs)",
    detail: "Required for Gulf NRI testators establishing foreign residency and declaring overseas bank holdings.",
    checked: false,
  },
];

export default function KozhikodeLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("kozhikode-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("civil-station-core");
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

  const filteredDistricts = KOZHIKODE_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    KOZHIKODE_DISTRICTS.find((d) => d.id === selectedDistrict) || KOZHIKODE_DISTRICTS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (MUMBAI THEME REPLICA)
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
                <span>KOZHIKODE &amp; MALABAR NRI SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 54 characters (SEO Compliant: 30-65 chars) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Kozhikode: Legal &amp; NRI Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your Kozhikode commercial assets, residential properties, and Gulf diaspora wealth.
                Get senior Kerala High Court advocate vetting, PEARLS portal e-token registration, and Section 31 doorstep execution across Calicut.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Kozhikode Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#kozhikode-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Kozhikode SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kerala High Court Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Kerala Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep Visits</span>
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
                  src="/images/will-drafting-in-kozhikode.jpg"
                  alt="Online Will Drafting and NRI Succession Planning in Kozhikode Kerala"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
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
                Calicut &amp; Malabar
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                City, Coast &amp; Gulf NRIs
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Stamp Duty Exempt
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Section 213 Kerala Exemption
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                PEARLS Portal
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Online Token &amp; SRO Booking
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: DROPDOWN TABLE OF CONTENTS (STICKY BELOW NAVBAR ON MOBILE)
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
          
          {/* DESKTOP VIEW: STICKY TABLE OF CONTENTS */}
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

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-all shadow-md shadow-[#C65378]/20 text-center"
                >
                  <span>Draft Your Will Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <p className="text-[10px] text-center text-slate-400 font-mono">
                  Kerala Registration Act Compliant
                </p>
              </div>
            </div>
          </aside>

          {/* EDITORIAL MAIN CONTENT (8 COLS) */}
          <main className="w-full flex-1 min-w-0 space-y-12">
            
            {/* -------------------------------------------------------------------
                SECTION 1: OVERVIEW
                ------------------------------------------------------------------- */}
            <section id="kozhikode-overview" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 1 · Overview
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                1. Legal Will Drafting in Kozhikode: Assets &amp; NRI Succession
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  Kozhikode, the historic commercial capital of Malabar, is home to a unique economic mix.
                  Families here manage bustling commercial trading firms on Big Bazaar, urban apartments along Mavoor Road,
                  and substantial NRI remittances earned across Gulf cooperation countries.
                  Protecting these diverse assets demands a tailored estate plan under Indian succession laws.
                </p>
                <p>
                  Without a legally drafted Will, your self-acquired wealth falls into intestate succession.
                  In Kerala, multi-heir partitions frequently result in bitter, decades-long civil suits before the District Court.
                  A customized Will grants you total authority to determine exactly who inherits your property,
                  preventing family disputes and guaranteeing financial security for your spouse and children.
                </p>
              </div>

              {/* USP Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Malabar Trading Assets</h3>
                  <p className="text-xs text-slate-600 leading-normal">
                    Protect wholesale firms, partnership shares, and commercial leases across Calicut market hubs.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Gulf NRI Coordination</h3>
                  <p className="text-xs text-slate-600 leading-normal">
                    Harmonize UAE, Qatar, and Saudi Arabia offshore holdings with your Kozhikode family properties.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Swift KMC Mutation</h3>
                  <p className="text-xs text-slate-600 leading-normal">
                    Ensure direct Pokkuvaravu and Thandapper title transfers in local Village and Corporation offices.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 2: LEGAL FRAMEWORK
                ------------------------------------------------------------------- */}
            <section id="kozhikode-legal-framework" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 2 · Statutory Framework
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                2. Kerala Succession Law: Governing Legal Acts &amp; Rules
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  Every testamentary document drafted in Kozhikode operates within central statutes and Kerala state rules.
                  Understanding these core enactments guarantees that your Will remains ironclad against courtroom challenges:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Indian Succession Act, 1925</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 59 governs testamentary capacity, while Section 63 defines strict execution guidelines.
                    The testator must sign the document in the direct physical presence of two independent attesting witnesses.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                    <Stamp className="w-4 h-4 text-[#C65378]" />
                    <span>Registration Act, 1908</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 18(e) makes Will registration optional.
                    Section 31 provides doorstep home registration for elderly or ailing testators who cannot visit the SRO.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Kerala Stamp Act, 1959</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Wills in Kerala are completely exempt from stamp duty.
                    You do not need non-judicial stamp paper. Printing your Will on clean white A4 paper is legally valid.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                    <Building className="w-5 h-5 text-[#C65378]" />
                    <span>Kerala Land Tax Act &amp; Pokkuvaravu</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governs title mutation (Pokkuvaravu) and Thandapper account updates in Kozhikode Corporation and Village Offices.
                    A registered Will guarantees straightforward mutation without complex court decrees.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 3: MANDATORY VS OPTIONAL
                ------------------------------------------------------------------- */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 3 · Registration Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                3. Will Registration in Kerala: Mandatory vs Optional Rules
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  Clients frequently ask whether they must register their Will at a Kozhikode Sub-Registrar Office.
                  Under Indian law, an unregistered Will written on plain paper is legally valid if signed before two adult witnesses.
                  However, registration creates an authentic government record that protects your estate against future disputes.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                    <tr>
                      <th className="p-3.5 sm:p-4">Key Legal Feature</th>
                      <th className="p-3.5 sm:p-4">Unregistered Will</th>
                      <th className="p-3.5 sm:p-4 text-[#C65378]">Registered Will (Recommended)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Legal Validity</td>
                      <td className="p-3.5 sm:p-4">Valid if witnessed per Section 63</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">100% Valid with government seal</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Government Archiving</td>
                      <td className="p-3.5 sm:p-4">Kept at home; risk of loss or destruction</td>
                      <td className="p-3.5 sm:p-4">Archived in Kerala Registration Book III records</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Vulnerability to Challenge</td>
                      <td className="p-3.5 sm:p-4">High risk of forgery or mental fitness claims</td>
                      <td className="p-3.5 sm:p-4">Very low; Sub-Registrar verifies identity directly</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">KMC Mutation &amp; Pokkuvaravu</td>
                      <td className="p-3.5 sm:p-4">Requires extensive inquiry and heir consent</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Swift processing by Village and Municipal staff</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Official Government Fee</td>
                      <td className="p-3.5 sm:p-4">₹0</td>
                      <td className="p-3.5 sm:p-4">₹1,000 nominal fee on Kerala PEARLS portal</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/60 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Advocate Insight:</strong> For families with properties in Nadakkavu, Mavoor Road, or Beach Road,
                  registering your Will at the local Kozhikode SRO eliminates suspicions among siblings.
                  Official Book III registration proves the document was signed voluntarily without coercion.
                </p>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 4: PROBATE RULES
                ------------------------------------------------------------------- */}
            <section id="kerala-probate-rules" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 4 · Probate Guidance
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                4. Probate Exemption in Kerala: Court Order vs Succession Will
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  A common point of confusion is whether property owners in Kozhikode must obtain court probate.
                  Under Section 213 read with Section 57 of the Indian Succession Act, probate is mandatory ONLY for Wills executed
                  within the historical presidency towns of Mumbai, Kolkata, and Chennai, or for properties located in those territories.
                </p>
                <p>
                  Kozhikode is a non-presidency jurisdiction under the Kerala High Court.
                  Consequently, <strong>probate is strictly optional in Kerala</strong> for Hindus, Christians, Sikhs, Jains, and Buddhists.
                  Legal heirs do not need to file an expensive testamentary suit before the High Court or District Court to inherit Calicut assets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <h3 className="text-sm font-bold text-slate-900">When Probate is Not Needed</h3>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Transferring Calicut Corporation residential flats and bungalows.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Liquidating bank fixed deposits and postal savings accounts.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Transmitting demat shares and mutual fund folios to named heirs.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <h3 className="text-sm font-bold text-slate-900">When Probate Becomes Helpful</h3>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <ChevronDown className="w-3.5 h-3.5 text-[#C65378] shrink-0 mt-0.5 rotate-[-90deg]" />
                      <span>Disputed family estates where an excluded relative claims fraud.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <ChevronDown className="w-3.5 h-3.5 text-[#C65378] shrink-0 mt-0.5 rotate-[-90deg]" />
                      <span>Estates holding high-value commercial properties in Mumbai or Chennai.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <ChevronDown className="w-3.5 h-3.5 text-[#C65378] shrink-0 mt-0.5 rotate-[-90deg]" />
                      <span>Foreign financial institutions in the GCC requiring Indian court probate.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 5: SRO DIRECTORY
                ------------------------------------------------------------------- */}
            <section id="kozhikode-sro-directory" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 5 · SRO Directory
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                5. Kozhikode Sub-Registrar Directory: SRO Office Timings
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  Kozhikode district operates multiple Sub-Registrar Offices under the Registration Department of Kerala.
                  Select your residential or property zone below to find the designated office address, local jurisdiction, and operational hours:
                </p>
              </div>

              {/* Search Filter Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search by area (e.g. Nadakkavu, Chevayur, Beach Road, Feroke)..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]/30 shadow-2xs"
                />
              </div>

              {/* SRO District Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {filteredDistricts.map((d) => {
                  const isSelected = selectedDistrict === d.id;
                  return (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDistrict(d.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                        isSelected
                          ? "bg-white border-[#C65378] shadow-md ring-2 ring-[#C65378]/20"
                          : "bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">
                          {d.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-[#C65378] font-bold">
                            SELECTED
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-semibold text-[#C65378]">
                        {d.sro}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {d.areas}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Active District Detail Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C65378] uppercase">
                  <MapPin className="w-4 h-4" />
                  <span>Detailed Office Information · {activeDistrictData.name}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 font-mono text-[11px] block">OFFICE &amp; ADDRESS</span>
                    <p className="font-bold text-slate-900 mt-0.5">{activeDistrictData.sro}</p>
                    <p className="text-slate-600 mt-1 leading-relaxed">{activeDistrictData.address}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[11px] block">OPERATIONAL TIMINGS</span>
                    <p className="font-semibold text-slate-900 mt-0.5">{activeDistrictData.timings}</p>
                    <p className="text-slate-500 mt-1">Book token online via PEARLS portal before visiting.</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 font-mono text-[11px] block mb-1">AREAS COVERED UNDER JURISDICTION</span>
                  <p className="text-slate-700 leading-relaxed">{activeDistrictData.areas}</p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 6: LOCAL AREA COVERAGE
                ------------------------------------------------------------------- */}
            <section id="kozhikode-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Kozhikode Regional Coverage: Calicut Hubs &amp; Suburbs
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in Nadakkavu, Mavoor Road, Beach Road, or Civil Station</strong>? Property ownership models, commercial traditions, and Sub-Registrar jurisdictions vary across Kozhikode.
                  Whether you own a commercial trading enterprise on Big Bazaar, a high-rise apartment on Mavoor Road, an ancestral Tharavadu in Chevayur, or Gulf NRI investments, our Kerala High Court advocates deliver tailored drafting, registration, and succession advisory:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: MAVOOR ROAD & NADAKKAVU */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-Central Commercial
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Chevayur (Mini Civil Station)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mavoor Road &amp; Nadakkavu
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mavoor Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nadakkavu &amp; Vandipetta</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Arayidathupalam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pottammal &amp; Kottooli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Puthiyara</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for professional <strong>Will drafting services in Mavoor Road &amp; Nadakkavu</strong>? This prominent commercial and residential spine houses prime healthcare centers, business establishments, and modern apartments.
                      Under Kerala property laws and Kozhikode Municipal Corporation guidelines, an advocate-drafted Will ensures your apartment deeds, commercial office leases, and bank accounts pass directly to your nominated heirs without requiring expensive indemnity bonds or family disputes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Civil Station Complex, Chevayur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Assistance with Kerala PEARLS online e-token booking, Book III registration, and Section 31 home visits for senior residents across Nadakkavu and Mavoor Road.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹1,000 Govt Fee</span>
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mavoor Road &amp; Nadakkavu"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nadakkavu Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* AREA 2: CALICUT BEACH & VALIYANGADI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Coastal &amp; Trading Heritage
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Calicut Beach
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Beach Road &amp; Valiyangadi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Beach Road &amp; South Beach</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Valiyangadi (Big Bazaar)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gujarati Street &amp; Silk Street</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kuttichira &amp; Thekkepuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vellayil</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Get specialized <strong>Will drafting services in Beach Road &amp; Valiyangadi</strong>. Calicut&apos;s historic trading core hosts century-old wholesale merchant firms, family business partnerships, and ancestral heritage properties.
                      Our High Court advocates draft comprehensive clauses protecting commercial trading capital, merchant goodwill, and prime coastal land holdings, coordinating official registration at the Calicut Beach Sub-Registrar Office near the Old Custom House.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Near Old Custom House, Beach Road, Vellayil</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Full advocate accompanied registration, commercial partnership succession structuring, and Book III permanent record archiving.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Malabar Trading Succession</span>
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Beach Road &amp; Valiyangadi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Beach Road Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* AREA 3: CIVIL STATION & MALAPARAMBA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Administrative &amp; Residential
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kozhikode (Civil Station)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Civil Station &amp; Malaparamba
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Station &amp; Collectorate</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Malaparamba &amp; Paroppadi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karaparamba</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">East Hill &amp; West Hill</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bilathikulam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Consult experienced estate advocates for <strong>Will drafting services in Civil Station &amp; Malaparamba</strong>. Home to government officers, legal professionals, and established residential layouts along Wayanad Road, estates here frequently include independent plots, pension accumulations, and demat investments.
                      We structure airtight bequests for self-acquired bungalows and institutional savings, facilitating seamless title mutation before local Village Revenue Offices.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Civil Station Campus, Wayanad Road, Eranhikkal</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Direct appointment token generation on the Kerala PEARLS portal, biometric thumbprint registration, and Section 31 senior home visits.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Kozhikode District Collectorate</span>
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Civil Station &amp; Malaparamba"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Civil Station Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* AREA 4: SM STREET & PALAYAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central City Retail Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kozhikode Sub-District
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in SM Street &amp; Palayam
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">SM Street (Mittai Theruvu)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mananchira Square</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Palayam &amp; Muthalakkulam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chalappuram &amp; Tali</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kallai Timber Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Secure expert <strong>Will drafting services in SM Street &amp; Palayam</strong>. The heart of Kozhikode features iconic retail establishments on Sweet Meat Street, traditional family residences in Chalappuram, and commercial properties near Mananchira.
                      Our legal team safeguards your commercial assets through dedicated executor appointments, explicit tenancy bequests, and clean succession strategies that avert multi-heir partition litigation.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Registrar Office Campus, Mananchira</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Comprehensive legal advisory, witness verification, and expedited registration support in the heart of Calicut city.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Commercial &amp; Retail Assets</span>
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in SM Street &amp; Palayam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Palayam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* AREA 5: FEROKE & RAMANATTUKARA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Malabar &amp; Airport Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Feroke
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Feroke &amp; Ramanattukara
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Feroke &amp; Chungam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramanattukara Junction</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kadalundi Estuary</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pantheerankavu Bypass</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Meenchanda &amp; Nallalam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Protect your family assets with <strong>Will drafting services in Feroke &amp; Ramanattukara</strong>. Connecting Kozhikode city to Calicut International Airport, this rapidly expanding corridor features tile and industrial hubs alongside new residential gated villas.
                      We draft precise bequests for industrial lands, highway commercial plots, and family homes, guaranteeing hassle-free Pokkuvaravu and Thandapper title mutation in revenue registers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Chungam Junction, Old Calicut Road, Feroke</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online registration fee payment through Kerala e-Treasury, biometric authentication, and advocate assistance at SRO Feroke.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Airport Belt &amp; Highway Plots</span>
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Feroke &amp; Ramanattukara"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Feroke Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* AREA 6: KUNNAMANGALAM & KAKKODI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Education &amp; Gulf Diaspora
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kunnamangalam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kunnamangalam &amp; Kakkodi
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kunnamangalam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">IIM Kozhikode Campus</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">NIT Calicut Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kakkodi &amp; Kuruvattoor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chathamangalam</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Avail premier <strong>Will drafting services in Kunnamangalam &amp; Kakkodi</strong>. Home to premier academic institutions (IIM Kozhikode, NIT Calicut) and families with members working across UAE, Qatar, and Saudi Arabia.
                      Our dual-Will strategy coordinates overseas Gulf bank accounts and foreign properties with domestic Calicut real estate, ensuring your children inherit smoothly under Indian and international succession frameworks.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Main Road, Near Bus Stand, Kunnamangalam</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Gulf NRI cross-border estate coordination, doctor mental fitness certification, and seamless PEARLS registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Gulf NRI &amp; Academic Hub</span>
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kunnamangalam &amp; Kakkodi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kunnamangalam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 7: 5-STEP PROCESS
                ------------------------------------------------------------------- */}
            <section id="step-by-step-kozhikode-sop" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 7 · Standard Operating Procedure
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                7. Five-Step Will Drafting SOP: Kerala PEARLS Registration
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  Drafting and registering your Will in Kozhikode is simple and transparent through our structured procedure.
                  Follow these five clear steps to secure your family estate:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">Step 1: Inventory Assets, GCC Holdings &amp; Heirs</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      List your Kozhikode commercial assets, residential flats, demat shares, bank deposits, and Gulf NRI properties.
                      Identify your primary beneficiaries, alternate heirs, and choose a trustworthy executor.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">Step 2: Legal Drafting &amp; Kerala High Court Review</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Draft your Will online or consult our senior Kerala estate advocate.
                      We incorporate specific bequests, survivorship clauses, and cross-border provisions tailored for NRI families.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">Step 3: Physical Signing Before Two Witnesses</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print the Will on clean A4 paper. Sign every page in the simultaneous presence of two independent adult witnesses.
                      Neither witness can be a beneficiary under the Will to preserve complete legal validity.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">Step 4: Book e-Token on Kerala PEARLS Portal</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Log into the official Kerala Registration portal (keralaregistration.gov.in).
                      Upload document details, pay the ₹1,000 nominal fee via e-Treasury challan, and download your SRO appointment token.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">Step 5: Biometric Verification at Kozhikode SRO</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office in Civil Station, Chevayur, Beach Road, or Feroke with both witnesses.
                      The Sub-Registrar captures biometric thumbprints, records digital photographs, and issues Book III registration.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 8: HOME REGISTRATION
                ------------------------------------------------------------------- */}
            <section id="doorstep-home-registration" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 8 · Doorstep Execution
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                8. Section 31 Doorstep Registration: Home Visits for Seniors
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  For many senior citizens, retired teachers, and bedridden residents across Nadakkavu, Mavoor Road,
                  or Puthiyara, travelling to the Sub-Registrar Office and climbing office stairs can be physically exhausting.
                  Section 31 of the Registration Act, 1908 specifically accommodates such individuals through official doorstep commissioner visits.
                </p>
                <p>
                  Under Section 31, the Kozhikode Sub-Registrar visits the testator&apos;s home or hospital bed to verify identity,
                  record biometric thumbprints, and formalize registration in person.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Doorstep Registration Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-800 block">Medical Certificate</span>
                    <p className="text-slate-600 leading-normal">
                      An MBBS doctor certifies that the testator is mentally alert but physically unable to travel.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-800 block">Government Fee</span>
                    <p className="text-slate-600 leading-normal">
                      Nominal government commission fee paid through Kerala e-Treasury for the official home visit.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-800 block">Advocate Presence</span>
                    <p className="text-slate-600 leading-normal">
                      Our advocate attends the home visit, ensuring smooth documentation and identity verification.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 9: DOCUMENTS CHECKLIST
                ------------------------------------------------------------------- */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 9 · Documentation
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                9. Document Checklist: Requirements for Kozhikode Wills
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  Ensure you have all necessary paperwork prepared before visiting the Kozhikode Sub-Registrar Office.
                  Use our interactive checklist below to verify your documents:
                </p>
              </div>

              {/* Interactive Checklist Box */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">SRO Registration Readiness Checklist</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Click each requirement as you assemble your paperwork.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#C65378]">
                      {checkedCount} of {checklist.length} READY
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/50 border-rose-200/80 shadow-2xs"
                          : "bg-slate-50/60 border-slate-200/80 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-1">
                        <span className={`text-xs font-bold block ${item.checked ? "text-slate-900" : "text-slate-700"}`}>
                          {item.label}
                        </span>
                        <p className="text-[11px] text-slate-500 leading-normal">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 10: PROPERTY TYPES & SCENARIOS
                ------------------------------------------------------------------- */}
            <section id="kozhikode-property-types" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 10 · Asset Structuring
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                10. Malabar Trading &amp; Gulf NRI Estate Structuring Rules
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  Kozhikode presents specialized asset patterns that require experienced legal structuring.
                  Whether you manage generational trading companies or overseas UAE portfolios, here is how our Wills handle your estate:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Commercial Trading Enterprises &amp; Valiyangadi Firms</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kozhikode’s historic wholesale trade on Big Bazaar relies heavily on partnership deeds and sole proprietorships.
                    Our Wills define transmission of business capital, leasehold occupancy rights, and commercial trademarks to successors,
                    avoiding dissolution upon a partner&apos;s death.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Gulf NRI Cross-Border Two-Will Strategy</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Non-Resident Malayalis working in Dubai, Abu Dhabi, Doha, or Riyadh frequently maintain assets in both jurisdictions.
                    We implement a dual-Will architecture: an Indian Will for Kozhikode ancestral lands, flats, and NRE accounts,
                    alongside guidance for DIFC or UAE mainland Wills for Gulf properties, ensuring seamless multi-country succession.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>Kozhikode Municipal Corporation (KMC) Flats &amp; Tharavadu Plots</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ancestral Tharavadu partition deeds and modern KMC apartment complexes require precise property descriptions.
                    Our drafts cross-reference the survey number, re-survey number, village jurisdiction, and Thandapper account number,
                    ensuring unhindered title mutation before local revenue officers.
                  </p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 11: FEES & CHARGES
                ------------------------------------------------------------------- */}
            <section id="kozhikode-registration-fees" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 11 · Costs &amp; Fees
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                11. Kerala Registration Fees: Stamp Duty &amp; PEARLS Charges
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  A major myth is that registering a Will in Kerala requires high percentage-based stamp duties like a sale deed.
                  In reality, Wills enjoy complete exemption from stamp duty under Kerala state laws.
                  The official government expenses are purely nominal:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-2">
                  <span className="text-xs font-mono font-bold text-[#C65378] uppercase block">STAMP DUTY</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">₹0</span>
                  <p className="text-xs text-slate-500">100% exempt under the Kerala Stamp Act, 1959.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-2">
                  <span className="text-xs font-mono font-bold text-[#C65378] uppercase block">REGISTRATION FEE</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">₹1,000</span>
                  <p className="text-xs text-slate-500">Fixed statutory fee paid via Kerala e-Treasury portal.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-2">
                  <span className="text-xs font-mono font-bold text-[#C65378] uppercase block">SCANNING CHARGES</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">₹100 - ₹200</span>
                  <p className="text-xs text-slate-500">Official per-page scanning fee for Book III digital archiving.</p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 12: PLANS & PRICING
                ------------------------------------------------------------------- */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 12 · Transparent Pricing
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                12. Transparent Will Drafting Packages: Kozhikode Pricing
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  We believe in upfront, transparent legal fees with zero hidden charges.
                  Choose the plan that suits your family requirements, from self-service digital drafting to complete SRO accompaniment:
                </p>
              </div>

              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Basic Plan */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      STANDARD
                    </span>
                    <div className="space-y-1">
                      <span className="text-3xl font-extrabold text-slate-900">₹1,990</span>
                      <p className="text-xs text-slate-500">Digital Lawyer-Drafted Will</p>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2.5 pt-4 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant digital questionnaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Kerala Succession Act compliant</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>PDF download ready to print</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 text-center transition-all"
                  >
                    Select ₹1,990 Plan
                  </a>
                </div>

                {/* Advocate Assisted Plan (Highlighted) */}
                <div className="bg-white rounded-2xl border-2 border-[#C65378] p-6 flex flex-col justify-between shadow-xl relative space-y-6">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C65378] text-white text-[10px] font-mono font-bold py-0.5 px-3 rounded-full uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-[#C65378] uppercase tracking-wider block">
                      ADVOCATE CONSULTATION
                    </span>
                    <div className="space-y-1">
                      <span className="text-3xl font-extrabold text-slate-900">₹4,990</span>
                      <p className="text-xs text-slate-500">Kerala High Court Advocate Advisory</p>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2.5 pt-4 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Advocate phone consult</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Gulf NRI asset &amp; business clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Unlimited revisions before signing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor certificate template included</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 px-4 rounded-xl bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] text-center transition-all shadow-md shadow-[#C65378]/25"
                  >
                    Select ₹4,990 Plan
                  </a>
                </div>

                {/* SRO Registration Plan */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      FULL SRO ASSISTANCE
                    </span>
                    <div className="space-y-1">
                      <span className="text-3xl font-extrabold text-slate-900">₹9,990</span>
                      <p className="text-xs text-slate-500">PEARLS Token &amp; SRO Escort</p>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2.5 pt-4 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>PEARLS slot booking &amp; challan payment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Advocate physically escorts at Calicut SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep coordination option</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete Book III registered copy delivery</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/service/will-registration"
                    className="w-full py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 text-center transition-all"
                  >
                    Select ₹9,990 Plan
                  </a>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 13: FAQ
                ------------------------------------------------------------------- */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 13 · Questions &amp; Answers
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                13. Frequently Asked Questions: Will Drafting in Kozhikode
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  Clear, authoritative legal answers to common questions regarding Will drafting, Kerala PEARLS registration,
                  and Gulf NRI succession in Kozhikode:
                </p>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 14: STATUTORY REFERENCES
                ------------------------------------------------------------------- */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-mono font-semibold text-[#C65378] uppercase">
                Section 14 · Legal References
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                14. Governing Statutory Provisions: Indian Succession Acts
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
                <p>
                  Every Will drafted through WillDrafting.in adheres strictly to the codified provisions of Indian legislation
                  and landmark judgments of the Kerala High Court and Supreme Court of India:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                  <span className="font-bold text-slate-900 block">Section 59, Indian Succession Act, 1925</span>
                  <p className="text-slate-600 leading-normal">
                    Establishes who can execute a Will. Every adult of sound mind who is not a minor possesses testamentary capacity.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                  <span className="font-bold text-slate-900 block">Section 63, Indian Succession Act, 1925</span>
                  <p className="text-slate-600 leading-normal">
                    Mandatory attestation rule. The testator must execute the document in the presence of two independent adult witnesses.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                  <span className="font-bold text-slate-900 block">Section 18(e), Registration Act, 1908</span>
                  <p className="text-slate-600 leading-normal">
                    Codifies that registration of a Will is optional, while confirming the legal standing of unregistered Wills.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                  <span className="font-bold text-slate-900 block">Section 31, Registration Act, 1908</span>
                  <p className="text-slate-600 leading-normal">
                    Grants discretionary power to the Sub-Registrar to attend private residences for elderly or infirm citizens.
                  </p>
                </div>
              </div>

              {/* Regional Cross-Links */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  REGIONAL SUCCESSION HUBS IN KERALA
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/locations/kochi"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-all font-medium"
                  >
                    Will Drafting in Kochi
                  </Link>
                  <Link
                    href="/locations/thiruvananthapuram"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-all font-medium"
                  >
                    Will Drafting in Thiruvananthapuram
                  </Link>
                  <Link
                    href="/tools/will-checklist"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-all font-medium"
                  >
                    Interactive Will Checklist
                  </Link>
                  <Link
                    href="/service/will-registration"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-all font-medium"
                  >
                    SRO Will Registration Assistance
                  </Link>
                  <Link
                    href="/blogs/notarized-will-vs-registered-will-india"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-all font-medium"
                  >
                    Notarized vs Registered Will in India
                  </Link>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION MODAL FOR HERO IMAGE
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
                Visual Blueprint: Kozhikode &amp; Malabar Will Drafting &amp; NRI Estate Architecture
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
                src="/images/will-drafting-in-kozhikode.jpg"
                alt="High Resolution Visual Blueprint: Kozhikode Will Drafting and NRI Succession Support"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
