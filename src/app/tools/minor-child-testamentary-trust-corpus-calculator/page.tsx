import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MinorChildTrustCorpusClient from "./MinorChildTrustCorpusClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Minor Child Trust Corpus Calculator | WillDrafting", // exactly 50 characters
  },
  description:
    "Calculate inflation-adjusted trust corpus and staged distribution ages for minor children in your Indian will. Model guardian stipends and school fees.", // exactly 151 characters
  keywords: [
    "testamentary trust corpus calculator minor child india",
    "minor child inheritance corpus estimator",
    "testamentary trust living expenses runout tool",
    "guardian stipend calculator will",
    "indian trusts act 1882 section 6 minor trust",
    "guardians and wards act 1890 section 7",
    "section 164 income tax act private trust minor",
    "child education inflation calculator india 10 percent",
    "staged trust distribution age 18 21 25 india",
    "testamentary trust clause draft minor child will",
    "ama legal solutions family trust advisory",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/minor-child-testamentary-trust-corpus-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/minor-child-testamentary-trust-corpus-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/minor-child-testamentary-trust-corpus-calculator",
    },
  },
  openGraph: {
    title: "Minor Child Trust Corpus Calculator | WillDrafting",
    description:
      "Calculate inflation-adjusted trust corpus and staged distribution ages for minor children in your Indian will. Model guardian stipends and school fees.",
    url: "https://www.willdrafting.in/tools/minor-child-testamentary-trust-corpus-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/minor-child-testamentary-trust-corpus-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Minor Child Testamentary Trust Corpus Calculator and Staged Will Distribution India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minor Child Trust Corpus Calculator | WillDrafting",
    description:
      "Calculate inflation-adjusted trust corpus and staged distribution ages for minor children in your Indian will. Model guardian stipends and school fees.",
    images: [
      "https://www.willdrafting.in/images/minor-child-testamentary-trust-corpus-calculator-og.jpg",
    ],
    site: "@willdrafting",
    creator: "@willdrafting",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function MinorChildTestamentaryTrustCorpusPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/minor-child-testamentary-trust-corpus-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/minor-child-testamentary-trust-corpus-calculator-og.jpg";

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.willdrafting.in/#organization",
        name: "WillDrafting.in",
        url: "https://www.willdrafting.in",
        logo: "https://www.willdrafting.in/Logofinal.svg",
        parentOrganization: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Minor Child Trust Corpus Calculator | WillDrafting",
        description:
          "Calculate inflation-adjusted trust corpus and staged distribution ages for minor children in your Indian will. Model guardian stipends and school fees.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
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
            name: "Tools",
            item: "https://www.willdrafting.in/tools",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Minor Child Trust Corpus Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Minor Child Testamentary Trust Corpus Calculator India",
        url: canonicalUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        description:
          "Interactive calculator modeling 10% education inflation, guardian monthly stipends, living expense runouts, and staged milestone trust distributions under Indian Trusts Act 1882.",
        image: imageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much money should I leave in trust for my minor child in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The required trust corpus depends on the child's age, 10% annual education inflation, higher education tuition, and monthly guardian living stipends. For example, a 4-year-old child typically requires an initial corpus of ₹1.4 Crore to ₹2.2 Crores invested at 7.5% return to comfortably fund private schooling, university degrees, healthcare buffers, and monthly guardian stipends until age 25.",
            },
          },
          {
            "@type": "Question",
            name: "What is a testamentary trust for a minor child under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A testamentary trust is a private trust created directly through a clause in a Will under Sections 5 and 6 of the Indian Trusts Act, 1882. It takes effect only upon the testator's death. The Will designates trustees to manage assets exclusively for the child's maintenance, education, and advancement without court interference.",
            },
          },
          {
            "@type": "Question",
            name: "Why is a testamentary trust better than leaving property directly to a minor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Minors cannot legally hold title or enter contracts under the Indian Contract Act. If assets pass directly to a minor, the legal guardian must petition the District Court under Section 29 of the Guardians and Wards Act for permission to sell or encumber property or withdraw large sums. A testamentary trust avoids court delays because trustees possess full legal powers defined in the Will.",
            },
          },
          {
            "@type": "Question",
            name: "How does staged age disbursement protect a child at 18, 21, and 25?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Handing an entire inheritance to an 18-year-old often leads to rapid depletion and peer exploitation. Staged disbursements release funds in controlled tranches: typically 25% at age 18 for undergraduate studies, 35% at age 21 for postgraduate degrees or career setup, and the remaining 40% at age 25 when the beneficiary has attained financial maturity.",
            },
          },
          {
            "@type": "Question",
            name: "How are testamentary trusts for minor children taxed under the Income Tax Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Proviso to Section 164(1) of the Income Tax Act, 1961, if a testamentary trust is created under a Will for the benefit of relatives and is the only trust created by the testator, the income is not taxed at the Maximum Marginal Rate (MMR). Instead, it is taxed at the normal individual slab rates, saving substantial annual tax.",
            },
          },
          {
            "@type": "Question",
            name: "Can the legal guardian and the trustee be different persons?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, separating the guardian of the child's person from the financial trustee is best practice under Indian estate planning. The guardian provides loving personal custody and daily care, while the trustees manage the investment portfolio and disburse monthly stipends and institutional fees, establishing a healthy check and balance.",
            },
          },
          {
            "@type": "Question",
            name: "How do trustees pay school fees and medical expenses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 41 of the Indian Trusts Act, trustees hold statutory powers of maintenance and advancement. A well-drafted Will empowers trustees to disburse a fixed monthly stipend directly to the guardian for household expenses, while paying school fees, university tuition, and medical bills directly to institutions via bank transfer.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to the trust corpus if the child passes away before age 25?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A well-drafted testamentary trust contains a gift-over clause. If the primary child beneficiary passes away before attaining full trust maturity, the remaining corpus devolves upon alternate beneficiaries, such as surviving siblings, named charities, or other family heirs, preventing intestacy disputes.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <div className="min-h-screen bg-[#FAF7F0] text-[#172228] antialiased">
        <Navbar />
        <MinorChildTrustCorpusClient />
        <Footer />
      </div>
    </>
  );
}
