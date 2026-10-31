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
  Users,
  HelpCircle,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriMalaysiaWillInteractive from "@/components/NriMalaysiaWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Malaysia | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Malaysia. Protect ancestral land, flats & bank accounts under Indian Succession Act. Avoid dual probate.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in malaysia",
    "nri will drafting services malaysia",
    "indian will for nri in malaysia",
    "make a will for indian property from malaysia",
    "indian inheritance lawyer malaysia",
    "malaysian oci ancestral land inheritance india",
    "malaysian probate and administration act 1959 vs indian will",
    "two will strategy nri malaysia",
    "high commission of india kuala lumpur will attestation",
    "hindu succession act section 6 coparcenary malaysia",
    "fema 1999 agricultural land inheritance malaysia oci",
    "ama legal solutions cross border estate planning malaysia",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Malaysia | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Malaysia. Protect ancestral land, flats & bank accounts under Indian Succession Act. Avoid dual probate.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-malaysia-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Malaysia Indian Succession and High Commission Attestation Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Malaysia | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Malaysia. Protect ancestral land, flats & bank accounts under Indian Succession Act. Avoid dual probate.",
    images: ["/images/will-drafting-for-nris-in-malaysia-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_MALAYSIA_FAQS = [
  {
    q: "Can Malaysian citizens with OCI cards inherit land in India?",
    a: "Yes. Under FEMA rules from 2018, OCI cardholders can inherit farm land, groves, and flats in India from an Indian resident. You cannot buy new farm land in India, but you have full rights to inherit ancestral land.",
  },
  {
    q: "Why can't a single Malaysian Will cover properties in India?",
    a: "Land follows local rules where it sits. This is the Lex Situs rule under Section 5 of the Indian Succession Act 1925. Indian land offices and registrars do not accept Malaysian Wills without costly court resealing in India.",
  },
  {
    q: "How does the Two-Will Plan protect my Malaysian assets?",
    a: "Most Malaysian Wills cancel all prior wills across the world. Our advocates draft your Indian Will with a ring-fencing clause. It covers only Indian assets. It leaves your Malaysian Will, EPF, and local savings fully intact.",
  },
  {
    q: "Do I need to visit India or buy stamp paper to make my Will?",
    a: "No. You do not need to travel to India. Wills are exempt from stamp duty under the Indian Stamp Act 1899. You can print your Will on plain A4 paper in Malaysia and sign it before two adult witnesses.",
  },
  {
    q: "Should I get my Will attested at the High Commission in KL?",
    a: "Plain-paper signing before two witnesses is valid under Section 63 of the Indian Succession Act. Getting consular attestation at the High Commission of India in Kuala Lumpur adds extra proof. It helps local banks and land officers act faster.",
  },
  {
    q: "How does Malaysian Probate differ from Indian court orders?",
    a: "A probate grant from the High Court of Malaya has no direct power in India. Your heirs would need an ancillary grant in India under Section 228. A separate Indian Will avoids this double court delay completely.",
  },
  {
    q: "Can Malaysian OCIs claim shares in ancestral Hindu property?",
    a: "Yes. Under Section 6 of the Hindu Succession Act 1956, coparceners have birth rights in ancestral land. The Supreme Court confirmed in Vineeta Sharma (2020) that daughters hold equal birth rights regardless of foreign citizenship.",
  },
  {
    q: "How can my heirs send inherited sale money back to Malaysia?",
    a: "Under Reserve Bank of India rules, foreign heirs can send home up to 1 Million US Dollars per financial year from their NRO account. Our advocates help you get Form 15CA, Form 15CB, and lower TDS certificates.",
  },
];

const NRI_MALAYSIA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia",
      name: "Will Drafting for NRIs in Malaysia | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Malaysia. Protect ancestral land, flats & bank accounts under Indian Succession Act. Avoid dual probate.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-malaysia-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Malaysia Indian Succession and High Commission Attestation Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia#legalservice",
      name: "AMA Legal Solutions Malaysia-India Cross-Border Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-malaysia-og.jpg",
      description:
        "Cross-border Indian testamentary succession, Malaysia-India estate harmonization, Section 63 Will drafting, High Commission of India attestation, and FEMA asset repatriation.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Malaysia" },
        { "@type": "AdministrativeArea", name: "Kuala Lumpur" },
        { "@type": "AdministrativeArea", name: "Selangor" },
        { "@type": "AdministrativeArea", name: "Penang" },
        { "@type": "AdministrativeArea", name: "Johor Bahru" },
        { "@type": "AdministrativeArea", name: "Perak" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia#service",
      name: "Indian Will Drafting & Cross-Border Estate Harmonization for NRIs in Malaysia",
      serviceType:
        "Cross-Border Indian Will Drafting, Ancestral Land Inheritance & FEMA Asset Succession",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Malaysia" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Malaysia Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard NRI Indian Will Drafting & Plain-Paper Execution Guide",
              description:
                "Comprehensive Section 63 compliant Indian Will covering flats, land, NRE/NRO accounts, and Demat portfolios with Malaysian asset ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Malaysian High Commission Consular Attestation Assistance Package",
              description:
                "High Court advocate vetting with High Commission of India Kuala Lumpur consular attestation roadmap, notary guidelines, and Indian safe custody advisory.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Turnkey Dual-Jurisdiction Estate Harmonization & Ancestral Land Mutation",
              description:
                "Turnkey cross-border alignment of Malaysian estate plans with Indian Succession Act rules, ancestral patta mutation support, and FEMA USD 1M remittance advisory.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia#howto",
      name: "How NRIs in Malaysia Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and ring-fence an Indian Will from Malaysia under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule Asset Mapping & Ancestral Pedigree Audit",
          text: "Catalog all immovable properties, village survey numbers, NRE/NRO bank accounts, and ancestral coparcenary shares in India with exact revenue records.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Cross-Border Ring-Fencing",
          text: "Draft the Indian Will with an explicit Non-Revocation Territorial Clause that protects Malaysian Wills, EPF balances, and local real estate.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Attestation & Malaysian High Commission Verification",
          text: "Print the Will on plain A4 paper and sign before two independent adult witnesses. Optionally obtain consular attestation at the High Commission of India in Kuala Lumpur.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & Transmission Readiness in India",
          text: "Deliver copies to your trusted Indian executor and deposit sealed duplicates with legal counsel for smooth revenue mutation and bank transmission.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia#faq",
      mainEntity: NRI_MALAYSIA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia#breadcrumb",
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
          name: "Will Drafting for NRIs in Malaysia",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-malaysia",
        },
      ],
    },
  ],
};

const SUCCESSION_COMPARISON_ROWS = [
  {
    parameter: "Governing Law",
    malaysianLaw: "Malaysian Wills Act 1959 & Probate Act 1959",
    singleMalaysianWill: "High Court of Malaya Probate Jurisdiction",
    separateIndianWill: "Indian Succession Act 1925 ss. 5 & 63",
  },
  {
    parameter: "Indian Real Estate & Land",
    malaysianLaw: "Not valid for Indian land",
    singleMalaysianWill: "Invalid without costly Indian court resealing",
    separateIndianWill: "100% valid under Section 5 Lex Situs doctrine",
  },
  {
    parameter: "Signing & Witnesses",
    malaysianLaw: "Signed before 2 witnesses under Malaysian rules",
    singleMalaysianWill: "Must meet Malaysian probate court rules",
    separateIndianWill: "Plain paper; 2 adult independent witnesses (Zero stamp duty)",
  },
  {
    parameter: "Probate Time in India",
    malaysianLaw: "Stalls; heirs must file civil suits",
    singleMalaysianWill: "Takes 18 to 36 months for ancillary probate",
    separateIndianWill: "Fast probate or direct land mutation in India",
  },
  {
    parameter: "NRE/NRO Bank Accounts",
    malaysianLaw: "Indian banks reject foreign probate orders",
    singleMalaysianWill: "Requires certified court decrees with high delays",
    separateIndianWill: "Fast account transfer under standard RBI rules",
  },
  {
    parameter: "Risk of Accidental Revocation",
    malaysianLaw: "Boilerplate clauses cancel overseas wills",
    singleMalaysianWill: "High risk of cross-border legal fights",
    separateIndianWill: "Zero risk; ring-fencing keeps Malaysian estate safe",
  },
  {
    parameter: "High Commission Attestation",
    malaysianLaw: "Not needed for domestic Malaysian assets",
    singleMalaysianWill: "Complex foreign court certification needed",
    separateIndianWill: "Accepted directly by High Commission of India in KL",
  },
];

const RING_FENCING_CLAUSE = `1. TERRITORIAL SCOPE & SEPARATE WILL DECLARATION:
I declare that this Will applies solely to my assets situated within the Republic of India. This includes my flats, plots, ancestral land, bank accounts, and shares in India.

2. PROTECTION OF MALAYSIAN ESTATE & NON-REVOCATION CLAUSE:
I declare that this Will does NOT revoke, alter, or cancel any other Will or nomination made by me in Malaysia or outside India. Any Will made by me for my Malaysian assets (including my Malaysian home, bank accounts, and EPF savings) shall remain in full force alongside this Indian Will.

3. SETTLEMENT OF INDIAN ASSETS ONLY:
My Executor named in this Will shall manage only my assets located in India. They shall have no power over my properties in Malaysia or elsewhere outside India.`;

export default function NriMalaysiaWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_MALAYSIA_SCHEMA) }}
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
              Will Drafting for NRIs in Malaysia
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
            1. HERO SECTION (Single Strict H1: 34 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Malaysia-India Estate Counsel
                </span>
              </div>

              {/* Single H1: 34 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Malaysia
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 2.9 million Indians live in Malaysia. They live in Kuala
                Lumpur, Selangor, Penang, and Johor Bahru. Many hold ancestral
                land in Tamil Nadu, Kerala, or Punjab. Many also own flats and
                bank accounts in India. A Malaysian Will cannot transfer land in
                India. Our High Court advocates draft clear Indian Wills for
                you. We help you protect family land and stop court fights.
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
                  href="#malaysia-vs-india-comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Malaysia vs India Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA 1999 OCI Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Indian Stamp Duty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>HCI KL Attestation Guidance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Page H2: 39 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Single Malaysian Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Dual Probate &amp; Lex Situs Bottleneck
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Land Rules in India:</strong> Real estate in India
                    follows Indian law under Section 5 of the Indian Succession
                    Act 1925. Indian land offices reject foreign wills.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Will Cancel:</strong> Malaysian Wills
                    often state that they cancel all past wills. This can wipe
                    out your Indian estate plans by mistake.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancestral Farm Land:</strong> Malaysian OCIs can
                    inherit ancestral land under FEMA rules. Without a clear
                    Will, relatives may challenge your title in court.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore NRI Master Estate Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            1.5 PLAIN-ENGLISH SUMMARY CARDS (Flesch Readability Support)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                Why Write an Indian Will Now?
              </h4>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                If you pass away without a Will, your Indian properties freeze.
                Your heirs must spend years in court to get legal papers. A
                simple Indian Will names your heirs and passes land smoothly.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                Who Needs This Service?
              </h4>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                Any Indian citizen or Malaysian OCI cardholder who owns flats,
                ancestral plots, or bank accounts in India needs this. It protects
                assets in India without touching your Malaysian estate.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 text-[#C65378] flex items-center justify-center mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                How Our High Court Advocates Help
              </h4>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                We check your land papers in India. We draft a solid Will under
                Indian law. We guide you through plain-paper signing in
                Malaysia. We also assist your family with land mutation.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriMalaysiaWillInteractive />

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
              Visual Cross-Border Will Architecture
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will drafted for NRIs in Malaysia secures
              ancestral land, complies with High Commission attestation rules,
              and avoids dual court probate:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-malaysia-og.jpg"
              alt="Will Drafting for NRIs in Malaysia Indian Succession and High Commission Attestation Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting for
                Malaysian NRIs under the Indian Succession Act 1925.
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
        <section id="malaysia-vs-india-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Cross-Border Succession Matrix</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Malaysia Succession Law vs Indian Succession Act
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Using only a Malaysian Will for Indian land causes frozen bank
              accounts and long court delays. Compare how cross-border plans
              work under Malaysian and Indian law:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Succession Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Malaysian Domestic Law
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Single Malaysian Will in India
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Separate Indian Will (ISA 1925)
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
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.malaysianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.singleMalaysianWill}
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
            5. STATUTORY 4-STEP ROADMAP (Mandatory On-Page Asset)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Ancestral Claim &amp; Attestation Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Roadmap for Malaysian NRIs &amp; OCIs
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this verified 4-step path to write, sign, and enforce your
              Indian Will from Malaysia without traveling to India:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Pedigree & Revenue Title Audit",
                desc: "We check village patta, chitta, jamabandi, and survey records in Tamil Nadu, Kerala, or Punjab. We trace legal heirs to ensure clear title.",
              },
              {
                step: "02",
                title: "Advocate Drafting & Ring-Fencing",
                desc: "Our High Court lawyers draft your Indian Will with a territorial non-revocation clause. This keeps your Malaysian estate and EPF safe.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing & KL Attestation",
                desc: "Sign on plain A4 paper before two witnesses in Malaysia. We guide consular attestation at the High Commission of India in KL for added legal strength.",
              },
              {
                step: "04",
                title: "Tehsildar Mutation & Bank Transfer",
                desc: "Our Indian advocates submit the Will to local revenue offices for patta mutation and assist your family with bank transfers.",
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
            6. COPY-PASTEABLE SEPARATE WILL RING-FENCING CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileText className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Essential Indian Will Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard Malaysian Will drafts contain general revocation
              clauses. These clauses can cancel earlier wills by mistake. A
              dedicated Indian Will must use explicit territorial ring-fencing
              words:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Cross-Border Ring-Fencing & Non-Revocation Clause"
            code={RING_FENCING_CLAUSE}
            explanation="This clause restricts your Indian Will solely to assets in India. It preserves your Malaysian Will, EPF balance, and Malaysian real estate, preventing cross-border legal challenges in both courts."
          />
        </section>

        {/* =========================================================================
            7. CONTEXTUAL REPATRIATION & TAX CALCULATOR LINKS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#111827] mb-1">
                    Calculate Inherited Property Capital Gains Tax
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed">
                    Estimate capital gains tax on inherited Indian houses, flats,
                    and land under Section 49 and Section 55 of the Income Tax Act
                    1961.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Launch Capital Gains Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed">
                    Calculate Section 195 withholding TDS and map RBI 1 Million
                    USD repatriation from NRO bank accounts using Form 15CA and
                    Form 15CB.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Launch TDS Repatriation Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. ANCESTRAL PROPERTY & OCI COPARCENARY RIGHTS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Hindu Succession Act Section 6 Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Ancestral Coparcenary Rights for Malaysian OCIs
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Section 6 of the Hindu Succession Act 1956, coparceners
                get equal birth rights in ancestral land. In{" "}
                <strong className="text-[#111827]">
                  Vineeta Sharma v. Rakesh Sharma (2020 SC)
                </strong>
                , the Supreme Court ruled that daughters hold equal birth rights
                just like sons, regardless of foreign citizenship.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Malaysian citizens of Indian origin often hear that foreign
                nationals cannot hold ancestral farm land. Under FEMA rules,
                OCIs can lawfully inherit ancestral farm land. Our High Court
                advocates check revenue records and draft clear Wills to protect
                your family rights.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors text-center"
              >
                <span>Book Advocate Consultation</span>
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
            9. STATUTORY FAQS & RELATED RESOURCES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Cross-Border Legal FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Malaysia NRI Wills
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border High Court advocates at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_MALAYSIA_FAQS.map((item, idx) => (
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
                Related NRI Succession &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border legal services and court probate
                guidance:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Will Master Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Inherited Property Repatriation</span>
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
                href="/services/property-mutation-dakhil-kharij-service"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Property Mutation (Patta / Khata)</span>
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
              Succession Act 1925, the Hindu Succession Act 1956, the Malaysian
              Probate and Administration Act 1959, and the Foreign Exchange
              Management Act (FEMA) 1999. Judicial precedents cited include
              Vineeta Sharma v. Rakesh Sharma (2020 SC) and Sarbati Devi v. Usha
              Devi (1984 SC). This content provides legal education and does
              not replace individualized advocate counsel.
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
