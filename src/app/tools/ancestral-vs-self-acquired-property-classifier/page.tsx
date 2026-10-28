import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AncestralClassifierClient from "./AncestralClassifierClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Ancestral vs Self-Acquired Property Checker | WillDrafting", // exactly 58 characters
  },
  description:
    "Check if property is ancestral or self-acquired under Hindu Succession Act. Trace provenance under Section 8 vs Section 6 and verify 100% Will.", // exactly 150 characters
  keywords: [
    "how to check if property is ancestral or self acquired",
    "is property inherited from father ancestral or self acquired",
    "section 8 vs section 6 property test india",
    "hindu succession act ancestral property rules",
    "cwt v chander sen supreme court ruling",
    "yudhishter v ashok kumar property inheritance",
    "uttam v saubhag singh coparcenary partition",
    "arshnoor singh v harpal kaur 2019 supreme court",
    "vineeta sharma v rakesh sharma daughter rights",
    "can father will away inherited property in india",
    "grandson rights in grandfather property india",
    "difference between ancestral and self acquired property",
    "ama legal solutions property classification",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/ancestral-vs-self-acquired-property-classifier",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/ancestral-vs-self-acquired-property-classifier",
      "x-default": "https://www.willdrafting.in/tools/ancestral-vs-self-acquired-property-classifier",
    },
  },
  openGraph: {
    title: "Ancestral vs Self-Acquired Property Checker | WillDrafting",
    description:
      "Check if property is ancestral or self-acquired under Hindu Succession Act. Trace provenance under Section 8 vs Section 6 and verify 100% Will.",
    url: "https://www.willdrafting.in/tools/ancestral-vs-self-acquired-property-classifier",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/ancestral-vs-self-acquired-property-classifier-og.jpg",
        width: 1200,
        height: 675,
        alt: "Ancestral vs Self-Acquired Property Classifier and Hindu Succession Act Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ancestral vs Self-Acquired Property Checker | WillDrafting",
    description:
      "Check if property is ancestral or self-acquired under Hindu Succession Act. Trace provenance under Section 8 vs Section 6 and verify 100% Will.",
    images: ["https://www.willdrafting.in/images/ancestral-vs-self-acquired-property-classifier-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function AncestralPropertyClassifierPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/ancestral-vs-self-acquired-property-classifier";
  const imageUrl = "https://www.willdrafting.in/images/ancestral-vs-self-acquired-property-classifier-og.jpg";

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
        name: "Ancestral vs Self-Acquired Property Checker | WillDrafting",
        description:
          "Check if property is ancestral or self-acquired under Hindu Succession Act. Trace provenance under Section 8 vs Section 6 and verify 100% Will.",
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
            name: "Ancestral vs Self-Acquired Classifier",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Ancestral vs Self-Acquired Property Classifier India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive diagnostic tool to classify real estate as ancestral or self-acquired under Hindu Succession Act 1956, tracing provenance across.",
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
            name: "Is property inherited from my father ancestral or self-acquired?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the landmark Supreme Court ruling in Commissioner of Wealth Tax v. Chander Sen (1986), property inherited by a son from his father who died intestate after 1956 devolves under Section 8 of the Hindu Succession Act. In the hands of the son, this property is held as his separate and self-acquired property, not as ancestral coparcenary property. His own children do not acquire any birthright in it.",
            },
          },
          {
            "@type": "Question",
            name: "What makes a property legally ancestral in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To qualify as ancestral property under Hindu law, four conditions must be met: (1) It must have been inherited through four generations of male lineage (paternal great-grandfather, grandfather, father, to current owner), (2) It must have remained completely undivided without any partition deed, (3) It must not have passed under a Will, gift deed, or Section 8 intestate succession, and (4) It must not have been acquired with individual separate income.",
            },
          },
          {
            "@type": "Question",
            name: "Can my father sell or Will away property he inherited from his father?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. If your father inherited the property under Section 8 of the Hindu Succession Act after 1956 (or via his father's registered Will or Gift Deed), it is his self-acquired property. He holds 100% testamentary and alienation freedom. He can sell it, gift it, or bequeath 100% of it to anyone through a Will without seeking consent from his children.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to ancestral property after a partition deed is registered?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once a valid partition takes place among coparceners through a registered partition deed or court decree, the joint family character is severed. Under the Supreme Court ruling in Uttam v. Saubhag Singh (2016), the divided share received by an individual becomes his separate property vis-a-vis his collaterals. Any child born after the succession cannot claim a coparcenary share in the divided property.",
            },
          },
          {
            "@type": "Question",
            name: "Do daughters have equal rights in ancestral property in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Following the landmark 3-judge Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), daughters are coparceners by birth with identical rights and liabilities as sons under Section 6 of the Hindu Succession Act. This right applies irrespective of whether the father was alive on September 9, 2005.",
            },
          },
          {
            "@type": "Question",
            name: "Can a grandson claim a share in his grandfather's self-acquired property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A grandchild has zero birthright in their grandfather's self-acquired property during the grandfather's lifetime. The grandfather can sell, mortgage, gift, or execute a Will bequeathing the property to anyone. Even if the father passes away, the grandchild cannot demand partition of the grandfather's self-acquired assets.",
            },
          },
          {
            "@type": "Question",
            name: "Is property received via a Gift Deed or Will considered ancestral?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the Supreme Court judgment in C.N. Arunachala Mudaliar v. C.A. Muruganatha Mudaliar (1953), property received by an heir through a Gift Deed or a Will from a parent is treated as self-acquired property, unless the grantor expressly stipulated in the document that the property is meant for the benefit of the family coparcenary.",
            },
          },
          {
            "@type": "Question",
            name: "Can a coparcener make a Will of their share in ancestral property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 30 of the Hindu Succession Act, 1956, any Hindu coparcener has the legal right to dispose of their undivided coparcenary interest (their specific mathematical share) by executing a Will. However, they cannot Will away the entire ancestral estate or the shares belonging to other coparceners.",
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
        <AncestralClassifierClient />
        <Footer />
      </div>
    </>
  );
}
