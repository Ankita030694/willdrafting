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
  Scale,
  Coins,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import IepfRecoveryInteractive from "@/components/IepfRecoveryInteractive";
import CopyableIepfClaimBox from "@/components/CopyableIepfClaimBox";

export const metadata: Metadata = {
  title: {
    absolute: "IEPF Unclaimed Shares Recovery: Deceased | WillDrafting",
  },
  description:
    "Legal advocate service to recover deceased unclaimed shares and bank deposits from IEPF and RBI. High Court succession certificates and IEPF-5 filing.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "iepf unclaimed shares recovery service deceased",
    "recover deceased father shares from iepf lawyer",
    "physical share transmission and demat service",
    "unclaimed bank deposit recovery service",
    "form iepf 5 filing procedure",
    "companies act 2013 section 124 125",
    "iepf rules 2016 refund procedure",
    "sebi transmission master circular 2022",
    "succession certificate for iepf shares",
    "rbi dea fund unclaimed deposit claim",
    "udgam portal unclaimed bank deposit recovery",
    "ama legal solutions iepf practice",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery",
  },
  openGraph: {
    title: "IEPF Unclaimed Shares Recovery: Deceased | WillDrafting",
    description:
      "Legal advocate service to recover deceased unclaimed shares and bank deposits from IEPF and RBI. High Court succession certificates and IEPF-5 filing.",
    url: "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/iepf-unclaimed-shares-bank-recovery-og.jpg",
        width: 1200,
        height: 630,
        alt: "IEPF Unclaimed Shares and Bank Recovery Service High Court Succession Certificate and Demat Credit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEPF Unclaimed Shares Recovery: Deceased | WillDrafting",
    description:
      "Legal advocate service to recover deceased unclaimed shares and bank deposits from IEPF and RBI. High Court succession certificates and IEPF-5 filing.",
    images: ["/images/iepf-unclaimed-shares-bank-recovery-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const IEPF_FAQS = [
  {
    q: "Why do shares get transferred to the IEPF Authority under Indian law?",
    a: "Under Section 124(6) of the Companies Act 2013, if dividends on shares are unpaid or unclaimed for seven years in a row, the company must transfer both the unpaid dividends and the shares to the IEPF.",
  },
  {
    q: "Can legal heirs claim shares of a deceased shareholder from IEPF?",
    a: "Yes. Legal heirs can reclaim these shares. First, heirs must complete share transmission with the company RTA to get an Entitlement Letter. Then, heirs file Form IEPF-5 on the MCA portal.",
  },
  {
    q: "When is a court Succession Certificate mandatory for IEPF claims?",
    a: "Under SEBI and IEPF rules, a court Succession Certificate or Probate is needed if paper shares exceed ₹5 Lakh in value, or demat shares exceed ₹15 Lakh, or if family members dispute the claim.",
  },
  {
    q: "Why do claims handled by non-lawyer recovery brokers often fail?",
    a: "Private brokers charge heavy 15% to 25% fees. But they cannot appear in court. When companies or the IEPF demand a court Succession Certificate, brokers cannot file the court petition, leaving claims stuck.",
  },
  {
    q: "How do families reclaim dormant bank deposits from the RBI DEA Fund?",
    a: "Bank accounts and fixed deposits inactive for over ten years transfer to the RBI DEA Fund under Section 26A of the Banking Regulation Act. Legal heirs can claim the money back through their bank branch using UDGAM portal search records and succession papers.",
  },
  {
    q: "What role does Form ISR-4 play in physical share transmission?",
    a: "Companies no longer print paper share certificates for duplicate or transmission claims. Instead, the RTA issues a Letter of Confirmation via Form ISR-4. You submit this letter to your depository participant to credit the shares into your demat account.",
  },
  {
    q: "What is the typical timeline to recover shares from IEPF?",
    a: "Standard IEPF recovery takes 4 to 8 months. This includes RTA share transmission (30 to 45 days), court succession orders if needed (60 to 90 days), and company verification with MCA approval (60 days under Rule 7).",
  },
  {
    q: "How are name spelling mismatches resolved for deceased shareholders?",
    a: "If the name on old share certificates differs slightly from government IDs, our advocates draft a Name Variation Affidavit sworn before a Notary or Magistrate, backed by newspaper ads if required.",
  },
];

const IEPF_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery#webpage",
      url: "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery",
      name: "IEPF Unclaimed Shares Recovery: Deceased | WillDrafting",
      description:
        "Legal advocate service to recover deceased unclaimed shares and bank deposits from IEPF and RBI. High Court succession certificates and IEPF-5 filing.",
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
        url: "https://www.willdrafting.in/images/iepf-unclaimed-shares-bank-recovery-og.jpg",
        width: 1200,
        height: 630,
        caption:
          "IEPF Unclaimed Shares and Bank Recovery Service High Court Succession Certificate and Demat Credit",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery#legalservice",
      name: "AMA Legal Solutions IEPF & Unclaimed Securities Practice",
      url: "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/iepf-unclaimed-shares-bank-recovery-og.jpg",
      description:
        "Pan-India legal representation for IEPF unclaimed shares recovery, RBI DEA fund bank deposit claims, RTA transmission, and High Court succession certificates.",
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
        { "@type": "AdministrativeArea", name: "West Bengal" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery#service",
      name: "IEPF Unclaimed Shares, Dividends & Bank Deposit Legal Recovery Service",
      serviceType:
        "IEPF Share Recovery, Form IEPF-5 E-Filing, Succession Certificate & Demat Credit",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IEPF Unclaimed Shares & Bank Deposit Recovery Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "14990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "RBI DEA Fund & Unclaimed Bank Deposit Recovery",
              description:
                "UDGAM portal search audit, deceased claim documentation, Form A/B indemnity bonds, and base branch legal representation.",
            },
          },
          {
            "@type": "Offer",
            price: "24990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Physical Share Transmission & RTA Entitlement Processing",
              description:
                "SEBI Form ISR-1, ISR-2, ISR-4 filing, duplicate share procedure, Gazette name rectification, and RTA Entitlement Letter procurement.",
            },
          },
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Integrated Court Succession Certificate & MCA Form IEPF-5 Recovery",
              description:
                "End-to-end representation: Civil court petition for Succession Certificate, MCA Form IEPF-5 e-filing, Nodal Officer verification, and Demat credit.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery#howto",
      name: "How Legal Heirs Recover Deceased Unclaimed Shares from IEPF in India",
      description:
        "Four-step statutory protocol to transmit shares, secure court succession certificates, file Form IEPF-5, and credit demat accounts under Companies Act 2013.",
      totalTime: "P120D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Folio Audit & RTA Transmission",
          "text": "Identify company folios, submit Form ISR-1, ISR-2, and execute Form B Indemnity Bond with the company RTA to obtain an Entitlement Letter.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Court Succession Certificate or Probate",
          "text": "Petition the competent civil court under Section 372 of the Indian Succession Act for portfolios exceeding statutory thresholds.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "MCA Form IEPF-5 E-Filing",
          "text": "Upload Form IEPF-5 on the MCA portal, pay statutory challans, and serve physical verification packets to the company Nodal Officer.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Demat Crediting & Dividend Repatriation",
          "text": "The IEPF Authority sanctions the refund, transferring shares directly to the claimant's demat account and unpaid dividends to the verified bank account.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery#faq",
      mainEntity: IEPF_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery#breadcrumb",
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
          "name": "IEPF Unclaimed Shares Recovery Service",
          "item":
            "https://www.willdrafting.in/services/iepf-unclaimed-shares-bank-recovery",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Legal Qualification",
    brokers: "Unlicensed agents and commission brokers",
    diy: "Claimant filing alone without legal help",
    amaLegal: "Licensed High Court advocates & legal counsel",
  },
  {
    feature: "Succession Certificate (>₹15L)",
    brokers: "Cannot file court petitions; claims get stuck",
    diy: "Must find and pay a separate court lawyer",
    amaLegal: "Direct court filing for Succession Certificate",
  },
  {
    feature: "Commercial Fee Structure",
    brokers: "High cut of 15% to 25% of your total share value",
    diy: "Uncertain costs for stamps, notary, and court fees",
    amaLegal: "Clear, fixed fees tied to project milestones",
  },
  {
    feature: "RTA Defect Rectification",
    brokers: "Frequent rejections for name or signature errors",
    diy: "Long postal delays and repeated objection letters",
    amaLegal: "Direct lawyer follow-up and fast affidavit drafting",
  },
  {
    feature: "MCA Form IEPF-5 Approval",
    brokers: "High rejection rate due to faulty document sets",
    diy: "Risk of claim rejection under strict 60-day limits",
    amaLegal: "Careful e-filing with company Nodal Officer tracking",
  },
  {
    feature: "Demat Credit Guarantee",
    brokers: "No help once broker takes upfront fees",
    diy: "Stuck getting the demat Letter of Confirmation",
    amaLegal: "Complete support until shares show in your demat",
  },
];

export default function IepfUnclaimedSharesRecoveryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(IEPF_SCHEMA) }}
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
              IEPF Unclaimed Shares Recovery Service
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
            1. HERO SECTION (Single Strict H1: 53 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Form IEPF-5 · Demat Transmission
                </span>
              </div>

              {/* Single H1: 53 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                IEPF Unclaimed Shares &amp; Bank Deposit Recovery Lawyers
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over ₹1.8 Lakh Crore sits locked in the IEPF and RBI DEA Fund.
                When dividends go unpaid for seven years, companies transfer the
                shares to the government. Families face rejected claims due to lost
                share certificates, name mismatches, or missing court orders. Our
                High Court advocates help you get court succession orders, complete
                RTA share transfer, file Form IEPF-5, and credit shares to your demat account.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Recovery Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#broker-vs-advocate"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Advocate vs Broker</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Companies Act Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Contingency Cut</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Succession Order</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Direct Demat Crediting</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why DIY IEPF Claims Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Form IEPF-5 and Succession Certificate Trap
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Court Orders Are Required:</strong> Companies and the
                    IEPF reject claims over ₹5 Lakh for paper shares or ₹15 Lakh
                    for demat shares without a court Succession Certificate or Probate.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Entitlement Letter Needed First:</strong> You cannot file
                    Form IEPF-5 directly. You must first complete share transmission
                    with the company RTA and get an Entitlement Letter.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Broker Commission Risks:</strong> Private brokers take
                    15% to 25% cuts. Yet they cannot represent you in court when
                    legal orders are needed.
                  </span>
                </li>
              </ul>
              <Link
                href="/tools/unclaimed-assets-search-roadmap-tool"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Launch Free Unclaimed Assets Search Roadmap</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <IepfRecoveryInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Statutory Asset Recovery Overview</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: IEPF Recovery Architecture
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              See how our lawyers combine court succession orders,
              RTA share transfer, and Form IEPF-5 filing to recover
              your family wealth into your demat account:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/iepf-unclaimed-shares-bank-recovery-og.jpg"
              alt="IEPF Unclaimed Shares and Bank Recovery Service High Court Succession Certificate and Demat Credit"
              width={1200}
              height={630}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Steps to recover shares from IEPF
                under the Companies Act 2013 and SEBI transmission rules.
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
        <section id="broker-vs-advocate" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Service Model Comparison</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Broker vs High Court Advocate: Recovery Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Recovering IEPF shares needs both company paperwork and court
              filings. Compare how brokers, direct claimants, and High Court
              advocates handle recovery:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Recovery Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Unregulated Brokers
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Direct DIY Filing
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      AMA Legal Solutions
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
                        {row.brokers}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.diy}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.amaLegal}
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
              <span>Statutory Execution Lifecycle</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory 4-Step Roadmap: Folio to Demat Credit
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Recovering shares from IEPF follows four clear steps under the
              Companies Act and SEBI rules. Our advocates guide you through every step:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Folio Check & RTA Transfer",
                desc: "We check share folio numbers and dividend records. We submit Form ISR-1, ISR-2, and indemnity bonds to the company RTA to get your official Entitlement Letter.",
              },
              {
                step: "02",
                title: "Court Succession Certificate",
                desc: "For share portfolios over ₹5 Lakh or when heirs lack a Will, our advocates file a petition before the civil court to obtain a legal Succession Certificate.",
              },
              {
                step: "03",
                title: "MCA Form IEPF-5 Filing",
                desc: "We prepare and upload Form IEPF-5 on the MCA portal, pay government challans, and send verified paper sets to the company Nodal Officer.",
              },
              {
                step: "04",
                title: "Demat Credit & Cash Payout",
                desc: "The IEPF Authority approves the claim. Your shares are credited directly to your demat account, and unpaid cash dividends are sent to your bank.",
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
            6. ESSENTIAL LEGAL CLAUSE & CHECKLIST BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Statutory Compliance Formats</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Mandatory Indemnity Bond and Legal Affidavit Clauses
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Rule 7 of the IEPF Rules 2016 requires every claimant to sign an
              Indemnity Bond on stamp paper. This bond protects against rival
              claims. Read our advocate-verified clause below:
            </p>
          </div>

          {/* Copyable Box Component */}
          <CopyableIepfClaimBox
            title="IEPF Rule 7 Statutory Indemnity Bond Verification Clause"
            code={`INDEMNITY BOND FOR CLAIM OF SHARES / DIVIDENDS FROM IEPF AUTHORITY
(To be executed on non-judicial stamp paper of appropriate state value and notarized)

I/We, [Full Name of Claimant], son/daughter of [Late Father/Mother Name], residing at [Permanent Address], do hereby solemnly affirm and state as follows:

1. WHEREAS [Number of Shares] equity shares of face value ₹[X] each of M/s [Company Name Ltd], registered under Folio No. [Folio Number], along with unpaid dividends, were transferred to the Investor Education and Protection Fund (IEPF) Authority pursuant to Section 124(6) of the Companies Act, 2013;

2. AND WHEREAS the original registered holder, Late [Deceased Name], passed away on [Date of Death], leaving behind the Claimant(s) as lawful surviving legal heirs, as evidenced by [Death Certificate / Succession Certificate / Legal Heir Certificate No.];

3. NOW THEREFORE, in consideration of the IEPF Authority releasing and transferring the said shares and accumulated dividends to my active Demat Account No. [DP ID & Client ID], I/We hereby jointly and severally agree to indemnify and hold harmless the IEPF Authority, the Central Government, and M/s [Company Name Ltd] against all actions, suits, claims, costs, losses, and damages which may be brought against or incurred by them by reason of such transfer or release to me.`}
            explanation="This clause strictly follows Schedule II of the IEPF Rules 2016 and SEBI Form B transmission guidelines. The bond must be signed on state stamp paper, witnessed by two adult witnesses, and notarized."
          />

          {/* SEBI Form ISR-4 Transmission Checklist Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <div className="lg:col-span-12 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <h3 className="text-lg font-semibold text-[#111827] mb-3">
                SEBI Form ISR-4 &amp; Demat Transmission Checklist
              </h3>
              <p className="text-xs text-[#55636D] mb-4">
                The RTA issues an Entitlement Letter or Letter of Confirmation
                only when all listed documents are provided:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-[13.5px] text-[#374151]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Form ISR-1:</strong> Registering PAN, KYC details,
                    bank account particulars, and mobile number.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Form ISR-2:</strong> Bank verification of
                    claimant signature with branch seal and employee code.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Form ISR-4:</strong> Request to issue Letter
                    of Confirmation for demat credit.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Client Master List (CML):</strong> Active demat
                    statement verified by your broker or depository.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Original Share Certificates:</strong> Physical
                    certificates, or police lost report and newspaper ad if lost.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>
                    <strong>Court Succession Order:</strong> Succession
                    Certificate or Probate when portfolio exceeds statutory limits.
                  </span>
                </div>
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
                  Need to Calculate Court Fees for a Succession Certificate?
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55636D]">
                  Use our free tool to find the exact court fee and stamp duty
                  payable in your state before filing a court petition.
                </p>
              </div>
            </div>
            <Link
              href="/tools/succession-certificate-court-fee-calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors shrink-0"
            >
              <span>Calculate Court Fees</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            7. STATUTORY GOVERNANCE & PRECEDENTS SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Scale className="w-4 h-4" />
                <span>Statutory Authority &amp; Landmark Framework</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Companies Act 2013: Sections 124 and 125 Governance
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Section 124(5) of the Companies Act 2013, any dividend
                unpaid for seven years moves to the IEPF. In addition, Section
                124(6) states that shares with unpaid dividends for seven straight
                years must also move to the IEPF.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under Rule 7 of the IEPF Rules 2016, the Authority refunds
                shares and dividends only to verified owners or legal heirs.
                By combining court succession orders with RTA Entitlement Letters,
                our advocates help families avoid long delays and claim back their assets.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Advocate Asset Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Will to Prevent Asset Forfeiture</span>
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
              <span>Asset Recovery FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: IEPF and Bank Claims
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
            {IEPF_FAQS.map((item, idx) => (
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
                Related Indian Succession &amp; Securities Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore court succession steps, probate counsel, and share
                transmission tools:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/succession-certificate"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Succession Certificate Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Probate of Will Legal Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/letters-of-administration-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Letters of Administration Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/demat-mutual-fund-transmission-document-finder"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Demat Transmission Document Finder</span>
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
              This legal guide is based on the Companies Act, 2013, the IEPF
              Rules, 2016, SEBI transmission circulars, the Banking Regulation
              Act, 1949, and the Indian Succession Act, 1925. This content is for
              legal education and does not replace direct advocate advice.
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
