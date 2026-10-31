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
import NriSaudiWillInteractive from "@/components/NriSaudiWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Saudi Arabia | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Saudi Arabia. Protect properties, NRE/NRO accounts, and mutual funds in India under the Indian Succession Act with AMA.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in saudi arabia",
    "nri will drafting services saudi arabia",
    "indian will for nri in saudi arabia",
    "make a will for indian property from saudi arabia",
    "indian inheritance lawyer saudi arabia",
    "saudi civil transactions law 2023 expat will",
    "muslim personal law shariat act 1937 wasiyat",
    "indian embassy riyadh will attestation",
    "indian consulate jeddah will attestation",
    "nri inherit agricultural land india fema 1999",
    "nre nro bank account transmission without probate",
    "ama legal solutions cross border estate planning",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Saudi Arabia | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Saudi Arabia. Protect properties, NRE/NRO accounts, and mutual funds in India under the Indian Succession Act with AMA.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-saudi-arabia-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Saudi Arabia Indian Succession Act and Embassy Attestation Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Saudi Arabia | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Saudi Arabia. Protect properties, NRE/NRO accounts, and mutual funds in India under the Indian Succession Act with AMA.",
    images: ["/images/will-drafting-for-nris-in-saudi-arabia-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_SAUDI_FAQS = [
  {
    q: "Does a Saudi local will or court decree cover my flats and plots in India?",
    a: "No. Under Section 5 of the Indian Succession Act, 1925, succession to immovable property follows the Lex Situs rule. Only Indian succession law governs land and flats in India. Saudi courts and local notaries have zero jurisdiction over Indian real estate. Leaving your Indian properties without a dedicated Indian Will causes severe court freezes in India.",
  },
  {
    q: "How do Indian NRIs on Iqama execute an Indian Will while living in Saudi Arabia?",
    a: "You do not need to travel to India or buy Indian stamp paper. Under Section 63 of the Indian Succession Act, 1925, a Will can be executed on plain A4 paper anywhere in the world. You sign the document before two adult independent witnesses who are not named as heirs in your Will.",
  },
  {
    q: "How does attestation work at the Indian Embassy in Riyadh or Consulate in Jeddah?",
    a: "Consular attestation provides verified proof of execution. You book an appointment at the Indian Embassy in Riyadh (Diplomatic Quarter) or the Consulate General in Jeddah. You present your original Indian passport, valid Iqama, two copies of the Will, and two witnesses with valid identification. The consular officer notarizes your signatures under the Consular Act, 1948.",
  },
  {
    q: "How do Wasiyat rules apply to Muslim Indian expats in Saudi Arabia?",
    a: "Under the Muslim Personal Law (Shariat) Application Act, 1937, a Muslim testator can bequeath up to one-third of their net estate via Wasiyat to non-heirs or charities. Any bequest exceeding one-third or given to a legal heir requires post-mortem consent from all legal heirs. The remaining two-thirds passes automatically to Quranic legal heirs.",
  },
  {
    q: "What happens to NRE and NRO bank accounts if the account holder passes away?",
    a: "In Sarbati Devi, the Supreme Court ruled that a bank nominee is merely a trustee, not the owner. Without an Indian Will, bank branches in India often freeze NRE and NRO accounts and demand a court succession certificate. A clear Indian Will names your heirs directly and allows swift fund transmission.",
  },
  {
    q: "Can an NRI residing in Saudi Arabia inherit agricultural land in India?",
    a: "Yes. Under FEMA 1999 regulations, NRIs and OCIs can legally inherit agricultural land, plantation property, and farmhouses from a resident Indian through a valid Will. While foreign residents cannot buy farmland in India, inheriting land through a Will is completely legal.",
  },
  {
    q: "How can heirs in Saudi Arabia repatriate money from inherited Indian properties?",
    a: "Under RBI foreign exchange rules, foreign legal heirs can transfer up to USD 1,000,000 every financial year from their NRO bank account. Our advocates assist with obtaining Lower TDS Certificates under Section 197 and coordinate Form 15CA and Form 15CB documentation with Chartered Accountants for smooth bank transfers.",
  },
  {
    q: "Why is a separate Indian Will critical rather than a combined worldwide will?",
    a: "Relying on a single worldwide will creates probate delays. If your will is submitted to a foreign court, Indian courts require an ancillary probate petition under Section 228 of the Indian Succession Act, taking up to two years. A separate Indian Will with a territorial ring-fencing clause isolates your Indian estate for fast settlement.",
  },
];

const NRI_SAUDI_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia",
      name: "Will Drafting for NRIs in Saudi Arabia | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Saudi Arabia. Protect properties, NRE/NRO accounts, and mutual funds in India under the Indian Succession Act with AMA.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-saudi-arabia-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Saudi Arabia Indian Succession Act and Embassy Attestation Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia#legalservice",
      name: "AMA Legal Solutions KSA-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-saudi-arabia-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate succession counsel for NRIs in Saudi Arabia, specializing in Lex Situs compliance, consular attestation, and FEMA asset repatriation.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "City", name: "Riyadh" },
        { "@type": "City", name: "Jeddah" },
        { "@type": "City", name: "Dammam" },
        { "@type": "City", name: "Khobar" },
        { "@type": "City", name: "Jubail" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia#service",
      name: "Indian Will Drafting & Consular Attestation for NRIs in Saudi Arabia",
      serviceType:
        "Cross-Border Indian Estate Planning & Consular Will Attestation for KSA Expats",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Saudi Arabia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Saudi NRI Estate Planning & Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for Saudi NRIs",
              description:
                "Section 63 compliant Indian Will on plain paper covering Indian flats, NRE and NRO bank accounts, and demat holdings with territorial ring-fencing clauses.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Shariah Wasiyat or Multi-Asset Indian Succession Package",
              description:
                "Comprehensive succession planning adhering to the Muslim Personal Law 1937 Wasiyat rules or secular multi-city real estate portfolio protection.",
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
                "End-to-end legal counsel for ancestral agricultural land, Riyadh or Jeddah consular attestation protocols, and FEMA USD 1M repatriation structuring.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia#howto",
      name: "How NRIs in Saudi Arabia Execute an Indian Will Without Travelling to India",
      description:
        "Four-step statutory roadmap for Indian expats in Riyadh, Jeddah, and Eastern Province to draft, execute, and attest an Indian Will under Section 63 of the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Indian Asset Mapping & Schedule Audit",
          text: "List all Indian immovable properties with survey numbers alongside NRE, NRO, and Demat accounts.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting with Foreign Ring-Fencing",
          text: "Our High Court advocates draft your Indian Will with a territorial restriction clause protecting non-Indian assets.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain Paper Execution in Saudi Arabia",
          text: "Print the Will on plain A4 paper in KSA and sign before two adult independent witnesses under Section 63 of the Act.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Optional Consular Attestation in Riyadh or Jeddah",
          text: "Optionally complete verification at the Indian Embassy in Riyadh or Consulate in Jeddah, then safe-keep with your executor.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia#faq",
      mainEntity: NRI_SAUDI_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia#breadcrumb",
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
          name: "Will Drafting for NRIs in Saudi Arabia",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-saudi-arabia",
        },
      ],
    },
  ],
};

const SAUDI_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    saudiLaw: "Saudi Civil Transactions Law 2023 (Royal Decree M/191)",
    secularAct: "Indian Succession Act, 1925 (Sections 5, 59 & 63)",
    shariatAct: "Muslim Personal Law (Shariat) Application Act, 1937",
  },
  {
    feature: "Real Estate Jurisdiction",
    saudiLaw: "Strict Lex Situs for Saudi assets; non-citizens cannot hold permanent estates",
    secularAct: "Strict Lex Situs; Indian land follows Indian succession law exclusively",
    shariatAct: "Applies to Indian properties held by Muslim testators under Indian law",
  },
  {
    feature: "Testamentary Freedom",
    saudiLaw: "Governed by Islamic Sharia rules on Saudi territory",
    secularAct: "100% testamentary freedom for self-acquired properties",
    shariatAct: "Up to 1/3rd via Wasiyat without heir consent; 2/3rds to legal heirs",
  },
  {
    feature: "Execution Formalities",
    saudiLaw: "Requires Saudi Ministry of Justice notary or judicial verification",
    secularAct: "Plain A4 paper signed before two adult witnesses (Section 63)",
    shariatAct: "Plain paper execution signed before two competent adult witnesses",
  },
  {
    feature: "Consular Attestation Route",
    saudiLaw: "MOFA & Saudi Chamber attestation for domestic use",
    secularAct: "Indian Embassy Riyadh & Consulate Jeddah under Consular Act 1948",
    shariatAct: "Indian consular attestation accepted across all Indian authorities",
  },
  {
    feature: "Bank Nominee Status",
    saudiLaw: "Saudi accounts freeze immediately upon Iqama cancellation or death",
    secularAct: "Nominee is merely a trustee; Will gives full ownership (Sarbati Devi)",
    shariatAct: "Nominee holds funds as custodian for distribution to Sharia heirs",
  },
  {
    feature: "FEMA Repatriation Privileges",
    saudiLaw: "Subject to local Saudi banking and remittance guidelines",
    secularAct: "Up to USD 1 Million per financial year via NRO with Form 15CA/CB",
    shariatAct: "Same RBI annual USD 1M repatriation quota for eligible heirs",
  },
];

export default function WillDraftingForNrisInSaudiArabiaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_SAUDI_SCHEMA) }}
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
              Will Drafting for NRIs in Saudi Arabia
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
            1. HERO SECTION (Single Strict H1: 45 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · KSA Consular Attestation · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 45 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Saudi Arabia
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 2.4 million Indian expats live in Saudi Arabia on an Iqama.
                Because Saudi law does not permit long-term foreign estate retention
                for non-citizens, your life savings flow back into India as flats,
                plots, NRE fixed deposits, and mutual funds. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                , foreign orders cannot transfer Indian property. Our High Court
                lawyers draft legally binding Indian Wills on plain paper with
                embassy attestation guidance in Riyadh and Jeddah.
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
                  <span>Riyadh &amp; Jeddah Attested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Shariat Wasiyat Supported</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA USD 1M Clearance</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (50 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                KSA Expat Succession Risks
              </div>

              {/* Single H2: 50 chars (Strictly <= 70 chars) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Saudi Expat Estate Risks: Protecting Indian Assets
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Iqama Expiry &amp; Frozen Indian Accounts:</strong> Saudi
                    bank accounts freeze upon final exit or death. If Indian NRE/NRO
                    accounts lack a valid Will, banks demand a civil succession
                    certificate that takes 2 to 3 years.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Foreign Court Decree Invalidation:</strong> Under Section
                    5 of the Indian Succession Act, Indian land registries reject
                    Saudi court orders. Only an Indian Will transfers land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Nominee Trustee Misconception:</strong> Under the Supreme
                    Court Sarbati Devi ruling, bank nominees are custodians, not
                    owners. A Will is required to give clean ownership.
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
        <NriSaudiWillInteractive />

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
              Visual Legal Framework: Saudi Law vs Indian Will
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will executed by NRIs in Saudi Arabia protects
              your properties, complies with consular attestation protocols, and
              prevents succession disputes across borders:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-saudi-arabia-og.jpg"
              alt="Will Drafting for NRIs in Saudi Arabia Indian Succession Act and Embassy Attestation Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting for NRIs
                in Saudi Arabia under the Indian Succession Act, 1925 and Wasiyat rules.
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
        <section id="saudi-vs-indian-succession" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Saudi Law vs Indian Succession Act: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to understand cross-border estate rules creates probate
              conflicts. Compare how Saudi Arabian succession law interacts with
              the secular Indian Succession Act, 1925 and the Muslim Personal Law
              (Shariat) Application Act, 1937:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[880px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Saudi Arabia Succession Law
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
                  {SAUDI_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.saudiLaw}
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
              <span>Mandatory Statutory Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Saudi Expat NRE Banking Roadmap &amp; Consular Guide
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this structured 5-step roadmap to draft, execute, and attest
              your Indian Will while residing in Riyadh, Jeddah, Dammam, Khobar, or
              Jubail:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                step: "01",
                title: "Asset Audit & Mapping",
                desc: "List all Indian flats with survey numbers, alongside NRE, NRO, and Demat accounts with CDSL or NSDL folios.",
              },
              {
                step: "02",
                title: "Advocate Will Drafting",
                desc: "Our High Court lawyers draft your Will with territorial ring-fencing clauses protecting non-Indian assets.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing in KSA",
                desc: "Print on plain A4 paper in Saudi Arabia and sign before two adult independent witnesses under Section 63.",
              },
              {
                step: "04",
                title: "Embassy Consular Attestation",
                desc: "Book a slot at Indian Embassy Riyadh or Consulate Jeddah for official attestation under the Consular Act, 1948.",
              },
              {
                step: "05",
                title: "Safe-Keeping & Transmission",
                desc: "Deposit the original with your executor in India for swift revenue mutation and FEMA repatriation clearance.",
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
              Essential Foreign Asset Ring-Fencing Clause for KSA
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard DIY templates often contain general revocation clauses that
              accidentally cancel foreign estate instruments. Use this High
              Court vetted ring-fencing clause in your Indian Will:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Foreign Asset Ring-Fencing Clause (Saudi Arabia Expat Specific)"
            code={`// TERRITORIAL RING-FENCING & NON-REVOCATION CLAUSE (SAUDI ARABIA & GLOBAL EXCLUSION):

1. DECLARATION OF TERRITORIAL SCOPE:
I hereby expressly declare and direct that this Last Will and Testament applies exclusively and strictly to all my movable, immovable, tangible, and intangible properties, assets, bank accounts (including but not limited to NRE, NRO, and FCNR fixed deposits), demat equity shares, mutual fund folios, residential flats, plots, and agricultural land situated within the territorial borders of the Republic of India.

2. PRESERVATION OF FOREIGN ASSETS & VISAS:
This Will shall NOT apply to, affect, or govern any assets, Iqama-linked bank balances, gratuity, end-of-service benefits, commercial interests, or personal effects situated in the Kingdom of Saudi Arabia or any other foreign jurisdiction.

3. EXCLUSION OF CROSS-BORDER REVOCATION:
Any past, concurrent, or future will, codicil, testamentary declaration, wasiyat, or estate document executed by me in the Kingdom of Saudi Arabia or elsewhere in respect of non-Indian assets shall remain fully active, in force, and unrevoked by this instrument. This instrument specifically revokes prior wills ONLY to the extent that they relate to assets situated in India.`}
            explanation="Under Section 70 of the Indian Succession Act, 1925, an unspecific revocation clause revokes all prior wills worldwide. This ring-fencing clause protects your non-Indian estate while securing your Indian assets."
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
                    Evaluate indexation benefits, Section 54 exemptions, and net
                    capital gains on inherited Indian real estate.
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
                    Calculate Section 195 withholding tax, Section 197 low-tax
                    certificates, and Form 15CA/CB documentation.
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
                Secular Wills &amp; Muslim Wasiyat Planning in Saudi Arabia
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                The Indian expatriate population in Saudi Arabia includes hundreds
                of thousands of professionals governed by different personal laws.
                For Hindu, Christian, Sikh, Jain, and Parsi expats, the Indian
                Succession Act, 1925 grants complete testamentary freedom to bequeath
                100% of self-acquired assets to chosen beneficiaries.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                For Muslim NRIs, estate planning follows the Muslim Personal Law
                (Shariat) Application Act, 1937. Under Islamic Wasiyat rules, you
                can bequeath up to one-third of your estate to non-heirs or
                charities. Our High Court advocates draft both secular Wills and
                Shariah-compliant Wasiyats to prevent family succession disputes.
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
              Frequently Asked Questions: Saudi NRI Indian Wills
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court advocates at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_SAUDI_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Cross-Border Succession Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI property services, probate support, and legal directory:
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
                <span>WillDrafting Sitemap Directory</span>
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
              Succession Act, 1925, the Muslim Personal Law (Shariat) Application
              Act, 1937, the Foreign Exchange Management Act (FEMA), 1999, and the
              Diplomatic and Consular Officers (Oaths and Fees) Act, 1948. Judicial
              precedents cited include Smt. Sarbati Devi v. Smt. Usha Devi (AIR
              1984 SC 346) and Kale v. Deputy Director of Consolidation (AIR 1976 SC
              807). This content provides legal education and does not replace
              individualized lawyer counsel.
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
