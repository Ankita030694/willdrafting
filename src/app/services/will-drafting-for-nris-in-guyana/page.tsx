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
  Coins,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import NriGuyanaWillInteractive from "@/components/NriGuyanaWillInteractive";
import CopyableNriPropertyClauseBox from "@/components/CopyableNriPropertyClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting for NRIs in Guyana | WillDrafting.in",
  },
  description:
    "Professional Indian Will drafting for NRIs in Guyana. Protect ancestral land, bank accounts and assets under the Indian Succession Act with our counsel.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "will drafting for nris in guyana",
    "nri will drafting services guyana",
    "indian will for nri in guyana",
    "make a will for indian property from guyana",
    "indian inheritance lawyer guyana",
    "indo guyanese ancestral property purvanchal bihar",
    "bharatiya sakshya adhiniyam 2023 evidence lineage",
    "high commission of india georgetown will attestation",
    "guyana civil law act wills act indian land",
    "fema agricultural land inheritance oci guyana",
    "georgetown new amsterdam berbice nri will",
    "ama legal solutions cross border estate planning guyana",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana",
      "x-default":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana",
    },
  },
  openGraph: {
    title: "Will Drafting for NRIs in Guyana | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Guyana. Protect ancestral land, bank accounts and assets under the Indian Succession Act with our counsel.",
    url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-drafting-for-nris-in-guyana-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Drafting for NRIs in Guyana and Indian Succession Legal Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting for NRIs in Guyana | WillDrafting.in",
    description:
      "Professional Indian Will drafting for NRIs in Guyana. Protect ancestral land, bank accounts and assets under the Indian Succession Act with our counsel.",
    images: ["/images/will-drafting-for-nris-in-guyana-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NRI_GUYANA_FAQS = [
  {
    q: "Does a Will made in Guyana cover my land and flats in India?",
    a: "No. Under Section 5 of the Indian Succession Act 1925, land and flats follow the Lex Situs rule. Indian domestic law rules all Indian real estate. A Will made in Georgetown or Berbice cannot be filed directly in land offices. It needs a slow court grant in India. Making a separate Indian Will lets your family claim title fast through local land offices.",
  },
  {
    q: "Can Guyanese citizens of Indian origin with OCI inherit farm land in India?",
    a: "Yes. Under FEMA Regulation 3(1)(b), foreign citizens with OCI status can lawfully inherit farm land, plots, and farmhouses from Indian relatives. Foreign citizens cannot buy farm land in India directly. But inheriting land through a valid Indian Will is safe by law. A signed Indian Will ensures smooth name changes before the local Tehsildar.",
  },
  {
    q: "How do Indo-Guyanese families prove lineage to ancestral land in UP and Bihar?",
    a: "Under the Bharatiya Sakshya Adhiniyam 2023, families prove roots using old ship lists from Georgetown and Kolkata. Our lawyers draft certified family trees (shajra nasab). We also file court suits under Section 34 of the Specific Relief Act. This secures clean title and updates land revenue books.",
  },
  {
    q: "Does Guyana belong to the Hague Apostille Convention for Indian Wills?",
    a: "No. Guyana is not in the 1961 Hague Apostille treaty. Wills signed in Guyana cannot get an Apostille seal. Instead, you follow the consular seal route: sign before a Guyanese Notary Public, get a foreign office seal, and finish attestation at the High Commission of India in Georgetown.",
  },
  {
    q: "Do I need Indian stamp paper when signing my Indian Will in Guyana?",
    a: "No. Under the Indian Stamp Act 1899, a Will needs zero stamp duty. You can print your Indian Will on plain A4 paper in Georgetown, New Amsterdam, or Berbice. It becomes fully legal once you sign it before two adult witnesses who are not named as heirs.",
  },
  {
    q: "How can I stop my Guyanese Will from cancelling my Indian Will by mistake?",
    a: "Standard wills signed in Guyana contain wording that cancels all past wills worldwide. To stop accidental cancellation, both documents must have clear local terms. Your Guyanese Will must cover only local assets, while your Indian Will governs Indian land, bank accounts, and shares.",
  },
  {
    q: "How can Guyanese heirs send property sale proceeds home under FEMA?",
    a: "Under RBI FEMA rules, heirs can send up to 1 Million US Dollars abroad each tax year through an NRO bank account. To avoid high tax, our lawyers help heirs get a Section 197 lower tax form (Form 13). We also get CA forms (Form 15CA and Form 15CB) for fast bank transfers.",
  },
  {
    q: "Can an Indo-Guyanese citizen living in Georgetown be named as executor?",
    a: "Yes. Indian law allows non-resident executors. Managing Indian property from Guyana needs local court visits and tax filings. We suggest naming an Indian resident co-executor. You can also give a Power of Attorney to a trusted lawyer.",
  },
];

const NRI_GUYANA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana#webpage",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana",
      name: "Will Drafting for NRIs in Guyana | WillDrafting.in",
      description:
        "Professional Indian Will drafting for NRIs in Guyana. Protect ancestral land, bank accounts and assets under the Indian Succession Act with our counsel.",
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
        url: "https://www.willdrafting.in/images/will-drafting-for-nris-in-guyana-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Will Drafting for NRIs in Guyana and Indian Succession Legal Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana#legalservice",
      name: "AMA Legal Solutions Guyana-India Succession Practice",
      url: "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/will-drafting-for-nris-in-guyana-og.jpg",
      description:
        "Cross-border Indian Will drafting, Guyana dual-will ring-fencing, Indo-Guyanese lineage checks under BSA 2023, HCI Georgetown consular attestation, and FEMA USD 1M wire transfer help.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "New Delhi",
        streetAddress: "Barakhamba Road, Connaught Place",
      },
      areaServed: [
        { "@type": "Country", name: "Guyana" },
        { "@type": "AdministrativeArea", name: "Georgetown" },
        { "@type": "AdministrativeArea", name: "New Amsterdam" },
        { "@type": "AdministrativeArea", name: "Berbice" },
        { "@type": "AdministrativeArea", name: "Demerara-Mahaica" },
        { "@type": "AdministrativeArea", name: "Delhi NCR" },
        { "@type": "AdministrativeArea", name: "Uttar Pradesh" },
        { "@type": "AdministrativeArea", name: "Bihar" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana#service",
      name: "Indian Will Drafting & Cross-Border Succession for NRIs in Guyana",
      serviceType:
        "Cross-Border Indian Will Drafting, Guyana Dual-Will Ring-Fencing & Indo-Guyanese Lineage Verification",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "Guyana" },
        { "@type": "Country", name: "India" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "NRI Guyana Estate Planning & Indian Will Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Standard NRI Indian Will Drafting & Plain-Paper Protocol",
              description:
                "Comprehensive Section 63 compliant Indian Will covering flats, land, NRE/NRO accounts, and Demat portfolios with Guyana asset ring-fencing.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "HCI Georgetown Consular Seal & Attestation Package",
              description:
                "High Court advocate vetting with High Commission of India Georgetown consular roadmap, notary guidelines, and Indian safe custody registration.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Indo-Guyanese Lineage Verification & Civil Court Title Suit Counsel",
              description:
                "End-to-end lineage checks under Bharatiya Sakshya Adhiniyam 2023, colonial ship record tracing, Section 34 court suits, and Tehsildar land mutation.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana#howto",
      name: "How NRIs and OCIs in Guyana Execute an Enforceable Indian Will",
      description:
        "Four-step statutory protocol to draft, execute, and ring-fence an Indian Will from Guyana under the Indian Succession Act 1925.",
      totalTime: "P5D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Jurisdictional Asset Mapping & Title Audit",
          text: "Map self-acquired land, ancestral shares, and bank accounts in India, keeping them apart from Guyanese assets.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Advocate Drafting & Lex Situs Ring-Fencing",
          text: "Draft a separate Indian Will stating Indian law governs under Section 5 ISA 1925 with non-revocation terms.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Plain-Paper Attestation before Two Witnesses",
          text: "Print the Will on plain A4 paper in Guyana and sign before two adult witnesses who are not heirs.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "High Commission of India Georgetown Consular Seal",
          text: "Sign before a Guyanese Notary. Get a foreign office seal. Finish attestation at the High Commission in Georgetown.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana#faq",
      mainEntity: NRI_GUYANA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana#breadcrumb",
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
          name: "Will Drafting for NRIs in Guyana",
          item: "https://www.willdrafting.in/services/will-drafting-for-nris-in-guyana",
        },
      ],
    },
  ],
};

const GUYANA_SUCCESSION_COMPARISON = [
  {
    parameter: "Governing Law",
    guyanaLaw: "Guyana Civil Law Act & Wills Act (Cap. 12:02)",
    indianLaw: "Indian Succession Act 1925 (Lex Situs rule)",
    crossBorderImpact: "Indian land follows Indian domestic law only.",
  },
  {
    parameter: "Land Title System",
    guyanaLaw: "Roman-Dutch transport & parate title deeds",
    indianLaw: "State Land Revenue Code & local Tehsildar mutation",
    crossBorderImpact: "A separate Indian Will allows direct land mutation.",
  },
  {
    parameter: "Consular Attestation",
    guyanaLaw: "Guyana Notary Public & Foreign Ministry seal",
    indianLaw: "High Commission of India Georgetown consular seal",
    crossBorderImpact: "Guyana is non-apostille; consular seals validate the Will.",
  },
  {
    parameter: "Inheriting Farm Land",
    guyanaLaw: "Cannot govern Indian agricultural land titles",
    indianLaw: "FEMA Regulation 3(1)(b) allows OCI land inheritance",
    crossBorderImpact: "OCIs can inherit farm land but cannot buy it directly.",
  },
  {
    parameter: "Probate in Indian Court",
    guyanaLaw: "Demerara High Court probate grant in Georgetown",
    indianLaw: "Mandatory only in Mumbai, Kolkata, Chennai High Courts",
    crossBorderImpact: "An Indian Will avoids long probate resealing cases in India.",
  },
  {
    parameter: "Paper & Stamp Duty",
    guyanaLaw: "Local Guyanese stamp duty fees apply",
    indianLaw: "Zero stamp duty under Indian Stamp Act 1899",
    crossBorderImpact: "Sign on plain A4 paper in Georgetown without Indian stamp tax.",
  },
  {
    parameter: "Money Wire Transfer",
    guyanaLaw: "Guyana Revenue Authority tax filing rules",
    indianLaw: "Income Tax Act s. 195 & FEMA USD 1M annual transfer",
    crossBorderImpact: "A Section 197 tax form cuts tax for safe wire transfers.",
  },
];

export default function NriGuyanaWillDraftingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NRI_GUYANA_SCHEMA) }}
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
              Will Drafting for NRIs in Guyana
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
                  High Court Advocates · Guyana-India Cross-Border Succession Counsel
                </span>
              </div>

              {/* Single H1: 39 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Indian Will Drafting for NRIs in Guyana
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Guyana is home to over 321,500 people of Indian origin across
                Georgetown, New Amsterdam, and Berbice. Many families hold ancestral
                land, homes, and bank funds in Uttar Pradesh and Bihar. Under
                Section 5 of the{" "}
                <strong className="text-[#111827]">Indian Succession Act 1925</strong>,
                land and flats in India follow Indian domestic law. Guyanese wills
                cannot easily transfer Indian land to your heirs. Our High Court
                advocates draft clean Indian Wills. We check family trees under the
                Bharatiya Sakshya Adhiniyam 2023, follow consular rules, and protect
                family land without court delay.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Cross-Border Lawyer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#guyana-vs-india-table"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Legal Systems</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>HCI Georgetown Seal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lex Situs Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Indian Stamp Duty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box with SINGLE STRICT H2 (39 Chars decoded) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Cross-Border Legal Trap
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why Guyanese Wills Fail for Indian Land
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Non-Apostille Route:</strong> Guyana is not in the Hague
                    Apostille treaty. Wills signed in Georgetown need consular seals
                    from the High Commission of India to be valid in Indian civil courts.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Accidental Revocation Risk:</strong> Standard wills signed
                    in Demerara often cancel all past wills worldwide. This wording
                    can invalidate your Indian Will by mistake.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ancestral Lineage Gaps:</strong> Land in Purvanchal and
                    Bihar remains listed under great-grandparents. Without BSA 2023
                    family tree proof, local Tehsildars reject inheritance claims.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Pan-India NRI Succession Frameworks</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <NriGuyanaWillInteractive />

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
              Visual Legal Framework: Guyana vs Indian Estate Plan
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              See how a separate Indian Will shields your assets. It works with local
              civil law. It protects family wealth under the Indian Succession Act
              1925:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/will-drafting-for-nris-in-guyana-og.jpg"
              alt="Will Drafting for NRIs in Guyana and Indian Succession Legal Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Indo-Guyanese estate planning,
                lineage verification, and consular attestation steps.
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
        <section id="guyana-vs-india-table" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Guyana Succession Law vs Indian Succession Act 1925
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Guyana follows common law and Roman-Dutch land transport rules. India
              follows statutory succession laws and state land revenue codes. Here is
              how both legal systems treat cross-border estates:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Guyana Law</th>
                    <th className="py-4 px-6 w-[26%]">Indian Law (ISA 1925)</th>
                    <th className="py-4 px-6 w-[26%]">Cross-Border Solution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {GUYANA_SUCCESSION_COMPARISON.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.guyanaLaw}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.indianLaw}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">
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
            5. STATUTORY 4-STEP ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Statutory Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Legal 4-Step Roadmap for NRIs in Guyana
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court lawyers manage the complete estate planning path. Follow
              these 4 simple steps to protect your Indian property from Guyana:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Asset & Title Audit",
                desc: "We check title deeds, survey numbers, khata papers, and tax receipts in India. This makes your ownership clear.",
              },
              {
                step: "02",
                title: "Bespoke Will Drafting",
                desc: "Our advocates draft a clean Indian Will. It ring-fences your Indian assets and prevents accidental cancellation of Guyanese wills.",
              },
              {
                step: "03",
                title: "Plain-Paper Signing",
                desc: "Print your Will on plain A4 paper in Guyana. Sign before two adult witnesses. You pay zero stamp duty.",
              },
              {
                step: "04",
                title: "HCI Consular Seal",
                desc: "Sign before a Guyanese Notary. Get a foreign office seal. Then finish attestation at the High Commission.",
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
              Without clear words, a foreign will can cancel an Indian Will. Our
              lawyers use this clause to protect your assets:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7">
              <CopyableNriPropertyClauseBox
                title="Local Asset Ring-Fencing Clause"
                code={`"I declare that this Will applies only to my land and homes (land, flats, houses, and ancestral shares) and movable assets (NRE, NRO, FCNR accounts, fixed deposits, shares, and demat accounts) located in India.

This Will shall NOT affect, alter, or cancel any Will, testament, or trust made by me in Guyana or elsewhere for assets outside India.

I also declare that succession to my land and flats in India shall follow Indian law under Section 5 of the Indian Succession Act 1925 and Section 30 of the Hindu Succession Act 1956, free from foreign estate proceedings under the Guyana Civil Law Act or Wills Act."`}
                explanation="This clause ring-fences your Indian assets, confirms Lex Situs control under Indian law, and keeps your foreign estate out of probate tangles."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#111827] mb-3">
                  Guyana NRI Execution Checklist
                </h4>
                <p className="text-xs text-[#55636D] mb-4">
                  Indian revenue offices and courts look for these key items:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Full Land Borders:</strong> Exact North, South, East,
                      and West borders, survey numbers, and undivided shares.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank &amp; Demat Details:</strong> Clear NRE, NRO, and
                      Demat account numbers with named primary heirs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Sign before two adults who
                      are not named as heirs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>HCI Consular Seal:</strong> Get official attestation at
                      the High Commission of India on Church Street, Georgetown.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom Deed Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Link to Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Calculate Inherited Property Capital Gains Tax
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Check your capital gains tax under Section 48 of the Indian Income
                    Tax Act before selling ancestral land or flats.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/capital-gains-tax-calculator-inherited-property"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Launch Capital Gains Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 flex flex-col justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-1">
                    Check NRI Property Sale TDS &amp; Wire Transfer
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55636D]">
                    Check Section 195 TDS tax rates and plan your yearly bank
                    transfers through NRO bank accounts.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Launch TDS &amp; Wire Transfer Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. MANDATORY UNIQUE ON-PAGE ASSET: BLUEPRINT
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Scale className="w-4 h-4" />
                <span>Mandatory Legal Guide</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Indo-Guyanese Lineage Verification Blueprint
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Many Indo-Guyanese citizens trace their roots to Ghazipur, Azamgarh,
                Gorakhpur, Arrah, and Patna. Under the{" "}
                <strong className="text-[#111827]">
                  Bharatiya Sakshya Adhiniyam 2023 (BSA)
                </strong>
                , our High Court advocates trace old ship lists from Georgetown and
                Kolkata port archives.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                We build certified family trees (shajra nasab) and file court suits
                under Section 34 of the Specific Relief Act. This allows smooth name
                changes before the Tehsildar. It also helps OCI heirs inherit ancestral
                farm land safely under FEMA rules.
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
                <span>Draft Online Indian Will (/start)</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Plain-English Summary Cards */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-base font-bold text-[#111827] mb-2">
                Why Write a Will Now?
              </h4>
              <p className="text-[13px] leading-[1.65] text-[#49585F]">
                Land in India does not pass on by word of mouth. Without a Will, your
                heirs face long court dates. A clean Will gives fast title. It saves
                time, cash, and stress for your children. It gives you peace of mind.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-base font-bold text-[#111827] mb-2">
                Who Needs an Indian Will?
              </h4>
              <p className="text-[13px] leading-[1.65] text-[#49585F]">
                Any NRI or OCI in Guyana who holds land, flats, or bank funds in India
                needs one. It protects family wealth. It keeps your Indian estate free
                from foreign court disputes. It stops sibling fights.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-base font-bold text-[#111827] mb-2">
                How We Help You
              </h4>
              <p className="text-[13px] leading-[1.65] text-[#49585F]">
                Our High Court lawyers draft your Will under Indian law. We guide your
                signing on plain paper. We help with embassy seals and land mutation in
                India. We protect your family rights.
              </p>
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
              <span>Legal Knowledge Base</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: NRI Wills in Guyana
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by cross-border succession counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_GUYANA_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar (Hub-and-Spoke Matrix) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related NRI Succession &amp; Asset Transmission Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related cross-border services, money transfer rules, and
                probate lawyers:
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
                href="/services/nri-inherited-property-sale-repatriation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Property Sale &amp; Bank Transfer</span>
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
                href="/start"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Online Will Intake (/start)</span>
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
              This cross-border legal guide is prepared under the Indian Succession
              Act 1925, the Hindu Succession Act 1956, the Foreign Exchange
              Management Act (FEMA) 1999, the Indian Stamp Act 1899, the Bharatiya
              Sakshya Adhiniyam 2023, the Guyana Civil Law Act, and the Wills Act of
              Guyana. This content provides educational information and does not
              replace individual legal advice.
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
