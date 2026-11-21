import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TamilNaduStampDutyClient from "./TamilNaduStampDutyClient";

// Screaming Frog Rules: Title 50-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Tamil Nadu Settlement & Release Duty Tool | WillDrafting", // 56 characters
  },
  description:
    "Calculate Tamil Nadu Settlement & Release Deed stamp duty (Art. 58 & 55). Check ₹40,000 family cap, ₹10,000 TNREGINET fee, and legal heir rules.", // 144 characters
  keywords: [
    "tamil nadu settlement deed stamp duty calculator",
    "tamil nadu release deed stamp duty calculator",
    "article 58 settlement deed stamp duty tamil nadu",
    "article 55a release deed stamp duty tamil nadu",
    "tnreginet settlement deed registration fee 40000 10000",
    "go ms no 69 tamil nadu stamp duty cap",
    "tamil nadu act 13 of 2024 family definition legal heirs",
    "non family settlement deed stamp duty tamil nadu 7 percent",
    "co owner release deed article 55c tamil nadu",
    "settlement deed vs gift deed vs will tamil nadu",
    "unilateral cancellation settlement deed sasikala madras hc",
    "grandparents family definition article 58 madras high court",
    "willdrafting tamil nadu stamp duty calculator",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/tamil-nadu-settlement-release-deed-stamp-duty-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/tamil-nadu-settlement-release-deed-stamp-duty-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/tamil-nadu-settlement-release-deed-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "Tamil Nadu Settlement & Release Duty Tool | WillDrafting",
    description:
      "Calculate Tamil Nadu Settlement & Release Deed stamp duty (Art. 58 & 55). Check ₹40,000 family cap, ₹10,000 TNREGINET fee, and legal heir rules.",
    url: "https://www.willdrafting.in/tools/tamil-nadu-settlement-release-deed-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/tamil-nadu-settlement-release-deed-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Tamil Nadu family reviewing Settlement and Release Deed stamp duty rules in Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Tamil Nadu Settlement & Release Duty Tool | WillDrafting",
    description:
      "Calculate Tamil Nadu Settlement & Release Deed stamp duty (Art. 58 & 55). Check ₹40,000 family cap, ₹10,000 TNREGINET fee, and legal heir rules.",
    images: [
      "https://www.willdrafting.in/images/tamil-nadu-settlement-release-deed-stamp-duty-calculator-og.jpg",
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

export default function TamilNaduSettlementReleaseDutyPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/tamil-nadu-settlement-release-deed-stamp-duty-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/tamil-nadu-settlement-release-deed-stamp-duty-calculator-og.jpg";

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
        name: "Tamil Nadu Settlement & Release Duty Tool | WillDrafting",
        description:
          "Calculate Tamil Nadu Settlement & Release Deed stamp duty (Art. 58 & 55). Check ₹40,000 family cap, ₹10,000 TNREGINET fee, and legal heir rules.",
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
            name: "Tamil Nadu Settlement & Release Deed Stamp Duty",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Tamil Nadu Settlement & Release Deed Stamp Duty Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free Tamil Nadu stamp duty and TNREGINET registration fee calculator for Article 58 Settlement Deeds and Article 55 Release Deeds with family cap checks.",
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
            name: "What is the maximum stamp duty and registration fee for a family settlement deed in Tamil Nadu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 58(a)(i) of the Indian Stamp Act (Tamil Nadu) and G.O.(Ms.) No. 69 effective July 10, 2023, a settlement deed to an eligible family member attracts 1% stamp duty capped at Rs 40,000 and 1% registration fee capped at Rs 10,000. Even if the property is worth Rs 5 Crore, the maximum statutory total stays Rs 50,000 plus minor scanning charges.",
            },
          },
          {
            "@type": "Question",
            name: "Who counts as a family member under Article 58 and Article 55 in Tamil Nadu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Explanation to Article 58 defines family strictly as father, mother, husband, wife, son, daughter, grandchild, brother, or sister, including adoptive parents and adopted children under personal law. Under Tamil Nadu Act 13 of 2024 (effective May 3, 2024), family under Article 55 also includes the legal heirs of a deceased family member.",
            },
          },
          {
            "@type": "Question",
            name: "Does a settlement deed from a grandchild to a grandparent qualify for the Rs 40,000 cap?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A Full Bench of the Madras High Court in V. Shiva v. Inspector General of Registration held that the word means in the Explanation to Article 58 is exhaustive. While a grandparent settling property to a grandchild qualifies, a grandchild settling upward to a grandparent does not. It attracts 7% stamp duty and 2% registration fee with no cap.",
            },
          },
          {
            "@type": "Question",
            name: "How is stamp duty calculated on a family release deed in Tamil Nadu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For a release deed among family co-owners under Article 55-A, duty is calculated only on the market or guideline value of the specific undivided share being released, not the whole property. The rate is 1% stamp duty capped at Rs 40,000 and 1% registration fee capped at Rs 10,000. The recipient must already hold a prior legal share in the property.",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamp duty for a non-family settlement deed or non-family release deed in Tamil Nadu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For a non-family settlement deed under Article 58(a)(ii), you pay 7% stamp duty and 2% registration fee (reduced from 4% under G.O.Ms.No. 34 effective April 1, 2023), totaling 9% with no upper cap. For a non-family co-owner release deed under Article 55-C, you pay 7% stamp duty and 1% registration fee on the released share with no cap.",
            },
          },
          {
            "@type": "Question",
            name: "Can a parent unilaterally cancel a registered settlement deed in Tamil Nadu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. In Sasikala v. Revenue Divisional Officer (2022), a Full Bench of the Madras High Court ruled that unilateral cancellation of a registered settlement deed is void ab initio and Sub-Registrars cannot register it. Cancellation requires mutual consent under Article 58(b) (Rs 1,000 stamp duty), a Civil Court decree, or a Maintenance Tribunal order under Section 23 of the Senior Citizens Act.",
            },
          },
          {
            "@type": "Question",
            name: "Why do Tamil Nadu families prefer a Settlement Deed over a Gift Deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Tamil Nadu, a Family Settlement Deed under Article 58(a)(i) has clear statutory caps of Rs 40,000 stamp duty and Rs 10,000 registration fee, and lets parents retain life interest or add family terms. By contrast, a Gift Deed under Article 33 mirrors a Conveyance (7% stamp duty plus 2% registration fee) if outside the family settlement scope and cannot carry conditions.",
            },
          },
          {
            "@type": "Question",
            name: "Is a registered Will cheaper than a Settlement Deed in Tamil Nadu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A Will attracts zero stamp duty across India and only nominal Book 3 filing charges on TNREGINET if registered voluntarily under Section 18(e) of the Registration Act. Unlike a settlement deed, a Will lets you keep full ownership and change your mind during your lifetime. However, immovable property located inside Chennai city limits requires probate under Section 213 of the Indian Succession Act.",
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
        <TamilNaduStampDutyClient />
        <Footer />
      </div>
    </>
  );
}
