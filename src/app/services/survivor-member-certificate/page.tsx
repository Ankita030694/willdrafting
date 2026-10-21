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
import SurvivorMemberInteractive from "@/components/SurvivorMemberInteractive";

export const metadata: Metadata = {
  title: {
    absolute: "Survivor Member Certificate India | Apply for SMC Online",
  },
  description:
    "Apply for a Surviving Member Certificate online in India. Fast-track SDM and revenue department approval for bank claims, property mutation, and pension.",
  authors: [{ name: "WillDrafting Editorial Team" }],
  keywords: [
    "survivor member certificate",
    "surviving member certificate online apply",
    "surviving member certificate delhi sdm",
    "smc certificate revenue department",
    "how to get surviving member certificate in india",
    "surviving member certificate edistrict delhi",
    "difference between surviving member and legal heir certificate",
    "surviving member certificate for bank account settlement",
    "surviving member certificate for property mutation",
    "documents required for surviving member certificate",
    "affidavit for surviving member certificate format",
    "surviving member certificate timeline and fees",
    "can married daughter get surviving member certificate",
    "surviving member certificate for dda flat mutation",
    "ama legal solutions surviving member certificate",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/survivor-member-certificate",
  },
  openGraph: {
    title: "Survivor Member Certificate India | Apply for SMC Online",
    description:
      "Apply for a Surviving Member Certificate online in India. Fast-track SDM and revenue department approval for bank claims, property mutation, and pension.",
    url: "https://www.willdrafting.in/services/survivor-member-certificate",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/survivor-member-certificate-og.jpg",
        width: 1200,
        height: 630,
        alt: "Surviving Member Certificate SMC Application and Verification in India by AMA Legal Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Survivor Member Certificate India | Apply for SMC Online",
    description:
      "Apply for a Surviving Member Certificate online in India. Fast-track SDM and revenue department approval for bank claims, property mutation, and pension.",
    images: ["/images/survivor-member-certificate-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const SMC_FAQS = [
  {
    q: "What is an SMC and who issues it in India?",
    a: "An SMC is an official document from the revenue office. An SDM or Tehsildar issues it. The paper lists all living legal heirs of the deceased. It acts as legal proof for bank claims and property name changes.",
  },
  {
    q: "How is an SMC different from a Court Succession Certificate?",
    a: "An SMC is a fast revenue certificate. It takes only 14 to 21 days. It costs very little. In contrast, a court succession certificate comes from a civil court judge. It takes 6 to 12 months. It also requires heavy court fees. You need court papers mainly for disputed stocks or debts.",
  },
  {
    q: "Who qualifies as a surviving legal heir?",
    a: "Class 1 heirs under Hindu law qualify first. These include the spouse, sons, daughters, and mother. Married daughters also have full equal rights. All these family members receive an equal share.",
  },
  {
    q: "Can a married sister or daughter be left out?",
    a: "No. The Supreme Court of India ruled that daughters have equal birth rights. Marriage does not remove these rights. Leaving out a married daughter is illegal. It can cancel the certificate.",
  },
  {
    q: "Do you need an SMC before a Relinquishment Deed?",
    a: "Yes. The Sub-Registrar requires an SMC first. It proves who the legal co-heirs are. After that, heirs can give up their shares safely through a registered deed.",
  },
  {
    q: "What documents do you need to apply online?",
    a: "You need the official death certificate. You also need Aadhaar cards of all heirs. Next, you need a signed family tree affidavit on stamp paper. Lastly, provide address proof for the home.",
  },
  {
    q: "What happens if a family member objects?",
    a: "Revenue officers only handle simple administrative cases. They cannot settle family disputes. If an heir files an objection, the SDM will stop the process. The family must then go to civil court.",
  },
  {
    q: "Can NRI family members join from abroad?",
    a: "Yes. NRI heirs do not have to travel to India. They can sign an affidavit or NOC abroad. They get it apostilled or verified at the Indian Embassy. Then they send it to India for filing.",
  },
];

const SMC_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/services/survivor-member-certificate#webpage",
      "url": "https://www.willdrafting.in/services/survivor-member-certificate",
      "name": "Survivor Member Certificate India | Apply for SMC Online",
      "description":
        "Apply for a Surviving Member Certificate online in India. Fast-track SDM and revenue department approval for bank claims, property mutation, and pension.",
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
        "url": "https://www.willdrafting.in/images/survivor-member-certificate-og.jpg",
        "width": 1200,
        "height": 630,
        "caption": "Professional legal guidance and SDM revenue application for Surviving Member Certificate in India",
      },
      "breadcrumb": {
        "@id": "https://www.willdrafting.in/services/survivor-member-certificate#breadcrumb",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.willdrafting.in/services/survivor-member-certificate#service",
      "name": "Surviving Member Certificate (SMC) Legal Documentation & Revenue Advisory",
      "serviceType": "Revenue Department Certification, Legal Heir Verification & Estate Settlement",
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
        "name": "Surviving Member Certificate Legal Plans",
        "itemListElement": [
          {
            "@type": "Offer",
            "price": "1990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Standard Family Tree Affidavit & SMC Documentation Support",
            },
          },
          {
            "@type": "Offer",
            "price": "4990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Complete Online SDM Portal Filing & Revenue Follow-Up Assistance",
            },
          },
          {
            "@type": "Offer",
            "price": "9990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "NRI Power of Attorney, Apostille & Comprehensive Estate Transfer Advisory",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/services/survivor-member-certificate#howto",
      "name": "How to Apply for a Surviving Member Certificate in India",
      "description":
        "Step-by-step legal procedure to obtain an official Surviving Member Certificate from the Sub-Divisional Magistrate (SDM) or Tehsildar in India.",
      "totalTime": "P18D",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Collect Death Certificate and Family Identity Proofs",
          "text": "Procure the municipal death certificate and gather Aadhaar cards and voter IDs of all living legal heirs.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Draft Notarized Family Tree Affidavit on Stamp Paper",
          "text": "Draft a legal affidavit listing the complete genealogical tree with passport photographs and execute it before a notary public.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Submit Application on State Revenue Portal",
          "text": "Upload the documents and notarized affidavit on the state revenue portal such as e-District Delhi, Aaple Sarkar, or eDistrict UP.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Revenue Inspector Field Verification and SMC Issuance",
          "text": "A revenue inspector conducts spot verification before the SDM or Tehsildar issues the digitally signed Surviving Member Certificate.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/services/survivor-member-certificate#faq",
      "mainEntity": SMC_FAQS.map((item) => ({
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
      "@id": "https://www.willdrafting.in/services/survivor-member-certificate#breadcrumb",
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
          "name": "Survivor Member Certificate",
          "item": "https://www.willdrafting.in/services/survivor-member-certificate",
        },
      ],
    },
  ],
};

const COMPARISON_ROWS = [
  {
    parameter: "Issuing Authority",
    smc: "Sub-Divisional Magistrate (SDM) / Revenue Dept",
    legalHeir: "Tehsildar / Mandal Revenue Officer (MRO)",
    successionCert: "Civil District Court Judge (Judicial Order)",
  },
  {
    parameter: "Governing Statute",
    smc: "State Revenue Manuals & e-District Guidelines",
    legalHeir: "State Land Revenue Codes & Personal Laws",
    successionCert: "Part X, Indian Succession Act, 1925",
  },
  {
    parameter: "Average Timeline",
    smc: "14 to 21 working days",
    legalHeir: "15 to 30 working days",
    successionCert: "6 to 12 months",
  },
  {
    parameter: "Government Fee",
    smc: "Nominal fee (₹10 to ₹50 online challan)",
    legalHeir: "Nominal fee or free in most states",
    successionCert: "2% to 7% ad-valorem court fees on asset value",
  },
  {
    parameter: "Property Mutation Scope",
    smc: "Mandatory for DDA, MCD, L&DO & Urban Bodies",
    legalHeir: "Standard for rural land & state revenue mutation",
    successionCert: "Does not cover immovable property titles",
  },
  {
    parameter: "Financial Claims Scope",
    smc: "Bank accounts & insurance up to bank limits",
    legalHeir: "Bank accounts, PF & pension settlements",
    successionCert: "Conclusive for high-value shares, Demat & debts",
  },
  {
    parameter: "Field Verification",
    smc: "Sub-Divisional Revenue Inspector spot inquiry",
    legalHeir: "Lekhpal / Patwari / VAO field report",
    successionCert: "Judicial notice & newspaper publication",
  },
];

const PURPOSE_MATRIX_ROWS = [
  {
    assetOrPurpose: "DDA & MCD Property Mutation",
    requirement: "Mandatory document",
    keyAuthority: "Delhi Development Authority / MCD",
    guideline: "Required to mutate residential leasehold and freehold plots into surviving heirs names.",
  },
  {
    assetOrPurpose: "Bank Accounts Without Nominee",
    requirement: "Accepted up to bank limits",
    keyAuthority: "Public & Private Banks (RBI Circular)",
    guideline: "Banks release balances upon submission of SMC, death certificate, and indemnity bond.",
  },
  {
    assetOrPurpose: "Relinquishment Deed Registration",
    requirement: "Mandatory prerequisite",
    keyAuthority: "Sub-Registrar Offices (SRO)",
    guideline: "Sub-Registrars require an SMC to verify that all legal co-heirs are accounted for.",
  },
  {
    assetOrPurpose: "Family Pension & Gratuity",
    requirement: "Standard requirement",
    keyAuthority: "EPFO & Pension Accounts Offices",
    guideline: "Establishes dependent status of spouse and minor children for statutory dues.",
  },
  {
    assetOrPurpose: "Electricity & Water Meter Transfer",
    requirement: "Direct name change",
    keyAuthority: "BSES, Tata Power, Delhi Jal Board",
    guideline: "Enables legal transfer of consumer connections without no-objection disputes.",
  },
];

export default function SurvivorMemberCertificatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SMC_SCHEMA) }}
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
              Survivor Member Certificate
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
            1. HERO SECTION (Single Strict H1 < 70 Characters)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>Revenue Department &amp; SDM Fast-Track Certification · All Indian States</span>
              </div>

              {/* Single Strict H1: 56 characters (Strictly 30-65 chars for Screaming Frog) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Surviving Member Certificate Online Application in India
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                A <strong className="text-[#111827]">Surviving Member Certificate (SMC)</strong> is an official revenue document. The local SDM or Tehsildar issues this form. It lists all legal heirs of a deceased person. Families need it for bank claims. It is also needed for property mutation. Our team helps you prepare your papers. We file your application for quick approval.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Apply for SMC Online</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Compare with Legal Heir</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>SDM Office Filing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>DDA Mutation Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Bank Claim Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>NRI Heir Support</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box: Strict H2 <= 70 chars, No Em-dashes */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Why Families Need SMC
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why Surviving Member Certificate Is Vital for Heirs
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Unblocks municipal mutation:</strong> Civic bodies like DDA and MCD need this paper. They will not transfer property without it.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Releases deceased bank funds:</strong> Banks ask for an SMC to settle accounts. You can claim savings and fixed deposits fast without court trials.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Needed for Relinquishment Deeds:</strong> Sub-Registrars mandate an SMC first. It proves all co-heirs before any share transfer.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Learn About Relinquishment Deeds for Co-Heirs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE COMPONENT: STATE PROTOCOLS & 30-SECOND CHECKER
            ========================================================================= */}
        <SurvivorMemberInteractive />

        {/* =========================================================================
            3. COMPARISON SECTION (H2 <= 70 chars, No Em-dashes)
            ========================================================================= */}
        <section id="comparison" className="w-full mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Comparative Legal Analysis</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Surviving Member vs Legal Heir vs Succession Certificate
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Families often confuse these three legal papers. An SMC is an executive order from an SDM. A Legal Heir paper comes from a Tehsildar. A Succession Certificate comes only from a civil court. You need court papers for high-value stocks and debts. Check the simple table below to compare your choices:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[20%]">Feature</th>
                    <th className="py-4 px-6 w-[27%] text-[#C65378]">Surviving Member Certificate (SMC)</th>
                    <th className="py-4 px-6 w-[26%]">Legal Heir Certificate</th>
                    <th className="py-4 px-6 w-[27%]">Court Succession Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors align-top">
                      <td className="py-4 px-6 font-semibold text-[#111827]">{row.parameter}</td>
                      <td className="py-4 px-6 font-medium text-[#111827] bg-[#C65378]/5">{row.smc}</td>
                      <td className="py-4 px-6 text-[#49585F]">{row.legalHeir}</td>
                      <td className="py-4 px-6 text-[#49585F]">{row.successionCert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. PURPOSE MATRIX & BANK LIMITS TABLE (H2 <= 70 chars, No Em-dashes)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Statutory Usage Matrix</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Purpose Matrix: When You Need a Surviving Member Paper
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Government offices and banks need clear proof of heirs. The table below lists standard uses for an SMC across India:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[26%]">Legal Purpose</th>
                    <th className="py-4 px-6 w-[20%]">Requirement Level</th>
                    <th className="py-4 px-6 w-[24%]">Receiving Department</th>
                    <th className="py-4 px-6 w-[30%]">Statutory Rule &amp; Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {PURPOSE_MATRIX_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors align-top">
                      <td className="py-4 px-6 font-semibold text-[#111827]">{row.assetOrPurpose}</td>
                      <td className="py-4 px-6 text-[#047857] font-medium">{row.requirement}</td>
                      <td className="py-4 px-6 text-[#49585F]">{row.keyAuthority}</td>
                      <td className="py-4 px-6 text-[#49585F]">{row.guideline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. 4-STEP APPLICATION ROADMAP (H2 <= 70 chars, No Em-dashes)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Step-by-Step Procedure</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Application Protocol for Quick SMC Issuance
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Applying for an SMC is simple when your papers are ready. Our team guides you through four clear steps. We help you avoid delays:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Document Verification",
                desc: "We check the official death certificate. We also check identity cards of all living heirs.",
              },
              {
                step: "02",
                title: "Affidavit Drafting",
                desc: "Our team drafts the family tree affidavit on stamp paper. It includes full details of all heirs.",
              },
              {
                step: "03",
                title: "Portal Submission",
                desc: "We file your case on the state revenue portal. We track application progress with local officers.",
              },
              {
                step: "04",
                title: "Field Inquiry & Issuance",
                desc: "The local revenue inspector checks the family details. Then the SDM issues the digital certificate.",
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
            6. SPECIAL NRI BLOCK: APOSTILLED AFFIDAVITS & POWERS OF ATTORNEY (H2 <= 70 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>NRI &amp; Overseas Family Support</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                NRI Heirs: How to Execute SMC Affidavits from Abroad
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-4">
                Overseas family members do not need to travel to India. NRI siblings can sign papers from their home abroad.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151]">
                An NRI heir can sign an affidavit or NOC abroad. You get it apostilled or verified at the Indian Embassy. Our legal team submits the file to the SDM office for you.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Consult an NRI Succession Advocate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/nri-will-india"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>View NRI Will Services</span>
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
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions on Surviving Member Papers
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear legal answers help you resolve family estate matters. Read our simple guide below to know your rights:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SMC_FAQS.map((item, idx) => (
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
                Explore related legal services for property transfer and estate planning:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Relinquishment Deed Services</span>
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
              Authored by WillDrafting Editorial Team · Reviewed by AMA Legal Solutions
            </div>
            <p className="text-xs sm:text-[13px] text-[#55636D] leading-relaxed max-w-3xl">
              This guide is prepared under the Hindu Succession Act, 1956, the Indian Succession Act, 1925, and state revenue guidelines. It is intended for educational purposes and does not constitute formal legal representation until an advocate engagement is signed.
            </p>
          </div>
          <Link
            href="/about-us"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] shrink-0"
          >
            <span>Meet Our Legal Solutions Advocates</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <CTA />
      <Footer />
    </div>
  );
}
