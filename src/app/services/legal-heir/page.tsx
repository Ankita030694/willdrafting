import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Landmark,
  BookOpen,
  Users,
  Scale,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import LegalHeirInteractive from "@/components/LegalHeirInteractive";

// Strictly 50-60 characters for Screaming Frog compliance (53 chars)
export const metadata: Metadata = {
  title: {
    absolute: "Legal Heir Certificate in India: Complete Legal Guide",
  },
  // Strictly 140-155 characters for Screaming Frog compliance (153 chars)
  description:
    "Apply for a Legal Heir Certificate in India. Get lawyer help for Tehsildar verification, property mutation, and bank claims under Indian succession laws.",
  authors: [{ name: "WillDrafting Editorial Team" }],
  keywords: [
    "legal heir certificate india",
    "legal heir certificate online apply",
    "how to get legal heir certificate in india",
    "surviving member certificate delhi sdm",
    "varisu certificate online apply tamil nadu",
    "waris praman patra up tehsildar",
    "varisan dakhla maharashtra aaple sarkar",
    "documents required for legal heir certificate",
    "difference between legal heir and succession certificate",
    "class 1 legal heirs hindu succession act",
    "can married daughter apply for legal heir certificate",
    "legal heir certificate for property mutation",
    "legal heir certificate for bank account settlement",
    "tehsildar legal heir certificate procedure",
    "legal heir certificate fees and timeline",
    "affidavit for legal heir certificate format",
    "relinquishment deed by legal heirs",
    "ama legal solutions legal heir services",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/legal-heir",
  },
  openGraph: {
    title: "Legal Heir Certificate in India: Complete Legal Guide",
    description:
      "Apply for a Legal Heir Certificate in India. Get lawyer help for Tehsildar verification, property mutation, and bank claims under Indian succession laws.",
    url: "https://www.willdrafting.in/services/legal-heir",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/legal-heir-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Heir Certificate Documentation and Legal Assistance in India by AMA Legal Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Heir Certificate in India: Complete Legal Guide",
    description:
      "Apply for a Legal Heir Certificate in India. Get lawyer help for Tehsildar verification, property mutation, and bank claims under Indian succession laws.",
    images: ["/images/legal-heir-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const LEGAL_HEIR_FAQS = [
  {
    q: "What is a Legal Heir Certificate and who issues it in India?",
    a: "A Legal Heir Certificate is an official document from the local revenue office. It is called Varisu in Tamil Nadu, Waris Praman Patra in Uttar Pradesh, and Surviving Member Certificate in Delhi. A Tehsildar or Sub-Divisional Magistrate issues it. The paper lists all living family heirs of a person who died without a Will. It helps heirs claim bank money, pension dues, and land title.",
  },
  {
    q: "Who is entitled to be named in a Legal Heir Certificate under Hindu Law?",
    a: "Under Section 8 of the Hindu Succession Act, 1956, Class 1 legal heirs inherit equally. For a deceased man, Class 1 heirs include his wife, all sons, all daughters, and his mother. They share the property equally. The father of the deceased is a Class 2 heir. Thus, the father cannot claim if any Class 1 heir is alive.",
  },
  {
    q: "Can a married daughter be excluded from a Legal Heir Certificate?",
    a: "No. In 2020, the Supreme Court ruled in the Vineeta Sharma case that daughters have equal birth rights in family property. Marriage does not change a daughter's legal status. A married daughter remains a Class 1 legal heir. Leaving a married daughter out of the certificate is illegal and makes the document invalid.",
  },
  {
    q: "What is the difference between a Legal Heir Certificate and a Court Succession Certificate?",
    a: "A legal heir paper is a local revenue document from a Tehsildar. It takes 15 to 30 days and costs very little. Families use it for municipal property tax records, pensions, and small bank claims. On the other hand, a Succession Certificate comes from a civil court under the Indian Succession Act. It takes 6 to 12 months and requires court fees. Banks demand it to transfer company shares, mutual funds, and large bank deposits.",
  },
  {
    q: "Can a Legal Heir Certificate be used to sell or transfer ancestral property?",
    a: "No. The certificate proves family ties, but it is not a title deed. It only updates names in municipal tax registers. To sell the property, all legal heirs must sign the sale deed. If one heir wants full ownership, other heirs can sign a registered Release Deed (Haq Tyag) at the sub-registrar office.",
  },
  {
    q: "What documents are required to apply for a Legal Heir Certificate?",
    a: "You need the original death certificate of the deceased person. You also need Aadhaar cards and voter IDs of all surviving heirs. In addition, submit a family ration card or Parivar register copy. A lawyer drafts a family tree affidavit on stamp paper. Finally, if one heir applies, other heirs provide signed consent letters.",
  },
  {
    q: "What happens if one sibling or co-heir refuses to sign the NOC or cooperate?",
    a: "Revenue officers have no power to decide family disputes. If a brother or sister objects, the Tehsildar will reject the application. In this situation, the family must resolve the dispute through an advocate. Our lawyers help you prepare a formal partition deed or file a case in civil court.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) apply for an Indian Legal Heir Certificate from abroad?",
    a: "Yes. An NRI heir does not need to travel to India. The overseas heir can sign a Special Power of Attorney abroad. In Hague Convention countries like the USA or UK, you get it apostilled. In the UAE, you get it stamped at the Indian Embassy. Then, your appointed family member or lawyer submits the papers in India.",
  },
];

const LEGAL_HEIR_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/services/legal-heir#webpage",
      "url": "https://www.willdrafting.in/services/legal-heir",
      "name": "Legal Heir Certificate in India: Complete Legal Guide",
      "description":
        "Apply for a Legal Heir Certificate in India. Get lawyer help for Tehsildar verification, property mutation, and bank claims under Indian succession laws.",
      "datePublished": "2026-10-21",
      "dateModified": "2026-10-21",
      "author": {
        "@type": "Organization",
        "name": "WillDrafting Editorial Team",
        "url": "https://www.willdrafting.in/about-us",
      },
      "publisher": {
        "@id": "https://www.willdrafting.in/#organization",
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.willdrafting.in/images/legal-heir-og.jpg",
        "width": 1200,
        "height": 630,
        "caption": "Official Legal Heir Certificate documentation and advocate verification under Indian Succession laws",
      },
      "breadcrumb": {
        "@id": "https://www.willdrafting.in/services/legal-heir#breadcrumb",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.willdrafting.in/services/legal-heir#service",
      "name": "Legal Heir Certificate Documentation & Advocate Representation",
      "serviceType": "Estate Administration, Succession Advisory & Revenue Legal Heir Documentation",
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
        "name": "Legal Heir & Succession Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "price": "1990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Legal Heir Affidavit & Family Tree Drafting (Advocate Verified)",
            },
          },
          {
            "@type": "Offer",
            "price": "4990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Complete Revenue / SDM e-District Application & Document Assistance",
            },
          },
          {
            "@type": "Offer",
            "price": "9990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Senior Advocate Consultation & Relinquishment Deed (Haq Tyag) Coordination",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/services/legal-heir#howto",
      "name": "How to Obtain a Legal Heir Certificate in India",
      "description":
        "Step-by-step statutory process for surviving family members to apply for and obtain an official Legal Heir Certificate from revenue authorities in India.",
      "totalTime": "P21D",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Obtain Official Municipal Death Certificate",
          "text": "Procure original death certificate issued by the Registrar of Births and Deaths or Municipal Corporation where the demise occurred.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Draft Family Genealogical Affidavit & Co-Heir NOCs",
          "text": "Draft a notarized affidavit stating all living Class I legal heirs, their relationships, and obtain signed No Objection Certificates (NOCs) from co-heirs.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Submit Application via State e-District Portal or Tehsildar Office",
          "text": "File the prescribed application along with Aadhaar cards, Ration Card extract, and property details before the Tehsildar / SDM.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Field Inquiry & Spot Panchanama by Revenue Inspector",
          "text": "The local Village Administrative Officer (VAO), Lekhpal, or Revenue Inspector conducts field inquiry to verify surviving heirs.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Issuance of Digitally Signed Legal Heir Certificate",
          "text": "The Tehsildar or SDM approves and issues the official digital certificate with a verifiable QR code for mutation and bank KYC.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/services/legal-heir#faq",
      "mainEntity": LEGAL_HEIR_FAQS.map((item) => ({
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
      "@id": "https://www.willdrafting.in/services/legal-heir#breadcrumb",
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
          "name": "Legal Heir",
          "item": "https://www.willdrafting.in/services/legal-heir",
        },
      ],
    },
  ],
};

const STATUTORY_COMPARISON_MATRIX = [
  {
    feature: "Issuing Authority",
    legalHeir: "Tehsildar / SDM / Local Revenue Office",
    successionCert: "Civil District Court (District Judge)",
    letterOfAdmin: "District Court / High Court Bench",
  },
  {
    feature: "Governing Statute",
    legalHeir: "State Revenue Manuals & Municipal Rules",
    successionCert: "Part X (Section 370) Indian Succession Act",
    letterOfAdmin: "Chapter II Indian Succession Act, 1925",
  },
  {
    feature: "Average Turnaround",
    legalHeir: "15 to 30 Working Days (Summary Check)",
    successionCert: "6 to 12 Months (Court Notice & Paper Ads)",
    letterOfAdmin: "8 to 18 Months (Formal Court Trial)",
  },
  {
    feature: "Official Cost & Fees",
    legalHeir: "Nominal Government Fee (Rs 50 to Rs 500)",
    successionCert: "Court Fee (2% to 7% of Total Asset Value)",
    letterOfAdmin: "High Court Fee & Administration Bond",
  },
  {
    feature: "Asset Applicability",
    legalHeir: "Land records, pensions, PF & small bank funds",
    successionCert: "Company shares, mutual funds & bank deposits",
    letterOfAdmin: "Full estate when no valid Will exists",
  },
  {
    feature: "Contested Dispute Power",
    legalHeir: "None; Officer cancels if siblings object",
    successionCert: "Full Judicial Power; Judge decides claims",
    letterOfAdmin: "Full Title; Conclusive against all parties",
  },
];

export default function LegalHeirPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LEGAL_HEIR_SCHEMA) }}
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
              Legal Heir
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span>
              Written by <strong className="text-[#111827]">WillDrafting Editorial Team</strong>
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
            1. HERO SECTION (Single Strict H1 < 70 Characters: 53 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>Legal Heir Certificate &amp; Succession Advisory · Revenue Dept &amp; SRO</span>
              </div>

              {/* Single Strict H1: 53 characters */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Legal Heir Certificate Services in India &amp; Legal Help
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                When a person dies without a Will, the family needs a legal heir certificate. This document proves who the legal heirs are under Indian law. Our advocates help you make family tree papers. We guide you through revenue office checks. We also help you transfer property and claim bank funds quickly.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Apply for Legal Heir Assistance</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#comparison-matrix"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Legal Heir vs Court Certificate</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Class 1 Heir Checks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Fast Tehsildar Help</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Property Mutation Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Lawyer Verified</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (H2 <= 70 chars: 42 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Critical Legal Distinction
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                When a Legal Heir Certificate is Not Enough
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Demat Shares and High-Value Funds:</strong> Indian banks often reject revenue papers for sums above 5 lakh rupees. For higher sums, you need a court Succession Certificate under Section 372 of the Indian Succession Act.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Sibling Disputes:</strong> Revenue officers cannot decide family disputes. If a sibling objects to the request, the officer rejects it. In such cases, heirs must go to civil court to divide the estate.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Selling Inherited Property:</strong> This certificate updates names in tax records. However, selling the home requires all heirs to sign the sale deed. Alternatively, co-heirs can sign a registered Relinquishment Deed.
                  </span>
                </li>
              </ul>
              <Link
                href="/blogs/legal-heir-certificate-vs-succession-certificate"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Read Legal Heir vs Succession Certificate Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE STATE TABS & 30-SECOND ELIGIBILITY CHECKER
            ========================================================================= */}
        <section id="state-protocols" className="w-full">
          <LegalHeirInteractive />
        </section>

        {/* =========================================================================
            3. VISUAL LEGAL BLUEPRINT (H2 <= 70 chars: 51 chars)
            ========================================================================= */}
        <section id="document-anatomy" className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Official Document Anatomy</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Official Legal Heir Document Anatomy
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Here is how an official succession paper looks in India. It includes an official state seal, revenue office stamp, and a verified family tree.
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/legal-heir-og.jpg"
              alt="Official Government of India Succession Certificate and Legal Heir Lineage Document Verification"
              width={1200}
              height={675}
              className="w-full h-auto rounded-2xl"
              priority
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Official Legal Heir paper framework showing family lineage and authority stamp.
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STATUTORY COMPARISON MATRIX (H2 <= 70 chars: 54 chars)
            ========================================================================= */}
        <section id="comparison-matrix" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Statutory Comparison Matrix</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Legal Heir Certificate vs Court Succession Certificate
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Choosing the right legal path saves you time and money. Check the differences between revenue certificates and court orders below.
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Legal Feature</th>
                    <th className="py-4 px-6 w-[26%] text-[#111827]">Legal Heir Certificate</th>
                    <th className="py-4 px-6 w-[27%] text-[#C65378]">Court Succession Certificate</th>
                    <th className="py-4 px-6 w-[27%]">Letter of Administration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {STATUTORY_COMPARISON_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors align-top">
                      <td className="py-5 px-6 font-semibold text-[#111827]">{row.feature}</td>
                      <td className="py-5 px-6 font-medium text-[#111827] bg-[#FAF7F0]/30">{row.legalHeir}</td>
                      <td className="py-5 px-6 font-medium text-[#C65378]">{row.successionCert}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.letterOfAdmin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. 5-STEP STATUTORY ROADMAP (H2 <= 70 chars: 44 chars)
            ========================================================================= */}
        <section id="revenue-steps" className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>5-Step Revenue Protocol</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              How to Get a Legal Heir Certificate in India
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Follow this 5-step roadmap made by our high court lawyers. It helps your application pass local revenue checks without delay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                step: "01",
                title: "Get Death Certificate",
                desc: "Get the official death paper from the municipal registrar where the person died.",
              },
              {
                step: "02",
                title: "Draft Family Affidavit",
                desc: "A lawyer drafts the family tree affidavit on stamp paper with heir ID cards.",
              },
              {
                step: "03",
                title: "Submit Revenue Request",
                desc: "Submit the form on the state web portal or at the local Tehsildar office.",
              },
              {
                step: "04",
                title: "Field Check & Report",
                desc: "The local Patwari or revenue officer visits the home and checks all family members.",
              },
              {
                step: "05",
                title: "Digital Certificate Issued",
                desc: "The Tehsildar signs and issues the digital QR-coded certificate for bank and land records.",
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
                  <h3 className="text-lg font-semibold text-[#111827] mb-2 leading-snug">{item.title}</h3>
                  <p className="text-[13.5px] leading-[1.6] text-[#49585F]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. SPECIALIZED LEGAL BLOCK (H2 <= 70 chars: 49 chars)
            ========================================================================= */}
        <section id="sibling-disputes" className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Family Settlement &amp; Dispute Protection</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Handling Sibling Disputes, Sisters &amp; NRI Co-Heirs
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Estate issues often start when siblings disagree or live abroad. Sometimes brothers try to leave married sisters out of property papers.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                Under Indian law, married daughters have equal rights by birth. The Supreme Court confirmed this in the Vineeta Sharma ruling. If one family member wants to keep the house, other heirs can sign a registered <Link href="/templates/release-deed-format" className="text-[#C65378] font-bold underline hover:text-[#a13c5d]">Relinquishment Deed</Link>. For heirs living in the US, UK, or UAE, our team drafts embassy-stamped powers of attorney. We ensure your family settles property peacefully.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult Our Succession Advocates</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates/release-deed-format"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Relinquishment Deed (Haq Tyag) Format</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. STATUTORY FAQS (H2 <= 70 chars: 53 chars)
            ========================================================================= */}
        <section id="faqs" className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Legal Heir Statutory FAQs</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions on Legal Heir Certificates
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Here are clear legal answers from our team at AMA Legal Solutions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEGAL_HEIR_FAQS.map((item, idx) => (
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
                Related Succession Resources &amp; Tools
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related statutory guides and calculators to resolve inheritance questions:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blogs/legal-heir-certificate-vs-succession-certificate"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Legal Heir vs Succession Certificate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/succession-certificate"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Court Succession Certificate Lawyers</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/succession-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Launch Succession Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/release-deed-format"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Relinquishment Deed Format</span>
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
              Authored by WillDrafting Editorial Team · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This statutory guide follows the Hindu Succession Act, 1956 and state revenue rules. It provides general legal information. For complex family property disputes, consult our succession advocates directly.
            </p>
          </div>
          <Link
            href="/about-us"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] shrink-0"
          >
            <span>Meet Our Succession Advocates</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <CTA />
      <Footer />
    </div>
  );
}
