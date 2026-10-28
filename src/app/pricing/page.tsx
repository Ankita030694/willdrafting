import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/cta";
import {
  ArrowUpRight,
  Check,
  ShieldCheck,
  Lock,
  FileCheck,
  Sparkles,
  Scale,
  PhoneCall,
  Clock,
  FileText,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting Charges in India | Online Will Fees",
  },
  description:
    "Compare fixed Will drafting charges in India: ₹2,490 Online Will, ₹4,990 Lawyer-Verified Will & ₹9,990 Advocate Plan. Zero hidden fees or.",
  keywords: [
    "will drafting charges in india",
    "cost of making a will in india",
    "lawyer fees for will drafting in india",
    "online will making cost india",
    "how much does a lawyer charge to make a will in india",
    "affordable online will india",
    "fixed price will drafting india",
    "will registration cost and lawyer fees india",
    "will writing cost india",
    "nri will drafting charges india",
    "online will price india",
    "lawyer verified will cost india",
    "testamentary will drafting fees india",
    "ama legal solutions will pricing",
    "one time fee online will india",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/pricing",
  },
  openGraph: {
    title: "Will Drafting Charges in India | Online Will Fees | WillDrafting.in",
    description:
      "Compare fixed Will drafting charges in India: ₹2,490 Online Will, ₹4,990 Lawyer-Verified Will & ₹9,990 Advocate Plan. Zero hidden fees or.",
    url: "https://www.willdrafting.in/pricing",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "WillDrafting.in Pricing and Will Drafting Charges in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting Charges in India | Online Will Fees | WillDrafting.in",
    description:
      "Compare fixed Will drafting charges in India: ₹2,490 Online Will, ₹4,990 Lawyer-Verified Will & ₹9,990 Advocate Plan. Zero hidden fees or.",
    images: ["/desktopusp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://www.willdrafting.in/pricing#product",
      "name": "Legal Will Drafting Service India",
      "image": "https://www.willdrafting.in/desktopusp.jpg",
      "description":
        "Statutory personal testamentary will drafting service compliant with Indian legal standards. Features comprehensive asset distribution, executor appointments, minor guardianship clauses, doctor certification template, and dual-witness attestation instructions.",
      "brand": {
        "@type": "Brand",
        "name": "WillDrafting.in",
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "2490",
        "highPrice": "9990",
        "offerCount": 3,
        "offers": [
          {
            "@type": "Offer",
            "name": "Essential Online Will Plan",
            "price": "2490",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://www.willdrafting.in/pricing",
            "description":
              "Self-service court-ready Indian Will PDF under Section 63 of the Indian Succession Act with unlimited edits.",
          },
          {
            "@type": "Offer",
            "name": "Lawyer Verified Will Plan",
            "price": "4990",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://www.willdrafting.in/pricing",
            "description":
              "Online Will drafted and manually verified by an Indian succession advocate at AMA Legal Solutions within 24 hours.",
          },
          {
            "@type": "Offer",
            "name": "Connect to Lawyer (Bespoke & NRI Estate Plan)",
            "price": "9990",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://www.willdrafting.in/pricing",
            "description":
              "1-on-1 senior advocate consultation, bespoke clause drafting for complex/NRI/ancestral estates, and registration guidance.",
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/pricing#breadcrumb",
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
          "name": "Pricing",
          "item": "https://www.willdrafting.in/pricing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/pricing#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are there any recurring subscription fees or hidden platform charges?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. WillDrafting operates on a strictly transparent one-time pricing model. There are no recurring monthly or annual subscription fees, no per-revision charges, and no hidden advocate retainers. You receive permanent access to your secure digital vault and can generate updated PDF revisions whenever your asset distribution or family circumstances change.",
          },
        },
        {
          "@type": "Question",
          "name": "Is an online-drafted Will legally enforceable in Indian courts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, absolutely. Under Indian law, any Will written in clear language, declaring testamentary intent, executed by an individual of sound mind, and signed in the presence of two independent witnesses is completely valid and enforceable before any civil court in India. A digital drafting engine ensures statutory clauses and legal requirements are properly structured.",
          },
        },
        {
          "@type": "Question",
          "name": "Do I need to purchase non-judicial stamp paper or have the Will notarized?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Under the Indian Stamp Act, 1899, a Will is completely exempt from stamp duty across all Indian states and Union Territories. You do not need to print it on stamp paper. Printing on plain white A4 paper is legally standard. Notarization is also purely optional under Indian law and does not replace the mandatory requirement of two independent witnesses.",
          },
        },
        {
          "@type": "Question",
          "name": "Is registration at the Sub-Registrar office mandatory for a valid Will?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Registration is purely optional under Section 18(e) of the Registration Act, 1908. An unregistered Will executed in accordance with Indian succession law holds equal evidentiary value in court. Registration provides an additional layer of official record-keeping but is not a legal prerequisite for validity.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I edit and update my Will later if my assets change?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every WillDrafting account includes unlimited lifetime revisions. If you acquire new real estate, sell mutual funds, open new bank accounts, or wish to change beneficiaries or executors, simply log in to your account, update your questionnaire, and generate an updated court-ready Will at no additional fee.",
          },
        },
        {
          "@type": "Question",
          "name": "Why choose WillDrafting instead of traditional law firm retainers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional law firms incur substantial overhead, hourly billing structures, and multiple manual drafting rounds for standard succession clauses. WillDrafting leverages legal technology to automate document assembly using court-vetted templates designed by seasoned estate advocates, eliminating manual legal overhead and passing the benefits directly to Indian families.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I distribute ancestral property or only self-acquired assets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under Indian succession law, a testator has testamentary power to bequeath 100% of their self-acquired properties, personal investments, savings, and movable assets. In the case of undivided ancestral coparcenary property (governed by the Hindu Succession Act), a testator can only bequeath their specific undivided share that would fall to them upon a deemed partition at the time of death.",
          },
        },
        {
          "@type": "Question",
          "name": "Which payment methods are accepted and how is financial security handled?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We accept all major Indian payment methods through RBI-licensed payment gateway partners (PayU), including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ Indian banks, debit cards, and credit cards. All transactions are protected by 256-bit TLS encryption. We never store credit card credentials or bank passwords.",
          },
        },
      ],
    },
  ],
};

interface LedgerPlan {
  step: string;
  name: string;
  subtitle: string;
  price: string;
  turnaround: string;
  badge?: string;
  isFeatured?: boolean;
  idealFor: string;
  deliverables: string[];
  ctaText: string;
  ctaHref: string;
}

const LEDGER_PLANS: LedgerPlan[] = [
  {
    step: "01",
    name: "Auto Verified (Essential Online Will)",
    subtitle: "Automated Statutory Drafting & Instant Court-Ready PDF",
    price: "₹2,490",
    turnaround: "Instant PDF Generation (15 Mins)",
    badge: "Most Popular",
    isFeatured: true,
    idealFor:
      "Salaried professionals, nuclear families, and testators with self-acquired residential property, bank accounts, Demat portfolios, and mutual funds.",
    deliverables: [
      "Complete statutory Will under Section 63, Indian Succession Act, 1925",
      "Unlimited movable & immovable asset scheduling across India",
      "Primary & alternate executor appointments with administrative powers",
      "Minor child guardianship clauses (Guardians & Wards Act, 1890)",
      "Universal residuary bequest clause preventing partial intestacy",
      "Dual-witness attestation signing guide & RMP doctor fitness template",
    ],
    ctaText: "Start Auto-Verified Will",
    ctaHref: "/start/01",
  },
  {
    step: "02",
    name: "Manually Verified (Lawyer Verified Will)",
    subtitle: "High Court Advocate Review & Bar Council Legal Audit",
    price: "₹4,990",
    turnaround: "24-Hour Advocate Verification",
    badge: "Advocate Certified",
    idealFor:
      "Homeowners with multiple properties, married women navigating Section 15 rules, disproportionate heir allocations, or families seeking zero-ambiguity review.",
    deliverables: [
      "Everything included in the Auto Verified (₹2,490) plan",
      "Line-by-line manual review by an AMA Legal Solutions succession advocate",
      "Verification of personal law compliance (Hindu, Muslim, Christian, Parsi)",
      "Audit of property identifiers, survey numbers & joint-holding clauses",
      "Custom exclusion / disinheritance rationale wording to deter probate challenges",
      "Digital verification certificate issued after advocate sign-off",
    ],
    ctaText: "Choose Lawyer Verified",
    ctaHref: "/start/01",
  },
  {
    step: "03",
    name: "Connect to Lawyer (Bespoke & NRI Estate Plan)",
    subtitle: "1-on-1 Senior Counsel Call, NRI Two-Will Strategy & Complex Estates",
    price: "₹9,990",
    turnaround: "Dedicated Advocate Call + Custom Draft",
    badge: "NRI & Complex Estates",
    idealFor:
      "NRIs & OCIs living abroad (USA, UK, UAE, Canada, Australia), HUF coparcenary shares, family businesses, life-interest trusts, and Sub-Registrar registration queries.",
    deliverables: [
      "Everything included in the Lawyer Verified (₹4,990) plan",
      "1-on-1 video or phone consultation with a senior estate planning advocate",
      "Separate Indian Will ('Two-Will Strategy') non-revocation territorial clauses",
      "HUF undivided coparcenary share (Section 30 HSA) & business succession clauses",
      "FEMA NRE/NRO/FCNR repatriation & Form 15CA/15CB succession roadmap",
      "Sub-Registrar registration procedure & diplomatic apostille execution guidance",
    ],
    ctaText: "Connect to Senior Lawyer",
    ctaHref: "/contact",
  },
];

interface MatrixRowItem {
  title: string;
  subtext: string;
  essential: string;
  lawyerVerified: string;
  connectLawyer: string;
  traditionalFirm: string;
}

interface MatrixCategory {
  category: string;
  rows: MatrixRowItem[];
}

const MASTER_MATRIX: MatrixCategory[] = [
  {
    category: "Pricing, Turnaround & Revisions",
    rows: [
      {
        title: "One-Time Service Fee",
        subtext: "Total cost to draft, structure, and generate your Indian Will",
        essential: "₹2,490 flat",
        lawyerVerified: "₹4,990 flat",
        connectLawyer: "₹9,990 flat",
        traditionalFirm: "₹15,000 – ₹45,000+",
      },
      {
        title: "Completion Turnaround",
        subtext: "Time from starting the guided wizard to final printable PDF",
        essential: "15 minutes (Instant)",
        lawyerVerified: "Within 24 hours",
        connectLawyer: "24–48 hrs + Live Call",
        traditionalFirm: "2 to 4 weeks",
      },
      {
        title: "Future Document Revisions",
        subtext: "Updating beneficiaries, new properties, or executors later",
        essential: "Unlimited free edits",
        lawyerVerified: "Unlimited free edits",
        connectLawyer: "Unlimited free edits",
        traditionalFirm: "₹5,000+ per codicil",
      },
    ],
  },
  {
    category: "Testamentary Clauses & Legal Review",
    rows: [
      {
        title: "Section 63 Statutory Compliance",
        subtext: "Sound mind declaration, revocation clause & dual-witness attestation block",
        essential: "Included",
        lawyerVerified: "Included + Audited",
        connectLawyer: "Included + Bespoke",
        traditionalFirm: "Standard draft",
      },
      {
        title: "Manual High Court Advocate Audit",
        subtext: "Line-by-line human legal review of asset schedules and heir shares",
        essential: "Automated Engine",
        lawyerVerified: "Included (Bar Advocate)",
        connectLawyer: "Included (Senior Counsel)",
        traditionalFirm: "Billed hourly",
      },
      {
        title: "1-on-1 Advocate Phone / Video Advisory",
        subtext: "Direct legal consultation for complex family, HUF, or cross-border queries",
        essential: "-",
        lawyerVerified: "Email review notes",
        connectLawyer: "Dedicated 1-on-1 Call",
        traditionalFirm: "Extra consultation fee",
      },
      {
        title: "NRI Two-Will Non-Revocation Clause",
        subtext: "Protects your US/UK/UAE/Canada/AU foreign Will from accidental revocation",
        essential: "Standard territorial",
        lawyerVerified: "Advocate verified",
        connectLawyer: "Custom cross-border draft",
        traditionalFirm: "₹25,000+ NRI retainer",
      },
    ],
  },
  {
    category: "Execution Kit & Vault Security",
    rows: [
      {
        title: "Doctor Mental Fitness Certificate Format",
        subtext: "RMP medical certificate template to prevent capacity disputes in probate",
        essential: "Included",
        lawyerVerified: "Included",
        connectLawyer: "Included",
        traditionalFirm: "Rarely provided",
      },
      {
        title: "Sub-Registrar & Apostille Guidance",
        subtext: "Step-by-step support for optional Section 18 registration or embassy attestation",
        essential: "Self-execution guide",
        lawyerVerified: "Written checklist",
        connectLawyer: "1-on-1 Advisory Support",
        traditionalFirm: "Extra appearance fee",
      },
      {
        title: "AES-256 Encrypted Cloud Vault",
        subtext: "Bilingual voice/text guided entry + encrypted lifetime document storage",
        essential: "Included",
        lawyerVerified: "Included",
        connectLawyer: "Included",
        traditionalFirm: "Paper / Email only",
      },
    ],
  },
];

const FAQS = [
  {
    question: "Are there any recurring subscription fees or hidden platform charges?",
    answer:
      "No. WillDrafting operates on a strictly transparent one-time pricing model. There are no recurring monthly or annual subscription fees, no per-revision charges, and no hidden advocate retainers. You receive permanent access to your secure digital vault and can generate updated PDF revisions whenever your asset distribution or family circumstances change.",
  },
  {
    question: "Is an online-drafted Will legally enforceable in Indian courts?",
    answer:
      "Yes, absolutely. Under Section 63 of the Indian Succession Act, 1925, any Will written in clear language, declaring testamentary intent, executed by an individual of sound mind, and signed in the presence of two independent witnesses is completely valid and enforceable before any civil court in India.",
  },
  {
    question: "Do I need to purchase non-judicial stamp paper or have the Will notarized?",
    answer:
      "No. Under Schedule I of the Indian Stamp Act, 1899, a Will is completely exempt from stamp duty across all Indian states and Union Territories. Printing on plain white A4 paper is legally standard. Notarization is also optional and does not replace the mandatory requirement of two independent witnesses.",
  },
  {
    question: "Is registration at the Sub-Registrar office mandatory for a valid Will?",
    answer:
      "Registration is purely optional under Section 18(e) of the Registration Act, 1908. The Supreme Court of India has repeatedly affirmed that an unregistered Will executed in accordance with Section 63 holds equal legal validity in court. Registration provides optional official record-keeping.",
  },
  {
    question: "Can I edit and update my Will later if my assets change?",
    answer:
      "Yes. Every WillDrafting account includes unlimited lifetime revisions. If you acquire new real estate, sell mutual funds, open new bank accounts, or wish to change beneficiaries or executors, simply log in to your account, update your questionnaire, and generate an updated court-ready Will.",
  },
  {
    question: "Why choose WillDrafting instead of traditional law firm retainers?",
    answer:
      "Traditional law firms charge ₹15,000 to ₹45,000+ due to manual drafting rounds and hourly billing. Powered by AMA Legal Solutions, WillDrafting combines automated statutory assembly with High Court advocate verification, delivering law-firm accuracy at a transparent fixed fee.",
  },
  {
    question: "Can I distribute ancestral property or only self-acquired assets?",
    answer:
      "Under Indian succession law, you have testamentary power to bequeath 100% of your self-acquired properties, bank accounts, and investments. For undivided ancestral coparcenary property (under Section 30 of the Hindu Succession Act, 1956), you can bequeath your specific undivided share.",
  },
  {
    question: "Which payment methods are accepted and how is financial security handled?",
    answer:
      "We accept all major payment methods through RBI-licensed payment gateway partners (PayU), including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ Indian banks, and international/domestic debit and credit cards for NRIs, protected by 256-bit TLS encryption.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378]/15 selection:text-[#C65378]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-20">
        {/* =========================================================================
            1. ASYMMETRIC EDITORIAL SPLIT HERO
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-[#55636D]">
              <li>
                <Link href="/" className="hover:text-[#172228] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#172228]/30">/</li>
              <li aria-current="page" className="font-semibold text-[#C65378]">
                Pricing &amp; Plans
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Editorial Headline & Value Prop */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[#C65378] bg-[#C65378]/10 px-3.5 py-1.5 rounded-full text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Statutory Estate Planning · AMA Legal Solutions</span>
              </div>

              {/* Single H1 (< 70 chars: 50 chars) */}
              <h1 className="text-[2.1rem] sm:text-[2.85rem] lg:text-[3.5rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-6">
                Transparent Will Drafting Charges &amp; Plans in India
              </h1>

              <p className="text-[1.05rem] sm:text-[1.15rem] leading-[1.68] text-[#49585F] max-w-[680px] mb-8">
                Clear, fixed-price <strong className="text-[#172228]">online Will making cost in India</strong> with zero hidden lawyer retainers or annual vault subscriptions. Whether you need an instant court-ready Will under Section 63, a manual High Court advocate audit, or a bespoke <Link href="/services/nri-will-india" className="text-[#C65378] font-semibold underline underline-offset-4">NRI Two-Will estate plan</Link>, pay once and edit free for life.
              </p>

              {/* Editorial Guarantee Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="rounded-2xl bg-white border border-[#172228]/10 px-4 py-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#C65378]/10 text-[#C65378] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111827]">One-Time Fixed Fee</p>
                    <p className="text-[11px] text-[#55636D]">No annual subscriptions</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white border border-[#172228]/10 px-4 py-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#5F7E75]/15 text-[#5F7E75] flex items-center justify-center shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111827]">₹0 Stamp Duty</p>
                    <p className="text-[11px] text-[#55636D]">Valid on plain A4 paper</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white border border-[#172228]/10 px-4 py-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#DFCEBF]/60 text-[#172228] flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111827]">Free Lifetime Edits</p>
                    <p className="text-[11px] text-[#55636D]">AES-256 encrypted vault</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Warm Sand & Rose Fee Transparency Ledger Box */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-[28px] bg-[#DFCEBF]/45 border border-[#172228]/10 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C65378]">
                    Market Cost Benchmark
                  </span>
                  <span className="text-[11px] font-semibold text-[#49585F] bg-white/80 px-2.5 py-1 rounded-full">
                    2026 India Fee Index
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-medium text-[#111827] leading-snug mb-5">
                  How WillDrafting.in compares to traditional estate lawyers &amp; bank trustees:
                </p>

                <div className="space-y-3 mb-6">
                  <div className="rounded-2xl bg-white p-4 border-2 border-[#C65378] shadow-[0_8px_24px_rgba(198,83,120,0.10)]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                        WillDrafting.in (AMA Legal Solutions)
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-[#111827]">
                        ₹2,490 – ₹9,990
                      </span>
                    </div>
                    <p className="text-xs text-[#49585F]">
                      One-time fee · Instant PDF or Bar Advocate verified · Free lifetime updates
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/75 p-4 border border-[#172228]/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#49585F]">
                        Traditional Offline Lawyer Retainer
                      </span>
                      <span className="text-sm font-bold text-[#172228]">
                        ₹15,000 – ₹45,000+
                      </span>
                    </div>
                    <p className="text-xs text-[#55636D]">
                      2–4 weeks turnaround · ₹5,000+ charged per future codicil or amendment
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/75 p-4 border border-[#172228]/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#49585F]">
                        Institutional Bank Trustee Desk
                      </span>
                      <span className="text-sm font-bold text-[#172228]">
                        ₹25,000 + 1% Estate Fee
                      </span>
                    </div>
                    <p className="text-xs text-[#55636D]">
                      Recurring annual custody charges + percentage cut during estate execution
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#172228]/10 text-xs text-[#49585F]">
                  <span>Start your questionnaire before paying</span>
                  <Link
                    href="/start/01"
                    className="inline-flex items-center gap-1 font-bold text-[#C65378] hover:text-[#a83d5f]"
                  >
                    <span>Try Wizard Free</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. HORIZONTAL ARCHITECTURAL LEDGER BANDS (Distinct from Homepage Grid)
            ========================================================================= */}
        <section className="w-full mb-20 sm:mb-28" aria-labelledby="ledger-plans-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2.5">
                <span>Three Fixed-Fee Tiers</span>
              </div>
              {/* H2 < 70 chars (46 chars) */}
              <h2
                id="ledger-plans-heading"
                className="text-[1.85rem] sm:text-[2.4rem] lg:text-[2.75rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827]"
              >
                Select Your Level of Legal Verification
              </h2>
            </div>
            <p className="text-sm sm:text-[0.95rem] text-[#49585F] max-w-md">
              Start with our self-service Essential Will and upgrade to Advocate Review or 1-on-1 Senior Counsel at any stage by paying only the difference.
            </p>
          </div>

          <div className="space-y-6">
            {LEDGER_PLANS.map((plan) => (
              <div
                key={plan.step}
                className={`rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 lg:p-10 transition-all duration-300 ${
                  plan.isFeatured
                    ? "bg-white border-2 border-[#C65378] shadow-[0_14px_40px_rgba(198,83,120,0.12)]"
                    : "bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#172228]/25"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Column A (4 cols): Tier Identity & Who It's For */}
                  <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#172228]/10 pb-6 lg:pb-0 lg:pr-8">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                        <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#172228] bg-[#FAF7F0] border border-[#172228]/10 px-3 py-1 rounded-full">
                          Tier {plan.step}
                        </span>
                        {plan.badge && (
                          <span
                            className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${
                              plan.isFeatured
                                ? "bg-[#C65378] text-white"
                                : "bg-[#C65378]/10 text-[#C65378]"
                            }`}
                          >
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-semibold text-[#111827] leading-snug mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm font-medium text-[#C65378] mb-4">
                        {plan.subtitle}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#FAF7F0] p-4 border border-[#172228]/5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#172228] mb-1">
                        Recommended For:
                      </p>
                      <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                        {plan.idealFor}
                      </p>
                    </div>
                  </div>

                  {/* Column B (5 cols): Deliverables Checklist */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#172228]">
                        What’s Included in Tier {plan.step}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F7E75] bg-[#5F7E75]/10 px-3 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{plan.turnaround}</span>
                      </span>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {plan.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-[13.5px] text-[#374151] leading-snug"
                        >
                          <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/15 text-[#059669]">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column C (3 cols): Price Block & Action */}
                  <div className="lg:col-span-3 flex flex-col justify-between lg:items-end lg:text-right border-t lg:border-t-0 lg:border-l border-[#172228]/10 pt-6 lg:pt-0 lg:pl-8">
                    <div className="mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                        One-Time Fixed Fee
                      </span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                        {plan.price}
                      </div>
                      <span className="text-xs text-[#55636D] block mt-1">
                        Inclusive of taxes · Free lifetime revisions
                      </span>
                    </div>

                    <div className="w-full">
                      <Link
                        href={plan.ctaHref}
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-200 ${
                          plan.isFeatured
                            ? "bg-[#C65378] text-white hover:bg-[#a83d5f] shadow-[0_6px_20px_rgba(198,83,120,0.28)]"
                            : "bg-[#172228] text-white hover:bg-[#263640]"
                        }`}
                      >
                        <span>{plan.ctaText}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <p className="text-[11px] text-[#55636D] text-center lg:text-right mt-2.5">
                        Preview your asset summary before payment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            3. STATUTORY COST-SAVING BENTO MOSAIC (Theme Checkerboard Colors)
            ========================================================================= */}
        <section className="w-full mb-20 sm:mb-28" aria-labelledby="statutory-savings-heading">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2.5">
              <span>Indian Statutory Exemptions</span>
            </div>
            {/* H2 < 70 chars (53 chars) */}
            <h2
              id="statutory-savings-heading"
              className="text-[1.85rem] sm:text-[2.4rem] lg:text-[2.75rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3"
            >
              Why Making a Will in India Costs Less Than You Think
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] text-[#49585F] leading-relaxed">
              Many families overpay for stamp papers, mandatory registration brokers, or recurring codicil fees. Here is what Indian statutory law actually states:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tile 1: Signature Rose Tile */}
            <div className="rounded-[28px] bg-[#C65378] text-white p-8 sm:p-9 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/75">
                  Indian Stamp Act, 1899
                </span>
                <FileText className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
                  ₹0 Stamp Duty
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No Stamp Paper Required
                </h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  Under Schedule I of the Indian Stamp Act, 1899, testamentary Wills are 100% exempt from stamp duty across all Indian states. A Will printed on plain white A4 paper carries full legal validity in court.
                </p>
              </div>
            </div>

            {/* Tile 2: Clean White Editorial Card */}
            <div className="rounded-[28px] bg-white border border-[#172228]/10 p-8 sm:p-9 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C65378]">
                  Registration Act, 1908
                </span>
                <Scale className="w-5 h-5 text-[#C65378]" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111827] mb-3">
                  Section 18(e)
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">
                  Sub-Registrar Visit Is Optional
                </h3>
                <p className="text-sm text-[#49585F] leading-relaxed">
                  The Supreme Court of India (<em>Ishwardeo Narain Singh v. Smt. Kamta Devi</em>) affirmed that an unregistered Will signed before two independent witnesses under Section 63 holds equal legal standing to a registered Will.
                </p>
              </div>
            </div>

            {/* Tile 3: Warm Sand Tile (#DFCEBF) */}
            <div className="rounded-[28px] bg-[#DFCEBF] text-[#172228] p-8 sm:p-9 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#172228]/70">
                  Section 62 · Revocation &amp; Edits
                </span>
                <Award className="w-5 h-5 text-[#172228]/80" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111827] mb-3">
                  ₹0 Per Revision
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">
                  Unlimited Lifetime Amendments
                </h3>
                <p className="text-sm text-[#172228]/80 leading-relaxed">
                  Offline advocates charge ₹5,000–₹15,000 every time you draft a Codicil or add a new bank account or property. With WillDrafting.in, you can update your Will and generate a fresh PDF free for life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. FULL 4-COLUMN FEATURE & STATUTORY COMPARISON MATRIX
            ========================================================================= */}
        <section className="w-full mb-20 sm:mb-28" aria-labelledby="comparison-matrix-heading">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2.5">
              <span>Detailed Plan Specifications</span>
            </div>
            {/* H2 < 70 chars (44 chars) */}
            <h2
              id="comparison-matrix-heading"
              className="text-[1.85rem] sm:text-[2.4rem] lg:text-[2.75rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3"
            >
              Full Feature &amp; Statutory Comparison Matrix
            </h2>
            <p className="text-[0.98rem] sm:text-[1.05rem] text-[#49585F] leading-relaxed">
              Compare every clause, advocate verification step, and execution deliverable across our three plans and traditional law firm retainers.
            </p>
          </div>

          <div className="w-full rounded-[28px] bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#172228] text-white text-xs font-bold uppercase tracking-[0.12em]">
                    <th className="py-5 px-6 w-[32%]">Feature &amp; Statutory Provision</th>
                    <th className="py-5 px-5 w-[17%] bg-[#C65378] text-white">
                      Auto Verified (₹2,490)
                    </th>
                    <th className="py-5 px-5 w-[18%]">Lawyer Verified (₹4,990)</th>
                    <th className="py-5 px-5 w-[18%]">Connect Lawyer (₹9,990)</th>
                    <th className="py-5 px-5 w-[15%] text-white/70">Offline Law Firm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172228]/10 text-sm">
                  {MASTER_MATRIX.map((cat) => (
                    <React.Fragment key={cat.category}>
                      <tr className="bg-[#FAF7F0]">
                        <td
                          colSpan={5}
                          className="py-3.5 px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378]"
                        >
                          {cat.category}
                        </td>
                      </tr>
                      {cat.rows.map((row) => (
                        <tr
                          key={row.title}
                          className="hover:bg-[#FAF7F0]/60 transition-colors align-top"
                        >
                          <td className="py-4 px-6">
                            <div className="font-semibold text-[#111827] mb-0.5">
                              {row.title}
                            </div>
                            <p className="text-xs text-[#55636D] leading-relaxed">
                              {row.subtext}
                            </p>
                          </td>
                          <td className="py-4 px-5 font-semibold text-[#111827] bg-[#C65378]/[0.04]">
                            {row.essential}
                          </td>
                          <td className="py-4 px-5 font-semibold text-[#172228]">
                            {row.lawyerVerified}
                          </td>
                          <td className="py-4 px-5 font-semibold text-[#C65378]">
                            {row.connectLawyer}
                          </td>
                          <td className="py-4 px-5 text-[#55636D] text-xs">
                            {row.traditionalFirm}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. STICKY TWO-COLUMN EDITORIAL FAQ SECTION
            ========================================================================= */}
        <section className="w-full mb-12" aria-labelledby="pricing-faq-heading">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Sticky Header & Legal Desk Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2.5">
                <span>Common Pricing Questions</span>
              </div>
              {/* H2 < 70 chars (44 chars) */}
              <h2
                id="pricing-faq-heading"
                className="text-[1.85rem] sm:text-[2.25rem] font-medium leading-[1.15] tracking-[-0.02em] text-[#111827] mb-4"
              >
                Frequently Asked Questions on Will Charges
              </h2>
              <p className="text-sm sm:text-[0.95rem] text-[#49585F] leading-relaxed mb-6">
                Straightforward answers about our one-time fee structure, stamp duty exemptions, and advocate verification under Indian succession law.
              </p>

              <div className="rounded-[24px] bg-white border border-[#172228]/10 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#C65378]/10 text-[#C65378] flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">Need Custom Estate Advice?</p>
                    <p className="text-xs text-[#55636D]">AMA Legal Solutions Advisory Desk</p>
                  </div>
                </div>
                <p className="text-xs text-[#49585F] leading-relaxed mb-4">
                  Unsure whether your estate needs the ₹2,490 Auto-Verified plan, ₹4,990 Lawyer-Verified plan, or ₹9,990 NRI/Bespoke plan?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C65378] hover:text-[#a83d5f]"
                >
                  <span>Speak With Our Legal Team</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Accordion List */}
            <div className="lg:col-span-8 space-y-3.5">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl bg-white border border-[#172228]/10 p-6 open:border-[#C65378]/40 open:shadow-[0_6px_24px_rgba(0,0,0,0.04)] transition-all"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[#111827] text-[0.98rem] sm:text-[1.05rem]">
                    <span>{faq.question}</span>
                    <span className="w-7 h-7 rounded-full bg-[#FAF7F0] text-[#C65378] flex items-center justify-center shrink-0 font-bold group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 pt-4 border-t border-[#172228]/10 text-sm sm:text-[0.94rem] text-[#49585F] leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CTA />
      <Footer />
    </div>
  );
}
