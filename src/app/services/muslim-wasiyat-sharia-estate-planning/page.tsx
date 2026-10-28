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
  Scale,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import MuslimEstateInteractive from "@/components/MuslimEstateInteractive";
import CopyableWasiyatClauseBox from "@/components/CopyableWasiyatClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Muslim Will Lawyer India: Sharia Wasiyat | WillDrafting",
  },
  description:
    "Expert advocate assistance for muslim will lawyer india under Shariat Act, 1937. High Court lawyer drafting, Wasiyat, lifetime Hiba & heir consent.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "muslim will lawyer india",
    "sharia compliant will drafting service india",
    "muslim estate planning wasiyat and hiba lawyer",
    "islamic inheritance lawyer india",
    "muslim personal law shariat application act 1937",
    "wasiyat 1 3rd limit lawyer india",
    "hiba bil ewaz lawyer india",
    "sunni faraid inheritance lawyer",
    "shia will drafting advocate india",
    "muslim daughter inheritance protection hiba",
    "mulla mahomedan law wasiyat advocate",
    "ama legal solutions muslim estate practice",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning",
  },
  openGraph: {
    title: "Muslim Will Lawyer India: Sharia Wasiyat | WillDrafting",
    description:
      "Expert advocate assistance for muslim will lawyer india under Shariat Act, 1937. High Court lawyer drafting, Wasiyat, lifetime Hiba & heir consent.",
    url: "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/muslim-wasiyat-sharia-estate-planning-og.jpg",
        width: 1200,
        height: 630,
        alt: "Muslim Will Lawyer India Sharia Compliant Wasiyat and Lifetime Hiba Planning Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslim Will Lawyer India: Sharia Wasiyat | WillDrafting",
    description:
      "Expert advocate assistance for muslim will lawyer india under Shariat Act, 1937. High Court lawyer drafting, Wasiyat, lifetime Hiba & heir consent.",
    images: ["/images/muslim-wasiyat-sharia-estate-planning-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const WASIYAT_FAQS = [
  {
    q: "Can a Muslim in India bequeath 100% of their property through a Will?",
    a: "No. Under the Muslim Personal Law (Shariat) Application Act, 1937 and Mulla's Mahomedan Law, a Muslim can bequeath at most one-third of their net property through a Wasiyat. The remaining two-thirds must pass to legal heirs according to Quranic Faraid rules, unless all heirs consent after death.",
  },
  {
    q: "Can a Sunni Muslim leave a Wasiyat bequest to an existing legal heir?",
    a: "Under Sunni Hanafi law, a bequest to any legal heir (such as one particular child or spouse) is void unless all other legal heirs consent after the testator passes away. Consent given during the testator's lifetime is not binding in Sunni personal law.",
  },
  {
    q: "How does Shia law differ from Sunni law regarding bequests to legal heirs?",
    a: "Under Shia Ithna Ashari law, a testator can bequeath up to one-third of the estate to any legal heir without needing the consent of other heirs. Consent for bequests exceeding one-third can be given either during the testator's lifetime or after death.",
  },
  {
    q: "How can a Muslim father protect his wife and daughters from distant relatives?",
    a: "Under default Sunni rules, daughters and wives do not inherit the whole estate, and distant agnatic residuaries (like brothers or uncles) inherit the remainder. To protect a wife and daughters, a father can gift property during life via Hiba or Hiba-bil-Iwaz. Lifetime gifts have no one-third limit.",
  },
  {
    q: "Is probate of a Muslim Will mandatory in Indian High Courts?",
    a: "No. Under Section 213(2) of the Indian Succession Act, 1925, Mahomedan Wills are exempt from mandatory probate across India, including Mumbai, Kolkata, and Chennai. However, registering the Wasiyat with the local Sub-Registrar provides strong proof and prevents forgery claims.",
  },
  {
    q: "Does an oral gift (Hiba) of immovable property require mandatory registration?",
    a: "In Hafeeza Bibi v. Shaikh Farid (2011), the Supreme Court held that an oral Hiba is valid if it fulfills offer, acceptance, and delivery of possession. Under Section 129 of the Transfer of Property Act, oral Muslim gifts are exempt from Section 123. Still, a registered deed prevents municipal record disputes.",
  },
  {
    q: "How does unpaid Mahr affect the distribution of a deceased Muslim's estate?",
    a: "Unpaid prompt or deferred Mahr is an unsecured debt under Muslim personal law. Debts must be paid out of the estate before any Wasiyat bequest or Faraid inheritance is calculated. A widow can retain possession of her late husband's property until her Mahr debt is paid.",
  },
  {
    q: "What happens if a Muslim marries under the Special Marriage Act, 1954?",
    a: "If a Muslim registers their marriage under the Special Marriage Act, 1954, succession is governed by the Indian Succession Act, 1925 rather than Shariat law. The individual gains complete testamentary freedom to bequeath 100% of their property to anyone without the one-third limit.",
  },
];

const WASIYAT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning#webpage",
      url: "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning",
      name: "Muslim Will Lawyer India: Sharia Wasiyat | WillDrafting",
      description:
        "Expert advocate assistance for muslim will lawyer india under Shariat Act, 1937. High Court lawyer drafting, Wasiyat, lifetime Hiba & heir consent.",
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
        url: "https://www.willdrafting.in/images/muslim-wasiyat-sharia-estate-planning-og.jpg",
        width: 1200,
        height: 630,
        caption:
          "Muslim Will Lawyer India Sharia Compliant Wasiyat and Lifetime Hiba Planning Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning#legalservice",
      name: "AMA Legal Solutions Muslim Estate & Sharia Wasiyat Practice",
      url: "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/muslim-wasiyat-sharia-estate-planning-og.jpg",
      description:
        "Pan-India Sharia-compliant testamentary succession, Wasiyat drafting, lifetime Hiba structuring, and Islamic inheritance legal counsel specializing in High Court advocacy and Sub-Registrar registration.",
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
        { "@type": "AdministrativeArea", name: "Telangana" },
        { "@type": "AdministrativeArea", name: "Uttar Pradesh" },
        { "@type": "AdministrativeArea", name: "West Bengal" },
        { "@type": "AdministrativeArea", name: "Kerala" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning#service",
      name: "Muslim Wasiyat Drafting, Sharia Estate Planning & Lifetime Hiba Registration",
      serviceType:
        "Sharia-Compliant Will (Wasiyat) Drafting, Lifetime Hiba Structuring & SRO Registration",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Sharia Estate Planning & Wasiyat Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "9990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Essential 1/3rd Sharia Wasiyat Drafting",
              description:
                "Sharia-compliant Will drafted under the Muslim Personal Law (Shariat) Application Act, 1937 respecting the 1/3rd net disposable estate limit and debt clearance recitals.",
            },
          },
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive Wasiyat & Heir Consent Documentation",
              description:
                "Bespoke Wasiyat drafting with Schedule demarcations, family tree Faraid share calculation, and post-demise heir consent deeds to prevent civil inheritance challenges.",
            },
          },
          {
            "@type": "Offer",
            price: "39990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Complete Sharia Estate Ring-Fencing (Wasiyat + Lifetime Hiba & SRO Support)",
              description:
                "End-to-end estate structuring combining testamentary Wasiyat for 1/3rd assets with registered lifetime Hiba deeds to protect daughters and spouses from agnatic residuary claims.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning#howto",
      name: "How to Execute a Legally Enforceable Sharia-Compliant Estate Plan in India",
      description:
        "Four-step statutory protocol to calculate net estate, draft a valid 1/3rd Wasiyat, document legal heir consent, and register lifetime Hiba deeds.",
      totalTime: "P7D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Net Estate & Debt Clearance Calculation",
          text: "Deduct funeral expenses, debts, and unpaid prompt or deferred Mahr to ascertain the true net estate available for succession.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Faraid Share Mapping & 1/3rd Allocation",
          text: "Map all Quranic Sharers and Residuaries under Sunni or Shia rules, ensuring testamentary bequests remain strictly within the one-third limit.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Advocate Drafting & Heir Consent Structuring",
          text: "Draft bespoke Wasiyat recitals compliant with Mulla Mahomedan Law and structure written heir consent agreements for bequests to heirs.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Sub-Registrar SRO Registration or Lifetime Hiba",
          text: "Present the Wasiyat for biometric registration before the Sub-Registrar or execute registered lifetime Hiba deeds with actual delivery of possession.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning#faq",
      mainEntity: WASIYAT_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning#breadcrumb",
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
          name: "Muslim Will Lawyer India",
          item:
            "https://www.willdrafting.in/services/muslim-wasiyat-sharia-estate-planning",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    wasiyat: "Shariat Application Act 1937 & Mulla Mahomedan Law",
    hiba: "Transfer of Property Act 1882 s. 129 & Mahomedan Law",
    genericIsa: "Indian Succession Act 1925 s. 59 (Hindu/Secular)",
  },
  {
    feature: "Disposable Estate Limit",
    wasiyat: "Strictly capped at 1/3rd of net estate",
    hiba: "100% of property can be gifted during lifetime",
    genericIsa: "100% allowed (Void for Muslims under Shariat)",
  },
  {
    feature: "Bequest to Existing Legal Heir",
    wasiyat: "Sunni: Void without post-death consent; Shia: Valid up to 1/3",
    hiba: "100% valid to any child, spouse, or non-relative",
    genericIsa: "Allowed freely without requiring co-heir consent",
  },
  {
    feature: "Timing of Legal Heir Consent",
    wasiyat: "Sunni: Only after death; Shia: During life or after death",
    hiba: "No heir consent required during lifetime transfer",
    genericIsa: "No consent mechanism exists in standard templates",
  },
  {
    feature: "Daughter & Wife Protection",
    wasiyat: "Limited; 2/3rds remains subject to residuary agnate claims",
    hiba: "Complete; transfers 100% unencumbered title immediately",
    genericIsa: "Fails in court if challenged by omitted Sharia heirs",
  },
  {
    feature: "Compulsory SRO Registration",
    wasiyat: "Optional under law, but highly recommended for title security",
    hiba: "Immovable gift registered under Registration Act s. 17",
    genericIsa: "Optional under Section 18 of Registration Act 1908",
  },
  {
    feature: "Probate in Presidency Towns",
    wasiyat: "Exempt under Section 213(2) of Indian Succession Act",
    hiba: "Not applicable; inter vivos transfer effective at once",
    genericIsa: "Mandatory for Hindu/Parsi wills in Mumbai/Kolkata/Chennai",
  },
];

export default function MuslimWasiyatShariaEstatePlanningPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WASIYAT_SCHEMA) }}
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
              Muslim Will Lawyer India
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
            1. HERO SECTION (Single Strict H1: 47 Chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Advocates · Shariat Act 1937 · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 47 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Muslim Wasiyat &amp; Sharia Estate Planning Lawyers
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Standard Indian Will templates fail for Muslims. Under the{" "}
                <strong className="text-[#111827]">
                  Muslim Personal Law (Shariat) Application Act, 1937
                </strong>
                , a Muslim cannot bequeath more than one-third of their net
                estate without legal heir consent. Using secular templates can
                make your Will void in court. Our High Court advocates draft
                genuine Sharia-compliant Wasiyats and structure lifetime Hiba
                transfers. This protects your spouse and daughters from future
                court battles.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Sharia Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#wasiyat-vs-hiba"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Wasiyat vs Hiba</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Shariat Act Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>1/3rd Rule Vetted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>SRO Sub-Registrar Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Advocate Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Generic Online Templates Fail
              </div>
              {/* Strictly <= 70 chars, no em-dash */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The One-Third Limit &amp; Bequest to Heir Trap
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Violating the 1/3rd Wasiyat Cap:</strong> Indian
                    succession templates let users bequeath 100% of assets. For
                    Muslims, any bequest exceeding one-third of the net estate is
                    void without heir consent.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Sunni Ban on Bequests to Legal Heirs:</strong> Under
                    Sunni law, leaving a Wasiyat bequest to a legal heir without
                    post-demise consent of all other heirs is completely void in
                    court.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Unpaid Mahr and Debts Neglected:</strong> Sharia
                    mandates clearing funeral costs and unpaid Mahr before
                    calculating estate shares. Ignoring this causes probate and
                    mutation disputes.
                  </span>
                </li>
              </ul>
              <Link
                href="/templates/muslim-will-wasiyat-format-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Muslim Wasiyat Formats &amp; Clauses</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <MuslimEstateInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Documentation</span>
            </div>
            {/* Strictly <= 70 chars, no em-dash */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Muslim Wasiyat vs Lifetime Hiba
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Wasiyat and lifetime Hiba strategy drafted by High
              Court advocates protects your family, satisfies Sharia Faraid
              principles, and secures clear land records:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/muslim-wasiyat-sharia-estate-planning-og.jpg"
              alt="Muslim Will Lawyer India Sharia Compliant Wasiyat and Lifetime Hiba Planning Counsel"
              width={1200}
              height={630}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Muslim Wasiyat drafting
                under the Shariat Application Act, 1937 and Mulla Mahomedan Law.
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
        <section id="wasiyat-vs-hiba" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            {/* Strictly <= 70 chars, no em-dash */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Wasiyat vs Lifetime Hiba: Statutory Comparison Table
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Choosing the wrong legal instrument can leave your family home open
              to unexpected claims by distant relatives. Compare how Indian
              courts evaluate a Sharia Wasiyat, a Lifetime Hiba Gift, and a
              generic Indian Succession Act Will:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Testamentary Wasiyat (Muslim Will)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Lifetime Hiba (Inter Vivos Gift)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Generic Indian Succession Act Will
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
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.wasiyat}
                      </td>
                      <td className="py-5 px-6 text-[#172228]">
                        {row.hiba}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.genericIsa}
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
              <span>Advocate Execution Roadmap</span>
            </div>
            {/* Strictly <= 70 chars, no em-dash */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory 4-Step Sharia Estate Planning Protocol
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court succession advocates guide Muslim families through a
              proven 4-step protocol. We ensure religious integrity, compliance
              with Indian law, and lasting peace of mind:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Debt & Mahr Clearance",
                desc: "We calculate the true net estate by accounting for funeral charges, third-party liabilities, and unpaid prompt or deferred Mahr owed to the surviving wife.",
              },
              {
                step: "02",
                title: "Faraid Share Audit",
                desc: "Our legal team maps Quranic Sharers and Residuaries under Sunni or Shia rules. We ensure any testamentary bequest remains strictly within the one-third cap.",
              },
              {
                step: "03",
                title: "Advocate Legal Drafting",
                desc: "We draft customized Wasiyat recitals with clear asset boundaries, or structure separate post-demise heir consent deeds to satisfy High Court requirements.",
              },
              {
                step: "04",
                title: "SRO Filing or Hiba Delivery",
                desc: "We handle biometric registration at the local Sub-Registrar office for Wasiyats, or execute registered Hiba deeds with actual delivery of physical possession.",
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
            {/* Strictly <= 70 chars, no em-dash */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Essential Sharia-Compliant Wasiyat Clause Structure
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              In Ghulam Mohammad v. Ghulam Husain, the Privy Council established
              that testamentary bequests exceeding one-third are invalid
              without heir consent. A legally sound Muslim Will must state debt
              discharge and clear one-third boundaries:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7">
              <CopyableWasiyatClauseBox
                title="Sample Sharia 1/3rd Limit & Mahr Discharge Clause"
                code={`"WHEREAS I am a Muslim governed by Muslim Personal Law (Shariat) Application Act, 1937 in matters of testamentary succession;

I HEREBY DIRECT that upon my demise, my Executor shall first pay and discharge all my funeral and deathbed expenses, followed by all my lawful debts, including any outstanding Prompt or Deferred Mahr (dower) payable to my surviving wife;

AND I FURTHER DIRECT that out of the net balance of my estate remaining after such payments, a portion not exceeding one-third (1/3rd) in value shall be bequeathed to [Name of Legatee / Institution] as specified in Schedule 'B' hereunder;

PROVIDED ALWAYS that the remaining two-thirds (2/3rds) of my net estate shall devolve upon my legal heirs strictly in accordance with the Quranic shares and residuary entitlements prescribed under Mahomedan Law; and any bequest herein in excess of the said one-third limit or in favor of an heir shall take effect only upon obtaining the express written consent of all other surviving legal heirs."`}
                explanation="Under Section 2 of the Shariat Act, 1937 and Section 118 of Mulla Mahomedan Law, testamentary power is limited to 1/3rd of the net estate after debt and Mahr clearance. Bequests beyond this cap require post-demise heir consent."
              />
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Sharia Drafting Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Civil courts closely examine Muslim Wills during title
                  challenges:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Mahr Acknowledgment:</strong> Clear statement of
                      paid or pending dower to prevent widow property retention.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>One-Third Valuation:</strong> Mathematical proof
                      that bequests to non-heirs do not exceed 33.33% of net
                      assets.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Heir Consent Framework:</strong> Documentation
                      identifying all legal heirs and recording post-demise
                      consent.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Independent Attestation:</strong> Signed by at
                      least two competent adult witnesses not benefiting under
                      the Will.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Request Custom Wasiyat Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
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
                  Need to Calculate Quranic Faraid Shares Before Drafting?
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55636D]">
                  Use our free statutory calculator to evaluate Sharer and
                  Residuary shares under Sunni Hanafi and Shia Ithna Ashari rules.
                </p>
              </div>
            </div>
            <Link
              href="/tools/muslim-inheritance-faraid-wasiyat-calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors shrink-0"
            >
              <span>Calculate Faraid Shares</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            7. DAUGHTER & SPOUSE ASSET PROTECTION SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Family Estate Protection</span>
              </div>
              {/* Strictly <= 70 chars, no em-dash */}
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Daughter &amp; Spouse Inheritance Protection under Shariat
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under default Sunni Faraid rules, an only daughter inherits
                one-half of the estate, while multiple daughters share two-thirds.
                A surviving wife receives one-eighth when children exist. The
                remaining portion passes to distant agnatic residuaries, such
                as paternal uncles or male cousins.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                To safeguard their home for their wife and daughters, Muslim
                fathers execute lifetime gifts (Hiba or Hiba-bil-Iwaz). Under
                the Supreme Court ruling in{" "}
                <strong className="text-[#111827]">
                  Hafeeza Bibi v. Shaikh Farid (2011)
                </strong>
                , a Muslim has absolute freedom to gift up to 100% of their
                property during their lifetime. Our advocates prepare ironclad
                Hiba deeds with complete delivery of possession. This protects
                your family home from distant relative claims.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Sharia Estate Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Will for 1/3rd Share</span>
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
              <span>Statutory FAQs</span>
            </div>
            {/* Strictly <= 70 chars, no em-dash */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Muslim Will &amp; Sharia Law
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative legal answers prepared by the{" "}
              <strong className="text-[#111827]">
                WillDrafting Editorial Team
              </strong>{" "}
              and verified by High Court succession counsel at{" "}
              <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WASIYAT_FAQS.map((item, idx) => (
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
                Related Islamic Succession &amp; Property Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore statutory templates, calculators, and estate planning
                services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/muslim-inheritance-faraid-wasiyat-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Muslim Faraid Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/muslim-will-wasiyat-format-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Muslim Wasiyat Format</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/gift-deed-drafting-registration"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Gift Deed &amp; Hiba Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Relinquishment Deed (Haq Tyag)</span>
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
              This legal guide is prepared under the Muslim Personal Law (Shariat)
              Application Act, 1937, Mulla&apos;s Principles of Mahomedan Law, the
              Transfer of Property Act, 1882, and the Indian Succession Act,
              1925. Judicial authorities cited include Ghulam Mohammad v. Ghulam
              Husain (54 All 98 PC), Khajoorunissa v. Rowshan Jehan (2 Cal 184
              PC), and Hafeeza Bibi v. Shaikh Farid (2011 5 SCC 654). This content
              provides statutory education and does not replace individualized
              advocate counsel.
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
