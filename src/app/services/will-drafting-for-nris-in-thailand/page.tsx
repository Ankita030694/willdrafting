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
import NriThailandWillInteractive from "@/components/NriThailandWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Thailand | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Thailand. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in thailand",
    "nri will drafting services thailand",
    "indian will for nri in thailand",
    "make a will for indian property from thailand",
    "indian inheritance lawyer thailand",
    "thai civil and commercial code book vi succession",
    "bangkok nri property lawyer india",
    "indian embassy bangkok will attestation",
    "nre nro account inheritance transmission thailand",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Thailand | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Thailand. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-thailand-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Thailand Indian Succession Act and Bangkok Estate Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Thailand | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Thailand. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-thailand-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_THAILAND_FAQS = [
  {
    q: "Does a Thai Will Cover Land and Apartments in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, Indian land and flats follow Indian law only. Thai courts cannot transfer Indian soil. A Will made in Thailand cannot move Indian land directly. You need an Indian Will to avoid court fights.",
  },
  {
    q: "Why Should NRIs in Thailand Have Two Separate Wills?",
    a: "Two separate Wills save time and money. Thailand is not on the Indian court list for direct probate recognition. An Indian High Court cannot re-seal a Thai court grant directly. A separate Indian Will lets your family take over Indian flats without translating Thai court files.",
  },
  {
    q: "Can Thai-Indians Sign an Indian Will on Plain Paper in Bangkok?",
    a: "Yes. Under Section 63 of the Indian Succession Act, you can sign your Will on plain A4 paper in Thailand. You do not need stamp paper. You sign before two adult friends who are not heirs in the Will.",
  },
  {
    q: "Is Embassy of India Bangkok Attestation Mandatory for NRIs?",
    a: "No, embassy visits are optional. Section 63 needs only two adult witnesses. But signing at the Embassy of India in Bangkok gives strong legal proof if relatives challenge your Will later.",
  },
  {
    q: "Can NRIs in Thailand Inherit Farmland in India Under FEMA?",
    a: "Yes. Under FEMA rules, NRIs and OCIs can inherit farm land in India from an Indian resident. Foreign residents cannot buy new farm land. But inheriting family farm plots through a valid Will is fully legal.",
  },
  {
    q: "How Does Thai Marital Property (Sin Somros) Affect Indian Assets?",
    a: "Thai law splits marital property in half on death. But Indian land follows Indian law only. A separate Indian Will ring-fences your Indian assets. This stops foreign marital property claims from stalling your Indian land.",
  },
  {
    q: "What Happens to Indian Bank Accounts Without an Indian Will?",
    a: "In Sarbati Devi, the Supreme Court ruled that a nominee is only a caretaker, not the owner. Without a Will, banks in India freeze accounts. Heirs must go to court for years to get their money.",
  },
  {
    q: "Can Inherited Indian Funds Be Repatriated to Thailand Legally?",
    a: "Yes. Under RBI FEMA rules, you can send up to USD 1,000,000 per year abroad from your NRO account. Money from land sales or bank accounts can go to Thai banks with tax forms 15CA and 15CB.",
  },
];

const NRI_THAILAND_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand",
      name: "Will Drafting for NRIs in Thailand | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Thailand. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-thailand-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Thailand Indian Succession Act and Bangkok Estate Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand#legalservice",
      name: "AMA Legal Solutions Thai-Indian Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-thailand-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate succession counsel for NRIs in Thailand, specializing in Lex Situs compliance, Thai CCC Book VI harmonization, and commercial asset protection.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Thailand" },
        { "@type": "City", name: "Bangkok" },
        { "@type": "City", name: "Pattaya" },
        { "@type": "City", name: "Phuket" },
        { "@type": "City", name: "Chiang Mai" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand#service",
      name: "Indian Will Drafting for NRIs in Thailand",
      serviceType:
        "Cross-Border Indian Estate Planning & Commercial Property Succession for NRIs in Thailand",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Thailand" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Thai-Indian NRI Estate Planning & Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Thailand",
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
              name: "Commercial Portfolios & Multi-City Real Estate Package",
              description:
                "Comprehensive estate planning for multi-generational business families owning commercial showrooms, corporate equity, and ancestral properties in India.",
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
                "End-to-end legal counsel for multi-jurisdiction Thai-Indian family estates, Bangkok consular attestation protocols, and SRO land registration.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand#howto",
      name: "How NRIs in Thailand Execute an Indian Will on Plain Paper",
      description:
        "Four-step statutory roadmap for Indian citizens in Bangkok, Pattaya, and Phuket to draft, execute, and verify an Indian Will under Section 63 of the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Schedule & Corporate Audit",
          text: "List all Indian residential flats, commercial properties, company shareholdings, NRE/NRO fixed deposits, and demat accounts.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting with Foreign Ring-Fencing",
          text: "Our High Court advocates draft your Indian Will with a territorial restriction clause isolating Thai assets and marital property claims.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain Paper Execution in Thailand",
          text: "Print the Will on plain A4 paper in Thailand and sign before two adult independent witnesses under Section 63 of the Indian Succession Act.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Optional Bangkok Embassy Attestation & Safe Custody",
          text: "Book an appointment at the Embassy of India Bangkok for consular seal attestation, or store the signed document in safe digital and legal custody.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand#faq",
      mainEntity: NRI_THAILAND_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand#breadcrumb",
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
          name: "Will Drafting for NRIs in Thailand",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-thailand",
        },
      ],
    },
  ],
};

const THAILAND_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    thaiLaw: "Thai Civil and Commercial Code Book VI (Succession)",
    indianLaw: "Indian Succession Act 1925 (Sections 5, 59 & 63)",
    crossBorderImpact: "Separate legal regimes govern properties in each nation",
  },
  {
    feature: "Real Estate Jurisdiction",
    thaiLaw: "Strict Lex Situs; Thai law regulates properties inside Thailand",
    indianLaw: "Strict Lex Situs; Section 5(1) regulates all Indian land and flats",
    crossBorderImpact: "Thai courts cannot adjudicate ownership of Indian real estate",
  },
  {
    feature: "Marital Property Rules",
    thaiLaw: "Sin Somros split divides marital property upon death (Book V)",
    indianLaw: "Individual ownership; full Will discretion over self-acquired wealth",
    crossBorderImpact: "Indian Will ring-fences assets from Thai marital property disputes",
  },
  {
    feature: "Statutory Heir Restrictions",
    thaiLaw: "6 statutory classes of heirs hold structured inheritance claims",
    indianLaw: "100% testamentary freedom to bequeath self-acquired properties",
    crossBorderImpact: "Testator can freely name chosen heirs without forced heirship",
  },
  {
    feature: "Execution Formalities",
    thaiLaw: "Signed before 2 witnesses or recorded at District Office (Amphoe)",
    indianLaw: "Plain A4 paper signed before two neutral adult witnesses (S. 63)",
    crossBorderImpact: "Valid execution in Bangkok without travelling to India",
  },
  {
    feature: "Enforceability of Foreign Probate",
    thaiLaw: "Thai court orders need local seals and certified translations",
    indianLaw: "Thai court orders cannot be re-sealed in Indian High Courts",
    crossBorderImpact: "A separate Indian Will avoids costly court trials in India",
  },
  {
    feature: "Bank Account Transmission",
    thaiLaw: "Thai bank rules govern accounts inside Thailand",
    indianLaw: "Nominees are caretakers; a Will gives full legal ownership",
    crossBorderImpact: "Fast payout of NRE/NRO bank deposits and stock shares",
  },
];

export default function WillDraftingForNrisInThailandPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_THAILAND_SCHEMA) }}
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
              Will Drafting for NRIs in Thailand
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
            1. HERO SECTION (Single Strict H1: 41 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Thai-Indian Cross-Border Estate Practice
                </span>
              </div>

              {/* Single H1: 41 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Thailand
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Around 150,000 Indian citizens and OCIs live in Thailand. Many families in Bangkok,
                Pattaya, and Phuket own shops, flats, and bank accounts in India. Under Section 5
                of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                , Indian land follows Indian law only. Thai Wills cannot move Indian land. Our High Court
                advocates draft clean Indian Wills to keep your family wealth safe.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Estate Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#thailand-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Succession Laws</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Dual Will Strategy</span>
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

            {/* Right Summary Box with Single H2 (56 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Thai-Indian Estate Risks
              </div>

              {/* Single H2: 56 chars (Strictly <= 70 chars) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Thailand NRI Estate Risks: Cross-Border Asset Protection
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Thai Probate Re-Sealing Barrier:</strong> Thailand is not
                    a reciprocating territory under Section 44A of the CPC. Thai
                    probate grants cannot be re-sealed in Indian High Courts, leading
                    to protracted litigation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation Trap:</strong> Standard Thai Wills
                    often contain blanket revocation clauses that inadvertently cancel
                    prior Indian testamentary documents, creating intestacy.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominee Custodian Rule:</strong> In the landmark
                    Sarbati Devi case, the Supreme Court confirmed nominees are only
                    custodians. A registered Indian Will is essential to claim bank funds.
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
                You protect your shops and flats in India. Court cases in India take
                15 to 20 years. A clean Will lets your heirs take over without court fights.
                We help you write a clear Will. Your land stays safe. Your children get their fair share in peace.
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
                Any Indian in Bangkok, Pattaya, or Phuket who owns a home, shop, or bank account
                in India. It also helps families with assets in Delhi, Mumbai, Punjab, or Gujarat.
                You can sign your Will in Thailand. Two friends watch you sign. No stamp paper is needed.
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
                We draft your Will on plain paper. You sign it in Thailand with two
                witnesses. We help you update land and tax records in India so your family is safe.
                Our team guides you at each step. You avoid long court trials and keep your wealth secure.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriThailandWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Papers</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Thai-Indian Wills
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will drafted by High Court advocates protects
              your properties, complies with Thai CCC Book VI, and secures swift
              transmission:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-thailand-og.jpg"
              alt="Will Drafting for NRIs in Thailand Indian Succession Act and Bangkok Estate Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting for NRIs
                in Thailand under the Indian Succession Act 1925 and Thai CCC Book VI.
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
        <section id="thailand-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Jurisdictional Analysis</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Thailand vs India: Estate Law Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Using a single global Will creates severe delays. Compare how Thai
              and Indian courts treat cross-border inheritance, marital property,
              and foreign probate grants:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Legal Dimension</th>
                    <th className="py-4 px-6 w-[26%]">
                      Thailand Succession Law (CCC Book VI)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Indian Succession Act, 1925
                    </th>
                    <th className="py-4 px-6 w-[28%]">
                      Cross-Border Strategic Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {THAILAND_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.thaiLaw}
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
            5. STATUTORY 4-STEP ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Cross-Border Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Thai-Indian Succession Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this structured four-step path to draft, execute, and verify
              your Indian Will while residing in Thailand:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Title Audit",
                desc: "We review your sale deeds, demat folios, and bank accounts in India. We check title records to stop family disputes.",
              },
              {
                step: "02",
                title: "Ring-Fenced Drafting",
                desc: "Our High Court lawyers draft your Indian Will. We ring-fence your Indian land from Thai court rules.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing",
                desc: "Print your Will on plain A4 paper in Thailand. Sign before two adult witnesses under Section 63.",
              },
              {
                step: "04",
                title: "Embassy Attestation",
                desc: "We guide you with optional embassy visits in Bangkok. This gives strong legal proof in Indian courts.",
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
            6. ESSENTIAL RING-FENCING CLAUSE & DRAFTING BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Exclusion &amp; Ring-Fencing
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Without a clear territorial ring-fencing clause, your Indian Will
              might clash with Thai testamentary arrangements or trigger claims
              under Thai marital property rules:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Standard Territorial Ring-Fencing & Dual Will Clause for Thailand NRIs"
            code={`1. TERRITORIAL JURISDICTION & EXCLUSIVITY:
"I hereby declare that this Last Will and Testament applies strictly, exclusively, and solely to all my immovable and movable properties, commercial assets, residential flats, land parcels, bank accounts, NRE/NRO fixed deposits, shares, mutual funds, and claims situated within the territorial boundaries of the Republic of India."

2. CONCURRENT VALIDITY OF FOREIGN WILLS:
"I explicitly clarify that this testamentary instrument does NOT revoke, amend, or alter any separate Will, codicil, or succession arrangement executed by me in the Kingdom of Thailand or elsewhere outside India with respect to assets located outside India. Both Wills shall operate concurrently, independently, and harmoniously in their respective geographical jurisdictions."

3. EXCLUSION OF OVERSEAS ASSETS:
"All properties, businesses, bank accounts, and investments held by me in Thailand or any other country outside India are expressly excluded from the scope of this Will and shall devolve according to the separate testamentary dispositions made under local laws."`}
            explanation="This clause stops accidental cancellation of your Thai Will. It makes sure Indian courts handle only assets on Indian soil."
          />

          {/* Contextual Link to Interactive Calculators */}
          <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs mt-8">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-1">
                  Calculate Capital Gains Tax on Inherited Property
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55636D]">
                  Evaluate Indian capital gains tax liability and repatriation TDS
                  rates before planning property transmission.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Capital Gains Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>NRI TDS Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. BANGKOK BUSINESS FAMILIES & ASSET PROTECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Multi-Generational Thai-Indian Wealth</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Bangkok &amp; Sukhumvit Cross-Border Rights
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Thai-Indian families have lived in Bangkok, Pattaya, and Chiang Mai for
                decades. Many own shops, plots, and company shares across Delhi, Mumbai,
                Punjab, and Rajasthan.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Without an Indian Will, company shares and bank accounts get frozen.
                Our High Court lawyers draft clear Wills with exact asset lists.
                This lets your children inherit shops and flats smoothly without family fights.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Lawyer Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Indian Will</span>
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
              Frequently Asked Questions: Thailand NRI Wills
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
            {NRI_THAILAND_FAQS.map((item, idx) => (
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
                Related NRI Succession &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border legal guides, transmission tools, and
                sitemaps:
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
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>HTML Sitemap (All)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Sitemap Filter</span>
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
              Act, 1925, the Foreign Exchange Management Act (FEMA), 1999, and Book
              VI of the Thai Civil and Commercial Code. Precedents cited include
              Sarbati Devi v. Usha Devi (1984 SC). This content is published for
              educational purposes and does not substitute for formal advocate-client
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
