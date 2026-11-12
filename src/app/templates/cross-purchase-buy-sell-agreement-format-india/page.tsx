import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CrossPurchaseBuySellClient from "./CrossPurchaseBuySellClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Cross-Purchase Buy-Sell Agreement India | WillDrafting", // exactly 54 characters
  },
  description:
    "Download cross-purchase buy-sell agreement format for business partners in India. Includes Rule 11UA valuation, Keyman escrow & Companies Act rules.", // exactly 148 characters
  keywords: [
    "buy sell agreement between business partners format india",
    "cross purchase buy sell agreement template",
    "business partner death share transfer agreement draft",
    "keyman insurance funded buy sell agreement format",
    "rule 11ua valuation buy sell agreement india",
    "section 56 form sh4 share transfer deceased partner",
    "section 58 companies act 2013 private company transfer restriction",
    "section 37 indian partnership act deceased partner profit share",
    "section 10 10d vs section 28 vi keyman insurance taxability",
    "co founder buyout agreement format pvt ltd india",
    "irrevocable life insurance trust escrow buy sell india",
    "ama legal solutions corporate business succession lawyer",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/templates/cross-purchase-buy-sell-agreement-format-india",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/templates/cross-purchase-buy-sell-agreement-format-india",
      "x-default":
        "https://www.willdrafting.in/templates/cross-purchase-buy-sell-agreement-format-india",
    },
  },
  openGraph: {
    title: "Cross-Purchase Buy-Sell Agreement India | WillDrafting",
    description:
      "Download cross-purchase buy-sell agreement format for business partners in India. Includes Rule 11UA valuation, Keyman escrow & Companies Act rules.",
    url: "https://www.willdrafting.in/templates/cross-purchase-buy-sell-agreement-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/cross-purchase-buy-sell-agreement-format-india-og.jpg",
        width: 1200,
        height: 675,
        alt: "Cross-Purchase Buy-Sell Agreement Format for Business Partners in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Cross-Purchase Buy-Sell Agreement India | WillDrafting",
    description:
      "Download cross-purchase buy-sell agreement format for business partners in India. Includes Rule 11UA valuation, Keyman escrow & Companies Act rules.",
    images: [
      "https://www.willdrafting.in/images/cross-purchase-buy-sell-agreement-format-india-og.jpg",
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

export default function CrossPurchaseBuySellAgreementPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/cross-purchase-buy-sell-agreement-format-india";
  const imageUrl =
    "https://www.willdrafting.in/images/cross-purchase-buy-sell-agreement-format-india-og.jpg";

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
        name: "Cross-Purchase Buy-Sell Agreement India | WillDrafting",
        description:
          "Download cross-purchase buy-sell agreement format for business partners in India. Includes Rule 11UA valuation, Keyman escrow & Companies Act rules.",
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
            name: "Templates",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Cross-Purchase Buy-Sell Agreement Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#article`,
        headline: "Buy-Sell Agreement Format for Business Partners in India",
        name: "Cross-Purchase Buy-Sell Agreement Format India",
        url: canonicalUrl,
        description:
          "Lawyer-vetted cross-purchase buy-sell agreement format for Indian business partners and co-founders with Rule 11UA valuation, Keyman insurance trust escrow, and Companies Act Section 56 and 58 alignment.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        image: imageUrl,
        inLanguage: "en-IN",
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          url: "https://www.linkedin.com/in/iamanujmalik/",
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a Cross-Purchase Buy-Sell Agreement between business partners in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Cross-Purchase Buy-Sell Agreement is a binding contract among co-founders or partners. If one partner dies, becomes disabled, or retires, the surviving partners agree to buy the outgoing partner's shares or capital stake at an agreed price formula, while the estate agrees to sell.",
            },
          },
          {
            "@type": "Question",
            name: "Why is Keyman Insurance taxable if used directly to fund a partner buyout?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 10(10D)(b) and Section 28(vi) of the Income Tax Act, 1961, payouts received under a company-owned Keyman Insurance Policy are fully taxable as business income. Routing cross-purchase term policies through an Irrevocable Life Insurance Trust Escrow keeps death payouts tax-free under Section 10(10D).",
            },
          },
          {
            "@type": "Question",
            name: "Must a Buy-Sell Agreement be added to the Private Limited Company's Articles of Association?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 58(1) of the Companies Act, 2013 and the Supreme Court ruling in V.B. Rangaraj v. V.B. Gopalakrishnan, share transfer restrictions in a private company bind the Board only when embedded in the Articles of Association (AoA) via a special resolution.",
            },
          },
          {
            "@type": "Question",
            name: "How does Rule 11UA affect the share buyout price in a Buy-Sell Agreement?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rule 11UA of the Income Tax Rules prescribes the Fair Market Value (FMV) floor for unquoted shares. If surviving partners buy a deceased partner's shares below Rule 11UA FMV, Section 56(2)(x) taxes the buyer on the discount and Section 50CA taxes the estate on deemed FMV.",
            },
          },
          {
            "@type": "Question",
            name: "What happens under Section 37 of the Indian Partnership Act without a Buy-Sell pact?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 42(c) of the Indian Partnership Act, 1932, a firm dissolves on a partner's death unless agreed otherwise. If survivors continue business without settling accounts, Section 37 lets the deceased partner's heirs demand either subsequent business profits or 6% annual interest.",
            },
          },
          {
            "@type": "Question",
            name: "Does a share nomination under Section 72 override a Cross-Purchase Buy-Sell Agreement?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. In Shakti Yezdani v. Jayanand Salgaonkar (2023), the Supreme Court held that a Section 72 nominee only holds shares temporarily in trust after death. The nominee cannot defeat the deceased owner's Will or an AoA-backed Cross-Purchase Buy-Sell obligation.",
            },
          },
          {
            "@type": "Question",
            name: "What forms and stamp duty apply when transferring a deceased partner's Pvt Ltd shares?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "First, the deceased partner's legal heirs transmit the shares into their names under Section 56(2) with a death certificate and succession proof. Next, the heirs and surviving partners sign Form SH-4 stamped at 0.015% of share consideration under Article 62 of the Indian Stamp Act, 1899.",
            },
          },
          {
            "@type": "Question",
            name: "How many life insurance policies are needed in a 3-founder Cross-Purchase plan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In a pure cross-purchase setup without an escrow trust, N partners need N multiplied by (N minus 1) policies, so 3 founders need 6 separate policies. Using one Irrevocable Life Insurance Trust Escrow reduces this to just 1 policy per partner, cutting admin hassle.",
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
        <CrossPurchaseBuySellClient />
        <Footer />
      </div>
    </>
  );
}
