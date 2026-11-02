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
  Users,
  Coins,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriZambiaWillInteractive from "@/components/NriZambiaWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Zambia | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in Zambia. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in zambia",
    "nri will drafting services zambia",
    "indian will for nri in zambia",
    "make a will for indian property from zambia",
    "indian inheritance lawyer zambia",
    "zambian wills and administration of testate estates act cap 60",
    "lusaka ndola kitwe gujarat ancestral property succession",
    "consular attestation indian will high commission lusaka",
    "oci ancestral land inheritance gujarat maharashtra fema",
    "section 228 indian succession act resealing zambia probate",
    "nro account inheritance 1 million usd repatriation zambia",
    "ama legal solutions cross border estate counsel zambia",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Zambia | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Zambia. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-zambia-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Zambia Cap 60 and Indian Succession Act Legal Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Zambia | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Zambia. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-zambia-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_ZAMBIA_FAQS = [
  {
    q: "Does a Zambian Grant of Probate govern my property and land in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, succession to immovable property in India follows the Lex Situs rule. Indian land registries, municipal revenue offices, and banks reject Zambian court orders without formal Indian court recognition. Relying only on a Zambian Will forces your heirs to file a complex ancillary probate petition in India. Drafting a separate Indian Will allows your family to transfer assets directly.",
  },
  {
    q: "Why is an Indian court grant under Section 228 needed for a Zambian Will?",
    a: "Under Section 228 of the Indian Succession Act 1925, foreign court grants have no automatic extraterritorial power in India. If you rely only on a Zambian probate grant issued under Cap 60, your heirs must file an ancillary probate case before an Indian High Court. This resealing process takes 18 to 36 months and incurs high court fees. A separate Indian Will avoids Section 228 court bottlenecks completely.",
  },
  {
    q: "Can Zambian citizens holding OCI status inherit agricultural land in India?",
    a: "Yes. Under Section 6(5) of FEMA 1999 and Regulation 3(1)(b), foreign citizens of Indian origin holding OCI status can inherit agricultural land, farmhouses, and residential properties from an Indian resident. While foreign nationals cannot buy agricultural land directly, inheritance through a valid Will is protected by law. A clear Indian Will prevents illegal land mutation and family disputes.",
  },
  {
    q: "How do I trace ancestral land in Gujarat or Maharashtra from Lusaka or Ndola?",
    a: "Many Zambian-Indian families trace roots to Gujarat or Maharashtra. Our High Court advocates help recover old title records. We obtain certified 7/12 land extracts in Gujarat or property cards and Index II in Maharashtra. We also prepare certified family trees (Pedhinama) to prove your legal heirship before the local revenue office.",
  },
  {
    q: "How do I prevent my Zambian Will from accidentally revoking my Indian Will?",
    a: "Standard Zambian Wills drafted by local practitioners contain boilerplate clauses cancelling all past wills. Under Section 62 of the Indian Succession Act 1925, this standard clause can revoke your Indian Will by mistake. We draft twin, harmonized Wills. Your Zambian Will covers local African assets under Cap 60, while your Indian Will governs Indian assets under ISA 1925 with explicit mutual non-revocation covenants.",
  },
  {
    q: "Does an Indian Will executed in Zambia require Indian stamp paper or consular attestation?",
    a: "No Indian stamp paper is needed. Under the Indian Stamp Act 1899, Wills attract zero stamp duty. You can print your Indian Will on plain A4 paper in Lusaka, Ndola, Kitwe, or Livingstone. You only need two adult witnesses who are not beneficiaries in the Will. For extra evidential proof, you can attest the Will before the High Commission of India on Pandit Nehru Road in Lusaka.",
  },
  {
    q: "What are the execution rules under Zambia Cap 60 vs Section 63 of the Indian Succession Act?",
    a: "Both Zambia's Wills and Administration of Testate Estates Act (Cap 60) and Section 63 of the Indian Succession Act require the Will maker to sign before two adult witnesses present together. Neither law requires mandatory court registration for legal validity. Crucially, the witnesses must not be named as beneficiaries or executors who receive bequests under the Will.",
  },
  {
    q: "How can Zambian heirs repatriate sale proceeds from inherited Indian property?",
    a: "Under Reserve Bank of India FEMA guidelines, non-resident heirs can repatriate up to 1 Million US Dollars per financial year through an NRO bank account. Our legal and tax advisory team assists in obtaining a Section 197 lower TDS certificate from income tax authorities, followed by Form 15CA and Form 15CB certifications for smooth foreign outward remittance.",
  },
];

const NRI_ZAMBIA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia",
      name: "Will Drafting for NRIs in Zambia | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in Zambia. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-zambia-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Zambia Cap 60 and Indian Succession Act Legal Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia#legalservice",
      name: "AMA Legal Solutions Zambia-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-zambia-og.jpg",
      description:
        "Cross-border Indian Will drafting and succession counsel for Non-Resident Indians (NRIs) and OCIs resident in Lusaka, Ndola, Kitwe, and across Zambia.",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Zambia" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Lusaka" },
        { "@type": "City", name: "Ndola" },
        { "@type": "City", name: "Kitwe" },
        { "@type": "City", name: "Livingstone" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia#service",
      name: "Cross-Border Indian Will Drafting for NRIs & OCIs in Zambia",
      serviceType:
        "Cross-Border Estate Planning, Separate Indian Will Drafting & Cap 60 Harmonization",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Zambia" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Zambia NRI Estate Succession Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Zambia",
              description:
                "Comprehensive Indian Will covering Indian real estate, NRE/NRO bank deposits, Demat portfolios, and mutual funds under the Indian Succession Act 1925.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual-Will Harmonization Architecture (Zambia Cap 60 & India)",
              description:
                "Synchronized twin Wills ring-fencing Zambian commercial assets under Cap 60 and Indian immovable property under ISA 1925 with mutual non-revocation clauses.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Ancestral Title Regularization, HCI Lusaka Attestation & Estate Transmission",
              description:
                "End-to-end legal support including Gujarat 7/12 extract tracing, certified Pedhinama, consular attestation guidance at HCI Lusaka, and revenue mutation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia#howto",
      name: "How NRIs in Zambia Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory protocol for Indian expats and OCIs in Lusaka and Copperbelt to draft, execute, and harmonize an Indian Will with Zambian Cap 60.",
      totalTime: "P7D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Title & Revenue Audit",
          text: "Gather title deeds, property cards, Gujarat 7/12 extracts, Maharashtra Index II, and bank account details for assets held in India.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Dual-Will Drafting & Jurisdictional Ring-Fencing",
          text: "Our High Court advocates draft an Indian Will restricted to Indian property, inserting non-revocation covenants to protect your Zambian Will under Cap 60.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Execution or Consular Attestation",
          text: "Execute the Will on plain A4 paper in Zambia before two adult witnesses, or complete consular attestation at the High Commission of India in Lusaka.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Executor Custody & Safe Asset Transmission",
          text: "Store the executed original with your named India-resident executor or advocate for fast mutation and bank disbursement upon demise.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia#faq",
      mainEntity: NRI_ZAMBIA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia#breadcrumb",
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
          name: "Will Drafting for NRIs in Zambia",
          item: "https://www.willdrafting.in/services/will-drafting-for-nris-in-zambia",
        },
      ],
    },
  ],
};

const ZAMBIA_COMPARISON_ROWS = [
  {
    parameter: "Governing Statute",
    zambianLaw: "Wills and Administration of Testate Estates Act (Cap 60)",
    indianLaw: "Indian Succession Act, 1925 (ISA 1925)",
    harmonizationMoat:
      "Separate Wills prevent conflict between Zambian testate provisions and Indian statutory succession.",
  },
  {
    parameter: "Real Estate Jurisdiction",
    zambianLaw: "Limited to movable assets and Zambian real estate",
    indianLaw: "Strict Lex Situs rule under Section 5(1) ISA",
    harmonizationMoat:
      "Indian revenue authorities reject Zambian decrees; Indian Will enables direct title mutation.",
  },
  {
    parameter: "Foreign Probate Resealing",
    zambianLaw: "High Court for Zambia Grant of Probate",
    indianLaw: "Section 228 Letters of Administration petition",
    harmonizationMoat:
      "Bypasses 18 to 36 months of Indian High Court litigation by executing a standalone Indian Will.",
  },
  {
    parameter: "Will Execution Formalities",
    zambianLaw: "Signed before 2 adult witnesses present together (Cap 60)",
    indianLaw: "Signed before 2 adult witnesses (ISA Section 63)",
    harmonizationMoat:
      "Both jurisdictions follow two-witness rules on plain paper; zero Indian stamp paper required.",
  },
  {
    parameter: "Accidental Revocation Risk",
    zambianLaw: "Standard boilerplate revokes all past testamentary acts",
    indianLaw: "Section 62 ISA cancels prior Indian Will automatically",
    harmonizationMoat:
      "Our advocates include mutual non-revocation covenants to preserve both testamentary documents.",
  },
  {
    parameter: "Agricultural Land Inheritance",
    zambianLaw: "No jurisdiction over Indian agricultural land",
    indianLaw: "FEMA 1999 Section 6(5) & Regulation 3(1)(b)",
    harmonizationMoat:
      "Protects OCI and NRI rights to inherit Gujarat and Maharashtra farmland without RBI approval.",
  },
  {
    parameter: "Repatriation of Estate Funds",
    zambianLaw: "Bank of Zambia foreign exchange guidelines",
    indianLaw: "RBI 1 Million USD annual repatriation via NRO",
    harmonizationMoat:
      "Lower TDS certificate under Section 197 and Form 15CA/15CB streamline swift capital repatriation.",
  },
  {
    parameter: "Estate Resolution Timeline",
    zambianLaw: "Zambian probate takes 6 to 12 months locally",
    indianLaw: "Transmission under standalone Indian Will: 3 to 6 weeks",
    harmonizationMoat:
      "Eliminates multi-year cross-border delays by decoupling Indian assets from Zambian estate closure.",
  },
];

export default function NriZambiaWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_ZAMBIA_SCHEMA) }}
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
              Will Drafting for NRIs in Zambia
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
            1. HERO SECTION (Single Strict H1: 48 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  Lusaka · Copperbelt · Ndola · Kitwe · Livingstone · Cross-Border Counsel
                </span>
              </div>

              {/* Single H1: 48 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting Services for NRIs in Zambia
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Established Indian business families in Lusaka (Makeni, Kabulonga)
                and Copperbelt (Ndola, Kitwe) hold extensive farmland, commercial
                shops, and apartments in Gujarat (Surat, Bharuch, Ahmedabad) and
                Maharashtra (Mumbai, Pune). Under the{" "}
                <strong className="text-[#111827]">
                  Zambian Wills and Administration of Testate Estates Act (Cap 60)
                </strong>
                , a local Zambian probate grant has zero extraterritorial effect
                before Indian land registries. Our High Court advocates draft
                jurisdictionally ring-fenced Indian Wills that harmonize with
                Zambian law, bypass multi-year Indian court probate, and secure
                swift property mutation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Advocate Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#zambia-vs-indian-succession"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Cap 60 vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Cap 60 Harmonized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA Reg 3(1)(b) Valid</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>HCI Lusaka Attestation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 45 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Single Global Wills Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Zambia Cap 60 &amp; Indian Probate Bottleneck
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Extraterritorial Rejection:</strong> A Zambian Grant
                    of Probate issued under Cap 60 is legally invalid for direct
                    property mutation before Indian Sub-Registrars, BMC, or Gujarat
                    revenue offices.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation Clause:</strong> Standard Lusaka
                    legal drafts include broad revocation clauses that cancel your
                    prior Indian Will under Section 62 of the Indian Succession Act.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Mandatory Section 228 Litigation:</strong> Relying on
                    a foreign Will forces heirs to petition Indian High Courts for
                    ancillary probate, causing 18 to 36 months of probate deadlock.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Inherited Asset Sale &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriZambiaWillInteractive />

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
              Visual Legal Framework: Zambia to India Will Succession
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will drafted by High Court advocates harmonizes
              with the Zambian Wills and Administration of Testate Estates Act (Cap 60),
              protects ancestral family title, and prevents cross-border succession disputes:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-zambia-og.jpg"
              alt="Will Drafting for NRIs in Zambia Cap 60 and Indian Succession Act Legal Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting for NRIs
                in Zambia harmonizing Cap 60 and the Indian Succession Act 1925.
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
        <section id="zambia-vs-indian-succession" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Cross-Border Comparison</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Zambia Succession Cap 60 vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to ring-fence your Indian assets from Zambian estate administration
              leads to multi-year court freezes and costly High Court litigation in India.
              Compare the statutory frameworks governing your estate:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[880px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[25%]">Zambia Testate Law (Cap 60)</th>
                    <th className="py-4 px-6 w-[25%]">Indian Succession Act, 1925</th>
                    <th className="py-4 px-6 w-[30%]">Harmonization Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {ZAMBIA_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.zambianLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#172228]">
                        {row.harmonizationMoat}
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
              <span>Statutory Transmission Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Zambia to India Estate Transmission Manual
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this verified legal protocol designed by our High Court advocates
              to structure, execute, and implement your Indian Will from Lusaka, Ndola,
              or Kitwe without unnecessary travel:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Title & Revenue Audit",
                desc: "We verify title deeds, Gujarat 7/12 extracts, Maharashtra Index II, and bank folios. We establish certified family trees (Pedhinama) for ancestral property clarity.",
              },
              {
                step: "02",
                title: "Bespoke Cross-Border Drafting",
                desc: "Our advocates craft a standalone Indian Will restricted strictly to Indian property, inserting non-revocation covenants to safeguard your Zambian Will under Cap 60.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing or Attestation",
                desc: "Sign on standard A4 paper before two independent adult witnesses. You may also complete consular attestation at the High Commission of India in Lusaka.",
              },
              {
                step: "04",
                title: "Executor Custody & Mutation",
                desc: "Upon demise, your India-resident executor presents the Will for rapid municipal Khata mutation, SRO registration, and RBI-compliant funds repatriation.",
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
              Essential Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Under Section 62 of the Indian Succession Act 1925, ambiguous wording
              can cause accidental revocation of concurrent wills. Every Indian Will
              drafted for a Zambian resident must include explicit territorial limits
              and non-revocation covenants:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Copyable Clause Box */}
            <div className="lg:col-span-7">
              <CopyableNriPropertyClauseBox
                title="Jurisdictionally Ring-Fenced Indian Will Clause"
                code={`"I hereby declare that this Last Will and Testament relates strictly, exclusively, and solely to all my immovable and movable assets, properties, bank accounts (including NRE, NRO, and FCNR accounts), corporate shares, securities, and investments situated within the territory of the Republic of India.

I further declare that this Will shall NOT revoke, alter, or supersede any Will, codicil, or testamentary disposition executed by me under the Wills and Administration of Testate Estates Act (Cap 60) of Zambia or any other foreign jurisdiction governing my assets situated in Zambia or elsewhere outside India. Both instruments shall operate concurrently and independently in their respective jurisdictions."`}
                explanation="This clause establishes strict territorial demarcation. It protects your Zambian estate from Indian High Court jurisdiction and ensures your Indian Will is not cancelled by standard revocation terms in a foreign Will."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between my-8">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Zambia NRI Drafting Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential clauses to safeguard Indian properties from abroad:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Clear Schedule Demarcations:</strong> List exact survey
                      numbers, CTS plots, 7/12 details, or apartment floor plans.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>India-Resident Executor:</strong> Appoint a trusted local
                      relative or advocate to handle physical revenue mutation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank Nominee Clarification:</strong> Affirm that nominees
                      hold funds only as trustees for the beneficiaries named in the Will.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Independent Witnesses:</strong> Ensure witnesses are
                      adults who do not receive any bequest under the instrument.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom NRI Will Draft</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Links to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Tax Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate indexed acquisition costs and long-term capital gains tax
                    liabilities on ancestral property sales under Section 49(1).
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate Capital Gains Tax</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate Section 195 TDS withholding tax and compute net repatriable
                    funds to Zambia under the RBI 1 Million USD annual window.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate TDS &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. ANCESTRAL PROPERTY & OCI SUCCESSION SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>FEMA &amp; Agricultural Land Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Ancestral Farmland &amp; OCI Inheritance in Gujarat
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Section 6(5) of FEMA 1999 and RBI Regulation 3(1)(b), Non-Resident
                Indians and foreign nationals holding OCI cards can legally inherit
                agricultural land, farmhouses, and plantations in Gujarat or Maharashtra.
                While foreign nationals cannot purchase agricultural land directly,
                inheritance through a legally executed Will is entirely protected.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Without a standalone Indian Will, agricultural land enters complex
                intestate succession. In Gujarat and Maharashtra, revenue authorities
                require a certified Pedhinama (family tree) and consent affidavits from
                every legal heir. A single unreachable sibling in the UK or Africa can
                paralyze land mutation for years. Our High Court advocates draft clear
                bequests that specify plot numbers, boundary dimensions, and water shares,
                ensuring smooth mutation before the Talati and Tehsildar.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult High Court NRI Lawyer</span>
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
              <span>Cross-Border FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Zambia NRI Will Drafting
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative cross-border succession guidance prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_ZAMBIA_FAQS.map((item, idx) => (
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
                Related NRI Succession &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border legal guides and statutory succession services:
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
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Property Sale &amp; Repatriation</span>
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
              This statutory legal guide is published under the Indian Succession Act,
              1925, the Zambian Wills and Administration of Testate Estates Act (Cap 60),
              the Foreign Exchange Management Act, 1999 (FEMA), and the Diplomatic and
              Consular Officers (Oaths and Fees) Act, 1948. Judicial precedents cited include
              Smt. Sarbati Devi v. Smt. Usha Devi (1984 AIR 346 SC) regarding bank nominee
              rights. This content provides legal education and does not replace
              individualized advocate counsel.
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
