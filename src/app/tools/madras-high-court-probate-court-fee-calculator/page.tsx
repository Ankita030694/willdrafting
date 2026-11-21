import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MadrasProbateFeeClient from "./MadrasProbateFeeClient";

// Screaming Frog Rules: Title 50-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Madras High Court Probate Fee Calculator | WillDrafting", // 55 characters
  },
  description:
    "Calculate Madras High Court probate OP court fees under TN Court Fees Act Article 6 (3%, Rs 25,000 cap). Check Section 56 deductions & Order XXV steps.", // 151 characters
  keywords: [
    "madras high court probate court fee calculator",
    "chennai probate court fee tamil nadu",
    "madras high court testamentary op fee",
    "tamil nadu court fees act probate 3 percent",
    "tamil nadu probate court fee cap 25000",
    "article 6 schedule 1 tamil nadu court fees act 1955",
    "madras high court order xxv probate checklist",
    "letters of administration fee chennai high court",
    "section 56 tamil nadu court fees act deductions",
    "testamentary original suit tos court fee madras hc",
    "section 213 indian succession act repealed 2025 chennai",
    "willdrafting madras high court probate fee tool",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/madras-high-court-probate-court-fee-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/madras-high-court-probate-court-fee-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/madras-high-court-probate-court-fee-calculator",
    },
  },
  openGraph: {
    title: "Madras High Court Probate Fee Calculator | WillDrafting",
    description:
      "Calculate Madras High Court probate OP court fees under TN Court Fees Act Article 6 (3%, Rs 25,000 cap). Check Section 56 deductions & Order XXV steps.",
    url: "https://www.willdrafting.in/tools/madras-high-court-probate-court-fee-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/madras-high-court-probate-court-fee-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Madras High Court probate court fee calculator for Chennai families",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Madras High Court Probate Fee Calculator | WillDrafting",
    description:
      "Calculate Madras High Court probate OP court fees under TN Court Fees Act Article 6 (3%, Rs 25,000 cap). Check Section 56 deductions & Order XXV steps.",
    images: [
      "https://www.willdrafting.in/images/madras-high-court-probate-court-fee-calculator-og.jpg",
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

export default function MadrasHighCourtProbateFeePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/madras-high-court-probate-court-fee-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/madras-high-court-probate-court-fee-calculator-og.jpg";

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
        name: "Madras High Court Probate Fee Calculator | WillDrafting",
        description:
          "Calculate Madras High Court probate OP court fees under TN Court Fees Act Article 6 (3%, Rs 25,000 cap). Check Section 56 deductions & Order XXV steps.",
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
            name: "Madras High Court Probate Fee Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Madras High Court Probate Court Fee Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free Tamil Nadu Court-Fees and Suits Valuation Act, 1955 calculator for Madras High Court Probate OPs, Letters of Administration, Section 56 deductions, Rs 25,000 cap, and caveat TOS risk.",
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
            name: "What is the court fee for Probate or Letters of Administration in Madras High Court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 6 of Schedule I to the Tamil Nadu Court-Fees and Suits Valuation Act, 1955 (as amended by Tamil Nadu Act 6 of 2017), the probate duty is 3% of the net market value of the estate, subject to a strict statutory maximum cap of Rs 25,000. Any net estate above Rs 8,33,333 pays the flat maximum duty of Rs 25,000.",
            },
          },
          {
            "@type": "Question",
            name: "Is Probate still mandatory in Chennai after the Repealing and Amending Act, 2025?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Parliament omitted Section 213 of the Indian Succession Act, 1925 via the Repealing and Amending Act, 2025 (presidential assent December 20, 2025). Historically, Wills executed in Chennai or covering Chennai immovable property required mandatory probate. Probate is now legally optional nationwide, though banks, demat depositories, housing societies, and buyers often still request a Madras High Court grant for undisputed title certainty.",
            },
          },
          {
            "@type": "Question",
            name: "How does Section 56 of the Tamil Nadu Court-Fees Act affect estate valuation timing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 56(1) of the Tamil Nadu Court-Fees and Suits Valuation Act, 1955, if you file the Probate OP within one year from the date of death, duty is computed on the market value as on the date of death. If you file after one year, duty is calculated on the market value as on the date of filing the petition.",
            },
          },
          {
            "@type": "Question",
            name: "Can debts, mortgages, and funeral costs be deducted before calculating Tamil Nadu probate court fee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, under Section 56(2) read with Schedule III Part I Annexure B, bona fide debts owed by the deceased, home loan mortgages, and reasonable funeral expenses can be deducted from gross estate value if the petition covers the entire estate. If the petition is filed for only part of the estate, Section 56(2)(a) prohibits deducting debts or funeral expenses.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to court fees if someone files a Caveat and converts the Madras HC OP into a TOS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When a legal heir enters a caveat under Order XXV of the Madras High Court Original Side Rules and Section 295 of the Indian Succession Act, the uncontested Original Petition (OP) is converted into a Testamentary Original Suit (TOS). While the proviso to Schedule II Article 11(k) refers to half the Schedule I Article 1 ad valorem scale, Madras High Court judgments including Philo Peter v. Divyanathan (1988), N. Renuka Devi v. E. Lalitha (2016), and B. Nitish Harihar v. P. Sivanandam (2021) alongside the 2017 Amendment cap have extensively governed and checked excessive ad valorem demands upon TOS conversion.",
            },
          },
          {
            "@type": "Question",
            name: "Should I file my Probate petition in the Madras High Court or a District Court in Tamil Nadu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 300 of the Indian Succession Act, 1925 and Order XXV of the Madras High Court Original Side Rules, the Madras High Court exercises Ordinary Original Civil Jurisdiction for properties situated within Greater Chennai limits or where the testator had a fixed abode in Chennai. For properties located in districts outside Chennai such as Coimbatore, Madurai, Salem, Tiruchirappalli, or Chengalpattu, petitions are filed before the Principal District Court having territorial jurisdiction.",
            },
          },
          {
            "@type": "Question",
            name: "Can a previously paid Succession Certificate fee be adjusted against Madras High Court Probate duty?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 56(2)(a) of the Tamil Nadu Court-Fees and Suits Valuation Act, 1955, if a Succession Certificate under Schedule I Article 7 was earlier obtained for debts or securities included in the same estate, the probate court fee payable under Article 6 is reduced by the fee already paid for that Succession Certificate.",
            },
          },
          {
            "@type": "Question",
            name: "How long does an uncontested Madras High Court Probate OP take and what are the extra expenses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An uncontested Madras High Court Testamentary OP typically takes 4 to 8 months from filing through Master enquiry, paper publication in one English and one Tamil daily, Collector valuation check under Section 55, and final order. Beyond the statutory Rs 25,000 capped court fee, families should budget for newspaper citation notices (typically Rs 6,000 to Rs 15,000), process/batta fees, and an Administration Bond if seeking Letters of Administration instead of Probate.",
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
        <MadrasProbateFeeClient />
        <Footer />
      </div>
    </>
  );
}
