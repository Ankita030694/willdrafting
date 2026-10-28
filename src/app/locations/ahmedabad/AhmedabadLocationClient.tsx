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
  Users,
  Coins,
  Globe,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "ahmedabad-overview", label: "OVERVIEW" },
  { id: "gujarat-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "ahmedabad-probate-rules", label: "PROBATE RULES" },
  { id: "huf-business-succession", label: "HUF & BUSINESS" },
  { id: "ahmedabad-sro-directory", label: "SRO DIRECTORY" },
  { id: "ahmedabad-area-coverage", label: "LOCAL AREAS" },
  { id: "garvi-gujarat-process", label: "GARVI GUJARAT SOP" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "ahmedabad-property-types", label: "PROPERTY TYPES" },
  { id: "gujarat-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const AHMEDABAD_DISTRICTS = [
  {
    id: "ahmedabad-city",
    name: "Ahmedabad City (Central)",
    sro: "Sub-Registrar Office Ahmedabad 1 (Lal Darwaja)",
    address: "Old Collector Office Compound, Lal Darwaja, Ahmedabad, Gujarat 380001",
    areas: "Lal Darwaja, Bhadra, Astodia, Jamalpur, Kalupur, Dariapur, Shahpur, Raipur, Khadia, Old City Heritage Pols",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "ahmedabad-west-core",
    name: "Ahmedabad West (Ellisbridge / Paldi)",
    sro: "Sub-Registrar Office Ahmedabad 2 (Paldi / Navrangpura)",
    address: "Multi-Storey Building (Bahumali Bhavan), Drive-In Road / Ellisbridge, Ahmedabad, Gujarat 380006",
    areas: "Paldi, Ellisbridge, Navrangpura, Naranpura, Usmanpura, Ambawadi, Law Garden, CG Road, Ashram Road",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "ahmedabad-west-outer",
    name: "Ahmedabad West (Memnagar / Vastrapur)",
    sro: "Sub-Registrar Office Ahmedabad 3 (Memnagar)",
    address: "Bahumali Bhavan Compound, Memnagar, Ahmedabad, Gujarat 380052",
    areas: "Memnagar, Vastrapur, Bodakdev, Satellite, Thaltej, Gurukul, Drive-In, Judges Bungalow Road, Sola Road",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "ahmedabad-south",
    name: "Ahmedabad South (Maninagar / Vatva)",
    sro: "Sub-Registrar Office Ahmedabad 4 (Maninagar)",
    address: "Maninagar Civil Station Compound, Near Kankaria Lake, Ahmedabad, Gujarat 380008",
    areas: "Maninagar, Kankaria, Isanpur, Ghodasar, Vatva GIDC, Narol, Danilimda, Jasodanagar, Lambha",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "ahmedabad-north",
    name: "Ahmedabad North (Sabarmati / Motera)",
    sro: "Sub-Registrar Office Ahmedabad 5 (Sabarmati)",
    address: "Sabarmati Taluka Seva Sadan, Near Sabarmati Railway Station, Ahmedabad, Gujarat 380005",
    areas: "Sabarmati, Chandkheda, Motera, Ranip, New Ranip, Tragad, Kali, Jagatpur, Chenpur, Zundal Border",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "ahmedabad-east",
    name: "Ahmedabad East (Naroda / Odhav)",
    sro: "Sub-Registrar Office Ahmedabad 6 (Naroda)",
    address: "Taluka Seva Sadan, Naroda Road / Odhav Industrial Area, Ahmedabad, Gujarat 382330",
    areas: "Naroda, Odhav GIDC, Bapunagar, Nikol, Kathwada GIDC, Viratnagar, Krishnanagar, Singarva",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "daskroi-bopal",
    name: "Daskroi Taluka (Bopal / Sanand Road)",
    sro: "Sub-Registrar Office Daskroi (Vastrapur / Bopal)",
    address: "Prant Office Compound, Vastrapur / Bopal Taluka Seva Sadan, Ahmedabad, Gujarat 380058",
    areas: "Bopal, South Bopal, Ghuma, Shela, Shilaj, Sanand Road, Godhavi, Telav, Manipur, Ambli Road",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "gandhinagar-circle",
    name: "Gandhinagar Revenue Circle & GIFT City",
    sro: "Sub-Registrar Office Gandhinagar (Sector 11)",
    address: "Jilla Seva Sadan, Sector 11, Gandhinagar, Gujarat 382011",
    areas: "GIFT City, Infocity, Gandhinagar Sectors 1 to 30, Kudasan, Raysan, Randesan, Koba, Sargasan, Vavol",
    timings: "10:30 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Signed Will",
    detail: "Printed clearly on durable white A4 paper. Under the Gujarat Stamp Act, no expensive stamp paper is required.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Will maker",
    detail: "Needed for biometric fingerprinting and live web-camera photography before the Gujarat SRO.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original photo IDs and must not be named heirs or their spouses.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Paper (For Seniors)",
    detail: "Signed by an active MBBS practitioner. Certifies sound mind and Will alertness to eliminate fight grounds.",
    checked: false,
  },
  {
    id: "item-5",
    label: "Garvi Gujarat Portal Appointment Receipt",
    detail: "Official token receipt downloaded after online paper entry and fee payment on garvi.gujarat.gov.in.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Asset Chain Papers (AMC / AUDA / GIDC / 7/12)",
    detail: "Copies of filed allotment deeds, share papers, or e-Dhara 7/12 extracts for precise asset ID.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs of Will maker & Witnesses",
    detail: "Recent color photographs with white background for physical archiving in SRO Book III records.",
    checked: false,
  },
];

export default function AhmedabadLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("ahmedabad-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ahmedabad-west-core");
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

  const filteredDistricts = AHMEDABAD_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    AHMEDABAD_DISTRICTS.find((d) => d.id === selectedDistrict) || AHMEDABAD_DISTRICTS[1];

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
                <span>GUJARAT ESTATE SUCCESSION &amp; HUF DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 58 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Ahmedabad: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will in Ahmedabad. Master HUF joint family planning, family business estate, and Gujarat SRO filing across Ahmedabad and Gandhinagar circles.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Ahmedabad Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#ahmedabad-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Ahmedabad SRO Directory</span>
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
                  <span>₹0 Gujarat Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Garvi Gujarat Portal SOP</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) - FULL VISIBILITY ENSURED */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
                title="Click to view full resolution infographic"
              >
                <Image
                  src="/images/will-drafting-in-ahmedabad.jpg"
                  alt="Legal Will Drafting and Business Succession in Ahmedabad Gujarat"
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
                8+ SRO Circles
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Ahmedabad &amp; Gandhinagar
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
                A Choice Probate
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
              DESKTOP VIEW: STICKY TABLE OF CONTENTS SIDEBAR
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
            <section id="ahmedabad-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>AHMEDABAD SUCCESSION BRIEF</span>
                </div>
                {/* H2: Exactly 55 characters */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Filing in Ahmedabad
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      <span>Non-Presidency Town Rules</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Court probate is not needed for assets in Ahmedabad and Gandhinagar. A filed Will allows direct name change with AMC and AUDA.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                      <Briefcase className="w-4 h-4 text-[#C65378]" />
                      <span>HUF &amp; Business Structuring</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ensure smooth estate for family firms, partnership deeds, GIDC factory plots, and separate personal assets from joint HUF joint family pool.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                      <Stamp className="w-4 h-4 text-[#C65378]" />
                      <span>Zero Stamp Duty in Gujarat</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills are 100% exempt from stamp duty under the Gujarat Stamp Act. Will makers pay only a flat nominal filing charge of ₹100.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                      <Globe className="w-4 h-4 text-[#C65378]" />
                      <span>Garvi Gujarat Portal Booking</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Appointments are booked online via garvi.gujarat.gov.in. Our team handles data entry, challans, and SRO accompaniment.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL FRAMEWORK */}
            <section id="gujarat-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY FOUNDATION &amp; MITAKSHARA LAW</span>
                </div>
                {/* H2: Exactly 45 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Ahmedabad
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate in Gujarat is governed by the Indian Succession Act, 1925, along with the personal laws of the Will maker. For Hindus, Jains, Sikhs, and Buddhists, the Hindu Succession Act, 1956 applies under the Mitakshara legal school.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-5 shadow-xs">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Under Section 59 of the Indian Succession Act, 1925, any person of sound mind who has attained the age of majority may dispose of their asset by Will. In Gujarat, understanding asset classification is essential. A Will maker possesses complete Will freedom over self-acquired real estate, shop investments, jewellery, and personal bank accounts.
                </p>

                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  However, family asset held under a Hindu Undivided Family (HUF) follows joint family principles. Under Section 30 of the Hindu Succession Act, 1956, a coparcener can dispose of their undivided interest in HUF asset through a Will. A Karta cannot bequeath the entire family estate to the exclusion of other rightful coparceners.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="block text-xs font-mono font-bold text-[#C65378] uppercase mb-1">
                      Section 59
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">Will Capacity</h3>
                    <p className="text-xs text-slate-600">
                      The Will maker must understand the nature of the act, the asset disposed, and the claims of natural heirs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="block text-xs font-mono font-bold text-[#C65378] uppercase mb-1">
                      Section 63
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">Physical Signing</h3>
                    <p className="text-xs text-slate-600">
                      The Will maker must sign or affix their mark in the conscious presence of two independent adult witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="block text-xs font-mono font-bold text-[#C65378] uppercase mb-1">
                      Section 67
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">Witness Disqualification</h3>
                    <p className="text-xs text-slate-600">
                      A heir or their spouse cannot be an signing witness. Any bequest to an signing witness becomes void.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908 (SECTION 18E)</span>
                </div>
                {/* H2: Exactly 47 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Filing Needed in Ahmedabad?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Filing Act, 1908, the filing of a Will is a choice across Gujarat. An plain Will drafted on standard paper is legally enforceable if validly signed by the Will maker before two competent witnesses.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-6 shadow-xs">
                <div className="space-y-3">
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Why Estate Lawyers Strongly Recommend Filing in Gujarat
                  </h3>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    While not needed by statute, registering your Will at the Ahmedabad SRO office provides undeniable proof weight. When you register a Will through the Garvi Gujarat portal, the SRO captures biometric thumbprints and digital photographs of both the Will maker and witnesses.
                  </p>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    This official Book III government record makes it virtually impossible for disgruntled relatives to allege forgery, coercion, or imposture later. Also, city offices like the Ahmedabad City City Board (AMC) and AUDA require filed papers to mutate asset titles smoothly.
                  </p>
                </div>

                {/* COMPARISON TABLE */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3.5 sm:p-4 font-bold">Feature</th>
                        <th className="p-3.5 sm:p-4 font-bold">Filed Will (Garvi Gujarat)</th>
                        <th className="p-3.5 sm:p-4 font-bold">Plain Will (White Paper)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Legal Validity</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">100% Legally Binding</td>
                        <td className="p-3.5 sm:p-4">100% Legally Binding (If Attested)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Official Government Record</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Permanently Preserved in Book III</td>
                        <td className="p-3.5 sm:p-4 text-rose-600">No Public Record Exists</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">AMC / AUDA Name Change</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Fast-Track Processing</td>
                        <td className="p-3.5 sm:p-4 text-amber-700">Requires Heavy Heir Affidavits</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Loss or Tampering Risk</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Certified Copy Available from SRO</td>
                        <td className="p-3.5 sm:p-4 text-rose-600">Irrecoverable If Lost or Destroyed</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Vulnerability to Fights</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">Very High Proof Protection</td>
                        <td className="p-3.5 sm:p-4 text-rose-600">Frequently Challenged for Coercion</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES */}
            <section id="ahmedabad-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>INDIAN SUCCESSION ACT (SECTIONS 213 &amp; 57)</span>
                </div>
                {/* H2: Exactly 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Ahmedabad Probate Rules: Non-Presidency Town Law
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike Mumbai, Kolkata, or Chennai, probate is not needed for Wills signed in Ahmedabad or covering assets situated across Gujarat.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-5 shadow-xs">
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#C65378] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Probate Is Completely A Choice in Gujarat
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Under Section 213(2) read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, needed probate applies strictly to historical presidency towns. Since Ahmedabad was never a presidency town, getting a court-issued probate is not a legal prerequisite to set up heir rights.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Gujarat High Court Precedents on Will Title
                  </h3>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    The Gujarat High Court has repeatedly held that an executor or heir can assert their title over land and flats without getting letters of management or probate. This saves families 12 to 24 months of civil court proceedings and costly ad-valorem court fees.
                  </p>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    However, if your Will bequeaths land assets situated within Mumbai city limits or South Mumbai areas, probate from the Bombay High Court remains needed for those specific assets, even if the Will maker resided and signed the Will in Ahmedabad.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>When Might an Ahmedabad Family Choose Voluntary Probate?</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Voluntary probate is sought only when major fights arise among legal heirs, where title is fiercely contested, or when overseas institutions and multinational banks demand court-certified probate prior to releasing massive financial bequests.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: HUF & BUSINESS SUCCESSION */}
            <section id="huf-business-succession" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Briefcase className="w-4 h-4 text-[#C65378]" />
                  <span>COMMERCIAL ENTERPRISE &amp; COPARCENARY STRUCTURING</span>
                </div>
                {/* H2: Exactly 53 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. HUF Assets &amp; Family Business Estate in Gujarat
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Ahmedabad is Gujarat&apos;s financial and shop engine. Structuring estate for Hindu Undivided Family (HUF) assets, corporate shareholdings, and plant units requires strategic legal drafting.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-6 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CARD 1: HUF PROPERTY */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      <Users className="w-4 h-4 text-[#C65378]" />
                      <span>HUF Joint family Demarcation</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Bequeathing HUF Joint family Shares
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      A Karta cannot will away entire family HUF assets unilaterally. Doing so makes the bequest vulnerable to court fights by other coparceners, including daughters with equal birthrights under the 2005 Hindu Succession Amendment.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our senior lawyers structure the Will to explicitly delineate the Will maker&apos;s separate self-acquired estate from their notional joint family split share under Section 30 of the Hindu Succession Act, 1956.
                    </p>
                  </div>

                  {/* CARD 2: BUSINESS SUCCESSION */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      <Briefcase className="w-4 h-4 text-[#C65378]" />
                      <span>Family Business Continuity</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      GIDC Plots, Shares &amp; Partnerships
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Ahmedabad business owners often hold equity in Private Limited companies, capital accounts in partnership firms, and plant leasehold plots across GIDC plant estates like Vatva, Naroda, Odhav, and Sanand.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Your Will must harmonize with company Articles of Association (AoA) and partnership deeds. We draft explicit share transfer and management estate clauses to prevent operational deadlock.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                    <Sparkles className="w-4 h-4 text-[#C65378]" />
                    <span>Cross-Circle Assets: Ahmedabad &amp; Gandhinagar</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Many Ahmedabad business founders own shop offices along S.G. Highway or Sindhu Bhavan Road, factories in Sanand, and home plots in Gandhinagar or GIFT City. A single unified Will filed at any competent SRO office legally covers all assets across Gujarat and other Indian states.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: SRO DIRECTORY */}
            <section id="ahmedabad-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>JURISDICTIONAL SRO DIRECTORY</span>
                </div>
                {/* H2: Exactly 53 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Ahmedabad SRO Offices: District Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under the Inspector General of Filing (IGR Gujarat), Ahmedabad and Gandhinagar are organized into designated SRO revenue zones. Find your relevant local office below:
                </p>
              </div>

              {/* SEARCH BOX */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search locality (e.g. Bopal, Vastrapur, GIFT City, Paldi)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378] text-slate-800"
                />
              </div>

              {/* TABS + DETAILS CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 space-y-6 shadow-xs">
                {/* Horizontal scrollable pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {filteredDistricts.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDistrict(d.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedDistrict === d.id
                          ? "bg-[#C65378] text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>

                {/* ACTIVE DISTRICT CARD */}
                <div className="rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#172228]/10 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-[#C65378] block">
                        JURISDICTIONAL SRO
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                        {activeDistrictData.sro}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                      Garvi Gujarat Portal Enabled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                        Official SRO Address:
                      </span>
                      <p className="text-slate-600 pl-5">{activeDistrictData.address}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        Office Working Hours:
                      </span>
                      <p className="text-slate-600 pl-5">{activeDistrictData.timings}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#172228]/10">
                    <span className="font-bold text-xs text-slate-900 block mb-1.5">
                      Prominent Localities &amp; Revenue Villages Covered:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeDistrictData.areas}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: AREA COVERAGE */}
            <section id="ahmedabad-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; HUBS</span>
                </div>
                {/* H2: Exactly 53 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Area-Wise Will Drafting Services Across Ahmedabad Localities
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally checked <strong>Will drafting services in Navrangpura, Bodakdev, SG Highway, or Bopal</strong>? Assets in Ahmedabad span historic pol houses, premium bungalows along Ambli Road, high-rise apartments in Bopal, and shop offices on S.G. Highway. Our lawyers provide tailored drafting and Garvi Gujarat help:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AREA 1: NAVRANGPURA & CG ROAD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Central-West Core
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ahmedabad 2 (Paldi)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Navrangpura, CG Road &amp; Ellisbridge
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Navrangpura</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">CG Road Showrooms</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Paldi &amp; Mahalaxmi</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ellisbridge</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Looking for professional <strong>Will drafting services in Navrangpura, CG Road &amp; Ellisbridge</strong>? Home to established Gujarati mercantile families, shop showrooms on CG Road, and heritage assets. We structure complex Wills addressing family business estate, partnership capital transfer, and AMC asset tax name change.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Bahumali Bhavan, Drive-In Road</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Garvi Gujarat slot scheduling, lawyer representation, and Section 31 home visits for elderly Will makers across Navrangpura and Paldi.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Navrangpura"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Navrangpura Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 2: BODAKDEV & VASTRAPUR */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        West Prime Home
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ahmedabad 3 (Memnagar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bodakdev, Vastrapur &amp; Satellite
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bodakdev Bungalows</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Judges Bungalow Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Satellite Penthouses</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vastrapur Lake</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Get specialized <strong>Will drafting services in Bodakdev, Vastrapur &amp; Satellite</strong>. Features luxury bungalows, high-value penthouses, and diversified investment portfolios. Our estate lawyers incorporate specific bequest clauses for equities, mutual fund folios, gold jewellery, and independent family office holdings.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Memnagar Bahumali Bhavan</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Complete token generation, doctor paper coordination, and fast biometric filing for Bodakdev and Satellite families.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bodakdev &amp; Satellite"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bodakdev Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 3: SINDHU BHAVAN ROAD & SG HIGHWAY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        Executive Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO 3 &amp; Daskroi
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services on Sindhu Bhavan Road &amp; SG Highway
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sindhu Bhavan Road (SBR)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ambli-Bopal Road</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">SG Highway Corporate Hub</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Science City</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Opt for premier <strong>Will drafting services on Sindhu Bhavan Road &amp; SG Highway</strong>. Ahmedabad&apos;s corporate high-growth belt. We draft customized Will instruments for company founders, managing partners, and NRGs holding luxury shop units, family trusts, and multi-local real estate.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Corporate Estate &amp; NRI Specialization</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Bespoke business estate blueprints, non-compete estate arrangements, and NRI power of attorney estate management.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services on Sindhu Bhavan Road"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft SBR Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 4: BOPAL, SOUTH BOPAL & GHUMA */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        AUDA Growth Corridor
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Daskroi (Vastrapur)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Bopal, South Bopal &amp; Ghuma
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bopal Home Flats</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">South Bopal (SoBo)</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ghuma &amp; Shela</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sanand Ring Road</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Secure expert <strong>Will drafting services in Bopal, South Bopal &amp; Ghuma</strong>. Vibrant home townships developed under AUDA town planning schemes. We assist young professionals, IT executives, and retired seniors in registering clear Wills for their mortgaged or freehold society apartments.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Daskroi Taluka Seva Sadan</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Seamless Garvi Gujarat digital token generation and Daskroi SRO filing with zero hassle.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Bopal &amp; South Bopal"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Bopal Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 5: MANINAGAR & VATVA GIDC */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        South Plant &amp; Home
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Ahmedabad 4 (Maninagar)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Maninagar, Kankaria &amp; Vatva
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Maninagar East &amp; West</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kankaria Lake Environs</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vatva GIDC Plant Plots</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Narol &amp; Isanpur</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Full <strong>Will drafting services in Maninagar, Kankaria &amp; Vatva</strong>. Traditional family neighborhoods alongside vital GIDC chemical and textile manufacturing hubs. We make sure explicit bequest clauses for plant leasehold plots, factory equipment, and family home plots.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hub: Maninagar Civil Station Compound</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Convenient SRO filing near Kankaria with dedicated lawyer help and paper pre-check.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Maninagar &amp; Vatva"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Maninagar Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AREA 6: MOTERA, SABARMATI & GIFT CITY */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                        <MapPin className="w-3.5 h-3.5" />
                        North &amp; Capital Circle
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        SRO Sabarmati &amp; Gandhinagar
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Will Drafting Services in Motera, Sabarmati &amp; GIFT City
                    </h3>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Motera Narendra Modi Stadium</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Chandkheda &amp; Zundal</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sabarmati Riverfront</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">GIFT City Global Fin-Tech</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Protect your investments with <strong>Will drafting services in Motera, Sabarmati &amp; GIFT City</strong>. Rapidly expanding twin-city corridor linking Ahmedabad and Gandhinagar. We handle multi-area Wills covering GIFT City international investment instruments, GUDA-approved plots, and riverfront assets.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Building className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>SRO Hubs: Sabarmati &amp; Gandhinagar Sector 11</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        End-to-end appointment scheduling and lawyer support across both Ahmedabad and Gandhinagar revenue circles.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                    <Link
                      href="/start"
                      onClick={handleStartDraft}
                      aria-label="Will Drafting Services in Motera &amp; GIFT City"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Draft Motera &amp; GIFT Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP GARVI GUJARAT SOP */}
            <section id="garvi-gujarat-process" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL REGISTRATION BLUEPRINT</span>
                </div>
                {/* H2: Exactly 54 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Step-by-Step Garvi Gujarat Portal Will Filing
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow our checked five-stage step to draft, execute, and register your Will under the Gujarat revenue system:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 flex items-start gap-4 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Asset Inventory &amp; Legal Estate Structuring
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Compile a complete list of your self-acquired assets, bank accounts, demat holdings, company shares, and HUF joint family share. Appoint an independent executor to administer your estate smoothly.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 flex items-start gap-4 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Lawyer Drafting &amp; Plain Paper Signing
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Our senior legal team prepares your Will with explicit legal clauses. Print the final draft on standard white A4 sheets. Sign each page in the simultaneous presence of two independent adult witnesses.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 flex items-start gap-4 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Garvi Gujarat Portal Entry &amp; E-Challan Payment
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      We submit paper data on the official Garvi Gujarat portal (garvi.gujarat.gov.in). We pay the nominal ₹100 filing fee via the Cyber Treasury portal and lock your chosen date and time slot at the local SRO.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 flex items-start gap-4 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Biometric Capture at Ahmedabad SRO office
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      On the appointment day, the Will maker and both witnesses visit the SRO office with our lawyer. The filing officer verifies original Aadhaar cards, captures digital photographs, and records biometric fingerprints.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 flex items-start gap-4 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    5
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Official Book III Endorsement &amp; Will Collection
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      The SRO endorses the official filing stamp and scans the paper into government Book III archives. The original filed Will, bearing official seals and filing numbers, is handed back to the Will maker.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: SECTION 31 HOME VISIT */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908 (SECTION 31)</span>
                </div>
                {/* H2: Exactly 47 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Section 31 Doorstep Filing for Seniors
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  For senior citizens, bedridden Will makers, or hospital-admitted people who cannot visit an SRO in person, the law offers a compassionate doorstep rule:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-5 shadow-xs">
                <div className="space-y-3">
                  <h3 className="font-extrabold text-lg text-slate-900">
                    How Home Filing Operates in Ahmedabad
                  </h3>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    Under Section 31 of the Filing Act, 1908, the SRO has the legal discretion to attend at the private residence or hospital of any person desiring to present or execute a Will. An form is submitted outlining the medical condition of the Will maker, accompanied by an MBBS doctor&apos;s paper.
                  </p>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    Upon approval and payment of government commission and conveyance fees, the SRO visits your home in Ahmedabad or Gandhinagar with portable biometric equipment. The signing and thumbprints are recorded at your bedside, making sure total legal sanctity without physical discomfort.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#C65378] block">
                      ELIGIBILITY CRITERIA
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      <li>Senior citizens aged 75+ with mobility restrictions.</li>
                      <li>Bedridden patients recovering from surgery or illness.</li>
                      <li>People undergoing hospital treatment or palliative care.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#C65378] block">
                      OUR LEGAL TEAM ASSISTANCE
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      <li>Drafting and filing the Section 31 requisition letter.</li>
                      <li>Liaison with local SRO and SDM.</li>
                      <li>Full lawyer presence during the home filing visit.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>PRE-REGISTRATION VERIFICATION</span>
                </div>
                {/* H2: Exactly 48 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Papers Checklist for Gujarat SRO
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Carry these checked papers to your Ahmedabad SRO appointment. Use our free checklist to track your preparation:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs sm:text-sm font-bold text-slate-700">
                    Prepared: {checkedCount} of {checklist.length} Essential Items
                  </span>
                  <span className="text-xs font-mono font-bold text-[#C65378] bg-rose-50 px-2.5 py-1 rounded-md">
                    {Math.round((checkedCount / checklist.length) * 100)}% Complete
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 cursor-pointer hover:bg-slate-100/70 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-[#C65378] focus:ring-[#C65378] accent-[#C65378] shrink-0 pointer-events-none"
                      />
                      <div className="space-y-0.5">
                        <span className="block font-bold text-sm text-slate-900">
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: PROPERTY TYPES */}
            <section id="ahmedabad-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL ASSET CLASSIFICATIONS</span>
                </div>
                {/* H2: Exactly 50 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Ahmedabad Asset Types: Freehold, HUF &amp; GIDC
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Real estate in the Ahmedabad metropolitan region encompasses unique legal frameworks requiring careful legal drafting:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* AMC FLATS & HOUSING */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>AMC &amp; AUDA Housing Societies</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    Cooperative Societies &amp; Freehold Apartments
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Most apartments across Navrangpura, Satellite, and Bopal are organized under the Gujarat Co-operative Societies Act, 1961. While cooperative societies maintain share paper nominee records, the Supreme Court has clarified that nominees are merely custodians. A filed Will ensures absolute ownership passes directly to your intended heir.
                  </p>
                </div>

                {/* GIDC INDUSTRIAL PLOTS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    <Briefcase className="w-4 h-4 text-[#C65378]" />
                    <span>GIDC Plant Estates</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    Plant Plots in Vatva, Naroda &amp; Odhav
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Plant land allotted by the Gujarat Plant Development City Board (GIDC) is typically held on a 99-year leasehold basis. Your Will must reference the lease deed date, plot allotment letter, and comply with GIDC transfer norms to prevent forfeiture or heavy office transfer penalties.
                  </p>
                </div>

                {/* AGRICULTURAL LAND & SECTION 63 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Farm Land &amp; e-Dhara (7/12)</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    Gujarat Tenancy Act &amp; Farmer Status
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 63 of the Gujarat Tenancy and Farm Lands Act, 1948, non-farmers cannot hold farm land. While Will estate allows estate by natural heirs, bequeathing farm land to a non-agriculturist outsider can attract revenue scrutiny. We make sure strict compliance with e-Dhara name change rules.
                  </p>
                </div>

                {/* COMMERCIAL OFFICES & SHOWROOMS */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    <Coins className="w-4 h-4 text-[#C65378]" />
                    <span>Shop &amp; Financial Assets</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    SBR Towers, Manek Chowk &amp; Demat Portfolios
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Shop assets in Sindhu Bhavan Road high-rises or family wholesale shops in Manek Chowk and Relief Road yield substantial rental revenues. We incorporate explicit tenancy estate clauses and demat share transfer directions.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: FEES & CHARGES */}
            <section id="gujarat-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Coins className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY EXPENSES</span>
                </div>
                {/* H2: Exactly 50 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Official Gujarat Stamp Duty &amp; Filing Fees
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  One of the greatest legal benefits of creating a Will in Gujarat is its complete exemption from ad-valorem stamp duty:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-6 shadow-xs">
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3.5 sm:p-4 font-bold">Expense Head</th>
                        <th className="p-3.5 sm:p-4 font-bold">Government Prescribed Rate</th>
                        <th className="p-3.5 sm:p-4 font-bold">Legal Office &amp; Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Gujarat Stamp Duty</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-extrabold text-base">₹0 (Completely Exempt)</td>
                        <td className="p-3.5 sm:p-4">Gujarat Stamp Act, 1958 (Article 64 exemption for Wills)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Government Filing Fee</td>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">₹100 (Flat Nominal Fee)</td>
                        <td className="p-3.5 sm:p-4">Gujarat Filing Rules (Paid online via Garvi portal)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Computer &amp; Scanning Fee</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-800">Approx. ₹100 – ₹200</td>
                        <td className="p-3.5 sm:p-4">Digital archival and live photo capture charges at SRO</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Section 31 Home Visit Commission</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-800">Govt. Travel &amp; Commission Fee</td>
                        <td className="p-3.5 sm:p-4">Applicable only when SRO visits private residence</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Financial Planning Tip:</strong> Registering a Gift Deed in Gujarat attracts heavy stamp duty (up to 4.9% for non-family) plus 1% filing fees. In contrast, bequeathing asset through a Will involves zero stamp duty and ₹100 in filing fees, making it the most cost-effective estate estate method in India.
                </div>
              </div>
            </section>

            {/* SECTION 12: PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL PACKAGES</span>
                </div>
                {/* H2: Exactly 42 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Transparent Will Packages &amp; Legal Fees
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose from our clear, fixed-fee packages tailored for Ahmedabad residents, business owners, and non-resident Gujaratis:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TIER 1 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:border-[#C65378] transition-colors">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      TIER 1 · ONLINE DRAFT
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Standard Single Will
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹1,990
                      <span className="text-xs font-normal text-slate-500 block mt-1">One-time transparent fee</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-2.5 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer-drafted customized Will</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Covers flats, bank deposits &amp; demat</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Detailed signing instructions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant digital download (PDF &amp; Word)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleStartDraft}
                      className="w-full py-3 rounded-xl bg-slate-100 hover:bg-[#C65378] hover:text-white text-slate-800 font-extrabold text-xs transition-colors cursor-pointer text-center"
                    >
                      Select Standard Will
                    </button>
                  </div>
                </div>

                {/* TIER 2 */}
                <div className="rounded-3xl bg-white border-2 border-[#C65378] p-6 flex flex-col justify-between shadow-lg relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    MOST POPULAR IN GUJARAT
                  </span>
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                      TIER 2 · HUF &amp; CONSULTATION
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Senior Lawyer Review
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹4,990
                      <span className="text-xs font-normal text-slate-500 block mt-1">One-time full fee</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-2.5 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Estate Lawyer call</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>HUF joint family asset allocation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Business estate &amp; partnership shares</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor mental fitness paper format</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href="https://wa.me/918700343611?text=Hello%2C%20I%20am%20interested%20in%20the%20Advocate%20Review%20Will%20package%20in%20Ahmedabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 rounded-xl bg-[#C65378] hover:bg-[#a13c5d] text-white font-extrabold text-xs transition-colors cursor-pointer text-center"
                    >
                      Consult Senior Lawyer
                    </a>
                  </div>
                </div>

                {/* TIER 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:border-[#C65378] transition-colors">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      TIER 3 · COMPLETE SRO SERVICE
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">
                      Garvi Portal &amp; SRO Help
                    </h3>
                    <div className="text-3xl font-black text-slate-900">
                      ₹9,990
                      <span className="text-xs font-normal text-slate-500 block mt-1">Complete concierge package</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-2.5 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Full Garvi Gujarat portal slot booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Cyber treasury e-challan generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer attendance at Ahmedabad/Gandhinagar SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit coordination</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href="https://wa.me/918700343611?text=Hello%2C%20I%20need%20complete%20Garvi%20Gujarat%20SRO%20Will%20registration%20support%20in%20Ahmedabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors cursor-pointer text-center"
                    >
                      Book SRO Concierge
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>FREQUENT TESTAMENTARY INQUIRIES</span>
                </div>
                {/* H2: Exactly 47 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Frequently Asked Questions: Ahmedabad Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Answers to common legal questions regarding Will drafting, HUF assets, and Garvi Gujarat SRO filing:
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
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
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

            {/* SECTION 14: STATUTORY REFERENCES */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>LEGAL CITATIONS &amp; OFFICIAL WEBSITES</span>
                </div>
                {/* H2: Exactly 50 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  14. Legal References &amp; Gujarat Revenue Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  All estate planning guidance on this page is based on codified Indian succession statutes and official Gujarat state circulars:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 space-y-4 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <strong className="text-slate-900 block font-bold">
                      Indian Succession Act, 1925
                    </strong>
                    <p className="text-xs text-slate-600">
                      Sections 59, 63, 67, 213, and 57 (Sound mind, signing, witness signing, and non-presidency probate exceptions).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <strong className="text-slate-900 block font-bold">
                      Filing Act, 1908
                    </strong>
                    <p className="text-xs text-slate-600">
                      Section 18(e) (A Choice filing of Wills) and Section 31 (Filing at private residence by SRO).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <strong className="text-slate-900 block font-bold">
                      Hindu Succession Act, 1956
                    </strong>
                    <p className="text-xs text-slate-600">
                      Section 30 (Will of joint family interest in HUF asset under Mitakshara law).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <strong className="text-slate-900 block font-bold">
                      Official Gujarat Revenue Portals
                    </strong>
                    <p className="text-xs text-slate-600">
                      Garvi Gujarat Filing Portal (garvi.gujarat.gov.in) &amp; AnyROR e-Dhara Land Records (anyror.gujarat.gov.in).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CLOSING CTA CARD */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Ahmedabad Assets &amp; Family Legacy Today
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Prevent bitter court battles and safeguard your hard-earned assets. Draft a legally checked Will with expert Gujarat High Court estate lawyers in less than 20 minutes.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  Start Your Will Online Now
                </a>
                <a
                  href="https://wa.me/918700343611?text=Hello%2C%20I%20would%20like%20to%20speak%20with%20a%20Will%20drafting%20advocate%20in%20Ahmedabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base transition-all border border-white/20 text-center"
                >
                  Chat with Ahmedabad Lawyer
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
          HIGH RESOLUTION MODAL VIEWER (IMAGE FULLY VISIBLE)
          ========================================================================= */}
      {showHighResModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#172228] rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                Visual Blueprint: Will Drafting &amp; Business Estate in Ahmedabad
              </span>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 mt-3">
              <Image
                src="/images/will-drafting-in-ahmedabad.jpg"
                alt="High Resolution Visual Blueprint: Ahmedabad Will Drafting & Business Succession"
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
