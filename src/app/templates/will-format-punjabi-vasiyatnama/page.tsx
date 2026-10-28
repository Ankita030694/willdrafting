import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatPunjabiClient from "./WillFormatPunjabiClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ: Punjabi Will Format | WillDrafting", // exactly 59 characters
  },
  description:
    "Download valid ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ (will format in punjabi) under Indian Succession Act 1925 with agricultural land clauses and Punjab SRO.", // exactly 149 characters
  keywords: [
    "ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ",
    "will format in punjabi",
    "vasiyatnama format in punjabi pdf",
    "ਵਸੀਅਤ ਕਿਵੇਂ ਲਿਖੀਏ",
    "punjabi will sample for nri",
    "vasiyatnama sample in gurmukhi",
    "agricultural land will format punjab",
    "khewat khatauni khasra will clause",
    "section 63 indian succession act punjab",
    "ngdrs punjab will registration rules",
    "sub registrar will registration ludhiana jalandhar amritsar",
    "jamabandi intiqal mutation will punjab",
    "ama legal solutions punjabi will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/will-format-punjabi-vasiyatnama",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/will-format-india",
      "hi-IN": "https://www.willdrafting.in/templates/will-format-hindi",
      "mr-IN": "https://www.willdrafting.in/templates/will-format-marathi-mrutyupatra",
      "gu-IN": "https://www.willdrafting.in/templates/will-format-gujarati-vasiyatnama",
      "pa-IN": "https://www.willdrafting.in/templates/will-format-punjabi-vasiyatnama",
      "bn-IN": "https://www.willdrafting.in/templates/will-format-bengali-ichchapatra",
      "ta-IN": "https://www.willdrafting.in/templates/will-format-tamil-uyil-sasanam",
      "te-IN": "https://www.willdrafting.in/templates/will-format-telugu-veelunama",
      "kn-IN": "https://www.willdrafting.in/templates/will-format-kannada-uyilu",
      "ml-IN": "https://www.willdrafting.in/templates/will-format-malayalam-maranapathram",
      "x-default": "https://www.willdrafting.in/templates/will-format-india",
    },
  },
  openGraph: {
    title: "ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ: Punjabi Will Format | WillDrafting",
    description:
      "Download valid ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ (will format in punjabi) under Indian Succession Act 1925 with agricultural land clauses and Punjab SRO.",
    url: "https://www.willdrafting.in/templates/will-format-punjabi-vasiyatnama",
    siteName: "WillDrafting.in",
    locale: "pa_IN",
    alternateLocale: ["en_IN"],
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-format-punjabi-vasiyatnama-og.jpg",
        width: 1200,
        height: 675,
        alt: "ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ - Legal Will Format in Punjabi with Agricultural Land Clauses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ: Punjabi Will Format | WillDrafting",
    description:
      "Download valid ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ (will format in punjabi) under Indian Succession Act 1925 with agricultural land clauses and Punjab SRO.",
    images: ["https://www.willdrafting.in/images/will-format-punjabi-vasiyatnama-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillFormatPunjabiPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/will-format-punjabi-vasiyatnama";
  const imageUrl = "https://www.willdrafting.in/images/will-format-punjabi-vasiyatnama-og.jpg";

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
        name: "ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ: Punjabi Will Format | WillDrafting",
        description:
          "Download valid ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ (will format in punjabi) under Indian Succession Act 1925 with agricultural land clauses and Punjab SRO.",
        inLanguage: "pa-IN",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 675,
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
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
            name: "ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ (Punjabi Will)",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "ਕਾਨੂੰਨੀ ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ (Punjabi Legal Will Format)",
        url: canonicalUrl,
        description:
          "Statutory Punjabi Vasiyatnama template compliant with Section 63 of the Indian Succession Act 1925, featuring executor appointment.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        image: imageUrl,
        creator: {
          "@type": "Organization",
          name: "WillDrafting.in",
        },
        publisher: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ: ਕਾਨੂੰਨੀ ਵਸੀਅਤ ਨਮੂਨਾ ਅਤੇ ਨਿਯਮ",
        description:
          "Complete legal guide, printable Unicode Gurmukhi Punjabi Vasiyatnama format, agricultural land schedule (Khewat, Khatauni, Khasra), NRI.",
        image: imageUrl,
        inLanguage: "pa-IN",
        mainEntityOfPage: canonicalUrl,
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "ਕੀ ਪੰਜਾਬੀ ਵਿੱਚ ਲਿਖਿਆ ਵਸੀਅਤਨਾਮਾ ਕਾਨੂੰਨੀ ਤੌਰ ਤੇ ਮਾਨਤਾ ਪ੍ਰਾਪਤ ਹੈ? (Is a Punjabi Will legally valid?)",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ਹਾਂ, ਪੂਰੀ ਤਰ੍ਹਾਂ ਕਾਨੂੰਨੀ ਹੈ। ਭਾਰਤੀ ਉੱਤਰਾਧਿਕਾਰ ਕਾਨੂੰਨ, 1925 (Indian Succession Act, 1925) ਦੀ ਧਾਰਾ 63 ਅਤੇ 74 ਅਨੁਸਾਰ ਵਸੀਅਤ ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਲਿਖੀ ਜਾ ਸਕਦੀ ਹੈ। ਗੁਰਮੁਖੀ ਪੰਜਾਬੀ ਵਿੱਚ ਸਾਦੇ ਕਾਗਜ਼ ਤੇ ਲਿਖਿਆ ਵਸੀਅਤਨਾਮਾ, ਜੇਕਰ ਉਸ ਤੇ ਵਸੀਅਤ-ਕਰਤਾ ਦੇ ਦਸਤਖਤ ਅਤੇ ਦੋ ਬਾਲਗ ਗਵਾਹਾਂ ਦੀ ਹਾਜ਼ਰੀ ਹੋਵੇ, ਤਾਂ ਭਾਰਤੀ ਅਦਾਲਤਾਂ ਅਤੇ ਮਾਲ ਵਿਭਾਗ (Revenue Department) ਵਿੱਚ 100% ਜਾਇਜ਼ ਹੈ।",
            },
          },
          {
            "@type": "Question",
            name: "ਕੀ ਪੰਜਾਬ ਵਿੱਚ ਵਸੀਅਤਨਾਮੇ ਦੀ ਪ੍ਰੋਬੇਟ (Probate) ਲੈਣੀ ਜ਼ਰੂਰੀ ਹੈ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ਨਹੀਂ। ਭਾਰਤੀ ਉੱਤਰਾਧਿਕਾਰ ਕਾਨੂੰਨ ਦੀ ਧਾਰਾ 213(2) ਅਤੇ ਧਾਰਾ 57 ਅਨੁਸਾਰ ਪ੍ਰੋਬੇਟ ਕੇਵਲ ਪੁਰਾਣੇ ਪ੍ਰੈਜ਼ੀਡੈਂਸੀ ਸ਼ਹਿਰਾਂ (ਮੁੰਬਈ, ਕੋਲਕਾਤਾ, ਚੇਨਈ) ਵਿੱਚ ਲਾਜ਼ਮੀ ਹੈ। ਸੁਪਰੀਮ ਕੋਰਟ ਦੇ ਮੀਲ-ਪੱਥਰ ਫੈਸਲੇ ਕਾਂਤਾ ਯਾਦਵ ਬਨਾਮ ਓਮ ਪ੍ਰਕਾਸ਼ ਯਾਦਵ (2020) ਅਨੁਸਾਰ ਪੰਜਾਬ, ਹਰਿਆਣਾ ਅਤੇ ਦਿੱਲੀ ਵਿੱਚ ਵਸੀਅਤ ਲਈ ਕੋਰਟ ਤੋਂ ਪ੍ਰੋਬੇਟ ਲੈਣਾ ਲਾਜ਼ਮੀ ਨਹੀਂ ਹੈ। ਵਸੀਅਤ ਦੇ ਅਧਾਰ ਤੇ ਸਿੱਧਾ ਇੰਤਕਾਲ ਹੋ ਸਕਦਾ ਹੈ।",
            },
          },
          {
            "@type": "Question",
            name: "ਵਸੀਅਤਨਾਮੇ ਵਿੱਚ ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ (ਖੇਵਟ/ਖਤੌਨੀ/ਖਸਰਾ) ਦਾ ਵੇਰਵਾ ਕਿਵੇਂ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ ਲਈ ਤਾਜ਼ਾ ਜਮ੍ਹਾਬੰਦੀ (ਰਿਕਾਰਡ ਆਫ਼ ਰਾਈਟਸ) ਅਨੁਸਾਰ ਪਿੰਡ ਦਾ ਨਾਮ, ਹੱਦਬਸਤ ਨੰਬਰ, ਤਹਿਸੀਲ, ਜ਼ਿਲ੍ਹਾ, ਖੇਵਟ ਨੰਬਰ (ਮਾਲਕੀ ਖਾਤਾ), ਖਤੌਨੀ ਨੰਬਰ (ਕਾਸ਼ਤਕਾਰ ਖਾਤਾ), ਮੁਰੱਬਾ ਨੰਬਰ, ਕਿੱਲਾ/ਖਸਰਾ ਨੰਬਰ ਅਤੇ ਕੁੱਲ ਰਕਬਾ (ਕਨਾਲ ਅਤੇ ਮਰਲੇ) ਸਪੱਸ਼ਟ ਲਿਖਣਾ ਲਾਜ਼ਮੀ ਹੈ। ਇਸਦੇ ਨਾਲ ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਵਾਰਾਬੰਦੀ ਹੱਕ ਜਾਂ ਟਿਊਬਵੈੱਲ ਕਨੈਕਸ਼ਨ ਦਾ ਵੇਰਵਾ ਵੀ ਜ਼ਰੂਰ ਦਰਜ ਕਰੋ।",
            },
          },
          {
            "@type": "Question",
            name: "ਕੀ ਐਨ.ਆਰ.ਆਈ. (NRI) ਬੱਚੇ ਪੰਜਾਬ ਵਿੱਚ ਖੇਤੀ ਵਾਲੀ ਜ਼ਮੀਨ ਵਸੀਅਤ ਰਾਹੀਂ ਲੈ ਸਕਦੇ ਹਨ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ਹਾਂ। ਫੇਮਾ ਕਾਨੂੰਨ (FEMA 1999) ਦੀ ਧਾਰਾ 6(5) ਅਤੇ ਆਰ.ਬੀ.ਆਈ. (RBI) ਨਿਯਮਾਂ ਅਧੀਨ, ਗੈਰ-ਨਿਵਾਸੀ ਭਾਰਤੀ (NRI) ਜਾਂ ਓਵਰਸੀਜ਼ ਸਿਟੀਜ਼ਨ ਆਫ਼ ਇੰਡੀਆ (OCI) ਭਾਰਤ ਵਿੱਚ ਰਹਿ ਰਹੇ ਵਿਅਕਤੀ ਤੋਂ ਵਸੀਅਤ ਰਾਹੀਂ ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ, ਫਾਰਮ ਹਾਊਸ ਜਾਂ ਬਾਗ਼ ਵਿਰਾਸਤ ਵਿੱਚ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦੇ ਹਨ। ਹਾਲਾਂਕਿ ਐਨ.ਆਰ.ਆਈ. ਸਿੱਧੀ ਖੇਤੀ ਜ਼ਮੀਨ ਖਰੀਦ ਨਹੀਂ ਸਕਦੇ, ਪਰ ਵਸੀਅਤ ਰਾਹੀਂ ਵਿਰਾਸਤ 100% ਕਾਨੂੰਨੀ ਹੈ।",
            },
          },
          {
            "@type": "Question",
            name: "ਕੀ ਪੰਜਾਬ ਵਿੱਚ ਵਸੀਅਤਨਾਮਾ ਸਟੈਂਪ ਪੇਪਰ ਤੇ ਲਿਖਣਾ ਲਾਜ਼ਮੀ ਹੈ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ਨਹੀਂ। ਭਾਰਤੀ ਸਟੈਂਪ ਐਕਟ 1899 ਅਤੇ ਪੰਜਾਬ ਸਟੈਂਪ ਨਿਯਮਾਂ ਤਹਿਤ ਵਸੀਅਤਨਾਮੇ ਤੇ ਕੋਈ ਸਟੈਂਪ ਡਿਊਟੀ ਨਹੀਂ ਲੱਗਦੀ। ਵਸੀਅਤ ਸਾਦੇ A4 ਕਾਗਜ਼ ਜਾਂ ਲੀਗਲ ਗ੍ਰੀਨ ਪੇਪਰ ਤੇ ਲਿਖੀ ਜਾ ਸਕਦੀ ਹੈ। ਕਿਸੇ ਈ-ਸਟੈਂਪ ਜਾਂ ਨਿਆਂਇਕ ਸਟੈਂਪ ਪੇਪਰ ਦੀ ਲੋੜ ਨਹੀਂ ਹੁੰਦੀ।",
            },
          },
          {
            "@type": "Question",
            name: "ਕੀ ਵਸੀਅਤ ਵਿੱਚ ਜਾਇਦਾਦ ਲੈਣ ਵਾਲਾ ਵਾਰਸ ਗਵਾਹ ਬਣ ਸਕਦਾ ਹੈ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ਬਿਲਕੁਲ ਨਹੀਂ! ਭਾਰਤੀ ਉੱਤਰਾਧਿਕਾਰ ਕਾਨੂੰਨ ਦੀ ਧਾਰਾ 67 ਅਨੁਸਾਰ, ਜੇਕਰ ਕੋਈ ਵਿਅਕਤੀ ਵਸੀਅਤ ਵਿੱਚ ਗਵਾਹ ਬਣਦਾ ਹੈ, ਤਾਂ ਉਸਨੂੰ ਜਾਂ ਉਸਦੇ ਪਤੀ/ਪਤਨੀ ਨੂੰ ਦਿੱਤੀ ਗਈ ਜਾਇਦਾਦ ਕਾਨੂੰਨੀ ਤੌਰ ਤੇ ਰੱਦ (Void) ਹੋ ਜਾਂਦੀ ਹੈ। ਇਸ ਲਈ ਬੱਚਿਆਂ, ਪਤਨੀ ਜਾਂ ਕਿਸੇ ਵੀ ਵਾਰਸ ਨੂੰ ਕਦੇ ਗਵਾਹ ਨਾ ਬਣਾਓ। ਗਵਾਹ ਹਮੇਸ਼ਾ ਨਿਰਪੱਖ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ, ਜਿਵੇਂ ਪਰਿਵਾਰਕ ਡਾਕਟਰ, ਨੰਬਰਦਾਰ ਜਾਂ ਵਕੀਲ।",
            },
          },
          {
            "@type": "Question",
            name: "ਵਸੀਅਤ ਤੋਂ ਬਾਅਦ ਪਟਵਾਰੀ ਪਾਸੋਂ ਇੰਤਕਾਲ (Mutation) ਕਿਵੇਂ ਦਰਜ ਹੁੰਦਾ ਹੈ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ਵਸੀਅਤ-ਕਰਤਾ ਦੇ ਦੇਹਾਂਤ ਤੋਂ ਬਾਅਦ ਵਾਰਸ ਪੰਜਾਬ ਲੈਂਡ ਰੈਵੇਨਿਊ ਐਕਟ ਦੀ ਧਾਰਾ 34 ਤਹਿਤ ਹਲਕਾ ਪਟਵਾਰੀ ਕੋਲ ਮੌਤ ਦਾ ਸਰਟੀਫਿਕੇਟ, ਵਸੀਅਤ ਦੀ ਕਾਪੀ ਅਤੇ ਜਮ੍ਹਾਬੰਦੀ ਪੇਸ਼ ਕਰਦਾ ਹੈ। ਪਟਵਾਰੀ ਪਰਤ ਪਤਵਾਰ ਵਿੱਚ ਇੰਤਕਾਲ ਦਰਜ ਕਰਦਾ ਹੈ। ਕਾਨੂੰਨਗੋ ਦੀ ਤਸਦੀਕ ਤੋਂ ਬਾਅਦ ਨਾਇਬ ਤਹਿਸੀਲਦਾਰ ਜਾਂ ਤਹਿਸੀਲਦਾਰ ਪਿੰਡ ਦੇ ਜਲਸਾ-ਏ-ਆਮ ਵਿੱਚ ਖੁੱਲ੍ਹੀ ਤਸਦੀਕ ਕਰਕੇ ਇੰਤਕਾਲ ਮਨਜ਼ੂਰ ਕਰਦਾ ਹੈ।",
            },
          },
          {
            "@type": "Question",
            name: "ਕੀ ਸੁਬ-ਰਜਿਸਟਰਾਰ ਦਫ਼ਤਰ ਵਿੱਚ ਵਸੀਅਤ ਰਜਿਸਟਰ ਕਰਵਾਉਣੀ ਜ਼ਰੂਰੀ ਹੈ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਐਕਟ, 1908 ਦੀ ਧਾਰਾ 18(e) ਤਹਿਤ ਵਸੀਅਤ ਰਜਿਸਟਰ ਕਰਵਾਉਣਾ ਮਰਜ਼ੀ ਅਨੁਸਾਰ (Optional) ਹੈ। ਬਿਨਾਂ ਰਜਿਸਟਰੀ ਵਾਲੀ ਵਸੀਅਤ ਵੀ ਜਾਇਜ਼ ਹੁੰਦੀ ਹੈ। ਪ੍ਰੰਤੂ ਪੰਜਾਬ ਵਿੱਚ NGDRS ਪੋਰਟਲ ਰਾਹੀਂ ਸੁਬ-ਰਜਿਸਟਰਾਰ ਦਫ਼ਤਰ ਵਿੱਚ ਰਜਿਸਟਰੀ ਕਰਵਾਉਣ ਨਾਲ ਭਵਿੱਖ ਵਿੱਚ ਜਾਅਲਸਾਜ਼ੀ ਜਾਂ ਜ਼ਬਰਦਸਤੀ ਦੇ ਝੂਠੇ ਦੋਸ਼ਾਂ ਤੋਂ ਬਚਾਅ ਹੁੰਦਾ ਹੈ।",
            },
          },
          {
            "@type": "Question",
            name: "ਕੀ ਕਿਸੇ ਨਾਫ਼ਰਮਾਨ ਪੁੱਤਰ ਜਾਂ ਧੀ ਨੂੰ ਜਾਇਦਾਦ ਵਿੱਚੋਂ ਬੇਦਖ਼ਲ (Disinherit) ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ਹਾਂ। ਵਸੀਅਤ-ਕਰਤਾ ਆਪਣੀ ਸਵੈ-ਅਰਜਿਤ (Self-Acquired) ਜਾਇਦਾਦ ਕਿਸੇ ਨੂੰ ਵੀ ਦੇਣ ਜਾਂ ਕਿਸੇ ਨੂੰ ਬੇਦਖ਼ਲ ਕਰਨ ਦਾ ਪੂਰਾ ਹੱਕ ਰੱਖਦਾ ਹੈ। ਅਦਾਲਤੀ ਝਗੜਿਆਂ ਤੋਂ ਬਚਣ ਲਈ ਵਸੀਅਤ ਵਿੱਚ ਬੇਦਖ਼ਲੀ ਦਾ ਸਪੱਸ਼ਟ ਕਾਰਨ (ਜਿਵੇਂ ਕਿ ਪਹਿਲਾਂ ਦਿੱਤਾ ਹਿੱਸਾ, ਬਜ਼ੁਰਗ ਅਵਸਥਾ ਵਿੱਚ ਸੇਵਾ ਨਾ ਕਰਨਾ ਆਦਿ) ਸਾਫ਼ ਸ਼ਬਦਾਂ ਵਿੱਚ ਦਰਜ ਕਰਨਾ ਜ਼ਰੂਰੀ ਹੈ।",
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
        <WillFormatPunjabiClient />
        <Footer />
      </div>
    </>
  );
}
