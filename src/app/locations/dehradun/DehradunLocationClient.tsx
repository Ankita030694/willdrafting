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
  { id: "dehradun-overview", label: "OVERVIEW" },
  { id: "dehradun-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "dehradun-probate-guidance", label: "PROBATE & HIGH COURT" },
  { id: "dehradun-sro-directory", label: "SRO DIRECTORY" },
  { id: "dehradun-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-dehradun-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "dehradun-property-types", label: "PROPERTY TYPES" },
  { id: "dehradun-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const DEHRADUN_SROS = [
  {
    id: "sadar-1",
    name: "Dehradun Sadar I (Collectorate)",
    sro: "SRO Dehradun Sadar I (District Court / Collectorate)",
    address: "District Collectorate Compound, Near Gandhi Park, Rajpur Road, Dehradun - 248001",
    areas: "Rajpur Road, Astley Hall, Clock Tower (Ghanta Ghar), Paltan Bazar, Dalanwala, Subhash Road, Karanpur, Hathibarkala, Cross Road, EC Road",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "sadar-2",
    name: "Dehradun Sadar II (Transport Nagar)",
    sro: "SRO Dehradun Sadar II (Administrative Annex)",
    address: "Administrative Complex, Transport Nagar, Phase-1, Near ISBT, Saharanpur Road, Dehradun - 248002",
    areas: "Patel Nagar, GMS Road, Majra, Saharanpur Road, Niranjanpur Mandi, Transport Nagar, ISBT Corridor, Turner Road, Subhash Nagar, Kargi Road",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "vasant-vihar-prem-nagar",
    name: "Vasant Vihar & Prem Nagar (Western Doon)",
    sro: "SRO Western Dehradun & Prem Nagar",
    address: "Tehsil Sadar Sub-Office, Near Chakrata Road Administrative Annex, Prem Nagar, Dehradun - 248007",
    areas: "Vasant Vihar, Anurag Chowk, Kaulagarh, FRI Campus, Prem Nagar, IMA Corridor, Chakrata Road, Clement Town Cantt, Garhi Cantt, Panditwari",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "sahastradhara-jakhan",
    name: "Sahastradhara & Jakhan (Northern Belt)",
    sro: "SRO Sahastradhara & Jakhan Sub-Division",
    address: "Tehsil Sadar Registry Wing, Near IT Park, Sahastradhara Road, Dehradun - 248013",
    areas: "Jakhan, Rajpur, Sahastradhara Road, Canal Road, Old Mussoorie Road, Sinola, Kulhan, Tarla Nagal, IT Park, Gujrara Mansingh",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "doiwala-airport",
    name: "Doiwala & Jolly Grant (Airport Corridor)",
    sro: "SRO Doiwala (Tehsil Complex)",
    address: "Tehsil Doiwala Administrative Campus, Near Doiwala Sugar Mill, Haridwar Highway, Doiwala - 248140",
    areas: "Doiwala, Haridwar Bypass, Jolly Grant Airport Zone, Bhaniwala, Ranipokhari, Thano Road, Balawala, Miyawala, Harrawala",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "rishikesh",
    name: "Rishikesh (Ganga Valley Sub-Division)",
    sro: "SRO Rishikesh (Tehsil Campus)",
    address: "Tehsil Rishikesh Campus, Railway Road, Near Triveni Ghat, Rishikesh, Dehradun - 249201",
    areas: "Rishikesh Town, Muni Ki Reti, Tapovan, Dhalwala, Shyampur, Gumaniwala, Virbhadra (IDPL), Pashulok, Bapu Gram",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "mussoorie",
    name: "Mussoorie (Queen of the Hills)",
    sro: "SRO Mussoorie (Tehsil Compound)",
    address: "Tehsil Mussoorie Administrative Block, The Mall Road, Near Library Chowk, Mussoorie - 248179",
    areas: "The Mall Road, Kulri Bazar, Library Bazar, Landour Cantt, Barlowganj, Jharipani, Kempty Fall Road, Hathipaon, Bhatta Village",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "vikasnagar-herbertpur",
    name: "Vikasnagar & Herbertpur (Western Valley)",
    sro: "SRO Vikasnagar & Chakrata Foothills",
    address: "Tehsil Vikasnagar Complex, Chakrata National Highway, Vikasnagar, Dehradun - 248198",
    areas: "Vikasnagar, Herbertpur, Dakpatthar, Sahaspur, Selaqui Industrial Zone, Langha Road, Jiwangarh, Kalsi Foothills",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Under the Indian Stamp Act in Uttarakhand, stamp paper is zero rupees.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Will maker",
    detail: "Needed for biometric thumbprint scanning and live webcam photo capture on the Uttarakhand e-Prerna portal.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Attesting Witnesses",
    detail: "Must be adults of sound mind who are not heirs or spouses of heirs under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Original KYC Documents for Both Witnesses",
    detail: "Aadhaar Card, Voter ID, or Passport copies for both witnesses to satisfy Sub-Registrar identity check.",
    checked: true,
  },
  {
    id: "item-5",
    label: "Registered MBBS Doctor Sound Mind Note",
    detail: "Recommended for testators aged 60 and above, confirming sound disposing state of mind and sound mind.",
    checked: false,
  },
  {
    id: "item-6",
    label: "MDDA Allotment Deeds & Revenue Khatauni Records",
    detail: "Copies of sale deeds, MDDA allotment papers, cantonment leases, or Bhulekh Khatauni for accurate property schedules.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Confirmed Uttarakhand e-Prerna Appointment Slip",
    detail: "Digital appointment token downloaded from the Uttarakhand registration portal with official fee receipt.",
    checked: false,
  },
];

export default function DehradunLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("dehradun-overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedSro, setSelectedSro] = useState<string>("sadar-1");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [showHighResModal, setShowHighResModal] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of TOC_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const filteredSros = DEHRADUN_SROS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeSroData =
    DEHRADUN_SROS.find((d) => d.id === selectedSro) || DEHRADUN_SROS[0];

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
                <span>DEHRADUN &amp; DOON VALLEY ESTATE DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 57 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Dehradun: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your home, MDDA plots, and army pensions across Dehradun. Get expert lawyer help, easy online registration, and home visits for elderly parents.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Dehradun Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#dehradun-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Dehradun SRO Directory</span>
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
                  <span>₹0 Stamp Duty in UK</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Non-Needed Probate</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE (5 COLS) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div
                onClick={() => setShowHighResModal(true)}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#172228] cursor-pointer group"
              >
                <Image
                  src="/images/will-drafting-in-dehradun.jpg"
                  alt="Will Drafting in Dehradun Online Legal Guide"
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
                Dehradun District
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
                Section 213 UK Exemption
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31 Visit
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Home SRO Registration
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN LAYOUT CONTAINER WITH STICKY TABLE OF CONTENTS
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* DESKTOP STICKY SIDEBAR (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#55636D] mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>ON THIS PAGE</span>
                <span className="text-[#C65378] text-[10px] bg-rose-50 px-2 py-0.5 rounded-full font-bold">14 SECTIONS</span>
              </div>
              <nav className="space-y-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-lg text-xs transition-all ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-4 border-[#C65378]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
                  <div className="font-bold text-slate-800">Need Quick Legal Help?</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Speak directly with a senior estate lawyer in Dehradun.
                  </p>
                </div>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="block w-full py-2.5 px-4 text-center rounded-xl bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-all shadow-sm"
                >
                  Start My Will Draft
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN EDITORIAL CONTENT (9 COLS) */}
          <main className="lg:col-span-9 space-y-12 sm:space-y-16">

            {/* MOBILE FLOATING TOC CHIP */}
            <div className="lg:hidden sticky top-20 z-30 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <FileText className="w-3.5 h-3.5 text-[#C65378]" />
                <span className="truncate max-w-[200px]">{currentActiveToc.label}</span>
              </div>
              <a
                href="#dehradun-sro-directory"
                className="text-xs font-bold text-[#C65378] hover:underline"
              >
                Jump to SROs
              </a>
            </div>

            {/* -------------------------------------------------------------------
                SECTION 0: OVERVIEW & KEY HIGHLIGHTS
                ------------------------------------------------------------------- */}
            <section id="dehradun-overview" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DEHRADUN LEGAL ESTATE SUMMARY</span>
                </div>

                {/* H2 #1: Length 49 chars decoded, 53 chars raw */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Probate in Dehradun
                </h2>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Dehradun is the capital of Uttarakhand. It sits in the peaceful Doon Valley. Many army veterans and families live here. Making a Will prevents family fights. It also ensures smooth transfer of your property.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-[#C65378]">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">No Needed Probate</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills in Dehradun do not need court probate under Section 213. This saves you months of court visits.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Stamp className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">Zero State Stamp Duty</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      In Uttarakhand, registering a Will has zero stamp duty. You pay only a nominal government fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">Defense Estate Protection</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Protect your army housing flats, provident funds, and pension gains with clear legal terms.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Uttarakhand Land Purchase Restrictions:</span> Section 154 limits outsider land purchases. However, inheriting land through a Will is protected by law. A registered Will keeps family farms and orchards safe.
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 1: LEGAL FRAMEWORK FOR WILL DRAFTING
                ------------------------------------------------------------------- */}
            <section id="dehradun-legal-framework" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>INDIAN SUCCESSION ACT &amp; UTTARAKHAND PRACTICE</span>
                </div>

                {/* H2 #2: Length 47 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Legal Framework for Will Drafting in Dehradun
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Will drafting in Dehradun follows the Indian Succession Act, 1925. Section 2(h) defines a Will. It is a legal declaration of your wishes for your property after death. Any adult of sound mind can make a valid Will. You can bequeath your homes, plots, savings, and personal assets.
                </p>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  To make a legally binding Will in Dehradun, you must meet the rules of Section 63:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-slate-700">
                      <strong>Will maker Signature:</strong> You must sign or place your thumbprint on every page of your Will. This proves you approve the text.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-slate-700">
                      <strong>Two Adult Witnesses:</strong> Two independent witnesses must watch you sign the Will. They must also sign in your presence.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-slate-700">
                      <strong>No Heir Witnesses:</strong> Under Section 67, a witness cannot be a heir. Their spouse also cannot be a heir. If a witness receives a gift, that gift becomes void.
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  In Uttarakhand, succession to family farmland connects with state land reforms. Our legal team drafts your Will so city flats, bank funds, and farmland match state revenue rules.
                </p>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 2: MANDATORY VS OPTIONAL REGISTRATION
                ------------------------------------------------------------------- */}
            <section id="mandatory-vs-optional" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <Stamp className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>REGISTRATION ACT, 1908 ANALYSIS</span>
                </div>

                {/* H2 #3: Length 46 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Needed in Dehradun?
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Many people in Dehradun ask if Will registration is needed. Under Section 18(e) of the Registration Act, 1908, registration is optional in India. A Will written on plain paper is legally valid if properly signed and witnessed.
                </p>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Even so, lawyers strongly recommend registering your Will. Here is why registration gives you peace of mind:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Official Book III Record</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Registration saves a permanent copy in government Book III. Nobody can steal, hide, or destroy the document.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Biometric Proof</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar takes fingerprints and webcam photos. This stops false claims of fraud or forged signatures.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Faster MDDA Name Change</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      MDDA and Nagar Nigam process property transfers faster with a registered Will. This avoids court delays.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Legal Presumption</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Courts trust official government records. A registered Will shifts the burden of proof to anyone contesting it.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 3: UTTARAKHAND PROBATE RULES
                ------------------------------------------------------------------- */}
            <section id="dehradun-probate-guidance" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <Award className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>HIGH COURT OF UTTARAKHAND AT NAINITAL</span>
                </div>

                {/* H2 #4: Length 50 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Uttarakhand Probate Rules: Section 213 Exemption
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Probate is a court order certifying that a Will is genuine. Under Section 213 and Section 57 of the Indian Succession Act, probate is needed only in Mumbai, Kolkata, and Chennai. These are the historical presidency towns.
                </p>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Dehradun lies outside presidency areas. For that reason, court probate is strictly optional in Uttarakhand. The Supreme Court confirmed this in Clarence Pais v. Union of India. You save substantial time and high court fees.
                </p>

                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                  <div className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Direct Property Transfer Without Probate</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    Heirs in Dehradun can transfer property directly. You only need the registered Will, death paper, and heir affidavit. You do not need to file long court petitions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-2">
                  <div className="font-bold text-slate-900">When Might an Uttarakhand Court Probate Be Desirable?</div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                    <li>If surviving class-I legal heirs actively contest the Will alleging undue influence, coercion, or fraud.</li>
                    <li>If the Will maker owned high-value assets situated in Mumbai, Kolkata, or Chennai where local municipal bodies mandate probate under Section 213.</li>
                    <li>When dealing with complex overseas assets or foreign bank accounts requiring an ancillary grant of probate through the High Court.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 4: SRO DIRECTORY & SEARCH
                ------------------------------------------------------------------- */}
            <section id="dehradun-sro-directory" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold">
                  <Building className="w-3.5 h-3.5" />
                  <span>REGISTRATION &amp; STAMPS DEPARTMENT UTTARAKHAND</span>
                </div>

                {/* H2 #5: Length 48 chars decoded, 52 chars raw */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Dehradun SRO office Directory &amp; SROs
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Dehradun has several registry offices. You can register your Will at any local office where you live. Search for your area below:
                </p>

                {/* SEARCH INPUT */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by area (e.g., Rajpur Road, Dalanwala, Vasant Vihar, Doiwala, Rishikesh)..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]/30 focus:border-[#C65378]"
                  />
                </div>

                {/* SRO SELECTOR BUTTONS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {filteredSros.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedSro(item.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left truncate ${
                        selectedSro === item.id
                          ? "bg-[#172228] text-white shadow-sm"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                {/* ACTIVE SRO DETAIL CARD */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-rose-50/30 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#C65378]">JURISDICTIONAL SRO</span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">{activeSroData.sro}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-semibold text-slate-700 border border-slate-200">
                      <Building className="w-3.5 h-3.5 text-emerald-600" />
                      e-Prerna Enabled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Office Address</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{activeSroData.address}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5 text-[#5F7E75]" />
                        <span>Key Localities &amp; Colonies Covered</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{activeSroData.areas}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200/60 text-xs text-slate-500">
                    <div>
                      <span className="font-semibold text-slate-700">Office Timings:</span> {activeSroData.timings}
                    </div>
                    <a
                      href="https://registration.uk.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#C65378] font-bold hover:underline"
                    >
                      <span>UK IGR e-Prerna Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 5: AREA-WISE WILL DRAFTING SERVICES
                ------------------------------------------------------------------- */}
            <section id="dehradun-area-coverage" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <MapPin className="w-4 h-4 text-[#C65378]" />
                    <span>LOCAL AREA COVERAGE &amp; ASSET NUANCES</span>
                  </div>
                  {/* H2 #6: Length 50 chars */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    5. Area-Wise Will Drafting Services Across Dehradun
                  </h3>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                    Estate assets in Dehradun span heritage colonial bungalows along Rajpur Road and Dalanwala, institutional residences in Vasant Vihar, defense estates in Clement Town and Garhi Cantt, modern high-rises along Sahastradhara Road, and farm farmhouses in Doiwala. Our estate lawyers deliver customized legal drafting, Uttarakhand e-Prerna slot scheduling, and Sub-Registrar accompaniment across all key micro-markets:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* AREA 1: RAJPUR ROAD & DALANWALA */}
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          Prime Heritage / Colonial
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          SRO Dehradun Sadar 1
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        Will Drafting Services in Rajpur Road &amp; Dalanwala
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rajpur Road</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dalanwala</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Astley Hall</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">EC Road</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Cross Road</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We draft <strong>Wills for colonial bungalows</strong>, litchi estates, and prime plots in Dalanwala. We mark exact boundary lines and private driveways. This keeps family property safe from fights.
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>SRO Hub: District Court Compound, Rajpur Road</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          e-Prerna online slot booking, senior lawyer physical accompaniment, and Book III registration.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">₹0 Stamp Duty · ₹100 Govt Fee</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label="Will Drafting Services in Dalanwala and Rajpur Road"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Draft Rajpur Road Will</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* AREA 2: VASANT VIHAR & KAULAGARH */}
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          Institutional / Officers Belt
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          SRO Western Dehradun
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        Will Drafting Services in Vasant Vihar &amp; Kaulagarh
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Vasant Vihar</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kaulagarh</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Anurag Chowk</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">FRI Campus</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Panditwari</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We prepare custom <strong>Wills in Vasant Vihar</strong> for retired civil officers, forestry scientists, and doctors. We include smooth MDDA plot transfers and central civil pensions. We also secure life-interest rights for surviving spouses.
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>SRO Hub: Chakrata Road Office Annex</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Expedited biometric scanning, senior lawyer vetting, and Section 31 doorstep signing for elderly testators.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Home &amp; MDDA Plots</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label="Will Drafting Services in Vasant Vihar"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Draft Vasant Vihar Will</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* AREA 3: CLEMENT TOWN & GARHI CANTONMENT */}
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          Armed Forces &amp; Cantonment
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          SRO Western &amp; Cantt
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        Will Drafting Services in Clement Town &amp; Garhi Cantt
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Clement Town</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Garhi Cantt</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Prem Nagar</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">IMA Corridor</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Subhash Nagar</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We provide dedicated <strong>defense personnel Will drafting</strong> for retired Army, Navy, and Air Force veterans. We safely allocate AWHO flats, DSOP funds, and cantonment lease rights to your chosen heirs.
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>SRO Hub: Prem Nagar &amp; Western Sub-Division</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Defense pension nomination harmonization, AWHO society bylaws coordination, and doorstep registration.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Defense &amp; Cantonment Units</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label="Will Drafting Services in Clement Town and Garhi Cantt"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Draft Cantonment Will</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* AREA 4: SAHASTRADHARA ROAD & JAKHAN */}
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          North Foothills / Luxury
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          SRO Sahastradhara Wing
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        Will Drafting Services in Sahastradhara Road &amp; Jakhan
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sahastradhara Road</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jakhan</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Canal Road</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">IT Park</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Sinola</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We draft modern <strong>Wills on Sahastradhara Road</strong> for luxury apartments, foothill villas, and tech leaders. We outline flat shares, parking spaces, and mutual fund distributions.
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>SRO Hub: IT Park Tehsil Sadar Registry Wing</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Online token booking, biometric check, and cooperative apartment share transfer support.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">High-Rise Flats &amp; Villas</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label="Will Drafting Services on Sahastradhara Road"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Draft Sahastradhara Will</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* AREA 5: PATEL NAGAR & GMS ROAD */}
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          Shop &amp; Business Hub
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          SRO Dehradun Sadar 2
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        Will Drafting Services in Patel Nagar &amp; GMS Road
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Patel Nagar</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">GMS Road</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Majra</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Saharanpur Road</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Transport Nagar</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We assist business owners, traders, and families with <strong>shop estate succession</strong>. We protect shop freeholds, partnership shares, warehouse leases, and business bank accounts.
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>SRO Hub: Transport Nagar Phase-1, Saharanpur Road</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Shop title check, Book III Will registration, and municipal trade name change support.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Shop &amp; Home</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label="Will Drafting Services in Patel Nagar and GMS Road"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Draft GMS Road Will</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* AREA 6: DOIWALA & JOLLY GRANT */}
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          Airport Belt / Farm
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          SRO Doiwala Tehsil
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        Will Drafting Services in Doiwala &amp; Jolly Grant
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Doiwala</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Jolly Grant</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Bhaniwala</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Ranipokhari</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Haridwar Bypass</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We handle <strong>farm and farmhouse succession</strong> across Doiwala and the airport corridor. Our Wills match state land records and protect family farm plots.
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>SRO Hub: Tehsil Doiwala Campus, Haridwar Highway</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Revenue Khatauni name change guidance, zero stamp duty filing, and Tehsildar representation.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Farmland &amp; Airport Plots</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label="Will Drafting Services in Doiwala and Jolly Grant"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Draft Doiwala Will</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* AREA 7: RISHIKESH & TAPOVAN */}
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          Spiritual &amp; Ganga Valley
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          SRO Rishikesh Tehsil
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        Will Drafting Services in Rishikesh &amp; Tapovan
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Rishikesh Town</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Tapovan</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Muni Ki Reti</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Dhalwala</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Virbhadra</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We assist families with home homes, guest houses, and retreat assets in Rishikesh. We include trust gifts, life-interest rights, and bank account bequests.
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>SRO Hub: Tehsil Rishikesh Campus, Railway Road</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          e-Prerna slot booking, Ganga valley property name change, and senior citizen home visit coordination.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Home &amp; Retreats</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label="Will Drafting Services in Rishikesh and Tapovan"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Draft Rishikesh Will</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* AREA 8: MUSSOORIE & LANDOUR */}
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          Heritage Hill Estates
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          SRO Mussoorie Tehsil
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        Will Drafting Services in Mussoorie &amp; Landour
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">The Mall Road</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Kulri Bazar</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Library Bazar</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Landour Cantt</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">Barlowganj</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We draft specialized <strong>Wills in Mussoorie and Landour</strong> for historic hill cottages, homestays, and mountain estates. We secure complex lease deeds, municipal records, and private access roads.
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>SRO Hub: Tehsil Mussoorie Office Block</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Heritage lease transfer, Cantonment Board Landour coordination, and Book III registration.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Heritage Hill Estates</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label="Will Drafting Services in Mussoorie and Landour"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Draft Mussoorie Will</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 6: STEP-BY-STEP SOP
                ------------------------------------------------------------------- */}
            <section id="step-by-step-dehradun-sop" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>5-STEP EXECUTION PROTOCOL</span>
                </div>

                {/* H2 #7: Length 48 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step Will Registration in Uttarakhand
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Registering your Will in Dehradun is simple with the Uttarakhand e-Prerna portal. Follow these five clear steps:
                </p>

                <div className="space-y-4">
                  {/* STEP 1 */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">List Your Assets and Heirs</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Make a list of your homes, bank accounts, funds, and land. Choose your heirs and a trusted executor.
                      </p>
                    </div>
                  </div>

                  {/* STEP 2 */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Lawyer Drafts the Will</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Our senior lawyers draft your Will. We include non-presidency clauses, specific gifts, and executor powers.
                      </p>
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      3
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Sign with Two Witnesses</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Print the Will on plain white paper. Sign each page before two independent adult witnesses.
                      </p>
                    </div>
                  </div>

                  {/* STEP 4 */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      4
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Book Slot on e-Prerna</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Book your appointment online on the state portal. Pay the flat fee of one hundred rupees.
                      </p>
                    </div>
                  </div>

                  {/* STEP 5 */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      5
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Visit the SRO office</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Visit the SRO with your witnesses and Aadhaar cards. Complete fingerprint scanning and receive your registered Will.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 7: DOORSTEP HOME REGISTRATION (SECTION 31)
                ------------------------------------------------------------------- */}
            <section id="doorstep-home-registration" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold">
                  <Home className="w-3.5 h-3.5" />
                  <span>REGISTRATION ACT SECTION 31 SPECIAL PROVISION</span>
                </div>

                {/* H2 #8: Length 48 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Doorstep Will Registration for Senior Citizens
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Many elderly people in Dehradun cannot visit government offices easily. Under Section 31, the registrar can visit your home or hospital room.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C65378]" />
                      <span>Doctor Medical Certificate</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A simple note from an MBBS doctor confirms the Will maker cannot travel easily, while being of sound mind.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Stamp className="w-4 h-4 text-emerald-600" />
                      <span>Official Commission Challan</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pay the state outdoor visit fee through the Uttarakhand treasury portal.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>Portable Biometric Kit</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The officer visits your home with a portable device. They record thumbprints and take photos right in your room.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#5F7E75]" />
                      <span>Comfortable Signing</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You can execute your Will from the comfort of your home in Dalanwala, Vasant Vihar, or Rajpur.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 8: DOCUMENTS CHECKLIST
                ------------------------------------------------------------------- */}
            <section id="documents-checklist" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>INTERACTIVE READINESS TOOL</span>
                </div>

                {/* H2 #9: Length 46 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Documents Checklist for Dehradun Will Making
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Keep these papers ready before you make your Will. Check off each item to see your progress:
                </p>

                {/* CHECKLIST COMPONENT */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-2 border-b border-slate-100">
                    <span>DOCUMENT READINESS</span>
                    <span className="text-[#C65378]">
                      {checkedCount} of {checklist.length} Completed
                    </span>
                  </div>

                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/50 border-[#C65378]/30"
                          : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/60"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                          item.checked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs sm:text-sm font-bold text-slate-900">{item.label}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 9: DEHRADUN REAL ESTATE & PROPERTY TYPES
                ------------------------------------------------------------------- */}
            <section id="dehradun-property-types" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <Home className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>ASSET CLASSIFICATIONS &amp; LAND LAWS</span>
                </div>

                {/* H2 #10: Length 50 chars decoded, 54 chars raw */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Dehradun Real Estate: MDDA Plots &amp; Hill Estates
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Real estate in Dehradun includes different types of property. Each category requires clear words in your Will:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ASSET TYPE 1 */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#C65378]" />
                      <span>MDDA Allotted Plots &amp; Housing Schemes</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Homes in MDDA schemes need exact allotment numbers. A registered Will allows direct lease transfer without civil court cases.
                    </p>
                  </div>

                  {/* ASSET TYPE 2 */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Home className="w-4 h-4 text-[#5F7E75]" />
                      <span>Colonial Kothis &amp; Freehold Estates</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Colonial houses in Dalanwala have old title papers. A good Will marks boundaries and utility meters with care.
                    </p>
                  </div>

                  {/* ASSET TYPE 3 */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Defence Housing Units (AWHO &amp; AFNHB)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      AWHO and air force flats have society forms. Society nominee entries give custody, but your Will gives true ownership.
                    </p>
                  </div>

                  {/* ASSET TYPE 4 */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-blue-600" />
                      <span>Farm Lands &amp; Litchi Orchards</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Farms and orchards in Doon Valley follow state land laws. Succession through a Will is protected from outsider land buy curbs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 10: REGISTRATION CHARGES & ZERO STAMP DUTY
                ------------------------------------------------------------------- */}
            <section id="dehradun-registration-fees" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                  <Stamp className="w-3.5 h-3.5" />
                  <span>TRANSPARENT STATUTORY FEES</span>
                </div>

                {/* H2 #11: Length 52 chars decoded, 56 chars raw */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Official Stamp Duty &amp; Registration Fees: Dehradun
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Making a Will in Uttarakhand is very cost-effective. You pay zero stamp duty to the state government. You only pay small user fees at the SRO office.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 font-extrabold">
                        <th className="p-3 border border-slate-200">Legal Fee Component</th>
                        <th className="p-3 border border-slate-200">Applicable Charge (Uttarakhand)</th>
                        <th className="p-3 border border-slate-200">Legal Authority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">Uttarakhand Stamp Duty</td>
                        <td className="p-3 border border-slate-200 text-emerald-700 font-extrabold">₹0 (Completely Exempt)</td>
                        <td className="p-3 border border-slate-200">Indian Stamp Act (Article 64 Exemption)</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">SRO Book III Registration Fee</td>
                        <td className="p-3 border border-slate-200 font-bold">₹100 (Flat legal fee)</td>
                        <td className="p-3 border border-slate-200">Uttarakhand Registration Rules</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">Biometric &amp; Scanning Charges</td>
                        <td className="p-3 border border-slate-200 font-bold">Approx. ₹100 - ₹200</td>
                        <td className="p-3 border border-slate-200">e-Prerna Digital Document Charges</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">Section 31 Home Visit Commission</td>
                        <td className="p-3 border border-slate-200 font-bold">Official Treasury Commission</td>
                        <td className="p-3 border border-slate-200">Section 31 &amp; 33 Registration Act</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  Note: Official fees go directly to the state portal. Lawyer talk fees are billed separately.
                </p>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 11: PLANS & PRICING
                ------------------------------------------------------------------- */}
            <section id="service-pricing" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>TRANSPARENT LEGAL PACKAGES</span>
                </div>

                {/* H2 #12: Length 42 chars decoded, 46 chars raw */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Will Packages &amp; Legal Fees
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Pick the right legal plan for your family in Dehradun:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* TIER 1 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 flex flex-col justify-between shadow-2xs">
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">ESSENTIAL WILL</span>
                      <div className="text-2xl font-extrabold text-slate-900">₹1,990</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Best for basic estates. Covers flat transfer, bank savings, and simple shares.
                      </p>
                      <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Standard Legal Will Template</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Non-Presidency Probate Clarity</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Immediate PDF &amp; Word Download</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>DIY Signing Instructions</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="block w-full py-2.5 px-4 text-center rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all"
                    >
                      Choose Essential
                    </a>
                  </div>

                  {/* TIER 2: FEATURED */}
                  <div className="rounded-2xl border-2 border-[#C65378] bg-white p-6 space-y-4 flex flex-col justify-between shadow-lg relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C65378] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full">
                      MOST POPULAR IN DEHRADUN
                    </div>
                    <div className="space-y-3 pt-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#C65378]">ADVOCATE ASSISTED</span>
                      <div className="text-2xl font-extrabold text-slate-900">₹4,990</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Includes phone talk with a senior lawyer. We review MDDA terms and family clauses.
                      </p>
                      <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Senior Lawyer 1-on-1 Talk</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Custom MDDA &amp; Orchard Clauses</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Defense Pension &amp; AWHO Review</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Two Rounds of Draft Revisions</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="block w-full py-2.5 px-4 text-center rounded-xl bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-all shadow-md shadow-[#C65378]/25"
                    >
                      Choose Lawyer Draft
                    </a>
                  </div>

                  {/* TIER 3 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 flex flex-col justify-between shadow-2xs">
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">COMPLETE SRO REGISTRATION</span>
                      <div className="text-2xl font-extrabold text-slate-900">₹9,990</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Complete help from draft to office visit. Includes slot booking and lawyer escort at the SRO.
                      </p>
                      <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Complete Lawyer Will Drafting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>e-Prerna Slot &amp; Token Booking</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Lawyer Escort at Dehradun SRO</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Section 31 Doorstep Coordination</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="block w-full py-2.5 px-4 text-center rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all"
                    >
                      Choose Complete SRO
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 12: FREQUENTLY ASKED QUESTIONS
                ------------------------------------------------------------------- */}
            <section id="frequently-asked-questions" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <HelpCircle className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>COMMON QUESTIONS ANSWERED</span>
                </div>

                {/* H2 #13: Length 45 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Frequently Asked Questions: Dehradun Wills
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Here are quick answers to common questions about drafting and registering a Will in Dehradun:
                </p>

                <div className="space-y-3">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-200/80 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
                        >
                          <span className="font-extrabold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                              isOpen ? "rotate-180 text-[#C65378]" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-4 sm:p-5 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                            <p>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------------
                SECTION 13: STATUTORY REFERENCES & LEGAL CITATIONS
                ------------------------------------------------------------------- */}
            <section id="statutory-citations" className="scroll-mt-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>STATUTORY CITATIONS &amp; CASE LAW</span>
                </div>

                {/* H2 #14: Length 48 chars decoded, 52 chars raw */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Legal References &amp; Uttarakhand IGR Rules
                </h3>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Every Will from WillDrafting follows Indian law and key Supreme Court judgments:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                    <div className="font-bold text-slate-900">Indian Succession Act, 1925</div>
                    <p className="text-slate-600 leading-relaxed">
                      Section 63 explains how to sign and witness a Will. Section 213 confirms that court probate is not needed in Uttarakhand.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                    <div className="font-bold text-slate-900">Registration Act, 1908</div>
                    <p className="text-slate-600 leading-relaxed">
                      Section 18(e) makes Will registration optional. Section 31 allows the Sub-Registrar to visit homes of senior testators.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                    <div className="font-bold text-slate-900">Clarence Pais v. Union of India (2001)</div>
                    <p className="text-slate-600 leading-relaxed">
                      The Supreme Court ruled that probate is optional in non-presidency states. You do not need court probate to claim assets in Dehradun.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                    <div className="font-bold text-slate-900">Indrani Wahi v. Registrar of Co-op Societies</div>
                    <p className="text-slate-600 leading-relaxed">
                      The Supreme Court ruled that a nominee is only a temporary trustee. True ownership passes to the heirs named in your Will.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    WillDrafting is powered by senior lawyers from AMA Legal Solutions.
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#a13c5d] transition-all shadow-md shadow-[#C65378]/20"
                  >
                    <span>Begin Your Dehradun Will</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RES GRAPHIC MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          onClick={() => setShowHighResModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#172228] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="relative w-full aspect-video">
              <Image
                src="/images/will-drafting-in-dehradun.jpg"
                alt="Will Drafting in Dehradun High Resolution Infographic"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <div className="p-4 bg-[#172228] border-t border-white/10 flex items-center justify-between text-white text-xs">
              <span>Will Drafting &amp; Registration Guide - Dehradun, Uttarakhand</span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
