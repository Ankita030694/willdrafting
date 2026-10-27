import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HufCalculatorClient from "./HufCalculatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "HUF Property Share Calculator | WillDrafting India", // exactly 50 characters
  },
  description:
    "Use our free HUF property share calculator under Section 6 Hindu Succession Act. Compute notional partition, daughter rights, and Wills with WillDrafting.", // exactly 154 characters
  keywords: [
    "huf property share calculator",
    "ancestral property share calculator india",
    "notional partition section 6 calculator",
    "coparcenary share of daughter son widow",
    "hindu succession act section 6 partition calculator",
    "vineeta sharma v rakesh sharma coparcenary rights",
    "section 30 testamentary disposition of coparcenary interest",
    "karta share devolution intestate vs will",
    "widow share in huf ancestral property",
    "daughter equal coparcenary share calculator",
    "ama legal solutions huf calculator",
    "hindu undivided family partition deed format",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/huf-coparcenary-share-partition-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/huf-coparcenary-share-partition-calculator",
      "x-default": "https://www.willdrafting.in/tools/huf-coparcenary-share-partition-calculator",
    },
  },
  openGraph: {
    title: "HUF Property Share Calculator | WillDrafting India",
    description:
      "Use our free HUF property share calculator under Section 6 Hindu Succession Act. Compute notional partition, daughter rights, and Wills with WillDrafting.",
    url: "https://www.willdrafting.in/tools/huf-coparcenary-share-partition-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/huf-coparcenary-share-partition-calculator-og.jpg",
        width: 1376,
        height: 768,
        alt: "HUF Property Share and Coparcenary Partition Calculator India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUF Property Share Calculator | WillDrafting India",
    description:
      "Use our free HUF property share calculator under Section 6 Hindu Succession Act. Compute notional partition, daughter rights, and Wills with WillDrafting.",
    images: ["https://www.willdrafting.in/images/huf-coparcenary-share-partition-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function HufPartitionCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/huf-coparcenary-share-partition-calculator";
  const imageUrl = "https://www.willdrafting.in/images/huf-coparcenary-share-partition-calculator-og.jpg";

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
        name: "HUF Property Share Calculator | WillDrafting India",
        description:
          "Use our free HUF property share calculator under Section 6 Hindu Succession Act. Compute notional partition, daughter rights, and Wills with WillDrafting.",
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
            name: "HUF Property Share Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "HUF Coparcenary Share & Notional Partition Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive legal calculator computing 2-stage Hindu Undivided Family partition shares under Section 6, Section 8, and Section 30 of the Hindu Succession Act, 1956.",
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
            name: "What is an HUF and who qualifies as a coparcener in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Hindu Undivided Family (HUF) consists of all persons lineally descended from a common male ancestor, including their wives and unmarried or married daughters. A coparcener is a narrower subgroup within the HUF who acquires an immediate ownership interest in ancestral property by birth. Under Mitakshara Hindu law, only coparceners have the legal right to demand a partition of ancestral property.",
            },
          },
          {
            "@type": "Question",
            name: "What is a notional partition under Section 6 of the Hindu Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 6(3) of the Hindu Succession Act, 1956, when a Hindu male dies having an interest in Mitakshara coparcenary property, the law creates a legal fiction called a notional partition. The property is treated as if a formal partition had taken place immediately before the death of the deceased. This calculation carves out the deceased's specific fractional share from the joint family pool.",
            },
          },
          {
            "@type": "Question",
            name: "What are a daughter's coparcenary rights after Vineeta Sharma (2020)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In the landmark ruling Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1, a three-judge bench of the Supreme Court held that daughters are coparceners by birth with the exact same rights and liabilities as sons. The court clarified that this birthright is unobstructed. It does not matter whether the father was alive on September 9, 2005. Only registered partition deeds or court decrees executed prior to December 20, 2004 remain unaffected.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Karta or coparcener dispose of HUF property in a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, but strictly for their undivided coparcenary share. Under Section 30 of the Hindu Succession Act, 1956, any Hindu coparcener can bequeath their separated notional coparcenary interest by executing a valid Will. However, a coparcener or Karta cannot execute a Will giving away the entire HUF property or other coparceners' shares without their consent.",
            },
          },
          {
            "@type": "Question",
            name: "What share does a Hindu widow receive upon her husband's death in an HUF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Hindu widow is an HUF member entitled to maintenance, but she is not a coparcener by birth under Section 6. Therefore, she receives 0% in Stage 1 coparcenary allotment. However, in Stage 2, if her husband dies without a Will (intestate), she inherits an equal share of his carved-out 1/N portion alongside other Class I heirs under Section 8. If her husband executes a Will under Section 30, he can bequeath up to 100% of his 1/N share exclusively to her.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a Karta dies intestate without making a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If the Karta dies intestate, their notional coparcenary share (1/N) does not remain joint HUF property. Under Section 6(3) and Section 8, that 1/N portion is divided equally among all surviving Class I legal heirs, including the widow, surviving mother, sons, and daughters. This often fragments the estate and leaves the surviving spouse with a minority fraction.",
            },
          },
          {
            "@type": "Question",
            name: "Can a married daughter demand a physical partition of HUF property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Post the 2005 Amendment and the Supreme Court decision in Vineeta Sharma, a daughter remains a coparcener of her father's HUF throughout her life, even after marriage. She possesses the absolute legal right to demand a partition and claim her independent share in ancestral property, just like a son.",
            },
          },
          {
            "@type": "Question",
            name: "Who becomes the new Karta after the death of the father?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "By Hindu legal custom and high court precedent (Sujata Sharma v. Manu Gupta, 2016 Delhi HC), the eldest surviving coparcener of the family becomes the new Karta. This includes the eldest daughter if she is senior in age to her siblings. If all surviving coparceners are minors, the surviving mother can act as the manager or guardian of the HUF.",
            },
          },
          {
            "@type": "Question",
            name: "How does HUF ancestral property differ from self-acquired property in a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Self-acquired property is owned 100% individually, and the owner has unrestricted freedom to gift or bequeath it to anyone in a Will without family consent. In contrast, HUF ancestral property belongs to all coparceners jointly by birth. In HUF property, a person can only bequeath their own undivided fractional share under Section 30, leaving the remaining coparceners' shares untouched.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <HufCalculatorClient />
      <Footer />
    </>
  );
}