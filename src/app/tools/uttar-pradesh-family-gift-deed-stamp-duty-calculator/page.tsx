import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpGiftDeedCalculatorClient from "./UpGiftDeedCalculatorClient";

// Screaming Frog Rules: Title 50-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "UP Family Gift Deed Stamp Duty Calculator | WillDrafting", // 56 characters
  },
  description:
    "Check eligibility and calculate UP ₹5,000 flat stamp duty on family Gift Deeds in Noida, Lucknow, and UP. Verify blood-relative and IGRSUP rules.", // 145 characters (0 HTML entity expansion)
  keywords: [
    "up family gift deed 5000 stamp duty calculator",
    "uttar pradesh gift deed stamp duty blood relative",
    "igrs up 5000 gift deed scheme",
    "up property transfer to son daughter fee",
    "noida flat gift deed stamp duty 5000",
    "lucknow gift deed stamp duty family member",
    "up commercial shop gift deed 5000 notification 2026",
    "igrsup gift deed registration fee processing fee",
    "indian stamp act 1899 up article 33 gift deed",
    "uttar pradesh blood relative gift deed eligibility",
    "noida authority transfer memorandum gift deed",
    "willdrafting uttar pradesh stamp duty calculator",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "UP Family Gift Deed Stamp Duty Calculator | WillDrafting",
    description:
      "Check eligibility and calculate UP ₹5,000 flat stamp duty on family Gift Deeds in Noida, Lucknow, and UP. Verify blood-relative and IGRSUP rules.",
    url: "https://www.willdrafting.in/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/uttar-pradesh-family-gift-deed-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "UP Family Gift Deed ₹5,000 Stamp Duty Calculator and IGRSUP Registration Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "UP Family Gift Deed Stamp Duty Calculator | WillDrafting",
    description:
      "Check eligibility and calculate UP ₹5,000 flat stamp duty on family Gift Deeds in Noida, Lucknow, and UP. Verify blood-relative and IGRSUP rules.",
    images: [
      "https://www.willdrafting.in/images/uttar-pradesh-family-gift-deed-stamp-duty-calculator-og.jpg",
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

export default function UttarPradeshFamilyGiftDeedCalculatorPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/uttar-pradesh-family-gift-deed-stamp-duty-calculator-og.jpg";

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
        name: "UP Family Gift Deed Stamp Duty Calculator | WillDrafting",
        description:
          "Check eligibility and calculate UP ₹5,000 flat stamp duty on family Gift Deeds in Noida, Lucknow, and UP. Verify blood-relative and IGRSUP rules.",
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
            name: "UP Family Gift Deed Stamp Duty Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "UP Family Gift Deed Stamp Duty Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free calculator to check UP ₹5,000 flat stamp duty eligibility on family Gift Deeds, compare standard 7% urban and 5% rural rates, and verify IGRSUP fees.",
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
            name: "Does UP's ₹5,000 flat stamp duty apply to Noida and Lucknow flats?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under UP Stamp and Registration Notification No. 18/2023/995 dated August 3, 2023, residential flats, houses, plots, and agricultural land gifted between eligible blood relatives in Noida, Greater Noida, Lucknow, Ghaziabad, and across UP attract a maximum stamp duty of ₹5,000. For leasehold Noida flats, you must also apply for a Noida Authority Transfer Memorandum.",
            },
          },
          {
            "@type": "Question",
            name: "Are commercial shops and industrial plots covered under the UP ₹5,000 gift deed scheme?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Initially, the August 3, 2023 UP order covered only residential and agricultural property. Following the UP Cabinet decision on January 6, 2026, Notification No. 01/2026/26 dated January 8, 2026 expanded the ₹5,000 flat stamp duty cap to commercial shops, offices, and industrial properties gifted among eligible family members.",
            },
          },
          {
            "@type": "Question",
            name: "Which blood relatives qualify for the ₹5,000 gift deed stamp duty in Uttar Pradesh?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The UP notification covers 13 close relations between natural persons: father, mother, husband, wife, son, daughter, son-in-law, daughter-in-law, real brother, real sister, widow of a deceased real brother, grandson, and granddaughter (children of a son or daughter). Uncles, aunts, nephews, nieces, cousins, and parents-in-law do not qualify.",
            },
          },
          {
            "@type": "Question",
            name: "What other government fees apply besides the ₹5,000 stamp duty on IGRSUP?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Alongside the ₹5,000 flat stamp duty, UP levies a ₹1,000 processing fee, bringing the base stamp and processing charge to ₹6,000. Under Section 78 of the Registration Act in UP, a separate 1% registration fee on the circle rate may also be computed on the IGRSUP portal depending on SRO challan rules. Always verify the exact challan on igrsup.gov.in before paying.",
            },
          },
          {
            "@type": "Question",
            name: "What is the 5-year lock-in rule on UP concessional family gift deeds?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both the August 2023 and January 2026 UP notifications bar re-gifting within 5 years. If a recipient acquires property using the ₹5,000 family gift concession and gifts that same property again within 5 years of registration, the concession does not apply to the second transfer and full standard stamp duty becomes payable.",
            },
          },
          {
            "@type": "Question",
            name: "Can a company, firm, trust, or HUF use UP's ₹5,000 gift deed concession?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The UP Stamp and Registration notification applies strictly to gifts from one natural person (individual) to another natural person. If either the donor or the donee is a private limited company, partnership firm, LLP, trust, society, or institution, standard 7% urban or 5% rural stamp duty applies.",
            },
          },
          {
            "@type": "Question",
            name: "Is income tax payable when a parent gifts a UP flat to a son or daughter?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 56(2)(x) of the Income Tax Act, 1961, receiving immovable property as a gift from specified relatives such as parents, children, spouses, or siblings is 100% exempt from income tax. However, if a husband gifts a rented flat to his wife or a parent gifts to a daughter-in-law, future rental income is clubbed in the donor's tax return under Section 64.",
            },
          },
          {
            "@type": "Question",
            name: "Should UP parents transfer a house via a ₹5,000 Gift Deed or a Registered Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Gift Deed transfers ownership right away and is normally irrevocable under Section 126 of the Transfer of Property Act. A Registered Will costs zero stamp duty, lets you keep 100% lifetime control, and can be changed anytime. Senior citizens who choose a Gift Deed should add an express Section 23 maintenance clause to protect against neglect.",
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
        <UpGiftDeedCalculatorClient />
        <Footer />
      </div>
    </>
  );
}
