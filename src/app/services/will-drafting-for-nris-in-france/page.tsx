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
  Building2,
  Coins,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriFranceWillInteractive from "@/components/NriFranceWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Indian Will Drafting for NRIs in France | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in France. Protect land, flats, NRO accounts & assets under Indian law. Shield against forced heirship with AMA Legal.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in france",
    "nri will drafting services france",
    "indian will for nri in france",
    "make a will for indian property from france",
    "indian inheritance lawyer france",
    "brussels iv article 22 indian law election",
    "reserve hereditaire indian property shield",
    "droits de succession nri property france",
    "french notaire testament vs indian will",
    "paris lyon nri estate planning advocate",
    "indian embassy paris will attestation",
    "ama legal solutions cross border estate practice",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-france",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-france",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-france",
    },
  },
  openGraph: {
    title: "Indian Will Drafting for NRIs in France | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in France. Protect land, flats, NRO accounts & assets under Indian law. Shield against forced heirship with AMA Legal.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-france",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-france-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in France EU Brussels IV and Indian Succession Act Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Will Drafting for NRIs in France | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in France. Protect land, flats, NRO accounts & assets under Indian law. Shield against forced heirship with AMA Legal.",
    images: ["/images/will-drafting-for-nris-in-france-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_FRANCE_FAQS = [
  {
    q: "Does a French Will drafted by a Notaire transfer Indian real estate?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, Indian land and flats follow Indian law only. A French testament executed before a Notaire cannot mutate Indian property records directly. Revenue offices demand an Indian High Court probate or an Indian Will.",
  },
  {
    q: "How does EU Brussels IV Article 22 protect Indian assets from French forced heirship?",
    a: "Article 22 of EU Regulation 650/2012 allows you to elect Indian succession law to govern your estate. By opting for Indian law, you bypass the French mandatory child quota (réserve héréditaire). This gives you complete testamentary freedom over your Indian assets under Section 30 of the Hindu Succession Act or Section 59 of the Indian Succession Act.",
  },
  {
    q: "Can an NRI living in France sign an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act 1925, an Indian Will can be signed on plain A4 paper. You do not need Indian stamp paper. You sign before two adult witnesses who are not beneficiaries under the Will.",
  },
  {
    q: "What happens if a French Will has a worldwide revocation clause?",
    a: "Standard French wills drafted by Notaires often state that all previous testamentary dispositions are revoked. If this clause is not customized, it accidentally cancels your Indian Will. Our advocates draft mutual non-revocation clauses to protect both documents.",
  },
  {
    q: "Does France tax inherited properties located in India?",
    a: "Under Article 750 ter of the French Tax Code (CGI), France taxes worldwide assets if the deceased or heir lived in France for 6 of the last 10 years. Non-direct heirs face French inheritance tax up to 60%. India has no estate duty. Clear ring-fencing ensures proper tax compliance and avoids double taxation.",
  },
  {
    q: "Is attestation at the Indian Embassy in Paris required for an Indian Will?",
    a: "Attestation is optional under Indian law, but recommended. An Indian Will is legally valid when signed before two witnesses. However, consular attestation at the Indian Embassy in Paris or a Hague Apostille from the French Cour d'Appel provides ironclad proof against family challenges in Indian courts.",
  },
  {
    q: "How do NRI heirs in France repatriate sale proceeds from inherited Indian property?",
    a: "Heirs can sell inherited property and repatriate up to $1,000,000 USD per financial year through an NRO account. You need a Lower TDS Certificate under Section 195 (Form 13) and chartered accountant certifications on Forms 15CA and 15CB.",
  },
  {
    q: "What happens to NRE and NRO bank accounts in India if there is no Will?",
    a: "Under the Supreme Court ruling in Sarbati Devi, a bank nominee is only a temporary trustee, not the owner. Without a Will, banks freeze accounts until heirs obtain a court succession certificate, which can take 12 to 24 months.",
  },
];

const NRI_FRANCE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-france#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-france",
      name: "Indian Will Drafting for NRIs in France | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in France. Protect land, flats, NRO accounts & assets under Indian law. Shield against forced heirship with AMA Legal.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-france-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in France EU Brussels IV and Indian Succession Act Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-france#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-france#legalservice",
      name: "AMA Legal Solutions France-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-france",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-france-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate succession counsel for NRIs in France, specializing in EU Brussels IV Article 22 elections, Lex Situs compliance, and French forced heirship protection.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "France" },
        { "@type": "City", name: "Paris" },
        { "@type": "City", name: "Lyon" },
        { "@type": "City", name: "Toulouse" },
        { "@type": "City", name: "Strasbourg" },
        { "@type": "City", name: "Marseille" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-france#service",
      name: "Indian Will Drafting for NRIs in France",
      serviceType:
        "Cross-Border Indian Estate Planning & Brussels IV Law Election for NRIs in France",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-france#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "France" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "France-India NRI Estate Planning & Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in France",
              description:
                "Section 63 compliant Indian Will on plain paper covering Indian flats, NRO bank accounts, and mutual funds with territorial ring-fencing clauses.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "EU Brussels IV & Dual-Will Coordination Package",
              description:
                "Harmonized estate planning with Article 22 Indian law choice, French Notaire coordination, and French forced heirship shield.",
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
                "End-to-end legal representation for multi-state Indian family assets, Indian Embassy Paris attestation protocols, and SRO land registration.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-france#howto",
      name: "How NRIs in France Execute an Indian Will on Plain Paper",
      description:
        "Four-step statutory roadmap for Indian citizens and OCIs in Paris, Lyon, and Toulouse to draft, execute, and verify an Indian Will under Section 63 of the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Cross-Border Estate & Succession Audit",
          text: "Catalogue all assets across France and India. Confirm Indian property papers, municipal survey numbers, and bank folios.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Brussels IV Election",
          text: "Structure an independent Indian Will incorporating an EU Brussels IV Article 22 election of Indian law and territorial ring-fencing clauses.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain Paper Execution Before Two Witnesses",
          text: "Execute the Indian Will on plain A4 paper in France before two adult witnesses who are not beneficiaries under the Will.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Consular Legalization & Indian Custody",
          text: "Optional attestation at the Indian Embassy in Paris or French Cour d'Appel Apostille, and registration with Indian Sub-Registrar records.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-france#faq",
      mainEntity: NRI_FRANCE_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-france#breadcrumb",
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
          name: "Will Drafting for NRIs in France",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-france",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    frenchLaw: "Code Civil (Arts. 912-930) & EU Reg 650/2012",
    indianLaw: "Indian Succession Act, 1925 (ISA s. 5 & 63)",
    resolution: "Brussels IV Art. 22 Indian Law Choice overrides French rules",
  },
  {
    feature: "Mandatory Child Share",
    frenchLaw: "Réserve Héréditaire (up to 75% reserved for children)",
    indianLaw: "Zero mandatory reserve (100% testamentary freedom)",
    resolution: "Separate Indian Will ring-fences Indian land & flats",
  },
  {
    feature: "Indian Real Estate Reach",
    frenchLaw: "French Notaire lacks jurisdiction over Indian land",
    indianLaw: "Lex Situs: Indian courts and revenue acts govern",
    resolution: "Indian Will registers directly with local Sub-Registrars",
  },
  {
    feature: "Inheritance Tax Rates",
    frenchLaw: "Droits de succession from 5% up to 60% for non-direct heirs",
    indianLaw: "Zero Estate Duty (Abolished in India since 1985)",
    resolution: "Territorial separation avoids double tax friction",
  },
  {
    feature: "Execution Formality",
    frenchLaw: "Testament Authentique (Notaire) or Testament Olographe",
    indianLaw: "Plain A4 paper signed before two adult witnesses (s. 63)",
    resolution: "No Indian stamp paper needed for valid signing in France",
  },
  {
    feature: "Indian Bank Account Transmission",
    frenchLaw: "French actes de notoriété rejected by Indian banks",
    indianLaw: "Indian Will enables fast NRE/NRO and Demat transmission",
    resolution: "Sarbati Devi compliant bequests prevent account lockouts",
  },
  {
    feature: "Apostille & Legalization",
    frenchLaw: "Cour d'Appel Apostille under Hague Convention 1961",
    indianLaw: "Indian Embassy Paris attestation or Apostille recognized",
    resolution: "Both routes accepted by High Courts and Sub-Registrars",
  },
];

export default function WillDraftingNrisInFrancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_FRANCE_SCHEMA) }}
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
              Will Drafting for NRIs in France
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
            1. HERO SECTION (Single Strict H1: 39 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · France-India Succession Practice
                </span>
              </div>

              {/* Single H1: 39 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in France
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Indians and OCIs living in Paris, Lyon, Toulouse, or
                Strasbourg face tricky succession rules. French law fixes
                forced shares for kids and taxes worldwide assets up to
                60%. Under{" "}
                <strong className="text-[#111827]">
                  EU Brussels IV Article 22
                </strong>
                , you can choose Indian law. Our High Court lawyers draft
                clear Indian Wills. This shields your flats, plots, NRO
                bank accounts, and family assets in India.
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
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all text-center"
                >
                  <span>Draft Online Indian Will</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Brussels IV Art. 22</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Indian Estate Tax</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Plain Paper Signing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 61 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why French Wills Risk Indian Properties
              </div>
              {/* Single H2 on page: 61 chars (Strictly <= 70 chars, unique, no em-dashes) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                France NRI Estate Pitfalls: Forced Heirship &amp; Dual Succession
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>French Réserve Héréditaire Trap:</strong> French law reserves up to 75% of your estate for your children. Without an Article 22 choice, relatives can challenge your gifts of Indian land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation by Notaires:</strong> French wills from Notaires often cancel all past wills across the globe. This can cancel your Indian Will by mistake.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Heavy French Inheritance Tax:</strong> France taxes worldwide inheritances up to 60% when left to siblings, nephews, or friends.
                  </span>
                </li>
              </ul>
              <a
                href="#comparison-table"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Compare French Law vs Indian Succession Act</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriFranceWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Cross-Border Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Guide: Code Civil vs Indian Will
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an independent Indian Will combined with an EU Brussels IV
              election secures your Indian properties, eliminates forced heirship
              conflicts, and prevents 60% French inheritance tax traps:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-france-og.jpg"
              alt="Will Drafting for NRIs in France EU Brussels IV and Indian Succession Act Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Harmonizing French Civil Code rules
                with Section 5 and Section 63 of the Indian Succession Act 1925.
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
        <section id="comparison-table" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              France Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to segregate your estate creates cross-border deadlock.
              Compare how succession, property titles, and taxes operate under
              French and Indian statutes:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      French Law (Code Civil)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Indian Succession Act 1925
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      AMA Legal Cross-Border Shield
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
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.frenchLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.resolution}
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
              <span>Step-by-Step Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Roadmap: Drafting an Indian Will from France
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers streamline cross-border estate planning for
              NRIs in France through this four-step legal procedure:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Cross-Border Asset Audit",
                desc: "We check title deeds, land records, and bank funds in India while checking your French tax status.",
              },
              {
                step: "02",
                title: "Brussels IV & Custom Drafting",
                desc: "Our lawyers draft an Indian Will choosing Indian law under Article 22 and protecting your French Will.",
              },
              {
                step: "03",
                title: "Plain Paper Execution in France",
                desc: "You sign the Will on plain paper in France before two adult witnesses. You do not need Indian stamp paper.",
              },
              {
                step: "04",
                title: "Embassy Attestation & Safe Custody",
                desc: "We help with optional Indian Embassy attestation in Paris, French Apostille, and land record updates.",
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
              Essential Separate Indian Will Clause Box
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              To protect your Indian assets from French forced heirship and
              prevent accidental revocation of your French testament, your Indian
              Will must include this territorial ring-fencing and choice-of-law
              clause:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7">
              <CopyableNriPropertyClauseBox
                title="Foreign Asset Ring-Fencing & EU Brussels IV Election Clause"
                code={`"1. TERRITORIAL JURISDICTION & EXCLUSIVITY:
I hereby declare that this Last Will and Testament applies strictly, exclusively, and solely to my movable and immovable assets situated in the Republic of India. This Will shall not extend to, affect, or govern any assets, bank accounts, or real properties owned by me in the Republic of France or any other country outside India.

2. EU BRUSSELS IV ARTICLE 22 CHOICE OF LAW:
Pursuant to Article 22 of Regulation (EU) No 650/2012 of the European Parliament and of the Council (Brussels IV), being an Indian national / person possessing close connection with India, I hereby explicitly choose and elect the laws of the Republic of India (including the Indian Succession Act, 1925 and my personal succession law) to govern the succession of my entire estate situated in India in its entirety, to the total exclusion of the forced heirship provisions (réserve héréditaire) of the French Civil Code (Code Civil).

3. NON-REVOCATION OF OVERSEAS TESTAMENTS:
I expressly declare that this Indian Will shall NOT revoke, alter, or supersede any Will, testament, or disposition executed by me before a French Notaire or under the laws of France governing my assets situated outside the Republic of India."`}
                explanation="This clause establishes independent territorial jurisdiction under Section 5 of the Indian Succession Act, 1925, and invokes Article 22 of EU Regulation 650/2012 to protect your Indian estate from French forced heirship rules."
              />
            </div>

            {/* Demarcation Checklist */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between my-8">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Indian Property Demarcation Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Sub-Registrars and Indian banks require exact particulars to
                  admit an NRI Will without dispute:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Municipal &amp; Survey Numbers:</strong> Exact plot
                      numbers, survey boundaries, and municipal tax IDs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Housing Society Shares:</strong> Cooperative
                      housing society share certificate numbers and floor unit
                      numbers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>NRE/NRO Bank Accounts:</strong> Bank branch names,
                      IFSC codes, and specific beneficiary percentages.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>India-Resident Executors:</strong> Appointment of
                      reliable local executors to handle mutation without
                      travel delays.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom France-India Will Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Links to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Capital Gains on Inherited Property
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate your capital gains tax liability before selling
                    inherited real estate in India under Section 49(1) of the
                    Income Tax Act.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Launch Capital Gains Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate NRI Property Sale TDS &amp; Repatriation
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate Section 195 TDS deductions, Form 13 Lower TDS
                    benefits, and the $1M USD RBI remittance quota.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Launch TDS Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. SPECIALIZED SECTION: FRANCE-INDIA ESTATE PLANNING GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Brussels IV Election &amp; Réserve Héréditaire Shield</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                France-India Cross-Border Estate Protection
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                French civil law limits how you give away your wealth. If you
                pass away in France without a plan, French Notaires may split
                your Indian flats and bank funds under forced heir rules.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                You can stop this with a separate Indian Will. Under EU
                Brussels IV Article 22, you can choose Indian law. This ensures
                your Indian land and savings pass to the exact heirs you pick
                under Indian law. Our High Court lawyers draft clean dual wills
                that protect your family in both nations.
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
                <span>Draft Online Indian Will Now</span>
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
              <span>Cross-Border Legal FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRIs in France
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_FRANCE_FAQS.map((item, idx) => (
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
                Related NRI Succession &amp; Repatriation Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border legal guides and interactive
                services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Master Will India Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Inherited Property Sale Repatriation</span>
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
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Site Directory (All Pages)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Legal Services Directory</span>
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
              This cross-border legal guide is published under the Indian
              Succession Act 1925, the French Civil Code (Code Civil Arts.
              912-930), Regulation (EU) No 650/2012 (Brussels IV), and the Foreign
              Exchange Management Act (FEMA). Judicial authorities cited include
              Sarbati Devi v. Usha Devi (AIR 1984 SC 346). This publication provides
              legal education and does not substitute formal attorney-client
              consultation.
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
