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
import NriTrinidadWillInteractive from "@/components/NriTrinidadWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Trinidad & Tobago | WillDrafting",
  },
  description:
    "Expert Indian Will drafting for NRIs in Trinidad and Tobago. Protect ancestral lands, flats & NRE accounts under Indian Succession Act. Dual-will counsel.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in trinidad and tobago",
    "nri will drafting services trinidad and tobago",
    "indian will for nri in trinidad and tobago",
    "make a will for indian property from trinidad and tobago",
    "indian inheritance lawyer trinidad and tobago",
    "indo trinidadian ancestral property claim india",
    "trinidad wills and probate ordinance indian assets",
    "port of spain apostille indian will attestation",
    "chaguanas nri oci indian land inheritance",
    "san fernando oci cardholder property inheritance",
    "section 5 indian succession act trinidad nri will",
    "fema non debt rules oci agricultural land inheritance",
    "ama legal solutions cross border estate planning trinidad",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Trinidad and Tobago",
    description:
      "Expert Indian Will drafting for NRIs in Trinidad and Tobago. Protect ancestral lands, flats & NRE accounts under Indian Succession Act. Dual-will counsel.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-trinidad-and-tobago-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Trinidad and Tobago Cross-Border Succession Legal Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Trinidad and Tobago",
    description:
      "Expert Indian Will drafting for NRIs in Trinidad and Tobago. Protect ancestral lands, flats & NRE accounts under Indian Succession Act. Dual-will counsel.",
    images: ["/images/will-drafting-for-nris-in-trinidad-and-tobago-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_TRINIDAD_FAQS = [
  {
    q: "Does my Trinidad and Tobago Will cover my ancestral land and flats in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, land and flats follow the Lex Situs rule. This means Indian land follows Indian domestic law. Caribbean wills must go through probate court in Port of Spain first. They then face slow ancillary probate in Indian High Courts. Making a separate Indian Will lets your heirs take title directly through local land offices.",
  },
  {
    q: "Can a Trinidad citizen with OCI status inherit farm land in India?",
    a: "Yes. Under FEMA rules and Section 7A of the Citizenship Act 1955, OCI cardholders can legally inherit farm land, homes, and plots from Indian ancestors. Foreign citizens cannot buy new farm land in India. But inheriting land through a valid Will is fully legal. A signed Indian Will stops disputes before the local Tehsildar.",
  },
  {
    q: "How do I make a legal Indian Will while living in Trinidad?",
    a: "You can sign a valid Indian Will right at home in Trinidad. Print the Will on plain A4 paper. No Indian stamp paper is needed. Sign the Will before two adult witnesses who are not named as heirs. Under the Hague Apostille treaty, get an Apostille seal from the Registrar General in Port of Spain. Or visit the Indian High Commission for attestation.",
  },
  {
    q: "Can my Trinidad Will accidentally cancel my Indian Will?",
    a: "Yes. Standard wills drafted under the Trinidad Wills Ordinance often have terms that cancel all past wills worldwide. This can wipe out your Indian Will by mistake. We draft matched dual wills. Each Will has clear terms that protect the other document. Your Trinidad will covers Caribbean assets. Your Indian Will covers Indian assets.",
  },
  {
    q: "How can Indo-Trinidadian families prove lineage to claim ancestral land in India?",
    a: "Many families in Chaguanas and San Fernando trace roots to ancestors who arrived on ships like the Fatel Razack in 1845. You can prove family ties using ship records, birth papers, and village family tree records (Pedhinama or Varisat). Our High Court advocates help trace land records and resolve claims before local revenue courts.",
  },
  {
    q: "How can heirs in Trinidad send sale money home from India?",
    a: "Under RBI FEMA rules, foreign heirs can send up to 1 Million US Dollars home each financial year through an NRO bank account. Our advocates help you obtain a Section 197 lower tax certificate (Form 13) and CA certificates (Form 15CA and Form 15CB). This lowers tax cuts from 20% down to actual tax dues.",
  },
  {
    q: "Is it mandatory to register an Indian Will in India?",
    a: "No. Under Section 18 of the Indian Registration Act 1908, registering a Will is optional. An unregistered Will signed before two adult witnesses is legally valid. But getting an Apostille seal in Port of Spain or registering the Will gives strong proof if distant relatives in India try to dispute the title.",
  },
  {
    q: "What should I do if distant relatives in India occupy our family land?",
    a: "If relatives or third parties try to take over your ancestral plot, an Indian Will proves your legal ownership. Our advocates issue formal legal notices, apply for land boundary checks, and file civil injunction suits under Order 39 of the Civil Procedure Code to stop unlawful sales.",
  },
];

const TRINIDAD_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago",
      name: "Will Drafting for NRIs in Trinidad and Tobago | WillDrafting.in",
      description:
        "Expert Indian Will drafting for NRIs in Trinidad and Tobago. Protect ancestral lands, flats & NRE accounts under Indian Succession Act. Dual-will counsel.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-trinidad-and-tobago-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Trinidad and Tobago Cross-Border Succession Legal Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago#legalservice",
      name: "AMA Legal Solutions Cross-Border & NRI Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-trinidad-and-tobago-og.jpg",
      description:
        "Specialized cross-border succession counsel for Indo-Trinidadians, NRIs, and OCIs. High Court advocacy, ancestral property mutation, and FEMA asset repatriation.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Trinidad and Tobago" },
        { "@type": "City", name: "Chaguanas" },
        { "@type": "City", name: "San Fernando" },
        { "@type": "City", name: "Port of Spain" },
        { "@type": "City", name: "Couva" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago#service",
      name: "Will Drafting, Ancestral Title Verification & Cross-Border Estate Planning for NRIs in Trinidad and Tobago",
      serviceType:
        "Cross-Border Succession Planning, Standalone Indian Will Drafting & Ancestral Land Protection",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Trinidad and Tobago" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Trinidad & Tobago Cross-Border Indian Will Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standalone Indian Will Drafting with Foreign Asset Ring-Fencing",
              description:
                "Jurisdictionally ring-fenced Indian Will drafted by High Court advocates under the Indian Succession Act 1925, protecting real estate and bank accounts.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Indo-Caribbean Ancestral Land & Pedhinama Title Regularization",
              description:
                "Comprehensive ancestral property tracing, revenue records verification with local Tehsildars, and genealogical legal documentation for OCI heirs.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual-Will Cross-Border Estate Harmonization & FEMA Repatriation Protocol",
              description:
                "Complete estate coordination harmonizing Trinidadian wills with Indian testamentary instruments, Port of Spain apostille guidance, and RBI USD 1M repatriation roadmap.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago#howto",
      name: "How NRIs and OCIs in Trinidad and Tobago Execute a Legally Valid Indian Will",
      description:
        "Four-step statutory protocol to draft, authenticate, and enforce an Indian Will from Trinidad and Tobago under the Indian Succession Act 1925 and Hague Apostille Convention.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Estate Asset & Ancestral Lineage Audit",
          "text": "Identify all Indian real estate, ancestral land shares, bank accounts (NRE, NRO, FCNR), and demat portfolios, verifying revenue records and family trees.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "High Court Advocate Drafting & Ring-Fencing",
          "text": "Draft a standalone Indian Will with express territorial ring-fencing and non-revocation covenants safeguarding existing Trinidadian wills.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Local Signing & Port of Spain Apostille",
          "text": "Sign the plain-paper Will in Trinidad before two independent adult witnesses, followed by Hague Apostille authentication at the Registrar General's Department or HCI attestation.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Safe Custody & Executor Activation",
          "text": "Deposit certified copies with your designated Indian executor and legal counsel for seamless mutation before local municipal corporations and revenue offices.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago#faq",
      mainEntity: NRI_TRINIDAD_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago#breadcrumb",
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
          "name": "Will Drafting for NRIs in Trinidad and Tobago",
          "item":
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-trinidad-and-tobago",
        },
      ],
    },
  ],
};

const TRINIDAD_COMPARISON_ROWS = [
  {
    feature: "Governing Law",
    trinidadLaw: "Wills Ordinance Chap 9:03 & Wills Act",
    indianLaw: "Indian Succession Act 1925 (Sec 5, 59, 63)",
    impact: "Indian land follows Indian domestic law (Lex Situs).",
  },
  {
    feature: "Land and Flats",
    trinidadLaw: "Covers assets located in Trinidad & Tobago",
    indianLaw: "Sole rule over land and homes in India",
    impact: "A Trinidad will cannot transfer Indian land directly.",
  },
  {
    feature: "Court Grant (Probate)",
    trinidadLaw: "High Court grant in Port of Spain",
    indianLaw: "Court grant needed in Mumbai, Kolkata, Chennai",
    impact: "A separate Indian Will avoids slow court petitions.",
  },
  {
    feature: "Farm Land Inheritance",
    trinidadLaw: "Caribbean real estate succession rules",
    indianLaw: "FEMA rules allow OCI heirs to inherit farm land",
    impact: "OCIs can inherit farm land safely with a clear Will.",
  },
  {
    feature: "Witness Requirements",
    trinidadLaw: "Two adult witnesses present at the same time",
    indianLaw: "Two adult attesting witnesses under Section 63",
    impact: "Both nations use dual-witness rules for easy signing.",
  },
  {
    feature: "Official Document Seal",
    trinidadLaw: "Apostille seal from Registrar General in Port of Spain",
    indianLaw: "Accepted under Hague Apostille treaty rules",
    impact: "An Apostille seal makes your Will valid in Indian courts.",
  },
  {
    feature: "Sending Sale Money Home",
    trinidadLaw: "Central Bank of Trinidad exchange rules",
    indianLaw: "RBI permits up to 1 Million US Dollars per year",
    impact: "Section 197 certificates lower tax cuts on money transfers.",
  },
];

export default function NriTrinidadWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TRINIDAD_SCHEMA) }}
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
              NRIs in Trinidad &amp; Tobago
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
            1. HERO SECTION (Single Strict H1: 45 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <Globe2 className="w-4 h-4" />
                <span>
                  High Court Advocates · Trinidad &amp; Tobago Cross-Border Counsel
                </span>
              </div>

              {/* Single H1: 45 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Trinidad and Tobago
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Trinidad and Tobago has over 549,000 people of Indian origin.
                Many families live in Chaguanas, San Fernando, Port of Spain,
                and Couva. Many trace roots to Uttar Pradesh, Bihar, and
                Bengal. Many own ancestral farm plots, houses, flats, and bank
                funds in India. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act 1925
                </strong>
                , land and flats follow Indian law. A Trinidad will cannot
                easily transfer Indian land. Our High Court advocates draft
                clean Indian Wills. We protect your family assets and prevent
                court fights.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Cross-Border Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Draft Indian Will Online</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Port of Spain Apostille</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>OCI Ancestral Land Rights</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Dual-Will Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with SINGLE STRICT H2 (49 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Legal Traps
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Trinidad Wills Ordinance vs Indian Succession Law
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation Trap:</strong> Wills signed in
                    Port of Spain often state that all past wills are cancelled.
                    This can wipe out your Indian Will by mistake.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Slow Court Petitions in India:</strong> Indian land
                    offices do not accept foreign court grants directly. Heirs
                    must file slow court petitions under Section 228.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Land Grabbing by Distant Relatives:</strong> Without
                    a clear Indian Will, relatives in India may try to claim your
                    family plots.
                  </span>
                </li>
              </ul>
              <a
                href="#comparison-table"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Compare Trinidad vs Indian Succession Laws</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE DIAGNOSTIC COMPONENT
            ========================================================================= */}
        <NriTrinidadWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Cross-Border Asset Protection
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a dedicated Indian Will signed in Trinidad and Tobago protects
              ancestral lands, secures bank funds, and speeds up title transfer
              under Indian law:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-trinidad-and-tobago-og.jpg"
              alt="Will Drafting for NRIs in Trinidad and Tobago Cross-Border Succession Legal Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Legal workflow for Will drafting,
                Hague Apostille, and asset transmission for NRIs in Trinidad &amp;
                Tobago.
              </span>
              <span>
                Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
              </span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. RESPONSIVE HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="comparison-table" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Cross-Border Comparison</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Trinidad &amp; Tobago vs Indian Succession Law: Key Rules
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Rules in Port of Spain and New Delhi differ. Compare the key
              legal points below:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Point</th>
                    <th className="py-4 px-6 w-[26%]">Trinidad &amp; Tobago Law</th>
                    <th className="py-4 px-6 w-[26%]">Indian Succession Act 1925</th>
                    <th className="py-4 px-6 w-[26%]">Practical Effect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {TRINIDAD_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.trinidadLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.impact}
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
              <span>Step-by-Step Procedure</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Execution Protocol: Port of Spain to India
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow these simple steps to make and sign an Indian Will from
              Trinidad and Tobago:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Lineage Check",
                desc: "We check land deeds, Khata numbers, and bank account types. For ancestral plots, we trace roots back to village papers.",
              },
              {
                step: "02",
                title: "Advocate Will Drafting",
                desc: "Our High Court lawyers draft your Indian Will. We add clear terms to protect your Trinidad assets and stop cancellation.",
              },
              {
                step: "03",
                title: "Signing & Apostille Seal",
                desc: "Print the Will on plain A4 paper in Trinidad. Sign before two adult witnesses. Get an Apostille seal in Port of Spain.",
              },
              {
                step: "04",
                title: "Safe Custody & Transfer",
                desc: "Keep signed copies with your Indian executor. When the time comes, our advocates handle name change at local land offices.",
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
            6. COPY-PASTEABLE RING-FENCING CLAUSE BOX & CALCULATOR CARDS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Clauses</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Copy-Paste Foreign Asset Ring-Fencing Legal Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Your Indian Will must have clear borders to protect both your
              Trinidad estate and Indian assets. Use this verified clause:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Trinidad-India Foreign Asset Ring-Fencing & Non-Revocation Clause"
            code={`I, [Full Name of Testator], holding [Trinidad & Tobago / Indian] Passport No. [Passport Number], residing at [Residential Address in Chaguanas / San Fernando / Port of Spain, Trinidad and Tobago], declare this to be my Last Will and Testament strictly limited to my properties, bank accounts, and assets situated in the Republic of India.

1. TERRITORIAL EXCLUSIVITY: This Will applies solely and exclusively to my movable and immovable estate located within the territory of India, including but not limited to ancestral properties, residential flats, commercial premises, agricultural lands, and balances held in NRE, NRO, or FCNR accounts.

2. NON-REVOCATION OF FOREIGN TESTAMENTS: This instrument shall NOT revoke, modify, or affect any Last Will and Testament executed by me under the laws of Trinidad and Tobago (including the Wills and Probate Ordinance, Chap. 9:03) governing my assets outside India. Similarly, no general revocation clause in any foreign will shall be construed to revoke this Indian Will. Both instruments shall operate concurrently as independent legal testaments.

3. GOVERNING LAW & EXECUTOR: This Will shall be administered in accordance with the Indian Succession Act, 1925. I hereby appoint [Full Name of Executor], residing at [Address in India], as the sole Executor of this my Indian Will.`}
            explanation="Drafted under Section 5 and Section 62 of the Indian Succession Act 1925. This clause ensures that wills in Trinidad and India operate together safely without accidental cancellation."
          />

          {/* Contextual Link Cards to Interactive Legal Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed">
                    Estimate capital gains tax on inherited Indian land and
                    flats under Section 49 and Section 55 of the Income Tax Act
                    1961.
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

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed">
                    Check Section 195 TDS rates, Section 197 lower tax waivers,
                    and RBI 1 Million US Dollar remittance limits.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate TDS &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. MANDATORY ASSET: INDO-CARIBBEAN ANCESTRAL PROPERTY MANUAL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Specialized Legal Asset</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-5">
              Ancestral Property Protection &amp; OCI Succession Manual
            </h3>
            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-8">
              Over 35% of the people in Trinidad and Tobago belong to the
              historic Indo-Trinidadian community. Many families hold valid
              claims to ancestral lands in Uttar Pradesh, Bihar, and Bengal
              dating back to 1845. This manual shows you how to protect your
              family heritage:
            </p>

            <div className="space-y-6 text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#374151]">
              <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
                <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-2">
                  1. Tracing Family Lineage &amp; Legal Heir Rights
                </h4>
                <p className="text-[#49585F] mb-3">
                  Under the Hindu Succession Act 1956, heirs must prove ties
                  through a family tree (Pedhinama or Varisat). Our advocates
                  match ship passenger lists with village revenue records
                  (Khatauni). This links Caribbean heirs to ancestral land.
                </p>
                <div className="text-xs text-[#C65378] font-semibold">
                  Key Papers: Certified Family Tree &amp; Revenue Land Extract
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
                <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-2">
                  2. FEMA Rules &amp; OCI Farm Land Inheritance
                </h4>
                <p className="text-[#49585F] mb-3">
                  Under Rule 24 of FEMA Non-Debt Rules 2019, an OCI cardholder
                  cannot buy new farm land in India. But inheriting farm land or
                  houses from ancestors is fully legal. If sold later, the land
                  must be sold to an Indian resident citizen.
                </p>
                <div className="text-xs text-[#047857] font-semibold">
                  Rule: FEMA Non-Debt Rules 2019, Rule 24
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
                <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-2">
                  3. Signing Papers via Caribbean Channels
                </h4>
                <p className="text-[#49585F] mb-3">
                  Trinidad and Tobago follows the Hague Apostille treaty. Sign
                  your Indian Will or Power of Attorney before a local Notary
                  Public in Trinidad. Then get an Apostille seal from the
                  Registrar General in Port of Spain. Indian courts accept it
                  without embassy visits.
                </p>
                <div className="text-xs text-[#111827] font-semibold">
                  Official Seal: Registrar General, Port of Spain (Apostille)
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
                <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-2">
                  4. Stopping Unlawful Land Grabbing in India
                </h4>
                <p className="text-[#49585F] mb-3">
                  Absentee owners often face land grabbing by distant relatives.
                  A valid Indian Will lets our advocates file civil injunction
                  suits under Order 39 of the Civil Procedure Code. This stops
                  illegal sales and protects your land.
                </p>
                <div className="text-xs text-[#C65378] font-semibold">
                  Remedy: Civil Injunction &amp; Revenue Land Demarcation
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult Our Ancestral Property Lawyers</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Inherited Property Sale &amp; Repatriation</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FREQUENTLY ASKED QUESTIONS (Min 8 FAQs)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Legal Answers</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Trinidad &amp; Tobago NRI Wills
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_TRINIDAD_FAQS.map((item, idx) => (
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
                Related Cross-Border Succession Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related legal resources, templates, and representation:
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
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Release Deed (Haq Tyag)</span>
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
              This guide is prepared in accordance with the Indian Succession Act
              1925, the Citizenship Act 1955 (OCI Scheme), the Foreign Exchange
              Management (Non-debt Instruments) Rules 2019, the Hague Apostille
              Convention 1961, and the Trinidad and Tobago Wills and Probate
              Ordinance (Chap. 9:03). This publication is intended for legal
              education and does not establish an attorney-client relationship.
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
