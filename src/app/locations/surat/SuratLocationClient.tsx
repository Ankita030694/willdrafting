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
  Gem,
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
  { id: "surat-overview", label: "OVERVIEW" },
  { id: "surat-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "surat-probate-rules", label: "PROBATE RULES" },
  { id: "surat-sro-directory", label: "SRO DIRECTORY" },
  { id: "surat-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-surat-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "surat-property-types", label: "ASSET TYPES" },
  { id: "surat-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const SURAT_DISTRICTS = [
  {
    id: "athwa",
    name: "Athwa / VIP Road",
    sro: "SRO Surat City (Athwa Zone)",
    address: "Old Collector Office Compound, Bahumali Bhavan, Athwalines, Surat - 395001",
    areas: "Athwalines, VIP Road, Vesu, Piplod, City Light, Ghod Dod Road, Dumas Road, Parle Point",
    timings: "10:30 AM to 6:10 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "katargam",
    name: "Katargam (Diamond Hub)",
    sro: "SRO Surat City (Katargam Zone)",
    address: "Zonal Revenue Complex, Katargam Main Road, Surat - 395004",
    areas: "Katargam, Gotalawadi, Fulpada, Singanpore, Ved Road, Amroli, Kosad",
    timings: "10:30 AM to 6:10 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "varachha",
    name: "Varachha (Bourse Nexus)",
    sro: "SRO Surat City (Varachha Zone)",
    address: "Mini Bazar Administrative Complex, Varachha Main Road, Surat - 395006",
    areas: "Varachha, Mini Bazar, Hirabaug, Sarthana, Matawadi, Nana Varachha, Mota Varachha, Simada",
    timings: "10:30 AM to 6:10 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "majura",
    name: "Majura & Ring Road",
    sro: "SRO Surat City (Majura Zone)",
    address: "Bahumali Bhavan, Near Majura Gate, Khatodara, Surat - 395002",
    areas: "Majura Gate, Ring Road Textile Market, Khatodara GIDC, Althan, Bhimrad, Bhatar",
    timings: "10:30 AM to 6:10 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "rander",
    name: "Rander & Adajan",
    sro: "SRO Surat City (Rander Zone)",
    address: "Rander Road, Near Navyug College, Rander / Adajan, Surat - 395009",
    areas: "Adajan, Pal, Jahangirpura, Rander, Anand Mahal Road, Gaurav Path, LP Savani Road",
    timings: "10:30 AM to 6:10 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "udhna",
    name: "Udhna & Pandesara",
    sro: "SRO Surat City (Udhna Zone)",
    address: "Udhna Main Road, Near Udhna Railway Station, Udhna, Surat - 395021",
    areas: "Udhna, Pandesara GIDC, Bamroli, Bhestan, Dindoli, Godadara, Limbayat",
    timings: "10:30 AM to 6:10 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "choryasi",
    name: "Choryasi & Sachin GIDC",
    sro: "SRO Surat Rural / Choryasi (Sachin)",
    address: "Choryasi Taluka Seva Sadan, Jilani Complex, Nanpura / Sachin, Surat",
    areas: "Sachin GIDC, Hazira Industrial Belt, Magdalla, Khajod (Surat Diamond Bourse - SDB / DREAM City), Dumas",
    timings: "10:30 AM to 6:10 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "kamrej",
    name: "Kamrej & Palsana",
    sro: "SRO Kamrej & Palsana Taluka",
    address: "Taluka Seva Sadan, Kamrej Char Rasta & Palsana Highway Hub, Surat District",
    areas: "Kamrej, Pasodara, Palsana Textile Industrial Belt, Valak, Laskana, Kadodara",
    timings: "10:30 AM to 6:10 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Original Will Document",
    detail: "Printed neatly on standard A4 paper with precise commercial bequests and two witness signature blocks.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Testator Identity Proof",
    detail: "Original Aadhaar Card and PAN card containing accurate date of birth and residential address.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Witnesses",
    detail: "Two adult witnesses with original Aadhaar cards who are not beneficiaries or family inheritors under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "MBBS Doctor Fitness Certificate",
    detail: "Medical certificate certifying testamentary capacity and sound mind, strongly recommended for seniors aged 60+.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Garvi Gujarat Appointment Receipt",
    detail: "Official e-appointment receipt with pre-paid ₹100 registration fee booked on garvi.gujarat.gov.in.",
    checked: false,
  },
  {
    id: "item-6",
    label: "SMC Property Tax / City Survey Card",
    detail: "Latest Surat Municipal Corporation (SMC) tax bill, Index II, or 7/12 land extract from AnyRoR Gujarat.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Diamond / Textile Business Records",
    detail: "Partnership deeds, GST certificates, GIDC allotment papers, or private limited company share certificates.",
    checked: false,
  },
  {
    id: "item-8",
    label: "Passport-Sized Color Photos",
    detail: "Four recent color passport photographs of the testator and two attesting witnesses.",
    checked: false,
  },
];

export default function SuratLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("surat-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("athwa");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [searchFilter, setSearchFilter] = useState<string>("" );
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

  const filteredDistricts = SURAT_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    SURAT_DISTRICTS.find((d) => d.id === selectedDistrict) || SURAT_DISTRICTS[0];

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
                <span>SURAT COMMERCIAL ESTATE &amp; SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 54 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Surat: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your diamond trading shares, textile business assets, GIDC industrial plots, and SMC residential properties.
                Get expert lawyer drafting, Garvi Gujarat SRO appointment guidance, and Section 31 doorstep execution across Surat.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Surat Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#surat-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Surat SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Gujarat Stamp Duty</span>
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
                  src="/images/will-drafting-in-surat.jpg"
                  alt="Online Will Drafting and Commercial Asset Planning in Surat"
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
                8+ SRO Zones
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Surat City &amp; Industrial Belts
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
                Non-Presidency Town Rules
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep SRO Visits for Seniors
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
            <section id="surat-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>SURAT COMMERCIAL SUCCESSION BRIEF</span>
                </div>
                {/* H2: 50 characters */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Surat
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional in Gujarat under Section 18(e) of the Registration Act, 1908. A Will written on plain white paper is legally valid if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Not Mandatory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Surat is a non-presidency jurisdiction. Unlike Mumbai, Kolkata, or Chennai, court probate is not compulsory in Gujarat for Hindu, Jain, Sikh, or Buddhist Wills.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty in Gujarat</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills incur ₹0 stamp duty across Gujarat under the Gujarat Stamp Act, 1958. At Surat Sub-Registrar offices, testators pay only a flat ₹100 registration fee plus nominal scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Garvi Gujarat &amp; SMC Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sub-Registrar appointment booking is integrated online via the Garvi Gujarat portal, speeding up title mutation before the Surat Municipal Corporation (SMC), SUDA, and City Survey.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="surat-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                {/* H2: 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework: Will Drafting in Surat, Gujarat
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Testamentary succession in Surat is governed by the <strong>Indian Succession Act, 1925</strong> alongside the <strong>Registration Act, 1908</strong> and <strong>Gujarat Stamp Act, 1958</strong>.
                  Any individual of sound mind who has attained majority can draft a Will to determine the exact distribution of their self-acquired real estate, commercial businesses, company equity, bank balances, and precious assets.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Surat presents an intricate commercial landscape.
                  Families frequently hold multi-tier interests across diamond cutting and trading firms, textile weaving units in Pandesara or Sachin GIDC, wholesale shops on Ring Road, and luxury residential apartments in Vesu or VIP Road.
                  Without an unambiguous, legally drafted Will, commercial enterprises risk paralyzing partnership freezes, bank account freezes, and lengthy court litigation among heirs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be at least 18 years old and in sound testamentary mind (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Voluntary Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Executed freely without coercion, undue family pressure, or deceit (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the physical presence of two adult attesting witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Disinterested</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses must not be beneficiaries or spouse of any beneficiary under the Will (Section 67).
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
                {/* H2: 52 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Mandatory in Surat, Gujarat?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, the registration of a Will is strictly <strong>optional</strong> across Gujarat.
                  An unregistered Will executed on plain white paper is legally valid and admissible in Indian courts, provided it complies with the formal execution rules under Section 63 of the Indian Succession Act.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Nevertheless, given the high asset valuation of commercial properties and industrial units in Surat, registering your Will at the local Sub-Registrar Office is strongly advised by senior legal counsel:
                </p>
              </div>

              {/* FULL-WIDTH COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold">Succession Factor</th>
                      <th className="p-4 font-bold text-rose-900 bg-rose-50/60">Registered Will (Surat SRO)</th>
                      <th className="p-4 font-bold text-slate-800 bg-slate-50/60">Unregistered Will (Plain Paper)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-semibold">Government Custody</td>
                      <td className="p-4 bg-rose-50/20">Stored permanently in Book III government archives on Garvi Gujarat</td>
                      <td className="p-4 bg-slate-50/20">Held in private custody; vulnerable to misplacement or tampering</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Risk of Forgery Claims</td>
                      <td className="p-4 bg-rose-50/20">Negligible. Biometrics, thumbprints, and photos recorded before Sub-Registrar</td>
                      <td className="p-4 bg-slate-50/20">High. Dissatisfied heirs frequently claim forged signatures or coercion</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">SMC &amp; SUDA Property Mutation</td>
                      <td className="p-4 bg-rose-50/20">Swift approval with certified Book III copy from Sub-Registrar</td>
                      <td className="p-4 bg-slate-50/20">Revenue authorities may demand NOC affidavits or court succession certificate</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">GIDC Plot / Industry Transfer</td>
                      <td className="p-4 bg-rose-50/20">Recognized directly by GIDC regional office for industrial plot lease transfer</td>
                      <td className="p-4 bg-slate-50/20">Requires exhaustive indemnity bonds and multiple family no-objection declarations</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Official Gujarat Fee</td>
                      <td className="p-4 bg-rose-50/20 font-bold text-[#C65378]">Flat ₹100 registration fee</td>
                      <td className="p-4 bg-slate-50/20 font-bold text-slate-700">₹0 cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="surat-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>GUJARAT HIGH COURT PRECEDENTS</span>
                </div>
                {/* H2: 55 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Surat Probate Rules: Gujarat Non-Presidency Town Law
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common concern among Surat business founders and property holders is whether court probate is mandatory to implement a Will.
                  The definitive legal answer is <strong>no</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only if a Will is executed within, or pertains to immovable properties situated inside, the historical presidency towns of Mumbai, Kolkata, and Chennai.
                  Because Surat is located in the non-presidency state of Gujarat, probate is not mandatory for Hindu, Jain, Sikh, or Buddhist testators.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                    General Rule: Probate Optional
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Gujarat High Court Precedents
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Gujarat High Court in <em>Minaxiben Shashikantbhai Patel v. Anand Patel</em> and related authoritative rulings held that obtaining probate or letters of administration is not a prerequisite to establish right as an executor or legatee in Gujarat.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Enables direct property mutation with certified registered Will</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/30">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-extrabold uppercase">
                    Exceptions: When to File Probate
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    When is Probate Desirable in Surat?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Filing a voluntary probate petition before the District Court, Surat (Athwalines) is recommended if estranged family members threaten civil suits, or if high-value corporate holdings and diamond manufacturing firms face conflicting claims.
                  </p>
                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Provides an irrefutable judgment in rem conclusive against the world</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SURAT SRO DIRECTORY (BENTO HUB) */}
            <section id="surat-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>SRO JURISDICTION DIRECTORY</span>
                </div>
                {/* H2: 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Surat Sub-Registrar Offices: SRO Zone Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Surat district is administered through dedicated Sub-Registrar circles covering urban municipal zones and major industrial corridors.
                  Under Section 32 of the Registration Act, your Will can be registered at the SRO jurisdiction where you reside or where any part of your estate is located.
                </p>
              </div>

              {/* INTERACTIVE BENTO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search zone (e.g. Athwa, Varachha, Katargam, Adajan)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/40"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {filteredDistricts.length} of {SURAT_DISTRICTS.length} Surat SRO Circles
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
                        className={`px-2.5 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] min-[380px]:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                          isLastOdd ? "col-span-2 sm:col-auto" : "col-span-1 sm:col-auto"
                        } ${
                          isSelected
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
                        {activeDistrictData.name} Circle
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {activeDistrictData.sro}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Book III Register Active
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
                      <span className="font-bold text-slate-900 block">Jurisdiction Localities Covered:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDistrictData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500">
                      Official Appointment Portal: <strong>garvi.gujarat.gov.in</strong>
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                    >
                      <span>Request Advocate Assistance for {activeDistrictData.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: AREA-WISE WILL DRAFTING ACROSS SURAT LOCALITIES */}
            <section id="surat-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; SRO HUBS</span>
                </div>
                {/* H2: 58 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting Services Across Surat Localities
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in Vesu, Varachha, Ring Road, Adajan, or DREAM City</strong>?
                  From diamond trading bourses and bustling Ring Road textile markets to high-end residential towers in Vesu and waterfront properties in Adajan, our senior advocates provide specialized legal drafting, Garvi Gujarat portal appointment scheduling, and Sub-Registrar accompaniment across Surat:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: VESU & VIP ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South West Luxury Hub
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Athwa
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Vesu, VIP Road &amp; Dumas Road
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vesu Canal Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">VIP Road Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dumas Road Villas</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Someshwara Enclaves</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our specialized <strong>Will drafting services in Vesu, VIP Road &amp; Dumas Road</strong> represent Surat&apos;s most sought-after luxury residential and high-net-worth business addresses. Our Will drafts specifically address high-value penthouses, undivided land share (UDL) in multi-tier gated societies, mutual fund portfolios, and succession of family private limited companies.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bahumali Bhavan, Athwalines (SRO Athwa)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Garvi Gujarat priority e-appointments, SRO advocate representation, and Section 31 home visits for senior residents across Vesu.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Vesu and VIP Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Vesu Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: VARACHHA & KATARGAM */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Gem className="w-3.5 h-3.5 text-[#C65378]" />
                        Global Diamond Capital
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Varachha &amp; Katargam
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Varachha, Katargam &amp; Mini Bazar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mini Bazar Diamond Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hirabaug &amp; Sarthana</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Mota Varachha</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Katargam GIDC &amp; Ved Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Through dedicated <strong>Will drafting services in Varachha, Katargam &amp; Mini Bazar</strong>, we cater to the pulsing heart of India&apos;s diamond cutting, polishing, and merchant trade. We prepare specialized business succession Wills addressing diamond firm partnership shares, inventory transfer protocol, safe vault bequests, and smooth leadership transition for Patel family enterprises.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Mini Bazar Complex (Varachha) &amp; Katargam SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Diamond enterprise succession clauses, doctor medical certification, and Book III registration support.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Diamond Business Succession</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Varachha and Katargam"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Varachha Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: RING ROAD & TEXTILE MARKETS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5 text-[#C65378]" />
                        Textile Trading Nexus
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Majura &amp; Khatodara
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Ring Road, Salabatpura &amp; Begampura
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Millennium Textile Market</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Surat Textile Market (STM)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sahara Darwaja</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Japan &amp; Radharaman Markets</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Avail tailored <strong>Will drafting services in Ring Road, Salabatpura &amp; Begampura</strong> across India&apos;s synthetic textile capital. Our advocates structure estate plans covering commercial shop ownership, long-term market tenancies (pagdi), trade receivables, weaving mill partnership equities, and HUF business partitioning.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bahumali Bhavan, Majura Gate (SRO Majura)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Commercial asset succession, partnership deed harmonization, and swift Sub-Registrar execution.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Textile Commercial Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Ring Road Textile Markets"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Textile Estate Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: ADAJAN, PAL & JAHANGIRPURA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Zone Residential Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Rander (Adajan)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Adajan, Pal &amp; Jahangirpura
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anand Mahal Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">LP Savani Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pal Canal Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Gaurav Path West</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our expert <strong>Will drafting services in Adajan, Pal &amp; Jahangirpura</strong> cover Surat&apos;s prime western riverfront corridor featuring modern high-rise residential towers and cooperative housing societies. A registered Will ensures hassle-free society share certificate transfer, SMC property tax mutation, and bank deposit succession without requiring civil court succession certificates.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Navyug College Complex, Rander Road (SRO Rander)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Garvi Gujarat appointment booking, doorstep execution for senior citizens, and SMC mutation advisory.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">SMC Residential Flats</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Adajan and Pal"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Adajan Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: PIPLOD, ATHWALINES & CITY LIGHT */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Surat Elite Belt
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Athwa
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Piplod, Athwalines &amp; City Light
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ghod Dod Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Parle Point</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">City Light Townships</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kargil Chowk Piplod</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      We provide bespoke <strong>Will drafting services in Piplod, Athwalines &amp; City Light</strong> for prominent business dynasties, high-value independent bungalows, and retail showrooms. Our advocates prepare comprehensive testamentary instruments covering commercial real estate, corporate promoter voting rights, art collections, and multi-generational trusts.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bahumali Bhavan, Athwalines (SRO Athwa)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        High-value estate planning, family trust alignment, and senior advocate consultation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">High-Value Family Estates</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Piplod and Athwalines"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Piplod Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: SACHIN GIDC & PANDESARA GIDC */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Factory className="w-3.5 h-3.5 text-[#C65378]" />
                        GIDC Industrial Belts
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Udhna &amp; Choryasi
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Sachin GIDC &amp; Pandesara GIDC
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sachin GIDC Industrial Area</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Pandesara GIDC Weaving Units</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Khatodara Industrial Estate</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Hazira Port Corridor</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our specialized <strong>Will drafting services in Sachin GIDC &amp; Pandesara GIDC</strong> serve thousands of heavy manufacturing, textile processing, chemical, and engineering factories. We ensure exact compliance with Gujarat Industrial Development Corporation (GIDC) transfer bylaws, plant machinery bequests, environmental compliance transfers, and corporate succession.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Udhna Station Road (SRO Udhna) &amp; Choryasi SRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        GIDC plot succession structuring, industrial leasehold transfer clauses, and witness attestation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">GIDC Factory Plots</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Sachin and Pandesara GIDC"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft GIDC Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 7: ALTHAN, BHIMRAD & CANAL ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Urban Expansion
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Majura
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Althan, Bhimrad &amp; Bhatar
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Althan VIP Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhimrad Canal Corridor</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhatar Char Rasta</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sosyo Circle Commercials</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Through premier <strong>Will drafting services in Althan, Bhimrad &amp; Bhatar</strong>, we advise clients across newly constructed multi-storey towers and commercial business centers. Our Will drafts include explicit survivorship clauses, life-interest provisions for surviving spouses, and clear beneficiary nominations across commercial and residential holdings.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bahumali Bhavan, Khatodara (SRO Majura)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Garvi Gujarat slot confirmation, home execution support under Section 31, and SMC mutation assistance.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">New Urban Projects</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Althan and Bhimrad"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Althan Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 8: DREAM CITY & KHAJOD (SURAT DIAMOND BOURSE) */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <Gem className="w-3.5 h-3.5 text-[#C65378]" />
                        DREAM City Nexus
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Choryasi (Sachin)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in DREAM City &amp; Surat Diamond Bourse
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Surat Diamond Bourse (SDB)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Khajod DREAM City Belt</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">International Trade Offices</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Magdalla Commercial Enclaves</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Comprehensive <strong>Will drafting services in DREAM City &amp; Surat Diamond Bourse</strong> cater to the world&apos;s largest office complex and trade nexus. We draft corporate succession instruments for diamond merchants, covering international commercial offices, cross-border business interests (Dubai/Antwerp trade links), and multi-director governance structures.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Choryasi Taluka Seva Sadan, Sachin / Nanpura</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Corporate estate structuring, diamond trading firm succession, and expedited Book III SRO registration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">SDB Bourse Assets</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in DREAM City and Surat Diamond Bourse"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft SDB Bourse Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP BY STEP SOP */}
            <section id="step-by-step-surat-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP PROCEDURE</span>
                </div>
                {/* H2: 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Registration in Surat, Gujarat
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Registering a Will before a Surat Sub-Registrar follows a defined legal workflow under Gujarat Revenue Department rules.
                  Here is the verified 5-step procedure:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Asset &amp; Business Inventory
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      List all Surat properties, SMC assessments, diamond firm equities, textile shops, and bank folios.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Doctor Fitness Certification
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Secure an MBBS doctor fitness certificate certifying testamentary capacity, essential for senior testators.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Garvi Gujarat Booking
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Book appointment on garvi.gujarat.gov.in, upload witness details, and pay the flat ₹100 government fee.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Sub-Registrar Appearance
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Testator and two witnesses visit Surat SRO with original Aadhaar cards for verbal examination by the officer.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm">
                      5
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Book III Archival
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Biometric fingerprints and digital photographs captured. Officially endorsed Will deed returned in 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 31 DOORSTEP HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP SRO REGISTRATION</span>
                </div>
                {/* H2: 44 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep Registration in Surat
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For elderly, unwell, or mobility-impaired testators across Surat, navigating busy government complexes like Bahumali Bhavan or Mini Bazar can be stressful.
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar is legally empowered to attend the testator&apos;s private residence or healthcare facility to execute registration.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900">
                  How Doorstep Will Registration Works in Surat:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Doctor Mobility Certificate</strong>
                      <span className="text-slate-600">A registered MBBS doctor certifies that the testator is medically infirm or advised against traveling.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Commission Petition</strong>
                      <span className="text-slate-600">Our legal counsel drafts and submits the formal Section 31 commission application to the zonal Sub-Registrar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Official Commission Fee</strong>
                      <span className="text-slate-600">A standard government commission fee is remitted through Garvi Gujarat to schedule the commissioner&apos;s visit.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Portable Biometrics at Home</strong>
                      <span className="text-slate-600">The Sub-Registrar brings mobile digital biometric devices to record thumb impressions and identity photos at your doorstep.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>INTERACTIVE CHECKLIST</span>
                </div>
                {/* H2: 46 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Checklist for Surat Sub-Registrar
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Prepare your essential documentation before attending the Sub-Registrar office.
                  You have completed <strong>{checkedCount} of {checklist.length}</strong> items:
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

            {/* SECTION 9: SURAT ASSET TYPES */}
            <section id="surat-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>COMMERCIAL &amp; PROPERTY SUCCESSION</span>
                </div>
                {/* H2: 52 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Surat Asset Succession: Diamonds, Textiles &amp; GIDC
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession planning in Surat requires careful structuring based on specific commercial and statutory regulations governing local businesses:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold uppercase">
                    Diamond Firms
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Diamond Units &amp; SDB Offices
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Testators can bequeath partnership capital in Varachha and Katargam trading firms alongside commercial offices in Surat Diamond Bourse (SDB), specifying operational management rights to avoid deadlock.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Textile Commercials
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Ring Road Shops &amp; Tenancies
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Shops across Millennium, STM, and Japan Markets often hold pagdi or tenancy rights. A registered Will directs lawful inheritance of commercial leases, trade stocks, and distributor credit balances.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    GIDC Industrial Plots
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    Sachin &amp; Pandesara GIDC Sheds
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Leasehold industrial plots granted by GIDC demand clear testamentary nomination. A registered Will enables the designated successor partner or director to effectuate title transfer without cumbersome NOC hurdles.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES */}
            <section id="surat-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL CHARGES</span>
                </div>
                {/* H2: 52 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Gujarat Government Fees &amp; Stamp Charges
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike property conveyance deeds that incur significant ad-valorem stamp duty and municipal surcharges, Wills are 100% exempt from stamp duty across Gujarat under the Gujarat Stamp Act, 1958.
                  Official government fees at Surat Sub-Registrar offices are strictly nominal:
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
                      <td className="p-4 font-semibold">Gujarat Stamp Duty on Will</td>
                      <td className="p-4 text-emerald-700 font-bold">₹0 (Completely Exempt)</td>
                      <td className="p-4">Government of Gujarat</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Surat SRO Registration Fee</td>
                      <td className="p-4 font-bold text-[#C65378]">₹100 (Flat Statutory Fee)</td>
                      <td className="p-4">Superintendent of Stamps / Garvi Gujarat</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Computer Scanning &amp; Indexing</td>
                      <td className="p-4 font-bold">₹100 – ₹200</td>
                      <td className="p-4">Surat SRO Computer Center</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Section 31 Doorstep Commission</td>
                      <td className="p-4 font-bold">₹500 – ₹1,000</td>
                      <td className="p-4">Home Visit Official Commissioner Fee</td>
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
                {/* H2: 48 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Surat Will Packages &amp; Legal Fees
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Select the level of legal support tailored to your family&apos;s asset structure and business succession needs in Surat:
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
                      Ideal for individual estates comprising bank accounts, mutual funds, demat equity, and residential flats.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive Surat Will drafting platform</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Legally vetted statutory clauses</span>
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
                    Most Popular in Surat
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Comprehensive
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Commercial &amp; Advocate Review
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                    </div>
                    <p className="text-xs text-slate-600">
                      Senior estate advocate review for diamond firms, textile shops, GIDC plots, and HUF business succession.
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
                        <span>Bespoke diamond &amp; textile business clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>HUF partition &amp; witness vetting guidance</span>
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
                      Full end-to-end registration coordination at any of Surat&apos;s Sub-Registrar offices or home execution.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Garvi Gujarat online slot booking &amp; fees</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Surat advocate physically accompanies you</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep home visit coordination</span>
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

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                {/* H2: 43 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Surat Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Authoritative answers to common questions regarding Will drafting, diamond business planning, and SRO registration in Surat:
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY CITATIONS</span>
                </div>
                {/* H2: 48 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory References &amp; Gujarat Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  All WillDrafting protocols comply strictly with central statutes, Gujarat state legislation, and official registration systems:
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
                    Registration Act 1908
                  </span>
                  <p className="text-xs text-slate-600">
                    Section 18(e) (Optional Registration) and Section 31 (Doorstep Commission).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Garvi Gujarat Portal
                  </span>
                  <p className="text-xs text-slate-600">
                    Official Gujarat Revenue portal: <code>garvi.gujarat.gov.in</code>.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5 shadow-xs">
                  <span className="font-bold text-xs text-slate-900 block">
                    Gujarat Stamp Act 1958
                  </span>
                  <p className="text-xs text-slate-600">
                    Article 64 Schedule I granting 100% stamp duty exemption for Wills.
                  </p>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Surat Businesses &amp; Family Assets Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not allow your commercial diamond firms, textile trading shares, or SMC real estate to get trapped in protracted succession disputes.
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
                  Book Lawyer Consultation
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
                Visual Blueprint: Surat Will Drafting &amp; Commercial Asset Architecture
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
                src="/images/will-drafting-in-surat.jpg"
                alt="High Resolution Visual Blueprint: Surat Will Drafting &amp; Commercial Succession"
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
