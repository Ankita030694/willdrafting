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
  { id: "maharashtra-overview", label: "OVERVIEW" },
  { id: "maharashtra-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "probate-jurisdiction-rules", label: "PROBATE RULES" },
  { id: "cooperative-housing-societies", label: "CHS FLATS & NOMINEES" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "maharashtra-sro-directory", label: "SRO DIRECTORY" },
  { id: "maharashtra-regional-coverage", label: "REGIONAL CITIES" },
  { id: "step-by-step-maharashtra-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "maharashtra-property-types", label: "PROPERTY TYPES" },
  { id: "maharashtra-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const MAHARASHTRA_DIVISIONS = [
  {
    id: "mumbai-mmr",
    name: "Mumbai Metropolitan Region (MMR)",
    sro: "SRO Mumbai City (Old Custom House) & Suburban (Bandra, Andheri, Borivali, Kurla)",
    address: "Old Custom House, Shahid Bhagat Singh Marg, Fort, Mumbai - 400001 / Administrative Building, Bandra (East), Mumbai - 400051",
    areas: "South Mumbai, Bandra, Andheri, Borivali, Chembur, Kurla, Thane Naupada, Navi Mumbai (Vashi & Belapur), Kalyan, Dombivli, Mira-Bhayandar",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "pune-division",
    name: "Pune & Western Maharashtra Division",
    sro: "SRO Haveli 1-27 (Central Building Photozinco) & PCMC Sub-District",
    address: "Photozinco Press Compound, Near Central Building, Pune - 411001 / PCMC Tehsil Office, Morwadi, Pimpri - 411018",
    areas: "Pune City, Kothrud, Baner, Aundh, Hinjewadi, Wakad, Hadapsar, Kharadi, Pimpri-Chinchwad, Satara, Kolhapur, Solapur, Sangli",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "nashik-north",
    name: "Nashik & North Maharashtra Division",
    sro: "SRO Nashik 1 & 2 (Old Agra Road / Canada Corner Compound)",
    address: "Tehsil Administrative Office, Old Agra Road, Near Canada Corner, Nashik - 422002",
    areas: "Nashik City, Gangapur Road, Panchavati, CIDCO Nashik, Deolali, Malegaon, Dhule, Jalgaon, Ahmednagar, Nandurbar",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "nagpur-vidarbha",
    name: "Nagpur & Vidarbha Division",
    sro: "SRO Nagpur 1 & 2 (Collectorate Compound, Civil Lines)",
    address: "Collectorate Administrative Complex, Civil Lines, Nagpur - 440001",
    areas: "Nagpur City, Dharampeth, Ramdaspeth, Civil Lines, Katol Road, Wardha, Amravati, Akola, Chandrapur, Yavatmal, Gondia",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "chhatrapati-sambhajinagar",
    name: "Chhatrapati Sambhajinagar (Marathwada Division)",
    sro: "SRO Aurangabad 1 & 2 (Collectorate / CIDCO Office)",
    address: "Collectorate Compound, Jalna Road, Chhatrapati Sambhajinagar - 431001",
    areas: "Chhatrapati Sambhajinagar City, CIDCO, Samarth Nagar, Waluj MIDC, Jalna, Nanded, Latur, Parbhani, Beed, Dharashiv",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "konkan-coastal",
    name: "Konkan Coastal Division",
    sro: "SRO Panvel, SRO Alibaug & Coastal Sub-Districts",
    address: "Tehsil Administrative Complex, Near Panvel Bus Station, Panvel - 410206 / Collectorate Alibaug, Raigad - 402201",
    areas: "Panvel, Kharghar, Alibaug, Pen, Roha, Karjat, Khopoli, Ratnagiri, Chiplun, Sindhudurg, Sawantwadi, Kankavli",
    timings: "9:45 AM to 5:30 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Under Article 64 of Schedule I of the Maharashtra Stamp Act, stamp paper is zero rupees.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Testator",
    detail: "Required for biometric thumbprint scanning and live webcam photograph capture on the IGR Maharashtra SARITA / e-Stepin system.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original government photo IDs and must not be beneficiaries receiving any asset under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor Mental Fitness Certificate (For Seniors)",
    detail: "Issued by a registered MBBS medical practitioner certifying sound mind, memory, and understanding to eliminate testamentary capacity challenges.",
    checked: true,
  },
  {
    id: "item-5",
    label: "Cooperative Housing Society Share Certificates & Index II",
    detail: "Clear title records showing flat number, society registration details, and registered conveyance/sale deeds across Maharashtra.",
    checked: true,
  },
  {
    id: "item-6",
    label: "Agricultural Land 7/12 & 8A Extracts (For Rural Lands)",
    detail: "Recent computerized Satbara Utara showing exact gut numbers, taluka, and mutation entry numbers (Ferfar).",
    checked: false,
  },
  {
    id: "item-7",
    label: "IGR Maharashtra e-Stepin Token & Fee Challan",
    detail: "Appointment slot receipt downloaded from igrmaharashtra.gov.in confirming payment of nominal ₹100 registration fee.",
    checked: true,
  },
];

export default function MaharashtraLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("maharashtra-overview");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("mumbai-mmr");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    const targets = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

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

  const filteredDivisions = MAHARASHTRA_DIVISIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDivisionData =
    MAHARASHTRA_DIVISIONS.find((d) => d.id === selectedDivision) || MAHARASHTRA_DIVISIONS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI / PUNE / MUMBAI THEME)
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
                <span>STATEWIDE JURISDICTION • MAHARASHTRA ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 54 characters (starts with "Will Drafting Services in Maharashtra") */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Maharashtra: Probate Support
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your Mumbai, Pune, Nagpur, and statewide assets with legally sound testamentary planning.
                Navigate Bombay High Court probate rules, IGR Maharashtra e-Stepin registration, and cooperative housing society nominations with certified estate advocates.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Maharashtra Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#maharashtra-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Maharashtra SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bombay HC Advocate Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 Maharashtra Stamp Duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 31 Doorstep SRO</span>
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
                  src="/images/will-drafting-in-maharashtra.jpg"
                  alt="Online Will Drafting and Registration Services in Maharashtra"
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
                36 Districts
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Statewide SRO Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Article 64 Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 213 Rule
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Mumbai vs Rest of State
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep SRO Commission
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: DROPDOWN TABLE OF CONTENTS (STICKY ON MOBILE)
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
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 max-h-80 overflow-y-auto space-y-1">
              {TOC_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveId(item.id);
                      setMobileTocOpen(false);
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
                      onClick={() => setActiveId(item.id)}
                      className={`group flex items-center text-xs font-mono tracking-wider transition-all duration-200 select-none py-1 ${
                        isActive
                          ? "text-[#C65378] font-bold"
                          : "text-slate-500 hover:text-slate-900 font-medium"
                      }`}
                    >
                      <span
                        className={`mr-3 shrink-0 rounded-full transition-all duration-200 ${
                          isActive
                            ? "w-5 h-[2px] bg-[#C65378]"
                            : "w-2.5 h-[1px] bg-slate-300 group-hover:bg-slate-400 group-hover:w-3.5"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* =====================================================================
              RIGHT COLUMN: EDITORIAL CONTENT SECTIONS
              ===================================================================== */}
          <main className="w-full min-w-0 space-y-16 lg:space-y-20">
            
            {/* -----------------------------------------------------------------
                SECTION 1: STATE OVERVIEW & LEGAL ECOSYSTEM
                ----------------------------------------------------------------- */}
            <section id="maharashtra-overview" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  STATE ECOSYSTEM
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Maharashtra
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Maharashtra stands as India&apos;s commercial capital and highest-value real estate landscape. From multi-crore cooperative housing society apartments in South Mumbai, Bandra, and Pune, to sprawling IT corridor condominiums in Hinjewadi, Kharadi, and Thane, estate distribution in Maharashtra carries unique statutory complexities.
                </p>
                <p>
                  Succession planning across Maharashtra requires meticulous alignment with three distinct legal pillars: the territorial probate rules under <strong>Section 213 of the Indian Succession Act, 1925</strong> (which differentiates Mumbai presidency limits from the rest of Maharashtra), the <strong>Maharashtra Co-operative Societies Act, 1960</strong> regarding nominal society memberships, and the <strong>Maharashtra Stamp Act</strong> ensuring complete stamp duty exemption for testamentary documents.
                </p>
              </div>

              {/* 4 HIGH IMPACT FEATURE BOXES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-rose-50 text-[#C65378] shrink-0">
                    <Stamp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm mb-1">₹0 Stamp Duty on Maharashtra Wills</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Article 64 of Schedule I of the Maharashtra Stamp Act, Wills are entirely exempt from stamp duty. Costly stamp paper is completely unnecessary.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm mb-1">Section 213 Dual Territorial Rule</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Probate is mandatory for Mumbai presidency properties, but legally optional for Pune, Nagpur, Nashik, and all non-presidency Maharashtra districts.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm mb-1">CHS Nominee vs Beneficial Legal Heir</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 30 of the MCS Act, a society nominee acts strictly as a trustee. A registered Will guarantees undisputed title transfer to intended beneficiaries.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm mb-1">Section 31 Doorstep SRO Registration</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Senior citizens and bedridden testators can request official Sub-Registrar home visits with mobile biometric kits upon doctor certification.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 2: LEGAL FRAMEWORK & STATUTORY RULES
                ----------------------------------------------------------------- */}
            <section id="maharashtra-legal-framework" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  STATUTORY GOVERNANCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Succession Laws in Maharashtra
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Every testamentary document executed within the State of Maharashtra derives legal validity from statutory enactments enforced uniformly across India, supplemented by state-specific stamp and registration codes:
                </p>
              </div>

              {/* STATUTORY TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white uppercase text-[11px] font-mono tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Statutory Enactment</th>
                      <th className="py-3.5 px-4 sm:px-6">Legal Mandate in Maharashtra</th>
                      <th className="py-3.5 px-4 sm:px-6">Practical Effect for Testator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                        Section 59, Indian Succession Act, 1925
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        Testator must possess testamentary capacity (sound mind, memory, and age of majority).
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">
                        Senior citizens benefit from attaching an MBBS medical certificate to preempt incapacity challenges.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                        Section 63, Indian Succession Act, 1925
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        Attestation by at least two independent adult witnesses who saw the testator sign.
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">
                        Beneficiaries or their spouses should NEVER sign as attesting witnesses to protect bequest validity.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                        Article 64, Maharashtra Stamp Act
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        Absolute exemption from stamp duty for Wills executed anywhere within Maharashtra.
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">
                        Executing on plain white A4 paper is 100% legally enforceable; non-judicial stamp paper is unrequired.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                        Section 18(e), Registration Act, 1908
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        Registration of Wills remains legally optional before Maharashtra Sub-Registrars.
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">
                        Registration under Book III creates an unassailable government record that accelerates municipal mutation.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                        Section 30, Maharashtra Co-op Societies Act
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        Nomination in housing societies transfers membership as a fiduciary, not beneficial title.
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">
                        A valid Will is essential to ensure intended family heirs receive unencumbered title to CHS flats.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 3: BOMBAY HIGH COURT PROBATE RULES (SECTION 213 ISA)
                ----------------------------------------------------------------- */}
            <section id="probate-jurisdiction-rules" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  JUDICIAL JURISDICTION
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Bombay High Court Probate Rules: Section 213 ISA
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  The most widely misunderstood legal issue in Maharashtra succession law is the requirement for court probate. Under Section 213(1) read with Section 57(a) &amp; (b) of the Indian Succession Act, 1925, Maharashtra has a distinct territorial division established during the British Presidency administration:
                </p>
              </div>

              {/* DUAL JURISDICTION COMPARISON CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mumbai Presidency Limits */}
                <div className="rounded-3xl bg-white border-2 border-rose-200 p-6 shadow-sm space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-[#C65378] text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>MUMBAI PRESIDENCY JURISDICTION</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Probate is Statutorily Mandatory
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If a Will is made by a Hindu, Buddhist, Sikh, or Jain within the Ordinary Original Civil Jurisdiction of the High Court of Bombay (the historic island city of Mumbai and designated presidency limits), or if immovable properties bequeathed under the Will are situated inside Mumbai presidency limits, <strong>Section 213 mandates court probate</strong>.
                  </p>
                  <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                      <span>Cooperative societies in Mumbai routinely demand probate for title transfer.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                      <span>Banks and mutual fund depositories require probate for high-value claims.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                      <span>Petition filed before the Testamentary &amp; Intestate Division of Bombay High Court.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/services/probate-lawyer"
                      className="text-xs font-bold text-[#C65378] hover:text-[#9e3a5a] inline-flex items-center gap-1.5"
                    >
                      <span>Consult Bombay High Court Probate Lawyers</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Rest of Maharashtra */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-sm space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>REST OF MAHARASHTRA JURISDICTION</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Probate is Legally Optional
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For all other cities and districts in Maharashtra—including Pune, Pimpri-Chinchwad, Nagpur, Nashik, Chhatrapati Sambhajinagar, Thane, Navi Mumbai, Kolhapur, and Solapur—<strong>probate is strictly non-compulsory</strong> under settled Supreme Court precedents (<em>Clarence Pais v. Union of India</em>) and Bombay High Court rulings.
                  </p>
                  <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Municipal corporations (PMC, PCMC, NMC) mutate property without probate.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Registered Will serves as authoritative proof before housing societies.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Court intervention is needed only if a disappointed heir files a civil dispute.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/tools/probate-checker"
                      className="text-xs font-bold text-slate-800 hover:text-slate-950 inline-flex items-center gap-1.5"
                    >
                      <span>Check Your Property with the Free Probate Checker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 4: COOPERATIVE HOUSING SOCIETIES (MCS ACT 1960)
                ----------------------------------------------------------------- */}
            <section id="cooperative-housing-societies" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  HOUSING SOCIETY LAW
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Housing Society Flats: MCS Act &amp; Nominee vs Heir
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Over 100,000 Cooperative Housing Societies (CHS) exist in Maharashtra. Thousands of families mistakenly assume that submitting a society nomination form (Form 14 under Model Bye-Laws) makes the nominee the absolute owner of the flat upon the owner&apos;s death.
                </p>
                <p>
                  This assumption is completely incorrect under Indian succession jurisprudence and has led to protracted litigation in the Bombay High Court and Maharashtra Co-operative Appellate Courts:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2.5">
                  <Building className="w-5 h-5 text-[#C65378]" />
                  <span>The Supreme Court Ruling on Society Nominations</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In the landmark judgment of <em>Indrani Wahi v. Registrar of Co-operative Societies (2016)</em>, followed consistently by the Bombay High Court in <em>Ramdas Shivram Sattur v. Rameshchandra</em>, the courts unequivocally held:
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-[#C65378] text-xs sm:text-sm text-slate-800 font-medium italic">
                  &ldquo;A nominee of a flat in a cooperative housing society does not become the absolute owner of the property. The nominee is merely an agent or trustee holding the membership and shares in trust on behalf of the legal heirs entitled under testamentary succession (a valid Will) or intestate succession law.&rdquo;
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                    <span className="font-bold text-amber-900 text-xs block mb-1">Nominee&apos;s Limited Role</span>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Maintains society maintenance dues, attends society AGMs, and signs society registers as an interim trustee until title is finalized.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                    <span className="font-bold text-emerald-900 text-xs block mb-1">Will Beneficiary&apos;s True Title</span>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Holds 100% legal and equitable ownership, including the right to sell the flat, lease it, or transfer proceeds to their own children.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 5: REGISTRATION & STAMP DUTY EXEMPTION
                ----------------------------------------------------------------- */}
            <section id="mandatory-vs-optional" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  REGISTRATION RULES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Will Registration: Mandatory vs Optional Status
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Under Section 18(e) of the Registration Act, 1908, the registration of a Will is legally optional throughout Maharashtra. An unregistered Will drafted on plain A4 bond paper and attested by two competent adult witnesses is entirely valid in the eyes of law.
                </p>
                <p>
                  However, in high-stakes metropolitan markets across Maharashtra, relying on an unregistered Will exposes your beneficiaries to severe administrative delays and hostile challenges:
                </p>
              </div>

              {/* REGISTERED VS UNREGISTERED COMPARISON */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white uppercase text-[11px] font-mono tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Verification Factor</th>
                      <th className="py-3.5 px-4 sm:px-6">Unregistered Will</th>
                      <th className="py-3.5 px-4 sm:px-6">IGR Maharashtra Registered Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">Proof of Genuine Execution</td>
                      <td className="py-4 px-4 sm:px-6 text-rose-600">Must be proved in court; easily challenged for forgery or undue influence.</td>
                      <td className="py-4 px-4 sm:px-6 text-emerald-700 font-semibold">Self-authenticating government record under Book III with biometric logs.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">Tampering &amp; Loss Risk</td>
                      <td className="py-4 px-4 sm:px-6 text-rose-600">High risk of physical destruction, suppression, or theft by disgruntled heirs.</td>
                      <td className="py-4 px-4 sm:px-6 text-emerald-700 font-semibold">Permanent encrypted digital archive with IGR Maharashtra (SARITA portal).</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">Housing Society Flat Transfer</td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">Societies demand indemnity bonds, NOCs from all heirs, or court probate.</td>
                      <td className="py-4 px-4 sm:px-6 text-emerald-700 font-semibold">Direct transfer of society share certificate under Bye-Law 35 procedures.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">Municipal &amp; 7/12 Land Mutation</td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">Talathis and ward offices often conduct protracted hearings with all relatives.</td>
                      <td className="py-4 px-4 sm:px-6 text-emerald-700 font-semibold">Swift Form 6 Ferfar mutation and computerized Satbara name entry.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 6: MAHARASHTRA SRO DIRECTORY
                ----------------------------------------------------------------- */}
            <section id="maharashtra-sro-directory" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  OFFICIAL DIRECTORY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Maharashtra SRO Directory: City &amp; District Registry
                </h2>
              </div>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The Inspector General of Registration (IGR) Maharashtra oversees hundreds of Sub-Registrar Offices organized across 6 major administrative revenue divisions. Use our directory to locate your designated registry office:
              </p>

              {/* SEARCH FILTER */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by city, area, or SRO office..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]/30 focus:border-[#C65378]"
                />
              </div>

              {/* INTERACTIVE DIVISION TABS & ACTIVE CARD */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {filteredDivisions.map((div) => {
                    const isSelected = selectedDivision === div.id;
                    return (
                      <button
                        key={div.id}
                        type="button"
                        onClick={() => setSelectedDivision(div.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#172228] text-white shadow-xs"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {div.name.split(" (")[0]}
                      </button>
                    );
                  })}
                </div>

                {/* SRO DETAILS CARD */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase font-bold text-[#C65378] tracking-wider block">
                        ADMINISTRATIVE REGION
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        {activeDivisionData.name}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      <Laptop className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>IGR SARITA Enabled</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-slate-900 block mb-1">Key Registry Office / SRO:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDivisionData.sro}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block mb-1">Registry Complex Address:</span>
                      <p className="text-slate-600 leading-relaxed">{activeDivisionData.address}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-900 text-xs block mb-1">Local Jurisdictions Covered:</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{activeDivisionData.areas}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Official Office Hours:</span>
                    <span>{activeDivisionData.timings}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 7: REGIONAL CITIES & URBAN HUBS COVERAGE
                ----------------------------------------------------------------- */}
            <section id="maharashtra-regional-coverage" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  METROPOLITAN SERVICES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Key Cities &amp; Regional Will Services in Maharashtra
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Mumbai */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-start justify-between gap-2">
                      <span>Will Drafting Services in Mumbai</span>
                      <span className="text-[10px] font-mono text-[#C65378] uppercase font-bold shrink-0">Presidency</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Specialized drafting for high-value CHS apartments, MHADA redevelopment flats, and Section 213 Bombay High Court probate compliance.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <Link
                      href="/locations/mumbai"
                      className="text-xs font-bold text-[#C65378] hover:text-[#9e3a5a] inline-flex items-center gap-1"
                    >
                      <span>Explore Mumbai Will Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Pune */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-start justify-between gap-2">
                      <span>Will Drafting Services in Pune</span>
                      <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold shrink-0">Non-Presidency</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Custom estate drafting covering Hinjewadi/Kharadi IT tech equities, PMC and PCMC apartments, and probate exemption guidance.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <Link
                      href="/locations/pune"
                      className="text-xs font-bold text-[#C65378] hover:text-[#9e3a5a] inline-flex items-center gap-1"
                    >
                      <span>Explore Pune Will Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Nagpur */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-start justify-between gap-2">
                      <span>Will Drafting Services in Nagpur</span>
                      <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold shrink-0">High Court Bench</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Comprehensive estate planning across Nagpur City, MIHAN industrial assets, NMC municipal plots, and ancestral agricultural lands.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <Link
                      href="/locations/nagpur"
                      className="text-xs font-bold text-[#C65378] hover:text-[#9e3a5a] inline-flex items-center gap-1"
                    >
                      <span>Explore Nagpur Will Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Nashik */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-start justify-between gap-2">
                      <span>Will Drafting Services in Nashik</span>
                      <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold shrink-0">Industrial &amp; Agro</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Tailored succession planning for vineyard estates, MIDC industrial units in Satpur/Ambad, and residential properties across Canada Corner.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <Link
                      href="/locations/nashik"
                      className="text-xs font-bold text-[#C65378] hover:text-[#9e3a5a] inline-flex items-center gap-1"
                    >
                      <span>Explore Nashik Will Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Thane & Navi Mumbai */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-start justify-between gap-2">
                      <span>Will Drafting Services in Thane &amp; Navi Mumbai</span>
                      <span className="text-[10px] font-mono text-blue-700 uppercase font-bold shrink-0">CIDCO / TMC</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Succession solutions for CIDCO 99-year leasehold apartments, TMC residential complexes, and Vashi/Belapur commercial office suites.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <Link
                      href="/locations/mumbai"
                      className="text-xs font-bold text-[#C65378] hover:text-[#9e3a5a] inline-flex items-center gap-1"
                    >
                      <span>MMR SRO Guidelines</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Marathwada */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-start justify-between gap-2">
                      <span>Will Drafting Services in Chhatrapati Sambhajinagar</span>
                      <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold shrink-0">High Court Bench</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Estate planning across Marathwada, AURIC smart city investments, Waluj manufacturing plants, and Samarth Nagar residential units.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <span className="text-xs font-bold text-slate-500">
                      Aurangabad Bench Jurisdictions
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 8: 5-STEP PROCESS SOP
                ----------------------------------------------------------------- */}
            <section id="step-by-step-maharashtra-sop" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  STANDARD OPERATING PROCEDURE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Step-by-Step SOP: Will Drafting to Registration
                </h2>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Compile Asset Portfolio &amp; Beneficiary Distribution
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Document every asset held across Maharashtra: cooperative flat share certificates, CIDCO leasehold documents, agricultural 7/12 extracts, demat portfolios (NSDL/CDSL), bank accounts, and business equity. Designate primary beneficiaries and contingent alternates.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Draft Will with Bombay High Court Legal Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft your Will incorporating crucial clauses: revocation of prior wills, appointment of an independent executor, specific asset bequests, and residuary clauses. Consult certified estate advocates to ensure strict compliance with Section 63 of the Indian Succession Act.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Execution &amp; Two-Witness Attestation on Plain Paper
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the drafted Will on plain white A4 bond paper (₹0 stamp duty under Article 64). The testator signs each page in the presence of two independent adult witnesses. For seniors, attach an MBBS doctor mental fitness certificate issued on the same day.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Schedule Appointment on IGR Maharashtra e-Stepin
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visit the official Inspector General of Registration Maharashtra portal (igrmaharashtra.gov.in). Use the SARITA e-Stepin module to select your district Sub-Registrar office, fill in party information, pay the nominal ₹100 registration fee online, and generate your appointment token.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Biometric Scanning &amp; Book III Archival at SRO
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      On the appointed day, the testator and both witnesses visit the Sub-Registrar office with original Aadhaar cards. The SRO official verifies identities, records live webcam photos, captures biometric thumbprints, and issues the registered Book III registration certificate.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 9: SECTION 31 DOORSTEP REGISTRATION
                ----------------------------------------------------------------- */}
            <section id="doorstep-home-registration" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  SENIOR CITIZEN CONVENIENCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Section 31 Doorstep SRO Registration in Maharashtra
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Senior citizens, ailing individuals, or bedridden hospital patients often find traveling to crowded Sub-Registrar offices physically daunting. Under <strong>Section 31 of the Registration Act, 1908</strong>, Maharashtra law provides an official doorstep registration procedure:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-50 text-[#C65378]">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900">Official Special Commission at Your Residence</h3>
                    <p className="text-xs text-slate-500">Available across all 36 districts of Maharashtra</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">1. Medical Travel Inability</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered MBBS medical practitioner certifies that the testator is medically infirm or bedridden and unable to visit the SRO.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">2. SRO Formal Deputation</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar reviews the application, collects nominal government conveyance fees, and schedules a home visit commission.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">3. Mobile Biometric Setup</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The official officer visits the residence with a portable biometric thumb scanner and live webcam to complete registration in privacy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 10: DOCUMENT CHECKLIST (INTERACTIVE)
                ----------------------------------------------------------------- */}
            <section id="documents-checklist" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                      VERIFICATION READINESS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      9. Mandatory Document Checklist for Maharashtra Wills
                    </h2>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start sm:self-auto">
                    {checkedCount} of {checklist.length} Verified
                  </div>
                </div>
              </div>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Check off each item to ensure your Maharashtra Will execution and SRO registration proceed without statutory objections or clerical rejections:
              </p>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                      item.checked
                        ? "bg-white border-slate-300/90 shadow-2xs"
                        : "bg-slate-50/70 border-slate-200/60 opacity-80"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        item.checked
                          ? "bg-[#C65378] text-white"
                          : "border-2 border-slate-300 bg-white"
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="text-sm font-extrabold text-slate-900 leading-snug">
                        {item.label}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 11: PROPERTY TYPES IN MAHARASHTRA
                ----------------------------------------------------------------- */}
            <section id="maharashtra-property-types" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  ASSET DIVERSIFICATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Property Succession: CHS Flats, 7/12 Land &amp; Demat
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Maharashtra estates comprise diverse property categories, each governed by specific statutory transfer regulations:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. CHS Flats */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                    <Building className="w-4 h-4" />
                    <span>Cooperative Society Flats (CHS)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governed by the MCS Act, 1960. Precision drafting must cite the exact society registration number, share certificate numbers, flat number, and distinctive share numbers to enable seamless title transfer under Bye-Law 35.
                  </p>
                </div>

                {/* 2. CIDCO & MHADA Units */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                    <Home className="w-4 h-4" />
                    <span>CIDCO &amp; MHADA Leasehold Units</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Prevalent across Navi Mumbai, Nashik, and suburban Mumbai. Bequests must account for tripartite lease agreements, NOC transfer requirements, and statutory transfer charges levied by development authorities.
                  </p>
                </div>

                {/* 3. 7/12 Agricultural Lands */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <Landmark className="w-4 h-4" />
                    <span>7/12 Agricultural &amp; Ancestral Lands</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 63 of the Maharashtra Tenancy and Agricultural Lands Act, non-agriculturists face restrictions. Precision Will drafting guarantees that ancestral and self-acquired farmland passes smoothly via revenue Form 6 Ferfar mutation.
                  </p>
                </div>

                {/* 4. Tech Equity & Financial Assets */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                    <Laptop className="w-4 h-4" />
                    <span>Demat Shares, Mutual Funds &amp; RSUs</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dominant among professionals in Mumbai, Pune, and Thane. Wills must explicitly encompass NSDL/CDSL demat accounts, mutual fund folios, bank fixed deposits, and US/multinational RSUs to override conflicting default nominations.
                  </p>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 12: REGISTRATION FEES & ZERO STAMP DUTY
                ----------------------------------------------------------------- */}
            <section id="maharashtra-registration-fees" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  OFFICIAL TARIFF
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Registration Charges &amp; Zero Stamp Duty in Maharashtra
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  A common misconception is that registering a Will requires paying exorbitant percentage-based stamp duties similar to gift deeds or sale deeds. Under Maharashtra law, testamentary dispositions enjoy complete statutory exemptions:
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white uppercase text-[11px] font-mono tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Government Fee Head</th>
                      <th className="py-3.5 px-4 sm:px-6">Prescribed Official Charge</th>
                      <th className="py-3.5 px-4 sm:px-6">Governing Legal Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">Maharashtra Stamp Duty</td>
                      <td className="py-4 px-4 sm:px-6 text-emerald-700 font-extrabold">₹0 (Completely Exempt)</td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">Article 64, Schedule I, Maharashtra Stamp Act</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">Sub-Registrar Registration Fee</td>
                      <td className="py-4 px-4 sm:px-6 font-semibold">₹100 (Flat nominal fee)</td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">Table of Fees, Maharashtra Registration Rules (Book III)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">SARITA Portal Scanning &amp; Indexing</td>
                      <td className="py-4 px-4 sm:px-6 font-semibold">₹100 to ₹300 (Actual sheet count)</td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">IGR Maharashtra Document Processing Schedule</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">Section 31 Home Visit Commission</td>
                      <td className="py-4 px-4 sm:px-6 font-semibold">Official travel allowance + nominal fee</td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">Section 31 &amp; 38, Registration Act, 1908</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 13: PLANS & PRICING
                ----------------------------------------------------------------- */}
            <section id="service-pricing" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  TRANSPARENT VALUE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Transparent Pricing: Maharashtra Will Packages
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl mt-2">
                  Select the level of legal assistance best suited to your family&apos;s assets across Maharashtra:
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
                      Ideal for individuals with straightforward assets such as a single flat, bank deposits, and mutual funds.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lawyer-vetted Maharashtra format</span>
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
                        <span>Execution &amp; attestation guide</span>
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
                    <h3 className="font-extrabold text-xl text-slate-900">Advocate Consultation &amp; Review</h3>
                    <div className="text-3xl font-black text-slate-900">₹4,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recommended for families owning multiple flats, tech RSUs, or ancestral properties across Maharashtra.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior High Court Advocate Consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Custom clauses for CHS flats &amp; 7/12 land</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 213 Bombay HC probate advice</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor fitness certificate format included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Two rounds of advocate revisions</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-extrabold hover:bg-[#a13c5d] transition-colors text-center cursor-pointer shadow-md shadow-[#C65378]/25"
                  >
                    Book Advocate Consultation
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Comprehensive</span>
                    <h3 className="font-extrabold text-xl text-slate-900">Complete SRO Registration</h3>
                    <div className="text-3xl font-black text-slate-900">₹9,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Turnkey end-to-end support including IGR slot booking, advocate accompaniment, or Section 31 doorstep execution.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>All Advocate Review &amp; Consultation benefits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>IGR Maharashtra e-Stepin slot scheduling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Advocate coordination at your local SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit coordination for seniors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Collection of registered Book III deed</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Schedule Registration
                  </a>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 14: FAQS ACCORDION
                ----------------------------------------------------------------- */}
            <section id="frequently-asked-questions" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  COMMON INQUIRIES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Maharashtra Wills
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-extrabold text-slate-900 gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                SECTION 15: STATUTORY CITATIONS
                ----------------------------------------------------------------- */}
            <section id="statutory-citations" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200/80 pb-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C65378] block mb-1">
                  AUTHORITATIVE SOURCES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Statutory Citations &amp; High Court Precedents
                </h2>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Indian Succession Act, 1925 (Act No. 39 of 1925):</strong>
                      <span className="text-slate-600 ml-1">
                        Sections 57, 59, 63, 213, 214, and 273 establishing execution rules and territorial probate jurisdiction.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Maharashtra Stamp Act, 1958 (Bombay Act LX of 1958):</strong>
                      <span className="text-slate-600 ml-1">
                        Schedule I, Article 64 exempting Wills and codicils from state stamp duty.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Registration Act, 1908 (Act No. 16 of 1908):</strong>
                      <span className="text-slate-600 ml-1">
                        Sections 18(e), 31, and 51 governing Book III registration and special commissions for home visits.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Maharashtra Co-operative Societies Act, 1960 (Mah. Act XXIV of 1961):</strong>
                      <span className="text-slate-600 ml-1">
                        Section 30 and Model Bye-Laws 34 &amp; 35 concerning member nominations vs. beneficial title of testamentary heirs.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Landmark Judicial Precedents:</strong>
                      <span className="text-slate-600 ml-1">
                        <em>Indrani Wahi v. Registrar of Co-operative Societies (2016) 6 SCC 440</em>; <em>Ramdas Shivram Sattur v. Rameshchandra (2009) (3) Bom CR 705</em>; <em>Clarence Pais &amp; Ors. v. Union of India (2001) 4 SCC 325</em>.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                BOTTOM CONSULTATION CTA BANNER
                ----------------------------------------------------------------- */}
            <section className="rounded-3xl bg-[#172228] text-white p-8 md:p-12 shadow-xl relative overflow-hidden text-center sm:text-left">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C65378]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-rose-300">
                    PROTECT YOUR FAMILY TODAY
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Secure Your Maharashtra Estate with Certified Advocates
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Avoid probate delays, housing society disputes, and inheritance confusion. Create your legally verified Will today with complete support.
                  </p>
                </div>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="px-8 py-4 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/30 shrink-0 cursor-pointer"
                >
                  Start Your Will Online
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH RESOLUTION BLUEPRINT MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between text-white pb-2 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                Visual Blueprint • Maharashtra Will Drafting &amp; SRO Registration
              </span>
              <button
                type="button"
                onClick={() => setShowHighResModal(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-md bg-white/10"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 mt-3">
              <Image
                src="/images/will-drafting-in-maharashtra.jpg"
                alt="High Resolution Visual Blueprint: Maharashtra Will Drafting and SRO Registration"
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
          <span className="block text-[11px] font-bold text-slate-900 truncate">
            Maharashtra Will Drafting
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold block truncate">
            ₹0 Stamp Duty • IGR e-Stepin
          </span>
        </div>
        <a
          href="/start"
          onClick={handleStartDraft}
          className="px-5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-extrabold hover:bg-[#a13c5d] transition-all shrink-0 cursor-pointer shadow-md"
        >
          Draft Now
        </a>
      </div>
    </div>
  );
}
