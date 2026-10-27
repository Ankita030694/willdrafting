import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MinorChildTrustEstimatorClient from "./MinorChildTrustEstimatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Minor Child Inheritance Rules India | WillDrafting.in", // exactly 53 characters
  },
  description:
    "Learn minor child inheritance rules in India. Compare legal guardianship vs testamentary trusts, model staggered payouts, and protect your children.", // exactly 148 characters
  keywords: [
    "minor child inheritance rules india",
    "how to leave money to minor child in will india",
    "testamentary guardian vs family trust calculator",
    "hindu minority and guardianship act section 9 will",
    "guardians and wards act 1890 section 29 permission",
    "can minor inherit property in india",
    "testamentary trust for minor child will india",
    "staggered payout inheritance minor child",
    "mwp act section 6 term insurance trust minor",
    "appointing guardian in will india sample clause",
    "ama legal solutions minor child trust calculator",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/minor-child-trust-vs-guardianship-estimator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/minor-child-trust-vs-guardianship-estimator",
      "x-default": "https://www.willdrafting.in/tools/minor-child-trust-vs-guardianship-estimator",
    },
  },
  openGraph: {
    title: "Minor Child Inheritance Rules India | WillDrafting.in",
    description:
      "Learn minor child inheritance rules in India. Compare legal guardianship vs testamentary trusts, model staggered payouts, and protect your children.",
    url: "https://www.willdrafting.in/tools/minor-child-trust-vs-guardianship-estimator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/minor-child-trust-vs-guardianship-estimator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Minor Child Trust vs Guardianship Estimator and Inheritance Guide India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minor Child Inheritance Rules India | WillDrafting.in",
    description:
      "Learn minor child inheritance rules in India. Compare legal guardianship vs testamentary trusts, model staggered payouts, and protect your children.",
    images: ["https://www.willdrafting.in/images/minor-child-trust-vs-guardianship-estimator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function MinorChildTrustEstimatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/minor-child-trust-vs-guardianship-estimator";
  const imageUrl = "https://www.willdrafting.in/images/minor-child-trust-vs-guardianship-estimator-og.jpg";

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
        name: "Minor Child Inheritance Rules India | WillDrafting.in",
        description:
          "Learn minor child inheritance rules in India. Compare legal guardianship vs testamentary trusts, model staggered payouts, and protect your children.",
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
            name: "Minor Child Trust vs Guardianship Estimator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Minor Child Trust vs Guardianship Estimator India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive estate planning tool comparing Section 9 HMGA testamentary guardianship vs Indian Trusts Act testamentary private trusts and Section 6 MWP Act life insurance protection for minor children in India.",
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
            name: "Can a minor child directly inherit property and money in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, a minor child can be named as a legal heir or beneficiary in a Will. However, under Section 11 of the Indian Contract Act, 1872, a minor lacks the legal capacity to enter into contracts, operate bank accounts independently, or execute sale deeds. A legal guardian or testamentary trust must manage the assets until the child attains majority.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if both parents pass away without naming a guardian in a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If parents pass away without appointing a testamentary guardian under Section 9 of the Hindu Minority and Guardianship Act, 1956, relatives must petition the District Court under the Guardians and Wards Act, 1890. This court process can take 12 to 24 months, requires court sureties, and may lead to contested family custody battles.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a Testamentary Guardian and a Testamentary Trust?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A testamentary guardian handles the personal care and custody of the child until age 18, but cannot sell immovable property without District Court permission under Section 8 of the HMGA. A testamentary trust, created under the Indian Trusts Act, 1882, holds assets under appointed trustees who can disburse funds smoothly and enforce staggered distributions beyond age 18 without court orders.",
            },
          },
          {
            "@type": "Question",
            name: "Can a legal guardian sell an inherited property to pay for the child's education?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 8(2) of the Hindu Minority and Guardianship Act, 1956 and Section 29 of the Guardians and Wards Act, 1890, a guardian cannot sell, mortgage, or gift any immovable property of the minor without prior permission from the District Court. Obtaining this court order often takes several years.",
            },
          },
          {
            "@type": "Question",
            name: "Why is leaving a lump sum inheritance at age 18 risky for a child?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Indian law, a minor attains majority at 18. Under simple guardianship, the entire estate (including multi-crore life insurance payouts and real estate) must be handed over in full at age 18. Most 18-year-olds lack financial experience, making the corpus vulnerable to impulsive spending, peer pressure, or predatory relatives.",
            },
          },
          {
            "@type": "Question",
            name: "What is Section 6 of the Married Women's Property Act (MWP Act)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 6 of the MWP Act, 1874 allows a married person to take a life insurance policy specifically for the benefit of their spouse and/or children. The policy proceeds create an immediate trust, operate outside the gross estate, and cannot be attached by business creditors, lenders, or court execution decrees.",
            },
          },
          {
            "@type": "Question",
            name: "How does a staggered payout schedule work in a Testamentary Will Trust?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A staggered payout schedule releases portions of the inheritance at key life milestones rather than all at once. For example: 15% at age 18 for college admissions, 25% at age 21 for graduation, 30% at age 25 for career or marriage, and the remaining 30% at age 30 once mature.",
            },
          },
          {
            "@type": "Question",
            name: "Can the Guardian and the Financial Trustee be two different people?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, and estate planners strongly recommend this segregation of powers. Appointing one trusted relative as the custodial guardian (to raise the child) and an independent person or institutional trustee as financial trustee ensures robust checks and balances, preventing fund misuse.",
            },
          },
          {
            "@type": "Question",
            name: "Does a testamentary trust created inside a Will need immediate registration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A testamentary trust is created through specific clauses inside a Will. It does not exist during your lifetime and requires no separate trust registration or annual tax returns while you are alive. It springs into legal existence only upon the demise of the testator and probate or execution of the Will.",
            },
          },
          {
            "@type": "Question",
            name: "How are the assets and income of a minor's testamentary trust taxed in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 161 of the Income Tax Act, 1961, trustees are taxed as representative assessees. If the trust is a specific (determinate) trust created by Will exclusively for the benefit of minor children, income is taxed at the individual progressive slab rates of the beneficiary, rather than the Maximum Marginal Rate (MMR).",
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
        <MinorChildTrustEstimatorClient />
        <Footer />
      </div>
    </>
  );
}
