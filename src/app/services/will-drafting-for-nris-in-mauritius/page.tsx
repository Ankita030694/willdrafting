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
import NriMauritiusWillInteractive from "@/components/NriMauritiusWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Mauritius | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Mauritius. Protect ancestral land, flats & NRE accounts under Indian Succession Act. DTAA & FEMA compliant.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in mauritius",
    "nri will drafting services mauritius",
    "indian will for nri in mauritius",
    "make a will for indian property from mauritius",
    "indian inheritance lawyer mauritius",
    "code civil mauricien forced heirship reserve hereditaire indian property",
    "india mauritius dtaa capital gains tax inheritance",
    "pmo port louis apostille indian will attestation",
    "ebene cybercity nri oci indian land inheritance",
    "section 30 hindu succession act mauritius nri will",
    "fema regulation 3 1 b oci agricultural land inheritance",
    "ama legal solutions cross border estate planning mauritius",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Mauritius | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Mauritius. Protect ancestral land, flats & NRE accounts under Indian Succession Act. DTAA & FEMA compliant.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-mauritius-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Mauritius and Indian Succession Legal Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Mauritius | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Mauritius. Protect ancestral land, flats & NRE accounts under Indian Succession Act. DTAA & FEMA compliant.",
    images: ["/images/will-drafting-for-nris-in-mauritius-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_MAURITIUS_FAQS = [
  {
    q: "Does my Mauritian Will cover my ancestral land and flats in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, land and flats follow the Lex Situs rule. This means the domestic law of India governs Indian real estate. Mauritian wills must go through court in Mauritius first. They then need a second court grant in an Indian High Court. This takes years. Making a separate Indian Will lets your heirs take title directly through local land offices.",
  },
  {
    q: "How does the Code Civil Mauricien forced heirship rule affect my Indian property?",
    a: "Articles 913 to 930 of the Code Civil Mauricien fix a set estate share for children. But Indian land follows Indian law. Under Section 30 of the Hindu Succession Act 1956, you have full freedom to give self-acquired land to anyone. A separate Indian Will shields Indian assets from foreign forced heirship claims.",
  },
  {
    q: "How do I stop my Mauritian Will from cancelling my Indian Will?",
    a: "Standard Mauritian notarial wills have wording that cancels all past wills worldwide. To stop accidental cancellation, both wills must have clear non-revocation terms. Your Mauritian Will must govern assets outside India. Your Indian Will must govern only Indian land, bank accounts, and shares.",
  },
  {
    q: "Can Mauritian citizens of Indian origin with OCI inherit farm land in India?",
    a: "Yes. Under FEMA Regulation 3(1)(b), OCIs can legally inherit farm land, farmhouses, and plots from Indian parents. Foreign citizens cannot buy farm land in India directly. But inheriting through a Will is safe by law. A signed Indian Will ensures smooth name change before the local Tehsildar.",
  },
  {
    q: "Do I need to visit the High Commission in Ebène or can I use PMO Apostille?",
    a: "Both Mauritius and India follow the Hague Apostille Convention 1961. You can sign your Indian Will before two adult witnesses in Mauritius. Then get an Apostille seal from the Prime Minister's Office in Port Louis. Or you can book an appointment for attestation at the High Commission of India in Ebène. Indian courts accept both.",
  },
  {
    q: "Is Indian stamp paper needed when drafting an Indian Will in Mauritius?",
    a: "No. Under the Indian Stamp Act 1899, a Will needs zero stamp duty. You can print your Indian Will on plain A4 paper in Port Louis, Ebène, Curepipe, or Grand Baie. It becomes fully legal once you sign it before two adult witnesses who are not named as heirs.",
  },
  {
    q: "How can Indo-Mauritian heirs send sale money abroad under the DTAA?",
    a: "Under RBI FEMA rules, heirs can send up to 1 Million US Dollars abroad each financial year through an NRO bank account. Sale of Indian real estate requires tax clearance in India. Our advocates help heirs obtain a Section 197 lower tax certificate (Form 13) and CA certificates (Form 15CA and Form 15CB) for fast bank transfers.",
  },
  {
    q: "Can an NRI in Mauritius name a family member living in Port Louis as executor?",
    a: "Yes. Indian law allows non-resident executors. But managing Indian property from Mauritius requires tax filings and land office visits. We advise naming an Indian resident co-executor or giving a Power of Attorney to a local advocate for smooth work.",
  },
];

const NRI_MAURITIUS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius",
      name: "Will Drafting for NRIs in Mauritius | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Mauritius. Protect ancestral land, flats & NRE accounts under Indian Succession Act. DTAA & FEMA compliant.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-mauritius-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Mauritius and Indian Succession Legal Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius#legalservice",
      name: "AMA Legal Solutions Mauritius-India Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-mauritius-og.jpg",
      description:
        "Cross-border Indian testamentary succession, Mauritius-India estate harmonization, Code Civil forced heirship ring-fencing, PMO Port Louis Apostille counsel, and FEMA asset repatriation.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Mauritius" },
        { "@type": "AdministrativeArea", name: "Port Louis" },
        { "@type": "AdministrativeArea", name: "Ebène Cybercity" },
        { "@type": "AdministrativeArea", name: "Curepipe" },
        { "@type": "AdministrativeArea", name: "Grand Baie" },
        { "@type": "AdministrativeArea", name: "Delhi NCR" },
        { "@type": "AdministrativeArea", name: "Mumbai" },
        { "@type": "AdministrativeArea", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius#service",
      name: "Indian Will Drafting & Cross-Border Succession for NRIs in Mauritius",
      serviceType:
        "Cross-Border Indian Will Drafting, Mauritius Dual-Will Harmonization & Ancestral Property Mutation",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Mauritius" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Mauritius Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard NRI Indian Will Drafting & Plain-Paper Protocol",
              description:
                "Comprehensive Section 63 compliant Indian Will covering flats, land, NRE/NRO accounts, and Demat portfolios with Mauritius asset ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "PMO Port Louis Apostille & Consular Attestation Package",
              description:
                "High Court advocate vetting with Prime Minister's Office Port Louis Hague Apostille roadmap, notary guidelines, and Indian safe custody registration.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Mauritius Dual-Will Harmonization & Forced Heirship Carve-Out Counsel",
              description:
                "End-to-end alignment of Code Civil Mauricien forced heirship rules with Section 30 Hindu Succession Act testamentary freedom, revenue mutation, and FEMA USD 1M remittance counsel.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius#howto",
      name: "How NRIs in Mauritius Execute an Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and ring-fence an Indian Will from Mauritius under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Jurisdictional Asset Mapping & Title Audit",
          text: "Identify personal self-acquired properties, ancestral coparcenary shares, and bank accounts in India, separating them from Mauritian corporate entities.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Lex Situs Ring-Fencing",
          text: "Structure an independent Indian Will declaring Lex Situs governance under Section 5 ISA 1925 and inserting reciprocal non-revocation clauses.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Attestation before Two Witnesses",
          text: "Print the Will on standard A4 paper in Mauritius and sign in the concurrent presence of two independent adult witnesses who are not beneficiaries.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "PMO Port Louis Apostille or High Commission Attestation",
          text: "Obtain a Hague Apostille from the Prime Minister's Office in Port Louis or consular seal from the High Commission of India in Ebène.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius#faq",
      mainEntity: NRI_MAURITIUS_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius#breadcrumb",
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
          name: "Will Drafting for NRIs in Mauritius",
          item: "https://www.willdrafting.in/services/will-drafting-for-nris-in-mauritius",
        },
      ],
    },
  ],
};

const MAURITIUS_SUCCESSION_COMPARISON = [
  {
    parameter: "Governing Law",
    mauritiusLaw: "Code Civil Mauricien (Articles 913-930)",
    indianLaw: "Indian Succession Act 1925 & HSA 1956",
    crossBorderImpact: "Indian land strictly follows Indian law under Section 5 ISA 1925.",
  },
  {
    parameter: "Testamentary Freedom",
    mauritiusLaw: "Cut short by forced reserve (1/2 to 3/4 for kids)",
    indianLaw: "100% full freedom for self-made land under Section 30 HSA",
    crossBorderImpact: "An Indian Will gives total freedom without forced heir claims.",
  },
  {
    parameter: "Land and Flats",
    mauritiusLaw: "Ruled by Mauritian Notary and local civil registers",
    indianLaw: "Ruled by Indian Sub-Registrar and local Tehsildar records",
    crossBorderImpact: "Indian land offices reject Mauritian deeds without court orders.",
  },
  {
    parameter: "Cross-Border Court Grants",
    mauritiusLaw: "Probate granted by Supreme Court of Mauritius",
    indianLaw: "Direct probate or mutation using a standalone Indian Will",
    crossBorderImpact: "Foreign probate needs a costly High Court case in India.",
  },
  {
    parameter: "How You Sign",
    mauritiusLaw: "Notarial authentic will or witnessed private text",
    indianLaw: "Plain white A4 paper signed before two adult witnesses",
    crossBorderImpact: "No Indian stamp paper or embassy trip is needed to sign.",
  },
  {
    parameter: "Apostille Seal",
    mauritiusLaw: "Apostille by Prime Minister's Office in Port Louis",
    indianLaw: "Apostilled papers are fully valid in Indian courts",
    crossBorderImpact: "Hague treaty rules cut out slow embassy red tape.",
  },
  {
    parameter: "Capital Gains Tax & Remittance",
    mauritiusLaw: "Mauritius Revenue Authority (MRA) tax rules",
    indianLaw: "Income Tax Act s. 195 & FEMA USD 1M annual transfer rule",
    crossBorderImpact: "The DTAA allows safe wire transfers with a Section 197 tax form.",
  },
];

export default function NriMauritiusWillDraftingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_MAURITIUS_SCHEMA) }}
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
              Will Drafting for NRIs in Mauritius
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
            1. HERO SECTION (Single Strict H1: 35 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Mauritius-India Cross-Border Succession Counsel
                </span>
              </div>

              {/* Single H1: 35 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Mauritius
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Mauritius has over 890,000 people of Indian origin. Many families live
                in Port Louis, Ebène, Curepipe, and Grand Baie. Many own homes, plots,
                farm parcels, and bank funds across India. Under Section 5 of the{" "}
                <strong className="text-[#111827]">Indian Succession Act 1925</strong>,
                land and flats follow Indian law. Mauritian notarial wills cannot easily
                pass Indian land to your heirs. Our High Court advocates draft clean
                Indian Wills. These protect your land from forced heirship, follow the
                India-Mauritius DTAA, and give your family peace of mind.
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
                  href="#mauritius-vs-india-table"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Legal Systems</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Hague Apostille Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Indian Stamp Duty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with SINGLE STRICT H2 (45 Chars decoded) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Legal Trap
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Code Civil Mauricien vs Indian Succession Law
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Forced Share Trap:</strong> Articles 913 to 930 of the
                    Code Civil Mauricien set a strict reserve for children. A single
                    Mauritian will can spark costly court fights over Indian land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation:</strong> Standard wills signed in
                    Port Louis often cancel all past wills. This can wipe out your
                    valid Indian Will by mistake.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Indian Land Office Rejection:</strong> Local land offices
                    in Delhi, Mumbai, Punjab, or Gujarat reject Mauritian court papers
                    without a long Indian High Court probate case.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Pan-India NRI Succession Frameworks</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriMauritiusWillInteractive />

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
              Visual Legal Framework: Mauritius vs Indian Estate Plan
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              See how a separate Indian Will protects your assets, works with the Code
              Civil Mauricien, and safeguards family wealth under the Indian
              Succession Act 1925:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-mauritius-og.jpg"
              alt="Will Drafting for NRIs in Mauritius and Indian Succession Legal Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indo-Mauritian estate planning,
                Code Civil rules, and Hague Apostille steps.
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
        <section id="mauritius-vs-india-table" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Mauritius Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Mauritius follows French civil law for domestic estates. India follows
              common law and statutory succession acts. Here is how both systems treat
              cross-border estates:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Mauritius Law
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Indian Law (ISA 1925)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Cross-Border Solution
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {MAURITIUS_SUCCESSION_COMPARISON.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.mauritiusLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
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
            5. STATUTORY 4-STEP ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Statutory Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Legal 4-Step Roadmap for NRIs in Mauritius
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers manage the entire estate path. Follow these 4
              simple steps to protect your Indian assets while living abroad:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Title Check",
                desc: "We check sale deeds, survey numbers, khata papers, and tax receipts across India so your ownership is fully clear.",
              },
              {
                step: "02",
                title: "Bespoke Will Drafting",
                desc: "Our advocates draft a clean Indian Will. It ring-fences your Indian assets and stops accidental cancellation of foreign wills.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing",
                desc: "Print your Will on plain A4 paper in Mauritius. Sign before two adult witnesses who are not heirs. Zero Indian stamp duty is needed.",
              },
              {
                step: "04",
                title: "PMO Apostille Seal",
                desc: "Get an Apostille seal from the Prime Minister's Office in Port Louis or book attestation at the High Commission in Ebène.",
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
            6. ESSENTIAL LEGAL CLAUSE & DEMARCATION CHECKLIST
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Essential Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without clear wording, a foreign will can cancel an Indian Will. Our
              advocates use this copy-pasteable legal clause to protect your assets:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7">
              <CopyableNriPropertyClauseBox
                title="Territorial Exclusion & Non-Revocation Clause"
                code={`"I declare that this Will applies only to my immovable property (land, flats, and houses) and movable assets (NRE, NRO, FCNR accounts, fixed deposits, shares, and demat accounts) located in India.

This Will shall NOT affect, alter, or cancel any Will, notarial deed, or trust made by me in Mauritius or elsewhere for assets outside India.

I also declare that succession to my land and flats in India shall follow Indian law under Section 5 of the Indian Succession Act 1925 and Section 30 of the Hindu Succession Act 1956, free from foreign forced heirship rules under the Code Civil Mauricien."`}
                explanation="This clause ring-fences your Indian assets, confirms Lex Situs control under Indian law, and keeps your foreign estate out of probate tangles."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#111827] mb-3">
                  Mauritius NRI Execution Checklist
                </h4>
                <p className="text-xs text-[#55636D] mb-4">
                  Indian revenue offices and courts look for these key items:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Full Land Borders:</strong> Exact North, South, East,
                      and West borders, survey numbers, and undivided share.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank &amp; Demat Details:</strong> Clear NRE, NRO, and
                      Demat account numbers with named primary heirs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Sign before two adults who
                      get no share or money under this Will.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>PMO Apostille / HCI Seal:</strong> Get official seals so
                      your Will is accepted fast across India.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom Deed Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Link to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Inherited Property Capital Gains Tax
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Check your capital gains tax under Section 48 of the Indian Income
                    Tax Act before selling ancestral land or flats.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Launch Capital Gains Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate NRI Property Sale TDS &amp; Repatriation
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Check Section 195 TDS tax rates and plan your USD 1M annual bank
                    transfer through NRO bank accounts.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Launch TDS &amp; Repatriation Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. MANDATORY UNIQUE ON-PAGE ASSET: HARMONIZATION GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Scale className="w-4 h-4" />
                <span>Mandatory Legal Guide</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Indo-Mauritian Forced Heirship Harmonization Guide
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Articles 913 to 930 of the{" "}
                <strong className="text-[#111827]">Code Civil Mauricien</strong>, a
                person cannot freely give away all assets if they leave children. The
                law sets a forced share from 50 percent to 75 percent. But under
                Section 5 of the{" "}
                <strong className="text-[#111827]">Indian Succession Act 1925</strong>{" "}
                and Section 30 of the{" "}
                <strong className="text-[#111827]">Hindu Succession Act 1956</strong>,
                land and flats in India follow Indian domestic law (Lex Situs).
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Indian law gives you full freedom over self-acquired land. A separate
                Indian Will removes foreign forced share disputes. It also protects
                farm land rights under FEMA Regulation 3(1)(b). Your family gets clean
                title without years of court delay.
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
                <span>Draft Online Indian Will (/start)</span>
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
              <span>Legal Knowledge Base</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRI Wills in Mauritius
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border succession counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_MAURITIUS_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar (Hub-and-Spoke Matrix) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related NRI Succession &amp; Asset Transmission Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border services, repatriation protocols, and
                probate counsel:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Will India Master Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Property Sale &amp; Repatriation</span>
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
                <span>Online Will Intake (/start)</span>
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
              This cross-border legal guide is prepared under the Indian Succession
              Act 1925, the Hindu Succession Act 1956, the Foreign Exchange
              Management Act (FEMA) 1999, the Indian Stamp Act 1899, the
              India-Mauritius Double Tax Avoidance Agreement (DTAA), and the Hague
              Apostille Convention 1961. This content provides educational
              information and does not replace personal lawyer advice.
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
