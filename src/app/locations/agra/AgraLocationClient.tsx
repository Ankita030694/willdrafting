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
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "agra-overview", label: "OVERVIEW" },
  { id: "agra-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "agra-probate-rules", label: "PROBATE RULES" },
  { id: "agra-sro-directory", label: "SRO DIRECTORY" },
  { id: "agra-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-agra-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "agra-property-types", label: "PROPERTY TYPES" },
  { id: "agra-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const AGRA_DISTRICTS = [
  {
    id: "civil-lines-core",
    name: "Civil Lines & Collectorate Core",
    sro: "SRO Agra I (Civil Lines Collectorate)",
    address: "Collectorate Compound, MG Road, Civil Lines, Agra - 282002",
    areas: "Civil Lines, Sanjay Place Commercial Complex, Hariparwat, Raja Ki Mandi, MG Road, Belanganj, Rawatpara, Pipal Mandi",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "sadar-cantt-tajganj",
    name: "Sadar Bazar, Cantt & Tajganj",
    sro: "SRO Agra II (Sadar / Cantonment)",
    address: "Tehsil Sadar Compound, Near Agra Cantt Railway Station, Sadar Bazar, Agra - 282001",
    areas: "Sadar Bazar, Agra Cantt, Fatehabad Road Hotel Belt, Tajganj, Vibhav Nagar, Rakabganj, Idgah, Namner, Pratap Pura, Shahganj",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "khandari-dayalbagh",
    name: "Khandari, Dayalbagh & Kamla Nagar",
    sro: "SRO Agra III (Khandari Complex)",
    address: "Government Administrative Complex, Near Transport Nagar, Khandari, Agra - 282005",
    areas: "Khandari, Dayalbagh, Swami Bagh, Kamla Nagar, Balkeshwar, Sikandra, Bodla, Shastri Puram, Trans-Yamuna Colony, Nunhai",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "sikandra-shastri-puram",
    name: "Sikandra, Shastri Puram & Bodla",
    sro: "SRO Agra III (Sikandra & Bodla Division)",
    address: "Transport Nagar Registry Wing, Khandari / Sikandra Link Road, Agra - 282007",
    areas: "Shastri Puram ADA Schemes, Sikandra Industrial Area, Bodla, Runakta, Bainpur, Paschimpuri, Awas Vikas Colonies",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "trans-yamuna-foundry",
    name: "Trans-Yamuna & Foundry Nagar",
    sro: "SRO Agra III (Trans-Yamuna Wing)",
    address: "Aligarh-Agra Road Administrative Annex, Near Rambagh, Agra - 282006",
    areas: "Trans-Yamuna Colony Phases 1 & 2, Foundry Nagar Industrial Area, Nunhai, Rambagh, Shahdara, Water Works Road",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "fatehabad-rural",
    name: "Fatehabad & Agricultural Belt",
    sro: "SRO Fatehabad (Tehsil Complex)",
    address: "Tehsil Fatehabad Administrative Campus, Agra-Fatehabad Road, Fatehabad - 283111",
    areas: "Fatehabad, Shamsabad, Dauki, Mutnai, Iradatnagar, Agro-industrial cold storage zones, rural agricultural farmland",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "kirawali-kheragarh",
    name: "Kirawali, Achhnera & Western Agra",
    sro: "SRO Kirawali & Kheragarh",
    address: "Tehsil Kirawali Office Campus, Near Fatehpur Sikri Road, Kirawali, Agra - 283122",
    areas: "Kirawali, Achhnera, Fatehpur Sikri Road Belt, Kheragarh, Jagner, agricultural farms and suburban plots",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "bah-pinahat",
    name: "Bah, Pinahat & Bateshwar",
    sro: "SRO Bah (Chambal Valley Tehsil)",
    address: "Tehsil Bah Compound, Bateshwar Road, Bah, Agra - 283104",
    areas: "Bah, Pinahat, Bateshwar Temple Corridor, Jaitpur Kalan, agricultural farmland and ancestral rural properties",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Under Article 64 of Schedule I-B, stamp paper is zero rupees in Uttar Pradesh.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Will maker",
    detail: "Required for biometric thumbprint scanning and live webcam photo capture on the UP IGRSUP portal.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original photo IDs and must not be heirs receiving assets under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Capacity Paper (For Seniors)",
    detail: "Issued by a filed MBBS practitioner certifying sound sound mind to eliminate incapacity claims.",
    checked: false,
  },
  {
    id: "item-5",
    label: "UP IGRSUP e-Appointment Slip & Fee Receipt",
    detail: "Official appointment confirmation downloaded from igrsup.gov.in with selected Agra SRO time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Asset Chain Papers (ADA Allotment / Sale Deed)",
    detail: "Copies of filed sale deeds, ADA allotment letters, or latest Agra Nagar Nigam house tax receipts.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Recent Color Passport Photos Each",
    detail: "Clear passport photographs for the Will maker and both witnesses to paste into SRO Book III registers.",
    checked: false,
  },
];

export default function AgraLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("agra-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("civil-lines-core");
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

  const filteredDistricts = AGRA_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    AGRA_DISTRICTS.find((d) => d.id === selectedDistrict) || AGRA_DISTRICTS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (PUNE / LUCKNOW THEME)
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
                <span>AGRA &amp; WESTERN UP ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 53 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Agra: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your ADA home plots, independent houses, footwear enterprises, and family savings.
                Get lawyer drafting, UP IGRSUP portal filing help, and doorstep signing for senior citizens across Agra.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Agra Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#agra-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Agra SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Allahabad HC Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 UP Stamp Duty</span>
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
                  src="/images/will-drafting-in-agra.jpg"
                  alt="Online Will Drafting and Registration Services in Agra"
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
                4+ SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Agra District Registry
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Article 64 UP Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Non-Needed
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Probate Outside Presidency
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep Visits for Seniors
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
          {/* =====================================================================
              DESKTOP VIEW: STICKY MINIMALIST TABLE OF CONTENTS
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
            <section id="agra-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>AGRA &amp; WESTERN UP SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Agra
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>A Choice SRO Filing</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Registering a Will is a choice under Section 18(e) of the Filing Act, 1908. A handwritten or typed Will on plain paper is legally valid if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Needed</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Unlike Mumbai, Chennai, and Kolkata, court probate is strictly a choice in Agra under Section 213 of the Indian Succession Act. Heirs inherit without needed High Court petitions.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>₹0 UP Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills carry zero stamp duty under Article 64 of Schedule I-B of the Indian Stamp Act in UP. At Agra SRO offices, Will makers pay only a flat ₹100 fee plus nominal scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Fast ADA &amp; City Name Change</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A filed Will expedites asset name change across Agra Development Office (ADA) home schemes, Agra Nagar Nigam records, and UP Revenue Code farm Khatauni updates.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="agra-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Estate Laws in Agra
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Writing a Will in Agra is governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Filing Act, 1908</strong>, and the <strong>Uttar Pradesh Revenue Code, 2006</strong>.
                  Any adult of sound mind who is at least 18 years old can make a Will to transfer self-acquired real estate, business equity, bank accounts, and family shares.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Agra features a unique multi-tier asset landscape.
                  Families hold family Havelis in the old city, ADA plots in Dayalbagh and Shastri Puram, footwear manufacturing units in Sikandra and Nunhai, hotels on Fatehabad Road, and farmland across Fatehabad and Kirawali.
                  A professionally drafted Will ensures your life work transfers securely without protracted courtroom fights.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker must be at least 18 years old and in sound Will mental health (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will must be made voluntarily without coercion, family pressure, or misrepresentation (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You must sign in the direct visual presence of two adult witnesses who attest your signature (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Independent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses must not be heirs receiving any asset under the Will (Section 67).
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
                  2. Will Filing in Agra: Rules &amp; Legal Value
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Filing Act, 1908, registering a Will is <strong>a choice</strong>.
                  A Will written on plain A4 paper is fully valid in Indian courts if properly signed and attested by two witnesses.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, registering your Will at an Agra SRO office provides decisive proof weight.
                  The paper is preserved in government Book III registers, which stops false claims of forgery or tampering:
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Estate Factor</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Filed Will (Agra SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Plain Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Archival</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III archives of UP Filing Office (IGRSUP)</td>
                      <td className="p-4 bg-slate-50/20">Held in private custody; vulnerable to misplacement, water damage, or suppression</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Protection Against Forgery Claims</td>
                      <td className="p-4 bg-rose-50/20">Extremely high. Biometric thumbprints and live photos recorded before the SRO</td>
                      <td className="p-4 bg-slate-50/20">Lower. Disgruntled legal heirs often claim signature fabrication or suspicious circumstances</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">ADA Asset Name Change</td>
                      <td className="p-4 bg-rose-50/20">Accepted directly by Agra Development Office without needed newspaper advertisements</td>
                      <td className="p-4 bg-slate-50/20">ADA demands 30-day public notice in two newspapers, sworn notes, and heavy indemnity bonds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Agra Nagar Nigam Transfer</td>
                      <td className="p-4 bg-rose-50/20">Streamlines house tax record updates (Dakhil Kharij) across city zones</td>
                      <td className="p-4 bg-slate-50/20">City assessors may delay name change until all legal heirs provide certified consent</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Legal Government Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 filing fee plus nominal scanning</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 government fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES FOR AGRA */}
            <section id="agra-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>JURISDICTION RULES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Is Probate Needed for Assets in Agra?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Probate is a court decree certifying the legal authenticity of a Will, granted by a court of competent area.
                  It confers legal office upon the executor to distribute the deceased Will maker&apos;s assets.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 213(2) read with Section 57(a) and (b) of the Indian Succession Act, 1925</strong>, probate is needed only for Wills made within the historical presidency towns of Mumbai, Kolkata, and Chennai, or where land and flats is situated within those presidency limits.
                  <strong> Agra is not a presidency town.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    UP Legal Exemption
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Probate Non-Needed in Agra
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Allahabad High Court has consistently held that for Hindu, Sikh, Jain, and Buddhist Wills signed in Agra and Uttar Pradesh, getting court probate is not needed to set up title over local land or cash assets.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Saves years of civil court court fights and heavy court fees</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    When Court Intervention Arises
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate or Estate Advice Needed?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    While probate is a choice in Agra, families may still apply for Letters of Care or a Estate Paper if a contentious legal heir fights the Will in the Agra District Court, or if nationalized banks demand judicial sanction.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>A filed Will drastically minimizes any fight risks</span>
                  </div>
                </div>
              </div>

              {/* HELPFUL TOOL CALLOUT */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Do you also own real estate or family asset in Mumbai or Kolkata?
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    If your Agra Will encompasses assets located within Greater Mumbai, Kolkata, or Chennai, presidency town probate rules may apply to those specific assets.
                  </p>
                </div>
                <Link
                  href="/tools/succession-calculator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                >
                  <span>Check Estate Rights</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="agra-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Agra SRO Offices &amp; SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will filing across Agra district is administered by the Stamps and Filing Office of Uttar Pradesh (IGRSUP).
                  Under Section 32 of the Filing Act, you can present your Will at the SRO office having area over your residence.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search locality (e.g. Dayalbagh, Kamla Nagar, Sikandra)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {AGRA_DISTRICTS.length} Key Agra Jurisdictions
                  </span>
                </div>

                {/* DISTRICT PILL BUTTONS */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {AGRA_DISTRICTS.map((district) => {
                    const isSelected = selectedDistrict === district.id;
                    return (
                      <button
                        key={district.id}
                        type="button"
                        onClick={() => setSelectedDistrict(district.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {district.name}
                      </button>
                    );
                  })}
                </div>

                {/* SELECTED JURISDICTION DISPLAY */}
                <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                        JURISDICTION &amp; SUB-REGISTRAR OFFICE
                      </span>
                      <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">
                        {activeDistrictData.sro}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold w-fit">
                      <Check className="w-3 h-3" /> Book III Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Office Complex Address:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.address}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Working Hours &amp; Public Window:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.timings}</p>
                    </div>

                    <div className="md:col-span-2 space-y-1 pt-2 border-t border-slate-200/60">
                      <span className="font-bold text-slate-900 block">Neighborhoods &amp; Pin Codes Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.areas}</p>
                    </div>
                  </div>
                </div>

                {/* IGRSUP PORTAL BOOKING NOTE */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      Filing appointment slots must be pre-booked online via the UP IGRSUP portal (igrsup.gov.in) before visiting the SRO.
                    </span>
                  </div>
                  <a
                    href="https://igrsup.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-900 underline hover:text-amber-950 shrink-0 ml-2"
                  >
                    IGRSUP Portal &rarr;
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5: LOCAL AREA COVERAGE */}
            <section id="agra-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Agra Localities
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally checked <strong>Will drafting services in Dayalbagh, Kamla Nagar, Civil Lines, or Sanjay Place</strong>? Our senior estate planning lawyers provide full legal drafting, UP IGRSUP portal slot booking, and SRO accompaniment tailored to the specific asset dynamics of Agra:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: DAYALBAGH & SWAMI BAGH */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Home &amp; Educational
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Agra III (Khandari)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Dayalbagh &amp; Swami Bagh
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Swami Bagh</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Soami Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">DEI Campus Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Prem Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vidyut Nagar</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Dayalbagh</strong> and Swami Bagh for peaceful home bungalows, retired educationists, family savings, and independent plots, making sure seamless estate without inter-family contention.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Government Office Complex, Khandari</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        UP IGRSUP appointment scheduling, lawyer representation, and Section 31 home visits for elderly Will makers across Dayalbagh.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Dayalbagh"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Dayalbagh Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: KAMLA NAGAR & BALKESHWAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North-East Shop &amp; Homes
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Agra III (Khandari)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kamla Nagar &amp; Balkeshwar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kamla Nagar Blocks A-G</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Balkeshwar Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Water Works Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">New Agra Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhagwan Talkies Cross</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Leading <strong>Will drafting services in Kamla Nagar</strong> and Balkeshwar for multi-generational business families, trading house owners, shop storefronts, and mutual fund investment portfolios.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Transport Nagar / Khandari Office Annex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Rapid e-token generation on igrsup.gov.in, lawyer review, and Book III filing for Kamla Nagar residents.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kamla Nagar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kamla Nagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: CIVIL LINES, SANJAY PLACE & MG ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Shop &amp; Financial Heart
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Agra I (Civil Lines)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Civil Lines &amp; Sanjay Place
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sanjay Place Complex</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hariparwat Crossing</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">MG Road Shop</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Raja Ki Mandi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Professors Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      High-net-worth <strong>Will drafting services in Civil Lines</strong> and Sanjay Place for corporate office spaces, shop complexes, doctor clinics, equity portfolios, and Will trust formations.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Collectorate Compound, Civil Lines</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Direct lawyer representation at the apex Collectorate registry, doctor coordination, and rapid Book III entry.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Civil Lines"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Civil Lines Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: TAJGANJ, FATEHABAD ROAD & HOSPITALITY BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Tourism &amp; Hospitality Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Agra II (Sadar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Tajganj &amp; Fatehabad Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fatehabad Road Hotels</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tajganj East Gate</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vibhav Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shilpgram Zone</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Basai Khurd</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom <strong>Will drafting services in Tajganj</strong> and Fatehabad Road for boutique hotels, guest houses, marble handicraft emporiums, and tourist transportation enterprises, securing business continuity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Sadar Compound, Near Agra Cantt</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Hospitality asset ring-fencing, partnership share estate, and dedicated lawyer guidance at SRO Sadar.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Tajganj"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Tajganj Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: SIKANDRA, SHASTRI PURAM & BODLA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        ADA Plotted Home &amp; Footwear
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Agra III (Khandari)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sikandra, Shastri Puram &amp; Bodla
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shastri Puram Sectors</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sikandra Monument Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bodla Crossing</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Paschimpuri Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Awas Vikas Sector 1-16</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Structured <strong>Will drafting services in Shastri Puram</strong> and Sikandra for Agra Development Office (ADA) home plots, duplex villas, and MSME footwear workshop premises.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Transport Nagar Sub-Registry Wing</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        ADA allotment paper review, fast name change advice, and prompt IGRSUP e-appointment booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sikandra"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Sikandra Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: SADAR BAZAR, AGRA CANTT & RAKABGANJ */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Heritage &amp; Cantonment Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Agra II (Sadar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sadar Bazar &amp; Agra Cantt
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sadar Bazar Retail</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Agra Cantt Railway Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rakabganj</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pratap Pura</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Idgah Colony</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Reliable <strong>Will drafting services in Sadar Bazar</strong> and Agra Cantt for retail store owners, shop premises, cantonment boundary residences, and family family jewellery bequests.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Sadar Office Annex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete support for cantonment board asset check and SRO filing signing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sadar Bazar"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Sadar Bazar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: NUNHAI INDUSTRIAL AREA & FOUNDRY NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Plant &amp; Leather Manufacturing
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Agra III (Khandari)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Nunhai &amp; Foundry Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Nunhai Plant Estate</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Foundry Nagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rambagh Plant Wing</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shahdara Link Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Trans-Yamuna Phase 1</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Enterprise <strong>Will drafting services in Nunhai</strong> and Foundry Nagar for shoe factory land, cast-iron foundries, machinery assets, export receivables, and partnership business estate.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Trans-Yamuna Office Wing</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Corporate asset ring-fencing, factory deed reviews, and expedited Book III filing for plant promoters.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Nunhai"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Nunhai Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: FATEHABAD, SHAMSABAD & AGRO BELT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Farm &amp; Cold Storage
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Fatehabad
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Fatehabad &amp; Shamsabad
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Fatehabad Tehsil</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Shamsabad Agro Hub</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dauki Farmlands</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Potato Cold Storages</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bichpuri Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Farm <strong>Will drafting services in Fatehabad</strong> and Shamsabad under Section 107 of the UP Revenue Code, 2006 for farm holdings, cold storages, and family rural assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tehsil Fatehabad Office Campus</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Khatauni check, UP Bhulekh name change alignment, and physical lawyer support at SRO Fatehabad.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Fatehabad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Fatehabad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-agra-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP SOP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Will Drafting to Filing
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this checked standard operating step to prepare, execute, and optionally register your Will in Agra:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Inventory Assets &amp; Identify Heirs
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Compile a complete list of your assets in Agra and beyond. Include ADA allotment numbers, filed sale deeds, Nagar Nigam house tax assessments, factory assets, bank folios, and farm Khatauni details. Appoint a trustworthy executor.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Draft Legal Will with Estate Lawyer
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Work with our specialized estate lawyers to structure custom clauses. Include clear revocation of prior Wills, specific bequests, survivorship terms, and a residual clause to cover any future acquisitions.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Execute &amp; Attest Before Two Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on plain A4 sheets. Sign or place your thumb impression at the bottom of each page in the presence of two independent adult witnesses. Both witnesses sign and record their complete contact and Aadhaar details.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Book UP IGRSUP Appointment Online
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Log in to the Stamps and Filing portal (igrsup.gov.in) and enter the Paper Filing portal. Select your local Agra SRO office, upload party information, pay the ₹100 filing fee online, and download the e-appointment token.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    5
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      Complete Biometric Check at Agra SRO
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the SRO office during your scheduled slot with both witnesses, original Aadhaar cards, and passport photos. The officer records biometric fingerprints, takes live webcam photos, files the Will into Book III records, and issues your filed paper.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: DOORSTEP REGISTRATION */}
            <section id="doorstep-home-registration" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP CONVENIENCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Filing in Agra
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visiting crowded government registry offices in Civil Lines or Sadar can be demanding for elderly citizens, bedridden Will makers, or hospital patients.
                  <strong> Section 31 of the Filing Act, 1908</strong> allows the SRO to visit the Will maker&apos;s residence or hospital room under exceptional circumstances.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <h3 className="text-lg font-bold text-slate-900">
                  How Home Filing Works Across Agra:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Doctor Fitness Paper</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A filed MBBS practitioner examines the Will maker and certifies sound mental capacity while noting physical inability to travel to the SRO.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">SRO Commission Form</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our legal team files a formal Section 31 petition before the concerned Agra SRO along with the doctor&apos;s paper and pays the official commission visit fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">Officer Home Visit</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The SRO arrives at your Agra home or hospital room with portable biometric equipment, checks identities, records fingerprints, and registers the Will.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center gap-3 text-xs text-rose-950">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>
                    Our Agra legal associates manage full doctor coordination, petition drafting, and officer appointment scheduling.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PREPARATION CHECKLIST</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Needed Paper Checklist for Agra Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Keep these checked records ready before signing and registering your Will in Agra:
                </p>
              </div>

              {/* INTERACTIVE CHECKLIST */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700">
                    Checklist Readiness: {checkedCount} of {checklist.length} Completed
                  </span>
                  <div className="w-36 h-2 rounded-full bg-slate-100 overflow-hidden">
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
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200 text-slate-900"
                          : "bg-slate-50/50 border-slate-200/70 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 text-[#C65378] rounded-sm focus:ring-[#C65378] cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs sm:text-sm block">{item.label}</span>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="agra-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Estate Asset Split: ADA Plots &amp; Business Assets
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A legally compliant Will should address the distinctive asset classes prevalent across Agra:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ASSET 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Agra Development Office (ADA) Home Plots &amp; Flats
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    ADA administers home schemes across Shastri Puram, Sikandra, and Dayalbagh. For filed Wills, ADA updates leasehold and freehold records smoothly. Plain Wills trigger costly newspaper publication notices and lengthy indemnity rules.
                  </p>
                </div>

                {/* ASSET 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Agra Nagar Nigam Asset Tax Name Change (Dakhil Kharij)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    City records (*Bhavan Kar*) for houses in Kamla Nagar, Civil Lines, or family Havelis in the old city require formal name substitution upon the owner&apos;s death. A filed Will accompanied by death papers avoids prolonged city delays.
                  </p>
                </div>

                {/* ASSET 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Footwear Manufacturing &amp; Leather Enterprise Assets
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Agra is India&apos;s footwear capital. Bequeathing manufacturing units in Nunhai, Bodla, or Sikandra requires clear separation between factory premises, plant machinery, export licenses, trade marks, and bank facilities to prevent operational deadlock.
                  </p>
                </div>

                {/* ASSET 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Tourist Hospitality Assets &amp; Hotels on Fatehabad Road
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Hotels, guest houses, and handicraft showrooms along the Tajganj and Fatehabad Road corridor need tailored estate structures. Defining management rights, leasehold interests, and dividend distributions prevents bitter partnership fights.
                  </p>
                </div>

                {/* ASSET 5 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2 md:col-span-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Farm Land &amp; UP Revenue Code 2006 (Section 107)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 107 of the Uttar Pradesh Revenue Code, 2006, a Bhumidhar with transferable rights can bequeath farmland in Fatehabad, Shamsabad, or Achhnera. The bequest must respect land ceiling rules and dependent rules under Section 108, updated in Khatauni records via UP Bhulekh.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & STAMP DUTY */}
            <section id="agra-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Filing Charges &amp; Zero Stamp Duty in UP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike real estate sale deeds that attract 7% stamp duty in Uttar Pradesh, Will filing is heavily subsidized by the UP State Government:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-[#C65378]">₹0</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">UP Stamp Duty</h4>
                  <p className="text-[11px] text-slate-500">100% exempt under Article 64 of Schedule I-B</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">₹100</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">SRO Filing Fee</h4>
                  <p className="text-[11px] text-slate-500">Fixed legal government filing fee across Agra</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">₹100 - ₹200</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Scanning &amp; Portal Fee</h4>
                  <p className="text-[11px] text-slate-500">Nominal page scanning charges for Book III records</p>
                </div>
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
                  11. Transparent Pricing: Agra Will Making Packages
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the level of professional support best suited to your family&apos;s estate planning rules across Agra:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Standard</span>
                    <h3 className="font-extrabold text-xl text-slate-900">Online Will Drafting</h3>
                    <div className="text-3xl font-black text-slate-900">₹1,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for people with straightforward assets like an ADA plot or house, bank deposits, and mutual funds.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer-vetted legal format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Specific asset bequest clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant digital PDF download</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Signing &amp; witness signing guide</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Start Drafting
                  </a>
                </div>

                {/* PLAN 2 - FEATURED */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between relative">
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider">
                    MOST POPULAR
                  </span>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">Professional</span>
                    <h3 className="font-extrabold text-xl text-slate-900">Lawyer Talk &amp; Review</h3>
                    <div className="text-3xl font-black text-slate-900">₹4,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recommended for Agra families owning multiple assets, footwear businesses, or farmland.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Lawyer Talk</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Custom clauses for ADA &amp; business assets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor paper format included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Unlimited revisions until approval</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-colors text-center cursor-pointer"
                  >
                    Book Lawyer Call
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Full</span>
                    <h3 className="font-extrabold text-xl text-slate-900">Complete SRO Filing</h3>
                    <div className="text-3xl font-black text-slate-900">₹9,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Full turnkey service including UP IGRSUP booking and physical SRO or doorstep accompaniment.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete lawyer drafting &amp; review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>UP IGRSUP appointment management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Physical lawyer accompaniment at SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doorstep visit management for seniors</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Request Filing
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUERIES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Will Drafting in Agra
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear answers to key estate, filing, and asset transfer questions for Agra residents:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-bold text-sm sm:text-base text-slate-900">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          <p className="pt-3">{faq.a}</p>
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
                  <span>LEGAL REFERENCES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Legal Citations &amp; Legal Precedents in UP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Every Will drafted through WillDrafting.in is constructed in strict adherence to authoritative Indian statutes and judicial rulings:
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">
                    Indian Succession Act, 1925 (Sections 59, 61, 63, 67, 213):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Governs sound Will mind, voluntary consent, two-witness signing, and specifies that court probate is non-needed outside historical presidency limits.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Filing Act, 1908 (Sections 18(e), 31, 32, 51):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Establishes that Will filing is a choice, authorizes Section 31 home visits for infirm or elderly Will makers, and mandates permanent custody in Book III archives.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Indian Stamp Act, 1899 (Schedule I-B, Article 64 as applicable to UP):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Grants complete exemption from ad-valorem stamp duty for Wills signed and presented for filing anywhere in the State of Uttar Pradesh.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Uttar Pradesh Revenue Code, 2006 (Sections 107 &amp; 108):
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Governs Will estate of farm land held by Bhumidhars with transferable rights, subject to legal land ceiling limits and dependent welfare safeguards.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block">
                    Allahabad High Court Precedents on Non-Presidency Probate:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Multiple Allahabad High Court decisions affirm that for assets in Agra and throughout Uttar Pradesh, an executor or legatee can set up rights without getting formal probate decrees.
                  </p>
                </div>
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
          HIGH-RESOLUTION BLUEPRINT MODAL
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
                Visual Blueprint: Agra Will Drafting &amp; SRO Filing Architecture
              </span>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 mt-3">
              <Image
                src="/images/will-drafting-in-agra.jpg"
                alt="High Resolution Visual Blueprint: Agra Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                sizes="(max-width: 1200px) 95vw, 1000px"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FLOATING CTA BAR FOR MOBILE
          ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[11px] font-bold text-slate-500 truncate uppercase">
            Agra Will Services
          </span>
          <span className="block text-xs font-extrabold text-slate-900 truncate">
            Lawyer Drafted &amp; ₹0 Stamp Duty
          </span>
        </div>
        <a
          href="/start"
          onClick={handleStartDraft}
          className="px-5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-extrabold shadow-md shrink-0 cursor-pointer"
        >
          Draft Will Online
        </a>
      </div>
    </div>
  );
}
