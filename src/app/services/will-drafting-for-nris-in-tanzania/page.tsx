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
import NriTanzaniaWillInteractive from "@/components/NriTanzaniaWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Tanzania | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in Tanzania. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in tanzania",
    "nri will drafting services tanzania",
    "indian will for nri in tanzania",
    "make a will for indian property from tanzania",
    "indian inheritance lawyer tanzania",
    "tanzanian probate and administration of estates act cap 352",
    "dar es salaam upanga gujarat ancestral property succession",
    "consular attestation indian will high commission dar es salaam",
    "oci ancestral land inheritance gujarat maharashtra fema",
    "section 228 indian succession act resealing tanzania probate",
    "nro account inheritance 1 million usd repatriation tanzania",
    "ama legal solutions cross border estate counsel tanzania",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Tanzania | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Tanzania. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-tanzania-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Tanzania Probate Cap 352 and Indian Succession Legal Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Tanzania | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Tanzania. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-tanzania-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_TANZANIA_FAQS = [
  {
    q: "Does a Tanzanian Grant of Probate govern my property and land in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, succession to land and flats in India follows the Lex Situs rule. Indian land registries, municipal offices, and banks reject Tanzanian court orders without formal Indian court recognition. Relying only on a Tanzanian Will forces your heirs to file a second court case in India. Making a separate Indian Will lets your family transfer assets directly.",
  },
  {
    q: "Why is an Indian court grant under Section 228 needed for a Tanzanian Will?",
    a: "Under Section 228 of the Indian Succession Act 1925, foreign court grants have no automatic power in India. If you rely only on a Tanzanian probate grant issued under Cap 352, your heirs must file an ancillary probate case before an Indian High Court. This resealing process takes 18 to 36 months and incurs high court fees. A separate Indian Will avoids Section 228 court bottlenecks completely.",
  },
  {
    q: "Can Tanzanian citizens holding OCI status inherit agricultural land in India?",
    a: "Yes. Under Section 6(5) of FEMA 1999 and Regulation 3(1)(b), foreign citizens of Indian origin holding OCI status can inherit agricultural land, farmhouses, and residential properties from an Indian resident. While foreign nationals cannot buy agricultural land directly, inheritance through a valid Will is protected by law. A clear Indian Will prevents illegal land mutation and family disputes.",
  },
  {
    q: "How do I trace ancestral land in Gujarat or Maharashtra from Dar es Salaam or Arusha?",
    a: "Many Tanzanian-Indian families trace roots to Gujarat or Maharashtra. Our High Court advocates help recover old title records. We obtain certified 7/12 land extracts in Gujarat or property cards and Index II in Maharashtra. We also prepare certified family trees (Pedhinama) to prove your legal heirship before the local revenue office.",
  },
  {
    q: "How do I prevent my Tanzanian Will from accidentally revoking my Indian Will?",
    a: "Standard Tanzanian Wills drafted by local advocates contain a boilerplate clause cancelling all past wills. Under Section 62 of the Indian Succession Act 1925, this standard clause can revoke your Indian Will by mistake. We draft twin, harmonized Wills. Your Tanzanian Will covers East African assets, while your Indian Will governs Indian assets with explicit mutual non-revocation covenants.",
  },
  {
    q: "Does an Indian Will executed in Tanzania require Indian stamp paper or consular attestation?",
    a: "No Indian stamp paper is needed. Under the Indian Stamp Act 1899, Wills attract zero stamp duty. You can print your Indian Will on plain A4 paper in Dar es Salaam, Arusha, or Zanzibar. You only need two adult witnesses who are not beneficiaries in the Will. For extra evidential proof, you can attest the Will before the High Commission of India on Shaaban Robert Street in Dar es Salaam.",
  },
  {
    q: "What are the execution rules under Tanzania Cap 352 vs Section 63 of the Indian Succession Act?",
    a: "Both Tanzania's Probate and Administration of Estates Act (Cap 352) and Section 63 of the Indian Succession Act require the Will maker to sign before two adult witnesses who are present together. Neither law requires mandatory court registration for legal validity. Crucially, the witnesses must not be named as beneficiaries or executors who receive bequests in the Will.",
  },
  {
    q: "How can Tanzanian heirs repatriate sale proceeds from inherited Indian property?",
    a: "Under Reserve Bank of India FEMA guidelines, non-resident heirs can repatriate up to 1 Million US Dollars per financial year through an NRO bank account. Our legal and tax advisory team assists in obtaining a Section 197 lower TDS certificate from income tax authorities, followed by Form 15CA and Form 15CB certifications for smooth foreign outward remittance.",
  },
];

const NRI_TANZANIA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania",
      name: "Will Drafting for NRIs in Tanzania | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in Tanzania. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-tanzania-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Tanzania Probate Cap 352 and Indian Succession Legal Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania#legalservice",
      name: "AMA Legal Solutions Tanzania-India Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-tanzania-og.jpg",
      description:
        "Cross-border Indian testamentary succession, Tanzania-India estate harmonization, Section 63 Will drafting, Dar es Salaam consular attestation counsel, and FEMA asset repatriation.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Tanzania" },
        { "@type": "City", name: "Dar es Salaam" },
        { "@type": "City", name: "Arusha" },
        { "@type": "City", name: "Zanzibar" },
        { "@type": "City", name: "Mwanza" },
        { "@type": "AdministrativeArea", name: "Gujarat" },
        { "@type": "AdministrativeArea", name: "Maharashtra" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania#service",
      name: "Indian Will Drafting & Cross-Border Succession for NRIs in Tanzania",
      serviceType:
        "Cross-Border Indian Will Drafting, Tanzania Dual-Will Harmonization & Ancestral Property Mutation",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Tanzania" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Tanzania Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard NRI Indian Will Drafting & Plain-Paper Protocol",
              description:
                "Comprehensive Section 63 compliant Indian Will covering flats, land, NRE/NRO accounts, and Demat portfolios with Tanzanian asset ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dar es Salaam Consular Attestation & MFAET Legalization Package",
              description:
                "High Court advocate vetting with High Commission of India Dar es Salaam consular guidelines, Tanzanian advocate verification, and safe custody protocol.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Tanzania Dual-Will Harmonization & Ancestral Revenue Mutation Counsel",
              description:
                "End-to-end alignment of Tanzanian Cap 352 Wills with Indian Succession Act rules, Gujarat/Maharashtra revenue mutation support, and FEMA USD 1M remittance counsel.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania#howto",
      name: "How NRIs in Tanzania Execute a Legally Valid Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and safeguard an ironclad Indian Will for NRIs and OCIs residing in Tanzania.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Indian Asset Title & Genealogic Verification",
          "text": "Review title deeds, municipal tax receipts, Gujarat 7/12 extracts, Maharashtra property cards, and bank account details across India.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Bespoke Cross-Border Advocate Drafting",
          "text": "Draft a standalone Indian Will with jurisdictional ring-fencing clauses under Section 63 of the Indian Succession Act 1925.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Witness Execution & Consular Attestation",
          "text": "Execute the Will on plain A4 paper before two adult witnesses in Tanzania, or schedule an attestation appointment at the High Commission of India in Dar es Salaam.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Executor Registration & Safe Custody Protocol",
          "text": "Deliver certified copies to your named India-resident executor and deposit original records in safe legal custody to ensure fast transfer.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania#faq",
      mainEntity: NRI_TANZANIA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania#breadcrumb",
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
          "name": "Will Drafting for NRIs in Tanzania",
          "item":
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-tanzania",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    parameter: "Governing Statute",
    tanzaniaOnly: "Probate & Administration of Estates Act (Cap 352)",
    section228: "Indian Succession Act 1925 Section 228 (Ancillary)",
    dualWill: "ISA 1925 Section 63 + Harmonized Tanzania Cap 352",
  },
  {
    parameter: "Legal Status in India",
    tanzaniaOnly: "Unrecognized by Indian land offices and commercial banks",
    section228: "Recognized only after Indian High Court passes resealing order",
    dualWill: "Directly enforceable across all Indian states and registries",
  },
  {
    parameter: "Indian Court Resealing Needed",
    tanzaniaOnly: "Mandatory court petition under Section 228 in India",
    section228: "Compulsory High Court petition with certified probate copy",
    dualWill: "Zero court resealing needed; direct executor administration",
  },
  {
    parameter: "Timeline for Asset Transfer",
    tanzaniaOnly: "3 to 6 years (Tanzanian probate + Indian court delay)",
    section228: "18 to 36 months in Indian High Court proceedings",
    dualWill: "2 to 4 weeks with local executor and revenue mutation",
  },
  {
    parameter: "Indian Stamp Duty & Court Fees",
    tanzaniaOnly: "No Indian stamp duty, but full court litigation expense",
    section228: "Heavy ad valorem court fees on entire Indian estate valuation",
    dualWill: "Zero stamp duty on Will + nominal mutation application fees",
  },
  {
    parameter: "Risk of Accidental Revocation",
    tanzaniaOnly: "High risk; boilerplate Tanzanian clause revokes Indian Will",
    section228: "High risk; conflict between multiple foreign codicils",
    dualWill: "Zero risk; explicit mutual non-revocation covenants",
  },
  {
    parameter: "Revenue Mutation (7/12 & Land)",
    tanzaniaOnly: "Tehsildar rejects Tanzanian probate without Indian decree",
    section228: "Accepted after High Court ancillary decree is certified",
    dualWill: "Accepted immediately by Tehsildar with Pedhinama",
  },
];

export default function WillDraftingNrisInTanzaniaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_TANZANIA_SCHEMA) }}
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
              Will Drafting for NRIs in Tanzania
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
            <time dateTime="2026-11-02" className="text-[#6B7280]">
              Updated November 2, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 36 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Dar es Salaam to India · Cross-Border Counsel
                </span>
              </div>

              {/* Single H1: 36 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Tanzania
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Tanzanian-Indian families in Dar es Salaam, Arusha, and Zanzibar
                own substantial ancestral land, apartments, and bank deposits
                across Gujarat and Maharashtra. Under Tanzania&apos;s Probate and
                Administration of Estates Act (Cap 352), a Tanzanian Will cannot
                directly transfer Indian property. Our High Court advocates draft
                jurisdictionally ring-fenced Indian Wills that bypass Section 228
                probate delays, comply with FEMA regulations, and protect your
                family legacy.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#tanzania-vs-india-probate"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Cap 352 vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Tanzania Cap 352 Aligned</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Bypasses Sec 228 Delays</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 63 Plain Paper</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 43 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Worldwide Tanzanian Wills Fail in India
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Section 228 Foreign Probate Bottleneck
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Mandatory High Court Ancillary Resealing:</strong> An
                    order of probate issued in Dar es Salaam has no legal force
                    in India. Heirs must file an ancillary petition under Section
                    228 of the Indian Succession Act 1925, taking 18 to 36 months.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation of Prior Indian Wills:</strong> Standard
                    wills prepared by advocates in Tanzania contain universal
                    revocation clauses. This clause accidentally cancels your
                    Indian Will, causing bitter intestate disputes among siblings.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Rejection by Land Registries &amp; Banks:</strong> Revenue
                    Tehsildars in Gujarat and Maharashtra reject foreign court
                    documents. Certified 7/12 land mutation stalls without an
                    Indian Will naming a resident executor.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore NRI Indian Will Framework &amp; Rules</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriTanzaniaWillInteractive />

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
              Visual Legal Framework: Tanzania &amp; India Will Harmonization
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will drafted by High Court advocates protects
              your Indian assets, harmonizes with Tanzania&apos;s Probate Act Cap
              352, and prevents multi-year civil litigation in Indian courts:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-tanzania-og.jpg"
              alt="Will Drafting for NRIs in Tanzania Probate Cap 352 and Indian Succession Legal Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting for NRIs in Tanzania under Probate Cap 352 and Section 228 of the Indian Succession Act.
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
        <section id="tanzania-vs-india-probate" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Cross-Border Comparison</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Tanzania Cap 352 vs Indian Succession Act: Key Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Choosing the wrong testamentary structure creates severe delay and
              high court fees. Review how Indian courts and revenue authorities
              treat a single Tanzanian Will, an ancillary probate case, and a
              harmonized Dual-Will strategy:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Succession Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Single Tanzanian Will (Cap 352)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Sec 228 Resealing in India
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Harmonized Dual-Will Strategy
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
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.tanzaniaOnly}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.section228}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.dualWill}
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
              <span>Step-by-Step Transmission Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Legal 4-Step Tanzania-to-India Will Roadmap
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court advocates coordinate the entire cross-border process.
              Follow this structured 4-step roadmap to protect your Indian family
              estate from abroad:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Genealogic Audit",
                desc: "We verify title deeds, bank accounts, Gujarat 7/12 extracts, and Maharashtra property cards. We construct certified Pedhinama family trees to protect legal heir rights.",
              },
              {
                step: "02",
                title: "Ring-Fenced Drafting",
                desc: "Our advocates draft a standalone Indian Will restricted strictly to Indian assets. We include non-revocation covenants to safeguard your Tanzanian business and wills.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing",
                desc: "You execute the Will on plain A4 paper in Tanzania before two adult witnesses. Optional: We schedule consular attestation at the High Commission of India in Dar es Salaam.",
              },
              {
                step: "04",
                title: "Safe Custody & Transmission",
                desc: "We place registered copies in safe custody with your named Indian executor. When needed, our team handles local revenue mutation and FEMA repatriation seamlessly.",
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
              Tanzania Asset Ring-Fencing &amp; Non-Revocation Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              To prevent cross-border conflict between Tanzania&apos;s Probate Act
              (Cap 352) and the Indian Succession Act 1925, your Indian Will must
              contain an explicit territorial limitation clause. Copy and examine
              this verified statutory provision:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Jurisdictional Ring-Fencing & Non-Revocation Clause"
            code={`"1. TERRITORIAL LIMITATION & EXCLUSION OF FOREIGN ESTATE:
This Last Will and Testament relates strictly and exclusively to my movable, immovable, and financial assets situated within the territorial borders of the Republic of India. This Will shall have no application to, nor in any manner affect, alter, or administer, my business shares, bank deposits, personal effects, or real estate properties situated in the United Republic of Tanzania, which shall continue to be governed by my separate Tanzanian testamentary instrument executed under the Probate and Administration of Estates Act (Cap 352).

2. NON-REVOCATION OF OVERSEAS TESTAMENTARY DISPOSITIONS:
I hereby clarify and declare that any revocation clause contained herein revokes only earlier Wills, codicils, or testamentary writings previously executed by me in respect of my assets situated in India. Nothing contained in this instrument shall be construed as revoking, cancelling, or qualifying my existing or future testamentary instruments executed in the United Republic of Tanzania or any other foreign jurisdiction."`}
            explanation="Drafted under Section 62 and Section 63 of the Indian Succession Act 1925. This clause ensures that your Indian Will remains legally watertight while completely shielding your East African businesses and Tanzanian assets from conflicting court proceedings."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Executor Appointment Protocol
                  </span>
                  <span>Indian Resident Representation</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby nominate, constitute, and appoint [Name of India Resident Executor], residing at [Indian Residential Address], to be the sole Executor of this my Indian Will. In the event of their demise, incapacity, or unwillingness to act, I appoint [Name of Alternate Executor] as the substitute Executor with full powers to apply for probate, execute revenue mutations, and manage estate bank disbursements.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Appointing an India-resident executor allows immediate
                  representation before Sub-Registrars, municipal tax offices,
                  and banks without requiring Tanzanian executors to obtain Indian
                  visas or travel during probate.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#111827] mb-3">
                  Schedule Demarcation Checklist for Indian Assets
                </h4>
                <p className="text-xs text-[#55636D] mb-4">
                  Indian revenue authorities and banks require precise schedule
                  details to execute mutations:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Gujarat 7/12 &amp; 8-A Extracts:</strong> Survey numbers,
                      sub-district, village khata, and taluka details.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Maharashtra Property Cards &amp; Index II:</strong> City
                      survey (CTS) numbers, ward numbers, and registration volume.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>NRE/NRO Bank Accounts:</strong> IFSC code, branch,
                      account numbers, and explicit nominee directions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demat &amp; Mutual Funds:</strong> DP ID, client ID,
                      and folio numbers to prevent IEPF transfer.
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

          {/* Contextual Link to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Need to Calculate Capital Gains Tax on Inherited Property?
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Evaluate capital gains liability, indexation benefits, and
                    Section 54 tax deductions on ancestral real estate in India.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate Capital Gains Tax</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Repatriating Inherited Funds up to USD 1 Million
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate withholding tax under Section 195, Form 13 Lower TDS
                    savings, and annual FEMA outward remittance thresholds.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate TDS &amp; Repatriation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. TANZANIA TO INDIA ESTATE TRANSMISSION MANUAL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="max-w-4xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Globe2 className="w-4 h-4" />
              <span>Mandatory Operational Manual</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Tanzania to India Estate Transmission Manual
            </h3>
            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
              Over 55,000 people of Indian origin reside across the United Republic
              of Tanzania, predominantly in commercial centres such as Dar es
              Salaam (including Upanga, Kisutu, Kariakoo, and Masaki), Arusha,
              Mwanza, and Zanzibar Stone Town. This manual provides clear statutory
              guidelines for managing cross-border inheritance between Tanzania
              and India:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4 font-bold text-sm">
                01
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                FEMA 1999 &amp; OCI Inheritance
              </h4>
              <p className="text-xs sm:text-[13px] leading-[1.65] text-[#49585F]">
                Under Section 6(5) of FEMA 1999, non-residents and OCIs can
                lawfully inherit agricultural land, farmhouses, and commercial
                real estate. Having a clear Indian Will ensures prompt mutation
                without requiring prior approval from the Reserve Bank of India.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4 font-bold text-sm">
                02
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                Gujarat &amp; Maharashtra Records
              </h4>
              <p className="text-xs sm:text-[13px] leading-[1.65] text-[#49585F]">
                Ancestral properties in Surat, Rajkot, Jamnagar, Kutch, Mumbai,
                or Pune require certified family genealogical trees (Pedhinama)
                and 7/12 extracts. Our advocates coordinate local sub-division
                and mutation before the Mamlatdar or Tehsildar.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex items-center justify-center text-[#C65378] mb-4 font-bold text-sm">
                03
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">
                USD 1 Million Repatriation
              </h4>
              <p className="text-xs sm:text-[13px] leading-[1.65] text-[#49585F]">
                Proceeds from property sales or NRO balances can be remitted
                abroad up to USD 1,000,000 annually. We secure Form 13 Lower
                TDS certificates and issue Form 15CA/15CB filings to ensure
                frictionless bank clearance.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 bg-white rounded-2xl p-6 border border-[#172228]/10">
            <div>
              <div className="text-sm font-semibold text-[#111827] mb-1">
                Ready to protect your Indian family assets from Tanzania?
              </div>
              <p className="text-xs text-[#55636D]">
                Choose self-serve online Will drafting or speak with a senior
                High Court estate planning advocate.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 transition-colors"
              >
                <span>Draft Online Will</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 transition-colors"
              >
                <span>Consult Advocate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. ANCESTRAL PROPERTY & COPARCENARY RIGHTS SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-white rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Hindu Succession Act Compliance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Ancestral Property Rights &amp; Revenue Mutation Protocol
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Section 6 of the Hindu Succession Act 1956, all coparceners
                hold equal birth rights in ancestral property. In the landmark
                ruling{" "}
                <strong className="text-[#111827]">
                  Vineeta Sharma v. Rakesh Sharma (2020 SC)
                </strong>
                , the Supreme Court of India established that daughters have
                unconditional coparcenary rights identical to sons.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Excluding daughters or sisters residing in East Africa makes an
                informal partition invalid in court. Excluded legal heirs can
                challenge mutations within 12 years under the Limitation Act 1963.
                Our legal team conducts genealogical mapping and drafts comprehensive
                family settlement and testamentary instruments to prevent future
                partition lawsuits.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Advocate Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF7F0] border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>NRI Inherited Property Repatriation</span>
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
              <span>Cross-Border Legal Guidance</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRIs in Tanzania
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear statutory answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_TANZANIA_FAQS.map((item, idx) => (
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
                Related Indian Succession &amp; Asset Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related legal services, probate counsel, and repatriation
                solutions:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Will India Master Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate &amp; Resealing Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Relinquishment Deed (Haq Tyag)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/will-format-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Indian Will Format Guide</span>
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
                Advocate Anuj Anand Malik
              </a>{" "}
              · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This cross-border legal guide is prepared under the Indian Succession
              Act 1925, the Foreign Exchange Management Act (FEMA) 1999, the
              Registration Act 1908, and Tanzania&apos;s Probate and Administration
              of Estates Act (Cap 352). Precedents cited include Vineeta Sharma
              v. Rakesh Sharma (2020 SC). This content is published for informational
              purposes and does not constitute formal advocate-client engagement
              without prior written instruction.
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
