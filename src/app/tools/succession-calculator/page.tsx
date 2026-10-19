import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuccessionCalculator from "@/components/SuccessionCalculator";

export const metadata: Metadata = {
  title: {
    absolute: "Indian Succession Act Calculator & Heir Share Tool",
  },
  description:
    "Free Indian intestate succession calculator for Hindu (Sec 8 & 15), Muslim (1/3 Wasiyat), Christian & Parsi laws, plus a Will vs Bank Nomination checker.",
  keywords: [
    "indian succession calculator",
    "hindu succession act calculator",
    "who inherits without a will in india calculator",
    "will vs nomination checker india",
    "class 1 legal heirs calculator india",
    "hindu female property succession calculator section 15",
    "muslim inheritance calculator 1/3 will share",
    "christian succession calculator india",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/succession-calculator",
  },
  openGraph: {
    title: "Indian Succession Act Calculator & Heir Share Tool | WillDrafting.in",
    description:
      "Calculate exact legal heir shares under Hindu, Muslim, Christian & Parsi intestate succession laws in India and check Will vs. Bank/Demat nomination rules.",
    url: "https://www.willdrafting.in/tools/succession-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "Indian Intestate Succession & Legal Heir Share Calculator - WillDrafting.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Succession Act Calculator & Heir Share Tool",
    description:
      "Free Indian intestate succession calculator for Hindu (Sec 8 & 15), Muslim (1/3 Wasiyat), Christian & Parsi laws, plus a Will vs Bank Nomination checker.",
    images: ["https://www.willdrafting.in/desktopusp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const CALCULATOR_FAQS = [
  {
    question:
      "Does a surviving wife inherit 100% of her husband's property in India if there is no Will?",
    answer:
      "No. Under Section 8 of the Hindu Succession Act, 1956, a surviving wife is only one of several Class I legal heirs. She shares the estate equally with all surviving sons, daughters, and the deceased husband's mother. Under Christian law (Section 33, Indian Succession Act, 1925), the widow takes 1/3rd when children survive, and under Muslim law (Faraid), the widow takes a fixed 1/8th share when children survive. Only a valid Will allows a husband to bequeath 100% of his self-acquired property to his wife.",
  },
  {
    question:
      "Why does a Hindu Male's Mother inherit as a Class I heir while the Father does not?",
    answer:
      "In the Schedule to the Hindu Succession Act, 1956, the Mother is listed in Class I (inheriting an equal share alongside the widow, sons, and daughters), whereas the Father is placed in Class II - Entry I (inheriting only if no Class I legal heir survives). By contrast, if the deceased executes a Will under Section 30, he can allocate any specific share or monthly maintenance to both his Mother and Father.",
  },
  {
    question:
      "How does Section 15(2) affect a Hindu Woman's property if she dies without a Will?",
    answer:
      "Under Section 15(1)(a) of the Hindu Succession Act, 1956, a Hindu woman's self-acquired property passes equally to her sons, daughters, and husband. However, if she has no surviving children or grandchildren, Section 15(2)(a) states that any property she inherited from her Father or Mother reverts to her Father's heirs (excluding her husband), while Section 15(2)(b) states that property inherited from her Husband or Father-in-Law reverts to her Husband's heirs. Executing a Will under Section 30 overrides Section 15(2) completely.",
  },
  {
    question:
      "Can a Muslim testator change the fixed Quranic shares using a Will (Wasiyat)?",
    answer:
      "Under the Muslim Personal Law (Shariat) Application Act, 1937, a Muslim can unconditionally bequeath up to 1/3rd (33.33%) of their net estate (after funeral expenses and debts) via a Wasiyat. Under Sunni (Hanafi) law, bequests within 1/3rd can be made to non-heirs (such as orphaned grandchildren or charities) without consent, while bequests to existing legal heirs require other heirs' consent after death. Under Shia (Ithna Ashari) law, a testator can bequeath up to 1/3rd even to an existing legal heir without needing other heirs' consent.",
  },
  {
    question:
      "If I already added a nominee on my Bank FD, Mutual Fund, or Demat account, do I still need a Will?",
    answer:
      "Yes. In Smt. Sarbati Devi (1984) and Shakti Yezdani v. Jayanand Jayant Salgaonkar (Dec 2023), the Supreme Court of India settled that a bank, mutual fund, or Demat nominee is merely a provisional trustee or custodian who gives the financial institution a valid discharge. Legal ownership vests strictly in the beneficiaries named in your Will, or, if you die without a Will, in all statutory legal heirs calculated above.",
  },
  {
    question:
      "What happens when someone dies without a Will and has multiple Class I heirs?",
    answer:
      "Even when family members are in complete harmony, banks, depositories, and municipal mutation offices freeze transmission of high-value assets until all legal heirs obtain a court Succession Certificate (Part X, Indian Succession Act, 1925), Letters of Administration, or registered Release/Relinquishment Deeds, a process that typically costs 2% to 4% in court/stamp fees and takes 8 to 24 months.",
  },
];

const CALCULATOR_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://www.willdrafting.in/tools/succession-calculator#app",
      "name": "Indian Intestate Succession & Legal Heir Share Calculator",
      "url": "https://www.willdrafting.in/tools/succession-calculator",
      "applicationCategory": "LegalApplication",
      "operatingSystem": "All",
      "description":
        "Interactive Indian legal heir share calculator covering the Hindu Succession Act 1956 (Section 8 & Section 15), Muslim Personal Law (Shariat 1/3rd Wasiyat & Faraid), Christian & Parsi rules under the Indian Succession Act 1925, and Supreme Court Nominee vs. Legal Heir verification.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
      },
      "author": {
        "@type": "Organization",
        "name": "WillDrafting Editorial Team",
      },
      "reviewedBy": {
        "@type": "LegalService",
        "name": "AMA Legal Solutions",
        "url": "https://www.amalegalsolutions.com",
      },
      "publisher": {
        "@id": "https://www.willdrafting.in/#organization",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/tools/succession-calculator#breadcrumb",
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
          "name": "Services & Legal Tools",
          "item": "https://www.willdrafting.in/service",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Indian Succession Calculator",
          "item": "https://www.willdrafting.in/tools/succession-calculator",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/tools/succession-calculator#faq",
      "mainEntity": CALCULATOR_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
  ],
};

export default function SuccessionCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CALCULATOR_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-24">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6B7280] mb-6"
        >
          <Link href="/" className="hover:text-[#172228] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/service"
            className="hover:text-[#172228] transition-colors"
          >
            Services & Legal Tools
          </Link>
          <span>/</span>
          <span className="text-[#172228] font-semibold">
            Indian Succession Calculator
          </span>
        </nav>

        {/* Hero Section */}
        <header className="max-w-4xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EFE6] border border-[#172228]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-4">
            <span>Free Statutory Tool · Verified by AMA Legal Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#111827] mb-4">
            Indian Intestate Succession & Legal Heir Share Calculator
          </h1>

          <p className="text-base sm:text-lg leading-[1.65] text-[#49585F] max-w-3xl">
            See exactly how Indian courts divide your bank accounts, Demat portfolio, and real estate if you pass away without a Will, under the{" "}
            <strong className="font-semibold text-[#172228]">
              Hindu Succession Act, 1956 (Sections 8 & 15)
            </strong>
            ,{" "}
            <strong className="font-semibold text-[#172228]">
              Muslim Personal Law (Shariat 1/3rd Wasiyat & Faraid)
            </strong>
            , and{" "}
            <strong className="font-semibold text-[#172228]">
              Christian & Parsi rules (Indian Succession Act, 1925)
            </strong>
            .
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#6B7280]">
            <span>
              Author:{" "}
              <strong className="text-[#172228]">
                WillDrafting Editorial Team
              </strong>
            </span>
            <span>•</span>
            <span>
              Statutory Audit:{" "}
              <strong className="text-[#172228]">
                AMA Legal Solutions (October 2026)
              </strong>
            </span>
          </div>
        </header>

        {/* Interactive Calculator Component */}
        <section aria-label="Interactive Succession Calculator" className="mb-20">
          <SuccessionCalculator />
        </section>

        {/* Statutory Comparison Matrix Section */}
        <section className="mb-20 space-y-6">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-2">
              Statutory Reference Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111827]">
              Statutory Comparison: Intestate Succession vs. Written Will
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#172228]/15 bg-white shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#172228] text-white text-xs uppercase tracking-[0.12em]">
                  <th className="py-4 px-5 font-semibold border-r border-white/10">
                    Personal Law System
                  </th>
                  <th className="py-4 px-5 font-semibold border-r border-white/10">
                    Governing Intestate Statute
                  </th>
                  <th className="py-4 px-5 font-semibold border-r border-white/10">
                    Default Share Without a Will
                  </th>
                  <th className="py-4 px-5 font-semibold">
                    Freedom With a Written Will
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172228]/10 text-sm text-[#374151]">
                <tr className="bg-white">
                  <td className="py-4 px-5 font-semibold text-[#111827] border-r border-[#172228]/10">
                    Hindu, Buddhist, Jain & Sikh (Male)
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    Section 8 & 10, Hindu Succession Act, 1956
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    Equal split among Class I heirs: Widow, Sons, Daughters, and Mother (Father is Class II)
                  </td>
                  <td className="py-4 px-5 font-medium text-[#172228]">
                    100% freedom over self-acquired property + undivided coparcenary share (Section 30)
                  </td>
                </tr>
                <tr className="bg-[#FAF7F0]/70">
                  <td className="py-4 px-5 font-semibold text-[#111827] border-r border-[#172228]/10">
                    Hindu, Buddhist, Jain & Sikh (Female)
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    Section 15(1) & 15(2), Hindu Succession Act, 1956
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    Equal split among Husband, Sons & Daughters; parental property reverts under Sec 15(2) if childless
                  </td>
                  <td className="py-4 px-5 font-medium text-[#172228]">
                    100% freedom over all Stridhan, self-acquired, and inherited property (Section 30)
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="py-4 px-5 font-semibold text-[#111827] border-r border-[#172228]/10">
                    Muslim - Sunni (Hanafi) & Shia (Ithna Ashari)
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    Muslim Personal Law (Shariat) Application Act, 1937
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    Fixed Quranic shares (Zawil-Furud) for Spouse/Parents + 2:1 Residuary (Asabah) for Sons & Daughters
                  </td>
                  <td className="py-4 px-5 font-medium text-[#172228]">
                    Up to 1/3rd (33.33%) of net estate via Wasiyat (Shia allows 1/3rd to heirs; Sunni to non-heirs)
                  </td>
                </tr>
                <tr className="bg-[#FAF7F0]/70">
                  <td className="py-4 px-5 font-semibold text-[#111827] border-r border-[#172228]/10">
                    Christian & Special Marriage Act, 1954
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    Part V, Sections 31–49, Indian Succession Act, 1925
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    1/3rd to Spouse and 2/3rds equally to Children (or 1/2 to Spouse & 1/2 to Kindred if childless)
                  </td>
                  <td className="py-4 px-5 font-medium text-[#172228]">
                    100% testamentary freedom over entire estate (Section 59)
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="py-4 px-5 font-semibold text-[#111827] border-r border-[#172228]/10">
                    Parsi Community
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    Part V, Sections 50–56, Indian Succession Act, 1925
                  </td>
                  <td className="py-4 px-5 border-r border-[#172228]/10">
                    Spouse & each Child take 1 equal share; each surviving Parent takes half the share of a Child
                  </td>
                  <td className="py-4 px-5 font-medium text-[#172228]">
                    100% testamentary freedom over entire estate (Section 59)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Editorial Guide Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8 bg-white border border-[#172228]/10 rounded-3xl p-7 sm:p-10 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-medium text-[#111827]">
              How Intestate Succession Works Across 4 Personal Laws
            </h2>
            <p className="text-[16px] leading-[1.8] text-[#374151]">
              When an Indian citizen or NRI/OCI holding assets in India passes away without leaving a validly executed Will under{" "}
              <strong className="font-semibold text-[#111827]">
                Section 63 of the Indian Succession Act, 1925
              </strong>
              , they are legally deemed to have died <em>intestate</em>. Banks, mutual fund registrars (CAMS/KFintech), NSDL/CDSL depositories, and municipal mutation authorities cannot distribute assets based on family consensus alone, they are bound by the statutory schedules of the deceased&apos;s personal law.
            </p>
            <p className="text-[16px] leading-[1.8] text-[#374151]">
              Even worse, as confirmed by the Supreme Court of India in{" "}
              <em>Shakti Yezdani v. Jayanand Jayant Salgaonkar (2023)</em>, adding a nominee on your bank account or Demat portfolio only appoints a temporary caretaker to receive the funds. The nominee is legally required to distribute those funds according to your Will, or, if you have no Will, to every statutory heir shown in the calculator above.
            </p>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 text-sm text-[#172228]">
                <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-1" />
                <span>Bypass 8–24 month Succession Certificate court delays</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-[#172228]">
                <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-1" />
                <span>Protect your spouse from forced property partition</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-[#172228]">
                <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-1" />
                <span>Align bank & Demat nominees with legal beneficiaries</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-[#172228]">
                <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-1" />
                <span>Valid on plain paper with two adult witnesses (Sec 63)</span>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 bg-[#F4EFE6] border border-[#172228]/10 rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>Related Statutory Guides</span>
              </div>
              <h3 className="text-xl font-medium text-[#111827]">
                Deep-Dive Legal Research
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/blogs/ancestral-vs-self-acquired-property-will-hindu-succession-act"
                    className="flex items-center justify-between text-[#172228] hover:text-[#C65378] font-medium py-1"
                  >
                    <span>Ancestral vs. Self-Acquired Property (Sec 30)</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs/nominee-vs-legal-heir-india-supreme-court-rule"
                    className="flex items-center justify-between text-[#172228] hover:text-[#C65378] font-medium py-1"
                  >
                    <span>Nominee vs. Legal Heir (Shakti Yezdani SC)</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs/muslim-will-wasiyat-india-one-third-rule"
                    className="flex items-center justify-between text-[#172228] hover:text-[#C65378] font-medium py-1"
                  >
                    <span>Muslim Will (Wasiyat) 1/3rd Rule Guide</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service/nri-will-india"
                    className="flex items-center justify-between text-[#172228] hover:text-[#C65378] font-medium py-1"
                  >
                    <span>NRI & OCI Separate Indian Will Hub</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              href="/start"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#172228] text-white hover:bg-[#C65378] font-semibold text-sm py-3.5 px-5 rounded-xl transition-colors"
            >
              <span>Create Your Legal Will Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </aside>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#C65378]" />
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111827]">
              Frequently Asked Questions on Indian Inheritance Shares
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CALCULATOR_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#172228]/10 bg-white p-6 sm:p-7 shadow-xs space-y-2.5"
              >
                <h3 className="text-base sm:text-lg font-semibold text-[#111827] leading-snug">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-[15px] leading-[1.7] text-[#49585F]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
