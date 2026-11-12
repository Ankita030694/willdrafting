import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MpVarisanPanchnamaClient from "./MpVarisanPanchnamaClient";

const CANONICAL_URL =
  "https://www.willdrafting.in/templates/madhya-pradesh-varisan-panchnama-affidavit-format";
const OG_IMAGE_URL =
  "https://www.willdrafting.in/images/madhya-pradesh-varisan-panchnama-affidavit-format-og.jpg";
const PAGE_TITLE = "MP Varisan Panchnama Affidavit Format | WillDrafting";
const PAGE_DESCRIPTION =
  "Download free MP Varisan Panchnama affidavit format for Khasra Namantaran on RCMS portal. Complete Hindi draft for Patwari and Tehsildar approval.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  keywords: [
    "mp varisan panchnama affidavit format",
    "madhya pradesh fauti namantaran panchnama format",
    "patwari varisan panchnama format mp",
    "rcms mp legal heir affidavit sample",
    "section 109 mplrc affidavit format hindi",
    "5 panch varisan panchnama mp",
  ],
  authors: [{ name: "Advocate Anuj Anand Malik" }],
  creator: "WillDrafting Legal Team",
  publisher: "WillDrafting.in",
  category: "Legal Templates",
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      "en-IN": CANONICAL_URL,
      "x-default": CANONICAL_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 675,
        alt: "MP Varisan Panchnama and Fauti Namantaran Affidavit Format",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function MpVarisanPanchnamaAffidavitFormatPage() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.willdrafting.in/#organization",
        name: "WillDrafting.in",
        url: "https://www.willdrafting.in",
        logo: {
          "@type": "ImageObject",
          url: "https://www.willdrafting.in/willdrafting_official_logo.png",
        },
        sameAs: [
          "https://x.com/willdrafting",
          "https://www.linkedin.com/company/willdrafting",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": "https://www.willdrafting.in/#organization",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
          width: 1200,
          height: 675,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL_URL}#breadcrumb`,
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
            name: "MP Varisan Panchnama Affidavit Format",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${CANONICAL_URL}#article`,
        headline: "MP Varisan Panchnama Format and RCMS Mutation Affidavit",
        description: PAGE_DESCRIPTION,
        image: OG_IMAGE_URL,
        inLanguage: ["en-IN", "hi-IN"],
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Founder and Legal Reviewer",
        },
        publisher: {
          "@id": "https://www.willdrafting.in/#organization",
        },
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        mainEntityOfPage: {
          "@id": `${CANONICAL_URL}#webpage`,
        },
        about: [
          "Madhya Pradesh Land Revenue Code 1959 Section 109 and 110",
          "Fauti Namantaran Varisan Panchnama",
          "MP Revenue Case Management System RCMS",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${CANONICAL_URL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Why does a Patwari demand 5 Panch signatures on a Varisan Panchnama in Madhya Pradesh?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Patwari visits your village under Section 110 of the MP Land Revenue Code. Five neutral local residents and the Gram Kotwar sign to prove the death date, land hold, and true heir list. This stops fraud or hidden claims.",
            },
          },
          {
            "@type": "Question",
            name: "What e-Stamp value is required for the MP Fauti Namantaran Section 109 affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the MP Stamp Amendment Act 2025 (Article 4), you need a Rs 200 e-Stamp from SAMPADA 2.0. Older Rs 50 stamps are out of date. Get the form signed by a Notary before upload.",
            },
          },
          {
            "@type": "Question",
            name: "Must married daughters be included in the MP Varisan Panchnama and Section 109 affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. By law, married daughters hold equal rights as sons in family land. Leaving a sister out makes your oath false. Your file can face rejection or a Section 44 appeal before the SDO.",
            },
          },
          {
            "@type": "Question",
            name: "Can an unregistered stamp paper consent remove a daughter's name in Fauti Namantaran?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Plain stamp paper cannot pass land rights worth over Rs 100. Either put all heirs on the record first, or sign a registered Haq Tyag deed at the Sub-Registrar office.",
            },
          },
          {
            "@type": "Question",
            name: "What is the time limit to report Fauti Namantaran under Section 109 MPLRC?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Heirs must report the death to the Patwari or on MP RCMS within 6 months. Late filing can draw a fine of up to Rs 500 under Section 109(2).",
            },
          },
          {
            "@type": "Question",
            name: "How many days does Tehsildar approval take after Patwari Panchnama upload on RCMS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Clean cases follow a 30 work-day limit under the MP Lok Seva law. This period covers the 15-to-30 day public Ishtehar notice for claims or objections.",
            },
          },
          {
            "@type": "Question",
            name: "Can Fauti Namantaran on RCMS proceed on the basis of an unregistered Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, if no legal heir objects after the Ishtehar notice. If a sister or brother contests the Will, the Tehsildar stops the file. Only a Civil Court can rule on a disputed Will.",
            },
          },
          {
            "@type": "Question",
            name: "Who cannot act as one of the 5 Panch witnesses on the MP Varisan Panchnama?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Blood relatives, heirs on the list, co-owners of the same plot, and minors cannot sign as Panch witnesses. Pick five unrelated adult neighbors from the same village or ward.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <Navbar />
      <MpVarisanPanchnamaClient />
      <Footer />
    </div>
  );
}
