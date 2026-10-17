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
  BookOpen,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriWillInteractive from "@/components/NriWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "NRI Will Drafting India | Online Will for Indian Assets",
  },
  description:
    "Draft a legally valid Indian Will online for NRIs & OCIs. Protect Indian property, NRE/NRO accounts & Demat shares under the Indian Succession Act.",
  authors: [{ name: "WillDrafting Editorial Team" }],
  keywords: [
    "nri will drafting india",
    "online will for nri with property in india",
    "will writing services for nri in india",
    "how can nri make a will in india",
    "draft indian will from abroad",
    "indian will for nri living in usa",
    "indian will for us citizens oci",
    "indian will for nri living in uk",
    "uk probate vs indian will for nri",
    "indian will for nri in uae dubai",
    "uae expat indian property will",
    "indian will for nri in canada",
    "canadian nri property inheritance india",
    "indian will for nri in australia singapore",
    "nri will for nre nro bank accounts india",
    "will for elderly parents in india by nri children",
    "do i need a separate will for indian property as an nri",
    "two will strategy for nri",
    "foreign will validity in india section 228",
    "can oci inherit agricultural land in india fema",
    "repatriation of inherited property by nri form 15ca 15cb",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/service/nri-will-india",
  },
  openGraph: {
    title: "NRI Will Drafting India | Online Will for Indian Assets",
    description:
      "Draft a legally valid Indian Will online for NRIs & OCIs. Protect Indian property, NRE/NRO accounts & Demat shares under the Indian Succession Act.",
    url: "https://www.willdrafting.in/service/nri-will-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/nri-two-will-strategy-infographic.svg",
        width: 1200,
        height: 640,
        alt: "NRI Two-Will Strategy Infographic for Indian Property and NRE NRO Assets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Will Drafting India | Online Will for Indian Assets",
    description:
      "Draft a legally valid Indian Will online for NRIs & OCIs. Protect Indian property, NRE/NRO accounts & Demat shares under the Indian Succession Act.",
    images: ["/images/nri-two-will-strategy-infographic.svg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_FAQS = [
  {
    q: "Do NRIs and OCIs need a separate Indian Will if they already have a US, UK, UAE, or Canadian Will?",
    a: "Yes. While a foreign Will or US Living Trust can theoretically cover Indian assets, executing it in India triggers Section 228 of the Indian Succession Act, 1925. Your family must wait 6 to 12 months for overseas probate, obtain an Apostille or Indian Embassy attestation, and then file a second ancillary court petition in India (taking another 8 to 18 months). Maintaining a separate Indian Will under the Two-Will Strategy allows immediate parallel administration in India.",
  },
  {
    q: "How do I prevent my Indian Will from accidentally revoking my US, UK, or Canadian Will?",
    a: "Every NRI Indian Will drafted on WillDrafting.in includes an explicit Non-Revocation Territorial Scope Clause. It declares that the Will applies exclusively to movable and immovable property situated within the Republic of India and preserves any past or future Wills or Living Trusts governing assets outside India.",
  },
  {
    q: "Does an NRI need to fly to India or buy Indian stamp paper to sign a valid Indian Will?",
    a: "No. Under Section 63 of the Indian Succession Act, 1925 and the Indian Stamp Act, 1899, Wills are 100% exempt from stamp duty. You can print your Indian Will on plain white A4 paper in New York, London, Dubai, Toronto, Sydney, or Singapore and sign it in the simultaneous presence of two independent adult witnesses (who are not beneficiaries or spouses of beneficiaries).",
  },
  {
    q: "When is a Hague Apostille or Indian Embassy attestation required for an NRI Will?",
    a: "For basic validity under Section 63 of the Indian Succession Act, plain-paper signing before two adult witnesses is sufficient. However, if you execute a supporting Power of Attorney or notarized affidavit abroad for Indian property mutation, residents of Hague Convention countries (USA, UK, Canada, Australia, Singapore, EU) use a local Apostille stamp, while residents of non-Hague jurisdictions (such as the UAE) use Indian Embassy (Abu Dhabi) or Consulate (Dubai) attestation.",
  },
  {
    q: "Can an NRI or OCI cardholder inherit agricultural land or a farmhouse in India through a Will?",
    a: "Yes. Under Section 6(5) of FEMA, 1999 and the FEMA (Non-Debt Instruments) Rules, 2019, an NRI or OCI is prohibited from purchasing agricultural land, plantation property, or a farmhouse in India, but CAN lawfully inherit it by way of a valid Will or intestate succession from a Resident Indian. Any subsequent sale of that inherited agricultural land must be made to a Resident Indian citizen.",
  },
  {
    q: "How much inherited money or property sale proceeds can an NRI repatriate abroad each year?",
    a: "Under RBI and FEMA Remittance of Assets regulations, each NRI or OCI beneficiary can repatriate up to USD 1 Million per financial year (April 1 to March 31) from their NRO account after submitting a Chartered Accountant certificate in Form 15CB and filing Form 15CA on the Income Tax portal along with the deceased's Will.",
  },
  {
    q: "Does India charge an Inheritance Tax or Estate Duty on property inherited by NRIs?",
    a: "No. India abolished Estate Duty in 1985 and Wealth Tax in 2015. Under Section 56(2)(x) of the Indian Income Tax Act, 1961, property or money received under a Will or by inheritance is completely exempt from income tax in India at the time of inheritance (capital gains tax applies only when the inherited property is later sold).",
  },
  {
    q: "Can NRIs use WillDrafting.in to help their elderly parents living in India make a Will?",
    a: "Yes. Thousands of NRIs face multi-year travel and court hurdles when aging parents in India pass away without a Will. Our platform offers a Bilingual (English & Hindi) interface and an AI Voice Assistant so your parents in India can comfortably record their wishes from home, backed by AMA Legal Solutions advocate verification.",
  },
];

const NRI_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/service/nri-will-india#webpage",
      "url": "https://www.willdrafting.in/service/nri-will-india",
      "name": "NRI Will Drafting India | Online Will for Indian Assets",
      "description":
        "Draft a legally valid Indian Will online for NRIs & OCIs. Protect Indian property, NRE/NRO accounts & Demat shares under the Indian Succession Act.",
      "datePublished": "2026-10-16",
      "dateModified": "2026-10-17",
      "author": {
        "@type": "Organization",
        "name": "WillDrafting Editorial Team",
        "url": "https://www.willdrafting.in/aboutus",
      },
      "publisher": {
        "@id": "https://www.willdrafting.in/#organization",
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.willdrafting.in/images/nri-two-will-strategy-infographic.svg",
        "width": 1200,
        "height": 640,
        "caption": "Single Foreign Will vs. The NRI Two-Will Strategy in India under Section 5, 63 & 228 of the Indian Succession Act, 1925",
      },
      "breadcrumb": {
        "@id": "https://www.willdrafting.in/service/nri-will-india#breadcrumb",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.willdrafting.in/service/nri-will-india#service",
      "name": "NRI & OCI Online Will Drafting for Indian Property & Financial Assets",
      "serviceType": "Cross-Border Indian Estate Planning & Testamentary Will Drafting",
      "provider": {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Singapore" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "NRI Indian Will Plans",
        "itemListElement": [
          {
            "@type": "Offer",
            "price": "2490",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Essential NRI Indian Will (Auto-Verified)",
            },
          },
          {
            "@type": "Offer",
            "price": "4990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Lawyer-Verified NRI Indian Will (Advocate Reviewed)",
            },
          },
          {
            "@type": "Offer",
            "price": "9990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "1-on-1 Senior Advocate NRI & FEMA Estate Consultation",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/service/nri-will-india#howto",
      "name": "How NRIs Sign a Legally Valid Indian Will from Abroad",
      "description":
        "Four-step legal process for NRIs and OCIs in the USA, UK, UAE, Canada, Australia, and Singapore to execute a valid Will for Indian property without flying to India.",
      "totalTime": "PT20M",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Draft Your India-Specific Will with a Territorial Clause",
          "text": "Complete the online questionnaire listing only your Indian movable and immovable assets, with an explicit non-revocation clause protecting your foreign Will.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "High Court Advocate Verification by AMA Legal Solutions",
          "text": "Have an Indian succession and FEMA counsel verify your personal law shares (Hindu, Muslim Wasiyat, Christian, Parsi) and Indian executor powers.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Print on Plain A4 Paper Abroad & Sign with 2 Witnesses",
          "text": "Print the Will on plain white A4 paper in your country of residence and sign in the simultaneous presence of two adult non-beneficiary witnesses under Section 63 of the Indian Succession Act.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Store Safely & Share Copy with Your Indian Executor",
          "text": "Store the signed original safely, provide a copy to your Indian Executor, and optionally apostille or register at the Indian Sub-Registrar office on a future trip.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/service/nri-will-india#faq",
      "mainEntity": NRI_FAQS.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/service/nri-will-india#breadcrumb",
      "itemListElement": [
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
          "item": "https://www.willdrafting.in/service",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "NRI Will Drafting India",
          "item": "https://www.willdrafting.in/service/nri-will-india",
        },
      ],
    },
  ],
};

const FEMA_ASSET_TABLE = [
  {
    assetClass: "Residential Flats, Houses & Commercial Plots",
    femaRule: "Section 6(5) FEMA & Non-Debt Rules, 2019",
    inheritanceStatus: "100% Inheritable by NRIs & OCIs",
    repatriationRule:
      "Sale proceeds credited to NRO account can be repatriated up to USD 1 Million per financial year per heir (up to 2 residential properties).",
  },
  {
    assetClass: "Agricultural Land, Plantation & Farmhouse",
    femaRule: "Rule 24 FEMA (Non-Debt Instruments) Rules, 2019",
    inheritanceStatus: "Inheritable by Will / Succession (Cannot be purchased)",
    repatriationRule:
      "NRIs/OCIs can legally inherit agricultural land under a Will, but any future sale must be made only to a Resident Indian citizen.",
  },
  {
    assetClass: "NRE & FCNR(B) Bank Deposits",
    femaRule: "RBI Master Direction — Deposits & Accounts",
    inheritanceStatus: "100% Freely Repatriable",
    repatriationRule:
      "Principal and interest are fully repatriable. Aligning your NRE/FCNR bank nominee with your Indian Will beneficiary prevents bank freezes.",
  },
  {
    assetClass: "NRO Savings, Fixed Deposits, Demat & Mutual Funds",
    femaRule: "FEMA (Remittance of Assets) Regulations + Supreme Court Shakti Yezdani Rule",
    inheritanceStatus: "100% Inheritable (Will Overrides Nominee)",
    repatriationRule:
      "Requires Death Certificate + Valid Indian Will + Chartered Accountant Certificate (Form 15CB) & Form 15CA for remittance up to USD 1M/year.",
  },
  {
    assetClass: "Undivided Ancestral / HUF Coparcenary Share",
    femaRule: "Section 6 & Section 30 Hindu Succession Act, 1956",
    inheritanceStatus: "100% Bequeathable by Will",
    repatriationRule:
      "An NRI/OCI Hindu coparcener can bequeath their undivided coparcenary share by Will without needing prior partition.",
  },
];

export default function NriWillIndiaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            BREADCRUMB & EDITORIAL AUTHOR ATTRIBUTION BAR (3-Level Silo Hierarchy)
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#172228]/10 text-xs text-[#55636D]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#C65378] transition-colors font-medium">
              Home
            </Link>
            <span>/</span>
            <Link href="/service" className="hover:text-[#C65378] transition-colors font-medium">
              Services
            </Link>
            <span>/</span>
            <span aria-current="page" className="text-[#111827] font-semibold">
              NRI Will Drafting India
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span>
              Written by <strong className="text-[#111827]">WillDrafting Editorial Team</strong>
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              Legally Verified by <strong className="text-[#111827]">AMA Legal Solutions</strong>
            </span>
            <span className="hidden sm:inline">·</span>
            <time dateTime="2026-10-17" className="text-[#6B7280]">
              Updated October 17, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1 < 70 Characters)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>NRI &amp; OCI Estate Planning Hub · USA · UK · UAE · Canada · AU · SG</span>
              </div>

              {/* Single H1: 52 characters (Strictly < 70 chars for Screaming Frog) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Online Will Drafting in India for NRIs &amp; OCIs Abroad
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Under <strong className="text-[#111827]">Section 5 of the Indian Succession Act, 1925</strong> (<em>Lex Situs</em>), succession to immovable property in India is governed strictly by Indian law—regardless of your citizenship or foreign domicile. Draft a separate, lawyer-verified <strong className="text-[#111827]">Indian Will from abroad</strong> so your family never faces 18 months of Section 228 foreign probate re-sealing.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Start My NRI Indian Will</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#country-rules"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Check My Country Rules</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Two-Will Safe Clause</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Plain A4 Signing Abroad</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA &amp; 15CA/CB Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Advocate Verified</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why 1 Global Will Fails in India
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Section 228 Foreign Probate Bottleneck
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>US Living Trusts are not recognized:</strong> Indian Sub-Registrars and housing societies require a statutory Will or Indian court order—not a US Revocable Living Trust.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>DIFC &amp; Abu Dhabi Wills are UAE-only:</strong> UAE expat Wills protect Dubai/Abu Dhabi assets but cannot mutate flats or NRE/NRO accounts in India.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation Risk:</strong> Updating your foreign Will with a standard revocation clause can accidentally cancel your Indian estate plan unless drafted under the Two-Will Strategy.
                  </span>
                </li>
              </ul>
              <Link
                href="/blogs/nri-will-for-indian-property-two-will-strategy"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read the Complete NRI Two-Will Strategy Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COUNTRY TABS & 30-SECOND RISK CHECKER
            ========================================================================= */}
        <NriWillInteractive />

        {/* =========================================================================
            3. EMBEDDED SVG INFOGRAPHIC SECTION (Screaming Frog Compliant)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Comparison</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Infographic: Foreign Will vs. NRI Two-Will Strategy
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a separate Indian Will bypasses foreign probate re-sealing under Section 228 of the Indian Succession Act, 1925 and accelerates NRO repatriation:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/nri-two-will-strategy-infographic.svg"
              alt="NRI Two-Will Strategy Infographic for Indian Property and NRE NRO Assets"
              width={1200}
              height={640}
              className="w-full h-auto rounded-2xl"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Comparison of Indian asset transmission timelines under a Single Foreign Will (Section 228 ISA) vs. a Dedicated Indian Will (Section 63 ISA).
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. FEMA, AGRICULTURAL LAND & USD 1M REPATRIATION MATRIX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>FEMA 1999 &amp; RBI Repatriation Rules</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              FEMA Rules &amp; USD 1 Million Repatriation for NRIs
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Inheriting property in India is 100% tax-free under Section 56(2)(x) of the Income Tax Act, 1961. However, mutating title and wiring sale proceeds abroad through an Authorised Dealer (AD) bank requires strict compliance with the <strong className="text-[#111827]">Foreign Exchange Management Act (FEMA), 1999</strong>:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[24%]">Indian Asset Class</th>
                    <th className="py-4 px-6 w-[24%]">Governing FEMA / Statutory Rule</th>
                    <th className="py-4 px-6 w-[22%]">NRI / OCI Inheritance Status</th>
                    <th className="py-4 px-6 w-[30%]">Repatriation &amp; Bank Release Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {FEMA_ASSET_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors align-top">
                      <td className="py-5 px-6 font-semibold text-[#111827]">{row.assetClass}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.femaRule}</td>
                      <td className="py-5 px-6 font-medium text-[#047857]">{row.inheritanceStatus}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.repatriationRule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. 4-STEP EXECUTION ROADMAP FROM ABROAD
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Section 63 Execution Protocol</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              How NRIs Sign a Valid Indian Will from Abroad
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              You do not need to travel to India or purchase non-judicial stamp paper to make a legally enforceable Indian Will. Follow these 4 statutory steps from your home abroad:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Draft India-Only Will",
                desc: "Enter your Indian flats, plots, NRE/NRO accounts, and Demat folios online. Our engine automatically embeds a Non-Revocation Territorial Clause protecting your foreign Will.",
              },
              {
                step: "02",
                title: "Advocate Verification",
                desc: "An Indian succession advocate at AMA Legal Solutions reviews your draft for Hindu Succession Act, Muslim Wasiyat (1/3rd rule), or Indian Succession Act compliance.",
              },
              {
                step: "03",
                title: "Sign on Plain A4 Paper",
                desc: "Print your court-ready Will PDF on plain A4 paper abroad and sign in the simultaneous presence of two independent adult witnesses (who are not beneficiaries).",
              },
              {
                step: "04",
                title: "Optional Apostille or SRO",
                desc: "Your signed Will is immediately valid under Section 63 ISA. For extra protection, you may get it apostilled locally or register it at an Indian Sub-Registrar on a future visit.",
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
                  <h3 className="text-xl font-semibold text-[#111827] mb-2.5">{item.title}</h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#49585F]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. DEDICATED BLOCK: NRIs HELPING ELDERLY PARENTS IN INDIA
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>For NRIs Supporting Parents in India</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Helping Elderly Parents in India Make Their Will
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                One of the most stressful situations for NRIs in the US, UK, UAE, Canada, and Australia occurs when aging parents in Delhi, Mumbai, Bengaluru, Chennai, Pune, Hyderabad, or Kolkata pass away without a clear Will—leaving NRI children to take repeated international flights for court Succession Certificates and bank KYC clearances.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                With WillDrafting.in, your parents can complete their Will from home using our <strong className="text-[#111827]">Bilingual (English &amp; Hindi) interface and AI Voice Assistant</strong>, attach a Doctor&apos;s Medical Fitness Certificate, and have an <strong className="text-[#111827]">AMA Legal Solutions</strong> advocate verify that every bequest and bank nomination matches.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Arrange a Call for My Parents</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blogs/nominee-vs-legal-heir-india-supreme-court-rule"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Why Bank Nomination Is Not a Will</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. NRI STATUTORY FAQS & RELATED LEGAL GUIDES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>NRI Succession Law FAQs</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions on NRI Wills in India
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear statutory answers prepared by the <strong className="text-[#111827]">WillDrafting Editorial Team</strong> and verified by <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h3 className="text-lg font-semibold text-[#111827] mb-3 leading-snug">
                  {item.q}
                </h3>
                <p className="text-[14.5px] leading-[1.68] text-[#49585F]">{item.a}</p>
              </div>
            ))}
          </div>

          {/* Contextual Internal Links Bar (Descriptive Anchor Text for Screaming Frog) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Indian Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore our statutory guides and transparent pricing tiers for Resident Indians and NRIs:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/service"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Explore Indian Personal Law Will Writing Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Compare Transparent Will Drafting Charges in India</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/blogs/probate-of-will-in-india-2025-amendment-mumbai-chennai-kolkata"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Read the 2025 Probate Amendment Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. AUTHOR & E-E-A-T EDITORIAL VERIFICATION CARD
            ========================================================================= */}
        <section className="w-full p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1">
              Editorial &amp; Statutory Compliance Attribution
            </div>
            <div className="text-base font-semibold text-[#111827] mb-1">
              Authored by WillDrafting Editorial Team · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This guide is prepared in accordance with the Indian Succession Act, 1925, the Hindu Succession Act, 1956, the Muslim Personal Law (Shariat) Application Act, 1937, and the Foreign Exchange Management Act (FEMA), 1999. It is intended for informational purposes and does not substitute individualized cross-border tax counsel.
            </p>
          </div>
          <Link
            href="/aboutus"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] shrink-0"
          >
            <span>Meet Our Estate Planning Advocates</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <CTA />
      <Footer />
    </div>
  );
}
