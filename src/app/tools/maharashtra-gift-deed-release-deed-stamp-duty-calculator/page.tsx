import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaharashtraStampDutyClient from "./MaharashtraStampDutyClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Maharashtra Gift & Release Deed Duty Tool | WillDrafting", // 56 characters
  },
  description:
    "Calculate Maharashtra stamp duty for family Gift Deeds (₹200 residential concession) and Release Deeds (₹500). Verify blood relative eligibility.", // 147 characters
  keywords: [
    "maharashtra gift deed stamp duty calculator",
    "maharashtra release deed stamp duty blood relative",
    "article 34 gift deed stamp duty maharashtra",
    "article 52a release deed stamp duty maharashtra",
    "igrs maharashtra family transfer fee",
    "gift deed from father to son stamp duty mumbai",
    "hakka sod patra stamp duty maharashtra",
    "ready reckoner gift deed stamp duty pune",
    "maharashtra stamp act 1958 article 34",
    "maharashtra gift deed registration fee 30000 cap",
    "willdrafting maharashtra stamp duty",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "Maharashtra Gift & Release Deed Duty Tool | WillDrafting",
    description:
      "Calculate Maharashtra stamp duty for family Gift Deeds (₹200 residential concession) and Release Deeds (₹500). Verify blood relative eligibility.",
    url: "https://www.willdrafting.in/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/maharashtra-gift-deed-release-deed-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Maharashtra Gift and Release Deed Stamp Duty Calculator Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Maharashtra Gift & Release Deed Duty Tool | WillDrafting",
    description:
      "Calculate Maharashtra stamp duty for family Gift Deeds (₹200 residential concession) and Release Deeds (₹500). Verify blood relative eligibility.",
    images: [
      "https://www.willdrafting.in/images/maharashtra-gift-deed-release-deed-stamp-duty-calculator-og.jpg",
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

export default function MaharashtraGiftReleaseDutyPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/maharashtra-gift-deed-release-deed-stamp-duty-calculator-og.jpg";

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
        name: "Maharashtra Gift & Release Deed Duty Tool | WillDrafting",
        description:
          "Calculate Maharashtra stamp duty for family Gift Deeds (₹200 residential concession) and Release Deeds (₹500). Verify blood relative eligibility.",
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
            name: "Maharashtra Gift & Release Deed Stamp Duty",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Maharashtra Gift Deed & Release Deed Stamp Duty Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free calculator for Maharashtra Stamp Act Article 34 Gift Deed and Article 52(a) Release Deed stamp duty, Metro Cess, and IGRS registration fees.",
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
            name: "Is stamp duty on a gift deed from father to son in Mumbai really Rs 200?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, if the property is residential or agricultural. Under the second proviso to Article 34 of the Maharashtra Stamp Act, 1958, a gift of residential or agricultural property to a spouse, son, daughter, grandchild, or wife of a deceased son attracts a flat Rs 200 stamp duty and Rs 200 registration fee. However, commercial property gifted to a son attracts 3% stamp duty plus applicable urban cess.",
            },
          },
          {
            "@type": "Question",
            name: "Which relatives qualify for the Rs 200 gift deed stamp duty in Maharashtra?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Only seven close family relations qualify for the Rs 200 concession on residential or agricultural property: husband, wife, son, daughter, grandson, granddaughter, and the wife of a deceased son. Parents, brothers, and sisters do not qualify for Rs 200 and must pay 3% stamp duty under the first proviso to Article 34.",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamp duty on a Release Deed (Hakka Sod Patra) in Maharashtra?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 52(a) of the Maharashtra Stamp Act, a Release Deed executed without consideration in favour of specified close family co-owners of ancestral property attracts a flat Rs 500 stamp duty. If the property is self-acquired, or money is paid, standard conveyance stamp duty applies on the released share.",
            },
          },
          {
            "@type": "Question",
            name: "Do I have to pay 3% stamp duty when gifting a flat to my brother or parents in Maharashtra?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Article 34 of the Maharashtra Stamp Act, brothers, sisters, and parents are covered under the 3% family slab, not the Rs 200 slab. You also pay 1% registration fee capped at Rs 30,000 and applicable urban local cess.",
            },
          },
          {
            "@type": "Question",
            name: "Is registration compulsory for a Rs 200 Gift Deed or Rs 500 Release Deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 17 of the Registration Act, 1908 and Section 123 of the Transfer of Property Act, 1882, any gift or release of immovable property worth Rs 100 or more must be registered at the local IGRS Maharashtra Sub-Registrar Office. Notarizing on stamp paper is not legally valid.",
            },
          },
          {
            "@type": "Question",
            name: "How much is the IGRS Maharashtra registration fee cap?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For standard property deeds and 3% family gift deeds, the IGRS Maharashtra registration fee is 1% of the Ready Reckoner market value, strictly capped at Rs 30,000. For qualifying Rs 200 residential or agricultural gift deeds to spouse, child, or grandchild, the registration fee is a flat Rs 200.",
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
        <MaharashtraStampDutyClient />
        <Footer />
      </div>
    </>
  );
}
