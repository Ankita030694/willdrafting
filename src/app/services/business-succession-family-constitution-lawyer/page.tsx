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
  Users,
  Landmark,
  Calculator,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import BusinessSuccessionInteractive from "@/components/BusinessSuccessionInteractive";
import CopyableSuccessionClauseBox from "@/components/CopyableSuccessionClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Family Business Succession Lawyer in India | WillDrafting",
  },
  description:
    "Advocate counsel for family business succession planning lawyer india. Harmonize your Will with company AoA, SHA, and LLP agreements under Companies Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "family business succession planning lawyer india",
    "promoter succession planning india",
    "family constitution drafting lawyer",
    "MSME proprietorship partnership succession will",
    "articles of association share transmission table f",
    "section 56 companies act 2013 transmission lawyer",
    "section 42c indian partnership act dissolution",
    "shakti yezdani v jayanand salgaonkar supreme court",
    "shareholders agreement succession clause advocate",
    "promoter private family trust formation",
    "family council charter dispute resolution",
    "ama legal solutions business succession practice",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer",
  },
  openGraph: {
    title: "Family Business Succession Lawyer in India | WillDrafting",
    description:
      "Advocate counsel for family business succession planning lawyer india. Harmonize your Will with company AoA, SHA, and LLP agreements under Companies Act.",
    url: "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/business-succession-family-constitution-lawyer-og.jpg",
        width: 1200,
        height: 630,
        alt: "Family Business Succession Planning and Family Constitution Lawyer India Corporate Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Business Succession Lawyer in India | WillDrafting",
    description:
      "Advocate counsel for family business succession planning lawyer india. Harmonize your Will with company AoA, SHA, and LLP agreements under Companies Act.",
    images: [
      "/images/business-succession-family-constitution-lawyer-og.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const SUCCESSION_FAQS = [
  {
    q: "Does a nominee of company shares become the absolute legal owner after a promoter dies?",
    a: "No. A nominee is only a temporary caretaker under Section 72 of the Companies Act, 2013. In Shakti Yezdani (2023 SC), the Supreme Court ruled that nominees hold shares in trust for the legal heirs named in the promoter's Will.",
  },
  {
    q: "What happens to a partnership firm if a partner dies without a succession clause?",
    a: "Under Section 42(c) of the Indian Partnership Act, 1932, a partnership firm dissolves on a partner's death. The firm cannot operate bank accounts unless the partnership deed has an express continuity clause.",
  },
  {
    q: "Can a legal heir automatically become a director in a private limited company?",
    a: "No. A Will transfers equity shares, not a board seat. Directorship cannot be inherited. To secure a board seat, the company Articles of Association (AoA) and Shareholders Agreement (SHA) must include board nomination terms.",
  },
  {
    q: "Is a Family Constitution legally binding in Indian courts?",
    a: "A Family Constitution combines moral rules with binding contracts. Governance protocols guide family harmony. When backed by voting pacts, AoA amendments, and private trusts, Indian courts enforce them under the Indian Contract Act, 1872.",
  },
  {
    q: "How does Keyman Insurance protect business succession during a promoter transition?",
    a: "Keyman Insurance pays cash directly to the company if a key promoter passes away. The firm uses this money to settle capital dues, buy back shares from non-working heirs, and reassure lenders without selling company assets.",
  },
  {
    q: "Does transmission of corporate shares to legal heirs attract capital gains tax in India?",
    a: "No. Under Section 47(iii) of the Income Tax Act, 1961, passing assets through a Will carries zero capital gains tax. Stamp duty on share transmission is also minimal compared to ordinary share sales.",
  },
  {
    q: "How do you prevent deadlock between active working and non-working sibling heirs?",
    a: "Our advocates create two share classes in the AoA. Working heirs receive equity with management rights. Non-working heirs receive preference shares or regular dividends guaranteed by written profit distribution rules.",
  },
  {
    q: "What happens to a sole proprietorship GST registration and input tax credit on death?",
    a: "A proprietorship PAN and GSTIN close upon death. However, under GST Circular 96/15/2019-GST and Section 18(6) of the CGST Act, the business can transfer to an heir. Accumulated tax credits transfer via Form GST ITC-02 with a valid Will.",
  },
];

const SUCCESSION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer#webpage",
      url: "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer",
      name: "Family Business Succession Lawyer in India | WillDrafting",
      description:
        "Advocate counsel for family business succession planning lawyer india. Harmonize your Will with company AoA, SHA, and LLP agreements under Companies Act.",
      datePublished: "2026-10-28",
      dateModified: "2026-10-28",
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
        url: "https://www.willdrafting.in/images/business-succession-family-constitution-lawyer-og.jpg",
        width: 1200,
        height: 630,
        caption:
          "Family Business Succession Planning and Family Constitution Lawyer India Corporate Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer#legalservice",
      name: "AMA Legal Solutions Business Succession & Family Constitution Practice",
      url: "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/business-succession-family-constitution-lawyer-og.jpg",
      description:
        "Pan-India commercial and promoter estate planning legal counsel specializing in corporate succession, Table F AoA harmonization, family constitutions, and LLP continuity under the Companies Act 2013.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Delhi NCR" },
        { "@type": "AdministrativeArea", name: "Maharashtra" },
        { "@type": "AdministrativeArea", name: "Karnataka" },
        { "@type": "AdministrativeArea", name: "Gujarat" },
        { "@type": "AdministrativeArea", name: "Tamil Nadu" },
        { "@type": "AdministrativeArea", name: "Telangana" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer#service",
      name: "Promoter Business Succession Planning, Family Constitution & AoA Harmonization",
      serviceType:
        "Corporate Business Succession Planning, Family Constitution Drafting & Promoter Estate Counsel",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Promoter Business Succession & Corporate Continuity Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "24990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "MSME & Partnership Firm Section 42(c) Continuity Audit",
              description:
                "Partnership deed amendment with non-dissolution clauses under Section 42(c), going-concern proprietorship Will drafting, and GST ITC-02 continuity planning.",
            },
          },
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Pvt Ltd Equity & Board Transmission Harmonization Plan",
              description:
                "Harmonization of personal promoter Will with company Articles of Association (Table F Regulations 23-27), SHA pre-emption covenants, and board seat continuity resolutions.",
            },
          },
          {
            "@type": "Offer",
            price: "99990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Multi-Generational Family Constitution & Promoter Trust Formation",
              description:
                "Comprehensive Family Constitution drafting, Family Council charter establishment, voting trust structuring under the Indian Trusts Act, and arbitration dispute resolution protocols.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer#howto",
      name: "How Promoters Execute Seamless Business Succession in India",
      description:
        "Four-step statutory protocol to align personal testamentary Wills with corporate constitutional documents and family governance accords.",
      totalTime: "P14D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Corporate & Personal Asset Audit",
          "text": "Audit promoter equity holdings, demat folios, partnership capital accounts, directorship mandates, and bank personal guarantees.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "AoA, SHA & Partnership Deed Harmonization",
          "text": "Amend corporate constitutional documents to align with Section 56 transmission norms and insert Section 42(c) non-dissolution covenants.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Family Constitution & Governance Charter",
          "text": "Draft a multi-generational Family Constitution defining Family Council powers, next-gen qualification criteria, and dispute mediation rules.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Board Transmission Resolutions & MCA Filings",
          "text": "Prepare board transmission resolutions, Form SH-4 indemnity formats, DPIN appointments, and MCA regulatory filings for smooth handover.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer#faq",
      mainEntity: SUCCESSION_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer#breadcrumb",
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
          "name": "Family Business Succession Lawyer India",
          "item":
            "https://www.willdrafting.in/services/business-succession-family-constitution-lawyer",
        },
      ],
    },
  ],
};

const SUCCESSION_COMPARISON_ROWS = [
  {
    metric: "Default Status on Demise",
    proprietorship: "Immediate shutdown. PAN and GSTIN cancel right away.",
    partnership: "Automatic closure under Section 42(c) unless deed stops it.",
    pvtLtd: "Company lives on. Shares pass to the legal estate.",
    familyTrust: "Never closes. Trustees hold assets for family heirs.",
  },
  {
    metric: "Transmission of Equity",
    proprietorship: "Needs a business Will and Form GST ITC-02 filing.",
    partnership: "Capital account is repaid. Heirs need partner approval.",
    pvtLtd: "Board transmits shares under Section 56 and Table F.",
    familyTrust: "Direct asset transfer without court or probate delays.",
  },
  {
    metric: "Managerial Board Control",
    proprietorship: "Passes to the sole heir named in the Will.",
    partnership: "Heirs have no vote unless partners admit them.",
    pvtLtd: "Shares do not give a board seat without AoA terms.",
    familyTrust: "Managed by chosen trustees and the family council.",
  },
  {
    metric: "Operational Freeze Risk",
    proprietorship: "Very high. Bank accounts and supply orders freeze.",
    partnership: "High. Banks freeze drawing accounts upon notice.",
    pvtLtd: "Medium risk. Board stalls if heirs fight over shares.",
    familyTrust: "Zero risk. Trust accounts operate without delay.",
  },
  {
    metric: "Recommended Legal Tools",
    proprietorship: "Business Will and a plan to convert into a Pvt Ltd.",
    partnership: "Amended Partnership Deed (Sec 42c) and Keyman policy.",
    pvtLtd: "Aligned Will, restated Table F AoA, and signed SHA.",
    familyTrust: "Registered Trust Deed and family holding company.",
  },
  {
    metric: "Tax & Capital Gains Risk",
    proprietorship: "Zero capital gains tax under Section 47(iii).",
    partnership: "Capital account settlement is tax-free under income tax law.",
    pvtLtd: "Tax-free transfer under Section 47(iii) for Will heirs.",
    familyTrust: "Tax-neutral transfer to a private family trust.",
  },
];

export default function BusinessSuccessionFamilyConstitutionLawyerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SUCCESSION_SCHEMA) }}
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
              Family Business Succession Planning Lawyer India
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
            <time dateTime="2026-10-28" className="text-[#6B7280]">
              Updated October 28, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 56 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  Promoter Estate Counsel · Table F Harmonization · Pan-India Practice
                </span>
              </div>

              {/* Single H1: 56 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Family Business Succession &amp; Family Constitution Lawyers
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                A business can freeze when a promoter passes away. Banks block
                company accounts when leadership is unclear. Board meetings
                stall without named directors. Co-founders may also block share
                transfers using pre-emption rules. Our High Court advocates align
                personal Wills with company Articles of Association (AoA) and
                Shareholders Agreements (SHA). We protect your business under the
                Companies Act, 2013 and Indian Partnership Act, 1932.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Business Succession Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#enterprise-comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Enterprise Succession</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Companies Act Table F</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Operational Freeze</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Keyman &amp; Trust Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Corporate High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Standard Wills Fail for Business Promoters
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Corporate Law vs Succession Act Conflict
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>AoA Rules Overrule a Will:</strong> Company Articles
                    control share transfers. If your Will violates Table F
                    Regulations 23 to 27, the board can reject your heirs.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>A Nominee Is Not an Owner:</strong> In Shakti Yezdani
                    (2023 SC), the Supreme Court ruled that nominees only hold
                    shares in trust. Heirs face court battles without a clear
                    Will.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>The Partnership Dissolution Trap:</strong> Under
                    Section 42(c), a partnership firm closes on a partner&apos;s
                    death. Only an express continuity clause keeps the firm open.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/private-family-trust-formation"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Private Family Trust Structures</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <BusinessSuccessionInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Documentation</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Business Succession &amp; Governance
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How our advocates align personal Wills, Articles of Association,
              Shareholders Agreements, and Family Constitutions under the
              Companies Act, 2013:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/business-succession-family-constitution-lawyer-og.jpg"
              alt="Family Business Succession Planning and Family Constitution Lawyer India Corporate Counsel"
              width={1200}
              height={630}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Promoter Estate Governance,
                Table F AoA Harmonization, and Family Constitution Drafting under
                Indian Corporate Laws.
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
        <section id="enterprise-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Succession Across Indian Enterprise Structures
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Different business forms have different rules when a founder
              dies. Compare how Indian law treats Sole Proprietorships,
              Partnerships, Private Limited Companies, and Family Trusts:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Legal Metric</th>
                    <th className="py-4 px-6 w-[20%]">Sole Proprietorship</th>
                    <th className="py-4 px-6 w-[20%]">Partnership Firm</th>
                    <th className="py-4 px-6 w-[20%]">Private Limited Co.</th>
                    <th className="py-4 px-6 w-[20%]">Family Holding Trust</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {SUCCESSION_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.metric}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.proprietorship}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.partnership}
                      </td>
                      <td className="py-5 px-6 text-[#172228]">
                        {row.pvtLtd}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.familyTrust}
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
              <span>Promoter Succession Protocol</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory 4-Step Promoter Succession Protocol
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our corporate advocates follow a four-step path to protect your
              company assets and keep your business running smoothly:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Corporate & Estate Audit",
                desc: "We review company AoA clauses, SHA covenants, demat accounts, and bank loan guarantees. We trace all equity holdings.",
              },
              {
                step: "02",
                title: "Constitutional Harmonization",
                desc: "We amend company Articles of Association under Table F. We also update partnership deeds with Section 42(c) continuity terms.",
              },
              {
                step: "03",
                title: "Family Constitution Charter",
                desc: "We hold family consensus talks. We draft a clear Family Constitution and set up a Family Council for next-generation leaders.",
              },
              {
                step: "04",
                title: "Board & Regulatory Execution",
                desc: "We prepare board transmission resolutions and Form SH-4 indemnity filings. This transfers shares quickly without probate delays.",
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
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Essential Promoter Testamentary Equity Clause
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A standard Will leaving &ldquo;all my assets&rdquo; fails for company
              shares. Banks and company boards reject vague wording. A promoter
              Will must list specific demat client IDs, share numbers, and
              Table F transmission rules:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <CopyableSuccessionClauseBox
                title="Table F Harmonized Promoter Equity Bequest Clause"
                code={`"I HEREBY BEQUEATH my entire equity shareholding, comprising [Number] fully paid-up Equity Shares of face value INR [Value] each, registered under Client ID [Number] and DP ID [Number] with [Depository Name], in [Company Name Private Limited] (CIN: [Number]), together with all dividend entitlements, voting powers, and governance rights appurtenant thereto, unto my designated successor [Name of Successor Heir], absolutely and forever.

AND I DIRECT the Board of Directors of the said Company to effectuate the transmission of the said equity shares in favor of the said legatee in terms of Section 56 of the Companies Act, 2013 read with Regulations 23 to 27 of Table F of the Articles of Association, without demanding Letters of Administration or Court Probate, upon verification of this Will and submission of customary indemnity bonds.

FURTHERMORE, in the event of any conflict between the terms of any Shareholders' Agreement (SHA) and this testamentary bequest, I direct my Executors to exercise the pre-agreed voting rights to give full effect to this continuity plan."`}
                explanation="This clause explicitly references Section 56 of the Companies Act, 2013 and Table F Articles of Association, preventing surviving directors from demanding probate or withholding share transmission."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Promoter Continuity Demarcation Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential corporate audit items required before executing a
                  business succession Will:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demat &amp; Physical Folios:</strong> Specific client
                      IDs, DP IDs, and distinctive share certificate ranges.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>AoA Pre-emption Waiver:</strong> Board resolution or
                      amendment waiving Right of First Refusal (ROFR) for family heirs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Director Nomination Covenant:</strong> Entitlement
                      in SHA for heir to nominate an alternate or nominee director.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Keyman Insurance Liquidity:</strong> Corporate policy
                      to fund buybacks of non-active siblings without depleting cash.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors text-center"
                >
                  <span>Request Custom Succession Review</span>
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
                  Need to Map Family Legal Heir Shares Across Assets?
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55636D]">
                  Use our free succession calculator to evaluate legal heir
                  entitlements under personal succession laws before locking
                  corporate equity bequests.
                </p>
              </div>
            </div>
            <Link
              href="/tools/succession-calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors shrink-0"
            >
              <span>Calculate Succession Shares</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            7. CORPORATE CONFLICT RESOLUTION & FAMILY CONSTITUTION SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Multi-Generational Business Governance</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Family Constitution &amp; Corporate Conflict Resolution
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Most Indian family businesses face severe conflict in the second
                or third generation. Fights occur when non-working relatives
                demand big cash payouts while active leaders reinvest profits.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                A Family Constitution prevents these disputes. It sets up a
                Family Council for family peace and a Corporate Board for
                business growth. Supported by private trusts under the Indian
                Trusts Act, 1882, your company stays protected from bitter
                lawsuits.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors text-center"
              >
                <span>Book Advocate Corporate Succession Review</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Will for Personal Estate</span>
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
              <span>Succession Law FAQs</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Business Succession
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Direct legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court corporate counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUCCESSION_FAQS.map((item, idx) => (
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
                Related Commercial &amp; Estate Legal Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related estate planning, trust structuring, and family
                settlement services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/private-family-trust-formation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Private Family Trust Formation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/family-settlement-deed-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Family Settlement Deed Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate &amp; Estate Administration</span>
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
              Editorial &amp; Statutory Compliance Attribution
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
              This legal guide is prepared under the Companies Act, 2013, the
              Indian Partnership Act, 1932, the Limited Liability Partnership
              Act, 2008, the Indian Succession Act, 1925, and the Indian Trusts
              Act, 1882. Judicial precedents cited include Shakti Yezdani v.
              Jayanand Salgaonkar (2023 SC) and World Wide Agencies v. Margarat
              T. Desor. This content provides statutory education and does not
              constitute individualized advocate counsel.
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
