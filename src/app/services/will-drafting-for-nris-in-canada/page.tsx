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
  FileText,
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriCanadaWillInteractive from "@/components/NriCanadaWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Canada | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Canada. Protect Punjab farmland, flats & bank accounts under Indian Succession Act. Ontario & BC compliant.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in canada",
    "nri will drafting services canada",
    "indian will for nri in canada",
    "make a will for indian property from canada",
    "indian inheritance lawyer canada",
    "ontario dual will indian property estate administration tax",
    "bc wesa indian will probate fees",
    "punjab ancestral land intkal virasat jamabandi fard",
    "web halris haryana mutation inheritance will",
    "hague apostille indian will canada 2024",
    "cra section 70 deemed disposition death indian assets",
    "ama legal solutions cross border estate planning canada",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Canada | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Canada. Protect Punjab farmland, flats & bank accounts under Indian Succession Act. Ontario & BC compliant.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-canada-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Canada Ontario BC and Indian Land Succession Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Canada | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Canada. Protect Punjab farmland, flats & bank accounts under Indian Succession Act. Ontario & BC compliant.",
    images: ["/images/will-drafting-for-nris-in-canada-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_CANADA_FAQS = [
  {
    q: "Does my Canadian Will automatically cover my agricultural land and flats in India?",
    a: "Under Section 5 of the Indian Succession Act, 1925, succession to immovable property is governed strictly by the Lex Situs rule (the law of India). Indian Sub-Registrars and Revenue Tehsildars require compliance with Indian testamentary law. A Canadian Will must undergo court probate in Canada and then ancillary probate in an Indian High Court, taking years. A separate Indian Will transfers land directly.",
  },
  {
    q: "How does the Ontario Dual-Will Strategy save 1.5% Estate Administration Tax?",
    a: "In Ontario, the Estate Administration Tax (EAT) charges about 1.5% on estate assets above $50,000. Under Granovsky Estate v. Ontario, individuals can execute a Primary Will for Ontario assets and a Secondary Will for foreign assets. This keeps your Indian agricultural lands and multi-crore apartments outside Ontario probate court calculations, saving thousands of Canadian dollars.",
  },
  {
    q: "Can an NRI or Canadian citizen with OCI inherit agricultural farmland in Punjab or Haryana?",
    a: "Yes. Although FEMA prohibits foreign citizens from buying farm land, FEMA Regulation 3(1)(b) allows NRIs and OCIs to inherit agricultural land, farmhouses, and plantations from an Indian resident. Having an attested Indian Will ensures seamless mutation without cousin disputes.",
  },
  {
    q: "How does Canada's accession to the Hague Apostille Convention in 2024 help?",
    a: "Canada joined the Hague Apostille Convention on January 11, 2024. You no longer need to book appointments at Indian Consulates in Toronto or Vancouver for document legalization. An apostille issued by Global Affairs Canada or provincial authorities makes your Canadian notarized Will legally valid in India.",
  },
  {
    q: "Do I need to buy Indian non-judicial stamp paper to make my Indian Will from Canada?",
    a: "No. Under the Indian Stamp Act, 1899, Wills are completely exempt from stamp duty. You can print your Indian Will on plain Letter or A4 paper in Brampton, Mississauga, Surrey, or Calgary and sign it before two independent adult witnesses.",
  },
  {
    q: "How does CRA Section 70(5) deemed disposition affect inherited Indian real estate?",
    a: "Under Section 70(5) of the Canadian Income Tax Act, a Canadian tax resident is deemed to have sold worldwide capital property at fair market value upon death. If the asset passes to a Canadian spouse, spousal rollover under Section 70(6) defers this tax. Foreign tax credits under Section 126 and the India-Canada DTAA prevent double taxation.",
  },
  {
    q: "What is Intkal Virasat and how does mutation happen on Web-HALRIS and PLRS?",
    a: "Intkal Virasat is the official mutation of inheritance in revenue land records under Sections 34 to 37 of the Punjab Land Revenue Act, 1887. The Halqa Patwari enters the mutation on the digital portal (Web-HALRIS in Haryana, PLRS in Punjab), the Field Kanungo verifies it, and the Tehsildar sanctions it into the Jamabandi.",
  },
  {
    q: "How can Canadian heirs repatriate sales proceeds of inherited Indian property to Canada?",
    a: "Under RBI regulations, foreign heirs can repatriate up to USD 1,000,000 (1 Million US Dollars) per financial year from their NRO account. Our advocates arrange the Section 197 lower TDS tax certificate and Form 15CA and Form 15CB certifications for smooth bank wire transfer.",
  },
];

const NRI_CANADA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada",
      name: "Will Drafting for NRIs in Canada | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Canada. Protect Punjab farmland, flats & bank accounts under Indian Succession Act. Ontario & BC compliant.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-canada-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Canada Ontario BC and Indian Land Succession Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada#legalservice",
      name: "AMA Legal Solutions Canada-India Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-canada-og.jpg",
      description:
        "Cross-border Indian testamentary succession, Canada-India estate harmonization, Section 63 Will drafting, Hague Apostille counsel, and FEMA asset repatriation.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Canada" },
        { "@type": "AdministrativeArea", name: "Ontario" },
        { "@type": "AdministrativeArea", name: "British Columbia" },
        { "@type": "AdministrativeArea", name: "Alberta" },
        { "@type": "AdministrativeArea", name: "Punjab" },
        { "@type": "AdministrativeArea", name: "Haryana" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada#service",
      name: "Indian Will Drafting & Cross-Border Succession for NRIs in Canada",
      serviceType:
        "Cross-Border Indian Will Drafting, Ontario Dual-Will Harmonization & Agricultural Land Mutation",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Canada Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard NRI Indian Will Drafting & Plain-Paper Protocol",
              description:
                "Comprehensive Section 63 compliant Indian Will covering flats, land, NRE/NRO accounts, and Demat portfolios with Canadian asset ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Hague Apostille 2024 & Provincial Notary Legalization Package",
              description:
                "High Court advocate vetting with Canadian provincial Hague Apostille roadmap, notary guidelines, and Indian safe custody registration.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Ontario & BC Dual-Will Harmonization & Revenue Mutation Counsel",
              description:
                "End-to-end alignment of Canadian Wills with Indian Succession Act rules, Punjab/Haryana revenue mutation support, and FEMA USD 1M remittance counsel.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada#howto",
      name: "How NRIs in Canada Execute a Legally Valid Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and ring-fence an Indian Will from Canada under the Indian Succession Act, 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule Asset Mapping & Title Verification",
          text: "Catalog all immovable properties, agricultural lands, Jamabandi records, NRE/NRO accounts, and Demat portfolios in India with exact Khewat and Khasra survey numbers.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Canadian Asset Ring-Fencing",
          text: "Draft the Indian Will with an explicit Non-Revocation Territorial Clause that isolates Canadian wills, RRSPs, TFSAs, and Ontario or BC assets.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Attestation & Hague Apostille in Canada",
          text: "Print the Will on plain Letter or A4 paper and sign before two independent adult witnesses. Optionally obtain a Hague Apostille from provincial authorities.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & Tehsildar Mutation Readiness in India",
          text: "Provide registered copies to your trusted Indian executor and deposit sealed duplicates with legal counsel to ensure seamless revenue mutation on Web-HALRIS or PLRS.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada#faq",
      mainEntity: NRI_CANADA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada#breadcrumb",
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
          name: "Will Drafting for NRIs in Canada",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-canada",
        },
      ],
    },
  ],
};

const SUCCESSION_COMPARISON_ROWS = [
  {
    parameter: "Governing Statutory Rule",
    canadianWill: "Provincial Act (e.g. Ontario SLRA, BC WESA)",
    singleGlobalWill: "Canadian Probate Court Rules",
    separateIndianWill: "Indian Succession Act, 1925 ss. 5 & 63",
  },
  {
    parameter: "Indian Immovable Property Validity",
    canadianWill: "Requires probate resealing or civil suit in India",
    singleGlobalWill: "Slow; needs Section 228 ancillary probate",
    separateIndianWill: "100% valid under Section 5 Lex Situs doctrine",
  },
  {
    parameter: "Ontario Estate Administration Tax (1.5%)",
    canadianWill: "Indian assets taxed at 1.5% in Ontario",
    singleGlobalWill: "Indian estate subject to Canadian probate fees",
    separateIndianWill: "Zero Ontario probate tax under Granovsky rule",
  },
  {
    parameter: "Attestation & Stamp Paper Rules",
    canadianWill: "Canadian provincial formal execution rules",
    singleGlobalWill: "Canadian court probate documentation",
    separateIndianWill: "Plain paper; 2 adult independent witnesses (Zero stamp duty)",
  },
  {
    parameter: "Punjab & Haryana Farmland Mutation",
    canadianWill: "Revenue Patwari rejects foreign court grants",
    singleGlobalWill: "High court intervention required",
    separateIndianWill: "Swift Intkal Virasat on Web-HALRIS or PLRS",
  },
  {
    parameter: "Risk of Accidental Will Revocation",
    canadianWill: "Blanket revocation revokes Indian wills",
    singleGlobalWill: "Worldwide revocation conflicts common",
    separateIndianWill: "Zero risk; territorial ring-fencing protects Canada",
  },
  {
    parameter: "Hague Apostille Recognition",
    canadianWill: "Apostille alone cannot bypass Indian Lex Situs",
    singleGlobalWill: "Demands apostilled probate grant from Canada",
    separateIndianWill: "Canadian notarized signature apostilled directly (Jan 2024)",
  },
];

export default function NriCanadaWillDraftingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_CANADA_SCHEMA) }}
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
              Will Drafting for NRIs in Canada
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
            <time dateTime="2026-10-31" className="text-[#6B7280]">
              Updated October 31, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 32 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <Globe2 className="w-4 h-4" />
                <span>
                  Cross-Border Counsel · Canada-India Estate Harmonization
                </span>
              </div>

              {/* Single H1: 32 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Canada
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 2.8 million persons of Indian origin live across the Greater
                Toronto Area, Metro Vancouver, Calgary, and Edmonton. Many hold
                ancestral farmland in Punjab and Haryana alongside urban flats in
                Delhi NCR, Chandigarh, or Ahmedabad. Under Section 5 of the
                Indian Succession Act, 1925, Indian land cannot be transmitted
                through a Canadian probate grant alone. Our High Court advocates
                draft dedicated Indian Wills that ring-fence Canadian assets,
                save Ontario probate tax, and secure agricultural land mutation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Cross-Border Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#comparison-table"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Canadian vs Indian Will</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Hague Apostille 2024</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Web-HALRIS Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Ontario 1.5% EAT</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with Single H2 (44 chars, <= 70 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Key Cross-Border Warning
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Canadian Will &amp; Indian Land Pitfall
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation of Indian Rights:</strong> Standard
                    Wills drafted by Canadian lawyers contain clauses revoking all
                    prior wills worldwide. This unwittingly cancels prior Indian
                    wills and plunges ancestral farmland into intestacy disputes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ontario Estate Administration Tax (1.5%):</strong> If you
                    include Indian assets in an Ontario general Will, Ontario probate
                    courts calculate estate tax on your worldwide property, costing
                    thousands of CAD unnecessarily.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Patwari &amp; Tehsildar Rejection:</strong> Indian revenue
                    officials refuse to update Jamabandi records based on foreign
                    probate grants without expensive Indian High Court proceedings.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read NRI Master Succession Blueprint</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriCanadaWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Cross-Border Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Canada-India Succession Architecture &amp; Farmland Protection
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Indian Will coordinated with your Canadian estate plan
              secures your family title, complies with Canadian provincial laws, and
              prevents multi-year revenue disputes in India:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-canada-og.jpg"
              alt="Will Drafting for NRIs in Canada Ontario BC and Indian Land Succession Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Canada-India Will drafting,
                Ontario dual-will strategy, and Web-HALRIS/PLRS Intkal mutation protocol.
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
        <section id="comparison-table" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Canadian Will vs Single Global Will vs Dedicated Indian Will
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Relying on a Canadian Will for Indian land creates severe delays and
              unnecessary tax exposure. Compare how Indian and Canadian legal systems
              treat these three estate planning routes:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Succession Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Canadian Provincial Will</th>
                    <th className="py-4 px-6 w-[26%]">Single Worldwide Will</th>
                    <th className="py-4 px-6 w-[26%]">Separate Indian Will</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {SUCCESSION_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.canadianWill}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.singleGlobalWill}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.separateIndianWill}
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
              <span>Statutory Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Cross-Border Execution from Canada
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              You can protect your Indian assets without traveling overseas. Follow
              this structured statutory path to execute an ironclad Indian Will from
              Ontario, British Columbia, Alberta, or Quebec:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Catalog & Jamabandi Audit",
                desc: "We verify Khewat, Khasra, and Jamabandi records for farmland in Punjab/Haryana, along with builder deeds and bank accounts across India.",
              },
              {
                step: "02",
                title: "Advocate Drafting & Ring-Fencing",
                desc: "Our High Court advocates draft your Indian Will with a territorial clause that protects your Canadian RRSP, TFSA, and local estate from revocation.",
              },
              {
                step: "03",
                title: "Attestation & Hague Apostille",
                desc: "Print on plain A4 paper in Canada and sign before two witnesses. Under the 2024 Hague Apostille accession, no Indian consular visit is required.",
              },
              {
                step: "04",
                title: "Safe Custody & Tehsildar Filing",
                desc: "We deposit sealed copies with legal counsel in India and provide your resident executor with complete documentation for Web-HALRIS or PLRS mutation.",
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
            6. ESSENTIAL LEGAL CLAUSE: SEPARATE INDIAN WILL RING-FENCING
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Copy-Pasteable Foreign Asset Ring-Fencing Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard Canadian Wills often inadvertently revoke prior testamentary
              instruments worldwide. To avoid conflicts, our cross-border lawyers
              insert an explicit territorial ring-fencing clause:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Non-Revocation Ring-Fencing Clause
                  </span>
                  <span>Cross-Border Safe</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament shall
                  apply exclusively and solely to all my immovable and movable
                  properties, estate, agricultural lands, plots, residential
                  apartments, NRE/NRO bank accounts, fixed deposits, Demat portfolios,
                  and financial assets situated within the territorial jurisdiction
                  of the Republic of India. I expressly declare that this Will does
                  NOT revoke, alter, or affect any Will, codicil, or testamentary
                  disposition executed by me in Canada or any other foreign
                  jurisdiction regarding properties located outside India, it being
                  my intention that my Indian estate and my Canadian estate shall be
                  governed by independent testamentary instruments.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Your Canadian estate lawyer should simultaneously add a
                  mirror exclusion clause in your Canadian Primary Will excluding
                  assets situated in India.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Indian Will Asset Schedule Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Revenue authorities and banks require exact identifying details:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Farmland Details:</strong> Khewat, Khatauni, and
                      Khasra numbers with Tehsil, Patwar circle, and District.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Flats &amp; Plots:</strong> Unit number, registered
                      conveyance deed number, and undivided share in land (UDS).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank Accounts:</strong> NRE, NRO, and FCNR account
                      numbers with branch IFSC codes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demat &amp; Shares:</strong> 16-digit Client ID,
                      Depository Participant (CDSL/NSDL), and folio details.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Inherited Property Capital Gains Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Calculate Indian long-term capital gains tax on ancestral real
                    estate with indexation benefits and Section 54 deductions.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-2.5 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate Capital Gains</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate Section 195 withholding TDS, Form 13 lower tax
                    certificates, and RBI USD 1 Million repatriation limits.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-2.5 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate NRI Sale TDS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CANADA DUAL-WILL STRATEGY & WEB-HALRIS INLAND MUTATION GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Building2 className="w-4 h-4" />
                <span>Ontario Estates Act &amp; Punjab Land Revenue Act</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Dual-Will Strategy &amp; Web-HALRIS Mutation Protocol
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                In Ontario, probate courts apply the Estate Administration Tax (EAT)
                of approximately $15 per $1,000 of estate value above $50,000. Under
                the landmark ruling in{" "}
                <strong className="text-[#111827]">
                  Granovsky Estate v. Ontario (1998)
                </strong>
                , testators can create multiple Wills. A Primary Will covers assets
                requiring Canadian probate, while a Secondary Will governs Indian
                assets. This keeps high-value Indian real estate out of Ontario
                probate calculations.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Simultaneously, in Punjab and Haryana, updating land ownership relies
                on Intkal Virasat under Sections 34 to 37 of the Punjab Land Revenue
                Act, 1887. With an attested Indian Will, your nominated Power of
                Attorney agent can file the mutation digitally on{" "}
                <strong className="text-[#111827]">Web-HALRIS</strong> (Haryana) or{" "}
                <strong className="text-[#111827]">PLRS</strong> (Punjab), enabling
                smooth entry into the Jamabandi without civil court disputes.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Dual-Will Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Self-Service Online Will</span>
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
              Frequently Asked Questions: Canada NRIs
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_CANADA_FAQS.map((item, idx) => (
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
                Related Cross-Border &amp; Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI estate planning guides, mutation workflows, and
                probate services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Property Sale &amp; Repatriation</span>
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
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>NRI Master Succession Hub</span>
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
                Advocate Anuj Anand Malik
              </a>{" "}
              · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This legal guide is prepared under the Indian Succession Act, 1925,
              the Punjab Land Revenue Act, 1887, the Indian Stamp Act, 1899, the
              Foreign Exchange Management Act, 1999, and the 1961 Hague Apostille
              Convention (Canada accession January 11, 2024). Judicial precedents
              cited include Granovsky Estate v. Ontario (1998) and Sarbati Devi v.
              Usha Devi (1984 SC). This content provides legal education and does
              not constitute formal attorney-client counsel.
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
