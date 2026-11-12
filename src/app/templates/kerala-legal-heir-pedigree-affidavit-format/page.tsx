import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KeralaLegalHeirClient from "./KeralaLegalHeirClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Kerala Legal Heir Affidavit Format | WillDrafting.in", // exactly 52 characters
  },
  description:
    "Download free Kerala legal heir affidavit format for Tahsildar and Village Office applications. Includes pedigree family tree verification clauses.", // exactly 147 characters
  keywords: [
    "kerala legal heir affidavit format",
    "relationship certificate affidavit format kerala",
    "village office legal heir application draft",
    "revenue e-services kerala heir affidavit",
    "kerala e-district legal heirship certificate format",
    "malayalam legal heir affidavit sample",
    "kerala pedigree family tree affidavit format",
    "kerala stamp paper value for legal heir affidavit",
    "tahsildar form 6c legal heir certificate kerala",
    "pokkuvaravu mutation legal heir affidavit kerala",
    "kerala land tax act 1961 transfer of registry rules 1966",
    "ayalvasi neighbor witness affidavit kerala",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/kerala-legal-heir-pedigree-affidavit-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/kerala-legal-heir-pedigree-affidavit-format",
      "x-default": "https://www.willdrafting.in/templates/kerala-legal-heir-pedigree-affidavit-format",
    },
  },
  openGraph: {
    title: "Kerala Legal Heir Affidavit Format | WillDrafting.in",
    description:
      "Download free Kerala legal heir affidavit format for Tahsildar and Village Office applications. Includes pedigree family tree verification clauses.",
    url: "https://www.willdrafting.in/templates/kerala-legal-heir-pedigree-affidavit-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/kerala-legal-heir-pedigree-affidavit-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Kerala Legal Heir Affidavit Format Bilingual Template and Family Tree Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Kerala Legal Heir Affidavit Format | WillDrafting.in",
    description:
      "Download free Kerala legal heir affidavit format for Tahsildar and Village Office applications. Includes pedigree family tree verification clauses.",
    images: [
      "https://www.willdrafting.in/images/kerala-legal-heir-pedigree-affidavit-format-og.jpg",
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

export default function KeralaLegalHeirAffidavitPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/kerala-legal-heir-pedigree-affidavit-format";
  const imageUrl =
    "https://www.willdrafting.in/images/kerala-legal-heir-pedigree-affidavit-format-og.jpg";

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
        name: "Kerala Legal Heir Affidavit Format | WillDrafting.in",
        description:
          "Download free Kerala legal heir affidavit format for Tahsildar and Village Office applications. Includes pedigree family tree verification clauses.",
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
            name: "Kerala Legal Heir Affidavit Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        headline: "Kerala Legal Heir Affidavit Format: Bilingual & Pedigree Guide",
        name: "Kerala Legal Heir & Pedigree Affidavit Format (English and Malayalam)",
        url: canonicalUrl,
        description:
          "Bilingual English and Malayalam legal heir affidavit format for Kerala e-District, Tahsildar Form 6C, and Village Office Pokkuvaravu checks.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        inLanguage: ["en-IN", "ml-IN"],
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        image: imageUrl,
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Estate Counsel",
          url: "https://www.willdrafting.in/about-us",
        },
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
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What stamp paper value is needed for a Kerala legal heir affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 4 of the Kerala Stamp Act, 1959, a standalone affidavit needs ₹50 non-judicial stamp paper or e-stamp. Some Akshaya Centres and offices use ₹100 paper when combined declarations are added.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need both English and Malayalam formats for the Village Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most Taluk and Village Offices in Kerala accept English affidavits, but Village Officers and local neighbors (Ayalvasi) often check the family details faster in Malayalam. A bilingual format stops clerk queries.",
            },
          },
          {
            "@type": "Question",
            name: "How long does the Kerala Legal Heirship Certificate take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "After the Village Officer field check, the Tahsildar publishes a notice in the Kerala Gazette. You must wait 30 days for public objections. With no objections, the digital Form 6C certificate issues in about 45 to 60 days total.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Legal Heirship and Relationship Certificate in Kerala?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Legal Heirship Certificate (Form 6C) lists all legal heirs of a deceased person after a 30-day Gazette notice and is used for land Pokkuvaravu and bank claims. A Relationship Certificate proves one specific family tie quickly without Gazette notice.",
            },
          },
          {
            "@type": "Question",
            name: "Must married daughters be named in the Kerala pedigree table?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Hindu, Christian, and Muslim succession laws applied in Kerala, married daughters hold legal inheritance rights. Leaving out a daughter or a predeceased child branch makes the affidavit false and invalid.",
            },
          },
          {
            "@type": "Question",
            name: "Is notary attestation required for a Kerala e-District heir affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You must sign the printed stamp paper before a Notary Public or Gazetted Officer with two witnesses. During the field inquiry, the Village Officer also records statements from two local neighbors (Ayalvasi Mozhi).",
            },
          },
          {
            "@type": "Question",
            name: "Can NRIs in the Gulf apply for a Kerala legal heir affidavit remotely?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An NRI living abroad can sign an affidavit before the Indian Embassy or Consulate, or give a Consular Power of Attorney to a family member in Kerala who applies at the local Akshaya Centre.",
            },
          },
          {
            "@type": "Question",
            name: "Does a registered Will remove the need for a Legal Heirship Certificate in Kerala?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Often yes for undisputed properties. Under the Transfer of Registry Rules, 1966 and Kerala High Court rulings, heirs can apply directly for Pokkuvaravu using a registered Will and death certificate without waiting for a Gazette notice.",
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
        <KeralaLegalHeirClient />
        <Footer />
      </div>
    </>
  );
}
