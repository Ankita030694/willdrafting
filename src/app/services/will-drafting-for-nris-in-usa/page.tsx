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
  FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriUsaWillInteractive from "@/components/NriUsaWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in United States | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in United States. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in united states",
    "nri will drafting services united states",
    "indian will for nri in united states",
    "make a will for indian property from united states",
    "indian inheritance lawyer united states",
    "us living trust indian property lex situs",
    "two will strategy nri united states",
    "hague apostille indian will usa",
    "indian consulate attestation will san francisco new york",
    "nri inherit agricultural land india fema 1999",
    "irs form 3520 indian inheritance nri",
    "ama legal solutions cross border estate planning",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in United States | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in United States. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-usa-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in United States US Living Trust and Indian Succession Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in United States | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in United States. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-usa-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_USA_FAQS = [
  {
    q: "Does my US Revocable Living Trust cover my flats and ancestral land in India?",
    a: "No. Under Section 5 of the Indian Succession Act, 1925, succession to immovable property is governed strictly by the Lex Situs rule (the law of India). Indian Sub-Registrars and Revenue Tehsildars do not recognize a foreign trust deed as an ownership transfer instrument. Real estate placed solely in a US trust remains vulnerable to intestacy disputes in India.",
  },
  {
    q: "How does the Two-Will Strategy prevent accidental Will cancellation?",
    a: "Standard estate plans drafted by US attorneys contain blanket revocation clauses that cancel all prior wills worldwide. Our cross-border advocates draft your Indian Will with a strict Non-Revocation Ring-Fencing Clause. This clause confines the Indian Will solely to assets situated in India and preserves your US Living Trust, 401(k), and US Will.",
  },
  {
    q: "Do I need to travel to India or buy Indian stamp paper to sign my Indian Will?",
    a: "No travel to India is needed. Under the Indian Stamp Act, 1899, Wills are 100% exempt from stamp duty. You can print your Indian Will on plain letter or A4 paper in California, Texas, New York, or anywhere in the United States, and sign it before two adult independent witnesses.",
  },
  {
    q: "When should an NRI in the United States get a Hague Apostille for an Indian Will?",
    a: "Under Section 63 of the Indian Succession Act, plain-paper signing before two independent witnesses makes your Will legally valid. However, obtaining a Hague Apostille certificate from your US State Secretary of State confirms the notary seal under the 1961 Hague Convention. This speeds up bank transmission and municipal mutation in India.",
  },
  {
    q: "Can an NRI or US Citizen with OCI inherit agricultural farmland in India?",
    a: "Yes. Although FEMA regulations prohibit foreign nationals from purchasing agricultural land, Foreign Exchange Management (Acquisition and Transfer of Immovable Property in India) Regulations, 2018 explicitly permit NRIs and OCIs to inherit agricultural land, farmhouses, and plantations from an Indian resident.",
  },
  {
    q: "How does dual probate delay asset transmission if I only have a US Will?",
    a: "If you rely on a single US Will, your family must first wait 9 to 18 months for probate in a US county surrogate court. Then, under Section 228 of the Indian Succession Act, they must file an ancillary probate petition in an Indian court, adding another 12 to 24 months. A separate Indian Will allows parallel probate in India immediately.",
  },
  {
    q: "What IRS tax reporting applies when US residents inherit funds from India?",
    a: "India does not levy any estate inheritance tax. However, if a US citizen or Green Card holder inherits more than $100,000 from a foreign decedent, they must file informational IRS Form 3520. Inherited Indian bank accounts and mutual funds must also be reported on FBAR (FinCEN 114) and IRS Form 8938.",
  },
  {
    q: "How can my heirs repatriate sale proceeds of inherited Indian property to the US?",
    a: "Under RBI master directions, foreign heirs can repatriate up to USD 1,000,000 (1 Million US Dollars) per financial year from their NRO bank account. Our team assists with Section 197 lower TDS tax certificates and Form 15CA and Form 15CB Chartered Accountant certifications for smooth overseas wire transfer.",
  },
];

const NRI_USA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa",
      name: "Will Drafting for NRIs in United States | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in United States. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-usa-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in United States US Living Trust and Indian Succession Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa#legalservice",
      name: "AMA Legal Solutions NRI Cross-Border Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-usa-og.jpg",
      description:
        "Cross-border Indian testamentary succession, US-India estate harmonization, Section 63 Will drafting, Hague Apostille counsel, and FEMA asset repatriation.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "AdministrativeArea", name: "California" },
        { "@type": "AdministrativeArea", name: "New York" },
        { "@type": "AdministrativeArea", name: "Texas" },
        { "@type": "AdministrativeArea", name: "New Jersey" },
        { "@type": "AdministrativeArea", name: "Illinois" },
        { "@type": "AdministrativeArea", name: "Washington" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa#service",
      name: "Indian Will Drafting & Cross-Border Estate Harmonization for NRIs in USA",
      serviceType:
        "Cross-Border Indian Will Drafting, US Living Trust Coordination & FEMA Asset Succession",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI USA Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard NRI Indian Will Drafting & Plain-Paper Execution Guide",
              description:
                "Comprehensive Section 63 compliant Indian Will covering flats, land, NRE/NRO accounts, and Demat portfolios with US asset ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Hague Apostille & Consular Attestation Assistance Package",
              description:
                "High Court advocate vetting with US State Secretary of State Hague Apostille roadmap, notary guidelines, and Indian safe custody advisory.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive Dual-Jurisdiction Estate Harmonization & Probate Counsel",
              description:
                "Turnkey cross-border alignment of US Living Trusts with Indian Succession Act rules, executor structuring, and FEMA USD 1M remittance advisory.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa#howto",
      name: "How NRIs in the United States Execute a Legally Valid Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and ring-fence an Indian Will from the United States under the Indian Succession Act, 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule Asset Mapping & Title Verification",
          text: "Catalog all immovable properties, NRE/NRO accounts, Demat portfolios, and ancestral shares in India with exact survey numbers and bank IFSC codes.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Cross-Border Ring-Fencing",
          text: "Draft the Indian Will with an explicit Non-Revocation Territorial Clause that insulates US Living Trusts, 401(k) accounts, and US assets.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Attestation & Hague Apostille in the US",
          text: "Print the Will on plain A4 paper and sign before two independent adult witnesses. Optionally obtain a Hague Apostille from the US State Secretary.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & Transmission Readiness in India",
          text: "Provide registered copies to your trusted Indian executor and deposit sealed duplicates with legal counsel to ensure seamless probate readiness.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa#faq",
      mainEntity: NRI_USA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa#breadcrumb",
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
          name: "Will Drafting for NRIs in United States",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-usa",
        },
      ],
    },
  ],
};

const SUCCESSION_COMPARISON_ROWS = [
  {
    parameter: "Governing Statutory Rule",
    usLivingTrust: "US State Trust Code (e.g. California Probate Code)",
    singleGlobalWill: "US County Surrogate / Probate Court Rules",
    separateIndianWill: "Indian Succession Act, 1925 ss. 5 & 63",
  },
  {
    parameter: "Indian Immovable Property Validity",
    usLivingTrust: "Invalid; Sub-Registrars reject foreign trust conveyances",
    singleGlobalWill: "Valid only after formal court probate resealing in India",
    separateIndianWill: "100% valid under Section 5 Lex Situs doctrine",
  },
  {
    parameter: "Attestation & Stamp Paper Rules",
    usLivingTrust: "US Notary Public acknowledgement",
    singleGlobalWill: "State-specific US witness execution",
    separateIndianWill: "Plain paper; 2 adult independent witnesses (Zero stamp duty)",
  },
  {
    parameter: "Probate Timelines in India",
    usLivingTrust: "Stalls indefinitely; heirs must file civil partition suit",
    singleGlobalWill: "Requires 12 to 24 months for Section 228 ancillary probate",
    separateIndianWill: "Direct and immediate probate execution in Indian High Court",
  },
  {
    parameter: "NRE/NRO Bank & Demat Transmission",
    usLivingTrust: "Indian banks reject foreign trust documents",
    singleGlobalWill: "Demands certified court decrees with high delays",
    separateIndianWill: "Swift transmission under standard RBI bank regulations",
  },
  {
    parameter: "Risk of Accidental Will Revocation",
    usLivingTrust: "Moderate; boilerplates often conflict with Indian assets",
    singleGlobalWill: "High risk of worldwide revocation disputes",
    separateIndianWill: "Zero risk; territorial ring-fencing insulates US estate",
  },
  {
    parameter: "Hague Apostille Recognition",
    usLivingTrust: "Apostille does not cure lack of Lex Situs jurisdiction",
    singleGlobalWill: "Requires Apostilled letters testamentary from US court",
    separateIndianWill: "Apostilled notary seal recognized under 1961 Convention",
  },
];

export default function NriUsaWillDraftingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_USA_SCHEMA) }}
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
              Will Drafting for NRIs in United States
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
                Advocate Anuj Anand Malik
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
            1. HERO SECTION (Single Strict H1: 43 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <Globe2 className="w-4 h-4" />
                <span>
                  Cross-Border Counsel · US-India Estate Harmonization
                </span>
              </div>

              {/* Single H1: 43 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in the United States
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 5.4 million Indians live in the United States. Many own homes,
                farmland, NRE fixed deposits, and mutual funds in India alongside
                their US 401(k), IRA, and real estate. Under Section 5 of the
                Indian Succession Act, 1925, Indian land and apartments cannot be
                transferred through a US Living Trust. Our High Court advocates
                draft dedicated Indian Wills that coordinate with your US estate
                plan, prevent dual probate delays, and secure your family assets.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Cross-Border Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#comparison-table"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare US Trust vs Indian Will</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Hague Apostille Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA 1999 Vetted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero US Trust Clashes</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (42 chars, <= 70 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Key Cross-Border Warning
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The US Living Trust &amp; Indian Asset Pitfall
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Lex Situs Bars US Living Trusts:</strong> Indian land
                    registries and municipal bodies (MCD, BMC, BBMP) do not recognize
                    foreign trust assignments. Indian real estate placed in a US trust
                    remains un-transferred.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Boilerplate US Wills Cancel Indian Wills:</strong> Standard
                    US Will templates contain global revocation clauses. Without a
                    territorial carve-out, signing a US Will accidentally revokes your
                    Indian estate plan.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancillary Probate Delays:</strong> Probating a single US
                    Will in India under Section 228 takes 12 to 24 months in court.
                    A separate Indian Will allows immediate execution.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read Master NRI Will Guidelines</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriUsaWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Cross-Border Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              US-India Estate Harmonization Architecture
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How our High Court advocates coordinate United States probate rules
              with the Indian Succession Act, 1925, protecting cross-border wealth:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-usa-og.jpg"
              alt="Will Drafting for NRIs in United States US Living Trust and Indian Succession Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of US-India estate planning,
                Hague Apostille attestation, and Section 63 execution.
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
        <section id="comparison-table" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Comparative Legal Analysis</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              US Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Choosing the wrong legal instrument causes multi-year delays or title
              rejection at Indian land offices. Compare how Indian courts and
              authorities treat a US Living Trust, a Single Global US Will, and a
              Separate Indian Will:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      US Revocable Living Trust
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Single Global US Will
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Separate Indian Will (Recommended)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {SUCCESSION_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.usLivingTrust}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.singleGlobalWill}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.separateIndianWill}
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
              4-Step Roadmap for NRIs in the United States
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              You can protect your Indian assets without traveling to India. Follow
              our verified four-step cross-border execution process:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Audit & Genealogic Mapping",
                desc: "We inventory your Indian flats, commercial land, ancestral shares, NRE/NRO accounts, and Demat portfolios. We trace all legal heirs to ensure zero family disputes.",
              },
              {
                step: "02",
                title: "Advocate Drafting & Ring-Fencing",
                desc: "Our High Court advocates draft your Indian Will under Section 63 of the Indian Succession Act with clear clauses that protect your US Living Trust and 401(k).",
              },
              {
                step: "03",
                title: "Plain-Paper Attestation in US",
                desc: "You print the Will on plain letter paper in the US and sign before two adult independent witnesses. We guide you on obtaining an optional Hague Apostille stamp.",
              },
              {
                step: "04",
                title: "Safe Custody & Transmission Setup",
                desc: "We supply sealed duplicates to your chosen resident Indian executor, ensuring prompt municipal property mutation and smooth NRE bank fund transmission.",
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
            6. ESSENTIAL LEGAL CLAUSE & TRANSMISSION CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Cross-Border Clause Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              To protect your US Living Trust and avoid accidental revocation, your
              Indian Will must include a clear territorial limitation clause. Here
              is our standard ring-fencing format:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Non-Revocation Ring-Fencing Clause
                  </span>
                  <span>Territorial Limitation</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament shall
                  apply strictly and exclusively to all my movable and immovable
                  properties, assets, bank accounts, and investments situated
                  within the territorial jurisdiction of the Republic of India.
                  This Will shall not revoke, cancel, or modify any past or
                  future Will, Revocable Living Trust, or testamentary document
                  executed by me in the United States of America or any other
                  country governing assets outside India.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Our advocates tailor this clause to reference your
                  specific US state trust documents, ensuring harmony between US
                  probate courts and Indian High Courts.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  NRE/NRO Bank Transmission Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Ensure fast release of your Indian financial assets to overseas heirs:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Account Schedules:</strong> Detail 16-digit NRE, NRO,
                      and FCNR bank numbers with specific IFSC branch codes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demat Identification:</strong> Record CDSL or NSDL DP
                      Client IDs alongside registered mutual fund folio numbers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Nominee vs Heir Clarity:</strong> Affirm that your
                      testamentary heirs hold absolute ownership over bank nominees.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Form 15CA/15CB Clearance:</strong> Prepare heirs for
                      Chartered Accountant certification for outward remittance.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom NRI Will Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Links to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Calculate Section 49 &amp; 55 indexed cost of acquisition
                    for Indian inherited property.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors shrink-0"
              >
                <span>Calculate Tax</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Estimate Section 195 TDS deductions and USD 1 Million outward
                    remittance steps.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors shrink-0"
              >
                <span>Estimate TDS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. FEMA 1999 & ANCESTRAL PROPERTY RIGHTS SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>FEMA 1999 &amp; RBI Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                FEMA Regulations &amp; Ancestral Land Inheritance
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Many NRIs and OCIs in California, Texas, and New York worry about
                inheriting ancestral agricultural land. Under Foreign Exchange
                Management Regulations 2018, non-resident Indians and Overseas
                Citizens of India hold the full legal right to inherit farmland,
                orchards, and village houses from Indian residents.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                However, foreign nationals cannot directly buy new agricultural land
                in India. When selling inherited land, sale proceeds can be
                repatriated up to USD 1,000,000 per financial year through an NRO
                account. Our High Court advocates draft your Indian Will with
                explicit FEMA compliance terms, protecting your descendants from
                regulatory hurdles.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book NRI Estate Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Indian Will Now</span>
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
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRI Wills in USA
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal guidance prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_USA_FAQS.map((item, idx) => (
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
                Related NRI Legal &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border services, probate guidelines, and
                repatriation support:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Master Will Service</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Property Sale &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Start Online Will</span>
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
                Advocate Anuj Anand Malik
              </a>{" "}
              · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This guide is prepared in accordance with Section 5 and Section 63
              of the Indian Succession Act, 1925, the Foreign Exchange Management
              Act, 1999 (FEMA), the Hague Apostille Convention 1961, and the
              Diplomatic and Consular Officers (Oaths and Fees) Act, 1948.
              Judicial precedents cited include Sarbati Devi v. Usha Devi (Supreme
              Court) and lex situs cross-border succession rulings. This content
              provides legal information and does not create an advocate-client
              relationship without a formal engagement agreement.
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
