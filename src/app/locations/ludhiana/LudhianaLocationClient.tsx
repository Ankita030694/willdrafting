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
  Briefcase,
  Factory,
  Globe,
  Phone,
  Clock,
  Layers,
  Users,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "ludhiana-overview", label: "OVERVIEW" },
  { id: "ludhiana-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "industrial-succession", label: "INDUSTRIAL SUCCESSION" },
  { id: "nri-farmland-protection", label: "NRI & FARMLAND" },
  { id: "ludhiana-sro-directory", label: "SRO DIRECTORY" },
  { id: "ludhiana-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-ludhiana-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "ludhiana-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const LUDHIANA_DISTRICTS = [
  {
    id: "central",
    name: "Ludhiana Central (Mini Secretariat)",
    sro: "Sub-Registrar Office Central, Ludhiana",
    address: "District Administrative Complex (Mini Secretariat), Ferozepur Road, Ludhiana - 141001",
    areas: "Civil Lines, Sarabha Nagar, Mall Road, College Road, Bharat Nagar Chowk, Ghumar Mandi, Gurdev Nagar, Fountain Chowk",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, NGDRS Token Slots)",
  },
  {
    id: "west",
    name: "Ludhiana West",
    sro: "Sub-Registrar Office West, Ludhiana",
    address: "Tehsil Complex, Mini Secretariat, Ferozepur Road, Ludhiana - 141001",
    areas: "Bhai Randhir Singh (BRS) Nagar, Aggar Nagar, South City, Ayali Kalan, Ferozepur Road Corridor, Barewal Awana, Sunet",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, NGDRS Token Slots)",
  },
  {
    id: "east",
    name: "Ludhiana East (Samrala Chowk / Focal Point)",
    sro: "Sub-Registrar Office East, Ludhiana",
    address: "Sub-Tehsil Complex, Near Transport Nagar, Samrala Chowk, Ludhiana - 141008",
    areas: "Focal Point (Phases 1-8), Industrial Area A, Industrial Area B, Cheema Chowk, Chandigarh Road, Sector 32A GLADA, Motia Khan",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, NGDRS Token Slots)",
  },
  {
    id: "gill",
    name: "Gill Sub-Tehsil (Dugri / Southern Sector)",
    sro: "Sub-Registrar Office Gill",
    address: "Tehsil Complex Gill, Gill Road, Near Canal Colony, Ludhiana - 141116",
    areas: "Dugri Phase 1 & 2, Model Town Extension, Atam Nagar, Shimlapuri, Daba, Gill Village, Dehlon Road",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, NGDRS Token Slots)",
  },
  {
    id: "sahnewal",
    name: "Sahnewal Sub-Tehsil (GT Road / Agro-Industrial)",
    sro: "Sub-Registrar Office Sahnewal",
    address: "Sub-Tehsil Office, Grand Trunk Road, Sahnewal, District Ludhiana - 141120",
    areas: "Sahnewal Town, Airport Belt, Doraha, Kohara, Jugiana, Kanganwal, Pawa Khagat",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, NGDRS Token Slots)",
  },
  {
    id: "jagraon",
    name: "Jagraon Tehsil",
    sro: "Sub-Registrar Office Jagraon",
    address: "Tehsil Office Complex, Old Court Road, Jagraon, District Ludhiana - 142026",
    areas: "Jagraon City, Sidhwan Bet, Raikot Road, Malwa Farmland, Kaonke Kalan, Agwar Lopo",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, NGDRS Token Slots)",
  },
  {
    id: "khanna",
    name: "Khanna Tehsil",
    sro: "Sub-Registrar Office Khanna",
    address: "Tehsil Complex, Grand Trunk Road, Khanna, District Ludhiana - 141401",
    areas: "Khanna City, Asia's Largest Grain Market Corridor, Samrala Road, Payal Border, Bija, Alour",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, NGDRS Token Slots)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Punjab stamp laws, zero stamp paper is required for registering a Will.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Will maker",
    detail: "Needed for digital biometric fingerprinting, iris scanning, and photo capture on the NGDRS Punjab portal.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Witnesses must carry original photo ID proof and must not be heirs receiving property under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Certificate (MBBS Practitioner)",
    detail: "Strongly advised for senior citizens and NRI testators. Confirms sound mind and memory at the time of signing.",
    checked: false,
  },
  {
    id: "item-5",
    label: "GLADA Allotment Letter / Conveyance Deed",
    detail: "Required for urban estates in Dugri, Sector 32A, or Chandigarh Road to make sure exact property schedule accuracy.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Jamabandi / Fard Copy for Rural & Farmland Parcels",
    detail: "Recent computerized record of rights from Punjab Land Records portal (Web-HALRIS) showing khasra numbers.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Industrial Firm & Factory Ownership Papers",
    detail: "Partnership deed, MSME Udyam registration, or ROC share papers for Focal Point manufacturing entities.",
    checked: false,
  },
  {
    id: "item-8",
    label: "NGDRS Punjab Online Appointment Acknowledgment",
    detail: "Official token receipt downloaded from igr.punjab.gov.in showing the scheduled date and time slot at Ludhiana SRO.",
    checked: false,
  },
];

export default function LudhianaLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("ludhiana-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("central");
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
    setOpenFaqIndex((prev) => (prev === index ? null : index));
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

  const filteredDistricts = LUDHIANA_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    LUDHIANA_DISTRICTS.find((d) => d.id === selectedDistrict) || LUDHIANA_DISTRICTS[0];

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
                <span>PUNJAB ESTATE SUCCESSION &amp; NRI DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 54 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Online Will Drafting &amp; NRI Asset Protection in Ludhiana
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your industrial enterprises, GLADA urban estates, and NRI family farmland in Ludhiana.
                Receive senior lawyer legal drafting, NGDRS Punjab e-appointment help, and doorstep registration support across Punjab.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Ludhiana Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#ludhiana-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Ludhiana SRO Directory</span>
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
                  <span>₹0 Punjab Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>NRI Multi-Country Estate</span>
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
                  src="/images/will-drafting-in-ludhiana.jpg"
                  alt="Online Will Drafting & NRI Asset Protection in Ludhiana"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Ludhiana NRI &amp; Industrial Estate Architecture
                </span>
                <button
                  onClick={() => setShowHighResModal(true)}
                  className="text-[#C65378] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  Expand Blueprint ↗
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
                7 Sub-Tehsils
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Ludhiana District SROs
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Stamp Exempt in Punjab
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Sec 213 ISA Punjab Exemption
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                NGDRS Punjab
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Online Biometric Slot Booking
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
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg shadow-2xs"
            aria-expanded={mobileTocOpen}
            aria-controls="mobile-toc-dropdown"
          >
            <span className="flex items-center gap-2 truncate">
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-[#C65378] font-bold">
                TOC
              </span>
              <span className="truncate">{currentActiveToc.label}</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                mobileTocOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileTocOpen && (
            <div
              id="mobile-toc-dropdown"
              className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-xl z-40 py-1"
            >
              {TOC_ITEMS.map((item, idx) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileTocOpen(false)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeId === item.id
                      ? "bg-rose-50 text-[#C65378] font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-400 w-4 text-right">
                    {idx + 1}.
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN BODY LAYOUT: 12-COLUMN GRID (DESKTOP STICKY TOC + MAIN CONTENT)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* DESKTOP LEFT COLUMN: STICKY TOC (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-[#172228]">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <div className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                  Document Navigation
                </div>
              </div>
              <nav className="space-y-1">
                {TOC_ITEMS.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                      activeId === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold shadow-2xs"
                        : "text-[#55636D] hover:bg-slate-50 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className={`text-[10px] font-mono transition-colors ${
                          activeId === item.id
                            ? "text-[#C65378] font-bold"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </span>
                    {activeId === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]" />
                    )}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#a13c5d] transition-all shadow-xs cursor-pointer"
                >
                  <span>Start Drafting Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* TRUST BADGE CARD */}
            <div className="bg-gradient-to-br from-[#172228] to-slate-900 rounded-2xl p-4 text-white text-xs space-y-2.5 border border-white/10 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span>Punjab Legal Compliance</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Drafted by lawyers enrolled with the Bar Council of Punjab and Haryana. Every Will conforms to the Indian Succession Act, 1925 and the Punjab Land Revenue Act.
              </p>
            </div>
          </aside>

          {/* MAIN CONTENT COLUMN: 9 COLS */}
          <main className="lg:col-span-9 space-y-14 sm:space-y-16">
            {/* SECTION 1: OVERVIEW */}
            <section id="ludhiana-overview" className="scroll-target space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 1</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                1. Estate Planning in Ludhiana: Industrial &amp; NRI Realities
              </h2>

              <p className="text-base text-slate-700 leading-relaxed">
                Ludhiana is the shop capital of Punjab and the thriving industrial heartbeat of Northern India.
                From premier manufacturing operations in Focal Point and Industrial Area to upscale home sectors in Sarabha Nagar and Model Town, estates in Ludhiana encompass dynamic assets that require meticulous succession planning.
              </p>

              <p className="text-base text-slate-700 leading-relaxed">
                Also, Ludhiana has one of India&apos;s highest densities of Non-Resident Indian (NRI) families.
                NRIs living in Canada, the United Kingdom, the United States, and Australia retain valuable family farmland, shop showrooms, and GLADA urban plots across Ludhiana district.
                Without a clearly registered Will, these cross-border assets face serious threats of unlawful tenant encroachment, fraudulent revenue record falsification, and protracted split court fights among extended cousins.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <Factory className="w-5 h-5 text-[#C65378] mb-2" />
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    Industrial Succession
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Protect hosiery, bicycle components, and textile units from corporate freeze upon the patriarch&apos;s demise.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <Globe className="w-5 h-5 text-[#5F7E75] mb-2" />
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    NRI Asset Security
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Safeguard family land in Sahnewal, Gill, and Jagraon against fraudulent mutations and power-of-attorney misuse.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <Building className="w-5 h-5 text-indigo-600 mb-2" />
                  <h3 className="font-extrabold text-sm text-[#172228]">
                    GLADA &amp; Municipal Name Change
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Facilitate seamless title substitution for freehold and leasehold plots under GLADA and Ludhiana Municipal Corporation.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: LEGAL FRAMEWORK & PROBATE OPTIONAL */}
            <section id="ludhiana-legal-framework" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 2</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                2. Punjab Legal Framework: Why Probate Is Optional
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                Many families in Ludhiana harbor the misconception that a Will cannot be enforced without an expensive and time-consuming court probate decree.
                Under the Indian Succession Act, 1925, probate is needed strictly within the historical presidency towns of Mumbai, Kolkata, and Chennai.
              </p>

              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                  <Scale className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Punjab &amp; Haryana High Court Legal Precedents</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  In seminal judgments including <span className="font-semibold italic">Ram Chand v. Sardara Singh (AIR 1962 P&amp;H 382)</span> and <span className="font-semibold italic">Madan Lal v. Dev Raj</span>, the Punjab &amp; Haryana High Court conclusively ruled that Section 213 of the Indian Succession Act, 1925 does not apply to Wills signed by Hindus, Sikhs, Jains, or Buddhists in Punjab, Haryana, and Chandigarh.
                  Heirs are <strong>not legally obligated</strong> to get a probate paper before exercising property rights or seeking revenue name change.
                </p>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                Because probate is optional, registering your Will at the Ludhiana SRO office assumes heightened proof importance.
                An official registration record under Book III of the Registration Act, 1908 satisfies GLADA officials, Punjab revenue patwaris, and shop banks that the document is genuine, avoiding years of court scrutiny.
              </p>
            </section>

            {/* SECTION 3: REGISTERED VS UNREGISTERED COMPARISON */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 3</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                3. Registered vs Unregistered Wills: GLADA &amp; Land Name Change
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                Under Section 18(e) of the Registration Act, 1908, Will registration is optional.
                A handwritten or typed Will signed before two competent witnesses on plain paper is legally valid in the eyes of the law.
                However, for high-value assets in Punjab, the practical difference during asset transfer is substantial:
              </p>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-[#172228]/10 shadow-2xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3 sm:p-4 font-bold">Succession Parameter</th>
                      <th className="p-3 sm:p-4 font-bold">Unregistered Will</th>
                      <th className="p-3 sm:p-4 font-bold bg-[#C65378]">NGDRS Registered Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Legal Validity (Sec 18e)</td>
                      <td className="p-3 sm:p-4">Fully valid if attested by 2 witnesses</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-800 bg-emerald-50/50">
                        Presumed genuine under Section 114 Evidence Act
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">GLADA Plot Name Change</td>
                      <td className="p-3 sm:p-4">
                        Requires newspaper notices, 30-day objection wait, and indemnity bonds
                      </td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-800 bg-emerald-50/50">
                        Direct substitution without heavy surety bond demands
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Punjab Farmland Jamabandi Fard</td>
                      <td className="p-3 sm:p-4">
                        Revenue Patwari may refer case to Tehsildar as contested name change
                      </td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-800 bg-emerald-50/50">
                        Sanctioned smoothly in Web-HALRIS computerized portal
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Bank Locker &amp; Accounts</td>
                      <td className="p-3 sm:p-4">
                        Bank legal desk often demands legal heir affidavits from all relatives
                      </td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-800 bg-emerald-50/50">
                        Rapid clearance under RBI model operational guidelines
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Protection for NRI Heirs</td>
                      <td className="p-3 sm:p-4">
                        High risk to fabricated wills and split suits
                      </td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-800 bg-emerald-50/50">
                        Official biometric &amp; photo archives defeat fraudulent claims
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Government Stamp Duty</td>
                      <td className="p-3 sm:p-4">₹0 (Exempt)</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-800 bg-emerald-50/50">
                        ₹0 Stamp Duty + Nominal ₹100 registration fee
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: INDUSTRIAL SUCCESSION IN FOCAL POINT */}
            <section id="industrial-succession" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 4</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                4. Succession Planning for Focal Point &amp; Industrial Units
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                Ludhiana produces roughly 90% of India&apos;s winter knitwear, over 70% of bicycles and bicycle parts, and massive quantities of precision engineering tools.
                Much of this industrial wealth is concentrated in family-owned proprietary concerns, Hindu Undivided Families (HUFs), partnership firms, and closely held private limited entities across Focal Point (Phases 1 to 8), Industrial Area A, and Industrial Area B.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-[#172228] text-sm">
                    <Briefcase className="w-4 h-4 text-[#C65378]" />
                    <span>Partnership Capital &amp; Factory Premises</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the Indian Partnership Act, 1932, a partnership dissolves automatically upon a partner&apos;s death unless the partnership deed provides otherwise.
                    Our lawyers draft specialized testamentary clauses enabling specific heirs to succeed directly to the deceased&apos;s capital account and factory real estate without liquidation battles.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-[#172228] text-sm">
                    <Layers className="w-4 h-4 text-[#5F7E75]" />
                    <span>PSIEC Industrial Plots &amp; Leases</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Punjab Small Industries &amp; Export Corporation (PSIEC) and GLADA industrial plots carry strict leasehold and utilization covenants.
                    A tailored Will ensures seamless industrial lease transfer and uninterrupted continuity for factory power sanctions, GST credentials, and MSME registrations.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: NRI ANCESTRAL FARMLAND */}
            <section id="nri-farmland-protection" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 5</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                5. Protecting NRI Family Farm Farmland
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                For the diaspora settled in Surrey, Brampton, Southall, Birmingham, or Melbourne, their strongest emotional and financial roots remain family land in Punjab.
                Surrounding tehsils of Ludhiana—including Sahnewal, Gill, Jagraon, Khanna, and Samrala—contain multi-crore farm parcels prone to unlawful encroachment when the rightful owners reside thousands of miles away.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-2xs space-y-3">
                <h3 className="font-extrabold text-sm text-[#172228] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Key Precautions for NRI Land Succession
                </h3>
                <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                  <li>
                    <strong>Exact Khasra &amp; Khatauni ID:</strong> The Will must precisely record revenue entries matching the latest Jamabandi fard on the Punjab Web-HALRIS portal.
                  </li>
                  <li>
                    <strong>Designation of an Independent Executor:</strong> Appoint a dependable resident executor or professional legal agent empowered to coordinate with the Halqa Patwari and Tehsildar.
                  </li>
                  <li>
                    <strong>Elimination of Ambiguous oral bequests:</strong> Unrecorded oral promises are the primary catalyst for adverse possession claims by tenant cultivators or distant relatives.
                  </li>
                  <li>
                    <strong>Multi-Country Harmonization:</strong> If you maintain assets abroad (such as home property in Canada or pensions in the UK), your Indian Will should clearly operate as a concurrent document covering Indian assets without accidentally revoking your overseas Will.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 6: SRO DIRECTORY */}
            <section id="ludhiana-sro-directory" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 6</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                6. Ludhiana Sub-Registrar Offices: Locations &amp; Contacts
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                Will registration in Punjab is administered by the Department of Revenue, Rehabilitation and Disaster Management via the <strong>National Generic Document Registration System (NGDRS Punjab)</strong>.
                Ludhiana district is divided into specialized office Sub-Registrar areas:
              </p>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by locality or SRO name (e.g., Sarabha Nagar, Focal Point, Jagraon)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#172228]/10 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                />
              </div>

              {/* SRO DIRECTORY TABS */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 space-y-1.5 max-h-96 overflow-y-auto pr-1">
                  {filteredDistricts.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDistrict(d.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all border text-xs cursor-pointer ${
                        selectedDistrict === d.id
                          ? "bg-white border-[#C65378] shadow-xs text-[#172228] font-bold"
                          : "bg-white/60 border-transparent hover:bg-white text-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{d.name}</span>
                        {selectedDistrict === d.id && (
                          <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5 truncate">
                        {d.sro}
                      </div>
                    </button>
                  ))}
                  {filteredDistricts.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No matching Sub-Registrar offices found.
                    </div>
                  )}
                </div>

                {/* SRO DETAIL DISPLAY */}
                <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-[#172228]/10 shadow-2xs space-y-4">
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-[#172228]">
                        {activeDistrictData.sro}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {activeDistrictData.name}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded bg-rose-50 text-[#C65378] text-[10px] font-mono font-bold">
                      NGDRS Active
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 block">Office Address:</span>
                        <span className="text-slate-600 leading-relaxed">
                          {activeDistrictData.address}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 block">Operational Timings:</span>
                        <span className="text-slate-600">{activeDistrictData.timings}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Building className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 block">Jurisdictional Areas:</span>
                        <span className="text-slate-600 leading-relaxed">
                          {activeDistrictData.areas}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Need help booking an appointment slot?
                    </span>
                    <a
                      href="/services/will-registration"
                      className="text-xs font-bold text-[#C65378] hover:underline inline-flex items-center gap-1"
                    >
                      Book SRO Service ↗
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: LOCAL AREA COVERAGE */}
            <section id="ludhiana-area-coverage" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; HUBS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                  7. Local Neighborhood Coverage Across Ludhiana District
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in Sarabha Nagar, Model Town, BRS Nagar, Focal Point, or Sahnewal</strong>? Assets across Ludhiana district range from established heritage kothis and GLADA planned plots to high-output industrial manufacturing complexes in Focal Point and sprawling NRI family farmland in Malwa tehsils.
                  Our senior lawyers provide verified legal drafting, NGDRS Punjab slot booking, and Sub-Registrar accompaniment across all key home and industrial clusters:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: SARABHA NAGAR & GURDEV NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Sarabha Nagar &amp; Gurdev Nagar
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ludhiana Central
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sarabha Nagar &amp; Gurdev Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sarabha Nagar (Main &amp; Ext.)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gurdev Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Civil Lines</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mall Road &amp; College Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for premier <strong>Will drafting services in Sarabha Nagar &amp; Gurdev Nagar</strong>? Sarabha Nagar and Gurdev Nagar represent Ludhiana&apos;s most prestigious heritage residences and bungalows, with substantial senior citizen residency. Our legal team drafts meticulous succession structures, lifepath covenants, and Section 31 doorstep home visit petitions for elderly testators.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariat (DAC), Ferozepur Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doctor medical fitness papers, heritage kothi succession, and doorstep biometric registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Central Heritage Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sarabha Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Sarabha Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: MODEL TOWN & DUGRI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Model Town &amp; Dugri
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gill / Central
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Model Town &amp; Dugri (GLADA Estates)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Model Town</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Model Town Extension</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dugri Phase 1 &amp; 2</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Atam Nagar &amp; Pakhowal Rd</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Secure expert <strong>Will drafting services in Model Town &amp; Dugri</strong>. Assets in these planned GLADA urban estates require precise conveyance deed tracking and clear allotment schedule descriptions. We structure single-window GLADA substitution clauses and municipal property tax name change safeguards to prevent joint tenancy gridlocks.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Complex Gill &amp; Mini Secretariat</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        GLADA allotment deed check, single-window municipal name change, and Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">GLADA Urban Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Model Town"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Model Town Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: BRS NAGAR, AGGAR NAGAR & SOUTH CITY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        BRS Nagar &amp; South City
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ludhiana West
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in BRS Nagar, Aggar Nagar &amp; South City
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">BRS Nagar (Phases 1-4)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Aggar Nagar (Blocks A &amp; B)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">South City Luxury Villas</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Barewal Awana</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Opt for premier <strong>Will drafting services in BRS Nagar, Aggar Nagar &amp; South City</strong>. The Ferozepur Road and South City corridor features upscale designer villas, NRI residences, and luxury multi-storey condominiums. Our senior lawyers formulate multi-heir bequest structures, survivor benefit clauses, and NRI asset succession frameworks.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sub-Registrar West, Tehsil Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Authority villa substitution, NRI multi-area clauses, and NGDRS biometric appointments.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Western Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in BRS Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft BRS Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: FOCAL POINT & INDUSTRIAL AREAS A & B */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Focal Point Industrial Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ludhiana East
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Focal Point &amp; Industrial Areas A &amp; B
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Focal Point (Phases 1 to 8)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Industrial Area A &amp; B</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cheema Chowk</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Transport Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Get authoritative <strong>Will drafting services in Focal Point &amp; Industrial Areas A &amp; B</strong>. Ludhiana&apos;s manufacturing hub powers textile, knitwear, bicycle components, and precision engineering enterprises. We draft specialized corporate succession clauses for proprietary firms, PSIEC industrial plot transfers, and partnership equity transmissions.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sub-Tehsil East, Near Samrala Chowk</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        PSIEC industrial lease transfer, factory machinery bequests, and partnership deed harmonization.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Industrial Capital Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Focal Point"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Industrial Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: CHANDIGARH ROAD & SECTOR 32A GLADA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Chandigarh Road Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ludhiana East
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Chandigarh Road &amp; Sector 32A GLADA
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 32A GLADA</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Urban Estate Phase 1 &amp; 2</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jamalpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Motia Khan &amp; Samrala Chowk</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for dedicated <strong>Will drafting services in Chandigarh Road &amp; Sector 32A</strong>? This dynamic eastern growth corridor combines planned GLADA home sectors with high-density shop complexes and multi-storey apartments. Our lawyers draft clear title succession clauses, shop shop bequests, and builder agreement transfers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Samrala Chowk Tehsil Office</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        GLADA shop plot name change, apartment succession clauses, and e-appointment token scheduling.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Eastern Expansion Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Chandigarh Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Chandigarh Rd Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: SAHNEWAL, GILL, JAGRAON & KHANNA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        NRI Farmland &amp; Malwa Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sahnewal / Jagraon
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services for NRI Farmland in Sahnewal &amp; Jagraon
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sahnewal GT Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jagraon Farmland</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Khanna Grain Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gill, Doraha &amp; Samrala</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Protect valuable farm holdings with expert <strong>Will drafting services for NRI farmland in Sahnewal, Jagraon &amp; Khanna</strong>. Our lawyers integrate verified revenue khasra and khatauni records from the Punjab Web-HALRIS portal, designate trustworthy local executors, and shield family land against fraudulent name change and unlawful possession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hubs: Tehsil Complexes Sahnewal, Jagraon &amp; Khanna</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Jamabandi Fard revenue record check, Halqa Patwari name change alignment, and NRI cross-border protections.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Agro-Industrial &amp; NRI Belt</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services for NRI Farmland"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Farmland Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: 5-STEP SOP */}
            <section id="step-by-step-ludhiana-sop" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 8</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                8. Step-by-Step SOP: Drafting to NGDRS Registration
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                Follow our streamlined standard operating step (SOP) to draft and officially register your Will in Ludhiana without procedural hassle:
              </p>

              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Catalog Assets, Farmland, and Business Holdings",
                    desc: "Compile an itemized schedule of assets: GLADA home plots, Focal Point manufacturing units, bank deposits, demat portfolios, and family farmland with khasra numbers.",
                  },
                  {
                    step: "02",
                    title: "Draft Customized Legal Will with Estate Clauses",
                    desc: "Collaborate with our senior estate lawyers to incorporate industrial succession rules, multi-area NRI clauses, and specific survivorship directions.",
                  },
                  {
                    step: "03",
                    title: "Physical Signing Before Two Independent Witnesses",
                    desc: "Print the finalized document on clean A4 paper. Sign or thumb-impression each page in the physical presence of two independent adult witnesses who are not heirs.",
                  },
                  {
                    step: "04",
                    title: "Book Ludhiana SRO Appointment on NGDRS Punjab",
                    desc: "Log onto igr.punjab.gov.in. Upload document details, enter party and witness data, remit the nominal ₹100 fee, and secure a confirmed appointment slot.",
                  },
                  {
                    step: "05",
                    title: "Biometric Registration at the SRO office",
                    desc: "Visit the Mini Secretariat or your local Sub-Tehsil with both witnesses. Complete digital photography, biometric fingerprinting, and receive the registered Book III endorsement.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-2xs flex flex-col sm:flex-row items-start gap-4"
                  >
                    <span className="w-10 h-10 rounded-xl bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-base text-[#172228]">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: SECTION 31 HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 9</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                9. Section 31 Doorstep Home Registration in Ludhiana
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                For many elderly, bedridden, or medically unwell residents in Model Town, Sarabha Nagar, or Civil Lines, traveling to the bustling Mini Secretariat is a painful physical ordeal.
                Section 31 of the Registration Act, 1908 provides a compassionate and completely legal solution:
              </p>

              <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 font-bold text-[#172228] text-sm">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>Doorstep Commission by the Sub-Registrar</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Under Section 31, an form can be presented to the Sub-Registrar citing medical grounds accompanied by a paper issued by a registered MBBS physician.
                  Upon payment of the official government travel commission fee, the Sub-Registrar personally visits the Will maker&apos;s residence or hospital room with the mobile biometric kit.
                  The registration is finalized at the bedside in full compliance with Punjab registration manual guidelines.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <span className="font-bold text-slate-900 block">
                    Our Ludhiana Home Registration Service Includes:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Drafting the formal Section 31 commission petition to the Sub-Registrar</li>
                    <li>Liaising with the SRO office to schedule the official home visit</li>
                    <li>Assisting with registered MBBS doctor paper formatting</li>
                    <li>On-site legal supervision to make sure flawless witness signing</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 10: INTERACTIVE CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 10</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                10. Document Checklist for Ludhiana Will Registration
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                Use our interactive readiness checklist before heading to the SRO office or booking your NGDRS slot:
              </p>

              <div className="p-6 rounded-2xl bg-white border border-[#172228]/10 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-[#C65378]" />
                    <span className="font-extrabold text-sm text-[#172228]">
                      Ludhiana Registration Readiness ({checkedCount}/{checklist.length})
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {Math.round((checkedCount / checklist.length) * 100)}% Ready
                  </span>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C65378] h-full transition-all duration-300"
                    style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <label
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div className="space-y-0.5">
                        <span
                          className={`text-xs sm:text-sm font-bold block ${
                            item.checked ? "text-slate-900 line-through opacity-70" : "text-slate-900"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="text-xs text-slate-500 leading-relaxed block">
                          {item.detail}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 11: FEES & CHARGES */}
            <section id="ludhiana-registration-fees" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 11</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                11. NGDRS Punjab Portal Fees &amp; Official Stamp Exemption
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                A common reason residents hesitate to make a Will is the fear of paying high stamp duty equivalent to property sale deeds.
                In Punjab, the law provides complete relief:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs text-center space-y-1">
                  <span className="text-2xl font-extrabold text-emerald-600 block">₹0</span>
                  <span className="text-xs font-bold text-slate-900 block">Stamp Duty</span>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    100% exempt across Punjab under the Indian Stamp Act, 1899
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs text-center space-y-1">
                  <span className="text-2xl font-extrabold text-[#172228] block">₹100</span>
                  <span className="text-xs font-bold text-slate-900 block">Registration Fee</span>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    Flat legal fee payable online via NGDRS Punjab portal
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs text-center space-y-1">
                  <span className="text-2xl font-extrabold text-slate-700 block">₹100–₹200</span>
                  <span className="text-xs font-bold text-slate-900 block">Computer Charges</span>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    Official scanning, archiving, and Book III pasting fees
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 12: PRICING PLANS */}
            <section id="service-pricing" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 12</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                12. Transparent Pricing Plans for Ludhiana Residents
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                Choose the service package that aligns with your estate complexity, whether you require a straightforward personal Will or full industrial succession planning:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* TIER 1 */}
                <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                      Basic Plan
                    </span>
                    <h3 className="font-extrabold text-lg text-[#172228]">
                      Online Lawyer-Drafted Will
                    </h3>
                    <div className="pt-2 pb-1">
                      <span className="text-3xl font-extrabold text-[#172228]">₹1,990</span>
                      <span className="text-xs text-slate-500 ml-1">all-inclusive</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for individual flats, single houses, bank accounts, and demat holdings.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Interactive online legal questionnaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Estate lawyer document review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Signing guidelines &amp; witness instructions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Instant digital PDF download</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Select Basic ₹1,990
                  </a>
                </div>

                {/* TIER 2 (FEATURED) */}
                <div className="bg-[#172228] text-white rounded-2xl p-6 border-2 border-[#C65378] shadow-xl flex flex-col justify-between space-y-4 relative">
                  <span className="absolute -top-3 right-6 bg-[#C65378] text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full tracking-wider">
                    Recommended
                  </span>
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold text-rose-300 uppercase tracking-wider block">
                      Talk Tier
                    </span>
                    <h3 className="font-extrabold text-lg text-white">
                      Lawyer Talk &amp; Review
                    </h3>
                    <div className="pt-2 pb-1">
                      <span className="text-3xl font-extrabold text-white">₹4,990</span>
                      <span className="text-xs text-slate-300 ml-1">all-inclusive</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Recommended for NRI families, GLADA plots, and mixed home-farm estates.
                    </p>
                    <ul className="text-xs text-slate-200 space-y-2 pt-3 border-t border-white/10">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>1-on-1 Senior High Court Lawyer consult</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>Custom clauses for GLADA &amp; Jamabandi land</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>NRI multi-area asset structuring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>Unlimited revisions for 30 days</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#a13c5d] transition-colors text-center cursor-pointer"
                  >
                    Select Plan ₹4,990
                  </a>
                </div>

                {/* TIER 3 */}
                <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                      Full Service
                    </span>
                    <h3 className="font-extrabold text-lg text-[#172228]">
                      Complete Ludhiana SRO Registration
                    </h3>
                    <div className="pt-2 pb-1">
                      <span className="text-3xl font-extrabold text-[#172228]">₹9,990</span>
                      <span className="text-xs text-slate-500 ml-1">+ govt charges</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Turnkey support with NGDRS portal booking, SRO accompaniment, and doorstep visits.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Senior Lawyer bespoke Will drafting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>NGDRS Punjab portal token booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Physical lawyer accompaniment at Ludhiana SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Section 31 doorstep help for seniors</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/services/will-registration"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 transition-colors text-center"
                  >
                    Select Full SRO ₹9,990
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 13</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                13. Frequently Asked Questions on Ludhiana Wills
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                Find answers to common legal and procedural questions regarding drafting and registering a Will in Ludhiana and Punjab:
              </p>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-[#172228]/10 bg-white overflow-hidden shadow-2xs"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                      aria-expanded={openFaqIndex === index}
                    >
                      <span className="font-extrabold text-sm sm:text-base text-[#172228]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                          openFaqIndex === index ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6 pt-6 border-t border-[#172228]/10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#C65378] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <span>Section 14</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                14. Legal Citations: Succession &amp; Registration Laws
              </h3>

              <p className="text-base text-slate-700 leading-relaxed">
                All Will drafting, witnessing, and registration protocols signed by WillDrafting in Ludhiana strictly comply with Indian statutory legislation and Punjab revenue directions:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">
                    Section 18(e), Registration Act, 1908
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Classifies the registration of a Will as optional across India, confirming that an unregistered Will is legally binding if properly signed.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">
                    Section 63, Indian Succession Act, 1925
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Mandates that the Will maker execute the document in the presence of at least two adult witnesses who attest each other&apos;s signatures.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">
                    Section 213 Read with Section 57, ISA 1925
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Exempts non-presidency states including Punjab from needed court probate proceedings, as upheld in Ram Chand v. Sardara Singh.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">
                    Section 31, Registration Act, 1908
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Authorizes Sub-Registrars to attend private residences or hospital rooms to register documents for medically infirm or elderly citizens.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">
                    Punjab Land Revenue Act, 1887 &amp; Web-HALRIS
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Regulates the name change of farm Jamabandi records in rural Punjab based on testamentary dispositions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">
                    Greater Ludhiana Area Development Authority Act
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Governs property substitution and inheritance transfer steps for urban estate sectors in Ludhiana.
                  </p>
                </div>
              </div>

              {/* CONVERSION BANNER */}
              <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#172228] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-extrabold text-lg sm:text-xl text-white">
                    Protect Your Ludhiana Estate Today
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Draft an unassailable Will online in just 15 minutes with complete legal check.
                  </p>
                </div>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#a13c5d] transition-colors whitespace-nowrap cursor-pointer shadow-lg shadow-[#C65378]/25"
                >
                  Start Your Will Online →
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
                Visual Blueprint: Ludhiana NRI &amp; Industrial Estate Architecture
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
                src="/images/will-drafting-in-ludhiana.jpg"
                alt="High Resolution Visual Blueprint: Ludhiana Will Drafting and NRI Estate Planning"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
