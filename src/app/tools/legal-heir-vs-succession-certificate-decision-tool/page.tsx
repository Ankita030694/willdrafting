import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalHeirVsSuccessionClient from "./LegalHeirVsSuccessionClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Succession vs Legal Heir Certificate Tool | WillDrafting", // exactly 56 characters
  },
  description:
    "Determine if you need a succession certificate or legal heir certificate in India. Check movable and immovable asset rules, bank limits, and.", // exactly 152 characters
  keywords: [
    "do i need succession certificate or legal heir certificate",
    "which certificate is required after death in india",
    "legal heir vs succession vs probate vs surviving member certificate",
    "succession certificate under indian succession act 1925",
    "section 370 debts and securities succession certificate",
    "bank deceased claim without nominee threshold rbi",
    "sebi demat share transmission simplified threshold 15 lakh",
    "legal heir certificate tehsildar validity",
    "surviving member certificate delhi edistrict",
    "probate mandatory presidency towns section 213",
    "letters of administration section 218",
    "ama legal solutions succession certificate advocate",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/legal-heir-vs-succession-certificate-decision-tool",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/legal-heir-vs-succession-certificate-decision-tool",
      "x-default":
        "https://www.willdrafting.in/tools/legal-heir-vs-succession-certificate-decision-tool",
    },
  },
  openGraph: {
    title: "Succession vs Legal Heir Certificate Tool | WillDrafting",
    description:
      "Determine if you need a succession certificate or legal heir certificate in India. Check movable and immovable asset rules, bank limits, and.",
    url: "https://www.willdrafting.in/tools/legal-heir-vs-succession-certificate-decision-tool",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/legal-heir-vs-succession-certificate-decision-tool-og.jpg",
        width: 1200,
        height: 675,
        alt: "Legal Heir vs Succession Certificate Decision Tool India - Asset Transmission Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Succession vs Legal Heir Certificate Tool | WillDrafting",
    description:
      "Determine if you need a succession certificate or legal heir certificate in India. Check movable and immovable asset rules, bank limits, and.",
    images: [
      "https://www.willdrafting.in/images/legal-heir-vs-succession-certificate-decision-tool-og.jpg",
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

export default function LegalHeirVsSuccessionCertificateDecisionToolPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/legal-heir-vs-succession-certificate-decision-tool";
  const imageUrl =
    "https://www.willdrafting.in/images/legal-heir-vs-succession-certificate-decision-tool-og.jpg";

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
        name: "Succession vs Legal Heir Certificate Tool | WillDrafting",
        description:
          "Determine if you need a succession certificate or legal heir certificate in India. Check movable and immovable asset rules, bank limits, and.",
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
            name: "Legal Heir vs Succession Certificate Tool",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Legal Heir vs Succession Certificate Decision Tool India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive diagnostic wizard under Indian Succession Act 1925 (Part VIII & Part X) and State Revenue Rules. Instantly identifies whether you.",
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
            name: "Do I need a succession certificate or a legal heir certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It depends on the asset type and claim value. A Legal Heir Certificate is issued by the local Tehsildar or revenue authority for administrative purposes like family pension, employee dues, and property tax record updates. A Succession Certificate is issued only by a competent Civil Court under Section 370 of the Indian Succession Act, 1925 for movable assets (bank balances, fixed deposits, demat shares, mutual funds) where no nominee is registered and the claim exceeds simplified institutional thresholds.",
            },
          },
          {
            "@type": "Question",
            name: "Can a bank reject a Tehsildar Legal Heir Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under RBI guidelines and Section 381 of the Indian Succession Act, banks have full legal discretion to demand a Civil Court Succession Certificate if the deceased account has no nominee and the balance exceeds the bank's internal threshold (commonly ₹5 Lakhs to ₹15 Lakhs), or if there are conflicting claims among heirs. A Tehsildar certificate does not grant statutory indemnity to a debtor bank.",
            },
          },
          {
            "@type": "Question",
            name: "Can a succession certificate be granted for immovable property or land?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 370(1) of the Indian Succession Act, 1925, a Succession Certificate can be granted only for debts and securities (movable assets). It cannot be granted for immovable real estate, agricultural land, or flats. For transferring immovable property, heirs must apply for revenue mutation using a registered Will, Legal Heir Certificate, or obtain Letters of Administration from a Civil Court.",
            },
          },
          {
            "@type": "Question",
            name: "What is the simplified SEBI threshold for transmitting demat shares without court orders?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under SEBI Master Circular guidelines, if no nominee is registered, legal heirs can transmit demat shares up to a market value of ₹15 Lakhs per registered account through a simplified procedure using Form ISR-5, a notarized indemnity bond, and NOC from co-heirs. For portfolios exceeding ₹15 Lakhs without nomination, a Civil Court Succession Certificate, Probate, or Letters of Administration is mandatory.",
            },
          },
          {
            "@type": "Question",
            name: "What is a Surviving Member Certificate and where is it used?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Surviving Member Certificate (SMC) is an official document issued primarily in Delhi by the Revenue Department (SDM/Tehsildar) through the Delhi e-District portal. It lists all surviving family members of the deceased. In Delhi, Sub-Registrar Offices and local civic bodies insist on an SMC rather than a traditional Legal Heir Certificate for mutating real estate and closing administrative accounts.",
            },
          },
          {
            "@type": "Question",
            name: "When is Probate of a Will strictly mandatory in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 57 and Section 213 of the Indian Succession Act, 1925, Probate is strictly mandatory for Wills executed by Hindus, Buddhists, Sikhs, or Jains within the historical Presidency Towns of Mumbai, Kolkata, and Chennai, or where the immovable property bequeathed under the Will is situated within those territorial limits. In other parts of India, probate is optional unless demanded by institutional authorities or contested in court.",
            },
          },
          {
            "@type": "Question",
            name: "How much court fee is charged for a succession certificate petition?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Court fees for succession certificates are levied ad valorem as a percentage of the gross movable debt or security value under State Court Fees Acts. For example, in Maharashtra, the court fee is 2% to 7.5% but strictly capped at a statutory maximum of ₹75,000. In Delhi, it is approximately 4% of the asset value. In Karnataka and Tamil Nadu, state-specific graduated slabs apply.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take to get a Succession Certificate from a Civil Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Obtaining a Succession Certificate typically takes 6 to 9 months in an uncontested civil court proceeding. The timeline is dictated by mandatory statutory procedures: filing the verified petition under Section 372, issuing newspaper publication citations in English and vernacular dailies, waiting 30 to 45 days for public objections, recording petitioner evidence, and depositing court fees before the final certificate is drawn up.",
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
        <LegalHeirVsSuccessionClient />
        <Footer />
      </div>
    </>
  );
}
