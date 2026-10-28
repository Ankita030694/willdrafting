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
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import FamilyTrustInteractive from "@/components/FamilyTrustInteractive";
import CopyableTrustClauseBox from "@/components/CopyableTrustClauseBox";

export const metadata: Metadata = {
  title: {
    absolute: "Private Family Trust Registration India | WillDrafting",
  },
  description:
    "Expert advocate assistance for private family trust registration india under Indian Trusts Act, 1882. High Court lawyer drafting, SRO registration & tax.",
  authors: [
    {
      name: "Advocate Anuj Anand Malik",
      url: "https://www.linkedin.com/in/iamanujmalik/",
    },
  ],
  keywords: [
    "private family trust registration india",
    "family trust formation lawyer india",
    "special needs child trust lawyer india",
    "hni estate planning trust india",
    "indian trusts act 1882 advocate",
    "revocable vs irrevocable trust india",
    "discretionary trust taxation section 164",
    "private trust sub registrar registration fee",
    "asset protection trust india founder",
    "family trust deed format india",
    "trustee succession clause private trust",
    "ama legal solutions private family trust",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/private-family-trust-formation",
  },
  openGraph: {
    title: "Private Family Trust Registration India | WillDrafting",
    description:
      "Expert advocate assistance for private family trust registration india under Indian Trusts Act, 1882. High Court lawyer drafting, SRO registration & tax.",
    url: "https://www.willdrafting.in/services/private-family-trust-formation",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/private-family-trust-formation-og.jpg",
        width: 1200,
        height: 675,
        alt: "Private Family Trust Registration India High Court Advocate Drafting and SRO Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Family Trust Registration India | WillDrafting",
    description:
      "Expert advocate assistance for private family trust registration india under Indian Trusts Act, 1882. High Court lawyer drafting, SRO registration & tax.",
    images: ["/images/private-family-trust-formation-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const TRUST_FAQS = [
  {
    q: "What is a Private Family Trust under the Indian Trusts Act, 1882?",
    a: "A Private Family Trust is a legal arrangement under the Indian Trusts Act, 1882. The creator (Settlor) transfers property to trusted managers (Trustees). The trustees manage these assets for chosen family members (Beneficiaries). Everything is recorded in a signed Trust Deed.",
  },
  {
    q: "Is registration of a Private Family Trust compulsory at the Sub-Registrar office?",
    a: "Yes, if the trust holds immovable property like a house or land. Section 5 of the Indian Trusts Act and Section 17 of the Registration Act make registration compulsory. For movable assets like shares or cash, registration is optional but wise.",
  },
  {
    q: "How does taxation work for Revocable versus Irrevocable Trusts in India?",
    a: "In a revocable trust, the Settlor keeps the right to take back the assets. The tax office clubs trust income with the Settlor under Sections 60 to 63. In an irrevocable trust, the transfer is permanent. It is taxed separately as its own entity.",
  },
  {
    q: "Can an Irrevocable Trust protect family assets against future business creditors?",
    a: "Yes. When you transfer assets to an irrevocable trust before debts arise, you give up personal ownership. Under the Insolvency and Bankruptcy Code (IBC), 2016, creditors cannot attach trust property for your future personal liabilities.",
  },
  {
    q: "How does a Special Needs Trust protect a dependent child with disabilities?",
    a: "A Special Needs Trust protects a child who cannot manage money alone. Trustees release funds for medical care and living costs. Under Section 164(1) of the Income Tax Act, this trust pays normal individual tax slab rates, avoiding high tax rates.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) be beneficiaries of an Indian Private Trust?",
    a: "Yes. Non-Resident Indians can receive trust benefits. All payouts follow RBI and FEMA rules. NRI beneficiaries can transfer up to USD 1 Million abroad every financial year from their NRO accounts using Form 15CA and Form 15CB.",
  },
  {
    q: "Why do HNIs choose a Private Trust instead of relying solely on a Will?",
    a: "A Will takes effect only after death and often faces 12 to 24 months of court probate in major cities. A Private Trust works during your lifetime. It gives immediate income to family members and keeps financial records private.",
  },
  {
    q: "How much does private family trust formation cost compared to Big-4 firms?",
    a: "Big-4 firms charge ₹5 Lakhs to ₹15 Lakhs and hide pricing details. WillDrafting and AMA Legal Solutions offer transparent flat fees starting from ₹49,990. Our High Court advocates handle deed drafting and local registration directly.",
  },
];

const TRUST_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/services/private-family-trust-formation#webpage",
      url: "https://www.willdrafting.in/services/private-family-trust-formation",
      name: "Private Family Trust Registration India | WillDrafting",
      description:
        "Expert advocate assistance for private family trust registration india under Indian Trusts Act, 1882. High Court lawyer drafting, SRO registration & tax.",
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
        url: "https://www.willdrafting.in/images/private-family-trust-formation-og.jpg",
        width: 1200,
        height: 675,
        caption:
          "Private Family Trust Registration India High Court Advocate Drafting and SRO Counsel",
      },
      breadcrumb: {
        "@id": "https://www.willdrafting.in/services/private-family-trust-formation#breadcrumb",
      },
    },
    {
      "@type": ["Service", "LegalService"],
      "@id": "https://www.willdrafting.in/services/private-family-trust-formation#service",
      name: "Private Family Trust Registration & Formation India",
      serviceType: "Private Family Trust Drafting, SRO Registration & HNI Succession Structuring",
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
        name: "Private Family Trust Formation Packages",
        itemListElement: [
          {
            "@type": "Offer",
            price: "49990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Essential Private Family Trust Deed Drafting",
              description:
                "Custom Trust Deed drafting under Indian Trusts Act, 1882 with governance clauses and tax optimization.",
            },
          },
          {
            "@type": "Offer",
            price: "74990",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Special Needs Child Family Trust Advisory Package",
              description:
                "Dedicated protective trust structuring under National Trust Act, 1999 and Section 164(1) Income Tax slab exemption.",
            },
          },
          {
            "@type": "Offer",
            price: "125000",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Comprehensive HNI Trust Formation & SRO Registration",
              description:
                "End-to-end High Court advocate drafting, Sub-Registrar physical registration, Trust PAN, and banking coordination.",
            },
          },
        ],
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://www.willdrafting.in/services/private-family-trust-formation#howto",
      name: "How to Form and Register a Private Family Trust in India",
      description:
        "Four-step statutory process to structure, draft, register, and fund a Private Family Trust under the Indian Trusts Act, 1882.",
      totalTime: "P14D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Define Trust Goals, Settlor, Trustees and Beneficiaries",
          text: "Select whether the trust will be revocable or irrevocable, and choose whether payouts will be determinate or discretionary.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "High Court Advocate Drafting of the Trust Deed",
          text: "Counsel drafts the formal deed with non-attachment clauses, trustee succession rules, and tax compliance provisions.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Pay Stamp Duty and Register at Sub-Registrar Office",
          text: "Execute the deed on state stamp paper and register it with the Sub-Registrar under Section 17 of the Registration Act, 1908.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Apply for Trust PAN, Open Bank Account & Settle Assets",
          text: "Obtain a permanent PAN card for the trust, open a dedicated trust bank account, and transfer the initial settlement corpus.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/services/private-family-trust-formation#faq",
      mainEntity: TRUST_FAQS.map((item) => ({
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
      "@id": "https://www.willdrafting.in/services/private-family-trust-formation#breadcrumb",
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
          name: "Private Family Trust Formation",
          item: "https://www.willdrafting.in/services/private-family-trust-formation",
        },
      ],
    },
  ],
};

const TRUST_COMPARISON_TABLE = [
  {
    type: "Revocable Determinate Trust",
    ownership: "Settlor retains legal power to cancel or amend deed.",
    taxation: "Income clubbed with Settlor under Sections 60 to 63.",
    creditorProtection: "Zero protection. Creditors can attach trust assets.",
    registration: "Optional for movable assets; mandatory if land is settled.",
    idealFor: "Families wanting flexible lifetime wealth management.",
  },
  {
    type: "Irrevocable Determinate Trust",
    ownership: "Permanent asset transfer. Fixed beneficiary share percentages.",
    taxation: "Taxed at individual beneficiary slab rates (Section 161).",
    creditorProtection: "Strong protection once transferred before debts arise.",
    registration: "Compulsory registration under Section 17 Registration Act.",
    idealFor: "Predictable wealth distribution without high tax rates.",
  },
  {
    type: "Irrevocable Discretionary Trust",
    ownership: "Permanent asset transfer. Trustees decide distribution timing.",
    taxation: "Taxed at Maximum Marginal Rate (MMR ~ 39% to 42.74%).",
    creditorProtection: "Maximum ring-fencing against insolvency and lawsuits.",
    registration: "Compulsory registration under Section 17 Registration Act.",
    idealFor: "HNI founders, business promoters, and asset protection.",
  },
  {
    type: "Special Needs Child Trust",
    ownership: "Irrevocable structure dedicated to disabled dependent.",
    taxation: "Exempt from MMR. Taxed at individual slab rate (Sec 164).",
    creditorProtection: "Total protection from outside relatives and creditors.",
    registration: "Compulsory registration; registered with local authorities.",
    idealFor: "Lifelong financial care and housing for special needs heirs.",
  },
];

const BIG4_VS_AMA_TABLE = [
  {
    parameter: "Professional Advisory Fee",
    big4: "₹5,00,000 to ₹15,00,000+ with hourly billing add-ons",
    ama: "Transparent flat fee starting from ₹49,990 with no hidden extras",
  },
  {
    parameter: "High Court Lawyer Representation",
    big4: "Primarily chartered accountants; legal drafting outsourced",
    ama: "Direct drafting and review by senior High Court advocates",
  },
  {
    parameter: "Sub-Registrar (SRO) Physical Support",
    big4: "Clients must manage local registrar office visits independently",
    ama: "End-to-end on-ground advocate coordination at the Sub-Registrar",
  },
  {
    parameter: "Turnaround Time for Deed Finalization",
    big4: "4 to 8 weeks with extensive corporate bureaucracy",
    ama: "7 to 14 business days with dedicated advocate access",
  },
  {
    parameter: "Post-Formation PAN & Banking Support",
    big4: "Requires separate corporate compliance contract",
    ama: "Included assistance for Trust PAN and bank account opening",
  },
];

export default function PrivateFamilyTrustFormationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TRUST_SCHEMA) }}
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
              Private Family Trust Formation
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
            1. HERO SECTION (Strict Single H1: 54 chars)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4">
                <span>HNI Estate Planning · Indian Trusts Act, 1882 · Asset Ring-Fencing</span>
              </div>

              {/* Single H1: 54 characters (Strictly 30 to 65 chars, distinct from Title) */}
              <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-5">
                Private Family Trust Formation &amp; Registration in India
              </h1>

              <p className="text-[1.02rem] sm:text-[1.14rem] leading-[1.68] text-[#49585F] mb-8 max-w-2xl">
                Protect family wealth from business risks, debt, and long court delays. The Indian Trusts Act, 1882 lets you set up a Private Family Trust. Our High Court advocates draft custom trust deeds. This shields family assets across generations with total privacy.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  <span>Book Trust Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-[15px] font-semibold px-6 py-3.5 transition-all"
                >
                  <span>Prefer an Online Will?</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#172228]/10 text-xs font-semibold text-[#172228]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Indian Trusts Act 1882</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Sub-Registrar Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Creditor Ring-Fenced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                  <span>Tax Optimized (160-164)</span>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-3">
                Estate Structuring Advantage
              </div>
              {/* H2 #1: 50 characters */}
              <h2 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                Why HNIs Choose Private Trusts Over Wills in India
              </h2>
              <ul className="space-y-3.5 text-[14px] leading-[1.6] text-[#374151] mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Zero Court Probate Delays:</strong> A Will requires 12 to 24 months for High Court probate in major cities. A Private Trust transfers income and assets immediately without court intervention.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>Ironclad Asset Protection:</strong> Assets placed in an irrevocable trust are protected from business creditors, future bankruptcies, and family partition claims.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-2 shrink-0" />
                  <span>
                    <strong>100% Financial Confidentiality:</strong> Unlike a probated Will which becomes a public court document, a private trust deed remains confidential among trustees and family members.
                  </span>
                </li>
              </ul>
              <Link
                href="/services/family-settlement-deed-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors"
              >
                <span>Compare Family Settlement Deed Options</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE TRUST BLUEPRINT EXPLORER & DIAGNOSTIC TOOL
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <FamilyTrustInteractive />
        </section>

        {/* =========================================================================
            3. EMBEDDED EDITORIAL VISUAL BANNER SECTION (Strict Figure 1)
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <FileCheck className="w-4 h-4" />
              <span>Visual Trust Architecture</span>
            </div>
            {/* H2 #3: 53 characters */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Visual Blueprint: Private Trust Architecture in India
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              A registered Private Family Trust splits asset ownership from control. Trustees hold legal title under the Indian Trusts Act, 1882. Beneficiaries receive steady income and protection.
            </p>
          </div>

          <figure className="w-full rounded-[28px] overflow-hidden bg-white border border-[#172228]/10 p-3 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <Image
              src="/images/private-family-trust-formation-og.jpg"
              alt="Private Family Trust Registration India High Court Advocate Drafting and SRO Counsel"
              width={1200}
              height={675}
              priority
              className="w-full h-auto rounded-2xl shadow-xs"
            />
            <figcaption className="mt-4 px-2 text-xs sm:text-[13px] text-[#55636D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                <strong>Figure 1:</strong> Private Family Trust architecture in India under the Indian Trusts Act, 1882 — ring-fencing family assets, establishing trustee governance, and safeguarding beneficiaries.
              </span>
              <span>Source: WillDrafting Editorial Team &amp; AMA Legal Solutions</span>
            </figcaption>
          </figure>
        </section>

        {/* =========================================================================
            4. STRUCTURED HTML COMPARISON TABLE: TRUST MODELS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Landmark className="w-4 h-4" />
              <span>Comparative Legal Framework</span>
            </div>
            {/* H2 #4: 53 characters */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              Statutory Comparison: Revocable vs Irrevocable Trusts
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Every family has clear wealth goals. Income tax laws set simple rules under Sections 160 to 164. Review this guide to pick the right trust for your family.
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[22%]">Trust Model</th>
                    <th className="py-4 px-6 w-[20%]">Legal Ownership &amp; Control</th>
                    <th className="py-4 px-6 w-[20%]">Taxation (IT Act 1961)</th>
                    <th className="py-4 px-6 w-[18%]">Creditor Ring-Fencing</th>
                    <th className="py-4 px-6 w-[20%]">Ideal Family Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {TRUST_COMPARISON_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.type}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.ownership}</td>
                      <td className="py-5 px-6 text-[#49585F]">{row.taxation}</td>
                      <td className="py-5 px-6 font-medium text-[#047857]">
                        {row.creditorProtection}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.idealFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DEDICATED SPECIAL NEEDS CHILD TRUST SECTION
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24 bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#172228]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Specialized Family Protection</span>
              </div>
              {/* H2 #5: 51 characters */}
              <h2 className="text-[1.75rem] sm:text-[2.3rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-4">
                Special Needs Child Trust: Lifetime Care Protection
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                Parents of special needs children worry about lifetime care. Leaving cash or property directly to a disabled child creates high risks. Relatives or court guardians might mismanage the funds.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#374151] mb-3">
                A Special Needs Trust helps your child. It works under the Indian Trusts Act, 1882. You can name trusted co-trustees. They release funds for health, care, and home costs.
              </p>
              <p className="text-[14px] text-[#047857] font-semibold bg-white/70 p-3.5 rounded-xl border border-[#047857]/20">
                The Income Tax Act offers key tax relief. Under the Proviso to Section 164(1), special needs trusts pay normal individual slab rates. They do not face the high Maximum Marginal Rate.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-sm font-semibold px-6 py-4 transition-colors"
              >
                <span>Structure Special Needs Trust</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/succession-calculator"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Calculate Succession Shares</span>
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
              <span>Step-by-Step Formation SOP</span>
            </div>
            {/* H2 #6: 53 characters */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              4-Step Execution Protocol for Private Trust Formation
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Setting up a trust is simple with expert counsel. Our High Court advocates handle the whole process. Here is our 4-step roadmap from drafting to registration:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Trust Structuring",
                desc: "Identify trust assets, choose between revocable or irrevocable formats, and define beneficiary payout milestones.",
              },
              {
                step: "02",
                title: "Advocate Legal Drafting",
                desc: "High Court counsel drafts the Trust Deed with protective spendthrift clauses, trustee succession lines, and tax safeguards.",
              },
              {
                step: "03",
                title: "SRO Registration",
                desc: "Execute the deed on required state stamp paper and complete registration before the Sub-Registrar under Section 17.",
              },
              {
                step: "04",
                title: "PAN & Asset Settlement",
                desc: "Procure a permanent Trust PAN card, open a dedicated bank account, and transfer the initial settlement corpus seamlessly.",
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
            7. INCOME TAX ACT SECTIONS 160-164 STATUTORY FRAMEWORK
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Coins className="w-4 h-4" />
              <span>Tax Advisory &amp; Compliance</span>
            </div>
            {/* H2 #7: 50 characters */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Income Tax Act Sections 160-164 Taxation Framework
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Trustees act as legal managers under tax law. Income tax rules depend on trust terms. Here is how tax rules apply to each trust model:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h3 className="text-lg font-semibold text-[#111827] mb-2.5">
                Section 161: Determinate Trusts
              </h3>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                Where beneficiaries are identifiable and their percentage shares are expressly declared in the trust deed, income is taxed at each beneficiary individual tax slab rate.
              </p>
              <div className="text-xs font-semibold text-[#047857] bg-[#047857]/10 p-2.5 rounded-lg">
                Advantage: Avoids high corporate rates; ideal for clear family maintenance.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h3 className="text-lg font-semibold text-[#111827] mb-2.5">
                Section 164: Discretionary Trusts
              </h3>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                If shares are not fixed and trustees hold discretion on payout amounts, income is taxed at the Maximum Marginal Rate (MMR), unless created under a Will for family relatives.
              </p>
              <div className="text-xs font-semibold text-[#C65378] bg-[#C65378]/10 p-2.5 rounded-lg">
                Key Note: Provides peak asset protection despite the higher tax rate.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs">
              <h3 className="text-lg font-semibold text-[#111827] mb-2.5">
                Sections 60 to 63: Revocable Trusts
              </h3>
              <p className="text-[14px] leading-[1.65] text-[#49585F] mb-3">
                If the Settlor retains any direct or indirect power to re-transfer trust assets back to themselves, all trust income is clubbed directly into the personal tax return of the Settlor.
              </p>
              <div className="text-xs font-semibold text-[#172228] bg-[#FAF7F0] p-2.5 rounded-lg border border-[#172228]/10">
                Rule: Irrevocable transfer is strictly required for separate tax status.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. COPYABLE TRUST CLAUSE BOX
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
              <FileCheck className="w-4 h-4" />
              <span>Standard Statutory Wording</span>
            </div>
            {/* H2 #8: 50 characters */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Sample Legal Clause: Asset Ring-Fencing Protection
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Here is a key clause from our standard Irrevocable Trust Deed. It stops creditors from taking trust assets during lawsuits or debt defaults:
            </p>
          </div>

          <CopyableTrustClauseBox
            title="Non-Attachment &amp; Asset Protection Clause (Indian Trusts Act, 1882)"
            code={`"CLAUSE 14: NON-ATTACHMENT AND SPENDTHRIFT PROTECTION OF TRUST ASSETS

14.1. The Trust Fund and all accretions, yields, and properties held thereunder shall remain the absolute and exclusive property of the Trust, managed by the Trustees under the Indian Trusts Act, 1882.

14.2. No Beneficiary shall have any alienable, transferable, or mortgagable right or interest in the corpus of the Trust Fund prior to actual distribution by the Trustees in accordance with the terms of this Deed.

14.3. The beneficial interest of any Beneficiary shall not be liable to attachment, sequestration, execution, or charging order at the instance of any creditor, assignee, receiver, or liquidator of such Beneficiary under the Code of Civil Procedure, 1908, the Insolvency and Bankruptcy Code, 2016, or any other statutory enactment for the time being in force.

14.4. In the event any Beneficiary becomes subject to insolvency proceedings, marital dissolution claims, or execution of a decree, the Trustees shall immediately suspend all discretionary distributions to such Beneficiary and apply funds directly for their essential sustenance and healthcare."`}
            explanation="Drafted under Sections 5, 6, and 11 of the Indian Trusts Act, 1882. This clause prevents trust assets from being seized during bankruptcy or personal lawsuits against individual beneficiaries."
          />
        </section>

        {/* =========================================================================
            9. COMPETITOR BLIND SPOT: AMA LEGAL VS BIG-4 FIRMS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <Scale className="w-4 h-4" />
              <span>Transparent Legal Pricing Moat</span>
            </div>
            {/* H2 #9: 53 characters */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
              AMA Legal Solutions Trust Formation vs Big-4 Advisory
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Big-4 accounting firms charge heavy fees for trusts. They often hide their prices behind closed doors. AMA Legal Solutions offers clear flat fees and direct High Court lawyer help:
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#172228]/10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
                    <th className="py-4 px-6 w-[28%]">Comparison Factor</th>
                    <th className="py-4 px-6 w-[36%]">Big-4 Accounting Firms</th>
                    <th className="py-4 px-6 w-[36%] text-[#C65378]">
                      AMA Legal Solutions &amp; WillDrafting
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-[14px] leading-[1.6] text-[#374151]">
                  {BIG4_VS_AMA_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F0]/50 transition-colors align-top"
                    >
                      <td className="py-5 px-6 font-semibold text-[#111827]">
                        {row.parameter}
                      </td>
                      <td className="py-5 px-6 text-[#49585F]">{row.big4}</td>
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
            10. TRUST STATUTORY FAQS
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Statutory FAQs</span>
            </div>
            {/* H2 #10: 54 characters */}
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
              Frequently Asked Questions: Private Trust Registration
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
              Find quick answers to common questions about private trust formation, taxes, and court rules:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRUST_FAQS.map((item, idx) => (
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
                Related Estate Planning &amp; Succession Resources
              </div>
              <p className="text-sm text-[#49585F]">
                Explore our statutory guides, partition formats, and interactive calculators:
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
                href="/services/family-settlement-deed-lawyer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/10 transition-colors"
              >
                <span>Family Settlement Deed Lawyer</span>
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
            11. AUTHOR & E-E-A-T EDITORIAL VERIFICATION CARD
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
              This advisory guide is prepared in accordance with the Indian Trusts Act, 1882, the Registration Act, 1908, the Indian Stamp Act, 1889, the Income Tax Act, 1961, and the National Trust Act, 1999. It provides legal information for estate planning and does not replace individualized legal representation.
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
