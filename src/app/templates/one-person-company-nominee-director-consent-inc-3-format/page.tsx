import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OpcInc3ConsentClient from "./OpcInc3ConsentClient";

const CANONICAL_URL =
  "https://www.willdrafting.in/templates/one-person-company-nominee-director-consent-inc-3-format";
const OG_IMAGE_URL =
  "https://www.willdrafting.in/images/one-person-company-nominee-director-consent-inc-3-format-og.jpg";
const SEO_TITLE = "OPC Nominee Consent Form INC-3 Format | WillDrafting";
const META_DESC =
  "Download official Form INC-3 nominee director consent format for One Person Company under Companies Act 2013. Complete MCA compliant editable draft.";
const OG_ALT =
  "OPC Nominee Director Consent Form INC-3 Format Template and MCA Rules Guide";

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },
  description: META_DESC,
  keywords: [
    "opc nominee director consent form inc 3 format",
    "form inc 3 nominee consent format mca",
    "one person company nominee withdrawal and replacement format",
    "opc nominee succession draft sample",
    "form inc 3 editable word draft",
    "form inc 4 opc nominee change format",
    "companies act 2013 section 3 1 c",
    "companies incorporation rules 2014 rule 4",
  ],
  authors: [{ name: "Advocate Anuj Anand Malik" }],
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      "en-IN": CANONICAL_URL,
      "x-default": CANONICAL_URL,
    },
  },
  openGraph: {
    title: SEO_TITLE,
    description: META_DESC,
    url: CANONICAL_URL,
    siteName: "WillDrafting",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 675,
        alt: OG_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: SEO_TITLE,
    description: META_DESC,
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

export default function OpcNomineeConsentInc3Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LegalService"],
        "@id": "https://www.willdrafting.in/#organization",
        name: "WillDrafting",
        url: "https://www.willdrafting.in",
        logo: "https://www.willdrafting.in/icon.png",
        founder: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
        },
        areaServed: "IN",
      },
      {
        "@type": "WebPage",
        "@id": `${CANONICAL_URL}/#webpage`,
        url: CANONICAL_URL,
        name: SEO_TITLE,
        description: META_DESC,
        inLanguage: "en-IN",
        isPartOf: { "@id": "https://www.willdrafting.in/#organization" },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
          width: 1200,
          height: 675,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL_URL}/#breadcrumb`,
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
            name: "Legal Templates",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "OPC Nominee Consent Form INC-3 Format",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${CANONICAL_URL}/#article`,
        headline: "OPC Nominee Director Consent Form INC-3 Draft",
        description: META_DESC,
        image: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
          width: 1200,
          height: 675,
        },
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Corporate and Succession Lawyer",
        },
        publisher: {
          "@id": "https://www.willdrafting.in/#organization",
        },
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        mainEntityOfPage: {
          "@id": `${CANONICAL_URL}/#webpage`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${CANONICAL_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Form INC-3 and why is it mandatory for an OPC?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Form INC-3 is the mandatory prior written consent of a nominee in a One Person Company (OPC). Under Section 3(1)(c) of the Companies Act, 2013 and Rule 4(2) of the Companies (Incorporation) Rules, 2014, the OPC subscriber must obtain this signed consent before filing incorporation or replacing a nominee.",
            },
          },
          {
            "@type": "Question",
            name: "Who is eligible to be appointed as an OPC nominee in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Only a natural person who is an Indian citizen and at least 18 years old can become an OPC nominee. Following the 2021 Incorporation Rules amendment, both resident Indians and Non-Resident Indians (NRIs) can serve as OPC members or nominees. A corporate entity, LLP, trust, or minor cannot become an OPC nominee.",
            },
          },
          {
            "@type": "Question",
            name: "Can one individual act as nominee for multiple One Person Companies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Rule 3(3) of the Companies (Incorporation) Rules, 2014, no natural person shall be a member of more than one OPC or a nominee of more than one OPC at any point in time. If an existing OPC nominee inherits another OPC by death of its member, they must restore single-OPC compliance within 180 days.",
            },
          },
          {
            "@type": "Question",
            name: "What KYC documents must accompany Form INC-3 nominee consent?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A valid Form INC-3 consent requires self-attested copies of three annexures from the nominee: a PAN card, one identity proof such as Aadhaar card, Passport, Voter ID, or Driving Licence, and a recent proof of present residence such as a bank statement, electricity bill, or telephone bill dated within the last two months.",
            },
          },
          {
            "@type": "Question",
            name: "How can an OPC nominee withdraw consent or be replaced by the founder?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rule 4(3) and Rule 4(4), a nominee may withdraw consent by sending written notice to both the sole member and the company. The sole member must nominate another eligible person within 15 days and send written notice with the new nominee's Form INC-3 consent. The company must then file Form INC-4 with the Registrar of Companies within 30 days.",
            },
          },
          {
            "@type": "Question",
            name: "What happens upon the death or incapacity of the OPC sole member?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rule 4(6), the nominee automatically becomes the sole member and assumes full ownership of all OPC shares without needing a court probate or succession certificate. Within 15 days of becoming a member, the incoming owner must nominate a fresh backup nominee in Form INC-3, and the company must intimate the Registrar in Form INC-4 within 30 days.",
            },
          },
          {
            "@type": "Question",
            name: "Does the Form INC-3 nominee automatically become a Director on member demise?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 3(1)(c) transmits shareholding and membership automatically to the nominee, not directorship unless already appointed. If the deceased member was the sole Director, the nominee becomes the sole member, obtains a Director Identification Number (DIN) if not held, appoints themselves or another individual as Director, and files Form DIR-12 alongside Form INC-4.",
            },
          },
          {
            "@type": "Question",
            name: "How is Form INC-3 filed on the MCA V3 SPICe+ portal today?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For new OPC registrations on MCA V3, nominee particulars and Rule 4(2) consent declarations are integrated directly inside Part B of SPICe+ (Form INC-32). Executing an editable Form INC-3 written consent with self-attested PAN and Aadhaar annexures keeps the signed statutory record ready for both incorporation verification and subsequent Form INC-4 filings.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <OpcInc3ConsentClient />
      </main>
      <Footer />
    </div>
  );
}
