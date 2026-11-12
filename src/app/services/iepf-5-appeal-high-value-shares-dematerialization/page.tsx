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
  Coins,
  Gavel,
  FileSearch,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import IepfHighValueInteractive from "@/components/IepfHighValueInteractive";
import CopyableIepfClaimBox from "@/components/CopyableIepfClaimBox";

export const metadata: Metadata = {
  title: {
    absolute: "IEPF 5 Claim Lawyer: Recover Shares | WillDrafting",
  },
  description:
    "Dedicated legal service to claim unclaimed shares, dividends and physical certificates from IEPF Authority under Section 125 Companies Act 2013.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "iepf 5 claim lawyer unclaimed shares recovery",
    "recover deceased father shares from iepf advocate",
    "high value physical share transmission service sebi",
    "iepf rejection appeal lawyer india",
    "companies act section 125 unclaimed shares",
    "nclt section 59 share rectification petition",
    "form iepf 5 filing procedure mca v3",
    "sebi form isr 4 duplicate share certificate",
    "succession certificate for physical shares high court",
    "unclaimed dividends recovery lawyer india",
    "ama legal solutions iepf recovery practice",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization",
  },
  openGraph: {
    title: "IEPF 5 Claim Lawyer: Recover Shares | WillDrafting",
    description:
      "Dedicated legal service to claim unclaimed shares, dividends and physical certificates from IEPF Authority under Section 125 Companies Act 2013.",
    url: "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/iepf-5-appeal-high-value-shares-dematerialization-og.jpg",
        width: 1200,
        height: 675,
        alt: "IEPF 5 Claim Lawyer India High Value Physical Share Dematerialization and NCLT Appeal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEPF 5 Claim Lawyer: Recover Shares | WillDrafting",
    description:
      "Dedicated legal service to claim unclaimed shares, dividends and physical certificates from IEPF Authority under Section 125 Companies Act 2013.",
    images: ["/images/iepf-5-appeal-high-value-shares-dematerialization-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const IEPF_FAQS = [
  {
    q: "What is Form IEPF-5 and who is eligible to file a claim under Section 125?",
    a: "Form IEPF-5 is a statutory refund application under Section 125 of the Companies Act, 2013. Any shareholder or lawful legal heir whose shares or unclaimed dividends were transferred to the Investor Education and Protection Fund (IEPF) Authority can file this form online through the MCA V3 portal.",
  },
  {
    q: "How do legal heirs recover physical shares of a deceased parent from IEPF?",
    a: "Heirs must first complete share transmission with the company Registrar and Transfer Agent (RTA). The RTA issues an Entitlement Letter after verifying death papers, identity, and succession rights. Claimants then file Form IEPF-5 online and submit the physical dossier to the company Nodal Officer.",
  },
  {
    q: "Why is a court Succession Certificate required for high-value shares exceeding ₹5 Lakh?",
    a: "Under SEBI Master Circular guidelines, RTAs can process transmission on indemnity bonds only up to ₹5 Lakh per listed company. For holdings exceeding ₹5 Lakh in physical format, a Succession Certificate under Section 372 of the Indian Succession Act, 1925 or court Probate is mandatory.",
  },
  {
    q: "What happens if the company Nodal Officer delays the verification report beyond 30 days?",
    a: "Rule 7 of the IEPF Rules, 2016 requires company Nodal Officers to submit an online verification report to the IEPF Authority within 30 days. If the company delays or fails to act, our advocates serve a formal legal notice and file a company petition before the NCLT to direct compliance.",
  },
  {
    q: "What legal remedies exist if the IEPF Authority rejects a refund claim?",
    a: "If the IEPF Authority issues a rejection or invalid discrepancy letter, claimants can file an appeal and rectification petition before the National Company Law Tribunal (NCLT) under Sections 58 and 59 of the Companies Act, or approach the High Court under Article 226 for arbitrary inaction.",
  },
  {
    q: "Can legal heirs approach the National Company Law Tribunal (NCLT) for unclaimed shares?",
    a: "Yes. When a company refuses duplicate issuance, disputes legal heirship, or ignores statutory timelines, the NCLT possesses exclusive jurisdiction under Section 59 of the Companies Act, 2013 to rectify the register of members and direct immediate transmission and refund.",
  },
  {
    q: "How do SEBI Forms ISR-1, ISR-2, and ISR-4 apply to physical share dematerialization?",
    a: "Form ISR-1 updates PAN, KYC, and bank details with the RTA. Form ISR-2 handles signature verification certified by your bank manager. Form ISR-4 is the formal application for issuing a Letter of Confirmation, which allows dematerializing shares directly into your demat account.",
  },
  {
    q: "How long does the entire IEPF-5 claim and demat credit process take?",
    a: "A standard claim takes 3 to 6 months from initial RTA transmission to demat credit. For high-value holdings requiring civil court Succession Certificates or NCLT representation, the process typically spans 6 to 9 months with dedicated advocate tracking.",
  },
];

const IEPF_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization#webpage",
      url: "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization",
      name: "IEPF 5 Claim Lawyer: Recover Shares | WillDrafting",
      description:
        "Dedicated legal service to claim unclaimed shares, dividends and physical certificates from IEPF Authority under Section 125 Companies Act 2013.",
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
        url: "https://www.willdrafting.in/images/iepf-5-appeal-high-value-shares-dematerialization-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "IEPF 5 Claim Lawyer India High Value Physical Share Dematerialization and NCLT Appeal",
      },
      breadcrumb: {
        "@id": "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization#breadcrumb",
      },
    },
    {
      "@type": ["Service", "LegalService"],
      "@id": "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization#service",
      name: "IEPF-5 Claim, High-Value Share Recovery & NCLT Legal Representation",
      serviceType:
        "Form IEPF-5 Refund Claims, SEBI Share Transmission, Succession Certificates & NCLT Litigation",
      provider: {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      areaServed: [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Singapore" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IEPF Share Claim & Transmission Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Essential Form IEPF-5 Claim Filing & RTA Alignment",
              description:
                "MCA V3 Form IEPF-5 filing, indemnity drafting, RTA KYC alignment, and advance stamped receipt preparation.",
            },
          },
          {
            "@type": "Offer",
            price: "89990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "High-Value Securities Succession Certificate Package",
              description:
                "Civil Court or High Court petition drafting under Section 372 Indian Succession Act for holdings exceeding ₹5 Lakh.",
            },
          },
          {
            "@type": "Offer",
            price: "175000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive NCLT Appeal & IEPF Litigation Retainer",
              description:
                "End-to-end NCLT Section 58/59 company petition, advocate appearance, Nodal Officer verification enforcement, and demat recovery.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization#howto",
      name: "How to Recover High-Value Physical Shares and Dividends from IEPF",
      description:
        "Four-step statutory protocol to claim physical share certificates, obtain succession orders, file Form IEPF-5, and credit demat accounts.",
      totalTime: "P90D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Folio Audit & SEBI KYC Transmission",
          text: "Audit physical share certificates, execute SEBI Forms ISR-1, ISR-2, and ISR-4, and submit transmission papers to the company RTA.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Court Succession Certificate or Probate Petition",
          text: "Obtain a court Succession Certificate under Section 372 of the Indian Succession Act for shares valued over ₹5 Lakh per listed firm.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "MCA V3 Form IEPF-5 Filing & Physical Dossier Submission",
          text: "File Form IEPF-5 on the MCA portal, execute the indemnity bond on non-judicial stamp paper, and dispatch the dossier to the Nodal Officer.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Nodal Officer Verification & Demat Account Credit",
          text: "Company Nodal Officer submits the e-verification report to IEPF Authority, triggering direct electronic credit into your active demat account.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization#faq",
      mainEntity: IEPF_FAQS.map((item) => ({
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
      "@id": "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization#breadcrumb",
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
          name: "IEPF 5 Appeal & High Value Shares Recovery",
          item: "https://www.willdrafting.in/services/iepf-5-appeal-high-value-shares-dematerialization",
        },
      ],
    },
  ],
};

const HIGH_VALUE_MATRIX_TABLE = [
  {
    parameter: "Total Portfolio Valuation",
    tier1: "Under ₹5 Lakh per listed company",
    tier2: "₹5 Lakh to ₹25 Lakh per company",
    tier3: "₹25 Lakh to ₹5 Crore+ (HNIs & Blue Chips)",
  },
  {
    parameter: "Court Succession Mandate",
    tier1: "Exempt. Simplified RTA indemnity bond and legal heir NOC",
    tier2: "Mandatory. Civil District Court Succession Certificate",
    tier3: "Mandatory. High Court Succession or Probate Decree",
  },
  {
    parameter: "SEBI Statutory Guideline",
    tier1: "SEBI Master Circular 2022 Annexure-D simplified limit",
    tier2: "Indian Succession Act Section 372 & SEBI LODR Reg 40",
    tier3: "Indian Succession Act Sections 213/372 & NCLT Rules",
  },
  {
    parameter: "RTA Transmission Instrument",
    tier1: "Form ISR-4 Letter of Confirmation + KYC Form ISR-1",
    tier2: "Court decree schedule + Form ISR-4 + Banker Form ISR-2",
    tier3: "High Court certified decree + Nodal legal alignment",
  },
  {
    parameter: "NCLT Intervention Risk",
    tier1: "Low. Handled through direct administrative RTA channels",
    tier2: "Medium. NCLT petition needed if RTA delays past 30 days",
    tier3: "High. Sections 58 and 59 petition for wrongful rejection",
  },
];

const AGENT_VS_AMA_TABLE = [
  {
    parameter: "Court Legal Representation",
    agents: "Zero court standing. Cannot appear before Civil Courts, High Courts, or NCLT.",
    ama: "Direct advocate appearance before Civil Courts, High Courts, and NCLT Benches.",
  },
  {
    parameter: "Fee Structure & Transparency",
    agents: "Demands 15% to 30% contingency cuts or hidden upfront percentage fees.",
    ama: "Transparent flat legal fees starting from ₹49,990 with clear milestone agreements.",
  },
  {
    parameter: "Handling IEPF Rejection Notices",
    agents: "Abandons claims when IEPF issues discrepancy or rejection letters.",
    ama: "Drafts formal legal rejoinders and files statutory appeals before the NCLT.",
  },
  {
    parameter: "Succession Certificate Drafting",
    agents: "Forces clients to hire outside lawyers separately for court certificates.",
    ama: "Integrated court petition drafting, public notices, and court decree procurement.",
  },
  {
    parameter: "Bar Council & SEBI Compliance",
    agents: "Unregulated third-party middlemen prone to legal liability and data misuse.",
    ama: "Licensed advocates adhering strictly to the Advocates Act and Bar Council standards.",
  },
];

export default function IepfHighValueSharesDematerializationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(IEPF_SCHEMA) }}
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
              IEPF 5 Appeal &amp; High Value Shares Recovery
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
            1. HERO SECTION (Strict Single H1: 52 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>Asset Recovery · Companies Act 2013 s. 125 · NCLT Representation</span>
              </div>

              {/* Single H1: 52 characters (Strictly 30 to 65 chars, distinct from Title) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                IEPF 5 Share Claim Lawyer: High Value Asset Recovery
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Recover old physical shares and dividends transferred to the IEPF Authority. When uncashed payouts exceed seven years, shares move to government custody. Our High Court advocates handle SEBI demat transmission, court succession certificates, and NCLT petitions to return high-value assets to legal heirs.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Share Claim Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blogs/physical-share-certificates-found-after-death-dematerialisation-isr"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Read Transmission Guide</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Companies Act Sec 125</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>SEBI Demat Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>NCLT Court Advocacy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>100% Asset Claimed</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Asset Recovery Advantage
              </div>
              {/* Single H2: 61 characters (Strictly unique, <= 70 chars, no em-dashes) */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why High Value IEPF Claims Require Legal Counsel in India
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Mandatory Court Succession Orders:</strong> Portfolios valued over ₹5 Lakh require a civil court Succession Certificate. Unregulated brokers cannot file court petitions or appear before judges.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>NCLT Protection Against Delay:</strong> Company Nodal Officers often ignore the 30-day verification deadline. Our advocates issue legal notices and file petitions under Section 59 to enforce compliance.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Zero Commission Equity Slices:</strong> Commercial recovery agents demand 20% to 30% of your family wealth. We charge transparent flat legal fees with zero cuts from your recovered shares.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/iepf-unclaimed-shares-bank-recovery"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Compare Bank &amp; IEPF Recovery Options</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE IEPF BLUEPRINT EXPLORER & DIAGNOSTIC TOOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <IepfHighValueInteractive />
        </section>

        {/* =========================================================================
            3. EMBEDDED EDITORIAL VISUAL BANNER SECTION (Strict Figure 1)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Recovery Pipeline</span>
            </div>
            {/* H3 <= 70 chars */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Blueprint: High Value IEPF Share Claim Pipeline
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Recovering physical shares requires aligned legal execution across the company RTA, civil courts, and the IEPF Authority. Here is our court-tested workflow for high-value portfolios:
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/iepf-5-appeal-high-value-shares-dematerialization-og.jpg"
              alt="IEPF 5 Claim Lawyer India High Value Physical Share Dematerialization and NCLT Appeal"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl shadow-xs"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> High-value physical share transmission and IEPF-5 claim legal workflow in India under Section 125 of Companies Act, 2013 and SEBI Regulations.
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE: VALUE TIERS & JURISDICTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Comparative Legal Framework</span>
            </div>
            {/* H3 <= 70 chars */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              High-Value Share Recovery Matrix: Valuation vs Court Rules
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              The legal pathway for claiming shares depends on the market valuation of your holding. Review statutory requirements, court orders, and timelines across portfolio tiers:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Legal Parameter</th>
                    <th className="py-4 px-6 w-[24%]">Tier 1: Under ₹5 Lakh</th>
                    <th className="py-4 px-6 w-[27%]">Tier 2: ₹5L to ₹25 Lakh</th>
                    <th className="py-4 px-6 w-[27%] text-[#C65378]">
                      Tier 3: ₹25L to ₹5 Crore+ (HNIs)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {HIGH_VALUE_MATRIX_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.tier1}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.tier2}</td>
                      <td className="py-5 px-6 font-medium text-[#047857] bg-[#047857]/5">
                        {row.tier3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DEDICATED SUCCESSION CERTIFICATE & NCLT RE-OPENING SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Gavel className="w-4 h-4" />
                <span>NCLT &amp; Civil Court Legal Representation</span>
              </div>
              {/* H3 <= 70 chars */}
              <h3 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                NCLT Re-Opening Petitions &amp; Succession Mandates
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                When blue-chip physical shares (Reliance, TCS, HDFC, Larsen &amp; Toubro) sit in family lockers for decades, simple online filing is not enough. RTAs refuse duplicate certificates if signatures differ from old records.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                Our High Court advocates file joint petitions under Section 372 of the Indian Succession Act, 1925. When the company Nodal Officer delays the e-verification report past 30 days, we file company petitions under Sections 58 and 59 before the National Company Law Tribunal (NCLT) to compel immediate transfer.
              </p>
              <p className="text-[14px] text-[#047857] font-semibold bg-white/70 p-3.5 rounded-xl border border-[#047857]/20">
                Rule 7(3) of the IEPF Rules mandates that companies verify claims within 30 days. Failure empowers claimants to seek costs and directions from the NCLT.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Retain Share Recovery Advocate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/succession-certificate"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Succession Certificate Guide</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. 4-STEP RECOVERY PROTOCOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step Recovery SOP</span>
            </div>
            {/* H3 <= 70 chars */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Legal Protocol for IEPF Share Dematerialization
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Navigating company registrars and government portals requires strict legal compliance. Here is our 4-step process from locker discovery to active demat credit:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Folio Audit & SEBI KYC",
                desc: "Audit physical share folios, execute Form ISR-1 for KYC updates, ISR-2 for banker signature attestation, and obtain the RTA Entitlement Letter.",
              },
              {
                step: "02",
                title: "Court Succession Orders",
                desc: "Draft and file court succession petitions under Section 372 for holdings over ₹5 Lakh, securing certified decree schedules for the company.",
              },
              {
                step: "03",
                title: "Form IEPF-5 Filing",
                desc: "Submit MCA V3 Form IEPF-5 online, draft the statutory indemnity bond on state stamp paper, and dispatch physical papers to the company Nodal Officer.",
              },
              {
                step: "04",
                title: "Nodal Verification & Demat",
                desc: "Enforce the 30-day Nodal Officer verification report, track IEPF approval, and secure direct electronic credit into your active demat account.",
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
                  <p className="text-[14.5px] leading-[1.65] text-[#49585F]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. STATUTORY FRAMEWORK: COMPANIES ACT & SEBI CIRCULARS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Coins className="w-4 h-4" />
              <span>Statutory Legal Framework</span>
            </div>
            {/* H3 <= 70 chars */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Governing Legal Acts: Companies Act &amp; SEBI Circulars
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              IEPF share recovery is governed by company law, market regulations, and succession statutes. Review the core provisions protecting claimant rights:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h3 className="text-lg font-semibold text-[#111827] mb-2.5">
                Companies Act 2013 Sec 124 &amp; 125
              </h3>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                Mandates the transfer of shares to IEPF when dividends remain unpaid for seven straight years. Section 125(3)(a) grants shareholders the absolute statutory right to claim their refund.
              </p>
              <div className="text-xs font-semibold text-[#047857] bg-[#047857]/10 p-2.5 rounded-lg">
                Statutory Right: Government holds assets in trust; ownership remains with heirs.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h3 className="text-lg font-semibold text-[#111827] mb-2.5">
                SEBI Master Circular (2022) &amp; ISR Forms
              </h3>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                Standardizes transmission procedures. Form ISR-1 handles KYC, Form ISR-2 verifies signatures, and Form ISR-4 replaces paper certificates with electronic Letters of Confirmation.
              </p>
              <div className="text-xs font-semibold text-[#C65378] bg-[#C65378]/10 p-2.5 rounded-lg">
                Key Threshold: Holdings above ₹5 Lakh physical format require court succession.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h3 className="text-lg font-semibold text-[#111827] mb-2.5">
                NCLT Remedies under Section 58 &amp; 59
              </h3>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                Empowers legal heirs to appeal against company refusal or delays. The Tribunal can order rectification of the register of members and direct the immediate issuance of shares.
              </p>
              <div className="text-xs font-semibold text-[#172228] bg-[#FAF7F0] p-2.5 rounded-lg border border-[#172228]/10">
                Judicial Remedy: Overcomes bureaucratic RTA stalemates and arbitrary rejections.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. COPYABLE LEGAL INDEMNITY CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
              <FileCheck className="w-4 h-4" />
              <span>Standard Statutory Wording</span>
            </div>
            {/* H3 <= 70 chars */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Sample Legal Clause: Form IEPF-5 Indemnity Bond
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Here is the standard indemnity clause required under Rule 7 of the IEPF Rules, 2016 for claiming transferred shares and accumulated dividends:
            </p>
          </div>

          <CopyableIepfClaimBox
            title="Form IEPF-5 Statutory Indemnity Bond Clause (Rule 7, IEPF Rules 2016)"
            code={`"INDEMNITY BOND FOR CLAIM OF SHARES & DIVIDENDS UNDER SECTION 125 COMPANIES ACT, 2013

1. I/We, [Claimant Full Name], residing at [Address], do hereby solemnly affirm and state that I/we am/are the sole and lawful legal heir(s) / registered owner(s) of [Number of Shares] equity shares of [Company Name Limited] bearing Folio No. [Folio Number], which have been transferred to the Investor Education and Protection Fund (IEPF) Authority.

2. In consideration of the IEPF Authority and [Company Name Limited] releasing, transferring, and crediting the aforesaid [Number of Shares] equity shares into my/our Demat Account (DP ID: [DP ID], Client ID: [Client ID]), together with unpaid dividends of ₹[Amount], I/we hereby jointly and severally agree to keep the IEPF Authority, the Company, and its Directors harmless and fully indemnified against all claims, demands, liabilities, damages, and legal expenses.

3. If any rival claim, objection, or testamentary dispute arises concerning the lawful title to the said shares, I/we undertake to surrender the equivalent value and defend any legal proceedings initiated in respect thereof at my/our sole cost and risk."`}
            explanation="Executed on non-judicial stamp paper of appropriate state value, witnessed by two independent persons, and submitted alongside the physical Form IEPF-5 verification dossier."
          />
        </section>

        {/* =========================================================================
            9. COMPETITOR BLIND SPOT: AMA LEGAL VS AGENTS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Transparent Legal Representation Moat</span>
            </div>
            {/* H3 <= 70 chars */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              AMA Legal Solutions vs Unregulated Share Recovery Agents
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Unregulated share consultants often charge hefty percentages of your shares. They lack the legal standing to represent you in court when disputes arise. AMA Legal Solutions offers transparent advocate representation:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[28%]">Comparison Factor</th>
                    <th className="py-4 px-6 w-[36%]">Commercial Share Agents</th>
                    <th className="py-4 px-6 w-[36%] text-[#C65378]">
                      AMA Legal Solutions &amp; WillDrafting
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {AGENT_VS_AMA_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.agents}</td>
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
            10. STATUTORY FAQS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Legal FAQs</span>
            </div>
            {/* H3 <= 70 chars */}
            <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: IEPF-5 Claims &amp; Demat
            </h3>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Find clear answers to common questions about physical share recovery, Succession Certificates, and NCLT appeals:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {IEPF_FAQS.map((item, idx) => (
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
                Related Securities &amp; Estate Recovery Services
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related court services, transmission formats, and legal tools:
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
                href="/services/succession-certificate"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Succession Certificate Lawyer</span>
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
                href="/blogs/physical-share-certificates-found-after-death-dematerialisation-isr"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Physical Shares Transmission Blog</span>
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
              This statutory guide is prepared in accordance with the Companies Act, 2013, the IEPF (Accounting, Audit, Transfer and Refund) Rules, 2016, SEBI Master Circulars on Transmission of Securities, and the Indian Succession Act, 1925. It provides legal guidance and does not replace individualized advocate representation.
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
