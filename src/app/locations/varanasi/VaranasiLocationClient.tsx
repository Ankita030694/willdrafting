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
  ExternalLink,
  Info,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "varanasi-overview", label: "OVERVIEW" },
  { id: "varanasi-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "varanasi-probate-rules", label: "PROBATE RULES" },
  { id: "vda-property-succession", label: "VDA & HAVELIS" },
  { id: "up-revenue-code-108", label: "FARMLAND RULES" },
  { id: "varanasi-sro-directory", label: "SRO DIRECTORY" },
  { id: "varanasi-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-varanasi-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "varanasi-property-types", label: "PROPERTY TYPES" },
  { id: "varanasi-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const VARANASI_DISTRICTS = [
  {
    id: "sadar",
    name: "Varanasi Sadar (Kutchery / Collectorate)",
    sro: "SRO Varanasi Sadar I & II",
    address: "Kutchery Compound, Near District Court & Collectorate, Circuit House Road, Varanasi - 221002",
    areas: "Cantt, Orderly Bazar, Civil Lines, Nadesar, Raja Bazar, Teliyabag, Lahartara, Maldahiya, Vidyapeeth, Sigra North",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "bhelupur",
    name: "Bhelupur (South Varanasi & Ghats)",
    sro: "SRO Bhelupur",
    address: "Durgakund Road, Near Bhelupur Police Station, Bhelupur, Varanasi - 221010",
    areas: "Bhelupur, Assi Ghat, Durgakund, Lanka, Banaras Hindu University (BHU), Sigra, Mahmoorganj, Gurubagh, Sonarpura, Madanpura, Shivala, Kedar Ghat",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "shivpur",
    name: "Shivpur (North Varanasi & Sarnath)",
    sro: "SRO Shivpur",
    address: "Shivpur Main Road, Near Shivpur Railway Station, Varanasi - 221003",
    areas: "Shivpur, Pandeypur, Gilat Bazar, Tarna, Bhojubir, Sarnath, Ashapur, Lalpur, Paharia, Chitaipur",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "pindra",
    name: "Pindra (Airport Belt & Rural Tehsil)",
    sro: "SRO Pindra",
    address: "Tehsil Administrative Complex, Pindra, Varanasi - 221206",
    areas: "Pindra, Babatpur (Lal Bahadur Shastri Airport Belt), Phulpur, Sindhora, Baragaon, Mangari, Karoma, Karkhiyaon Industrial Area",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "rajatalab",
    name: "Raja Talab (Rohania & Western Suburbs)",
    sro: "SRO Raja Talab",
    address: "Tehsil Administrative Complex, Raja Talab, GT Road, Varanasi - 221311",
    areas: "Raja Talab, Rohania, Mohan Serai, Manduadih, Mirzamurad, Sevapuri, Gangapur, DLW / BLW Township",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const VARANASI_NEIGHBORHOODS = [
  {
    id: "bhelupur-mahmoorganj",
    corridor: "Prime South / Commercial",
    sroBadge: "SRO Bhelupur",
    title: "Will Drafting Services in Bhelupur & Mahmoorganj",
    tags: ["Bhelupur", "Mahmoorganj", "Gurubagh", "Rathyatra", "Kakarmatta"],
    description:
      "Specialized Will drafting services in Bhelupur and Mahmoorganj for premium independent kothis, VDA approved apartments, doctors' clinics, and commercial retail showrooms. Includes clauses for mutual fund transmissions, family jewel allocations, and clear life-interest provisions for surviving spouses.",
    sroHub: "SRO Hub: Durgakund Road, Near Bhelupur Police Station",
    sroDetail:
      "Direct IGRSUP token scheduling, advocate accompaniment at SRO Bhelupur, and Section 31 doorstep execution for senior citizens.",
    feeInfo: "₹0 Stamp Duty · ₹100 Govt Fee",
    ctaText: "Draft Bhelupur Will",
  },
  {
    id: "assi-ghat-lanka",
    corridor: "Heritage Ghats & Academic Hub",
    sroBadge: "SRO Bhelupur",
    title: "Will Drafting Services in Assi Ghat & Lanka",
    tags: ["Assi Ghat", "Lanka", "BHU Campus Belt", "Durgakund", "Nagwa", "Ravindrapuri"],
    description:
      "Customized Will drafting services in Assi Ghat and Lanka for ancestral riverside homes, professors' residences, guest houses, and private libraries near Banaras Hindu University. Codifies undivided ancestral shares, copyright bequests for published works, and smooth bank locker transmissions.",
    sroHub: "SRO Hub: Durgakund Road / Assi Sub-District",
    sroDetail:
      "Ancestral haveli asset mapping, coparcenary share verification, and expedited Book III registration.",
    feeInfo: "Heritage & Residential",
    ctaText: "Draft Assi Ghat Will",
  },
  {
    id: "sigra-maldahiya",
    corridor: "Central Business Corridor",
    sroBadge: "SRO Sadar & Bhelupur",
    title: "Will Drafting Services in Sigra & Maldahiya",
    tags: ["Sigra", "Maldahiya", "Vidyapeeth Road", "Sajan Cinema Belt", "Englisia Line"],
    description:
      "Specialized Will drafting services in Sigra and Maldahiya for high-value commercial establishments, multi-story shopping complexes, and VDA residential layouts. Formulates business succession structures for trading partnerships and designates specific executive powers to prevent business disruption.",
    sroHub: "SRO Hub: Kutchery Compound & Durgakund Road",
    sroDetail:
      "Commercial asset schedule audit, GST business capital succession, and Sub-Registrar biometric filing.",
    feeInfo: "Commercial & Plotted Homes",
    ctaText: "Draft Sigra Will",
  },
  {
    id: "chowk-godowlia",
    corridor: "Ancient Kashi & Handloom Textiles",
    sroBadge: "SRO Varanasi Sadar",
    title: "Will Drafting Services in Chowk & Godowlia",
    tags: ["Chowk", "Godowlia", "Dashashwamedh", "Thatheri Bazaar", "Vishwanath Gali"],
    description:
      "Comprehensive Will drafting services in Chowk and Godowlia for multi-generational Banarasi silk sari businesses, Chowk wholesale inventory, trade trademarks, and centuries-old ancestral havelis along narrow galis. Demarcates floor-wise living rights and eliminates bitter partition lawsuits among heirs.",
    sroHub: "SRO Hub: Collectorate Compound, Circuit House Road",
    sroDetail:
      "Ancestral title chain review, Nagar Nigam mutation assistance, and certified Book III filing.",
    feeInfo: "Handloom Trade & Havelis",
    ctaText: "Draft Chowk Will",
  },
  {
    id: "shivpur-sarnath",
    corridor: "North Varanasi Growth Corridor",
    sroBadge: "SRO Shivpur",
    title: "Will Drafting Services in Shivpur & Sarnath",
    tags: ["Shivpur", "Pandeypur", "Sarnath", "Ashapur", "Bhojubir", "Gilat Bazar"],
    description:
      "Dedicated Will drafting services in Shivpur and Sarnath for newly developed VDA housing schemes, independent villas, hospitality properties, and residential floors. Structures seamless property title mutation before the Varanasi Development Authority without court succession delays.",
    sroHub: "SRO Hub: Shivpur Main Road, Near Railway Station",
    sroDetail:
      "IGRSUP e-appointment booking, biometric identity capture, and advocate physical escort.",
    feeInfo: "VDA Plots & Hospitality",
    ctaText: "Draft Shivpur Will",
  },
  {
    id: "cantt-orderly-bazar",
    corridor: "Civil Lines & Institutional Hub",
    sroBadge: "SRO Varanasi Sadar (Kutchery)",
    title: "Will Drafting Services in Cantt & Orderly Bazar",
    tags: ["Cantonment", "Orderly Bazar", "Nadesar", "Civil Lines", "Raja Bazar", "Teliyabag"],
    description:
      "Custom Will drafting services in Cantt and Orderly Bazar for retired defense personnel, civil servants, corporate executives, and healthcare professionals. Incorporates doctor mental fitness certificates, executor designations, and clear distribution of demat securities and bank fixed deposits.",
    sroHub: "SRO Hub: District Court & Collectorate Compound",
    sroDetail:
      "Priority senior citizen token processing, comprehensive legal vetting, and Section 31 home execution.",
    feeInfo: "Senior Citizens & Defense Estates",
    ctaText: "Draft Cantt Will",
  },
  {
    id: "pindra-babatpur",
    corridor: "Airport Corridor & Agricultural Tehsil",
    sroBadge: "SRO Pindra",
    title: "Will Drafting Services in Pindra & Babatpur",
    tags: ["Pindra", "Babatpur Airport Belt", "Phulpur", "Karkhiyaon Industrial Area", "Sindhora"],
    description:
      "Specialized Will drafting services in Pindra and Babatpur for Bhumidhari agricultural holdings, roadside highway plots, logistics warehouses, and industrial units along the airport corridor. Fully compliant with Sections 107 and 108 of the Uttar Pradesh Revenue Code, 2006.",
    sroHub: "SRO Hub: Tehsil Administrative Complex, Pindra",
    sroDetail:
      "UP Bhulekh Khatauni synchronization, land ceiling compliance, and Tehsildar mutation filings.",
    feeInfo: "Farmland & Highway Logistics",
    ctaText: "Draft Pindra Will",
  },
  {
    id: "rajatalab-rohania",
    corridor: "Western Suburbs & BLW Township",
    sroBadge: "SRO Raja Talab",
    title: "Will Drafting Services in Raja Talab & Rohania",
    tags: ["Raja Talab", "Rohania", "Manduadih", "DLW / BLW Township", "Mohan Serai", "Sevapuri"],
    description:
      "Dedicated Will drafting services in Raja Talab and Rohania for railway township personnel, peri-urban farmhouses, commercial godowns on GT Road, and plotted developments. Provides clear legal mechanisms for multi-property inheritance and smooth municipal mutation.",
    sroHub: "SRO Hub: Tehsil Complex Raja Talab, GT Road",
    sroDetail:
      "Biometric registration, revenue record mapping, and doorstep legal execution support.",
    feeInfo: "Plotted Schemes & Rail Township",
    ctaText: "Draft Rohania Will",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will",
    detail: "Printed clearly on standard white A4 sheets. No expensive judicial stamp paper is needed under UP law.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of Testator",
    detail: "Required for biometric identity verification and digital photograph capture at the Varanasi SRO office.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Witnesses must carry original photo IDs and must not be beneficiaries receiving property in the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Fitness Certificate (For Seniors)",
    detail: "Signed by an MBBS doctor. Confirms sound testamentary capacity and protects against future legal challenges.",
    checked: false,
  },
  {
    id: "item-5",
    label: "UP IGRSUP Online Appointment Token Slip",
    detail: "Official token downloaded from igrsup.gov.in showing the scheduled date, time, and SRO counter.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Property Chain Documents (VDA / Registry / Khatauni)",
    detail: "Copies of VDA allotment letters, registered sale deeds, or Nagar Nigam house tax receipts for accurate asset details.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Passport-Sized Photographs Each",
    detail: "Recent color passport photographs of the testator and both witnesses for pasting on official Book III records.",
    checked: false,
  },
];

export default function VaranasiLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("varanasi-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("sadar");
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

  const filteredNeighborhoods = VARANASI_NEIGHBORHOODS.filter(
    (n) =>
      searchFilter === "" ||
      n.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      n.corridor.toLowerCase().includes(searchFilter.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase())) ||
      n.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    VARANASI_DISTRICTS.find((d) => d.id === selectedDistrict) || VARANASI_DISTRICTS[0];

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
                <span>VARANASI &amp; KASHI ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 54 characters */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Varanasi: Online Legal help
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your VDA plots, ancestral ghat havelis, and handloom business assets in Kashi.
                Get expert advocate drafting, UP IGRSUP e-registration guidance, and doorstep execution for senior citizens across Varanasi.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Varanasi Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#varanasi-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Varanasi SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Allahabad HC Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>₹0 UP Stamp Duty</span>
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
                  src="/images/will-drafting-in-varanasi.jpg"
                  alt="Online Will Drafting and Property Protection in Varanasi Uttar Pradesh"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
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
                5 SRO Offices
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Varanasi SRO Coverage
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                100% Stamp Exempt in UP
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Optional Probate
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Allahabad HC Jurisdiction
              </span>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Section 31
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Doorstep SRO Registration
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
              className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${mobileTocOpen ? "rotate-180 text-[#C65378]" : ""
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
                    className={`block px-3 py-2 rounded-xl text-xs font-semibold transition-all ${isActive
                        ? "bg-[#C65378] text-white"
                        : "text-slate-700 hover:bg-[#FAF7F0] hover:text-[#C65378]"
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN BODY LAYOUT (2-COLUMN DESKTOP: STICKY TOC LEFT + CONTENT RIGHT)
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: DESKTOP STICKY TOC & CONVERSION WIDGETS (4 COLS) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            {/* TABLE OF CONTENTS CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <Landmark className="w-4 h-4 text-[#C65378]" />
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                  VARANASI SUCCESSION GUIDE
                </div>
              </div>
              <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
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
                      className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${isActive
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "text-slate-600 hover:bg-[#FAF7F0] hover:text-[#C65378]"
                        }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <ArrowRight
                        className={`w-3 h-3 transition-transform ${isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* QUICK CTA CARD */}
            <div className="bg-[#172228] text-white rounded-3xl p-6 border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C65378]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#C65378]/25 text-[#C65378] text-[11px] font-mono font-bold uppercase tracking-wider">
                  KASHI LEGAL DESK
                </span>
                <div className="text-base font-extrabold text-white leading-snug">
                  Protect Your Varanasi Family Legacy
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Draft an undisputed legal Will online. Avoid bitter partition suits over VDA plots or ancestral havelis.
                </p>
                <div className="pt-1">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-all cursor-pointer shadow-md"
                  >
                    <span>Start Online Will (₹1,990)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: 16 SUBSTANTIVE SECTIONS (8 COLS) */}
          <div className="lg:col-span-8 space-y-12">
            {/* =========================================================================
                SECTION 1: OVERVIEW
                ========================================================================= */}
            <section
              id="varanasi-overview"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>ESTATE SUCCESSION IN PURVANCHAL</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                1. Overview: Will Drafting &amp; Asset Protection in Varanasi
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Varanasi is the cultural and spiritual capital of India. Property succession in Kashi carries deep sentimental and financial weight. Families own ancient havelis along the sacred Ganga ghats, modern apartments developed by the Varanasi Development Authority (VDA), and thriving silk handloom trading businesses in Chowk.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Passing away without a Will (intestate) triggers severe legal headaches in Uttar Pradesh. Under the Hindu Succession Act, 1956, your estate splits equally among Class-I legal heirs. In dense joint families, this often sparks partition suits that linger in civil courts for decades. A clear, lawyer-drafted Will protects your family harmony.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
                    Ghat Havelis
                  </h4>
                  <p className="text-xs text-slate-600">
                    Avoid partition battles over joint family homes in Chowk, Assi, and Dashashwamedh.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
                    VDA Plot Mutation
                  </h4>
                  <p className="text-xs text-slate-600">
                    Registered Wills ensure direct title transfer with Varanasi Development Authority.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
                    Handloom Trade
                  </h4>
                  <p className="text-xs text-slate-600">
                    Smooth succession for Banarasi saree firms, inventory, and trade bank accounts.
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 2: LEGAL FRAMEWORK
                ========================================================================= */}
            <section
              id="varanasi-legal-framework"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STATUTORY COMPLIANCE</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                2. UP Legal Framework: Will Validity &amp; Stamp Duty Relief
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Will making in Varanasi is governed by the Indian Succession Act, 1925, and the Registration Act, 1908. To be legally binding in Uttar Pradesh, your Will must fulfill four fundamental statutory requirements:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F0]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-slate-900 block">
                      Testamentary Capacity (Section 59, Indian Succession Act)
                    </strong>
                    <span className="text-xs text-slate-600">
                      The testator must be a major (18+ years) of sound disposing mind, free from undue coercion, fraud, or intoxication.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F0]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-slate-900 block">
                      Written Instrument &amp; Testator Signature (Section 63)
                    </strong>
                    <span className="text-xs text-slate-600">
                      The document must be in writing. The testator must sign or affix their thumb impression on every single page.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F0]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-slate-900 block">
                      Two Independent Witnesses (Attestation Clause)
                    </strong>
                    <span className="text-xs text-slate-600">
                      Two witnesses must see the testator sign and must sign in the presence of each other. Witnesses cannot be beneficiaries.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F0]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-slate-900 block">
                      Zero Stamp Duty Under Indian Stamp Act Schedule I-B
                    </strong>
                    <span className="text-xs text-slate-600">
                      Wills are 100% exempt from stamp duty in Uttar Pradesh. You do not need expensive non-judicial stamp papers.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 3: MANDATORY VS OPTIONAL REGISTRATION
                ========================================================================= */}
            <section
              id="mandatory-vs-optional"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <Stamp className="w-4 h-4" />
                <span>REGISTRATION PROVISIONS</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                3. Will Registration: Mandatory vs Optional Under UP Law
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Uttar Pradesh. An unregistered Will signed on plain white paper before two witnesses is legally valid. However, in Varanasi, registering your Will at the local Sub-Registrar Office (SRO) provides immense legal security.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#FAF7F0] text-slate-800">
                      <th className="p-3 font-extrabold">Feature</th>
                      <th className="p-3 font-extrabold">Unregistered Will</th>
                      <th className="p-3 font-extrabold text-[#C65378]">Registered Will (IGRSUP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold">Legal Validity</td>
                      <td className="p-3">Valid under Section 63 ISA</td>
                      <td className="p-3 font-bold text-emerald-700">Presumed authentic by courts</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Tamper Protection</td>
                      <td className="p-3 text-rose-600">Vulnerable to theft or loss</td>
                      <td className="p-3 text-emerald-700">Permanent digital record in Book III</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">VDA Mutation</td>
                      <td className="p-3">Public notices &amp; indemnity bonds</td>
                      <td className="p-3 font-bold text-emerald-700">Direct expedited substitution</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Court Challenge Risk</td>
                      <td className="p-3">High risk of mental capacity disputes</td>
                      <td className="p-3 text-emerald-700">Official SRO biometric verification</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Govt Registration Fee</td>
                      <td className="p-3">₹0</td>
                      <td className="p-3">Only ₹100 nominal fee on IGRSUP</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Why Register in Varanasi?</strong> Property values around Sigra, Bhelupur, and the riverfront have grown rapidly. A registered Will drastically reduces litigation risks from distant relatives challenging the authenticity of the testament.
                </p>
              </div>
            </section>

            {/* =========================================================================
                SECTION 4: ALLAHABAD HC PROBATE RULES
                ========================================================================= */}
            <section
              id="varanasi-probate-rules"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>JUDICIAL PRECEDENT</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                4. Allahabad High Court Probate Rules: Exemption in UP
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Many Varanasi residents worry whether they must obtain court probate before inheriting properties. A probate is a court-certified copy of a Will issued under the seal of a competent civil court.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory <strong>only in the presidency towns of Mumbai, Kolkata, and Chennai</strong>. Varanasi is a non-presidency town governed by the Allahabad High Court.
              </p>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#172228]">
                  Allahabad High Court Position on Probate
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The Allahabad High Court has repeatedly held that obtaining probate is optional for Hindu, Buddhist, Sikh, and Jain Wills executed in Uttar Pradesh. Beneficiaries do not need to spend months or pay steep court fees in District Court Varanasi to establish ownership.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Banks, VDA, and Nagar Nigam mutate titles without requiring a probate decree.</span>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 5: VDA & ANCESTRAL HAVELI SUCCESSION
                ========================================================================= */}
            <section
              id="vda-property-succession"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <Home className="w-4 h-4" />
                <span>LOCAL ASSET PLANNING</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                5. VDA Property Mutation &amp; Ancestral Haveli Succession
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Estate succession in Varanasi involves two distinct categories of immovable assets: modern urban development authority plots and ancient heritage properties.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>VDA Plot &amp; Flat Transfer</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Varanasi Development Authority (VDA) requires specific procedural documentation for mutation. A registered Will along with the original allotment letter, death certificate, and NOC from other legal heirs allows fast substitution in VDA records.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                    <li>Schemes in Sigra, Shivpur, and Pandeypur</li>
                    <li>Nagar Nigam house tax record mutation</li>
                    <li>Avoids costly succession certificate suits</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Ancestral Ghat Havelis &amp; Kothis</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Centuries-old havelis along Assi, Dashashwamedh, and Chowk often have complex coparcenary lineages. Under Hindu law, a testator can bequeath their separate property or their undivided coparcenary share.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                    <li>Clear demarcation of floors and rooms</li>
                    <li>Life-interest protection for elderly widows</li>
                    <li>Prevents external strangers entering joint property</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 6: UP REVENUE CODE FARMLAND
                ========================================================================= */}
            <section
              id="up-revenue-code-108"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>AGRICULTURAL SUCCESSION</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                6. UP Revenue Code 2006: Farmland Bequests in Varanasi
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Many Varanasi families own agricultural or peri-urban farmland in Pindra, Rohania, Sevapuri, Harahua, or near the Lal Bahadur Shastri International Airport belt. Succession for agricultural land in Uttar Pradesh is governed specifically by the <strong>Uttar Pradesh Revenue Code, 2006</strong>, and not by personal succession laws.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    Section 107: Right to Bequeath Farmland by Will
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 107 of the UP Revenue Code, 2006, any Bhumidhar with transferable rights can bequeath their agricultural holding or share through a Will. However, a Bhumidhar with non-transferable rights or an Asami cannot bequeath land by Will.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    Section 108 &amp; 109: Order of Succession &amp; Ceilings
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If an individual dies without a Will, agricultural land passes strictly according to the statutory hierarchy under Section 108. Drafting a registered Will allows you to allocate farmland to specific daughters, sons, or family members while adhering to statutory land ceiling limits.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    UP Bhulekh Portal &amp; Khatauni Mutation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Following the testator&apos;s death, the beneficiary files an online mutation application before the local Tehsildar (Pindra or Sadar). The registered Will ensures smooth entry into the official revenue Khatauni records.
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 7: SRO DIRECTORY
                ========================================================================= */}
            <section
              id="varanasi-sro-directory"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>SUB-REGISTRAR JURISDICTIONS</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                7. Varanasi SRO Directory: Kutchery, Bhelupur &amp; Shivpur
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Varanasi district is divided into multiple Sub-Registrar Offices under the Stamps and Registration Department, Uttar Pradesh (IGRSUP). Select an office below to inspect jurisdictions and address details:
              </p>

              {/* SRO TABS */}
              <div className="flex flex-wrap gap-2 pt-1">
                {VARANASI_DISTRICTS.map((dist) => (
                  <button
                    key={dist.id}
                    onClick={() => setSelectedDistrict(dist.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedDistrict === dist.id
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-[#FAF7F0] text-slate-700 hover:bg-slate-200/70"
                      }`}
                  >
                    {dist.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* ACTIVE SRO CARD */}
              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                      OFFICIAL SRO DETAILS
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {activeDistrictData.sro}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    IGRSUP Token Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Address:</span>
                    <span className="text-slate-600">{activeDistrictData.address}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Operating Timings:</span>
                    <span className="text-slate-600">{activeDistrictData.timings}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900 text-xs block mb-1">
                    Areas Covered:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeDistrictData.areas}
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 8: NEIGHBORHOODS COVERAGE (RICH MICRO-MARKET CARDS)
                ========================================================================= */}
            <section id="varanasi-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL AREA COVERAGE &amp; ASSET NUANCES</span>
                </div>

                {/* H2 <= 70 chars, No Em-Dashes */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  8. Varanasi Neighborhoods: Full Estate Planning Reach
                </h2>

                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate assets in Varanasi span sacred riverfront havelis along the Ganga ghats, modern VDA residential colonies in Sigra and Shivpur, prime commercial showrooms in Mahmoorganj, wholesale handloom trading houses in Chowk, and agricultural land holdings across Pindra and Raja Talab. Our estate advocates deliver customized legal drafting, UP IGRSUP token scheduling, and Sub-Registrar accompaniment across all key micro-markets:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search localities (e.g. Bhelupur, Sigra, Sarnath, Assi, Chowk)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-800 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/30"
                />
              </div>

              {/* 2-COLUMN GRID OF LOCAL AREA CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredNeighborhoods.map((area) => (
                  <div
                    key={area.id}
                    className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          {area.corridor}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {area.sroBadge}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        {area.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        {area.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {area.description}
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>{area.sroHub}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {area.sroDetail}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">{area.feeInfo}</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label={area.title}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>{area.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* =========================================================================
                SECTION 9: 5-STEP SOP
                ========================================================================= */}
            <section
              id="step-by-step-varanasi-sop"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STEP-BY-STEP PROTOCOL</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                9. Step-by-Step SOP: Drafting to Registration in Kashi
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Follow our 5-step Standard Operating Procedure (SOP) to draft and register your Will securely in Varanasi:
              </p>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <span className="w-7 h-7 rounded-full bg-[#C65378] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      Asset &amp; Family Audit
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Compile complete property details including VDA allotment records, sale deeds, Nagar Nigam house tax receipts, bank account numbers, mutual fund folios, and gold jewelry. Clearly specify beneficiaries and appoint a trusted executor.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <span className="w-7 h-7 rounded-full bg-[#C65378] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      Lawyer-Vetted Will Drafting
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Use our online platform or consult our senior estate lawyers. We insert essential legal clauses including sound mind declaration, previous Will revocation, life-interest rights, survivorship clauses, and explicit asset schedules.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <span className="w-7 h-7 rounded-full bg-[#C65378] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      Execution &amp; Attestation by Two Witnesses
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print the finalized Will on clean white A4 sheets. Sign or place your thumb impression at the bottom of each page in the presence of two independent adult witnesses who sign as attesting witnesses.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <span className="w-7 h-7 rounded-full bg-[#C65378] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      UP IGRSUP Token Booking
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Book an e-appointment token on the UP Stamps &amp; Registration Department portal (igrsup.gov.in). Select your Varanasi SRO (Kutchery Sadar, Bhelupur, Shivpur, or Pindra) and pay the flat ₹100 registration fee online.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <span className="w-7 h-7 rounded-full bg-[#C65378] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    5
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      Biometric SRO Registration &amp; Book III Filing
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar Office with your two witnesses and original Aadhaar cards. Complete biometric thumb scanning, digital photograph capture, and Sub-Registrar interview. Receive the registered Will copy with government seal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 10: SECTION 31 HOME VISITS
                ========================================================================= */}
            <section
              id="section-31-home-visit"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <Home className="w-4 h-4" />
                <span>SENIOR CITIZEN ASSISTANCE</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                10. Section 31 Doorstep SRO Registration for Seniors
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Visiting busy government kutchery offices can be challenging for elderly, bedridden, or ailing senior citizens. Under <strong>Section 31 of the Registration Act, 1908</strong>, the law provides an official procedure for doorstep registration at home or in a hospital.
              </p>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  How Section 31 Commission Visits Work in Varanasi:
                </h4>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>MBBS Doctor Certificate:</strong> An MBBS doctor examines the testator and issues a fitness certificate confirming sound mental faculties.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sub-Registrar Application:</strong> An application is submitted to the Varanasi Sub-Registrar requesting a special commission visit under Section 31.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Home Attendance:</strong> The Sub-Registrar visits the testator&apos;s home in Sigra, Bhelupur, Cantt, or Assi with official biometric equipment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Official Book III Registration:</strong> Biometrics and witness signatures are recorded at home, making the Will 100% legally registered.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* =========================================================================
                SECTION 11: DOCUMENTS CHECKLIST
                ========================================================================= */}
            <section
              id="documents-checklist"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>INTERACTIVE CHECKLIST</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                11. Required Documents Checklist: Varanasi SRO Process
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Check off your documents below to verify readiness before proceeding to your Varanasi SRO appointment:
              </p>

              {/* PROGRESS BAR */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Preparation Readiness</span>
                  <span className="text-[#C65378]">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-[#C65378] transition-all duration-300"
                    style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* CHECKLIST ITEMS */}
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${item.checked
                        ? "bg-emerald-50/60 border-emerald-200"
                        : "bg-white border-slate-200/80 hover:bg-[#FAF7F0]"
                      }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 ${item.checked ? "bg-emerald-600 text-white" : "border border-slate-300 bg-white"
                        }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="space-y-0.5">
                      <strong className="text-xs sm:text-sm text-slate-900 block font-bold">
                        {item.label}
                      </strong>
                      <span className="text-xs text-slate-600 block">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* =========================================================================
                SECTION 12: PROPERTY TYPES
                ========================================================================= */}
            <section
              id="varanasi-property-types"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>ASSET CLASSIFICATIONS</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                12. Varanasi Property Types: Flats, Havelis &amp; Handloom
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Estate planning in Varanasi covers unique categories of immovable, movable, and commercial assets:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>Freehold &amp; VDA Flats</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Modern apartments and builder floors in Sigra, Mahmoorganj, and Sarnath. Registered Wills enable direct Nagar Nigam mutation and society title transfer.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Ancient Ghat Havelis</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Traditional joint family properties along Assi, Kedar, and Dashashwamedh ghats. Wills establish clear room demarcation and prevent partition disputes.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C65378]" />
                    <span>Silk Handloom Firms</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Banarasi sari trading firms, Chowk showrooms, wholesale inventories, and bank CC limits can be bequeathed to designate continuing business successors.
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 13: REGISTRATION FEES
                ========================================================================= */}
            <section
              id="varanasi-registration-fees"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY FEES</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                13. Government Fee Structure: IGRSUP Portal Cost Breakdown
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Will registration in Uttar Pradesh is heavily subsidized by the state government to encourage citizens to record testamentary instruments. Unlike sale deeds or gift deeds that attract 5% to 7% stamp duties, Wills attract zero percentage duties.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#FAF7F0] text-slate-800">
                      <th className="p-3 font-extrabold">Fee Component</th>
                      <th className="p-3 font-extrabold">Statutory Rate</th>
                      <th className="p-3 font-extrabold">Payment Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold">Stamp Duty</td>
                      <td className="p-3 font-bold text-emerald-700">₹0 (100% Exempt)</td>
                      <td className="p-3">Exempt under Indian Stamp Act</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Government Registration Fee</td>
                      <td className="p-3 font-bold text-slate-900">₹100 flat</td>
                      <td className="p-3">Online via UP IGRSUP portal</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Document Scanning &amp; Pasting Charges</td>
                      <td className="p-3">₹100 to ₹200</td>
                      <td className="p-3">Official SRO counter receipt</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Section 31 Doorstep Visit Commission</td>
                      <td className="p-3">₹500 to ₹1,000</td>
                      <td className="p-3">Government treasury challan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* =========================================================================
                SECTION 14: SERVICE PRICING
                ========================================================================= */}
            <section
              id="service-pricing"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>PLANS &amp; PRICING</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                14. Transparent Legal Fees: Will Drafting &amp; SRO Packages
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Choose the estate planning package that fits your family requirements. No hidden charges or unexpected surprise legal fees:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Plan 1 */}
                <div className="rounded-3xl border border-slate-200/80 p-5 bg-[#FAF7F0] flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                      SELF-SERVICE
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">Online Will</h4>
                    <div className="text-2xl font-extrabold text-slate-900">₹1,990</div>
                    <p className="text-xs text-slate-600">
                      Ideal for simple assets, bank deposits, and single residential apartments in Varanasi.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Instant lawyer-crafted template</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Customized asset schedules</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Execution checklist &amp; guide</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full text-center py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Draft Online
                  </a>
                </div>

                {/* Plan 2 */}
                <div className="rounded-3xl border-2 border-[#C65378] p-5 bg-white relative flex flex-col justify-between space-y-4 shadow-md">
                  <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                    MOST POPULAR
                  </span>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                      ADVOCATE VETTED
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">Lawyer Assisted</h4>
                    <div className="text-2xl font-extrabold text-[#C65378]">₹4,990</div>
                    <p className="text-xs text-slate-600">
                      Perfect for complex assets, ancestral havelis, handloom businesses, and multi-heir distribution.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Senior estate lawyer 1-on-1 call</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Haveli &amp; VDA clause structuring</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Unlimited drafting revisions</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full text-center py-2.5 rounded-full bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-all cursor-pointer shadow-sm"
                  >
                    Consult Advocate
                  </a>
                </div>

                {/* Plan 3 */}
                <div className="rounded-3xl border border-slate-200/80 p-5 bg-[#FAF7F0] flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                      DONE FOR YOU
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">SRO Registration</h4>
                    <div className="text-2xl font-extrabold text-slate-900">₹9,990</div>
                    <p className="text-xs text-slate-600">
                      Complete advocate escort to Varanasi SRO or doorstep Section 31 home visit assistance.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>IGRSUP token &amp; challan booking</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Physical advocate accompaniment</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Section 31 home visit coordination</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="tel:+918700343611"
                    className="w-full text-center py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Book SRO Service
                  </a>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 15: FREQUENTLY ASKED QUESTIONS
                ========================================================================= */}
            <section
              id="frequently-asked-questions"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENT INQUIRIES</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                15. Frequently Asked Questions: Will Drafting in Varanasi
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Find clear answers to common questions about drafting and registering a Will in Varanasi and Uttar Pradesh:
              </p>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/80 overflow-hidden transition-all bg-[#FAF7F0]"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer gap-3"
                      aria-expanded={openFaq === idx}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${openFaq === idx ? "rotate-180 text-[#C65378]" : ""
                          }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 text-xs text-slate-700 leading-relaxed border-t border-slate-200/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* =========================================================================
                SECTION 16: STATUTORY CITATIONS
                ========================================================================= */}
            <section
              id="statutory-citations"
              className="scroll-target bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL ACTS &amp; STATUTES</span>
              </div>

              {/* H2 <= 70 chars, No Em-Dashes */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                16. Statutory Citations &amp; Legal Framework References
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Every Will drafted through WillDrafting strictly aligns with Indian statutory enactments and judicial precedents:
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <strong className="text-slate-900 block font-bold mb-0.5">
                    Section 63, Indian Succession Act, 1925
                  </strong>
                  <span>
                    Mandates the statutory execution procedure of unprivileged Wills, requiring the testator&apos;s signature or mark and attestation by two independent adult witnesses.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <strong className="text-slate-900 block font-bold mb-0.5">
                    Section 18(e) &amp; Section 31, Registration Act, 1908
                  </strong>
                  <span>
                    Section 18(e) confirms that registration of Wills is optional. Section 31 empowers Sub-Registrars to conduct special commission visits to the residences of infirm or elderly testators.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <strong className="text-slate-900 block font-bold mb-0.5">
                    Section 213 read with Section 57, Indian Succession Act, 1925
                  </strong>
                  <span>
                    Restricts mandatory probate exclusively to the presidency towns of Mumbai, Kolkata, and Chennai. Affirms that probate is optional in Uttar Pradesh.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <strong className="text-slate-900 block font-bold mb-0.5">
                    Section 107 &amp; 108, Uttar Pradesh Revenue Code, 2006
                  </strong>
                  <span>
                    Governs the testamentary disposition of agricultural land holdings by Bhumidhars with transferable rights and defines the order of succession.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                  <strong className="text-slate-900 block font-bold mb-0.5">
                    Article 64, Schedule I-B, Indian Stamp Act, 1899 (UP Amendment)
                  </strong>
                  <span>
                    Establishes 100% exemption from stamp duty for Wills executed in the state of Uttar Pradesh.
                  </span>
                </div>
              </div>

              {/* REGIONAL CROSS LINKS */}
              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-800 block mb-2">
                  Explore Related UP &amp; National Succession Desks:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/locations/lucknow"
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-slate-200 text-slate-800 font-semibold transition-all"
                  >
                    Will Drafting in Lucknow
                  </Link>
                  <Link
                    href="/locations/kanpur"
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-slate-200 text-slate-800 font-semibold transition-all"
                  >
                    Will Drafting in Kanpur
                  </Link>
                  <Link
                    href="/locations/delhi"
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-slate-200 text-slate-800 font-semibold transition-all"
                  >
                    Will Drafting in Delhi NCR
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-slate-200 text-[#C65378] font-semibold transition-all"
                  >
                    SRO Registration Service
                  </Link>
                  <Link
                    href="/tools/will-checklist"
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-slate-200 text-slate-800 font-semibold transition-all"
                  >
                    Interactive Will Checklist
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* =========================================================================
          HIGH RESOLUTION IMAGE MODAL (DESKTOP & MOBILE FULL VISIBILITY)
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#172228] rounded-3xl border border-white/20 p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#C65378]" />
                <h3 className="font-extrabold text-sm sm:text-base">
                  Will Drafting &amp; Asset Planning in Varanasi
                </h3>
              </div>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] max-h-[75vh] mt-3 bg-[#172228] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/will-drafting-in-varanasi.jpg"
                alt="High Resolution Visual Blueprint: Varanasi Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <p className="text-xs text-slate-300 text-center mt-3">
              Comprehensive legal advisory and Sub-Registrar registration assistance across Kashi and Purvanchal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
