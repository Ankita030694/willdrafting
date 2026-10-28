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
  Anchor,
  Compass,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "visakhapatnam-overview", label: "OVERVIEW" },
  { id: "visakhapatnam-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "visakhapatnam-probate-rules", label: "PROBATE RULES" },
  { id: "vmrda-gvmc-mutation", label: "VMRDA & GVMC MUTATION" },
  { id: "visakhapatnam-sro-directory", label: "SRO DIRECTORY" },
  { id: "visakhapatnam-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-ap-igrs-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "visakhapatnam-property-types", label: "PROPERTY TYPES" },
  { id: "ap-igrs-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const VISAKHAPATNAM_SROS = [
  {
    id: "dwarakanagar",
    name: "Visakhapatnam (Dwarakanagar)",
    sro: "SRO Visakhapatnam (Central)",
    address: "District Registrar Office Complex, Opp. RTC Complex, Dwarakanagar, Visakhapatnam - 530016",
    areas: "Dwarakanagar, Asilmetta, Siripuram, Waltair Uplands, VIP Road, Ramnagar, Daba Gardens, Jagadamba Junction, Maharani Peta",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "madhurawada",
    name: "Madhurawada",
    sro: "SRO Madhurawada",
    address: "Car Shed Junction, Near National Highway 16, Madhurawada, Visakhapatnam - 530041",
    areas: "Madhurawada, Rushikonda, IT SEZ, PM Palem, Kommadi, Marikavalasa, Midhilapuri VMRDA Colony, Yendada",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "gopalapatnam",
    name: "Gopalapatnam",
    sro: "SRO Gopalapatnam",
    address: "Main Road, Near NAD Kotha Road Junction, Gopalapatnam, Visakhapatnam - 530027",
    areas: "Gopalapatnam, NAD Junction, Simhachalam, Vepagunta, Marripalem, Kancharapalem, NSTL Complex, Prahaladapuram",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "pendurthi",
    name: "Pendurthi",
    sro: "SRO Pendurthi",
    address: "Railway Station Road, Near Mandal Revenue Office, Pendurthi, Visakhapatnam - 531173",
    areas: "Pendurthi, Sujatha Nagar, Chintagatla, Chinamushidiwada, Sabbavaram Road, Pinegrove layouts, Bakkannapalem",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "gajuwaka",
    name: "Gajuwaka",
    sro: "SRO Gajuwaka",
    address: "High School Road, Near Old Gajuwaka Junction, Gajuwaka, Visakhapatnam - 530026",
    areas: "Gajuwaka, Old Gajuwaka, New Gajuwaka, Auto Nagar, Kanithi, Srinagar, Vadlapudi, Tunglam",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "pedagantyada",
    name: "Pedagantyada",
    sro: "SRO Pedagantyada",
    address: "BC Road, Pedagantyada, Near Steel Plant Sector Belts, Visakhapatnam - 530044",
    areas: "Pedagantyada, Kurmannapalem, Ukkunagaram (Steel Plant Township), Duvvada, Desapatrunipalem, Gangavaram Port Belt",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "anandapuram",
    name: "Anandapuram",
    sro: "SRO Anandapuram",
    address: "Near MRO Office, Anandapuram Junction, Visakhapatnam - 530052",
    areas: "Anandapuram, Tagarapuvalasa, Gambheeram (IIM Vizag area), Vellanki, Sontyam, Boyapalem",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
  {
    id: "bheemunipatnam",
    name: "Bheemunipatnam (Bheemili)",
    sro: "SRO Bheemunipatnam",
    address: "Beach Road, Opp. Taluk Office, Bheemunipatnam, Visakhapatnam - 531163",
    areas: "Bheemili, Nerellavalasa, Chepaluppada, Beach Road coastal belt, Kapuluppada, INS Kalinga surroundings",
    timings: "10:00 AM to 5:30 PM (Mon-Fri, 2nd & 4th Sat closed)",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "item-1",
    title: "Aadhaar Card and PAN of Testator",
    desc: "Primary government identity proof showing full legal name, date of birth, and permanent Visakhapatnam residence address.",
  },
  {
    id: "item-2",
    title: "VMRDA Allotment Letters & GVMC Property Tax Receipts",
    desc: "VMRDA plot allotment orders, GVMC property tax assessment receipts, sale deeds, or apartment link documents in Vizag.",
  },
  {
    id: "item-3",
    title: "Naval, Defense Pension & Financial Asset Records",
    desc: "Eastern Naval Command pension books, AWHO or AFNHB society allotment certificates, bank account statements, and demat holding sheets.",
  },
  {
    id: "item-4",
    title: "Details of Two Non-Beneficiary Witnesses",
    desc: "Names, permanent addresses, phone numbers, and Aadhaar cards of two adult witnesses who will not receive any property under the Will.",
  },
  {
    id: "item-5",
    title: "MBBS Doctor Fitness Certificate (For Seniors)",
    desc: "Medical fitness certificate from a registered physician verifying mental soundness and lucid testamentary disposing capacity.",
  },
  {
    id: "item-6",
    title: "Executor and Guardian Appointment Details",
    desc: "Identity and contact details of a trustworthy executor to administer the estate, and guardian for minor beneficiaries.",
  },
];

export default function VisakhapatnamLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("visakhapatnam-overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklist, setChecklist] = useState(
    CHECKLIST_ITEMS.map((item) => ({ ...item, checked: false }))
  );
  const [selectedSro, setSelectedSro] = useState<string>("dwarakanagar");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  useEffect(() => {
    const targets = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

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

  const filteredSros = VISAKHAPATNAM_SROS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeSroData =
    VISAKHAPATNAM_SROS.find((d) => d.id === selectedSro) || VISAKHAPATNAM_SROS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI STYLE ARCHITECTURE)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* LEFT COLUMN: HERO VALUE PROP & CTAs (7 COLS) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs text-xs font-semibold text-rose-200">
                <Anchor className="w-3.5 h-3.5 text-[#C65378]" />
                <span>VISAKHAPATNAM METROPOLITAN ESTATE &amp; SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 58 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Visakhapatnam: Online Legal Help
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect family home assets, VMRDA plots, port shop assets, and Eastern Naval Command retirement estates across Visakhapatnam.
                Get experienced lawyer drafting, AP IGRS slot booking, and Section 31 doorstep home visits for senior testators.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Visakhapatnam Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#visakhapatnam-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Visakhapatnam SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Senior Lawyer Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 AP Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Non-Needed Probate</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - GUARANTEED FULLY VISIBLE IN MOBILE & DESKTOP */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-visakhapatnam.jpg"
                  alt="Will Drafting in Visakhapatnam Online Legal Guide"
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
                8+ SRO Hubs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Visakhapatnam District
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
                Optional Probate
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
                Home Visit for Seniors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: FLOATING / STICKY SELECTOR BAR FOR TABLE OF CONTENTS
          ========================================================================= */}
      <div className="block lg:hidden sticky top-0 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 shadow-2xs">
        <div className="relative max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setMobileTocOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs text-left"
          >
            <div className="flex items-center gap-2 overflow-hidden">
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
              DESKTOP VIEW: STICKY TABLE OF CONTENTS
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
            <section id="visakhapatnam-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>VISAKHAPATNAM SUCCESSION BRIEF</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Visakhapatnam
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Needed</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visakhapatnam is a non-presidency town governed under Andhra Pradesh High Court. Under Section 213 of the Indian Succession Act, court probate is strictly optional.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Naval &amp; Coastal Asset Planning</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Vizag houses Eastern Naval Command veterans and port logistics operators. Clear Wills protect service pensions, housing scheme flats, and industrial assets.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Andhra Pradesh Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills attract ₹0 stamp duty in Andhra Pradesh. AP IGRS registration costs a flat legal fee of ₹1,000 plus nominal user charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>VMRDA &amp; GVMC Property Name Change</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will facilitates swift plot transfer at VMRDA and direct property tax name name change across Greater Visakhapatnam Municipal Corporation wards.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="visakhapatnam-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Visakhapatnam
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Making a Will in Visakhapatnam follows the <strong>Indian Succession Act, 1925</strong> and the <strong>Registration Act, 1908</strong>.
                  Any adult of sound mind can make a Will. It lets you pass on flats, plots, bank deposits, and shares to the people you choose.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visakhapatnam is a major port and industrial city. Many families own flats in MVP Colony, plots in Madhurawada, or shops in Gajuwaka.
                  A clear Will helps your family inherit these assets smoothly and avoids fights among relatives.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker must be an adult of sound mind capable of understanding asset split (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Signed voluntarily without undue influence, coercion, family tension, or misrepresentation (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the physical presence of at least two independent adult witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    100%
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Revocable Deed</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Will can be amended, altered, or completely revoked by the Will maker anytime during their lifetime (Section 62).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT PROVISIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Needed in Andhra Pradesh?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 18(e) of the Registration Act, 1908</strong>, registering a Will is optional in Andhra Pradesh.
                  An unregistered Will written on plain paper and signed before two witnesses is legally valid.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, registering your Will at the Visakhapatnam SRO office gives strong legal proof.
                  The office records your thumbprint, photo, and identity in Book III. This protects the Will from false fights.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-base text-emerald-950">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span>Registered Will (AP IGRS Book III)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-emerald-900">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Presumption of genuine signing before a public officer under Section 114 of Evidence Act.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Certified copy easily retrievable from AP IGRS portal if original copy is misplaced.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Accepted right away by GVMC, VMRDA, and nationalized banks without requiring a succession paper.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-base text-amber-950">
                    <AlertTriangle className="w-5 h-5 text-amber-700" />
                    <span>Unregistered Will Risks</span>
                  </div>
                  <ul className="space-y-2 text-xs text-amber-900">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Vulnerable to false allegations of forgery, undue influence, or mental incapacity by disgruntled relatives.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>No official government backup if the single physical original copy is lost, damaged, or hidden.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Banks and municipal offices may demand extensive court declarations or indemnity bonds before releasing assets.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="visakhapatnam-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PRECEDENT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Visakhapatnam Probate Rules: Non-Presidency Exemption
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 213 of the Indian Succession Act, 1925</strong>, court probate is needed only in Mumbai, Kolkata, and Chennai.
                  Probate is a court order that certifies a Will is genuine.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visakhapatnam is outside these old presidency towns. The Supreme Court of India in <em>Clarence Pais v. Union of India</em> confirmed that probate is optional in Andhra Pradesh.
                  Your family can transfer house titles, land, and bank funds directly using a registered Will.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900">
                  Practical Impact for Vizag Property Owners
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <span className="font-bold text-slate-900 block text-sm">No High Court Delay</span>
                    <p className="text-slate-600 leading-relaxed">
                      Probate proceedings in civil courts can take 2 to 4 years. In Visakhapatnam, heirs can mutate titles right away without court probate.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <span className="font-bold text-slate-900 block text-sm">Save High Court Fees</span>
                    <p className="text-slate-600 leading-relaxed">
                      Probate in presidency towns incurs heavy court price check fees of up to 3% to 5%. Vizag residents save this entire court fee expenditure.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <span className="font-bold text-slate-900 block text-sm">Direct Bank Transfer</span>
                    <p className="text-slate-600 leading-relaxed">
                      Banks and mutual fund depositories in Vizag accept registered Wills with death papers for direct transfer without probate decrees.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: VMRDA & GVMC MUTATION */}
            <section id="vmrda-gvmc-name change" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>URBAN REVENUE MUTATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. VMRDA Plots &amp; GVMC Property Name Change by Will
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  In Visakhapatnam, property records are updated by two main bodies:
                  the <strong>VMRDA</strong> for planned layouts, and the <strong>GVMC</strong> for city property tax records.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-base text-slate-900">
                    <Landmark className="w-5 h-5 text-[#C65378]" />
                    <span>VMRDA Layout Plot Succession</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    VMRDA develops and regulates home layouts across Madhurawada, Rushikonda, Pendurthi, and Anandapuram. When an allottee passes away:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Submit registered Will and certified death paper to VMRDA.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Provide legal heir paper or family member paper from Tahsildar.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>VMRDA issues formal re-allotment and ownership transfer proceedings.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-base text-slate-900">
                    <Home className="w-5 h-5 text-[#5F7E75]" />
                    <span>GVMC Property Tax Name Name Change</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    GVMC manages 98 municipal wards divided into 8 office zones. For apartments and houses in MVP Colony, Seethammadhara, or Gajuwaka:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Apply online via Ward Secretariat (Ward Sachivalayam) portal.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Attach registered Will copy, prior tax receipts, and death paper.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ward Revenue Secretary verifies files and updates GVMC property tax records.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 5: SRO DIRECTORY */}
            <section id="visakhapatnam-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION OFFICES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Visakhapatnam Sub-Registrar Directory: SRO Hubs
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under the Registration and Stamps Department of Andhra Pradesh (AP IGRS), Visakhapatnam district has designated Sub-Registrar Offices.
                  Search or select an SRO below to inspect its operational address, area, and official timings:
                </p>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by SRO name or locality (e.g. Madhurawada, Gajuwaka)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#C65378] shadow-2xs"
                />
              </div>

              {/* SRO QUICK SELECTOR PILLS */}
              <div className="flex flex-wrap gap-2">
                {filteredSros.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSro(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedSro === item.id
                        ? "bg-[#172228] text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* ACTIVE SRO CARD */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 md:p-8 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Selected Registration Hub
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {activeSroData.sro}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold self-start sm:self-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    AP IGRS Active Office
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Physical Address
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {activeSroData.address}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Key Areas Covered
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {activeSroData.areas}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Public Office Timings
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {activeSroData.timings}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: LOCALITY COVERAGE */}
            <section id="visakhapatnam-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Compass className="w-4 h-4 text-[#C65378]" />
                  <span>CITY-WIDE REACH</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Locality Coverage: MVP Colony, Gajuwaka &amp; Beyond
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our online Will drafting platform and senior lawyer help cater to all prime home, defense, and shop sectors across the Greater Visakhapatnam region:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AREA 1: MVP COLONY & SEETHAMMADHARA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Naval Core &amp; Home
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Dwarakanagar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in MVP Colony &amp; Seethammadhara
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">MVP Colony (Sectors 1 to 12)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Seethammadhara &amp; HB Colony</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Lawsons Bay &amp; Beach Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Waltair Uplands &amp; Siripuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">AWHO Defense Housing Societies</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Specialized <strong>Will drafting services in MVP Colony</strong> and Seethammadhara for defense veterans, retired naval officers, and senior civil servants. Tailored for independent duplex houses, AWHO/AFNHB defense apartments, and smooth GVMC property tax name change without requiring civil court probate decrees.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: District Registrar Office, Dwarakanagar</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        AP IGRS Book III registration, lawyer attendance at Dwarakanagar SRO, and Section 31 doorstep visits for elderly naval veterans.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Naval &amp; Freehold Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in MVP Colony"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft MVP Colony Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: MADHURAWADA & RUSHIKONDA IT CORRIDOR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North Coastal &amp; IT Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Madhurawada
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Madhurawada &amp; Rushikonda
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Madhurawada (Midhilapuri VMRDA)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rushikonda &amp; Cyber Valley IT SEZ</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">PM Palem &amp; Cricket Stadium Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kommadi &amp; Marikavalasa</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Yendada &amp; Sagar Nagar Coastal</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dedicated <strong>Will drafting services in Madhurawada</strong> and Rushikonda for tech entrepreneurs, NRI investors, and gated community villa owners. Protects VMRDA layout plots, sea-facing luxury apartments, startup equity shares, and mutual fund portfolios with clear executor powers.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Car Shed Junction, Madhurawada</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Fast-track AP IGRS slot scheduling, VMRDA plot title transfer clauses, and remote online drafting coordination for overseas Non-Resident Indians.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">VMRDA Plotted &amp; IT High-Rises</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Madhurawada"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Madhurawada Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: GAJUWAKA & AUTO NAGAR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Industrial Core &amp; Port
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gajuwaka
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gajuwaka &amp; Auto Nagar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Old Gajuwaka &amp; High School Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">New Gajuwaka &amp; Srinagar</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Auto Nagar Industrial Complex</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kanithi &amp; Vadlapudi Railway Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tunglam &amp; Shop Corridors</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Gajuwaka</strong> and Auto Nagar for MSME manufacturing unit owners, shop fleet operators, and logistics contractors. Guarantees smooth transfer of shop sheds, APIIC plots, partnership shares, and equipment without business interruption.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: High School Road, Gajuwaka</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Lawyer help at Gajuwaka SRO, business succession clauses for partnership firms, and multi-heir capital allocation protocols.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">MSME &amp; Industrial Succession</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gajuwaka"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gajuwaka Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: KURMANNAPALEM & UKKUNAGARAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Steel Plant &amp; Duvvada Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Pedagantyada
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Kurmannapalem &amp; Ukkunagaram
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ukkunagaram (Vizag Steel Plant)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kurmannapalem Junction &amp; NH-16</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Duvvada (Railway Hub &amp; VSEZ)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pedagantyada &amp; BC Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gangavaram Port Marine Belt</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Professional <strong>Will drafting services in Kurmannapalem</strong> and Ukkunagaram for RINL steel plant retirees, Duvvada VSEZ executives, and port logistics personnel. Covers housing colony homes, terminal pension gratuity nominations, and private port transport assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Pedagantyada BC Road SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Doorstep home visits for steel plant pensioners, CFMS fee challan processing, and Ward Sachivalayam name change support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Steel Plant Retiree Succession</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Kurmannapalem"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Kurmannapalem Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: GOPALAPATNAM & NAD KOTHA ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Transit Hub &amp; Simhachalam
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Gopalapatnam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Gopalapatnam &amp; NAD Junction
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gopalapatnam Main Road &amp; Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">NAD Kotha Road &amp; Airport Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Simhachalam &amp; Prahaladapuram</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vepagunta &amp; Marripalem</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kancharapalem &amp; NSTL Complex</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Reliable <strong>Will drafting services in Gopalapatnam</strong> and NAD Junction for multi-generation family homes, airport corridor shop shops, and NSTL defense research personnel. Preempts split lawsuits among joint family coparceners and secures undisputed title.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Main Road, Gopalapatnam</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete SRO token booking, senior citizen medical sanity check, and GVMC zone-wise property tax record transfer.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Shop &amp; Joint Family Homes</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Gopalapatnam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Gopalapatnam Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: PENDURTHI, ANANDAPURAM & BHEEMILI */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Suburban &amp; Heritage Coast
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Pendurthi &amp; Bheemili
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Pendurthi &amp; Bheemili
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pendurthi &amp; Sujatha Nagar Layouts</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bheemunipatnam (Bheemili Coastal)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anandapuram Junction &amp; Highway</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gambheeram (IIM Knowledge Hub)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chinamushidiwada &amp; Sabbavaram</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strategic <strong>Will drafting services in Pendurthi</strong> and Bheemili for farmhouses, family land parcels, highway shop plots, and historic coastal real estate. Formulated with clear boundary schedules and revenue survey numbers for smooth Pattadar Passbook succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Pendurthi / Bheemili SRO Offices</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Farmland demarcation under AP Land Revenue rules, family property split clarity, and Book III deed papers.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Farm &amp; Coastal Parcels</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Pendurthi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Pendurthi Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-ap-igrs-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP PROTOCOL</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Step-by-Step AP IGRS Will Registration Protocol
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will in Visakhapatnam is done via the AP IGRS portal (<code>registration.ap.gov.in</code>).
                  Here are the 5 easy steps to register your Will:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col md:flex-row gap-5 items-start shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Draft the Will with Clear Legal Clauses
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Prepare your Will using our online legal platform or consult with our senior estate lawyers.
                      Ensure full enumeration of all land and flats (VMRDA plots, GVMC houses) and movable assets (defense pensions, bank accounts, demat portfolios), with precise revocable declarations and executor appointments.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col md:flex-row gap-5 items-start shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Sign Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print the Will on clean A4 paper. The Will maker signs every page in the physical presence of two independent adult witnesses.
                      Witnesses must not be heirs receiving assets under the Will. For elderly or medically frail testators, attach a medical fitness paper from an MBBS doctor.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col md:flex-row gap-5 items-start shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Book SRO Appointment on AP IGRS Portal
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Log in to <code>registration.ap.gov.in</code>. Navigate to Public Data Entry and Book III (Will).
                      Enter Will maker and witness details, choose your local Visakhapatnam SRO (e.g. Dwarakanagar or Madhurawada), generate the CFMS challan for the ₹1,000 legal fee, and download your confirmed appointment slot slip.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col md:flex-row gap-5 items-start shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Attend SRO for Biometric Check
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      On the appointment date, the Will maker and both witnesses appear before the Sub-Registrar.
                      The SRO officer conducts biometric thumb scanning, digital photograph capture, and verifies original Aadhaar cards. Our local lawyer physically accompanies you to facilitate quick token processing.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col md:flex-row gap-5 items-start shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Official Registration in Book III Registry
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar enters the Will into the confidential Book III register. The registered deed is stamped with a unique document number, scanned into the AP IGRS central database, and handed over to the Will maker or retained as an official sealed deposit.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: SECTION 31 HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP CONVENIENCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Section 31 Doorstep Registration for Seniors
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar can visit your home or hospital bed.
                  This service helps senior citizens and unwell people who cannot travel to the registration office.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900">
                  How Home Visit Registration Operates in Visakhapatnam
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <span className="font-bold text-slate-900 block text-sm">Doctor Certificate</span>
                    <p className="text-slate-600 leading-relaxed">
                      An MBBS registered doctor must issue a formal paper confirming that the Will maker is medically unable to travel but is in a lucid, sound mental disposing state.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <span className="font-bold text-slate-900 block text-sm">SRO Commission Form</span>
                    <p className="text-slate-600 leading-relaxed">
                      A formal Section 31 requisition letter is submitted to the jurisdictional Visakhapatnam Sub-Registrar along with the prescribed government commission travel fee.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <span className="font-bold text-slate-900 block text-sm">Doorstep Biometrics</span>
                    <p className="text-slate-600 leading-relaxed">
                      The Sub-Registrar visits the residence in MVP Colony, Seethammadhara, or Gajuwaka with portable biometric equipment to capture fingerprints and complete registration.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>PREPARATION TOOL</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Documents Checklist for Visakhapatnam Will
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Use this interactive checklist to confirm you have assembled all required paperwork before signing your Will or visiting the Visakhapatnam SRO office:
                </p>
              </div>

              {/* INTERACTIVE CHECKLIST */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Interactive Readiness Checklist
                  </span>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-rose-50 text-[#C65378]">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/50 border-[#C65378]/30 shadow-2xs"
                          : "bg-slate-50/60 border-slate-200/80 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                          item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: PROPERTY TYPES */}
            <section id="visakhapatnam-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Vizag Property Types: Port, Naval &amp; Urban Estates
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visakhapatnam&apos;s diverse economic landscape includes home developments, defense housing societies, shop logistics setups, and industrial manufacturing units:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                    <Anchor className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Defense &amp; Naval Housing</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    AWHO and AFNHB home societies, naval cooperative flats, and defense pension benefits across MVP Colony and Lawsons Bay.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Landmark className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">VMRDA Approved Plots</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Freehold and leasehold home layout plots across Madhurawada, Rushikonda, Pendurthi, and Anandapuram corridors.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    <Building className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Port &amp; Logistics Assets</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Shop godowns, container freight logistics shares, and transport fleet assets connected with Visakhapatnam Port and Gangavaram.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                    <Home className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">GVMC Home Homes</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Independent houses and multi-storey apartments in Waltair Uplands, Seethammadhara, Siripuram, and Dwarakanagar.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                    <Scale className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Industrial &amp; Auto Nagar Units</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    MSME engineering sheds, APIIC industrial plots, partnership shares, and fabrication workshops in Auto Nagar and Parawada.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
                    ₹
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Bank Deposits &amp; Demat Portfolios</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Nationalized bank fixed deposits, mutual funds, demat equity portfolios, PPF accounts, and locker operation instructions.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: FEES & CHARGES */}
            <section id="ap-igrs-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CHARGES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. AP IGRS Registration Fees &amp; Stamp Duty Exemption
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds, signing a Will does not require payment of ad-valorem stamp duty in Andhra Pradesh.
                  Here is the official breakdown of fees payable for Will registration in Visakhapatnam:
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
                      <td className="p-4 font-semibold">Andhra Pradesh Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Registration &amp; Stamps Dept AP</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">AP IGRS SRO Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹1,000 (Flat Legal Fee)</td>
                      <td className="p-4">SRO office Book III Account</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer User &amp; Scanning Charges</td>
                      <td className="p-4 font-bold">₹100 – ₹200</td>
                      <td className="p-4">SRO Data Processing Counter</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Home Visit Commission Fee</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Doorstep Government Requisition (CFMS)</td>
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
                  <span>PLANS &amp; PRICING</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Transparent Will Packages &amp; Senior Lawyer Review
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the level of legal support tailored to your family&apos;s estate planning needs in Visakhapatnam:
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
                      Ideal for people with home assets, bank savings, and demat accounts.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Visakhapatnam Will maker</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted legal clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant PDF download &amp; witnessing SOP</span>
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
                    Most Popular in Visakhapatnam
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
                      Senior estate lawyer review for naval veterans, VMRDA plots, port shop assets, and multiple heirs.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1-on-1 talk with senior counsel</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom clauses for business &amp; minor heirs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Executor advisory &amp; witness vetting</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full py-3 rounded-xl bg-[#C65378] text-white text-xs font-bold text-center hover:bg-[#a13c5d] transition-colors cursor-pointer"
                  >
                    Book Lawyer Call
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
                      Full end-to-end registration help at any of Visakhapatnam&apos;s Sub-Registrar offices.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>AP IGRS online appointment slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lawyer physically attends SRO counter</span>
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
                  13. Frequently Asked Questions: Visakhapatnam Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Authoritative legal answers to common questions about signing and registering a Will in Visakhapatnam:
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
                  14. Legal References &amp; Andhra Pradesh Rules
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Our Will drafting protocols comply strictly with central succession statutes and Andhra Pradesh government regulations:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Indian Succession Act 1925
                  </span>
                  <p className="text-xs text-slate-600">
                    Sections 59, 62, 63, and Section 213 (Non-Presidency Town Probate Exemption).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Registration Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional Registration) and Section 31 (Doorstep Home Commission).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    AP IGRS Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Registration &amp; Stamps Dept, Government of Andhra Pradesh: <code>registration.ap.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Andhra High Court Precedents
                  </span>
                  <p className="text-xs text-slate-600">
                    <em>Clarence Pais v. Union of India</em> &amp; AP High Court rulings on non-needed probate.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Visakhapatnam Assets &amp; Family Legacy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your VMRDA plots, GVMC apartments, or naval retirement savings to bitter court fights.
                Draft a legally valid Will in minutes or consult our senior estate lawyers.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all cursor-pointer shadow-lg shadow-[#C65378]/25"
                >
                  Start Your Will Online (₹1,990)
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20"
                >
                  Consult Senior Lawyer
                </Link>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION MODAL LIGHTBOX (GUARANTEED FULL VISIBILITY)
          ========================================================================= */}
      {showHighResModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#172228] rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-white/20 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs sm:text-sm font-bold text-white">
                Visual Blueprint: Visakhapatnam Will Drafting &amp; Asset Protection
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40">
              <Image
                src="/images/will-drafting-in-visakhapatnam.jpg"
                alt="High Resolution Visual Blueprint: Visakhapatnam Will Drafting and Asset Protection"
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
