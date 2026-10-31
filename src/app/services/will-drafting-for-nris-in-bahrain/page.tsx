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
import NriBahrainWillInteractive from "@/components/NriBahrainWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Bahrain | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Bahrain. Protect Indian properties, NRE accounts & mutual funds under Indian Succession Act 1925 with AMA.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in bahrain",
    "nri will drafting services bahrain",
    "indian will for nri in bahrain",
    "make a will for indian property from bahrain",
    "indian inheritance lawyer bahrain",
    "embassy of india manama will attestation",
    "bahrain expat cpr indian succession act",
    "sarbati devi bank nominee supreme court doctrine",
    "nre nro bank account transmission without probate",
    "muslim personal law shariat act 1937 bahrain wasiyat",
    "nri inherit agricultural land kerala fema 1999",
    "ama legal solutions cross border estate planning",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Bahrain | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Bahrain. Protect Indian properties, NRE accounts & mutual funds under Indian Succession Act 1925 with AMA.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-bahrain-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Bahrain Indian Succession Act and Embassy Attestation Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Bahrain | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Bahrain. Protect Indian properties, NRE accounts & mutual funds under Indian Succession Act 1925 with AMA.",
    images: ["/images/will-drafting-for-nris-in-bahrain-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_BAHRAIN_FAQS = [
  {
    q: "Does a Bahrain court order or will cover my flats and plots in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, real estate follows the Lex Situs rule. Indian law governs all land and flats in India. Bahrain courts have zero power over Indian real estate. Leaving Indian land without an Indian Will causes long court delays.",
  },
  {
    q: "How do Indian expats on Bahrain CPR sign an Indian Will without flying home?",
    a: "You do not need to fly to India or buy stamp paper. Under Section 63 of the Indian Succession Act 1925, you can print your Will on plain A4 paper in Bahrain. You simply sign it before two adult witnesses who are not named as heirs.",
  },
  {
    q: "How does signing work at the Embassy of India in Manama?",
    a: "Embassy signing gives strong legal proof. You visit the Embassy of India in Bu Ghazal, Manama. Bring your Indian passport, valid Bahrain CPR card, two copies of the Will, and two witnesses with ID cards. The officer stamps your Will under the Consular Act 1948.",
  },
  {
    q: "How do Wasiyat rules work for Muslim Indian expats in Bahrain?",
    a: "Under the Muslim Personal Law (Shariat) Act 1937, a Muslim Will maker can give up to one-third of net wealth via Wasiyat to non-heirs or charities. Giving more than one-third needs consent from all legal heirs. The other two-thirds goes to fixed Quranic heirs.",
  },
  {
    q: "What happens to NRE and NRO bank accounts if the owner passes away?",
    a: "In the Sarbati Devi case, the Supreme Court ruled that a bank nominee is just a trustee, not the true owner. Without an Indian Will, banks in India freeze NRE and NRO accounts and ask for a court certificate. A clear Indian Will names your heirs for fast payout.",
  },
  {
    q: "Can an NRI living in Bahrain inherit farm land in Kerala or Punjab?",
    a: "Yes. Under FEMA 1999 rules, NRIs and OCIs can legally inherit farm land, rubber estates, coconut groves, and family homes from an Indian resident through a Will. While NRIs cannot buy new farm land, inheriting it by Will is 100% legal.",
  },
  {
    q: "How can heirs in Bahrain bring money back from Indian property sales?",
    a: "Under RBI rules, foreign legal heirs can send up to USD 1,000,000 each year from their NRO bank account. Our lawyers help get low-tax certificates under Section 197 and handle Form 15CA and Form 15CB papers with Chartered Accountants for smooth transfers.",
  },
  {
    q: "Why is a separate Indian Will better than one global will?",
    a: "Using one global will causes long court delays. If your will is held in a foreign court, Indian courts ask for extra probate steps under Section 228 of the Succession Act, which takes two years. A separate Indian Will keeps your Indian assets safe for quick transfer.",
  },
];

const NRI_BAHRAIN_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain",
      name: "Will Drafting for NRIs in Bahrain | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Bahrain. Protect Indian properties, NRE accounts & mutual funds under Indian Succession Act 1925 with AMA.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-bahrain-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Bahrain Indian Succession Act and Embassy Attestation Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain#legalservice",
      name: "AMA Legal Solutions Bahrain-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-bahrain-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate counsel for NRIs in Bahrain, covering Lex Situs rules, Embassy of India Manama attestation, and FEMA transfers.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Bahrain" },
        { "@type": "City", name: "Manama" },
        { "@type": "City", name: "Riffa" },
        { "@type": "City", name: "Muharraq" },
        { "@type": "City", name: "Juffair" },
        { "@type": "City", name: "Seef" },
        { "@type": "City", name: "Saar" },
        { "@type": "City", name: "Adliya" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain#service",
      name: "Indian Will Drafting & Consular Attestation for NRIs in Bahrain",
      serviceType:
        "Cross-Border Indian Estate Planning & Consular Will Attestation for Bahrain Expats",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Bahrain" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Bahrain NRI Estate Planning & Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for Bahrain NRIs",
              description:
                "Section 63 valid Indian Will on plain paper covering Indian flats, NRE and NRO bank accounts, and demat shares with ring-fencing clauses.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Shariah Wasiyat or Multi-Asset Indian Succession Plan",
              description:
                "Complete estate plan following Muslim Personal Law 1937 Wasiyat rules or secular multi-city home and bank protection.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Cross-Border Estate & Embassy Attestation Counsel",
              description:
                "Full legal help for family farm land, Bahrain Embassy signing steps, and FEMA USD 1M fund transfer planning.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain#howto",
      name: "How NRIs in Bahrain Execute an Indian Will Without Travelling to India",
      description:
        "Five-step legal roadmap for Indian expats in Manama, Riffa, Muharraq, and Juffair to draft, sign, and stamp an Indian Will under Section 63.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Indian Asset List & Audit",
          text: "List all Indian flats and plots with survey numbers along with NRE, NRO, and Demat accounts.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Lawyer Drafting with Foreign Ring-Fencing",
          text: "Our High Court lawyers draft your Indian Will with a border clause that keeps Bahrain indemnity and local assets safe.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain Paper Signing in Bahrain",
          text: "Print the Will on plain A4 paper in Bahrain and sign before two adult witnesses under Section 63 of the Act.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Optional Stamp at Embassy of India Manama",
          text: "Get optional consular stamping at the Embassy of India in Manama (Bu Ghazal) under the Consular Act 1948.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Safe-Keeping & Smooth Transfer",
          text: "Keep the signed original with your executor in India for fast land mutation and FEMA money transfer.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain#faq",
      mainEntity: NRI_BAHRAIN_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain#breadcrumb",
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
          name: "Will Drafting for NRIs in Bahrain",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-bahrain",
        },
      ],
    },
  ],
};

const BAHRAIN_COMPARISON_ROWS = [
  {
    feature: "Governing Law",
    bahrainLaw: "Bahrain Family Law 19 of 2017 & Civil Code 19 of 2001",
    secularAct: "Indian Succession Act 1925 (Sections 5, 59 & 63)",
    shariatAct: "Muslim Personal Law (Shariat) Act 1937",
  },
  {
    feature: "Real Estate Rule",
    bahrainLaw: "Strict Lex Situs; Bahrain courts have zero power over Indian land",
    secularAct: "Strict Lex Situs; Indian land follows Indian law only",
    shariatAct: "Covers Indian homes and plots held by Muslim Will makers",
  },
  {
    feature: "Free Choice Quota",
    bahrainLaw: "Follows local Sharia fixed shares under Law 19 of 2017",
    secularAct: "100% free choice for all self-acquired properties",
    shariatAct: "Up to 1/3rd via Wasiyat without heir consent; 2/3rds to heirs",
  },
  {
    feature: "Signing Rules",
    bahrainLaw: "Needs Bahrain Ministry of Justice notary for local papers",
    secularAct: "Plain A4 paper signed before two adult witnesses (Section 63)",
    shariatAct: "Plain paper signed before two adult witnesses",
  },
  {
    feature: "Embassy Stamp Route",
    bahrainLaw: "Needs Bahrain MOFA stamp for use inside Bahrain",
    secularAct: "Embassy of India Manama (Bu Ghazal) under Consular Act 1948",
    shariatAct: "Indian embassy stamp accepted across all Indian offices",
  },
  {
    feature: "Bank Nominee Role",
    bahrainLaw: "Bahrain accounts freeze upon CPR cancel or death",
    secularAct: "Nominee is just a trustee; Will gives full title (Sarbati Devi)",
    shariatAct: "Nominee holds funds in trust for legal Sharia heirs",
  },
  {
    feature: "FEMA Money Transfer",
    bahrainLaw: "Follows Central Bank of Bahrain foreign exchange rules",
    secularAct: "Up to USD 1 Million per year via NRO with Form 15CA/CB",
    shariatAct: "Same RBI yearly USD 1M transfer limit for legal heirs",
  },
];

export default function WillDraftingForNrisInBahrainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_BAHRAIN_SCHEMA) }}
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
              Will Drafting for NRIs in Bahrain
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
            1. HERO SECTION (Single Strict H1: 40 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Manama Embassy Stamp · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 40 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Bahrain
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 327,000 Indians live and work in Bahrain across Manama,
                Riffa, Muharraq, and Juffair. Most families invest their hard-earned
                savings back home in Indian flats, plots, NRE accounts, and mutual
                funds. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act 1925
                </strong>
                , foreign court decrees cannot transfer Indian land. Our High Court
                lawyers draft clear Indian Wills on plain paper and guide you on
                embassy stamping at the Indian Embassy in Manama.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult NRI Estate Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Start Online Will Intake</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Manama Embassy Stamp</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Shariat Wasiyat Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA USD 1M Support</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (52 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Bahrain Expat Estate Risks
              </div>

              {/* Single H2: 52 chars (Strictly <= 70 chars, unique across pages) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Bahrain Expat Estate Risks: Protecting Indian Assets
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>CPR Cancel &amp; Frozen Accounts:</strong> Bahrain
                    bank accounts and job benefits freeze when your visa ends.
                    If Indian NRE or NRO accounts lack a Will, Indian banks demand
                    a court certificate that takes two years.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Foreign Orders Do Not Work:</strong> Under Section
                    5 of the Indian Succession Act 1925, Indian land offices reject
                    Bahrain court orders. Only an Indian Will transfers land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Nominees Are Not Owners:</strong> Under the Supreme
                    Court Sarbati Devi rule, bank nominees are just trustees. A
                    signed Will gives full legal title to your heirs.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read Master NRI Will Guide for India</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE SCENARIO & DIAGNOSTIC COMPONENT
            ========================================================================= */}
        <NriBahrainWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Guide</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Bahrain Law vs Indian Will
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              See how an Indian Will signed by NRIs in Bahrain keeps your homes
              safe, follows embassy rules, and stops family court fights:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-bahrain-og.jpg"
              alt="Will Drafting for NRIs in Bahrain Indian Succession Act and Embassy Attestation Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Key rules for Indian Will drafting by NRIs
                in Bahrain under the Indian Succession Act 1925 and Wasiyat law.
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
        <section id="bahrain-vs-indian-succession" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Bahrain Law vs Indian Succession Act: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Cross-border law mistakes cause long probate delays. Compare how
              Bahrain estate law works alongside the Indian Succession Act 1925
              and the Muslim Personal Law (Shariat) Act 1937:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[880px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Bahrain Succession Law
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Secular Indian Succession Act 1925
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Muslim Personal Law (Wasiyat)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {BAHRAIN_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.bahrainLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.secularAct}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.shariatAct}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. MANDATORY UNIQUE ON-PAGE ASSET: NRE ROADMAP & EMBASSY ATTESTATION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Bahrain NRI Manual</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Bahrain Expat NRE Banking Roadmap &amp; Consular Guide
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this 5-step checklist to draft, sign, and stamp your Indian
              Will while living in Manama, Riffa, Muharraq, Juffair, Seef, or Saar:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                step: "01",
                title: "Asset List & Check",
                desc: "List all Indian flats with survey numbers along with NRE, NRO, and Demat accounts.",
              },
              {
                step: "02",
                title: "Lawyer Will Drafting",
                desc: "Our High Court lawyers draft your Will with border clauses that keep Bahrain assets safe.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing",
                desc: "Print on plain A4 paper in Bahrain and sign before two adult witnesses under Section 63.",
              },
              {
                step: "04",
                title: "Manama Embassy Stamp",
                desc: "Visit the Embassy of India in Manama (Bu Ghazal) for official stamping under the Consular Act 1948.",
              },
              {
                step: "05",
                title: "Safe-Keeping & Payout",
                desc: "Keep the signed Will with your executor in India for fast land mutation and FEMA bank transfer.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Step {item.step}
                  </span>
                  <h4 className="text-base font-semibold text-[#111827] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[13.5px] leading-[1.6] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. COPY-PASTEABLE SEPARATE INDIAN WILL CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileText className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Essential Foreign Asset Ring-Fencing Clause for Bahrain
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Online templates often use broad clauses that cancel your foreign
              wills by mistake. Use this High Court vetted ring-fencing clause in
              your Indian Will:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Foreign Asset Ring-Fencing Clause (Bahrain Expat Specific)"
            code={`// TERRITORIAL RING-FENCING & NON-REVOCATION CLAUSE (BAHRAIN & GLOBAL EXCLUSION):

1. DECLARATION OF TERRITORIAL SCOPE:
I hereby expressly declare and direct that this Last Will and Testament applies exclusively and strictly to all my movable, immovable, tangible, and intangible properties, assets, bank accounts (including but not limited to NRE, NRO, and FCNR fixed deposits), demat equity shares, mutual fund folios, residential flats, plots, and agricultural land situated within the territorial borders of the Republic of India.

2. PRESERVATION OF FOREIGN ASSETS & INDEMNITY:
This Will shall NOT apply to, affect, or govern any assets, Bahrain CPR-linked bank accounts, end-of-service indemnity benefits, commercial business shares in the Kingdom of Bahrain, or personal effects situated in Bahrain or any other foreign jurisdiction.

3. EXCLUSION OF CROSS-BORDER REVOCATION:
Any past, concurrent, or future will, codicil, testamentary declaration, wasiyat, or estate document executed by me in the Kingdom of Bahrain or elsewhere in respect of non-Indian assets shall remain fully active, in force, and unrevoked by this instrument. This instrument specifically revokes prior wills ONLY to the extent that they relate to assets situated in India.`}
            explanation="Under Section 70 of the Indian Succession Act 1925, a broad revocation clause cancels all prior wills worldwide. This ring-fencing clause keeps your Bahrain benefits and foreign assets safe while protecting your Indian wealth."
          />

          {/* Contextual Link to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Capital Gains Tax on Inherited Property
                  </h4>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    Check indexation rules, Section 54 tax breaks, and net
                    gains on inherited Indian homes and plots.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Open Capital Gains Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Estimate NRI Property Sale TDS &amp; Repatriation
                  </h4>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    Check Section 195 tax rates, Section 197 low-tax
                    certificates, and Form 15CA/CB transfer steps.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Open TDS Repatriation Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. DUAL LEGAL REGIMES: SECULAR WILLS VS MUSLIM WASIYAT
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Dual Succession Regimes</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Secular Wills &amp; Muslim Wasiyat Planning in Bahrain
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Indians in Bahrain follow different personal laws back home. For
                Hindu, Christian, Sikh, Jain, and Parsi expats, the Indian
                Succession Act 1925 gives 100% free choice to leave self-acquired
                homes and money to any chosen person.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                For Muslim NRIs, estate law follows the Muslim Personal Law
                (Shariat) Act 1937. Under Wasiyat rules, you can leave up to
                one-third of your net estate to non-heirs or charities. Our High
                Court lawyers draft both secular Wills and Shariah-compliant
                Wasiyats to stop family fights.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Advocate Consultation</span>
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
            8. STATUTORY FAQS & OUTBOUND SPOKES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Bahrain NRI Indian Wills
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers written by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and checked by High Court lawyers at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_BAHRAIN_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h4 className="text-base font-semibold text-[#111827] mb-3 leading-snug">
                  {item.q}
                </h4>
                <p className="text-[14.5px] leading-[1.68] text-[#49585F]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Contextual Internal Links Bar with /sitemap (All Filter) and Services Filter */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Cross-Border Succession Services &amp; Directory
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI property services, probate help, and our full legal index:
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
                <span>WillDrafting Directory (All Pages)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=Services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>All Will Services (Services Filter)</span>
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
              This cross-border guide follows the Indian Succession Act 1925, the
              Muslim Personal Law (Shariat) Act 1937, FEMA 1999, the Banking Act
              1949, and the Consular Act 1948. Key court cases cited include Smt.
              Sarbati Devi v. Smt. Usha Devi (AIR 1984 SC 346) and Kale v. Deputy
              Director of Consolidation (AIR 1976 SC 807). This guide is for
              general learning and does not replace custom lawyer advice.
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
