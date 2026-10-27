import React from "react";
import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatMarathiClient from "./WillFormatMarathiClient";
import {
  PAGE_URL,
  ENGLISH_PAGE_URL,
  HINDI_PAGE_URL,
  OG_IMAGE_URL,
  SEO_TITLE,
  SEO_DESCRIPTION,
  FAQS,
} from "./marathiWillData";

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "मृत्यूपत्र फॉरमॅट मराठी",
    "will format in marathi",
    "mrutyupatra sample in marathi pdf",
    "इच्छापत्र नमुना मराठी",
    "how to write will in marathi maharashtra",
    "मृत्यूपत्र नमुना",
    "साध्या कागदावर मृत्यूपत्र मराठी",
    "मृत्यूपत्र नोंदणी नियम महाराष्ट्र",
    "section 63 indian succession act marathi",
    "इच्छापत्र कसे लिहावे",
    "ama legal solutions will format marathi",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "mr-IN": PAGE_URL,
      "en-IN": ENGLISH_PAGE_URL,
      "hi-IN": HINDI_PAGE_URL,
      "x-default": ENGLISH_PAGE_URL,
    },
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: PAGE_URL,
    siteName: "WillDrafting.in",
    locale: "mr_IN",
    alternateLocale: ["en_IN", "hi_IN"],
    type: "article",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "मृत्यूपत्र फॉरमॅट मराठी: भारतीय वारसा कायदा कलम ६३ नुसार कायदेशीर नमुना",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillFormatMarathiPage() {
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
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: SEO_TITLE,
        description: SEO_DESCRIPTION,
        inLanguage: "mr-IN",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "मुख्यपृष्ठ",
            item: "https://www.willdrafting.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "टेम्पलेट्स",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "मृत्यूपत्र फॉरमॅट मराठी",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${PAGE_URL}#document`,
        name: "मृत्यूपत्र फॉरमॅट मराठी (Will Format in Marathi)",
        headline: "मृत्यूपत्र फॉरमॅट मराठी: कायदेशीर नमुना व नियम",
        description: SEO_DESCRIPTION,
        inLanguage: "mr-IN",
        image: OG_IMAGE_URL,
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
        datePublished: "2026-10-27",
        dateModified: "2026-10-27",
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <div className={`min-h-screen bg-[#FAF7F0] text-[#172228] antialiased ${notoDevanagari.variable}`}>
        <Navbar />
        <WillFormatMarathiClient />
        <Footer />
      </div>
    </>
  );
}
