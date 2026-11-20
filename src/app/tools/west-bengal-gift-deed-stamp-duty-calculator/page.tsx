import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WestBengalGiftDeedClient from "./WestBengalGiftDeedClient";

// Screaming Frog Rules: Title 50-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "West Bengal Gift Deed Stamp Duty Tool | WillDrafting", // 52 characters
  },
  description:
    "Calculate West Bengal Gift Deed stamp duty under Article 33. Check ₹1,000 family cap, 1% wbregistration fee, urban vs rural slabs, and Will savings.", // 148 characters
  keywords: [
    "west bengal gift deed stamp duty calculator",
    "wbregistration gift deed stamp duty family 0.5 percent",
    "west bengal finance act 2024 gift deed 1000 cap",
    "kolkata gift deed to son daughter cost",
    "west bengal release deed stamp duty article 55",
    "west bengal partition deed stamp duty article 45",
    "article 33 schedule ia west bengal family member definition",
    "wb gift deed registration fee 1 percent grips",
    "salt lake leasehold gift deed stamp duty atma ram saraf",
    "son in law vs daughter in law gift deed west bengal",
    "banglarbhumi kmc mutation after gift deed kolkata",
    "willdrafting west bengal stamp duty calculator",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/west-bengal-gift-deed-stamp-duty-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/west-bengal-gift-deed-stamp-duty-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/west-bengal-gift-deed-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "West Bengal Gift Deed Stamp Duty Tool | WillDrafting",
    description:
      "Calculate West Bengal Gift Deed stamp duty under Article 33. Check ₹1,000 family cap, 1% wbregistration fee, urban vs rural slabs, and Will savings.",
    url: "https://www.willdrafting.in/tools/west-bengal-gift-deed-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/west-bengal-gift-deed-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Bengali family reviewing West Bengal Gift Deed stamp duty rules in Kolkata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "West Bengal Gift Deed Stamp Duty Tool | WillDrafting",
    description:
      "Calculate West Bengal Gift Deed stamp duty under Article 33. Check ₹1,000 family cap, 1% wbregistration fee, urban vs rural slabs, and Will savings.",
    images: [
      "https://www.willdrafting.in/images/west-bengal-gift-deed-stamp-duty-calculator-og.jpg",
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

export default function WestBengalGiftDeedCalculatorPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/west-bengal-gift-deed-stamp-duty-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/west-bengal-gift-deed-stamp-duty-calculator-og.jpg";

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
        name: "West Bengal Gift Deed Stamp Duty Tool | WillDrafting",
        description:
          "Calculate West Bengal Gift Deed stamp duty under Article 33. Check ₹1,000 family cap, 1% wbregistration fee, urban vs rural slabs, and Will savings.",
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
            name: "West Bengal Gift Deed Stamp Duty Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "West Bengal Gift Deed Stamp Duty Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free West Bengal stamp duty and wbregistration fee calculator for Article 33 Gift Deeds, Article 45 Partition Deeds, and Article 55 Release Deeds with urban vs rural valuation checks.",
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
            name: "Is stamp duty on a family gift deed in West Bengal still 0.5% or capped at Rs 1,000?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 33(i) of Schedule IA of the Indian Stamp Act in West Bengal, the rate is 0.5% of market value. However, Section 2(2) of the West Bengal Finance Act, 2024 (effective June 15, 2024 via Notification No. 929-FT) capped this stamp duty at a maximum of Rs 1,000 for eligible family members. You still pay the separate 1% registration fee with no cap.",
            },
          },
          {
            "@type": "Question",
            name: "Who qualifies as a family member under Article 33 in West Bengal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Explanation to Article 33 lists nine exact relations: parent, spouse, son, daughter, son's wife (daughter-in-law), grandson, granddaughter, brother, and sister. Married, unmarried, widowed, and divorced daughters or siblings are included. Sons-in-law, uncles, aunts, cousins, nephews, nieces, and parents-in-law do not qualify and pay full 5% to 7% conveyance stamp duty.",
            },
          },
          {
            "@type": "Question",
            name: "Does the Rs 1,000 cap also reduce the 1% registration fee on wbregistration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The West Bengal Finance Act, 2024 caps only the stamp duty under Article 33(i) at Rs 1,000. Under Article A(1) of the West Bengal Table of Fees under the Registration Act, 1908, the registration fee stays 1% of the full government market value (minimum Rs 50) with no upper cap, plus minor e-Nathikaran processing charges.",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamp duty on a non-family gift deed in Kolkata vs rural West Bengal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Gifts outside the statutory family list attract Article 23 conveyance stamp duty. In urban areas like Kolkata KMC, Howrah, Salt Lake, Siliguri, and municipalities, stamp duty is 6% up to Rs 1 Crore and 7% above Rs 1 Crore. In Gram Panchayat rural areas, it is 5% up to Rs 1 Crore and 6% above Rs 1 Crore, plus 1% registration fee. There is no women's rebate in West Bengal.",
            },
          },
          {
            "@type": "Question",
            name: "Does a gift to a son-in-law or daughter-in-law get the West Bengal family rate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A daughter-in-law (son's wife) is named in the Explanation to Article 33, so she gets the 0.5% duty capped at Rs 1,000. A son-in-law (daughter's husband) is excluded and must pay full 5% to 7% conveyance stamp duty, even though both are tax-free relatives under Section 56(2)(x) of the Income Tax Act.",
            },
          },
          {
            "@type": "Question",
            name: "Can Salt Lake 999-year leasehold plots get the Rs 1,000 Article 33(i) family gift cap?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Be careful. In Atma Ram Saraf v. State of West Bengal (2021), the Calcutta High Court held that gifting a leasehold share is a transfer of lease under Article 63 rather than freehold ownership under Article 33(i). Salt Lake plots also require checking 17-clause vs 20-clause lease rules and UD&MA Nagarayan permission before filing on e-Nathikaran.",
            },
          },
          {
            "@type": "Question",
            name: "How do I update land or flat records on BanglarBhumi or KMC after a gift deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For plots and homes outside KMC limits, apply online on banglarbhumi.gov.in for BL&LRO mutation and pay the fee via GRIPS to update your Khatian or Porcha. For flats and houses inside Kolkata Municipal Corporation limits, apply to the KMC Assessment-Collection Department with your registered Gift Deed and property tax No Outstanding Certificate.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Will still cheaper than a family Gift Deed in Kolkata after Section 213 repeal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A Will carries zero stamp duty and lets you keep 100% ownership and cancel or edit it anytime while alive. The Repealing and Amending Act, 2025 omitted Section 213 of the Indian Succession Act from December 20, 2025, ending mandatory Kolkata probate. Still, a Gift Deed gives immediate title and faster mutation when you want to transfer ownership right now.",
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
        <WestBengalGiftDeedClient />
        <Footer />
      </div>
    </>
  );
}
