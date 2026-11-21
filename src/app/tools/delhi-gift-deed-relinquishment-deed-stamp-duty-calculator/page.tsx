import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DelhiGiftRelinquishmentClient from "./DelhiGiftRelinquishmentClient";

export const metadata: Metadata = {
  title: {
    absolute: "Delhi Gift & Relinquishment Stamp Duty Tool | WillDrafting",
  },
  description:
    "Calculate Delhi stamp duty for Gift Deeds (4% women, 6% men) vs Relinquishment Deeds for legal heirs. Compare circle rate, MCD & DORIS fees.",
  keywords: [
    "delhi gift deed relinquishment deed stamp duty calculator",
    "relinquishment deed stamp duty delhi",
    "gift deed stamp duty delhi female male",
    "doris delhi property transfer duty",
    "mcd transfer duty delhi gift deed",
    "delhi circle rate categories a to h",
    "ngdrs delhi appointment relinquishment deed",
    "indian stamp act 1899 delhi schedule ia",
    "dda flat gift deed vs relinquishment deed",
    "relinquishment deed registration fee delhi",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "Delhi Gift & Relinquishment Stamp Duty Tool | WillDrafting",
    description:
      "Calculate Delhi stamp duty for Gift Deeds (4% women, 6% men) vs Relinquishment Deeds for legal heirs. Compare circle rate, MCD & DORIS fees.",
    url: "https://www.willdrafting.in/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Delhi Gift Deed vs Relinquishment Deed Stamp Duty Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Delhi Gift & Relinquishment Stamp Duty Tool | WillDrafting",
    description:
      "Calculate Delhi stamp duty for Gift Deeds (4% women, 6% men) vs Relinquishment Deeds for legal heirs. Compare circle rate, MCD & DORIS fees.",
    images: [
      "https://www.willdrafting.in/images/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator-og.jpg",
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

export default function DelhiGiftRelinquishmentStampDutyPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator-og.jpg";

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
        name: "Delhi Gift & Relinquishment Stamp Duty Tool | WillDrafting",
        description:
          "Calculate Delhi stamp duty for Gift Deeds (4% women, 6% men) vs Relinquishment Deeds for legal heirs. Compare circle rate, MCD & DORIS fees.",
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
            name: "Delhi Gift & Relinquishment Stamp Duty Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Delhi Gift Deed vs Relinquishment Deed Stamp Duty Calculator",
        url: canonicalUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        description:
          "Free Delhi stamp duty comparator for Gift Deeds (4% women, 6% men + 1% MCD transfer duty) vs Relinquishment Deeds (flat Rs 100 to Rs 200) among co-heirs.",
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
            name: "What is the stamp duty on a Gift Deed in Delhi for men and women?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Delhi, a Gift Deed attracts full conveyance stamp duty with no blood-relative exemption. The base rate is 4% if the recipient is a woman, 6% if the recipient is a man, and 5% for joint male-female ownership, plus 1% MCD transfer duty for properties above Rs 25 lakh and 1% registration fee.",
            },
          },
          {
            "@type": "Question",
            name: "How much is the Relinquishment Deed stamp duty in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Relinquishment Deed among existing co-owners or legal co-heirs with zero monetary payment attracts a flat stamp duty of Rs 100 to Rs 200 on an e-stamp paper, plus a Rs 1,000 registration fee and Rs 100 pasting charge at the Delhi Sub-Registrar office.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use a Relinquishment Deed to transfer my self-acquired DDA flat to my wife?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. If you are the sole living owner of a self-acquired DDA flat, your wife is not yet a co-owner. A Relinquishment Deed only works between existing co-owners. To transfer your flat to your wife during your lifetime, you must execute a registered Gift Deed and pay 4% women stamp duty plus MCD and registration fees.",
            },
          },
          {
            "@type": "Question",
            name: "When does a Relinquishment Deed get reclassified as a Gift Deed in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Delhi Sub-Registrar reclassifies a Relinquishment Deed as a Gift Deed or Sale Deed if money changes hands, or if a share is released in favour of a person who is not already a legal co-owner or co-heir of the property.",
            },
          },
          {
            "@type": "Question",
            name: "How are Delhi Circle Rates (Categories A to H) used for Gift Deeds?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Delhi divides colonies into Categories A to H with fixed per-square-metre land rates. For a Gift Deed, stamp duty is charged on the higher of the declared value or the official Delhi Circle Rate for that colony and floor.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between DORIS and NGDRS in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "DORIS Delhi is used to search older registered property deeds from 2005 to January 2024. NGDRS Delhi is the active portal used for online deed data entry, SHCIL e-stamp verification, and booking Sub-Registrar appointments.",
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
        <DelhiGiftRelinquishmentClient />
        <Footer />
      </div>
    </>
  );
}
