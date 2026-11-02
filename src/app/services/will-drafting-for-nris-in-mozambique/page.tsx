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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriMozambiqueWillInteractive from "@/components/NriMozambiqueWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Mozambique | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Mozambique. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in mozambique",
    "nri will drafting services mozambique",
    "indian will for nri in mozambique",
    "make a will for indian property from mozambique",
    "indian inheritance lawyer mozambique",
    "mozambican civil code indian property succession",
    "gujarati merchant community mozambique land mutation",
    "high commission of india maputo will attestation",
    "maputo beira nampula nri inheritance lawyer",
    "nro account inheritance repatriation mozambique",
    "lex situs indian succession act mozambique",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Mozambique | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Mozambique. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-mozambique-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Mozambique Cross-Border Estate Succession",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Mozambique | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Mozambique. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-mozambique-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_MOZAMBIQUE_FAQS = [
  {
    q: "Does the Mozambican Civil Code apply to my assets in India?",
    a: "Under Section 5 of the Indian Succession Act 1925, Indian land follows Indian law. This is the lex situs rule. Indian courts use Indian law for Indian land and flats. They do not follow Mozambican civil law. A separate Indian Will makes sure your Indian assets pass on without foreign court delay.",
  },
  {
    q: "What is forced heirship in Mozambique, and how does it affect my Indian Will?",
    a: "In Mozambique, forced heir rules reserve up to two-thirds of an estate for heirs like a spouse or child. But Indian law gives you full power to give away your self-bought assets and family shares by Will. A separate Indian Will protects your Indian wealth from foreign forced heir claims.",
  },
  {
    q: "Can an NRI or OCI in Mozambique execute an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act 1925, you can sign your Will on plain white A4 paper. You do not need Indian stamp paper while living in Mozambique. You only need two adult witnesses who watch you sign. Your witnesses must not be heirs named in the Will.",
  },
  {
    q: "Do I need attestation from the High Commission of India in Maputo?",
    a: "Two adult witnesses make your Will legally valid under Section 63. But having your Will signed before a Notary and the High Commission of India in Maputo gives strong proof. This stops family disputes in Indian courts. It also speeds up land mutation before municipal offices.",
  },
  {
    q: "Why should NRIs in Mozambique avoid a single worldwide Will?",
    a: "A single worldwide Will made in Mozambique causes big delays. Mozambican Wills are written in Portuguese as notarial deeds. To use such a Will in India, your heirs must get an ancillary probate order under Section 228 of the Indian Succession Act. This takes years in court and needs sworn translations. Two separate Wills let both estates settle fast.",
  },
  {
    q: "How can Gujarati diaspora families protect ancestral property in India?",
    a: "Many Gujarati families in Maputo, Beira, and Nampula own ancestral houses and land in Gujarat, Diu, Daman, and Mumbai. A clear Indian Will records your exact share. It sets out your family tree (Pedhinama). It also gives your executor power to update land records (7/12 extracts) without your travel to India.",
  },
  {
    q: "How are Indian NRE, NRO, and Demat accounts claimed from Mozambique?",
    a: "Bank and share nominees act only as caretakers under the Supreme Court Sarbati Devi ruling. Nominees do not own the money. A clear Indian Will names your true heirs with bank details and Demat IDs. This lets your family claim funds fast without a civil court succession certificate.",
  },
  {
    q: "How can heirs in Mozambique repatriate sale proceeds from inherited Indian property?",
    a: "Under RBI rules, heirs can transfer up to 1 million USD each financial year from an NRO account. Before selling inherited real estate, heirs apply for a Lower TDS Certificate under Section 197 to avoid high tax cuts. Money is sent upon filing Form 15CA and Form 15CB with an Indian CA.",
  },
];

const NRI_MOZAMBIQUE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique",
      name: "Will Drafting for NRIs in Mozambique | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Mozambique. Protect land, flats, NRO accounts & assets in India under Indian Succession Act with AMA Legal Solutions.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-mozambique-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Mozambique Cross-Border Estate Succession Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique#legalservice",
      name: "AMA Legal Solutions NRI Mozambique Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-mozambique-og.jpg",
      description:
        "Pan-India testamentary, probate, and cross-border succession counsel for NRIs, PIOs, and OCIs residing in Mozambique.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Mozambique" },
        { "@type": "City", name: "Maputo" },
        { "@type": "City", name: "Beira" },
        { "@type": "City", name: "Nampula" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique#service",
      name: "Will Drafting for NRIs in Mozambique",
      serviceType:
        "Cross-Border Succession Planning, Indian Will Drafting & Ancestral Property Mutation",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "Mozambique",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mozambique NRI Indian Estate Planning Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Autonomous Indian Will Drafting for NRIs in Mozambique",
              description:
                "Territorial ring-fencing Will drafted under Section 63 of Indian Succession Act 1925 with HCI Maputo consular execution instructions.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive Real Estate & Gujarati Ancestral Pedhinama Will",
              description:
                "Full estate planning including ancestral land mutation schedules, 7/12 extract integration, and executor powers for Gujarat and Maharashtra properties.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Cross-Border Estate & High Court Probate Representation",
              description:
                "End-to-end legal counsel covering consular legalization, SRO registration, NRO bank transmission, and High Court probate proceedings in India.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique#howto",
      name: "How NRIs in Mozambique Execute a Legally Valid Indian Will",
      description:
        "Four-step cross-border legal protocol to draft, ring-fence, and execute an Indian Will from Mozambique under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Indian Asset Discovery & Title Review",
          "text": "Compile registered sale deeds, ancestral 7/12 land records, NRE/NRO bank accounts, and demat client master lists in India.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Territorial Ring-Fencing & Advocate Drafting",
          "text": "Our High Court advocates draft an autonomous Indian Will isolating Indian wealth from Mozambican Civil Code forced heirship provisions.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Plain-Paper Attestation in Mozambique",
          "text": "Execute the Will on plain paper in Mozambique before two adult independent witnesses, with optional notarization and HCI Maputo consular attestation.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Executor Briefing & Mutation Roadmap",
          "text": "Provide your India-based executor with structured guidance for municipal property mutation, bank transmission, and RBI FEMA fund repatriation.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique#faq",
      mainEntity: NRI_MOZAMBIQUE_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique#breadcrumb",
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
          "name": "Will Drafting for NRIs in Mozambique",
          "item":
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-mozambique",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Succession Statute",
    mozambiqueLaw: "Mozambican Civil Code (Código Civil, Arts. 2024+)",
    indianLaw: "Indian Succession Act, 1925 (ss. 5, 59, 63)",
    ringFenced: "Autonomous territorial jurisdiction under lex situs",
  },
  {
    feature: "Forced Heirship (Legítima)",
    mozambiqueLaw: "Mandatory 50% to 66% quota reserved for forced heirs",
    indianLaw: "0% forced heirship; 100% testamentary disposition",
    ringFenced: "Total testamentary freedom over all Indian assets",
  },
  {
    feature: "Language of Instrument",
    mozambiqueLaw: "Portuguese language notarial public deed required",
    indianLaw: "English or recognized Indian regional vernacular",
    ringFenced: "Bypasses sworn translations and Indian High Court delays",
  },
  {
    feature: "Execution & Attestation Rules",
    mozambiqueLaw: "Public deed (Escritura Pública) before Mozambican Notary",
    indianLaw: "Plain white A4 paper signed before two adult witnesses",
    ringFenced: "Valid on plain paper in Mozambique with consular backup",
  },
  {
    feature: "Ancestral & Coparcenary Rights",
    mozambiqueLaw: "Community property regimes; no ancestral HUF concept",
    indianLaw: "Hindu Succession Act s. 6 coparcenary equal birthrights",
    ringFenced: "Precise schedule demarcation isolates ancestral shares",
  },
  {
    feature: "Probate Requirement for Mutation",
    mozambiqueLaw: "Judicial inventory or deed of heirship in Maputo",
    indianLaw: "Direct SRO mutation; probate mandatory only in select cities",
    ringFenced: "Fast administrative revenue mutation across Gujarat & India",
  },
  {
    feature: "Cross-Border Fund Repatriation",
    mozambiqueLaw: "Bank of Mozambique foreign exchange clearances",
    indianLaw: "RBI FEMA Master Direction No. 13 (USD 1M per FY via NRO)",
    ringFenced: "Form 15CA & 15CB direct outward remittance protocol",
  },
];

export default function NriMozambiqueWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_MOZAMBIQUE_SCHEMA) }}
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
              Will Drafting for NRIs in Mozambique
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
            1. HERO SECTION (Single Strict H1: 43 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Civil Code Counsel · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 43 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Mozambique
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 28,000 Indians and OCI families live in Maputo, Beira, and
                Nampula. Under the local Civil Code, strict heir rules apply.
                Without an Indian Will, foreign deeds face huge delays in India.
                You can avoid this. A separate Indian Will protects your flats,
                lands, and bank funds. Our High Court lawyers draft clear Wills.
                Your family avoids long court fights.
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
                  href="#mozambique-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Mozambican vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Civil Code Harmonized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>HCI Maputo Attestation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Gujarati Land Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 61 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Combined Worldwide Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Cross-Border Succession Bottleneck for NRIs in Mozambique
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Civil Code Forced Heir Rules:</strong> Articles 2156
                    to 2167 of the Mozambican Civil Code reserve up to two-thirds
                    of assets for forced heirs. Indian land laws do not follow this rule.
                    Indian courts use local law for land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Court Probate Delays:</strong> Indian land registries
                    reject foreign court papers. Getting Indian court probate takes years.
                    It also needs sworn Portuguese to English translations.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancestral Land Mutation Freezes:</strong> Gujarati
                    families in Maputo and Beira face frozen land records in Saurashtra,
                    Surat, and Mumbai without clear Indian Will papers.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore NRI Master Succession Hub &amp; Legal Rules</span>
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
                You protect your flats and land in India. Court cases in India take
                many years to finish. A clean Will lets your heirs take over peacefully.
                We help you write a clear Will. Your wealth stays safe. Your family
                avoids long court fights.
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
                Any Indian in Mozambique who owns a flat, plot, bank balance, or mutual
                funds in India. It helps business owners, managers, and families. You can
                sign your Will in Mozambique. Two adult friends witness your signature.
                You do not need Indian stamp paper.
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
                We draft your Will under Indian law and Mozambican rules. You sign it
                in Mozambique with two witnesses. We guide you on High Commission
                attestation in Maputo. We also help your family update Indian land
                records. Our lawyers make the entire process simple and safe.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriMozambiqueWillInteractive />

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
              Visual Legal Framework: Mozambique-India Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates safeguards
              your cross-border assets, harmonizes the Mozambican Civil Code
              with the Indian Succession Act, and enables swift asset transmission:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-mozambique.jpg"
              alt="Will Drafting for NRIs in Mozambique Cross-Border Estate Succession"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting
                for NRIs in Mozambique under the Mozambican Civil Code and the Indian Succession Act.
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
        <section id="mozambique-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Mozambique vs Indian Succession Law: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to ring-fence Indian assets exposes your family to Mozambican
              civil court delays, translation costs, and conflicting court jurisdictions.
              Compare how succession operates across both legal frameworks:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Mozambican Law (Código Civil)</th>
                    <th className="py-4 px-6 w-[26%]">Indian Succession Act, 1925</th>
                    <th className="py-4 px-6 w-[26%]">Dual-Will Ring-Fencing</th>
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
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.mozambiqueLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#172228] font-semibold">
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
              <span>Cross-Border Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Legal 4-Step Mozambique NRI Will Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers handle the entire cross-border succession
              lifecycle. Follow this 4-step path to secure your Indian wealth:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Schedule & Title Audit",
                desc: "We review your sale deeds, tax bills, bank accounts, and demat folios in India. We verify every property detail with care.",
              },
              {
                step: "02",
                title: "Civil Code Ring-Fencing",
                desc: "Our lawyers draft your Will with clear territorial clauses. We elect Indian law and protect your Mozambican assets from conflict.",
              },
              {
                step: "03",
                title: "Plain-Paper or Consular Signing",
                desc: "You print the draft on plain paper. You sign before two adult witnesses in Mozambique. We guide you on consular seals.",
              },
              {
                step: "04",
                title: "Executor Briefing & Mutation SOP",
                desc: "We give your executors in India clear steps for land mutation, bank account claims, and RBI fund repatriation.",
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
              Copy-Pasteable Mozambique-India Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without a clear territorial clause, cross-border court orders cause delays.
              Our advocates structure clean clauses to protect and isolate your Indian property:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Territorial Ring-Fencing Recital
                  </span>
                  <span>Autonomous Indian Testament</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I, [Testator Full Legal Name], residing in [City, Province of
                  Mozambique], holding [Indian / Mozambican / Portuguese] Passport No. [Passport Number]
                  [and OCI Card No. [OCI Number]], hereby declare that this Last Will
                  and Testament shall govern exclusively all my immovable and movable
                  properties, agricultural and residential plots, bank accounts, fixed
                  deposits, demat folios, mutual funds, and assets situated in the
                  Republic of India. In accordance with Section 5 and Section 59 of the
                  Indian Succession Act, 1925 (lex situs principle), the succession,
                  administration, and distribution of my Indian estate shall be governed
                  strictly by the laws of India. This Will is executed as an autonomous
                  testamentary instrument and shall not revoke, cancel, or supersede any
                  separate Will executed by me under the Mozambican Civil Code (Código
                  Civil) regarding my assets situated in Mozambique.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: If you hold Mozambican or Portuguese citizenship with an OCI
                  card, our High Court advocates customize this clause to preserve
                  Indian succession autonomy under international private law.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Mozambique-India Execution Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential steps to ensure full validity across Mozambique and India:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Sign in the presence
                      of two witnesses who are not named as heirs in the Will.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>No Indian Stamp Paper:</strong> Execution on plain A4
                      paper is 100% valid under Section 63 of the Indian Succession Act.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Consular Legalization:</strong> Mozambican Notary
                      stamp and High Commission of India Maputo attestation confirm genuine signing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Schedule Demarcation:</strong> List exact survey
                      numbers, flat unit numbers, and bank account IFSC details.
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
          </div>

          {/* Contextual Links to Interactive Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Inherited Property Capital Gains Tax
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate indexation benefits, Section 54 deductions, and
                    capital gains tax liability before selling inherited Indian real estate.
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
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate Section 195 withholding tax, Section 197 lower TDS
                    certificates, and Form 15CA/15CB outward remittance quotas.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate Repatriation TDS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. MANDATORY UNIQUE ON-PAGE ASSET: ANCESTRAL ESTATE SUCCESSION GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Ancestral Property &amp; Diaspora Heritage</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Mozambique-India Ancestral Estate Succession Guide
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Old trade links tie the Indian community in Mozambique to
              ancestral lands across Gujarat, Diu, Daman, and Maharashtra. Learn how to
              secure family assets, handle Pedhinama entries, and protect your title:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-3">
                1. Managing Pedhinama &amp; Revenue Records
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[#49585F] mb-3">
                Gujarati families in Maputo and Beira hold ancestral land in
                Kutch, Jamnagar, Rajkot, Surat, and Valsad. When elders pass away,
                revenue officers ask for a family tree (Pedhinama) to record heirs.
              </p>
              <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[#49585F]">
                Our lawyers draft clear affidavits and check 7/12 land records. A
                clear Indian Will stops distant relatives from grabbing family land.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-3">
                2. OCI Legal Heir Declarations via HCI Maputo
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[#49585F] mb-3">
                Many diaspora members hold Mozambican or Portuguese passports with
                OCI cards. Foreign citizens cannot attend Indian land hearings in person.
              </p>
              <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[#49585F]">
                We prepare Legal Heir Declarations and Special Power of Attorney
                papers for signing at the High Commission of India in Maputo. This
                lets trusted Indian advocates handle land mutation for you.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-3">
                3. Overcoming Foreign Civil Code Rules
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[#49585F] mb-3">
                Mozambique uses the 1966 Civil Code with forced heir rules. These
                rules limit how you pass on your estate.
              </p>
              <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[#49585F]">
                Under Indian law and international rules, succession to land follows
                the law of the place where land sits. Our Indian Will keeps your
                Indian assets safe from foreign civil code claims.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
              <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-3">
                4. Preempting Sibling Partition Suits in Court
              </h4>
              <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[#49585F] mb-3">
                Under Section 6 of the Hindu Succession Act, daughters have equal
                birth rights in ancestral land. Leaving out any heir can lead to a
                court partition suit.
              </p>
              <p className="text-xs sm:text-[13.5px] leading-[1.7] text-[#49585F]">
                Our lawyers review deeds, mark out exact shares, and guide on owelty
                cash splits. This keeps your Will safe from long court challenges.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. CROSS-BORDER TAXATION & REPATRIATION SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Taxation &amp; FEMA Repatriation Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Cross-Border Taxation &amp; Fund Repatriation
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Neither India nor Mozambique levies estate duty or inheritance tax. You
                inherit Indian assets tax-free. But selling real estate later brings
                capital gains tax. Indian buyers must deduct withholding tax under Section 195.
                Our legal team helps you get a Lower TDS Certificate under Section 197.
                This saves you from high tax cuts upfront.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under RBI rules, heirs can transfer up to 1 million USD each financial
                year to Mozambique. You use an NRO bank account with Form 15CA and Form
                15CB. Our advocates assist in completing all tax filings and bank
                compliance seamlessly.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult Cross-Border Lawyer</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Indian Will Online</span>
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
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRIs in Mozambique
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border advocates at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_MOZAMBIQUE_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar (Hub-and-Spoke Matrix & Sitemap Filters) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Cross-Border Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI legal services, statutory guides, and the
                complete directory index:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>All Legal Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Master Succession Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
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
              This cross-border legal guide is prepared under the Indian
              Succession Act, 1925, the Mozambican Civil Code (Código Civil),
              the Foreign Exchange Management Act (FEMA), 1999, and consular
              attestation procedures. Judicial authorities referenced include
              lex situs under Section 5/59, the Supreme Court ruling in
              Sarbati Devi, and coparcenary protections in Vineeta Sharma.
              This content provides legal education and does not replace
              personalized advocate counsel.
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
