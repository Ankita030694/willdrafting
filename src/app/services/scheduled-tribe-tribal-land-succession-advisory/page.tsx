import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Landmark,
  BookOpen,
  Users,
  Scale,
  Building2,
  Coins,
  AlertCircle,
  HelpCircle,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import TribalLandSuccessionInteractive from "@/components/TribalLandSuccessionInteractive";
import CopyableTrustClauseBox from "@/components/CopyableTrustClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Tribal Land Inheritance Lawyer India | WillDrafting",
  },
  description:
    "Specialized legal advisory for Scheduled Tribe land succession and will validity under Fifth Schedule customary laws and CNT Act. Expert revenue counsel.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "tribal land inheritance lawyer scheduled areas india",
    "scheduled tribe will validity advocate",
    "cnt act spt act land dispute lawyer",
    "5th schedule tribal land transfer legal advisory",
    "section 2 2 hindu succession act exclusion advocate",
    "tribal daughter ancestral property inheritance rights",
    "madhu kishwar vs state of bihar life estate judgment",
    "chota nagpur tenancy act section 46 71a lawyer",
    "santhal parganas tenancy act section 20 raiyati succession",
    "madhya pradesh land revenue code section 165 tribal land",
    "sar court scheduled area regulation eviction counsel",
    "ama legal solutions tribal land succession advisory",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory",
      "x-default":
        "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory",
    },
  },
  openGraph: {
    title: "Tribal Land Inheritance Lawyer India | WillDrafting",
    description:
      "Specialized legal advisory for Scheduled Tribe land succession and will validity under Fifth Schedule customary laws and CNT Act. Expert revenue counsel.",
    url: "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/scheduled-tribe-tribal-land-succession-advisory-og.jpg",
        width: 1200,
        height: 675,
        alt: "Tribal Land Inheritance Lawyer India Scheduled Areas Customary Law Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Tribal Land Inheritance Lawyer India | WillDrafting",
    description:
      "Specialized legal advisory for Scheduled Tribe land succession and will validity under Fifth Schedule customary laws and CNT Act. Expert revenue counsel.",
    images: [
      "https://www.willdrafting.in/images/scheduled-tribe-tribal-land-succession-advisory-og.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const TRIBAL_FAQS = [
  {
    q: "Why does the Hindu Succession Act not apply to Scheduled Tribe members?",
    a: "Under Section 2(2) of the Hindu Succession Act, 1956, Scheduled Tribes are strictly excluded from general Hindu inheritance laws. The Central Government has not issued an official gazette notification extending the Act to tribal communities. Consequently, ancestral land devolves according to uncodified tribal custom rather than statutory coparcenary rules.",
  },
  {
    q: "Can a Scheduled Tribe father bequeath ancestral raiyati land to his daughter?",
    a: "Yes. While intestate customary rules favor male agnates, a tribal landholder can execute a registered Will under Section 59 of the Indian Succession Act, 1925. In landmark rulings like Madhu Kishwar (1996) and Kamla Neti (2022), the Supreme Court affirmed that excluding tribal daughters violates constitutional equality under Article 14 and Article 21.",
  },
  {
    q: "What restrictions does Section 46 of the CNT Act place on tribal land transfers?",
    a: "Section 46 of the Chota Nagpur Tenancy Act, 1908 strictly prohibits the transfer of raiyati land by a Scheduled Tribe member to a non-tribal by way of sale, gift, mortgage, or lease. Any such transfer without the prior written sanction of the Deputy Commissioner is void ab initio and punishable under state tenancy laws.",
  },
  {
    q: "How does Section 71A of the CNT Act restore illegally alienated tribal land?",
    a: "Section 71A grants summary power to the Deputy Commissioner and Special Regulation Officers (SAR Court) to evict illegal occupants and restore possession to rightful tribal raiyats or their legal heirs. Applications can be initiated even decades after fraudulent transfers to undo benami acquisitions.",
  },
  {
    q: "How does the Santhal Parganas Tenancy Act (SPT Act) protect raiyati succession?",
    a: "Section 20 of the Santhal Parganas Tenancy Act, 1949 imposes a total statutory ban on the transfer of raiyati holdings. Raiyati rights can only devolve through customary inheritance to recognized family heirs. Revenue courts strictly cancel any unregistered partition or private alienation attempts.",
  },
  {
    q: "What are the rules for tribal land inheritance in Fifth Schedule areas of Madhya Pradesh?",
    a: "Under Section 165(6) of the Madhya Pradesh Land Revenue Code, 1959, land owned by a Scheduled Tribe Bhumiswami cannot be transferred or sold to any non-tribal without the express permission of the District Collector. Testamentary succession to direct legal heirs remains legally valid and protected.",
  },
  {
    q: "What is the landmark Supreme Court ruling in Madhu Kishwar v. State of Bihar?",
    a: "In Madhu Kishwar (1996) 5 SCC 125, the Supreme Court struck down the exclusive male monopoly of tribal custom in Chota Nagpur. The Court held that tribal women have a constitutional right to livelihood under Article 21, granting widows and daughters an exclusive life estate to cultivate ancestral land without interference.",
  },
  {
    q: "Why do families choose AMA Legal Solutions over local touts for tribal land disputes?",
    a: "Tribal land cases require deep statutory mastery of Fifth Schedule regulations, CNT and SPT Acts, and high-level revenue court advocacy. AMA Legal Solutions provides senior High Court advocates, transparent retainers starting at ₹50,000, and end-to-end representation before District Collectors and SDO courts.",
  },
];

const TRIBAL_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory#webpage",
      url: "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory",
      name: "Tribal Land Inheritance Lawyer India | WillDrafting",
      description:
        "Specialized legal advisory for Scheduled Tribe land succession and will validity under Fifth Schedule customary laws and CNT Act. Expert revenue counsel.",
      datePublished: "2026-11-12",
      dateModified: "2026-11-12",
      author: {
        "@type": "Person",
        name: "Advocate Anuj Anand Malik",
        url: "https://www.linkedin.com/in/iamanujmalik/",
      },
      publisher: {
        "@id": "https://www.willdrafting.in/#organization",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.willdrafting.in/images/scheduled-tribe-tribal-land-succession-advisory-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Tribal Land Inheritance Lawyer India Scheduled Areas Customary Law Advisory",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory#breadcrumb",
      },
    },
    {
      "@type": ["Service", "LegalService"],
      "@id":
        "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory#service",
      name: "Scheduled Tribe Tribal Land Succession & Customary Advisory",
      serviceType:
        "Customary Tribal Inheritance Advisory, Fifth Schedule Land Audit & Revenue Court Defense",
      provider: {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "State", name: "Jharkhand" },
        { "@type": "State", name: "Madhya Pradesh" },
        { "@type": "State", name: "Chhattisgarh" },
        { "@type": "State", name: "Odisha" },
        { "@type": "State", name: "Maharashtra" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "State", name: "Andhra Pradesh" },
        { "@type": "State", name: "Telangana" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Tribal Land Succession Advisory Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Customary Succession & Raiyati Title Audit",
              description:
                "Detailed statutory audit of Khatian, Jamabandi, and Fifth Schedule transfer restrictions under CNT or SPT Acts.",
            },
          },
          {
            "@type": "Offer",
            price: "74990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Tribal Will & Female Heir Life Estate Structuring",
              description:
                "Bequest drafting under Indian Succession Act with Madhu Kishwar life estate safeguards for tribal daughters.",
            },
          },
          {
            "@type": "Offer",
            price: "125000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Revenue Court Representation & SAR Eviction Defense",
              description:
                "Senior advocate advocacy before District Collector, SDO, and SAR courts for Section 71A land restoration.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory#howto",
      name: "How to Secure Scheduled Tribe Land Succession in India",
      description:
        "Four-step statutory protocol to audit tribal land records, draft protective succession instruments, and secure revenue court mutation.",
      totalTime: "P21D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Tenure & Fifth Schedule Title Verification",
          text: "Verify ancestral Khatian, Panji-II, and Khatiyan entries to confirm raiyati classification and Fifth Schedule protections.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Genealogical Pedigree & Clan Lineage Audit",
          text: "Draft a formal pedigree tree authenticated by Gram Pradhan, Manki Munda, or village council elders.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Advocate Testamentary & Life Estate Drafting",
          text: "Counsel drafts a registered Will or life estate deed securing succession rights for daughters under Supreme Court precedents.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Revenue Court Representation & Dakhil Kharij",
          text: "File contested succession mutation petitions before the Circle Officer / SDO and defend against agnatic caveats.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory#faq",
      mainEntity: TRIBAL_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.willdrafting.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://www.willdrafting.in/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Scheduled Tribe Tribal Land Succession Advisory",
          item: "https://www.willdrafting.in/services/scheduled-tribe-tribal-land-succession-advisory",
        },
      ],
    },
  ],
};

const STATE_TRIBAL_MATRIX = [
  {
    region: "Jharkhand (Chota Nagpur & Santhal Parganas)",
    statute: "CNT Act 1908 (s. 46, 71A) & SPT Act 1949 (s. 20)",
    customRule: "Patrilineal agnatic devolution. Strict exclusion of daughters under uncodified customs.",
    safeguards: "Supreme Court life estate rights (Madhu Kishwar); SAR Court eviction of non-tribals.",
    forum: "Deputy Commissioner, Sub-Divisional Officer (SDO), and SAR Revenue Courts.",
  },
  {
    region: "Central Tribal Belt (MP & Chhattisgarh)",
    statute: "Madhya Pradesh Land Revenue Code 1959 s. 165(6)",
    customRule: "Gond, Baiga, and Bhil customary succession favoring sons; widow life maintenance.",
    safeguards: "Prior Collector sanction mandatory for any alienation; civil court jurisdiction barred.",
    forum: "Sub-Divisional Magistrate (SDM), Tehsildar, and District Collector Revenue Benches.",
  },
  {
    region: "Western India (Maharashtra & Gujarat)",
    statute: "Maharashtra LRC 1966 s. 36A & Bombay Land Revenue Code",
    customRule: "Warli, Bhil, and Katkari customs; equal shares among sons with widow protection.",
    safeguards: "Strict non-tribal transfer restrictions with state forfeiture clauses.",
    forum: "Sub-Divisional Officer (SDO) and Maharashtra Revenue Tribunal (MRT).",
  },
  {
    region: "North-Eastern Sixth Schedule Areas",
    statute: "Sixth Schedule of Constitution & Autonomous District Councils",
    customRule: "Matrilineal succession in Khasi & Garo tribes (youngest daughter Khatduh inherits).",
    safeguards: "Autonomous District Council enactments supersede general central succession statutes.",
    forum: "Autonomous District Council Courts and Village Durbar Sessions.",
  },
];

const COMPETITOR_VS_AMA_TABLE = [
  {
    parameter: "Section 2(2) HSA Statutory Nuance",
    generic: "Assumes Hindu Succession Act applies automatically to all Indian citizens.",
    ama: "Specialized defense under uncodified custom, Fifth Schedule, and Section 2(2) exclusions.",
  },
  {
    parameter: "Raiyati & Tenancy Protection Mastery",
    generic: "Treats agricultural land under general transfer of property principles.",
    ama: "Expert counsel in CNT Act s. 46, SPT Act s. 20, and State Land Revenue Codes.",
  },
  {
    parameter: "Protection for Tribal Daughters",
    generic: "Advises partition suits that get dismissed in civil court due to custom.",
    ama: "Drafts protective testamentary Wills and invokes Supreme Court Madhu Kishwar life estates.",
  },
  {
    parameter: "Revenue Court & SAR Representation",
    generic: "Lacks presence before Sub-Divisional Officers and District Collectors.",
    ama: "Direct high-level representation before SDO, Collector, and High Court writ benches.",
  },
  {
    parameter: "Transparent Fee Structure",
    generic: "Opaque litigation retainers with mounting per-hearing billing costs.",
    ama: "Clear structured retainers starting from ₹50,000 with zero hidden charges.",
  },
];

export default function TribalLandSuccessionAdvisoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TRIBAL_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            BREADCRUMB & EDITORIAL AUTHOR ATTRIBUTION BAR
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#172228]/10 text-xs text-[#55636D]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link
              href="/"
              className="hover:text-[#C65378] transition-colors font-medium"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/services"
              className="hover:text-[#C65378] transition-colors font-medium"
            >
              Services
            </Link>
            <span>/</span>
            <span aria-current="page" className="text-[#111827] font-semibold">
              Tribal Land Succession Advisory
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span>
              Written by{" "}
              <a
                href="https://www.linkedin.com/in/iamanujmalik/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#111827] hover:text-[#C65378] transition-colors"
              >
                Lawyer Anuj Anand Malik
              </a>
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              Legally Verified by{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>
            </span>
            <span className="hidden sm:inline">·</span>
            <time dateTime="2026-11-12" className="text-[#6B7280]">
              Updated November 12, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Strict Single H1: 49 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>Fifth Schedule · Customary Law · CNT &amp; SPT Protections</span>
              </div>

              {/* Single H1: 49 characters (Strictly <= 70 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Tribal Land Succession &amp; Inheritance Lawyer India
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Protect Scheduled Tribe ancestral land from unlawful seizure, agnatic exclusion, and fraudulent mutation. General Hindu succession rules do not apply under Section 2(2). Our High Court advocates navigate Fifth Schedule customary laws and tenancy statutes to safeguard your family title.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Legal Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/templates/jharkhand-raiyati-land-succession-affidavit-format"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>View Raiyati Affidavit Format</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Fifth Schedule Moat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>CNT / SPT Act Defense</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Daughter Life Estate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Revenue Court Counsel</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Statutory Exemption Advantage
              </div>

              {/* Strict Single H2: 59 characters */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why Tribal Land Succession Differs from General Indian Law
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Section 2(2) Hindu Succession Act Exclusion:</strong> General Hindu succession reforms do not apply to Scheduled Tribes. Devolution follows uncodified local customs unless notified by the Central Government.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Customary Male Agnate Bias:</strong> Patrilineal customs routinely disinherit daughters and widows, passing ancestral fields to distant male cousins or uncles.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Strict Non-Tribal Transfer Bars:</strong> Special tenancy statutes like the CNT Act (Section 46) and SPT Act (Section 20) declare unauthorized transfers to non-tribals completely void.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/property-mutation-dakhil-kharij-service"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Property Mutation Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE TRIBAL LAND DIAGNOSTIC TOOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <TribalLandSuccessionInteractive />
        </section>

        {/* =========================================================================
            3. EMBEDDED EDITORIAL VISUAL BANNER SECTION (Strict Figure 1)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Statutory Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Blueprint: Scheduled Tribe Land Succession in India
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Scheduled Tribe land succession is governed by constitutional Fifth Schedule mandates, special tenancy codes, and Supreme Court life estate precedents. Our advocates secure lawful inheritance while stopping illegal transfers.
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/scheduled-tribe-tribal-land-succession-advisory-og.jpg"
              alt="Tribal Land Inheritance Lawyer India Scheduled Areas Customary Law Advisory"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl shadow-xs"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Scheduled Tribe land succession architecture in India under Fifth Schedule, CNT Act, SPT Act, and Supreme Court life estate jurisprudence.
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON MATRIX: CUSTOMARY LAWS ACROSS STATES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>State-by-State Statutory Matrix</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Customary Tribal Law Inheritance Matrix Across Indian States
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Tribal succession rules vary across regions. Examine how statutory tenancy bars and uncodified customary practices operate in key Fifth and Sixth Schedule areas:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Tribal Region &amp; Belt</th>
                    <th className="py-4 px-6 w-[22%]">Governing Statute</th>
                    <th className="py-4 px-6 w-[20%]">Intestate Customary Devolution</th>
                    <th className="py-4 px-6 w-[20%]">Statutory Safeguards &amp; Exceptions</th>
                    <th className="py-4 px-6 w-[16%]">Primary Revenue Forum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {STATE_TRIBAL_MATRIX.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.region}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#C65378]">
                        {row.statute}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.customRule}
                      </td>
                      <td className="py-5 px-6 text-[#047857] font-medium">
                        {row.safeguards}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.forum}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DEDICATED SECTION 2(2) HSA STATUTORY EXEMPTION & DAUGHTER RIGHTS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Constitutional Protection &amp; Female Rights</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Section 2(2) Hindu Succession Act: The Statutory Exemption Moat
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                Section 2(2) of the Hindu Succession Act, 1956 states that nothing contained in the Act shall apply to members of any Scheduled Tribe defined under Article 366(25) of the Constitution. Because the Central Government has never issued a general notification bringing Scheduled Tribes under the Act, the progressive 2005 coparcenary amendments do not automatically apply to tribal women.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                This statutory exclusion often allows male agnates (collateral brothers, uncles, or nephews) to disinherit unmarried daughters and surviving widows under uncodified customs. However, the Supreme Court of India has stepped in to curb this inequity.
              </p>
              <p className="text-[14px] text-[#047857] font-semibold bg-white/70 p-3.5 rounded-xl border border-[#047857]/20">
                In Madhu Kishwar (1996) and Kamla Neti (2022), the Supreme Court held that tribal women possess a constitutional right to livelihood under Article 21, creating an enforceable life estate in ancestral fields. Furthermore, tribal landowners hold lawful testamentary power under the Indian Succession Act, 1925 to bequeath self-acquired or settled land directly to daughters.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Protect Daughter Succession</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/succession-calculator"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Calculate Estate Shares</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. 4-STEP REVENUE & SUCCESSION ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step Succession SOP</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Legal Protocol for Scheduled Tribe Land Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Navigating tribal land devolution demands rigorous documentation and revenue court advocacy. Our senior counsel follows this 4-step roadmap:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Tenure & Khatian Audit",
                desc: "Audit ancestral Khatian, CS/RS survey slips, and Panji-II entries to verify raiyati classification and Fifth Schedule protections.",
              },
              {
                step: "02",
                title: "Pedigree Tree Proof",
                desc: "Draft a formal family genealogy (Vanshavali) and secure authentication from Gram Pradhan, Manki Munda, or village elders.",
              },
              {
                step: "03",
                title: "Testamentary Drafting",
                desc: "Counsel drafts a registered Will or life estate agreement protecting daughters and widows under Supreme Court precedents.",
              },
              {
                step: "04",
                title: "Revenue Court Mutation",
                desc: "Represent heirs before the Circle Officer, Tehsildar, or SDO to finalize mutation and update official Jamabandi records.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Stage {item.step}
                  </span>
                  <h4 className="text-xl font-semibold text-[#111827] mb-2.5">
                    {item.title}
                  </h4>
                  <p className="text-[14.5px] leading-[1.65] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. REVENUE COURT REPRESENTATION & SAR EVICTION DEFENSE GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Building2 className="w-4 h-4" />
              <span>Revenue Court Representation</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Revenue Representation: SAR Courts &amp; Eviction Defense
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Illegal land alienation in Scheduled Areas requires swift and aggressive revenue court action. Our advocates handle critical revenue proceedings across India:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Section 71A CNT Act SAR Court Restorations
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                When non-tribals acquire tribal raiyati holdings through fraudulent compromise decrees or benami transfers, our counsel petitions the Special Regulation Officer under Section 71A for summary eviction and land restoration.
              </p>
              <div className="text-xs font-semibold text-[#047857] bg-[#047857]/10 p-2.5 rounded-lg">
                Remedy: Direct recovery of physical possession with police assistance.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Section 20 SPT Act Eviction &amp; Title Invalidation
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                In Santhal Parganas, raiyati land cannot be alienated through any deed or mortgage. We represent tribal heirs before the Sub-Divisional Officer to cancel fraudulent registries and restore ancestral Khasra numbers.
              </p>
              <div className="text-xs font-semibold text-[#C65378] bg-[#C65378]/10 p-2.5 rounded-lg">
                Strict Law: Zero limitation period applies to void transfers under Section 20.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Fifth Schedule Collector Permission &amp; Appeals
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                In Madhya Pradesh, Chhattisgarh, and Maharashtra, we represent tribal landowners before the District Collector and Revenue Appellate Tribunals to defend title against unauthorized third-party claims.
              </p>
              <div className="text-xs font-semibold text-[#172228] bg-[#FAF7F0] p-2.5 rounded-lg border border-[#172228]/10">
                Forum: Collector appeals, Additional Commissioner, and High Court Writs.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. COPYABLE PROTECTIVE WILL CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
              <FileCheck className="w-4 h-4" />
              <span>Standard Testamentary Drafting</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Sample Legal Clause: Tribal Land Bequest &amp; Daughter Safeguard
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Here is an essential protective clause drafted under the Indian Succession Act, 1925 and the Supreme Court Madhu Kishwar precedent. It shields a tribal daughter from agnatic challenge:
            </p>
          </div>

          <CopyableTrustClauseBox
            title="Scheduled Tribe Land Bequest Clause (Indian Succession Act &amp; Madhu Kishwar Doctrine)"
            code={`"CLAUSE 5: DEVOLUTION OF RAIYATI / BHUMISWAMI AGRICULTURAL HOLDINGS

5.1. I declare that I belong to the [Insert Scheduled Tribe Name] community, a notified Scheduled Tribe under Article 342 of the Constitution of India, holding raiyati occupancy rights over the ancestral / self-acquired lands detailed in Schedule 'A' hereto.

5.2. In exercise of my testamentary powers under Section 59 of the Indian Succession Act, 1925, and in accordance with the constitutional safeguards affirmed by the Supreme Court of India in Madhu Kishwar v. State of Bihar (1996) 5 SCC 125 and Kamla Neti (2022), I hereby bequeath, devise, and assign all my rights, title, and raiyati possession in Schedule 'A' land exclusively unto my daughter, [Insert Daughter's Name].

5.3. Upon my demise, my said daughter shall enter into full physical possession, cultivate, and enjoy the usufruct of the said land as a full raiyati tenant / life estate holder, with absolute rights to apply for mutation (Dakhil Kharij) in the government revenue records.

5.4. No male agnate, brother, nephew, or collateral clan member shall have any right, title, claim, or lien over the said land under any customary law, usage, or practice. Any attempt by collateral kin to dispossess my said daughter shall be deemed void ab initio and resisted through lawful revenue and civil court proceedings."`}
            explanation="Drafted under Section 59 of the Indian Succession Act, 1925 and Supreme Court rulings in Madhu Kishwar (1996) and Kamla Neti (2022). This clause secures clear revenue mutation for female heirs and overrides collateral agnatic claims."
          />
        </section>

        {/* =========================================================================
            9. COMPETITOR BLIND SPOT: AMA LEGAL VS GENERIC LAW FIRMS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Litigation Moat &amp; Pricing Clarity</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              AMA Legal Solutions Tribal Advisory vs Generic Law Firms
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Mainstream law firms fail to recognize the statutory exception of Section 2(2) and lack revenue court experience in Fifth Schedule areas. Here is why our specialized counsel stands apart:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[28%]">Advisory Factor</th>
                    <th className="py-4 px-6 w-[36%]">Generic Law Firms</th>
                    <th className="py-4 px-6 w-[36%] text-[#C65378]">
                      AMA Legal Solutions &amp; WillDrafting
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {COMPETITOR_VS_AMA_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.generic}</td>
                      <td className="py-5 px-6 font-medium text-[#047857] bg-[#047857]/5">
                        {row.ama}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. STATUTORY FAQS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Legal FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Tribal Land Inheritance
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Find authoritative answers regarding customary succession, Fifth Schedule land bars, and revenue court remedies:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRIBAL_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h4 className="text-lg font-semibold text-[#111827] mb-3 leading-snug">
                  {item.q}
                </h4>
                <p className="text-[14.5px] leading-[1.68] text-[#49585F]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Contextual Internal Links Bar */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Estate Planning &amp; Tenancy Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore our statutory legal guides, raiyati formats, and succession calculators:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>All Legal Services Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/jharkhand-raiyati-land-succession-affidavit-format"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Jharkhand Raiyati Affidavit Format</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/property-mutation-dakhil-kharij-service"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Dakhil Kharij Mutation Service</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/family-settlement-deed-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Family Settlement Deed Lawyer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/succession-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Succession Calculator Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11. AUTHOR & E-E-A-T EDITORIAL VERIFICATION CARD
            ========================================================================= */}
        <section className="w-full p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1">
              Editorial &amp; Legal Compliance Attribution
            </div>
            <div className="text-base font-semibold text-[#111827] mb-1">
              Authored by{" "}
              <a
                href="https://www.linkedin.com/in/iamanujmalik/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C65378] transition-colors"
              >
                Lawyer Anuj Anand Malik
              </a>{" "}
              · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This statutory advisory is prepared in accordance with the Fifth Schedule to the Constitution of India, Section 2(2) of the Hindu Succession Act, 1956, the Chota Nagpur Tenancy Act, 1908, the Santhal Parganas Tenancy Act, 1949, the Indian Succession Act, 1925, and landmark Supreme Court rulings. It provides educational legal information and does not create an advocate-client relationship without a formal vakalatnama.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/iamanujmalik/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0077b5] hover:text-[#C65378] shrink-0"
          >
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <CTA />
      <Footer />
    </div>
  );
}
