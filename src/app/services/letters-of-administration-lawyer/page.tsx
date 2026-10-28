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
  Scale,
  Calculator,
  Gavel,
  Lock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import LettersOfAdminInteractive from "@/components/LettersOfAdminInteractive";
import CopyableLettersOfAdminBox from "@/components/CopyableLettersOfAdminBox";

export const metadata: Metadata = {
  title: {
    absolute: "Letters of Administration Lawyer India | WillDrafting.in",
  },
  description:
    "Expert advocate assistance for letters of administration lawyer india under Indian Succession Act, 1925. High Court petition drafting and representation.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "letters of administration lawyer india",
    "how to get letter of administration from court in india",
    "section 218 232 indian succession act lawyer",
    "loa for immovable property bank locker",
    "letters of administration petition format delhi high court",
    "bombay high court letters of administration advocate",
    "calcutta high court letters of administration cum testamento annexo",
    "section 291 administration bond surety lawyer",
    "section 370 succession certificate vs letters of administration",
    "probate vs letters of administration india",
    "bank locker deceased court order letters of administration",
    "ama legal solutions testamentary advocates",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/letters-of-administration-lawyer",
  },
  openGraph: {
    title: "Letters of Administration Lawyer India | WillDrafting.in",
    description:
      "Expert advocate assistance for letters of administration lawyer india under Indian Succession Act, 1925. High Court petition drafting and representation.",
    url: "https://www.willdrafting.in/services/letters-of-administration-lawyer",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/letters-of-administration-lawyer-og.jpg",
        width: 1200,
        height: 630,
        alt: "Letters of Administration Lawyer India High Court Testamentary Petitions and Asset Transmission Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Letters of Administration Lawyer India | WillDrafting.in",
    description:
      "Expert advocate assistance for letters of administration lawyer india under Indian Succession Act, 1925. High Court petition drafting and representation.",
    images: ["/images/letters-of-administration-lawyer-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const LOA_FAQS = [
  {
    q: "What is the difference between Letters of Administration and Probate in India?",
    a: "Under Section 222 of the Indian Succession Act, 1925, Probate is granted strictly to an executor named in a valid Will. Letters of Administration (LOA) under Section 218 or Section 232 are granted to legal heirs or beneficiaries when someone dies intestate without a Will, or when a Will exists but no executor was appointed or the named executor passed away or renounced.",
  },
  {
    q: "Why can't a Succession Certificate under Section 370 be used for land, flats, or bank lockers?",
    a: "Section 370 of the Indian Succession Act expressly restricts Succession Certificates to debts and securities like bank balances, fixed deposits, and listed shares. It does not establish title to immovable real estate. Furthermore, physical bank lockers containing jewelry or title deeds cannot be released under Section 370. Banks and Sub-Registrars require Letters of Administration.",
  },
  {
    q: "When can a court grant Letters of Administration with the Will Annexed under Section 232?",
    a: "A court grants Letters of Administration cum testamento annexo under Section 232 when the deceased left a valid Will, but failed to name an executor, or the appointed executor died before the testator, or the executor formally renounced probate under Section 230. Any universal or residuary legatee can apply.",
  },
  {
    q: "Who has statutory priority to apply for Letters of Administration under Section 218?",
    a: "Under Section 218 of the Act, when a Hindu, Buddhist, Sikh, Jain, or Muslim dies intestate, administration of the estate is granted to those persons who are entitled to the estate under the ordinary rules of succession. For Hindus, Class-I legal heirs (surviving spouse, sons, daughters, and mother) hold primary equal standing.",
  },
  {
    q: "Is an Administration Bond with sureties compulsory under Section 291 of the Act?",
    a: "Yes. Under Section 291, every person granted Letters of Administration must execute an administration bond with one or more sureties. The bond guarantees that the administrator will collect the estate, pay lawful debts, exhibit a true inventory within 6 months, and distribute assets faithfully among legal heirs.",
  },
  {
    q: "How is court fee calculated for Letters of Administration petitions in India?",
    a: "Court fees for Letters of Administration petitions are levied under state-specific Court Fees Acts on the net market value of the estate. Several states enforce statutory fee caps. For example, Maharashtra caps testamentary court fee at ₹75,000, while Delhi, Karnataka, and West Bengal calculate ad-valorem percentages based on verified valuation reports from local revenue authorities.",
  },
  {
    q: "What happens if a legal heir lodges a caveat under Section 284 opposing the petition?",
    a: "If an interested party files a caveat under Section 284, the court serves notice before issuing any grant. When the caveator files an affidavit raising objections, the proceeding is numbered as a contentious testamentary suit under Section 295. The matter proceeds like a regular civil suit with issues framed, witness cross-examination, and final judgment.",
  },
  {
    q: "Can an NRI heir apply for Letters of Administration without travelling to India?",
    a: "Yes. Non-Resident Indians can petition through an authorized Power of Attorney (PoA) holder in India. The foreign PoA must be executed before a local Notary Public, authenticated with a Hague Apostille (or attested by the Indian Embassy or Consulate), and stamped by the competent Collector in India within three months of receipt.",
  },
];

const LOA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://www.willdrafting.in/services/letters-of-administration-lawyer#webpage",
      url: "https://www.willdrafting.in/services/letters-of-administration-lawyer",
      name: "Letters of Administration Lawyer India | WillDrafting.in",
      description:
        "Expert advocate assistance for letters of administration lawyer india under Indian Succession Act, 1925. High Court petition drafting and representation.",
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
        url: "https://www.willdrafting.in/images/letters-of-administration-lawyer-og.jpg",
        width: 1200,
        height: 630,
        caption:
          "Letters of Administration Lawyer India High Court Testamentary Petitions and Asset Transmission Counsel",
      },
      breadcrumb: {
        "@id":
          "https://www.willdrafting.in/services/letters-of-administration-lawyer#breadcrumb",
      },
    },
    {
      "@type": "LegalService",
      "@id":
        "https://www.willdrafting.in/services/letters-of-administration-lawyer#legalservice",
      name: "AMA Legal Solutions Testamentary & Administration Practice",
      url: "https://www.willdrafting.in/services/letters-of-administration-lawyer",
      logo: "https://www.willdrafting.in/Logofinal.svg",
      image:
        "https://www.willdrafting.in/images/letters-of-administration-lawyer-og.jpg",
      description:
        "Pan-India testamentary legal counsel specializing in High Court and District Court Letters of Administration petitions under Sections 218 and 232 of the Indian Succession Act, 1925.",
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
        { "@type": "AdministrativeArea", name: "West Bengal" },
        { "@type": "AdministrativeArea", name: "Tamil Nadu" },
      ],
    },
    {
      "@type": "Service",
      "@id":
        "https://www.willdrafting.in/services/letters-of-administration-lawyer#service",
      name: "Letters of Administration Court Petition & Representation",
      serviceType:
        "Testamentary Petition, Intestate Real Estate Transmission & Bank Locker Release",
      provider: {
        "@id":
          "https://www.willdrafting.in/services/letters-of-administration-lawyer#legalservice",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Letters of Administration Legal Representation Plans",
        itemListElement: [
          {
            "@type": "Offer",
            price: "19990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Section 218 / 232 Petition Drafting & Asset Schedule Audit",
              description:
                "Comprehensive petition drafting with complete schedule of movable and immovable assets, valuation affidavits, and legal heir citations.",
            },
          },
          {
            "@type": "Offer",
            price: "34990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "District Court Letters of Administration End-to-End Representation",
              description:
                "Full advocacy representation from petition filing, newspaper publication, and collector valuation to Section 291 administration bond execution.",
            },
          },
          {
            "@type": "Offer",
            price: "59990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Original Civil Jurisdiction Letters of Administration",
              description:
                "Dedicated High Court Senior Advocate representation for multi-crore estates, inter-state assets under Section 273, and contested caveat defense.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id":
        "https://www.willdrafting.in/services/letters-of-administration-lawyer#howto",
      name: "How to Obtain Letters of Administration from Court in India",
      description:
        "Six-step statutory legal roadmap to petition civil courts for Letters of Administration under the Indian Succession Act, 1925.",
      totalTime: "P180D",
      step: [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Estate Audit & Legal Heir Consents",
          "text": "Identify all Class-I legal heirs, verify original death certificate, and assemble title deeds for land, flats, and bank locker records.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Petition Drafting under Section 278",
          "text": "Draft the court petition with certified schedules of assets, debts, and relationships under Section 278 or Section 232 ISA.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Filing in Competent Civil Court",
          "text": "File the petition before the District Judge or High Court exercising original testamentary jurisdiction based on asset location.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Citation Notices & Public Advertisements",
          "text": "The court issues notices to all non-petitioning heirs and orders publication in local English and vernacular daily newspapers.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Revenue Valuation & Court Fee Payment",
          "text": "Obtain official property valuation reports from the District Collector and deposit applicable ad-valorem state court fees.",
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Section 291 Bond Execution & Grant of LOA",
          "text": "Furnish the required administration bond with sureties before the Registrar to receive the sealed Letters of Administration decree.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.willdrafting.in/services/letters-of-administration-lawyer#faq",
      mainEntity: LOA_FAQS.map((item) => ({
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
        "https://www.willdrafting.in/services/letters-of-administration-lawyer#breadcrumb",
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
          name: "Letters of Administration Lawyer India",
          item:
            "https://www.willdrafting.in/services/letters-of-administration-lawyer",
        },
      ],
    },
  ],
};

const MATRIX_TABLE = [
  {
    parameter: "Core Statutory Sections",
    probate: "Sections 222, 276 & 289 ISA",
    loa: "Sections 218, 232, 278 & 290 ISA",
    succession: "Sections 370 to 390 (Part X) ISA",
  },
  {
    parameter: "Mandatory Prerequisite",
    probate: "Valid written Will with named executor",
    loa: "No Will (Intestate) OR Will without executor",
    succession: "Intestate or testate (Movable debts only)",
  },
  {
    parameter: "Who Holds Standing to Apply",
    probate: "Strictly the executor named in the Will",
    loa: "Legal heirs, universal legatees, creditors",
    succession: "Any legal heir claiming entitlement",
  },
  {
    parameter: "Immovable Property Coverage",
    probate: "Full coverage for all lands, flats, plots",
    loa: "Full statutory coverage for real estate",
    succession: "Expressly barred under Section 370",
  },
  {
    parameter: "Bank Locker Access",
    probate: "Allowed under court probate grant",
    loa: "Mandatory remedy demanded by banks",
    succession: "Cannot cover physical locker contents",
  },
  {
    parameter: "Administration Bond & Sureties",
    probate: "Exempt unless court specifically orders",
    loa: "Mandatory under Section 291 ISA",
    succession: "Court discretion under Section 375",
  },
  {
    parameter: "Pan-India Conclusive Effect",
    probate: "High Court seal valid nationwide (s. 273)",
    loa: "High Court seal valid nationwide (s. 273)",
    succession: "Valid throughout India for specified debts",
  },
];

const SAMPLE_PETITION_CLAUSE = `IN THE COURT OF THE DISTRICT JUDGE / HON'BLE HIGH COURT AT [CITY]
TESTAMENTARY AND INTESTATE JURISDICTION
PETITION NO. _______ OF 2026

IN THE MATTER OF:
THE INDIAN SUCCESSION ACT, 1925 (SECTION 218 / SECTION 232)
AND
IN THE MATTER OF THE ESTATE OF LATE [NAME OF DECEASED], DECEASED

1. That the deceased, Late [Name of Deceased], who ordinarily resided at [Address], died intestate at [Place of Death] on [Date of Death], leaving behind movable and immovable properties within the jurisdiction of this Hon'ble Court.

2. That the deceased died leaving behind the following surviving Class-I legal heirs and no other heirs whatsoever:
   a) [Name of Heir 1], [Relation], aged [Age] years, residing at [Address]
   b) [Name of Heir 2], [Relation], aged [Age] years, residing at [Address]

3. That the Petitioner is the [Relation, e.g., surviving son/daughter/spouse] of the deceased and holds lawful entitlement to administer the estate under Section 218 of the Indian Succession Act, 1925.

4. That Schedule 'A' hereto annexed contains a full and true inventory of all immovable properties (including residential flats and lands) and Schedule 'B' contains all movable properties and bank lockers left by the deceased.

5. That the Petitioner undertakes to duly administer the estate, collect all credits, pay all lawful debts, exhibit a true inventory and account within the statutory period under Section 317, and execute an Administration Bond under Section 291 of the Act.

PRAYER:
It is therefore respectfully prayed that this Hon'ble Court may be pleased to grant Letters of Administration of the property, estate, and credits of the said deceased to the Petitioner upon furnishing lawful security.`;

export default function LettersOfAdministrationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOA_SCHEMA) }}
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
              Letters of Administration Lawyer India
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
            1. HERO SECTION (Single Strict H1 < 70 Characters)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>
                  High Court Testamentary Practice · Pan-India Court Representation
                </span>
              </div>

              {/* Single H1: 59 characters (Strictly < 70 chars for Screaming Frog) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Letters of Administration Lawyer in India &amp; Court Petitions
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                When a family member passes away without a Will leaving immovable
                property or a bank locker, a Succession Certificate under Section
                370 is legally invalid. Under{" "}
                <strong className="text-[#111827]">
                  Sections 218 and 232 of the Indian Succession Act, 1925
                </strong>
                , our High Court advocates petition the civil courts for Letters of
                Administration (LOA) to establish lawful estate control and title.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Consult High Court Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Draft a Preventative Will</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 218 Petitions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 232 Will Annexed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Bank Locker Release</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 291 Bond Support</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Crucial Legal Distinction
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why Succession Certificates Fail for Land &amp; Lockers
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Section 370 ISA Bars Real Estate:</strong> Succession
                    Certificates apply only to debts and listed securities. Sub-Registrars
                    cannot mutate apartments or plots based on a Succession Certificate.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Bank Lockers Demand Letters of Admin:</strong> Physical
                    contents like gold ornaments, bullion, and property deeds cannot be
                    claimed through Section 370 certificates.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Will with No Named Executor:</strong> When a Will does not
                    appoint an executor, Probate is barred under Section 222. Letters of
                    Administration cum testamento annexo is compulsory.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Compare Full Probate Representation Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE ELIGIBILITY & DIAGNOSTIC TOOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
              <Scale className="w-4 h-4" />
              <span>Court Strategy Navigator</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Interactive Letters of Administration Decision Tool
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Determine whether your deceased estate requires Section 218 Letters of
              Administration, Section 232 Will Annexed administration, or Probate:
            </p>
          </div>

          <LettersOfAdminInteractive />
        </section>

        {/* =========================================================================
            3. EMBEDDED VISUAL SECTION (No Flowchart Image, Authentic High Court Law Asset)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Gavel className="w-4 h-4" />
              <span>Courtroom &amp; Testamentary Practice</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              High Court Testamentary Practice: Representation Asset
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Testamentary and intestate proceedings under the Indian Succession Act,
              1925 require meticulous compliance with High Court Original Side rules,
              revenue circle valuations, and Section 291 administration bond sureties:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/letters-of-administration-lawyer-og.jpg"
              alt="Letters of Administration Lawyer India High Court Testamentary Practice Representation"
              width={1200}
              height={630}
              priority
              className="w-full h-auto rounded-2xl object-cover"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Court Practice Overview:</strong> Petition drafting, citation
                issuance under Section 283, and administration bond execution under
                Section 291 of the Indian Succession Act, 1925.
              </span>
              <span>Advocate Anuj Anand Malik &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. 3-WAY MATRIX: PROBATE VS LETTERS OF ADMIN VS SUCCESSION CERTIFICATE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Statutory Comparison Matrix</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              3-Way Matrix: Probate vs Admin Letters vs Succession
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Understand the precise statutory boundaries separating Probate, Letters
              of Administration, and Succession Certificates under the Indian Succession
              Act, 1925:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[26%]">Probate of Will</th>
                    <th className="py-4 px-6 w-[26%]">Letters of Administration</th>
                    <th className="py-4 px-6 w-[26%]">Succession Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {MATRIX_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-4 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-4 px-6 text-[#49585F]">{row.probate}</td>
                      <td className="py-4 px-6 font-medium text-[#C65378]">
                        {row.loa}
                      </td>
                      <td className="py-4 px-6 text-[#49585F]">
                        {row.succession}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. COPYABLE PETITION DRAFTING CLAUSE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Court-Ready Legal Drafting</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory Format: Section 278 Petition Verification
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Every petition for Letters of Administration must satisfy the strict
              pleading rules under Section 278 of the Indian Succession Act, 1925.
              Review the court-tested title, body, and prayer format utilized by our
              testamentary advocates:
            </p>
          </div>

          <CopyableLettersOfAdminBox
            title="Model Petition Clause under Section 278 / 232 of the Indian Succession Act, 1925"
            code={SAMPLE_PETITION_CLAUSE}
            explanation="Section 278 requires specifying the exact time and place of death, family members and next of kin, schedule of assets and debts, and the Petitioner's right to administer. Under Section 281, at least one attesting witness must verify the petition when applying under Section 232 with a Will annexed."
          />
        </section>

        {/* =========================================================================
            MID-ARTICLE CONTEXTUAL LINK TO INTERACTIVE /TOOLS/* CALCULATOR
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#172228] text-white rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 shadow-[0_12px_36px_rgba(23,34,40,0.18)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Calculator className="w-4 h-4" />
                <span>Court Fee &amp; Timeline Diagnostic</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium leading-tight text-white mb-3">
                Estimate Court Fees &amp; Filing Timelines in Your State
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mb-4">
                State court fees for Letters of Administration vary from statutory
                maximum caps (such as ₹75,000 in Maharashtra) to percentage-based
                ad-valorem schedules in Delhi and Karnataka. Use our interactive
                calculator before initiating court proceedings:
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                  <span>State Court Fee Calculations</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                  <span>Contested vs Uncontested Schedules</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/tools/probate-court-fee-timeline-calculator"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Calculate Court Fees Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold uppercase tracking-wider px-5 py-3.5 transition-colors text-center"
              >
                <span>Check Legal Heir Certificate Tool</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. STEP-BY-STEP COURT ROADMAP
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Judicial Filing Protocol</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Step-by-Step Court Roadmap for Letters of Admin
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Obtaining Letters of Administration requires adherence to procedural
              mandates under the Indian Succession Act, 1925 and High Court Original
              Side rules:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Legal Heir & Estate Audit",
                desc: "Identify all Class-I legal heirs, verify original Death Certificate, and collect title deeds, mutation records, and bank locker allocation numbers.",
              },
              {
                step: "02",
                title: "Petition Drafting (s. 278)",
                desc: "Prepare the petition with verified Schedule of Properties (movable and immovable), valuation declarations, and Section 281 witness affidavits.",
              },
              {
                step: "03",
                title: "Court Filing & Registry Check",
                desc: "File before the competent District Court or High Court Original Jurisdiction. Pass registry scrutiny and rectify objections within statutory timelines.",
              },
              {
                step: "04",
                title: "Citations & Public Notice",
                desc: "Court issues individual citations to all surviving legal heirs and orders newspaper advertisements in English and vernacular dailies (s. 283).",
              },
              {
                step: "05",
                title: "Valuation & Court Fee Deposit",
                desc: "The District Collector assesses the net valuation of the estate. Deposit applicable state court fee stamp charges before the court registrar.",
              },
              {
                step: "06",
                title: "Administration Bond & Grant",
                desc: "Execute the Section 291 Administration Bond with approved sureties. Court issues Letters of Administration under formal seal for property mutation.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#C65378] mb-3">
                    Stage {item.step}
                  </span>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. SPECIALIZED SCENARIOS: BANK LOCKERS & WILL ANNEXED (s. 232)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Lock className="w-4 h-4" />
                <span>Specialized Testamentary Scenarios</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Bank Locker Release &amp; Section 232 Will Administration
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Two circumstances frequently demand Letters of Administration in Indian courts:
              </p>
              <div className="space-y-3 text-[14.5px] text-[#374151] mb-2">
                <p>
                  <strong>1. Physical Bank Locker Inventory:</strong> Commercial banks
                  strictly refuse to open a deceased individual&apos;s safe deposit
                  locker without a joint survivor, registered nominee, or court decree.
                  Because Section 370 excludes physical locker articles, our advocates
                  petition the court for Letters of Administration coupled with an
                  interim prayer to appoint a Court Commissioner to oversee locker drilling
                  and prepare a sealed inventory.
                </p>
                <p>
                  <strong>2. Letters of Administration cum testamento annexo (Section 232):</strong>{" "}
                  When a testator prepares a valid Will but omits appointing an executor,
                  or where the nominated executor passes away or formally renounces probate,
                  Section 222 prevents probate. The universal or residuary legatees must
                  petition under Section 232 to administer the estate in accordance with
                  the Will&apos;s directives.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Initiate Court Representation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/property-mutation-dakhil-kharij-service"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Property Mutation Guidance</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FAQS & RELATED RESOURCES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Statutory FAQs</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Letters of Administration
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative statutory guidance prepared by the{" "}
              <strong className="text-[#111827]">WillDrafting Editorial Team</strong>{" "}
              and verified by <strong className="text-[#111827]">AMA Legal Solutions</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOA_FAQS.map((item, idx) => (
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
                Related Indian Testamentary Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore our statutory court services and asset transmission tools:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Probate of Will Lawyers India</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/succession-certificate"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Succession Certificate Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/legal-heir"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Legal Heir Certificate Assistance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. AUTHOR & E-E-A-T EDITORIAL VERIFICATION CARD
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
              This guide is prepared in accordance with the Indian Succession Act, 1925,
              the Hindu Succession Act, 1956, and High Court Original Side Rules. It is
              intended for general informational and procedural guidance and does not
              substitute individualized advocate representation in testamentary court proceedings.
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
