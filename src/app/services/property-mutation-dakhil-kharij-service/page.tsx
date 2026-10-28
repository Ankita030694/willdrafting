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
  HelpCircle,
  FileText,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import PropertyMutationInteractive from "@/components/PropertyMutationInteractive";
import CopyableMutationBox from "@/components/CopyableMutationBox";

// Strictly 50-60 characters for Screaming Frog compliance (58 chars)
export const metadata: Metadata = {
  title: {
    absolute: "Property Mutation after Death Service India | WillDrafting",
  },
  // Strictly 140-155 characters for Screaming Frog compliance (144 chars)
  description:
    "Advocate-led property mutation after death service in India. Update municipal records, Dakhil Kharij, Khata transfer, and 7/12 extract smoothly.",
  authors: [{ name: "Advocate Anuj Anand Malik", url: "https://www.linkedin.com/in/iamanujmalik/" }],
  keywords: [
    "property mutation after death service india",
    "dakhil kharij lawyer india",
    "khata transfer service bangalore",
    "mcd dda mutation service delhi",
    "7/12 varas nond service maharashtra",
    "patta chitta transfer tamil nadu",
    "property mutation without will india",
    "mutation based on will section 35",
    "online property mutation process india",
    "documents required for property mutation after death",
    "difference between registry and dakhil kharij",
    "supreme court ruling on property mutation sawarni",
    "bbmp e aasthi khata transfer legal service",
    "nagar nigam property tax mutation lawyer",
    "nri property mutation service in india",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service",
  },
  openGraph: {
    title: "Property Mutation after Death Service India | WillDrafting",
    description:
      "Advocate-led property mutation after death service in India. Update municipal records, Dakhil Kharij, Khata transfer, and 7/12 extract smoothly.",
    url: "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/property-mutation-dakhil-kharij-service-og.jpg",
        width: 1200,
        height: 675,
        alt: "Property Mutation and Dakhil Kharij Legal Services in India - AMA Legal Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Mutation after Death Service India | WillDrafting",
    description:
      "Advocate-led property mutation after death service in India. Update municipal records, Dakhil Kharij, Khata transfer, and 7/12 extract smoothly.",
    images: ["/images/property-mutation-dakhil-kharij-service-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MUTATION_FAQS = [
  {
    q: "What is property mutation (Dakhil Kharij) and why is it necessary after death?",
    a: "Property mutation, known regionally as Dakhil Kharij, Khata transfer, or Varas Nond, is the administrative process of updating local revenue and municipal records after a property owner dies. It substitutes the name of the deceased owner with the lawful heirs or legatees. Mutation is necessary to pay municipal property taxes, secure water and electricity connections, and ensure smooth resale without buyer loan rejections.",
  },
  {
    q: "Does property mutation confer absolute ownership title in India?",
    a: "No. The Supreme Court of India in landmark decisions, including Sawarni v. Inder Kaur (1996) and Bhimabai Mahadeo Kambekar (2019), held that mutation of property in revenue records neither creates nor extinguishes title. It has no presumptive value on ownership and is maintained strictly for fiscal purposes (property tax and land revenue collection). Actual legal title flows from registered conveyance deeds, succession laws, or court probate.",
  },
  {
    q: "How does property mutation with a registered Will differ from intestate mutation?",
    a: "When the deceased left a registered Will, mutation is initiated directly in favor of the named beneficiaries. Heirs submit a certified copy of the Will, death certificate, and an affidavit of testamentary capacity. In contrast, intestate mutation (where no Will exists) requires a Legal Heir Certificate or Surviving Member Certificate (SMC) and includes all Class 1 legal heirs equally, unless co-heirs execute a registered Relinquishment Deed.",
  },
  {
    q: "Can a married daughter be excluded from property mutation records?",
    a: "No. Under the Hindu Succession (Amendment) Act, 2005 and the Supreme Court Vineeta Sharma ruling, daughters have equal coparcenary birth rights. A married daughter remains a Class 1 legal heir under Section 8. Excluding a married daughter from revenue mutation or forging an affidavit without her consent is illegal and grounds for summary cancellation of the mutation.",
  },
  {
    q: "How can NRIs living abroad complete property mutation without traveling to India?",
    a: "NRIs can execute an advocate-drafted Special Power of Attorney (PoA) in favor of a trusted relative or lawyer in India. In Hague Convention countries (USA, UK, Canada, Australia), the PoA is apostilled. In non-Hague countries like the UAE, it is attested at the Indian Embassy. The PoA must be stamped in India within 90 days of receipt, enabling your advocate to represent you before the Tehsildar or Municipal Corporation.",
  },
  {
    q: "What happens if a co-heir files an objection against the mutation application?",
    a: "If an objection is lodged, the revenue official issues notice and conducts a summary inquiry. However, if a genuine title dispute emerges (such as a forged Will or contested succession), the Tehsildar has no judicial authority to adjudicate ownership. Under Section 35 of state revenue codes, the revenue court directs the disputing parties to obtain an injunction or declaration of title from a competent civil court.",
  },
  {
    q: "Will banks approve a home loan if the seller has not updated the property mutation?",
    a: "No. Leading Indian banks and housing finance corporations require an unbroken chain of title documents before approving home loans. While the registered parent deed proves legal purchase, bank legal panels insist on an updated Municipal Khata Certificate, 7/12 extract, and recent property tax receipts in the current owner's name to ensure clear possession and zero pending municipal dues.",
  },
  {
    q: "What is the statutory time limit to apply for property mutation after the owner passes away?",
    a: "Most state municipal acts and land revenue codes recommend reporting the death and filing for mutation within 3 to 6 months of demise. While delayed applications are accepted upon filing an explanatory affidavit and paying nominal late fees, prolonged delay creates risks of fraudulent third-party claims, property tax penalties, and utility disconnection.",
  },
];

const MUTATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service#webpage",
      "url": "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service",
      "name": "Property Mutation after Death Service India | WillDrafting",
      "description":
        "Advocate-led property mutation after death service in India. Update municipal records, Dakhil Kharij, Khata transfer, and 7/12 extract smoothly.",
      "datePublished": "2026-10-27",
      "dateModified": "2026-10-27",
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
        "url": "https://www.willdrafting.in/images/property-mutation-dakhil-kharij-service-og.jpg",
        "width": 1200,
        "height": 675,
        "caption": "Property Mutation & Dakhil Kharij Advocate Services in India - AMA Legal Solutions",
      },
      "breadcrumb": {
        "@id": "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service#breadcrumb",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service#service",
      "name": "Property Mutation & Dakhil Kharij Legal Services India",
      "serviceType": "Municipal Property Mutation, Khata Transfer & Revenue Record Update",
      "provider": {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "AdministrativeArea", "name": "Delhi NCR" },
        { "@type": "AdministrativeArea", "name": "Maharashtra" },
        { "@type": "AdministrativeArea", "name": "Karnataka" },
        { "@type": "AdministrativeArea", "name": "Uttar Pradesh" },
        { "@type": "AdministrativeArea", "name": "West Bengal" },
        { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Property Mutation & Record Transfer Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "price": "9990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Municipal Property Tax Mutation (MCD / BBMP / BMC)",
              "description":
                "Complete document preparation, NOC drafting, online application submission, and updated property tax receipt delivery.",
            },
          },
          {
            "@type": "Offer",
            "price": "14990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Tehsildar Dakhil Kharij & 7/12 Varas Nond Representation",
              "description":
                "Advocate representation before revenue courts, Lekhpal/Talathi field report coordination, public notice management, and Record of Rights transfer.",
            },
          },
          {
            "@type": "Offer",
            "price": "24990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "End-to-End NRI Remote Property Mutation & Khata Package",
              "description":
                "Special Power of Attorney drafting, Indian foreign stamp adjudication, multi-authority municipal & development authority substitution.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service#howto",
      "name": "How to Mutate Property in India After the Owner's Demise",
      "description":
        "A 4-step statutory procedure to transfer municipal and land revenue records from a deceased ancestor to lawful legal heirs or legatees.",
      "totalTime": "P30D",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Title Audit & Document Verification",
          "text": "Audit the registered title deed, municipal death certificate, registered Will or Legal Heir Certificate, and latest tax receipts.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Draft Affidavits, Indemnity Bonds & Co-Heir NOCs",
          "text": "Prepare sworn affidavits of legal heirs on non-judicial stamp paper, municipal indemnity bonds, and registered relinquishment deeds if mutating to a single heir.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Filing Before Municipal Corporation or Tehsildar",
          "text": "Submit the mutation petition through state e-portals or revenue courts, coordinate field reports with the Patwari/Lekhpal, and monitor statutory public notice periods.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Procurement of Updated Khata, 7/12 & Tax Certificate",
          "text": "Verify entry certification and obtain the newly updated Property Tax Bill, Khata Certificate, Porcha, or 7/12 extract showing the heir as the registered owner.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service#faq",
      "mainEntity": MUTATION_FAQS.map((item) => ({
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
      "@id": "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service#breadcrumb",
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
          "name": "Property Mutation & Dakhil Kharij Service",
          "item": "https://www.willdrafting.in/services/property-mutation-dakhil-kharij-service",
        },
      ],
    },
  ],
};

const COMPARISON_TABLE = [
  {
    parameter: "Core Legal Purpose",
    saleDeed: "Transfers absolute proprietary ownership and title to the buyer.",
    mutation: "Updates administrative tax records and fiscal liability for property taxes.",
    supremeCourtRuling: "Sawarni v. Inder Kaur (1996) 6 SCC 223: Mutation does not create or extinguish title.",
  },
  {
    parameter: "Governing Enactment",
    saleDeed: "Transfer of Property Act, 1882 read with Registration Act, 1908.",
    mutation: "State Land Revenue Codes & Municipal Corporation Acts (MCD, BMC, BBMP).",
    supremeCourtRuling: "Bhimabai Mahadeo Kambekar (2019): Title must flow from registered deeds, not revenue entries.",
  },
  {
    parameter: "Adjudicating Officer",
    saleDeed: "Sub-Registrar of Assurances (Department of Stamps & Registration).",
    mutation: "Tehsildar / Naib Tehsildar (Revenue) or Municipal Zonal Assessor & Collector.",
    supremeCourtRuling: "Revenue officers possess summary administrative powers, not judicial title-determination jurisdiction.",
  },
  {
    parameter: "Evidentiary Value in Court",
    saleDeed: "Primary documentary proof of legal title under Section 91/92 Evidence Law.",
    mutation: "Fiscal evidence of possession and payment of public taxes; rebuttable entry.",
    supremeCourtRuling: "P. Kishore Kumar v. Vittal K. Patkar (2023): Revenue records cannot override registered conveyance.",
  },
  {
    parameter: "Bank Loan & Mortgage Effect",
    saleDeed: "Mandatory primary document deposited with the bank for equitable mortgage.",
    mutation: "Essential secondary document proving municipal assessment and zero tax arrears.",
    supremeCourtRuling: "Banks reject disbursement if municipal mutation remains in the deceased person's name.",
  },
  {
    parameter: "Dispute & Redressal Forum",
    saleDeed: "Civil Court (Civil Judge / District Court) via Suit for Declaration or Cancellation.",
    mutation: "Revenue Appellate Forum (Sub-Divisional Officer / District Collector / Revenue Board).",
    supremeCourtRuling: "Revenue courts must stay or defer to civil court decrees in bona fide ownership disputes.",
  },
];

const SAMPLE_AFFIDAVIT_CODE = `AFFIDAVIT FOR MUTATION OF IMMOVABLE PROPERTY POST DEMISE OF REGISTERED OWNER
(To be executed on Non-Judicial Stamp Paper of prescribed State value and attested by an Executive Magistrate / Notary Public)

I, [Full Name of Legal Heir / Applicant], Son/Daughter/Spouse of Late [Name of Deceased Owner], aged about [Age] years, residing at [Complete Residential Address], do hereby solemnly affirm and declare on oath as under:

1. That I am a citizen of India and the lawful [Relationship, e.g., Son / Daughter / Widow] of Late [Name of Deceased Owner], who departed this life on [Date of Death] at [Place of Death, e.g., New Delhi].

2. That the deceased was the absolute, lawful, and registered owner of immovable property bearing No. [Complete Property Details: Flat/House No., Plot Size, Sector/Ward, City, PIN] by virtue of Registered Sale Deed / Conveyance Deed dated [Date], registered as Document No. [Doc Number], in Book No. [Book], Volume No. [Volume], at Pages [Pages], in the office of the Sub-Registrar, [SRO Name].

3. That the deceased died leaving behind the following surviving Class I legal heirs and none else:
   (i) [Name 1] — [Relationship, e.g., Widow] — Age [Years] — Address [Address]
   (ii) [Name 2] — [Relationship, e.g., Son] — Age [Years] — Address [Address]
   (iii) [Name 3] — [Relationship, e.g., Daughter] — Age [Years] — Address [Address]

4. [Clause A: If Testate / Under Will]
   That the deceased executed his/her Last Will and Testament dated [Date of Will], which is genuine, valid, and unrevoked, whereunder the subject property has been bequeathed exclusively in favor of the Deponent.

   [Clause B: If Intestate / Joint Mutation]
   That the deceased died intestate without leaving any Will, and all surviving legal heirs are entitled to equal undivided shares in the property under the applicable law of succession.

5. That the Deponent has not concealed any material fact or any other legal heir. No civil suit, partition proceeding, or testamentary challenge is pending before any court of competent jurisdiction concerning the ownership or inheritance of the subject property.

6. That the Deponent hereby undertakes to indemnify and keep indemnified the [Name of Municipal Corporation / Tehsildar Office] against any financial loss, damages, or third-party claims arising from updating property tax / revenue records in the name of the applicant.

DEPONENT

VERIFICATION:
Verified at [City] on this [Day] day of [Month], [Year], that the contents of paragraphs 1 to 6 of this affidavit are true and correct to the best of my personal knowledge and legal advice, and nothing material has been concealed therefrom.

DEPONENT`;

export default function PropertyMutationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(MUTATION_SCHEMA) }}
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
              Property Mutation &amp; Dakhil Kharij Service
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
            <time dateTime="2026-10-27" className="text-[#6B7280]">
              Updated October 27, 2026
            </time>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Single Strict H1 <= 65 Characters: 50 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>ESTATE TRANSMISSION &amp; REVENUE CONVEYANCING · PAN-INDIA</span>
              </div>

              {/* Single Strict H1: 50 chars */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Property Mutation &amp; Dakhil Kharij Service in India
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                When a parent or property owner passes away, leaving their name in municipal and revenue records exposes your family to tax penalties, unauthorized claims, and bank loan rejections. Our senior advocates handle end-to-end <strong className="text-[#111827]">Property Mutation, Dakhil Kharij, BBMP Khata Transfer, and 7/12 Varas Nond</strong> across India without requiring you to wait in queues at government offices.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Hire Advocate for Property Mutation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Draft a Will to Protect Heirs</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Pan-India Coverage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Advocate Drafted NOCs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Zero Bureaucracy Visits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Updated Khata Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box (H2 <= 70 chars: 42 chars) */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Critical Estate Transmission Warning
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why Property Mutation After Death Is Vital
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Title Deeds Do Not Update Municipal Bills:</strong> Registering a conveyance deed or inheriting through a Will is only step one. Municipal property tax bills remain in the deceased person&apos;s name until mutation is formally granted.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Home Loan &amp; Resale Gridlock:</strong> Prospective buyers cannot obtain bank mortgages on properties where the municipal Khata, 7/12 extract, or Jamabandi still lists a deceased ancestor.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Shield Against Encroachment &amp; Fraud:</strong> Un-mutated properties are frequent targets for bogus claims and illegal sale deeds by unscrupulous distant relatives or local land syndicates.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Need to Transfer Shares Among Co-Heirs? Explore Relinquishment Deeds</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT: STATE PROTOCOLS & 30-SECOND CALCULATOR
            ========================================================================= */}
        <section id="state-protocols" className="w-full">
          <PropertyMutationInteractive />
        </section>

        {/* =========================================================================
            3. FEATURE FIGURE: OG IMAGE VISUAL OVERVIEW (H2 <= 70 chars: 57 chars)
            ========================================================================= */}
        <section className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Advocate-Managed Asset Transmission</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Legal Overview: Advocate-Managed Property Mutation
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How our High Court legal team coordinates municipal and revenue records across Delhi MCD/DDA, Bengaluru BBMP Khata, Mumbai BMC/7-12, and Uttar Pradesh Tehsildar offices:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/property-mutation-dakhil-kharij-service-og.jpg"
              alt="Property Mutation and Dakhil Kharij Service in India by AMA Legal Solutions"
              width={1200}
              height={675}
              className="w-full h-auto rounded-2xl"
              priority
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> End-to-end advocate workflow for property mutation, Record of Rights transfer, and municipal tax reassessment following the owner&apos;s death.
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. COMPARISON TABLE: SALE DEED VS MUTATION (H2 <= 70 chars: 57 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Supreme Court Precedent &amp; Judicial Reality</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Mutation vs Registry: Why Title Deeds Are Not Tax Records
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A common misconception among Indian homeowners is believing that having a registered Sale Deed or Will automatically completes property transfer. The Supreme Court in <strong className="text-[#111827]">Sawarni v. Inder Kaur</strong> firmly established the boundary between legal title and municipal mutation:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[840px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Legal Feature</th>
                    <th className="py-4 px-6 w-[26%]">Registered Title Deed / Conveyance</th>
                    <th className="py-4 px-6 w-[26%]">Property Mutation (Dakhil Kharij / Khata)</th>
                    <th className="py-4 px-6 w-[28%]">Supreme Court Doctrine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {COMPARISON_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors align-top">
                      <td className="py-5 px-6 font-semibold text-[#111827]">{row.parameter}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.saleDeed}</td>
                      <td className="py-5 px-6 font-medium text-[#C65378]">{row.mutation}</td>
                      <td className="py-5 px-6 text-xs text-[#55636D] leading-relaxed">{row.supremeCourtRuling}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DOCUMENT REQUIREMENTS SECTION (H2 <= 70 chars: 59 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileText className="w-4 h-4" />
              <span>Statutory Compliance Matrix</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Document Requirements: Mutation With Will vs Intestate Case
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              The documents required by municipal corporations and revenue tehsildars depend heavily on whether the deceased owner left a valid Will:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Mutation Based on Registered Will */}
            <div className="bg-white rounded-[24px] p-7 sm:p-8 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#047857]/10 text-[#047857] text-xs font-bold uppercase tracking-wider mb-4">
                  <span>Track A: Testate Succession</span>
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-3">
                  Mutation Under a Registered Will
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[#49585F] mb-6">
                  Where the deceased left a registered Will bequeathing the property to specific heirs or an executor, municipal authorities proceed with expedited verification:
                </p>
                <ul className="space-y-3 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>Original Death Certificate from Municipal Registrar</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>Certified True Copy of the Registered Will from Sub-Registrar</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>Affidavit of Beneficiary declaring the Will is the testator&apos;s final testate disposition</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>High Court Probate order (mandatory only in Mumbai, Kolkata, Chennai presidential limits)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>Public notice publication in daily newspapers (if required by local municipal bye-laws)</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#172228]/10">
                <Link
                  href="/services/probate-lawyer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] hover:text-[#a13c5d]"
                >
                  <span>Need Court Probate for Mumbai or Kolkata? Learn More</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 2: Mutation Without a Will (Intestate) */}
            <div className="bg-white rounded-[24px] p-7 sm:p-8 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider mb-4">
                  <span>Track B: Intestate Succession</span>
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-3">
                  Mutation Without a Will (Intestate)
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[#49585F] mb-6">
                  When someone dies intestate, all Class 1 legal heirs inherit undivided co-shares. Transferring records requires establishing the complete family tree:
                </p>
                <ul className="space-y-3 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>Legal Heir Certificate, Waris Praman Patra, or Surviving Member Certificate</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>Registered Relinquishment Deed (if transferring title to one heir instead of joint mutation)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>No Objection Certificate (NOC) sworn affidavits from all surviving siblings and mother</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>Family Genealogy Affidavit (Pedigree Tree) attested by an Executive Magistrate</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>Indemnity Bond on non-judicial stamp paper indemnifying the revenue office</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#172228]/10">
                <Link
                  href="/services/legal-heir"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378]"
                >
                  <span>Need Help Getting a Legal Heir Certificate? Explore Services</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. STEP-BY-STEP SOP PROTOCOL (H2 <= 70 chars: 61 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Advocate-Managed Execution Protocol</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Step-by-Step SOP: Advocate-Managed Property Mutation Protocol
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How AMA Legal Solutions transitions parental property records smoothly through a rigorous 4-step conveyancing protocol:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Chain Audit & Title Search",
                desc: "Our legal team verifies the parent registered sale deed, encumbrance certificates, municipal assessment books, and ensures all outstanding property tax dues are computed.",
              },
              {
                step: "02",
                title: "Drafting Affidavits & Deeds",
                desc: "We draft court-compliant family tree affidavits, municipal indemnity bonds, and coordinate Sub-Registrar execution of Relinquishment Deeds if co-heirs are releasing shares.",
              },
              {
                step: "03",
                title: "Revenue & Municipal Filing",
                desc: "We file formal mutation petitions on state revenue portals (MCD, BBMP, Aaple Sarkar, UP Bhulekh), liaise with local Lekhpals/Talathis, and manage public notice ads.",
              },
              {
                step: "04",
                title: "Delivery of Certified Records",
                desc: "Following certification, we procure the newly issued Property Tax ID (UPIC), e-Khata Certificate & Extract, or updated 7/12 Satbara copy delivered straight to your home.",
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
            7. COPYABLE LEGAL AFFIDAVIT TEMPLATE (H2 <= 70 chars: 60 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Court-Ready Drafting Template</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory Checklist &amp; Affidavit Format for Property Mutation
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Every municipal authority and revenue tehsildar in India requires a formal sworn affidavit. Below is our advocate-verified draft template:
            </p>
          </div>

          <CopyableMutationBox
            title="Affidavit for Mutation of Immovable Property Post Demise of Registered Owner"
            code={SAMPLE_AFFIDAVIT_CODE}
            explanation="Must be typed on non-judicial stamp paper of prescribed state value (typically ₹10 to ₹100 depending on state stamp rules) and solemnly affirmed before an Executive Magistrate, Sub-Divisional Magistrate (SDM), or Notary Public. If one heir is mutating, all other Class 1 heirs must execute separate registered Release Deeds or consent affidavits."
          />

          {/* Contextual Link to Diagnostic Calculator */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Interactive Legal Diagnostic Tools
              </div>
              <p className="text-sm text-[#49585F] max-w-xl">
                Unsure how your deceased parent&apos;s estate divides under the Hindu Succession Act or Indian Succession Act? Use our free legal calculator before applying for mutation:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/succession-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#172228] hover:bg-[#C65378] px-5 py-3 rounded-full transition-colors"
              >
                <span>Calculate Legal Heir Shares</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/probate-checker"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#172228]/10 px-5 py-3 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Check If Probate Is Mandatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. DEDICATED BLOCK: NRIs & REMOTE HEIRS (H2 <= 70 chars: 61 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Specialized Cross-Border Service</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                For NRIs &amp; Remote Heirs: Smooth Property Mutation from Abroad
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Managing parental property mutation in Bengaluru, Delhi NCR, Mumbai, Hyderabad, or Lucknow from the United States, United Kingdom, UAE, Canada, or Australia is notoriously frustrating. Dealing with local revenue clerks, verifying boundary records, and tracking 15-day objection periods often forces NRIs to take repeated expensive international flights.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                With AMA Legal Solutions, NRIs execute an advocate-drafted <strong className="text-[#111827]">Special Power of Attorney (PoA)</strong> abroad. We guide you through Hague Apostille or Indian Embassy attestation, complete the mandatory 90-day Indian stamp adjudication under Section 18 of the Indian Stamp Act, and represent you before municipal corporations and revenue courts until your updated Khata or 7/12 extract is issued.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Book NRI Remote Mutation Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/nri-will-india"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Read the NRI Two-Will Strategy</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. FAQS SECTION (H2 <= 70 chars: 56 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Statutory FAQs &amp; Judicial Guidance</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions on Property Mutation in India
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Authoritative answers prepared by the <strong className="text-[#111827]">WillDrafting Editorial Team</strong> and verified by <strong className="text-[#111827]">AMA Legal Solutions</strong> advocates:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MUTATION_FAQS.map((item, idx) => (
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

          {/* Contextual Internal Links Bar (H2 <= 70 chars: 54 chars) */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Related Property Transmission Guides &amp; Legal Resources
              </h2>
              <p className="text-sm text-[#49585F]">
                Explore related estate transmission and revenue conveyancing services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Relinquishment Deed Registration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/legal-heir"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Legal Heir Certificate Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/survivor-member-certificate"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Surviving Member Certificate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>High Court Probate Lawyers</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. EDITORIAL & E-E-A-T AUTHOR ATTRIBUTION CARD
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
              This statutory guide is prepared in accordance with state land revenue codes (UP Revenue Code, 2006; Maharashtra Land Revenue Code, 1966; Karnataka Land Revenue Act, 1964; West Bengal Land Reforms Act, 1955) and municipal corporation acts (Delhi Municipal Corporation Act, 1957; Bruhat Bengaluru Mahanagara Palike Act, 2020; Mumbai Municipal Corporation Act, 1888). It is intended for informational and conveyancing guidance and does not replace tailored courtroom legal counsel in active civil litigation.
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
