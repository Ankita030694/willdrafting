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
  Coins,
  Scale,
  Building2,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriSriLankaWillInteractive from "@/components/NriSriLankaWillInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Sri Lanka | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in Sri Lanka. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in sri lanka",
    "nri will drafting services sri lanka",
    "indian will for nri in sri lanka",
    "make a will for indian property from sri lanka",
    "indian inheritance lawyer sri lanka",
    "fema section 6 5 agricultural land inheritance",
    "cross palk strait estate succession counsel",
    "colombo kandy jaffna indian property will",
    "section 228 indian succession act probate resealing",
    "tamil nadu kerala ancestral property will",
    "dual will architecture sri lanka india",
    "ama legal solutions cross border estate counsel",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Sri Lanka | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Sri Lanka. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-sri-lanka-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Sri Lanka Cross-Border Estate Succession Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Sri Lanka | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Sri Lanka. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
    images: ["/images/will-drafting-for-nris-in-sri-lanka-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_SRI_LANKA_FAQS = [
  {
    q: "Does a Sri Lankan Will cover my assets and bank accounts in India?",
    a: "Under Section 5 of the Indian Succession Act 1925, Indian land and flats follow Indian law alone. Sri Lankan Wills are not accepted directly by Indian land offices or banks. If you probate a Will in Sri Lanka, you must file a second case in India under Section 228. This takes 2 to 4 years. A separate Indian Will avoids all foreign court delays.",
  },
  {
    q: "Can a Sri Lankan citizen or OCI inherit farm land in India under FEMA?",
    a: "Yes. Under Section 6(5) of FEMA 1999, non-residents and foreign citizens can inherit agricultural land from an Indian resident. Foreign citizens cannot buy farm land in India, but inheritance is fully legal. An Indian Will with village survey numbers lets the Tahsildar grant your Patta without dispute.",
  },
  {
    q: "Can Sri Lankan heirs sell inherited farm land in India and send money home?",
    a: "Yes. You can sell inherited farm land in India. But you must sell it only to an Indian citizen who lives in India. The sale money goes into your NRO bank account. You can send up to 1 Million US Dollars per financial year back to Sri Lanka using Form 15CA and Form 15CB tax forms.",
  },
  {
    q: "How do I sign an Indian Will in Sri Lanka without traveling to India?",
    a: "You can sign your Indian Will on plain white paper in Colombo, Kandy, or Jaffna. Under Section 63 of the Indian Succession Act 1925, you sign before two adult witnesses who watch you sign. You can get it stamped by a Sri Lankan Notary or the Indian High Commission in Colombo for extra legal weight.",
  },
  {
    q: "Why is a single worldwide Will risky for families in Sri Lanka and India?",
    a: "A single worldwide Will creates cross-border court blocks. When probated in a Sri Lankan court, the original Will stays locked in court files. Indian officers demand original records or slow Section 228 court orders. Also, standard cancellation words in Sri Lanka can undo your Indian plans. Two separate Wills keep both countries safe.",
  },
  {
    q: "Must I register my Indian Will at a Sub-Registrar Office in India?",
    a: "No. Under Section 18 of the Registration Act 1908 and the Indian Stamp Act 1899, Wills do not need registration. They are also 100% free from stamp duty. An unregistered Indian Will signed on plain paper before two witnesses is fully valid under Section 63. You can also register it later if you visit India.",
  },
  {
    q: "Does Sri Lankan personal law like Thesawalamai apply to Indian property?",
    a: "No. Thesawalamai, Kandyan law, and Sri Lankan Roman-Dutch laws apply only inside Sri Lanka. Under Section 5 of the Indian Succession Act 1925, succession to land in India follows Indian law alone. Properties in Chennai, Madurai, or Kochi are governed only by Indian law.",
  },
  {
    q: "What happens to NRE and NRO bank accounts if I only name a bank nominee?",
    a: "In Sarbati Devi (1984), the Supreme Court of India held that a bank nominee is only a caretaker. A nominee does not own the money. The funds belong to the heirs named in your Will. Listing your bank accounts and Demat IDs in an Indian Will gives your family clear ownership.",
  },
];

const NRI_SRI_LANKA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka",
      name: "Will Drafting for NRIs in Sri Lanka | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in Sri Lanka. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-sri-lanka-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Sri Lanka Cross-Border Estate Succession Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka#legalservice",
      name: "AMA Legal Solutions Sri Lanka-India Cross-Border Estate Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-sri-lanka-og.jpg",
      description:
        "Cross-border Indian Will drafting, FEMA Section 6(5) agricultural inheritance compliance, consular legalization, and ancestral property succession for NRIs in Sri Lanka.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Sri Lanka" },
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Western Province (Colombo)" },
        { "@type": "AdministrativeArea", name: "Central Province (Kandy)" },
        { "@type": "AdministrativeArea", name: "Northern Province (Jaffna)" },
        { "@type": "AdministrativeArea", name: "Tamil Nadu" },
        { "@type": "Kerala", name: "Kerala" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka#service",
      name: "Sri Lanka-India Cross-Border Will Drafting & Estate Succession",
      serviceType:
        "NRI Testamentary Drafting, FEMA Farmland Succession & Indian Asset Ring-Fencing",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "Sri Lanka",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Sri Lanka NRI Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standalone Indian Will Drafting for Sri Lankan NRIs",
              description:
                "Lex Situs compliant Indian Will covering residential flats, commercial shops, NRE/NRO bank accounts, and mutual funds with territorial ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "FEMA Section 6(5) Farmland & Ancestral Estate Synchronization",
              description:
                "Harmonization for ancestral farm lands in Tamil Nadu and Kerala, Patta mutation schedules, and Sri Lanka consular execution guidance.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Advocate Execution & Revenue Taluk Mutation Escrow",
              description:
                "Representation by High Court advocates for revenue Taluk Patta transfers, bank account claims, and fund remittance under Form 15CA and 15CB.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka#howto",
      name: "How Sri Lankan NRIs & OCIs Execute an Indian Will",
      description:
        "Four-step statutory protocol to draft, attest, and legalize an independent Indian Will from Sri Lanka under the Indian Succession Act 1925 and FEMA regulations.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Indian Asset Audit & Schedule Demarcation",
          text: "List all Indian assets including ancestral farm land survey numbers, Patta passbook copies, flat sale deeds, and bank accounts.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "High Court Advocate Drafting & Territorial Ring-Fencing",
          text: "Draft the standalone Indian Will with clear non-revocation clauses to protect against accidental cancellation by Sri Lankan Wills.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Section 63 Attestation Before Two Adult Witnesses",
          text: "Print the Will on plain A4 paper in Sri Lanka and sign it before two independent adult witnesses who watch you sign.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Notary Public & Indian Consular Legalization",
          text: "Get the signed paper attested by a Sri Lankan Notary Public or at the High Commission of India in Colombo or Consulate in Jaffna.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka#faq",
      mainEntity: NRI_SRI_LANKA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka#breadcrumb",
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
          name: "Will Drafting for NRIs in Sri Lanka",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-sri-lanka",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    slLaw: "Civil Procedure Code (Cap 101) & Roman-Dutch Common Law",
    indianLaw: "Indian Succession Act 1925 (Sections 5 & 63)",
    crossBorderImpact: "Lex Situs dictates Indian land follows Indian law exclusively",
  },
  {
    feature: "Farmland Inheritance",
    slLaw: "Customary laws apply inside Sri Lanka (Thesawalamai / Kandyan)",
    indianLaw: "FEMA 1999 Section 6(5) permits cross-border inheritance",
    crossBorderImpact: "Sri Lankan heirs lawfully hold farmland inherited from Indian kin",
  },
  {
    feature: "Cross-Border Recognition",
    slLaw: "Sri Lankan court probate is limited to local island assets",
    indianLaw: "Indian courts require Section 228 ancillary probate",
    crossBorderImpact: "Standalone Indian Will eliminates 2 to 4 years of court resealing",
  },
  {
    feature: "Legalization Protocol",
    slLaw: "Sri Lankan Notary Public certification & Consular attestation",
    indianLaw: "Section 63 ISA valid on plain paper before two witnesses",
    crossBorderImpact: "Sign on A4 paper in Colombo with Indian High Commission stamp",
  },
  {
    feature: "Stamp Duty & Paper Rules",
    slLaw: "Stamp duty schedules apply on Sri Lankan court filings",
    indianLaw: "100% exempt from Indian stamp duty under Stamp Act 1899",
    crossBorderImpact: "No costly Indian stamp paper required for overseas execution",
  },
  {
    feature: "Probate Requirement",
    slLaw: "Compulsory in Sri Lankan District Court for large estates",
    indianLaw: "Only mandatory in Chennai, Mumbai & Kolkata presidential towns",
    crossBorderImpact: "Indian assets outside presidential cities transfer without probate",
  },
  {
    feature: "Asset Transmission Speed",
    slLaw: "12 to 24 months average Sri Lankan District Court backlog",
    indianLaw: "7 to 21 days for direct bank claim & revenue Patta mutation",
    crossBorderImpact: "Protects ancestral property from unauthorized local claims",
  },
];

export default function NriSriLankaWillDraftingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(NRI_SRI_LANKA_SCHEMA),
        }}
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
              NRIs in Sri Lanka
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
            1. HERO SECTION (Single Strict H1: 36 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Cross-Palk Strait Counsel · FEMA Compliance
                </span>
              </div>

              {/* Single H1: 36 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Sri Lanka
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Many Indian families live in Colombo, Kandy, Nuwara Eliya, and
                Jaffna. They own homes, plots, and farm lands in Tamil Nadu and
                Kerala. Without an Indian Will, your assets get stuck in foreign
                court delays. You may also face tough questions from local land
                officers. Our High Court advocates draft clear Indian Wills. We
                protect your land, secure your bank savings, and help your family
                transfer property without stress.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Cross-Border Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Draft Online Indian Will</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>FEMA s. 6(5) Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs ISA Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Consular Attestation Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Indian Stamp Duty</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single Strict H2: 53 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Succession Pitfalls
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Section 6(5) FEMA &amp; Cross-Palk Strait Challenge
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>FEMA Farm Land Rules:</strong> Non-residents cannot
                    buy farm land in India. But FEMA Section 6(5) allows you to
                    inherit it from Indian kin. A clear Will stops local officers
                    from halting your land transfer.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Sri Lankan Court Delays:</strong> Probating a Will in
                    a Sri Lankan District Court takes years. Court files stay
                    locked in Sri Lanka. Filing Section 228 petitions in India
                    causes long delays and heavy costs.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Will Revocation:</strong> General
                    cancellation words in a Sri Lankan Will can cancel your
                    Indian Will by mistake. This leaves your Indian land without
                    clear heirs.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Global NRI Master Hub Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE DIAGNOSTIC COMPONENT
            ========================================================================= */}
        <NriSriLankaWillInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Cross-Border Legal Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Dual-Will Architecture
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a dedicated Indian Will synchronized with Sri Lankan estate
              arrangements ring-fences your wealth, ensures FEMA Section 6(5)
              compliance, and eliminates foreign probate gridlock:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-sri-lanka-og.jpg"
              alt="Will Drafting for NRIs in Sri Lanka Cross-Border Estate Succession Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Sri Lanka-India Dual-Will
                Architecture, FEMA Section 6(5) farmland inheritance, and Section
                228 probate bypass.
              </span>
              <span>
                Source: WillDrafting Editorial Team &amp; AMA Legal Solutions
              </span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. RESPONSIVE HTML COMPARISON TABLE
            ========================================================================= */}
        <section id="sri-lanka-vs-india-comparison" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Matrix</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Sri Lanka vs Indian Succession Law: Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Sri Lankan succession law combines the Civil Procedure Code,
              Roman-Dutch principles, and customary laws, operating differently
              from the Indian Succession Act 1925. Compare key cross-border
              parameters:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Succession Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Sri Lanka Succession Law</th>
                    <th className="py-4 px-6 w-[26%]">Indian Succession Act 1925</th>
                    <th className="py-4 px-6 w-[28%]">Cross-Border Legal Impact</th>
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
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.slLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
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
            5. MANDATORY UNIQUE ON-PAGE ASSET: FEMA AGRICULTURAL LAND COMPLIANCE
            ========================================================================= */}
        <section
          id="fema-agricultural-land-guide"
          className="w-full mb-16 sm:mb-24 bg-[#FAF7F0] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10 shadow-xs"
        >
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Mandatory Statutory Compliance Guide</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              FEMA Agricultural Land Inheritance Compliance Guide
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Rules under Section 6(5) of FEMA 1999 for Sri Lankan citizens and
              NRIs who inherit farm plots, tea estates, or ancestral groves in
              India:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-[#FAF7F0] text-[#047857] w-fit mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  Permitted by Inheritance
                </h4>
                <p className="text-xs sm:text-[13px] leading-[1.6] text-[#49585F]">
                  FEMA Section 6(5) lets foreign citizens and OCIs hold farm
                  land inherited from an Indian resident. It is fully legal.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#172228]/10 text-[11px] font-bold text-[#047857] uppercase tracking-wider">
                100% Lawful Holding
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-[#FAF7F0] text-[#C65378] w-fit mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  Purchase Strictly Prohibited
                </h4>
                <p className="text-xs sm:text-[13px] leading-[1.6] text-[#49585F]">
                  Non-residents cannot purchase farm land or farm houses in India.
                  You can only get them through legal inheritance.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#172228]/10 text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                No Purchase Allowed
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-[#FAF7F0] text-[#172228] w-fit mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  Restricted Resale Channels
                </h4>
                <p className="text-xs sm:text-[13px] leading-[1.6] text-[#49585F]">
                  When you sell inherited farm land, the buyer must be an Indian
                  citizen who lives in India. Foreign buyers cannot purchase it.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#172228]/10 text-[11px] font-bold text-[#172228] uppercase tracking-wider">
                Resident Indian Buyers Only
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-[#FAF7F0] text-[#C65378] w-fit mb-4">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-[#111827] mb-2">
                  1 Million USD Repatriation
                </h4>
                <p className="text-xs sm:text-[13px] leading-[1.6] text-[#49585F]">
                  Sale funds credit to your NRO account. You can send up to 1
                  Million US Dollars home each financial year with Form 15CA and
                  15CB.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#172228]/10 text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                Annual Remittance Limit
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10">
            <h4 className="text-lg font-semibold text-[#111827] mb-3">
              Revenue Mutation Protocol: Patta &amp; Chitta in Tamil Nadu and Kerala
            </h4>
            <p className="text-sm leading-[1.7] text-[#49585F] mb-4">
              In Tamil Nadu and Kerala, many families own ancestral plots. Taluk
              officers (Tahsildars) update Patta records under the Tamil Nadu
              Patta Pass Book Act, 1983, or Thandapper registers in Kerala.
              Without a clear Will, officers may question your foreign
              citizenship.
            </p>
            <p className="text-sm leading-[1.7] text-[#49585F]">
              Our advocates draft Wills with survey numbers and FEMA Section 6(5)
              clauses. We also prepare Power of Attorney papers so your trusted
              local kin can attend revenue hearings and secure clean mutation.
            </p>
          </div>
        </section>

        {/* =========================================================================
            6. STATUTORY 4-STEP ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory 4-Step Indian Will Protocol in Sri Lanka
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Execute a fully valid Indian Will from Colombo, Kandy, or Jaffna
              without traveling to India or facing complex legal delays:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset Schedule Mapping",
                desc: "We check title deeds, village survey numbers, and Patta records for your land or flats. We also list your bank accounts and Demat shares.",
              },
              {
                step: "02",
                title: "High Court Lawyer Drafting",
                desc: "Our advocates draft a clean Indian Will. We add territorial ring-fencing words so your Sri Lankan Will remains untouched.",
              },
              {
                step: "03",
                title: "Section 63 Attestation",
                desc: "Print your Will on plain A4 paper in Sri Lanka. Sign it before two adult witnesses who watch you sign under Section 63.",
              },
              {
                step: "04",
                title: "Notary Public & Legalization",
                desc: "Get your signature verified by a Sri Lankan Notary or the Indian High Commission in Colombo for smooth transfer in India.",
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
                  <h4 className="text-xl font-semibold text-[#111827] mb-2.5">
                    {item.title}
                  </h4>
                  <p className="text-[14.5px] leading-[1.65] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. ESSENTIAL LEGAL CLAUSE BOX (Foreign Asset Ring-Fencing)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Ring-Fencing &amp; Non-Revocation Clause
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard Wills drafted in Sri Lanka often contain boilerplate
              language that cancels all previous testamentary dispositions
              worldwide. To safeguard your Indian properties, your Indian Will
              must contain an explicit territorial limitation clause:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Territorial Limitation Clause
                  </span>
                  <span>Non-Revocation Recital</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;I hereby declare that this Last Will and Testament
                  relates EXCLUSIVELY to all my movable and immovable properties,
                  agricultural lands, plantation holdings, bank deposits, and
                  investments situated within the territory of the Republic of
                  India. I declare that I have executed, or intend to execute, a
                  separate testamentary disposition for my assets situated in the
                  Democratic Socialist Republic of Sri Lanka. This Indian Will
                  shall NOT revoke, modify, or affect in any manner my Sri Lankan
                  Will; AND conversely, no subsequent general revocation clause in
                  any foreign Will shall be construed as revoking this Indian Will
                  unless express reference is made hereto.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: Dual-Will architecture requires coordination between
                  your Sri Lankan legal counsel and Indian High Court advocates to
                  ensure both instruments operate harmoniously without
                  jurisdictional conflict.
                </p>
              </div>
            </div>

            {/* Execution Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#111827] mb-3">
                  Cross-Border Execution Checklist
                </h4>
                <p className="text-xs text-[#55636D] mb-4">
                  Ensure full compliance under Section 63 of the Indian
                  Succession Act 1925:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Must not be named as
                      beneficiaries or spouses of beneficiaries in the Will.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Simultaneous Attestation:</strong> Both witnesses
                      must observe you sign and sign in your presence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Notary Public Attestation:</strong> Notarization by
                      a Sri Lankan Notary Public verifies identity and capacity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Consular Legalization:</strong> Optional consular
                      stamp at High Commission of India for added evidentiary weight.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Schedule Sri Lanka-India Will Consultation</span>
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
                    Calculate Inherited Property Capital Gains
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Evaluate cost of acquisition indexation and long-term capital
                    gains tax under Indian Income Tax Act Section 48.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors self-start"
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
                    NRI Property Sale TDS &amp; Repatriation Calculator
                  </h4>
                  <p className="text-xs text-[#55636D]">
                    Estimate Section 195 withholding tax and RBI 1 Million USD
                    annual remittance eligibility for Sri Lankan bank transfers.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors self-start"
              >
                <span>Calculate Repatriation TDS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. DEMOGRAPHIC FOCUS: SRI LANKA HUBS & ANCESTRAL LAND
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Sri Lanka Demographics &amp; Ancestral Ties</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Demographic Focus: Sri Lanka Hubs &amp; Ancestral Land
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Sri Lanka has over 1.6 million people of Indian heritage. This
                includes 7,500 Indian citizens and over 1.6 million PIOs and OCIs
                across Colombo, Kandy, Nuwara Eliya, and Jaffna. Many hold shares
                in family trusts, tea or rubber estates, and ancestral lands in
                Tamil Nadu and Kerala.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under FEMA Section 6(5), foreign citizens can lawfully inherit
                farm land from Indian kin. But without a clear Will, local
                officers may delay your Patta transfer. Our advocates draft
                strong Wills and Power of Attorney deeds to safeguard your
                cross-Palk Strait property.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult Senior Advocate</span>
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
            9. STATUTORY FAQS & RELATED RESOURCES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Cross-Border Legal Guidance</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Sri Lanka NRI Wills
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
            {NRI_SRI_LANKA_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar (Outbound Spokes) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related NRI Succession &amp; Repatriation Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border services, repatriation protocols,
                and probate guidance:
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
                <span>Probate &amp; Letters of Administration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Global NRI Master Hub</span>
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
              This cross-border legal guide is prepared under the Indian
              Succession Act 1925 (Sections 5, 63, and 228), Section 6(5) of the
              Foreign Exchange Management Act (FEMA) 1999, the Sri Lankan Civil
              Procedure Code (Chapter XXXVIII), and RBI remittance regulations.
              This content provides legal education and does not replace
              individualized counsel from a licensed advocate.
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
