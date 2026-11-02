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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriHongKongWillInteractive from "@/components/NriHongKongWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Hong Kong | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Hong Kong. Protect India properties, bank accounts & shares under Indian Succession Act with legal certainty.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in hong kong",
    "nri will drafting services hong kong",
    "indian will for nri in hong kong",
    "make a will for indian property from hong kong",
    "indian inheritance lawyer hong kong",
    "hong kong wills ordinance cap 30 indian assets",
    "section 228 indian succession act probate resealing",
    "kowloon central wan chai nri property lawyer",
    "indian demat shares nro account inheritance hong kong",
    "dtaa india hong kong capital gains repatriation",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Hong Kong | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Hong Kong. Protect India properties, bank accounts & shares under Indian Succession Act with legal certainty.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-hong-kong-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Hong Kong Cross-Border Succession Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Hong Kong | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Hong Kong. Protect India properties, bank accounts & shares under Indian Succession Act with legal certainty.",
    images: ["/images/will-drafting-for-nris-in-hong-kong-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_HONG_KONG_FAQS = [
  {
    q: "Does my Hong Kong Will cover properties and bank accounts in India?",
    a: "Under Section 5 of the Indian Succession Act 1925, succession to immovable property in India is governed exclusively by Indian law (lex situs). While a Hong Kong Will drafted under Cap 30 may be formally valid, enforcing it in India requires ancillary probate under Section 228. A separate Indian Will avoids foreign court delays and directly governs your Indian wealth.",
  },
  {
    q: "Can NRIs in Hong Kong execute an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act 1925, you can execute a valid Indian Will on plain A4 paper in Hong Kong. Indian non-judicial stamp paper is not required. You only need two adult witnesses who see you sign. Your witnesses must not be beneficiaries named in the Will.",
  },
  {
    q: "Do I need an apostille from the High Court of Hong Kong or Consulate attestation?",
    a: "Two adult witnesses make your Will legally valid under Indian law. However, having your Will attested before a Hong Kong Notary Public and apostilled by the High Court of Hong Kong Registry, or countersigned at the Consulate General of India in Wan Chai, creates irrefutable evidentiary value before Indian Sub-Registrars and courts.",
  },
  {
    q: "Why is a single worldwide Will problematic under Section 228 of the Indian Succession Act?",
    a: "When a single global Will is probated in Hong Kong under Cap 10, the original Will is permanently retained by the Probate Registry in Wan Chai. To claim assets in India, executors must obtain exemplified court copies and petition an Indian High Court under Section 228 for Letters of Administration. This can take 2 to 4 years. Separate Wills avoid this entirely.",
  },
  {
    q: "How does Hong Kong's zero estate duty interact with Indian inheritance taxes?",
    a: "Hong Kong abolished estate duty in 2006, and India abolished estate duty in 1985. Neither country imposes estate duty on inheritance. However, selling inherited Indian real estate later triggers Indian capital gains tax. Under the India-Hong Kong Comprehensive DTAA, taxes paid in India can be claimed as a credit in Hong Kong.",
  },
  {
    q: "How are Indian Demat shares, mutual funds, and NRE/NRO accounts claimed from Hong Kong?",
    a: "Bank and depository nominees act merely as temporary trustees under the Supreme Court Sarbati Devi ruling. Nominees do not own the funds. A clear Indian Will identifying 16-digit Demat IDs and bank branch IFSC codes allows legal heirs to transmit funds directly without civil court Succession Certificates.",
  },
  {
    q: "Can an OCI or foreign passport holder residing in Hong Kong inherit Indian agricultural land?",
    a: "Yes. Under Section 6(5) of the Foreign Exchange Management Act (FEMA), an NRI or OCI can inherit agricultural land or plantation property from an Indian resident. However, foreign nationals and OCIs cannot purchase new agricultural land in India. A Will provides the vital link to establish legitimate hereditary ownership.",
  },
  {
    q: "What is the process for repatriating sale proceeds of inherited Indian property to Hong Kong?",
    a: "Heirs first update municipal mutation records using the Will. When selling, they apply for a Section 197 Lower TDS Certificate to avoid 20% tax withholding. Under RBI FEMA regulations, heirs can remit up to USD 1,000,000 per financial year to Hong Kong through an NRO account using Form 15CA and chartered accountant Form 15CB.",
  },
];

const NRI_HONG_KONG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong",
      name: "Will Drafting for NRIs in Hong Kong | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Hong Kong. Protect India properties, bank accounts & shares under Indian Succession Act with legal certainty.",
      datePublished: "2026-11-02",
      dateModified: "2026-11-02",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-hong-kong-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Hong Kong Cross-Border Succession Framework",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong#legalservice",
      name: "AMA Legal Solutions NRI Hong Kong Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-hong-kong-og.jpg",
      description:
        "Cross-border testamentary counsel for Non-Resident Indians and OCIs in Hong Kong. Specializing in Indian Succession Act drafting, High Court Section 228 probate resealing, and asset transmission.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Hong Kong SAR" },
        { "@type": "City", name: "Kowloon" },
        { "@type": "City", name: "Central & Western" },
        { "@type": "City", name: "Wan Chai" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong#service",
      name: "Cross-Border Indian Will Drafting & Estate Planning for NRIs in Hong Kong",
      serviceType:
        "NRI Succession Planning, Dual Will Drafting & Indian Probate Advisory",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong#legalservice",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Hong Kong SAR",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Hong Kong Succession & Estate Services",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standalone Indian Will for Hong Kong NRIs",
              description:
                "Comprehensive Indian Will with geographic ring-fencing clauses under Section 59 and 63 of the Indian Succession Act 1925, protecting real estate, bank deposits, and demat accounts.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual Will Harmonization & Execution Advisory",
              description:
                "Cross-border harmonization aligning Hong Kong Wills Ordinance (Cap 30) with Indian Succession Act, including remote consular attestation protocols and High Court apostille support.",
            },
          },
          {
            "@type": "Offer",
            price: "69990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Section 228 Ancillary Probate & Estate Transmission",
              description:
                "End-to-end representation in Indian High Courts for resealing Hong Kong probate grants under Section 228, municipal revenue mutation, and RBI repatriation filings.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong#howto",
      name: "How NRIs in Hong Kong Draft and Execute an Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and validate an Indian Will for assets in India while residing in Hong Kong SAR.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Multi-Jurisdictional Asset Demarcation",
          "text": "Catalog all Indian assets including registered sale deeds, municipal survey numbers, NRE/NRO accounts with IFSC codes, and 16-digit Demat Client IDs, while segregating Hong Kong assets.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Ring-Fenced Legal Drafting",
          "text": "Draft the Indian Will with an explicit foreign asset exclusion clause ensuring non-revocation of your Hong Kong Will under Cap 30 and full compliance with the Indian Succession Act 1925.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Execution & Two-Witness Attestation in Hong Kong",
          "text": "Execute the Will on plain A4 paper in Hong Kong before two adult independent witnesses who are not beneficiaries, with optional notarization and Hague apostille.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Indian Probate & Asset Transmission",
          "text": "Deposit the executed Will with your designated India-resident executor or advocate for seamless probate petitioning or municipal mutation upon demise.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong#faq",
      mainEntity: NRI_HONG_KONG_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.willdrafting.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.willdrafting.in/services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Will Drafting for NRIs in Hong Kong",
          "item":
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-hong-kong",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    hkLaw: "Hong Kong Wills Ordinance (Cap 30) & Cap 10",
    indianLaw: "Indian Succession Act, 1925 (ss. 5, 59, 63)",
    dualStrategy: "Dual Will with strict geographic ring-fencing",
  },
  {
    feature: "Lex Situs for Real Estate",
    hkLaw: "Applies lex domicilii for movables; defers to lex situs for foreign land",
    indianLaw: "Indian law exclusively governs succession to land & flats in India (s. 5)",
    dualStrategy: "Indian Will specifically controls all Indian real estate",
  },
  {
    feature: "Execution Formalities",
    hkLaw: "In writing, signed by testator before 2 concurrent witnesses (Cap 30 s. 5)",
    indianLaw: "In writing, signed by testator before 2 adult witnesses (s. 63)",
    dualStrategy: "Harmonized signing protocol satisfies both jurisdictions",
  },
  {
    feature: "Estate Duty & Inheritance Tax",
    hkLaw: "Zero estate duty (abolished Feb 11, 2006 under Revenue Ord 2005)",
    indianLaw: "Zero estate duty in India (abolished 1985); capital gains on resale",
    dualStrategy: "Tax-neutral transmission with DTAA capital gains planning",
  },
  {
    feature: "Probate Resealing / Sec 228",
    hkLaw: "Probate granted by HK High Court; original retained in registry",
    indianLaw: "Requires Section 228 petition with exemplified HK court copy",
    dualStrategy: "Separate Indian Will avoids Section 228 delays (saves 2 to 4 years)",
  },
  {
    feature: "Bank & Demat Nominee Status",
    hkLaw: "Survivorship rules apply to joint accounts and designated entities",
    indianLaw: "Nominee is purely custodial trustee (Supreme Court Sarbati Devi rule)",
    dualStrategy: "Explicit testamentary schedule bypasses nominee litigation",
  },
  {
    feature: "Cross-Border Repatriation",
    hkLaw: "Free capital flow with no foreign exchange controls in Hong Kong",
    indianLaw: "RBI FEMA ceiling of USD 1,000,000 per financial year via NRO accounts",
    dualStrategy: "Structured Form 15CA/15CB and Section 197 lower TDS protocol",
  },
];

export default function NriHongKongWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_HONG_KONG_SCHEMA) }}
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
              Will Drafting for NRIs in Hong Kong
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
            <time dateTime="2026-11-02" className="text-[#6B7280]">
              Updated November 2, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 35 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  Hong Kong SAR · High Court Lawyers · Cross-Border Counsel
                </span>
              </div>

              {/* Single H1: 35 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Hong Kong
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 44,000 Non-Resident Indians and OCIs reside across Kowloon,
                Central, and Wan Chai, powering global trading in gems, textiles,
                electronics, and fintech. While Hong Kong has zero estate duty,
                inheriting land, flats, and bank accounts in India requires strict
                compliance with the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                . Our High Court advocates draft ring-fenced Indian Wills that
                harmonize with Hong Kong Wills Ordinance (Cap 30) and prevent
                costly Section 228 court delays.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Estate Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#hk-vs-india-comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare HK vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Cap 30 &amp; ISA Harmonized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Estate Duty Structure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 228 Probate Moat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single Strict H2: 40 Chars */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Pitfalls
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Hong Kong &amp; India Dual Estate Bottlenecks
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Single Global Will Traps Original Document:</strong> When
                    a single worldwide Will is probated in Hong Kong, the Probate
                    Registry retains the original document permanently, stalling
                    Indian asset distribution.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Section 228 Resealing Court Delays:</strong> Enforcing a
                    Hong Kong grant in Indian High Courts takes 2 to 4 years. A
                    standalone Indian Will eliminates this bottleneck entirely.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Nominee vs Legal Heir Disputes:</strong> Bank and Demat
                    nominees in India are merely caretakers under the Sarbati Devi
                    precedent. A clear Will protects your true heirs.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore NRI Master Will Drafting Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriHongKongWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (16:9 Banner Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Cross-Border Legal Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Dual Estate Framework: Hong Kong vs India
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will executed by NRIs in Hong Kong coordinates
              with the Wills Ordinance (Cap 30), protects family assets, and bypasses
              costly Section 228 court proceedings:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-hong-kong.jpg"
              alt="Will Drafting for NRIs in Hong Kong Cross-Border Succession Framework"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Cross-border legal framework for NRIs in
                Hong Kong SAR under the Indian Succession Act 1925 and Cap 30.
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
        <section id="hk-vs-india-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Matrix</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Hong Kong Law vs Indian Succession Act Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Understanding jurisdictional contrasts prevents accidental revocation
              and expensive probate litigation. Compare how Hong Kong succession rules
              and the Indian Succession Act treat your cross-border estate:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Hong Kong Succession (Cap 30 / Cap 10)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Indian Succession Act, 1925
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Dual Will Recommended Strategy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.hkLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378] font-medium">
                        {row.dualStrategy}
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
              <span>Cross-Border Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Cross-Border Will Execution Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers streamline cross-border estate planning for NRIs
              in Hong Kong. Follow this structured 4-step roadmap to protect your assets:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Identification & Demarcation",
                desc: "We itemize Indian immovable properties, NRE/NRO fixed deposits, demat portfolios, and ancestral shares, ring-fencing them from your Hong Kong estate.",
              },
              {
                step: "02",
                title: "Custom Advocate Will Drafting",
                desc: "Our advocates craft a bespoke Indian Will with explicit foreign exclusion clauses under Section 59 & 63, preventing unintended revocation of your HK Will.",
              },
              {
                step: "03",
                title: "Hong Kong Signing & Attestation",
                desc: "Sign the Will on plain A4 paper in Hong Kong before two adult independent witnesses, with optional notary public and High Court apostille support.",
              },
              {
                step: "04",
                title: "Probate & Municipal Transmission",
                desc: "Upon demise, your designated India executor directly initiates High Court probate or revenue mutation, bypassing costly Section 228 resealing bottlenecks.",
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
            6. ESSENTIAL LEGAL CLAUSE & DEMARCATION CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Ring-Fencing Clause Architecture
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard online Will templates usually contain blanket revocation
              clauses that accidentally cancel previous foreign Wills. A properly
              drafted Indian Will for an NRI in Hong Kong must include a strict
              geographic ring-fencing clause:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Ring-Fencing Clause
                  </span>
                  <span>Geographic Limitation Clause</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament shall
                  pertain exclusively to my properties, investments, bank
                  accounts, and assets situated within the territorial
                  jurisdiction of the Republic of India. This testamentary
                  disposition does not alter, revoke, or supersede any Will,
                  codicil, or testamentary writing executed by me under the Hong
                  Kong Wills Ordinance (Cap 30) or the laws of any other foreign
                  jurisdiction in respect of assets located outside India.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Our advocates customize this clause to specify your
                  Hong Kong residential status, ensure full harmonization with Cap
                  30, and clearly appoint an India-resident executor.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#111827] mb-3">
                  Indian Asset Demarcation Checklist
                </h4>
                <p className="text-xs text-[#55636D] mb-4">
                  Sub-Registrars and banks reject ambiguous descriptions:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Real Estate Demarcations:</strong> Sale deed number,
                      sub-registrar book volume, and municipal survey IDs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank &amp; NRO Accounts:</strong> Complete account
                      number, branch name, and 11-digit IFSC code.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demat &amp; Mutual Funds:</strong> 16-digit Client ID,
                      DP ID, and Depository participant (NSDL or CDSL).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Executor Authority:</strong> Power to execute mutation,
                      engage counsel, and handle Form 15CA/15CB filings.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom Will Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Links to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate Indian long-term capital gains tax, cost inflation
                    indexation, and exemptions when selling inherited property.
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
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate Section 195 TDS deductions, Section 197 lower tax
                    waivers, and NRO remittance ceilings to Hong Kong.
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
            7. STATUTORY RESEALING & HIGH COURT GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Scale className="w-4 h-4" />
                <span>Statutory Authority &amp; Landmark Moat</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Section 228 Resealing &amp; High Court Ancillary Grants
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Section 228 of the Indian Succession Act 1925, when a Will
                has been proved and deposited in a court of competent jurisdiction
                situated beyond India (such as the High Court of Hong Kong under
                the Probate and Administration Ordinance Cap 10), letters of
                administration may be granted with an authenticated copy of such
                Will annexed.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                However, petitioning Indian High Courts (such as Bombay, Delhi, or
                Calcutta) under Section 228 requires certified court exemplification,
                notarial verifications, and multiple evidentiary hearings, often
                stalling asset transmission for 2 to 4 years. Executing a standalone
                Indian Will with an India-based executor allows direct local probate
                or immediate revenue mutation, shielding your family from cross-border
                court entanglements.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/services/probate-lawyer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult High Court Probate Counsel</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Indian Will Online</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. DEMOGRAPHIC & METROPOLITAN HUBS IN HONG KONG
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Users className="w-4 h-4" />
              <span>Diaspora Demographics</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              NRI Asset Protection in Kowloon, Central &amp; Wan Chai
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              The Indian diaspora in Hong Kong numbers approximately 44,140,
              comprising over 32,790 Indian passport holders (NRIs) and 11,350
              Hong Kong permanent residents and OCIs. Prominent community hubs
              face distinct succession priorities:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
                Kowloon &amp; Tsim Sha Tsui
              </div>
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Gem Traders &amp; Mercantile Families
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F]">
                Concentrated in Tsim Sha Tsui, Hung Hom, and Whampoa, prominent
                diamond merchants, textile exporters, and electronics traders hold
                substantial ancestral holdings, commercial real estate in Surat and
                Mumbai, and cross-border partnership shares requiring explicit
                testamentary allocation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
                Central &amp; Western District
              </div>
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Banking &amp; FinTech Executives
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F]">
                Residents of Mid-Levels, Central, and Pok Fu Lam include senior
                investment bankers, fund managers, and fintech leaders with
                sophisticated Indian Demat portfolios, PMS holdings, ESOPs, and
                luxury urban apartments in Delhi NCR and Bengaluru.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
                Wan Chai &amp; Island Hubs
              </div>
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Consular &amp; Legal Succession
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F]">
                Close proximity to the Consulate General of India in Wan Chai and
                the High Court Probate Registry makes Wan Chai and Happy Valley
                vital hubs for executing consular attestations, apostilles, and
                harmonized estate instruments.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. STATUTORY FAQS & RELATED RESOURCES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRIs in Hong Kong
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border advocates at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_HONG_KONG_FAQS.map((item, idx) => (
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
                Related NRI Succession &amp; Repatriation Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border legal services and inheritance tools:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Master Will Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
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
                <span>Indian High Court Probate Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. EDITORIAL & E-E-A-T ATTRIBUTION CARD
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
              Succession Act 1925, the Hong Kong Wills Ordinance (Cap 30), the
              Hong Kong Probate and Administration Ordinance (Cap 10), and the
              Foreign Exchange Management Act 1999 (FEMA). Precedents cited include
              Sarbati Devi v. Usha Devi (AIR 1984 SC 346). This information provides
              legal education and does not replace tailored advocate counsel.
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
