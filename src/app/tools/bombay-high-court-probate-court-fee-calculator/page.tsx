import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BombayProbateFeeClient from "./BombayProbateFeeClient";

// Screaming Frog Rules: Title 50-60 chars (55), Meta Description 140-154 chars (147), 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Bombay High Court Probate Fee Calculator | WillDrafting",
  },
  description:
    "Calculate Bombay High Court probate court fees under Maharashtra Court-fees Act slabs. Check the ₹75,000 cap, ₹10,000 widow relief, and deductions.",
  keywords: [
    "bombay high court probate court fee calculator",
    "mumbai probate court fee calculator",
    "maharashtra court fees act schedule 1 article 10",
    "bombay high court probate maximum cap 75000",
    "maharashtra widow probate court fee 10000 notification 2024",
    "schedule 3 probate valuation deductions maharashtra",
    "letters of administration court fee bombay high court",
    "section 213 indian succession act repealed 2025 mumbai probate",
    "bombay high court original side rules rule 374 probate",
    "probate court fee refund widow bombay high court",
    "testamentary jurisdiction bombay high court fees",
    "willdrafting bombay probate calculator",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/bombay-high-court-probate-court-fee-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/bombay-high-court-probate-court-fee-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/bombay-high-court-probate-court-fee-calculator",
    },
  },
  openGraph: {
    title: "Bombay High Court Probate Fee Calculator | WillDrafting",
    description:
      "Calculate Bombay High Court probate court fees under Maharashtra Court-fees Act slabs. Check the ₹75,000 cap, ₹10,000 widow relief, and deductions.",
    url: "https://www.willdrafting.in/tools/bombay-high-court-probate-court-fee-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/bombay-high-court-probate-court-fee-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Bombay High Court Probate Court Fee Calculator and Maharashtra Slabs Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Bombay High Court Probate Fee Calculator | WillDrafting",
    description:
      "Calculate Bombay High Court probate court fees under Maharashtra Court-fees Act slabs. Check the ₹75,000 cap, ₹10,000 widow relief, and deductions.",
    images: [
      "https://www.willdrafting.in/images/bombay-high-court-probate-court-fee-calculator-og.jpg",
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

export default function BombayHighCourtProbateFeeCalculatorPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/bombay-high-court-probate-court-fee-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/bombay-high-court-probate-court-fee-calculator-og.jpg";

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
        name: "Bombay High Court Probate Fee Calculator | WillDrafting",
        description:
          "Calculate Bombay High Court probate court fees under Maharashtra Court-fees Act slabs. Check the ₹75,000 cap, ₹10,000 widow relief, and deductions.",
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
            name: "Bombay High Court Probate Court Fee Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Bombay High Court Probate Court Fee Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free interactive calculator for Bombay High Court probate and Letters of Administration court fees under Schedule I Article 10 of the Maharashtra Court-fees Act, 1959, including the ₹75,000 general cap and ₹10,000 widow cap.",
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
            name: "What is the maximum probate court fee in the Bombay High Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Schedule I, Article 10 of the Maharashtra Court-fees Act, 1959, the maximum court fee for probate or Letters of Administration is ₹75,000 for general petitioners. Even if the Mumbai estate is worth ₹5 crore or ₹50 crore, the statutory fee does not cross ₹75,000.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Maharashtra widow probate court fee concession?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "By Notification No. Mudrank-2023/C.R.641/M-1(Policy) dated August 9, 2024 under Section 46 of the Maharashtra Court-fees Act, the state cut the maximum court fee cap for widows from ₹75,000 to ₹10,000. Widows applying for probate, Letters of Administration, or heirship certificates save up to ₹65,000.",
            },
          },
          {
            "@type": "Question",
            name: "How are the Bombay High Court probate fee slabs calculated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The fee is calculated progressively on net estate value. Up to ₹1,000 is nil. Above ₹1,000 up to ₹50,000 is 2%. Above ₹50,000 up to ₹2,00,000 is 4%. Above ₹2,00,000 up to ₹3,00,000 is 6%. Above ₹3,00,000 is 7.5%, capped at ₹75,000 for general petitioners or ₹10,000 for widows.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate still mandatory in Mumbai after the 2025 amendment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Repealing and Amending Act, 2025 received Presidential assent on December 20, 2025 and omitted Section 213 of the Indian Succession Act, 1925. Probate is now optional by law in Mumbai. Still, housing societies, banks, and flat buyers often ask for voluntary probate to confirm clean title.",
            },
          },
          {
            "@type": "Question",
            name: "What deductions reduce the net estate value for probate court fees?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 29 and Schedule III of the Maharashtra Court-fees Act, you can deduct unpaid debts of the deceased, mortgage dues with interest up to the filing date, reasonable funeral costs, and property held in trust without beneficial ownership.",
            },
          },
          {
            "@type": "Question",
            name: "Can a widow claim a refund if she already paid ₹75,000 in court fees?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Following the August 9, 2024 notification, the Bombay High Court has allowed praecipe applications by eligible widow petitioners and ordered the Testamentary Department to refund the excess ₹65,000, retaining only the ₹10,000 maximum cap.",
            },
          },
          {
            "@type": "Question",
            name: "Does Letters of Administration carry the same fee cap as Probate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Schedule I, Article 10 of the Maharashtra Court-fees Act applies the exact same progressive slabs, ₹75,000 general cap, and ₹10,000 widow cap to both Probate of a Will and Letters of Administration, with or without a Will annexed.",
            },
          },
          {
            "@type": "Question",
            name: "Where must a Mumbai estate probate petition be filed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If the deceased lived in Greater Mumbai or owned immovable property within Greater Mumbai limits, the petition is filed on the Original Side (Testamentary and Intestate Jurisdiction) of the Bombay High Court under Chapter XXVI of the Bombay High Court (Original Side) Rules, 1980.",
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
        <BombayProbateFeeClient />
        <Footer />
      </div>
    </>
  );
}
