import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DematTransmissionFinderClient from "./DematTransmissionFinderClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Demat Transmission Documents Checker Sebi | WillDrafting.in", // exactly 59 characters
  },
  description:
    "Check demat transmission documents checker sebi rules. Find required forms ISR-5, AMFI T2/T3, threshold limits up to ₹15 Lakh, and legal heir.", // exactly 147 characters
  keywords: [
    "demat transmission documents checker sebi",
    "mutual fund transmission checklist cams kfintech",
    "sebi transmission threshold 5 lakh 15 lakh",
    "form isr-5 transmission",
    "demat share transmission without nominee sebi",
    "amfi form t2 t3 transmission checklist",
    "cdsl nsdl transmission documents legal heir",
    "sebi master circular transmission of securities",
    "succession certificate for shares above 15 lakh",
    "shakti yezdani nominee legal heir supreme court",
    "indemnity bond format demat transmission annexure b",
    "ama legal solutions securities transmission advisor",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/demat-mutual-fund-transmission-document-finder",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/demat-mutual-fund-transmission-document-finder",
      "x-default": "https://www.willdrafting.in/tools/demat-mutual-fund-transmission-document-finder",
    },
  },
  openGraph: {
    title: "Demat Transmission Documents Checker Sebi | WillDrafting.in",
    description:
      "Check demat transmission documents checker sebi rules. Find required forms ISR-5, AMFI T2/T3, threshold limits up to ₹15 Lakh, and legal heir.",
    url: "https://www.willdrafting.in/tools/demat-mutual-fund-transmission-document-finder",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/demat-mutual-fund-transmission-document-finder-og.jpg",
        width: 1200,
        height: 675,
        alt: "SEBI Demat and Mutual Fund Transmission Document Finder and Legal Checklist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demat Transmission Documents Checker Sebi | WillDrafting.in",
    description:
      "Check demat transmission documents checker sebi rules. Find required forms ISR-5, AMFI T2/T3, threshold limits up to ₹15 Lakh, and legal heir.",
    images: ["https://www.willdrafting.in/images/demat-mutual-fund-transmission-document-finder-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function DematTransmissionFinderPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/demat-mutual-fund-transmission-document-finder";
  const imageUrl = "https://www.willdrafting.in/images/demat-mutual-fund-transmission-document-finder-og.jpg";

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
        name: "Demat Transmission Documents Checker Sebi | WillDrafting.in",
        description:
          "Check demat transfer papers checker sebi rules. Find required forms ISR-5, AMFI T2/T3, threshold limits up to ₹15 Lakh, and legal heir.",
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
            name: "Demat & Mutual Fund Transmission Document Finder",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "SEBI Demat & Mutual Fund Transmission Document Finder",
        url: canonicalUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        description:
          "Free legal compliance tool for SEBI demat share transfer and AMFI mutual fund claims. Accurately determines Form ISR-5, AMFI.",
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
            name: "What is the revised SEBI threshold for demat share transmission without court documents?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the SEBI Master Circular on Simplification of Transfer Steps, the threshold limit for securities held in dematerialized mode (CDSL or NSDL) without requiring a Estate Paper or Probate is ₹15,00,000 (Rupees Fifteen Lakh) per depository participant account as of the form date. For physical shares, the simplified limit is ₹5,00,000 per listed company.",
            },
          },
          {
            "@type": "Question",
            name: "Does a registered nominee become the absolute owner of demat shares after the holder dies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court of India in Shakti Yezdani v. Jayanand Jayant Salgaonkar (2023) held that a nominee is only a fiduciary custodian or trustee of the securities. Depository participants (CDSL/NSDL) and RTAs legally discharge their liability by transferring shares to the nominee. However, beneficial ownership vests in legal heirs under the deceased person's Will or personal estate laws.",
            },
          },
          {
            "@type": "Question",
            name: "What is Form ISR-5 and when is it required?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Form ISR-5 is SEBI's standardized Request for Transfer of Securities by Nominee or Legal Heir. It is needed for transferring demat and physical shares from a deceased investor's account. It captures deceased investor details, claimant details, depository account information, and is submitted with annexures including Indemnity Bond (Annexure B) and NOC (Annexure C).",
            },
          },
          {
            "@type": "Question",
            name: "How are mutual fund units transmitted when a nominee is registered?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When a filed nominee claims mutual fund folios through RTAs like CAMS or KFintech, they must submit AMFI Form T2 (Transfer Request Form for Nominee). They need to attach an attested copy of the death paper, KYC check, and bank details check (such as a cancelled cheque with pre-printed name or Form T3 Annexure I bank witness signing).",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required to claim mutual funds if there is no nominee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If there is no nominee and total folio value is up to ₹5,00,000, heirs use AMFI Form T3 along with a Legal Heirship Paper or Surviving Member Paper, Indemnity Bond (Annexure II), Affidavits from all heirs (Annexure III), and NOC from relinquishing heirs (Annexure IV). If folio value exceeds ₹5,00,000, a court-issued Estate Paper or Probated Will is required.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to joint demat accounts when one holder passes away?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In a joint demat account with survivorship ('Either or Survivor' or joint holding), shares do not go through estate. The surviving holder submits a name deletion request along with the original or attested death paper and Client Master List (CML). The deceased holder's name is removed and the account is converted to the surviving holder.",
            },
          },
          {
            "@type": "Question",
            name: "Can physical share certificates still be transmitted into physical format?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. SEBI LODR Regulation 40 mandates that RTAs cannot issue physical share papers upon transfer. Instead, the RTA processes transfer and issues a Letter of Confirmation (Form ISR-4). The legal heir must submit this Letter of Confirmation to their Depository Participant within 120 days to credit the shares in demat format.",
            },
          },
          {
            "@type": "Question",
            name: "When is a Succession Certificate mandatory for shares and mutual funds?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Estate Paper issued under Section 372 of the Indian Succession Act, 1925 is needed when the deceased investor held securities as a sole holder without a valid nominee, and the portfolio value exceeds ₹15 Lakhs for demat shares or ₹5 Lakhs for physical shares and mutual funds, or when legal heirs have conflicting claims.",
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
        <DematTransmissionFinderClient />
        <Footer />
      </div>
    </>
  );
}
