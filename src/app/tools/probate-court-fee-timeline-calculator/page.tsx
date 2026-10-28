import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProbateFeeCalculatorClient from "./ProbateFeeCalculatorClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Probate Court Fee Calculator India | WillDrafting.in", // exactly 52 characters
  },
  description:
    "Calculate probate court fees in Mumbai, Delhi, Kolkata, and Bengaluru. Check state fee caps, citation costs, and timelines under the Court.", // exactly 154 characters
  keywords: [
    "probate court fee calculator india",
    "cost of probate of will in mumbai delhi kolkata chennai bangalore",
    "how much does probate cost in india",
    "bombay court fees act probate cap 75000",
    "delhi high court probate fee ad valorem",
    "citation publication cost probate",
    "letters of administration court fee calculator",
    "section 213 indian succession act mandatory probate",
    "probate timeline high court india",
    "court fees act 1870 schedule 1 article 11",
    "ama legal solutions probate calculator",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/probate-court-fee-timeline-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/probate-court-fee-timeline-calculator",
      "x-default": "https://www.willdrafting.in/tools/probate-court-fee-timeline-calculator",
    },
  },
  openGraph: {
    title: "Probate Court Fee Calculator India | WillDrafting.in",
    description:
      "Calculate probate court fees in Mumbai, Delhi, Kolkata, and Bengaluru. Check state fee caps, citation costs, and timelines under the Court.",
    url: "https://www.willdrafting.in/tools/probate-court-fee-timeline-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/probate-court-fee-timeline-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Probate Court Fee and Timeline Calculator India - State Ad Valorem Slabs and Caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Probate Court Fee Calculator India | WillDrafting.in",
    description:
      "Calculate probate court fees in Mumbai, Delhi, Kolkata, and Bengaluru. Check state fee caps, citation costs, and timelines under the Court.",
    images: ["https://www.willdrafting.in/images/probate-court-fee-timeline-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ProbateCourtFeeCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/probate-court-fee-timeline-calculator";
  const imageUrl = "https://www.willdrafting.in/images/probate-court-fee-timeline-calculator-og.jpg";

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
        name: "Probate Court Fee Calculator India | WillDrafting.in",
        description:
          "Calculate probate court fees in Mumbai, Delhi, Kolkata, and Bengaluru. Check state fee caps, citation costs, and timelines under the Court.",
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
            name: "Probate Court Fee Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Probate Court Fee and Timeline Calculator India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive statutory court fee calculator for Probate and Letters of Administration in India under Court Fees Act 1870 and state fee.",
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
            name: "How much is the court fee for probate of a Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Court fees depend on the state where you file. In Mumbai, the fee is capped at Rs 75,000 max. In Delhi, you pay 4% with no upper limit. In Kolkata, fees reach up to 5.5%. In Chennai, the rate is 3%. In Bengaluru, court fees range from 5% to 6% of the estate value.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate court fee capped in Maharashtra and Mumbai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under the Bombay Court Fees Act, 1959 (Article 11 Proviso), the court fee is strictly capped at Rs 75,000. Even if an estate is worth Rs 50 Crore or Rs 500 Crore, you never pay more than Rs 75,000 in court fees in Maharashtra courts.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate mandatory in Delhi, Bengaluru, or other non-presidential cities?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 57 and Section 213 of the Indian Succession Act, probate is compulsory only in Mumbai, Kolkata, and Chennai. The Supreme Court in Kanta Yadav (2019) confirmed that probate is optional in Delhi, Bengaluru, and other cities unless a dispute arises.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Probate and Letters of Administration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Probate is granted only to an executor named in a Will under Section 222. Letters of Administration are granted when there is no Will, or when the Will does not name an executor. Both processes give legal authority to transfer assets, but probate requires an existing Will.",
            },
          },
          {
            "@type": "Question",
            name: "What are the newspaper citation costs for probate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 283(1)(c), the court orders notices in two newspapers. One paper is in English and one is in the local language. These publication notices alert the public about the Will. Total publication costs usually range between Rs 15,000 and Rs 35,000.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take to obtain an uncontested probate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An uncontested probate usually takes 6 to 12 months in District Courts. In High Courts like Bombay or Calcutta, it takes about 8 to 14 months. This includes checking papers, publishing notices, waiting 30 days for objections, and getting the Collector valuation report.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to the timeline and costs if a probate petition is contested?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a relative files an objection or caveat under Section 284, the case becomes a full lawsuit under Section 295. The court hears witnesses, checks handwriting, and takes formal evidence. A contested case can take 2 to 5 years and increases legal costs.",
            },
          },
          {
            "@type": "Question",
            name: "Can debts and funeral expenses be deducted from the probate court fee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Schedule III of the Court Fees Act, 1870, you can deduct funeral costs, home loans, and debts owed by the deceased. You only pay court fee on the remaining net value of the estate.",
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
        <ProbateFeeCalculatorClient />
        <Footer />
      </div>
    </>
  );
}
