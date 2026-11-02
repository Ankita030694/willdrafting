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
  Coins,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriJamaicaWillInteractive from "@/components/NriJamaicaWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Jamaica | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Jamaica. Protect properties, NRE accounts & ancestral land under Indian Succession Act. Dual-will counsel.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in jamaica",
    "nri will drafting services jamaica",
    "indian will for nri in jamaica",
    "make a will for indian property from jamaica",
    "indian inheritance lawyer jamaica",
    "indo jamaican ancestral property succession india",
    "jamaican wills act indian property ring fencing",
    "kingston mfaft apostille indian will",
    "oci cardholder farm land inheritance india jamaica",
    "montego bay nri property lawyer india",
    "section 5 indian succession act lex situs jamaica",
    "fema 1m usd asset remittance jamaica",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Jamaica | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Jamaica. Protect properties, NRE accounts & ancestral land under Indian Succession Act. Dual-will counsel.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-jamaica-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Jamaica Cross-Border Succession Legal Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Jamaica | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Jamaica. Protect properties, NRE accounts & ancestral land under Indian Succession Act. Dual-will counsel.",
    images: ["/images/will-drafting-for-nris-in-jamaica-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_JAMAICA_FAQS = [
  {
    q: "Does my Jamaican Will cover my ancestral land and flats in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, land in India follows the Lex Situs rule. This means Indian land follows Indian domestic law. Caribbean wills must go through probate court in Kingston first. They then face slow ancillary probate in Indian High Courts. Making a separate Indian Will lets your heirs take title directly through local land offices.",
  },
  {
    q: "Can a Jamaican citizen holding an OCI card inherit farm land in India?",
    a: "Yes. Under FEMA rules and Section 7A of the Citizenship Act 1955, OCI cardholders can legally inherit farm land, homes, and plots from Indian ancestors. Foreign citizens cannot buy new farm land in India. But inheriting land through a valid Will is fully legal. A signed Indian Will stops disputes before the local Tehsildar.",
  },
  {
    q: "How do I make a legally valid Indian Will while living in Jamaica?",
    a: "You can sign a valid Indian Will right at home in Jamaica. Print the Will on plain A4 paper. No Indian stamp paper is needed. Sign the Will before two adult witnesses who are not named as heirs. Under the Hague Apostille treaty, get an Apostille seal from the MFAFT in Kingston. Or visit the Indian High Commission for attestation.",
  },
  {
    q: "Can my Jamaican Will accidentally cancel my Indian Will?",
    a: "Yes. Standard wills drafted under the Jamaican Wills Act often have terms that cancel all past wills worldwide. This can wipe out your Indian Will by mistake. We draft matched dual wills. Each Will has clear terms that protect the other document. Your Jamaican will covers Caribbean assets. Your Indian Will covers Indian assets.",
  },
  {
    q: "How can Indo-Jamaican families trace ancestral land in India?",
    a: "Many families in Kingston and St. Andrew trace roots to ancestors who arrived on ships starting in 1845. You can prove family ties using ship records, birth papers, and village family tree records (Pedhinama or Varisat). Our High Court advocates help trace land records and resolve claims before local revenue courts.",
  },
  {
    q: "How can Jamaican heirs repatriate property sale proceeds to Jamaica?",
    a: "Under RBI FEMA rules, foreign heirs can send up to 1 Million US Dollars home each financial year through an NRO bank account. Our advocates help you obtain a Section 197 lower tax certificate (Form 13) and CA certificates (Form 15CA and Form 15CB). This lowers tax cuts from 20% down to actual tax dues.",
  },
  {
    q: "Is it mandatory to register an Indian Will in India?",
    a: "No. Under Section 18 of the Indian Registration Act 1908, registering a Will is optional. An unregistered Will signed before two adult witnesses is legally valid. But getting an Apostille seal in Kingston or registering the Will gives strong proof if distant relatives in India try to dispute the title.",
  },
  {
    q: "What legal actions protect Indian property from illegal possession?",
    a: "If relatives or third parties try to take over your ancestral plot, an Indian Will proves your legal ownership. Our advocates issue formal legal notices, apply for land boundary checks, and file civil injunction suits under Order 39 of the Civil Procedure Code to stop unlawful sales.",
  },
];

const JAMAICA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica",
      name: "Will Drafting for NRIs in Jamaica | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Jamaica. Protect properties, NRE accounts & ancestral land under Indian Succession Act. Dual-will counsel.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-jamaica-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Jamaica Cross-Border Succession Legal Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica#legalservice",
      name: "AMA Legal Solutions NRI & OCI Estate Planning Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-jamaica-og.jpg",
      description:
        "Specialized cross-border testamentary counsel, Jamaican Wills Act ring-fencing, MFAFT Kingston apostille guidance, and Indian property succession.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Jamaica" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Kingston" },
        { "@type": "City", name: "Montego Bay" },
        { "@type": "AdministrativeArea", name: "St. Andrew" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica#service",
      name: "Will Drafting for NRIs and OCIs in Jamaica",
      serviceType:
        "Cross-Border Indian Will Drafting, Jamaican Wills Act Ring-Fencing & Inheritance Protection",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "Jamaica",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI & OCI Succession Legal Services",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Plain Paper Indian Will Drafting with Kingston Apostille Advisory",
              description:
                "Custom Indian Will drafted under the Indian Succession Act 1925 with Hague Apostille and consular attestation instructions for Jamaica residents.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Territorially Ring-Fenced Dual-Will Strategy (Jamaica & India)",
              description:
                "Synchronized testamentary structuring preventing accidental revocation between the Jamaican Wills Act and Indian succession laws.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Probate Representation & Revenue Mutation Execution",
              description:
                "Complete representation before Indian High Courts, Tehsildar offices, and municipal bodies for ancestral property transmission and sale.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica#howto",
      name: "How NRIs in Jamaica Draft and Execute a Valid Indian Will",
      description:
        "Four-step protocol to draft and sign an Indian Will from Jamaica without traveling to India.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Asset Audit & Lineage Check",
          "text": "List all Indian flats, ancestral lands, and bank accounts. Check village land papers and family trees.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Separate Dual-Will Drafting",
          "text": "Draft separate Jamaican and Indian Wills. Add terms so neither will cancels the other document.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Plain Paper Execution & Signing",
          "text": "Print the Will on plain A4 paper in Jamaica. Sign before two adult witnesses who are not heirs.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "MFAFT Apostille in Kingston",
          "text": "Get an Apostille seal from the MFAFT in Kingston or visit the Indian High Commission for attestation.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica#faq",
      mainEntity: NRI_JAMAICA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica#breadcrumb",
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
          "name": "Will Drafting for NRIs in Jamaica",
          "item":
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-jamaica",
        },
      ],
    },
  ],
};

const SUCCESSION_COMPARISON_ROWS = [
  {
    parameter: "Governing Statute",
    jamaicaLaw: "Jamaican Wills Act (Cap 414) & Intestates' Estates Act",
    indianLaw: "Indian Succession Act 1925 (Section 5 Lex Situs)",
    nriImpact: "Dual wills required to prevent conflicting cross-border probate.",
  },
  {
    parameter: "Execution Formalities",
    jamaicaLaw: "Signed at foot before two witnesses present together",
    indianLaw: "Two adult attesting witnesses; plain A4 paper is valid",
    nriImpact: "Execution in Kingston on plain paper is valid in Indian courts.",
  },
  {
    parameter: "Foreign Authentication",
    jamaicaLaw: "Probate granted by Supreme Court of Jamaica in Kingston",
    indianLaw: "MFAFT Kingston Apostille or High Commission attestation",
    nriImpact: "Apostille seal eliminates multi-year ancillary probate delays.",
  },
  {
    parameter: "Agricultural Land Rights",
    jamaicaLaw: "Common law succession applies to real estate holdings",
    indianLaw: "FEMA Non-Debt Rules permit OCI inheritance of farm land",
    nriImpact: "Direct testamentary bequest shields farmland from escheat.",
  },
  {
    parameter: "Revenue Record Mutation",
    jamaicaLaw: "National Land Agency (NLA) registered title transfer",
    indianLaw: "Mutation (Dakhil Kharij / Jamabandi) before local Tehsildar",
    nriImpact: "Will enables title update without physical travel to India.",
  },
  {
    parameter: "Asset Sale Repatriation",
    jamaicaLaw: "Bank of Jamaica foreign currency regulations",
    indianLaw: "RBI permits remittance up to USD 1 Million per year",
    nriImpact: "Section 197 certificate reduces tax cuts on property sales.",
  },
];

const RING_FENCING_CLAUSE_TEXT = `1. TERRITORIAL SCOPE & ASSET RING-FENCING:
I hereby declare that this Last Will and Testament shall apply strictly and exclusively to all my movable and immovable assets situated within the territorial boundaries of the Republic of India, including but not limited to ancestral properties, residential plots, agricultural lands, NRE/NRO bank accounts, fixed deposits, mutual funds, and shares.

2. SEPARATION FROM JAMAICAN TESTAMENTARY DISPOSITIONS:
I declare that this Will does not revoke, amend, or alter any separate Will, codicil, or testamentary disposition executed by me under the Jamaican Wills Act governing my assets situated in Jamaica or elsewhere outside India. Both testaments shall operate independently in their respective jurisdictions.

3. EXCLUSION OF OVERSEAS ASSETS:
No property, real estate, bank deposits with National Commercial Bank (NCB), Scotiabank Jamaica, or other offshore assets outside India shall be governed by or distributed under this Indian Will.`;

export default function WillDraftingNrisInJamaicaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JAMAICA_SCHEMA) }}
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
              Will Drafting for NRIs in Jamaica
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
            <time dateTime="2026-11-02" className="text-[#6B7280]">
              Updated November 2, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 40 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  Kingston · Montego Bay · St. Andrew · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 40 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs &amp; OCIs in Jamaica
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Protecting ancestral lands, flats, and bank accounts in India
                requires smart planning. Under Section 5 of the Indian
                Succession Act 1925, Indian land follows Indian law. A standard
                Jamaican Will cannot protect your Indian assets. It leads to
                slow probate court cases. Our High Court advocates draft clear
                dual wills. We handle MFAFT Kingston apostille seals and update
                local land records fast.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Draft Online Indian Will</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Jamaican Wills Act Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>MFAFT Apostille Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA 1M USD Repatriation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 56 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Pitfalls
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Indian Succession Act Bottleneck for NRIs in Jamaica
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Universal Revocation Clauses:</strong> A will signed in
                    Kingston often cancels all past wills. This can wipe out your
                    Indian Will by mistake.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancillary Probate Delays:</strong> Probating a Jamaican
                    Will in Kingston does not transfer Indian land. Heirs must
                    face slow ancillary probate in Indian High Courts.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Claims by Distant Relatives:</strong> Without a clear
                    Indian Will, distant relatives in India can file false claims
                    before local land officers.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Master NRI Succession Framework</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE DIAGNOSTIC COMPONENT
            ========================================================================= */}
        <NriJamaicaWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (Figure 1: Generated Jamaica Banner)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Cross-Border Will Architecture: Jamaica to India
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a separate Indian Will protects your family land. It meets local registry rules and stops inheritance disputes:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-jamaica.jpg"
              alt="Will Drafting for NRIs in Jamaica Cross-Border Succession Legal Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> How Jamaican NRIs protect Indian land with a valid Will under the Indian Succession Act 1925.
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
        <section id="succession-law-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Comparative Legal Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Jamaica Succession Law vs Indian Succession Act
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Relying on a single Jamaican will for Indian assets leads to
              lengthy court probate or rejection by local revenue officers.
              Compare how Jamaican law and Indian law govern cross-border
              estates:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Legal Dimension</th>
                    <th className="py-4 px-6 w-[26%]">Jamaican Succession Law</th>
                    <th className="py-4 px-6 w-[26%]">Indian Succession Act 1925</th>
                    <th className="py-4 px-6 w-[28%]">Strategic Impact on NRIs</th>
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
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.jamaicaLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.nriImpact}
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
              <span>Step-by-Step Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Legal 4-Step Protocol for NRIs in Jamaica
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers handle the complete testamentary lifecycle
              from Jamaica to India without requiring you to travel:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Lineage Audit",
                desc: "We check land records and tax bills. We confirm your legal family rights for ancestral lands in India.",
              },
              {
                step: "02",
                title: "Territorial Dual-Will Drafting",
                desc: "We draft a separate Indian Will. It has terms that protect your Jamaican will from accidental cancellation.",
              },
              {
                step: "03",
                title: "A4 Execution & MFAFT Apostille",
                desc: "You sign on plain paper in Jamaica. Two adult witnesses watch you sign. We help you get an Apostille seal in Kingston.",
              },
              {
                step: "04",
                title: "Mutation & Bank Transmission",
                desc: "Our advocates submit your Will to the local Tehsildar and bank. We update land ownership records fast.",
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
            6. ESSENTIAL LEGAL CLAUSE & COPYABLE CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Ring-Fencing Clause Box
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              To protect both your Jamaican estate and your Indian estate,
              your legal drafts must contain clear territorial boundary terms.
              Below is the verified non-revocation clause used by our High
              Court advocates:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Territorial Scope & Non-Revocation Clause (Jamaica & India)"
            code={RING_FENCING_CLAUSE_TEXT}
            explanation="This clause keeps your Indian Will focused on Indian land and flats. It protects separate wills signed in Jamaica. It stops cross-border disputes."
          />

          {/* Contextual Links to Interactive Financial Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Check capital gains tax on inherited Indian plots, homes, and farm land. Learn how Section 49 rules apply to you.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate Capital Gains</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Tool
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Check Section 195 tax cuts on Indian property sales. See how Form 13 helps you send money back to Jamaica.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Estimate Repatriation Tax</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. MANDATORY UNIQUE ON-PAGE ASSET:
               Indo-Jamaican Ancestral Estate Protection Blueprint
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Indo-Jamaican Diaspora Heritage Protection</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Indo-Jamaican Ancestral Estate Protection Blueprint
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                The Indian community in Jamaica dates back to May 1845. Today,
                over 73,000 Indo-Jamaicans live in Kingston, Montego Bay, and St.
                Andrew. Many families have ancestral rights in Uttar Pradesh,
                Bihar, and Punjab.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Without an Indian Will, distant relatives in India may take
                advantage of distance. They file false claims or attempt illegal
                land transfers before the local Tehsildar. Under the Hindu
                Succession Act 1956 and FEMA rules, OCI cardholders have full
                rights to inherit family land.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Our blueprint pairs plain-paper Indian Wills with family tree
                records (Pedhinama). We establish clear land titles in Indian
                revenue offices while you stay in Jamaica.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors text-center"
              >
                <span>Book Jamaica Estate Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Inherited Property Sale Protocol</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECONDARY VISUAL ASSET: Global NRI Cross-Border Legal Standards
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>International Practice Standards</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Global NRI Testamentary Security Standards
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How our legal team protects family estates across world borders:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/cross-border-nri-will-framework.jpg"
              alt="Global NRI Testamentary Legal Standards and Cross-Border Succession Framework"
              width={1200}
              height={675}
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 2:</strong> Cross-border legal rules for overseas Indian families.
              </span>
              <span>
                Source: WillDrafting Research Group
              </span>
            </figcaption>
          </figure>
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
              Frequently Asked Questions: Jamaica NRIs
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers from our{" "}
              <strong className="text-[#111827]">
                WillDrafting team
              </strong>{" "}
              and verified by High Court lawyers at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_JAMAICA_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Indian Succession &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border legal guides, dispute services,
                and sitemap indexes:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Inherited Asset Sale &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate &amp; Letters of Administration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Master Will Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>HTML Sitemap Directory (All)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Directory Sitemap</span>
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
              This legal guide is published under the Indian Succession Act
              1925, the Jamaican Wills Act, and FEMA rules. Precedents include
              the Hague Apostille Convention. This content is for legal facts
              only and does not replace personal lawyer advice.
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
