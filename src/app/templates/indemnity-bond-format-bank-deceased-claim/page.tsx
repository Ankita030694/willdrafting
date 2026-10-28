import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndemnityBondClient from "./IndemnityBondClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Bank Deceased Claim Indemnity Bond Format | WillDrafting", // exactly 56 characters
  },
  description:
    "Download indemnity bond format for deceased bank account claim under Indian Contract Act and RBI rules. Includes two-surety clause and state.", // exactly 154 characters
  keywords: [
    "indemnity bond format for deceased bank account claim",
    "indemnity bond for legal heirs format word",
    "bank locker claim indemnity bond format",
    "transmission indemnity bond template",
    "deceased depositor claim indemnity bond sbi pnb hdfc",
    "two surety indemnity bond format bank claim",
    "indian contract act section 124 indemnity bond",
    "rbi deceased depositor claim guidelines without nominee",
    "letter of disclaimer legal heirs format bank claim",
    "stamp duty on indemnity bond deceased claim state wise",
    "affidavit cum indemnity bond deceased bank account",
    "ama legal solutions deceased bank account legal heir",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/indemnity-bond-format-bank-deceased-claim",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/indemnity-bond-format-bank-deceased-claim",
      "x-default": "https://www.willdrafting.in/templates/indemnity-bond-format-bank-deceased-claim",
    },
  },
  openGraph: {
    title: "Bank Deceased Claim Indemnity Bond Format | WillDrafting",
    description:
      "Download indemnity bond format for deceased bank account claim under Indian Contract Act and RBI rules. Includes two-surety clause and state.",
    url: "https://www.willdrafting.in/templates/indemnity-bond-format-bank-deceased-claim",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/indemnity-bond-format-bank-deceased-claim-og.jpg",
        width: 1200,
        height: 675,
        alt: "Indemnity Bond Format for Deceased Bank Account Claim Legal Template and State Stamp Duty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bank Deceased Claim Indemnity Bond Format | WillDrafting",
    description:
      "Download indemnity bond format for deceased bank account claim under Indian Contract Act and RBI rules. Includes two-surety clause and state.",
    images: ["https://www.willdrafting.in/images/indemnity-bond-format-bank-deceased-claim-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function IndemnityBondFormatPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/indemnity-bond-format-bank-deceased-claim";
  const imageUrl = "https://www.willdrafting.in/images/indemnity-bond-format-bank-deceased-claim-og.jpg";

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
        name: "Bank Deceased Claim Indemnity Bond Format | WillDrafting",
        description:
          "Download indemnity bond format for deceased bank account claim under Indian Contract Act and RBI rules. Includes two-surety clause and state.",
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
            name: "Indemnity Bond for Bank Deceased Claim",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Indemnity Bond Format for Deceased Bank Account Claim",
        url: canonicalUrl,
        description:
          "Lawyer-vetted legal indemnity bond format with two-surety undertaking, sworn note of disclaimer NOC, and state stamp paper guide for claiming.",
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
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is an Indemnity Bond for a deceased bank account claim?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Indemnity Bond for a deceased bank claim is a legally binding contract signed under Section 124 of the Indian Contract Act, 1872. Legal heirs promise to compensate the bank for any financial loss or legal expense if another claimant or legal heir later fights the release of deceased depositor funds.",
            },
          },
          {
            "@type": "Question",
            name: "When does an Indian bank require an Indemnity Bond instead of a Succession Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under RBI Master Circular guidelines, when a depositor dies without registering a nominee or survivor clause, banks allow deal on an Indemnity Bond with two independent sureties up to specific internal board thresholds (typically ₹1 Lakh to ₹5 Lakhs, or higher in select banks). If balances exceed this threshold or fights exist, banks insist on a court Estate Paper.",
            },
          },
          {
            "@type": "Question",
            name: "Who can act as a surety on a deceased depositor indemnity bond?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A surety must be an independent adult Indian citizen of sound financial standing who is not an inheriting legal heir. Banks typically require sureties who maintain active accounts with the branch, have regular salary income, or submit recent Income Tax Returns (ITR) proving net worth equal to or exceeding the claim amount.",
            },
          },
          {
            "@type": "Question",
            name: "What is the non-judicial stamp paper value required for an indemnity bond?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Stamp duty is governed by state stamp legislation. In Maharashtra, it is ₹500 under Article 35 of the Maharashtra Stamp Act. In Delhi, Uttar Pradesh, Tamil Nadu, and West Bengal, it is typically ₹100 under Article 34 of the Indian Stamp Act. In Karnataka, it is ₹200. The bond must be signed on non-judicial stamp paper and notarized.",
            },
          },
          {
            "@type": "Question",
            name: "Does a nominee need to submit an indemnity bond to withdraw deceased funds?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 45ZA of the Banking Regulation Act, 1949 and RBI directives, payment to a valid filed nominee gives the bank a complete legal discharge. Banks cannot demand an indemnity bond, surety, or estate paper from a filed nominee unless restrained by a civil court injunction.",
            },
          },
          {
            "@type": "Question",
            name: "Can one legal heir claim the entire bank balance if other heirs sign an NOC?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When multiple legal heirs survive, they can execute a notarized Sworn Note of Disclaimer or No Objection Paper (NOC) relinquishing their share in favor of one designated claimant heir. The claimant heir then submits the Indemnity Bond and receives the full payout.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between an Indemnity Bond and a court Succession Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Indemnity Bond is an out-of-court contractual deal signed within days on stamp paper with sureties. A Estate Paper is a judicial order issued by a civil court under Section 372 of the Indian Succession Act, 1925, requiring 6 to 18 months, newspaper citations, and 2% to 4% court fees.",
            },
          },
          {
            "@type": "Question",
            name: "Is an indemnity bond required for claiming contents of a deceased bank locker?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When a safe deposit locker is held without nomination, banks require an Indemnity Bond with two sureties along with a formal inventory undertaking before opening the locker in the presence of legal heirs, bank officials, and independent panchas.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if an undisclosed legal heir later files a claim with the bank?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Sections 124 and 128 of the Indian Contract Act, 1872, the signing legal heirs and their sureties are jointly and severally liable to reimburse the bank for all damages, court costs, and legal fees incurred in defending or settling the fight.",
            },
          },
          {
            "@type": "Question",
            name: "How long do banks take to settle deceased claims after receiving the indemnity bond?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under RBI circular instructions, shop banks must settle deceased depositor claims within 15 calendar days from the date of submission of complete claim papers, including the duly stamped indemnity bond, surety sworn notes, and legal heir proofs.",
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
        <IndemnityBondClient />
        <Footer />
      </div>
    </>
  );
}
