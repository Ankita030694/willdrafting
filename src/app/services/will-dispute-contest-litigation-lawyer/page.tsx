import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Scale,
  FileWarning,
  Gavel,
  BookOpen,
  Users,
  Award,
  AlertTriangle,
  HelpCircle,
  FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import WillDisputeInteractive from "@/components/WillDisputeInteractive";
import CopyableCaveatBox from "@/components/CopyableCaveatBox";

export const metadata: Metadata = {
  title: {
    absolute: "Will Dispute Lawyer India: Contest & Probate Advocates",
  },
  description:
    "Consult an expert will dispute lawyer in India. AMA Legal Solutions challenges forged Wills, files probate caveats, and defends genuine Wills.",
  authors: [{ name: "Advocate Anuj Anand Malik", url: "https://www.linkedin.com/in/iamanujmalik/" }],
  keywords: [
    "will dispute lawyer india",
    "lawyer to challenge forged will in india",
    "probate litigation advocate mumbai delhi bangalore",
    "partition suit lawyer india",
    "how to contest a will in india",
    "grounds to challenge a will in indian court",
    "file caveat against probate section 284",
    "revoke probate section 263 indian succession act",
    "undue influence in will execution section 61",
    "prove will in court section 67 bharatiya sakshya adhiniyam",
    "suspicious circumstances will supreme court venkatachala iyengar",
    "can registered will be challenged in india",
    "forged will forensic handwriting expert cfsl",
    "probate suit converted to contentious suit section 295",
    "high court probate litigation advocate india",
    "dispute between legal heirs over will",
    "stay on property sale under disputed will order 39 cpc",
    "cancel forged will specific relief act section 31",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/will-dispute-contest-litigation-lawyer",
  },
  openGraph: {
    title: "Will Dispute Lawyer India: Contest & Probate Advocates",
    description:
      "Consult an expert will dispute lawyer in India. AMA Legal Solutions challenges forged Wills, files probate caveats, and defends genuine Wills.",
    url: "https://www.willdrafting.in/services/will-dispute-contest-litigation-lawyer",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/will-dispute-contest-litigation-lawyer-og.jpg",
        width: 1200,
        height: 675,
        alt: "Will Dispute and Probate Litigation Lawyers in India - AMA Legal Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Dispute Lawyer India: Contest & Probate Advocates",
    description:
      "Consult an expert will dispute lawyer in India. AMA Legal Solutions challenges forged Wills, files probate caveats, and defends genuine Wills.",
    images: ["/images/will-dispute-contest-litigation-lawyer-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const DISPUTE_FAQS = [
  {
    q: "What are the legal grounds to challenge a Will in India?",
    a: "Under Indian law, you can challenge a Will on clear legal grounds. These include fake signatures, fraud, and coercion under Section 61. You can also dispute a Will if the person lacked mental capacity due to illness. Another key ground is defective witness signing under Section 63. Two adult witnesses must sign in front of the person making the Will.",
  },
  {
    q: "Can a registered Will be challenged in an Indian court?",
    a: "Yes. Registration at the Sub-Registrar office does not stop a court challenge. In the Rani Purnima Debi case, the Supreme Court ruled that registration alone does not prove a Will is genuine. Courts will still examine fraud, pressure, or suspicious facts.",
  },
  {
    q: "How does a Caveat under Section 284 stop ex-parte probate?",
    a: "A Caveat is a formal legal notice filed in court under Section 284. It stops the court from issuing probate without telling you first. Once you lodge a Caveat, the case turns into a regular civil suit under Section 295. This gives you full rights to cross-examine witnesses and contest the Will.",
  },
  {
    q: "How do courts prove whether a Will is genuine or forged?",
    a: "Under Section 67 of the Sakshya Act, at least one attesting witness must speak in court. If signatures look fake, the court orders forensic testing by government handwriting experts from CFSL.",
  },
  {
    q: "What constitutes suspicious circumstances in Indian Will litigation?",
    a: "The Supreme Court explained this in the Venkatachala case and the Shivakumar ruling. Red flags include cutting out close children without reason, big benefits to the person who drafted the Will, shaky signatures, and signing right before death in a hospital.",
  },
  {
    q: "What is the time limit to file a suit challenging a forged Will?",
    a: "Under Article 59 of the Limitation Act, 1963, you must file a civil suit within 3 years from when you discover the fraud. However, you should file a Caveat against probate immediately after the person passes away.",
  },
  {
    q: "Can legal heirs file a partition suit if someone claims a Will exists?",
    a: "Yes. Legal heirs can file a civil partition suit to claim their rightful property shares. If another relative produces an unregistered or fake Will, the civil court must check its truth or wait for the probate court to decide.",
  },
  {
    q: "How does AMA Legal Solutions represent clients across India?",
    a: "AMA Legal Solutions provides full courtroom advocacy across District Courts and High Courts. Our advocates file urgent caveats, obtain stay orders against property sales, cross-examine witnesses, and defend genuine Wills in court.",
  },
];

const DISPUTE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/services/will-dispute-contest-litigation-lawyer#webpage",
      "url": "https://www.willdrafting.in/services/will-dispute-contest-litigation-lawyer",
      "name": "Will Dispute Lawyer India: Contest & Probate Advocates",
      "description":
        "Consult an expert will dispute lawyer in India. AMA Legal Solutions challenges forged Wills, files probate caveats, and defends genuine Wills in court.",
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
        "url": "https://www.willdrafting.in/images/will-dispute-contest-litigation-lawyer-og.jpg",
        "width": 1200,
        "height": 675,
        "caption": "Will Dispute and Probate Litigation Lawyers in India - AMA Legal Solutions",
      },
      "breadcrumb": {
        "@id": "https://www.willdrafting.in/services/will-dispute-contest-litigation-lawyer#breadcrumb",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.willdrafting.in/services/will-dispute-contest-litigation-lawyer#service",
      "name": "Will Dispute, Probate Contest & Estate Litigation Advocacy",
      "serviceType": "Testamentary Dispute Litigation & Court Advocacy",
      "provider": {
        "@id": "https://www.willdrafting.in/#legalservice",
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "AdministrativeArea", "name": "Delhi NCR" },
        { "@type": "AdministrativeArea", "name": "Maharashtra" },
        { "@type": "AdministrativeArea", "name": "Karnataka" },
        { "@type": "AdministrativeArea", "name": "West Bengal" },
        { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
        { "@type": "AdministrativeArea", "name": "Punjab & Haryana" },
        { "@type": "AdministrativeArea", "name": "Uttar Pradesh" },
        { "@type": "AdministrativeArea", "name": "Gujarat" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Will Dispute Litigation Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "price": "14990",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Statutory Probate Caveat Lodging & Legal Notice",
              "description":
                "Emergency drafting and filing of Caveat under Section 284 ISA in District Court or High Court to prevent ex-parte probate.",
            },
          },
          {
            "@type": "Offer",
            "price": "25000",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Will Dispute Defense & Written Statement Filing",
              "description":
                "Formal written objections, converting probate petition to contentious suit (Section 295 ISA), and interim stay applications under Order 39 CPC.",
            },
          },
          {
            "@type": "Offer",
            "price": "49000",
            "priceCurrency": "INR",
            "itemOffered": {
              "@type": "Service",
              "name": "Full-Scale High Court Testamentary Suit Representation",
              "description":
                "Senior advocate trial advocacy, forensic document cross-examination under Section 67 BSA, and partition suit defense.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/services/will-dispute-contest-litigation-lawyer#faq",
      "mainEntity": DISPUTE_FAQS.map((item) => ({
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
      "@id": "https://www.willdrafting.in/services/will-dispute-contest-litigation-lawyer#breadcrumb",
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
          "name": "Will Dispute Lawyer India",
          "item": "https://www.willdrafting.in/services/will-dispute-contest-litigation-lawyer",
        },
      ],
    },
  ],
};

const LITIGATION_COMPARISON_TABLE = [
  {
    pathway: "Testamentary Probate Suit (Section 295 ISA)",
    governingStatute: "Indian Succession Act, 1925 (Sections 276, 284, 295)",
    forumJurisdiction: "High Court (Original Side) or Principal District Judge",
    primaryRelief: "Grant or refusal of Probate or Letters of Administration; decides Will validity in rem",
    courtTimeline: "12 to 24 Months (depends on trial and witness cross-examination)",
  },
  {
    pathway: "Civil Suit for Cancellation (Section 31 SRA)",
    governingStatute: "Specific Relief Act, 1963 (Section 31 & Section 34)",
    forumJurisdiction: "Civil Judge Senior Division or District Court",
    primaryRelief: "Declaring forged Will void; ordering surrender and cancellation of the document",
    courtTimeline: "18 to 36 Months (includes forensic handwriting report)",
  },
  {
    pathway: "Civil Partition Suit with Injunction",
    governingStatute: "Code of Civil Procedure, 1908 (Order 39 Rules 1 & 2)",
    forumJurisdiction: "Civil Court having local property jurisdiction",
    primaryRelief: "Division of family property; stay order halting sale to third parties",
    courtTimeline: "24 to 48 Months (leads to preliminary and final decree)",
  },
];

const CAVEAT_NOTICE_TEXT = `IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE / HON'BLE HIGH COURT AT [CITY/STATE]
TESTAMENTARY AND INTESTATE JURISDICTION
CAVEAT PETITION NO. _______ OF 2026

IN THE MATTER OF:
THE ESTATE OF LATE [FULL NAME OF DECEASED], DECEASED
DATE OF DEATH: [DD/MM/YYYY], RESIDENCE: [PERMANENT ADDRESS]

AND IN THE MATTER OF:
[NAME OF CAVEATOR / AGGRIEVED LEGAL HEIR]
S/o or D/o Late [Deceased's Name], Aged ___ Years,
Residing at: [Address of Caveator]                          ... CAVEATOR

CAVEAT UNDER SECTION 284 OF THE INDIAN SUCCESSION ACT, 1925
READ WITH ORDER XL RULE 3 OF HIGH COURT ORIGINAL SIDE RULES

TO,
THE HON'BLE JUDGES OF THE AFORESAID COURT

THE HUMBLE PETITION OF THE CAVEATOR ABOVE-NAMED MOST RESPECTFULLY SHOWETH:

1. That the Caveator is the lawful Class-I legal heir (Son/Daughter/Spouse) of Late [Name of Deceased], who departed this life on [Date of Death] at [Place of Death].
2. That the Caveator has reasonable apprehension that [Name(s) of Propounder/Suspected Person(s)] may fraudulently apply for Probate or Letters of Administration based upon a forged, fabricated, or coerced Will allegedly dated [Date of Disputed Will].
3. That the Caveator vehemently disputes the execution, attestation, and genuineness of any such alleged testamentary paper, as the deceased suffered from acute medical infirmity and never executed such document with free testamentary volition.

PRAYER:
It is therefore respectfully prayed that this Hon'ble Court may be pleased to direct that NO GRANT of Probate or Letters of Administration of the Estate or Will of the said deceased Late [Name of Deceased] be made without prior formal notice and citation being served upon the Caveator herein or their appointed Advocates.

DATED THIS ______ DAY OF _______________, 2026.
ADVOCATE FOR THE CAVEATOR: AMA LEGAL SOLUTIONS`;

export default function WillDisputeLitigationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DISPUTE_SCHEMA) }}
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
              Will Dispute Lawyer India
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
            1. HERO SECTION (Single Strict H1: 52 Characters)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>High Court Probate &amp; Will Contest Litigation Practice</span>
              </div>

              {/* Single H1: Exactly 52 characters (Strictly 30-65 chars for Screaming Frog) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Will Dispute and Probate Litigation Lawyers in India
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Has a relative produced a suspicious or fake Will? Or is your genuine Will blocked by an unfair caveat? Under Sections 61, 63, 263, and 284 of the Indian Succession Act, 1925, AMA Legal Solutions provides expert High Court trial advocates. We help you cancel fraudulent Wills, lodge urgent caveats, and protect your true family inheritance.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Case Evaluation with Advocate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#dual-track-hub"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Explore Dual-Track Hub</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Section 284 Caveats</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>CFSL Forensic Defense</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Stay on Property Sale</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>High Court Representation</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Urgent Litigation Protection
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why Speed Is Decisive in Disputed Indian Wills
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ex-Parte Probate Risk:</strong> If a relative files a probate petition without your knowledge, a brief notice in a small newspaper can lead to an ex-parte grant in 60 days.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Third-Party Property Sale:</strong> Relatives often change land records quickly and sell family flats to builders before other heirs discover the fake Will.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Caveats Expire in 90 Days:</strong> Filing a timely Caveat under Section 284 immediately stops the court registrar from issuing an uncontested grant.
                  </span>
                </li>
              </ul>
              <Link
                href="/tools/will-contest-challenge-risk-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Launch Will Contest Risk Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FEATURED VISUAL BANNER SECTION (OpenGraph Image Embedded On-Page)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src="/images/will-dispute-contest-litigation-lawyer-og.jpg"
                alt="Will Dispute and Probate Litigation Advocate Court Representation in India - AMA Legal"
                width={1200} height={675}
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Courtroom advocacy by AMA Legal Solutions covering forged Will challenges, probate caveats, and testamentary trial defense across Indian High Courts and District Courts.
              </span>
              <span className="text-[#111827] font-semibold">
                High Court Practice · Delhi · Mumbai · Bengaluru · Kolkata · Chandigarh
              </span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            2. DUAL-TRACK INTERACTIVE HUB COMPONENT
            ========================================================================= */}
        <WillDisputeInteractive />

        {/* =========================================================================
            3. GROUNDS TO CONTEST A WILL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileWarning className="w-4 h-4" />
              <span>Statutory Grounds for Challenge</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Grounds to Contest a Suspicious or Forged Will in India
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              In India, courts treat Wills as solemn documents. To challenge a Will successfully, an aggrieved legal heir must prove clear legal grounds under the law:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2 block">
                  Ground 01 · Section 61 ISA
                </span>
                <h3 className="text-lg font-bold text-[#111827] mb-2.5">
                  Fraud, Coercion &amp; Pressure
                </h3>
                <p className="text-[14px] leading-[1.65] text-[#49585F]">
                  Under Section 61, a Will obtained by fraud or pressure is void. This happens when a person is threatened or cut off from family until they sign.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2 block">
                  Ground 02 · Section 59 ISA
                </span>
                <h3 className="text-lg font-bold text-[#111827] mb-2.5">
                  Lack of Mental Capacity
                </h3>
                <p className="text-[14px] leading-[1.65] text-[#49585F]">
                  Under Section 59, the person making the Will must have a sound mind. Severe dementia, coma, or mental illness makes a Will invalid without a medical certificate.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2 block">
                  Ground 03 · Section 63 ISA
                </span>
                <h3 className="text-lg font-bold text-[#111827] mb-2.5">
                  Defective Witness Attestation
                </h3>
                <p className="text-[14px] leading-[1.65] text-[#49585F]">
                  Section 63 requires two adult witnesses. Both witnesses must see the testator sign and must sign in front of the testator.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2 block">
                  Ground 04 · Section 67 BSA
                </span>
                <h3 className="text-lg font-bold text-[#111827] mb-2.5">
                  Fake Signatures &amp; Forgery
                </h3>
                <p className="text-[14px] leading-[1.65] text-[#49585F]">
                  When signatures or thumbprints do not match bank records or official documents, advocates seek forensic handwriting analysis from CFSL.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2 block">
                  Ground 05 · Supreme Court Precedent
                </span>
                <h3 className="text-lg font-bold text-[#111827] mb-2.5">
                  Suspicious Circumstances Rule
                </h3>
                <p className="text-[14px] leading-[1.65] text-[#49585F]">
                  Under the Venkatachala ruling, courts question Wills where one beneficiary gets everything and close children are cut out without reasons.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2 block">
                  Ground 06 · Section 62 ISA
                </span>
                <h3 className="text-lg font-bold text-[#111827] mb-2.5">
                  Revocation by a Later Will
                </h3>
                <p className="text-[14px] leading-[1.65] text-[#49585F]">
                  A later valid Will automatically cancels older Wills. Showing the newest original Will ends disputes over older drafts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. STATUTORY FRAMEWORK & EVIDENCE ACT
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Statutory Evidence Architecture</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Statutory Framework: Indian Succession Act &amp; Sakshya Act
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Will litigation in India operates at the intersection of succession statutes, evidence law, and specific civil remedies:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#172228]/10">
              <h3 className="font-bold text-base text-[#111827] mb-2 flex items-center gap-2">
                <Gavel className="w-4 h-4 text-[#C65378]" />
                Section 67 Bharatiya Sakshya Adhiniyam, 2023
              </h3>
              <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-3">
                Formerly Section 68 of the Evidence Act. A Will cannot be admitted as evidence unless at least one attesting witness is called to prove execution in court.
              </p>
              <div className="text-xs text-[#047857] font-semibold">
                Advocate Strategy: Cross-examining attesting witnesses to reveal false claims and fake signings.
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#172228]/10">
              <h3 className="font-bold text-base text-[#111827] mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#C65378]" />
                Section 263 Indian Succession Act: Revocation
              </h3>
              <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-3">
                Empowers High Courts and District Judges to cancel a grant of probate for just cause, including where a grant was obtained by concealing true facts.
              </p>
              <div className="text-xs text-[#047857] font-semibold">
                Advocate Strategy: Reopening ex-parte probate orders passed without serving notice on legal heirs.
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#172228]/10">
              <h3 className="font-bold text-base text-[#111827] mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#C65378]" />
                Section 31 &amp; Section 34 Specific Relief Act, 1963
              </h3>
              <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-3">
                Enables any person against whom a written document is void or voidable to file a suit to declare it null and have the fake Will cancelled.
              </p>
              <div className="text-xs text-[#047857] font-semibold">
                Advocate Strategy: Getting a court decree declaring the forged Will void from the start.
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#172228]/10">
              <h3 className="font-bold text-base text-[#111827] mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C65378]" />
                Section 295 Indian Succession Act: Contentious Suits
              </h3>
              <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-3">
                Directs that once a Caveat is filed, the simple probate petition becomes a regular contested civil suit under the Code of Civil Procedure.
              </p>
              <div className="text-xs text-[#047857] font-semibold">
                Advocate Strategy: Conducting full civil trials with witness examinations and written evidence.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. STRUCTURED HTML COMPARISON TABLE
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Court Jurisdiction Analysis</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Litigation Comparison: Probate Suit vs Civil Partition
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Choosing the right court is essential. Filing in the wrong forum can lead to rejection of your case. Review how testamentary and civil remedies compare:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Litigation Pathway</th>
                    <th className="py-4 px-6 w-[24%]">Governing Statute &amp; Sections</th>
                    <th className="py-4 px-6 w-[20%]">Forum &amp; Jurisdiction</th>
                    <th className="py-4 px-6 w-[20%]">Primary Relief Granted</th>
                    <th className="py-4 px-6 w-[14%]">Typical Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {LITIGATION_COMPARISON_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors align-top">
                      <td className="py-5 px-6 font-semibold text-[#111827]">{row.pathway}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.governingStatute}</td>
                      <td className="py-5 px-6 font-medium text-[#111827]">{row.forumJurisdiction}</td>
                      <td className="py-5 px-6 text-[#49585F] text-[13.5px]">{row.primaryRelief}</td>
                      <td className="py-5 px-6 text-[#047857] font-semibold">{row.courtTimeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. COPYABLE CAVEAT BOX / LEGAL CLAUSE / TEMPLATE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileText className="w-4 h-4" />
              <span>Copy-Pasteable Statutory Template</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Copy-Pasteable Probate Caveat Notice Clause Format
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              If you expect a relative to file a fraudulent probate petition, your advocate must lodge a Caveat under Section 284 ISA immediately. Use our court-verified drafting format:
            </p>
          </div>

          <CopyableCaveatBox
            title="Court Draft: Caveat Petition Under Section 284 Indian Succession Act, 1925"
            code={CAVEAT_NOTICE_TEXT}
            explanation="This Caveat Petition must be printed on green legal ledger paper, accompanied by an affidavit of verification, court fee stamps as per local state Court Fees Act, and a Vakalatnama signed by your High Court advocate. Caveats remain valid for 90 days from filing."
          />

          {/* Contextual Link to Interactive Tools */}
          <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-white border border-[#172228]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378] mb-1">
                Explore Interactive Legal Tool
              </div>
              <p className="text-sm text-[#49585F]">
                Need to assess court fees and calculate timeline risks before lodging your caveat?
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/will-contest-challenge-risk-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Will Contest Risk Calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/templates/caveat-against-probate-format-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-5 py-3 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Complete Caveat Template</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. STEP-BY-STEP SOP LITIGATION PROTOCOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Courtroom Standard Operating Procedure</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Step-by-Step SOP: From Caveat to High Court Judgment
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              How AMA Legal Solutions manages contested testamentary litigation before District and High Courts:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Evidence Audit & CFSL",
                desc: "We analyze the disputed Will, check bank records for past signatures, and prepare forensic comparisons under Section 39 BSA.",
              },
              {
                step: "02",
                title: "Section 284 Caveat",
                desc: "We file urgent Caveats in the District Court and High Court to stop the other party from getting probate behind your back.",
              },
              {
                step: "03",
                title: "Order 39 CPC Injunction",
                desc: "We file a civil suit under Specific Relief Act Section 31 to get a stay order that freezes family flats and land sales.",
              },
              {
                step: "04",
                title: "Witness Cross-Examination",
                desc: "Our advocates question the witnesses in court under Section 67 BSA to uncover fake claims and establish the truth.",
              },
              {
                step: "05",
                title: "Final Decree & Mutation",
                desc: "After winning the court judgment, our team updates land registry and municipal records for the rightful legal heirs.",
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
                  <h3 className="text-lg font-semibold text-[#111827] mb-2.5">{item.title}</h3>
                  <p className="text-[13.5px] leading-[1.65] text-[#49585F]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            8. LANDMARK SUPREME COURT PRECEDENTS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Award className="w-4 h-4" />
              <span>Binding Judicial Precedents</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Landmark Supreme Court Precedents on Disputed Wills
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Every Will dispute in India is adjudicated against landmark doctrines formulated by the Supreme Court of India:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="text-xs font-bold text-[#C65378] uppercase mb-1">
                Foundational Precedent · 1959 SCR Supl. (1) 426
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">
                H. Venkatachala Iyengar v. B.N. Thimmajamma
              </h3>
              <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-3">
                The Constitution Bench ruled that the person presenting the Will must prove it was signed freely. If suspicious circumstances exist, they must clear every doubt.
              </p>
              <div className="text-xs font-semibold text-[#111827]">
                Key Rule: The propounder cannot rely solely on formal witness signatures if circumstances arouse suspicion.
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="text-xs font-bold text-[#C65378] uppercase mb-1">
                Registration Rule · AIR 1962 SC 567
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">
                Rani Purnima Debi v. Kumar Khagendra Narayan Deb
              </h3>
              <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-3">
                The Supreme Court held that registering a Will does not make it automatically genuine. When execution looks suspicious, registration alone will not save the Will.
              </p>
              <div className="text-xs font-semibold text-[#111827]">
                Key Rule: Sub-Registrar registration does not cure inherent forgery, lack of capacity, or coercion.
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="text-xs font-bold text-[#C65378] uppercase mb-1">
                Beneficiary Participation · (2021) 11 SCC 209
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">
                Kavita Kanwar v. Pamela Mehta
              </h3>
              <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-3">
                A three-judge bench held that when a key beneficiary takes an active role in writing and signing a Will, deep suspicion arises. The court denied probate.
              </p>
              <div className="text-xs font-semibold text-[#111827]">
                Key Rule: Active participation by the sole heir creates a heavy burden to dispel undue influence.
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#172228]/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="text-xs font-bold text-[#C65378] uppercase mb-1">
                Comprehensive Bench Review · (2021) 11 SCC 277
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">
                Shivakumar v. Sharanabasappa
              </h3>
              <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-3">
                The Supreme Court established that courts must act with judicial conscience. When medical records and witness testimony prove real intent, unfair caveats must be dismissed.
              </p>
              <div className="text-xs font-semibold text-[#111827]">
                Key Rule: Clear medical and attesting evidence provides unassailable protection for genuine Wills.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. STATUTORY FAQS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>Testamentary Litigation FAQs</span>
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Will Disputes &amp; Litigation
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Clear answers prepared by senior High Court succession advocates at AMA Legal Solutions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DISPUTE_FAQS.map((item, idx) => (
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
                Related Succession Litigation Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore related estate settlement, probate court representation, and property mutation services:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/probate-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Probate Lawyer Services in India</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/letters-of-administration-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Letters of Administration Representation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/property-mutation-dakhil-kharij-service"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Property Mutation &amp; Dakhil Kharij</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. DEDICATED BLOCK: HIGH COURT ADVOCATE REPRESENTATION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#172228] text-white rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Pan-India Court Presence</span>
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-white mb-4">
                High Court Advocate Representation Across India
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-gray-300 mb-4">
                Unlike automated Will platforms that lack courtroom standing, AMA Legal Solutions is an established full-service law firm. Our senior advocates maintain active regular practice before the Supreme Court of India, Delhi High Court, Bombay High Court, Calcutta High Court, Karnataka High Court, Madras High Court, and Principal District Courts.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-gray-300">
                Whether you need to challenge a fabricated Will or defend your legitimate inheritance against mischievous caveats, our team delivers decisive trial advocacy, forensic document proof, and emergency civil court stays.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Schedule Advocate Case Review</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center border border-white/15"
              >
                <span>Draft a Dispute-Proof Will Online</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11. AUTHOR & E-E-A-T EDITORIAL CARD
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
              This guide is prepared in accordance with the Indian Succession Act, 1925, the Bharatiya Sakshya Adhiniyam, 2023, the Specific Relief Act, 1963, and the Code of Civil Procedure, 1908. It is intended for informational and litigation planning purposes and does not substitute formal legal engagement.
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
