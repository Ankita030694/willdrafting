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
import NriIndonesiaWillInteractive from "@/components/NriIndonesiaWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Indonesia | WillDrafting.in",
  },
  description:
    "Indian Will drafting for NRIs in Indonesia. Protect Delhi, Mumbai & Punjab properties, NRE/NRO accounts & mutual funds under the Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in indonesia",
    "nri will drafting services indonesia",
    "indian will for nri in indonesia",
    "make a will for indian property from indonesia",
    "indian inheritance lawyer indonesia",
    "indonesian civil code burgerlijk wetboek inheritance",
    "jakarta sindhi estate planning advocate",
    "medan tamil ancestral property will india",
    "indian embassy jakarta will attestation",
    "consulate general medan bali indian will",
    "fema 1999 nri property inheritance repatriation",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Indonesia | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Indonesia. Protect Delhi, Mumbai & Punjab properties, NRE/NRO accounts & mutual funds under the Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-indonesia-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Indonesia Indian Succession Act and Civil Code Estate Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Indonesia | WillDrafting.in",
    description:
      "Indian Will drafting for NRIs in Indonesia. Protect Delhi, Mumbai & Punjab properties, NRE/NRO accounts & mutual funds under the Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-indonesia-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_INDONESIA_FAQS = [
  {
    q: "Does an Indonesian Will or Notarial Deed Transfer Land in India?",
    a: "No. Under Section 5 of the Indian Succession Act, 1925, Indian land and flats follow the law of India only (Lex Situs). An Indonesian notarial will cannot pass Indian soil. Under Indian law, land follows Indian rules only. You need an Indian Will to avoid land office delays and court fights.",
  },
  {
    q: "Can NRIs in Jakarta or Medan Sign an Indian Will on Plain Paper?",
    a: "Yes. Under Section 63 of the Indian Succession Act, 1925, you can sign your Indian Will on plain white A4 paper. You do not need Indian stamp paper. You sign before two adult independent witnesses who are not beneficiaries in your Will.",
  },
  {
    q: "How Does Indonesian Forced Heirship Affect Indian Properties?",
    a: "The Indonesian Civil Code sets forced family shares for local assets. But Indian law gives you full freedom to give self-acquired wealth to anyone. An Indian Will keeps your Indian assets safe. It blocks foreign forced share rules.",
  },
  {
    q: "Is Attestation at the Indian Embassy in Jakarta or Consulates Required?",
    a: "No, embassy trips are optional. Section 63 needs only two adult witnesses. But consular seals from the Indian Embassy in Jakarta, Medan, or Bali give strong proof. They stop kin disputes later.",
  },
  {
    q: "What Happens to Indian Bank Accounts Without a Valid Will?",
    a: "In Sarbati Devi, the Supreme Court ruled nominees hold bank funds only as caretakers. Without an Indian Will, banks freeze accounts. Heirs must spend years in court. They must fight to claim the money.",
  },
  {
    q: "How Do Sindhi & Tamil Families Protect Ancestral Land in India?",
    a: "Sindhi and Tamil families hold ancestral homes and flats in Mumbai, Delhi, and Chennai. We add clear Patta numbers and tax IDs. We add family share terms so your title stays safe from disputes.",
  },
  {
    q: "Can NRIs in Indonesia Repatriate Inherited Property Funds Under FEMA?",
    a: "Yes. Under FEMA rules, you can inherit Indian land and funds. On sale, heirs put money in an NRO account. They can send up to 1 Million USD abroad each financial year with Form 15CA and 15CB.",
  },
  {
    q: "Why is a Single Worldwide Will Risky for NRIs in Indonesia?",
    a: "One global will forces slow court probate in India under Section 228. It also causes clashes between foreign notaries and Indian land offices. Two separate Wills keep your assets secure. Both estates stay clean. Your heirs save time and legal costs.",
  },
];

const NRI_INDONESIA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia",
      name: "Will Drafting for NRIs in Indonesia | WillDrafting.in",
      description:
        "Indian Will drafting for NRIs in Indonesia. Protect Delhi, Mumbai & Punjab properties, NRE/NRO accounts & mutual funds under the Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-indonesia-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Indonesia Indian Succession Act and Civil Code Estate Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia#legalservice",
      name: "AMA Legal Solutions Indo-Indonesian Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-indonesia-og.jpg",
      description:
        "Cross-border Indian Will drafting and estate succession counsel for NRIs in Indonesia, specializing in Lex Situs compliance, Indonesian Civil Code ring-fencing, and FEMA property transmission.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Indonesia" },
        { "@type": "City", name: "Jakarta" },
        { "@type": "City", name: "Medan" },
        { "@type": "City", name: "Surabaya" },
        { "@type": "City", name: "Bali" },
        { "@type": "City", name: "Bandung" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia#service",
      name: "Will Drafting for NRIs in Indonesia",
      serviceType:
        "Cross-Border Indian Estate Planning & Property Succession for NRIs in Indonesia",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "Indonesia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Indo-Indonesian NRI Estate Planning & Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Indonesia",
              description:
                "Section 63 compliant Indian Will on plain paper covering Indian flats, NRO bank accounts, and demat holdings with Indonesian Civil Code ring-fencing clauses.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Multi-State Estate & Demat Transmission Package",
              description:
                "Comprehensive estate planning across Delhi-NCR, Mumbai, and South India, including housing society transmission and municipal mutation support.",
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
                "End-to-end legal representation for multi-jurisdiction family wealth, Jakarta or Medan consular attestation protocols, and SRO land registration.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia#howto",
      name: "Indonesia to India Estate Transmission Manual",
      description:
        "Four-step statutory protocol for Indian citizens and OCIs in Jakarta, Medan, Bali, and Surabaya to draft, execute, and verify an Indian Will under the Indian Succession Act.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Discovery & Lex Situs Title Audit",
          text: "List all Indian flats, shops, family lands, and bank deposits alongside your Indonesian assets.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Territorial Ring-Fenced Drafting with Foreign Exclusion",
          text: "Our High Court advocates draft your Indian Will with clauses that isolate foreign forced share rules.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Execution & Consular Attestation",
          text: "Sign your Will on plain A4 paper in Jakarta or Medan before two adult witnesses under Section 63.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "SRO Land Mutation & Bank Transmission",
          text: "Present the signed Will to Indian land offices, housing societies, and banks to transfer assets to your family.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia#faq",
      mainEntity: NRI_INDONESIA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia#breadcrumb",
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
          name: "Will Drafting for NRIs in Indonesia",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-indonesia",
        },
      ],
    },
  ],
};

const INDONESIA_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    indonesiaLaw: "Indonesian Civil Code (Burgerlijk Wetboek Book II)",
    indianLaw: "Indian Succession Act 1925 (Sections 5, 59 & 63)",
    femaFramework: "FEMA 1999 & RBI Remittance of Assets Rules",
  },
  {
    feature: "Land & Flat Rule (Lex Situs)",
    indonesiaLaw: "Hak Pakai / HGB / PMA company rules inside Indonesia",
    indianLaw: "Strict Lex Situs; Indian law governs all Indian land",
    femaFramework: "NRIs hold legal rights to inherit Indian land and flats",
  },
  {
    feature: "Testamentary Freedom",
    indonesiaLaw: "Restricted by forced heirship (legitieme portie Arts. 913-916)",
    indianLaw: "Full freedom to give self-acquired wealth to chosen heirs (s. 59)",
    femaFramework: "Full freedom to give wealth to resident or NRI heirs",
  },
  {
    feature: "Signing Formalities",
    indonesiaLaw: "Requires Indonesian Notary Deed (Akta Notaris)",
    indianLaw: "Plain A4 paper signed before two adult witnesses (Section 63)",
    femaFramework: "No Indian stamp paper or mandatory SRO visit needed",
  },
  {
    feature: "Consular Seals & Attestation",
    indonesiaLaw: "Indonesian Ministry of Law & Human Rights Apostille",
    indianLaw: "Indian Embassy Jakarta or Medan/Bali Consulates",
    femaFramework: "Plain paper signing is valid in India without embassy trips",
  },
  {
    feature: "Bank Nominee Status",
    indonesiaLaw: "Indonesian banking regulations govern local accounts",
    indianLaw: "Nominee is only a caretaker (Sarbati Devi SC precedent)",
    femaFramework: "Direct transfer of NRE and NRO funds and demat folios",
  },
  {
    feature: "Fund Repatriation Abroad",
    indonesiaLaw: "Bank Indonesia foreign exchange transfer regulations",
    indianLaw: "Tax clearance under Form 15CA and Form 15CB",
    femaFramework: "Send up to 1 Million USD abroad each year through NRO bank accounts",
  },
];

export default function WillDraftingForNrisInIndonesiaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_INDONESIA_SCHEMA) }}
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
              Will Drafting for NRIs in Indonesia
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
            1. HERO SECTION (Single Strict H1: 42 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Indo-Indonesian Cross-Border Counsel · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 42 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Indonesia
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 135,000 Overseas Indians live in Jakarta, Medan, Bali, and
                Surabaya. Many Sindhi and Tamil families own city flats, shops, and
                ancestral lands across Mumbai, Delhi, Gujarat, and Tamil Nadu. Under
                Section 5 of the{" "}
                <strong className="text-[#111827]">
                  Indian Succession Act, 1925
                </strong>
                , land follows the law of the soil where it sits. Indonesian notarial
                deeds cannot pass Indian land. Our High Court advocates draft clean
                Indian Wills. We protect your family wealth without long court trials.
                Your assets remain safe.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Asset Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#indonesia-vs-indian-law"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Succession Laws</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Civil Code BW Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Stamp Duty</span>
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

            {/* Right Summary Box with Single H2 (58 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Indo-Indonesian Succession Risks
              </div>

              {/* Single H2: 58 chars (Strictly <= 70 chars) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Indonesia NRI Estate Risks: Cross-Border Asset Protection
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Indonesian Forced Heirship Clashes:</strong> Burgerlijk
                    Wetboek Book II sets forced shares for local kin.
                    A separate Indian Will protects your Indian assets under
                    Indian succession law.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Lex Situs Rejection of Foreign Wills:</strong> Under Section 5
                    of the Indian Succession Act, land offices reject foreign
                    papers. Indian soil needs an Indian Will. Our lawyers keep title safe.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominee Caretaker Trap:</strong> In Sarbati
                    Devi, the Supreme Court held nominees are only caretakers.
                    A Will gives full ownership to your named heirs.
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
                You protect your flats and bank funds in India. Court cases in India
                take many years. A clean Will lets your heirs take over without court
                fights. We help you write a clear Will. Your assets stay safe. Your
                family gets their fair share in peace. No court trials slow down your heirs.
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
                Any Indian in Indonesia who owns a home, plot, shop, or bank account
                in India. It also helps Sindhi and Tamil business families in Jakarta,
                Medan, or Bali. You can sign your Will in Indonesia. Two friends watch
                you sign. No stamp paper is needed. The process is simple and fast.
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
                We draft your Will on plain paper. You sign it in Indonesia with two
                witnesses. We help you update land records in India so your family is safe.
                Our team guides you at each step. You avoid long court trials and keep your
                wealth secure. Your loved ones get full legal peace.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriIndonesiaWillInteractive />

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
              Visual Legal Framework: Indo-Indonesian Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an Indian Will drafted by High Court advocates protects
              your cross-border assets, ring-fences Civil Code rules, and helps
              fast property transfer:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-indonesia-og.jpg"
              alt="Will Drafting for NRIs in Indonesia Indian Succession Act and Civil Code Estate Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Indian Will drafting steps for NRIs in Indonesia under the Indian Succession Act and Civil Code.
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
        <section id="indonesia-vs-indian-law" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Indo-Indonesian Succession Law: Statutory Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Examine key legal differences between Indonesian Civil Code rules,
              the Indian Succession Act 1925, and FEMA 1999. Compare the three frameworks below:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Indonesian Civil Code (BW Book II)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Indian Succession Act 1925
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      FEMA 1999 &amp; Repatriation Rules
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {INDONESIA_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.indonesiaLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.femaFramework}
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
              <span>Transmission &amp; Verification Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Indonesia to India Estate Transmission Manual
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers manage the entire estate transition. Follow
              this structured 4-step manual to secure Indian real estate and financial portfolios:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Audit & Title Mapping",
                desc: "We review land records, flat shares, and bank accounts in India. We check papers across Mumbai, Delhi, and Tamil Nadu. All titles stay clear.",
              },
              {
                step: "02",
                title: "Civil Code Ring-Fenced Drafting",
                desc: "Our advocates draft your Indian Will with a border clause. This stops Indonesian forced share rules. It prevents family fights.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing in Indonesia",
                desc: "You sign your Will on plain A4 paper in Jakarta, Medan, or Bali. Two adult friends witness you sign under Section 63. No stamp paper is needed. Your Will is valid at once.",
              },
              {
                step: "04",
                title: "Revenue Mutation & Bank Release",
                desc: "We present the signed Will to city offices, flat societies, and banks in India. We help transfer homes and funds directly to your heirs. Your family avoids long court delays.",
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
              Foreign Asset Ring-Fencing Clause for Indian Assets
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A standard revocation line in a foreign will cancels earlier wills worldwide. That is a major risk. To protect Indian flats and land, your Indian Will must use clear border ring-fencing terms:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Copyable Clause Box */}
            <div className="lg:col-span-7">
              <CopyableNriPropertyClauseBox
                title="Territorial Ring-Fencing &amp; Non-Revocation Recital"
                code={`"1. EXCLUSIVE TERRITORIAL JURISDICTION (LEX SITUS):
I hereby declare that this Last Will and Testament relates exclusively and solely to all my immovable properties (including residential flats, commercial shops, plots, and ancestral coparcenary shares) and movable assets (including NRE/NRO bank accounts, fixed deposits, demat shares, mutual funds, and insurance proceeds) situated strictly within the Republic of India.

2. NON-REVOCATION OF INDONESIAN INSTRUMENTS:
This testamentary instrument shall NOT revoke, alter, supersede, or impair any will, notarial deed (Akta Notaris), or property arrangement executed by me in the Republic of Indonesia concerning assets situated in Indonesia (including Hak Pakai rights, PT PMA shareholdings, or local bank accounts). Both instruments shall operate independently under their respective domestic legal jurisdictions.

3. SRO & FINANCIAL TRANSMISSION MANDATE:
I expressly authorize my designated executor to present this Will before the competent Sub-Registrar of Assurances, municipal corporations, cooperative housing societies, and financial institutions in India to complete ownership mutation and asset transmission pursuant to the Indian Succession Act, 1925."`}
                explanation="Drafted under Section 5 and Section 63 of the Indian Succession Act 1925. Ring-fences Indian urban and ancestral assets against cross-border conflicts with Indonesian Civil Code (Burgerlijk Wetboek) forced heirship rules."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Schedule Demarcation &amp; Asset Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Housing societies and Sub-Registrars require exact schedule details:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Apartment &amp; Society Details:</strong> Flat numbers,
                      building names, and share certificate numbers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Undivided Land Share (UDS):</strong> Exact registered
                      percentage allocated to each floor.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Banking Details:</strong> NRE, NRO, and domestic accounts
                      with IFSC codes and CIF numbers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Alternate Executor:</strong> Indian resident
                      representative for local physical filings.
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

          {/* Contextual Links to Interactive Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Need to Calculate Capital Gains on Inherited Land?
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate capital gains tax and tax exemptions on inherited Indian flats and land.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
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
                    Calculate NRI Property Sale TDS &amp; Repatriation Limits
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate tax deductions and send property sale money abroad under RBI rules.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Open Repatriation Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CROSS-BORDER CIVIL CODE & FEMA FRAMEWORK
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Civil Code &amp; FEMA Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Indonesian Civil Code vs Indian Succession Act 1925
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Indonesian law comes from Dutch civil code roots. Under the Indonesian
                Civil Code (Burgerlijk Wetboek Book II), rules set forced shares for
                children and spouses. These shares cannot be cut off by a local will.
                They bind all local assets. They limit foreign transfers.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                In contrast, Section 59 of the Indian Succession Act gives you full
                freedom to leave self-acquired wealth to anyone. Under FEMA rules, NRIs
                can inherit Indian land. They can send up to 1 Million USD abroad each year.
                A clear Indian Will ring-fences your Indian assets. It ensures smooth
                record updates without foreign court delays.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors text-center"
              >
                <span>Consult High Court Lawyer</span>
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
              <span>Succession FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Indo-Indonesian Wills
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
            {NRI_INDONESIA_FAQS.map((item, idx) => (
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
                Related Cross-Border Succession Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI property services, probate counsel, and legal directory:
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
                <span>WillDrafting Directory (All Filter)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Services Index (Services Filter)</span>
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
              This cross-border guide is prepared under the Indian Succession Act,
              1925, and FEMA 1999. It references the Indonesian Civil Code (Burgerlijk
              Wetboek Book II). Judicial precedents cited include Sarbati Devi v. Usha
              Devi (AIR 1984 SC 346). This content gives legal facts. It does not replace
              personal lawyer advice.
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
