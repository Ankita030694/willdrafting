import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalcuttaProbateFeeClient from "./CalcuttaProbateFeeClient";

// Screaming Frog SEO Rules: Title 50-60 chars (57 chars), Meta Description 140-152 chars (145 chars), 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Calcutta High Court Probate Fee Calculator | WillDrafting",
  },
  description:
    "Calculate Calcutta High Court probate fees under West Bengal Court-Fees Act Art. 10. Check 2%-5.5% slabs, Rs 50,000 cap, and Schedule III relief.",
  keywords: [
    "calcutta high court probate court fee calculator",
    "west bengal court fees act 1970 schedule 1 article 10",
    "calcutta high court probate maximum fee 50000",
    "kolkata probate court fee calculator",
    "letters of administration fee calcutta high court",
    "calcutta high court original side rules chapter xxxv",
    "schedule 3 valuation deductions probate west bengal",
    "grips west bengal e court fee probate payment",
    "section 213 repealed 2025 kolkata will probate",
    "alipore district delegate probate court fee",
    "mihir saha v tanmoy saha probate court fee",
    "willdrafting calcutta high court probate calculator",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/calcutta-high-court-probate-court-fee-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/calcutta-high-court-probate-court-fee-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/calcutta-high-court-probate-court-fee-calculator",
    },
  },
  openGraph: {
    title: "Calcutta High Court Probate Fee Calculator | WillDrafting",
    description:
      "Calculate Calcutta High Court probate fees under West Bengal Court-Fees Act Art. 10. Check 2%-5.5% slabs, Rs 50,000 cap, and Schedule III relief.",
    url: "https://www.willdrafting.in/tools/calcutta-high-court-probate-court-fee-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/calcutta-high-court-probate-court-fee-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Calcutta High Court Probate Court Fee Calculator - West Bengal Art. 10 Slabs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcutta High Court Probate Fee Calculator | WillDrafting",
    description:
      "Calculate Calcutta High Court probate fees under West Bengal Court-Fees Act Art. 10. Check 2%-5.5% slabs, Rs 50,000 cap, and Schedule III relief.",
    site: "@willdrafting",
    creator: "@willdrafting",
    images: [
      "https://www.willdrafting.in/images/calcutta-high-court-probate-court-fee-calculator-og.jpg",
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

export default function CalcuttaHighCourtProbateFeeCalculatorPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/calcutta-high-court-probate-court-fee-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/calcutta-high-court-probate-court-fee-calculator-og.jpg";

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
        name: "Calcutta High Court Probate Fee Calculator | WillDrafting",
        description:
          "Calculate Calcutta High Court probate fees under West Bengal Court-Fees Act Art. 10. Check 2%-5.5% slabs, Rs 50,000 cap, and Schedule III relief.",
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
            name: "Calcutta High Court Probate Fee Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Calcutta High Court Probate Court Fee Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free calculator for Calcutta High Court and West Bengal District Court probate and Letters of Administration fees under West Bengal Court-Fees Act, 1970 Schedule I Article 10.",
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
            name: "What is the maximum court fee for probate in Calcutta High Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Schedule I, Article 10 of the West Bengal Court-Fees Act, 1970 as amended by the West Bengal Court-Fees Amendment Act, 2000 and 2002, the maximum ad valorem court fee for probate or Letters of Administration is capped at Rs 50,000. The Calcutta High Court affirmed this Rs 50,000 cap in Amitabha Saha v. Sriparna Biswas (2024). Always verify the final figure with the Taxing Officer before paying.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate still mandatory in Kolkata after the 2025 amendment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Parliament omitted Section 213 of the Indian Succession Act, 1925 through the Repealing and Amending Act, 2025 (effective December 20, 2025). Probate is no longer a compulsory legal bar to prove Will rights in Kolkata courts. However, banks, housing societies in Salt Lake or New Town, and Kolkata Municipal Corporation often still ask for probate to protect clear title.",
            },
          },
          {
            "@type": "Question",
            name: "When do I have to pay the ad valorem probate court fee in West Bengal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You do not pay the full ad valorem court fee when you file the petition. In Mihir Saha v. Tanmoy Saha (AIR 2005 Cal 231), the Calcutta High Court ruled that ad valorem duty liability arises only when the Court decides to grant probate. You pay a small filing fee first, and deposit the full court fee before the grant is issued.",
            },
          },
          {
            "@type": "Question",
            name: "What deductions are allowed under Schedule III of the West Bengal Court-Fees Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 32 and Schedule III Annexure B of the West Bengal Court-Fees Act, 1970, you can deduct bona fide debts of the deceased, mortgage charges on estate homes, reasonable funeral costs, and property held in trust without personal benefit. Court fee applies only to the net estate value after these deductions.",
            },
          },
          {
            "@type": "Question",
            name: "Should I file for probate in Calcutta High Court or Alipore District Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both courts hold concurrent jurisdiction under Section 300 of the Indian Succession Act, 1925. File in Calcutta High Court Original Side (Chapter XXXV) if the deceased had a home in Kolkata city limits or owned assets worth over Rs 10,000 in another state. File before the District Judge or District Delegate at Alipore, Barasat, or Howrah if all assets lie inside one district.",
            },
          },
          {
            "@type": "Question",
            name: "How do I pay probate court fees online in West Bengal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pay Calcutta High Court and West Bengal District Court fees online through the WBIFMS-GRIPS portal (Government Receipt Portal System) or the integrated e-Courts payment link. Choose the correct court fee head of account, pay via net banking, UPI, or card, and submit the printed Cyber Receipt (GRN) to the Taxing Officer.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a relative files a caveat against probate in Calcutta High Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 284 of the Indian Succession Act and Chapter XXXV of the Original Side Rules, any heir with a caveatable interest may file a caveat and affidavit in support. Once contested, the probate petition converts into a Testamentary Suit (T.S.), which requires evidence, witness cross-examination, and usually takes 2.5 to 5 years.",
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
        <CalcuttaProbateFeeClient />
        <Footer />
      </div>
    </>
  );
}
