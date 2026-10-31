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
import NriUaeWillInteractive from "@/components/NriUaeWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in United Arab Emirates: NRI Will",
  },
  description:
    "Indian Will drafting for NRIs in United Arab Emirates. Protect properties, NRE/NRO bank accounts & investments in India under the Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in united arab emirates",
    "nri will drafting services united arab emirates",
    "indian will for nri in united arab emirates",
    "make a will for indian property from united arab emirates",
    "indian inheritance lawyer united arab emirates",
    "difc will vs indian will cross border",
    "uae decree law no 41 of 2022 non muslim will",
    "two will strategy nri uae dubai",
    "indian consulate dubai will attestation",
    "indian embassy abu dhabi will attestation",
    "nri inherit agricultural land india fema 1999",
    "ama legal solutions cross border estate planning",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in United Arab Emirates: NRI Will",
    description:
      "Indian Will drafting for NRIs in United Arab Emirates. Protect properties, NRE/NRO bank accounts & investments in India under the Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-uae-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in United Arab Emirates DIFC Will and Indian Succession Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in United Arab Emirates: NRI Will",
    description:
      "Indian Will drafting for NRIs in United Arab Emirates. Protect properties, NRE/NRO bank accounts & investments in India under the Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-uae-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_UAE_FAQS = [
  {
    q: "Does my registered DIFC or ADGM Will cover my flats and land in India?",
    a: "No. Land and flats in India follow the Lex Situs rule under Section 5 of the Indian Succession Act, 1925. This means only Indian law decides who gets Indian property. Land offices in India do not accept DIFC or ADGM court orders. Leaving your flats in a foreign will causes long court delays in India.",
  },
  {
    q: "How does the Two-Will Strategy protect both UAE and Indian assets?",
    a: "The Two-Will Strategy divides your assets into two clear parts. You keep a DIFC or Abu Dhabi civil will for your UAE properties and company shares. At the same time, you sign a separate Indian Will for your assets in India. Our lawyers draft a ring-fencing clause in your Indian Will. This clause limits each will to its own country. It prevents accidental cancellations across borders.",
  },
  {
    q: "Do I need to travel to India or buy Indian stamp paper to sign my Indian Will?",
    a: "No. You do not need to travel to India. Under the Indian Stamp Act, 1899, Wills pay zero stamp duty. You can print your Indian Will on plain A4 paper in Dubai, Abu Dhabi, or Sharjah. You then sign it before two adult witnesses who are not named as heirs in your will.",
  },
  {
    q: "How do I get an Indian Will attested at the Indian Consulate in Dubai or Abu Dhabi?",
    a: "Consular attestation is optional but very helpful. You book a visit at the Indian Consulate in Dubai or the Embassy in Abu Dhabi. Bring your original passport, UAE visa, two copies of your Will, and two witnesses with valid Emirates IDs. The consular officer checks your IDs and signs your Will with the official seal.",
  },
  {
    q: "Can an NRI residing in the UAE inherit agricultural farmland in India?",
    a: "Yes. Under FEMA 1999 rules, NRIs can inherit farmland, plantations, and farmhouses from an Indian resident. While foreign residents cannot buy farmland in India, inheriting land through a valid Will is 100% legal.",
  },
  {
    q: "What happens if a non-Muslim Indian expat dies without an Indian Will?",
    a: "UAE civil inheritance laws do not cover assets in India. If you die without a Will, your Indian properties follow the Hindu Succession Act, 1956 or Indian Succession Act, 1925. Your bank accounts and land freeze. Your family must spend years fighting in Indian civil courts to get a Succession Certificate.",
  },
  {
    q: "How does probate in India work if I only have a UAE civil court Will?",
    a: "If you only have a UAE Will, your family must wait for UAE probate first. Then they must file for ancillary probate in an Indian High Court under Section 228 of the Act. This process takes up to two extra years. Having a separate Indian Will lets your heirs start probate in India right away.",
  },
  {
    q: "How can my heirs repatriate sale proceeds of inherited Indian property to the UAE?",
    a: "Under RBI rules, foreign heirs can transfer up to USD 1,000,000 every financial year from their NRO bank account. Our lawyers help you get Section 197 low-tax certificates. We also help prepare Form 15CA and Form 15CB with Chartered Accountants for smooth bank transfers to Dubai.",
  },
];

const NRI_UAE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae",
      name: "Will Drafting for NRIs in United Arab Emirates: NRI Will",
      description:
        "Indian Will drafting for NRIs in United Arab Emirates. Protect properties, NRE/NRO bank accounts & investments in India under the Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-uae-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in United Arab Emirates DIFC Will and Indian Succession Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae#legalservice",
      name: "AMA Legal Solutions UAE-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-uae-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate succession counsel for NRIs in the United Arab Emirates, specializing in DIFC Will harmonization, Lex Situs compliance, and FEMA repatriation.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "AdministrativeArea", name: "Dubai" },
        { "@type": "AdministrativeArea", name: "Abu Dhabi" },
        { "@type": "AdministrativeArea", name: "Sharjah" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae#service",
      name: "Indian Will Drafting & DIFC Will Harmonization for NRIs in UAE",
      serviceType:
        "Cross-Border Indian Estate Planning & Will Attestation for UAE Expats",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI UAE Estate Planning & Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for UAE NRIs",
              description:
                "Section 63 compliant Indian Will on plain A4 paper covering Indian residential flats, NRE/NRO bank accounts, and demat holdings with ring-fencing clauses.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Two-Will DIFC / ADGM Harmonization Package",
              description:
                "Comprehensive dual-jurisdiction strategy synchronizing UAE DIFC or ADJD civil wills with an independent Indian Will to prevent revocation and probate resealing.",
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
                "Complete senior advocate consultation for ancestral agricultural land, multi-city real estate, Indian Consulate attestation briefing, and FEMA repatriation setup.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae#howto",
      name: "How NRIs in UAE Execute an Ironclad Indian Will Without Travelling to India",
      description:
        "Four-step statutory roadmap for Indian expats in Dubai, Abu Dhabi, and Sharjah to draft, execute, and attest an Indian Will under Section 63 of the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Indian Asset Mapping & Schedule Audit",
          text: "List all Indian immovable properties with survey numbers and municipal ward details, alongside NRE, NRO, and Demat accounts.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting with Foreign Ring-Fencing",
          text: "Our High Court advocates draft your Indian Will with a territorial restriction clause that protects your registered DIFC or ADGM Will.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain Paper Execution in UAE Before Two Witnesses",
          text: "Print the Will on plain A4 paper in Dubai or Abu Dhabi and sign before two adult independent witnesses under Section 63 of the Act.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Optional Indian Consulate Attestation & Executor Safe-Keeping",
          text: "Optionally book a verification slot at the Indian Consulate in Dubai or Embassy in Abu Dhabi, then store the original with your chosen executor.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae#faq",
      mainEntity: NRI_UAE_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae#breadcrumb",
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
          name: "Will Drafting for NRIs in United Arab Emirates",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-uae",
        },
      ],
    },
  ],
};

const SUCCESSION_COMPARISON_ROWS = [
  {
    parameter: "Governing Law",
    uaeLaw: "UAE Decree-Law No. 41 of 2022 & DIFC Rules",
    indianLaw: "Indian Succession Act, 1925 & Personal Laws",
    crossBorderImpact: "Each legal system applies only inside its own borders.",
  },
  {
    parameter: "Land and Flat Rules (Lex Situs)",
    uaeLaw: "UAE Courts / DIFC Registry for UAE freehold land",
    indianLaw: "Indian land registries strictly enforce Indian law",
    crossBorderImpact: "DIFC Wills cannot transfer land or flats in India.",
  },
  {
    parameter: "Bank & Demat Funds",
    uaeLaw: "UAE Central Bank rules freeze accounts until probate",
    indianLaw: "Sarbati Devi rule: Nominees are mere custodians",
    crossBorderImpact: "Indian banks freeze accounts without a valid Will.",
  },
  {
    parameter: "Stamp Paper Cost",
    uaeLaw: "Official registration fees at DIFC, ADGM, or ADJD",
    indianLaw: "Zero stamp duty; plain A4 paper is 100% legal",
    crossBorderImpact: "You do not need Indian stamp paper or travel to India.",
  },
  {
    parameter: "Witness Rules",
    uaeLaw: "Digital or in-person registry before DIFC officer",
    indianLaw: "Section 63 ISA: Two adult independent witnesses",
    crossBorderImpact: "Sign in Dubai before two witnesses to satisfy Section 63.",
  },
  {
    parameter: "Court Probate Steps",
    uaeLaw: "DIFC Grant of Probate or ADJD Civil Decree",
    indianLaw: "High Court Probate or Letters of Administration",
    crossBorderImpact: "Two separate Wills prevent 24-month foreign court delays.",
  },
  {
    parameter: "Estate Tax Rules",
    uaeLaw: "0% UAE tax on personal wealth",
    indianLaw: "0% estate duty in India on inherited assets",
    crossBorderImpact: "No inheritance tax; future capital gains apply only upon sale.",
  },
  {
    parameter: "Moving Money Abroad (FEMA)",
    uaeLaw: "Free money flow through UAE banks",
    indianLaw: "RBI limit: USD 1,000,000 per financial year",
    crossBorderImpact: "Form 15CA/CB and 197 certificates enable smooth wire transfer.",
  },
];

export default function NriUaeWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_UAE_SCHEMA) }}
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
            <Link
              href="/services/nri-will-india"
              className="hover:text-[#C65378] transition-colors font-medium"
            >
              NRI Wills
            </Link>
            <span>/</span>
            <span
              aria-current="page"
              className="text-[#111827] font-semibold"
            >
              United Arab Emirates
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
            1. HERO SECTION (Single Strict H1: 46 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <Globe2 className="w-4 h-4" />
                <span>
                  High Court Advocates · UAE-India Cross-Border Counsel
                </span>
              </div>

              {/* Single H1: 46 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in United Arab Emirates
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 3.5 million Non-Resident Indians live across Dubai, Abu
                Dhabi, and Sharjah. While UAE assets follow DIFC rules or UAE
                Decree-Law No. 41 of 2022, your Indian properties follow the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                . A foreign will cannot transfer land in India directly. Our High
                Court advocates draft independent Indian Wills. We protect your
                flats, plots, and NRE accounts while keeping your UAE estate plan
                safe.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Draft Online Will (/start)</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>DIFC Harmonized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 63 ISA Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Consulate Attestation Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA USD 1M Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (44 chars, <= 70 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Key Cross-Border Warning
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The DIFC Will &amp; Indian Asset Conflict Pitfall
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Lex Situs Blocks Foreign Wills:</strong> Indian land
                    registries do not accept DIFC or UAE court orders. Flats and
                    land in India require an Indian Will or an Indian court
                    probate order.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Will Revocation:</strong> Standard
                    templates from UAE law firms revoke all past wills
                    worldwide. This wording cancels your existing Indian Will
                    by mistake.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominees Are Custodians Only:</strong> The
                    Supreme Court ruled in Sarbati Devi that bank nominees do
                    not own the money. Bank accounts freeze without a valid
                    Will.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read Master NRI Will Drafting Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT: SCENARIOS & DIAGNOSTIC
            ========================================================================= */}
        <NriUaeWillInteractive />

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
              Visual Legal Framework: DIFC Will vs Indian Will
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a Two-Will strategy drafted by High Court advocates safeguards
              your UAE assets under local personal status laws while ring-fencing
              your Indian real estate and financial investments:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-uae-og.jpg"
              alt="Will Drafting for NRIs in United Arab Emirates DIFC Will and Indian Succession Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of cross border will
                planning under the Indian Succession Act, 1925 and UAE
                Decree-Law No. 41 of 2022.
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
        <section id="uae-vs-india-table" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Cross-Border Succession Analysis</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              DIFC Will vs Indian Will: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Operating across international borders demands complete clarity.
              Compare how United Arab Emirates personal status statutes and the
              Indian Succession Act, 1925 govern your estate:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">UAE Law (DIFC / ADJD)</th>
                    <th className="py-4 px-6 w-[26%]">Indian Law (ISA 1925)</th>
                    <th className="py-4 px-6 w-[26%]">Cross-Border Impact</th>
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
                        {row.uaeLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.crossBorderImpact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. STATUTORY 4-STEP ROADMAP FOR UAE NRIS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Legal 4-Step UAE NRI Estate Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              NRIs in Dubai and Abu Dhabi can protect their Indian assets without
              travelling to India. Follow our verified 4-step statutory roadmap:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Mapping & Schedule Audit",
                desc: "We list all Indian flats, land, NRE/NRO accounts, mutual funds, and demat client IDs into clear legal schedules.",
              },
              {
                step: "02",
                title: "Territorial Ring-Fenced Drafting",
                desc: "Our High Court advocates draft your Indian Will with strict non-revocation clauses that protect your UAE DIFC Will.",
              },
              {
                step: "03",
                title: "Execution Before Two Witnesses in UAE",
                desc: "Print on plain A4 paper and sign before two adult independent witnesses in Dubai, Abu Dhabi, or Sharjah under Section 63.",
              },
              {
                step: "04",
                title: "Optional Consular Attestation",
                desc: "Book a slot at the Indian Consulate in Dubai or Embassy in Abu Dhabi to add consular seals for faster Indian bank release.",
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
              Foreign Asset Non-Revocation Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard Will templates contain generic revocation phrases that
              cancel all previous testamentary documents worldwide. To protect
              your UAE DIFC Will and company shares, our advocates insert an
              ironclad territorial limitation clause:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="UAE-India Separate Will Ring-Fencing Clause (Section 63 ISA)"
            code={`"I hereby declare that this Last Will and Testament applies exclusively to my properties, investments, bank accounts, and assets situated within the territorial boundaries of the Republic of India. 

This Will shall NOT revoke, alter, affect, or supersede any other Last Will, Testament, DIFC Will, Abu Dhabi Judicial Department (ADJD) Registration, or Living Trust executed by me in the United Arab Emirates or any other foreign jurisdiction concerning assets situated outside India. 

Both testamentary instruments shall operate independently, concurrently, and harmoniously within their respective territorial jurisdictions."`}
            explanation="This clause sets clean borders between both countries under Section 5 and Section 63 of the Indian Succession Act, 1925. It ensures your Indian Will works smoothly without hurting your UAE DIFC or ADGM registered wills."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Checklist Box */}
            <div className="lg:col-span-12 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <h3 className="text-lg font-semibold text-[#111827] mb-3">
                UAE Consular Attestation Checklist
              </h3>
              <p className="text-xs text-[#55636D] mb-4">
                When presenting your Indian Will for attestation at the Consulate
                General of India in Dubai or the Embassy in Abu Dhabi, ensure:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[13.5px] text-[#374151]">
                    <strong>Passport &amp; Visa:</strong> Original Indian passport
                    and valid UAE residence or Golden Visa.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[13.5px] text-[#374151]">
                    <strong>Two Copies of Will:</strong> Plain A4 printouts
                    without any advance signatures.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[13.5px] text-[#374151]">
                    <strong>Two Witnesses:</strong> Adult witnesses present with
                    original Emirates IDs and passport copies.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[13.5px] text-[#374151]">
                    <strong>Photographs:</strong> Recent passport-sized color
                    photographs of testator and witnesses.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contextual Links to Interactive Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Capital Gains on Inherited Property
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Evaluate indexation benefits, Section 54 deductions, and
                    exemptions for properties inherited in India.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-between gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Open Tax Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate Section 195 withholding tax, Section 197 lower TDS
                    certificates, and USD 1M remittance limits.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-between gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate Repatriation TDS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. NON-MUSLIM PERSONAL STATUS LAW & INDIAN LAW HARMONIZATION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Landmark className="w-4 h-4" />
                <span>Statutory Authority &amp; Civil Law Harmony</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                UAE Decree-Law No. 41 of 2022 &amp; Indian Succession
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Federal Decree-Law No. 41 of 2022 on Civil Personal Status lets
                non-Muslim expats in the UAE draft civil wills. You can leave your
                local assets to anyone you choose. This law keeps your UAE assets
                safe from default local inheritance rules.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                However, this UAE law does not apply to assets in India. In
                India, land and flats follow the Lex Situs rule. Bank accounts
                follow personal succession laws. A separate Indian Will protects
                your properties in India. It ensures your family receives your
                assets smoothly without court fights.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Cross-Border Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Will (/start)</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. CONSULATE DUBAI & EMBASSY ABU DHABI ATTESTATION GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Diplomatic Mission Procedures</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Consulate Dubai &amp; Embassy Abu Dhabi Attestation
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Under Section 63 of the Indian Succession Act, 1925, an Indian Will
              is valid once signed on plain paper with two witnesses. Many Indian
              expats also get consular attestation. This step adds official proof
              and prevents family disputes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <h4 className="text-lg font-semibold text-[#111827] mb-3">
                Consulate General of India, Dubai
              </h4>
              <p className="text-sm leading-relaxed text-[#49585F] mb-4">
                Serves Dubai and the Northern Emirates. You can book an
                appointment online. Both you and two witnesses must visit in
                person with original passports and Emirates IDs. The consular
                officer stamps your Will.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>Personal presence of testator and two witnesses required.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>Valid Emirates IDs and passport copies submitted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>Consular endorsement confirms signature authenticity.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <h4 className="text-lg font-semibold text-[#111827] mb-3">
                Embassy of India, Abu Dhabi
              </h4>
              <p className="text-sm leading-relaxed text-[#49585F] mb-4">
                Serves residents of Abu Dhabi and Al Ain. Consular officers
                verify your identity and witness your signature. Indian banks
                readily accept consular-attested wills.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>Will signed in front of the Consular Officer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>Official consular stamp recognized across all Indian banks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>Eliminates challenges regarding testamentary capacity.</span>
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
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: UAE NRI Wills
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court cross-border counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_UAE_FAQS.map((item, idx) => (
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
                Related NRI Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border estate tools, probate services, and
                asset transmission guides:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Master NRI Will India Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/will-drafting-for-nris-in-usa"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Will Drafting for NRIs in USA</span>
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
                <span>High Court Probate Lawyers</span>
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
              This legal guide is prepared under the Indian Succession Act, 1925,
              the Indian Stamp Act, 1899, the Foreign Exchange Management Act
              (FEMA), 1999, and UAE Federal Decree-Law No. 41 of 2022 on Civil
              Personal Status. Judicial precedents cited include Sarbati Devi v.
              Usha Devi (1984 AIR 346 SC) regarding nominee fiduciary duties.
              This content provides legal education and does not replace personal
              lawyer counsel.
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
