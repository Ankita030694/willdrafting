import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChristianWillClient from "./ChristianWillClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Christian Will Format India: Legal Template | WillDrafting", // exactly 58 characters
  },
  description:
    "Download a valid Christian will format in India. Plain paper template with Section 67 witness safeguards, Section 69 marriage rules, and.", // exactly 152 characters
  keywords: [
    "christian will format india",
    "will format under indian succession act for christians",
    "christian testament format pdf india",
    "section 67 witness disqualification christian will",
    "section 69 marriage revocation will india",
    "mary roy supreme court christian daughter succession",
    "christian will registration sub registrar office",
    "probate of christian will section 213 india",
    "christian executor duties indian succession act",
    "bequest to church indian succession act section 118",
    "christian testament sample clauses india",
    "ama legal solutions christian estate planning",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/christian-will-format-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/christian-will-format-india",
      "x-default": "https://www.willdrafting.in/templates/christian-will-format-india",
    },
  },
  openGraph: {
    title: "Christian Will Format India: Legal Template | WillDrafting",
    description:
      "Download a valid Christian will format in India. Plain paper template with Section 67 witness safeguards, Section 69 marriage rules, and.",
    url: "https://www.willdrafting.in/templates/christian-will-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/christian-will-format-india-og.jpg",
        width: 1200,
        height: 675,
        alt: "Christian Will Format in India Indian Succession Act Legal Template and Testament Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Will Format India: Legal Template | WillDrafting",
    description:
      "Download a valid Christian will format in India. Plain paper template with Section 67 witness safeguards, Section 69 marriage rules, and.",
    images: ["https://www.willdrafting.in/images/christian-will-format-india-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ChristianWillPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/christian-will-format-india";
  const imageUrl = "https://www.willdrafting.in/images/christian-will-format-india-og.jpg";

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
        name: "Christian Will Format India: Legal Template | WillDrafting",
        description:
          "Download a valid Christian will format in India. Plain paper template with Section 67 witness safeguards, Section 69 marriage rules, and.",
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
            name: "Christian Will Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Christian Will Format in India (Indian Succession Act Legal Template)",
        url: canonicalUrl,
        description:
          "Lawyer-vetted legal Will format for Indian Christians under the Indian Succession Act, 1925. Features Section 67 witness-heir.",
        image: imageUrl,
        fileFormat: "text/html",
        hasDigitalDocumentPermission: {
          "@type": "DigitalDocumentPermission",
          permissionType: "https://schema.org/ReadPermission",
          grantee: {
            "@type": "Audience",
            audienceType: "Public",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Which law governs Wills made by Christians in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Wills made by Indian Christians are governed by Part VI (Will Estate, Sections 57 to 191) of the Indian Succession Act, 1925. In case of intestacy (passing away without a valid Will), Part V (Sections 31 to 49) governs the split of assets among legal heirs.",
            },
          },
          {
            "@type": "Question",
            name: "What is Section 67 and why does it disqualify Christian witnesses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 67 of the Indian Succession Act, 1925, any bequest or legacy given to an signing witness, or to the spouse of an signing witness, is strictly void. While the Will itself remains valid, the witness or their spouse receives nothing. This rule applies strictly to Christians (unlike Hindus who are exempt), meaning family heirs must never sign as signing witnesses.",
            },
          },
          {
            "@type": "Question",
            name: "Does getting married automatically revoke an existing Christian Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 69 of the Indian Succession Act, 1925, every Will made by a Christian is automatically revoked upon their subsequent marriage. If you wrote a Will while single or widowed and later marry or remarry, your prior Will becomes a nullity by operation of law. A fresh Will must be signed post-marriage.",
            },
          },
          {
            "@type": "Question",
            name: "What did the Supreme Court decide in the Mary Roy case?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Mary Roy v. State of Kerala (1986 AIR 1011), the Supreme Court struck down the archaic Travancore Christian Estate Act, 1916 and Cochin Christian Estate Act, 1921. The Court held that the Indian Succession Act, 1925 applies uniformly across Kerala, granting Christian daughters equal no-Will estate rights identical to sons.",
            },
          },
          {
            "@type": "Question",
            name: "Can an Indian Christian leave 100% of their property to anyone?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under the Indian Succession Act, 1925, an adult Indian Christian of sound mind enjoys 100% Will freedom over all self-acquired and absolute assets. There are no forced shares or one-third limits (unlike Muslim personal law). The only exception applies in the state of Goa, where the Portuguese Civil Code disposable quota system applies.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Christian bequeath property to a church or charity without waiting 12 months?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In John Vallamattom v. Union of India (2003) 6 SCC 611, the Supreme Court struck down Section 118 of the Indian Succession Act, which had previously imposed a discriminatory 12-month waiting period on bequests to religious and charitable causes. Today, Christians can freely bequeath assets to churches, dioceses, or charities without any waiting period.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate mandatory for Christian Wills in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Following the Indian Succession (Amendment) Act, 2002 (Act 26 of 2002), probate is generally not needed for Christian Wills signed outside the historic Presidency Towns (Mumbai, Kolkata, Chennai). However, obtaining probate from a District Court or High Court remains the strongest legal proof of title when dealing with high-value real estate or banking transmissions.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Christian Will require stamp paper or registration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No stamp paper is required under Indian law. A Christian Will can be signed on plain white A4 paper with zero stamp duty. Filing under Section 18 of the Filing Act, 1908 is voluntary. However, registering before the SRO provides strong evidence against allegations of fraud or coercion.",
            },
          },
          {
            "@type": "Question",
            name: "How many witnesses are required to execute a valid Christian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 63 of the Indian Succession Act, 1925, the Will must be attested by at least two competent adult witnesses. Each witness must see the Will maker sign or acknowledge their signature, and each witness must sign in the personal presence of the Will maker. Remember that neither witness nor their spouse should be a heir.",
            },
          },
          {
            "@type": "Question",
            name: "How does the Goa Civil Code affect Christian Wills in Goa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Goa, Christians are governed by the Portuguese Civil Code of 1867 under the communion of assets regime. A person can dispose of only their disposable quota (typically 50% of their estate), while the remaining half (the legitime) is legally reserved for forced heirs such as children or parents.",
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
        <ChristianWillClient />
        <Footer />
      </div>
    </>
  );
}
