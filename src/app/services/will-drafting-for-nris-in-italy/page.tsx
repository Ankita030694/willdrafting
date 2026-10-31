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
import NriItalyWillInteractive from "@/components/NriItalyWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Indian Will Drafting for NRIs in Italy | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Italy. Secure Punjab & Haryana farmland, flats & bank accounts under Indian Succession Act with AMA Legal Solutions.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in italy",
    "nri will drafting services italy",
    "indian will for nri in italy",
    "make a will for indian property from italy",
    "indian inheritance lawyer italy",
    "punjab land revenue act 1887 jamabandi will",
    "italian civil code quota di legittima will",
    "eu succession regulation 650 2012 professio juris",
    "hague apostille prefettura procura will india",
    "milan brescia rome nri property lawyer",
    "nre nro account will transmission italy",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy",
    },
  },
  openGraph: {
    title: "Indian Will Drafting for NRIs in Italy | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Italy. Secure Punjab & Haryana farmland, flats & bank accounts under Indian Succession Act with AMA Legal Solutions.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-italy-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Italy Punjab Land and Indian Succession Act Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Will Drafting for NRIs in Italy | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Italy. Secure Punjab & Haryana farmland, flats & bank accounts under Indian Succession Act with AMA Legal Solutions.",
    images: ["/images/will-drafting-for-nris-in-italy-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_ITALY_FAQS = [
  {
    q: "Does an Italian Will transfer agricultural land in Punjab or Haryana?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, Indian land follows Indian law only. Land officers in Punjab and Haryana reject Italian wills. You need an Indian Will to pass land to your heirs without court fights.",
  },
  {
    q: "Can NRIs in Italy sign an Indian Will on plain paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act 1925, you can sign your Will on plain A4 paper. You do not need Indian stamp paper. You sign before two adult witnesses who are not heirs in the Will.",
  },
  {
    q: "How does Italian forced heirship affect property located in India?",
    a: "Italian civil law sets aside fixed shares for certain heirs. But Indian land follows Indian law. Under Section 59 of the Indian Succession Act, you have full freedom to give your self-made land to anyone you choose.",
  },
  {
    q: "Can NRIs in Italy inherit farmland in India under FEMA regulations?",
    a: "Yes. Under FEMA rules, Indian passport holders living in Italy have full legal rights to inherit farm land from an Indian resident. A clear Will stops land disputes and helps update revenue records.",
  },
  {
    q: "Do I need an Italian Apostille from the Prefettura or Procura?",
    a: "A Will signed on plain paper before two witnesses is valid under Section 63. But an Italian Notaio stamp and Procura apostille give strong legal proof. It makes your Will solid in Indian courts.",
  },
  {
    q: "What happens to NRE and NRO bank accounts without a Will?",
    a: "In the Sarbati Devi case, the Supreme Court ruled that a bank nominee is only a caretaker. Without a Will, banks in India freeze accounts. Your heirs must go to court to get the funds.",
  },
  {
    q: "Can EU Succession Regulation 650/2012 protect my Indian assets?",
    a: "Yes. Article 22 of EU Regulation 650/2012 lets Indian citizens choose Indian law for their estate. A separate Indian Will keeps both lands apart. It prevents cross-border clashes.",
  },
  {
    q: "How does Jamabandi and Intkal mutation work without travelling to India?",
    a: "Our High Court lawyers represent you before the Halqa Patwari and Tehsildar under Section 34 of the Punjab Land Revenue Act 1887. We present your Will so land records update smoothly without travel.",
  },
];

const NRI_ITALY_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy",
      name: "Indian Will Drafting for NRIs in Italy | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Italy. Secure Punjab & Haryana farmland, flats & bank accounts under Indian Succession Act with AMA Legal Solutions.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-italy-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Italy Punjab Land and Indian Succession Act Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy#legalservice",
      name: "AMA Legal Solutions Italy NRI Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-italy-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate planning for Non-Resident Indians in Italy, specializing in Punjab and Haryana agricultural land succession and Italian apostille certification.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Italy" },
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Lombardy" },
        { "@type": "AdministrativeArea", name: "Emilia-Romagna" },
        { "@type": "AdministrativeArea", name: "Lazio" },
        { "@type": "AdministrativeArea", name: "Punjab" },
        { "@type": "AdministrativeArea", name: "Haryana" },
        { "@type": "AdministrativeArea", name: "Delhi NCR" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy#service",
      name: "Will Drafting for NRIs in Italy and Punjab Estate Protection",
      serviceType:
        "Cross-Border Succession Planning, Remote Will Execution, and Punjab Land Mutation",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Italy" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Italy NRI Indian Will Drafting & Succession Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Plain Paper Remote Execution Will Package",
              description:
                "Section 63 compliant Indian Will drafting for NRIs in Italy with dual-witness guidelines and bank nominee ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Italian Apostille & Consular Succession Package",
              description:
                "Comprehensive cross-border Will drafting with Italian Notaio and Procura della Repubblica Hague Apostille compliance advisory.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Punjab & Haryana Farmland Jamabandi Protection Plan",
              description:
                "Complete estate plan covering agricultural Khasra/Khewat schedules, Tehsildar mutation filings, and High Court probate support.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy#howto",
      name: "How NRIs in Italy Execute an Indian Will for Homeland Assets",
      description:
        "Four-step legal procedure for NRIs in Milan, Brescia, Rome, and across Italy to draft and execute an Indian Will under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Asset Audit & Revenue Title Review",
          "text": "Review Tehsil Jamabandi, Fard, municipal flat papers, and NRE/NRO bank folios in India to confirm clean legal title.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Advocate Drafting & Forced Heirship Ring-Fencing",
          "text": "Draft separate Indian Will containing explicit lex situs clauses, overriding Italian forced heirship (quota di legittima).",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Section 63 Signing & Optional Hague Apostille",
          "text": "Sign the Will on plain A4 paper before two independent witnesses, or complete Italian Notaio attestation with Procura apostille.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Safe Custody & Tehsildar Land Mutation",
          "text": "Store the original document securely and empower legal counsel to handle Jamabandi mutation before the local Tehsildar.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy#faq",
      mainEntity: NRI_ITALY_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy#breadcrumb",
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
          name: "Will Drafting for NRIs in Italy",
          item: "https://www.willdrafting.in/services/will-drafting-for-nris-in-italy",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    italianLaw: "Codice Civile Book II (Arts. 456-768)",
    indianLaw: "Indian Succession Act 1925 (ss. 5 & 59)",
    euRule: "EU Regulation 650/2012 (Brussels IV)",
  },
  {
    feature: "Immovable Property Rule",
    italianLaw: "Applies to Italian assets only",
    indianLaw: "Lex Situs: Indian law governs Indian land",
    euRule: "Article 22 allows national law choice",
  },
  {
    feature: "Forced Heirship System",
    italianLaw: "Mandatory Quota di Legittima for heirs",
    indianLaw: "100% Testamentary Freedom over self-acquired",
    euRule: "Overridden by national law election",
  },
  {
    feature: "Farmland Inheritance",
    italianLaw: "Italian acts invalid for Indian revenue",
    indianLaw: "Punjab Land Revenue Act 1887 s. 34 Intkal",
    euRule: "Recognizes third-country land sovereignty",
  },
  {
    feature: "Execution Formalities",
    italianLaw: "Testamento Pubblico or Olografo",
    indianLaw: "Plain A4 Paper before 2 witnesses (s. 63)",
    euRule: "Accepts forms valid under place of signing",
  },
  {
    feature: "Apostille Recognition",
    italianLaw: "Prefettura / Procura della Repubblica",
    indianLaw: "Fully valid in India under Hague Convention",
    euRule: "Direct cross-border enforcement in EU",
  },
  {
    feature: "Bank Nominee Ownership",
    italianLaw: "Italian bank succession declaration",
    indianLaw: "Nominee is custodian; Will gives title",
    euRule: "Governed by account location rules",
  },
];

export default function WillDraftingForNrisInItalyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_ITALY_SCHEMA) }}
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
              Will Drafting for NRIs in Italy
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
                  High Court Lawyers · Italy-India Cross-Border Counsel · Remote Execution
                </span>
              </div>

              {/* Single H1: 38 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Italy
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 206,000 Indians live in Italy across Lombardy, Milan,
                Brescia, and Rome. Many families own farm land, homes, and bank
                deposits in Punjab and Haryana. Under Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                , Italian rules cannot transfer land in India. We help you draft a
                clear Indian Will. Our lawyers protect your land from Italian court
                claims. We also update your land records in India without any travel.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Draft Online Will Now</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Punjab Land Law Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Forced Heirship Shield</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Hague Apostille Guidance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Lawyer Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single Strict H2: 57 Chars */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Vulnerability Audit
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Italy NRI Estate Risks: Protecting Punjab &amp; Haryana Lands
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Italian Forced Heirship Trap:</strong> The Italian
                    Civil Code reserves shares for distant kin. A generic will
                    triggers Italian court claims over Indian property.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Punjab Jamabandi Bottlenecks:</strong> Halqa Patwaris
                    freeze Intkal entries when an NRI passes away without a clear
                    Indian Will. This invites partition lawsuits.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Account Freezes:</strong> In Sarbati Devi, the
                    Supreme Court held that bank nominees are only caretakers.
                    Accounts freeze without a valid testamentary Will.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Master NRI Will Services</span>
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
                You keep your farm and flats in India safe. Court battles in India
                take ten to twenty years. A valid Will lets your family take over
                without court fights. We help you write a clear Will. Your land
                stays secure. Your children get their rightful share in peace. You
                avoid heavy legal fees. Your family saves time and stress.
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
                Any Indian in Italy who owns land, a home, a shop, or a bank
                account in India. It also helps families with farm land in
                Punjab, Haryana, or Delhi. You can sign your Will right here in
                Italy. Two friends witness your signature. You do not need Indian
                stamp paper. We make the whole process fast and simple.
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
                We draft your Will on plain paper. You sign it in Italy with two
                witnesses. You do not need to fly to India. We can also help get
                an apostille stamp from the local Italian court. Your papers stay
                100% valid in Indian courts. Our team updates your land records
                directly with local revenue staff.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE DIAGNOSTIC COMPONENT
            ========================================================================= */}
        <NriItalyWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Cross-Border Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Guide: Italy NRI Estate &amp; Land Transmission
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates shields your
              ancestral lands in Punjab and Haryana from Italian civil disputes,
              ensures smooth revenue mutation, and satisfies FEMA repatriation rules:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-italy-og.jpg"
              alt="Will Drafting for NRIs in Italy Punjab Land and Indian Succession Act Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Legal structure for Indian Will drafting,
                Italian apostille attestation, and Punjab land succession.
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
        <section id="italy-vs-india-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Jurisdictional Comparison</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Italian Civil Code vs Indian Succession Act
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Confusing Italian civil rules with Indian property laws leads to
              frozen revenue records and invalid testamentary clauses. Compare how
              both jurisdictions treat inheritance, forced heirship, and land:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Italian Law (Codice Civile)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Indian Law (ISA 1925)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      EU Succession Regulation
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
                        {row.italianLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.euRule}
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
              <span>Remote Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Legal Roadmap for NRIs in Italy
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers handle cross-border planning from start to
              finish. Follow this clear 4-step path to secure your Indian legacy
              peacefully:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Title Audit",
                desc: "We check your land records, Jamabandi papers, and bank details in Punjab or Haryana. We make sure all titles are clean and clear.",
              },
              {
                step: "02",
                title: "Advocate Will Drafting",
                desc: "Our High Court lawyers draft your Indian Will. We make sure Italian rules never touch your Indian assets. Your wishes stay final.",
              },
              {
                step: "03",
                title: "Remote Section 63 Signing",
                desc: "You sign your Will on plain A4 paper in Italy. Two adult friends sign as witnesses. We can also arrange an Italian apostille stamp.",
              },
              {
                step: "04",
                title: "Safe Deposit & Mutation",
                desc: "We keep your papers safe. Our local team in India presents your Will to the Tehsildar to update your land records smoothly.",
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
              Foreign Asset Ring-Fencing &amp; Lex Situs Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A standard revocation clause in an Indian Will can accidentally cancel
              your Italian estate plans. Our lawyers include strict territorial
              ring-fencing terms to keep both jurisdictions completely separate:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Indian Will Ring-Fencing Clause
                  </span>
                  <span>Non-Revocation Recital</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament
                  relates exclusively to my movable and immovable properties,
                  agricultural lands, residential houses, and bank accounts
                  situated within the territorial borders of the Republic of
                  India. This instrument shall not revoke, alter, or impact any
                  testamentary disposition or Will executed by me in Italy or
                  elsewhere regarding assets situated outside India. I expressly
                  declare that succession to my Indian estate shall be governed
                  solely by the Indian Succession Act, 1925, and relevant state
                  land laws, to the total exclusion of foreign forced heirship
                  rules (quota di legittima).&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Our advocates customize this clause to ensure compliance
                  with Article 22 of EU Regulation 650/2012, securing full legal
                  harmony across Rome, Milan, and Indian High Courts.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Italy NRI Indian Will Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Sub-Registrars and Halqa Patwaris verify these critical details:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Punjab Jamabandi Details:</strong> Khewat, Khatoni,
                      and Khasra parcel numbers clearly listed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Witnesses:</strong> Signed by two adult
                      witnesses who are not named beneficiaries.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank Account Schedules:</strong> Full IFSC, branch,
                      and account numbers for NRE and NRO funds.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Executor Appointment:</strong> Naming a trusted
                      Indian resident to oversee revenue mutation.
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

          {/* Contextual Link to Interactive Calculator */}
          <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-1">
                  Selling Inherited Property in India from Italy?
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55636D]">
                  Calculate your capital gains liability, Section 195 TDS rates,
                  and repatriation limits under RBI FEMA rules with our tools.
                </p>
              </div>
            </div>
            <Link
              href="/tools/capital-gains-tax-calculator-inherited-property"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors shrink-0"
            >
              <span>Calculate Capital Gains</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            7. PUNJAB & HARYANA FARMLAND SUCCESSION MANUAL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Punjab Land Revenue Act 1887 Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Punjab &amp; Haryana Farmland Succession Protocol
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Section 34 of the Punjab Land Revenue Act 1887, all land
                transfers must be recorded by the local Patwari. This process is
                called Intkal. When an Indian dies abroad without a Will, local
                officers freeze land mutation. Distant relatives can raise false
                claims. This leads to years of court fights.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                A valid Indian Will stops all disputes. Our lawyers submit your
                Will to the Tehsildar. We update your Jamabandi records without you
                having to travel to India.
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
                <span>Draft Online Will for Indian Assets</span>
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
              Frequently Asked Questions: Italy NRI Wills
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
            {NRI_ITALY_FAQS.map((item, idx) => (
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
                Explore related international hubs, legal guides, and complete
                directory indexes:
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
                <span>Inherited Asset Sale &amp; Repatriation</span>
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
                <span>Sitemap Directory (All Filters)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Sitemap Index</span>
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
              Succession Act 1925 (Sections 5, 59, 63), Punjab Land Revenue Act
              1887 (Section 34), Italian Civil Code (Codice Civile Book II), and
              EU Succession Regulation 650/2012 (Article 22). Attestation
              standards conform to the 1961 Hague Apostille Convention. This
              content provides legal education and does not replace
              individualized advocate advice.
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
