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
  Clock,
  Phone,
  ExternalLink,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "vadodara-overview", label: "OVERVIEW" },
  { id: "gujarat-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "vadodara-probate-rules", label: "PROBATE RULES" },
  { id: "business-huf-succession", label: "BUSINESS & HUF" },
  { id: "vadodara-sro-directory", label: "SRO DIRECTORY" },
  { id: "vadodara-area-coverage", label: "LOCAL AREAS" },
  { id: "garvi-gujarat-process", label: "GARVI GUJARAT SOP" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "vadodara-property-types", label: "PROPERTY TYPES" },
  { id: "gujarat-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const VADODARA_DISTRICTS = [
  {
    id: "vadodara-1-kothi",
    name: "Vadodara 1 (Kothi / Central)",
    sro: "Sub-Registrar Office Vadodara 1 (Kothi Compound)",
    address: "Old Collector Office Building, Kothi Compound, Raopura, Vadodara, Gujarat 390001",
    areas: "Raopura, Mandvi, Dandia Bazar, Wadi, Panigate, Nagarwada, Pratapgunj, Sayaji Baug, Jubilee Baug",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "vadodara-2-akota",
    name: "Vadodara 2 (Akota / West)",
    sro: "Sub-Registrar Office Vadodara 2 (Akota)",
    address: "Jilla Seva Sadan 1, Near Akota Stadium, Akota, Vadodara, Gujarat 390020",
    areas: "Akota, Alkapuri, Old Padra Road, Jetalpur, Race Course Circle, Haripura, Gotri Road",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "vadodara-3-manjalpur",
    name: "Vadodara 3 (Manjalpur / South)",
    sro: "Sub-Registrar Office Vadodara 3 (Manjalpur)",
    address: "Taluka Seva Sadan, Near Manjalpur Naka, Manjalpur-Makarpura Road, Vadodara, Gujarat 390011",
    areas: "Manjalpur, Makarpura GIDC, Tarsali, Maneja, Vadsar, Danteshwar, Susen-Tarsali Ring Road",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "vadodara-4-gorwa",
    name: "Vadodara 4 (Gorwa / North-West)",
    sro: "Sub-Registrar Office Vadodara 4 (Gorwa)",
    address: "Gorwa Revenue Complex, Near Gorwa Workshop & BIDC, Gorwa, Vadodara, Gujarat 390016",
    areas: "Gorwa, Subhanpura, Gotri, Vasna Road, Laxmipura, Undera, Karodiya, Gorwa BIDC",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "vadodara-5-sayajigunj",
    name: "Vadodara 5 (Sayajigunj / University Area)",
    sro: "Sub-Registrar Office Vadodara 5 (Sayajigunj)",
    address: "Bahumali Bhavan Multi-Storey Building, Near Vadodara Railway Station, Vadodara, Gujarat 390005",
    areas: "Sayajigunj, Fatehgunj, MSU Campus Area, Nizampura, Chhani, Sama, Sama-Savli Road, Karelibaug",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "vadodara-6-waghodia",
    name: "Vadodara 6 (Waghodia / East)",
    sro: "Sub-Registrar Office Waghodia (Taluka Seva Sadan)",
    address: "Taluka Seva Sadan, Waghodia Road / Dabhoi Road Circle, Vadodara District, Gujarat 391760",
    areas: "Waghodia Road, Dabhoi Road, Ajwa Road, Kendranagar, Bapod, Kapurai, Waghodia GIDC, Madhavpura",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Executed Will",
    detail: "Printed clearly on durable white A4 paper. Under the Gujarat Stamp Act, no expensive stamp paper is required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Mandatory for biometric thumbprint scanning and live web-camera photography before the Gujarat Sub-Registrar.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original photo IDs and must not be named beneficiaries or their spouses.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Certificate (For Seniors)",
    detail: "Signed by an active MBBS practitioner. Certifies sound mind and testamentary capacity to eliminate dispute grounds.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Garvi Gujarat Portal Appointment Receipt",
    detail: "Official token receipt downloaded after online document entry and fee payment on garvi.gujarat.gov.in.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Property Chain Documents (VMC / VUDA / GIDC / 7/12)",
    detail: "Copies of registered allotment deeds, share certificates, or AnyROR 7/12 extracts for precise asset identification.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs Each",
    detail: "Recent color photographs of the testator and both attesting witnesses for pasting in official Book III records.",
    checked: false,
  },
];

export default function VadodaraLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("vadodara-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("vadodara-2-akota");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  // Scrollspy to update active TOC section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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

  const filteredDistricts = VADODARA_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    VADODARA_DISTRICTS.find((d) => d.id === selectedDistrict) || VADODARA_DISTRICTS[0];

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
                <span>VADODARA & GUJARAT ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 53 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Vadodara: Online Legal Will
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your VMC residential properties, VUDA plots, and chemical MSME shares.
                Get expert advocate drafting, Garvi Gujarat portal registration guidance, and doorstep execution for senior citizens across Vadodara.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Vadodara Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#vadodara-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Vadodara SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Gujarat High Court Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Gujarat Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Garvi Gujarat Portal SOP</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULL VISIBILITY ENSURED IN MOBILE & DESKTOP */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-vadodara.jpg"
                  alt="Will Drafting Services in Vadodara Online Legal Guide"
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
                6 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Vadodara District Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Gujarat Stamp Exempt
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Gujarat High Court Rules
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
          MAIN CONTAINER: SIDEBAR TOC + CONTENT
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* DESKTOP STICKY LEFT SIDEBAR (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-[#C65378]" />
                  <span className="text-[11px] font-mono tracking-widest uppercase font-extrabold text-slate-800">
                    NAVIGATION GUIDE
                  </span>
                </div>

                <nav className="space-y-0.5">
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
                        className={`group flex items-center px-3 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                          isActive
                            ? "bg-rose-50 text-[#C65378] font-bold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`mr-2.5 transition-all ${
                            isActive
                              ? "w-3 h-[2px] bg-[#C65378]"
                              : "w-1.5 h-[1px] bg-slate-300 group-hover:w-2.5 group-hover:bg-slate-500"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* QUICK ASSISTANCE WIDGET */}
              <div className="bg-[#172228] text-white rounded-3xl p-5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>NEED EXPERT GUIDANCE?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Connect with our Gujarat High Court estate advocates for customized business succession or doorstep SRO execution in Vadodara.
                </p>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="block w-full py-2.5 px-4 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-all"
                >
                  Start Consultation
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN EDITORIAL COLUMN (9 COLS) */}
          <main className="lg:col-span-9 space-y-12">

            {/* KEY HIGHLIGHTS BANNER */}
            <div className="rounded-3xl bg-gradient-to-r from-rose-50 via-amber-50/40 to-slate-50 border border-rose-100/80 p-6 sm:p-8">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                Key Highlights: Will Making &amp; Registration in Vadodara
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-rose-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold mb-0.5">Gujarat High Court Rules</strong>
                    <span className="text-slate-600">Probate is optional for Hindu, Sikh, Jain, and Buddhist testators in Vadodara.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-rose-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold mb-0.5">₹0 Stamp Duty Exemption</strong>
                    <span className="text-slate-600">Article 64 of the Gujarat Stamp Act 1958 exempts Wills from stamp duty completely.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-rose-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold mb-0.5">Garvi Gujarat Digital Booking</strong>
                    <span className="text-slate-600">Seamless e-appointment booking and e-Challan payment on garvi.gujarat.gov.in.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-rose-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold mb-0.5">VMC &amp; VUDA Mutation Protection</strong>
                    <span className="text-slate-600">Registered Wills enable immediate property record mutations without court delays.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 1: OVERVIEW */}
            <section id="vadodara-overview" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Vadodara
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Vadodara (historically known as Baroda) is recognized as the cultural and educational capital of Gujarat, while simultaneously hosting massive petrochemical, pharmaceutical, and engineering industrial hubs. From ancestral residential properties in the historic walled city pols of Mandvi and Dandia Bazar, to sprawling bungalows in Alkapuri and Old Padra Road, and contemporary high-rise townships across Gotri, Vasna-Bhayli, and Sevasi, estate planning in Vadodara demands nuanced legal attention.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <Building className="w-5 h-5 text-[#C65378]" />
                  <h3 className="font-extrabold text-sm text-slate-900">VMC &amp; VUDA Estates</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Clear testamentary bequest prevents stalled title mutation before Vadodara Municipal Corporation and VUDA Town Planning schemes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <Scale className="w-5 h-5 text-[#C65378]" />
                  <h3 className="font-extrabold text-sm text-slate-900">Industrial &amp; MSME Assets</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct transfer of equity, partnership interests, and factory leases across Makarpura GIDC, Nandesari GIDC, and Savli clusters.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <ShieldCheck className="w-5 h-5 text-[#C65378]" />
                  <h3 className="font-extrabold text-sm text-slate-900">Cross-Border NRI Portfolios</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Harmonized estate structuring for Baroda families with non-resident heirs residing across the USA, UK, Canada, Australia, and the UAE.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: LEGAL FRAMEWORK & MANDATORY VS OPTIONAL */}
            <section id="gujarat-legal-framework" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Vadodara?
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Indian jurisprudence, making and registering a Will is governed by the Indian Succession Act, 1925 and the Registration Act, 1908. In Vadodara, registration is legally optional under Section 18(e) of the Registration Act, 1908. A handwritten or typed Will executed on standard A4 paper, signed by the testator in the physical presence of two independent adult attesting witnesses, is legally enforceable from the day of execution.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <th className="p-3 sm:p-4">Legal Parameter</th>
                      <th className="p-3 sm:p-4">Registered Will (Garvi Gujarat)</th>
                      <th className="p-3 sm:p-4">Unregistered White-Paper Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Legal Validity</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-semibold">100% Valid with Government Seal</td>
                      <td className="p-3 sm:p-4 text-slate-700">Valid if attested by 2 witnesses</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Evidentiary Value</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-semibold">Presumption of Authenticity (Sec 114)</td>
                      <td className="p-3 sm:p-4 text-amber-700">Open to forgery and coercion claims</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">VMC &amp; VUDA Mutation</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-semibold">Expedited; accepted by revenue officers</td>
                      <td className="p-3 sm:p-4 text-amber-700">Requires extensive indemnity bonds &amp; affidavits</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Safety &amp; Archival</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-semibold">Permanently recorded in SRO Book III</td>
                      <td className="p-3 sm:p-4 text-rose-700 font-medium">Risk of loss, tampering, or destruction</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Stamp Duty in Gujarat</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-semibold">₹0 (Completely Exempt under Art. 64)</td>
                      <td className="p-3 sm:p-4 text-emerald-700">₹0 (Zero stamp paper required)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES IN GUJARAT */}
            <section id="vadodara-probate-rules" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 03
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Vadodara Probate Rules: Non-Presidency Town Law
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common misconception among property owners in Vadodara is that every Will must be probated by a court before assets can be transferred. Under Indian law, probate is the formal process by which a competent civil court certifies the authenticity of a Will. However, statutory provisions strictly distinguish historical presidential cities from other territories.
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-amber-900 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Sections 57 &amp; 213 of the Indian Succession Act, 1925</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under Section 213(1) read with Section 57(a) and 57(b), compulsory probate applies <strong>exclusively</strong> to Wills executed by Hindus, Buddhists, Sikhs, or Jains within the historical Presidency Towns of <strong>Mumbai (Bombay), Kolkata (Calcutta), and Chennai (Madras)</strong>, or where immovable property covered under the Will is situated within those three territorial limits.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The <strong>Gujarat High Court</strong> has reaffirmed in landmark decisions (including <em>Minaxiben Shashikantbhai Patel v. Anand Patel</em> and subsequent judgments) that Vadodara, Ahmedabad, Surat, and Rajkot fall strictly outside presidency jurisdictions. Consequently, obtaining probate from a District Court or the Gujarat High Court is <strong>completely optional</strong> for estates located in Vadodara.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                  <strong className="text-emerald-950 block font-bold">Financial &amp; Time Savings</strong>
                  <p className="text-emerald-900 leading-relaxed">
                    By eliminating mandatory probate, families in Vadodara save between ₹75,000 and ₹3,00,000 in court fees, ad valorem stamp duties, and 12 to 24 months of procedural litigation delays.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1.5">
                  <strong className="text-sky-950 block font-bold">When Probate May Still Be Sought</strong>
                  <p className="text-sky-900 leading-relaxed">
                    Probate becomes advisable only when hostile legal heirs challenge testamentary capacity, allege undue influence, or dispute immovable properties through partition suits in the Vadodara District Court.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: HUF ASSETS & CHEMICAL MSME SUCCESSION */}
            <section id="business-huf-succession" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 04
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. HUF Assets &amp; Chemical MSME Succession in Vadodara
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Vadodara is celebrated for its multi-generational commercial and industrial prosperity. Managing the succession of family-owned chemical processing plants, pharmaceutical formulations, engineering workshops, and ancestral Hindu Undivided Family (HUF) estates requires specialized testamentary drafting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Building className="w-5 h-5 text-[#C65378]" />
                    <span>Chemical &amp; Industrial MSME Clusters</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Testators owning manufacturing units across <strong>Makarpura GIDC, Nandesari GIDC, Waghodia GIDC, and Savli</strong> must structure explicit bequests covering:
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
                    <li>Private limited company equity shareholdings &amp; board voting rights.</li>
                    <li>Partnership firm capital accounts &amp; partner admission agreements.</li>
                    <li>Director loan balances &amp; family unsecured debentures.</li>
                    <li>Pollution Control Board clearances &amp; GIDC factory lease assignments.</li>
                  </ul>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Scale className="w-5 h-5 text-[#C65378]" />
                    <span>HUF Coparcenary &amp; Section 30 HSA</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 30 of the Hindu Succession Act, 1956 (amended 2005), a Hindu testator can bequeath <strong>only their individual undivided share</strong> in ancestral coparcenary property:
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
                    <li>Ancestral homes in Mandvi, Dandia Bazar, and Karelibaug Pols.</li>
                    <li>Distinguishing individual self-acquired wealth from HUF funds.</li>
                    <li>Daughter coparcenary equality under <em>Vineeta Sharma v. Rakesh Sharma</em>.</li>
                    <li>Designation of next Karta or consensual partition execution.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 5: SRO DIRECTORY */}
            <section id="vadodara-sro-directory" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 05
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Vadodara Sub-Registrar Offices: District Directory
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration in Vadodara is administered by the Inspector General of Registration Gujarat. You can register your Will at any Sub-Registrar office having territorial jurisdiction over your permanent residence or where your primary immovable property is situated.
                </p>
              </div>

              {/* SEARCH & FILTER BAR */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by area (e.g., Alkapuri, Akota, Gotri, Manjalpur)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C65378] focus:bg-white transition-all"
                />
              </div>

              {/* SRO TABS */}
              <div className="flex flex-wrap gap-2 pt-1">
                {filteredDistricts.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistrict(d.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedDistrict === d.id
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>

              {/* ACTIVE SRO DETAIL CARD */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-rose-50/20 border border-slate-200 p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      {activeDistrictData.sro}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      Territorial Jurisdiction: {activeDistrictData.name}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold w-fit">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeDistrictData.timings}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px] uppercase tracking-wider font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>OFFICIAL PHYSICAL ADDRESS</span>
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {activeDistrictData.address}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px] uppercase tracking-wider font-bold">
                      <Building className="w-3.5 h-3.5 text-[#5F7E75]" />
                      <span>KEY NEIGHBORHOODS &amp; PIN CODES COVERED</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {activeDistrictData.areas}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://garvi.gujarat.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#172228] text-white text-xs font-bold hover:bg-[#253741] transition-all"
                  >
                    <span>Book on Garvi Gujarat Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-rose-300" />
                  </a>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-all"
                  >
                    <span>Lawyer SRO Assistance</span>
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 6: AREA COVERAGE */}
            <section id="vadodara-area-coverage" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 06
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Area-Wise Will Drafting Across Vadodara Localities
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in Alkapuri, Gotri, Manjalpur, or Karelibaug</strong>? Property categories across Vadodara range from luxury bungalows and gated villa schemes to heritage pol residences, VUDA plotted layouts, and GIDC industrial plots.
                  Our senior advocates provide verified legal drafting, Garvi Gujarat portal slot booking, and Sub-Registrar accompaniment across all key residential and industrial clusters:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: ALKAPURI & OLD PADRA ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Alkapuri &amp; Old Padra Road
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Akota
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Alkapuri &amp; Old Padra Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Alkapuri High Street</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Old Padra Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Race Course Circle</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jetalpur</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Haripura</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for premier <strong>Will drafting services in Alkapuri &amp; Old Padra Road</strong>? Alkapuri and Old Padra Road represent Vadodara&apos;s most affluent residential and commercial corridor, home to prominent industrialist families, doctors, and multi-generational business leaders. Our advocates draft tailored bequests for luxury bungalows, commercial retail spaces, and multi-currency foreign accounts for non-resident family members.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Jilla Seva Sadan 1, Akota</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-net-worth portfolio bequeathal, cross-border NRI asset distribution, and expedited Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Western Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Alkapuri"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Alkapuri Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: GOTRI, SEVASI & VASNA-BHAYLI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Gotri, Sevasi &amp; Bhayli
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gorwa
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gotri, Sevasi &amp; Vasna-Bhayli
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gotri Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sevasi TP Schemes</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vasna-Bhayli Canal Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sun Pharma Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bil-Chapad</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Access specialized <strong>Will drafting services in Gotri, Sevasi &amp; Vasna-Bhayli</strong>. As Vadodara&apos;s fastest-growing western luxury expansion zone, this sector features gated villa townships, duplexes, and premium high-rise apartments under VUDA Town Planning schemes. Our legal team drafts airtight clauses ensuring seamless single-window mutation at the VUDA and VMC offices without probate.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Gorwa Revenue Complex, BIDC</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        VUDA Final Plot (FP) mutation advisory, builder allotment transition, and senior citizen doorstep execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">New West Corridor</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gotri"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gotri Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: AKOTA, FATEHGUNJ & SAYAJIGUNJ */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Akota &amp; Sayajigunj
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sayajigunj
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Akota, Fatehgunj &amp; Sayajigunj
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Akota Stadium</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fatehgunj University Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sayajigunj Station Circle</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pratapgunj</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nizampura</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Opt for expert <strong>Will drafting services in Akota, Fatehgunj &amp; Sayajigunj</strong>. Covering Vadodara&apos;s civic, judicial, and academic heartland near The Maharaja Sayajirao University (MSU), this area houses retired judges, professors, civil servants, and senior citizens. We incorporate medical fitness certifications, executor powers, and specific coparcenary partition safeguards.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bahumali Bhavan, Sayajigunj</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Section 31 home visit petitions, university employee pension/gratuity bequeathals, and Bahumali Bhavan token booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Central Administrative Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Akota"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Akota Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: MANJALPUR, MAKARPURA & TARSALI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Manjalpur &amp; Makarpura
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Manjalpur
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Manjalpur, Makarpura &amp; Tarsali
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Manjalpur Naka</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Makarpura GIDC Industrial Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tarsali Ring Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Maneja</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vadsar Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Secure reliable <strong>Will drafting services in Manjalpur, Makarpura &amp; Tarsali</strong>. Serving southern Vadodara&apos;s primary industrial and manufacturing hub, our advocates assist engineering MSME owners, GIDC leaseholders, and housing society members. We structure comprehensive bequests covering factory machinery, supplier credit recovery rights, and cooperative housing share transfers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Taluka Seva Sadan, Manjalpur</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Makarpura GIDC 99-year lease transfer protocols, MSME partner succession, and Taluka Seva Sadan registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Southern Industrial Belt</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Manjalpur"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Manjalpur Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: KARELIBAUG, MANDVI & WALLED CITY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Karelibaug &amp; Walled City
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Kothi
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Karelibaug, Mandvi &amp; Heritage Pols
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Karelibaug VIP Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mandvi Gate</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dandia Bazar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panigate</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Wadi Heritage Pols</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Consult specialist advocates for <strong>Will drafting services in Karelibaug, Mandvi &amp; Heritage Pols</strong>. Eastern Vadodara features centuries-old ancestral pol properties, joint family business shops, and Hindu Undivided Family (HUF) estates. We draft specialized clauses strictly aligned with Section 30 of the Hindu Succession Act, distinguishing coparcenary rights from self-acquired assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Old Collector Office, Kothi Compound</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        HUF coparcenary asset bequeathal, VMC ancestral tenement mutation, and Kothi Compound Book III registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Heritage &amp; Commercial Hub</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Karelibaug"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Karelibaug Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: NANDESARI, WAGHODIA & SAVLI GIDC */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Nandesari &amp; Savli Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Waghodia
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Nandesari, Waghodia &amp; Savli GIDC
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nandesari Chemical GIDC</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Waghodia Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Savli Heavy Engineering Zone</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ajwa Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bapod</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Avail corporate and industrial <strong>Will drafting services in Nandesari, Waghodia &amp; Savli GIDC</strong>. Home to Gujarat&apos;s prominent chemical manufacturing, pharmaceutical formulation, and heavy engineering facilities. Our corporate estate team drafts succession instruments for promoter equity, director loan recovery, and environmental statutory continuity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Waghodia Taluka Seva Sadan</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Chemical MSME enterprise equity transmission, industrial plot lease succession, and Cyber Treasury e-Challan filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Chemical &amp; Industrial Zone</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nandesari"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Industrial Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: 5-STEP GARVI GUJARAT SOP */}
            <section id="garvi-gujarat-process" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 07
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Step-by-Step Garvi Gujarat Portal Will Registration
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Vadodara is performed through the Gujarat government&apos;s digital land and property registry portal (Garvi Gujarat). Follow this tested 5-step Standard Operating Procedure:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Asset Inventory &amp; Beneficiary Designation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a detailed schedule of all immovable assets (VMC residential units, VUDA plots, agricultural farmlands) and movables (bank fixed deposits, mutual funds, demat shares, company equity, gold jewellery). Appoint primary beneficiaries, contingent alternates, and a trustworthy executor.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Drafting with Custom Legal &amp; Succession Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft the Will incorporating mandatory statutory clauses: express revocation of prior wills, sound mental health affirmation, executor powers, debt clearance directives, and specific property bequeathals. Our senior advocates review each clause for unambiguous legal precision.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Physical Attestation Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on plain A4 paper. The testator signs each page in the physical presence of two independent adult witnesses who then sign the attestation clause. Witnesses must not be beneficiaries or spouses of beneficiaries. For testators aged 60+, attach an MBBS doctor&apos;s mental fitness certificate.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Garvi Gujarat Portal Token &amp; e-Challan Generation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit <strong>garvi.gujarat.gov.in</strong>. Select Vadodara district and the appropriate Sub-Registrar Office (Kothi, Akota, Manjalpur, etc.). Enter party KYC details, upload the Will copy, generate an online Cyber Treasury e-Challan for the nominal ₹100 registration fee, and download the e-appointment token slip.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Biometric Appearance &amp; Official Book III Registration
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      On the appointed date, the testator and both witnesses appear before the Vadodara Sub-Registrar with original Aadhaar cards and passport photos. The officer captures digital thumbprints and web-camera photographs, verifies mental volition, enters the Will into confidential Book III records, and issues the registered document with the official government seal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: SECTION 31 HOME VISITS */}
            <section id="section-31-home-visit" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 08
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Section 31 Doorstep Registration for Seniors
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For senior citizens, bedridden individuals, hospitalized testators, or business executives unable to navigate crowded government offices, Indian law provides a statutory remedy for registration at personal residences.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-4">
                <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                  <Home className="w-5 h-5 shrink-0" />
                  <span>Doorstep Commission by Vadodara Sub-Registrars</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar may, upon special cause shown (such as bodily infirmity, advanced age, or medical confinement), attend at the private residence of any person desiring to present a document for registration.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-rose-100">
                    <strong className="block font-bold text-slate-900 mb-1">Medical Certificate</strong>
                    <span className="text-slate-600">Fitness certificate issued by an MBBS doctor confirming testation capacity.</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-rose-100">
                    <strong className="block font-bold text-slate-900 mb-1">Government Commission Fee</strong>
                    <span className="text-slate-600">Nominal official commission and travel allowance paid via Cyber Treasury.</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-rose-100">
                    <strong className="block font-bold text-slate-900 mb-1">Full Mobile Kit</strong>
                    <span className="text-slate-600">Sub-Registrar visits with portable biometric scanner and web-camera.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 09
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Documents Checklist for Gujarat Sub-Registrar
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Interactive checklist of statutory documents required when presenting a Will for registration at any Vadodara Sub-Registrar Office:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  Document Readiness Score:
                </span>
                <span className="px-3 py-1 rounded-full bg-[#C65378] text-white text-xs font-extrabold">
                  {checkedCount} of {checklist.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                      item.checked
                        ? "bg-rose-50/40 border-rose-200"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        item.checked
                          ? "bg-[#C65378] text-white"
                          : "border border-slate-300 bg-white"
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-0.5">
                      <strong
                        className={`text-xs sm:text-sm block font-bold ${
                          item.checked ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {item.label}
                      </strong>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: PROPERTY TYPES */}
            <section id="vadodara-property-types" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 10
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Vadodara Property Types: Freehold, VMC &amp; VUDA
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate holdings across Vadodara require precise drafting tailored to their statutory tenure and issuing authority:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-slate-900 block font-bold">VMC Assessed Residential Flats &amp; Bungalows</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Include the Tenement Number, Ward Name, and latest VMC property tax assessment receipt. A registered Will enables immediate mutation in the VMC ward register without succession certificate delays.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-slate-900 block font-bold">VUDA Plotted Layouts &amp; TP Schemes</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Specify the Town Planning (TP) Scheme Number, Final Plot (FP) Number, and Sub-Plot Number. Essential for modern plotted layouts in Gotri, Sevasi, and Bhayli.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-slate-900 block font-bold">GIDC Industrial Plots &amp; Factory Leases</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Makarpura, Nandesari, and Savli plots are held under 99-year GIDC leases. The Will must designate who succeeds to the leasehold rights, subject to GIDC transfer fee policies.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-slate-900 block font-bold">Agricultural Farmlands (7/12 &amp; 8A AnyROR)</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Gujarat Tenancy and Agricultural Lands Act restrictions apply: agricultural land can be bequeathed only to recognized legal agriculturists. Delineate survey numbers and Khata numbers accurately.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: FEES & CHARGES */}
            <section id="gujarat-registration-fees" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 11
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Official Gujarat Stamp Duty &amp; Registration Fees
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds which attract substantial ad valorem stamp duty (4.9% plus local surcharges in Gujarat), Wills are treated with total statutory exemption to promote voluntary family succession.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">STAMP DUTY</span>
                  <div className="text-2xl font-extrabold text-emerald-600">₹0</div>
                  <p className="text-[11px] text-slate-600">100% exempt under Gujarat Stamp Act Article 64</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">SRO REGISTRATION FEE</span>
                  <div className="text-2xl font-extrabold text-slate-900">₹100</div>
                  <p className="text-[11px] text-slate-600">Flat statutory fee under Gujarat Table of Fees</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">SCANNING &amp; SERVICE</span>
                  <div className="text-2xl font-extrabold text-slate-900">₹100 - ₹200</div>
                  <p className="text-[11px] text-slate-600">Official Garvi Gujarat computerized processing</p>
                </div>
              </div>
            </section>

            {/* SECTION 12: PRICING PACKAGES */}
            <section id="service-pricing" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 12
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Transparent Will Packages &amp; Legal Fees
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the legal support package tailored to your estate size and registration preferences:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Plan 1 */}
                <div className="rounded-2xl border border-slate-200 p-6 flex flex-col justify-between bg-white hover:border-slate-300 transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">ONLINE ESSENTIAL</span>
                    <div className="text-3xl font-extrabold text-slate-900">₹1,990</div>
                    <p className="text-xs text-slate-600">Ideal for straightforward residential and bank asset bequeathal.</p>
                    <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer-drafted custom Will format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>VMC property &amp; bank nomination clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Execution guidelines &amp; witness SOP</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-all"
                  >
                    Select Plan
                  </a>
                </div>

                {/* Plan 2: POPULAR */}
                <div className="rounded-2xl border-2 border-[#C65378] p-6 flex flex-col justify-between bg-rose-50/30 relative shadow-sm">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-mono uppercase tracking-wider font-extrabold">
                    MOST POPULAR
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#C65378] font-bold">ADVOCATE ASSISTED</span>
                    <div className="text-3xl font-extrabold text-slate-900">₹4,990</div>
                    <p className="text-xs text-slate-600">Perfect for business owners, HUF estates, and complex family setups.</p>
                    <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-rose-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior High Court Advocate consult</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Chemical/MSME business equity structuring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Garvi Gujarat slot booking assistance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor certificate &amp; witness verification</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-all shadow-md shadow-[#C65378]/20"
                  >
                    Get Advocate Plan
                  </a>
                </div>

                {/* Plan 3 */}
                <div className="rounded-2xl border border-slate-200 p-6 flex flex-col justify-between bg-white hover:border-slate-300 transition-all">
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">COMPLETE SRO &amp; DOORSTEP</span>
                    <div className="text-3xl font-extrabold text-slate-900">₹9,990</div>
                    <p className="text-xs text-slate-600">Full concierge support from drafting to Sub-Registrar registration.</p>
                    <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Everything in Advocate Assisted plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Cyber treasury e-challan generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer attendance at Vadodara SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit coordination</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-all"
                  >
                    Select Concierge
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ */}
            <section id="frequently-asked-questions" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 13
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Frequently Asked Questions: Vadodara Wills
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Answers to common legal questions regarding Will drafting, HUF assets, and Garvi Gujarat Sub-Registrar registration:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-extrabold text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4 leading-snug">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-[#C65378]">
                  SECTION 14
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  14. Statutory References &amp; Gujarat Revenue Portals
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Authoritative legislative acts, judicial precedents, and government web portals governing Will execution in Gujarat:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">
                    Indian Succession Act, 1925
                  </strong>
                  <p className="text-slate-600">
                    Section 59 (sound mind capacity), Section 63 (execution &amp; two attesting witnesses), Section 213 &amp; 57 (non-presidency probate exemption).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">
                    Registration Act, 1908
                  </strong>
                  <p className="text-slate-600">
                    Section 18(e) (optional registration of wills), Section 31 (doorstep registration commission), Section 51 (confidential Book III registry).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">
                    Gujarat Stamp Act, 1958
                  </strong>
                  <p className="text-slate-600">
                    Schedule I, Article 64 explicitly exempts testamentary Wills from state stamp duty across Gujarat.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">
                    Official Gujarat Revenue Portals
                  </strong>
                  <p className="text-slate-600">
                    Garvi Gujarat Registration Portal (garvi.gujarat.gov.in) &amp; AnyROR e-Dhara Land Records (anyror.gujarat.gov.in).
                  </p>
                </div>
              </div>
            </section>

            {/* CLOSING CTA CARD */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Vadodara Properties &amp; Family Legacy Today
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Take 15 minutes to draft your legally validated Will online. Vetted by senior Gujarat estate advocates with complete Garvi Gujarat registration and doorstep execution assistance.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/30 cursor-pointer"
                >
                  <span>Draft Your Vadodara Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+918700343611"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20"
                >
                  <Phone className="w-4 h-4 text-rose-300" />
                  <span>Call +91-8700343611</span>
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION VISUAL BLUEPRINT MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#172228] rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Will Drafting &amp; Asset Protection in Vadodara (Baroda)
              </span>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="text-xs sm:text-sm text-slate-300 hover:text-white px-2 py-1 rounded-lg bg-white/10"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40">
              <Image
                src="/images/will-drafting-in-vadodara.jpg"
                alt="High Resolution Visual Blueprint: Vadodara Will Drafting and Asset Protection"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
