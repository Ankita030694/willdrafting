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
  Users,
  Sparkles,
  HelpCircle,
  Coins,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriNewZealandWillInteractive from "@/components/NriNewZealandWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in New Zealand | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in New Zealand. Protect land, flats, NRO accounts & assets in India under the Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in new zealand",
    "nri will drafting services new zealand",
    "indian will for nri in new zealand",
    "make a will for indian property from new zealand",
    "indian inheritance lawyer new zealand",
    "new zealand wills act 2007 indian property",
    "nz family protection act 1955 indian assets",
    "nz dia apostille indian will execution",
    "auckland wellington christchurch nri property",
    "fema agricultural land inheritance new zealand",
    "nre nro bank account transmission new zealand",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in New Zealand | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in New Zealand. Protect land, flats, NRO accounts & assets in India under the Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-new-zealand-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in New Zealand Indian Succession Act and DIA Apostille Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in New Zealand | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in New Zealand. Protect land, flats, NRO accounts & assets in India under the Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-new-zealand-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_NZ_FAQS = [
  {
    q: "Can a New Zealand Will cover my property in India?",
    a: "Under Section 5 of the Indian Succession Act 1925, succession to land and flats in India follows Indian law only. A New Zealand Will cannot transfer Indian soil directly without slow court cases. A dedicated Indian Will avoids long court delays.",
  },
  {
    q: "Does the NZ Family Protection Act 1955 affect Indian assets?",
    a: "No. The NZ Family Protection Act 1955 gives New Zealand courts power to alter wills for local kin, but Indian land offices follow Indian law only. A separate Indian Will insulates your Indian assets from NZ family court claims.",
  },
  {
    q: "How can NRIs execute an Indian Will while living in New Zealand?",
    a: "Under Section 63 of the Indian Succession Act 1925, you can sign your Indian Will on plain A4 paper. You sign before two adult witnesses who are not heirs. You can then get an Apostille from the NZ DIA in Wellington.",
  },
  {
    q: "Is Indian stamp paper required for a Will executed in New Zealand?",
    a: "No. Under the Indian Stamp Act 1899, Wills do not need any stamp duty. Signing on plain paper in New Zealand is valid and accepted by Indian courts and land offices.",
  },
  {
    q: "Can Kiwi NRIs or OCIs inherit agricultural farmland in India?",
    a: "Yes. Under FEMA rules, NRIs and OCIs hold full rights to inherit farm plots from an Indian resident. A clear Indian Will prevents local revenue clerk issues during land record updates.",
  },
  {
    q: "What happens to Indian NRE and NRO bank accounts without a Will?",
    a: "In the Sarbati Devi case, the Supreme Court ruled a bank nominee is only a caretaker, not the owner. Without a Will, banks freeze accounts upon death, forcing heirs to get court certificates.",
  },
  {
    q: "How does probate work for a New Zealand resident with Indian property?",
    a: "Indian courts do not automatically recognize New Zealand probate orders. Under Section 228 of the Indian Succession Act 1925, foreign wills face long court reviews. Having an Indian Will lets your executor act fast in India.",
  },
  {
    q: "Can sale proceeds of inherited Indian property be sent to New Zealand?",
    a: "Yes. Under RBI foreign exchange rules, NRIs and OCIs can send up to USD 1,000,000 per year from their NRO account to New Zealand after getting standard tax forms 15CA and 15CB.",
  },
];

const NRI_NZ_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand",
      name: "Will Drafting for NRIs in New Zealand | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in New Zealand. Protect land, flats, NRO accounts & assets in India under the Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-new-zealand-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in New Zealand Indian Succession Act and DIA Apostille Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand#legalservice",
      name: "AMA Legal Solutions NRI New Zealand Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-new-zealand-og.jpg",
      description:
        "Specialized cross-border testamentary legal practice assisting Non-Resident Indians and OCIs across New Zealand in protecting Indian properties, farm plots, and NRO portfolios.",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "New Zealand" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Auckland" },
        { "@type": "City", name: "Wellington" },
        { "@type": "City", name: "Christchurch" },
        { "@type": "City", name: "Hamilton" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand#service",
      name: "Indian Will Drafting for NRIs in New Zealand",
      serviceType:
        "Cross-Border Succession Planning, Dual-Will Drafting & DIA Apostille Support",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "New Zealand" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "New Zealand NRI Succession Services",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Cross-Border Indian Will Drafting",
              description:
                "Bespoke Indian Will drafting for NRIs in New Zealand with territorial ring-fencing under Section 5 of the Indian Succession Act 1925.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive Dual-Will Package with DIA Apostille Advisory",
              description:
                "Complete estate coordination between New Zealand solicitors and Indian High Court advocates with NZ DIA Apostille guidance and bank transmission schedules.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand#howto",
      name: "How NRIs in New Zealand Execute an Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, ring-fence, and execute an Indian Will from New Zealand without travelling to India.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Audit & Cross-Border Ring-Fencing",
          text: "List all Indian land, flats, NRE/NRO deposits, and demat folios, keeping them separate from New Zealand assets and KiwiSaver accounts.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Lex Situs Structuring",
          text: "Our High Court advocates draft your Indian Will under Section 59 of the Indian Succession Act with clear territorial terms.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Signing & NZ DIA Apostille",
          text: "Print on plain A4 paper, sign before two adult independent witnesses, and optionally notarize with an NZ Notary Public for DIA Wellington Apostille.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & Digital Verification",
          text: "Deposit certified physical copies with your appointed executor in India and retain encrypted digital records with our legal registry.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand#faq",
      mainEntity: NRI_NZ_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand#breadcrumb",
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
          name: "Will Drafting for NRIs in New Zealand",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-new-zealand",
        },
      ],
    },
  ],
};

const NZ_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    nzLaw: "New Zealand Wills Act 2007",
    indianLaw: "Indian Succession Act 1925 (Sections 5 & 59)",
    crossBorder: "Dual-Will framework separating both jurisdictions",
  },
  {
    feature: "Family Provision Claims",
    nzLaw: "Moral duty claims under Family Protection Act 1955",
    indianLaw: "100% testamentary freedom over self-acquired assets",
    crossBorder: "Ring-fencing shields Indian land from NZ court orders",
  },
  {
    feature: "Immovable Property Rule",
    nzLaw: "Covers New Zealand real estate only (Lex Situs)",
    indianLaw: "Strict Lex Situs covers Indian land and flats",
    crossBorder: "Independent instruments prevent cross-border friction",
  },
  {
    feature: "Signing Formalities",
    nzLaw: "Signed before 2 witnesses under NZ Wills Act s. 11",
    indianLaw: "Plain A4 paper signed before 2 adult witnesses (s. 63)",
    crossBorder: "Identical 2-witness rule enables easy Kiwi execution",
  },
  {
    feature: "Authentication & Apostille",
    nzLaw: "NZ Notary Public seal + DIA Wellington Apostille",
    indianLaw: "Plain paper is fully valid; Apostille adds proof",
    crossBorder: "Hague 1961 Apostille recognized by Indian registries",
  },
  {
    feature: "Bank Account Transmission",
    nzLaw: "Probate granted by High Court of New Zealand",
    indianLaw: "Nominee is only a trustee; Indian Will is required",
    crossBorder: "Direct Will transmission avoids bank account freezes",
  },
  {
    feature: "Agricultural Farmland",
    nzLaw: "No concept of Indian revenue land ceiling codes",
    indianLaw: "NRIs & OCIs can inherit farmland under FEMA Reg 3",
    crossBorder: "Specific Khasra schedules enable clean Tehsil mutation",
  },
];

export default function WillDraftingForNrisInNewZealandPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_NZ_SCHEMA) }}
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
              Will Drafting for NRIs in New Zealand
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
            1. HERO SECTION (Single Strict H1: 41 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · NZ DIA Apostille · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 41 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in New Zealand
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 270,000 Indian citizens live across Auckland,
                Wellington, and Christchurch. Many families own farm land,
                plots, and flats in India. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                , Indian land follows Indian law only. A New Zealand Will cannot
                transfer Indian soil directly. Our High Court lawyers draft clear
                Indian Wills. We protect your land from New Zealand court claims.
                We help your family take over your assets in peace.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#nz-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare NZ Law vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>NZ DIA Apostille Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Stamp Duty on Will</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single Strict H2 (55 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Legal Bottlenecks
              </div>

              {/* Single H2: 55 chars (Strictly <= 70 chars, unique across site) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                New Zealand NRI Estate Risks: Protecting Indian Assets
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Inadvertent Revocation by Kiwi Wills:</strong> Standard
                    templates from New Zealand solicitors contain blanket clauses
                    revoking all prior wills, accidentally invalidating existing
                    Indian Wills.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Family Protection Act Moral Duty Claims:</strong> New
                    Zealand courts can redistribute estates for adult children under
                    the 1955 Act. Dedicated Indian Wills ring-fence Indian land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>No Automatic Probate Resealing:</strong> Indian courts
                    do not automatically recognize New Zealand probate orders. An
                    independent Indian Will bypasses Section 228 court bottlenecks.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Global NRI Will Architecture</span>
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
                many years to finish. A clean Will lets your heirs take over without
                court fights. We help you write a clear Will. Your land stays safe.
                Your family gets their fair share in peace.
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
                Any Indian in New Zealand who owns a home, farm, shop, or bank account
                in India. It also protects your assets from New Zealand court claims.
                You can sign your Will in New Zealand. Two friends watch you sign. No
                stamp paper is needed.
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
                We draft your Will on plain paper. You sign it in New Zealand with two
                witnesses. We help you update land records in India so your family is
                safe. Our team guides you at each step. You avoid long court trials
                and keep your wealth secure.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE DIAGNOSTIC COMPONENT
            ========================================================================= */}
        <NriNewZealandWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Cross-Border Estate Framework: New Zealand &amp; India
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              See how an Indian Will keeps your assets safe. It stops court fights
              and makes it easy for your heirs to claim their share:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-new-zealand-og.jpg"
              alt="Will Drafting for NRIs in New Zealand Indian Succession Act and DIA Apostille Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting for
                NRIs in New Zealand under the Indian Succession Act, 1925 and
                Hague Apostille Convention.
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
        <section id="nz-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Succession Law Comparison</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              NZ Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              See how New Zealand and Indian laws treat your assets. Review the
              key legal points below before you sign your Will:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">New Zealand Law</th>
                    <th className="py-4 px-6 w-[27%]">Indian Succession Act 1925</th>
                    <th className="py-4 px-6 w-[27%]">Recommended Solution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {NZ_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.nzLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.crossBorder}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. STATUTORY 4-STEP CROSS-BORDER ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Protocol: Executing Your Indian Will from NZ
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this 4-step path to sign and protect your Indian Will. You
              do not need to travel to India. You can do it all from New Zealand:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Audit & Ring-Fencing",
                desc: "We catalog Indian properties, NRE/NRO accounts, and demat folios, isolating them completely from KiwiSaver and NZ assets.",
              },
              {
                step: "02",
                title: "Advocate Legal Drafting",
                desc: "High Court lawyers draft your Will with territorial jurisdiction terms to block Family Protection Act moral duty challenges.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing & Apostille",
                desc: "Print on plain A4 paper in New Zealand, sign before two adult witnesses, and obtain DIA Wellington Hague Apostille.",
              },
              {
                step: "04",
                title: "Indian Registry Deposit",
                desc: "Deliver copies to your trusted executor in India and store encrypted digital records with our legal vault.",
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
              Essential Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without a clear ring-fencing term, an Indian Will may cancel a
              New Zealand Will by mistake. Both Wills must work on their own
              soil. Copy and read this sample term drafted by our lawyers:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Territorial Ring-Fencing Clause
                  </span>
                  <span>Non-Revocation Term</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament shall
                  operate exclusively in respect of my movable and immovable
                  assets situated within the Republic of India. This Will shall
                  not revoke, modify, or supersede any separate testamentary
                  instrument executed by me in respect of my real estate,
                  KiwiSaver balances, or personal property situated within New
                  Zealand or elsewhere outside India. The devolution of my
                  immovable properties in India shall be governed exclusively by
                  the laws of India under the doctrine of Lex Situs.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Our advocates draft reciprocal exclusion clauses to be
                  shared with your New Zealand solicitor so that both Wills
                  co-exist harmoniously without cross-border conflicts.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Indian Property Demarcation Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Ensure these exact details are inserted to facilitate seamless
                  Tehsil mutation and municipal transfer:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Survey &amp; Khasra Numbers:</strong> Precise rural
                      land coordinates and Khatauni volume numbers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Undivided Share (UDS):</strong> Specific land
                      percentage allocated to each floor or apartment owner.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank CIF &amp; Depository IDs:</strong> NRE/NRO
                      account numbers, IFSC codes, and NSDL/CDSL Client IDs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Alternate Executor Appointments:</strong> Naming a
                      backup resident executor in India for swift action.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom NRI Will Drafting</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Links to Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Inherited Property Capital Gains Tax
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate indexation benefits and capital gains tax liability
                    when heirs sell inherited real estate in India.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate Capital Gains Tax</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Compute Section 195 withholding tax and USD 1M annual NRO
                    remittance allowances to New Zealand.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate TDS &amp; Remittance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. NZ FAMILY PROTECTION ACT & FARMLAND INHERITANCE SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Cross-Border Farmland &amp; OCI Succession</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Agricultural Land Inheritance &amp; FEMA Protection
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under FEMA rules, NRIs and OCIs have full rights to inherit farm
                plots in India. If you inherit family land from an Indian resident,
                the law protects you. Foreign citizens cannot buy new farm plots
                in India. But inheriting ancestral land is 100% legal.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                A separate Indian Will protects your farm plots in Punjab, Haryana,
                Gujarat, or Kerala. It stops relatives in New Zealand from
                challenging your land in court. Our lawyers help your family update
                land records quickly. We keep your family safe from long court
                trials.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Lawyer Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Will for Indian Assets</span>
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
              <span>Testamentary FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NZ NRIs
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_NZ_FAQS.map((item, idx) => (
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
              This cross-border legal guide is prepared under the Indian
              Succession Act 1925, the New Zealand Wills Act 2007, the NZ Family
              Protection Act 1955, and the 1961 Hague Apostille Convention.
              Judicial principles referenced include Sarbati Devi v. Usha Devi
              (1984 AIR 346) and the private international law doctrine of Lex
              Situs. This content provides legal education and does not replace
              individualized advocate counsel.
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
