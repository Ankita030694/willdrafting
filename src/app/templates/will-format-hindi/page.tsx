import React from "react";
import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatHindiClient from "./WillFormatHindiClient";
import {
  PAGE_URL,
  ENGLISH_PAGE_URL,
  OG_IMAGE_URL,
  SEO_TITLE,
  SEO_DESCRIPTION,
  FAQS,
  HOWTO_STEPS,
} from "./willFormatHindiData";

// The root layout only loads Plus Jakarta Sans (Latin subset). Load a dedicated
// Devanagari face so Hindi copy renders crisply instead of falling back to the OS font.
const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "वसीयतनामा फॉर्मेट",
    "will format in hindi",
    "vasiyat nama format",
    "वसीयत कैसे लिखें",
    "will format in hindi pdf",
    "वसीयतनामा का नमूना",
    "वसीयत का प्रारूप",
    "हिंदी में वसीयत",
    "धारा 63 भारतीय उत्तराधिकार अधिनियम",
    "सादे कागज़ पर वसीयत",
    "वसीयत के लिए गवाह",
    "vasiyatnama format in hindi",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "hi-IN": PAGE_URL,
      "en-IN": ENGLISH_PAGE_URL,
      "x-default": ENGLISH_PAGE_URL,
    },
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: PAGE_URL,
    siteName: "WillDrafting.in",
    locale: "hi_IN",
    alternateLocale: ["en_IN"],
    type: "article",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "वसीयतनामा फॉर्मेट: धारा 63 और दो गवाहों के साथ हिंदी वसीयत का नमूना",
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

export default function WillFormatHindiPage() {
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
        inLanguage: "hi-IN",
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
            name: "होम",
            item: "https://www.willdrafting.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "टेम्पलेट",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "वसीयतनामा फॉर्मेट (हिंदी)",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${PAGE_URL}#howto`,
        name: "हिंदी में कानूनी रूप से मान्य वसीयत कैसे लिखें",
        description:
          "भारतीय उत्तराधिकार अधिनियम, 1925 की धारा 63 के अनुसार सादे कागज़ पर हिंदी में वसीयत लिखने और दो गवाहों के सामने हस्ताक्षर करने की चरण-दर-चरण प्रक्रिया।",
        inLanguage: "hi-IN",
        image: OG_IMAGE_URL,
        totalTime: "PT15M",
        supply: [
          { "@type": "HowToSupply", name: "सादा सफ़ेद A4 कागज़ (स्टाम्प पेपर ज़रूरी नहीं)" },
          { "@type": "HowToSupply", name: "संपत्ति, बैंक खातों और निवेश की सूची" },
        ],
        tool: [{ "@type": "HowToTool", name: "हस्ताक्षर के लिए पेन" }],
        step: HOWTO_STEPS.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.desc,
          url: `${PAGE_URL}#step-by-step-guide`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        inLanguage: "hi-IN",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      {/* lang="hi" on the page wrapper (root <html> stays "en" for the rest of the site). */}
      <div
        lang="hi"
        className={notoDevanagari.variable}
        style={{
          fontFamily:
            "var(--font-jakarta), var(--font-devanagari), 'Noto Sans Devanagari', 'Mangal', sans-serif",
        }}
      >
        <WillFormatHindiClient />
      </div>
      <Footer />
    </>
  );
}
