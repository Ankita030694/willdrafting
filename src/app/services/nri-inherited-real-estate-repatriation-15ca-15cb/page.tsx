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
  Scale,
  Building2,
  Coins,
  AlertCircle,
  Globe,
  FileText,
  BadgePercent,
  Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriRepatriationInteractive from "@/components/NriRepatriationInteractive";
import CopyableTrustClauseBox from "@/components/CopyableTrustClauseBox";

// Strict SEO compliance: Title strictly 30-60 chars, Meta Description strictly 70-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "NRI Property Sale & Repatriation Lawyer | WillDrafting", // exactly 54 characters
  },
  description:
    "End-to-end legal and tax services for NRIs selling inherited Indian property. Lower TDS certificate (Form 13), Form 15CA/15CB, and foreign repatriation.", // exactly 152 characters
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "nri property sale repatriation form 15ca 15cb lawyer",
    "form 13 lower tds certificate advocate nri",
    "remit inherited money abroad rbi lawyer",
    "1 million dollar repatriation fema service india",
    "nri property sale tax consultant india",
    "section 195 tds on nri property sale",
    "section 197 lower tax deduction certificate",
    "nro to foreign bank wire lawyer india",
    "fema remittance of assets regulations 2016",
    "nri power of attorney property sale registration",
    "form 15cb chartered accountant certificate udin",
    "ama legal solutions nri property repatriation",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb",
      "x-default":
        "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb",
    },
  },
  openGraph: {
    title: "NRI Property Sale & Repatriation Lawyer | WillDrafting",
    description:
      "End-to-end legal and tax services for NRIs selling inherited Indian property. Lower TDS certificate (Form 13), Form 15CA/15CB, and foreign repatriation.",
    url: "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/nri-inherited-real-estate-repatriation-15ca-15cb-og.jpg",
        width: 1200,
        height: 675,
        alt: "NRI Inherited Real Estate Sale Repatriation Form 15CA 15CB Lawyer India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Property Sale & Repatriation Lawyer | WillDrafting",
    description:
      "End-to-end legal and tax services for NRIs selling inherited Indian property. Lower TDS certificate (Form 13), Form 15CA/15CB, and foreign repatriation.",
    images: [
      "https://www.willdrafting.in/images/nri-inherited-real-estate-repatriation-15ca-15cb-og.jpg",
    ],
    site: "@willdrafting",
    creator: "@willdrafting",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_REPATRIATION_FAQS = [
  {
    q: "How much TDS is deducted when an NRI sells inherited property in India?",
    a: "Under Section 195 of the Income Tax Act, buyers must deduct 20% Long Term Capital Gains tax plus applicable surcharge and 4% cess. This brings the total TDS deduction to 20.8% or up to 23.92% on the gross sale price if you do not have a lower deduction certificate.",
  },
  {
    q: "How does a Section 197 Lower TDS Certificate (Form 13) protect NRI funds?",
    a: "A Section 197 certificate issued by the Income Tax Department allows the buyer to deduct tax only on actual capital gains rather than the full sale price. This prevents 20% to 23.92% of your total property value from being locked up with the tax department for 12 to 18 months.",
  },
  {
    q: "What is the difference between Form 15CA and Form 15CB for foreign wire transfers?",
    a: "Form 15CB is a statutory certificate issued by a Chartered Accountant with a unique UDIN. It verifies that all Indian taxes on the property sale are paid. Form 15CA (Part C) is an online declaration filed by the remitter on the tax portal quoting the 15CB certificate.",
  },
  {
    q: "How much inherited money can an NRI repatriate abroad every financial year?",
    a: "Under RBI FEMA Regulations 2016, an NRI or OCI can remit up to USD 1 Million per financial year from their NRO account. The funds must come from an inherited asset, sale of property, or personal savings, supported by Form 15CA and Form 15CB certifications.",
  },
  {
    q: "Can an NRI sell inherited property in India without traveling in person?",
    a: "Yes. You can execute a Special Power of Attorney (PoA) in your country of residence. You get it notarized or attested by the Indian Consulate or Embassy. When received in India, our lawyers have it stamped and registered with the Sub-Registrar within 90 days.",
  },
  {
    q: "How is the cost of acquisition calculated for inherited Indian property?",
    a: "Under Section 49(1) of the Income Tax Act, the purchase cost to the previous deceased owner is deemed your cost. If acquired before April 1, 2001, you can use the Fair Market Value as of April 1, 2001, supported by a government-approved valuer report for indexation.",
  },
  {
    q: "Can an NRI claim capital gains tax exemption under Section 54EC bonds?",
    a: "Yes. An NRI seller can invest up to ₹50 Lakhs of their net capital gains in specified bonds like REC, PFC, or NHAI within 6 months of the sale date. This investment is fully exempt from long-term capital gains tax under Section 54EC.",
  },
  {
    q: "Why do NRIs need both a High Court advocate and a CA for property sales?",
    a: "A Chartered Accountant can file tax forms but cannot verify land title, check municipal revenue records, or draft sale deeds. Local property brokers do not understand RBI FEMA rules. WillDrafting provides an integrated legal and tax retainer with senior advocates and CAs.",
  },
];

const REPATRIATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb#webpage",
      url: "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb",
      name: "NRI Property Sale & Repatriation Lawyer | WillDrafting",
      description:
        "End-to-end legal and tax services for NRIs selling inherited Indian property. Lower TDS certificate (Form 13), Form 15CA/15CB, and foreign repatriation.",
      datePublished: "2026-11-12",
      dateModified: "2026-11-12",
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
        url: "https://www.willdrafting.in/images/nri-inherited-real-estate-repatriation-15ca-15cb-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "NRI Inherited Real Estate Sale Repatriation Form 15CA 15CB Lawyer India",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb#breadcrumb",
      },
    },
    {
      "@type": ["Service", "LegalService"],
      "@id":
        "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb#service",
      name: "NRI Inherited Property Sale, Lower TDS & Foreign Repatriation Legal Service",
      serviceType:
        "NRI Real Estate Liquidation, Section 197 Form 13 Lower TDS, Form 15CA/15CB CA Certification & FEMA Wire Remittance",
      provider: {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      areaServed: [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Singapore" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Property Repatriation Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "50000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Essential Section 197 Lower TDS Retainer",
              description:
                "Jurisdictional International Taxation AO representation, capital gains computation, and Form 13 Lower TDS certificate procurement.",
            },
          },
          {
            "@type": "Offer",
            price: "125000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive Sale, TDS & Form 15CA/15CB Remittance Retainer",
              description:
                "Complete legal title search, Special PoA drafting and adjudication, Agreement to Sell, Section 197 certificate, Form 15CA/15CB filing, and outward wire assistance.",
            },
          },
          {
            "@type": "Offer",
            price: "250000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Complex Ancestral Estate Partition, SRO Closing & Full Remittance",
              description:
                "Multi-heir legal dispute resolution, revenue record mutation, High Court title clearance, buyer escrow management, and outward repatriation under FEMA USD 1 Million limit.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb#howto",
      name: "How an NRI Sells Inherited Property and Repatriates Funds Abroad",
      description:
        "Five-step statutory process for non-resident Indians to clear title, obtain lower tax deduction certificates, execute sale deeds, and transfer funds through banking channels.",
      totalTime: "P45D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Legal Title Verification & Revenue Mutation",
          text: "Conduct a 30-year search at the Sub-Registrar office, verify legal heir certificates, and update revenue records in the seller name.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Execute and Adjudicate Special Power of Attorney",
          text: "Sign a Special PoA before the Indian Embassy or Consulate abroad and complete stamping and registration with the local Indian District Collector within 90 days.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Apply for Section 197 Lower TDS Certificate (Form 13)",
          text: "File Form 13 with the International Taxation Officer to calculate tax on net capital gains rather than the 23.92% gross sale price.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Execute Sale Deed & Deposit Proceeds in NRO Account",
          text: "Register the sale deed at the Sub-Registrar office and receive 100% of sale proceeds via RTGS or wire directly into your Indian NRO bank account.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Obtain Form 15CA & 15CB and Remit Funds Overseas",
          text: "A Chartered Accountant certifies tax clearance in Form 15CB with UDIN, you file Form 15CA Part C, and your AD Bank wires the funds overseas under the USD 1 Million limit.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb#faq",
      mainEntity: NRI_REPATRIATION_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb#breadcrumb",
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
          name: "NRI Property Sale & Repatriation",
          item: "https://www.willdrafting.in/services/nri-inherited-real-estate-repatriation-15ca-15cb",
        },
      ],
    },
  ],
};

const TDS_COMPARISON_TABLE = [
  {
    pathway: "Default Section 195 Gross TDS",
    withholdingBasis: "Deducted on total gross property sale price.",
    applicableRate: "20.8% to 23.92% (including surcharge and cess).",
    cashFlowImpact: "Huge cash lockup. ₹47.8 Lakhs withheld on ₹2 Crore sale.",
    refundWaitTime: "12 to 18 months waiting for an income tax refund.",
    idealFit: "Unprepared sellers facing urgent distress deadlines.",
  },
  {
    pathway: "Section 197 Lower TDS Certificate (Form 13)",
    withholdingBasis: "Deducted strictly on actual net capital gains.",
    applicableRate: "Effective rate drops to 3% to 6% of gross value.",
    cashFlowImpact: "Immediate liquidity. Saves ₹35 to ₹40 Lakhs from tax lockup.",
    refundWaitTime: "Zero wait time. Exact net tax deducted at source.",
    idealFit: "All prudent NRIs selling inherited homes or land in India.",
  },
  {
    pathway: "Section 54EC Capital Gain Exemption",
    withholdingBasis: "Reinvestment of net gain in government infrastructure bonds.",
    applicableRate: "0% capital gains tax up to statutory ceiling of ₹50 Lakhs.",
    cashFlowImpact: "Maximizes wealth retention with guaranteed 5-year interest.",
    refundWaitTime: "Immediate tax relief reflected in Lower TDS certificate.",
    idealFit: "NRIs seeking low-risk fixed return assets in India.",
  },
  {
    pathway: "Special RBI Clearance (> USD 1 Million)",
    withholdingBasis: "Remittance exceeding standard USD 1 Million annual limit.",
    applicableRate: "Requires prior RBI approval and hardship justification.",
    cashFlowImpact: "Unlocks total capital from mega ancestral estates.",
    refundWaitTime: "30 to 60 days for central RBI approval.",
    idealFit: "Ultra-HNIs and families liquidating large ancestral estates.",
  },
];

const LEGAL_VS_BROKER_TABLE = [
  {
    parameter: "Title Search & 30-Year Revenue Encumbrance",
    brokers: "Relies on informal broker assurances without legal liability",
    ama: "Certified 30-year title audit by senior High Court advocates",
  },
  {
    parameter: "Section 197 Form 13 Lower TDS Procurement",
    brokers: "Zero tax expertise; buyer forces 23.92% gross TDS deduction",
    ama: "End-to-end liaison with International Taxation Assessing Officer",
  },
  {
    parameter: "Power of Attorney (PoA) Consularization & Adjudication",
    brokers: "Often misguides clients with invalid unadjudicated documents",
    ama: "Drafts consular PoA and completes District Collector adjudication",
  },
  {
    parameter: "Form 15CA & 15CB CA Certification with UDIN",
    brokers: "Must hire an outside accountant who may not know property facts",
    ama: "In-house Chartered Accountants issue official 15CB certifications",
  },
  {
    parameter: "Authorized Dealer Bank Outward Wire Assistance",
    brokers: "Disappears after taking property brokerage commission",
    ama: "Dedicated support until SWIFT MT103 confirmation reaches your bank",
  },
];

export default function NriInheritedPropertyRepatriationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(REPATRIATION_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            BREADCRUMB & EDITORIAL AUTHOR ATTRIBUTION BAR
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
            <span aria-current="page" className="text-[#111827] font-semibold">
              NRI Property Repatriation
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
            <time dateTime="2026-11-12" className="text-[#6B7280]">
              Updated November 12, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Strict Single H1: 51 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>FEMA Regulations, 2016 · Section 195 &amp; 197 · Form 15CA &amp; 15CB</span>
              </div>

              {/* Single H1: 51 characters (Strictly 30 to 65 chars, distinct from Title) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                NRI Inherited Real Estate Sale &amp; Repatriation India
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Selling family property in India from abroad brings heavy tax burdens. Buyers often hold back 20% to 23.92% tax on the full sale price under Section 195. Our High Court lawyers and tax experts help you get a Lower Tax Certificate. We handle deed drafts, file Form 15CA and Form 15CB, and wire your funds home safely.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book NRI Retainer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tools/nri-property-sale-tds-repatriation-calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Try TDS Calculator</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA 2016 Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 197 Form 13</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>CA UDIN Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>USD 1M Annual Wire</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single H2 on the page) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Legal &amp; Tax Advantage
              </div>
              {/* Single H2: 62 characters */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Legal &amp; Tax Repatriation Guide for NRI Inherited Property Sale
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Remote Sale via Special PoA:</strong> You do not need to travel to India. We draft consular powers of attorney and complete local state adjudication.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Save Up to 20% Tax Withholding:</strong> Without Form 13, buyers deduct 23.92% on the gross price. We secure lower tax deduction orders on actual gains.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>FEMA USD 1 Million Wire Clearance:</strong> Our in-house CAs issue Form 15CB with UDIN and file Form 15CA for seamless foreign bank outward wires.
                  </span>
                </li>
              </ul>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Calculate Your Exact TDS Savings</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE NRI REPATRIATION & TDS MODELER
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <NriRepatriationInteractive />
        </section>

        {/* =========================================================================
            3. EMBEDDED EDITORIAL VISUAL BANNER SECTION (Strict Figure 1)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Statutory Cross-Border Framework</span>
            </div>
            {/* H3: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Blueprint: NRI Property Liquidation &amp; Remittance
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Selling Indian property as an NRI requires following both tax and exchange control laws. Our team manages legal title checks, Section 197 tax relief, and bank wires under RBI rules.
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/nri-inherited-real-estate-repatriation-15ca-15cb-og.jpg"
              alt="NRI Inherited Real Estate Sale Repatriation Form 15CA 15CB Lawyer India"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl shadow-xs"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> End-to-end statutory roadmap for NRI property sales in India, covering Section 197 lower tax certificates, Form 15CA and Form 15CB filings, and foreign wire remittance under FEMA regulations.
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE: REPATRIATION PATHWAYS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Comparative Tax Matrix</span>
            </div>
            {/* H3: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              TDS Comparison: Default Section 195 vs Lower Form 13
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Indian tax rules treat resident and non-resident property sellers very differently. Review this comparison to see how much money a Section 197 certificate protects from being locked up:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Repatriation Pathway</th>
                    <th className="py-4 px-6 w-[20%]">Tax Deduction Basis</th>
                    <th className="py-4 px-6 w-[18%]">Applicable Tax Rate</th>
                    <th className="py-4 px-6 w-[22%]">Immediate Cash Impact</th>
                    <th className="py-4 px-6 w-[18%]">Best Used For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {TDS_COMPARISON_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.pathway}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.withholdingBasis}</td>
                      <td className="py-5 px-6 font-medium text-[#C65378]">{row.applicableRate}</td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.cashFlowImpact}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.idealFit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DEDICATED HIGH-MOAT COMPETITOR BLIND SPOT SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Scale className="w-4 h-4" />
                <span>Integrated Legal &amp; Tax Moat</span>
              </div>
              {/* H3: 56 characters */}
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Why NRIs Need Both High Court Advocates and CAs
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                Many NRIs face huge delays when selling inherited land. Chartered Accountants know tax forms like 15CA and 15CB, but they cannot search land registry records, resolve heir disputes, or draft sale deeds. Local property brokers understand none of the RBI foreign exchange rules.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                WillDrafting and AMA Legal Solutions provide a single team. Our High Court advocates clear property titles and manage registrar office appointments. Our in-house Chartered Accountants calculate capital gains, file Form 13, and issue Form 15CB certificates.
              </p>
              <p className="text-[14px] text-[#047857] font-semibold bg-white/70 p-3.5 rounded-xl border border-[#047857]/20">
                You get full protection from day one. We manage your title search, tax reduction order, Sub-Registrar deed closing, and your bank outward wire to the USA, UK, Canada, UAE, or Australia.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors text-center"
              >
                <span>Retain Property Legal Team</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Check Repatriation Numbers</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. 5-STEP EXECUTION PROTOCOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step Sale to Wire SOP</span>
            </div>
            {/* H3: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              5-Step Signing Protocol for NRI Property Liquidation
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Liquidating inherited property from abroad does not need to be stressful. Our advocates and CAs guide you through a clear 5-step roadmap:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              {
                step: "01",
                title: "Title & Revenue Mutation",
                desc: "Conduct a 30-year title search at the Sub-Registrar office, resolve heir pedigree claims, and update municipal mutation records.",
              },
              {
                step: "02",
                title: "Consular PoA Execution",
                desc: "Sign a Special Power of Attorney at the Indian Consulate abroad and register it with the local Indian District Collector within 90 days.",
              },
              {
                step: "03",
                title: "Section 197 Lower TDS",
                desc: "File Form 13 online with the International Taxation Assessing Officer to reduce withholding tax from 23.92% down to actual gains.",
              },
              {
                step: "04",
                title: "Sale Deed & NRO Deposit",
                desc: "Execute the registered sale deed at the Sub-Registrar office and receive 100% of sale proceeds directly into your NRO account.",
              },
              {
                step: "05",
                title: "Form 15CA/15CB & Outward Wire",
                desc: "Our CA issues Form 15CB with UDIN, we file Form 15CA Part C, and your bank executes the foreign wire under the USD 1M limit.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-5 sm:p-6 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Stage {item.step}
                  </span>
                  <h4 className="text-lg font-semibold text-[#111827] mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[13.5px] leading-[1.6] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. STATUTORY GOVERNING FRAMEWORK & FEMA REGULATIONS 2016
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Coins className="w-4 h-4" />
              <span>Statutory Compliance Rules</span>
            </div>
            {/* H3: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              FEMA Remittance of Assets &amp; Tax Statutory Rules
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Cross-border capital transfers from India must follow clear statutory rules. Here are the core laws governing inherited property liquidation and foreign remittance:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                FEMA Remittance of Assets 2016
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                Notification No. FEMA 13(R)/2016-RB permits non-residents to remit up to USD 1,000,000 per financial year from their NRO accounts for inherited assets, supported by a CA certificate.
              </p>
              <div className="text-xs font-semibold text-[#047857] bg-[#047857]/10 p-2.5 rounded-lg">
                Advantage: Complete legal transfer of ancestral wealth without prior RBI clearance.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Section 195: Mandatory TDS
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                Any person paying an NRI for property in India must deduct tax at source. Without a Section 197 certificate, the buyer must withhold 20% plus surcharge and cess on total sale consideration.
              </p>
              <div className="text-xs font-semibold text-[#C65378] bg-[#C65378]/10 p-2.5 rounded-lg">
                Critical Warning: Buyers face penalties under Section 201 for failing to deduct full tax.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Section 49(1) &amp; Section 55: FMV 2001
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                For inherited properties, your acquisition cost is the cost paid by the original deceased owner. For properties acquired before 2001, you can adopt the Fair Market Value as of April 1, 2001.
              </p>
              <div className="text-xs font-semibold text-[#172228] bg-[#FAF7F0] p-2.5 rounded-lg border border-[#172228]/10">
                Rule: A certified government valuer report is required for Section 197 approval.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. COPYABLE TRUST / SALE AGREEMENT CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
              <FileCheck className="w-4 h-4" />
              <span>Standard Legal Wording</span>
            </div>
            {/* H3: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Sample Agreement Clause: Section 195 TDS &amp; Escrow
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Here is the standard clause our High Court advocates draft into property Agreements to Sell. It protects NRI sellers from arbitrary buyer tax withholding while ensuring full compliance:
            </p>
          </div>

          <CopyableTrustClauseBox
            title="NRI Property Sale Agreement: Section 195 TDS &amp; Form 13 Timeline Clause"
            code={`"CLAUSE 8: TAX DEDUCTION AT SOURCE (TDS) AND STATUTORY REMITTANCE

8.1. The Purchaser acknowledges that the Seller is a Non-Resident Indian (NRI) for Indian income tax purposes. The sale consideration payable hereunder shall be subject to tax deduction at source strictly in accordance with Section 195 read with Section 197 of the Income Tax Act, 1961.

8.2. The Seller undertakes to file an application in Form 13 before the jurisdictional Assessing Officer (International Taxation) for issuance of a Certificate for Lower Deduction of Tax under Section 197 within 14 business days of signing this Agreement.

8.3. The Purchaser agrees to wait for the issuance of the Certificate under Section 197 prior to deducting any withholding tax, provided such certificate is obtained on or before the agreed Closing Date. The Purchaser shall deduct TDS strictly at the rate specified in such certificate and deposit the same with the Central Government under Section 200 within statutory timelines.

8.4. All net sale proceeds after authorized statutory TDS deduction shall be remitted exclusively via RTGS or crossed banking wire into the Seller's designated Non-Resident Ordinary (NRO) Bank Account in India to facilitate outward foreign remittance under RBI FEMA (Remittance of Assets) Regulations, 2016."`}
            explanation="Drafted under Sections 195 and 197 of the Income Tax Act, 1961. This clause obligates the buyer to honor the lower deduction certificate and deposit net funds directly into the seller NRO account."
          />
        </section>

        {/* =========================================================================
            9. COMPETITOR BLIND SPOT: AMA LEGAL VS REAL ESTATE BROKERS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Transparent Legal Pricing Moat</span>
            </div>
            {/* H3: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              WillDrafting Full Retainer vs Local Property Brokers
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Traditional real estate brokers charge 2% commissions but have zero knowledge of tax laws or FEMA rules. Here is how our comprehensive legal and tax service protects your money:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[28%]">Comparison Factor</th>
                    <th className="py-4 px-6 w-[36%]">Local Brokers &amp; Unverified CAs</th>
                    <th className="py-4 px-6 w-[36%] text-[#C65378]">
                      AMA Legal Solutions &amp; WillDrafting
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {LEGAL_VS_BROKER_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.brokers}</td>
                      <td className="py-5 px-6 font-medium text-[#047857] bg-[#047857]/5">
                        {row.ama}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. NRI REPATRIATION FAQS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Legal FAQs</span>
            </div>
            {/* H3: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRI Property Remittance
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Find clear answers to common legal questions about selling inherited property in India, Lower TDS certificates, and overseas bank wire transfers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_REPATRIATION_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h4 className="text-lg font-semibold text-[#111827] mb-3 leading-snug">
                  {item.q}
                </h4>
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
                Related NRI Real Estate &amp; Cross-Border Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore our legal services, inheritance guides, and free calculators:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI TDS Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Will Drafting Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/family-settlement-deed-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Family Settlement Lawyer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11. AUTHOR & E-E-A-T EDITORIAL VERIFICATION CARD
            ========================================================================= */}
        <section className="w-full p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1">
              Editorial &amp; Statutory Legal Verification
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
              This advisory guide is prepared in accordance with the Foreign Exchange Management (Remittance of Assets) Regulations, 2016, RBI Master Directions, the Income Tax Act, 1961 (Sections 195, 197, 49, and 54EC), the Powers of Attorney Act, 1882, and the Registration Act, 1908. It provides legal and tax information for cross-border asset repatriation and does not replace individualized legal representation.
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
