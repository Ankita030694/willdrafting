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
  Copy,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriSurinameWillInteractive from "@/components/NriSurinameWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Suriname | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Suriname. Protect land, flats, NRO accounts & ancestral assets under Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in suriname",
    "nri will drafting services suriname",
    "indian will for nri in suriname",
    "make a will for indian property from suriname",
    "indian inheritance lawyer suriname",
    "sarnami hindustani ancestral land succession",
    "paramaribo wanica nri property advocate",
    "suriname civil code burgerlijk wetboek will",
    "dutch translation indian succession certificate",
    "hague apostille suriname indian will",
    "fema nro account inheritance repatriation",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Suriname | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Suriname. Protect land, flats, NRO accounts & ancestral assets under Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-suriname-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Suriname Dutch Translation and Indian Succession Act Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Suriname | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Suriname. Protect land, flats, NRO accounts & ancestral assets under Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-suriname-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_SURINAME_FAQS = [
  {
    q: "Does a Surinamese Dutch Will Transfer Land in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, Indian land follows Indian law only. A Dutch Will signed before a notary in Paramaribo cannot transfer Indian land. You need an Indian Will to avoid court cases. Our lawyers help you write a clear Will. It keeps your land safe.",
  },
  {
    q: "Can NRIs in Suriname Sign an Indian Will on Plain Paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act 1925, you can sign your Will on plain A4 paper. You do not need Indian stamp paper. You sign before two adult witnesses who are not heirs. It is quick and fully legal. We send you the format.",
  },
  {
    q: "How Does Hague Apostille Apply to Surinamese Documents?",
    a: "Suriname joined the 1961 Hague Apostille Treaty. Dutch civil papers, death certificates, and lineage trees need an Apostille seal from Suriname. They also need a certified English translation for Indian courts. We guide you through each step. It makes court work smooth.",
  },
  {
    q: "Can Sarnami Hindustanis Inherit Farmland in UP or Bihar?",
    a: "Yes. Under FEMA rules and the Citizenship Act 1955, OCI cardholders can inherit ancestral farm land from an Indian resident. Foreign citizens cannot buy new farm land. A clear Will protects your ancestral rights and keeps your family land safe. Your title stays strong.",
  },
  {
    q: "What Happens to Indian Bank Accounts Without an Indian Will?",
    a: "In the Sarbati Devi ruling, the Supreme Court held that a bank nominee is only a caretaker, not the owner. Without a Will, banks in India freeze accounts. Heirs must spend years in court to get the money. A Will stops bank freezes. Your heirs get quick access.",
  },
  {
    q: "How Does Burgerlijk Wetboek Boek 4 Impact Cross-Border Wills?",
    a: "Suriname Civil Code has forced heirship rules for local property. Indian law gives 100% Will freedom over self-acquired wealth. Ring-fencing your Indian Will stops Dutch civil rules from interfering with Indian estates. Each Will works on its own soil. You decide your heirs.",
  },
  {
    q: "How Much Inherited Money Can NRIs Repatriate from India?",
    a: "Under RBI rules and NRO bank accounts, legal heirs can send up to USD 1 Million per year from India to Suriname. You pay Indian taxes first and file Form 15CA and 15CB papers. We help you with bank papers. The money transfers directly.",
  },
  {
    q: "Is Attestation at the Indian Embassy Paramaribo Mandatory?",
    a: "No, embassy visits are optional. Section 63 requires only two neutral adult witnesses. But getting your Will attested at the Indian Embassy in Paramaribo gives strong proof if relatives challenge your Will later. It gives peace of mind. It stops disputes.",
  },
];

const NRI_SURINAME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname",
      name: "Will Drafting for NRIs in Suriname | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Suriname. Protect land, flats, NRO accounts & ancestral assets under Indian Succession Act with AMA Legal Solutions.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-suriname-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Suriname Dutch Translation and Indian Succession Act Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname#legalservice",
      name: "AMA Legal Solutions Suriname-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-suriname-og.jpg",
      description:
        "Specialized cross-border estate planning and Indian Will drafting for NRIs, OCIs, and Sarnami Hindustani families in Paramaribo, Wanica, and Nickerie.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Suriname" },
        { "@type": "City", name: "Paramaribo" },
        { "@type": "AdministrativeArea", name: "Wanica" },
        { "@type": "AdministrativeArea", name: "Uttar Pradesh" },
        { "@type": "AdministrativeArea", name: "Bihar" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname#service",
      name: "Will Drafting for NRIs in Suriname & Indian Succession Counsel",
      serviceType:
        "Cross-Border Indian Will Drafting, Dutch Translation & Succession Certification",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "Suriname",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Suriname NRI Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "14990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standalone Indian Will Drafting for NRIs in Suriname",
              description:
                "English-language Will compliant with Section 63 of Indian Succession Act, plain paper execution, and territorial ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "24990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual-Will Structure & Hague Apostille Document Advisory",
              description:
                "Coordinated dual-will estate strategy separating Dutch Surinamese assets from Indian real estate, bank deposits, and mutual funds.",
            },
          },
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Senior Advocate Lineage Pedigree, Sec 372 Certificate & Mutation",
              description:
                "End-to-end representation in Indian civil courts for Sarnami Hindustani lineage verification, Section 372 certificate, and SRO land mutation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname#howto",
      name: "How NRIs in Suriname Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory protocol for Surinamese NRIs and OCIs to draft, sign, and validate an Indian Will under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule All Assets Across India",
          text: "List your ancestral land, city homes, bank accounts, and shares in India with clear survey details.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Legal Drafting with Jurisdictional Ring-Fence",
          text: "Our advocates draft your Indian Will with a ring-fencing clause that leaves your Dutch assets untouched.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain Paper Signing with Two Witnesses",
          text: "Print your Will on plain paper in Suriname. Sign it before two adult witnesses who are not heirs in the Will.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Optional Embassy Attestation or Safe Custody",
          text: "Attest the Will at the Indian Embassy in Paramaribo or store the original document in safe custody.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname#faq",
      mainEntity: NRI_SURINAME_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname#breadcrumb",
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
          name: "Will Drafting for NRIs in Suriname",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-suriname",
        },
      ],
    },
  ],
};

const SURINAME_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    surinameLaw: "Burgerlijk Wetboek Suriname (Boek 4 Erfrecht)",
    indianLaw: "Indian Succession Act 1925 (Sections 5, 59 & 63)",
    crossBorderEffect: "Indian law strictly controls all Indian land and flats",
  },
  {
    feature: "Land & Flat Rule",
    surinameLaw: "Governs property inside Suriname borders",
    indianLaw: "Strict Lex Situs rule under Section 5 of ISA 1925",
    crossBorderEffect: "Suriname deeds cannot transfer Indian land directly",
  },
  {
    feature: "Testamentary Freedom",
    surinameLaw: "Restricted by forced heirship rules",
    indianLaw: "100% Will freedom over self-acquired wealth",
    crossBorderEffect: "Indian Will lets you give assets to heirs of your choice",
  },
  {
    feature: "Execution Language",
    surinameLaw: "Mandatory Dutch language before a civil notary",
    indianLaw: "English or Hindi draft signed before two witnesses",
    crossBorderEffect: "Avoids costly Dutch translation delays in Indian courts",
  },
  {
    feature: "Legalization Protocol",
    surinameLaw: "Civil notary deed registered with local registry",
    indianLaw: "Plain A4 paper valid; Hague Apostille or Embassy seal",
    crossBorderEffect: "Zero Indian stamp duty needed at the signing stage",
  },
  {
    feature: "Bank Account Claim",
    surinameLaw: "Central Bank of Suriname (CBvS) banking rules",
    indianLaw: "Section 372 Succession Certificate or probate grant",
    crossBorderEffect: "Stops bank freezes and overcomes nominee limits",
  },
  {
    feature: "Repatriation Rights",
    surinameLaw: "Suriname foreign exchange control guidelines",
    indianLaw: "RBI framework permits USD 1M remittance per year",
    crossBorderEffect: "Direct transfer from Indian NRO account to Suriname bank",
  },
];

export default function WillDraftingForNrisInSurinamePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_SURINAME_SCHEMA) }}
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
              Will Drafting for NRIs in Suriname
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
            1. HERO SECTION (Single Strict H1: 41 Chars, Single Strict H2: 61 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Suriname-India Estate Counsel · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 41 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Suriname
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 160,000 people of Indian origin live in Suriname. Many families
                in Paramaribo and Wanica own ancestral land, homes, and bank deposits
                in India. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act 1925
                </strong>
                , Indian land follows Indian law only. Protect your family from Dutch
                court delays, language hurdles, and frozen bank accounts. Write a clear
                Indian Will today. Our High Court lawyers help you at each step.
              </p>

              {/* Primary Dual Conversion CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#C65378] text-white font-semibold text-base hover:bg-[#b04567] transition-all shadow-[0_4px_16px_rgba(198,83,120,0.24)] hover:shadow-[0_6px_20px_rgba(198,83,120,0.32)]"
                >
                  <span>Draft Indian Will Online</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-[#172228]/15 text-[#111827] font-semibold text-base hover:bg-[#FAF7F0] hover:border-[#172228]/30 transition-all shadow-2xs"
                >
                  <span>Consult High Court Lawyer</span>
                </Link>
              </div>

              {/* Trust Value Propositions */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#172228]/10 text-xs sm:text-sm text-[#49585F]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0" />
                  <span>Sarnami Lineage Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0" />
                  <span>Plain Paper Execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0" />
                  <span>FEMA USD 1M Transfer</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single Strict H2 (61 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Suriname-India Succession Risks
              </div>

              {/* Single H2: 61 chars (Strictly <= 70 chars) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Suriname NRI Estate Risks: Cross-Border Land &amp; Lineage Rights
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Dutch Will Recognition Hurdles:</strong> Under Section 5
                    of the Indian Succession Act, Indian land registries reject foreign
                    Dutch Wills without expensive Indian High Court probate petitions.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancestral Land Mutation Delays:</strong> Farmland in UP
                    and Bihar faces adverse possession or mutation freezes if family
                    pedigree trees are not legally established.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominee Caretaker Trap:</strong> In Sarbati Devi,
                    the Supreme Court ruled nominees hold bank deposits only as
                    caretakers. An Indian Will provides undisputed ownership.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Global NRI Estate Planning Rules</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
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
                You protect your farm and flats in India. Court cases in India take
                many years. A clean Will lets your heirs take over without court fights. We help you write a clear Will. Your land stays safe. Your kids get their fair share in peace.
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
                Any Indian or OCI in Suriname who owns a home, farm, shop, or bank account in India. It also helps families with ancestral land in UP or Bihar. You can sign your Will in Paramaribo. Two friends watch you sign. No stamp paper is needed.
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
                We draft your Will on plain paper. You sign it in Suriname with two
                witnesses. We help you update land records in India so your family is safe. Our team guides you at each step. You avoid long court trials and keep your wealth secure.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            RESPONSIVE FEATURE IMAGE WITH EXPLICIT DIMENSIONS
            ========================================================================= */}
        <div className="w-full mb-16 sm:mb-20">
          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-suriname-og.jpg"
              alt="Will Drafting for NRIs in Suriname Dutch Translation and Indian Succession Act Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto object-cover rounded-2xl"
            />
            <figcaption className="mt-3 text-center text-xs text-[#6B7280]">
              AMA Legal Solutions Cross-Border Estate Practice: Indian Will Drafting, Dutch Translation &amp; Lineage Verification for NRIs in Suriname.
            </figcaption>
          </figure>
        </div>

        {/* =========================================================================
            TABLE OF CONTENTS (Anchor Navigation)
            ========================================================================= */}
        <section className="w-full mb-16 p-6 sm:p-8 bg-white rounded-3xl border border-[#172228]/10 shadow-2xs">
          <div className="flex items-center gap-3 mb-4 text-[#C65378]">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
              Table of Contents: Suriname NRI Estate Planning Guide
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm text-[#49585F]">
            <a
              href="#legal-risks-overview"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>1. Cross-Border Succession Risks</span>
            </a>
            <a
              href="#statutory-comparison-table"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>2. Suriname vs Indian Succession Law</span>
            </a>
            <a
              href="#ring-fencing-clause"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>3. Foreign Asset Ring-Fencing Clause</span>
            </a>
            <a
              href="#interactive-suriname-blueprint"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>4. Lineage Verification &amp; Blueprint</span>
            </a>
            <a
              href="#sarnami-ancestral-property"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>5. Sarnami Ancestral Land Claims</span>
            </a>
            <a
              href="#dutch-notary-apostille"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>6. Dutch Translation &amp; Apostille</span>
            </a>
            <a
              href="#fema-repatriation-rules"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>7. FEMA USD 1M Asset Remittance</span>
            </a>
            <a
              href="#succession-certificates-banks"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>8. Section 372 Court Certificates</span>
            </a>
            <a
              href="#step-by-step-protocol"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>9. 4-Step Statutory Will Protocol</span>
            </a>
            <a
              href="#service-pricing-tiers"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>10. Legal Service Packages</span>
            </a>
            <a
              href="#frequently-asked-questions"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>11. Frequently Asked Questions</span>
            </a>
            <a
              href="#hub-spoke-navigation"
              className="hover:text-[#C65378] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]"></span>
              <span>12. Hub &amp; Spoke NRI Links</span>
            </a>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: DETAILED STATUTORY ANALYSIS
            ========================================================================= */}
        <section id="legal-risks-overview" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Cross-Border Statutory Analysis
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#111827] tracking-[-0.02em] mb-6">
              Cross-Border Succession Analysis for NRIs in Suriname
            </h3>

            <div className="space-y-4 text-base sm:text-[1.05rem] leading-[1.72] text-[#49585F]">
              <p>
                Many families in Suriname trace their roots to India. Their forebears arrived between 1873 and 1916. Today, generations of Sarnami families live in Paramaribo and Wanica. Many own land and homes in Uttar Pradesh, Bihar, and Delhi. But their assets in India face legal risks if they use only a Dutch Will. A foreign Will does not work well on Indian soil.
              </p>
              <p>
                Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act 1925
                </strong>
                , Indian land follows Indian law only. A Will made before a notary in Suriname is not accepted by Indian land clerks. An Indian land registry needs an Indian Will. Your heirs cannot update records without it.
              </p>
              <p>
                Without an Indian Will, your heirs must go to court in India. They must translate Dutch papers into English. They must get foreign seals. Then they must file for probate under Section 228. This can take years. Writing a separate Indian Will avoids court delays. Your kids save time and money.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: STATUTORY COMPARISON TABLE (Burgerlijk Wetboek vs ISA 1925)
            ========================================================================= */}
        <section id="statutory-comparison-table" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl mb-6">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Statutory Jurisdiction Comparison
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">
              Suriname Civil Code vs Indian Succession Act 1925
            </h3>
            <p className="text-sm text-[#49585F] leading-relaxed">
              Understand the legal differences between Surinamese civil law and Indian statutory law. Each country has its own rules. Planning your estate early protects your heirs.
            </p>
          </div>

          <div className="w-full overflow-x-auto rounded-2xl border border-[#172228]/10 bg-white shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[#111827]">
                  <th className="py-4 px-4 sm:px-6 font-bold">Succession Parameter</th>
                  <th className="py-4 px-4 sm:px-6 font-bold">Surinamese Civil Law (BW)</th>
                  <th className="py-4 px-4 sm:px-6 font-bold">Indian Succession Act 1925</th>
                  <th className="py-4 px-4 sm:px-6 font-bold">Practical Legal Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172228]/10 text-[#49585F]">
                {SURINAME_COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#111827]">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">{row.surinameLaw}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#111827] font-medium">
                      {row.indianLaw}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#C65378] font-medium">
                      {row.crossBorderEffect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: RING-FENCING CLAUSE BOX
            ========================================================================= */}
        <section id="ring-fencing-clause" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl mb-6">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Cross-Border Testamentary Drafting
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">
              Foreign Asset Ring-Fencing Clause for Indian Wills
            </h3>
            <p className="text-sm text-[#49585F] leading-relaxed">
              Drafting an Indian Will from Paramaribo or Wanica needs clear words. Use this statutory ring-fencing recital. It ensures your Indian Will operates exclusively within Indian borders. It will not revoke any Dutch notarial Will in Suriname. Each Will stays fully valid on its own soil.
            </p>
          </div>

          <div className="relative p-6 sm:p-8 bg-[#172228] text-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-[#E07090] font-bold">
                Standard Territorial Ring-Fencing Recital
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#8FA3AD]">
                <Copy className="w-4 h-4 text-[#D4AF37]" />
                <span>Statutory Precedent Recital</span>
              </div>
            </div>

            <div className="font-mono text-xs sm:text-sm text-[#E2E8F0] leading-relaxed bg-[#0E161B] p-5 rounded-2xl border border-white/10 overflow-x-auto">
              {`"I, [Full Legal Name as per Suriname Passport / OCI Card], residing at [Residential Address, Paramaribo / Wanica, Suriname], hereby declare that this Last Will and Testament shall operate EXCLUSIVELY and SOLELY in respect of all my immovable properties (including ancestral agricultural land, residential flats, commercial shops, and plots) and movable assets (including NRE/NRO bank deposits, Demat portfolios, shares, mutual funds, and fixed deposits) situated within the Republic of India.`}
              <br /><br />
              {`I expressly clarify that this Will shall NOT revoke, alter, or impact any testamentary instrument, notarial deed, or Will previously or subsequently executed by me before a Civil-Law Notary in the Republic of Suriname or the Kingdom of the Netherlands in respect of my assets located outside the territory of India."`}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#8FA3AD]">
              <span>
                Statutory Authority: Indian Succession Act, 1925 (Sections 5 &amp; 62)
              </span>
              <Link
                href="/start"
                className="text-[#D4AF37] hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>Incorporate into Your Will</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: MANDATORY ON-PAGE ASSET (Suriname Hindustani Lineage Blueprint)
            ========================================================================= */}
        <section id="interactive-suriname-blueprint" className="w-full mb-16 sm:mb-20">
          <NriSurinameWillInteractive />
        </section>

        {/* =========================================================================
            SECTION 5: SARNAMI HINDUSTANI ANCESTRAL LAND CLAIMS IN UP & BIHAR
            ========================================================================= */}
        <section id="sarnami-ancestral-property" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Ancestral Land &amp; Lineage Verification
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-4">
              Sarnami Hindustani Lineage &amp; Ancestral Land Verification
            </h3>

            <div className="space-y-4 text-base sm:text-[1.02rem] leading-relaxed text-[#49585F]">
              <p>
                From 1873 to 1916, Indian workers sailed to Suriname on ships like the Lalla Rookh. Most came from eastern Uttar Pradesh and western Bihar. Today, their families in Paramaribo and Wanica hold ancestral claims in India. We help you find old village land records. You can protect family plots and city flats from land grabbers. A clear Indian Will keeps your title safe.
              </p>
              <p>
                To claim your ancestral land in India, you must show two main proofs:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                <li>
                  <strong className="text-[#111827]">
                    Family Tree Proof (Vanshavali):
                  </strong>{" "}
                  You show descent from your grandfather or great-grandfather. You use migration records and Suriname civil registry papers. This proves your lineage in Indian civil courts. It gives clear proof of your rights.
                </li>
                <li>
                  <strong className="text-[#111827]">
                    Land Mutation in Revenue Records (Dakhil Kharij):
                  </strong>{" "}
                  You match historic land records with State portals like UP Bhulekh or Bihar Bhumi. This puts your name on official Khatauni land papers. The local Tehsil updates your land title.
                </li>
              </ul>
              <p>
                Without an Indian Will, distant relatives in India may try to sell your land. They may claim you lost your rights. A valid Indian Will protects your family property. It stops long civil court battles.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: DUTCH DOCUMENT TRANSLATION & HAGUE APOSTILLE
            ========================================================================= */}
        <section id="dutch-notary-apostille" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Cross-Border Document Authentication
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-4">
              Dutch Document Translation &amp; Hague Apostille Legalization
            </h3>

            <div className="space-y-4 text-base sm:text-[1.02rem] leading-relaxed text-[#49585F]">
              <p>
                Suriname uses the Dutch language for legal papers. But courts and land offices in India work in English or Hindi. This creates two big steps for foreign papers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-5 bg-white rounded-2xl border border-[#172228]/10 shadow-2xs">
                  <div className="font-bold text-[#111827] text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
                    <span>Hague Apostille Convention</span>
                  </div>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    Suriname joined the 1961 Hague Apostille Treaty. Birth records, death papers, and family trees need an Apostille sticker from Suriname authorities. This validates the papers for Indian authorities.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#172228]/10 shadow-2xs">
                  <div className="font-bold text-[#111827] text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
                    <span>Certified English Translation</span>
                  </div>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    All Dutch papers must be translated into English by an approved court translator. The translated papers are then sworn before a notary. This makes them legal in Indian courts.
                  </p>
                </div>
              </div>
              <p>
                Writing an English-language Will in India saves your family from these costly translation steps. Your heirs can settle land records much faster. They avoid months of paperwork.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: FEMA REGULATIONS ON INHERITED PROPERTY & BANK ACCOUNTS
            ========================================================================= */}
        <section id="fema-repatriation-rules" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Foreign Exchange Management Act
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-4">
              FEMA Regulations on Inherited Indian Real Estate &amp; Funds
            </h3>

            <div className="space-y-4 text-base sm:text-[1.02rem] leading-relaxed text-[#49585F]">
              <p>
                Under India Foreign Exchange Management rules, OCI cardholders in Suriname have clear legal rights when inheriting property:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                <li>
                  <strong className="text-[#111827]">Inheritance of Farm Land:</strong>{" "}
                  Foreign citizens cannot buy new farm land in India. But you can legally inherit ancestral farm plots from an Indian resident. Your family keeps full legal rights.
                </li>
                <li>
                  <strong className="text-[#111827]">Sending Money Abroad:</strong>{" "}
                  Under RBI rules, heirs can send up to USD 1 Million per financial year from their Indian NRO bank account to Suriname. The money transfers directly to your bank.
                </li>
                <li>
                  <strong className="text-[#111827]">Tax Clearance Papers:</strong>{" "}
                  You must file Form 15CA and Form 15CB with the Indian tax office. A Chartered Accountant verifies that all taxes are paid. This ensures smooth bank clearance.
                </li>
              </ul>
              <p>
                You can calculate your tax dues and remittance limits using our online tools:
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#172228]/15 text-xs font-bold text-[#111827] hover:text-[#C65378] transition-colors"
                >
                  <Calculator className="w-4 h-4 text-[#5F7E75]" />
                  <span>Capital Gains Tax Calculator</span>
                </Link>
                <Link
                  href="/tools/nri-property-sale-tds-repatriation-calculator"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#172228]/15 text-xs font-bold text-[#111827] hover:text-[#C65378] transition-colors"
                >
                  <Calculator className="w-4 h-4 text-[#5F7E75]" />
                  <span>NRI Property Sale TDS &amp; Repatriation Calculator</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: SUCCESSION CERTIFICATES FOR BANK DEPOSITS
            ========================================================================= */}
        <section id="succession-certificates-banks" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Indian Succession Act ss. 370-388
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-4">
              Section 372 Succession Certificates for Bank Deposits
            </h3>

            <div className="space-y-4 text-base sm:text-[1.02rem] leading-relaxed text-[#49585F]">
              <p>
                When an NRI in Suriname passes away without an Indian Will, Indian banks freeze their bank accounts. This includes NRE, NRO, and fixed deposit accounts in banks like SBI, PNB, or Bank of Baroda. The funds remain locked.
              </p>
              <p>
                Many people think naming a bank nominee is enough. But the Supreme Court ruled in the Sarbati Devi case that a nominee is only a caretaker. A nominee does not become the owner. Heirs must get a Succession Certificate from an Indian civil court under Section 372. This court case can take months or years.
              </p>
              <p>
                Drafting an Indian Will names your chosen heirs clearly. It lets your heirs claim the money quickly without family fights or long court trials. Your savings reach your family safely.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: 4-STEP STATUTORY PROTOCOL
            ========================================================================= */}
        <section id="step-by-step-protocol" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl mb-8">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Standard Operating Procedure
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">
              4-Step Statutory Protocol: Drafting an Indian Will
            </h3>
            <p className="text-sm text-[#49585F] leading-relaxed">
              Our High Court advocates help families residing in Suriname. We follow a strict legal path. Your Indian Will is verified and ready for signing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-[#172228]/10 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#C65378]/10 text-[#C65378] font-bold text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h4 className="font-bold text-[#111827] text-base mb-2">
                Cross-Border Asset Mapping &amp; Schedule Drafting
              </h4>
              <p className="text-xs sm:text-sm text-[#55636D] leading-relaxed">
                We list all your land and flats in India. We check your Khasra and Khatauni plot survey records. We also record your Indian bank accounts and share folios in clear lists. This gives your family full proof.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#172228]/10 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#5F7E75]/10 text-[#5F7E75] font-bold text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h4 className="font-bold text-[#111827] text-base mb-2">
                Jurisdictional Ring-Fencing &amp; Plain Paper Drafting
              </h4>
              <p className="text-xs sm:text-sm text-[#55636D] leading-relaxed">
                Our lawyers draft your Will on plain paper. We add clear terms to ring-fence your assets in India. Your Dutch Will in Suriname stays untouched. Each Will works on its own soil.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#172228]/10 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 text-[#996D12] font-bold text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h4 className="font-bold text-[#111827] text-base mb-2">
                Witness Attestation in Paramaribo or Wanica
              </h4>
              <p className="text-xs sm:text-sm text-[#55636D] leading-relaxed">
                You print the draft on plain A4 paper in Suriname. You sign the paper before two adult friends who are not heirs in the Will. You do not need Indian stamp paper.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#172228]/10 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#C65378]/10 text-[#C65378] font-bold text-sm flex items-center justify-center mb-4">
                04
              </div>
              <h4 className="font-bold text-[#111827] text-base mb-2">
                Consular Attestation &amp; Digital Safe Custody
              </h4>
              <p className="text-xs sm:text-sm text-[#55636D] leading-relaxed">
                You can get your Will attested at the Indian Embassy in Paramaribo. Or you can store the paper in a home safe. We keep a secure digital copy ready for your heirs.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: KEY RESIDENTIAL HUBS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl mb-6">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Demographic Reach
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">
              Key Residential Hubs: Paramaribo, Wanica &amp; Nickerie
            </h3>
            <p className="text-sm text-[#49585F] leading-relaxed">
              Our legal services support Indian families across Suriname. We handle estates in all districts. We protect your family wealth in India:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-[#172228]/10 shadow-2xs">
              <h4 className="font-bold text-[#111827] text-sm mb-1">
                Paramaribo Metropolitan Area
              </h4>
              <p className="text-xs text-[#55636D] leading-relaxed">
                Many Indian families live and work in Paramaribo. They own homes, shops, and bank deposits in India. We help them write clear Indian Wills. Your assets in India stay safe.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#172228]/10 shadow-2xs">
              <h4 className="font-bold text-[#111827] text-sm mb-1">
                Wanica District
              </h4>
              <p className="text-xs text-[#55636D] leading-relaxed">
                Many families in Wanica trace their roots to farming villages in UP and Bihar. We check their village land records. We help them pass farm land to their children in peace.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#172228]/10 shadow-2xs">
              <h4 className="font-bold text-[#111827] text-sm mb-1">
                Nickerie &amp; Commewijne
              </h4>
              <p className="text-xs text-[#55636D] leading-relaxed">
                Families in Nickerie run trade and farm businesses. They send money to Indian banks and own plots in India. We protect their Indian savings with strong legal deeds.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: TRANSPARENT PRICING & SERVICE PACKAGES
            ========================================================================= */}
        <section id="service-pricing-tiers" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl mb-8">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Transparent Legal Packages
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">
              Legal Services &amp; Transparent Cross-Border Fee Plans
            </h3>
            <p className="text-sm text-[#49585F] leading-relaxed">
              We offer clear advocacy with zero hidden fees. You get fixed rates. Select the plan that fits your Indian assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plan 1 */}
            <div className="p-6 bg-white rounded-3xl border border-[#172228]/10 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#55636D] font-bold">
                  Essential Plan
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-[#111827] my-3">
                  ₹14,990
                </div>
                <h4 className="font-bold text-[#111827] text-sm mb-2">
                  Standalone Indian NRI Will
                </h4>
                <p className="text-xs text-[#55636D] leading-relaxed mb-4">
                  Custom English Will under Section 63. You get clear instructions. You sign on plain A4 paper with two friends.
                </p>
                <ul className="space-y-2 text-xs text-[#49585F] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Plain A4 paper signing instructions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Urban flat &amp; bank schedules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Territorial ring-fencing recital</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/start"
                className="w-full py-2.5 px-4 text-center rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-xs font-bold text-[#111827] hover:bg-[#C65378] hover:text-white transition-colors"
              >
                Choose Essential Plan
              </Link>
            </div>

            {/* Plan 2 */}
            <div className="p-6 bg-white rounded-3xl border-2 border-[#C65378] shadow-lg flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-[#C65378] text-white text-[0.65rem] font-bold tracking-widest uppercase rounded-full">
                Most Popular
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C65378] font-bold">
                  Comprehensive Plan
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-[#111827] my-3">
                  ₹24,990
                </div>
                <h4 className="font-bold text-[#111827] text-sm mb-2">
                  Dual-Will &amp; Apostille Advisory
                </h4>
                <p className="text-xs text-[#55636D] leading-relaxed mb-4">
                  Full estate plan for cross-border families. Keeps your Dutch assets separate from Indian assets. Includes foreign seal advice.
                </p>
                <ul className="space-y-2 text-xs text-[#49585F] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Everything in Essential Plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Dutch Will harmonisation clause</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Indian Embassy Paramaribo protocol</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>FEMA USD 1M remittance review</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/start"
                className="w-full py-2.5 px-4 text-center rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#b04567] transition-colors"
              >
                Choose Comprehensive Plan
              </Link>
            </div>

            {/* Plan 3 */}
            <div className="p-6 bg-white rounded-3xl border border-[#172228]/10 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#55636D] font-bold">
                  Elite Advocate Plan
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-[#111827] my-3">
                  ₹49,990
                </div>
                <h4 className="font-bold text-[#111827] text-sm mb-2">
                  Lineage, Probate &amp; SRO Registration
                </h4>
                <p className="text-xs text-[#55636D] leading-relaxed mb-4">
                  Senior High Court advocates handle your village lineage search. We file Section 372 court papers and update land registry records.
                </p>
                <ul className="space-y-2 text-xs text-[#49585F] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Senior High Court advocate drafting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Tehsil Khasra/Khatauni verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Sub-Registrar SRO registration support</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 px-4 text-center rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-xs font-bold text-[#111827] hover:bg-[#172228] hover:text-white transition-colors"
              >
                Book Advocate Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: FAQS (Single strict H3, min 5 FAQs)
            ========================================================================= */}
        <section id="frequently-asked-questions" className="w-full mb-16 sm:mb-20">
          <div className="max-w-4xl mb-8">
            <div className="text-[#C65378] text-xs font-bold uppercase tracking-wider mb-2">
              Legal Clarity
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">
              Frequently Asked Questions: NRI Wills in Suriname
            </h3>
            <p className="text-sm text-[#49585F] leading-relaxed">
              Statutory answers to common questions about cross-border succession,
              Dutch translations, and Indian asset transmission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NRI_SURINAME_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-[#172228]/10 shadow-2xs"
              >
                <div className="font-bold text-[#111827] text-sm sm:text-base mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#55636D] leading-relaxed pl-7.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: DUAL CONVERSION CTA BANNER
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#172228] text-white shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#E07090] font-bold">
                AMA Legal Solutions · Suriname NRI Desk
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-white my-4 leading-tight">
                Protect Your Indian Legacy: Consult High Court Advocates
              </h3>
              <p className="text-sm sm:text-base text-[#C4D1D9] leading-relaxed mb-8">
                Do not leave your ancestral land and hard-earned Indian savings to
                lengthy legal disputes. Draft a legally verified Indian Will
                designed specifically for Surinamese NRIs and OCI cardholders.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#C65378] text-white font-semibold text-sm hover:bg-[#b04567] transition-colors"
                >
                  <span>Start Online Will Drafting</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/15 transition-colors border border-white/15"
                >
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 14: HUB & SPOKE INTERNAL LINKING MATRIX
            ========================================================================= */}
        <section id="hub-spoke-navigation" className="w-full p-6 sm:p-8 bg-white rounded-3xl border border-[#172228]/10 shadow-2xs">
          <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">
            Related Cross-Border NRI Succession &amp; Probate Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <Link
              href="/services"
              className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#111827] hover:text-[#C65378] transition-colors flex items-center justify-between"
            >
              <span className="font-semibold">All Legal Services</span>
              <ArrowUpRight className="w-4 h-4 text-[#55636D]" />
            </Link>

            <Link
              href="/services/nri-will-india"
              className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#111827] hover:text-[#C65378] transition-colors flex items-center justify-between"
            >
              <span className="font-semibold">NRI Will India Master Hub</span>
              <ArrowUpRight className="w-4 h-4 text-[#55636D]" />
            </Link>

            <Link
              href="/services/nri-inherited-property-sale-repatriation"
              className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#111827] hover:text-[#C65378] transition-colors flex items-center justify-between"
            >
              <span className="font-semibold">NRI Property Sale &amp; Repatriation</span>
              <ArrowUpRight className="w-4 h-4 text-[#55636D]" />
            </Link>

            <Link
              href="/services/probate-lawyer"
              className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#111827] hover:text-[#C65378] transition-colors flex items-center justify-between"
            >
              <span className="font-semibold">Probate &amp; Court Letters of Admin</span>
              <ArrowUpRight className="w-4 h-4 text-[#55636D]" />
            </Link>

            <Link
              href="/services/succession-certificate"
              className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#111827] hover:text-[#C65378] transition-colors flex items-center justify-between"
            >
              <span className="font-semibold">Section 372 Succession Certificate</span>
              <ArrowUpRight className="w-4 h-4 text-[#55636D]" />
            </Link>

            <Link
              href="/services/family-settlement-deed-lawyer"
              className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#111827] hover:text-[#C65378] transition-colors flex items-center justify-between"
            >
              <span className="font-semibold">Family Settlement Deed Lawyer</span>
              <ArrowUpRight className="w-4 h-4 text-[#55636D]" />
            </Link>

            <Link
              href="/sitemap"
              className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#111827] hover:text-[#C65378] transition-colors flex items-center justify-between"
            >
              <span className="font-semibold">HTML Sitemap (All Filter)</span>
              <ArrowUpRight className="w-4 h-4 text-[#55636D]" />
            </Link>

            <Link
              href="/sitemap?category=services"
              className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#111827] hover:text-[#C65378] transition-colors flex items-center justify-between"
            >
              <span className="font-semibold">Services Filter Sitemap</span>
              <ArrowUpRight className="w-4 h-4 text-[#55636D]" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
