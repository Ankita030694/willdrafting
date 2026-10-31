import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  BookOpen,
  Landmark,
  Calculator,
  Globe2,
  Scale,
  Sparkles,
  HelpCircle,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriNepalWillInteractive from "@/components/NriNepalWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Indian Will Drafting for NRIs in Nepal | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Nepal. Protect land, flats, NRO accounts & investments in India under the Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in nepal",
    "nri will drafting services nepal",
    "indian will for nri in nepal",
    "make a will for indian property from nepal",
    "indian inheritance lawyer nepal",
    "indo nepal treaty 1950 property rights",
    "muluki dewani samhita 2074 succession",
    "terai agricultural land inheritance will",
    "kathmandu birgunj nri property lawyer",
    "indian embassy kathmandu will attestation",
    "nro account inheritance transmission nepal",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal",
    },
  },
  openGraph: {
    title: "Indian Will Drafting for NRIs in Nepal | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Nepal. Protect land, flats, NRO accounts & investments in India under the Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-nepal-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Nepal Indian Succession Act and Treaty Property Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Will Drafting for NRIs in Nepal | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Nepal. Protect land, flats, NRO accounts & investments in India under the Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-nepal-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_NEPAL_FAQS = [
  {
    q: "Does a Nepali Will Transfer Immovable Land in India?",
    a: "No. Under Section 5 of the Indian Succession Act, 1925, Indian land and flats follow Indian law only. A Will made under Nepal Civil Code cannot transfer Indian soil directly. You need an Indian Will to avoid court cases.",
  },
  {
    q: "Can NRIs in Nepal Sign an Indian Will on Plain Paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act, 1925, you can sign your Will on plain A4 paper. You do not need Indian stamp paper. You sign before two adult witnesses who are not heirs in the Will.",
  },
  {
    q: "How Does the 1950 Treaty Protect Property Rights?",
    a: "The 1950 Indo-Nepal Treaty gives equal rights to citizens of both nations. Articles 6 and 7 grant equal rights to live, work, and own land. But updating land records in India needs proof under local state land laws.",
  },
  {
    q: "Can NRIs in Nepal Inherit Farmland in UP or Bihar?",
    a: "Yes. Indian passport holders living in Nepal have full rights to inherit farmland in India. Under FEMA rules, inheriting farm plots from an Indian resident is legal. A clear Will stops land clerk disputes.",
  },
  {
    q: "What Happens to Indian Bank Accounts Without a Will?",
    a: "In the Sarbati Devi ruling, the Supreme Court said a nominee is only a caretaker, not the owner. Without a Will, banks in India freeze accounts. Heirs must spend years in court to get the money.",
  },
  {
    q: "How Does Muluki Dewani Samhita 2074 Affect Estates?",
    a: "Nepal Civil Code (Muluki Dewani Samhita 2074) governs land inside Nepal. Indian land follows Indian law. Cross-border families need two separate Wills. Each Will works on its own soil without clashes.",
  },
  {
    q: "Can Cross-Border Heirs Inherit Farmland Under FEMA?",
    a: "Yes. Under FEMA rules, family members can inherit Indian farmland from an Indian resident. But foreign citizens cannot buy new farmland in India. A Will protects existing ancestral family land for future heirs.",
  },
  {
    q: "Is Attestation at the Indian Embassy Kathmandu Needed?",
    a: "No, embassy visits are optional. Section 63 requires only two neutral adult witnesses. But getting your Will attested at the Indian Embassy in Kathmandu gives strong proof if relatives challenge your Will later.",
  },
];

const NRI_NEPAL_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal",
      name: "Indian Will Drafting for NRIs in Nepal | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Nepal. Protect land, flats, NRO accounts & investments in India under the Indian Succession Act with AMA Legal Solutions.",
      datePublished: "2026-10-31",
      dateModified: "2026-10-31",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-nepal-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Nepal Indian Succession Act and Treaty Property Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal#legalservice",
      name: "AMA Legal Solutions Indo-Nepal Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-nepal-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate succession counsel for NRIs in Nepal, specializing in Lex Situs compliance, Indo-Nepal Treaty rights, and Terai agricultural land protection.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Nepal" },
        { "@type": "City", name: "Kathmandu" },
        { "@type": "City", name: "Birgunj" },
        { "@type": "City", name: "Pokhara" },
        { "@type": "City", name: "Biratnagar" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal#service",
      name: "Indian Will Drafting for NRIs in Nepal",
      serviceType:
        "Cross-Border Indian Estate Planning & Agricultural Land Succession for NRIs in Nepal",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Nepal" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Indo-Nepal NRI Estate Planning & Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Nepal",
              description:
                "Section 63 compliant Indian Will on plain paper covering Indian flats, NRO bank accounts, and demat holdings with territorial ring-fencing clauses.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Terai Agricultural Land & Multi-State Succession Package",
              description:
                "Comprehensive succession planning adhering to state revenue codes in UP, Bihar, and Uttarakhand with Tehsil Khasra plot mapping.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Cross-Border Estate & Consular Attestation Counsel",
              description:
                "End-to-end legal counsel for multi-jurisdiction family estates, Kathmandu consular attestation protocols, and SRO land registration.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal#howto",
      name: "How NRIs in Nepal Execute an Indian Will on Plain Paper",
      description:
        "Four-step statutory roadmap for Indian citizens in Kathmandu, Birgunj, and Pokhara to draft, execute, and verify an Indian Will under Section 63 of the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Border Land & Asset Schedule Audit",
          text: "List all Indian agricultural plots with Khasra numbers alongside flats, NRO bank deposits, and demat folios.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting with Foreign Ring-Fencing",
          text: "Our High Court advocates draft your Indian Will with a territorial restriction clause isolating Nepalese assets.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain Paper Execution in Nepal",
          text: "Print the Will on plain A4 paper in Nepal and sign before two adult independent witnesses under Section 63 of the Act.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Tehsil Land Mutation & SRO Filing",
          text: "Present the Will for local Tehsil revenue mutation in UP or Bihar, or complete voluntary registration at the border SRO office.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal#faq",
      mainEntity: NRI_NEPAL_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal#breadcrumb",
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
          name: "Will Drafting for NRIs in Nepal",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-nepal",
        },
      ],
    },
  ],
};

const NEPAL_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    nepalLaw: "Muluki Dewani Samhita 2074 (Civil Code of Nepal)",
    indianLaw: "Indian Succession Act 1925 (Sections 5, 59 & 63)",
    treatyLaw: "Indo-Nepal Treaty of Peace & Friendship 1950",
  },
  {
    feature: "Land & Flat Rule",
    nepalLaw: "Strict Lex Situs; Nepal law covers land in Nepal only",
    indianLaw: "Strict Lex Situs; Indian law covers Indian land only",
    treatyLaw: "Articles 6 & 7 give mutual property rights",
  },
  {
    feature: "Testamentary Freedom",
    nepalLaw: "Limited by anshabanda family share rules",
    indianLaw: "100% Will freedom over self-acquired land and flats",
    treatyLaw: "Full freedom under Section 59 of Indian Succession Act",
  },
  {
    feature: "Signing Formalities",
    nepalLaw: "Needs ward or court signing in Nepal",
    indianLaw: "Plain A4 paper signed before two adult witnesses (Section 63)",
    treatyLaw: "Valid execution accepted by Indian land registries",
  },
  {
    feature: "Embassy Attestation",
    nepalLaw: "Nepal foreign ministry seals for local papers",
    indianLaw: "Indian Embassy Kathmandu seals under 1948 Act",
    treatyLaw: "Plain paper signing is valid without embassy trips",
  },
  {
    feature: "Bank Nominee Status",
    nepalLaw: "Nepal bank rules govern local bank accounts",
    indianLaw: "Nominee is only a caretaker; Will gives true ownership",
    treatyLaw: "Smooth bank account transmission through a valid Will",
  },
  {
    feature: "Farmland Inheritance",
    nepalLaw: "Governed by Nepal land ceiling laws",
    indianLaw: "NRIs hold full rights to inherit farm plots under FEMA",
    treatyLaw: "Protects family land in UP, Bihar, and Uttarakhand",
  },
];

export default function WillDraftingForNrisInNepalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_NEPAL_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            BREADCRUMB & EDITORIAL ATTRIBUTION BAR
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
            <span
              aria-current="page"
              className="text-[#111827] font-semibold"
            >
              Will Drafting for NRIs in Nepal
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
            <time dateTime="2026-10-31" className="text-[#6B7280]">
              Updated October 31, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 38 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Indo-Nepal Treaty Counsel · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 38 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Nepal
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 700,000 Indian citizens live and work in Nepal. Many families
                in Kathmandu, Birgunj, and Pokhara own farm land and city flats in
                Uttar Pradesh, Bihar, and Uttarakhand. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                , land follows the law of the land where it sits. Nepali civil
                codes cannot pass Indian land. Our High Court advocates draft
                clean Indian Wills to secure your family wealth.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Asset Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#nepal-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Succession Laws</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>1950 Treaty Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Double Tax</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Plain Paper Signing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (60 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Indo-Nepal Succession Risks
              </div>

              {/* Single H2: 60 chars (Strictly <= 70 chars) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Nepal NRI Estate Risks: Cross-Border Land &amp; Asset Protection
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Border Tehsil Mutation Delays:</strong> Farm plots in
                    Gorakhpur, East Champaran, or Pithoragarh get stuck in local
                    land offices if succession lacks exact Khasra entries and an
                    Indian Will.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Rejection of Nepali Wills:</strong> Under Section 5
                    of the Indian Succession Act, Indian land registries reject
                    foreign Wills. Indian soil needs an Indian Will.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominee Caretaker Trap:</strong> In Sarbati
                    Devi, the Supreme Court ruled nominees hold bank funds only
                    as caretakers. A Will gives full ownership.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Global NRI Estate Planning Rules</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PLAIN-ENGLISH SUMMARY CARDS (Rule 9 Readability Optimization)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                Why Write an Indian Will Now?
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                You protect your farm and flats in India. Court cases in India take
                many years. A clean Will lets your heirs take over without court fights. We help you write a clear Will. Your land stays safe. Your kids get their fair share in peace.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                Who Needs This Legal Help?
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                Any Indian in Nepal who owns a home, farm, shop, or bank account
                in India. It also helps cross-border kin with land in UP, Bihar, or Uttarakhand. You can sign your Will in Nepal. Two friends watch you sign. No stamp paper is needed.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                How Our Lawyers Help You
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F]">
                We draft your Will on plain paper. You sign it in Nepal with two
                witnesses. We help you update land records in India so your family is safe. Our team guides you at each step. You avoid long court trials and keep your wealth secure.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriNepalWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Papers</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Indo-Nepal Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates safeguards
              your cross-border assets, aligns with the 1950 Treaty, and enables
              rapid Tehsil mutation:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-nepal-og.jpg"
              alt="Will Drafting for NRIs in Nepal Indian Succession Act and Treaty Property Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting
                for NRIs in Nepal under the 1950 Treaty and Indian Succession Act.
              </span>
              <span>
                Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
              </span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="nepal-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Indo-Nepal Succession Law: Statutory Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Examine the statutory distinctions between Nepalese succession
              rules, the Indian Succession Act 1925, and reciprocal rights under
              the 1950 Indo-Nepal Treaty:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Nepal Law (Muluki Samhita 2074)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Indian Succession Act 1925
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      1950 Indo-Nepal Treaty Framework
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {NEPAL_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.nepalLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.treatyLaw}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. STATUTORY 4-STEP ROADMAP (Mandatory On-Page Asset)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Mutation &amp; Verification Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Cross-Border 4-Step Land Mutation Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers manage the entire estate transition. Follow
              this verified 4-step path to secure Indian land and urban flats:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Tehsil Title & Genealogic Audit",
                desc: "We inspect local land records across UP Bhulekh, Bihar Bhumi, and Uttarakhand Bhulekh to confirm Khasra numbers and ancestral title.",
              },
              {
                step: "02",
                title: "Territorial Ring-Fenced Drafting",
                desc: "Our advocates draft your Indian Will with a territorial clause that insulates Nepalese assets and prevents cross-border conflicts.",
              },
              {
                step: "03",
                title: "Plain-Paper Execution in Nepal",
                desc: "You sign the Will on plain A4 paper in Kathmandu or Birgunj before two adult witnesses under Section 63 without stamp paper.",
              },
              {
                step: "04",
                title: "Revenue Mutation & SRO Filing",
                desc: "We submit the executed Will for revenue mutation at the Tehsil office and assist with optional Sub-Registrar registration.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Step {item.step}
                  </span>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. ESSENTIAL LEGAL CLAUSE & DEMARCATION CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Territorial Ring-Fencing Clause for Indian Assets
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A general revocation clause in a foreign will accidentally revokes
              prior wills worldwide. To safeguard Indian properties, your Indian
              Will must use explicit territorial isolation language:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Copyable Clause Box */}
            <div className="lg:col-span-7">
              <CopyableNriPropertyClauseBox
                title="Territorial Ring-Fencing &amp; Non-Revocation Recital"
                code={`"1. EXCLUSIVE TERRITORIAL JURISDICTION (LEX SITUS):
I hereby declare that this Last Will and Testament relates exclusively and solely to all my immovable properties (including agricultural land, farm plots, residential houses, and ancestral coparcenary shares) and movable assets (including NRO bank accounts, demat holdings, and mutual funds) situated strictly within the Republic of India.

2. NON-REVOCATION OF NEPALESE ASSETS:
This testamentary instrument shall NOT revoke, alter, supersede, or impair any will (ichhapatra) or family arrangement executed by me in the Federal Democratic Republic of Nepal concerning assets situated in Nepal. Both instruments shall operate independently under their respective domestic jurisdictions.

3. TEHSIL REVENUE MUTATION MANDATE:
I expressly authorize my designated executor to present this Will before the competent Tehsildar, Sub-Registrar, and financial institutions in India to complete revenue mutation and asset transmission pursuant to the Indian Succession Act, 1925."`}
                explanation="Drafted under Section 5 and Section 63 of the Indian Succession Act 1925 and Section 30 of the Hindu Succession Act 1956. Ring-fences Indian agricultural and urban assets against cross-border conflicts with Nepalese Muluki Dewani Samhita dispositions."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Schedule Demarcation &amp; Asset Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Tehsil patwaris and Sub-Registrars require exact schedule details:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Revenue Survey Numbers:</strong> Khasra, Khatauni,
                      and Khesra plot entries.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Four Boundaries:</strong> Clear North, South, East,
                      and West neighbor demarcations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Banking Details:</strong> NRO and domestic accounts
                      with IFSC codes and CIF numbers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Alternate Executor:</strong> Indian resident
                      representative for local Tehsil filings.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom Deed Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Links to Interactive Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Need to Calculate Capital Gains on Inherited Land?
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate capital gains tax and tax exemptions on inherited Indian property.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Open Capital Gains Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate NRI Property Sale TDS &amp; Repatriation Limits
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate TDS deductions and send property sale money abroad under RBI rules.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Open Repatriation Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CROSS-BORDER TREATY & FEMA SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Indo-Nepal Treaty &amp; FEMA Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                1950 Treaty &amp; FEMA Agricultural Land Protections
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                The 1950 Indo-Nepal Treaty gives equal rights to citizens of both nations. Articles 6 and 7 protect your right to live, work, and own land. Indian citizens living in Nepal keep full rights in farm land across Uttar Pradesh, Bihar, and Uttarakhand.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Nepal does not allow dual citizenship. Under FEMA rules, family members can inherit farm land from an Indian relative. Foreign citizens cannot buy new farm land in India directly. A clear Indian Will stops family disputes and helps you update local land records.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors text-center"
              >
                <span>Consult High Court Lawyer</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Indian Will</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. STATUTORY FAQS & RELATED RESOURCES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Succession FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Indo-Nepal Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_NEPAL_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h3 className="text-lg font-semibold text-[#111827] mb-3 leading-snug">
                  {item.q}
                </h3>
                <p className="text-[14.5px] leading-[1.68] text-[#49585F]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Contextual Internal Links Bar (Hub-and-Spoke Matrix & Sitemap Filters) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Cross-Border Succession Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI property services, probate counsel, and legal directory:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Inherited Property Sale &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate &amp; Will Contest</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Directory (All Filter)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Services Index (Services Filter)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. EDITORIAL & E-E-A-T ATTRIBUTION CARD
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
              This cross-border succession guide is prepared under the Indian
              Succession Act, 1925, the 1950 Indo-Nepal Treaty of Peace and
              Friendship, the Foreign Exchange Management Act (FEMA), 1999,
              and relevant state land revenue codes in Uttar Pradesh, Bihar, and
              Uttarakhand. Judicial precedents cited include Sarbati Devi v. Usha
              Devi (AIR 1984 SC 346). This content provides statutory legal
              information and does not replace individualized advocate counsel.
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
