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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import FamilySettlementInteractive from "@/components/FamilySettlementInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Family Settlement Agreement Lawyer India | WillDrafting.in",
  },
  description:
    "Advocate assistance for family settlement agreement lawyer in India. High Court drafting, SRO partition deed registration, and mutual dispute resolution.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "family settlement agreement lawyer india",
    "family arrangement deed drafting service",
    "partition deed lawyer india",
    "oral family settlement memorandum lawyer",
    "memorandum of family settlement lawyer",
    "kale vs deputy director of consolidation 1976",
    "section 17 registration act family settlement",
    "ancestral property partition deed advocate",
    "huf coparcenary settlement deed lawyer",
    "compromise decree order 23 cpc advocate",
    "division of ancestral property deed format",
    "ama legal solutions family settlement practice",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/family-settlement-deed-lawyer",
  },
  openGraph: {
    title: "Family Settlement Agreement Lawyer India | WillDrafting.in",
    description:
      "Advocate assistance for family settlement agreement lawyer in India. High Court drafting, SRO partition deed registration, and mutual dispute resolution.",
    url: "https://www.willdrafting.in/services/family-settlement-deed-lawyer",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/family-settlement-deed-lawyer-og.jpg",
        width: 1200,
        height: 630,
        alt: "Family Settlement Agreement Lawyer India High Court Partition and SRO Registration Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Settlement Agreement Lawyer India | WillDrafting.in",
    description:
      "Advocate assistance for family settlement agreement lawyer in India. High Court drafting, SRO partition deed registration, and mutual dispute resolution.",
    images: ["/images/family-settlement-deed-lawyer-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const SETTLEMENT_FAQS = [
  {
    q: "Is an oral family settlement legally valid in India without registration?",
    a: "Yes. In Kale v. Deputy Director of Consolidation (1976), the Supreme Court ruled that an oral family settlement is valid. It binds all family members. When members write a memo just to record an earlier oral split, this memo does not need registration under Section 17.",
  },
  {
    q: "When does a family settlement deed compulsorily require registration?",
    a: "A deed needs registration if it creates or transfers rights in land on the spot. If the text says 'hereby transfers', you must pay state stamp duty and register the deed with the Sub-Registrar under Section 17 of the Registration Act, 1908.",
  },
  {
    q: "Can married daughters claim ancestral property if excluded from a family settlement?",
    a: "Yes. Under Section 6 of the Hindu Succession Act, 1956, daughters have equal birth rights in ancestral land. The Supreme Court affirmed this in Vineeta Sharma (2020). Leaving out a sister makes the entire settlement weak in court.",
  },
  {
    q: "Does a family settlement agreement attract capital gains tax in India?",
    a: "No. A family settlement is not a property transfer. It only recognizes pre-existing rights of family members. Under Section 47 of the Income Tax Act, 1961, partition and family settlements attract zero capital gains tax.",
  },
  {
    q: "How does Owelty cash compensation work when family properties have unequal values?",
    a: "When parcels have unequal value, one heir can pay cash to others. This money is called owelty. The Supreme Court ruled in Swaminatha Odayar that owelty equalizes shares and is not an asset sale.",
  },
  {
    q: "What should you do if one family member refuses to sign the settlement deed?",
    a: "All heirs must agree to sign. If one refuses, our advocates hold mediation talks to find common ground. If talks fail, we issue a legal notice and file a civil partition suit in court.",
  },
  {
    q: "Can an ongoing civil partition suit be ended through a family settlement?",
    a: "Yes. You can end a pending court case anytime. Our advocates draft a compromise petition under Order 23 Rule 3 of the CPC. The judge passes a final decree and court fees are refunded.",
  },
  {
    q: "How does stamp duty differ between a partition deed and an oral settlement memorandum?",
    a: "A partition deed attracts state stamp duty from 1% to 5% of property value. In contrast, an oral settlement memo under the Kale precedent requires only nominal stamp paper because it merely records a past event.",
  },
];

const SETTLEMENT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/family-settlement-deed-lawyer#webpage",
      url: "https://www.willdrafting.in/services/family-settlement-deed-lawyer",
      name: "Family Settlement Agreement Lawyer India | WillDrafting.in",
      description:
        "Advocate assistance for family settlement agreement lawyer in India. High Court drafting, SRO partition deed registration, and mutual dispute resolution.",
      datePublished: "2026-10-27",
      dateModified: "2026-10-27",
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
        url: "https://www.willdrafting.in/images/family-settlement-deed-lawyer-og.jpg",
        width: 1200,
        height: 630,
        caption:
          "Family Settlement Agreement Lawyer India High Court Partition and SRO Registration Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/family-settlement-deed-lawyer#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/family-settlement-deed-lawyer#legalservice",
      name: "AMA Legal Solutions Family Settlement & Partition Practice",
      url: "https://www.willdrafting.in/services/family-settlement-deed-lawyer",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/family-settlement-deed-lawyer-og.jpg",
      description:
        "Pan-India testamentary, partition, and family property settlement legal counsel specializing in High Court advocacy, SRO partition deeds, and oral settlement memoranda.",
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
        { "@type": "AdministrativeArea", name: "Punjab & Haryana" },
        { "@type": "AdministrativeArea", name: "Uttar Pradesh" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/family-settlement-deed-lawyer#service",
      name: "Family Settlement Agreement, Partition Deed Drafting & SRO Registration",
      serviceType:
        "Ancestral Property Partition, Family Settlement Agreement Drafting & SRO Registration",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/family-settlement-deed-lawyer#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Family Property Settlement & Partition Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "14990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Memorandum of Past Oral Family Settlement Drafting",
              description:
                "Past-tense recital memorandum compliant with the Supreme Court Kale v. DDC precedent, eliminating mandatory Section 17 registration.",
            },
          },
          {
            "@type": "Offer",
            price: "24990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Registered Family Settlement cum Partition Deed with SRO Support",
              description:
                "Comprehensive partition deed drafting with Schedule A/B/C demarcations, state stamp duty optimization, and Sub-Registrar registration representation.",
            },
          },
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Senior Advocate Multi-Party Mediation & Court Suit Compromise",
              description:
                "End-to-end representation by High Court advocates for multi-property family disputes, owelty equalization, and Order 23 CPC compromise decrees.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/family-settlement-deed-lawyer#howto",
      name: "How Families Execute a Legally Enforceable Family Settlement Deed in India",
      description:
        "Four-step statutory protocol to draft, execute, and register an ironclad family arrangement deed under the Registration Act and Indian Stamp Act.",
      totalTime: "P7D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Title Verification & Coparcenary Mapping",
          "text": "Map all Class-I legal heirs and coparceners under the Hindu Succession Act, 1956, and inspect revenue mutation records to verify ancestral title.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Advocate Drafting & Schedule Demarcation",
          "text": "Structure past-tense recitals under the Kale precedent or draft detailed Schedule demarcations with boundary dimensions and undivided land shares.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Multi-Heir Execution & Stamp Duty Payment",
          "text": "Execute the deed with all coparceners and independent witnesses present, ensuring full consensus and clear documentation of owelty cash payments.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Sub-Registrar SRO Registration or Revenue Mutation",
          "text": "Present the deed before the local Sub-Registrar of Assurances for biometric registration, or record the memorandum with municipal revenue authorities.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/family-settlement-deed-lawyer#faq",
      mainEntity: SETTLEMENT_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/family-settlement-deed-lawyer#breadcrumb",
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
          "name": "Family Settlement Agreement Lawyer India",
          "item":
            "https://www.willdrafting.in/services/family-settlement-deed-lawyer",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Governing Statute",
    oralMemo: "Supreme Court Kale Precedent & Contract Act, 1872",
    registeredDeed: "Registration Act, 1908 s. 17 & Indian Stamp Act s. 2(15)",
    courtSuit: "Code of Civil Procedure, 1908 (Order 20 Rule 18)",
  },
  {
    feature: "Compulsory SRO Registration",
    oralMemo: "No (Exempt under Kale v. DDC if past-tense recorded)",
    registeredDeed: "Yes (Mandatory under Section 17(1)(b) of Registration Act)",
    courtSuit: "Decree drawn on non-judicial stamp paper by court",
  },
  {
    feature: "State Stamp Duty Liability",
    oralMemo: "Nominal stamp paper (typically ₹100 to ₹500)",
    registeredDeed: "Ad valorem stamp duty (1% to 5% across states)",
    courtSuit: "Full court fees on market valuation + final decree stamp duty",
  },
  {
    feature: "Timeline to Final Resolution",
    oralMemo: "3 to 7 working days with advocate drafting",
    registeredDeed: "7 to 14 days including Sub-Registrar slot",
    courtSuit: "10 to 18 years across trial court and High Court appeals",
  },
  {
    feature: "Admissibility for Municipal Mutation",
    oralMemo: "Admissible for internal tax split with supporting affidavits",
    registeredDeed: "100% accepted by municipal corporations and DDA/MHADA",
    courtSuit: "Court decree directly directs revenue authorities to mutate",
  },
  {
    feature: "Bank Mortgage & Resale Validity",
    oralMemo: "Limited; commercial banks often demand a registered deed",
    registeredDeed: "100% bankable title for home loans and property sale",
    courtSuit: "Bankable once final decree and appeal period expire",
  },
  {
    feature: "Risk of Future Sibling Challenge",
    oralMemo: "Low if all heirs signed; estoppel applies under Section 115",
    registeredDeed: "Negligible; registered public record bars subsequent suits",
    courtSuit: "Subject to multiple appeals (First Appeal, SLP before Supreme Court)",
  },
];

export default function FamilySettlementDeedLawyerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SETTLEMENT_SCHEMA) }}
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
              Family Settlement Agreement Lawyer India
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
            <time dateTime="2026-10-27" className="text-[#6B7280]">
              Updated October 27, 2026
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
                  High Court Advocates · SRO Registration · Pan-India Counsel
                </span>
              </div>

              {/* Single H1: 47 chars (Strictly between 30 and 65 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Family Settlement Agreement &amp; Partition Lawyers
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Civil partition suits in Indian courts take 15 to 20 years to
                resolve. You can divide ancestral homes, plots, and lands
                without court fights. Under the Supreme Court ruling in{" "}
                <strong className="text-[#111827]">
                  Kale v. Deputy Director of Consolidation (1976 SC)
                </strong>
                , families can sign a settlement deed. This deed settles property
                disputes peacefully. Our High Court advocates draft clean
                agreements, help with stamp duty, and handle Sub-Registrar
                registration.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult Property Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#deed-vs-memorandum"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare Deed vs Memorandum</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Kale Precedent Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Capital Gains Tax</span>
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
                Why DIY Settlement Templates Fail
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                The Section 17 Registration Act Bottleneck
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Operative Words Trigger 5% Stamp Duty:</strong> Online
                    drafts use words that transfer land on the spot. This triggers
                    mandatory registration under Section 17 of the Registration
                    Act and high stamp duty.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Omission of Married Daughters:</strong> Leaving out
                    married sisters violates Section 6 of the Hindu Succession
                    Act. Any single excluded heir can overturn the deed in court.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Vague Schedule Demarcations:</strong> Failing to state
                    clear floor borders and terrace rights leads to rejection by
                    local land offices.
                  </span>
                </li>
              </ul>
              <Link
                href="/templates/family-settlement-agreement-format-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Explore Family Settlement Deed Formats &amp; Rules</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT
            ========================================================================= */}
        <FamilySettlementInteractive />

        {/* =========================================================================
            3. VISUAL LEGAL IMAGE SECTION (OG Image Embed)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Legal Documentation</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Framework: Settlement Deed vs Partition
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How an ironclad Family Settlement Deed drafted by High Court
              advocates secures your family title, complies with Sub-Registrar
              norms, and prevents civil litigation:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/family-settlement-deed-lawyer-og.jpg"
              alt="Family Settlement Agreement Lawyer India High Court Partition and SRO Registration Counsel"
              width={1200}
              height={630}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Overview of Family Settlement Deed
                drafting under the Kale precedent and Registration Act, 1908.
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
        <section id="deed-vs-memorandum" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Comparison Table</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Deed vs Memorandum: Key Legal Differences
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Choosing the wrong legal instrument leads to heavy stamp duty
              penalties or future court disputes. Compare how Indian law treats
              an Oral Settlement Memorandum, a Registered Partition Deed, and a
              Court Partition Suit:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">
                      Oral Memorandum (Kale Rule)
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Registered Partition Deed
                    </th>
                    <th className="py-4 px-6 w-[26%]">
                      Civil Partition Suit (Court)
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
                      <td className="py-5 px-6 text-[#49585F]">
                        {row.oralMemo}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.registeredDeed}
                      </td>
                      <td className="py-5 px-6 text-[#C65378]">
                        {row.courtSuit}
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
              <span>SRO Execution Protocol</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory 4-Step Family Settlement Roadmap
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Our High Court advocates handle the complete settlement lifecycle.
              Follow this structured 4-step path to divide family assets
              peacefully:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Title & Genealogic Audit",
                desc: "We review local land records, tax bills, and sale deeds. We trace every coparcener and Class-I heir so all family branches are included.",
              },
              {
                step: "02",
                title: "Bespoke Advocate Drafting",
                desc: "Our advocates draft the deed with past-tense clauses (for oral memos) or detailed schedules showing floor boundaries and shared access.",
              },
              {
                step: "03",
                title: "Consensus & Owelty Advisory",
                desc: "We help value properties fairly. We record owelty cash payments through banks so no one faces capital gains tax issues later.",
              },
              {
                step: "04",
                title: "SRO Registration or Mutation",
                desc: "We book registry slots at the Sub-Registrar office for biometric signing. We also submit registered deeds to update local property tax records.",
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
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Essential Past-Tense Legal Recital Clause
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              In Kale v. Deputy Director of Consolidation, the Supreme Court ruled
              that word choice decides registration. Present-tense words create
              new rights and require registration under Section 17. A valid memo
              must use strict past-tense words:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Clause Box */}
            <div className="lg:col-span-7 bg-[#172228] text-[#FAF7F0] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs text-white/60">
                  <span className="uppercase font-mono tracking-widest text-[#C65378]">
                    Sample Kale-Compliant Recital Clause
                  </span>
                  <span>Non-Operative Recital</span>
                </div>
                <blockquote className="font-mono text-[13px] sm:text-[13.5px] leading-[1.7] text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  &ldquo;WHEREAS the Parties hereto had, by mutual consensus and
                  oral arrangement entered into on [Past Date], partitioned and
                  divided their ancestral properties among themselves, and took
                  separate physical possession of their respective demarcated
                  portions; AND WHEREAS this Memorandum of Family Settlement
                  does not create, declare, assign, or extinguish any right,
                  title, or interest in praesenti, but is merely executed to
                  formally record the past oral settlement already acted upon,
                  for the record and memory of the parties.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 leading-relaxed">
                  * Note: If any party has not taken prior physical possession,
                  or if immediate municipal tax transfer requires a registered
                  conveyance, our advocates draft an operative partition deed
                  instead.
                </p>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">
                  Schedule Demarcation Checklist
                </h3>
                <p className="text-xs text-[#55636D] mb-4">
                  Sub-Registrars reject deeds that lack exact boundary
                  demarcations:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Four Boundaries:</strong> Clear North, South, East,
                      and West neighbor demarcations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Undivided Share (UDS):</strong> Specific land
                      percentage allocated to each floor owner.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Easement Rights:</strong> Explicit access to common
                      staircases, lift, terrace, and water pumps.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>
                      <strong>Owelty Clearance:</strong> Written acknowledgement
                      of bank transfers for value equalization.
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

          {/* Contextual Link to Interactive Calculator */}
          <div className="rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-1">
                  Need to Calculate Coparcenary Shares Before Drafting?
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55636D]">
                  Use our free statutory calculator to evaluate ancestral HUF
                  shares across Class-I legal heirs under Section 6 of the Hindu
                  Succession Act.
                </p>
              </div>
            </div>
            <Link
              href="/tools/huf-coparcenary-share-partition-calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors shrink-0"
            >
              <span>Calculate HUF Shares</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            7. ANCESTRAL PROPERTY & COPARCENARY RIGHTS SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Hindu Succession Act Compliance</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Ancestral Property &amp; Coparcenary Rights
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Under Section 6 of the Hindu Succession Act, 1956, coparceners
                get equal birth rights in ancestral land. In{" "}
                <strong className="text-[#111827]">
                  Vineeta Sharma v. Rakesh Sharma (2020 SC)
                </strong>
                , the Supreme Court held that daughters have equal coparcenary
                rights just like sons.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Leaving out a married daughter or sister breaks the law. An
                excluded heir can challenge the partition in court within 12
                years under Article 110 of the Limitation Act, 1963. Our High
                Court advocates make sure all heirs sign the settlement. This
                protects your family from future lawsuits.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book Advocate Settlement Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Draft Online Will for Self-Acquired Assets</span>
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
              <span>Settlement Law FAQs</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Family Settlements
            </h2>
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
            {SETTLEMENT_FAQS.map((item, idx) => (
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
                Related Indian Succession &amp; Property Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore statutory templates, partition formats, and related
                legal services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Relinquishment Deed (Haq Tyag) Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate &amp; Will Contest Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/partition-deed-format-between-family-members"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Family Partition Deed Format</span>
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
              This legal guide is prepared under the Registration Act, 1908, the
              Indian Stamp Act, 1899, the Hindu Succession Act, 1956, and the
              Code of Civil Procedure, 1908. Judicial precedents cited include
              Kale v. Deputy Director of Consolidation (AIR 1976 SC 807) and
              Vineeta Sharma v. Rakesh Sharma (2020 SC). This content provides
              statutory education and does not replace individualized advocate
              counsel.
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
