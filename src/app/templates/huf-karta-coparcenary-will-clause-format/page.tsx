import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HufKartaCoparcenaryWillClauseClient from "./HufKartaCoparcenaryWillClauseClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "How to Mention Huf Share in Will Format | WillDrafting.in", // exactly 56 characters
  },
  description:
    "Learn how to mention huf share in will format under Section 30 Hindu Succession Act. Download lawyer-vetted coparcenary clauses and avoid.", // exactly 151 characters
  keywords: [
    "how to mention huf share in will format",
    "section 30 hindu succession act will clause format",
    "bequest of undivided coparcenary interest in huf template",
    "huf karta will clause format india",
    "radhamma v muddukrishna supreme court huf will",
    "notional partition huf will clause section 6",
    "can karta make a will of huf property",
    "void vs valid huf will clause",
    "daughter coparcenary share huf will vineeta sharma",
    "ama legal solutions huf succession lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/huf-karta-coparcenary-will-clause-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/huf-karta-coparcenary-will-clause-format",
      "x-default": "https://www.willdrafting.in/templates/huf-karta-coparcenary-will-clause-format",
    },
  },
  openGraph: {
    title: "How to Mention Huf Share in Will Format | WillDrafting.in",
    description:
      "Learn how to mention huf share in will format under Section 30 Hindu Succession Act. Download lawyer-vetted coparcenary clauses and avoid.",
    url: "https://www.willdrafting.in/templates/huf-karta-coparcenary-will-clause-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/huf-karta-coparcenary-will-clause-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "HUF Karta Coparcenary Will Clause Format and Section 30 Bequest Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Mention Huf Share in Will Format | WillDrafting.in",
    description:
      "Learn how to mention huf share in will format under Section 30 Hindu Succession Act. Download lawyer-vetted coparcenary clauses and avoid.",
    images: ["https://www.willdrafting.in/images/huf-karta-coparcenary-will-clause-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function HufKartaCoparcenaryWillClausePage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/huf-karta-coparcenary-will-clause-format";
  const imageUrl = "https://www.willdrafting.in/images/huf-karta-coparcenary-will-clause-format-og.jpg";

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
        name: "How to Mention Huf Share in Will Format | WillDrafting.in",
        description:
          "Learn how to mention huf share in will format under Section 30 Hindu Succession Act. Download lawyer-vetted coparcenary clauses and avoid.",
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
            name: "Templates",
            item: "https://www.willdrafting.in/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "HUF Coparcenary Will Clause Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "HUF Karta Coparcenary Will Clause Format & Section 30 Bequest Template",
        url: canonicalUrl,
        description:
          "Statutory legal clause format for bequeathing undivided coparcenary interest in a Hindu Undivided Family (HUF) under Section 30 of the Hindu.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        image: imageUrl,
        creator: {
          "@type": "Organization",
          name: "WillDrafting.in",
        },
        publisher: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can a Karta bequeath the entire HUF property in his Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A Karta does not own the entire HUF property. Under Hindu law, joint family property belongs to all coparceners jointly by birth. Any clause attempting to bequeath the whole HUF property or a specific physical room or floor is void ab initio.",
            },
          },
          {
            "@type": "Question",
            name: "What is the correct way to mention an HUF share in a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 30 of the Hindu Succession Act, 1956, the testator must explicitly state: 'I hereby bequeath my undivided coparcenary interest and share in the HUF as ascertained upon a notional partition under Section 6 immediately preceding my death.'",
            },
          },
          {
            "@type": "Question",
            name: "What did the Supreme Court hold in Radhamma v. Muddukrishna (2019)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Radhamma v. H.N. Muddukrishna (2019) 3 SCC 611, the Supreme Court confirmed that a Hindu coparcener can dispose of his undivided coparcenary interest by Will under Section 30. However, the bequest operates only on his individual notional partition share, and cannot infringe upon the shares of other coparceners.",
            },
          },
          {
            "@type": "Question",
            name: "How is the testator's undivided coparcenary share calculated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 6(3) of the Hindu Succession Act, the share is calculated by applying a statutory fiction of 'notional partition'. The law imagines a partition occurring immediately before the testator's death, calculating the exact percentage share that would have been allotted to him alongside his wife, sons, and daughters.",
            },
          },
          {
            "@type": "Question",
            name: "Do daughters have equal coparcenary rights in an HUF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Following the 2005 amendment and the landmark Supreme Court judgment in Vineeta Sharma v. Rakesh Sharma (2020), daughters are coparceners by birth with equal rights and liabilities. When computing the notional partition share, daughters receive equal shares alongside sons.",
            },
          },
          {
            "@type": "Question",
            name: "Can an HUF coparcener bequeath his share to a non-family outsider?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Section 30 confers absolute testamentary power over one's own undivided coparcenary interest. A coparcener may bequeath his share to anyone, including one specific child, a spouse, a trust, or an outsider. The legatee steps into the shoes of the deceased coparcener and can claim that share via partition.",
            },
          },
          {
            "@type": "Question",
            name: "Does bequeathing an HUF share dissolve the HUF for income tax purposes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The execution of a Will bequeathing an undivided coparcenary share does not automatically dissolve the HUF. Under Section 171 of the Income Tax Act, 1961, the HUF continues as a distinct taxable entity until a full partition by metes and bounds is recognized by the Assessing Officer.",
            },
          },
          {
            "@type": "Question",
            name: "Who becomes the new Karta after the death of the existing Karta?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upon the demise of the Karta, the senior-most surviving coparcener (whether an elder son or an elder daughter, as affirmed in Mrs. Sujata Sharma v. Shri Manu Gupta by the Delhi High Court) automatically assumes the role of Karta by operation of law.",
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
        <HufKartaCoparcenaryWillClauseClient />
        <Footer />
      </div>
    </>
  );
}
