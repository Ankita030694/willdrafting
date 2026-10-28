import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReleaseDeedFormatClient from "./ReleaseDeedFormatClient";

export const metadata: Metadata = {
  title: {
    absolute: "Relinquishment Deed Format: Free Template | WillDrafting",
  },
  description:
    "Download a legally valid relinquishment deed format in India. Learn stamp duty by state, release deed vs gift deed rules, and registration.",
  keywords: [
    "relinquishment deed format",
    "release deed format",
    "relinquishment deed stamp duty",
    "release deed vs gift deed",
    "family settlement deed format",
    "relinquishment deed registration",
    "section 17 registration act",
    "ancestral property release deed",
    "haq tyag patra format",
    "sub registrar release deed fees",
    "relinquishment deed for legal heirs",
    "ama legal solutions relinquishment deed",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/release-deed-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/release-deed-format",
      "x-default": "https://www.willdrafting.in/templates/release-deed-format",
    },
  },
  openGraph: {
    title: "Relinquishment Deed Format: Free Template | WillDrafting",
    description:
      "Download a legally valid relinquishment deed format in India. Learn stamp duty by state, release deed vs gift deed rules, and registration.",
    url: "https://www.willdrafting.in/templates/release-deed-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/release-deed-format-og.jpg",
        width: 1200,
        height: 630,
        alt: "Relinquishment Deed Format in India Guide and Free Legal Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Relinquishment Deed Format: Free Template | WillDrafting",
    description:
      "Download a legally valid relinquishment deed format in India. Learn stamp duty by state, release deed vs gift deed rules, and registration.",
    images: ["https://www.willdrafting.in/images/release-deed-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ReleaseDeedFormatPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/release-deed-format";
  const imageUrl = "https://www.willdrafting.in/images/release-deed-format-og.jpg";

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
        name: "Relinquishment Deed Format: Free Template | WillDrafting",
        description:
          "Download a legally valid release deed format in India. Learn stamp duty by state, release deed vs gift deed rules, and filing.",
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
            name: "Release Deed Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Legally Execute and Register a Relinquishment Deed in India",
        description:
          "Step-by-step legal step to execute and register a legally binding Release Deed (Haq-Tyag Patra) under Section 17 of the.",
        image: imageUrl,
        totalTime: "P3D",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Registered Sale Deed / Title Documents of Ancestor",
          },
          {
            "@type": "HowToSupply",
            name: "Death Certificate of the Deceased Property Owner",
          },
          {
            "@type": "HowToSupply",
            name: "Legal Heir Certificate / Surviving Member Certificate",
          },
          {
            "@type": "HowToSupply",
            name: "Non-Judicial e-Stamp Paper with Requisite State Duty",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Aadhaar Card and PAN Card of All Parties & Witnesses",
          },
          {
            "@type": "HowToTool",
            name: "Sub-Registrar Biometric Fingerprint and Webcam Scanner",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Establish Title Devolution and Co-Ownership",
            text: "Gather the original title deed of the asset, official death paper of the deceased owner, and checked legal heir paper proving that the releasor and releasee are legitimate co-heirs.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft the Relinquishment Deed with Precise Property Schedule",
            text: "Draft the deed setting out full party identities, exact fractional shares surrendered, confirmation of natural love and affection or consideration, and the complete boundary schedule of the asset.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Procure State Non-Judicial e-Stamp Paper",
            text: "Purchase the state-specific e-stamp paper for the prescribed family release duty rate through Stock Holding City Board of India (SHCIL) or the authorized state treasury portal.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Appointment and Attend Sub-Registrar Office",
            text: "Book an online SRO appointment. All releasors, releasees, and two independent adult witnesses must appear physically with original IDs for biometric fingerprinting and live photographs.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Collect Registered Deed and Apply for Mutation",
            text: "Receive the filed deed with SRO seal and filing number. File an form for asset name change before the city city board or local revenue office to update asset records.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a relinquishment deed in Indian property law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A release deed (also known as a release deed or Haq-Tyag Patra) is a filed legal instrument through which a legal co-heir surrenders and extinguishes their undivided share in an inherited asset in favour of another existing co-heir, without or with monetary consideration.",
            },
          },
          {
            "@type": "Question",
            name: "Can a relinquishment deed be executed for self-acquired property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A release deed can only be signed between existing co-owners or legal heirs who have jointly inherited a asset. A living person cannot relinquish their self-acquired asset to their child because the child holds no pre-existing co-ownership interest. In such cases, a Gift Deed, Sale Deed, or Will must be used.",
            },
          },
          {
            "@type": "Question",
            name: "Can I relinquish my share to a third-party stranger?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the Supreme Court ruling in Kuppuswamy Chettiar v. Arumugam Chettiar, a release deed can only enlarge a pre-existing title. It cannot create title in an outsider. Transferring asset to a non-co-owner is treated as a Gift Deed or Sale Deed, attracting full ad valorem stamp duty.",
            },
          },
          {
            "@type": "Question",
            name: "Is registration of a relinquishment deed mandatory in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 17(1)(b) of the Filing Act, 1908, any instrument that extinguishes or transfers rights in land asset valued over Rs. 100 must be compulsorily filed at the SRO office. An plain release deed on plain paper or notarized sworn note is completely void and inadmissible under Section 49.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a release deed and a gift deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A release deed can only be made between co-heirs over inherited joint asset, cannot involve outsiders, and often enjoys concessional family stamp duty. A gift deed can transfer self-acquired asset to anyone (relatives or strangers), strictly prohibits monetary consideration, and typically attracts higher ad valorem stamp duty.",
            },
          },
          {
            "@type": "Question",
            name: "How much stamp duty is payable on a relinquishment deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Stamp duty is governed by state stamp acts. Many states offer concessional rates for family co-heirs. For example, Delhi charges a nominal Rs. 1,000 duty plus Rs. 100 filing fee. Maharashtra levies Rs. 200 under Article 52. Uttar Pradesh provides a nominal Rs. 5,000 duty for blood relatives. Non-family releases attract standard conveyance stamp duty.",
            },
          },
          {
            "@type": "Question",
            name: "Can a registered relinquishment deed be cancelled or revoked?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A filed release deed is legally irrevocable once signed and filed. It cannot be cancelled unilaterally. A co-heir can only fight it in a civil court within 3 years under the Limitation Act by proving fraud, coercion, misrepresentation, or lack of free consent.",
            },
          },
          {
            "@type": "Question",
            name: "Can a married daughter relinquish her share in ancestral property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Following the Hindu Succession (Amendment) Act 2005 and the Supreme Court decision in Vineeta Sharma v. Rakesh Sharma, daughters are equal coparceners by birth. A married daughter holds an equal undivided share in family asset and can legally execute a filed release deed in favour of her mother, brother, or sisters.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required to register a release deed at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You require: (1) Original parent title deed, (2) Death paper of the deceased owner, (3) Legal heir paper / surviving member paper, (4) Aadhaar card and PAN card of all releasors, releasees, and two witnesses, (5) Requisite e-stamp paper, and (6) Up-to-date asset tax receipts and city assessment records.",
            },
          },
          {
            "@type": "Question",
            name: "How does drafting a Will avoid the need for a relinquishment deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a asset owner writes a valid Will during their lifetime specifying exactly which child or heir receives the asset, the estate devolves directly without joint no-Will co-ownership. Surviving heirs never need to visit the SRO office, hire lawyers, or execute release deeds to clear title.",
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
      <ReleaseDeedFormatClient />
      <Footer />
    </>
  );
}
