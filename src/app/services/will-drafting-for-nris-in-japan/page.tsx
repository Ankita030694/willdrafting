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
  Building,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriJapanWillInteractive from "@/components/NriJapanWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Japan | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Japan. Protect properties, NRE/NRO accounts & investments in India under the Indian Succession Act 1925.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in japan",
    "nri will drafting services japan",
    "indian will for nri in japan",
    "make a will for indian property from japan",
    "indian inheritance lawyer japan",
    "japanese civil code minpo part v indian assets",
    "japan 55 percent inheritance tax nri ring fencing",
    "tokyo kobe nri estate succession advocate",
    "nro account inheritance repatriation japan",
    "dtaa india japan inherited property capital gains",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Japan | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Japan. Protect properties, NRE/NRO accounts & investments in India under the Indian Succession Act 1925.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-japan-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Japan: Cross-Border Asset Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Japan | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Japan. Protect properties, NRE/NRO accounts & investments in India under the Indian Succession Act 1925.",
    images: ["/images/will-drafting-for-nris-in-japan-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_JAPAN_FAQS = [
  {
    q: "How does Japan's 55% inheritance tax affect my Indian properties?",
    a: "Living in Japan over 10 years makes you an Unlimited Taxpayer. Japan may tax your worldwide estate up to 55%. A separate Indian Will ring-fences your Indian assets under Indian law. It gives tax officers clear proof that your Indian estate sits outside Japanese domestic probate.",
  },
  {
    q: "Can NRIs in Japan execute an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act, you can sign on plain A4 paper. You do not need Indian stamp paper while in Japan. You only need two adult witnesses who watch you sign. Your witnesses must not be heirs named in the Will.",
  },
  {
    q: "Does Japanese Civil Code forced heirship apply to Indian land?",
    a: "No. Section 5 of the Indian Succession Act sets the Lex Situs rule for land. Indian courts apply Indian succession law to Indian real estate. Section 59 gives you 100% freedom to bequeath self-acquired property. A separate Indian Will blocks Japanese forced share claims.",
  },
  {
    q: "Do I need a Japanese Notary and MOFA Apostille for my Will?",
    a: "Two adult witnesses make your Will legally valid under Indian law. A Japanese Notary stamp and a MOFA Apostille give strong proof of signature. You can also sign before a consular officer at the Indian Embassy in Tokyo or Consulate in Osaka.",
  },
  {
    q: "How are Indian NRE, NRO, and Demat accounts transmitted to heirs?",
    a: "Under the Supreme Court Sarbati Devi ruling, bank nominees act only as caretakers. Nominees do not own the funds. A valid Indian Will names your true heirs. This lets your family claim bank deposits and shares quickly without civil court succession orders.",
  },
  {
    q: "Can heirs in Japan repatriate property sale funds under RBI?",
    a: "Yes. Under RBI FEMA rules, NRI and OCI heirs can send up to USD 1,000,000 per financial year through an NRO account. The transfer needs Form 15CA and 15CB tax certificates issued by a Chartered Accountant in India.",
  },
  {
    q: "Why should NRIs in Japan avoid relying on a single worldwide Will?",
    a: "A single global Will requires Japanese Family Court probate (Ken'nin). Indian land registries and banks cannot read Japanese court papers directly. Your heirs must file ancillary probate in Indian High Courts under Section 228, causing years of delay.",
  },
  {
    q: "How does India-Japan DTAA protect against double capital gains?",
    a: "Article 13 of the India-Japan tax treaty covers capital gains on real estate. Taxes paid in India can be credited against Japanese tax dues. Heirs apply for a Section 197 lower tax certificate to prevent excess tax withholding in India.",
  },
];

const NRI_JAPAN_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan",
      name: "Will Drafting for NRIs in Japan | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Japan. Protect properties, NRE/NRO accounts & investments in India under the Indian Succession Act 1925.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-japan-og.jpg",
        width: 1200,
        height: 675,
        caption: "Will Drafting for NRIs in Japan: Cross-Border Asset Protection",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan#legalservice",
      name: "AMA Legal Solutions NRI Japan Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-japan-og.jpg",
      description:
        "Specialized cross-border testamentary legal counsel for Non-Resident Indians living in Japan. Seamless asset protection, Lex Situs ring-fencing, and RBI FEMA transmission advisory.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Japan" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Tokyo" },
        { "@type": "City", name: "Yokohama" },
        { "@type": "City", name: "Osaka" },
        { "@type": "City", name: "Kobe" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan#service",
      name: "Indian Will Drafting, Execution & Asset Ring-Fencing for NRIs in Japan",
      serviceType:
        "Cross-Border NRI Estate Planning, Separate Indian Will Drafting & Repatriation Advisory",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Japan" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Japan Indian Estate Succession Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "14990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Essential Plain-Paper Indian Testamentary Will",
              description:
                "Section 63 ISA compliant Will with Indian Lex Situs ring-fencing, executor powers, and direct depository asset demarcation.",
            },
          },
          {
            "@type": "Offer",
            price: "24990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Bespoke Cross-Border Will with MOFA Apostille Guidance",
              description:
                "Comprehensive cross-border Will tailored for Japan expats with Japanese Notary / MOFA Apostille support and SRO registration coordination.",
            },
          },
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High-Net-Worth Dual-Estate Architecture & Repatriation Counsel",
              description:
                "End-to-end estate structuring for IT founders and Kobe merchants with DTAA tax optimization, 55% ring-fencing, and Form 15CA/15CB advisory.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan#howto",
      name: "How NRIs in Japan Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, ring-fence, and execute a legally binding Indian Will while living in Japan under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Mapping & Japan Residency Audit",
          text: "Catalogue all Indian properties, NRE/NRO accounts, and Demat holdings, and evaluate your Japanese tax residency status against the 10-year unlimited taxpayer rule.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Lex Situs Ring-Fencing",
          text: "Our High Court advocates draft an exclusive Indian Will with explicit non-revocation clauses to protect your Indian assets from Japanese Civil Code forced heirship.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Attestation in Japan",
          text: "Execute the Will in Tokyo, Yokohama, Osaka, or Kobe before two non-beneficiary adult witnesses on plain paper, with optional Japanese Notary and MOFA Apostille.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Depository & Executor Authorization",
          text: "Deliver certified copies to your designated India-resident executor to enable smooth municipal mutation, Society transfer, and Form 15CA/15CB fund repatriation.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan#faq",
      mainEntity: NRI_JAPAN_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan#breadcrumb",
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
          name: "Will Drafting for NRIs in Japan",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-japan",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Primary Governing Statute",
    japanLaw: "Civil Code (Act 89 of 1896, Part V) & Inheritance Tax Act",
    indianLaw: "Indian Succession Act, 1925 (Lex Situs under Section 5)",
    ringFenced: "Territorial ring-fencing ensures Indian law governs Indian assets",
  },
  {
    feature: "Inheritance Tax Exposure",
    japanLaw: "Up to 55% marginal rate; applies worldwide if resident > 10 yrs",
    indianLaw: "0% estate duty; capital gains tax applies only upon future sale",
    ringFenced: "Clear asset demarcation separates non-Japanese situs property",
  },
  {
    feature: "Forced Heirship (Reserved Shares)",
    japanLaw: "Strict Iryubun reserves 1/3 to 1/2 of estate for statutory heirs",
    indianLaw: "100% testamentary freedom over self-acquired assets (Section 59)",
    ringFenced: "Protects Indian estate from foreign forced heirship litigation",
  },
  {
    feature: "Execution Formalities Abroad",
    japanLaw: "Holograph (handwritten) or Notarial deed (Article 969)",
    indianLaw: "Plain A4 paper signed before two adult witnesses (Section 63)",
    ringFenced: "Signed in Japan with optional Koshonin Notary & MOFA Apostille",
  },
  {
    feature: "Probate & Court Validation",
    japanLaw: "Family Court probate (Ken'nin) mandatory for holographic wills",
    indianLaw: "Probate needed only for wills in Mumbai, Kolkata, or Chennai",
    ringFenced: "Direct revenue mutation without waiting for foreign court decrees",
  },
  {
    feature: "Bank & Demat Asset Transfer",
    japanLaw: "Complex domestic probate documentation for Japanese banks",
    indianLaw: "Sarbati Devi rule applies; nominee is interim custodian for heirs",
    ringFenced: "Direct asset transfer and USD 1M annual RBI FEMA repatriation",
  },
];

const JAPAN_RING_FENCING_CLAUSE = `1. TERRITORIAL JURISDICTION & EXCLUSIVITY:
I hereby declare that this Last Will and Testament applies strictly, exclusively, and solely to all my immovable and movable properties, estate, residential flats, commercial premises, agricultural lands, plots, bank accounts (including NRE, NRO, and FCNR balances), fixed deposits, mutual funds, Demat equity holdings, and financial assets situated within the territorial boundaries of the Republic of India.

2. NON-REVOCATION OF OVERSEAS JAPANESE TESTAMENT:
I expressly declare that this Indian Will shall NOT revoke, supersede, alter, or impact any Will, testament, or disposition executed by me in Japan or any other foreign jurisdiction concerning properties and assets situated outside India. My Indian estate and my Japanese estate shall remain independent and separate testamentary domains.

3. EXCLUSION OF JAPANESE FORCED HEIRSHIP (IRYUBUN):
Pursuant to the principle of Lex Situs codified in Section 5 of the Indian Succession Act 1925, I hereby confirm that the succession of my immovable and movable estate situated in India shall be governed exclusively by the laws of India. I exercise complete testamentary freedom under Section 59 of the Indian Succession Act 1925, to the total exclusion of the forced heirship provisions (Iryubun) under Part V of the Japanese Civil Code (Minpo).`;

export default function WillDraftingNrisJapanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_JAPAN_SCHEMA) }}
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
              Will Drafting for NRIs in Japan
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
            1. HERO SECTION (Single Strict H1: 39 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <Globe2 className="w-4 h-4" />
                <span>Tokyo · Yokohama · Osaka · Kobe NRI Legal Counsel</span>
              </div>

              {/* Single H1: 39 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Japan
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 47,000 Indians live in Tokyo, Yokohama, Osaka, and Kobe.
                Protecting your Indian assets is vital. Japan taxes worldwide wealth
                up to 55% for 10-year residents. Indian law governs Indian land and
                flats. Our High Court advocates draft clean Indian Wills. We ring-fence
                your assets and keep your family safe from dual taxes.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult NRI Estate Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#japan-vs-india-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Japanese vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>55% Tax Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>MOFA Apostille Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Forced Heirship</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (Strictly 40 chars <= 70 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Legal Bottleneck
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Japanese 55% Inheritance Tax Dilemma
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>10-Year Global Tax Trap:</strong> Living in Japan for over
                    10 years triggers tax on global assets up to 55%. A separate Indian Will
                    keeps Indian assets away from Japanese tax audits.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Japanese Forced Heirship:</strong> Japan reserves up to
                    half of your estate for heirs. Indian law gives you 100% freedom to
                    bequeath self-acquired property as you wish.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Foreign Court Probate Delays:</strong> Indian land registries
                    reject foreign court papers. A separate Indian Will allows fast
                    property transfer across India.
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
        <NriJapanWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Guide: Indian Will Execution for NRIs in Japan
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will drafted by High Court advocates safeguards
              your Indian real estate, insulates your estate from Japanese 55% tax, and
              complies with Indian Succession Act Section 63:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-japan.jpg"
              alt="Will Drafting for NRIs in Japan: Cross-Border Asset Protection"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting, Lex
                Situs asset ring-fencing, and execution protocol for NRIs living in Japan.
              </span>
              <span>
                Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
              </span>
            </figcaption>
          </figure>
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
                You protect your flats and land in India. Court succession cases take
                years to finish. A clean Will lets your heirs take over smoothly.
                We help you draft a valid Will so your family avoids long legal fights.
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
                Any Indian in Tokyo, Yokohama, Osaka, or Kobe who owns property, bank
                accounts, or shares in India. It serves IT engineers and merchant families.
                You can sign on plain paper in Japan with two adult witnesses.
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
                Our High Court advocates draft separate Wills for Indian assets. We ring-fence
                your estate against Japanese 55% tax rules and guide you through
                Japanese Notary attestation and MOFA Apostilles.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="japan-vs-india-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Cross-Border Legal Matrix</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Japan Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to separate your Indian estate from your Japanese residence causes
              tax exposure and procedural deadlock. Review how Japanese Civil Code rules
              compare with the Indian Succession Act 1925:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Japanese Minpo Part V
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Indian Succession Act 1925
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Ring-Fenced Dual-Will Model
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
                        {row.japanLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.ringFenced}
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
              <span>Statutory Execution SOP</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Indian Will Execution Roadmap for NRIs in Japan
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this verified legal procedure to draft, execute, and ring-fence
              your Indian assets without traveling to India:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Portfolio Mapping & Tax Audit",
                desc: "We inventory all Indian real estate, NRE/NRO fixed deposits, Demat portfolios, and evaluate residency years against Japan's 10-year unlimited tax bracket.",
              },
              {
                step: "02",
                title: "Bespoke Advocate Drafting",
                desc: "High Court advocates craft an exclusive Indian Will with Lex Situs ring-fencing clauses, excluding Japanese forced heirship and safeguarding non-revocation.",
              },
              {
                step: "03",
                title: "Execution & Attestation in Japan",
                desc: "You sign on plain white A4 paper before two non-beneficiary adult witnesses in Japan. Optional notarization via Tokyo/Kanagawa One-Stop Apostille.",
              },
              {
                step: "04",
                title: "Safe Depository & Transmission",
                desc: "Certified copies are shared with your India-resident executor for swift municipal mutation, Society share transfers, and RBI Form 15CA/15CB fund repatriation.",
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
            6. COPY-PASTEABLE SEPARATE WILL CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Copy-Pasteable Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A standard single global Will creates catastrophic tax liabilities and
              delays. Use this advocate-verified ring-fencing clause in your Indian Will:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <div className="lg:col-span-12">
              <CopyableNriPropertyClauseBox
                title="Japan-India Asset Ring-Fencing & Non-Revocation Clause"
                code={JAPAN_RING_FENCING_CLAUSE}
                explanation="This clause establishes independent territorial jurisdiction under Section 5 of the Indian Succession Act 1925. It ensures that an overseas Japanese Will or disposition cannot revoke your Indian Will, and excludes Japanese Civil Code forced heirship (Iryubun) claims over Indian real estate."
              />
            </div>
          </div>

          {/* Contextual Links to Interactive Tax Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate Indian capital gains tax on inherited ancestral properties,
                    indexation benefits, and Section 54/54EC exemptions before sale.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate Capital Gains Tax</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Determine Section 195 TDS deductions, Section 197 lower deduction rates,
                    and compute net repatriation under RBI 1 Million USD guidelines.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate NRI Sale TDS &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. DEMOGRAPHIC FOCUS: TOKYO IT PROFESSIONALS & KOBE MERCHANTS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Building className="w-4 h-4" />
                <span>Tokyo Tech &amp; Kobe Merchant Heritage</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Specialized Estate Solutions for Indians in Tokyo &amp; Kobe
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                The Indian diaspora in Japan has two main groups. Tokyo and Yokohama
                host software engineers, fintech specialists, and bank executives.
                Kobe is home to historic diamond and textile trading families who have
                lived in Kitano for decades.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Tech workers need clear plans for NRE and NRO bank accounts, mutual
                funds, and stocks. Kobe merchant families hold ancestral commercial
                properties and business shares in Gujarat and Maharashtra. Our High Court
                advocates draft custom Wills so every asset transfers smoothly without
                family disputes.
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
                <span>Draft Online Will for Indian Assets</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. MANDATORY UNIQUE ON-PAGE ASSET: ESTATE SUCCESSION MANUAL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Mandatory Unique On-Page Asset</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Japan-India Estate Succession Manual: 55% Tax Ring-Fencing
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative legal guidance on navigating Japanese National Tax Agency
              rules and structuring separate Indian Wills:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-3">
                1. Japanese Tax Classification (Limited vs Unlimited)
              </h4>
              <p className="text-sm leading-relaxed text-[#49585F] mb-4">
                Japan divides foreign residents into two tax classes:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Limited Taxpayers (Under 10 Years):</strong> Expats living in
                    Japan for 10 years or less. Only assets located in Japan face inheritance tax.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Unlimited Taxpayers (Over 10 Years / PR):</strong> Permanent
                    residents or expats living in Japan over 10 years. Global assets face up
                    to 55% tax.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-3">
                2. Indian Asset Ring-Fencing &amp; Separate Will Execution
              </h4>
              <p className="text-sm leading-relaxed text-[#49585F] mb-4">
                How separate Wills protect your estate:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Clear Asset Boundaries:</strong> An Indian Will applies solely
                    in India. It gives tax officers clear proof of where each asset sits.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Fast Property Mutation:</strong> Indian land registries,
                    banks, and municipal offices process Indian Wills in weeks. Your family
                    avoids foreign court probate delays.
                  </span>
                </li>
              </ul>
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
              <span>Legal Knowledge Base</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Will Drafting for NRIs in Japan
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_JAPAN_FAQS.map((item, idx) => (
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
                Related NRI Succession &amp; Asset Protection Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border legal services, repatriation guides, and formats:
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
                <span>NRI Inherited Property Sale &amp; Repatriation</span>
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
                href="/templates/will-format-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Indian Will Format &amp; Template</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Sitemap (All Filter)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Services Filter</span>
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
              This cross-border legal guide is published under the Indian Succession
              Act 1925, the Japanese Civil Code (Act No. 89 of 1896, Part V), the Japanese
              Inheritance Tax Act, and RBI FEMA Master Direction No. 13. Precedents cited
              include Sarbati Devi v. Usha Devi (AIR 1984 SC 346). This content provides legal
              education and does not replace individualized advocate counsel.
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
