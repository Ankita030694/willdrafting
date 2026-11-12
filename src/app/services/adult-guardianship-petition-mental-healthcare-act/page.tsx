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
  Building2,
  AlertCircle,
  HeartHandshake,
  Stethoscope,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import AdultGuardianshipInteractive from "@/components/AdultGuardianshipInteractive";
import CopyableTrustClauseBox from "@/components/CopyableTrustClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Adult Guardianship Petition Lawyer India | WillDrafting",
  },
  description:
    "Dedicated adult guardianship legal services under Mental Healthcare Act 2017 & National Trust Act 1999 for dementia, coma, and special needs adults.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "adult guardianship lawyer mental healthcare act india",
    "legal guardianship for dementia patient advocate",
    "national trust act legal guardian certificate lawyer",
    "high court lunatic mental infirmity petition service",
    "parens patriae petition article 226 high court",
    "guardian for comatose person india high court",
    "unfreeze bank account dementia parent advocate",
    "mental healthcare act 2017 nominated representative",
    "local level committee llc form a form b national trust act",
    "sell property of mentally ill parent high court permission",
    "guardians and wards act adult mental incapacity defect",
    "ama legal solutions adult guardianship petition",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act",
      "x-default":
        "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act",
    },
  },
  openGraph: {
    title: "Adult Guardianship Petition Lawyer India | WillDrafting",
    description:
      "Dedicated adult guardianship legal services under Mental Healthcare Act 2017 & National Trust Act 1999 for dementia, coma, and special needs adults.",
    url: "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/adult-guardianship-petition-mental-healthcare-act-og.jpg",
        width: 1200,
        height: 675,
        alt: "Adult Guardianship Legal Petition High Court Advocate Representation India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Adult Guardianship Petition Lawyer India | WillDrafting",
    description:
      "Dedicated adult guardianship legal services under Mental Healthcare Act 2017 & National Trust Act 1999 for dementia, coma, and special needs adults.",
    images: [
      "https://www.willdrafting.in/images/adult-guardianship-petition-mental-healthcare-act-og.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const GUARDIANSHIP_FAQS = [
  {
    q: "Why does the Guardians and Wards Act, 1890 not apply to adults with dementia or coma?",
    a: "Section 4(1) of the Guardians and Wards Act, 1890 strictly limits its jurisdiction to minors under 18 years of age. District Courts dismiss petitions filed under this Act for incapacitated adults. Families must instead petition the High Court under Article 226 parens patriae jurisdiction.",
  },
  {
    q: "How does the High Court appoint a legal guardian under parens patriae jurisdiction?",
    a: "Under Article 226 of the Constitution of India, High Courts hold inherent sovereign power to protect citizens unable to care for themselves. Following landmark rulings like Shobha Gopalakrishnan v. State of Kerala, the court sets up a government medical board and appoints a trusted family guardian.",
  },
  {
    q: "What is the difference between a Nominated Representative and a Legal Guardian?",
    a: "Under Sections 14 to 17 of the Mental Healthcare Act, 2017, a Nominated Representative assists only with psychiatric treatment decisions. They hold zero authority to operate bank accounts or sell property. Operating bank accounts requires a High Court parens patriae order.",
  },
  {
    q: "When can families use the National Trust Act, 1999 instead of the High Court?",
    a: "Section 14 of the National Trust Act applies exclusively to four conditions: Autism, Cerebral Palsy, Intellectual Disability, and Multiple Disabilities. For these specific conditions, the Local Level Committee headed by the District Collector grants a Form B Legal Guardianship Certificate.",
  },
  {
    q: "How do we unfreeze bank accounts and pensions of an incapacitated parent?",
    a: "Once the High Court issues a guardianship order, our advocates serve certified court copies on bank branch managers under RBI Master Directions. The bank opens an operational ledger allowing the guardian to withdraw funds for monthly hospital, ICU, and nursing bills.",
  },
  {
    q: "Can a legal guardian sell land or a flat owned by an incapacitated parent?",
    a: "Yes, but only with prior judicial sanction from the High Court. The guardian must establish genuine necessity for medical care, submit a government valuation report, and give an undertaking to deposit surplus proceeds into court-monitored bank fixed deposits.",
  },
  {
    q: "Does an existing Power of Attorney remain valid after a parent suffers severe stroke or dementia?",
    a: "No. Under Section 201 of the Indian Contract Act, 1872, an agency automatically terminates when the principal becomes of unsound mind. Continuing to use a regular Power of Attorney after severe cognitive collapse is legally void and vulnerable to civil or criminal challenge.",
  },
  {
    q: "How much does adult guardianship legal representation cost with WillDrafting?",
    a: "Traditional litigation firms bill on open-ended hourly rates that exceed several lakhs. WillDrafting and AMA Legal Solutions provide transparent flat-fee retainers starting from ₹49,990 for LLC certificates to ₹1,25,000 for High Court Article 226 parens patriae petitions.",
  },
];

const GUARDIANSHIP_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act#webpage",
      url: "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act",
      name: "Adult Guardianship Petition Lawyer India | WillDrafting",
      description:
        "Dedicated adult guardianship legal services under Mental Healthcare Act 2017 & National Trust Act 1999 for dementia, coma, and special needs adults.",
      datePublished: "2026-11-12",
      dateModified: "2026-11-12",
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
        url: "https://www.willdrafting.in/images/adult-guardianship-petition-mental-healthcare-act-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Adult Guardianship Legal Petition High Court Advocate Representation India",
      },
      breadcrumb: {
        "@id": "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act#breadcrumb",
      },
    },
    {
      "@type": ["Service", "LegalService"],
      "@id": "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act#service",
      name: "Adult Guardianship Petition & Legal Representation India",
      serviceType:
        "High Court Parens Patriae Writ Petitions, Mental Healthcare Act Advisory & National Trust Act Guardianship",
      provider: {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Singapore" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Adult Guardianship Legal Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "National Trust Act LLC Guardianship Certificate Package",
              description:
                "District Collector Local Level Committee Form A drafting, NGO liaison, and Form B certificate issuance for special needs adults.",
            },
          },
          {
            "@type": "Offer",
            price: "65000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Mental Healthcare Act Nominated Representative Advisory",
              description:
                "Statutory appointment of Nominated Representative under Sections 14 to 17 and Board registration for psychiatric care.",
            },
          },
          {
            "@type": "Offer",
            price: "125000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High Court Parens Patriae Writ Petition Retainer",
              description:
                "End-to-end High Court Article 226 petition, Civil Surgeon medical board coordination, and bank account unfreeze mandate orders.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act#howto",
      name: "How to Obtain Adult Guardianship for an Incapacitated Person in India",
      description:
        "Four-step statutory protocol to secure High Court parens patriae orders, unfreeze bank accounts, and safeguard an incapacitated adult.",
      totalTime: "P45D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Secure Neuro-Psychiatric Evaluation & Medical Board Record",
          text: "Obtain clinical reports, MMSE cognitive evaluation, and certification of mental incapacity from a Government Hospital Civil Surgeon.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "File Article 226 Parens Patriae Writ Petition in High Court",
          text: "Senior counsel files a writ petition in the High Court establishing next friend status and arraying state health authorities and banks as respondents.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "High Court Directed Medical Board Examination",
          text: "The High Court directs a 3-member medical board to examine the patient and submit a sealed clinical report to the court registry.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Issuance of Guardianship Decree & Bank Unfreezing",
          text: "The High Court issues the guardianship decree. Counsel serves certified copies on bank managers to unfreeze accounts for medical and living expenses.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act#faq",
      mainEntity: GUARDIANSHIP_FAQS.map((item) => ({
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
      "@id": "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act#breadcrumb",
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
          name: "Adult Guardianship Petition",
          item: "https://www.willdrafting.in/services/adult-guardianship-petition-mental-healthcare-act",
        },
      ],
    },
  ],
};

const GUARDIANSHIP_COMPARISON_TABLE = [
  {
    framework: "High Court Parens Patriae (Art. 226)",
    condition: "Dementia, Alzheimer's, Coma, Severe Stroke, Vegetative State",
    forum: "High Court (Constitutional Writ Bench)",
    financialPowers: "Full bank unfreezing, pension release, and court-sanctioned property sale",
    limitations: "Requires High Court advocate representation and medical board verification",
  },
  {
    framework: "National Trust Act, 1999 (Sec. 14)",
    condition: "Autism, Cerebral Palsy, Intellectual Disability, Multiple Disabilities",
    forum: "Local Level Committee (District Collector / DM)",
    financialPowers: "Bank accounts, welfare schemes, and day-to-day maintenance funds",
    limitations: "Strictly limited to 4 defined conditions; excludes age-related dementia or coma",
  },
  {
    framework: "Mental Healthcare Act, 2017 (Sec. 14-17)",
    condition: "Mental Illness requiring psychiatric treatment or hospital admission",
    forum: "Mental Health Review Board (MHRB)",
    financialPowers: "Zero financial powers. Restricted exclusively to psychiatric treatment decisions",
    limitations: "Cannot operate bank accounts, sign pension mandates, or alienate real estate",
  },
  {
    framework: "Rights of Persons with Disabilities Act, 2016",
    condition: "Benchmark disabilities (40%+ disability score)",
    forum: "Designated Local Court or Social Welfare Authority",
    financialPowers: "Limited guardianship for specific decisions over fixed periods",
    limitations: "Implementation rules vary by state; courts frequently redirect to High Court",
  },
  {
    framework: "Guardians and Wards Act, 1890 (GWA)",
    condition: "Minors under 18 years of age only (Section 4(1))",
    forum: "District Family Court / District Judge",
    financialPowers: "Minor child asset custody and maintenance",
    limitations: "Zero jurisdiction over adults. Petitions for demented adults are dismissed",
  },
];

const GENERAL_VS_AMA_TABLE = [
  {
    parameter: "Statutory Forum Selection",
    general: "Often files under Guardians & Wards Act 1890, leading to dismissal",
    ama: "Invokes High Court parens patriae or National Trust Act LLC directly",
  },
  {
    parameter: "Hospital Medical Board Coordination",
    general: "Clients must run between Civil Surgeon and CMO offices independently",
    ama: "End-to-end legal liaison with government hospital medical examination boards",
  },
  {
    parameter: "Bank Account Unfreezing Mandates",
    general: "Leaves families to argue with reluctant bank branch managers",
    ama: "Direct legal service of certified court orders under RBI Master Directions",
  },
  {
    parameter: "Court Permission for Real Estate Sale",
    general: "Treats property alienation as a separate multi-year civil suit",
    ama: "Integrated miscellaneous prayers for fast-track medical expense liquidation",
  },
  {
    parameter: "Transparent Retainer Pricing",
    general: "Hourly fees or open-ended per-appearance trial court charges",
    ama: "Fixed flat retainers with clear deliverables and zero surprise billing",
  },
];

export default function AdultGuardianshipPetitionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(GUARDIANSHIP_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-24">
        {/* =========================================================================
            BREADCRUMB & EDITORIAL AUTHOR ATTRIBUTION BAR
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
              Adult Guardianship Petition
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
            <time dateTime="2026-11-12" className="text-[#6B7280]">
              Updated November 12, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Strict Single H1: 51 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>Article 226 Parens Patriae · Mental Healthcare Act · National Trust Act</span>
              </div>

              {/* Single H1: 51 characters (Strictly 30 to 65 chars, distinct from Title) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Adult Guardianship Legal Petition Services in India
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                When a parent suffers from advanced dementia, Alzheimer&apos;s disease, coma, or stroke, families cannot operate bank accounts or fund medical care. Our High Court advocates file parens patriae writ petitions under Article 226 to appoint legal guardians and unfreeze assets legally.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Guardianship Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/templates/durable-power-of-attorney-for-healthcare-format-india"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Healthcare PoA Format</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Art. 226 Parens Patriae</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Bank Unfreeze Mandates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>National Trust Act LLC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Medical Board Ready</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (Strict Single H2: 56 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Emergency Elder Care Protection
              </div>
              {/* Single H2: 56 characters */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why Families Need High Court Parens Patriae Guardianship
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Powers of Attorney Become Void:</strong> Under Section 201 of the Indian Contract Act, 1872, an agency automatically terminates upon mental incapacity. Banks reject past PoAs once dementia or coma sets in.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>District Court GWA Has No Jurisdiction:</strong> The Guardians and Wards Act, 1890 applies only to minors under 18 years. District Judges dismiss adult guardianship petitions for lack of statutory jurisdiction.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Unlocking Funds for ICU and Nursing:</strong> High Court parens patriae decrees empower children to operate frozen bank accounts, encash mutual funds, and liquidate property to fund critical healthcare.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/private-family-trust-formation"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Protect Wealth with Special Needs Trust</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE GUARDIANSHIP DIAGNOSTIC EXPLORER
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <AdultGuardianshipInteractive />
        </section>

        {/* =========================================================================
            3. EMBEDDED EDITORIAL VISUAL BANNER SECTION (Strict Figure 1)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Petition Architecture</span>
            </div>
            {/* Heading: 58 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Blueprint: Adult Guardianship Petition Architecture
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              When an adult suffers from cognitive collapse, Indian law requires constitutional intervention. High Courts step in under Article 226 to protect the person, unlock frozen savings, and direct medical care.
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/adult-guardianship-petition-mental-healthcare-act-og.jpg"
              alt="Adult Guardianship Legal Petition High Court Advocate Representation India"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl shadow-xs"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> High Court parens patriae adult guardianship architecture in India under Article 226 — appointing legal guardians, unfreezing bank accounts, and safeguarding incapacitated adults.
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE: STATUTORY FRAMEWORKS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Comparative Statutory Analysis</span>
            </div>
            {/* Heading: 54 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Legal Comparison: Adult Guardianship Pathways in India
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Indian law provides multiple statutes for care and disability. Knowing which forum holds actual legal authority saves families months of wasted litigation and expense:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Framework</th>
                    <th className="py-4 px-6 w-[22%]">Covered Medical Conditions</th>
                    <th className="py-4 px-6 w-[18%]">Competent Forum</th>
                    <th className="py-4 px-6 w-[22%]">Financial &amp; Banking Scope</th>
                    <th className="py-4 px-6 w-[16%]">Key Limitations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {GUARDIANSHIP_COMPARISON_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.framework}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.condition}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.forum}</td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.financialPowers}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.limitations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DEDICATED DEMENTIA & COMA EMERGENCY HEALTHCARE SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <HeartHandshake className="w-4 h-4" />
                <span>Specialized Elder Care Advisory</span>
              </div>
              {/* Heading: 61 characters */}
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Dementia &amp; Coma Care: High Court Parens Patriae Protection
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                Families of patients in comatose states or severe memory decline face deep distress. When savings are trapped in personal bank accounts, children cannot pay for ICU rooms, specialized nursing, or routine prescription medicines.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                The Kerala High Court in <em>Shobha Gopalakrishnan v. State of Kerala (2019)</em> established comprehensive guidelines for appointing guardians for comatose persons. High Courts in Delhi, Bombay, and Madras follow this precedent to protect incapacitated parents.
              </p>
              <p className="text-[14px] text-[#047857] font-semibold bg-white/70 p-3.5 rounded-xl border border-[#047857]/20">
                Judicial Precedent: High Courts exercise parens patriae power under Article 226 when no statutory forum exists. The court appoints a guardian to operate accounts, consent to medical procedures, and sell property for care.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Initiate High Court Petition</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/advance-medical-directive-living-will-jmfc-registration"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>View Living Will Options</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. 4-STEP EXECUTION PROTOCOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step High Court Protocol</span>
            </div>
            {/* Heading: 56 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step High Court Protocol for Legal Adult Guardianship
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Navigating High Court litigation requires precise procedural compliance. Here is our 4-step roadmap from clinical evaluation to final bank account unfreezing:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Clinical Medical Audit",
                desc: "Obtain detailed neurologist evaluations, MMSE cognitive scores, and hospital discharge summaries confirming severe incapacity.",
              },
              {
                step: "02",
                title: "Writ Petition Drafting",
                desc: "Senior advocates draft the Article 226 writ petition, arraying the State, District Collector, and relevant banks as respondents.",
              },
              {
                step: "03",
                title: "Medical Board Review",
                desc: "The High Court issues notice and directs a Government Hospital Medical Board to examine the patient and submit a report.",
              },
              {
                step: "04",
                title: "Decree & Bank Unfreeze",
                desc: "The High Court grants the guardianship decree. Our advocates serve certified orders on banks to release trapped medical funds.",
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
            7. BANK UNFREEZE & ASSET LIQUIDATION MANDATE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Banking &amp; Real Estate Protocol</span>
            </div>
            {/* Heading: 58 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Bank Account Unfreeze &amp; Asset Liquidation Mandate Protocol
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Banks adhere to strict KYC rules when an account holder cannot sign. Here is how our legal team coordinates with financial institutions and land registries:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Savings &amp; Fixed Deposits
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                We serve the certified High Court order on branch managers. Under RBI circulars, banks create a dedicated guardian ledger to release monthly living and hospital stipends.
              </p>
              <div className="text-xs font-semibold text-[#047857] bg-[#047857]/10 p-2.5 rounded-lg">
                Outcome: Immediate liquidity for ICU, nursing, and medicines.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Mutual Funds &amp; Demat Shares
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                Registrars like CAMS and KFintech require court-appointed guardian documentation before redeeming folios. We coordinate transmission filings for rapid liquidation.
              </p>
              <div className="text-xs font-semibold text-[#C65378] bg-[#C65378]/10 p-2.5 rounded-lg">
                Key Note: Eliminates investor signature mismatch hurdles.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h4 className="text-lg font-semibold text-[#111827] mb-2.5">
                Court Property Sale Sanction
              </h4>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                To sell ancestral or self-acquired real estate, we file a specific sanction prayer in the High Court. This permits execution of registered conveyance deeds before the Sub-Registrar.
              </p>
              <div className="text-xs font-semibold text-[#172228] bg-[#FAF7F0] p-2.5 rounded-lg border border-[#172228]/10">
                Rule: Prior High Court sanction protects buyers and title legality.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. COPYABLE HIGH COURT PRAYER CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
              <FileCheck className="w-4 h-4" />
              <span>Standard Writ Petition Wording</span>
            </div>
            {/* Heading: 57 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Sample High Court Prayer Clause: Adult Legal Guardianship
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Review the standard prayer clause drafted by our High Court advocates under Article 226 of the Constitution of India for comatose or demented parents:
            </p>
          </div>

          <CopyableTrustClauseBox
            title="Writ Petition Prayer for Adult Guardianship (Constitution of India Art. 226)"
            code={`"PRAYER CLAUSE IN WRIT PETITION UNDER ARTICLE 226:

It is therefore most respectfully prayed that this Hon'ble Court may graciously be pleased to:

(a) Issue a Writ, order, or direction in the nature of Mandamus or any other appropriate writ exercising parens patriae jurisdiction, appointing the Petitioner as the Legal Guardian of the person and property of the Incapacitated Person [Name of Parent/Patient];

(b) Direct Respondent No. 3 (Government Hospital / Medical Board) to constitute a multi-disciplinary medical board to examine the cognitive status of [Name of Patient] and submit a medical evaluation report to this Hon'ble Court;

(c) Direct Respondent Banks [Name of Bank Branches] to permit the Petitioner, in their capacity as Legal Guardian, to operate all bank accounts, fixed deposits, locker facilities, and mutual fund folios standing in the name of the Incapacitated Person, for the sole purpose of funding their healthcare, hospitalization, and daily living expenses;

(d) Grant leave and sanction to the Petitioner to manage, lease, or alienate the immovable property situated at [Property Schedule], subject to depositing the net consideration into an interest-bearing escrow account monitored by this Hon'ble Court;

(e) Pass such other and further orders as this Hon'ble Court may deem fit and proper in the interest of justice and equity."`}
            explanation="Drafted under Article 226 parens patriae jurisdiction following Shobha Gopalakrishnan v. State of Kerala (2019). This prayer empowers families to manage healthcare, bank accounts, and property with full judicial sanction."
          />
        </section>

        {/* =========================================================================
            9. COMPETITOR BLIND SPOT: AMA LEGAL VS GENERAL TRIAL ADVOCATES
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Specialized Guardianship Counsel</span>
            </div>
            {/* Heading: 60 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              AMA Legal Solutions Guardianship Retainer vs General Counsel
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Many general trial lawyers mistakenly file in District Courts under minor guardianship laws, causing years of delay. AMA Legal Solutions brings direct High Court parens patriae expertise:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[28%]">Comparison Factor</th>
                    <th className="py-4 px-6 w-[36%]">General Practice Advocates</th>
                    <th className="py-4 px-6 w-[36%] text-[#C65378]">
                      AMA Legal Solutions &amp; WillDrafting
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {GENERAL_VS_AMA_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.general}</td>
                      <td className="py-5 px-6 font-medium text-[#047857] bg-[#047857]/5">
                        {row.ama}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. STATUTORY GUARDIANSHIP FAQS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Legal FAQs</span>
            </div>
            {/* Heading: 55 characters */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Adult Guardianship in India
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Find clear answers to common legal questions regarding adult guardianship petitions, banking access, and court rules:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GUARDIANSHIP_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Estate Planning &amp; Elder Care Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore our statutory legal services, power of attorney formats, and diagnostic tools:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>All Legal Services Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/durable-power-of-attorney-for-healthcare-format-india"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Healthcare Power of Attorney</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/advance-medical-directive-living-will-jmfc-registration"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Living Will Registration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/private-family-trust-formation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Special Needs Child Trust</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11. AUTHOR & E-E-A-T EDITORIAL VERIFICATION CARD
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
              This advisory guide is prepared in accordance with Article 226 of the Constitution of India, the Mental Healthcare Act, 2017, the National Trust Act, 1999, the Indian Contract Act, 1872, and the Registration Act, 1908. It provides legal information for elder care planning and does not replace individualized court representation.
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
