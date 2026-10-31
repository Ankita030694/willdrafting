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
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriQatarWillInteractive from "@/components/NriQatarWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Qatar | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Qatar. Protect properties, NRE/NRO accounts, and assets in India under Indian Succession Act 1925 with AMA.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in qatar",
    "nri will drafting services qatar",
    "indian will for nri in qatar",
    "make a will for indian property from qatar",
    "indian inheritance lawyer qatar",
    "embassy of india doha will attestation",
    "qatar civil code no 22 of 2004 expat succession",
    "lex situs section 5 indian succession act",
    "nre nro bank account transmission without probate",
    "nri inherit agricultural land india fema 1999",
    "rbi usd 1 million repatriation scheme",
    "muslim personal law shariat act 1937 wasiyat qatar",
    "ama legal solutions cross border estate planning",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Qatar | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Qatar. Protect properties, NRE/NRO accounts, and assets in India under Indian Succession Act 1925 with AMA.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-qatar-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Qatar Indian Succession Act and Embassy Attestation Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Qatar | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Qatar. Protect properties, NRE/NRO accounts, and assets in India under Indian Succession Act 1925 with AMA.",
    images: ["/images/will-drafting-for-nris-in-qatar-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_QATAR_FAQS = [
  {
    q: "Does a will made in Qatar cover my flats and plots in India?",
    a: "No. Indian property follows the Lex Situs rule under Section 5 of the Indian Succession Act, 1925. Qatar courts have no legal power over land in India. You need a dedicated Indian Will to transfer Indian properties to your heirs without court delays.",
  },
  {
    q: "How can NRIs in Doha execute an Indian Will without traveling?",
    a: "You can sign your Will on plain A4 paper in Qatar. Under Section 63, you do not need Indian stamp paper. You sign before two adult independent witnesses who are not named as heirs in the document.",
  },
  {
    q: "How does attestation work at the Embassy of India in Doha?",
    a: "Consular attestation proves your Will is genuine. You book an appointment at the Indian Embassy in Onaiza, Doha. You sign before the consular officer and two witnesses. The officer then stamps your Will under the Consular Act.",
  },
  {
    q: "What happens to NRE and NRO bank accounts if I die without a Will?",
    a: "The Supreme Court ruled in Sarbati Devi that bank nominees are only caretakers. Without a Will, banks in India freeze accounts until heirs obtain a court succession certificate. A clear Will names your heirs and speeds up fund release.",
  },
  {
    q: "Can an NRI residing in Qatar inherit agricultural land in India?",
    a: "Yes. Under FEMA 1999 rules, NRIs can legally inherit agricultural land and farmhouses from Indian residents through a Will. While NRIs cannot buy farmland, inheriting it by Will is completely lawful.",
  },
  {
    q: "How do legal heirs in Qatar repatriate inherited money from India?",
    a: "Under RBI rules, heirs can transfer up to USD 1,000,000 each financial year from an NRO account. Our advocates help you obtain Form 15CA and Form 15CB tax certificates for seamless bank wire transfers.",
  },
  {
    q: "How do Wasiyat rules apply to Muslim Indian expats in Qatar?",
    a: "Under the Muslim Personal Law (Shariat) Application Act, 1937, you can bequeath up to one-third of your net estate via Wasiyat to non-heirs. Leaving more than one-third requires written consent from all legal heirs.",
  },
  {
    q: "Why is a separate Indian Will better than a single worldwide will?",
    a: "A single worldwide will creates probate delays. If you submit a Qatar will, Indian courts require an ancillary probate under Section 228. A separate Indian Will isolates your Indian estate for fast settlement.",
  },
];

const NRI_QATAR_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar",
      name: "Will Drafting for NRIs in Qatar | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Qatar. Protect properties, NRE/NRO accounts, and assets in India under Indian Succession Act 1925 with AMA.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-qatar-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Qatar Indian Succession Act and Embassy Attestation Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar#legalservice",
      name: "AMA Legal Solutions Qatar-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-qatar-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate succession counsel for NRIs in Qatar, specializing in Lex Situs compliance, Embassy of India Doha attestation, and FEMA asset repatriation.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Qatar" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar#service",
      name: "Indian Will Drafting for NRIs in Qatar",
      serviceType:
        "Cross-Border Indian Will Drafting, Embassy Attestation & Estate Transmission",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Qatar NRI Indian Estate Succession Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dedicated Indian Will Drafting with Qatar Asset Ring-Fencing",
              description:
                "Bespoke Indian Will drafted under Section 63 of the Indian Succession Act 1925, isolating Indian real estate, NRE/NRO accounts, and mutual funds from Qatar estate laws.",
            },
          },
          {
            "@type": "Offer",
            price: "29990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Embassy Attestation & Dual-Will Coordination Package",
              description:
                "Complete advocate assistance for Embassy of India Doha consular notarization, independent witness protocols, and cross-border Dual-Will alignment.",
            },
          },
          {
            "@type": "Offer",
            price: "54990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Full Cross-Border Estate Transmission & FEMA Repatriation Counsel",
              description:
                "Comprehensive estate planning covering High Court probate advisory, municipal revenue mutation across Indian states, and RBI USD 1M Form 15CA/15CB repatriation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar#howto",
      name: "How NRIs in Qatar Execute an Enforceable Indian Will",
      description:
        "Four-step statutory roadmap to draft, execute, and attest an Indian Will from Qatar under the Indian Succession Act and FEMA regulations.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Audit & Territorial Ring-Fencing",
          text: "Catalog Indian flats, ancestral plots, NRE bank accounts, and Demat folios with specific survey numbers and bank branch IFSC details.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Plain-Paper Will Drafting under Section 63",
          text: "High Court advocates draft your Indian Will with clear ring-fencing clauses ensuring no conflict with Qatar estate rules.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Attestation at Embassy of India in Doha",
          text: "Print the Will on plain A4 paper, sign before two adult independent witnesses, and optionally complete consular notarization in Doha.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Transmission & FEMA Remittance Setup",
          text: "Appoint an India-resident executor and structure asset transmission under RBI's annual USD 1 Million repatriation scheme.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar#faq",
      mainEntity: NRI_QATAR_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar#breadcrumb",
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
          name: "Will Drafting for NRIs in Qatar",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-qatar",
        },
      ],
    },
  ],
};

const QATAR_COMPARISON_ROWS = [
  {
    feature: "Governing Succession Law",
    qatarLaw: "Qatar Civil Code No. 22 of 2004 & Family Law No. 22 of 2006",
    indianLaw: "Indian Succession Act 1925 & Personal Laws (Hindu / Muslim)",
  },
  {
    feature: "Jurisdiction over Indian Real Estate",
    qatarLaw: "Zero jurisdiction under international Lex Situs principles",
    indianLaw: "Exclusive jurisdiction under Section 5 Indian Succession Act",
  },
  {
    feature: "Plain-Paper A4 Execution Validity",
    qatarLaw: "Requires Ministry of Justice notarization or QFC registration",
    indianLaw: "Fully valid on plain paper under Section 63 with two witnesses",
  },
  {
    feature: "Consular Notarization in Doha",
    qatarLaw: "Not sufficient alone to transfer property located inside Qatar",
    indianLaw: "Accepted as primary evidence under Consular Officers Act 1948",
  },
  {
    feature: "Freedom to Bequeath to Non-Heirs",
    qatarLaw: "Subject to mandatory Sharia rules unless registered via QFC",
    indianLaw: "100% testamentary freedom for Hindus, Sikhs, Christians & Parsis",
  },
  {
    feature: "Bank Account Transmission Rules",
    qatarLaw: "Local Qatar accounts freeze until civil court estate order",
    indianLaw: "NRE/NRO funds transfer to heirs named in Will (Sarbati Devi)",
  },
  {
    feature: "Cross-Border Asset Repatriation",
    qatarLaw: "Regulated by Qatar Central Bank for domestic funds only",
    indianLaw: "Up to USD 1,000,000 per financial year under RBI LRS scheme",
  },
];

const SEPARATE_WILL_RING_FENCING_CLAUSE = `1. TERRITORIAL JURISDICTION & SEPARATE WILL DECLARATION:
I hereby declare that this Last Will and Testament applies strictly and exclusively to all my movable and immovable assets, properties, bank accounts, shares, and financial investments situated in the Republic of India.

2. NON-REVOCATION OF OVERSEAS ESTATE INSTRUMENTS:
This Will shall not alter, revoke, supersede, or substitute any separate Will, testament, codicil, trust deed, or estate instrument executed by me in the State of Qatar, the Qatar Financial Centre (QFC), or any other foreign jurisdiction. Any such foreign testamentary instruments governing my assets outside India shall remain valid, operative, and in full legal force.

3. EXCLUSIVE SUBMISSION TO LEX SITUS & INDIAN JURISDICTION:
In accordance with Section 5 of the Indian Succession Act, 1925, succession to my immovable property located in India shall be governed entirely by the laws of India. No foreign court order, foreign probate, or overseas succession certificate shall prejudice the devolution of my Indian estate.`;

export default function NriQatarWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_QATAR_SCHEMA) }}
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
              NRIs in Qatar
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
                  Qatar-India Cross-Border Counsel · Embassy Attestation · FEMA Compliant
                </span>
              </div>

              {/* Single H1: 38 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Qatar
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 830,000 Indians live and work across Qatar in Doha, Lusail, and Al Rayyan. Most expat families invest their hard-earned money back home in India. They buy flats, plots, farmland, and maintain bank deposits. Qatar courts have no legal power over property in India. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                , Indian real estate follows Indian succession law. Our High Court advocates draft clean Indian Wills for NRIs in Qatar. We help you protect your assets, ring-fence foreign estates, and handle embassy attestation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#qatar-vs-india-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Qatar vs Indian Succession</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 63 ISA Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Embassy Attestation Guide</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA USD 1M Route</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Lawyer Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Unique H2: 51 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Legal Trap
              </div>
              {/* Single H2 on page: 51 chars */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why NRIs in Doha &amp; Qatar Need a Separate Indian Will
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Qatar Court Orders Cannot Move Indian Land:</strong> Indian real estate follows Indian succession law. Under Section 5 of the Succession Act, only an Indian Will allows local land mutation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominees Are Only Caretakers:</strong> In Sarbati Devi, the Supreme Court held that nominees do not own deposits. Without an Indian Will, Indian banks freeze NRE and NRO accounts.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Avoid Foreign Court Delays:</strong> Submitting a Qatar will for Indian assets forces heirs into court petitions under Section 228. This can delay property transfers for years.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read Master Guide for NRI Wills in India</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriQatarWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Cross-Border Legal Blueprint</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Qatar vs Indian Estate Planning
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A valid Indian Will protects your family property, isolates your Qatar employment benefits, and avoids civil court fights. See the core framework below:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-qatar-og.jpg"
              alt="Will Drafting for NRIs in Qatar Indian Succession Act and Embassy Attestation Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting for NRIs in Qatar under Section 63 and Lex Situs.
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
        <section id="qatar-vs-india-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Qatar Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Succession rules in Qatar differ from Indian succession laws. Foreign wills do not work for Indian property. Compare how both legal systems handle your estate:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[28%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[36%]">
                      Qatar Succession Law (Civil Code 2004)
                    </th>
                    <th className="py-4 px-6 w-[36%]">
                      Indian Succession Act 1925
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {QATAR_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.qatarLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
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
              <span>Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory 4-Step Indian Will Roadmap for Qatar NRIs
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Making a valid Indian Will from Qatar is simple when you follow clear legal steps. Here is our direct four-step path:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Step 01: Asset Audit & Territorial Ring-Fencing",
                desc: "We list your Indian flats, plots, bank deposits, and shares. We add ring-fencing terms to protect your Qatar salary and job benefits.",
              },
              {
                step: "02",
                title: "Step 02: Plain-Paper Will Drafting under Section 63",
                desc: "Our advocates draft your Will under Section 63 on plain A4 paper. You do not need Indian stamp paper or travel to India.",
              },
              {
                step: "03",
                title: "Step 03: Attestation at Embassy of India in Doha",
                desc: "You sign the Will before two adult witnesses in Qatar. You can also get it verified at the Embassy of India in Doha.",
              },
              {
                step: "04",
                title: "Step 04: Transmission & FEMA Remittance Setup",
                desc: "We help your family update land records in India. We also guide them on sending funds abroad under the RBI USD 1M rule.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    {item.step}
                  </span>
                  <h4 className="text-lg font-semibold text-[#111827] mb-2.5 leading-snug">
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
              Copy-Pasteable Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Online generic will formats often cancel foreign estate plans by accident. Here is the exact ring-fencing clause our High Court lawyers use:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Separate Indian Will & Qatar Asset Ring-Fencing Clause"
            code={SEPARATE_WILL_RING_FENCING_CLAUSE}
            explanation="This clause ensures your Indian Will applies only to property in India. It protects any wills or documents you made in Qatar, following Section 5 of the Indian Succession Act."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
            {/* Checklist Box */}
            <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#111827] mb-3">
                  Schedule Demarcation Checklist for Indian Assets
                </h4>
                <p className="text-xs text-[#55636D] mb-4">
                  Indian land offices require clear property facts to update title records quickly:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Clear Land Boundaries:</strong> State survey numbers, plot sizes, floor plans, and undivided land shares.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank Account Details:</strong> List full NRE and NRO bank account numbers with branch IFSC codes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demat &amp; Investment Folios:</strong> Record 16-digit depository client IDs and mutual fund folio numbers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Trusted Executor:</strong> Name a trusted adult in India to help manage land office filings.
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

            {/* Quick Consultation Card */}
            <div className="lg:col-span-5 bg-[#172228] text-white rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C65378] block mb-2">
                  Doha Expat Advisory
                </span>
                <h4 className="text-xl font-medium text-white mb-3">
                  Have Assets Across Both Qatar and India?
                </h4>
                <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed mb-4">
                  Our cross-border advocates build clean estate plans. We make sure your Indian Will works smoothly in India while your Qatar savings stay safe.
                </p>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                    <span>Zero travel to India needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                    <span>Direct High Court lawyer review</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/start"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#172228] hover:bg-[#FAF7F0] text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Draft Indian Will Online</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Link to Interactive Calculators */}
          <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-1">
                  Calculate Property Repatriation &amp; Capital Gains Tax
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55636D]">
                  Planning to sell an inherited Indian property from Qatar? Estimate capital gains tax and calculate net funds transferable under RBI remittance rules.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Capital Gains Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Repatriation TDS Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. IN-DEPTH STATUTORY SUCCESSION & FEMA REPATRIATION SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>FEMA &amp; RBI Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Protecting NRE Accounts &amp; Ancestral Properties in India
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Many NRIs in Doha rely on bank nominees or joint accounts. However, the Supreme Court ruled in{" "}
                <strong className="text-[#111827]">
                  Sarbati Devi v. Usha Devi (1984)
                </strong>{" "}
                that a nominee is only a caretaker. Nominees do not own the money. When an account holder dies without a Will, banks freeze the funds. Heirs must then spend months getting a court succession certificate. A clear Indian Will prevents this trouble.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                In addition, FEMA rules allow NRIs in Qatar to inherit farmland, plots, and homes in India. While foreign residents cannot purchase farm plots, inheriting them through a Will is 100% legal. Heirs can also transfer up to USD 1,000,000 every financial year through their NRO accounts under RBI rules.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>NRI Repatriation Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>High Court Probate Counsel</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. EMBASSY OF INDIA DOHA ATTESTATION GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Building2 className="w-4 h-4" />
              <span>Consular Guide</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Embassy of India Doha Attestation &amp; Execution Guide
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              If you want embassy verification for your Will in Qatar, follow this simple procedure:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                Book Embassy Slot
              </h4>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                Book a consular slot online through the Embassy of India in Doha portal. The embassy is in Onaiza, Diplomatic Area.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                Bring Core Documents
              </h4>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                Carry your original Indian passport, Qatar ID (QID), two copies of the plain-paper Will, and two photos.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                Sign Before the Officer
              </h4>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                Sign the Will before the consular officer and two witnesses. The officer stamps the paper under the Consular Act.
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
              <span>Cross-Border Legal FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Qatar NRI Will Drafting
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
            {NRI_QATAR_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-3 leading-snug">
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
                Related NRI Succession &amp; Cross-Border Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border guides, remittance tools, and estate services:
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
                <span>Inherited Property Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Probate &amp; Letters of Administration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Start Online Will Intake</span>
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
              This legal guide is prepared under the Indian Succession Act, 1925, Qatar Civil Code No. 22 of 2004, the Foreign Exchange Management Act (FEMA 1999), and the Diplomatic and Consular Officers (Oaths and Fees) Act, 1948. Landmark judicial precedents cited include Sarbati Devi v. Usha Devi (1984 AIR 346) and applicable High Court probate rulings. This publication provides legal education and does not substitute for individualized legal advice.
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
