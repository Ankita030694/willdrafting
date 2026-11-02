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
  Coins,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriMaltaWillInteractive from "@/components/NriMaltaWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Malta: Guide | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in Malta. Protect properties, NRE/NRO accounts and assets in India under Indian Succession Act 1925.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in malta",
    "nri will drafting services malta",
    "indian will for nri in malta",
    "make a will for indian property from malta",
    "indian inheritance lawyer malta",
    "maltese civil code legitim indian assets",
    "eu regulation 650 2012 article 22 indian succession",
    "mfea apostille indian will valletta malta",
    "valletta sliema birkirkara nri property lawyer",
    "nro account inheritance repatriation malta",
    "dtaa india malta inherited property capital gains",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Malta | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Malta. Protect properties, NRE/NRO accounts and assets in India under Indian Succession Act 1925.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-malta-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Malta EU Brussels IV Succession Harmonization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Malta | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Malta. Protect properties, NRE/NRO accounts and assets in India under Indian Succession Act 1925.",
    images: ["/images/will-drafting-for-nris-in-malta-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_MALTA_FAQS = [
  {
    q: "Does Maltese Civil Code legitim apply to my properties in India?",
    a: "No. Under Section 5 of the Indian Succession Act, Indian law alone governs Indian land and flats. Maltese courts have no control over Indian land. Under Article 22 of EU rules, you can choose Indian law for your estate. This protects your Indian properties from Maltese forced heirship rules. A separate Indian Will keeps your assets safe.",
  },
  {
    q: "Can NRIs in Malta execute an Indian Will on plain paper?",
    a: "Yes. You can sign your Will on plain A4 paper under Section 63. You do not need Indian stamp paper while in Malta. You only need two adult witnesses. They watch you sign. Your witnesses must not be heirs named in the Will.",
  },
  {
    q: "Do I need an apostille from the Ministry for Foreign Affairs in Malta?",
    a: "Two adult witnesses make your Will valid under Indian law. You can also have a Maltese Notary verify your signature. Getting an apostille from the Foreign Ministry in Valletta gives strong proof. This prevents false challenges in Indian courts. It also speeds up property mutation.",
  },
  {
    q: "Why should NRIs in Malta avoid a single worldwide Will?",
    a: "A single global Will causes severe court delays. Indian land offices reject Maltese court papers. Heirs must get ancillary probate in India under Section 228. This requires certified translations. Having two separate Wills lets both estates settle fast without roadblocks.",
  },
  {
    q: "How does EU Regulation 650/2012 Article 22 protect Indian assets?",
    a: "Article 22 of EU rules lets you choose the law of your home country. Indian citizens in Malta can choose Indian law. This choice overrides default Maltese residence rules. It gives you 100% freedom to distribute your Indian assets. You decide who inherits your wealth.",
  },
  {
    q: "How are Indian NRE, NRO, and Demat accounts claimed from Malta?",
    a: "Bank nominees act only as caretakers under the Sarbati Devi Supreme Court ruling. Nominees do not own the money. A clear Indian Will names your true heirs. This lets your family claim bank funds and shares fast. They avoid expensive civil court succession certificates.",
  },
  {
    q: "Does Malta or India levy inheritance tax on inherited estates?",
    a: "Neither country levies an inheritance tax. India abolished estate duty in 1985. You inherit Indian property tax-free. Malta does not tax foreign assets. But selling inherited Indian land later brings capital gains tax. Under Article 13 of the tax treaty, taxes paid in India can be credited in Malta.",
  },
  {
    q: "How can heirs in Malta repatriate inherited property sale proceeds?",
    a: "Heirs first update land records using the Will. When selling, they get a Lower TDS Certificate under Section 197. This avoids a 20% tax deduction. Under RBI rules, heirs can send up to 1 million USD per year to Malta using an NRO account and Form 15CA and 15CB.",
  },
];

const NRI_MALTA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta",
      name: "Will Drafting for NRIs in Malta | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in Malta. Protect properties, NRE/NRO accounts and assets in India under Indian Succession Act 1925.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-malta-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Malta EU Brussels IV Succession Harmonization",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta#legalservice",
      name: "AMA Legal Solutions Malta-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-malta-og.jpg",
      description:
        "Cross-border Indian Will drafting, Maltese Civil Code legitim harmonization, EU Brussels IV Article 22 law election, and Indian asset transmission counsel for NRIs in Malta.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Malta" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Valletta" },
        { "@type": "City", name: "Birkirkara" },
        { "@type": "City", name: "Sliema" },
        { "@type": "City", name: "St. Julian's" },
        { "@type": "City", name: "Msida" },
        { "@type": "City", name: "Gzira" },
        { "@type": "City", name: "Mosta" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta#service",
      name: "Indian Will Drafting Services for NRIs in Malta",
      serviceType:
        "Cross-Border Succession, EU Brussels IV Article 22 Harmonization & Indian Estate Planning",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Malta" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Malta Will Drafting & Succession Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Indian Will for NRIs in Malta",
              description:
                "Complete Indian Will drafting with clear territorial clauses, plain-paper signing steps, and municipal land transfer guidance.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Dual-Will Malta-India Ring-Fenced Architecture",
              description:
                "Coordinated cross-border estate planning keeping Maltese assets separate from Indian land, preventing court clashes and double probate delays.",
            },
          },
          {
            "@type": "Offer",
            price: "64990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Advocate Cross-Border Estate & Execution Counsel",
              description:
                "Full legal support including Maltese Notary apostille guidance, MFEA attestation advice, and High Court probate representation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta#howto",
      name: "How NRIs in Malta Execute a Legally Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, ring-fence, and execute an ironclad Indian Will while residing in Malta under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Schedule & Title Verification",
          text: "List all Indian properties, demat folios, mutual funds, and bank accounts with exact registered deed details, municipal tax IDs, and bank IFSC codes.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "EU Regulation 650/2012 Article 22 Choice & Ring-Fencing",
          text: "High Court lawyers draft an Indian Will explicitly electing Indian law under Article 22 of EU Regulation 650/2012, shielding Indian assets from Maltese legitim.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper or Notary Execution in Malta",
          text: "Print the draft on plain paper. Sign before two adult witnesses in Malta, with optional Maltese Notary attestation and MFEA apostille.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Safe Custody & India Executor Briefing",
          text: "Send signed original copies to your chosen executors in India. Store digital backups. Prepare clear steps for local municipal land revenue offices.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta#faq",
      mainEntity: NRI_MALTA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta#breadcrumb",
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
          name: "Will Drafting for NRIs in Malta",
          item: "https://www.willdrafting.in/services/will-drafting-for-nris-in-malta",
        },
      ],
    },
  ],
};

const MALTA_COMPARISON_ROWS = [
  {
    parameter: "Governing Succession Statute",
    maltaLaw: "Maltese Civil Code (Cap 16) & EU Reg 650/2012 (Brussels IV)",
    indianLaw: "Indian Succession Act, 1925 (Lex Situs under Section 5)",
    crossBorderImpact:
      "Separate Indian Will guarantees Indian law governs Indian land and flats without foreign conflicts.",
  },
  {
    parameter: "Forced Heirship & Legitim Rules",
    maltaLaw: "Mandatory legitim (Articles 614-653): 1/3 for up to 4 children, 1/2 for 5+ children",
    indianLaw: "100% testamentary freedom over self-acquired property under Section 59",
    crossBorderImpact:
      "Article 22 EU election shields Indian assets from Maltese forced heirship claims.",
  },
  {
    parameter: "Will Execution & Witnessing",
    maltaLaw: "Public Will before Notary & 2 witnesses, or Secret Will in Notarial Archives",
    indianLaw: "Plain paper signing before 2 adult witnesses under Section 63",
    crossBorderImpact:
      "Executable right in Malta; MFEA apostille provides full validity in Indian courts.",
  },
  {
    parameter: "Court Probate Requirement",
    maltaLaw: "Opening of succession before Maltese court or Notarial deposit",
    indianLaw: "Mandatory only in Mumbai, Kolkata & Chennai High Courts; optional elsewhere",
    crossBorderImpact:
      "Standalone Indian Will avoids slow ancillary probate under Section 228.",
  },
  {
    parameter: "Nomination vs Ownership Rights",
    maltaLaw: "Direct bank transfer subject to overall estate accounting",
    indianLaw: "Nominee is only a trustee (Sarbati Devi); heirs hold beneficial title",
    crossBorderImpact:
      "Clear Indian Will transfers NRE/NRO funds and demat shares without civil court orders.",
  },
  {
    parameter: "Inheritance Tax & Repatriation",
    maltaLaw: "Zero estate duty; document stamp duty on local transfers",
    indianLaw: "Zero estate duty; capital gains governed by Section 197 & DTAA Article 13",
    crossBorderImpact:
      "Heirs can repatriate up to 1 million USD per year to Malta under RBI FEMA rules.",
  },
];

export default function WillDraftingNrisInMaltaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_MALTA_SCHEMA) }}
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
            <span aria-current="page" className="text-[#111827] font-semibold">
              Will Drafting for NRIs in Malta
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
            1. HERO SECTION (Single Strict H1: 47 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  Maltese Civil Code Cap 16 · EU Brussels IV Art 22 · High Court Counsel
                </span>
              </div>

              {/* Single H1: 47 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting Services for NRIs in Malta
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 18,000 Non-Resident Indians live and work across Malta in
                fintech, iGaming, financial services, and healthcare. If you own
                flats, plots, NRE or NRO accounts, or mutual funds in India,
                protecting your assets requires cross-border planning. Under
                Article 22 of EU Regulation 650/2012, Indian citizens can elect
                Indian law to govern their estate. This choice shields your
                Indian assets from Maltese Civil Code legitim rules. Our High
                Court advocates draft comprehensive Wills that prevent probate
                delays and secure your family.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Estate Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#malta-vs-india-succession"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Malta vs Indian Law</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>EU Brussels IV Art 22 Shield</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Probate Gridlock</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>MFEA Apostille Harmonized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 45 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Estate Pitfalls
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Single Worldwide Will Risk for Malta NRIs
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Maltese Legitim Entitlement:</strong> Maltese Civil Code Articles 614 to 653 give children a forced share of your estate. Without choosing Indian law under EU rules, relatives may claim forced shares from Indian land.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancillary Probate Freeze:</strong> Indian land offices and banks reject Maltese court orders. An Indian court requires ancillary probate under Section 228. This ties up assets for years.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominee Misconception:</strong> Under the landmark Sarbati Devi ruling, bank nominees are only caretakers. You need a clear Indian Will to transfer bank and demat assets without court delays.
                  </span>
                </li>
              </ul>
              <Link
                href="/templates/will-format-for-nri"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore NRI Indian Will Formats</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriMaltaWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (Dedicated Banner + User-Provided Showcase)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Cross-Border Legal Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Harmonizing Maltese &amp; Indian Succession Laws
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a strong Indian Will protects your family property in India, complies with EU rules, and stops probate delays:
            </p>
          </div>

          <div className="space-y-10">
            {/* Primary Malta Banner Figure */}
            <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <Image
                src="/images/will-drafting-for-nris-in-malta-og.jpg"
                alt="Will Drafting for NRIs in Malta EU Brussels IV Succession Harmonization"
                width={1200}
                height={675}
                priority
                className="w-full h-auto rounded-2xl object-cover"
              />
              <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  <strong>Figure 1:</strong> Overview of Indian Will drafting
                  for NRIs in Malta, EU Regulation 650/2012 Article 22 election,
                  and MFEA apostille harmonization.
                </span>
                <span>
                  Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
                </span>
              </figcaption>
            </figure>

            {/* Global NRI Cross-Border Protection Guide (Showcasing User-Provided Asset) */}
            <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <Image
                src="/images/nri-cross-border-will-guide.jpg"
                alt="Cross-Border NRI Estate Protection & Dual Will Architecture"
                width={1200}
                height={675}
                className="w-full h-auto rounded-2xl object-cover"
              />
              <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  <strong>Figure 2:</strong> International cross-border estate
                  planning architecture separating foreign domicile assets from
                  Indian real estate and financial investments.
                </span>
                <span>
                  Source: WillDrafting Cross-Border Practice Group
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="malta-vs-india-succession" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Malta Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Maltese law and Indian law have different rules for inheritance. Compare how both legal systems treat wills, forced shares, probate, and property transfer:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Succession Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Maltese Civil Code (Cap 16) / EU</th>
                    <th className="py-4 px-6 w-[26%]">Indian Succession Act, 1925</th>
                    <th className="py-4 px-6 w-[28%]">Cross-Border NRI Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {MALTA_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.maltaLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#172228]">
                        {row.crossBorderImpact}
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
              <span>Statutory Execution Framework</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Malta-India Estate Planning Roadmap: Legitim Shield
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this verified 4-step legal protocol designed by our High
              Court advocates to insulate your Indian wealth and streamline asset
              transmission for your heirs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Schedule & Title Verification",
                desc: "List all Indian assets including flats, land, shares, and bank accounts. Note down deed numbers and bank IFSC details.",
              },
              {
                step: "02",
                title: "EU Brussels IV Choice & Ring-Fencing",
                desc: "Draft a separate Indian Will. Choose Indian law under Article 22 of EU rules. This shields your estate from Maltese forced share claims.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing & MFEA Apostille",
                desc: "Sign before two adult witnesses in Malta. You can also get a Maltese Notary stamp and Foreign Ministry apostille for fast use in India.",
              },
              {
                step: "04",
                title: "Executor Briefing & Mutation Readiness",
                desc: "Keep original signed copies with your chosen executor in India. This enables swift land mutation and bank transfers.",
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
              Foreign Asset Ring-Fencing &amp; Indian Law Choice Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              To protect Indian land and bank funds from foreign claims, your Indian Will needs clear territorial limits. It must also choose Indian law under Article 22 of EU rules:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7">
              <CopyableNriPropertyClauseBox
                title="Maltese Legitim Shield & Territorial Ring-Fencing Clause"
                code={`"I, [Full Name], Indian Passport No. [Passport Number], currently residing at [Address in Valletta / Sliema / St. Julian's / Birkirkara], Republic of Malta, do hereby declare this to be my Last Will and Testament strictly in respect of all my immovable properties (including land, houses, and commercial premises) and movable properties (including NRE, NRO, and FCNR bank accounts, Demat folios, mutual funds, and fixed deposits) situated within the Republic of India.

PURSUANT TO ARTICLE 22 OF EU REGULATION (EU) NO 650/2012 (BRUSSELS IV), I HEREBY EXPRESSLY CHOOSE THE LAW OF INDIA (THE INDIAN SUCCESSION ACT, 1925) AS THE LAW TO GOVERN THE SUCCESSION TO MY INDIAN ESTATE AS A WHOLE.

I explicitly declare that this Will shall not apply to, govern, or revoke any separate testamentary disposition made by me in respect of my assets situated in the Republic of Malta or elsewhere outside India. This Will is executed pursuant to Section 5 and Section 59 of the Indian Succession Act, 1925, exercising my unconstrained testamentary freedom over my self-acquired assets, and exempting my Indian estate from the reserved portion (legitim) provisions of the Maltese Civil Code (Cap. 16)."`}
                explanation="This clause explicitly exercises the professio juris right under Article 22 of EU Regulation 650/2012, confirming that Indian succession law governs your Indian estate. It insulates your self-acquired Indian assets from forced heirship claims under Maltese Civil Code Articles 614-653."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between my-8">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Maltese Notary &amp; Execution Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Essential steps to ensure full validity across Malta and
                  India:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Must watch you sign
                      in Malta and cannot be named beneficiaries.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Notary Public Attestation:</strong> Authentication
                      by a Maltese Notary Public under Cap 55.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>MFEA Apostille in Valletta:</strong> Ministry
                      apostille under the 1961 Hague Convention.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Indian Executor Appointment:</strong> Clear
                      executor powers for municipal mutation and banking.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom NRI Will Drafting</span>
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
                    Calculate Inherited Property Capital Gains Tax
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Evaluate long-term capital gains, indexation benefits, and
                    Section 54 reinvestment relief before selling inherited
                    property in India.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Calculate Capital Gains</span>
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
                    Calculate NRI Property Sale TDS &amp; Repatriation
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Estimate Section 195 withholding tax, calculate Section 197
                    Lower TDS savings, and check RBI 1 Million USD repatriation
                    quotas to Malta.
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
            7. CROSS-BORDER LEGAL FRAMEWORK SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Private International Law Harmonization</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Maltese Civil Code Legitim &amp; EU Brussels IV Election
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Maltese Civil Code (Cap 16, Title III, Articles 614 to
                653), children and surviving spouses possess statutory rights to
                a reserved portion of the deceased person&apos;s estate. If you
                reside in Malta as an NRI without a tailored estate plan, the
                default provisions of EU Regulation 650/2012 Article 21 could
                apply Maltese succession rules to your worldwide estate.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Fortunately, Article 22 of EU Regulation 650/2012 allows Indian
                citizens to formally elect the law of India. In India, Section 5
                and Section 59 of the Indian Succession Act 1925 grant you
                absolute freedom to distribute self-acquired properties. Our High
                Court lawyers structure your Will to ring-fence your Indian
                assets completely against Maltese forced heirship claims.
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
              Frequently Asked Questions: Will Drafting for NRIs in Malta
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
            {NRI_MALTA_FAQS.map((item, idx) => (
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
                Explore related cross-border services, repatriation advice, and
                probate litigation counsel:
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
                <span>High Court Probate &amp; Will Contest</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Online Will Intake Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Complete Sitemap Directory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sitemap?category=services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Services Directory</span>
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
              Succession Act 1925, the Maltese Civil Code (Cap 16), EU Regulation
              (EU) No 650/2012 (Brussels IV), and the 1961 Hague Apostille
              Convention. Precedents cited include Sarbati Devi v. Usha Devi
              (1984 SC). This publication serves educational purposes and does
              not constitute individualized legal counsel.
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
