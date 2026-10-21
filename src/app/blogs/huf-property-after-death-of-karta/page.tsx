import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HufPropertyAfterDeathOfKartaClient from "./HufPropertyAfterDeathOfKartaClient";

export const metadata: Metadata = {
  title: {
    absolute: "HUF Property After Death of Karta: Rights & Will Guide",
  },
  description:
    "Learn who inherits HUF property after death of karta under HSA Section 6 and 30. Understand new karta succession, deemed partition, tax rules, and wills.",
  keywords: [
    "huf property after death of karta",
    "HUF karta death",
    "HUF partition after death",
    "HUF succession",
    "karta share in HUF property",
    "can karta will HUF property",
    "hindu succession act section 6",
    "hindu succession act section 30",
    "deemed partition HUF",
    "who becomes new karta after father death",
    "can daughter become karta of HUF",
    "Sujata Sharma vs Manu Gupta",
    "HUF tax implications partition section 171",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/blogs/huf-property-after-death-of-karta",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/blogs/huf-property-after-death-of-karta",
      "x-default":
        "https://www.willdrafting.in/blogs/huf-property-after-death-of-karta",
    },
  },
  openGraph: {
    title: "HUF Property After Death of Karta: Rights & Will Guide",
    description:
      "Learn who inherits HUF property after death of karta under HSA Section 6 and 30. Understand new karta succession, deemed partition, tax rules, and wills.",
    url: "https://www.willdrafting.in/blogs/huf-property-after-death-of-karta",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/huf-property-after-death-of-karta-og.jpg",
        width: 1200,
        height: 630,
        alt: "HUF Property After Death of Karta Legal Succession and Will Drafting Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUF Property After Death of Karta: Rights & Will Guide",
    description:
      "Learn who inherits HUF property after death of karta under HSA Section 6 and 30. Understand new karta succession, deemed partition, tax rules, and wills.",
    images: [
      "https://www.willdrafting.in/images/huf-property-after-death-of-karta-og.jpg",
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

export default function HufPropertyAfterDeathOfKartaPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/blogs/huf-property-after-death-of-karta";
  const imageUrl =
    "https://www.willdrafting.in/images/huf-property-after-death-of-karta-og.jpg";

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
        name: "HUF Property After Death of Karta: Rights & Will Guide",
        description:
          "Learn who inherits HUF property after death of karta under HSA Section 6 and 30. Understand new karta succession, deemed partition, tax rules, and wills.",
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
            name: "Blogs",
            item: "https://www.willdrafting.in/blogs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "HUF Property After Death of Karta",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
        },
        headline: "HUF Property After Death of Karta: Succession & Rights",
        description:
          "A comprehensive legal guide on what happens to HUF property after the death of the Karta, who becomes the new Karta, deemed partition under HSA Section 6, testamentary freedom under Section 30, and tax implications under Section 171.",
        inLanguage: "en-IN",
        mainEntityOfPage: canonicalUrl,
        datePublished: "2026-10-21T09:00:00+05:30",
        dateModified: "2026-10-21T10:30:00+05:30",
        articleSection: "Family Succession & Coparcenary Rights",
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 630,
        },
        author: {
          "@type": "Person",
          name: "Advocate Rajeshwar Rao",
          jobTitle: "Senior Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Does an HUF automatically dissolve when the Karta dies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, an HUF does not dissolve automatically upon the death of the Karta. The HUF continues to exist as a separate legal and tax entity. The management naturally passes to the next senior coparcener, unless the surviving coparceners choose to carry out a full partition of assets.",
            },
          },
          {
            "@type": "Question",
            name: "Who becomes the new Karta after the death of the father or existing Karta?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "By law, the senior-most surviving coparcener automatically becomes the new Karta. This can be the eldest son or the eldest daughter. In Sujata Sharma v. Manu Gupta (2015), the Delhi High Court confirmed that the eldest daughter can legally become the Karta of an HUF.",
            },
          },
          {
            "@type": "Question",
            name: "Can the Karta give away the entire HUF property in his Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Karta cannot will away the entire HUF property because it belongs collectively to all coparceners. However, under Section 30 of the Hindu Succession Act, 1956, the Karta has full legal power to bequeath his own undivided coparcenary share through a Will.",
            },
          },
          {
            "@type": "Question",
            name: "What is deemed or notional partition under Section 6 of the Hindu Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 6(3) of the Act, when a coparcener dies, the law calculates his share by assuming a notional partition took place immediately before his death. The share that would have been allotted to him in that partition becomes his personal estate, which passes according to his Will or statutory inheritance rules.",
            },
          },
          {
            "@type": "Question",
            name: "Can an eldest daughter become the Karta of an HUF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Following the Hindu Succession (Amendment) Act, 2005 and the landmark Delhi High Court judgment in Sujata Sharma v. Manu Gupta (2015), daughters are coparceners by birth and have equal rights as sons. The senior-most coparcener, regardless of gender, is legally entitled to act as Karta.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if all surviving coparceners are minors?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If all surviving coparceners are minors, the surviving mother can act as the natural guardian and legal manager of the HUF property on behalf of the minors until the eldest coparcener attains majority. This principle was upheld by the Supreme Court in CIT v. Laxmi Narayan Bhadani.",
            },
          },
          {
            "@type": "Question",
            name: "Does partition of HUF property attract capital gains tax in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 47(i) of the Income Tax Act, 1961, any distribution of capital assets on the total or partial partition of an HUF is not regarded as a transfer. Therefore, no capital gains tax is payable at the time of HUF asset distribution.",
            },
          },
          {
            "@type": "Question",
            name: "Are partial partitions of an HUF recognized by the Income Tax Department?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 171(9) of the Income Tax Act, partial partitions effected after December 31, 1978, are not recognized for tax purposes. For income tax assessment, only a full (total) partition is recognized, requiring an inquiry and order by the Assessing Officer.",
            },
          },
          {
            "@type": "Question",
            name: "How should an individual mention their HUF share in their personal Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A testator should clearly distinguish self-acquired assets from their HUF share. In the Will, they should specifically bequeath their 'undivided coparcenary share and interest in the HUF as determined under Section 6 and Section 30 of the Hindu Succession Act, 1956', without attempting to gift specific physical family properties.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required to update bank accounts and PAN after Karta death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The family must provide the original death certificate of the deceased Karta, a declaration of succession signed by all surviving coparceners, identity and address proofs of the new Karta, fresh KYC forms for the bank, and a formal letter of indemnity.",
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
      <HufPropertyAfterDeathOfKartaClient />
      <Footer />
    </>
  );
}
