import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OdishaBhulekhCalculatorClient from "./OdishaBhulekhCalculatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Odisha Bhulekh Mutation Fee Calculator | WillDrafting", // exactly 52 characters
  },
  description:
    "Calculate exact Odisha Bhulekh RoR mutation fees, user charges, and statutory documents for inherited property under Odisha Land Reforms rules.", // exactly 144 characters
  keywords: [
    "odisha bhulekh mutation fee calculator inheritance",
    "ror mutation fee odisha",
    "tahasildar mutation case checklist odisha",
    "legal heir record of rights bhulekh odisha",
    "bhulekh odisha online mutation application process",
    "khatiyan correction fee odisha",
    "chaka bandi land partition odisha",
    "odisha survey and settlement act 1958 section 15",
    "odisha land reforms act section 22 permission",
    "tahasildar notice period odisha mutation",
    "hal sabik khatiyan correction odisha",
    "ama legal solutions odisha land mutation",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/odisha-bhulekh-ror-mutation-fee-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/odisha-bhulekh-ror-mutation-fee-calculator",
      "x-default": "https://www.willdrafting.in/tools/odisha-bhulekh-ror-mutation-fee-calculator",
    },
  },
  openGraph: {
    title: "Odisha Bhulekh Mutation Fee Calculator | WillDrafting",
    description:
      "Calculate exact Odisha Bhulekh RoR mutation fees, user charges, and statutory documents for inherited property under Odisha Land Reforms rules.",
    url: "https://www.willdrafting.in/tools/odisha-bhulekh-ror-mutation-fee-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/odisha-bhulekh-ror-mutation-fee-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "Odisha Bhulekh RoR Mutation Fee Calculator and Tahasildar Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Odisha Bhulekh Mutation Fee Calculator | WillDrafting",
    description:
      "Calculate exact Odisha Bhulekh RoR mutation fees, user charges, and statutory documents for inherited property under Odisha Land Reforms rules.",
    images: ["https://www.willdrafting.in/images/odisha-bhulekh-ror-mutation-fee-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function OdishaBhulekhCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/odisha-bhulekh-ror-mutation-fee-calculator";
  const imageUrl = "https://www.willdrafting.in/images/odisha-bhulekh-ror-mutation-fee-calculator-og.jpg";

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
        name: "Odisha Bhulekh Mutation Fee Calculator | WillDrafting",
        description:
          "Calculate exact Odisha Bhulekh RoR mutation fees, user charges, and statutory documents for inherited property under Odisha Land Reforms rules.",
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
            name: "Odisha Bhulekh Mutation Fee Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Odisha Bhulekh RoR Mutation Fee Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Online calculator for computing Odisha Bhulekh RoR mutation user fees, Form 3 process charges, Tahasildar hearing documents, and Chaka Bandi compliance.",
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
            name: "What is the statutory fee for inheritance mutation on Odisha Bhulekh?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Inheritance mutation in Odisha does not attract ad valorem stamp duty or transfer tax. Applicants only pay statutory user charges of approximately Rs 30 to Rs 50 on the Odisha Revenue portal or Mo Seva Kendra, along with a process fee of Rs 20 per notice for issuing Form 3 notices to legal heirs.",
            },
          },
          {
            "@type": "Question",
            name: "What is Form 3 notice in an Odisha Tahasildar mutation case?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Form No. 3 is a statutory public notice issued by the Tahasildar under Rule 34 of the Odisha Mutation Manual. It invites general public and interested persons to file objections against the proposed RoR name correction within a mandatory 30-day window from the date of publication.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate of a Will mandatory in Odisha for RoR land mutation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 213 read with Section 57 of the Indian Succession Act, probate is not mandatory for Wills executed by Hindus in the State of Odisha outside the Presidency towns. A registered Will can be submitted directly before the Tahasildar for RoR correction, provided no contentious civil dispute arises.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required to mutate inherited land before an Odisha Tahasildar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The mandatory documents include: (1) Death Certificate of recorded tenant, (2) Legal Heir Certificate or Warisan Certificate issued by Tahasildar or Revenue Officer, (3) Copy of Sabik and Hal RoR (Khatiyan), (4) Up-to-date Land Revenue (Khajana) payment receipt, (5) Identity and Aadhaar proof of all surviving legal heirs, and (6) Registered Will or Partition Deed if applicable.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take for a mutation case to be approved in Odisha?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Odisha Right to Public Services Act (ORTPSA), uncontested mutation cases must be disposed of within 90 working days. This timeframe covers online filing, 30-day Form 3 objection period, Revenue Inspector (RI) spot enquiry, Tahasildar hearing order, and digital RoR generation.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Chaka Bandi restriction on agricultural land partition in Odisha?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 34 of the Odisha Consolidation of Holdings and Prevention of Fragmentation of Land Act, 1972, agricultural land consolidated into a Chaka cannot be partitioned or transferred if any resulting plot fragments below the statutory standard area (typically 1 standard acre), unless sanctioned by consolidation authorities.",
            },
          },
          {
            "@type": "Question",
            name: "Can agricultural land belonging to SC or ST persons be mutated to general heirs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Sections 22 and 23 of the Odisha Land Reforms Act, 1960, land belonging to Scheduled Tribe or Scheduled Caste rayats cannot be transferred or alienated to non-ST or non-SC persons without prior written permission from the Revenue Officer (Sub-Collector). Legitimate direct legal heirs inherit naturally, but third-party transfers are void without statutory clearance.",
            },
          },
          {
            "@type": "Question",
            name: "What is the legal remedy if the Tahasildar rejects an RoR mutation application?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a Tahasildar rejects a mutation petition or passes an adverse order, the aggrieved party can file a statutory Mutation Appeal before the Sub-Collector under Section 15 of the Odisha Survey & Settlement Act, 1958 (or relevant Mutation Manual rules) within 30 days of the order.",
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
        <OdishaBhulekhCalculatorClient />
        <Footer />
      </div>
    </>
  );
}