import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Landmark,
  Globe2,
  HelpCircle,
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriNetherlandsWillInteractive from "@/components/NriNetherlandsWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Netherlands | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Netherlands. Protect properties, NRE/NRO accounts & investments under the Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in netherlands",
    "nri will drafting services netherlands",
    "indian will for nri in netherlands",
    "make a will for indian property from netherlands",
    "indian inheritance lawyer netherlands",
    "dutch civil code legitieme portie indian property",
    "eu regulation 650 2012 brussels iv indian succession",
    "amsterdam eindhoven rotterdam the hague nri will",
    "surinamese hindustani oci indian land inheritance",
    "dutch rechtbank apostille indian will execution",
    "fema regulation 3 1 b oci agricultural land inheritance",
    "ama legal solutions cross border estate planning netherlands",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Netherlands | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Netherlands. Protect properties, NRE/NRO accounts & investments under the Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-netherlands-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Netherlands Indian Succession Act and Dutch Law Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Netherlands | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Netherlands. Protect properties, NRE/NRO accounts & investments under the Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-netherlands-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_NETHERLANDS_FAQS = [
  {
    q: "Does a Dutch notarial Will govern land and flats located in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, land and flats follow the Lex Situs rule. This means Indian law governs all Indian land. A Dutch will made before a notary in Amsterdam or The Hague does not transfer Indian land directly. It must go through court in the Netherlands first. Then it needs probate in an Indian High Court. That takes years. A separate Indian Will lets your heirs take title directly through local land offices.",
  },
  {
    q: "How does the Dutch Civil Code forced share (legitieme portie) affect Indian assets?",
    a: "Book 4 of the Dutch Civil Code (BW 4:63) gives children a money claim called legitieme portie. But Indian real estate follows Indian law. Under Section 30 of the Hindu Succession Act 1956, you have full freedom to give self-acquired land to anyone you choose. A separate Indian Will keeps your Indian assets safe from Dutch forced share claims.",
  },
  {
    q: "How does EU Regulation 650/2012 (Brussels IV) protect my Indian estate?",
    a: "Under Article 21 of Brussels IV, Dutch succession law applies by default to residents in the Netherlands. But Article 22 lets Indian citizens choose Indian law to govern their estate. Our lawyers add clear choice of law terms to your Indian Will. This stops Dutch courts from trying to split your Indian land under European rules.",
  },
  {
    q: "How do I prevent my Dutch notarial Will from revoking my Indian Will?",
    a: "Standard Dutch wills use broad words that cancel all past wills across the globe. To stop accidental cancellation, both papers must have clear clauses. Your Dutch will must govern assets in the Netherlands. Your Indian Will must govern only Indian land, bank accounts, and shares.",
  },
  {
    q: "Can Dutch citizens of Indian origin (Surinamese-Hindustani and OCIs) inherit farm land in India?",
    a: "Yes. Under FEMA Regulation 3(1)(b), OCIs can legally inherit farm plots, plantation lands, and houses from an Indian relative. Foreign citizens cannot buy new farm land in India directly. But inheriting through a valid Indian Will is 100% legal. A clear Will lets heirs update name records quickly before the local Tehsildar.",
  },
  {
    q: "How do I get my Indian Will apostilled or attested in the Netherlands?",
    a: "Both the Netherlands and India follow the Hague Apostille Convention 1961. You can sign your Indian Will on plain A4 paper before two adult witnesses in Amsterdam, Eindhoven, or Rotterdam. You can then get an apostille sticker from your local Dutch District Court (Rechtbank). You can also book a slot at the Embassy of India in The Hague. Indian courts accept both.",
  },
  {
    q: "Is Indian stamp paper required when signing an Indian Will in the Netherlands?",
    a: "No. Under the Indian Stamp Act 1899, a Will needs zero stamp duty. You can print your Indian Will on plain paper in the Netherlands. The paper becomes legal once you sign it before two adult witnesses who are not named as heirs.",
  },
  {
    q: "How can heirs in the Netherlands repatriate property sale proceeds in Euros?",
    a: "Under RBI FEMA rules, heirs can send up to 1 Million US Dollars abroad each financial year through an NRO bank account. Our lawyers help heirs get a Section 197 lower tax certificate (Form 13) and CA certificates (Form 15CA and Form 15CB) for smooth Euro wire transfers to Dutch banks.",
  },
];

const NRI_NETHERLANDS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands",
      name: "Will Drafting for NRIs in Netherlands | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Netherlands. Protect properties, NRE/NRO accounts & investments under the Indian Succession Act with AMA Legal Solutions.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-netherlands-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Netherlands Indian Succession Act and Dutch Law Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands#legalservice",
      name: "AMA Legal Solutions Netherlands-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-netherlands-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate succession counsel for NRIs and OCIs in the Netherlands, specializing in Lex Situs protection, EU Brussels IV election, Dutch Rechtbank apostille, and FEMA repatriation.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Netherlands" },
        { "@type": "City", name: "Amsterdam" },
        { "@type": "City", name: "Eindhoven" },
        { "@type": "City", name: "Rotterdam" },
        { "@type": "City", name: "The Hague" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands#service",
      name: "Will Drafting for NRIs in Netherlands",
      serviceType:
        "Cross-Border Indian Estate Planning & Testamentary Succession for NRIs in Netherlands",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Netherlands" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Netherlands NRI Estate Planning & Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Netherlands",
              description:
                "Section 63 compliant Indian Will on plain paper covering Indian flats, NRO bank accounts, and demat holdings with territorial ring-fencing clauses.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "EU Brussels IV & OCI Ancestral Land Succession Package",
              description:
                "Dual-jurisdiction estate planning with Article 22 professio juris recitals, Dutch legitieme portie ring-fencing, and Tehsil mutation mapping.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Cross-Border Counsel & Rechtbank Apostille Protocol",
              description:
                "End-to-end legal counsel for multi-property estates, Dutch Rechtbank apostille guidance, Embassy The Hague attestation, and Sub-Registrar support.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands#howto",
      name: "How NRIs in Netherlands Execute an Indian Will on Plain Paper",
      description:
        "Four-step statutory roadmap for Indian citizens and OCIs in Amsterdam, Eindhoven, and Rotterdam to draft, execute, and legalize an Indian Will under Section 63 of the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Mapping & Ring-Fencing Structure",
          text: "List all Indian assets including flats, ancestral agricultural land, NRO bank balances, and mutual funds while separating Dutch properties.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Brussels IV Election",
          text: "Our High Court advocates draft your Indian Will with Section 5 Lex Situs clauses, Section 30 Hindu Succession Act recitals, and EU Regulation 650/2012 Article 22 election terms.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain Paper Execution Before Two Witnesses",
          text: "Print the Will on plain A4 paper in the Netherlands and sign every page before two independent adult witnesses who are not beneficiaries.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Dutch Rechtbank Apostille or Embassy Legalization",
          text: "Obtain a Hague Apostille sticker from your local Dutch District Court (Rechtbank) or schedule consular attestation at the Embassy of India in The Hague.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands#faq",
      mainEntity: NRI_NETHERLANDS_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands#breadcrumb",
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
          name: "Will Drafting for NRIs in Netherlands",
          item: "https://www.willdrafting.in/services/will-drafting-for-nris-in-netherlands",
        },
      ],
    },
  ],
};

const NETHERLANDS_SUCCESSION_COMPARISON = [
  {
    parameter: "Governing Law for Indian Land",
    dutchLaw: "Burgerlijk Wetboek Book 4 & EU Reg 650/2012",
    indianLaw: "Indian Succession Act 1925 s. 5 (Lex Situs)",
    crossBorderImpact: "Indian law strictly controls all land, apartments, and farm plots located in India.",
  },
  {
    parameter: "Forced Share vs Will Freedom",
    dutchLaw: "BW 4:63 fixes legitieme portie monetary claim for children",
    indianLaw: "100% testamentary freedom for self-acquired assets (s. 30 HSA)",
    crossBorderImpact: "A separate Indian Will insulates Indian assets from Dutch forced heirship claims.",
  },
  {
    parameter: "EU Choice of Law (Brussels IV)",
    dutchLaw: "Habitual residence applies unless nationality law is chosen",
    indianLaw: "Section 5 Lex Situs applies to Indian immovable land",
    crossBorderImpact: "Article 22 Brussels IV election aligns Dutch notarial wills with Indian Wills.",
  },
  {
    parameter: "Signing & Execution Formalities",
    dutchLaw: "Dutch civil law notary deed registered in CTR register",
    indianLaw: "Plain A4 paper signed before 2 adult witnesses (s. 63 ISA)",
    crossBorderImpact: "Execute on plain paper in Amsterdam or Eindhoven with zero Indian stamp duty.",
  },
  {
    parameter: "Apostille & Legalization",
    dutchLaw: "Dutch District Court (Rechtbank) Hague Apostille",
    indianLaw: "Embassy of India The Hague attestation or Hague Apostille",
    crossBorderImpact: "Apostilled Indian Wills are valid across all Indian state courts and land registries.",
  },
  {
    parameter: "Surinamese & OCI Farm Land",
    dutchLaw: "No Dutch restrictions on foreign land ownership",
    indianLaw: "FEMA Reg 3(1)(b) permits inheritance of agricultural land",
    crossBorderImpact: "OCIs in the Netherlands can legally inherit Indian farm parcels through a valid Will.",
  },
  {
    parameter: "Probate & Municipal Mutation",
    dutchLaw: "Dutch Verklaring van erfrecht (Certificate of Inheritance)",
    indianLaw: "Direct Tehsildar mutation or Indian High Court Probate (s. 228)",
    crossBorderImpact: "A separate Indian Will avoids multi-year foreign court resealing procedures.",
  },
  {
    parameter: "Tax & Repatriation to Netherlands",
    dutchLaw: "Dutch erfbelasting (10% to 20%) & Successiewet 1956",
    indianLaw: "FEMA USD 1M annual transfer rule & s. 197 Form 13 TDS",
    crossBorderImpact: "Lower TDS certificates allow seamless Euro wire transfers to Dutch bank accounts.",
  },
];

export default function NriNetherlandsWillDraftingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_NETHERLANDS_SCHEMA) }}
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
              Will Drafting for NRIs in Netherlands
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
            1. HERO SECTION (Single Strict H1: 37 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Netherlands-India Cross-Border Succession Counsel
                </span>
              </div>

              {/* Single H1: 37 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Netherlands
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                The Netherlands has over 228,000 people of Indian heritage. This
                includes tech workers in Amsterdam and Eindhoven, as well as
                Surinamese-Hindustani families in Rotterdam and The Hague. Many own
                ancestral plots, farm land, flats, and bank funds across India.
                Under Section 5 of the{" "}
                <strong className="text-[#111827]">Indian Succession Act 1925</strong>,
                Indian land and flats follow Indian law only. Dutch wills cannot
                transfer Indian land smoothly to your children. Our High Court
                lawyers draft clear Indian Wills. These protect your properties
                from Dutch forced share rules, align with EU rules, and give your
                family peace of mind.
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
                  href="#netherlands-vs-india-table"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Dutch vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Rechtbank Apostille Ready</span>
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

            {/* Right Summary Box with SINGLE STRICT H2 (41 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Legal Conflict
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Dutch Civil Code vs Indian Succession Law
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Dutch Legitieme Portie Forced Share:</strong> Book 4
                    of the Dutch Civil Code gives children a fixed money claim that
                    cannot be cut out in a Dutch will. A separate Indian Will
                    protects your Indian assets under Section 30 of the Hindu
                    Succession Act.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>EU Brussels IV Choice of Law:</strong> Under EU
                    rules, Dutch law applies by default if you live in the
                    Netherlands. We draft clear clauses choosing Indian succession
                    law for your Indian land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Avoid Mutual Revocation:</strong> Standard Dutch
                    wills revoke past wills across the globe. Our lawyers add
                    clear wording so your Dutch and Indian wills work side by side.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Dutch Rechtbank Court Apostille:</strong> You do not
                    need to fly to India. We help you sign on plain paper in the
                    Netherlands and get an apostille sticker from your local Dutch
                    court.
                  </span>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#172228]/10 flex items-center justify-between">
                <span className="text-xs text-[#55636D]">
                  Need quick intake for Indian assets?
                </span>
                <Link
                  href="/start"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C65378] hover:text-[#a13c5d]"
                >
                  <span>Start Online Intake</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE SCENARIO SELECTOR COMPONENT
            ========================================================================= */}
        <NriNetherlandsWillInteractive />

        {/* =========================================================================
            3. FULL HD VISUAL ON-PAGE ASSET
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2.5">
              <Globe2 className="w-4 h-4" />
              <span>Cross-Border Legal Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Netherlands-India Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates safeguards your
              immovable real estate, aligns with EU Regulation 650/2012, and enables
              swift revenue mutation across Indian states:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-netherlands.jpg"
              alt="Will Drafting for NRIs in Netherlands Indian Succession Act and Dutch Law Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting for
                NRIs and OCIs in the Netherlands under EU Brussels IV and the Indian
                Succession Act 1925.
              </span>
              <span>
                Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
              </span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. RESPONSIVE HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="netherlands-vs-india-table" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Comparative Statutory Analysis</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[#111827] mb-4">
              Dutch Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[15px] sm:text-base leading-[1.68] text-[#49585F]">
              Comparing estate distribution rules between the Dutch Civil Code
              (Burgerlijk Wetboek Book 4) and Indian statutory laws helps families
              prevent expensive probate litigation and protect their ancestral wealth:
            </p>
          </div>

          <div className="w-full overflow-x-auto rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#172228]/10 bg-[#FAF7F0] text-[#111827]">
                  <th className="py-4 px-4 sm:px-6 font-semibold w-1/4">
                    Succession Parameter
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold w-1/4">
                    Dutch Law (Burgerlijk Wetboek &amp; EU)
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold w-1/4">
                    Indian Law (ISA 1925 &amp; HSA 1956)
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold w-1/4">
                    Cross-Border Solution
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172228]/5 text-[#374151]">
                {NETHERLANDS_SUCCESSION_COMPARISON.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#FAF7F0]/60 transition-colors"
                  >
                    <td className="py-4 px-4 sm:px-6 font-medium text-[#111827]">
                      {row.parameter}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#49585F] leading-relaxed">
                      {row.dutchLaw}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#047857] font-medium leading-relaxed">
                      {row.indianLaw}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#172228] font-semibold leading-relaxed">
                      {row.crossBorderImpact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            5. COPY-PASTEABLE SEPARATE INDIAN WILL CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2.5">
              <FileCheck className="w-4 h-4" />
              <span>Standard Statutory Precedent</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[#111827] mb-3">
              Copy-Pasteable Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[15px] sm:text-base leading-[1.68] text-[#49585F]">
              To prevent your Indian Will from clashing with your Dutch notarial
              testament, use this proven territorial ring-fencing clause in your
              Indian testamentary document:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Territorial Ring-Fencing & EU Brussels IV Choice-of-Law Clause"
            code={`"1. DECLARATION OF EXCLUSIVE TERRITORIAL JURISDICTION (LEX SITUS):
I hereby declare that this Last Will and Testament applies exclusively and solely to all my immovable properties (including agricultural land, farm plots, residential apartments, commercial buildings, and undivided coparcenary interests) and movable assets (including NRE, NRO, and FCNR bank accounts, shares, mutual funds, and fixed deposits) situated strictly within the territorial boundaries of the Republic of India.

2. NON-REVOCATION OF OVERSEAS AND DUTCH TESTAMENTS:
I expressly declare that this Will shall NOT revoke, modify, supersede, or impair any notarial will, public deed, or testamentary disposition executed by me in the Netherlands or elsewhere outside India concerning assets situated outside India. Both testaments shall operate independently and concurrently in their respective territorial jurisdictions.

3. ELECTION OF INDIAN LAW UNDER EU REGULATION 650/2012 (ARTICLE 22):
Pursuant to Article 22 of Regulation (EU) No 650/2012 of the European Parliament and of the Council (Brussels IV), I, being a citizen of India, hereby expressly choose the succession laws of the Republic of India to govern the succession of all my assets situated in India as a whole. Under Section 5 of the Indian Succession Act, 1925, succession to my immovable property shall be governed exclusively by the lex situs of India, to the exclusion of any statutory forced share (legitieme portie) under Book 4 of the Dutch Civil Code (Burgerlijk Wetboek)."`}
            explanation="Drafted under Section 5 and Section 63 of the Indian Succession Act 1925, Section 30 of the Hindu Succession Act 1956, and Article 22 of EU Regulation 650/2012. Prevents mutual cancellation between Dutch notarial wills and Indian wills while protecting Indian land from Dutch forced heirship claims."
          />
        </section>

        {/* =========================================================================
            6. DEEP-DIVE EDITORIAL SECTIONS (All H3 to prevent multiple H2s)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 space-y-12 sm:space-y-16">
          {/* Subsection 1 */}
          <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4">
              1. The Lex Situs Doctrine &amp; Section 5 of the Indian Succession Act
            </h3>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F] mb-4">
              International law follows the rule of <em>Lex Situs</em>. This
              means the law of the land where the property sits controls that
              property. In India, Section 5 of the Indian Succession Act 1925 sets
              this rule into stone. Succession to Indian land and homes follows
              Indian law alone. It does not matter where you live or what passport
              you carry.
            </p>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F]">
              If you make a Dutch will in Amsterdam, Indian land offices cannot
              accept it right away. A Dutch will must go to court in the
              Netherlands first. Then it needs probate in an Indian High Court
              under Section 228 of the Act. This process takes 2 to 4 years. It
              also costs lakhs in court fees. A separate Indian Will removes this
              court delay. Your family can update land records with the local
              Tehsildar in a few weeks.
            </p>
          </div>

          {/* Subsection 2 */}
          <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4">
              2. Overcoming Dutch Legitieme Portie with Section 30 HSA
            </h3>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F] mb-4">
              Book 4 of the Dutch Civil Code gives children a fixed right called
              the <em>legitieme portie</em>. Under Article 4:63, children can claim
              half of their intestate cash share. Even if you want to leave your
              Indian assets to one child, Dutch law allows other children to ask
              for cash compensation from your total wealth.
            </p>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F]">
              Indian law gives you complete freedom. Under Section 30 of the
              Hindu Succession Act 1956, you can give your self-acquired land and
              flats to anyone you choose. No child can claim a forced share in your
              own property under Indian law. By writing a separate Indian Will, you
              keep your Indian flats, plots, and savings safe from Dutch forced
              share claims.
            </p>
          </div>

          {/* Subsection 3 */}
          <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4">
              3. EU Regulation 650/2012: The Brussels IV Professio Juris Advantage
            </h3>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F] mb-4">
              The Netherlands follows EU Regulation 650/2012, known as Brussels
              IV. Under Article 21, the default rule says the law of the place where
              you live governs your estate. If you live in Eindhoven or Rotterdam,
              this rule could drag your Indian land into Dutch court rules.
            </p>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F]">
              Article 22 gives you an easy way out. It lets you choose the law
              of your home country to govern your estate. When drafting your Indian
              Will, our High Court lawyers include formal choice of law clauses.
              This guarantees that Dutch courts and notaries respect Indian law
              for your Indian property.
            </p>
          </div>

          {/* Subsection 4 */}
          <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4">
              4. Dutch Rechtbank Court Apostille &amp; Embassy The Hague Protocol
            </h3>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F] mb-4">
              Many NRIs in the Netherlands ask how to sign an Indian Will without
              flying to India. Under Section 63 of the Indian Succession Act 1925,
              a Will does not need stamp paper or court visits. You can print it on
              plain A4 paper and sign it before two adult witnesses.
            </p>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F] mb-4">
              To make your Dutch-signed Will fully bulletproof before Indian land
              clerks and courts, you have two clear options:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                <h4 className="font-semibold text-sm text-[#111827] mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#C65378]" />
                  <span>Pathway A: Dutch Rechtbank Apostille</span>
                </h4>
                <p className="text-xs text-[#49585F] leading-relaxed">
                  Both India and the Netherlands belong to the Hague Apostille
                  Convention. You sign your Will before a local Dutch notary. Then
                  get an apostille sticker from your local District Court
                  (Rechtbank) in Amsterdam, Rotterdam, or The Hague. Indian courts
                  accept this directly.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                <h4 className="font-semibold text-sm text-[#111827] mb-2 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>Pathway B: Embassy of India, The Hague</span>
                </h4>
                <p className="text-xs text-[#49585F] leading-relaxed">
                  You can book an attestation visit at the Embassy of India in
                  The Hague (Buitenrustweg 2). Sign the Will before the consular
                  officer with your Indian passport. This seal gives the paper
                  undisputed legal weight under Section 85 of the Indian Evidence
                  Act.
                </p>
              </div>
            </div>
          </div>

          {/* Subsection 5: Surinamese-Hindustani Diaspora & OCI Land Rights */}
          <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4">
              5. Surinamese-Hindustani Diaspora &amp; OCI Farm Land Inheritance
            </h3>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F] mb-4">
              The Netherlands has about 178,000 Dutch citizens of Indian descent
              from Suriname. Many of these families, along with tech workers who
              hold OCI cards, have ancestral property in Uttar Pradesh, Bihar,
              Punjab, and Gujarat.
            </p>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F]">
              Under FEMA rules, an OCI cardholder cannot buy new farm land in
              India. But the law allows an OCI to inherit farm plots, village
              houses, and plantation lands from family. To update land records
              (Khatauni) with the local Tehsildar, a clearly drafted Indian Will is
              essential proof of ownership.
            </p>
          </div>

          {/* Subsection 6: Dutch Erfbelasting & Repatriation Tools */}
          <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4">
              6. Managing Dutch Erfbelasting &amp; FEMA Capital Repatriation
            </h3>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F] mb-4">
              Anyone living in the Netherlands must follow Dutch inheritance tax
              rules (<em>erfbelasting</em>). Rates run from 10% to 20% for spouses
              and children, and up to 40% for others. When heirs in the Netherlands
              inherit land or flats in India, cross-border tax planning protects
              your estate.
            </p>
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#49585F] mb-6">
              When selling inherited property, heirs can send up to 1 Million US
              Dollars each year from their NRO account to Dutch banks (ABN AMRO,
              ING, Rabobank). However, buyers in India may hold back 20% plus cess
              as tax under Section 195. Our lawyers help heirs get a lower tax
              certificate (Form 13) to save money.
            </p>

            {/* Mid-Article Tool Integration Card */}
            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-1">
                  Interactive Tax &amp; Repatriation Diagnostic Tools
                </div>
                <h4 className="text-base font-semibold text-[#111827] mb-1">
                  Calculate Your Indian Capital Gains &amp; Lower TDS Exemption
                </h4>
                <p className="text-xs sm:text-sm text-[#49585F]">
                  Estimate your capital gains tax on inherited Indian property and
                  learn how to reduce Section 195 withholding tax using Form 13:
                </p>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#172228] hover:bg-[#C65378] px-4 py-2.5 rounded-full transition-colors"
                >
                  <span>Capital Gains Calculator</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/tools/nri-property-sale-tds-repatriation-calculator"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-white hover:border-[#C65378] hover:text-[#C65378] px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors"
                >
                  <span>Repatriation TDS Tool</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. DUAL CONVERSION CTA SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="rounded-[32px] bg-gradient-to-br from-[#172228] via-[#1E2F38] to-[#0D1B22] text-white p-8 sm:p-12 lg:p-16 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65378]/20 border border-[#C65378]/30 text-[#E07090] text-xs font-bold tracking-wider uppercase mb-5">
                <ShieldCheck className="w-4 h-4" />
                <span>Pan-India High Court Legal Counsel</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-5 leading-tight">
                Protect Your Indian Heritage from Amsterdam, Eindhoven, or The Hague
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                Do not allow European forced heirship rules or uncoordinated wills
                to jeopardize your Indian properties. Work directly with AMA Legal
                Solutions High Court advocates to draft an ironclad, Lex
                Situs-compliant Indian Will on plain paper.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-sm sm:text-base font-semibold px-8 py-4 shadow-sm transition-all text-center"
                >
                  <span>Schedule Advocate Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-semibold px-8 py-4 border border-white/15 transition-all text-center"
                >
                  <span>Start Online Will Intake (/start)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FREQUENTLY ASKED QUESTIONS SECTION
            ========================================================================= */}
        <section id="faqs" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2.5">
              <HelpCircle className="w-4 h-4" />
              <span>Statutory FAQs</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[#111827] mb-3">
              Frequently Asked Questions: Netherlands NRI Wills
            </h3>
            <p className="text-[15px] sm:text-base leading-[1.68] text-[#49585F]">
              Authoritative answers by High Court advocates on cross-border
              succession, Dutch Rechtbank apostilles, and Indian estate laws:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {NRI_NETHERLANDS_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#172228]/10 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
              >
                <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-3 leading-snug">
                  {item.q}
                </h4>
                <p className="text-[14px] sm:text-[14.5px] leading-[1.68] text-[#49585F]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Contextual Internal Links Bar (Hub-and-Spoke Matrix & Sitemap Filters) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Cross-Border Succession Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI property services, probate counsel, and legal directory:
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
                <span>Inherited Property Sale &amp; Repatriation</span>
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
                <span>WillDrafting Directory (All Filter)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Directory Filter</span>
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
            <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed max-w-2xl">
              Authored by <strong>Advocate Anuj Anand Malik</strong> (Bar Council of
              Delhi). Reviewed for cross-border compliance with the Indian
              Succession Act 1925, Hindu Succession Act 1956, Dutch Civil Code
              (Burgerlijk Wetboek Book 4), and EU Regulation 650/2012 by the AMA Legal
              Solutions Private Client Group.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] hover:text-[#C65378] px-4 py-2 rounded-full border border-[#172228]/15 hover:border-[#C65378] transition-colors"
            >
              <span>Speak to Editorial Counsel</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <CTA />
      <Footer />
    </div>
  );
}
