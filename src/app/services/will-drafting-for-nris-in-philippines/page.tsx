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
import NriPhilippinesWillInteractive from "@/components/NriPhilippinesWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Philippines | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Philippines. Protect properties, NRE/NRO accounts & wealth in India under Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in philippines",
    "nri will drafting services philippines",
    "indian will for nri in philippines",
    "make a will for indian property from philippines",
    "indian inheritance lawyer philippines",
    "philippine civil code article 16 indian will",
    "manila cebu nri indian succession act",
    "sindhi mercantile family estate india will",
    "punjabi nri commercial property will manila",
    "hague apostille indian will execution manila",
    "nro account inheritance transmission philippines",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Philippines | WillDrafting.in",
    description:
    "Indian Will drafting for NRIs in Philippines. Protect properties, NRE/NRO accounts & wealth in India under Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-philippines-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Philippines Indian Succession Act and Asset Protection Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Philippines | WillDrafting.in",
    description:
    "Indian Will drafting for NRIs in Philippines. Protect properties, NRE/NRO accounts & wealth in India under Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-philippines-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_PHILIPPINES_FAQS = [
  {
    q: "Does Philippine Forced Heirship (Legitime) Restrict My Indian Will?",
    a: "No. Under Article 16 of the Civil Code of the Philippines, inheritance rights follow your national law. For Indian citizens, Indian law applies. Under Section 59 of the Indian Succession Act 1925, you have total freedom to leave your self-made land and flats to anyone you choose.",
  },
  {
    q: "Can NRIs in the Philippines Sign an Indian Will on Plain Paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act 1925, you can sign your Will on plain A4 paper in Manila, Cebu, or Davao. You do not need Indian stamp paper. You sign before two adult witnesses who are not heirs in the Will.",
  },
  {
    q: "Is Hague Apostille Required for an Indian Will Signed in Manila?",
    a: "The Philippines joined the Hague Apostille Convention in May 2019. Getting your Will apostilled by the DFA in Manila or attested at the Indian Embassy in Makati gives strong legal proof if relatives dispute your Will in India.",
  },
  {
    q: "How Do Sindhi & Punjabi Families Protect Ancestral Shops in India?",
    a: "Many business families in Manila own shops and plots in Mumbai, Gujarat, and Punjab. An Indian Will with exact municipal tax IDs and floor maps stops family fights and ensures smooth business transfer.",
  },
  {
    q: "What Happens to Indian Bank Accounts Without an Indian Will?",
    a: "In the Sarbati Devi case, the Supreme Court ruled that a bank nominee is only a caretaker, not the owner. Without a Will, banks in India freeze your money. Heirs must spend years in court to get it back.",
  },
  {
    q: "Can NRIs in the Philippines Repatriate Inherited Property Sale Funds?",
    a: "Yes. Under RBI and FEMA rules, NRIs can send up to USD 1,000,000 each financial year from their NRO bank account to the Philippines. You use Form 15CA and Form 15CB after paying your Indian taxes.",
  },
  {
    q: "Should I Make Two Separate Wills for Philippine and Indian Assets?",
    a: "Yes. Having two separate Wills is the safest cross-border plan. Your Philippine Will covers local assets under Philippine law. Your Indian Will covers Indian land and flats under Indian law. A clean clause keeps both Wills apart.",
  },
  {
    q: "Can NRIs in the Philippines Inherit Agricultural Land in India?",
    a: "Yes. Under FEMA rules, Indian citizens living abroad have full rights to inherit farm land and houses from an Indian resident. A clear Indian Will stops delays at the local land office.",
  },
];

const NRI_PHILIPPINES_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines",
      name: "Will Drafting for NRIs in Philippines | WillDrafting.in",
      description:
    "Indian Will drafting for NRIs in Philippines. Protect properties, NRE/NRO accounts & wealth in India under Indian Succession Act with AMA Legal Solutions.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-philippines-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Philippines Indian Succession Act and Asset Protection Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines#legalservice",
      name: "AMA Legal Solutions Philippines-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-philippines-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate succession counsel for NRIs in the Philippines, specializing in Lex Situs compliance, Civil Code Article 16 legitime ring-fencing, and Sindhi & Punjabi mercantile property protection.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Philippines" },
        { "@type": "City", name: "Metro Manila" },
        { "@type": "City", name: "Makati" },
        { "@type": "City", name: "Taguig" },
        { "@type": "City", name: "Cebu City" },
        { "@type": "City", name: "Davao City" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines#service",
      name: "Indian Will Drafting for NRIs in Philippines",
      serviceType:
        "Cross-Border Indian Estate Planning & Property Succession for NRIs in the Philippines",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Philippines" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Philippines NRI Estate Planning & Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Philippines",
              description:
                "Section 63 compliant Indian Will on plain paper covering Indian flats, NRE/NRO bank accounts, and demat holdings with territorial ring-fencing clauses.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Mercantile Business & Multi-Property Succession Package",
              description:
                "Comprehensive estate planning for commercial shops, ancestral coparcenary shares, and urban real estate in Mumbai, Gujarat, and Punjab.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Cross-Border Estate & Hague Apostille Counsel",
              description:
                "End-to-end legal representation for multi-jurisdiction family estates, Manila DFA apostille protocols, and Pan-India SRO registration.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines#howto",
      name: "How NRIs in Philippines Execute an Indian Will on Plain Paper",
      description:
        "Four-step statutory roadmap for Indian citizens in Metro Manila, Cebu, and Davao to draft, execute, and legalize an Indian Will under Section 63 of the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Indian Asset Inventory & Title Audit",
          text: "Catalog all Indian immovable assets including commercial units, residential flats, ancestral coparcenary shares, and NRE/NRO bank accounts.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting with Foreign Asset Ring-Fencing",
          text: "Our High Court advocates draft your Indian Will with a strict territorial clause that insulates Philippine assets and neutralizes forced heirship claims.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain Paper Execution & Witness Attestation",
          text: "Print the Will on plain A4 paper in the Philippines and sign before two adult independent witnesses under Section 63 of the Act.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "DFA Hague Apostille & SRO Land Filing",
          text: "Obtain DFA Apostille in Manila or embassy consular attestation, and complete voluntary registration or revenue mutation in India.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines#faq",
      mainEntity: NRI_PHILIPPINES_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines#breadcrumb",
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
          name: "Will Drafting for NRIs in Philippines",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-philippines",
        },
      ],
    },
  ],
};

const PHILIPPINES_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    philippinesLaw: "Civil Code of the Philippines (RA 386)",
    indianLaw: "Indian Succession Act 1925 (Sections 5, 59 & 63)",
    privateIntLaw: "National law applies under Civil Code Art. 16",
  },
  {
    feature: "Immovable Property Rule",
    philippinesLaw: "Philippine law covers Philippine real estate",
    indianLaw: "Strict Lex Situs; Indian law covers Indian land only",
    privateIntLaw: "Indian courts hold sole power over Indian soil",
  },
  {
    feature: "Testamentary Freedom",
    philippinesLaw: "Limited by strict family legitime shares",
    indianLaw: "100% Will freedom over self-acquired property",
    privateIntLaw: "Foreigners are free under Bellis v. Bellis",
  },
  {
    feature: "Legitime (Forced Heirship)",
    philippinesLaw: "Heirs must get 50% or more of local estate",
    indianLaw: "No forced shares; you choose your own heirs",
    privateIntLaw: "Philippine forced shares do not touch Indian land",
  },
  {
    feature: "Signing Formalities",
    philippinesLaw: "Needs strict notary or hand-written rules in Manila",
    indianLaw: "Plain A4 paper signed before two adult witnesses",
    privateIntLaw: "Signing is valid under Section 63 of the Indian Act",
  },
  {
    feature: "Cross-Border Authentication",
    philippinesLaw: "Needs court probate in Philippine RTC courts",
    indianLaw: "DFA Apostille in Manila or Embassy attestation",
    privateIntLaw: "Apostille treaty gives swift proof across borders",
  },
  {
    feature: "Bank Nominee Status",
    philippinesLaw: "Philippine BSP bank rules govern local accounts",
    indianLaw: "Nominee is only a caretaker; Will gives true ownership",
    privateIntLaw: "Sarbati Devi rule ensures smooth bank account payout",
  },
];

export default function WillDraftingForNrisInPhilippinesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_PHILIPPINES_SCHEMA) }}
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
              Will Drafting for NRIs in Philippines
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
            1. HERO SECTION (Single Strict H1: 44 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Philippines Cross-Border Estate · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 44 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Philippines
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Around 150,000 Indians live in the Philippines. Many Sindhi and
                Punjabi families in Manila, Cebu, and Davao own shops, flats,
                and land in Mumbai, Gujarat, and Punjab. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                , land follows Indian law only. Philippine legitime rules do not
                bind Indian soil. Our High Court advocates draft clean Indian
                Wills to protect your family wealth.
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
                  href="#philippines-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Succession Laws</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Legitime Risk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Hague Apostille Valid</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (62 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Philippines NRI Estate Risks
              </div>

              {/* Single H2: 62 chars (Strictly <= 70 chars) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Philippines NRI Estate Risks: Cross-Border Indian Asset Defense
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Mercantile Shop Title Disputes:</strong> Family shops and flats in Mumbai or Punjab get tied up in court if your Will lacks clear floor maps and deed records.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Civil Code Legitime Confusion:</strong> Many expats worry that Philippine forced heirship hurts them. Article 16 confirms that Indian law alone governs your Indian wealth.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominee Caretaker Trap:</strong> In Sarbati Devi, the Supreme Court ruled nominees hold bank funds only as caretakers. An Indian Will gives true ownership.
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
                You protect your flats and shops in India. Court cases in India take many years. A clean Will lets your heirs take over without court fights. We help you write a clear Will. Your land stays safe. Your kids get their fair share in peace.
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
                Any Indian in the Philippines who owns a home, shop, or bank account in India. It helps trading families in Manila and Cebu. You can sign your Will right here on plain paper. Two friends watch you sign. No Indian stamp paper is needed.
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
                We draft your Will on plain paper. You sign it in the Philippines with two witnesses. We help you update land records in India so your family is safe. Our team guides you at each step. You avoid long court trials and keep your wealth secure.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriPhilippinesWillInteractive />

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
              Visual Legal Framework: Philippines-India Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates safeguards
              your cross-border wealth, aligns with Civil Code Article 16, and
              enables swift asset transmission:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-philippines-og.jpg"
              alt="Will Drafting for NRIs in Philippines Indian Succession Act and Asset Protection Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting
                for NRIs in the Philippines under Civil Code Article 16 and Indian Succession Act.
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
        <section id="philippines-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Philippines vs Indian Succession Law: Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Examine the statutory distinctions between Philippine Civil Code
              regulations, the Indian Succession Act 1925, and Private International
              Law rules governing cross-border estates:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Philippine Civil Code
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Indian Succession Act 1925
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Private International Law
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {PHILIPPINES_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.philippinesLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.privateIntLaw}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. STATUTORY 4-STEP ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Mutation &amp; Verification Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Cross-Border 4-Step Asset Mutation Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers manage the entire estate transition. Follow
              this verified 4-step path to secure Indian commercial units, residential
              flats, and bank accounts:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Indian Title & Coparcenary Audit",
                desc: "We check city tax files and sale deeds in Mumbai, Gujarat, or Punjab to verify boundaries and title.",
              },
              {
                step: "02",
                title: "Territorial Ring-Fenced Drafting",
                desc: "We write your Indian Will with a clause that shields foreign assets and blocks foreign forced share claims.",
              },
              {
                step: "03",
                title: "Plain-Paper Execution in Manila",
                desc: "You sign your Will on plain A4 paper in Manila or Cebu before two adult witnesses. No stamp paper is needed.",
              },
              {
                step: "04",
                title: "DFA Apostille & SRO Land Filing",
                desc: "We help you get a DFA Apostille in Manila and update city tax records or register the Will in India.",
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
              A general cancel clause in a foreign will can cancel prior wills worldwide. To protect Indian wealth, your Indian Will must state clear territorial limits:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Copyable Clause Box */}
            <div className="lg:col-span-7">
              <CopyableNriPropertyClauseBox
                title="Territorial Ring-Fencing &amp; Non-Revocation Recital"
                code={`"1. EXCLUSIVE TERRITORIAL JURISDICTION (LEX SITUS):
I hereby declare that this Last Will and Testament relates exclusively and solely to all my immovable properties (including commercial shops, office units, residential apartments, plots, and ancestral coparcenary shares) and movable assets (including NRE/NRO bank accounts, fixed deposits, mutual funds, and demat shares) situated strictly within the Republic of India.

2. NON-REVOCATION OF PHILIPPINE ASSETS:
This testamentary instrument shall NOT revoke, alter, amend, or impair any separate will or testamentary disposition executed by me in the Republic of the Philippines concerning assets situated in the Philippines. Both testamentary instruments shall operate independently under their respective domestic jurisdictions.

3. EXCLUSION OF FORCED HEIRSHIP (LEGITIME):
Pursuant to Section 5 of the Indian Succession Act 1925 and Article 16 paragraph 2 of the Civil Code of the Philippines, the succession to my Indian estate is governed exclusively by Indian law as my national law. No forced heirship, legitime, or statutory reserve under foreign civil codes shall apply to my Indian estate."`}
                explanation="Drafted under Section 5 and Section 63 of the Indian Succession Act 1925 and Article 16 of the Civil Code of the Philippines. Ring-fences Indian properties against foreign forced heirship claims while preserving separate Philippine testamentary instruments."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Schedule Demarcation &amp; Asset Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Registry and city tax offices need exact property facts:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Municipal Survey Entries:</strong> City survey numbers,
                      cadastral IDs, and property tax records.
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
                      <strong>Banking Details:</strong> NRE, NRO, and resident accounts
                      with IFSC codes and CIF numbers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Alternate Executor:</strong> Indian resident representative
                      to manage local registry and tax filings.
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
            7. CROSS-BORDER CIVIL CODE & FEMA SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Civil Code &amp; FEMA Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Civil Code Article 16 &amp; FEMA Inheritance Protections
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Article 16 of the Philippine Civil Code gives clear rules. It says that Will rights follow the national law of the person who dies. In the landmark ruling in{" "}
                <strong className="text-[#111827]">Bellis v. Bellis (1967)</strong>,
                the Supreme Court held that foreign citizens are free from Philippine legitime rules. Your Indian property follows Indian law only.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under FEMA rules, Indian citizens in the Philippines can inherit land and flats in India. You can send home sale funds up to USD 1,000,000 each financial year through an NRO bank account. A clear Indian Will stops family fights and protects your wealth.
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
              Frequently Asked Questions: Philippines NRI Succession
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
            {NRI_PHILIPPINES_FAQS.map((item, idx) => (
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
              This guide explains rules under the Indian Succession Act 1925, Civil Code of the Philippines Article 16, and FEMA 1999. Landmark court rulings cited include Sarbati Devi v. Usha Devi and Bellis v. Bellis. This content gives legal facts and is not direct legal advice.
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
