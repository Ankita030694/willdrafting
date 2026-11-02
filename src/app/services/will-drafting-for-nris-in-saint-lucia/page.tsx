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
import NriSaintLuciaWillInteractive from "@/components/NriSaintLuciaWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Saint Lucia | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Saint Lucia. Protect ancestral lands, flats, NRE/NRO accounts & investments under the Indian Succession Act 1925.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in saint lucia",
    "nri will drafting services saint lucia",
    "indian will for nri in saint lucia",
    "make a will for indian property from saint lucia",
    "indian inheritance lawyer saint lucia",
    "saint lucia civil code indian succession act",
    "castries apostille indian will attestation",
    "gros islet nri oci indian land inheritance",
    "cbi saint lucia passport indian demat shares",
    "indo saint lucian ancestral property claim india",
    "section 5 indian succession act saint lucia nri",
    "fema non debt rules oci agricultural land inheritance",
    "ama legal solutions cross border estate planning saint lucia",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Saint Lucia | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Saint Lucia. Protect ancestral lands, flats, NRE/NRO accounts & investments under the Indian Succession Act 1925.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-saint-lucia-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Saint Lucia Civil Code Harmonization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Saint Lucia | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Saint Lucia. Protect ancestral lands, flats, NRE/NRO accounts & investments under the Indian Succession Act 1925.",
    images: ["/images/will-drafting-for-nris-in-saint-lucia-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_SAINT_LUCIA_FAQS = [
  {
    q: "Does a Will made in Saint Lucia cover my properties and land in India?",
    a: "Under Section 5 of the Indian Succession Act 1925, land and flats in India follow the Lex Situs rule. Foreign court orders cannot directly transfer Indian land. A Saint Lucian will requires slow ancillary probate in Indian High Courts under Section 228. Making a separate Indian Will lets your heirs take title quickly through local land offices.",
  },
  {
    q: "Can a Saint Lucian citizen with OCI status inherit farm land in India?",
    a: "Yes. Under FEMA rules and Section 7A of the Citizenship Act 1955, OCI cardholders can legally inherit farm land, residential plots, and homes from Indian ancestors. Foreign citizens cannot buy new farm land in India. But inheriting land through a valid Indian Will is fully legal and stops disputes before the local Tehsildar.",
  },
  {
    q: "How can NRIs and OCIs in Saint Lucia sign a legal Indian Will?",
    a: "You can sign a valid Indian Will on plain A4 paper in Castries, Gros Islet, or Vieux Fort. You do not need Indian stamp paper. Under Section 63 of the Indian Succession Act, sign the Will before two adult witnesses who are not named as heirs. Following Saint Lucia's accession to the Hague Apostille Convention, an apostille seal in Castries gives full legal standing.",
  },
  {
    q: "Can my Saint Lucia Civil Code Will accidentally revoke my Indian Will?",
    a: "Yes. Standard wills drafted under the Civil Code of Saint Lucia contain general revocation clauses that cancel all prior testaments worldwide. This can accidentally wipe out your Indian Will. We draft matched dual wills. Each Will has clear territorial terms. Your Saint Lucian will governs Caribbean assets, while your Indian Will governs Indian assets.",
  },
  {
    q: "How can Indo-Saint Lucian families claim ancestral land in India?",
    a: "Many families in Castries and Vieux Fort trace roots to Indian arrivals on the Palmyra in 1859. You can prove family roots using family tree affidavits (Pedhinama), municipal birth certificates, and village land records. Our High Court advocates help locate ancestral village registers (Khatauni and Khasra) to establish legal title.",
  },
  {
    q: "How do bank nominees and Demat shares get passed on to heirs?",
    a: "Bank and depository nominees act only as temporary trustees under the Supreme Court Sarbati Devi ruling. Nominees do not own the money. A clear Indian Will names your true heirs. This lets your family claim bank balances, mutual funds, and demat shares without a civil court succession certificate.",
  },
  {
    q: "Does Saint Lucia or India levy inheritance tax on inherited estates?",
    a: "Neither country levies inheritance tax. India abolished estate duty in 1985. You inherit Indian assets free of inheritance tax. But selling real estate later brings capital gains tax. Under Indian tax law, heirs can claim indexation and tax exemptions under Section 54.",
  },
  {
    q: "How can heirs in Saint Lucia send property sale money abroad from India?",
    a: "Under RBI FEMA rules, foreign heirs can transfer up to 1 Million US Dollars per financial year via an NRO bank account. Our advocates help you obtain a Section 197 Lower TDS Certificate (Form 13) and CA certificates (Form 15CA and Form 15CB). This avoids high 20% withholding tax cuts upfront.",
  },
];

const NRI_SAINT_LUCIA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia",
      name: "Will Drafting for NRIs in Saint Lucia | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Saint Lucia. Protect ancestral lands, flats, NRE/NRO accounts & investments under the Indian Succession Act 1925.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-saint-lucia-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Saint Lucia Civil Code Harmonization",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia#legalservice",
      name: "AMA Legal Solutions Saint Lucia-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-saint-lucia-og.jpg",
      description:
        "Cross-border Indian Will drafting, Saint Lucia Civil Code succession harmonization, Castries apostille advisory, and asset transmission counsel for NRIs in Saint Lucia.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Saint Lucia" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Castries" },
        { "@type": "City", name: "Gros Islet" },
        { "@type": "City", name: "Vieux Fort" },
        { "@type": "City", name: "Rodney Bay" },
        { "@type": "City", name: "Soufrière" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia#service",
      name: "Indian Will Drafting Services for NRIs in Saint Lucia",
      serviceType:
        "Cross-Border Succession, Saint Lucia Civil Code Harmonization & Indian Estate Planning",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Saint Lucia" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Saint Lucia Will Drafting & Succession Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Saint Lucia",
              description:
                "Complete Indian Will drafting with clear territorial clauses, plain-paper signing steps, and municipal land transfer help.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual-Will Saint Lucia-India Ring-Fenced Architecture",
              description:
                "Coordinated cross-border estate planning keeping Saint Lucian assets separate from Indian land, preventing court clashes and double probate delays.",
            },
          },
          {
            "@type": "Offer",
            price: "64990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Advocate Cross-Border Estate & Execution Counsel",
              description:
                "Full legal support including Castries apostille guidance, Indian embassy attestation advice, and High Court probate representation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia#howto",
      name: "How NRIs in Saint Lucia Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory path to draft, ring-fence, and execute an ironclad Indian Will while living in Saint Lucia under the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule & Title Verification",
          text: "List all Indian properties, demat folios, mutual funds, and bank accounts with exact registered deed details, municipal tax IDs, and bank IFSC numbers.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Civil Code Choice & Ring-Fencing Drafting",
          text: "High Court lawyers draft an Indian Will with clear territorial clauses under Section 59 of the Indian Succession Act, keeping Saint Lucian assets separate.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper or Apostille Signing in Saint Lucia",
          text: "Print the draft on plain paper. Sign before two adult witnesses in Saint Lucia, with optional Castries High Court apostille certificate.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & India Executor Briefing",
          text: "Send signed original copies to your chosen executors in India. Store digital backups. Prepare clear steps for local land revenue offices.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia#faq",
      mainEntity: NRI_SAINT_LUCIA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia#breadcrumb",
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
          name: "Will Drafting for NRIs in Saint Lucia",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-saint-lucia",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Default Governing Succession Law",
    saintLuciaLaw: "Civil Code of Saint Lucia (Book Second - Succession)",
    indianLaw: "Indian Succession Act, 1925 applies to Indian land (Lex Situs)",
    ringFenced: "Explicit territorial clause ensures Indian law governs Indian assets",
  },
  {
    feature: "Forced Heirship & Maintenance",
    saintLuciaLaw: "Testamentary freedom with family maintenance rules",
    indianLaw: "Zero forced heirship; 100% testamentary freedom under Section 59",
    ringFenced: "Ring-fencing isolates Indian real estate from Caribbean claims",
  },
  {
    feature: "Will Execution Formalities",
    saintLuciaLaw: "Notarial Will before Notary Royal, or English form Will",
    indianLaw: "Plain A4 paper signed before two adult witnesses (Section 63)",
    ringFenced: "Signed in Saint Lucia on plain paper with optional Castries apostille",
  },
  {
    feature: "Bank & Demat Asset Transmission",
    saintLuciaLaw: "Saint Lucian Grant of Probate or Letters of Administration",
    indianLaw: "Sarbati Devi rule applies; nominee acts only as interim trustee",
    ringFenced: "Direct transmission via Will without waiting for Indian court orders",
  },
  {
    feature: "Immovable Property Mutation",
    saintLuciaLaw: "Foreign Saint Lucian court orders not recognized by Tehsildars",
    indianLaw: "Revenue mutation under state land laws and municipal rules",
    ringFenced: "Fast Tehsildar and municipal property tax transfer across India",
  },
  {
    feature: "Inheritance Tax & Capital Gains",
    saintLuciaLaw: "Zero estate duty in Saint Lucia; local tax rules apply",
    indianLaw: "Zero inheritance tax in India; Section 197 lower TDS on property sale",
    ringFenced: "Full tax transparency for Section 197 TDS and Form 15CA/15CB remittance",
  },
  {
    feature: "Court Probate Requirement",
    saintLuciaLaw: "Eastern Caribbean Supreme Court probate for Saint Lucian estate",
    indianLaw: "Probate mandatory only in Mumbai, Kolkata, Chennai (Section 57/213)",
    ringFenced: "Parallel settlement in Saint Lucia and India without reciprocal delays",
  },
];

export default function WillDraftingForNrisInSaintLuciaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_SAINT_LUCIA_SCHEMA) }}
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
              Will Drafting for NRIs in Saint Lucia
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
            1. HERO SECTION (Single Strict H1: 45 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Saint Lucia Civil Code Counsel · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 45 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Saint Lucia
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Around 19,150 people of Indian heritage live in Saint Lucia.
                Key hubs include Castries, Gros Islet, Vieux Fort, and Rodney Bay.
                Many hold ancestral land in India. Others hold shares and bank funds.
                Local Caribbean wills often have general clauses that wipe out Indian
                wills by mistake. Caribbean court orders also face long delays in
                Indian courts. You can avoid this. A clear Indian Will protects your
                land, flats, and bank savings. Our High Court lawyers draft valid
                Wills for peaceful asset transfer.
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
                  href="#saint-lucia-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Civil Code vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Civil Code Harmonized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Castries Hague Apostille</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>CBI Portfolio Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 62 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Combined Worldwide Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Saint Lucia NRI Estate Risks: Land &amp; Asset Protection in India
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Civil Code Revocation Trap:</strong> General revocation
                    clauses in Saint Lucian wills can cancel your Indian Will by
                    mistake. This causes intestacy under Indian law.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Indian High Court Probate Delays:</strong> Indian land
                    registries reject foreign court probate orders. Getting ancillary
                    probate in India takes many years.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancestral Land Disputes:</strong> Indo-Saint Lucian
                    families risk losing village plots in India without a clear Will
                    naming legal heirs and survey numbers.
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
                We help you write a clear Will. Your wealth stays safe. Your family avoids long court fights.
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
                Any Indian in Saint Lucia who owns a flat, plot, bank balance, or mutual
                funds in India. It helps CBI passport holders and diaspora families. You can
                sign your Will in Saint Lucia. Two adult friends witness your signature. You do
                not need Indian stamp paper.
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
                We draft your Will under Indian law and Saint Lucian rules. You sign it in
                Saint Lucia with two witnesses. We guide you on Castries apostille seals.
                We also help your family update Indian land records. Our lawyers make the
                entire process simple and safe.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriSaintLuciaWillInteractive />

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
              Visual Legal Framework: Saint Lucia-India Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates safeguards
              your cross-border assets, harmonizes the Civil Code of Saint Lucia
              with the Indian Succession Act, and enables swift asset transmission:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-saint-lucia.jpg"
              alt="Will Drafting for NRIs in Saint Lucia Civil Code Harmonization"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Structure of Indian Will drafting
                for NRIs in Saint Lucia under local Civil Code and the Indian Succession Act.
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
        <section id="saint-lucia-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Saint Lucia vs Indian Succession Law: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to ring-fence Indian assets exposes your family to foreign
              probate delays, costly legal translations, and conflicting court jurisdictions.
              Compare how succession operates across both legal systems:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Saint Lucia Civil Code</th>
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
                        {row.saintLuciaLaw}
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
              Legal 4-Step Saint Lucia NRI Will Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers manage the entire cross-border succession
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
                desc: "Our lawyers draft your Will with clear territorial clauses. We elect Indian law and protect your Caribbean assets from conflict.",
              },
              {
                step: "03",
                title: "Plain-Paper or Apostille Signing",
                desc: "You print the draft on plain paper. You sign before two adult witnesses in Saint Lucia. We guide you on Castries apostille seals.",
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
              Copy-Pasteable Saint Lucia Ring-Fencing Clause
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
                  &ldquo;I, [Testator Full Legal Name], residing in [City/Quarter, Saint
                  Lucia], holding [Indian / Saint Lucian] Passport No. [Passport Number]
                  [and OCI Card No. [OCI Number]], hereby declare that this Last Will
                  and Testament shall govern exclusively all my immovable and movable
                  properties, bank accounts, fixed deposits, demat folios, mutual
                  funds, and assets situated in the Republic of India. In accordance
                  with Section 5 and Section 59 of the Indian Succession Act, 1925
                  (lex situs principle), the succession, administration, and distribution
                  of my Indian estate shall be governed strictly by the domestic laws of
                  India. This Will is executed as an autonomous testamentary instrument
                  and shall not revoke, cancel, or supersede any separate Will executed
                  by me under the Civil Code of Saint Lucia regarding my assets situated
                  outside India.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: If you hold Saint Lucian citizenship or an OCI card, our High
                  Court advocates customize this clause to preserve Indian
                  succession autonomy under international private law.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Saint Lucia-India Execution Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential steps to ensure full validity across Saint Lucia and India:
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
                      <strong>Castries Apostille Certification:</strong> Registrar of
                      the High Court apostille confirms genuine execution under the Hague treaty.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Schedule Identification:</strong> List exact survey
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
            7. CROSS-BORDER TAXATION & REPATRIATION SECTION
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
                Neither India nor Saint Lucia levies estate duty or inheritance tax. You
                inherit Indian assets tax-free. But selling real estate later brings
                capital gains tax. Indian buyers must deduct tax under Section 195.
                Our legal team helps you get a Lower TDS Certificate under Section 197.
                This saves you from high tax cuts upfront.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under RBI rules, heirs can transfer up to 1 million USD per year to
                Saint Lucia. You use an NRO bank account with Form 15CA and Form 15CB.
                Our legal team coordinates with certified accountants to ensure complete
                FEMA compliance and swift outward wire transfers.
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
            8. STATUTORY FAQS & RELATED RESOURCES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRIs in Saint Lucia
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
            {NRI_SAINT_LUCIA_FAQS.map((item, idx) => (
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
              Succession Act, 1925, the Civil Code of Saint Lucia (Cap. 4.01),
              the Foreign Exchange Management Act (FEMA), 1999, and the 1961 Hague
              Apostille Convention. Judicial authorities referenced include
              lex situs under Section 5/59 and the Supreme Court ruling in
              Sarbati Devi. This content provides legal education and does not
              replace personalized advocate counsel.
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
