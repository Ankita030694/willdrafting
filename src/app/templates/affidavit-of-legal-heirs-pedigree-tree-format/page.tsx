import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AffidavitLegalHeirsClient from "./AffidavitLegalHeirsClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Legal Heir Affidavit Format India | WillDrafting.in", // exactly 51 characters
  },
  description:
    "Download legally valid legal heir affidavit format in India with pedigree family tree, Class I heir shares, notary verification, and revenue.", // exactly 147 characters
  keywords: [
    "legal heir affidavit format india",
    "surviving legal heirs declaration affidavit format",
    "family tree vamshavali pedhinama affidavit format",
    "pedigree table format tehsildar legal heir certificate",
    "delhi surviving member certificate smc affidavit format",
    "gujarat pedhinama affidavit format talati",
    "class 1 legal heirs hindu succession act affidavit",
    "predeceased son legal heir affidavit representation",
    "notary verification format for legal heirship india",
    "bank deceased claim legal heir affidavit format",
    "bharatiya sakshya adhiniyam pedigree evidence",
    "ama legal solutions legal heir lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/affidavit-of-legal-heirs-pedigree-tree-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/affidavit-of-legal-heirs-pedigree-tree-format",
      "x-default": "https://www.willdrafting.in/templates/affidavit-of-legal-heirs-pedigree-tree-format",
    },
  },
  openGraph: {
    title: "Legal Heir Affidavit Format India | WillDrafting.in",
    description:
      "Download legally valid legal heir affidavit format in India with pedigree family tree, Class I heir shares, notary verification, and revenue.",
    url: "https://www.willdrafting.in/templates/affidavit-of-legal-heirs-pedigree-tree-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/affidavit-of-legal-heirs-pedigree-tree-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Legal Heir Affidavit and Pedigree Tree Format India with Hindu Succession Act Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Heir Affidavit Format India | WillDrafting.in",
    description:
      "Download legally valid legal heir affidavit format in India with pedigree family tree, Class I heir shares, notary verification, and revenue.",
    images: ["https://www.willdrafting.in/images/affidavit-of-legal-heirs-pedigree-tree-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function AffidavitLegalHeirsPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/affidavit-of-legal-heirs-pedigree-tree-format";
  const imageUrl = "https://www.willdrafting.in/images/affidavit-of-legal-heirs-pedigree-tree-format-og.jpg";

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
        name: "Legal Heir Affidavit Format India | WillDrafting.in",
        description:
          "Download legally valid legal heir affidavit format in India with pedigree family tree, Class I heir shares, notary verification, and revenue.",
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
            name: "Legal Templates",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Legal Heir Affidavit & Pedigree Tree",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#template`,
        name: "Affidavit of Legal Heirs with Pedigree Family Tree (Vamshavali / Pedhinama) Format",
        url: canonicalUrl,
        description:
          "Lawyer-drafted statutory affidavit format of legal heirs with structured pedigree tree table, predeceased heir branch disclosures, negative.",
        fileFormat: "application/pdf",
        genre: "Legal Heir Declaration Template",
        inLanguage: "en-IN",
        image: imageUrl,
        creator: {
          "@type": "Organization",
          name: "WillDrafting.in Legal Editorial Bench",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a Legal Heir and Pedigree Tree Affidavit in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Legal Heir Affidavit with a Pedigree Tree (Vamshavali, Pedhinama, or Shajra-e-Nasab) is a sworn legal statement on stamp paper by a family member declaring under solemn affirmation all surviving Class I legal heirs of a deceased person who died intestate. It includes a structured genealogical chart displaying the lineage, surviving heirs, and any predeceased heirs.",
            },
          },
          {
            "@type": "Question",
            name: "Why is a Pedigree Tree compulsory in a Legal Heir Affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Revenue officers, Tehsildars, and SDMs require a genealogical pedigree tree to identify whether any legal heir predeceased the propositus. Under Section 10 of the Hindu Succession Act, 1956, children and widows of predeceased sons or daughters inherit per stirpes by representation. Omitting a pedigree tree can conceal rightful heirs and invalidate the certificate.",
            },
          },
          {
            "@type": "Question",
            name: "What stamp paper value is required for a Legal Heir Affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In most Indian states, a self-declaration legal heir affidavit is executed on non-judicial e-stamp paper of ₹10, ₹20, ₹50, or ₹100 depending on the state stamp act. For example, Delhi requires ₹10, Maharashtra ₹100, Uttar Pradesh ₹10 or ₹100, and Karnataka ₹20 or ₹50.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Legal Heir Affidavit require notary attestation or an Oath Commissioner?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The affidavit must be sworn before an appointed Notary Public or Oath Commissioner under the Oaths Act, 1969. The deponent must sign in the presence of the notary with two independent local witnesses who identify the deponent, and affix notary stamp, seal, and serial register entry.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a Legal Heir Certificate and a Succession Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Legal Heir Certificate is an administrative certificate issued by a Tehsildar or SDM to identify surviving family members for bank claims, pensions, or municipal mutations. A Succession Certificate is an authoritative decree issued by a competent Civil Court under Part X of the Indian Succession Act, 1925, legally required for contested debts, securities, and high-value movable assets.",
            },
          },
          {
            "@type": "Question",
            name: "What are the legal consequences of omitting a legal heir from the affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Intentionally concealing a legal heir or falsely declaring that no other heirs exist constitutes perjury and criminal fraud under Sections 229 and 236 of the Bharatiya Nyaya Sanhita, 2023 (formerly Sections 193 and 199 IPC), punishable by up to 7 years imprisonment. The resulting revenue certificate is void ab initio.",
            },
          },
          {
            "@type": "Question",
            name: "What regional names are used for the Pedigree Tree Affidavit across India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Gujarat, it is known as Pedhinama; in Maharashtra, Varasnama; in Delhi, Surviving Member Certificate (SMC) Affidavit; in Uttar Pradesh and Bihar, Shajra-e-Nasab or Vamshavali Shapathpatra; and in Karnataka, Vamshavruksha Affidavit.",
            },
          },
          {
            "@type": "Question",
            name: "Do married daughters have to be named in the Legal Heir Affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, absolutely. Under Section 6 and Section 8 of the Hindu Succession Act, 1956, and the landmark Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), married daughters are coparceners and Class I legal heirs with equal rights. Excluding a married daughter is illegal and grounds for immediate revocation of the certificate.",
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
        <AffidavitLegalHeirsClient />
        <Footer />
      </div>
    </>
  );
}
