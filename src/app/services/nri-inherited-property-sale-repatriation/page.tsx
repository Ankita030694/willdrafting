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
  Globe2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriPropertySaleInteractive from "@/components/NriPropertySaleInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "NRI Inherited Property Sale & Repatriation | WillDrafting",
  },
  description:
    "Legal & CA counsel for NRI inherited property sale and repatriation service in India. Title mutation, Form 13 lower TDS, and Form 15CA 15CB remittance.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "nri inherited property sale and repatriation service",
    "nri property title transfer lawyer india",
    "form 13 lower tds and 15ca 15cb service for nri",
    "nri property mutation and sale lawyer",
    "fema remittance of assets regulations 2016",
    "section 195 tds on nri property sale",
    "section 197 form 13 lower tax deduction certificate",
    "form 15ca 15cb chartered accountant certificate",
    "nri repatriation usd 1 million limit nro account",
    "apostilled power of attorney nri property sale",
    "inherited property cost of acquisition section 49",
    "ama legal solutions nri property practice",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation",
  },
  openGraph: {
    title: "NRI Inherited Property Sale & Repatriation | WillDrafting",
    description:
      "Legal & CA counsel for NRI inherited property sale and repatriation service in India. Title mutation, Form 13 lower TDS, and Form 15CA 15CB remittance.",
    url: "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/nri-inherited-property-sale-repatriation-og.jpg",
        width: 1200,
        height: 630,
        alt: "NRI Inherited Property Sale and Repatriation Service India Turnkey Advocate and CA Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Inherited Property Sale & Repatriation | WillDrafting",
    description:
      "Legal & CA counsel for NRI inherited property sale and repatriation service in India. Title mutation, Form 13 lower TDS, and Form 15CA 15CB remittance.",
    images: ["/images/nri-inherited-property-sale-repatriation-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const REPATRIATION_FAQS = [
  {
    q: "Can an NRI sell an inherited residential property in India without visiting India?",
    a: "Yes. You can sell Indian land or flats without travelling. You sign a Specific Power of Attorney in your home country. The Indian Embassy stamps it or you apostille it. Our advocates register it with the Sub-Registrar in India. We then sign the sale deed on your behalf.",
  },
  {
    q: "How much TDS is deducted when an NRI sells inherited property in India?",
    a: "Under Section 195, buyers must cut 20% tax on the gross sale price. With extra cess and surcharges, this cut can reach 23.92%. This rule applies even if your real profit is small. A Section 197 certificate cuts tax only on your actual capital gains.",
  },
  {
    q: "How does Form 13 help save cash flow for an NRI property seller?",
    a: "Form 13 is an online tax application. You file it with the tax officer before selling. It proves your purchase cost and exemptions under Section 54. The officer then issues a Lower TDS certificate. This keeps lakhs in your hands instead of locked with the tax office for years.",
  },
  {
    q: "How much money can an NRI repatriate abroad from inherited property sales?",
    a: "Under RBI and FEMA rules, an NRI or OCI can send up to USD 1 Million abroad each financial year. This money transfers from your NRO bank account. Our team prepares Form 15CA and Form 15CB so your bank wires the funds swiftly.",
  },
  {
    q: "What is the difference between Form 15CA and Form 15CB?",
    a: "Form 15CB is a formal audit signed by a Chartered Accountant. It proves you paid all taxes due in India. Form 15CA is an online declaration filed on the tax portal based on that audit. Both forms are needed before your bank wires money abroad.",
  },
  {
    q: "Is municipal mutation compulsory before selling an inherited property?",
    a: "Yes. Mutation updates property tax books from your late parents to the legal heirs. Sub-Registrars and buyer banks check mutation before clearing a sale. We secure municipal mutation certificates and housing society transfers for you.",
  },
  {
    q: "What happens if there are multiple siblings and some live abroad while others live in India?",
    a: "All legal heirs must give legal consent. Relatives who do not want a share can sign a registered Relinquishment Deed. If all heirs sell together, the money splits into separate bank accounts based on each heir's share.",
  },
  {
    q: "How is the cost of acquisition calculated for inherited property under Section 49?",
    a: "Under Section 49, your cost equals the price your parents paid when they bought the property. If they bought it before April 2001, we use an approved valuation report as of April 1, 2001 to reduce your taxable gain.",
  },
];

const REPATRIATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation#webpage",
      url: "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation",
      name: "NRI Inherited Property Sale & Repatriation | WillDrafting",
      description:
        "Legal & CA counsel for NRI inherited property sale and repatriation service in India. Title mutation, Form 13 lower TDS, and Form 15CA 15CB remittance.",
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
        url: "https://www.willdrafting.in/images/nri-inherited-property-sale-repatriation-og.jpg",
        width: 1200,
        height: 630,
        caption:
          "NRI Inherited Property Sale and Repatriation Service India Turnkey Advocate and CA Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation#legalservice",
      name: "AMA Legal Solutions NRI Inherited Property & Repatriation Practice",
      url: "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/nri-inherited-property-sale-repatriation-og.jpg",
      description:
        "Turnkey cross-border legal and Chartered Accountant counsel for Non-Resident Indians handling inherited property title mutation, SRO sale deeds, Section 197 Lower TDS certificates, and FEMA Form 15CA/15CB USD 1 Million overseas remittance.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Singapore" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation#service",
      name: "NRI Inherited Property Sale and Repatriation Service",
      serviceType:
        "Cross-Border Property Title Transfer, Lower TDS Form 13 & FEMA Repatriation",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Turnkey Property Sale & Repatriation Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "29990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Section 197 Form 13 Lower TDS Procurement",
              description:
                "Filing Form 13 before the Assessing Officer of International Taxation to restrict Section 195 TDS to net capital gains, saving up to 20% of gross property consideration.",
            },
          },
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "FEMA Form 15CA & 15CB CA Audit & USD 1M Wire Clearance",
              description:
                "Chartered Accountant certification in Form 15CB, tax portal filing of Form 15CA, Form A2 processing, and AD Bank liaison for swift telegraphic foreign remittance.",
            },
          },
          {
            "@type": "Offer",
            price: "99990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Turnkey Inheritance-to-Repatriation End-to-End Counsel",
              description:
                "Single-window Advocate + CA representation covering probate or heirship, municipal mutation, Apostilled PoA adjudication, SRO sale deed execution, Form 13, and 15CA/15CB remittance.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation#howto",
      name: "How NRIs Sell Inherited Property in India and Repatriate Funds Abroad",
      description:
        "Five-stage statutory protocol for non-resident heirs to clear property title, execute remote sale deeds, obtain lower TDS clearance, and remit funds overseas.",
      totalTime: "P45D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Probate and Succession Title Regularization",
          "text": "Obtain Probate or Letters of Administration where mandatory, or secure a Legal Heir Certificate to establish undisputed marketable title.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Municipal Mutation and Society Share Transfer",
          "text": "File municipal mutation petitions to update property tax registers and transfer housing society shares into the names of surviving heirs.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Agreement to Sell and Specific Power of Attorney",
          "text": "Execute a consulate-attested Specific Power of Attorney, adjudicate it in India, and draft an Agreement to Sell with FEMA protective covenants.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Section 197 Form 13 Lower TDS Certificate",
          "text": "Apply for a Nil or Lower TDS Certificate from International Taxation authorities to avoid excessive 20% to 23.92% tax deduction on gross value.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Form 15CA and 15CB Overseas Wire Remittance",
          "text": "Deposit net sale proceeds into the NRO account, obtain Form 15CB from a Chartered Accountant, file Form 15CA, and wire funds abroad under the USD 1M scheme.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation#faq",
      mainEntity: REPATRIATION_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation#breadcrumb",
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
          "name": "NRI Inherited Property Sale & Repatriation",
          "item":
            "https://www.willdrafting.in/services/nri-inherited-property-sale-repatriation",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    parameter: "Work Scope",
    amaTurnkey: "One team of top High Court lawyers and CAs",
    lawyerOnly: "Court and deed work only. No tax or bank help",
    caOnly: "Tax filing only. No land checks or deed registry",
    diyRelative: "Informal footwork. High legal and tax risk",
  },
  {
    parameter: "Court Petitions",
    amaTurnkey: "Full High Court probate and heirship orders",
    lawyerOnly: "Files court petitions, but ignores tax math",
    caOnly: "No court standing for legal heir suits",
    diyRelative: "Often skips required court probate",
  },
  {
    parameter: "Land Mutation",
    amaTurnkey: "Updates MCD, BMC, BBMP, and Tehsildar books",
    lawyerOnly: "Rarely does local land office footwork",
    caOnly: "Outside accounting firm scope",
    diyRelative: "Struggles with local revenue offices",
  },
  {
    parameter: "Power of Attorney",
    amaTurnkey: "Drafts apostilled PoA and pays state stamp duty",
    lawyerOnly: "Drafts generic forms that registrars reject",
    caOnly: "Cannot draft or register legal powers",
    diyRelative: "Uses flawed free forms from the web",
  },
  {
    parameter: "Form 13 Lower TDS",
    amaTurnkey: "Our CA files Form 13 to cut tax on actual profit",
    lawyerOnly: "Leaves buyer to cut 23.92% on gross sale",
    caOnly: "Can file form, but cannot draft sale deed",
    diyRelative: "Unaware of rules. Freezes huge cash sums",
  },
  {
    parameter: "Form 15CA & 15CB",
    amaTurnkey: "In-house CA signs 15CB and files 15CA online",
    lawyerOnly: "Sends clients away to third-party accountants",
    caOnly: "Signs form only after months of paper checks",
    diyRelative: "Cannot sign without a certified CA",
  },
  {
    parameter: "USD 1M Bank Wire",
    amaTurnkey: "Works directly with bank until wire clears abroad",
    lawyerOnly: "Offers zero banking or FEMA support",
    caOnly: "Issues tax papers, but avoids bank queries",
    diyRelative: "High risk of bank frozen funds",
  },
];

const MANDATORY_FEMA_CLAUSE = `/* =========================================================================
   MANDATORY SECTION 195 TDS & FEMA REPATRIATION CLAUSE
   For Insertion in Agreement to Sell by Non-Resident Indian Seller
   ========================================================================= */

"AND WHEREAS the SELLER is a Non-Resident Indian (NRI) residing in [Foreign Country],
governed by the Foreign Exchange Management Act, 1999 (FEMA) and Section 195 of the
Income Tax Act, 1961;

IT IS HEREBY MUTUALLY AGREED BETWEEN THE PARTIES AS FOLLOWS:

1. LOWER TDS CERTIFICATE UNDER SECTION 197:
   The SELLER shall, within [30] days of execution of this Agreement, apply to the
   Assessing Officer of International Taxation for a Lower/Nil Tax Deduction Certificate
   in Form 13 under Section 197 of the Income Tax Act, 1961. The BUYER covenants to
   cooperate fully by providing necessary Buyer PAN and TAN details.

2. TAX DEDUCTION AT SOURCE (TDS):
   Upon issuance of the Section 197 Certificate, the BUYER shall deduct TDS strictly
   at the rate specified in such Certificate on the net capital gains component, and
   NOT at the default rate of 20% on the gross sale consideration. The BUYER shall
   deposit such deducted tax within seven days of the end of the month and furnish
   official Form 16A and Challan receipt to the SELLER within 15 days.

3. BANKING REMITTANCE COMPLIANCE:
   The entire balance sale consideration, net of certified TDS, shall be paid by the
   BUYER exclusively via Real Time Gross Settlement (RTGS) or wire transfer directly
   into the SELLER's designated Non-Resident Ordinary (NRO) Bank Account No. [___________],
   maintained with [Bank Name, Branch IFSC]. No payment shall be made in cash or into
   any resident domestic account.

4. OVERSEAS REPATRIATION UNDER FEMA:
   The BUYER acknowledges that the net sale consideration is received by the SELLER
   out of the disposal of an inherited capital asset, eligible for full overseas
   repatriation up to USD 1,000,000 (One Million US Dollars) per financial year under
   the FEMA (Remittance of Assets) Regulations, 2016, subject to filing of Form 15CA
   and Chartered Accountant certification in Form 15CB."`;

export default function NriInheritedPropertySalePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(REPATRIATION_SCHEMA) }}
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
              NRI Inherited Property Sale &amp; Repatriation
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
            1. HERO SECTION (Single Strict H1: 49 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <Globe2 className="w-4 h-4" />
                <span>
                  Turnkey Advocate &amp; CA Counsel · FEMA · Income Tax Act
                </span>
              </div>

              {/* Single H1: 49 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                NRI Inherited Property Sale &amp; Repatriation Service
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Selling inherited land from abroad can feel hard. High Court
                lawyers only handle court work. Tax accountants only file tax
                forms. Neither solves the whole problem. Our team combines top
                advocates and Chartered Accountants in one office. We verify
                title deeds. We update municipal land records. We secure lower
                tax deduction orders under Section 197. Finally, we wire your
                funds safely overseas.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult NRI Legal &amp; CA Team</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#comparison-matrix"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Turnkey vs DIY</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>USD 1M Repatriation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Form 13 Lower TDS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Consular PoA Drafting</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>In-House CA Form 15CB</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Crucial Pitfalls to Avoid
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Three Costly Bottlenecks for NRI Property Sellers
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>High Tax Withholding:</strong> Under Section 195,
                    buyers must cut tax on the full sale value. For a ₹3 Crore
                    property, up to ₹70 Lakhs remains frozen with the tax office
                    for years.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Flawed Power of Attorney:</strong> Generic internet
                    templates get rejected by local Sub-Registrars. This causes
                    costly trips to India and deal cancellations.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Wire Stalls:</strong> Banks stop money transfers
                    when sale deeds, tax challans, and CA papers do not match
                    cleanly.
                  </span>
                </li>
              </ul>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Calculate Lower TDS Savings &amp; Repatriation Limits</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT (Roadmap & Calculator)
            ========================================================================= */}
        <NriPropertySaleInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Cross-Border Legal Advisory</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Roadmap: NRI Property Sale and Repatriation
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our lawyer and accountant team handles each phase of your property
              sale. We update land records. We prepare valid powers of attorney.
              We secure lower tax clearance and wire funds overseas under RBI
              rules.
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/nri-inherited-property-sale-repatriation-og.jpg"
              alt="NRI Inherited Property Sale and Repatriation Service India Turnkey Advocate and CA Counsel"
              width={1200}
              height={630}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of NRI inherited property sale
                and overseas remittance under FEMA regulations and the Income Tax Act.
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
        <section id="comparison-matrix" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Advisory Comparison Matrix</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Turnkey Advocate &amp; CA Service vs Disjointed Advisory
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Hiring separate advisors causes deal delays and frozen sale money.
              Compare our turnkey single-window service against traditional options:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal &amp; Tax Milestone</th>
                    <th className="py-4 px-6 w-[26%]">
                      AMA Turnkey Advocate + CA
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Traditional Lawyer Only
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Chartered Accountant Only
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
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857] bg-[#047857]/5">
                        {row.amaTurnkey}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.lawyerOnly}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.caOnly}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. THE 5-STAGE TURNKEY NRI ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Turnkey Execution Lifecycle</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              The 5-Stage NRI Inheritance-to-Repatriation Protocol
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              From the day you inherit Indian assets to the moment funds reach
              your foreign bank account, our team manages every legal step:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Title Check & Court Orders",
                desc: "We check your parents' title deeds. We secure court probate in Mumbai, Chennai, or Kolkata. We also obtain legal heir certificates.",
                law: "Indian Succession Act, 1925",
              },
              {
                step: "02",
                title: "Land Records & Society NOC",
                desc: "We file mutation petitions with local municipal bodies. We update land tax records and secure housing society share transfers.",
                law: "State Municipal Corporation Codes",
              },
              {
                step: "03",
                title: "Consular PoA & Sale Deed",
                desc: "We draft apostilled powers of attorney. We pay local stamp duty and sign the final registered sale deed before the Sub-Registrar.",
                law: "Registration Act, 1908 & Stamp Act, 1899",
              },
              {
                step: "04",
                title: "Form 13 Lower Tax Order",
                desc: "Our CAs file Form 13 with the tax officer. We compute your original cost under Section 49 to stop excess tax withholding.",
                law: "Income Tax Act, 1961 s. 197",
              },
              {
                step: "05",
                title: "Form 15CA, 15CB & Bank Wire",
                desc: "We audit banking records. We issue statutory Form 15CB certificates and file Form 15CA to wire money safely abroad.",
                law: "FEMA Remittance Regulations, 2016",
              },
              {
                step: "Turnkey",
                title: "Complete NRI Wealth Assurance",
                desc: "Enjoy complete peace of mind. A dedicated High Court lawyer and senior Chartered Accountant handle every step for you.",
                law: "Zero Travel Required by NRI Heir",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold tracking-[0.18em] uppercase text-[#C65378]">
                      Stage {item.step}
                    </span>
                    <span className="text-[10.5px] font-semibold text-[#55636D] bg-[#FAF7F0] px-2.5 py-1 rounded-full border border-[#172228]/10">
                      {item.law}
                    </span>
                  </div>
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
              <span>Contractual Safeguards</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Mandatory FEMA &amp; Section 195 TDS Agreement Clause
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard sale agreements fail to protect NRI sellers. Without
              custom terms, buyers cut 23.92% tax or make cash payments that
              break FEMA rules. Use our advocate-drafted protective clause:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Standard Protective NRI Sale Agreement &amp; Lower TDS Clause"
            code={MANDATORY_FEMA_CLAUSE}
            explanation="This clause obligates the buyer to cooperate with Form 13 filings, restricts TDS withholding strictly to the lower rate certified by the tax department, and prohibits illegal cash or domestic account transfers under FEMA."
          />

          {/* Contextual Link to Interactive Calculator */}
          <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-1">
                  Want to Calculate Your Exact Lower TDS Withholding?
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55636D]">
                  Use our free statutory calculator to compare default Section
                  195 gross tax deductions against Form 13 lower withholding and
                  check USD 1 Million repatriation limits.
                </p>
              </div>
            </div>
            <Link
              href="/tools/nri-property-sale-tds-repatriation-calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors shrink-0"
            >
              <span>Launch NRI Repatriation Calculator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            7. IN-DEPTH STATUTORY SECTIONS: FORM 13 & FEMA 15CA/15CB
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 197 Form 13 Deep-Dive */}
          <div className="bg-white rounded-[28px] p-7 sm:p-9 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Tax Optimization</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4">
                Section 197 Form 13: Preventing Frozen Sale Funds
              </h2>
              <p className="text-[14.5px] leading-[1.7] text-[#374151] mb-4">
                Resident sellers face only 1% tax deduction under Section
                194-IA. For NRI sellers, Section 195 mandates a 20% cut plus
                surcharges on the entire sale price. On a ₹3 Crore sale, over ₹70
                Lakhs gets cut at source. This happens even if your real profit
                is under ₹20 Lakhs.
              </p>
              <p className="text-[14.5px] leading-[1.7] text-[#374151] mb-4">
                Under Section 197, an NRI seller can file Form 13 with the tax
                officer. Our Chartered Accountants prove your purchase cost
                under Section 49. We also apply exemptions under Sections 54 and
                54EC. The tax officer then issues a certificate. The buyer cuts
                tax only on your actual profit.
              </p>
            </div>
            <div className="pt-4 border-t border-[#172228]/10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] hover:text-[#172228] transition-colors"
              >
                <span>Engage Our CA Team for Form 13 Filing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* FEMA 15CA & 15CB Deep-Dive */}
          <div className="bg-white rounded-[28px] p-7 sm:p-9 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[#047857] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Cross-Border Compliance</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4">
                FEMA 15CA &amp; 15CB Protocol: Repatriating USD 1 Million
              </h2>
              <p className="text-[14.5px] leading-[1.7] text-[#374151] mb-4">
                Under FEMA rules, an NRI or OCI can remit up to USD 1 Million
                abroad every financial year. This money comes from your NRO bank
                account after selling inherited Indian land.
              </p>
              <p className="text-[14.5px] leading-[1.7] text-[#374151] mb-4">
                To release foreign bank wires, Indian banks require two statutory
                forms. Our Chartered Accountants verify all tax payments and sign
                Form 15CB. We then file Form 15CA on the government tax portal.
                This complete filing lets your bank send money overseas without
                delays.
              </p>
            </div>
            <div className="pt-4 border-t border-[#172228]/10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#047857] hover:text-[#172228] transition-colors"
              >
                <span>Initiate 15CA/15CB Overseas Remittance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. DUAL CONVERSION CTA CARD
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Integrated High-Ticket NRI Advisory</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Turnkey Inheritance to Repatriation Advisory
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Do not let separate advisors delay your property sale or freeze
                your inheritance. Our High Court advocates and Chartered
                Accountants handle title checks, land records, remote sale deeds,
                and bank wires under one roof.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Own other assets in India? Protect your family from long court
                battles by drafting an Indian Will today.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Advocate &amp; CA Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Indian Will for NRIs</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. STATUTORY FAQS & RELATED RESOURCES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Statutory FAQs</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRI Property Repatriation
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Direct legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REPATRIATION_FAQS.map((item, idx) => (
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
                Related NRI Legal Services &amp; Tools
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related succession, probate, and cross-border property
                services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Will Drafting India</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/property-mutation-dakhil-kharij-service"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Property Mutation &amp; Dakhil Kharij</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Probate &amp; Will Contest Lawyer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. EDITORIAL & E-E-A-T ATTRIBUTION CARD
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
              This cross-border legal and tax guide is published under the
              Foreign Exchange Management (Remittance of Assets) Regulations,
              2016, the Income Tax Act, 1961 (ss. 49, 195, 197), and the Indian
              Succession Act, 1925. Key judicial precedents include the Bombay
              High Court ruling in CIT v. Manjula J. Shah (2013). This content
              provides statutory education and does not replace specific legal
              advice for your case.
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
