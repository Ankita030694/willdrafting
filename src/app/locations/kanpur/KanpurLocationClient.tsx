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
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQItem[];
}

const TOC_ITEMS = [
  { id: "kanpur-overview", label: "OVERVIEW" },
  { id: "kanpur-legal-framework", label: "LEGAL FRAMEWORK" },
  { id: "mandatory-vs-optional", label: "REGISTRATION RULES" },
  { id: "kanpur-probate-rules", label: "PROBATE RULES" },
  { id: "kda-property-succession", label: "KDA MUTATION" },
  { id: "up-revenue-code-108", label: "FARMLAND RULES" },
  { id: "kanpur-sro-directory", label: "SRO DIRECTORY" },
  { id: "kanpur-area-coverage", label: "LOCAL AREAS" },
  { id: "step-by-step-kanpur-sop", label: "5-STEP PROCESS" },
  { id: "section-31-home-visit", label: "HOME REGISTRATION" },
  { id: "documents-checklist", label: "DOCUMENTS" },
  { id: "kanpur-property-types", label: "PROPERTY TYPES" },
  { id: "kanpur-registration-fees", label: "FEES & CHARGES" },
  { id: "service-pricing", label: "PLANS & PRICING" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "statutory-citations", label: "STATUTORY REFS" },
];

const KANPUR_DISTRICTS = [
  {
    id: "sadar",
    name: "Kanpur Sadar (Collectorate)",
    sro: "SRO Kanpur Sadar I, II, III, IV & V",
    address: "Collectorate Compound, Civil Lines, Kanpur Nagar - 208001",
    areas: "Civil Lines, Swaroop Nagar, Tilak Nagar, Arya Nagar, Mall Road, VIP Road, Cantonment, Nayaganj, General Ganj, Collectorganj, Phoolbagh",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "kalyanpur",
    name: "Kalyanpur",
    sro: "SRO Kalyanpur",
    address: "Tehsil Compound / GT Road, Kalyanpur, Kanpur Nagar - 208017",
    areas: "Kalyanpur, IIT Kanpur Campus, CSJM University area, Rawatpur, Vikas Nagar, Indira Nagar, Gurudev Palace, Bithoor Road, Mandhana",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "govind-nagar",
    name: "Govind Nagar (South Kanpur)",
    sro: "SRO Govind Nagar",
    address: "Sub-Registrar Office, Govind Nagar, South Kanpur - 208006",
    areas: "Govind Nagar, Kidwai Nagar, Barra (Phases 1-8), Gujaini, Fazalganj, Dada Nagar Industrial Area, Shastri Nagar, Juhi, Ratan Lal Nagar",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "ghatampur",
    name: "Ghatampur",
    sro: "SRO Ghatampur",
    address: "Tehsil Campus, Ghatampur, Kanpur Nagar - 209206",
    areas: "Ghatampur Tehsil, Patara, Bhitargaon, Sajeti, Reuna, rural farmland and agricultural properties",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "bilhaur",
    name: "Bilhaur",
    sro: "SRO Bilhaur",
    address: "Tehsil Campus, Bilhaur, Kanpur Nagar - 209202",
    areas: "Bilhaur Tehsil, Kakwan, Shivrajpur, Chaubepur, agricultural land tracts, mango orchards, rural estates",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
  {
    id: "narwal",
    name: "Narwal",
    sro: "SRO Narwal",
    address: "Tehsil Campus, Narwal, Kanpur Nagar - 209401",
    areas: "Narwal Tehsil, Sarsaul, Maharajpur, Chakeri extension, agricultural plots along Kanpur-Prayagraj highway",
    timings: "10:00 AM to 5:00 PM (Mon-Sat, 2nd & 4th Sat closed)",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "item-1",
    title: "Will maker Proof of Identity & Address",
    description: "Original Aadhaar Card and PAN Card of the Will maker.",
    checked: true,
  },
  {
    id: "item-2",
    title: "Two Independent Adult Witnesses",
    description: "Two adult witnesses (minimum 18 years) with their Aadhaar cards. Witnesses must not be heirs.",
    checked: true,
  },
  {
    id: "item-3",
    title: "Original Printed Will Document",
    description: "Two clean printed copies of the Will document on durable white legal paper.",
    checked: false,
  },
  {
    id: "item-4",
    title: "Passport Sized Photographs",
    description: "Two recent passport size color photographs of the Will maker and one each of both witnesses.",
    checked: false,
  },
  {
    id: "item-5",
    title: "KDA / KNN Property Documents",
    description: "KDA allotment letter, possession paper, registered sale deed, or municipal tax receipt for property ID.",
    checked: false,
  },
  {
    id: "item-6",
    title: "Doctor's Medical Fitness Certificate",
    description: "Fitness paper from a registered MBBS doctor confirming sound mental disposing capacity (essential for seniors 60+).",
    checked: false,
  },
  {
    id: "item-7",
    title: "IGRSUP Online Appointment Token",
    description: "Official e-appointment booking receipt and ₹100 online registration fee receipt from igrsup.gov.in.",
    checked: false,
  },
];

interface KanpurLocality {
  id: string;
  badge: string;
  sroBadge: string;
  title: string;
  subAreas: string[];
  leadText: string;
  strongKeyword: string;
  descRest: string;
  sroHub: string;
  sroDetail: string;
  corridor: string;
  ctaText: string;
}

const KANPUR_LOCALITIES: KanpurLocality[] = [
  {
    id: "civil-lines",
    badge: "CIVIL LINES & VIP ROAD",
    sroBadge: "SRO Sadar",
    title: "Will Drafting Services in Civil Lines & Mall Road",
    subAreas: ["Civil Lines Kothis", "VIP Road", "Mall Road Shop", "Phoolbagh", "Kanpur Cantonment"],
    leadText: "Looking for verified ",
    strongKeyword: "Will drafting services in Civil Lines & Mall Road",
    descRest: "? Civil Lines houses Kanpur's elite office institutions, banking headquarters, and high-value colonial freehold bungalows. Our lawyers structure precise executor powers, shop asset transfer clauses, and fight-proof share split covenants.",
    sroHub: "Collectorate Compound, Civil Lines",
    sroDetail: "Collectorate SRO registration, high-value freehold property title check, and doorstep biometric coordination for prominent business families.",
    corridor: "Central Office Corridor",
    ctaText: "Draft Civil Lines Will",
  },
  {
    id: "swaroop-nagar",
    badge: "SWAROOP NAGAR PRIME",
    sroBadge: "SRO Sadar",
    title: "Will Drafting Services in Swaroop Nagar & Motijheel",
    subAreas: ["Swaroop Nagar KDA Plots", "Motijheel Enclave", "GSVM Medical Campus Area", "Arya Nagar Crossing"],
    leadText: "Secure premier ",
    strongKeyword: "Will drafting services in Swaroop Nagar & Motijheel",
    descRest: ". As Kanpur's most prestigious home enclave, Swaroop Nagar is dominated by senior industrialists, doctors, and multi-crore KDA home plots. We draft tailored clauses for KDA leasehold to freehold conversion, single-child and multi-heir split, and municipal tax name change.",
    sroHub: "SRO Sadar (Collectorate Compound)",
    sroDetail: "KDA Moti Jheel authority name change guidance, registered Will Book III archival check, and fast-track IGRSUP slot booking.",
    corridor: "Upscale Home Core",
    ctaText: "Draft Swaroop Nagar Will",
  },
  {
    id: "tilak-nagar",
    badge: "TILAK NAGAR ENCLAVE",
    sroBadge: "SRO Sadar",
    title: "Will Drafting Services in Tilak Nagar & Arya Nagar",
    subAreas: ["Tilak Nagar Kothis", "Arya Nagar Markets", "Vishnupuri", "Parwati Bagla Road", "Khalasi Line"],
    leadText: "Get specialized ",
    strongKeyword: "Will drafting services in Tilak Nagar & Arya Nagar",
    descRest: ". Featuring established multi-story luxury apartments and independent family homes. Our legal team drafts clear undivided land share (UDS) allocation, covered parking succession, and apartment owners association (AOA) transfer clauses under UP laws.",
    sroHub: "SRO Sadar (Collectorate Compound)",
    sroDetail: "Multi-story builder floor succession structuring, family trust integration, and Section 31 home visit coordination.",
    corridor: "Heritage & Apartment Belt",
    ctaText: "Draft Tilak Nagar Will",
  },
  {
    id: "kakadeo",
    badge: "KAKADEO EDUCATION HUB",
    sroBadge: "SRO Govind Nagar / Sadar",
    title: "Will Drafting Services in Kakadeo & Geeta Nagar",
    subAreas: ["Kakadeo Coaching Corridor", "Geeta Nagar", "Sharda Nagar", "Deoki Nagar", "Chapasi Road"],
    leadText: "Opt for professional ",
    strongKeyword: "Will drafting services in Kakadeo & Geeta Nagar",
    descRest: ". Renowned as Kanpur's education and student accommodation center, assets here often generate recurring hostel and shop coaching rental income. We create life-interest and revenue-sharing mechanisms for surviving spouses while keeping real estate undivided.",
    sroHub: "SRO Govind Nagar / SRO Sadar",
    sroDetail: "Rental shop income preservation clauses, hostel asset division, and municipal property tax name change help.",
    corridor: "Education & Rental Belt",
    ctaText: "Draft Kakadeo Will",
  },
  {
    id: "govind-nagar",
    badge: "SOUTH KANPUR COMMERCIAL",
    sroBadge: "SRO Govind Nagar",
    title: "Will Drafting Services in Govind Nagar & Fazalganj",
    subAreas: ["Govind Nagar Markets", "Fazalganj Light Industrial", "Ratan Lal Nagar", "Dabouli", "Gupta Market"],
    leadText: "Choose dedicated ",
    strongKeyword: "Will drafting services in Govind Nagar & Fazalganj",
    descRest: ". The trade and retail engine of South Kanpur with thousands of shop shops and light manufacturing workshops. We draft specialized retail tenancy distinction terms, proprietary firm transfer covenants, and partnership buyout clauses to prevent family court fights.",
    sroHub: "SRO Govind Nagar (South Kanpur)",
    sroDetail: "Local South Kanpur SRO appointment generation, proprietary shop succession advisory, and bank current account nominee transfer.",
    corridor: "Shop Trade Corridor",
    ctaText: "Draft Govind Nagar Will",
  },
  {
    id: "kidwai-nagar",
    badge: "KIDWAI NAGAR RESIDENTIAL",
    sroBadge: "SRO Govind Nagar",
    title: "Will Drafting Services in Kidwai Nagar & Yashoda Nagar",
    subAreas: ["Kidwai Nagar Blocks (K, M, N, Y)", "Yashoda Nagar", "Juhi", "Hanspuram", "Transport Nagar"],
    leadText: "Access authoritative ",
    strongKeyword: "Will drafting services in Kidwai Nagar & Yashoda Nagar",
    descRest: ". Well-organized KDA housing sectors characterized by multi-generation families and independent multi-story homes. We formulate precise floor-wise bequests, separate electrical meter demarcations, and common rooftop access easements.",
    sroHub: "SRO Govind Nagar",
    sroDetail: "KDA sector house transfer papers, joint family settlement clauses, and SRO Book III registration escort.",
    corridor: "Planned Housing Zone",
    ctaText: "Draft Kidwai Nagar Will",
  },
  {
    id: "kalyanpur",
    badge: "KALYANPUR ACADEMIC ZONE",
    sroBadge: "SRO Kalyanpur",
    title: "Will Drafting Services in Kalyanpur & Rawatpur",
    subAreas: ["IIT Kanpur Campus Vicinity", "Rawatpur", "Vikas Nagar", "Indira Nagar Kanpur", "Mandhana"],
    leadText: "Secure top-rated ",
    strongKeyword: "Will drafting services in Kalyanpur & Rawatpur",
    descRest: ". Fast-growing home and academic corridor housing professors, engineers, and NRI families. We draft digital asset succession, university pensioner family trust clauses, and seamless Kanpur Nagar Nigam property tax record transfer.",
    sroHub: "SRO Kalyanpur (GT Road / Tehsil)",
    sroDetail: "Kalyanpur Tehsil SRO scheduling, NRI cross-border estate papers, and digital asset transfer protocols.",
    corridor: "Academic & Tech Corridor",
    ctaText: "Draft Kalyanpur Will",
  },
  {
    id: "panki",
    badge: "INDUSTRIAL MANUFACTURING BELT",
    sroBadge: "SRO Govind Nagar",
    title: "Will Drafting Services in Panki & Dada Nagar",
    subAreas: ["Panki Industrial Area Site 1-5", "Dada Nagar MSME Estate", "Panki Dham", "Udyog Kunj"],
    leadText: "Consult senior lawyers for ",
    strongKeyword: "Will drafting services in Panki & Dada Nagar",
    descRest: ". As Kanpur's primary heavy engineering, packaging, chemical, and MSME industrial center, business continuity is paramount. We draft UPSIDA leasehold industrial plot transfers, company shares succession, and plant machinery split without operational disruption.",
    sroHub: "SRO Govind Nagar / UPSIDA",
    sroDetail: "UPSIDA leasehold factory plot transfer advisory, MSME director share transfer, and corporate bank mandate drafting.",
    corridor: "Industrial & Manufacturing Hub",
    ctaText: "Draft Industrial Will",
  },
  {
    id: "barra",
    badge: "BARRA TOWNSHIP",
    sroBadge: "SRO Govind Nagar",
    title: "Will Drafting Services in Barra & Gujaini",
    subAreas: ["Barra Sectors 1, 2, 4, 6 & 8", "Gujaini KDA Flats", "Meharban Singh Ka Purwa", "Damodar Nagar"],
    leadText: "Opt for verified ",
    strongKeyword: "Will drafting services in Barra & Gujaini",
    descRest: ". Encompassing one of North India's largest planned home layouts developed by KDA. We make sure your original KDA allotment orders, hire-buy final clearance papers, and municipal house tax records are legally aligned to avoid name change roadblocks.",
    sroHub: "SRO Govind Nagar",
    sroDetail: "KDA hire-buy succession check, SRO registration scheduling, and nominal fee challan processing on IGRSUP.",
    corridor: "South-West Home Belt",
    ctaText: "Draft Barra Will",
  },
  {
    id: "bilhaur-ghatampur",
    badge: "RURAL FARMLAND & BITHOOR",
    sroBadge: "SRO Bilhaur / Ghatampur",
    title: "Will Drafting Services in Bilhaur, Ghatampur & Bithoor",
    subAreas: ["Bilhaur Tehsil", "Ghatampur Farm Belt", "Historic Bithoor Ganga Ghats", "Shivrajpur", "Narwal"],
    leadText: "Get specialized ",
    strongKeyword: "Will drafting services in Bilhaur, Ghatampur & Bithoor",
    descRest: ". Farm land succession in Uttar Pradesh is strictly governed by Sections 107 and 108 of the UP Revenue Code, 2006. Our lawyers make sure revenue Khatauni and Khasra details match UP Bhulekh records for seamless Tehsil name change.",
    sroHub: "SRO Bilhaur & SRO Ghatampur",
    sroDetail: "UP Revenue Code 2006 compliance review, farm land ceiling check, and Tehsil Khatauni name change support.",
    corridor: "Farm & Heritage Corridor",
    ctaText: "Draft Farmland Will",
  },
];

export default function KanpurLocationClient({ faqs }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("kanpur-overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("sadar");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
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
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
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

  const filteredDistricts = KANPUR_DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.areas.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.sro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeDistrictData =
    KANPUR_DISTRICTS.find((d) => d.id === selectedDistrict) || KANPUR_DISTRICTS[0];

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
                <span>KANPUR NAGAR ESTATE SUCCESSION DESK</span>
              </div>

              {/* Strictly 1 H1 Tag: Length 55 characters (Target: 30-65 chars) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                Will Drafting Services in Kanpur: Online Legal Drafting
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Protect your KDA plots, shop units, and family family estates in Kanpur.
                Get expert lawyer drafting, UP IGRSUP e-registration guidance, and doorstep signing for senior citizens across Kanpur Nagar.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  <span>Draft Your Kanpur Will Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#kanpur-sro-directory"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20 text-center"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Kanpur SRO Directory</span>
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
                  src="/images/will-drafting-in-kanpur.jpg"
                  alt="Online Will Drafting and Property Succession in Kanpur Uttar Pradesh"
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
                6 Tehsils &amp; SROs
              </span>
              <span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-1 leading-tight">
                Kanpur SRO Coverage
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
                Allahabad HC Area
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
            <section id="kanpur-overview" className="scroll-target space-y-6">
              <div className="rounded-3xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C65378]" />
                  <span>KANPUR NAGAR SUCCESSION BRIEF</span>
                </div>
                {/* Length: 52 chars (dec), 56 chars (raw) - Strictly <= 70 chars */}
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                  Key Highlights: Will Making &amp; Registration in Kanpur
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Optional UP Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Will registration is optional across Uttar Pradesh under Section 18(e) of the Registration Act, 1908. An unregistered Will on plain white paper signed before two witnesses is legally enforceable.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Probate Exemption in UP</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Kanpur is a non-presidency town governed by Allahabad High Court rulings. Court probate is strictly non-needed in Uttar Pradesh for Hindu, Sikh, Jain, and Buddhist estates.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Stamp Duty in UP</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Wills incur ₹0 stamp duty in Uttar Pradesh. At Kanpur Sub-Registrar offices, testators pay only a nominal flat government registration fee of ₹100 plus scanning charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Smooth KDA &amp; KNN Name Change</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A registered Will drastically accelerates property substitution before the Kanpur Development Authority (KDA) and Kanpur Nagar Nigam, bypassing 30-day public objection notices.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: STATUTORY LEGAL FRAMEWORK */}
            <section id="kanpur-legal-framework" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY PROVISIONS</span>
                </div>
                {/* Length: 48 chars (dec), 52 chars (raw) - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1. Will Drafting &amp; Legal Framework in Kanpur, UP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Estate succession and Will drafting in Kanpur are governed by two principal central statutes: the <strong>Indian Succession Act, 1925</strong> and the <strong>Registration Act, 1908</strong>, complemented by state-level enactments including the <strong>Uttar Pradesh Revenue Code, 2006</strong>.
                  Any competent adult possessing sound mind can execute a Will to bequeath their self-acquired real estate, shop assets, business shares, bank deposits, and jewelry.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kanpur presents a distinct blend of assets. Families often hold high-value KDA home plots in Swaroop Nagar or Civil Lines, bustling retail shops in Govind Nagar or General Ganj, industrial factories in Panki and Dada Nagar, or family farmland in Bilhaur and Ghatampur.
                  Without an clear legal Will, these multi-generational estates face severe succession bottlenecks and property name change fights before local municipal offices.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    18+
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Legal Capacity</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Will maker must be at least 18 years old and of sound disposing mind under Section 59.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Free Volition</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Signed voluntarily without undue influence, coercion, family duress, or fraud (Section 61).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    2x
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Two Witnesses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be signed in the simultaneous presence of at least two adult witnesses (Section 63).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Independent Heirs</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Witnesses must not be heirs under the Will to avoid bequest voidance (Section 67).
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
                {/* Length: 44 chars - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  2. Is Will Registration Needed in Kanpur?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under Section 18(e) of the Registration Act, 1908, registering a Will is entirely <strong>optional</strong> in the State of Uttar Pradesh.
                  An unregistered Will signed on plain paper and duly attested by two independent witnesses is legally enforceable in Indian courts.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  However, in industrial and shop cities like Kanpur, registering your Will at the local SRO office via the UP IGRS portal is strongly advised by senior legal counsel.
                  The table below highlights the crucial differences:
                </p>
              </div>

              {/* FULL-WIDTH COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="p-4 sm:p-5">Succession Parameter</th>
                      <th className="p-4 sm:p-5 text-emerald-800 bg-emerald-50/50">
                        Registered Will (UP IGRS SRO Kanpur)
                      </th>
                      <th className="p-4 sm:p-5 text-slate-600">
                        Unregistered Will (Plain Paper)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Legal Validity</td>
                      <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                        100% valid; carries official presumption of genuineness in court.
                      </td>
                      <td className="p-4 sm:p-5">
                        Legally valid, but burden of proving signing lies entirely on propounder.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">KDA &amp; Municipal Name Change</td>
                      <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                        Expedited property transfer at KDA Moti Jheel and Kanpur Nagar Nigam.
                      </td>
                      <td className="p-4 sm:p-5">
                        Triggers needed newspaper notices, 30-day objection wait, and indemnity bonds.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Stamp Duty in UP</td>
                      <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                        ₹0 stamp duty. Fixed flat registration fee of ₹100 on IGRSUP.
                      </td>
                      <td className="p-4 sm:p-5">
                        ₹0 stamp duty (signed on plain white paper).
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Proof Strength</td>
                      <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                        Sub-Registrar confirms identity and sound mental state under official seal.
                      </td>
                      <td className="p-4 sm:p-5">
                        Frequently contested for suspicious circumstances, coercion, or signature forgery.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Loss or Tampering Risk</td>
                      <td className="p-4 sm:p-5 bg-emerald-50/20 text-emerald-900 font-semibold">
                        Zero risk. Certified copy can be retrieved from SRO Book III archives.
                      </td>
                      <td className="p-4 sm:p-5">
                        High risk. If the original physical paper is lost or destroyed, estate passes by intestacy.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: PROBATE EXEMPTION */}
            <section id="kanpur-probate-rules" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>HIGH COURT JURISPRUDENCE</span>
                </div>
                {/* Length: 49 chars - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  3. Kanpur Probate Rules: Allahabad High Court Law
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  A common misconception among Kanpur property owners is that getting probate from a civil court is needed to transfer inherited assets. Under Section 213 read with Section 57 of the <strong>Indian Succession Act, 1925</strong>, probate is needed only for estates situated in the three historical British presidency towns: <strong>Mumbai, Kolkata, and Chennai</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kanpur is a non-presidency metropolitan district under the appellate area of the <strong>Hon&apos;ble Allahabad High Court</strong>. In catena of landmark rulings, the Allahabad High Court has affirmed that getting court probate is <strong>strictly optional</strong> in Uttar Pradesh for Hindu, Sikh, Jain, and Buddhist testators.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold">
                    ₹
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Saves Substantial Court Fees
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Probate petitions in civil courts require ad-valorem court fees based on property market value. In Kanpur, a registered Will bypasses these hefty court duties altogether.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold">
                    ⏱
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Avoids 2 to 4 Years of Court Delays
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Civil court probate proceedings involve general citations, hearings, and family notices that often take 24 to 48 months. A registered Will allows immediate KDA and bank transfer.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: KDA PROPERTY SUCCESSION */}
            <section id="kda-property-succession" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>DEVELOPMENT AUTHORITY SUCCESSION</span>
                </div>
                {/* Length: 46 chars (dec), 50 chars (raw) - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4. KDA Property Will Transfer &amp; Name Change Guide
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  The <strong>Kanpur Development Authority (KDA)</strong>, headquartered at Moti Jheel, regulates planned urban developments across Kanpur under the Uttar Pradesh Urban Planning and Development Act, 1973.
                  Whether your property is an independent home plot in Swaroop Nagar, a shop complex in Kakadeo, or a multi-unit housing flat in Barra, succession name change requires adherence to KDA guidelines.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  KDA Name Change Protocol for Inherited Assets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">Step 1</span>
                    <h4 className="font-bold text-sm text-slate-900">Document Filing</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submit form at KDA Moti Jheel with original allotment letter, death paper, registered Will copy, and surviving legal heir affidavit.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">Step 2</span>
                    <h4 className="font-bold text-sm text-slate-900">Notice &amp; Check</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      For registered Wills, KDA verifies the SRO Book III record. Unregistered Wills require public advertisement in daily Hindi and English newspapers.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">Step 3</span>
                    <h4 className="font-bold text-sm text-slate-900">Name Change Order</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Upon clearance, KDA issues a formal name change letter substituting the deceased owner&apos;s name with the heir, enabling freehold conversion or subsequent sale.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: UP REVENUE CODE & FARMLAND */}
            <section id="up-revenue-code-108" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>AGRICULTURAL LAND SUCCESSION</span>
                </div>
                {/* Length: 47 chars - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  5. UP Revenue Code: Farm Farmland Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kanpur Nagar district encompasses vast farm belts across Bilhaur, Ghatampur, Bithoor, and Narwal.
                  Succession of farm land in Uttar Pradesh is not governed by personal religious laws, but exclusively by the <strong>Uttar Pradesh Revenue Code, 2006</strong>.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Under <strong>Section 107</strong> of the UP Revenue Code, a Bhumidhar with transferable rights can bequeath their landholding by Will.
                  However, testators must carefully respect legal ceilings and succession rules under <strong>Section 108</strong> to prevent the Will from being challenged during Tehsil Khatauni name change on the UP Bhulekh portal.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Crucial Considerations for Kanpur Farmland Wills</span>
                </div>
                <ul className="text-xs sm:text-sm text-amber-900/90 space-y-2 list-disc pl-5 leading-relaxed">
                  <li>
                    <strong>Bhumidhari Status:</strong> Only Bhumidhars with transferable rights can make a valid Will. Asamis and government licensees cannot bequeath land.
                  </li>
                  <li>
                    <strong>Scheduled Caste Landholdings:</strong> Land belonging to a person of Scheduled Caste cannot be transferred to a non-SC individual through a Will without prior legal sanction from the District Collector.
                  </li>
                  <li>
                    <strong>Khatauni Records:</strong> Always cross-check that Khasra numbers, Gata numbers, and Tehsil Khatauni entries match the revenue records on UP Bhulekh exactly.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 6: SRO DIRECTORY */}
            <section id="kanpur-sro-directory" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <MapPin className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT REGISTRY OFFICES</span>
                </div>
                {/* Length: 49 chars - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  6. Kanpur Sub-Registrar Offices: Tehsil Directory
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Will registration appointments across Kanpur Nagar district are booked online on the Stamps and Registration Department Uttar Pradesh portal (<strong>IGRSUP</strong> - <code>igrsup.gov.in</code>).
                  Locate your jurisdictional SRO office below based on where you reside or own property:
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by area (e.g. Swaroop Nagar, Kalyanpur, Barra)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                />
              </div>

              {/* SRO TABS / CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDistricts.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDistrict(d.id)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer text-left space-y-2.5 ${
                      selectedDistrict === d.id
                        ? "bg-white border-[#C65378] shadow-md ring-2 ring-[#C65378]/10"
                        : "bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-900">{d.name}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                        SRO
                      </span>
                    </div>
                    <p className="text-xs text-rose-700 font-bold">{d.sro}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800">Address:</strong> {d.address}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <strong className="text-slate-700">Area:</strong> {d.areas}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Timings: {d.timings}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: LOCALITY-WISE WILL SERVICES */}
            <section id="kanpur-area-coverage" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Home className="w-4 h-4 text-[#C65378]" />
                  <span>LOCAL ASSET ADVISORY</span>
                </div>
                {/* Length: 49 chars - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Locality-Wise Will Drafting Across Kanpur Areas
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Kanpur&apos;s diverse real estate encompasses premium KDA bungalows, high-rise builder floors, bustling trade shops, large manufacturing complexes, and rural farmlands.
                  Review the strategic succession nuances tailored for prominent Kanpur neighborhoods:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {KANPUR_LOCALITIES.map((loc) => (
                  <div
                    key={loc.id}
                    className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#C65378] border border-rose-100">
                          <MapPin className="w-3.5 h-3.5" />
                          {loc.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {loc.sroBadge}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#C65378] transition-colors">
                        {loc.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        {loc.subAreas.map((area, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-100 font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {loc.leadText}
                        <strong>{loc.strongKeyword}</strong>
                        {loc.descRest}
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <Building className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>SRO Hub: {loc.sroHub}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {loc.sroDetail}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">{loc.corridor}</span>
                      <Link
                        href="/start"
                        onClick={handleStartDraft}
                        aria-label={loc.title}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group-hover:translate-x-0.5 transition-all"
                      >
                        <span>{loc.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8: 5-STEP REGISTRATION SOP */}
            <section id="step-by-step-kanpur-sop" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>PROCEDURAL ROADMAP</span>
                </div>
                {/* Length: 47 chars - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  8. Step-by-Step Will Registration SOP on IGRSUP
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Follow this verified five-step protocol to prepare, draft, execute, and register your Will before the Sub-Registrar in Kanpur Nagar:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Compile Asset Portfolio &amp; Appoint Trusted Executor
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      List all your Kanpur assets including KDA plot allotment details, registry deeds, shop numbers, bank account IBAN/IFSC details, demat statements, and jewelry. Choose a reliable executor to administer the estate.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Draft Customized Will with Legal Clauses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Draft your Will online with WillDrafting or consult our senior lawyers. Ensure clauses for clear survivorship, guardian appointment for minors, alternate heirs, and revocation of prior wills are included.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Sign Before Two Independent Adult Witnesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Print the Will on durable paper. Sign or place your thumb impression at the bottom of each page in the continuous presence of two independent witnesses who sign their names and addresses.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Generate Online e-Appointment on igrsup.gov.in
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Access the UP Stamps &amp; Registration portal, enter Kanpur Nagar, select your tehsil SRO office (Sadar, Kalyanpur, Govind Nagar, etc.), upload draft particulars, pay ₹100 registration fee, and download your e-token.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C65378] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    5
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      Biometric SRO Registration &amp; Book III Preservation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Appear before the Sub-Registrar with both witnesses carrying original Aadhaar cards. Complete digital photo and biometric fingerprint capture. The SRO seals the Will under Book III archives and issues your registered copy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: SECTION 31 DOORSTEP VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>DOORSTEP REGISTRATION SERVICES</span>
                </div>
                {/* Length: 52 chars - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9. Section 31 Doorstep Will Registration for Seniors
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Visiting crowded government tehsils like the Collectorate in Civil Lines can be exhausting for senior citizens, bedridden elders, or medically infirm people.
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar holds discretionary authority to attend the residence or private hospital of a Will maker to complete formal Will registration.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-sm text-slate-900">1. Medical Certification</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Obtain an MBBS doctor&apos;s medical fitness paper certifying mental soundness and explaining why travel to the registry office is medically inadvisable.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-sm text-slate-900">2. Commission Petition</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      File a Section 31 doorstep petition with the jurisdictional Sub-Registrar in Kanpur along with the doctor&apos;s note, paying official government inspection travel fees.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-sm text-slate-900">3. Doorstep Signing</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sub-Registrar visits your home in Swaroop Nagar, Civil Lines, or Kidwai Nagar, captures biometrics, verifies witnesses, and completes registration on site.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: INTERACTIVE DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4 text-[#C65378]" />
                  <span>REGISTRATION READINESS</span>
                </div>
                {/* Length: 48 chars - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  10. Document Checklist for Kanpur Sub-Registrar
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Interactive document validator for your Kanpur Sub-Registrar appointment. Check items off to verify your readiness before visiting the registry office:
                </p>
              </div>

              {/* INTERACTIVE CHECKLIST CONTAINER */}
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      DOCUMENT VERIFICATION PROGRESS
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {checkedCount} of {checklist.length} Documents Prepared
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      checkedCount === checklist.length
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-[#C65378]"
                    }`}
                  >
                    {Math.round((checkedCount / checklist.length) * 100)}% Complete
                  </span>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        item.checked
                          ? "bg-emerald-50/40 border-emerald-200/80"
                          : "bg-slate-50/60 border-slate-200/70 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          item.checked
                            ? "bg-emerald-600 text-white"
                            : "border-2 border-slate-300 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <h4
                          className={`font-bold text-sm ${
                            item.checked ? "text-emerald-950" : "text-slate-900"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 11: KANPUR PROPERTY TYPES */}
            <section id="kanpur-property-types" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>ASSET CLASSIFICATIONS</span>
                </div>
                {/* Length: 47 chars (dec), 51 chars (raw) - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  11. Kanpur Property Types: KDA, Freehold &amp; Land
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Succession planning requires tailoring specific testamentary clauses based on the legal nature of each asset category in Kanpur:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] uppercase">Type 1</span>
                  <h3 className="font-extrabold text-base text-slate-900">
                    KDA Leasehold &amp; Freehold Plots
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Allotted by Kanpur Development Authority in Swaroop Nagar, Kidwai Nagar, and Barra. Specify original scheme name, allotment letter number, possession slip, and lease terms clearly.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] uppercase">Type 2</span>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Freehold Kothis &amp; Builder Floors
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Family kothis in Civil Lines and newly constructed apartments in Tilak Nagar or Kakadeo. Demarcate floor-wise rights, terrace easements, and undivided land shares.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] uppercase">Type 3</span>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Industrial Units &amp; Shop Shops
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    UPSIDA factory sheds in Panki, MSME engineering units in Dada Nagar, leather export firms in Jajmau, and retail shops in General Ganj. Specify partnership equity transfers and trade licenses.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <span className="text-xs font-mono font-bold text-[#C65378] uppercase">Type 4</span>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Farm Land &amp; Farmhouses
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Farmland tracts in Bilhaur, Ghatampur, and Narwal. Must comply with Section 107 and 108 UP Revenue Code, citing accurate Khasra/Khatauni numbers for smooth UP Bhulekh name change.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: REGISTRATION FEES */}
            <section id="kanpur-registration-fees" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Stamp className="w-4 h-4 text-[#C65378]" />
                  <span>GOVERNMENT STATUTORY COSTS</span>
                </div>
                {/* Length: 48 chars (dec), 52 chars (raw) - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  12. IGRSUP Portal Registration Fees &amp; Exemptions
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Unlike sale deeds or gift deeds which attract substantial ad-valorem stamp duties in Uttar Pradesh, testamentary Wills are completely exempt from stamp duty under the Indian Stamp Act, 1899:
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="p-4 sm:p-5">Government Fee Component</th>
                      <th className="p-4 sm:p-5">Applicable UP Rate</th>
                      <th className="p-4 sm:p-5">Legal Legal Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Stamp Duty</td>
                      <td className="p-4 sm:p-5 text-emerald-800 font-bold">₹0 (100% Exempt)</td>
                      <td className="p-4 sm:p-5 text-slate-600">
                        Article 64, Schedule I-B, Indian Stamp Act (UP Amendment)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Registration Fee</td>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">₹100 flat</td>
                      <td className="p-4 sm:p-5 text-slate-600">
                        Standard fixed fee on IGRSUP portal (igrsup.gov.in)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Document Scanning &amp; Pasting</td>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">₹100 to ₹200</td>
                      <td className="p-4 sm:p-5 text-slate-600">
                        Official digital archival fee for Book III scanning
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Section 31 Doorstep Commission</td>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Prescribed travel fee</td>
                      <td className="p-4 sm:p-5 text-slate-600">
                        Applicable only when SRO visits home for elderly testators
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 13: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Award className="w-4 h-4 text-[#C65378]" />
                  <span>TRANSPARENT LEGAL PRICING</span>
                </div>
                {/* Length: 45 chars (dec), 49 chars (raw) - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  13. Transparent Will Packages &amp; Legal Pricing
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Choose a tailored estate planning package designed mainly for Kanpur property owners, business houses, and families:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* BASIC TIER */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                      ESSENTIAL
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">Online Lawyer Will</h3>
                    <div className="text-2xl font-black text-slate-900">₹1,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ideal for individual homeowners in Kanpur with straightforward home and financial assets.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>High Court Lawyer Vetted</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>KDA Property Clauses Included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant PDF Delivery</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs text-center transition-all cursor-pointer"
                  >
                    Start Online Draft
                  </a>
                </div>

                {/* ADVOCATE ASSISTED - POPULAR */}
                <div className="p-6 rounded-3xl bg-white border-2 border-[#C65378] shadow-md space-y-4 flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C65378] text-white px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    MOST POPULAR
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#C65378] uppercase tracking-wider">
                      ADVOCATE ASSISTED
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">Senior Lawyer Review</h3>
                    <div className="text-2xl font-black text-slate-900">₹4,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Full legal talk for multiple real estate holdings, shop shops, and farmland.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>1-on-1 Senior Lawyer Talk</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>UP Revenue Code Section 108 Structuring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>IGRSUP Online Appointment Guidance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Unlimited Revisions for 30 Days</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-2xl bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold text-xs text-center transition-all shadow-md shadow-[#C65378]/20 cursor-pointer"
                  >
                    Select Lawyer Plan
                  </a>
                </div>

                {/* SRO REGISTRATION ASSISTED */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                      CONCIERGE
                    </span>
                    <h3 className="font-extrabold text-xl text-slate-900">Complete SRO Help</h3>
                    <div className="text-2xl font-black text-slate-900">₹9,990</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      End-to-end support with lawyer drafting, IGRSUP slot booking, and Kanpur SRO physical presence.
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete Lawyer Will Drafting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Kanpur SRO Lawyer Escort</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Section 31 Doorstep Coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Doctor Medical Certificate Format</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs text-center transition-all cursor-pointer"
                  >
                    Select Concierge Plan
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 14: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <HelpCircle className="w-4 h-4 text-[#C65378]" />
                  <span>COMMON QUESTIONS</span>
                </div>
                {/* Length: 44 chars - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  14. Frequently Asked Questions: Kanpur Wills
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Answers to legal queries regarding Will making, SRO registration, KDA property mutations, and farm succession in Kanpur Nagar:
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 cursor-pointer"
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
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>OFFICIAL LEGAL RESOURCES</span>
                </div>
                {/* Length: 47 chars (dec), 51 chars (raw) - Strictly <= 70 chars */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  15. Legal References &amp; Kanpur Legal Portals
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
                  Authoritative statutes, government portals, and office guidelines governing estate planning and property name change across Kanpur, Uttar Pradesh:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a
                  href="https://igrsup.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#C65378] transition-all space-y-1.5 group"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                    OFFICIAL PORTAL
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                    IGRSUP Registration Portal
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Stamps &amp; Registration Department UP e-appointment booking for Kanpur SROs.
                  </p>
                </a>

                <a
                  href="https://kda.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#C65378] transition-all space-y-1.5 group"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                    CIVIC AUTHORITY
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                    Kanpur Development Authority
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    KDA Moti Jheel portal for home and shop property name change.
                  </p>
                </a>

                <a
                  href="https://igrsup.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#C65378] transition-all space-y-1.5 group"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C65378] font-bold">
                    REVENUE RECORDS
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                    UP Bhulekh Land Records
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Official Khatauni land records check for Bilhaur and Ghatampur tehsils.
                  </p>
                </a>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Protect Your Kanpur Assets &amp; Family Today
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Do not leave your hard-earned Kanpur assets and shop enterprises to painful municipal succession fights.
                Draft a legally robust Will online in minutes or consult our senior Uttar Pradesh estate lawyers.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-extrabold text-sm sm:text-base transition-all shadow-lg shadow-[#C65378]/25 cursor-pointer text-center"
                >
                  Draft Your Kanpur Will Now
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base transition-all border border-white/20 text-center"
                >
                  Book Lawyer Talk
                </Link>
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
                Visual Blueprint: Kanpur Estate Planning &amp; Registration Architecture
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] max-h-[75vh] mt-3 bg-[#172228] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/will-drafting-in-kanpur.jpg"
                alt="High Resolution Visual Blueprint: Kanpur Will Drafting and SRO Registration"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Kanpur Nagar SRO Registered &amp; KDA Name Change Compliant</span>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="font-bold text-[#C65378] hover:underline"
              >
                Start Your Kanpur Will →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
