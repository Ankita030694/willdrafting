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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriOmanWillInteractive from "@/components/NriOmanWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Oman | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting services for NRIs in Oman. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act 1925.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in oman",
    "nri will drafting services oman",
    "indian will for nri in oman",
    "make a will for indian property from oman",
    "indian inheritance lawyer oman",
    "oman sultani decree 32 97 non muslim expat will",
    "indian embassy muscat will attestation",
    "muslim wasiyat estate planning oman",
    "nri inherit agricultural land india fema 1999",
    "nre nro bank account transmission without probate",
    "ama legal solutions cross border estate planning",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Oman | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Oman. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act 1925.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-oman-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Oman Indian Succession Act and Embassy Attestation Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Oman | WillDrafting.in",
    description:
      "Professional Indian Will drafting services for NRIs in Oman. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act 1925.",
    images: ["/images/will-drafting-for-nris-in-oman-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_OMAN_FAQS = [
  {
    q: "Does an Omani local will or court decree cover my flats and land in India?",
    a: "No. Under Section 5 of the Indian Succession Act, 1925, succession to immovable property is governed exclusively by the Lex Situs rule. Only Indian succession laws apply to land, flats, and plots located in India. Omani courts and notary publics possess zero jurisdiction over Indian real estate. Leaving Indian property without a dedicated Indian Will triggers extensive court freezes in India.",
  },
  {
    q: "How do Indian NRIs in Muscat or Salalah execute an Indian Will while in Oman?",
    a: "You do not need to fly to India or purchase Indian stamp paper. Under Section 63 of the Indian Succession Act, 1925, an Indian Will can be executed on plain A4 paper anywhere in the world. You sign the document in the physical presence of two adult independent witnesses who are not named as beneficiaries in the Will.",
  },
  {
    q: "How does consular attestation work at the Indian Embassy in Muscat?",
    a: "Consular attestation provides official proof of authentic execution. You book a consular appointment at the Embassy of India in Muscat located in the Diplomatic Area, Al Khuwair. You present your original Indian passport, valid Omani Resident Card, two physical copies of your Will, and two witnesses with valid passports. The consular officer notarizes your signatures under the Consular Act, 1948.",
  },
  {
    q: "How do Wasiyat rules apply to Muslim Indian expatriates living in Oman?",
    a: "Under the Muslim Personal Law (Shariat) Application Act, 1937, a Muslim testator can bequeath up to one-third of their net estate via Wasiyat to non-heirs or charities. Any bequest exceeding one-third or made in favor of an existing legal heir requires unanimous consent from all Quranic legal heirs after death. The remaining two-thirds passes automatically to Quranic heirs.",
  },
  {
    q: "What happens to NRE and NRO bank accounts if the account holder passes away?",
    a: "In Sarbati Devi, the Supreme Court of India established that a bank nominee is merely a collection trustee, not the owner. Without a valid Indian Will, bank branches in India freeze NRE, NRO, and FCNR fixed deposits and demand a court succession certificate. A clear Indian Will names your heirs directly and enables smooth asset transmission.",
  },
  {
    q: "Can an NRI residing in Oman inherit agricultural land in India?",
    a: "Yes. Under FEMA 1999 regulations, NRIs and OCIs can lawfully inherit agricultural land, plantation estates, and farmhouses from a resident Indian through a valid Will. While foreign nationals and non-residents cannot purchase agricultural land in India, inheriting land through a Will is completely legal.",
  },
  {
    q: "How can heirs in Oman repatriate money from inherited Indian properties?",
    a: "Under RBI foreign exchange rules, foreign legal heirs can transfer up to USD 1,000,000 every financial year from their NRO bank account. Our advocates assist with obtaining Lower TDS Certificates under Section 197 and coordinate Form 15CA and Form 15CB documentation with Chartered Accountants for smooth bank transfers.",
  },
  {
    q: "Why is a separate Indian Will critical rather than a combined worldwide will?",
    a: "Relying on a single worldwide will causes severe probate delays. If your will is submitted to a foreign court, Indian courts require an ancillary probate petition under Section 228 of the Indian Succession Act, taking up to two years. A separate Indian Will with a territorial ring-fencing clause isolates your Indian estate for fast settlement.",
  },
];

const NRI_OMAN_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman",
      name: "Will Drafting for NRIs in Oman | WillDrafting.in",
      description:
        "Professional Indian Will drafting services for NRIs in Oman. Protect properties, NRE/NRO accounts & investments in India under Indian Succession Act 1925.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-oman-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Oman Indian Succession Act and Embassy Attestation Guide",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman#legalservice",
      name: "AMA Legal Solutions NRI Cross-Border Estate Planning Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-oman-og.jpg",
      description:
        "Specialized cross-border succession counsel for Non-Resident Indians in Oman, covering Indian Succession Act drafting, embassy attestation, and FEMA compliance.",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Oman" },
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Muscat" },
        { "@type": "AdministrativeArea", name: "Dhofar" },
        { "@type": "AdministrativeArea", name: "Al Batinah" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman#service",
      name: "Cross-Border Indian Will Drafting for NRIs in Oman",
      serviceType:
        "NRI Estate Planning, Indian Will Drafting & Consular Attestation Support",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "Oman",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Oman NRI Indian Will Drafting Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "14990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard Plain-Paper Indian Will for Oman NRIs",
              description:
                "Section 63 ISA compliant plain-paper Indian Will drafting with territorial ring-fencing separating Omani assets.",
            },
          },
          {
            "@type": "Offer",
            price: "24990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive Estate Will with Embassy Muscat Protocol",
              description:
                "High Court advocate drafted Will covering Indian real estate, NRE/NRO accounts, and step-by-step Indian Embassy Muscat attestation dossier.",
            },
          },
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High-Net-Worth Cross-Border Multi-Asset Succession Package",
              description:
                "Comprehensive succession planning covering ancestral farmland, Demat equity portfolios, FEMA repatriation, and Shariat Wasiyat harmonization.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman#howto",
      name: "How NRIs in Oman Execute an Enforceable Indian Will",
      description:
        "Five-step protocol for Indian expatriates in Oman to draft, sign, and attest an Indian Will under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Asset Demarcation & Portfolio Inventory",
          text: "Itemize Indian flats, plots, ancestral farmland, NRE/NRO bank accounts, Demat folios, and mutual fund holdings with exact numbers.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Will Drafting & Ring-Fencing",
          text: "Our High Court advocates draft your Will with territorial ring-fencing clauses protecting Omani assets and gratuity benefits.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Execution in Oman",
          text: "Print the finalized Will on plain A4 paper in Oman and sign before two adult independent witnesses under Section 63.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Indian Embassy Muscat Consular Attestation",
          text: "Attend your booked appointment at the Embassy of India in Muscat (Al Khuwair) for consular notarization under the Consular Act, 1948.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Transmission Protocol & Executor Custody",
          text: "Deposit the original executed Will with your designated executor in India for smooth municipal mutation and FEMA fund repatriation.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman#faq",
      mainEntity: NRI_OMAN_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman#breadcrumb",
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
          name: "Will Drafting for NRIs in Oman",
          item:
            "https://www.willdrafting.in/services/will-drafting-for-nris-in-oman",
        },
      ],
    },
  ],
};

const OMAN_COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    omanLaw: "Sultani Decree No. 32/97 & Royal Decree 7/2024",
    secularAct: "Indian Succession Act, 1925 (Sections 5 & 63)",
    shariatAct: "Muslim Personal Law (Shariat) Application Act 1937",
  },
  {
    feature: "Territorial Jurisdiction",
    omanLaw: "Limited strictly to assets within Sultanate of Oman",
    secularAct: "Lex Situs rule: Governs all real estate across India",
    shariatAct: "Governs personal estate of Muslim citizens in India",
  },
  {
    feature: "Real Estate Succession",
    omanLaw: "Omani notary orders void for Indian land registries",
    secularAct: "100% testamentary freedom for self-acquired land",
    shariatAct: "Max 1/3 bequeathable; 2/3 passes to Quranic heirs",
  },
  {
    feature: "Execution Formalities",
    omanLaw: "Registered before Omani Notary Public",
    secularAct: "Plain A4 paper signed before two adult witnesses",
    shariatAct: "Oral or written Wasiyat with two competent witnesses",
  },
  {
    feature: "Consular Attestation",
    omanLaw: "Not required for purely domestic Omani matters",
    secularAct: "Embassy Muscat attestation under Consular Act 1948",
    shariatAct: "Embassy attestation validates execution authenticity",
  },
  {
    feature: "NRE/NRO Bank Accounts",
    omanLaw: "Omani courts cannot direct Indian commercial banks",
    secularAct: "Direct transmission bypassing succession certificate",
    shariatAct: "Account proceeds distributed per Shariat shares",
  },
  {
    feature: "Ancestral Farmland Rule",
    omanLaw: "No authority over agricultural land in India",
    secularAct: "NRIs legally inherit farmland under FEMA 1999",
    shariatAct: "Farmland split among heirs per Shariat quotas",
  },
  {
    feature: "Risk of Estate Freezes",
    omanLaw: "High if relying on an Oman-only will in India",
    secularAct: "Negligible with a separate territorial Indian Will",
    shariatAct: "Prevented when heirs provide post-mortem consent",
  },
];

export default function NriOmanWillPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_OMAN_SCHEMA) }}
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
              Will Drafting for NRIs in Oman
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
            <time dateTime="2026-10-31" className="text-[#6B7280]">
              Updated October 31, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1: 39 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Lawyers · Embassy Attestation · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 39 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Drafting for NRIs in Oman &amp; Expats
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Over 680,000 Indian citizens and expat families reside across
                Muscat, Salalah, Sohar, and Nizwa. Under Omani Sultani Decree No.
                32/97 and Royal Decree No. 7/2024, non-Muslim expatriates can
                register local wills for assets in Oman. However, under Section 5
                of the Indian Succession Act, 1925, succession to immovable
                property in India follows the Lex Situs principle. Without a
                separate Indian Will, land, apartments, and NRE/NRO accounts in
                India face immediate asset freezes. Our High Court advocates draft
                clear Indian Wills, ring-fence Omani assets, and guide consular
                attestation through the Indian Embassy in Muscat.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Draft Indian Will Online</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Consult Estate Advocate</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Sultani Decree Harmonized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Embassy Muscat Attestation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Lawyer Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Single H2 on page: 50 Chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Combined Worldwide Wills Fail
              </div>

              {/* Single H2: 50 chars (Strictly <= 70 chars) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Oman Expat Estate Risks: Protecting Indian Assets
              </h2>

              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Omani Notary &amp; Court Boundary:</strong> Under
                    Section 5 of the Indian Succession Act, Indian land
                    registries reject foreign court orders. Only a valid Indian
                    Will transfers title to Indian properties.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Nominee Trustee Bottleneck:</strong> Under the
                    landmark Supreme Court Sarbati Devi ruling, bank nominees
                    are merely custodians, not owners. Indian banks freeze NRE
                    and NRO accounts without an explicit Will.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancillary Probate Gridlock:</strong> A single global
                    will requires an ancillary probate petition under Section
                    228 of the Indian Succession Act, tying up Indian assets for
                    up to two years.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read Master NRI Will Guide for India</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE SCENARIO & DIAGNOSTIC COMPONENT
            ========================================================================= */}
        <NriOmanWillInteractive />

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
              Visual Legal Framework: Oman Law vs Indian Will
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How a dedicated Indian Will executed by NRIs in Oman protects your
              properties, ensures consular attestation at the Indian Embassy in
              Muscat, and prevents multi-year succession gridlock across borders:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-oman-og.jpg"
              alt="Will Drafting for NRIs in Oman Indian Succession Act and Embassy Attestation Guide"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indian Will drafting for
                NRIs in Oman under the Indian Succession Act, 1925, Sultani
                Decree 32/97, and FEMA regulations.
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
        <section id="oman-vs-indian-succession" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Legal Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Oman Law vs Indian Succession Act: Key Differences
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Failing to understand cross-border estate rules creates probate
              conflicts. Compare how Omani succession laws interact with the
              secular Indian Succession Act, 1925 and the Muslim Personal Law
              (Shariat) Application Act, 1937:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[880px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Oman Succession Framework (Decree 32/97)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Secular Indian Succession Act 1925
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Muslim Personal Law (Wasiyat)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {OMAN_COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.omanLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.secularAct}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.shariatAct}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. MANDATORY UNIQUE ON-PAGE ASSET: OMAN EXPAT WILL DRAFTING GUIDE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Mandatory Statutory Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Oman Expat Will Drafting Guide &amp; Embassy Muscat Protocol
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this structured 5-step roadmap to draft, execute, and attest
              your Indian Will while residing in Muscat, Salalah, Sohar, or
              Nizwa:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                step: "01",
                title: "Asset Audit & Demarcation",
                desc: "List all Indian flats with municipal survey numbers, alongside NRE, NRO, and Demat accounts with CDSL or NSDL folios.",
              },
              {
                step: "02",
                title: "Advocate Will Drafting",
                desc: "Our High Court lawyers draft your Will with territorial ring-fencing clauses protecting your Omani gratuity and LLC shares.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing in Oman",
                desc: "Print on plain A4 paper in Oman and sign before two adult independent witnesses under Section 63 of the Indian Succession Act.",
              },
              {
                step: "04",
                title: "Embassy Muscat Attestation",
                desc: "Book a slot at the Embassy of India in Muscat (Al Khuwair) for official consular attestation under the Consular Act, 1948.",
              },
              {
                step: "05",
                title: "Transmission Protocol",
                desc: "Deposit the original executed Will with your executor in India for smooth municipal mutation and FEMA fund repatriation.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Step {item.step}
                  </span>
                  <h4 className="text-base font-semibold text-[#111827] mb-2">
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
            6. COPY-PASTEABLE SEPARATE INDIAN WILL CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileText className="w-4 h-4" />
              <span>Drafting Architecture</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Foreign Asset Ring-Fencing Clause for Oman Expats
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Standard online templates often contain generic revocation clauses
              that inadvertently cancel foreign estate instruments. Use this High
              Court vetted ring-fencing clause in your Indian Will:
            </p>
          </div>

          <CopyableNriPropertyClauseBox
            title="Foreign Asset Ring-Fencing Clause (Sultanate of Oman Expat Specific)"
            code={`// TERRITORIAL RING-FENCING & NON-REVOCATION CLAUSE (OMAN & GLOBAL EXCLUSION):

1. DECLARATION OF TERRITORIAL SCOPE:
I hereby expressly declare and direct that this Last Will and Testament applies exclusively and strictly to all my movable, immovable, tangible, and intangible properties, assets, bank accounts (including but not limited to NRE, NRO, and FCNR fixed deposits), demat equity shares, mutual fund folios, residential flats, commercial plots, and agricultural land situated within the territorial boundaries of the Republic of India.

2. PRESERVATION OF OMANI & FOREIGN ASSETS:
This Will shall NOT apply to, affect, or govern any assets, Omani Rial bank balances, gratuity, end-of-service benefits, commercial LLC partnership shares, or personal effects situated within the Sultanate of Oman or any other international jurisdiction.

3. EXCLUSION OF CROSS-BORDER REVOCATION:
Any past, concurrent, or future will, codicil, testamentary declaration, wasiyat, or estate document executed by me in the Sultanate of Oman (under Sultani Decree No. 32/97 or Royal Decree No. 7/2024) or elsewhere in respect of non-Indian assets shall remain fully valid, active, and unrevoked by this instrument. This instrument specifically revokes prior testamentary writings ONLY to the extent that they pertain to assets situated in India.`}
            explanation="Under Section 70 of the Indian Succession Act, 1925, an unspecific revocation clause revokes all prior wills worldwide. This ring-fencing clause isolates your Indian estate while preserving your Omani commercial interests and end-of-service gratuity."
          />

          {/* Contextual Link to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Capital Gains Tax on Inherited Property
                  </h4>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    Evaluate indexation benefits, Section 54 exemptions, and net
                    capital gains on inherited Indian real estate.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Open Capital Gains Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378] shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Estimate NRI Property Sale TDS &amp; Repatriation
                  </h4>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    Calculate Section 195 withholding tax, Section 197 low-tax
                    certificates, and Form 15CA/CB documentation.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Open TDS Repatriation Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. DUAL LEGAL REGIMES: SECULAR WILLS VS MUSLIM WASIYAT
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Dual Succession Regimes</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Secular Wills &amp; Muslim Wasiyat Planning in Oman
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                The Indian expatriate community in Oman includes hundreds of
                thousands of professionals and merchant families governed by
                different personal laws. For Hindu, Christian, Sikh, Jain, and
                Parsi expats, the Indian Succession Act, 1925 grants absolute
                testamentary freedom to bequeath 100% of self-acquired assets to
                chosen beneficiaries.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                For Muslim NRIs in Oman, estate planning follows the Muslim
                Personal Law (Shariat) Application Act, 1937. Under Islamic
                Wasiyat rules, you can bequeath up to one-third of your estate to
                non-heirs or charities. Our High Court advocates draft both
                secular Wills and Shariah-compliant Wasiyats to prevent family
                disputes and court litigations.
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
            8. STATUTORY FAQS & OUTBOUND SPOKES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Cross-Border Law FAQs</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Oman NRI Indian Wills
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court advocates at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_OMAN_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h4 className="text-base font-semibold text-[#111827] mb-3 leading-snug">
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
                Related Cross-Border Succession Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related NRI property services, probate support, and legal directory:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Inherited Property Sale &amp; Repatriation</span>
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
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>WillDrafting Sitemap Directory</span>
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
              Succession Act, 1925, Omani Sultani Decree No. 32/97, Royal Decree
              No. 7/2024, the Muslim Personal Law (Shariat) Application Act,
              1937, the Foreign Exchange Management Act (FEMA), 1999, and the
              Diplomatic and Consular Officers (Oaths and Fees) Act, 1948.
              Judicial precedents cited include Smt. Sarbati Devi v. Smt. Usha
              Devi (AIR 1984 SC 346). This content provides educational legal
              information and does not replace personalized advocate counsel.
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
