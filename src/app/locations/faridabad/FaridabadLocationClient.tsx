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
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "faridabad-overview", label: "OVERVIEW" },
  { id: "faridabad-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "faridabad-probate-rules", label: "PROBATE RULES" },
  { id: "faridabad-sro-directory", label: "SRO DIRECTORY" },
  { id: "faridabad-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-faridabad-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "faridabad-property-types", label: "PROPERTY TYPES" },
  { id: "faridabad-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const FARIDABAD_SRO_HUBS = [
  {
    id: "faridabad-tehsil",
    name: "Faridabad Tehsil (Sector 12 Mini Secretariat)",
    sro: "Sub-Registrar Office, Tehsil Faridabad",
    address: "Mini Secretariat, Ground Floor, Sector 12, Faridabad, Haryana - 121007",
    areas: "Sectors 7 to 21, Sector 14, Sector 15, Sector 16, Sector 17, Greenfields, Charmwood Village, Surajkund, Old Faridabad, NIT 1-5",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, Haryana Govt holidays closed)",
  },
  {
    id: "ballabgarh-tehsil",
    name: "Ballabgarh Tehsil (SDM Complex)",
    sro: "Sub-Registrar Office, Tehsil Ballabgarh",
    address: "Tehsil Compound, Near SDM Court, Tigaon Road, Ballabgarh, Faridabad - 121004",
    areas: "Ballabgarh City, Sectors 1 to 6, Sectors 55 to 65, IMT Faridabad, Chhainsa, Mohna, Raja Nahar Singh Colony",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, Haryana Govt holidays closed)",
  },
  {
    id: "badkhal-sro",
    name: "Badkhal Sub-Division (SDM Office)",
    sro: "Sub-Registrar Office, Badkhal",
    address: "Sub-Divisional Magistrate Complex, Badkhal Lake Road, Faridabad - 121001",
    areas: "Badkhal Village, NIT Industrial Area, Sainik Colony, Surajkund Green Belt, Kant Enclave, Anangpur",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, Haryana Govt holidays closed)",
  },
  {
    id: "greater-faridabad",
    name: "Greater Faridabad / Neharpar Hub",
    sro: "Joint Sub-Registrar / Sector 12 Jurisdictional Desk",
    address: "Mini Secretariat Complex (Neharpar Revenue Zone Desk), Sector 12, Faridabad - 121007",
    areas: "Sectors 75 to 89, BPTP Parklands, Omaxe Heights, Puri Pranayam, KLJ Platinum, SRS Pearl, RPS Savana",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, Haryana Govt holidays closed)",
  },
  {
    id: "dhauj-tigaon",
    name: "Dhauj & Tigaon Sub-Tehsil",
    sro: "Sub-Tehsil Office, Dhauj & Tigaon",
    address: "Rural Sub-Tehsil Administrative Block, Tigaon-Faridabad Belt, Faridabad Rural",
    areas: "Dhauj, Tigaon, Dayalpur, Aravalli foothill farmhouses, rural agricultural revenue circles",
    timings: "9:00 AM to 5:00 PM (Monday to Friday, Haryana Govt holidays closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will Document",
    detail: "Printed on standard white A4 sheets. Under Haryana state law, non-judicial stamp paper is not required for Wills.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Essential for biometric identity validation, electronic thumbprint, and digital photo capture at the SRO counter.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Must carry original photo IDs and must not be heirs receiving any asset or bequest under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Sound Mind Note (MBBS / MD)",
    detail: "Strongly advised for senior citizens aged 60+. Certifies sound sound mind and alert cognitive mind.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Jamabandi Haryana e-Appointment Slot Slip",
    detail: "Official token appointment slip generated via jamabandi.nic.in with nominal government service charge receipt.",
    checked: false,
  },
  {
    id: "item-6",
    label: "HSVP Allotment Letter / Conveyance Deed",
    detail: "For plotted sectors (HUDA / HSVP), provides clear sector number, plot measurement, and registered owner records.",
    checked: false,
  },
  {
    id: "item-7",
    label: "MCF Property Tax Receipt & Assigned Property ID",
    detail: "Municipal Corporation of Faridabad tax receipt or NDC showing verified property coordinates for smooth name change.",
    checked: false,
  },
  {
    id: "item-8",
    label: "Apartment Buyer Agreement or Society Share Certificate",
    detail: "For high-rise condominiums in Greater Faridabad (Neharpar) detailing tower, unit number, and parking allocation.",
    checked: false,
  },
];

export default function FaridabadLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("faridabad-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("faridabad-tehsil");
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

  const filteredHubs = FARIDABAD_SRO_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      h.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeHubData =
    FARIDABAD_SRO_HUBS.find((h) => h.id === selectedHub) || FARIDABAD_SRO_HUBS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

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
                <span>FARIDABAD &amp; SOUTH NCR ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 53 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Faridabad: Asset Protection
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally watertight Will for your HSVP plotted sectors, independent builder floors, Greater Faridabad high-rises, and Mathura Road industrial units. Get Punjab &amp; Haryana High Court lawyer drafting, Jamabandi Haryana slot booking, and Section 31 doorstep signing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Faridabad Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#faridabad-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Faridabad SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>P&amp;H High Court Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Haryana Stamp Duty</span>
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
                  src="/images/will-drafting-in-faridabad.jpg"
                  alt="Legal Will Drafting and Property Succession in Faridabad Haryana NCR"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  Faridabad Urban &amp; HSVP Succession Blueprint
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
                5 SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Faridabad District Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Haryana Stamp Act Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Punjab &amp; Haryana HC Rule
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

          {/* MAIN EDITORIAL CONTENT AREA */}
          <main className="min-w-0 flex-1 space-y-16">

            {/* SECTION 0: EXECUTIVE SUMMARY */}
            <section id="faridabad-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>FARIDABAD ESTATE SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Faridabad
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills written on standard white paper and attested by two witnesses are legally binding in Faridabad under Section 18(e) of the Registration Act, 1908. Sub-Registrar registration at Sector 12 Mini Secretariat is optional but eliminates future validity fights.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Needed</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Punjab &amp; Haryana High Court rulings, probate is non-needed in Haryana for Hindus, Sikhs, Jains, Buddhists, and Christians. Heirs bypass civil court probate petitions and transfer property directly.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>HSVP &amp; MCF Direct Name Change</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Haryana Shehri Vikas Pradhikaran (HSVP) and Municipal Corporation of Faridabad (MCF) update ownership registers, Property IDs, and sector plot records directly on the basis of a registered Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Nominal SRO Fee &amp; ₹0 Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are 100% exempt from Haryana stamp duty. Registration at Faridabad Tehsil incurs only a flat ₹100 registration fee plus nominal Jamabandi portal computerization service charges.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="faridabad-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FOUNDATION &amp; JURISPRUDENCE</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  1. Legal Framework: Indian Succession Act in Faridabad
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Testamentary succession across Faridabad District is governed by the Indian Succession Act, 1925, alongside specific state property enactments including the Haryana Shehri Vikas Pradhikaran Act, 1977 and the Haryana Municipal Corporation Act, 1994. Whether bequeathing an independent home floor in Sector 14, an industrial factory in Sector 24, or a multi-story apartment in Greater Faridabad, an enforceable Will requires strict adherence to legal principles:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378] font-bold text-sm">
                    § 59
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Testamentary Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Any person of sound mind who has attained majority (18 years) can make a Will. For elderly testators in Faridabad, procuring a registered medical practitioner&apos;s mental fitness paper on the date of signing prevents future fights regarding cognitive decline or undue influence.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378] font-bold text-sm">
                    § 63
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Signing &amp; Attestation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker must sign or affix their thumb impression on each page of the Will. Crucially, the document must be attested by at least two competent adult witnesses who observe the Will maker signing the Will and sign in each other&apos;s mutual presence.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378] font-bold text-sm">
                    § 67
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Witness Disqualification</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 67, any bequest made to an attesting witness or to their spouse is void. In Faridabad, family members designated to inherit property should never sign as witnesses; neutral family friends, neighbors, or long-standing professionals must be engaged.
                  </p>
                </div>
              </div>

              {/* TESTAMENTARY VS INTESTATE COMPARISON */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Succession Compared: Dying With a Will vs Dying Without a Will in Faridabad
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-600 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 font-semibold text-slate-900">
                        <th className="py-3 px-4">Parameter</th>
                        <th className="py-3 px-4">With a Registered Will</th>
                        <th className="py-3 px-4">Without a Will (No Will)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800">Asset Split</td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">As explicitly designated by the Will maker</td>
                        <td className="py-3 px-4 text-rose-700">Divided strictly per legal personal laws among all Class-I heirs</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800">HSVP Plot Name Change</td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">Direct substitution via registered Will and indemnity bond</td>
                        <td className="py-3 px-4 text-rose-700">Requires all legal heirs to execute registered relinquishment deeds or court paper</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800">MCF Property ID Transfer</td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">Processed swiftly on ULB portal with registered Will</td>
                        <td className="py-3 px-4 text-rose-700">Joint ownership recorded for all legal heirs, freezing unilateral sales or redevelopment</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800">Family Fight Vulnerability</td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">Minimized; clear exclusion clauses and mental capacity evidence</td>
                        <td className="py-3 px-4 text-rose-700">Extremely high; split suits in Faridabad District Court often drag for 8-15 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 2: REGISTRATION RULES */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT 1908 COMPLIANCE</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  2. Registration Rules: Optional vs Government Registered
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, the registration of a Will is strictly optional across India, including Haryana. An unregistered Will signed on an ordinary sheet of A4 paper before two witnesses is 100% legally enforceable in court. However, leaving a Will unregistered in an urban industrial hub like Faridabad carries serious strategic disadvantages:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm sm:text-base">
                    <FileText className="w-5 h-5 text-slate-500" />
                    <span>Unregistered Will on Plain Paper</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Legally valid under Section 63 Indian Succession Act without any stamp paper.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>High risk of tampering, destruction, loss, or claims of physical suppression by disgruntled relatives.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>HSVP estate officers and municipal offices often demand court declarations before accepting unregistered Wills.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Burden of proving authenticity in court falls heavily on the heir if contested.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-white border-2 border-[#C65378]/25 p-5 sm:p-6 shadow-xs space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#C65378] text-white text-[10px] font-bold uppercase rounded-bl-xl tracking-wider">
                    RECOMMENDED ROUTE
                  </div>
                  <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm sm:text-base">
                    <ShieldCheck className="w-5 h-5 text-[#C65378]" />
                    <span>Registered Will in Book III Custody</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Preserved permanently in government Book III registry archives at Faridabad Tehsil.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Presumption of genuine signing under Section 114 of the Indian Evidence Act.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Direct property name change accepted by HSVP, MCF, builder agencies, and banks without civil suits.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Certified government copies can be retrieved even if the original physical copy is misplaced.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="faridabad-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT RULING &amp; SECTION 213 EXEMPTION</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  3. Probate Rules: Punjab &amp; Haryana High Court Exemption
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  One of the most persistent misconceptions among property owners in Faridabad is that every Will must be probated in a civil court before real estate can be transferred. In Haryana, this is legally untrue. The legal framework and binding High Court precedents provide complete clarity:
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 leading-relaxed space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Legal Exemption under Section 213(2) Indian Succession Act</span>
                  </div>
                  <p>
                    Section 213(1) of the Indian Succession Act mandates court probate to set up a right as executor or legatee under a Will. However, sub-section (2) explicitly restricts this mandate to Wills signed within the presidential territories of Calcutta, Madras, and Bombay, or Wills relating to land and flats situated within those territories under Section 57(a) and (b).
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    The <strong>Punjab and Haryana High Court</strong> has reiterated across dozens of landmark judgments (including <em>Behari Lal Ram Charan v. Karam Chand</em> and subsequent Division Bench rulings) that testamentary instruments signed in Haryana, Punjab, or Chandigarh do not fall within the territorial ambit of Section 57(a) and (b).
                  </p>
                  <p>
                    So, <strong>probate is strictly non-needed in Faridabad</strong> for Hindus, Sikhs, Jains, Buddhists, and Christians. Heirs inheriting HSVP home plots, shop shops, builder floors, or bank deposits do not need to institute costly, multi-year probate proceedings in the Faridabad District and Sessions Court.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-900 block mb-1">Direct HSVP Sector Name Change</span>
                    <span className="text-slate-600">
                      Estate officers across Faridabad HSVP sectors process name substitutions upon receipt of the registered Will, death paper, affidavit, and public notice in newspapers.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-900 block mb-1">Financial Asset Transfer</span>
                    <span className="text-slate-600">
                      Banks and mutual fund depositories in Faridabad release balances, Demat portfolios, and locker contents directly to designated Will heirs without requiring court letters of management.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="faridabad-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION HUBS &amp; JURISDICTIONS</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  4. SRO Directory: Faridabad Sub-Registrar Offices
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Faridabad District comprises five principal Sub-Registrar and Sub-Tehsil registration areas under the Revenue Department of Haryana. Use the interactive directory below to identify your designated SRO, office address, and area:
                </p>
              </div>

              {/* SEARCH BAR */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by sector, colony, or SRO name (e.g., Sector 14, Neharpar, Ballabgarh)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-800 focus:outline-hidden focus:border-[#C65378] transition-colors"
                />
              </div>

              {/* SRO TABS */}
              <div className="flex flex-wrap gap-2">
                {filteredHubs.map((hub) => (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedHub === hub.id
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50"
                    }`}
                  >
                    {hub.name}
                  </button>
                ))}
              </div>

              {/* ACTIVE SRO CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#C65378] font-bold block">
                      OFFICIAL JURISDICTION DESK
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      {activeHubData.sro}
                    </h3>
                  </div>
                  <span className="self-start sm:self-auto text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                    Jamabandi e-Appointment Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-700 block">Office Address</span>
                    <span className="text-slate-600 leading-relaxed block">{activeHubData.address}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-700 block">Jurisdictional Coverage</span>
                    <span className="text-slate-600 leading-relaxed block">{activeHubData.areas}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-700 block">Working Timings</span>
                    <span className="text-slate-600 leading-relaxed block">{activeHubData.timings}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
                  <span>Slot Booking Portal: <strong>jamabandi.nic.in</strong> (Deed Registration Module)</span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:text-[#a13c5d]"
                  >
                    <span>Book Lawyer Accompaniment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 5: LOCAL AREAS COVERAGE (EXACT SAME TYPE AS NASHIK)
                ========================================================================= */}
            <section id="faridabad-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>FARIDABAD DISTRICT REGIONAL DIVISION</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  5. Local Areas: Full Faridabad Coverage
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Estate assets in Faridabad span prime plotted sectors with independent builder floors in Sectors 14, 15, and 16, modern high-rise condominiums across Greater Faridabad (Neharpar), established shop hubs in NIT, luxury villas near Surajkund, and auto-manufacturing plants along Mathura Road. Our legal lawyers provide bespoke testamentary drafting, Jamabandi Haryana slot scheduling, and Sub-Registrar accompaniment across all key micro-markets:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: SECTORS 14, 15, 16 & 17 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Prime Plotted &amp; Builder Floors
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Faridabad (Sector 12)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sectors 14, 15, 16 &amp; 17
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 14</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 15 &amp; 15A</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 16</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 17 Plotted</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in Sectors 14, 15, 16 &amp; 17</strong> for upscale HSVP independent bungalows, newly redeveloped builder floors, and shop SCOs. Formulates unequivocal floor-wise division, common roof access covenants, stilt parking rights, and mutual fund bequests to prevent future family fights.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Secretariat, Sector 12</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Jamabandi online token booking, lawyer physical representation, and Section 31 doorstep signing for senior citizens.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sector 14 Faridabad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Central Faridabad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: GREATER FARIDABAD (NEHARPAR) */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Home className="w-3.5 h-3.5" />
                        Greater Faridabad High-Rise Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sector 12 Desk
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Greater Faridabad (Neharpar)
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sectors 75-89</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">BPTP Parklands</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Omaxe Heights</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Puri Pranayam</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">KLJ Platinum</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Customized <strong>Will drafting services in Greater Faridabad</strong> for high-rise condominiums, penthouse duplexes, and gated society flats across Sectors 75 to 89. Structures clean Apartment Owners Association (AOA) transfer clauses, builder maintenance clearances, and undivided common land share bequests.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sector 12 Neharpar Desk</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-rise apartment title check, developer NOC steps, and expedited Jamabandi registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Condominiums &amp; High-Rises</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Greater Faridabad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Neharpar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: SECTORS 21A, 21B, 21C & 21D */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Aravalli Foothills Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Faridabad (Sector 12)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sectors 21A, 21B, 21C &amp; 21D
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 21C</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 21B</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 21A Foothills</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Asian Hospital Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Sector 21C</strong> and surrounding sectors for premium home villas, builder floors, and doctor clinics near Surajkund road. Incorporates medical fitness certifications, surviving spouse life-interest protections, and smooth MCF Property ID name change.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sector 12 Mini Secretariat</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Seamless Jamabandi token booking, independent witness attestation, and doorstep check for seniors.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Plotted Villas &amp; Floors</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sector 21C Faridabad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Sector 21C Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: NIT FARIDABAD & SAINIK COLONY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Building className="w-3.5 h-3.5" />
                        Shop &amp; Colony Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Badkhal / Sector 12
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in NIT Faridabad &amp; Sainik Colony
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">NIT 1, 2, 3, 4, 5</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sainik Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Neelam Flyover</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">KLJ Complex NIT</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tailored <strong>Will drafting services in NIT Faridabad</strong> and Sainik Colony for shop shop owners, established traders, and home floor owners. Resolves joint family family property ambiguities, ensures clear sole proprietorship and retail enterprise succession, and eliminates split lawsuits.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: SDM Badkhal &amp; Sector 12</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Shop asset inventory, trading firm partner shares, and Book III registration filing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Plotted Floors</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in NIT Faridabad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft NIT Faridabad Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: CHARMWOOD VILLAGE, SURAJKUND & KANT ENCLAVE */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Delhi Border Luxury Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Badkhal
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Charmwood &amp; Surajkund
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Charmwood Village</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Surajkund Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Greenfields Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Eros Garden</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Bespoke <strong>Will drafting services in Charmwood Village</strong> and Surajkund for high-net-worth families, senior retired bureaucrats, and luxury apartment owners. Structures multi-jurisdictional Delhi-Haryana estate plans, bank locker access, and cross-state real estate bequests under the Indian Succession Act.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Badkhal SDM Complex</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Section 31 home visits for elderly residents, private estate inventory, and Jamabandi slot booking.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Luxury Gated Enclaves</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Charmwood Village"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Surajkund Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: MATHURA ROAD & INDUSTRIAL SECTORS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5" />
                        Industrial &amp; MSME Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Faridabad / Ballabgarh
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Mathura Road &amp; Sector 24-58
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 24 &amp; 25 Industrial</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 58 &amp; 59 MSME</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mathura Road Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">14/4 Mathura Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Mathura Road Industrial Area</strong> for factory owners, auto ancillary manufacturers, and engineering firm promoters. Codifies transfer of HSVP/HSIIDC industrial leaseholds, private limited shareholdings, director loans, and machinery to safeguard business continuity.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sector 12 / Ballabgarh Desk</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Industrial asset audit, family business succession planning, and corporate compliance review.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">HSIIDC Leaseholds &amp; Shares</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Mathura Road Industrial Area"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Industrial Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: BALLABGARH & SECTORS 55-65 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Landmark className="w-3.5 h-3.5" />
                        South Faridabad &amp; IMT
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ballabgarh
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ballabgarh &amp; Sector 55-65
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ballabgarh Old City</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 55 &amp; 56 Housing</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 62-65 IMT</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Raja Nahar Singh Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Authoritative <strong>Will drafting services in Ballabgarh</strong> for home plots, Housing Board flats, shop godowns, and family assets near Raja Nahar Singh Palace. Ensures foolproof drafting complying with Haryana Land Revenue Code and Jamabandi registration at Ballabgarh Tehsil.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Tigaon Road, Ballabgarh Tehsil</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Ballabgarh Tehsil registration token, witness management, and municipal name change advisory.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Housing Board &amp; Family</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ballabgarh"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Ballabgarh Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: SECTORS 28, 29, 30 & 31 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Delhi Border &amp; Metro Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Faridabad (Sector 12)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sectors 28, 29, 30 &amp; 31
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 28 Metro</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 29 Plotted</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 30 HUDA</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sector 31 Shop</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Sectors 28 to 31</strong> along the Violet Line Metro corridor and Delhi-Mathura Highway. Codifies independent floor ownership, shop showroom leases, and joint bank accounts, streamlining succession across Haryana urban local bodies and financial institutions.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Sector 12 Mini Secretariat</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast-track Jamabandi registration, digital document vetting, and Section 31 home visit coordination.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Metro Corridor &amp; HUDA Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sector 28 Faridabad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Sector 28 Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: 5-STEP SOP */}
            <section id="step-by-step-faridabad-sop" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP PROCEDURAL PROTOCOL</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  6. 5-Step Process: From Asset Mapping to SRO Registration
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Drafting and registering an enforceable Will in Faridabad follows a structured legal workflow under the Indian Succession Act, 1925 and the Haryana Registration Rules:
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Compile Asset Inventory &amp; HSVP Property IDs
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      List all immovable assets across Faridabad including HSVP plot numbers, builder floor demarcations, Greater Faridabad high-rise apartment units, and MCF Property IDs. Collate movable assets including Demat accounts, fixed deposits, life insurance, and corporate shares. Designate specific heirs and an executor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Professional Lawyer Drafting &amp; Custom Clauses
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our senior succession lawyers draft your Will incorporating vital protective rules: revocation of previous wills, survivorship clauses, minor child testamentary guardian designations, life-interest rights for surviving spouses, and specific residuary bequests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Signing Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print the drafted Will on plain white A4 paper. The Will maker signs or places their thumb impression on each sheet in the physical presence of two adult witnesses. The witnesses, who must hold no beneficial interest in the estate, sign under the attestation clause in each other&apos;s sight.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    04
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Book Jamabandi Haryana e-Appointment Slot
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Log in to the Jamabandi Haryana portal (jamabandi.nic.in) under Deed Registration e-Appointment. Enter the Will maker and witness KYC information, select your jurisdictional Sub-Registrar (Faridabad Sector 12 or Ballabgarh), pay the nominal ₹100 registration fee online, and download the confirmed appointment token.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    05
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Biometric Capture &amp; SRO Book III Registration
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Attend the designated SRO office along with both witnesses. The Sub-Registrar verifies personal identities, captures digital photographs and biometric thumbprints, and verifies free sound mind. The Will is recorded in Book III government custody and returned with an official registration stamp.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 HOME VISIT */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT 1908 SECTION 31</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  7. Home Registration: Section 31 Doorstep Facility
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  For senior citizens, bedridden people, or persons suffering from severe mobility fights in Faridabad, the law provides an official doorstep registration facility under Section 31 of the Registration Act, 1908:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-900 text-sm block">1. Medical Certification</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      An MBBS/MD doctor issues a formal paper attesting that the Will maker is physically unable to travel to the SRO while confirming they are in sound, lucid mental health to execute a Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-900 text-sm block">2. SRO Commission Filing</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      An form is submitted to the Sub-Registrar in Sector 12 or Ballabgarh along with the medical paper, draft Will, and applicable government commission travel fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-900 text-sm block">3. Doorstep Biometric Signing</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar or an authorized registration officer visits the Will maker&apos;s home in Sector 14, 15, 21C, Charmwood Village, or Neharpar with portable biometric equipment to complete registration.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs text-slate-700 leading-relaxed">
                  <strong>WillDrafting Help:</strong> Our legal team manages the end-to-end Section 31 process, drafting the formal commission form, coordinating SRO visit schedules, and preparing doctor fitness papers.
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PREPARATION &amp; SRO VERIFICATION</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  8. Documents Checklist: Interactive Rules Tool
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Use this interactive checklist to prepare all essential records before drafting and registering your Will in Faridabad. Check items as you assemble them:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-800">
                    Documents Prepared: <span className="text-[#C65378] font-extrabold">{checkedCount}</span> of {checklist.length}
                  </span>
                  <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C65378] h-full transition-all duration-300"
                      style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200/80"
                          : "bg-slate-50/50 border-slate-100 hover:border-slate-200"
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
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                          {item.label}
                        </span>
                        <span className="text-xs text-slate-500 leading-relaxed block">
                          {item.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES */}
            <section id="faridabad-property-types" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATION IN FARIDABAD</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  9. Property Types: HSVP Plots, Builder Floors &amp; High-Rises
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Faridabad presents a unique combination of planned government development authority plotted sectors, independent builder floors, multi-story private builder condominiums, and heavy industrial facilities. Each requires tailored testamentary language:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    HSVP Plotted Sectors &amp; Independent Builder Floors
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Independent floors across Sectors 14, 15, 16, 17, and 21C require explicit floor-wise demarcations in the Will. Clearly identify basement rights, ground floor garden entitlements, stilt parking bays, and undivided terrace rights to prevent deadlock between siblings when renovating or selling.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Greater Faridabad (Neharpar) Multi-Story Condominiums
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Apartments across Sectors 75 to 89 require specific recitals referencing the builder-buyer agreement, conveyance deed, assigned apartment number, tower name, covered parking slots, and undivided proportionate land interest under Haryana apartment regulations.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Industrial Units &amp; Manufacturing Plots along Mathura Road
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    MSME factories across Sectors 24, 25, 58, and 59 involve complex assets including HSIIDC/HSVP leasehold deeds, heavy plant machinery, and private corporate shares. Wills must define share transfer under the Companies Act 2013 and partner profit ratios.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Farm Lands &amp; Farmhouses in Tigaon / Dhauj
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farmland and rural farmhouses in the Aravalli foothill belt or Ballabgarh rural revenue circles must be bequeathed with exact Khasra and Khewet numbers from the Haryana Jamabandi land records to make sure straightforward Form 6 name change by the local Patwari.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: FEES & CHARGES */}
            <section id="faridabad-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT EXPENSE BREAKDOWN</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  10. Fees &amp; Charges: Complete Haryana Fee Structure
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Will registration in Haryana is intentionally subsidized to encourage citizens to formalize their succession. Unlike gift deeds or sale conveyances, registering a Will incurs zero percentage-based stamp duty:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-600 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 font-semibold text-slate-900">
                        <th className="py-3 px-4">Component</th>
                        <th className="py-3 px-4">Haryana Legal Rate</th>
                        <th className="py-3 px-4">Notes &amp; Guidelines</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800">Stamp Duty on Will</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                        <td className="py-3 px-4">No ad-valorem stamp duty payable regardless of property market value</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800">SRO Registration Fee</td>
                        <td className="py-3 px-4 font-bold text-slate-800">₹100 (Flat Fee)</td>
                        <td className="py-3 px-4">Remitted through Jamabandi Haryana portal online payment gateway</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800">Computerized Service &amp; Pasting Fee</td>
                        <td className="py-3 px-4 font-bold text-slate-800">₹100 – ₹200</td>
                        <td className="py-3 px-4">Nominal departmental processing and document scanning charges at SRO</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800">Section 31 Home Visit Commission</td>
                        <td className="py-3 px-4 font-bold text-slate-800">₹500 – ₹1,000</td>
                        <td className="py-3 px-4">Applicable when Sub-Registrar visits Will maker residence for doorstep biometric signing</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800">Court Probate Savings</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Saves ₹1,00,000 – ₹3,00,000+</td>
                        <td className="py-3 px-4">Because probate is optional in Haryana, families save hefty civil court fees and lawyer court fights costs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL SERVICES</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  11. Plans &amp; Pricing: Transparent Legal Help Tiers
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Choose the level of legal support tailored to your family&apos;s estate size and registration preferences in Faridabad:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TIER 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Essential</span>
                    <h3 className="text-lg font-extrabold text-slate-900">Online Lawyer-Drafted Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500 font-medium">all-inclusive</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for people seeking a legally watertight Will drafted by an experienced succession lawyer.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>High Court Lawyer Vetted</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>HSVP &amp; Builder Floor Clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Delivered in 24-48 Hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Signing &amp; Witness Guidelines</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors"
                  >
                    Select Essential
                  </a>
                </div>

                {/* TIER 2 (FEATURED) */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 shadow-md flex flex-col justify-between space-y-6 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C65378] text-white text-[10px] font-bold uppercase rounded-full tracking-wider shadow-xs">
                    MOST POPULAR
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">Full</span>
                    <h3 className="text-lg font-extrabold text-slate-900">Lawyer Talk &amp; Review</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹4,990</span>
                      <span className="text-xs text-slate-500 font-medium">all-inclusive</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recommended for complex family estates with multiple HSVP plots, Greater Faridabad high-rises, or industrial units.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Lawyer Talk</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Multi-Property &amp; Business Succession</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Doctor Fitness Certificate Format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Jamabandi Token Booking Guidance</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors shadow-sm"
                  >
                    Select Full
                  </a>
                </div>

                {/* TIER 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Premium Doorstep</span>
                    <h3 className="text-lg font-extrabold text-slate-900">End-to-End SRO Registration</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500 font-medium">all-inclusive</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Full turnkey support with lawyer physical accompaniment at Faridabad SRO or Section 31 home visit coordination.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Complete Lawyer Drafting &amp; Review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Jamabandi Slot Booking &amp; Fee Payment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer Physical Presence at Sector 12 / Ballabgarh SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 Doorstep Home Visit Option</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors"
                  >
                    Select Premium
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUERIES RESOLVED</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  12. FAQ: Frequently Asked Questions in Faridabad
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Detailed legal answers to frequent questions regarding Will making, HSVP plot transfer, MCF name change, and SRO registration in Faridabad:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY REFERENCES */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>AUTHORITATIVE STATUTES &amp; RULINGS</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  13. Legal Refs: Acts, Sections &amp; Judicial Precedents
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  Every legal principle and procedural guideline on this page is anchored in codified Indian and Haryana state enactments:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">Indian Succession Act, 1925</span>
                  <span className="text-slate-600 block leading-relaxed">
                    Sections 59 (sound mind), 63 (signing &amp; attestation), 67 (witness voiding), 213 (probate applicability limited to presidency towns), and 218 (management).
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">Registration Act, 1908</span>
                  <span className="text-slate-600 block leading-relaxed">
                    Sections 18(e) (optional registration of Wills), 31 (doorstep commission visits for sick/infirm testators), 32 (persons to present documents), and Book III (permanent Will registry archives).
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">Haryana Shehri Vikas Pradhikaran Act, 1977</span>
                  <span className="text-slate-600 block leading-relaxed">
                    HSVP plot allotment, transfer regulations, and death-case property substitution guidelines for plotted sectors and independent floors.
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">Punjab &amp; Haryana High Court Jurisprudence</span>
                  <span className="text-slate-600 block leading-relaxed">
                    Landmark decisions confirming that getting probate is non-needed in Haryana for Hindus, Sikhs, Jains, Buddhists, and Christians, permitting direct revenue name change.
                  </span>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH RESOLUTION IMAGE MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#172228] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                Faridabad Will Drafting &amp; Property Succession Visual Guide
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="text-white/70 hover:text-white text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] bg-[#172228]">
              <Image
                src="/images/will-drafting-in-faridabad.jpg"
                alt="Legal Will Drafting and Property Succession in Faridabad Haryana NCR"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
