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
  Factory,
  Briefcase,
  Store,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "indore-overview", label: "OVERVIEW" },
  { id: "indore-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "indore-probate-rules", label: "PROBATE RULES" },
  { id: "indore-sro-directory", label: "SRO DIRECTORY" },
  { id: "indore-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-indore-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "indore-property-types", label: "ASSET TYPES" },
  { id: "indore-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const INDORE_DISTRICTS = [
  {
    id: "moti-bungalow",
    name: "SRO 1: Moti Bungalow (Collectorate)",
    sro: "Sub-Registrar Office 1 (Indore Central)",
    address: "Old Collectorate Compound, Moti Bungalow, Moti Tabela, Indore - 452004",
    areas: "Old Palasia, South Tukoganj, MG Road, Jail Road, Sarafa Bazaar, Chhavani, New Palasia, Manik Bagh",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, State Holidays closed)",
  },
  {
    id: "kila-maidan",
    name: "SRO 2: Kila Maidan (Western Zone)",
    sro: "Sub-Registrar Office 2 (Indore West)",
    address: "Administrative Complex, Kila Maidan, Near Police Line, Malharganj, Indore - 452006",
    areas: "Kila Maidan, Malharganj, Subhash Nagar, Bada Ganpati, Sangam Nagar, Airport Road, Banganga, Mari Mata",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, State Holidays closed)",
  },
  {
    id: "bicholi-mardana",
    name: "SRO 3: Bicholi Mardana (Bypass Zone)",
    sro: "Sub-Registrar Office 3 (Indore East)",
    address: "Revenue Zonal Complex, Near Bicholi Mardana Square, Bypass Road, Indore - 452016",
    areas: "Bicholi Mardana, Kanadia, Bengali Square, Pipliyahana, Bypass Townships, Tillor Khurd, Khajrana, Tilak Nagar",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, State Holidays closed)",
  },
  {
    id: "scheme-78",
    name: "SRO 4: Scheme 78 (Vijay Nagar Zone)",
    sro: "Sub-Registrar Office 4 (Indore North)",
    address: "Commercial Administrative Complex, Near Bapat Square, Scheme 78, Vijay Nagar, Indore - 452010",
    areas: "Vijay Nagar, Scheme 54, Scheme 78, Scheme 114, Bapat Square, Radisson Square, MR-10, Mahalaxmi Nagar, Super Corridor",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, State Holidays closed)",
  },
  {
    id: "mhow",
    name: "SRO Mhow (Dr. Ambedkar Nagar & Rau)",
    sro: "Sub-Registrar Office Mhow Tehsil",
    address: "Tehsil & SDM Office Complex, Dr. Ambedkar Nagar (Mhow), Indore District - 453441",
    areas: "Mhow Cantonment, Rau, Rajendra Nagar, Silicon City, CAT Road, AB Road South, Pithampur Access Belt",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, State Holidays closed)",
  },
  {
    id: "sanwer",
    name: "SRO Sanwer (Industrial & Agrarian Hub)",
    sro: "Sub-Registrar Office Sanwer Tehsil",
    address: "Tehsil Office Campus, Sanwer, Indore District - 453551",
    areas: "Sanwer Town, Sanwer Road Industrial Area (Sectors A-F), Alwasa, Reoti, Kshipra Basin Agricultural Holdings",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, State Holidays closed)",
  },
  {
    id: "depalpur",
    name: "SRO Depalpur (Betma & Farmland Belt)",
    sro: "Sub-Registrar Office Depalpur Tehsil",
    address: "Tehsil Administrative Compound, Depalpur, Indore District - 453115",
    areas: "Depalpur, Betma Industrial Cluster, Gautampura, Chambal River Basin Farmlands, Hatod, Rural Ancestral Estates",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, State Holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed on standard white A4 sheets. No expensive stamp paper is required under Madhya Pradesh law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Required for biometric identity check and digital photograph capture on the MP Sampada 2.0 portal.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Witnesses must carry original photo IDs and must not be heirs receiving asset in the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Indore Development Office (IDA) Allotment / Lease Deed",
    detail: "Required for IDA Scheme plots (Scheme 54, 78, 114, 140) to verify title description and lease terms.",
    checked: true,
  },
  {
    id: "item-5",
    label: "Indore City City Board (IMC) Asset Tax Receipt",
    detail: "Recent asset tax receipt confirming city house assessment number and ward classification.",
    checked: false,
  },
  {
    id: "item-6",
    label: "MBBS Filed Doctor's Mental Fitness Paper",
    detail: "Needed for senior citizens aged 60+ and doorstep Section 31 registrations to prove sound sound mind.",
    checked: false,
  },
  {
    id: "item-7",
    label: "MP Sampada 2.0 e-Appointment Slot Token Receipt",
    detail: "Generated after paying the nominal ₹1,000 government filing fee on sampada.mpigr.gov.in.",
    checked: false,
  },
];

export default function IndoreLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("indore-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("scheme-78");
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

  const filteredDistricts = INDORE_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    INDORE_DISTRICTS.find((d) => d.id === selectedDistrict) || INDORE_DISTRICTS[0];

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
                <span>INDORE ESTATE &amp; SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 55 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Indore: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your IDA plots, home assets, trading business shares, and farm lands in Indore.
                Get experienced lawyer drafting, MP Sampada 2.0 filing guidance, and doorstep signing for senior citizens.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Indore Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#indore-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Indore SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>MP High Court Bench Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 MP Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Home Visits</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULL VISIBILITY ENSURED IN BOTH MOBILE & DESKTOP */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
                title="Click to view full resolution infographic"
              >
                <Image
                  src="/images/will-drafting-in-indore.jpg"
                  alt="Legal Will Drafting and Asset Succession in Indore"
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
                7 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Indore District Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Stamp Exempt in MP
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                A Choice Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                MP High Court Rulings
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                MP Sampada 2.0
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Online Slot Booking
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
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileTocOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeId === item.id
                      ? "bg-rose-50 text-[#C65378]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
          MAIN CONTAINER: 3-COL STICKY DESKTOP TOC + 9-COL CONTENT
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* DESKTOP LEFT SIDEBAR: STICKY TOC (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-5">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Indore Guide Index
                  </span>
                </div>
                <nav className="space-y-1">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeId === item.id
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* QUICK CTA BOX */}
              <div className="bg-gradient-to-br from-[#172228] to-[#212F35] text-white rounded-3xl p-5 space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-rose-300">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Senior Lawyers
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Need custom clauses for IDA plots, Sarafa jewelry assets, or Pithampur shop units?
                </p>
                <a
                  href="/contact"
                  className="block text-center w-full py-2.5 rounded-xl bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#a13c5d] transition-all shadow-xs"
                >
                  Consult Indore Lawyer
                </a>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: MAIN CONTENT (9 COLS) */}
          <main className="lg:col-span-9 space-y-12">

            {/* =========================================================================
                SECTION: OVERVIEW & KEY HIGHLIGHTS
                ========================================================================= */}
            <section
              id="indore-overview"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold tracking-wide uppercase">
                  <Award className="w-3.5 h-3.5" />
                  <span>Executive Legal Briefing</span>
                </div>
                {/* H2: 47 characters */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Indore
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Indore is the shop and plant capital of Madhya Pradesh. As families accumulate home real estate,
                  IDA leasehold plots, bullion assets in Sarafa Bazaar, and shares in Pithampur enterprises, estate planning becomes crucial.
                  Writing a clear legal Will prevents devastating estate fights among legal heirs and guarantees that your hard-earned assets
                  pass strictly according to your wishes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Court Probate is A Choice</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the Indian Succession Act 1925, court probate is not needed in Madhya Pradesh.
                    Heirs can directly transfer city and revenue titles without expensive court petitions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>IDA Plot Estate Safeguards</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Indore Development Office (IDA) requires a valid filed Will for seamless transfer of leasehold rights
                    or freehold conversion across Scheme 54, Scheme 78, and Scheme 140.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Stamp className="w-4 h-4 text-[#C65378]" />
                    <span>₹0 Stamp Duty on MP Wills</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Wills are 100% exempt from ad-valorem stamp duty across Madhya Pradesh.
                    Will makers only pay a nominal government filing fee of ₹1,000 on MP Sampada 2.0.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>Doorstep SRO Visits for Seniors</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 31 of the Filing Act, elderly and infirm Will makers can complete biometric filing
                    at their homes in Palasia, Saket, or Manoramaganj via an official SRO commission.
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 1: LEGAL FRAMEWORK
                ========================================================================= */}
            <section
              id="indore-legal-framework"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>STATUTORY FOUNDATION</span>
                </div>
                {/* H2: 45 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework: Will Drafting in Indore, MP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  In Indore and across Madhya Pradesh, Will estate is governed by a combination of Central statutes,
                  state revenue laws, and landmark judicial rulings delivered by the Madhya Pradesh High Court Bench at Indore:
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">
                    The Indian Succession Act, 1925
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Section 59 establishes that any adult of sound mind may dispose of their self-acquired asset through a Will.
                    Section 63 mandates that the Will must be in writing, signed or thumb-impressed by the Will maker, and attested
                    by at least two independent adult witnesses who observe the Will maker signing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">
                    The Hindu Succession Act, 1956
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Section 30 empowers Hindus, Jains, Sikhs, and Buddhists to bequeath their self-acquired assets as well as their
                    undivided joint family interest in joint family asset. In Indore mercantile families, this allows clear split
                    of family trading shops and HUF shares.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">
                    The Madhya Pradesh Land Revenue Code (MPLRC), 1959
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    For farm farmlands in Sanwer, Depalpur, Rau, and Betma, Will bequests of Bhumiswami rights
                    must comply with the MPLRC. A clearly worded Will simplifies name change proceedings before the local Tehsildar
                    and avoids revenue split court fights.
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 2: MANDATORY VS OPTIONAL REGISTRATION
                ========================================================================= */}
            <section
              id="mandatory-vs-optional"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>REGISTRATION ACT PROVISIONS</span>
                </div>
                {/* H2: 46 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Indore, MP?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Filing Act, 1908, the filing of a Will is a choice throughout India.
                  An plain Will signed on plain A4 paper and signed before two witnesses possesses legal validity.
                  However, in a high-value real estate hub like Indore, registering your Will at the local SRO office
                  via MP Sampada 2.0 provides vital legal protections.
                </p>
              </div>

              {/* COMPARISON CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-5 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Plain Will in Indore</span>
                  </div>
                  <ul className="space-y-2 text-xs text-amber-900/90">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Vulnerable to false allegations of forgery or undue influence.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Requires calling surviving witnesses to prove signing.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>IDA and banks often demand indemnity bonds and local NOCs.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Higher risk of family civil court fights delaying name change.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Filed Will on MP Sampada 2.0</span>
                  </div>
                  <ul className="space-y-2 text-xs text-emerald-900/90">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>SRO personally verifies Will maker identity and mental capacity.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Biometric fingerprint and digital photo permanently archived in Book III.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Enjoys legal presumption of genuine signing under Evidence Act.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Fast-track asset name change before IMC and IDA Estate Section.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 3: PROBATE RULES IN MADHYA PRADESH
                ========================================================================= */}
            <section
              id="indore-probate-rules"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>HIGH COURT JURISPRUDENCE</span>
                </div>
                {/* H2: 48 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Indore Probate Rules: MP Non-Presidency Town Law
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the most frequent questions asked by Indore asset owners is whether their legal heirs must get
                  court probate to inherit asset. Under Indian succession jurisprudence, Madhya Pradesh is a non-presidency state:
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 text-xs sm:text-sm text-slate-700">
                <p className="font-semibold text-slate-900">
                  Section 213 read with Section 57 of the Indian Succession Act, 1925:
                </p>
                <p>
                  Probate is needed ONLY for Wills signed within the historical presidency towns of Mumbai, Kolkata, and Chennai,
                  or where the land and flats bequeathed fall within those territories.
                </p>
                <p>
                  Because Indore, Bhopal, Jabalpur, and Gwalior were never British presidency towns, probate is completely a choice
                  for Hindu, Sikh, Jain, and Buddhist Will makers in Madhya Pradesh. The Madhya Pradesh High Court Bench at Indore
                  has consistently reaffirmed that legal heirs can set up their rights, execute IDA lease transfers, and mutate IMC
                  asset tax records without first getting a probate order from the District Court.
                </p>
              </div>

              {/* PROBATE COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="p-3 sm:p-4">Area</th>
                      <th className="p-3 sm:p-4">Probate Rule</th>
                      <th className="p-3 sm:p-4">Legal Rule</th>
                      <th className="p-3 sm:p-4">Asset Transfer Route</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70">
                    <tr className="bg-white hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Indore &amp; Madhya Pradesh
                      </td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-extrabold">
                        A Choice / Not Needed
                      </td>
                      <td className="p-3 sm:p-4">
                        Sec 213(2) read with Sec 57 ISA
                      </td>
                      <td className="p-3 sm:p-4">
                        Direct name change via IDA, IMC, or Tehsildar using Filed Will
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50 hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Mumbai, Kolkata, Chennai
                      </td>
                      <td className="p-3 sm:p-4 text-rose-700 font-extrabold">
                        Needed
                      </td>
                      <td className="p-3 sm:p-4">
                        Sec 213(1) read with Sec 57(a)/(b) ISA
                      </td>
                      <td className="p-3 sm:p-4">
                        Needed High Court Will probate petition required
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* =========================================================================
                SECTION 4: INDORE SRO DIRECTORY
                ========================================================================= */}
            <section
              id="indore-sro-directory"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <Building className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>REGISTRATION OFFICES</span>
                </div>
                {/* H2: 49 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Indore SRO Offices: SRO Zone Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Indore district is served by multiple SRO Offices operating under the MP Shop Tax and Filing
                  Office. All offices operate on the MP Sampada 2.0 digital filing system. Use our directory to identify
                  your local filing zone:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search by area name (e.g. Vijay Nagar, Palasia, Mhow, Scheme 54, Sanwer)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#C65378] bg-slate-50/50"
                />
              </div>

              {/* INTERACTIVE DISTRICT SELECTOR */}
              <div className="flex flex-wrap gap-2 pt-1">
                {filteredDistricts.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDistrict(d.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedDistrict === d.id
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {d.name.split(":")[0]}
                  </button>
                ))}
              </div>

              {/* ACTIVE DISTRICT CARD */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      {activeDistrictData.name}
                    </h3>
                    <span className="text-xs text-[#C65378] font-bold">
                      {activeDistrictData.sro}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold self-start sm:self-auto">
                    MP Sampada 2.0 Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">
                      Office Address:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {activeDistrictData.address}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">
                      Public Timings:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {activeDistrictData.timings}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1 text-xs">
                    Key Localities &amp; Colonies Covered:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeDistrictData.areas}
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 5: AREA-WISE SUCCESSION PLANNING
                ========================================================================= */}
            <section
              id="indore-area-coverage"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                {/* H2: 48 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Indore Localities
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally checked <strong>Will drafting services in Vijay Nagar, Palasia, Sarafa, or Rau</strong>? From shop jewelry showrooms in Sarafa and textile establishments in MT Cloth Market to high-end villas on Bypass Road and modern high-rises in Vijay Nagar, our senior lawyers provide tailored Will drafting, MP Sampada 2.0 slot booking, and SRO accompaniment across Indore:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: VIJAY NAGAR & SCHEME 54 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Building className="w-3.5 h-3.5" />
                        North Shop &amp; Home
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Scheme 78
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vijay Nagar &amp; Scheme 54
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Scheme 54 PU-4</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Scheme 78 Part 2</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Radisson Square</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mahalaxmi Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Providing specialized <strong>Will drafting services in Vijay Nagar</strong>, Scheme 54, and Scheme 78 for IDA leasehold plots, freehold conversions, multi-storey penthouses, demat equity portfolios, and estate of private clinical practices and consulting firms.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Scheme 78 Shop Complex, Vijay Nagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        MP Sampada 2.0 digital appointments, SRO lawyer representation, and doorstep signing across Vijay Nagar.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹1,000 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Vijay Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vijay Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: OLD PALASIA & MANORAMAGANJ */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                        HNI &amp; Heritage Heart
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Moti Bungalow
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Palasia, Manoramaganj &amp; Saket
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Old Palasia Bungalows</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Manoramaganj</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Yeshwant Club Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">South Tukoganj</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Expert <strong>Will drafting services in Palasia</strong>, Manoramaganj, and South Tukoganj for Indore&apos;s oldest industrialist and mercantile families. Our senior legal team assists with complex multi-crore family bungalows, shop showrooms along AB Road, family trusts, private company shareholdings, and Section 31 home visits for elderly Will makers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Moti Bungalow, Near Collectorate (SRO 1)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doctor mental fitness certification, commissioner doorstep booking, and IMC city tax name change support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Section 31 Doorstep Support</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Palasia"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Palasia Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: SARAFA & MT CLOTH MARKET */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Store className="w-3.5 h-3.5 text-[#C65378]" />
                        Bullion &amp; Wholesale Mercantile
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Moti Bungalow &amp; Kila Maidan
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sarafa &amp; MT Cloth Market
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sarafa Bullion Bazaar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">MT Cloth Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Siyaganj Wholesale</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Loha Mandi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Shop <strong>Will drafting services in Sarafa</strong> and MT Cloth Market tailored for joint family trading partnerships, bullion jewelry stores, wholesale merchant firms, family retail shops, firm capital accounts, shop tenancy rights (pagdi), and gold locker reserves.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hubs: Moti Bungalow (SRO 1) &amp; Kila Maidan (SRO 2)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        HUF business estate clauses, partner dissolution safeguards, and fight-prevention arbitration terms.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Business Asset Structuring</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sarafa"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Shop Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: SUPER CORRIDOR & MR-10 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                        Tech Corridor &amp; Smart Townships
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Scheme 78 &amp; Kila Maidan
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services on Super Corridor &amp; MR-10
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Super Corridor Townships</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">TCS &amp; Infosys SEZ</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gandhi Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Airport Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Focused <strong>Will drafting services on Super Corridor</strong> and MR-10 for IT executives, NRIs, and tech leaders holding smart township flats, modern high-rise apartments, IDA home plots (Schemes 151, 166, 169), and startup equity grants.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Scheme 78 &amp; Kila Maidan Office Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Online NRI Will coordination, foreign embassy notarization support, and IDA lease transfer filings.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">NRI &amp; Tech Estate Plans</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services on Super Corridor"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Corridor Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: BYPASS ROAD & BICHOLI MARDANA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Home className="w-3.5 h-3.5 text-[#C65378]" />
                        Luxury Villas &amp; Farmhouses
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Bicholi Mardana
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bicholi Mardana &amp; Bypass Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Silver Springs</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Omaxe City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Scheme 140</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tillor Farmhouses</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Bicholi Mardana</strong> and Bypass Road corridor featuring luxury township villas (Silver Springs, Omaxe City), sprawling farmhouse estates, and Scheme 140 row houses with demarcated share distributions and boundary fight prevention.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Revenue Zonal Complex, Near Bicholi Square (SRO 3)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Bypass home township registrations, joint ownership wills, and farm land estate advisory.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Villa &amp; Farmhouse Bequests</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bicholi Mardana"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bypass Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: RAU, MHOW & PITHAMPUR CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5 text-[#C65378]" />
                        Plant &amp; South Suburban
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mhow &amp; Sanwer
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Rau, Mhow &amp; Pithampur
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rau &amp; Silicon City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajendra Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pithampur Plant Units</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sanwer Road MSME</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom <strong>Will drafting services in Rau</strong>, Rajendra Nagar, Silicon City, and the Mhow–Pithampur plant belt. We address factory leaseholds, plant plot transfers under MPIDC rules, shop machinery, MSME family estate, and home homeowner protection.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hubs: Mhow Tehsil Complex &amp; Sanwer SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        MPIDC plant plot wills, shop partnership transitions, and MPLRC farm estate.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">MSME &amp; Factory Estate Plans</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Rau"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Plant Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 6: STEP-BY-STEP REGISTRATION PROCESS
                ========================================================================= */}
            <section
              id="step-by-step-indore-sop"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>REGISTRATION PROCEDURE</span>
                </div>
                {/* H2: 49 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Filing on MP Sampada 2.0
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Indore is signed digitally through the Madhya Pradesh Shop Tax and Filing
                  Office system (MP Sampada 2.0). Here is the checked 5-step filing protocol:
                </p>
              </div>

              {/* 5-STEP PROTOCOL */}
              <div className="space-y-4 pt-2">
                {/* STEP 1 */}
                <div className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Asset Inventory &amp; Legal Clause Structuring
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a full asset list: IDA plots, home assets, bank accounts, demat holdings,
                      Sarafa jewelry, and partnership firms. Draft specific clauses identifying legal heirs and appointing
                      a trustworthy executor.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Physical Signing Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the drafted Will on plain white A4 paper. The Will maker and two adult witnesses sign each page together.
                      Witnesses must not be heirs receiving asset under the Will, preserving Will independence.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Online Slot Booking on MP Sampada 2.0
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log in to <code>sampada.mpigr.gov.in</code>. Select the appropriate Indore SRO office
                      (Moti Bungalow, Kila Maidan, Bicholi Mardana, or Scheme 78). Enter Will maker and witness details,
                      upload the draft, pay the nominal government fee of ₹1,000, and download the slot token.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Biometric SRO Check &amp; Photo Capture
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the SRO counter at your scheduled time with original Aadhaar cards, PAN cards, and witnesses.
                      The SRO conducts biometric fingerprint scanning, live digital photo capture, and personal inquiry
                      regarding free consent.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Official Book III Endorsement &amp; Certified Copy Download
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The SRO endorses the Will in Book III (Register of Wills). The original filed paper
                      with government seal and unique filing number is handed back to the Will maker, and a digitally signed
                      copy is permanently archived on MP Sampada 2.0.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 7: SECTION 31 DOORSTEP REGISTRATION
                ========================================================================= */}
            <section
              id="section-31-home-visit"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <Home className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION COMMISSION</span>
                </div>
                {/* H2: 43 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep Filing in Indore
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For senior citizens, bedridden people, or hospital patients in Indore who cannot physically endure long waits
                  at the SRO office, the law provides a comfortable, dignified alternative:
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#C65378] text-white">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold">
                      Section 31 of the Filing Act, 1908
                    </h3>
                    <p className="text-xs text-slate-300">
                      Special Commissioner Home Visit for Senior Citizens &amp; Medically Infirm Will makers
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Under Section 31, an form can be submitted to the District Registrar along with a medical fitness paper
                  from a filed MBBS practitioner. Upon approval, an official SRO commissioner visits the Will maker&apos;s
                  residence or hospital room in Palasia, Manoramaganj, Saket, or Vijay Nagar. Biometrics, photographs, and signatures
                  are collected at your doorstep, making sure 100% legal validity without discomfort.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <span className="font-bold text-rose-300 block mb-1">
                      1. Medical Paper
                    </span>
                    <span className="text-slate-300">
                      MBBS doctor certifies Will soundness of mind.
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <span className="font-bold text-rose-300 block mb-1">
                      2. SRO Commission Filing
                    </span>
                    <span className="text-slate-300">
                      Our Indore legal team manages official government fees and petitions.
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <span className="font-bold text-rose-300 block mb-1">
                      3. Doorstep Signing
                    </span>
                    <span className="text-slate-300">
                      Official commissioner completes Book III filing at home.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 8: DOCUMENTS CHECKLIST
                ========================================================================= */}
            <section
              id="documents-checklist"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <FileText className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>PREPARATION CHECKLIST</span>
                </div>
                {/* H2: 44 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Papers Checklist for Indore SRO
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ensure you have all needed papers ready prior to your MP Sampada appointment at the Indore SRO office:
                </p>
              </div>

              {/* PROGRESS BAR */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">Required Papers Ready:</span>
                  <span className="text-[#C65378]">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-[#C65378] transition-all duration-300"
                    style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* CHECKLIST ITEMS */}
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      item.checked
                        ? "bg-rose-50/40 border-rose-200/80"
                        : "bg-white border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        item.checked
                          ? "bg-[#C65378] text-white"
                          : "border-2 border-slate-300 bg-white"
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm block">
                        {item.label}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* =========================================================================
                SECTION 9: INDORE ASSET & PROPERTY TYPES
                ========================================================================= */}
            <section
              id="indore-property-types"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <Building className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>LOCAL ASSET ARCHITECTURE</span>
                </div>
                {/* H2: 47 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Indore Asset Estate: IDA Plots &amp; Businesses
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Indore presents unique real estate, shop, and farm asset structures. Each asset category requires
                  specialized legal treatment in your Will:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h3 className="font-extrabold text-base text-slate-900">
                    1. IDA Leasehold Plots &amp; Freehold Conversion
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Indore Development Office (IDA) plots in Scheme 54, Scheme 78, Scheme 114, and Scheme 140 are governed by lease deeds.
                    Upon the Will maker&apos;s demise, IDA requires a filed Will, death paper, indemnity bond, and public notice
                    in local newspapers to transfer the leasehold rights or process freehold conversion without civil court fights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h3 className="font-extrabold text-base text-slate-900">
                    2. IMC Apartments &amp; City Asset Tax
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For freehold builder floors and multi-storey apartments across Vijay Nagar, Saket, and South Tukoganj,
                    Indore City City Board (IMC) mandates asset tax name change (Sampattikar Namantaran).
                    A filed Will speeds up the transfer of city records, building permissions, and water meter connections.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h3 className="font-extrabold text-base text-slate-900">
                    3. Shop Shops in Sarafa &amp; Cloth Market
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Wholesale trading shops in Maharaja Tukojirao Cloth Market, bullion showrooms in Sarafa Bazaar,
                    and wholesale commodity establishments in Siyaganj often possess high shop goodwill and tenancy rights (pagdi).
                    Our Wills provide bespoke partnership estate terms and protect inventory assets from family fights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h3 className="font-extrabold text-base text-slate-900">
                    4. Farmlands in Sanwer &amp; Depalpur (MPLRC 1959)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Farm holdings in Sanwer, Depalpur, and Rau are subject to the Madhya Pradesh Land Revenue Code, 1959.
                    Will makers with Bhumiswami rights can bequeath specific survey numbers. The heir executes revenue name change
                    (Fauti Namantaran) before the Tehsildar with the filed Will and Khasra-Khatoni land records.
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 10: FEES & STAMP CHARGES
                ========================================================================= */}
            <section
              id="indore-registration-fees"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <Stamp className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>STATUTORY EXEMPTION &amp; COST BREAKDOWN</span>
                </div>
                {/* H2: 44 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official MP Government Fees &amp; Stamp Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  There is a common misconception that registering a Will in Madhya Pradesh involves heavy asset price check taxes.
                  Under the Indian Stamp Act, 1899 (as applicable to Madhya Pradesh), Wills are 100% exempt from stamp duty:
                </p>
              </div>

              {/* COMPARISON TABLE: WILL VS GIFT DEED VS SALE DEED */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="p-3 sm:p-4">Instrument</th>
                      <th className="p-3 sm:p-4">MP Stamp Duty</th>
                      <th className="p-3 sm:p-4">Filing Fee</th>
                      <th className="p-3 sm:p-4">Revocable During Lifetime?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70">
                    <tr className="bg-emerald-50/40">
                      <td className="p-3 sm:p-4 font-bold text-emerald-950">
                        Filed Will (MP Sampada 2.0)
                      </td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-extrabold">
                        ₹0 (100% Exempt)
                      </td>
                      <td className="p-3 sm:p-4 font-bold">
                        ₹1,000 (Nominal Government Fee)
                      </td>
                      <td className="p-3 sm:p-4 text-emerald-800 font-bold">
                        Yes, anytime without fees
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Gift Deed to Family Member
                      </td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">
                        2.5% to 5% of asset market value
                      </td>
                      <td className="p-3 sm:p-4">
                        3% of asset market value
                      </td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">
                        Irrevocable upon signing
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Sale Deed / Transfer Deed
                      </td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">
                        7.5% to 9.5% (Stamp + City Cess)
                      </td>
                      <td className="p-3 sm:p-4">
                        3% of guideline value
                      </td>
                      <td className="p-3 sm:p-4 text-slate-500">
                        Permanent transfer
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">
                  Important Note for Indore Asset Owners:
                </span>
                Unlike a Gift Deed which attracts lakhs of rupees in stamp duty and city cess, a Will allows you to retain
                complete ownership, rental income, and control of your Indore assets throughout your lifetime with zero upfront transfer tax.
              </div>
            </section>

            {/* =========================================================================
                SECTION 11: PLANS & PRICING
                ========================================================================= */}
            <section
              id="service-pricing"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <Award className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL PRICING</span>
                </div>
                {/* H2: 47 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Indore Will Packages &amp; Legal Fees
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the level of legal support tailored to your family&apos;s asset structure and business estate needs in Indore:
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
                      Ideal for single estates comprising bank accounts, mutual funds, demat equity, and home flats.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Free Indore Will drafting platform</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted legal clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download &amp; signing instructions</span>
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
                    Most Popular in Indore
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Full
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Shop &amp; Lawyer Review
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Senior estate lawyer review for IDA plots, Sarafa jewelry assets, MT Cloth Market shops, and HUF business estate.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything included in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 video call with senior legal counsel</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Bespoke IDA plot &amp; shop trading clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>HUF split &amp; witness vetting guidance</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer shadow-xs"
                  >
                    Consult Senior Counsel
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      End-to-End
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Complete SRO Filing
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Full turnkey support: custom drafting, MP Sampada 2.0 slot booking, and lawyer accompaniment at the Indore SRO.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Full plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>MP Sampada 2.0 digital slot booking &amp; challan payment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legal manager accompaniment to Indore SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep commission support available</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Get SRO Help
                  </a>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 12: FAQS
                ========================================================================= */}
            <section
              id="frequently-asked-questions"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <HelpCircle className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>INDORE SPECIFIC FAQS</span>
                </div>
                {/* H2: 41 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Indore Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key questions regarding Will drafting, MP Sampada filing, IDA plot estate, and probate in Indore:
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/80 overflow-hidden transition-all bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-extrabold text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4">{faq.q}</span>
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

            {/* =========================================================================
                SECTION 13: STATUTORY CITATIONS
                ========================================================================= */}
            <section
              id="statutory-citations"
              className="scroll-target bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase">
                  <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>AUTHORITATIVE REFERENCES</span>
                </div>
                {/* H2: 40 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal References &amp; MP Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  All WillDrafting protocols comply strictly with central statutes, Madhya Pradesh state legislation, and official filing systems:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 62, 63, and Section 213 (Non-Presidency Town Probate Rules).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Filing Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (A Choice Filing) and Section 31 (Doorstep Commission).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    MP Sampada 2.0 Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official MP Revenue filing portal: <code>sampada.mpigr.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    MP Land Revenue Code 1959
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 165 and 168 governing Bhumiswami farm estate.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Indore Assets &amp; Family Legacy Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your IDA plots, Sarafa jewelry assets, or Pithampur shop holdings to uncertain estate battles.
                Draft a legally binding Will online in minutes or consult our senior estate planning lawyers.
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
                Visual Blueprint: Indore Will Drafting &amp; Asset Estate Architecture
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative flex-1 min-h-[300px] sm:min-h-[400px] md:min-h-[550px] w-full mt-3 bg-[#172228] rounded-2xl overflow-hidden">
              <Image
                src="/images/will-drafting-in-indore.jpg"
                alt="High Resolution Visual Blueprint: Indore Will Drafting &amp; Asset Succession"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                sizes="(max-width: 1200px) 95vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
