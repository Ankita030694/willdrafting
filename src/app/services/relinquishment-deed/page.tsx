import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Landmark,
  BookOpen,
  Users,
  Scale,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import RelinquishmentDeedInteractive from "@/components/RelinquishmentDeedInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Relinquishment Deed India | Haq Tyag Drafting & Lawyers",
  },
  description:
    "Draft a valid Relinquishment Deed (Haq Tyag) in India. Transfer inherited property shares legally among co-heirs with guidance from AMA Legal.",
  authors: [{ name: "Advocate Anuj Anand Malik", url: "https://www.linkedin.com/in/iamanujmalik/" }],
  keywords: [
    "relinquishment deed india",
    "haq tyag patra online",
    "relinquishment deed drafting lawyer",
    "relinquishment deed registration charges",
    "stamp duty on relinquishment deed in delhi",
    "stamp duty on relinquishment deed maharashtra",
    "stamp duty on relinquishment deed up",
    "relinquishment deed vs gift deed",
    "relinquishment deed format india",
    "can relinquishment deed be challenged",
    "can married sister relinquish share to brother",
    "relinquishment deed by nri co heir",
    "relinquishment deed sub registrar registration",
    "documents required for relinquishment deed",
    "haq tyag in ancestral property",
    "ama legal solutions relinquishment deed",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/relinquishment-deed",
  },
  openGraph: {
    title: "Relinquishment Deed India | Haq Tyag Drafting & Lawyers",
    description:
      "Draft a valid Relinquishment Deed (Haq Tyag) in India. Transfer inherited property shares legally among co-heirs with guidance from AMA Legal.",
    url: "https://www.willdrafting.in/services/relinquishment-deed",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/relinquishment-deed-og.jpg",
        width: 1200,
        height: 630,
        alt: "Relinquishment Deed Haq Tyag Registration and Drafting in India by AMA Legal Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Relinquishment Deed India | Haq Tyag Drafting & Lawyers",
    description:
      "Draft a valid Relinquishment Deed (Haq Tyag) in India. Transfer inherited property shares legally among co-heirs with guidance from AMA Legal.",
    images: ["/images/relinquishment-deed-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const RELINQUISHMENT_FAQS = [
  {
    q: "What is a Relinquishment Deed (Haq Tyag) under Indian law?",
    a: "A Relinquishment Deed is a formal legal document. In Hindi, it is known as Haq Tyag. Through this deed, a legal co-heir gives up their share in an inherited property. The share transfers to another legal co-heir. The Registration Act, 1908 and Transfer of Property Act, 1882 govern this deed.",
  },
  {
    q: "Can a Relinquishment Deed be executed in favor of a stranger or non-heir?",
    a: "No. You can only give your share to an existing legal co-heir. You cannot use this deed for a stranger or third party. If you transfer your share to a non-heir, the law treats it as a Gift Deed or a Sale Deed. That will attract full stamp duty.",
  },
  {
    q: "Is registration of a Relinquishment Deed mandatory at the Sub-Registrar Office?",
    a: "Yes. Under Section 17(1)(b) of the Registration Act, 1908, registration is mandatory. An unregistered deed has no legal value. Under Section 49, you cannot use an unregistered deed as evidence in court.",
  },
  {
    q: "Can an informal family NOC or affidavit on stamp paper transfer property title?",
    a: "No. An informal NOC or affidavit on stamp paper cannot transfer property rights. The Supreme Court of India has confirmed this rule. You must register a Relinquishment Deed before the Sub-Registrar to update municipal tax and land records.",
  },
  {
    q: "Can a registered Relinquishment Deed be cancelled or revoked later?",
    a: "No. Once you register the deed, it cannot be cancelled. It is irrevocable. A co-heir cannot change their mind later. A court can only cancel it if someone proved fraud or force within three years.",
  },
  {
    q: "Can a married sister relinquish her share in ancestral property to her brother?",
    a: "Yes. Under the Hindu Succession Act, 2005, daughters have equal rights by birth. A married sister owns an equal share in parental property. She can legally release her share to her brother or mother through a registered deed.",
  },
  {
    q: "Can a guardian relinquish a minor child's share in inherited property?",
    a: "No. A minor child cannot surrender their property share. A parent or guardian cannot sign away a child's share without permission from a District Court. This rule is set by Section 8 of the Hindu Minority and Guardianship Act, 1956.",
  },
  {
    q: "How can Non-Resident Indians (NRIs) execute a Relinquishment Deed from abroad?",
    a: "An NRI co-heir does not need to visit India. You can sign a Special Power of Attorney in your country of residence. You get it apostilled or attested by the Indian Embassy. Your family in India can then complete registration at the local office.",
  },
];

const RELINQUISHMENT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/services/relinquishment-deed#webpage",
      "url": "https://www.willdrafting.in/services/relinquishment-deed",
      "name": "Relinquishment Deed India | Haq Tyag Drafting & Lawyers",
      "description":
        "Draft a valid Relinquishment Deed (Haq Tyag) in India. Transfer inherited property shares legally among co-heirs with guidance from AMA Legal Solutions.",
      "datePublished": "2026-10-21",
      "dateModified": "2026-10-21",
      "author": {
        "@type": "Person",
        "name": "Advocate Anuj Anand Malik",
        "url": "https://www.linkedin.com/in/iamanujmalik/",
      },
      "publisher": {
        "@id": "https://www.willdrafting.in/#organization",
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.willdrafting.in/images/relinquishment-deed-og.jpg",
        "width": 1200,
        "height": 630,
        "caption": "Professional legal drafting and Sub-Registrar registration of Relinquishment Deed in India",
      },
      "breadcrumb": {
        "@id": "https://www.willdrafting.in/services/relinquishment-deed#breadcrumb",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.willdrafting.in/services/relinquishment-deed#service",
      "name": "Relinquishment Deed (Haq Tyag) Drafting & Sub-Registrar Registration",
      "serviceType": "Property Succession, Inherited Share Relinquishment & Sub-Registrar Registration",
      "provider": {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "Australia" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Relinquishment Deed Legal Plans",
        "itemListElement": [
          {
            "@type": "Offer",
            "price": "2490",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Standard Relinquishment Deed Drafting (Advocate Verified)",
            },
          },
          {
            "@type": "Offer",
            "price": "5990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Comprehensive Drafting & Sub-Registrar Slot Booking Assistance",
            },
          },
          {
            "@type": "Offer",
            "price": "11990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "NRI Power of Attorney Drafting, Apostille & SRO Physical Representation",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/services/relinquishment-deed#howto",
      "name": "How to Register a Relinquishment Deed in India",
      "description":
        "Step-by-step statutory process to draft, stamp, and register a Relinquishment Deed (Haq Tyag) before the Sub-Registrar Office in India.",
      "totalTime": "P3D",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Verify Original Title & Obtain Legal Heir Certificate",
          "text": "Check original property title deeds and procure an official Legal Heir Certificate to confirm all surviving co-heirs.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Draft the Relinquishment Deed with Boundary Details",
          "text": "Draft the deed with precise legal descriptions, share percentages, and an explicit clause confirming voluntary transfer.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Purchase Non-Judicial e-Stamp Paper & Pay Registration Fees",
          "text": "Calculate state stamp duty and purchase online e-Stamp paper through state portals like DORIS, IGRSUP, or Kaveri 2.0.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Biometric Verification at the Sub-Registrar Office",
          "text": "Both parties and two independent adult witnesses visit the Sub-Registrar Office for fingerprinting, photograph capture, and registration.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/services/relinquishment-deed#faq",
      "mainEntity": RELINQUISHMENT_FAQS.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/services/relinquishment-deed#breadcrumb",
      "itemListElement": [
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
          "name": "Relinquishment Deed India",
          "item": "https://www.willdrafting.in/services/relinquishment-deed",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    parameter: "Eligible Recipient",
    relinquishment: "Co-heirs or legal co-owners only",
    giftDeed: "Any person (family or third party)",
    saleDeed: "Any buyer or third party entity",
  },
  {
    parameter: "Governing Statute",
    relinquishment: "Section 17 Registration Act, 1908",
    giftDeed: "Section 122 Transfer of Property Act",
    saleDeed: "Section 54 Transfer of Property Act",
  },
  {
    parameter: "Consideration",
    relinquishment: "Valid with or without monetary payment",
    giftDeed: "Must be entirely without consideration",
    saleDeed: "Mandatory monetary consideration",
  },
  {
    parameter: "Stamp Duty Cost",
    relinquishment: "Concessional or nominal fixed rates in most states",
    giftDeed: "Higher stamp duty (2% to 7% depending on state)",
    saleDeed: "Full ad-valorem stamp duty (5% to 8% plus surcharge)",
  },
  {
    parameter: "Property Scope",
    relinquishment: "Undivided inherited or ancestral share",
    giftDeed: "Self-acquired or partitioned clear title",
    saleDeed: "Clearly defined separate property share",
  },
  {
    parameter: "Revocability",
    relinquishment: "Irrevocable once registered at Sub-Registrar",
    giftDeed: "Generally irrevocable after acceptance",
    saleDeed: "Irrevocable; title passes upon execution",
  },
];

const STATE_DUTY_TABLE = [
  {
    state: "Delhi NCR",
    stampDuty: "₹1,000 fixed e-Stamp for family co-heirs",
    regFee: "₹100 + ₹500 pasting / processing fee",
    portal: "DORIS Delhi Portal",
  },
  {
    state: "Maharashtra (Mumbai / Pune)",
    stampDuty: "₹200 fixed for ancestral property co-heirs",
    regFee: "₹1,000 fixed registration fee",
    portal: "IGR Maharashtra Portal",
  },
  {
    state: "Uttar Pradesh",
    stampDuty: "₹5,000 concessional fixed duty for blood relatives",
    regFee: "1% of valuation or ₹1,000 capped",
    portal: "IGRSUP Portal",
  },
  {
    state: "Haryana (Gurugram / Faridabad)",
    stampDuty: "₹100 to ₹1,000 nominal stamp duty for co-sharers",
    regFee: "₹2,000 fixed registration fee",
    portal: "Jamabandi HALRIS Portal",
  },
  {
    state: "Karnataka (Bengaluru)",
    stampDuty: "₹1,000 fixed duty between family members",
    regFee: "₹500 to ₹1,000 fixed fee",
    portal: "Kaveri 2.0 Portal",
  },
  {
    state: "Tamil Nadu (Chennai)",
    stampDuty: "1% of market value (statutory cap of ₹25,000)",
    regFee: "1% of value (statutory cap of ₹4,000)",
    portal: "TNREGINET Portal",
  },
];

export default function RelinquishmentDeedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RELINQUISHMENT_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            BREADCRUMB & EDITORIAL AUTHOR ATTRIBUTION BAR
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#172228]/10 text-xs text-[#55636D]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#C65378] transition-colors font-medium">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#C65378] transition-colors font-medium">
              Services
            </Link>
            <span>/</span>
            <span aria-current="page" className="text-[#111827] font-semibold">
              Relinquishment Deed
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
              Legally Verified by <strong className="text-[#111827]">AMA Legal Solutions</strong>
            </span>
            <span className="hidden sm:inline">·</span>
            <time dateTime="2026-10-21" className="text-[#6B7280]">
              Updated October 21, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1 < 70 Characters)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>Property Succession &amp; Sub-Registrar Conveyance · All Indian States</span>
              </div>

              {/* Single Strict H1: 52 characters (Strictly 30-65 chars for Screaming Frog) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Relinquishment Deed Registration &amp; Drafting in India
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Under <strong className="text-[#111827]">Section 17 of the Registration Act, 1908</strong>, giving up an inherited property share needs a registered deed. A <strong className="text-[#111827]">Relinquishment Deed (Haq Tyag)</strong> lets you transfer your share to another legal heir. You can complete this transfer smoothly and avoid family disputes. Our advocates ensure your deed is fully valid under Indian law.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Draft My Relinquishment Deed</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#state-rules"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Check State Stamp Duty</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Mandatory Registration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>SRO Advocate Accompanied</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Blood Relative Proof</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>NRI Apostille Ready</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box: Strict H2 <= 70 chars, No Em-dashes */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Critical Legal Warning
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why an Informal Family NOC Fails in Indian Courts
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Unregistered papers are void:</strong> An informal NOC on stamp paper does not transfer title. Under Section 49 of the Registration Act, courts reject it.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Municipal mutation stops:</strong> Housing boards and civic bodies require a registered deed. They will not update land records without it.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Future dispute risk:</strong> If a family member changes their mind later, an informal paper cannot protect your sole ownership in court.
                  </span>
                </li>
              </ul>
              <Link
                href="/blogs/gift-deed-vs-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read Relinquishment Deed vs Gift Deed Analysis</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT: STATE PROTOCOLS & 30-SECOND CHECKER
            ========================================================================= */}
        <div id="state-rules">
          <RelinquishmentDeedInteractive />
        </div>

        {/* =========================================================================
            3. STATUTORY COMPARISON SECTION (H2 <= 70 chars, No Em-dashes)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Comparative Legal Analysis</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Relinquishment Deed vs Gift Deed &amp; Sale Deed Comparison
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Choosing the right legal deed saves money and time. A Relinquishment Deed is used only between co-heirs. A Gift Deed or Sale Deed is used for third parties. Most Indian states offer lower stamp duty for family co-heirs. Review the simple table below to compare your choices:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%] text-[#C65378]">Relinquishment Deed (Haq Tyag)</th>
                    <th className="py-4 px-6 w-[26%]">Gift Deed</th>
                    <th className="py-4 px-6 w-[26%]">Sale Deed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors align-top">
                      <td className="py-4 px-6 font-semibold text-[#111827]">{row.parameter}</td>
                      <td className="py-4 px-6 font-medium text-[#111827] bg-[#C65378]/5">{row.relinquishment}</td>
                      <td className="py-4 px-6 text-[#49585F]">{row.giftDeed}</td>
                      <td className="py-4 px-6 text-[#49585F]">{row.saleDeed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. STATE STAMP DUTY RATES TABLE (H2 <= 70 chars, No Em-dashes)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>State Stamp Schedules</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              State Stamp Duty Rates for Relinquishment Deeds in India
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Most Indian states offer lower stamp duty for family deeds. For example, Delhi charges a flat stamp fee for family co-heirs. Uttar Pradesh also offers a low flat rate for blood relatives. Check your state rates in the table below before booking your slot:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[25%]">Indian State / Union Territory</th>
                    <th className="py-4 px-6 w-[30%]">Family Stamp Duty Rate</th>
                    <th className="py-4 px-6 w-[25%]">Sub-Registrar Registration Fee</th>
                    <th className="py-4 px-6 w-[20%]">Official Online Portal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {STATE_DUTY_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors align-top">
                      <td className="py-4 px-6 font-semibold text-[#111827]">{row.state}</td>
                      <td className="py-4 px-6 text-[#047857] font-medium">{row.stampDuty}</td>
                      <td className="py-4 px-6 text-[#49585F]">{row.regFee}</td>
                      <td className="py-4 px-6 text-[#C65378] font-medium">{row.portal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. 4-STEP SRO REGISTRATION ROADMAP (H2 <= 70 chars, No Em-dashes)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step Execution Protocol</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Registration Protocol at Sub-Registrar Office
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              You do not need to worry about complex court visits. Our team guides you through four clear steps. We check your documents, prepare your draft, pay fees online, and book your Sub-Registrar visit:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Title & Heir Verification",
                desc: "We check the original property deed and Legal Heir Certificate. This confirms each family member's exact legal share.",
              },
              {
                step: "02",
                title: "Custom Legal Drafting",
                desc: "Our advocates draft the deed with clear property boundaries. The draft states that the share is given up voluntarily.",
              },
              {
                step: "03",
                title: "Stamp Duty & SRO Slot",
                desc: "We calculate state stamp duty and buy online e-Stamp paper. We pay the registration fees and book your appointment.",
              },
              {
                step: "04",
                title: "Biometric Registration",
                desc: "Both family members and two adult witnesses visit the office. Biometrics and photos are taken to register the deed.",
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
                  <h3 className="text-xl font-semibold text-[#111827] mb-2.5">{item.title}</h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#49585F]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. SPECIAL NRI BLOCK: APOSTILLED POWER OF ATTORNEY (H2 <= 70 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>NRI &amp; Overseas Co-Heir Assistance</span>
              </div>
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                NRI Haq Tyag Execution: Apostille &amp; Power of Attorney
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Overseas co-heirs do not need to fly to India. When settling family homes in Delhi, Mumbai, Bengaluru, or Punjab, NRI siblings can manage the process from abroad.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                An NRI heir can sign a <strong className="text-[#111827]">Special Power of Attorney (SPA)</strong> in their country of residence. You get it apostilled or attested by the Indian Embassy. Our team then completes the registration in India under the Indian Stamp Act, 1899.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult an NRI Property Advocate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/nri-will-india"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>View NRI Two-Will Strategy</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. STATUTORY FAQS & RELATED RESOURCES (H2 <= 70 chars, No Em-dashes)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Legal Knowledge Base</span>
            </div>
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions on Relinquishment Deeds
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers help you make safe choices. Read our simple guide below to learn more about Haq Tyag and your property rights:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RELINQUISHMENT_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs"
              >
                <h3 className="text-lg font-semibold text-[#111827] mb-3 leading-snug">
                  {item.q}
                </h3>
                <p className="text-[14.5px] leading-[1.68] text-[#49585F]">{item.a}</p>
              </div>
            ))}
          </div>

          {/* Contextual Internal Links Bar */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Succession &amp; Property Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related legal services for establishing rightful heirs and registering wills:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/legal-heir"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Legal Heir Certificate Services</span>
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
                href="/tools/succession-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Succession Calculator Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. AUTHOR & E-E-A-T EDITORIAL VERIFICATION CARD
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
              This guide is prepared under Section 17 of the Registration Act, 1908, the Transfer of Property Act, 1882, the Hindu Succession Act, 1956, and state stamp manuals. It is intended for educational purposes and does not constitute formal legal representation until an advocate engagement is signed.
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
