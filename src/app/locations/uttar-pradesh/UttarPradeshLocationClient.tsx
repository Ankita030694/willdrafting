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
  { id: "up-overview", label: "OVERVIEW" },
  { id: "up-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "up-probate-rules", label: "PROBATE RULES" },
  { id: "section-108-agricultural-succession", label: "AGRICULTURAL SUCCESSION" },
  { id: "up-sro-directory", label: "SRO DIRECTORY" },
  { id: "up-regional-coverage", label: "REGIONAL CITIES" },
  { id: "step-by-step-up-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "up-property-types", label: "PROPERTY TYPES" },
  { id: "up-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const UP_DISTRICTS = [
  {
    id: "gautam-buddha-nagar",
    name: "Gautam Buddha Nagar (Noida & Greater Noida)",
    sro: "SRO Noida (Sector 33) & SRO Greater Noida (Alpha-1 Commercial Belt)",
    address: "Sub-Registrar Office, Block A, Sector 33, Noida - 201301 / Tehsil Complex, Dadri & Commercial Belt, Greater Noida - 201308",
    areas: "Noida Sectors 15, 18, 50, 62, 75, 78, 128, 137, 150; Greater Noida Alpha, Beta, Gamma, Pari Chowk, Tech Zone; Yamuna Expressway (YEIDA)",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "lucknow-central",
    name: "Lucknow (Awadh Capital Region)",
    sro: "SRO I, II, III, IV & V (Kaiserbagh Collectorate) & SRO Mohanlalganj",
    address: "Collectorate Compound, Kaiserbagh, Lucknow - 226001 / Tehsil Mohanlalganj, Raebareli Road, Lucknow - 226301",
    areas: "Hazratganj, Gomti Nagar, Indira Nagar, Mahanagar, Alambagh, Ashiyana, Jankipuram, Raebareli Road, Amar Shaheed Path, LDA Colony",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "ghaziabad-ncr",
    name: "Ghaziabad & NCR West",
    sro: "SRO I, II, III & IV Ghaziabad (Collectorate Kutchery) & SRO Modinagar",
    address: "District Collectorate Compound, Raj Nagar / Hapur Road, Ghaziabad - 201002",
    areas: "Indirapuram, Vaishali, Vasundhara, Raj Nagar Extension, Crossings Republik, Kaushambi, Sahibabad Industrial Area, Kavi Nagar, Loni",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "kanpur-nagar",
    name: "Kanpur Nagar (Industrial Central UP)",
    sro: "SRO I, II, III, IV, V & VI (Collectorate Compound Kutchery)",
    address: "Collectorate Compound, Civil Lines, Near Phool Bagh, Kanpur - 208001",
    areas: "Civil Lines, Swaroop Nagar, Tilak Nagar, Kidwai Nagar, Kakadeo, Kalyanpur, Shyam Nagar, Govind Nagar, Cantt, GT Road Corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "varanasi-kashi",
    name: "Varanasi (Purvanchal & Kashi Zone)",
    sro: "SRO I, II & III Varanasi (Kutchery Collectorate) & SRO Pindra / Rohania",
    address: "Collectorate Compound, Kutchery Road, Varanasi - 221002",
    areas: "Cantt, Sigra, Bhelupur, Mahmoorganj, Lanka (BHU), Shivpur, Pandeypur, Rohania, Ramnagar, Sarnath, Babatpur Corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "agra-braj",
    name: "Agra (Braj & Western UP)",
    sro: "SRO I, II, III & IV Agra (Collectorate Kutchery) & SRO Fatehabad",
    address: "District Collectorate Compound, MG Road, Agra - 282002",
    areas: "Sanjay Place, Civil Lines, Dayalbagh, Kamla Nagar, Tajganj, Fatehabad Road, Sikandra, Shahganj, Bodla, Khandari",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "prayagraj-sangam",
    name: "Prayagraj / Allahabad (Sangam & High Court Zone)",
    sro: "SRO I, II, III & IV Prayagraj (Collectorate Compound) & SRO Phulpur",
    address: "Collectorate Kutchery Compound, Near High Court, Prayagraj - 211002",
    areas: "Civil Lines, Georgetown, Tagore Town, Ashok Nagar, Cantonment, Naini, Jhalwa (IIIT Zone), Phaphamau, Kareli, Katra",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "meerut-zone",
    name: "Meerut (Western UP Industrial & Sugar Belt)",
    sro: "SRO I, II, III & IV Meerut (Collectorate Kutchery) & SRO Mawana",
    address: "Collectorate Compound, Near Commissioner Office, Civil Lines, Meerut - 250001",
    areas: "Civil Lines, Shastri Nagar, Ganga Nagar, Pallavpuram, Modipuram, Delhi Road, Saket, Meerut Cantt, Partapur Industrial Zone",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "bareilly-rohilkhand",
    name: "Bareilly (Rohilkhand Division)",
    sro: "SRO I & II Bareilly (Collectorate Compound, Kutchery)",
    address: "Collectorate Compound, Kutchery, Bareilly - 243001",
    areas: "Civil Lines, Rajendra Nagar, DD Puram, Suresh Sharma Nagar, Pilibhit Bypass Road, Subhash Nagar, Cantt, Izzatnagar",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "gorakhpur-purvanchal",
    name: "Gorakhpur (Eastern Purvanchal Division)",
    sro: "SRO I & II Gorakhpur (Collectorate Compound) & SRO Sahjanwa",
    address: "Collectorate Compound, Kutchery, Gorakhpur - 273001",
    areas: "Golghar, Civil Lines, Taramandal (GDA Schemes), Medical College Road, Mohaddipur, Betiahata, Shahpur, AIIMS Corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "aligarh-braj",
    name: "Aligarh (Lock City & Western Hub)",
    sro: "SRO I & II Aligarh (Collectorate Kutchery) & SRO Koil",
    address: "Collectorate Compound, Kutchery Road, Aligarh - 202001",
    areas: "Civil Lines, Centre Point, Ramghat Road, Swarna Jayanti Nagar, GT Road, AMU Campus Environs, Talanagari Industrial Area",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "ayodhya-awadh",
    name: "Ayodhya & Faizabad (Ram Janmabhoomi Corridor)",
    sro: "SRO Ayodhya & SRO Faizabad (Collectorate Compound)",
    address: "Collectorate Administrative Building, Civil Lines, Faizabad/Ayodhya - 224001",
    areas: "Civil Lines, Naya Ghat, Tedhi Bazar, Devkali, Ranopali, Lucknow-Gorakhpur National Highway Enclave, Darshannagar",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Under Article 64 of the Indian Stamp Act (UP Schedule), stamp paper duty is zero rupees.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Will maker",
    detail: "Required for biometric thumbprint check and live webcam photo capture on the IGRSUP portal (igrsup.gov.in).",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original government photo IDs and must not be heirs receiving any assets under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Capacity Certificate (For Seniors)",
    detail: "Issued by a registered MBBS practitioner certifying sound sound mind to protect against future dementia or coercion fights.",
    checked: false,
  },
  {
    id: "item-5",
    label: "IGRSUP Online Appointment Token Slip",
    detail: "Official token confirmation receipt downloaded from igrsup.gov.in showing your selected SRO office time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Development Authority or Property Title Records",
    detail: "Registered lease deeds, tripartite sub-lease agreements, transfer memoranda from Noida, LDA, KDA, GDA, or Khatauni land records.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Recent Color Passport Photographs Each",
    detail: "Clear passport photographs for the Will maker and both witnesses to paste into the official SRO Book III registers.",
    checked: false,
  },
];

export default function UttarPradeshLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("up-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("gautam-buddha-nagar");
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

  const filteredDistricts = UP_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    UP_DISTRICTS.find((d) => d.id === selectedDistrict) || UP_DISTRICTS[0];

  const checkedCount = checklist.filter((i) => i.checked).length;
  const currentActiveToc = TOC_ITEMS.find((item) => item.id === activeId) || TOC_ITEMS[0];

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          HERO SECTION: FULL-WIDTH SPLIT 2-COLUMN (DELHI / PUNE THEME)
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
                <span>UTTAR PRADESH ESTATE SUCCESSION &amp; IGRSUP DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 59 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Uttar Pradesh: Legal Registration
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Draft a legally watertight Will customized for Uttar Pradesh succession laws. 
                Complete support for <strong>IGRSUP portal registration</strong>, 
                <strong>Section 108 UP Revenue Code</strong> farm land bequests, and seamless 
                name change before <strong>Noida, LDA, and KDA</strong> development offices.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200 pt-1">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>Allahabad High Court: Probate Non-Needed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>IGRSUP Token Booking &amp; SRO Check</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>Section 108 UPRC Farm Protection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>Section 31 Doorstep Registry for Elders</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-3">
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="bg-[#C65378] hover:bg-[#a83d5f] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Draft Your Uttar Pradesh Will Online</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <Link
                  href="/services/will-registration"
                  className="border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Book SRO Registration Help</span>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>High Court Lawyer Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Book III Panjikaran Presumption</span>
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
                  src="/images/will-drafting-in-uttar-pradesh.jpg"
                  alt="Online Will Drafting and Registration Services in Uttar Pradesh"
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
                75 Districts
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                All UP Tehsils &amp; SROs
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Plain Paper Signing
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Non-Needed
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Allahabad HC Probate Rule
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 108 UPRC
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Farm Land Bequest
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
                      className={`flex items-center text-xs font-mono tracking-wider uppercase transition-all py-1 ${
                        isActive
                          ? "text-[#C65378] font-bold"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`mr-3 transition-all ${
                          isActive
                            ? "w-5 h-[2px] bg-[#C65378]"
                            : "w-2 h-[1px] bg-slate-300"
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
              EDITORIAL CONTENT COLUMN (MAIN BODY)
              ===================================================================== */}
          <main className="flex-1 min-w-0 space-y-12">

            {/* SECTION 1: UP OVERVIEW */}
            <section
              id="up-overview"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-semibold text-[#C65378] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXECUTIVE SUMMARY</span>
              </div>

              {/* H2: Exactly 49 characters */}
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                Key Highlights: Will Making &amp; Registration in UP
              </h2>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                Drafting a legally binding Will in Uttar Pradesh requires addressing specific legal frameworks. 
                Unlike many other states, Uttar Pradesh combines major urban development corridors (Noida, Greater Noida, 
                YEIDA, Lucknow LDA, Kanpur KDA) with complex rural landholding rules governed by the 
                <strong>Uttar Pradesh Revenue Code, 2006</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Non-Needed Probate Status</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 213 of the Indian Succession Act, probate is not required in Uttar Pradesh. 
                    The Allahabad High Court permits direct name change on genuine registered Wills.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Section 108 UPRC Farmland Succession</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farm land (Bhumidhari rights) follows strict legal lines under Section 108. 
                    A precise Will is essential if you wish to distribute land to daughters or specific heirs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Authority Leasehold Transfers</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Noida, Greater Noida, and LDA assets are leasehold. A registered Will expedites tripartite 
                    sub-lease transfers and name change without civil court delay.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Doorstep SRO Commission</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Senior citizens and unwell testators in UP can request Sub-Registrar home visits 
                    under Section 31 of the Registration Act with an MBBS medical paper.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: LEGAL FRAMEWORK */}
            <section
              id="up-legal-framework"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 1</span>
              </div>

              {/* H2: Exactly 51 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Will Drafting &amp; Succession Laws in Uttar Pradesh
              </h3>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mt-6">
                <p>
                  Testamentary succession in Uttar Pradesh operates across two distinct legal systems: 
                  <strong>non-farm property</strong> governed by personal succession laws, and 
                  <strong>farm farmland</strong> governed by the Uttar Pradesh Revenue Code, 2006.
                </p>

                <h3 className="text-lg font-bold text-slate-900 pt-2">
                  Legal Foundations of a Valid Will in Uttar Pradesh
                </h3>

                <p>
                  Under Section 59 of the Indian Succession Act, 1925, any person of sound mind who is 
                  not a minor can make a Will. For the document to hold legal validity in Uttar Pradesh:
                </p>

                <ul className="space-y-2.5 pl-1">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>
                      <strong>Sound Mind &amp; Free Will:</strong> The Will maker must execute the Will 
                      voluntarily without coercion, fraud, or undue family influence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>
                      <strong>Two Attesting Witnesses (Section 63 ISA):</strong> The Will maker must sign 
                      or affix their thumb impression in the presence of at least two adult witnesses, 
                      who must sign in front of the Will maker.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>
                      <strong>Independent Attestors:</strong> Neither witness can be a heir under 
                      the Will, making sure objectivity and preventing legal disqualification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>
                      <strong>Revocation &amp; Ambiguity Clauses:</strong> The Will must explicitly revoke all 
                      previous Wills and codicils to avoid conflicting testamentary instruments.
                    </span>
                  </li>
                </ul>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3 mt-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Dual Area Notice:</strong> In Uttar Pradesh, home flats, demat accounts, 
                    and shop shops fall under the Indian Succession Act or Hindu Succession Act. However, 
                    rural Bhumidhari farmland is governed exclusively by the UP Revenue Code, 2006. 
                    A standardized generic Will template often overlooks this distinction, leading to rejected 
                    Tehsil name change petitions.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: MANDATORY VS OPTIONAL */}
            <section
              id="mandatory-vs-optional"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 2</span>
              </div>

              {/* H2: Exactly 49 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Will Registration in UP: IGRSUP Rules &amp; Status
              </h3>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mt-6">
                <p>
                  A common inquiry among property owners in Lucknow, Noida, and Kanpur is whether a Will must 
                  be registered at the SRO office to be legally valid.
                </p>

                <p>
                  Under <strong>Section 18(e) of the Registration Act, 1908</strong>, registration of a Will 
                  is optional throughout Uttar Pradesh. An unregistered Will signed on plain white A4 paper 
                  before two witnesses is legally binding. However, estate planning lawyers strongly advise 
                  formal registration on the <strong>IGRSUP portal (igrsup.gov.in)</strong>.
                </p>

                <div className="overflow-x-auto my-6">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3 font-semibold">Key Parameter</th>
                        <th className="p-3 font-semibold">Unregistered Will (Plain Paper)</th>
                        <th className="p-3 font-semibold">Registered Will (IGRSUP Book III)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td className="p-3 font-medium text-slate-900">Legal Validity</td>
                        <td className="p-3 text-slate-700">Valid under Section 63 ISA</td>
                        <td className="p-3 text-slate-700">Valid under Section 63 ISA</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3 font-medium text-slate-900">Proof Value</td>
                        <td className="p-3 text-slate-700">High burden of proof in court</td>
                        <td className="p-3 text-slate-700 font-semibold text-emerald-800">
                          Presumption of genuine signing (Section 114 Evidence Act)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">Loss or Tampering</td>
                        <td className="p-3 text-slate-700">Permanent loss if misplaced</td>
                        <td className="p-3 text-slate-700">Certified copy retrievable from SRO Book III</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3 font-medium text-slate-900">Noida / LDA Name Change</td>
                        <td className="p-3 text-slate-700">Strict scrutiny; indemnity bonds required</td>
                        <td className="p-3 text-slate-700 font-semibold text-emerald-800">
                          Smooth check without civil court references
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">Tehsil Farmland Name Change</td>
                        <td className="p-3 text-slate-700">Frequent fights during Wirasat</td>
                        <td className="p-3 text-slate-700">Immediate recognition in UP Bhulekh records</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  When you register a Will at a UP SRO office, the Will maker and witnesses undergo 
                  biometric thumbprint check and official webcam photography. The SRO preserves a scanned copy 
                  in Book III records. This creates an unshakeable official audit trail that withstands fights 
                  alleging forgery or impersonation.
                </p>
              </div>
            </section>

            {/* SECTION 4: PROBATE RULES */}
            <section
              id="up-probate-rules"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 3</span>
              </div>

              {/* H2: Exactly 53 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Probate in Uttar Pradesh: Allahabad HC Area
              </h3>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mt-6">
                <p>
                  One of the most persistent misconceptions among property buyers and heirs in Uttar Pradesh is that 
                  every Will must get probate from a court before assets can be transferred.
                </p>

                <h3 className="text-lg font-bold text-slate-900 pt-1">
                  Why Probate is Non-Needed in Uttar Pradesh
                </h3>

                <p>
                  Under <strong>Section 213 read with Section 57 of the Indian Succession Act, 1925</strong>, 
                  needed probate applies strictly to Wills made within the historical presidency towns of 
                  <strong>Mumbai, Kolkata, and Chennai</strong>, or to Wills signed outside those limits if 
                  they convey land and flats situated within those presidency limits.
                </p>

                <p>
                  Uttar Pradesh is not a presidency area. The <strong>Allahabad High Court</strong> has 
                  reaffirmed in multiple landmark judgments that probate is non-needed for Hindu, Sikh, Jain, 
                  Buddhist, and Muslim Wills in the State of Uttar Pradesh.
                </p>

                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm text-emerald-900 space-y-2">
                  <div className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Direct Name Change Without Court Probate in UP</span>
                  </div>
                  <p>
                    Because probate is not needed in Uttar Pradesh, your heirs do not need to spend 
                    months or years pursuing High Court probate proceedings. Public offices throughout UP carry 
                    out direct title name change on the strength of a validly registered Will:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-emerald-800 text-xs">
                    <li>Noida Authority, Greater Noida Authority, and YEIDA for leasehold and plotted plots.</li>
                    <li>Lucknow Development Authority (LDA) and Kanpur Development Authority (KDA).</li>
                    <li>UP Housing and Development Board (Awas Vikas / UPHDB).</li>
                    <li>Municipal Corporations (Nagar Nigams) for property tax assessment name updates.</li>
                    <li>Tehsildar Courts under Section 34/35 of UPRC 2006 for UP Bhulekh Khatauni entry.</li>
                  </ul>
                </div>

                <p className="text-xs text-slate-500 italic">
                  Note: While probate is optional, if a relative fights the Will by filing a civil fight, 
                  the executor may petition the District Court or Allahabad High Court for letters of management 
                  or probate to set up exclusive testamentary title.
                </p>
              </div>
            </section>

            {/* SECTION 5: AGRICULTURAL LAND & SECTION 108 UPRC */}
            <section
              id="section-108-farm-succession"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <Building className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 4</span>
              </div>

              {/* H2: Exactly 52 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Section 108 UP Revenue Code: Farm Farmland
              </h3>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mt-6">
                <p>
                  The most crucial legal nuance unique to Uttar Pradesh involves farm landholding. 
                  Under the <strong>Uttar Pradesh Revenue Code, 2006 (UPRC 2006)</strong>, farmland succession 
                  is governed by state agrarian statutes, not by the Hindu Succession Act or personal laws.
                </p>

                <h3 className="text-lg font-bold text-slate-900 pt-1">
                  Without a Will Succession vs Testamentary Bequest under Section 108 &amp; 109
                </h3>

                <p>
                  If an farm landholder (Bhumidhar) dies without a Will (without a Will), their Bhumidhari 
                  rights devolve strictly in the rigid hierarchical order prescribed by <strong>Section 108</strong> 
                  (for male bhumidhars) and <strong>Section 109</strong> (for female bhumidhars):
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                  <div className="font-bold text-[#172228]">Section 108 UPRC Without a Will Hierarchy Order:</div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-slate-700 text-xs">
                    <li>Widow, unmarried daughter, and male lineal descendants in equal shares per stirpes.</li>
                    <li>Mother and father (in default of Class 1 heirs).</li>
                    <li>Married daughter (only if no male descendants, widow, or parents exist).</li>
                    <li>Brother and unmarried sister (in default of the above).</li>
                    <li>Subsequent collateral and distant relatives.</li>
                  </ol>
                </div>

                <p>
                  Notice that married daughters and customized family shares are severely restricted under 
                  without a Will succession. If a farmer or landholder wishes to leave farm land to their 
                  married daughter, a favorite grandson, an adopted child, or an institution, signing a 
                  <strong>valid Will under Section 107 of the UP Revenue Code, 2006</strong> is legally imperative.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100">
                    <span className="font-bold text-sm text-[#C65378] block mb-1">Land Ceiling Protection</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills bequeathing farm land must respect the UP Imposition of Ceiling on Land Holdings 
                      Act, 1960. A bequest cannot be structured to hold land exceeding the maximum legal ceiling.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-sm text-slate-900 block mb-1">UP Bhulekh Name Change</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      After the Will maker passes away, testamentary name change is initiated before the Tehsildar Court 
                      under Section 34/35 of UPRC 2006 to reflect ownership changes in the official Khatauni.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: SRO DIRECTORY */}
            <section
              id="up-sro-directory"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 5</span>
              </div>

              {/* H2: Exactly 55 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Uttar Pradesh SRO Directory: District &amp; Sub-Registrar
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 mb-6">
                Uttar Pradesh operates hundreds of Sub-Registrar Offices administered by the Stamps and 
                Registration Department (IGRSUP). Select or search your local office district below 
                to view registry locations, areas, and operational hours.
              </p>

              {/* SEARCH FILTER */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by district, locality (e.g. Noida, Gomti Nagar, Indirapuram, Civil Lines)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378] transition-all"
                />
              </div>

              {/* DISTRICT TABS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6 max-h-56 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50/50">
                {filteredDistricts.map((dist) => {
                  const isSelected = selectedDistrict === dist.id;
                  return (
                    <button
                      key={dist.id}
                      type="button"
                      onClick={() => setSelectedDistrict(dist.id)}
                      className={`px-3 py-2 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer truncate ${
                        isSelected
                          ? "bg-[#172228] text-white shadow-xs"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                      }`}
                    >
                      {dist.name}
                    </button>
                  );
                })}
              </div>

              {/* ACTIVE SRO CARD */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                      SELECTED REGISTRATION ZONE
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {activeDistrictData.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    IGRSUP Appointment Portal Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Primary Sub-Registrar Offices:</span>
                    <p className="text-slate-700">{activeDistrictData.sro}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Office Address &amp; Complex:</span>
                    <p className="text-slate-700">{activeDistrictData.address}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Key Localities Covered:</span>
                    <p className="text-slate-600">{activeDistrictData.areas}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Public Office Timings:</span>
                    <p className="text-slate-700">{activeDistrictData.timings}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    Need lawyer escort or wheelchair help at this SRO?
                  </span>
                  <Link
                    href="/services/will-registration"
                    className="text-[#C65378] hover:text-[#a83d5f] font-bold inline-flex items-center gap-1"
                  >
                    <span>Book Done-For-You Registration Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 7: REGIONAL COVERAGE */}
            <section
              id="up-regional-coverage"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <Building className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 6</span>
              </div>

              {/* H2: Exactly 52 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Regional Will Drafting Across Uttar Pradesh Cities
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 mb-6">
                Estate succession practices differ between high-rise NCR developments, heritage Awadh assets, 
                and major Purvanchal shop hubs. Here is how our estate legal team tailors Will drafting 
                across Uttar Pradesh:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Noida & Greater Noida */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Will Drafting Services in Noida
                    </h3>
                    <span className="text-[10px] font-mono text-[#C65378] font-bold uppercase">
                      Sector 33 SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Noida and Greater Noida assets are held on 90-year leaseholds from Noida Authority or GNIDA. 
                    Wills must include precise tripartite sublease signing clauses, builder-buyer assignment references, 
                    and maintain clean succession chains to prevent transfer penalty levies by development bodies.
                  </p>
                  <Link
                    href="/locations/noida"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1"
                  >
                    <span>View Noida Location Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Lucknow */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Will Drafting Services in Lucknow
                    </h3>
                    <span className="text-[10px] font-mono text-[#C65378] font-bold uppercase">
                      Kaiserbagh SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lucknow features a blend of LDA freehold/leasehold plots in Gomti Nagar and family assets 
                    in Old Lucknow. Our drafts address Nazul land renewal terms, Awas Vikas allotments, and home 
                    bungalow bequests while preventing family split suits before Civil Courts.
                  </p>
                  <Link
                    href="/locations/lucknow"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1"
                  >
                    <span>View Lucknow Location Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Ghaziabad */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Will Drafting Services in Ghaziabad
                    </h3>
                    <span className="text-[10px] font-mono text-[#C65378] font-bold uppercase">
                      Collectorate SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Covering high-density home societies across Indirapuram, Vaishali, and Vasundhara. 
                    We structure clear apartment succession clauses compliant with the UP Apartment (Promotion of 
                    Construction, Ownership &amp; Maintenance) Act, 2010.
                  </p>
                  <Link
                    href="/locations/ghaziabad"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1"
                  >
                    <span>View Ghaziabad Location Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Kanpur Nagar */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Will Drafting Services in Kanpur
                    </h3>
                    <span className="text-[10px] font-mono text-[#C65378] font-bold uppercase">
                      Civil Lines SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kanpur boasts extensive leather manufacturing units, textile wholesale dealerships, and KDA plots. 
                    Wills incorporate business succession planning, partnership equity bequeathals, and shop 
                    property devolution alongside personal bank assets.
                  </p>
                  <Link
                    href="/locations/kanpur"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1"
                  >
                    <span>View Kanpur Location Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Varanasi */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Will Drafting Services in Varanasi
                    </h3>
                    <span className="text-[10px] font-mono text-[#C65378] font-bold uppercase">
                      Kutchery SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Succession planning for multi-generational family homes near the Ghats, Banarasi saree 
                    weaving businesses, and newly developed VDA plotted projects along the Babatpur corridor.
                  </p>
                  <Link
                    href="/locations/varanasi"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1"
                  >
                    <span>View Varanasi Location Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Agra */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Will Drafting Services in Agra
                    </h3>
                    <span className="text-[10px] font-mono text-[#C65378] font-bold uppercase">
                      MG Road SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Full succession support across Braj tourism enterprises, footwear manufacturing and export units, 
                    and home colonies in Dayalbagh, Kamla Nagar, and Sanjay Place.
                  </p>
                  <Link
                    href="/locations/agra"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1"
                  >
                    <span>View Agra Location Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Prayagraj */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Will Drafting Services in Prayagraj
                    </h3>
                    <span className="text-[10px] font-mono text-[#C65378] font-bold uppercase">
                      High Court Seat
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tailored estate planning for civil lines assets, legal professional chambers, and PDA 
                    home layouts near the Principal Bench of the Allahabad High Court.
                  </p>
                  <Link
                    href="/locations/prayagraj"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1"
                  >
                    <span>View Prayagraj Location Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Meerut */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Will Drafting Services in Meerut
                    </h3>
                    <span className="text-[10px] font-mono text-[#C65378] font-bold uppercase">
                      Collectorate SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Succession planning across Western UP farm sugar-belt farmland under Section 108 UPRC, 
                    industrial establishments in Partapur, and MDA home zones in Shastri Nagar.
                  </p>
                  <Link
                    href="/locations/meerut"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] pt-1"
                  >
                    <span>View Meerut Location Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP */}
            <section
              id="step-by-step-up-sop"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <FileText className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 7</span>
              </div>

              {/* H2: Exactly 49 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Step-by-Step SOP: Will Drafting to Registration
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 mb-6">
                Creating an enforceable Will in Uttar Pradesh is simple when following our verified 
                five-step step:
              </p>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Step 1: Asset Listing &amp; Heir Apportionment
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Catalog all movable and immovable assets: development authority flats, independent houses, 
                      Bhumidhari farm plots (with Khasra / Khatauni numbers), bank fixed deposits, 
                      and demat holdings. Designate heirs and assign shares clearly.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Step 2: Legal Drafting with Legal Clauses
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Draft the Will incorporating essential legal safeguards: complete revocation of prior 
                      instruments, executor appointment, survivorship clauses, and specific Section 108 UPRC 
                      compliance for farm parcels.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Step 3: Attestation Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Print the Will on plain A4 sheets. Sign each page in the physical presence of two independent 
                      adult witnesses who are not heirs. The witnesses sign right away after the Will maker.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Step 4: IGRSUP Portal Slot Booking
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Log into the Stamps and Registration Department portal (igrsup.gov.in). Generate the form 
                      token for Book III registration, enter Aadhaar details, select your local Tehsil Sub-Registrar 
                      Office, and reserve an appointment time.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Step 5: Biometric Check &amp; Registration at SRO
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Visit the SRO office with your two witnesses and original Aadhaar credentials. 
                      The Sub-Registrar records biometric thumb impressions, captures live webcam photographs, 
                      and delivers the registered Will endorsed under Book III.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: DOORSTEP SRO REGISTRATION */}
            <section
              id="doorstep-home-registration"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <Home className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 8</span>
              </div>

              {/* H2: Exactly 44 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Section 31 Doorstep SRO Registration in UP
              </h3>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mt-6">
                <p>
                  Senior citizens, hospitalized people, and bedridden testators often find it physically 
                  challenging to navigate crowded Sub-Registrar compounds and Kutchery premises across Uttar Pradesh.
                </p>

                <p>
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the law provides a compassionate 
                  doorstep registration protocol. The Sub-Registrar or a designated Registration Officer can visit 
                  the Will maker&apos;s private residence, nursing home, or hospital room to conduct official registration.
                </p>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Required Protocol for Home Visits in Uttar Pradesh:
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#C65378]">•</span>
                      <span>
                        <strong>MBBS Doctor Certificate:</strong> A registered medical practitioner must issue a 
                        paper on their official letterhead stating that the Will maker is medically unable to 
                        travel, while simultaneously certifying sound testamentary mental capacity.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#C65378]">•</span>
                      <span>
                        <strong>Formal Written Form:</strong> An form citing Section 31 is filed 
                        before the jurisdictional Sub-Registrar along with the doctor&apos;s paper.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#C65378]">•</span>
                      <span>
                        <strong>Nominal Visit Commission Fee:</strong> A legal government commissioner fee is 
                        deposited at the SRO treasury to cover conveyance and official deputation.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#C65378]">•</span>
                      <span>
                        <strong>Portable Biometric Kit:</strong> The Sub-Registrar attends the residence with a portable 
                        biometric kit, captures live fingerprints, verifies witness identities, and completes Book III registration.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 10: DOCUMENTS CHECKLIST */}
            <section
              id="documents-checklist"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 9</span>
              </div>

              {/* H2: Exactly 53 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Needed Document Checklist for Uttar Pradesh Wills
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 mb-6">
                Use this interactive pre-registration checklist to verify your documents before booking your 
                IGRSUP slot or attending the SRO office:
              </p>

              <div className="space-y-3 mb-6">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      item.checked
                        ? "bg-rose-50/40 border-rose-200 shadow-2xs"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        item.checked
                          ? "bg-[#C65378] text-white"
                          : "border-2 border-slate-300 bg-white"
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {item.label}
                        </span>
                        {item.checked && (
                          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider shrink-0">
                            VERIFIED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Readiness Score:</span>
                  <span className="font-extrabold text-[#C65378]">
                    {checkedCount} of {checklist.length} Documents Ready
                  </span>
                </div>
                <Link
                  href="/tools/will-checklist"
                  className="text-slate-700 hover:text-slate-900 font-bold inline-flex items-center gap-1.5"
                >
                  <span>Download Complete Asset Checklist Tool</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 11: PROPERTY TYPES */}
            <section
              id="up-property-types"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <Building className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 10</span>
              </div>

              {/* H2: Exactly 52 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Estate Asset Split: Authority Flats &amp; Land
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 mb-6">
                A robust Uttar Pradesh Will must be structured to accommodate varying property classifications:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Noida &amp; YEIDA Leasehold Plots / Flats</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Allotted on long-term lease. Requires clear designation of leasehold title succession. 
                    A registered Will avoids hefty transfer charges and facilitates tripartite sub-lease 
                    endorsement from Noida, Greater Noida, and YEIDA offices.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>Freehold Urban Home Houses</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Freehold bungalows and builder floors in Lucknow, Kanpur, Ghaziabad, and Agra. 
                    Direct name change before Municipal Corporations (Nagar Nigam) for property tax 
                    records without succession paper delays.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Bhumidhari Farm Farmland</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governed strictly by Section 108 of the UP Revenue Code, 2006. Enables landholders 
                    to bequeath farm acreage to chosen daughters, younger children, or third parties, 
                    followed by revenue name change in UP Bhulekh Khatauni records.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#C65378]" />
                    <span>Bank FDs, Mutual Funds &amp; Demat Portfolios</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Indian law, bank and demat nominees act merely as trustees. A Will establishes true 
                    beneficial ownership, preventing bitter legal fights between named nominees and legal heirs.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: REGISTRATION FEES */}
            <section
              id="up-registration-fees"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <Stamp className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 11</span>
              </div>

              {/* H2: Exactly 52 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Registration Charges &amp; Stamp Duty in Uttar Pradesh
              </h3>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mt-6">
                <p>
                  Many citizens fear that registering a Will in Uttar Pradesh incurs high ad-valorem stamp duty 
                  similar to sale deeds or gift deeds (which reach 5% to 7% of property circle rate). 
                  <strong>This is entirely incorrect.</strong>
                </p>

                <div className="overflow-x-auto my-4">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3 font-semibold">Government Fee Head</th>
                        <th className="p-3 font-semibold">Official Charge in Uttar Pradesh</th>
                        <th className="p-3 font-semibold">Legal Rule</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td className="p-3 font-medium text-slate-900">Stamp Duty on Will Document</td>
                        <td className="p-3 font-extrabold text-emerald-700">₹0 (Zero Stamp Duty)</td>
                        <td className="p-3 text-slate-600">Indian Stamp Act (UP Schedule) - Plain paper valid</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3 font-medium text-slate-900">SRO Book III Registration Fee</td>
                        <td className="p-3 text-slate-900 font-bold">₹100 (Flat Fee)</td>
                        <td className="p-3 text-slate-600">UP Registration Rules Table of Fees</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">IGRSUP Computer Processing Fee</td>
                        <td className="p-3 text-slate-900 font-bold">Approx. ₹100 - ₹200</td>
                        <td className="p-3 text-slate-600">Biometric scanner &amp; digital photo capture charge</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3 font-medium text-slate-900">Doorstep Visit Commission (Sec 31)</td>
                        <td className="p-3 text-slate-900 font-bold">Prescribed SRO Fee + Conveyance</td>
                        <td className="p-3 text-slate-600">Applicable only for elderly / medical home visits</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-slate-500">
                  Because stamp duty is zero, creating and registering your Will is the single most cost-effective 
                  legal safeguard you can put in place to protect your family&apos;s real estate legacy.
                </p>
              </div>
            </section>

            {/* SECTION 13: TRANSPARENT PRICING */}
            <section
              id="service-pricing"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                <span>SECTION 12</span>
              </div>

              {/* H2: Exactly 50 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Transparent Pricing: Uttar Pradesh Will Packages
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 mb-6">
                Transparent legal drafting and registration support tailored for families across Uttar Pradesh:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plan 1 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                      ONLINE WILL DRAFT
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">Standard UP Will</h3>
                    <div className="mt-4 mb-6">
                      <span className="text-3xl font-extrabold text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500 block mt-1">One-time payment • Instant PDF</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Interactive 15-minute online questionnaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>UP-compliant legal format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Standard revocation &amp; executor clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant download with signing guide</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 font-bold text-xs text-slate-900 transition-colors text-center cursor-pointer"
                  >
                    Draft Online Now
                  </button>
                </div>

                {/* Plan 2: Highlighted */}
                <div className="p-6 rounded-2xl bg-[#172228] text-white border-2 border-[#C65378] shadow-xl flex flex-col justify-between relative">
                  <div className="absolute -top-3 right-6 bg-[#C65378] text-white text-[10px] font-mono uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-xs">
                    MOST POPULAR
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300 font-bold block mb-1">
                      LAWYER CONSULTATION
                    </span>
                    <h3 className="text-xl font-extrabold text-white">Lawyer Reviewed</h3>
                    <div className="mt-4 mb-6">
                      <span className="text-3xl font-extrabold text-white">₹4,990</span>
                      <span className="text-xs text-slate-400 block mt-1">Lawyer talk included</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>1-on-1 talk with High Court lawyer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>Section 108 UPRC farm review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>Noida / LDA authority clause drafting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <span>Doctor capacity paper format</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="tel:+918700343611"
                    className="w-full py-2.5 rounded-xl bg-[#C65378] hover:bg-[#a83d5f] font-bold text-xs text-white transition-colors text-center"
                  >
                    Consult Estate Lawyer
                  </a>
                </div>

                {/* Plan 3 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                      FULL REGISTRY ASSISTANCE
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">Done-For-You SRO</h3>
                    <div className="mt-4 mb-6">
                      <span className="text-3xl font-extrabold text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500 block mt-1">Lawyer accompaniment at SRO</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Custom lawyer drafting &amp; check</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>IGRSUP online slot booking &amp; challan payment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Physical lawyer presence at UP SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit help for elders</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/services/will-registration"
                    className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 font-bold text-xs text-slate-900 transition-colors text-center"
                  >
                    Book SRO Help
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQS */}
            <section
              id="frequently-asked-questions"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <HelpCircle className="w-3.5 h-3.5 text-[#C65378]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>

              {/* H2: Exactly 47 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions: Will Drafting in UP
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 mb-6">
                Find clear answers to common questions regarding Will drafting, IGRSUP registration, 
                and property succession across Uttar Pradesh:
              </p>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
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
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section
              id="statutory-citations"
              className="scroll-target bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(23,34,40,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
                <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                <span>LEGAL PRECEDENTS</span>
              </div>

              {/* H2: Exactly 47 characters */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Legal Citations &amp; Legal Precedents in UP
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 mb-6">
                Authoritative legal foundations governing testamentary succession and registration across Uttar Pradesh:
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Uttar Pradesh Revenue Code, 2006 (UPRC 2006)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 107 (bequest by bhumidhar), Section 108 (general order of succession for male bhumidhars), 
                    Section 109 (succession to female bhumidhars), and Section 34/35 (testamentary name change step before Tehsildar courts).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Registration Act, 1908 (Act No. 16 of 1908)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 18(e) (optional registration of wills), Section 31 (registration or acceptance for deposit 
                    at private residence on special cause shown), and Section 51 (maintenance of official Book III records).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Indian Succession Act, 1925 (Act No. 39 of 1925)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Section 59 (sound mind), Section 63 (needed signing rules and two independent witnesses), 
                    and Section 213 read with Section 57 (probate exemption for Uttar Pradesh areas).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Allahabad High Court Landmark Rulings on Testamentary Probate
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Consistent rulings confirming that probate is non-needed in Uttar Pradesh. Rights under a valid 
                    Will can be established in revenue and civil proceedings without prior grant of probate or letters of management.
                  </p>
                </div>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION BLUEPRINT MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden p-4 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-900">
                Visual Blueprint: Uttar Pradesh Will Drafting &amp; SRO Registration Architecture
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
                src="/images/will-drafting-in-uttar-pradesh.jpg"
                alt="High Resolution Visual Blueprint: Uttar Pradesh Will Drafting and IGRSUP Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                sizes="(max-width: 1200px) 95vw, 1000px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
