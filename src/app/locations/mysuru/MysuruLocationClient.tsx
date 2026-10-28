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
  { id: "mysuru-overview", label: "OVERVIEW" },
  { id: "mysuru-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "mysuru-probate-guidance", label: "PROBATE & HIGH COURT" },
  { id: "mysuru-sro-directory", label: "SRO DIRECTORY" },
  { id: "mysuru-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-mysuru-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "mysuru-property-types", label: "PROPERTY TYPES" },
  { id: "mysuru-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const MYSURU_DISTRICTS = [
  {
    id: "mysuru-north",
    name: "Mysuru North (Mini Vidhana Soudha)",
    sro: "Senior Sub-Registrar Office Mysuru North",
    address: "Mini Vidhana Soudha, Ground Floor, Nazarbad, Mysuru - 570010",
    areas: "Nazarbad, Gokulam (1st, 2nd, 3rd Stages), Vani Vilas Mohalla (VVM), Jayalakshmipuram, Yadavagiri, Mandi Mohalla, Lashkar Mohalla, Tilak Nagar, Bannimantap, N.R. Mohalla, Metagalli, Kumbarakoppal",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "mysuru-south",
    name: "Mysuru South (Ramakrishnanagar)",
    sro: "Senior Sub-Registrar Office Mysuru South",
    address: "2nd Stage, Ramakrishnanagar / Kuvempunagar, Near Circle, Mysuru - 570022",
    areas: "Ramakrishnanagar, Kuvempunagar (Blocks A to M), Saraswathipuram, Krishnamurthypuram, Ashokapuram, Vidyaranyapuram, Chamundipuram, Chamaraja Mohalla, Kanakadasanagar, Sharadadevinagar",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "mysuru-east",
    name: "Mysuru East (Siddhartha Layout)",
    sro: "Sub-Registrar Office Mysuru East",
    address: "Police Bhavan Road, Near Siddhartha Layout & Alanahalli, Mysuru - 570011",
    areas: "Siddhartha Layout, Alanahalli, KC Layout, Chamundi Hill Foothills, Lalithadripura, Shanthaveri Gopalagowda Nagar, Rajivnagar, Udayagiri, Shivarampet, Kurubarahalli, Kyathamaranahalli",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "mysuru-west",
    name: "Mysuru West (Vijayanagar & Hootagalli)",
    sro: "Sub-Registrar Office Mysuru West / Chamundeshwari",
    address: "MUDA Commercial Complex, Vijayanagar 2nd Stage / Hootagalli, Mysuru - 570017",
    areas: "Vijayanagar (1st, 2nd, 3rd, 4th Stages), Hootagalli, Belavadi, Bogadi (1st & 2nd Stages), Dattagalli, Roopa Nagar, CFTRI Layout, Hebbal Industrial Area, Koorgalli, Ring Road Belts",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "mysuru-rural",
    name: "Mysuru Rural & Nanjangud Belt",
    sro: "SRO Nanjangud & SRO T. Narasipura",
    address: "Taluk Mini Vidhana Soudha, Nanjangud Town & T. Narasipura Court Road, Mysuru District",
    areas: "Kadakola Industrial Area, Tandavapura, Nanjangud, Srirangapatna peripheral zones, T. Narasipura river belts, Bannur, agricultural farmlands across Kabini and Kaveri river basins",
    timings: "10:00 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Final Will",
    detail: "Printed on clean white A4 paper. No non-judicial stamp paper is required under Karnataka law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Required for biometric fingerprint check and web-camera photography at the Mysuru SRO.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Photo IDs",
    detail: "Both witnesses must carry original photo IDs and must not be heirs receiving property in the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Certificate (For Seniors)",
    detail: "Issued by an MBBS doctor. Confirms sound sound mind and protects against incapacity fights.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Karnataka Kaveri 2.0 Appointment Booking Slip",
    detail: "Online booking confirmation from kaveri.karnataka.gov.in displaying your form number and time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "MUDA Allotment Letter & MCC e-Aasthi Khata",
    detail: "Copies verifying MUDA site allotment, possession paper, MCC Khata extract, and tax payment receipts.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs Each",
    detail: "Recent color photographs of the Will maker and both witnesses for pasting into the official Book III registers.",
    checked: false,
  },
];

export default function MysuruLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("mysuru-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("mysuru-north");
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

  const filteredDistricts = MYSURU_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    MYSURU_DISTRICTS.find((d) => d.id === selectedDistrict) || MYSURU_DISTRICTS[0];

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
                <span>MYSURU &amp; KARNATAKA ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 50 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Mysuru: Online legal help
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally sound Will for your MUDA allotted sites, heritage family homes, demat portfolios, and retirement savings.
                Receive expert Karnataka lawyer drafting, Kaveri 2.0 Sub-Registrar registration support, and estate planning guidance across Mysuru.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start"
                  onClick={handleStartDraft}
                  className="px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all text-center shadow-lg shadow-[#C65378]/25 cursor-pointer"
                >
                  Draft Your Mysuru Will Online
                </Link>
                <a
                  href="#mysuru-sro-directory"
                  className="px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/20 transition-all text-center border border-white/20 cursor-pointer"
                >
                  View Mysuru SRO Directory
                </a>
              </div>

              {/* 3-ITEM TRUST BAR */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/15 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Court Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>State Stamp Duty Exempt</span>
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
                  src="/images/will-drafting-in-mysuru.jpg"
                  alt="Senior Indian advocate advising retiree clients on legal Will drafting in Mysuru Karnataka"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="font-semibold truncate">Mysuru Estate Succession Blueprint</span>
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
                5 SRO Hubs
              </span>
              <span className="text-[10px] min-[390px]:text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 leading-tight">
                Mini Vidhana Soudha
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/80 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#C65378] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[10px] min-[390px]:text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 leading-tight">
                Karnataka Article 64
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
            className={`w-4 h-4 text-slate-600 transition-transform ${mobileTocOpen ? "rotate-180" : ""
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
                className={`block px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeId === item.id
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
          {/* DESKTOP STICKY SIDEBAR (w-64/w-72) */}
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
                      className={`block py-1.5 pl-4 text-xs font-mono uppercase tracking-wider transition-all relative ${isActive
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
            <section id="mysuru-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>MYSURU SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Probate in Mysuru
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional in Mysuru under Section 18(e) of the Registration Act, 1908. An unregistered Will on plain white paper is legally valid if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Karnataka HC Probate Rules</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 213 of the Indian Succession Act, probate is not needed for non-presidency towns. Mysuru residents do not require needed court probate to transfer estates unless contested.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty Exemption</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills incur zero stamp duty across Karnataka under Article 64 of the Karnataka Stamp Act. At the SRO office, you pay only a nominal ₹200 fee plus standard scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct MUDA &amp; MCC Name Change</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will enables your heirs to execute direct e-Aasthi Khata transfer with Mysuru City Corporation and title name change with the Mysuru Urban Development Authority (MUDA).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="mysuru-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework for Will Drafting in Mysuru
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will drafting and estate planning in Mysuru are governed by the <strong>Indian Succession Act, 1925</strong> and the <strong>Registration Act, 1908</strong>.
                  Any individual who is of sound mind and at least 18 years of age can execute a Will to dispose of self-acquired movable and immovable assets.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Mysuru families possess distinctive property portfolios.
                  These encompass MUDA plotted layouts, family heritage homes in Gokulam, retirement savings, pension benefits, and tech investments in Hebbal Electronic City.
                  A professionally prepared Will prevents ambiguous inheritance claims among legal heirs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker must be at least 18 years of age and possess a sound disposing state of mind (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Choice</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testamentary document must be signed voluntarily without coercion, undue influence, or fraud (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sign in the simultaneous presence of two adult witnesses who observe the Will maker affixing signatures (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Independent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses must not receive any legacy or property bequest under the Will (Section 67).
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Needed in Mysuru?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is <strong>optional</strong>.
                  An unregistered Will signed on plain white A4 paper is legally valid and recognized by Indian courts if signed before two independent witnesses.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, registering your Will at a Mysuru SRO office provides vital legal safeguards.
                  Here is how a registered Will compares against an unregistered document:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Parameter</th>
                      <th className="p-4 font-bold text-[#C65378]">Registered Will (Kaveri 2.0 SRO)</th>
                      <th className="p-4 font-bold text-slate-600">Unregistered Plain Paper Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Legal Validity &amp; Admissibility</td>
                      <td className="p-4 text-emerald-800 font-bold">Full legal validity with government presumption</td>
                      <td className="p-4">Legally valid, but burden of proof remains on propounder</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Fraud &amp; Tampering Protection</td>
                      <td className="p-4 text-emerald-800 font-bold">Biometric records &amp; Book III copy prevent tampering</td>
                      <td className="p-4">Susceptible to forgery allegations and destruction</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">MUDA &amp; MCC e-Aasthi Name Change</td>
                      <td className="p-4 text-emerald-800 font-bold">Rapid Khata name change without civil court delays</td>
                      <td className="p-4">May require indemnity bonds or family NOC confirmations</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Bank &amp; Demat Transfer</td>
                      <td className="p-4 text-emerald-800 font-bold">Accepted smoothly by nationalized banks and brokers</td>
                      <td className="p-4">Often requires additional surety bonds or affidavits</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Official Archival &amp; Certified Copy</td>
                      <td className="p-4 text-emerald-800 font-bold">Archived permanently in SRO Book III records</td>
                      <td className="p-4">No government archival; if lost, duplicate cannot be procured</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: KARNATAKA HIGH COURT PROBATE GUIDANCE */}
            <section id="mysuru-probate-guidance" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT JURISDICTION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Karnataka High Court Probate Rules: Section 213
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Probate is an official decree issued by a competent court certifying the validity of a Will.
                  It grants the designated executor the legal right to administer the Will maker&apos;s assets.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is needed only for Wills signed in historic presidency towns (Mumbai, Kolkata, Chennai).
                  Mysuru is a non-presidency city in Karnataka.
                  The Karnataka High Court has clarified that Hindus, Sikhs, Jains, and Buddhists do not need needed probate to set up testamentary rights in Karnataka.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    Signing vs Probate
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Understanding Key Legal Distinctions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Signing a Will involves drafting, signing, and attesting the instrument. Registration records the document with the Karnataka Stamps and Registration Department. Probate is a formal judicial decree from the District Court or High Court.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Letters of Administration apply when no executor is named</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Practical Practice in Mysuru
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Advisable in Mysuru?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Filing a probate petition before the Principal District and Sessions Court in Mysuru becomes advisable when legal heirs challenge the Will. It is also prudent when handling high-value disputed estates or real estate situated in presidency cities.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Asset locations and heir dynamics determine probate strategy</span>
                  </div>
                </div>
              </div>

              {/* HELPFUL TOOL CALLOUT */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Unsure if your Mysuru estate requires probate certification?
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Use our free diagnostic assessment tool to check probate rules based on your asset location and family structure.
                  </p>
                </div>
                <Link
                  href="/tools/probate-checker"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                >
                  <span>Launch Probate Checker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="mysuru-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Mysuru SRO office Directory &amp; SROs
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration across Mysuru is administered by the Department of Stamps and Registration, Government of Karnataka.
                  Under Section 32 of the Registration Act, you can register your Will before the Sub-Registrar where you reside or where your land and flats are situated.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Gokulam, Vijayanagar, Kuvempunagar)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {MYSURU_DISTRICTS.length} Key Jurisdictions
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
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                          } ${isSelected
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
                      <span className="font-bold text-slate-900 block">SRO Office Complex:</span>
                      <p className="text-slate-600">{activeDistrictData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours:</span>
                      <p className="text-slate-600">{activeDistrictData.timings}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold text-slate-900 block">Areas Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official Appointment Booking: <strong>kaveri.karnataka.gov.in (Kaveri 2.0)</strong>
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Lawyer Support for {activeDistrictData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: AREA-WISE WILL DRAFTING ACROSS MYSURU */}
            <section id="mysuru-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Mysuru
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Seeking lawyer-supervised <strong>Will drafting services in Gokulam, Vijayanagar, Kuvempunagar, or Jayalakshmipuram</strong>? Property ownership frameworks, MUDA leasehold stipulations, and Sub-Registrar areas vary across Mysuru.
                  Whether you own an family bungalow in Gokulam, a MUDA site in Vijayanagar, or a software engineer portfolio in Hebbal, our estate lawyers provide customized solutions:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: GOKULAM & JAYALAKSHMIPURAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage Home Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mysuru North
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Gokulam, Jayalakshmipuram &amp; VVM
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gokulam Stages 1, 2 &amp; 3</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jayalakshmipuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vani Vilas Mohalla (VVM)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Contour Road Belts</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Esteemed for yoga centers, quiet tree-lined avenues, and independent family bungalows. We draft clear bequests for prime freehold plots, structured partitions among multiple siblings, and protective clauses for surviving spouses.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Clear boundaries, family title deeds, and life-interest covenants prevent split court fights in civil court.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Area: Mini Vidhana Soudha</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gokulam and Jayalakshmipuram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gokulam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: KUVEMPUNAGAR & SARASWATHIPURAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Academic &amp; Retiree Heartland
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mysuru South
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Kuvempunagar &amp; Saraswathipuram
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kuvempunagar M &amp; K Blocks</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saraswathipuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Krishnamurthypuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sharadadevinagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Home to retired state officials, university professors, and bank executives. We prepare full estate plans covering home duplexes, government pensions, fixed deposits, and MCC e-Aasthi property mutations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Doctor mental capacity certifications and Section 31 doorstep signing make sure seamless registration for elderly retirees.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Area: Ramakrishnanagar SRO</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kuvempunagar and Saraswathipuram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kuvempunagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: VIJAYANAGAR & HOOTAGALLI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        MUDA Plotted Expansion
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mysuru West
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Vijayanagar &amp; Hootagalli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vijayanagar Stages 1, 2, 3 &amp; 4</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hootagalli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Belavadi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Koorgalli Industrial Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Mysuru&apos;s largest planned home suburb with thousands of MUDA allotted sites and newly built homes. We draft clear succession instruments detailing site allotment letters, title deeds, and clear inheritance shares.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Registered Wills enable direct MUDA Khata transfer and Building Completion Certificate (BCC) compliance for successors.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Area: MUDA Complex Vijayanagar</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Vijayanagar and Hootagalli"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vijayanagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: YADAVAGIRI, NAZARBAD & BANNIMANTAP */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Shop &amp; Princely Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mysuru North
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Yadavagiri, Nazarbad &amp; Bannimantap
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Yadavagiri</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nazarbad</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bannimantap Stages 1 &amp; 2</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sayyaji Rao Road Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Encompasses princely heritage estates, shop assets, and prominent business lineages. We structure high-net-worth estate plans featuring corporate shareholdings, shop leasing income, and testamentary trusts.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Executor nomination and explicit revocation of prior testaments prevent cross-heir shop property court fights.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Area: Mini Vidhana Soudha</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Yadavagiri and Nazarbad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Yadavagiri Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: RAMAKRISHNANAGAR, BOGADI & DATTAGALLI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South-West Home Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mysuru South &amp; West
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Ramakrishnanagar, Bogadi &amp; Dattagalli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ramakrishnanagar (Blocks A-I)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bogadi Stages 1 &amp; 2</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dattagalli (Stages 1-3)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanakadasanagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Sought-after home sectors featuring independent villas and housing cooperative society layouts. Our legal instruments provide straightforward bequests and specific shares for grandchildren, avoiding without a Will succession confusion.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Cooperative housing society membership transfers require registered Will check for speedy share endorsement.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Area: Ramakrishnanagar Circle</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ramakrishnanagar and Bogadi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bogadi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: HEBBAL ELECTRONIC CITY MYSURU */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        IT Corridor &amp; Tech Parks
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mysuru West
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Hebbal Electronic City Mysuru
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Infosys Mysore Campus Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hebbal 1st &amp; 2nd Stages</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Belagola Industrial Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Outer Ring Road Apartments</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Hub for IT professionals, tech entrepreneurs, and modern apartment dwellers. We draft Wills covering unlisted ESOPs, international equity grants, demat portfolios, and gated condominium apartments under the Karnataka Apartment Ownership Act.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Digital asset clauses and international demat designations prevent cross-border estate fights.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Area: Hootagalli SRO Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Hebbal Electronic City Mysuru"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Hebbal Tech Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: JP NAGAR & VIDYARANYAPURAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Mysuru Colonies
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mysuru South
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in JP Nagar &amp; Vidyaranyapuram
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">JP Nagar Sectors A to E</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vidyaranyapuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ashokapuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chamundipuram</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Established neighborhoods with CITB older site allotments and generational family residences. Our lawyers draft tailored testamentary solutions guaranteeing clear division of built-up floors and family land rights.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Accurate schedule of property and MCC ward details make sure trouble-free title name change.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Area: Kuvempunagar SRO</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in JP Nagar and Vidyaranyapuram"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft JP Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: SIDDHARTHA LAYOUT & CHAMUNDI FOOTHILLS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        East Mysuru &amp; Hills Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Mysuru East
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting in Siddhartha Layout &amp; Chamundi Hills
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Siddhartha Layout</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alanahalli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">KC Layout &amp; Kurubarahalli</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lalithadripura Foothills</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Picturesque home zones, independent farm villas, and developing tourist hospitality corridors. We prepare legally validated testamentary documents addressing peripheral land parcels and luxury home homes.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900">Key Legal Considerations:</div>
                      <p className="text-slate-600">
                        Clear survey numbers and conversion status prevent revenue department inheritance objections.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Area: Police Bhavan East SRO</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Siddhartha Layout and Chamundi Hills"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft East Mysuru Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP WILL REGISTRATION SOP */}
            <section id="step-by-step-mysuru-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL BLUEPRINT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Registration in Karnataka
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Mysuru under the Karnataka Stamps and Registration Department requires a structured 5-step legal protocol:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0 border border-rose-100">
                    1
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Asset Inventory &amp; Heir Apportionment
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a detailed schedule of all assets. Include MUDA sites, MCC home flats, family lands, bank accounts, demat holdings, and retirement pensions. Clearly determine heir proportions and appoint a dependable executor.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0 border border-rose-100">
                    2
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Legal Drafting &amp; Lawyer Check
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft the instrument with formal testamentary rules. Include sound mental declaration, explicit revocation of prior testaments, survivorship clauses, and residuary estate allocation vetted by an experienced Karnataka High Court lawyer.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0 border border-rose-100">
                    3
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Physical Signing &amp; Independent Attestation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the drafted Will on clean white A4 paper. The Will maker signs each page in the simultaneous presence of two independent adult witnesses who are not heirs under the document, fulfilling Section 63 of the Indian Succession Act.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0 border border-rose-100">
                    4
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Kaveri 2.0 Portal Submission &amp; Slot Booking
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log in to Karnataka&apos;s Kaveri 2.0 portal (kaveri.karnataka.gov.in). Input Will maker and witness demographic data, upload draft copies, pay the nominal government registration fee of ₹200 online, and schedule an appointment at your local Mysuru SRO.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0 border border-rose-100">
                    5
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      SRO Biometric Check &amp; Book III Archival
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Attend the appointed SRO office with both witnesses carrying original Aadhaar cards. Complete biometric thumbprinting, web-camera photo capture, and official Book III archival. Receive the sealed registered Will deed.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: DOORSTEP REGISTRATION FOR SENIORS */}
            <section id="doorstep-home-registration" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>SPECIAL COMMISSION VISITS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Doorstep Will Registration for Senior Citizens
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Mysuru is known as a pensioner&apos;s paradise with a substantial senior citizen population.
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, testators who are elderly, ill, or physically unable to visit a government office can request the Sub-Registrar to attend their home or hospital room:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Medical Fitness</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Obtain a paper from a registered MBBS doctor attesting that the Will maker is mentally sound but unable to travel.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Section 31 Petition</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Submit a formal commission request to the Senior Sub-Registrar detailing home address and clinical grounds.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Official Commission</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Deposit the prescribed government home visit fee (₹500 to ₹1,000) through the Kaveri portal or official treasury challan.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    4
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Portable Biometrics</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Sub-Registrar visits with mobile fingerprint scanners and cameras to execute registration in your living room.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>INTERACTIVE VERIFICATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Checklist for Will Registration
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Prepare these essential documents before booking your appointment at a Mysuru SRO office. Click each item to track your registration readiness:
                </p>
              </div>

              {/* INTERACTIVE PROGRESS COUNTER */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      COMPLETION STATUS
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      You have completed {checkedCount} of {checklist.length} items
                    </h3>
                  </div>
                  <div className="w-full sm:w-48 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C65378] h-full transition-all duration-300 rounded-full"
                      style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${item.checked
                          ? "bg-rose-50/40 border-rose-200 shadow-xs"
                          : "bg-slate-50/50 border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${item.checked
                            ? "bg-[#C65378] text-white"
                            : "border-2 border-slate-300 bg-white"
                          }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="space-y-1">
                        <span
                          className={`text-xs sm:text-sm font-bold block ${item.checked ? "text-slate-900" : "text-slate-700"
                            }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES IN MYSURU */}
            <section id="mysuru-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Mysuru Real Estate: MUDA Sites &amp; Heritage Homes
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate in Mysuru encompasses planned urban authority layouts, historic family bungalows, and modern apartment complexes.
                  Each property category requires tailored legal drafting:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase">
                    MUDA Plotted Sites
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    MUDA Allotted Layouts
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Sites in Vijayanagar, Dattagalli, and Bogadi require accurate allotment numbers, conditional lease-cum-sale references, and possession papers to enable direct authority name change.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase">
                    Heritage Residences
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Family &amp; Freehold Homes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Generational homes in Gokulam, Saraswathipuram, and Yadavagiri need exact boundary schedules, parent deed citations, and survivorship covenants to avoid civil split suits.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase">
                    Apartments &amp; Tech Hubs
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Condominiums &amp; Housing Societies
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Flats along Hebbal Ring Road and Kuvempunagar must clearly cite undivided share of land (UDS), dedicated parking allotments, and apartment association bylaws.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES */}
            <section id="mysuru-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL CHARGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Stamp Duty &amp; Registration Fees: Mysuru
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property conveyance deeds which attract heavy ad-valorem stamp duties in Karnataka, Wills are 100 percent exempt from stamp duty across the state.
                  Under the Karnataka Stamp Act, 1957, government fees for registering a Will are purely nominal:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Fee Component</th>
                      <th className="p-4 font-bold">Official Amount</th>
                      <th className="p-4 font-bold">Payable To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Karnataka Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Government of Karnataka</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SRO Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹200 (Flat Fee)</td>
                      <td className="p-4">Kaveri 2.0 Portal / SRO Account</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Scanning &amp; Data Entry Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹300</td>
                      <td className="p-4">Sub-Registrar Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Doorstep Commission</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Sub-Registrar Official Visit Fee</td>
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
                  <span>PLANS &amp; PRICING</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the level of professional legal support best aligned with your family&apos;s estate planning rules in Mysuru:
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
                      Ideal for simple estates with bank deposits, mutual funds, and a single home property.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Mysuru Will maker</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted legal clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download &amp; instructions</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Draft Online Now
                  </Link>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Most Popular in Mysuru
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Full
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Lawyer Talk
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Senior estate lawyer review for MUDA sites, family bungalows, and retiree succession planning.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 talk with senior lawyer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for MUDA &amp; minor heirs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Executor advisory &amp; witness vetting</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer"
                  >
                    Book Lawyer Call
                  </Link>
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
                      Full end-to-end registration help at Sub-Registrar offices across Mysuru District.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Kaveri 2.0 slot booking &amp; challan support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer attends with you at SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Collection of registered Book III deed</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Get SRO Support
                  </Link>
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Mysuru Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Accurate answers to practical legal questions regarding drafting, registering, and probating a Will in Mysuru:
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal References &amp; Karnataka Kaveri 2.0
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our estate planning practices strictly adhere to Indian succession statutes and Karnataka office frameworks:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 63, 67, and Section 213 read with Section 57 (Probate Area).
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
                    Karnataka Kaveri 2.0 Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official registration portal: <code>kaveri.karnataka.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Karnataka High Court Precedents
                  </span>
                  <p className="text-xs text-slate-600">
                    Judicial rulings establishing probate exemption for non-presidency Karnataka cities.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Mysuru Assets &amp; Family Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Ensure your MUDA sites, heritage family homes, and financial investments transition seamlessly to your loved ones.
                Draft a legally valid Will online or consult our experienced Karnataka estate lawyers today.
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
                  Book Lawyer Talk
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
                Visual Blueprint: Mysuru Estate Succession &amp; Will Registration Architecture
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
                src="/images/will-drafting-in-mysuru.jpg"
                alt="High Resolution Visual Blueprint: Mysuru Will Drafting and Probate Support"
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
