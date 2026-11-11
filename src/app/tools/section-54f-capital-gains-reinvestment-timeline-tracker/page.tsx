import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section54FTimelineClient from "./Section54FTimelineClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Section 54F Capital Gains Timeline Tool | WillDrafting", // exactly 54 characters
  },
  description:
    "Track exact Section 54 and 54F reinvestment deadlines, construction timelines, and CGAS bank deposit dates on selling inherited property in India.", // exactly 146 characters
  keywords: [
    "section 54f capital gains timeline calculator inheritance",
    "section 54 vs 54f inherited property calculator",
    "capital gains account scheme deposit deadline tracker",
    "budget 2024 section 54 exemption tool",
    "section 54f timeline calculator india",
    "inherited plot sale section 54f capital gains",
    "cgas scheme account a vs account b",
    "section 139 1 itr deadline capital gains reinvestment",
    "10 crore exemption cap section 54 budget 2023 2024",
    "holding period inherited property section 49 1",
    "capital gains tax on sale of ancestral property",
    "ama legal solutions capital gains tax advisory",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/section-54f-capital-gains-reinvestment-timeline-tracker",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/section-54f-capital-gains-reinvestment-timeline-tracker",
      "x-default":
        "https://www.willdrafting.in/tools/section-54f-capital-gains-reinvestment-timeline-tracker",
    },
  },
  openGraph: {
    title: "Section 54F Capital Gains Timeline Tool | WillDrafting",
    description:
      "Track exact Section 54 and 54F reinvestment deadlines, construction timelines, and CGAS bank deposit dates on selling inherited property in India.",
    url: "https://www.willdrafting.in/tools/section-54f-capital-gains-reinvestment-timeline-tracker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/section-54f-capital-gains-reinvestment-timeline-tracker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Section 54 and 54F Capital Gains Reinvestment Timeline Tracker India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Section 54F Capital Gains Timeline Tool | WillDrafting",
    description:
      "Track exact Section 54 and 54F reinvestment deadlines, construction timelines, and CGAS bank deposit dates on selling inherited property in India.",
    images: [
      "https://www.willdrafting.in/images/section-54f-capital-gains-reinvestment-timeline-tracker-og.jpg",
    ],
    site: "@willdrafting",
    creator: "@willdrafting",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function Section54FTimelinePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/section-54f-capital-gains-reinvestment-timeline-tracker";
  const imageUrl =
    "https://www.willdrafting.in/images/section-54f-capital-gains-reinvestment-timeline-tracker-og.jpg";

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
        name: "Section 54F Capital Gains Timeline Tool | WillDrafting",
        description:
          "Track exact Section 54 and 54F reinvestment deadlines, construction timelines, and CGAS bank deposit dates on selling inherited property in India.",
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
            name: "Section 54F Capital Gains Timeline Tracker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Section 54 and Section 54F Capital Gains Reinvestment Timeline Tracker India",
        url: canonicalUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        description:
          "Diagnostic tax calculator tracking 1-year prior, 2-year purchase, and 3-year construction deadlines with CGAS bank deposit dates under Section 54 and 54F of the Income Tax Act.",
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
            name: "What is the key difference between Section 54 and Section 54F?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 54 applies when you sell a long-term residential house property. To get full tax relief, you only need to reinvest the capital gains amount. In contrast, Section 54F applies when you sell any long-term asset other than a residential house (such as an inherited plot, commercial shop, gold, or shares). Under Section 54F, you must reinvest the entire net sale consideration to receive 100% tax exemption.",
            },
          },
          {
            "@type": "Question",
            name: "Can I claim Section 54F if I already own a residential house in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, but with a strict condition. On the exact date of selling your asset, you must not own more than ONE residential house property (other than the new house you plan to purchase or construct). If you own two or more residential houses on the transfer date, you are legally disqualified from claiming tax relief under Section 54F.",
            },
          },
          {
            "@type": "Question",
            name: "What is the deadline for depositing funds into the Capital Gains Account Scheme (CGAS)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If you have not fully utilized your capital gains (Section 54) or net sale proceeds (Section 54F) to buy or build a new house before filing your tax return, you must deposit the unutilized funds into a CGAS account with an authorized bank on or before the due date for filing your Income Tax Return under Section 139(1) (usually July 31 for individuals). Missing this deadline causes full forfeiture of the tax exemption.",
            },
          },
          {
            "@type": "Question",
            name: "What are the exact reinvestment timelines under Section 54 and 54F?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both sections offer three distinct time windows: (1) Purchase a ready house within 1 year before the sale date, (2) Purchase a ready house within 2 years after the sale date, or (3) Complete construction of a new residential house within 3 years after the sale date.",
            },
          },
          {
            "@type": "Question",
            name: "How does the Budget 2024 LTCG tax rate change affect inherited property sales?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Budget 2024 set the long-term capital gains tax rate on real estate at 12.5% without indexation for transfers on or after July 23, 2024. However, for resident individuals and HUFs who acquired property before July 23, 2024 (including inherited property where the predecessor bought it before that date), taxpayers can calculate tax at 20% with indexation or 12.5% without indexation and pay whichever amount is lower.",
            },
          },
          {
            "@type": "Question",
            name: "What is the maximum exemption limit under Section 54 and Section 54F?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under amendments introduced in the Finance Act 2023, the maximum capital gains exemption claimable under Section 54 and Section 54F is capped at ₹10 Crore per transaction. Any capital gains or reinvestment cost exceeding ₹10 Crore will not qualify for exemption and will be taxed at applicable LTCG rates.",
            },
          },
          {
            "@type": "Question",
            name: "How is the holding period calculated when selling inherited property in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 49(1) and Explanation 1(b) to Section 2(42A) of the Income Tax Act, the holding period of the previous owner (the deceased parent or relative) is added to your holding period. If the combined holding period exceeds 24 months, the asset is treated as a long-term capital asset, qualifying for Section 54 or Section 54F relief.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the builder delays possession beyond the 3-year construction deadline?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Judicial precedents from multiple High Courts, including the Delhi High Court in Sanjeev Puri and Karnataka High Court in Smt. K.G. Rukminiamma, have held that if a taxpayer has invested the requisite funds within the statutory period and delay is solely due to the builder, the tax exemption should not be denied, provided substantial construction steps were completed.",
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
        <Section54FTimelineClient />
        <Footer />
      </div>
    </>
  );
}
