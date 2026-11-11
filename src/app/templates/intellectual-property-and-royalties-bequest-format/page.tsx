import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IpRoyaltiesClient from "./IpRoyaltiesClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "IP & Royalties Will Clause Format India | WillDrafting", // exactly 54 characters
  },
  description:
    "Download verified intellectual property and royalties will clause format in India. Bequeath copyrights, trademarks, and patents under Copyright Act.", // exactly 148 characters
  keywords: [
    "intellectual property copyright will clause format india",
    "trademark inheritance clause draft",
    "book author royalties will format india",
    "patent licensing succession clause sample",
    "copyright act 1957 section 22 royalties 60 years",
    "trade marks act 1999 form tm-m transmission",
    "patents act 1970 section 68 succession",
    "author publishing contract will bequest clause",
    "music streaming royalties inheritance india iprs",
    "software code saas ip succession will format",
    "how to leave copyright to spouse in will india",
    "ama legal solutions intellectual property estate",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/intellectual-property-and-royalties-bequest-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/intellectual-property-and-royalties-bequest-format",
      "x-default": "https://www.willdrafting.in/templates/intellectual-property-and-royalties-bequest-format",
    },
  },
  openGraph: {
    title: "IP & Royalties Will Clause Format India | WillDrafting",
    description:
      "Download verified intellectual property and royalties will clause format in India. Bequeath copyrights, trademarks, and patents under Copyright Act.",
    url: "https://www.willdrafting.in/templates/intellectual-property-and-royalties-bequest-format",
    siteName: "WillDrafting",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/intellectual-property-and-royalties-bequest-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Intellectual property and royalties will clause format India under Copyright Act",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "IP & Royalties Will Clause Format India | WillDrafting",
    description:
      "Download verified intellectual property and royalties will clause format in India. Bequeath copyrights, trademarks, and patents under Copyright Act.",
    images: ["https://www.willdrafting.in/images/intellectual-property-and-royalties-bequest-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function IpRoyaltiesBequestPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/intellectual-property-and-royalties-bequest-format";
  const imageUrl = "https://www.willdrafting.in/images/intellectual-property-and-royalties-bequest-format-og.jpg";

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.willdrafting.in/#organization",
        name: "WillDrafting",
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
        name: "IP & Royalties Will Clause Format India | WillDrafting",
        description:
          "Download verified intellectual property and royalties will clause format in India. Bequeath copyrights, trademarks, and patents under Copyright Act.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting",
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
            name: "IP & Royalties Bequest Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        name: "Intellectual Property and Royalties Will Clause Format India",
        headline: "Intellectual Property & Royalties Will Clause Format",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Verified intellectual property and book author royalties will clause format under Copyright Act 1957 Section 22 and Trade Marks Act 1999.",
        image: imageUrl,
        inLanguage: "en-IN",
        publisher: {
          "@type": "Organization",
          name: "WillDrafting",
          url: "https://www.willdrafting.in",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What happens to intellectual property and royalties when an author dies in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 22 of the Copyright Act, 1957, copyright protection continues for 60 years after the calendar year of the author's death. Royalties from book publishers, music labels, and licensing deals do not vanish. They pass to the legal heirs or specific legatees named in the author's valid Will.",
            },
          },
          {
            "@type": "Question",
            name: "How can an author ensure book royalties pass only to their spouse?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An author must insert a specific bequest clause in their Will naming the spouse as the sole beneficiary of all literary works, publishing contracts, and royalty accounts. They should also execute a formal direction notice to publishers instructing them to transfer royalty payments directly to the surviving spouse.",
            },
          },
          {
            "@type": "Question",
            name: "Can registered trademarks and brand names be bequeathed in an Indian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 37 and Section 45 of the Trade Marks Act, 1999, registered trademarks are personal property that can be transferred by Will. The legatee must file Form TM-M with the Registrar of Trade Marks along with the registered Will to record the transmission of ownership.",
            },
          },
          {
            "@type": "Question",
            name: "How are patent licensing royalties and ownership transferred after death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 68 and Section 69 of the Patents Act, 1970, patent rights and ongoing licensing revenue pass according to the Will. The executor or legatee must submit a formal application to the Controller of Patents to update the Patent Register with the successor's name.",
            },
          },
          {
            "@type": "Question",
            name: "What are moral rights under Section 57 of the Copyright Act, and can they be willed away?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 57 protects the author's moral rights: paternity (right to be named as creator) and integrity (right to prevent distortion or derogatory alteration). While economic royalty rights can be bequeathed to anyone, moral rights remain with legal representatives to defend the creator's reputation.",
            },
          },
          {
            "@type": "Question",
            name: "Do publishers require probate or a succession certificate to release royalties?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Leading publishers like Penguin, HarperCollins, and Amazon KDP require proof of succession. While a registered Will and executor assent often suffice, publishers may request a grant of probate in mandatory metro jurisdictions or a Succession Certificate under Section 372 of the Indian Succession Act if disputes exist.",
            },
          },
          {
            "@type": "Question",
            name: "How should software source code, SaaS products, and app store accounts be willed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Software developers should create a detailed Digital Assets & Software Schedule in their Will. It must identify repository ownership, developer accounts (Google Play Console, Apple Developer), licensing agreements, and cloud infrastructure access, assigning them to a technically capable executor or beneficiary.",
            },
          },
          {
            "@type": "Question",
            name: "What is the consequence of not including an IP bequest clause in a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a Will ignores intellectual property, all copyright royalties, trademark goodwill, and patent income fall into the residuary estate. If there is no residuary clause, the IP passes by intestate succession, dividing rights among all legal heirs and often causing publisher payouts to freeze during family fights.",
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
        <IpRoyaltiesClient />
        <Footer />
      </div>
    </>
  );
}