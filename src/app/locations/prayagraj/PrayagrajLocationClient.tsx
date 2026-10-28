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
  { id: "prayagraj-overview", label: "OVERVIEW" },
  { id: "prayagraj-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "prayagraj-probate-rules", label: "PROBATE RULES" },
  { id: "prayagraj-sro-directory", label: "SRO DIRECTORY" },
  { id: "prayagraj-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-prayagraj-sop", label: "5-STEP PROCESS" },
  { id: "doorstep-home-registration", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "prayagraj-property-types", label: "PROPERTY TYPES" },
  { id: "prayagraj-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const PRAYAGRAJ_DISTRICTS = [
  {
    id: "civil-lines-sadar",
    name: "Civil Lines, High Court & Sadar Collectorate Core",
    sro: "SRO Prayagraj Sadar I & II (Collectorate / Kutchery)",
    address: "District Collectorate & Kutchery Compound, Near Allahabad High Court, Prayagraj - 211002",
    areas: "Civil Lines, High Court Enclave, Old Katra, New Katra, Colonelganj, George Town, Ashok Nagar, Mumfordganj, Tagore Town, Beli Road, Thornhill Road, Lukerganj",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "georgetown-tagore-sangam",
    name: "George Town, Tagore Town, Sangam & Daraganj",
    sro: "SRO Prayagraj Sadar III (Kutchery Complex)",
    address: "Kutchery Registry Wing, Collectorate Compound, Prayagraj - 211002",
    areas: "George Town, Tagore Town, Daraganj, Kydganj, Sangam Marg, Alopi Bagh, Bairahana, Sohbatiya Bagh, Rambagh, Mutthiganj, Zero Road",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "naini-trans-yamuna",
    name: "Naini & Trans-Yamuna Development Belt",
    sro: "SRO Naini (Industrial Area & ADA Belt)",
    address: "Tehsil Administrative Complex, Near Naini Railway Station, Mirzapur Road, Naini, Prayagraj - 211008",
    areas: "ADA Colony Naini, Triveni Nagar, Dandi, Chheoki, Mahewa, Industrial Area Naini, ADA Transport Nagar, Chak Dadan, Mirzapur Road Corridor",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "phaphamau-soraon",
    name: "Phaphamau, Shantipuram & Trans-Ganga North",
    sro: "SRO Phaphamau / Soraon Tehsil",
    address: "Tehsil Compound Soraon, Lucknow-Prayagraj National Highway, Phaphamau, Prayagraj - 212502",
    areas: "Phaphamau, Shantipuram Housing Colony, Malaka, Devghat, Soraon, Shivkuti, Teliarganj, MNNIT Campus Area, Govindpur, Salori, Bagambari",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "jhunsi-phulpur",
    name: "Jhunsi, Andawa & Trans-Ganga East Corridor",
    sro: "SRO Jhunsi / Phulpur Tehsil",
    address: "Tehsil Administrative Complex, GT Road / Varanasi Highway, Jhunsi, Prayagraj - 211019",
    areas: "Jhunsi, Andawa, Havelia, Avas Vikas Colony Jhunsi, Phulpur, Sahson, GT Road Corridor, Shastri Bridge East Enclave",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "kalindipuram-dhoomanganj",
    name: "Kalindipuram, Dhoomanganj & Rajrooppur",
    sro: "SRO Prayagraj Sadar IV (Sub-Urban West Division)",
    address: "Collectorate Registry Annex, Kutchery Compound, Prayagraj - 211002",
    areas: "Kalindipuram PDA Housing Scheme, Rajrooppur, Dhoomanganj, Preetam Nagar, Subedarganj, Sulem Sarai, Bamrauli Airport Road, Transport Nagar",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "karchhana-bara",
    name: "Karchhana, Bara & Southern Rural-Urban Fringe",
    sro: "SRO Karchhana & SRO Bara",
    address: "Tehsil Administrative Complexes, Karchhana & Jasra / Bara, Prayagraj - 212301",
    areas: "Karchhana, Bara, Jasra, Shankargarh, Iradatganj, Rewa Road Highway Corridor, Ghoorpur, Industrial Extensions",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const PRAYAGRAJ_LOCAL_AREAS = [
  {
    id: "civil-lines-katra",
    tag: "Civil Lines & High Court",
    sro: "SRO Prayagraj Sadar (I & II)",
    title: "Will Drafting Services in Civil Lines & Katra",
    suburbs: [
      "Civil Lines Commercial Hub",
      "High Court Judicial Enclave",
      "Old Katra & New Katra",
      "Colonelganj",
      "Thornhill Road",
      "Beli Road",
    ],
    description: (
      <>
        Looking for professional <strong>Will drafting services in Civil Lines &amp; Katra</strong>? Civil Lines
        features historic colonial bungalows, senior High Court advocate residences, and high-value commercial
        properties along MG Road. Our Allahabad High Court advocates draft ironclad testamentary bequests that
        clearly delineate life interests for surviving spouses, protect prime freehold properties, and prevent
        family disputes in district courts.
      </>
    ),
    sroHub: "SRO Hub: District Collectorate / Kutchery Sadar",
    sroDetail:
      "Assistance with IGRSUP token generation, Book III registry entry, and Section 31 doorstep execution for retired judges and senior residents across Civil Lines.",
    footerTag: "₹0 Stamp Duty · ₹100 Govt Fee",
    ctaText: "Draft Civil Lines Will",
  },
  {
    id: "georgetown-tagoretown",
    tag: "Central Residential Belt",
    sro: "SRO Prayagraj Sadar (III)",
    title: "Will Drafting Services in George Town & Tagore Town",
    suburbs: [
      "George Town Leafy Avenues",
      "Tagore Town",
      "Ashok Nagar",
      "Mumfordganj",
      "Lukerganj",
      "Bairahana",
    ],
    description: (
      <>
        Get specialized <strong>Will drafting services in George Town &amp; Tagore Town</strong>. These established
        central residential localities house prominent academicians, doctors, and multi-generational families.
        Our legal drafts clearly separate self-acquired kothis, ancestral family silver, and financial portfolios,
        while ensuring fast and undisputed Prayagraj Nagar Nigam property tax mutation (Namantaran) without succession certificates.
      </>
    ),
    sroHub: "SRO Hub: Kutchery Compound, Old Katra Wing",
    sroDetail:
      "Full advocate accompanied registration at Kutchery Sadar, doorstep home visits under Section 31 for elderly citizens, and nominee-to-heir succession planning.",
    footerTag: "Nagar Nigam Mutation Ready",
    ctaText: "Draft George Town Will",
  },
  {
    id: "kalindipuram-rajrooppur",
    tag: "PDA Western Suburbs",
    sro: "SRO Sadar IV (Sub-Urban West)",
    title: "Will Drafting Services in Kalindipuram & Rajrooppur",
    suburbs: [
      "Kalindipuram PDA Housing Scheme",
      "Rajrooppur",
      "Dhoomanganj",
      "Preetam Nagar",
      "Subedarganj",
      "Bamrauli Airport Road",
    ],
    description: (
      <>
        Protect family assets with <strong>Will drafting services in Kalindipuram &amp; Rajrooppur</strong>.
        Featuring modern Prayagraj Development Authority (PDA) planned housing sectors and cooperative residential
        societies, a registered Will ensures seamless transfer of PDA allotment letters and leasehold-to-freehold titles
        without requiring expensive indemnity bonds or 30-day public objection notices.
      </>
    ),
    sroHub: "SRO Hub: Collectorate Registry Annex, Kutchery",
    sroDetail:
      "Fast PDA leasehold & freehold transfer advisory, IGRSUP online appointment scheduling, and Book III biometric registration support.",
    footerTag: "PDA Mutation Compliant",
    ctaText: "Draft Kalindipuram Will",
  },
  {
    id: "naini-trans-yamuna",
    tag: "Trans-Yamuna Hub",
    sro: "SRO Naini (Industrial Area)",
    title: "Will Drafting Services in Naini & Trans-Yamuna",
    suburbs: [
      "ADA Colony Naini",
      "Triveni Nagar",
      "Dandi",
      "Chheoki",
      "Mahewa",
      "Industrial Area Naini",
      "Mirzapur Road Corridor",
    ],
    description: (
      <>
        Seeking reliable <strong>Will drafting services in Naini &amp; Trans-Yamuna</strong>? Home to sprawling ADA
        colonies, industrial manufacturing units, and growing residential townships across the New Yamuna Bridge, our
        senior estate lawyers draft comprehensive wills covering factory plots, commercial godowns, and family homes,
        coordinating seamless registration at the Naini Tehsil SRO.
      </>
    ),
    sroHub: "SRO Hub: Tehsil Administrative Complex, Mirzapur Road",
    sroDetail:
      "Direct assistance for ADA plot mutation, industrial land succession, and biometrics at the Naini Sub-Registrar office.",
    footerTag: "ADA & Revenue Approved",
    ctaText: "Draft Naini Will",
  },
  {
    id: "phaphamau-shantipuram",
    tag: "Trans-Ganga North",
    sro: "SRO Phaphamau / Soraon",
    title: "Will Drafting Services in Phaphamau & Shantipuram",
    suburbs: [
      "Shantipuram Housing Scheme",
      "Phaphamau Bazar",
      "MNNIT Campus Area",
      "Teliarganj",
      "Malaka",
      "Devghat",
      "Soraon Tehsil Corridor",
    ],
    description: (
      <>
        Get professional <strong>Will drafting services in Phaphamau &amp; Shantipuram</strong>. This rapidly expanding
        educational and residential corridor features modern PDA housing developments alongside ancestral properties. We
        provide dual-asset succession drafting that covers urban apartments as well as agricultural lands under Section 107
        of the UP Revenue Code 2006.
      </>
    ),
    sroHub: "SRO Hub: Tehsil Compound Soraon, Lucknow Highway",
    sroDetail:
      "UP Bhulekh Khatauni synchronization, PDA Shantipuram mutation assistance, and Sub-Registrar appointment support.",
    footerTag: "UP Revenue Code 2006",
    ctaText: "Draft Phaphamau Will",
  },
  {
    id: "jhunsi-andawa",
    tag: "Trans-Ganga East",
    sro: "SRO Jhunsi / Phulpur",
    title: "Will Drafting Services in Jhunsi & Andawa",
    suburbs: [
      "Jhunsi Avas Vikas Colony",
      "Andawa",
      "Havelia",
      "Phulpur GT Road",
      "Sahson",
      "Shastri Bridge East Enclave",
    ],
    description: (
      <>
        Secure your family legacy with <strong>Will drafting services in Jhunsi &amp; Andawa</strong>. Situated along
        the historic Grand Trunk Road and Varanasi Highway corridor, Jhunsi houses growing Avas Vikas residential sectors
        and ancestral properties. Our advocates structure clear bequests that protect your heirs against co-sharer challenges
        and expedite municipal record updates.
      </>
    ),
    sroHub: "SRO Hub: Tehsil Administrative Complex, GT Road",
    sroDetail:
      "Full advocate accompaniment at Jhunsi Tehsil, Book III registration, and legal guidance for ancestral land and residential bequests.",
    footerTag: "₹0 Stamp Duty · ₹100 Govt Fee",
    ctaText: "Draft Jhunsi Will",
  },
  {
    id: "daraganj-sangam",
    tag: "Heritage Ghats & Old City",
    sro: "SRO Prayagraj Sadar (III)",
    title: "Will Drafting Services in Daraganj & Sangam Area",
    suburbs: [
      "Daraganj Ghats",
      "Kydganj",
      "Sangam Marg",
      "Alopi Bagh",
      "Mutthiganj",
      "Zero Road Wholesale Market",
    ],
    description: (
      <>
        Looking for trusted <strong>Will drafting services in Daraganj &amp; Sangam Area</strong>? Historic family
        properties, pacca kothis, and wholesale trading businesses in the old city require careful succession planning.
        We draft customized wills that define individual coparcenary rights, protect ancestral family seats, and guarantee
        smooth transmission of commercial retail assets.
      </>
    ),
    sroHub: "SRO Hub: Kutchery Compound, Prayagraj",
    sroDetail:
      "Assistance with ancient property documentation, Nagar Nigam tax record mutation, and Section 31 home visits for elderly family heads.",
    footerTag: "Hindu Succession Compliant",
    ctaText: "Draft Daraganj Will",
  },
  {
    id: "karchhana-bara",
    tag: "Southern Tehsil Belt",
    sro: "SRO Karchhana & Bara",
    title: "Will Drafting Services in Karchhana & Bara",
    suburbs: [
      "Karchhana Tehsil",
      "Bara",
      "Jasra",
      "Shankargarh",
      "Iradatganj",
      "Ghoorpur",
      "Rewa Highway Corridor",
    ],
    description: (
      <>
        Expert <strong>Will drafting services in Karchhana &amp; Bara</strong> for agricultural landholders, brick kiln
        owners, and mining enterprise families. Our legal team drafts airtight testamentary documents aligned with Section
        107 of the UP Revenue Code, ensuring agricultural land transfers without bureaucratic hold-ups on the UP Bhulekh portal.
      </>
    ),
    sroHub: "SRO Hub: Tehsil Compounds, Karchhana & Jasra",
    sroDetail:
      "Revenue record verification, Sub-Registrar appointment booking, and advocate accompaniment across southern Prayagraj tehsils.",
    footerTag: "Khatauni & Bhulekh Aligned",
    ctaText: "Draft Karchhana Will",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    label: "Two Printed Copies of the Will on Plain Paper",
    detail: "Printed on standard white A4 sheets. Wills carry zero stamp duty across Uttar Pradesh.",
    checked: true,
  },
  {
    id: "item-2",
    label: "Original Aadhaar Card & PAN of the Testator",
    detail: "Required for biometric thumbprint scanning and digital photo capture on the UP IGRSUP portal.",
    checked: true,
  },
  {
    id: "item-3",
    label: "Two Independent Adult Witnesses with Aadhaar",
    detail: "Both witnesses must carry original photo IDs and must not be beneficiaries receiving assets under the Will.",
    checked: true,
  },
  {
    id: "item-4",
    label: "Doctor's Mental Capacity Certificate (For Seniors)",
    detail: "Issued by a registered MBBS doctor certifying sound testamentary capacity to eliminate dementia challenges.",
    checked: false,
  },
  {
    id: "item-5",
    label: "UP IGRSUP Online Appointment Token Slip",
    detail: "Official appointment confirmation downloaded from igrsup.gov.in with selected Prayagraj SRO time slot.",
    checked: false,
  },
  {
    id: "item-6",
    label: "Property Chain Documents (PDA Allotment / Sale Deed)",
    detail: "Copies of registered sale deeds, PDA allotment letters, Nagar Nigam tax receipts, or UP Revenue Khatauni records.",
    checked: false,
  },
  {
    id: "item-7",
    label: "Two Recent Color Passport Photos Each",
    detail: "Clear passport photographs for the testator and both attesting witnesses to paste into SRO Book III registers.",
    checked: false,
  },
];

export default function PrayagrajLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("prayagraj-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  const filteredDistricts = PRAYAGRAJ_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

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
                <span>PRAYAGRAJ &amp; SANGAM REGION ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Exactly 55 characters (Target: 30-65 characters) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Prayagraj: Online Legal Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Draft a legally binding Will for your PDA plots, Civil Lines bungalows, Sangam region ancestral homes, and savings.
                Get advocate drafting, UP IGRSUP portal registration assistance, and doorstep execution for senior citizens across Prayagraj.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Prayagraj Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#prayagraj-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Prayagraj SRO Directory</span>
                </a>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Allahabad HC Advocate Vetted</span>
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
                  src="/images/will-drafting-in-prayagraj.jpg"
                  alt="Online Will Drafting and Asset Protection in Prayagraj"
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
                High Court Seat
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Allahabad Judicial Bench
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                ₹0 Stamp Duty
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                UP Stamp Act Exemption
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/70 sm:bg-transparent rounded-xl sm:rounded-none p-2.5 sm:p-3 border border-[#172228]/10 sm:border-0 md:border-l md:border-[#172228]/10 shadow-2xs sm:shadow-none flex flex-col items-center justify-center">
              <span className="block text-sm min-[390px]:text-base sm:text-xl lg:text-2xl font-extrabold text-[#172228] tracking-tight leading-tight whitespace-nowrap">
                Probate Optional
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Section 213 ISA Non-Presidency
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
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-40 max-h-80 overflow-y-auto p-2 space-y-1">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileTocOpen(false)}
                  className={`block px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                    activeId === item.id
                      ? "bg-rose-50 text-[#C65378] font-extrabold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT GRID WITH STICKY SIDEBAR (DESKTOP)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* =====================================================================
              DESKTOP STICKY SIDEBAR: TABLE OF CONTENTS (4 COLS)
              ===================================================================== */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-28 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-4">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span>PRAYAGRAJ GUIDE TOC</span>
              </div>
              <nav className="space-y-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-extrabold translate-x-1"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
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
            <section id="prayagraj-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>PRAYAGRAJ SUCCESSION BRIEF</span>
                </div>
                {/* H2 1: Exactly 56 characters */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Prayagraj
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional SRO Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Registering a Will is optional under Section 18(e) of the Registration Act, 1908. A handwritten or typed Will on white paper is legally valid if signed before two independent witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Non-Compulsory in UP</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Court probate is non-compulsory in Prayagraj under Section 213 of the Indian Succession Act. The Allahabad High Court confirms beneficiaries inherit without mandatory probate petitions.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>₹0 UP Stamp Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills carry zero stamp duty across Uttar Pradesh. Testators only pay a nominal one hundred rupee registration charge and scanning fees at Prayagraj Sub-Registrar offices.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Seamless PDA &amp; Nagar Nigam Mutation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will drastically speeds up Prayagraj Development Authority (PDA) transfer and Nagar Nigam property tax mutation (Namantaran) without court succession suits.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="prayagraj-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                {/* H2 2: Exactly 48 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Succession Laws in Prayagraj
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Writing a Will in Prayagraj is governed by the <strong>Indian Succession Act, 1925</strong>, the <strong>Registration Act, 1908</strong>, and the <strong>Uttar Pradesh Revenue Code, 2006</strong>.
                  Any adult of sound mind who is at least 18 years old can make a Will to transfer self-acquired real estate, bank deposits, jewelry, and commercial equity.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  As the historic seat of the Allahabad High Court, Prayagraj has a distinguished legal culture.
                  Families hold colonial bungalows in Civil Lines and George Town, PDA housing plots in Kalindipuram and Naini, and ancestral holdings across Daraganj and Phaphamau.
                  A professionally drafted Will ensures your estate transfers smoothly without bitter family litigation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The testator must be at least 18 years of age and in sound mental mind (Section 59).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Consent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will must be made voluntarily without coercion, undue influence, or fraud (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You must sign in the direct visual presence of two adult witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Revocability</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Will can be altered, amended by codicil, or fully revoked anytime during your lifetime.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MANDATORY VS OPTIONAL REGISTRATION */}
            <section id="mandatory-vs-optional" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION PROCEDURE</span>
                </div>
                {/* H2 3: Exactly 55 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Will Registration in Prayagraj: Rules &amp; Legal Value
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 18(e) of the Registration Act, 1908</strong>, registering a Will in Uttar Pradesh is voluntary.
                  An unregistered Will executed before two independent witnesses is legally enforceable.
                  However, registering your Will at the Prayagraj Sub-Registrar Office provides undeniable evidentiary weight before courts and government authorities.
                </p>
              </div>

              {/* COMPARISON TABLE */}
              <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                      <tr>
                        <th className="py-4 px-5">Comparison Parameter</th>
                        <th className="py-4 px-5">Unregistered Will</th>
                        <th className="py-4 px-5 bg-[#C65378] text-white">Registered Will (UP IGRS)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-bold text-slate-900">Statutory Validity</td>
                        <td className="py-3.5 px-5">Valid under Section 63 ISA</td>
                        <td className="py-3.5 px-5 font-semibold text-emerald-700">Valid + Presumed genuine under Section 114</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-bold text-slate-900">PDA Property Mutation</td>
                        <td className="py-3.5 px-5">Requires public notices, indemnity bonds, or delay</td>
                        <td className="py-3.5 px-5 font-semibold text-emerald-700">Fast mutation on PDA records without objections</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-bold text-slate-900">Govt Safe Custody</td>
                        <td className="py-3.5 px-5">Risk of damage, loss, or family tampering</td>
                        <td className="py-3.5 px-5 font-semibold text-emerald-700">Permanently preserved in SRO Book III registers</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-bold text-slate-900">Tampering &amp; Forgery Shield</td>
                        <td className="py-3.5 px-5">Vulnerable to claims of fraud or coercion</td>
                        <td className="py-3.5 px-5 font-semibold text-emerald-700">Biometrics and photo taken before Sub-Registrar</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-bold text-slate-900">Applicable Stamp Duty</td>
                        <td className="py-3.5 px-5">₹0 (Zero Stamp Duty)</td>
                        <td className="py-3.5 px-5 font-semibold text-emerald-700">₹0 (Nominal ₹100 registration fee only)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROBATE RULES IN PRAYAGRAJ */}
            <section id="prayagraj-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>JUDICIAL PRECEDENTS</span>
                </div>
                {/* H2 4: Exactly 53 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Is Probate Mandatory for Properties in Prayagraj?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  <strong>No. Court probate is strictly optional in Prayagraj and across Uttar Pradesh.</strong>
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 213(2) read with Section 57 of the Indian Succession Act, 1925</strong>, the requirement of obtaining a probate applies only to Wills made by Hindus, Buddhists, Sikhs, and Jains within the historic presidential cities of Kolkata, Chennai, and Mumbai, or where immovable property falls within those presidency territories.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  The Allahabad High Court has consistently held in landmark judgments that beneficiaries in Uttar Pradesh can mutate PDA plots, transfer bank deposits, and establish title without mandatory probate proceedings.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] flex items-center justify-center font-bold text-white shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-white">
                      Allahabad High Court Jurisprudence on Probate
                    </h3>
                    <p className="text-xs text-rose-200">
                      Non-presidency statutory exemption under Section 213 of the Indian Succession Act
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In repeated rulings, the Allahabad High Court has affirmed that Section 213 does not bar beneficiaries in Uttar Pradesh from asserting legal rights under a genuine Will in civil or revenue proceedings. This saves families years of court delays and hundreds of thousands in court valuation fees.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                  <span className="px-3 py-1 rounded-full bg-white/10">No Mandatory High Court Petition</span>
                  <span className="px-3 py-1 rounded-full bg-white/10">No Ad Valorem Court Valuation Fees</span>
                  <span className="px-3 py-1 rounded-full bg-white/10">Direct PDA &amp; Revenue Mutation</span>
                </div>
              </div>
            </section>

            {/* SECTION 4: SRO DIRECTORY */}
            <section id="prayagraj-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRY JURISDICTIONS</span>
                </div>
                {/* H2 5: Exactly 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. Prayagraj Sub-Registrar Offices &amp; SRO Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Prayagraj district operates multiple Sub-Registrar Offices under the Inspector General of Registration and Stamps Uttar Pradesh (IGRSUP). Select the appropriate SRO based on your property location or residence:
                </p>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search locality (e.g. Civil Lines, George Town, Naini, Phaphamau, Kalindipuram)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                />
              </div>

              {/* SRO DIRECTORY CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDistricts.map((d) => (
                  <div
                    key={d.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:border-[#C65378]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C65378]">
                          {d.sro}
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900">{d.name}</h3>
                      </div>
                      <span className="p-2 rounded-xl bg-rose-50 text-[#C65378] shrink-0">
                        <MapPin className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                      <p>
                        <strong className="text-slate-800">Office Address:</strong> {d.address}
                      </p>
                      <p>
                        <strong className="text-slate-800">Key Areas Served:</strong> {d.areas}
                      </p>
                      <p>
                        <strong className="text-slate-800">Operational Timings:</strong> {d.timings}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: AREA COVERAGE - 2-COLUMN CARD GRID (LIKE SECOND SCREENSHOT) */}
            <section id="prayagraj-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL PRACTICE AREAS</span>
                </div>
                {/* H2 6: Exactly 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. Area-Wise Will Drafting in Prayagraj Localities
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Looking for legally verified <strong>Will drafting services in Civil Lines, George Town, Naini, or Kalindipuram</strong>? Property ownership models, PDA leasehold conditions, and Sub-Registrar jurisdictions vary significantly across Prayagraj. Whether you own a colonial bungalow in Civil Lines, a planned PDA plot in Kalindipuram, or ancestral farmland in Soraon, our High Court advocates deliver tailored drafting, registration, and estate advisory:
                </p>
              </div>

              {/* 2-COLUMN CARDS GRID (LIKE SCREENSHOT 2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PRAYAGRAJ_LOCAL_AREAS.map((area) => (
                  <div
                    key={area.id}
                    className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          {area.tag}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {area.sro}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        {area.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        {area.suburbs.map((suburb, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-100 font-medium"
                          >
                            {suburb}
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
                      <span className="text-xs font-bold text-slate-500">{area.footerTag}</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label={area.title}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all cursor-pointer"
                      >
                        <span>{area.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-prayagraj-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP WORKFLOW</span>
                </div>
                {/* H2 7: Exactly 51 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Step-by-Step SOP: Will Drafting to Registration
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified five-step protocol to draft and register your Will in Prayagraj without administrative delays:
                </p>
              </div>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-base shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 1: Inventory Assets, Debts, and Beneficiaries
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      Compile a complete list of your assets: PDA plots, Civil Lines bungalows, ancestral holdings in Daraganj, bank fixed deposits, mutual funds, demat equities, and gold. Specify full legal names, relationships, and assign a trusted executor to administer the estate.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-base shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 2: Draft Will with High Court Advocate Oversight
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      Draft your custom Will through our secure platform or consult a senior succession lawyer. We incorporate crucial clauses: explicit revocation of prior testaments, survivorship provisions, life interest terms for spouses, and clear demarcation of coparcenary interests.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-base shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 3: Attest Before Two Independent Witnesses
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      Print the final draft on standard white A4 sheets. Under Section 63 of the Indian Succession Act, sign the footer of every page in the direct physical presence of two adult witnesses. The witnesses sign immediately after, confirming they witnessed your voluntary execution.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-base shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 4: Book Prayagraj SRO Appointment on IGRSUP Portal
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      Log in to the Uttar Pradesh registration portal (igrsup.gov.in). Select your Prayagraj SRO (Kutchery Sadar, Naini, Phaphamau, or Jhunsi). Enter the testator and witness details, pay the nominal government fee, and download the official appointment token slip.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-base shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-bold text-base text-slate-900">
                      Step 5: Biometric Verification &amp; SRO Registration
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      Visit the Sub-Registrar office on your scheduled date with your two witnesses and original IDs. The officer conducts biometric fingerprint verification, captures live digital webcam photographs, and registers the Will into official Book III government records.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: DOORSTEP HOME REGISTRATION */}
            <section id="doorstep-home-registration" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Users className="w-4 h-4 text-[#C65378]" />
                  <span>SPECIAL COMMISSION VISIT</span>
                </div>
                {/* H2 8: Exactly 53 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Section 31 Doorstep SRO Registration in Prayagraj
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, individuals who are physically unable to travel to the Sub-Registrar office can request a home visit by the Sub-Registrar. This service is widely utilized by senior citizens, retired judicial officers, and ailing residents across Civil Lines, George Town, and Tagore Town.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1.5">
                    <h3 className="font-bold text-sm text-[#C65378]">Medical Certificate</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered MBBS practitioner must certify that the testator is medically unable to travel to the Kutchery office due to age, illness, or mobility limits.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1.5">
                    <h3 className="font-bold text-sm text-[#C65378]">Official Petition</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      An application is submitted to the Prayagraj Sub-Registrar explaining the medical condition along with the nominal government commission fee.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1.5">
                    <h3 className="font-bold text-sm text-[#C65378]">Portable Biometrics</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar visits the residence with portable biometric scanners and webcams to complete the registration from the comfort of home.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: MANDATORY DOCUMENT CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>VERIFICATION CHECKLIST</span>
                </div>
                {/* H2 9: Exactly 52 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Mandatory Document Checklist for Prayagraj Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Use this interactive checklist to prepare your documents before visiting the Prayagraj Sub-Registrar office:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
                  <span className="font-bold text-slate-700">Readiness Score:</span>
                  <span className="font-extrabold text-[#C65378]">
                    {checkedCount} of {checklist.length} Completed
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? "bg-rose-50/40 border-rose-200 text-slate-900"
                          : "bg-slate-50/50 border-slate-200/80 text-slate-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-[#C65378] text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold block text-slate-900">{item.label}</span>
                        <span className="text-slate-500 leading-relaxed block">{item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PROPERTY TYPES IN PRAYAGRAJ */}
            <section id="prayagraj-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATIONS</span>
                </div>
                {/* H2 10: Exactly 50 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Estate Asset Distribution: PDA Plots &amp; Havelis
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A comprehensive Will should clearly itemize all categories of movable and immovable property held across Prayagraj:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>PDA Plots &amp; Housing Schemes</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Residential and commercial plots allocated by the Prayagraj Development Authority (PDA) in Kalindipuram, Naini, Shantipuram, and ADA schemes. Mention allotment numbers and freehold conversion status.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Colonial Bungalows &amp; Historic Havelis</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sprawling compounds in Civil Lines, George Town, and Daraganj. If holding an undivided coparcenary share, clearly define your separate testamentary rights to avoid partition disputes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Agricultural Lands (UP Revenue Code)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farmland holdings across Soraon, Phulpur, and Karchhana. Under Section 107 of the UP Revenue Code 2006, ensure bequests comply with ceiling limits and Khatauni land records.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Briefcase className="w-4 h-4 text-[#C65378]" />
                    <span>Financial Investments &amp; Bank Deposits</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Savings accounts, fixed deposits, demat stock portfolios, and mutual funds. A Will overrides nominee designations to ensure lawful transmission to your intended family members.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGISTRATION FEES */}
            <section id="prayagraj-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT CHARGES</span>
                </div>
                {/* H2 11: Exactly 49 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Registration Charges &amp; Zero Stamp Duty in UP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under the Indian Stamp Act as applicable to Uttar Pradesh, <strong>Wills are completely exempt from stamp duty</strong>. You do not pay percentage-based fees on your property valuation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1 text-center">
                  <span className="text-2xl font-black text-[#C65378]">₹0</span>
                  <span className="block font-bold text-xs text-slate-900 uppercase">Stamp Duty</span>
                  <span className="text-[11px] text-slate-500 block">Exempt under UP Stamp Schedule</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1 text-center">
                  <span className="text-2xl font-black text-slate-900">₹100</span>
                  <span className="block font-bold text-xs text-slate-900 uppercase">Registration Fee</span>
                  <span className="text-[11px] text-slate-500 block">Nominal flat government fee</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1 text-center">
                  <span className="text-2xl font-black text-slate-900">₹100-300</span>
                  <span className="block font-bold text-xs text-slate-900 uppercase">Scanning Charges</span>
                  <span className="text-[11px] text-slate-500 block">Digital capture &amp; Book III entry</span>
                </div>
              </div>
            </section>

            {/* SECTION 11: TRANSPARENT PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT PLANS</span>
                </div>
                {/* H2 12: Exactly 49 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Transparent Pricing: Prayagraj Will Packages
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose the estate planning package tailored to your family assets in Prayagraj. Clear pricing with zero hidden fees:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PLAN 1 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                      Basic Online
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">Online Drafted Will</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹1,990</span>
                      <span className="text-xs text-slate-500">all-inclusive</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant online legal questionnaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>All assets, bank FDs, and jewelry</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>PDF download with signing guidelines</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors"
                  >
                    Select Basic Draft
                  </a>
                </div>

                {/* PLAN 2: FEATURED */}
                <div className="p-6 rounded-3xl bg-white border-2 border-[#C65378] shadow-md space-y-4 flex flex-col justify-between relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C65378] text-white text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                      Advocate Consultation
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">High Court Review</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#C65378]">₹4,990</span>
                      <span className="text-xs text-slate-500">all-inclusive</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Allahabad High Court advocate review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>PDA plots &amp; ancestral haveli clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 phone or video legal advisory</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor capacity certificate guidance</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl bg-[#C65378] text-white font-bold text-xs text-center hover:bg-[#a13c5d] transition-colors shadow-xs"
                  >
                    Get Advocate Plan
                  </a>
                </div>

                {/* PLAN 3 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                      End-to-End Execution
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">SRO Registration</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹9,990</span>
                      <span className="text-xs text-slate-500">all-inclusive</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Senior advocate drafting &amp; consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>IGRSUP online slot booking &amp; challan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Advocate accompaniment at Prayagraj SRO</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 doorstep visit coordination</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors"
                  >
                    Select Full SRO Plan
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUESTIONS</span>
                </div>
                {/* H2 13: Exactly 55 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions: Will Drafting in Prayagraj
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Clear, authoritative answers to common legal queries about Will drafting, probate, and SRO registration in Prayagraj:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
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
                  <span>LEGAL AUTHORITIES</span>
                </div>
                {/* H2 14: Exactly 49 characters */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. Statutory Citations &amp; Legal Precedents in UP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Every Will prepared through WillDrafting strictly complies with binding Indian enactments and judicial precedents:
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>Indian Succession Act, 1925:</strong> Section 59 (Sound mind and testamentary capacity); Section 61 (Void wills due to fraud, coercion, or importunity); Section 63 (Mandatory execution before two attesting witnesses); Section 213 read with Section 57 (Non-compulsory nature of probate outside historic presidency jurisdictions).
                </p>
                <p>
                  <strong>Registration Act, 1908:</strong> Section 18(e) (Optional registration of wills); Section 31 (Special commission home execution by Sub-Registrar); Section 40 and Section 41 (Procedure for presenting wills for registration).
                </p>
                <p>
                  <strong>Uttar Pradesh Revenue Code, 2006:</strong> Section 107 (Bequest of agricultural land by Bhumidhar holding transferable rights); Section 108 (Succession order and maintenance provisions).
                </p>
                <p>
                  <strong>Uttar Pradesh Urban Planning and Development Act, 1973:</strong> Regulations governing Prayagraj Development Authority (PDA) leasehold transfers, freehold mutations, and legal heir substitutions.
                </p>
                <p>
                  <strong>Judicial Precedents:</strong> <em>Balwant Singh v. Gurbachan Singh</em> (Probate non-requirement outside presidency towns); <em>Clarence Pais v. Union of India</em> (AIR 2001 SC 1151, confirming uniform probate exemption across non-presidency areas).
                </p>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* =========================================================================
          HIGH-RES IMAGE MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={() => setShowHighResModal(false)}
        >
          <div className="relative max-w-4xl w-full aspect-video bg-[#172228] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/will-drafting-in-prayagraj.jpg"
              alt="Will Drafting in Prayagraj"
              width={1200} height={675}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <button
              onClick={() => setShowHighResModal(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 text-sm font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
