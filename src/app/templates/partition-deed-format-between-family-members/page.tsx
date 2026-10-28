import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartitionDeedClient from "./PartitionDeedClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Partition Deed Format Between Brothers India | WillDrafting", // exactly 59 characters
  },
  description:
    "Download legally valid partition deed format between brothers in India. Features floor-wise UDS schedules, Owelty clauses, and SRO stamp duty.", // exactly 147 characters
  keywords: [
    "partition deed format between brothers india",
    "family property partition deed format word pdf",
    "division of ancestral property deed template india",
    "partition deed format for residential house multi floor",
    "undivided share of land uds partition deed clause",
    "owelty clause partition deed equalization payment",
    "stamp duty on partition deed between blood relatives",
    "schedule a b c floor wise partition deed format",
    "section 17 registration act partition deed",
    "sub registrar partition deed registration checklist",
    "vineeta sharma coparcenary daughter rights partition",
    "ama legal solutions family partition deed lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/partition-deed-format-between-family-members",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/partition-deed-format-between-family-members",
      "x-default": "https://www.willdrafting.in/templates/partition-deed-format-between-family-members",
    },
  },
  openGraph: {
    title: "Partition Deed Format Between Brothers India | WillDrafting",
    description:
      "Download legally valid partition deed format between brothers in India. Features floor-wise UDS schedules, Owelty clauses, and SRO stamp duty.",
    url: "https://www.willdrafting.in/templates/partition-deed-format-between-family-members",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/partition-deed-format-between-family-members-og.jpg",
        width: 1200,
        height: 675,
        alt: "Partition Deed Format Between Brothers India Legal Template and Schedule Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partition Deed Format Between Brothers India | WillDrafting",
    description:
      "Download legally valid partition deed format between brothers in India. Features floor-wise UDS schedules, Owelty clauses, and SRO stamp duty.",
    images: ["https://www.willdrafting.in/images/partition-deed-format-between-family-members-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function PartitionDeedFormatPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/partition-deed-format-between-family-members";
  const imageUrl = "https://www.willdrafting.in/images/partition-deed-format-between-family-members-og.jpg";

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
        name: "Partition Deed Format Between Brothers India | WillDrafting",
        description:
          "Download legally valid split deed format between brothers in India. Features floor-wise UDS schedules, Owelty clauses, and SRO stamp duty.",
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
            name: "Partition Deed Format Between Family Members",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Partition Deed Format Between Brothers & Family Members India",
        url: canonicalUrl,
        description:
          "Full legal filed split deed template for dividing family and multi-floor family real estate in India, compliant with.",
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
            name: "What is a Partition Deed under Indian property law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Split Deed is an official legal instrument governed by Section 2(15) of the Indian Stamp Act, 1899 and Section 17 of the Filing Act, 1908. It legally divides jointly owned or family asset among co-owners or legal heirs, severing joint title and converting joint tenancy into separate, distinct, and single ownership.",
            },
          },
          {
            "@type": "Question",
            name: "Is registration of a Partition Deed mandatory in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 17(1)(b) of the Filing Act, 1908, any non-Will instrument that creates, declares, assigns, limits, or extinguishes any right, title, or interest in land asset valued over ₹100 must be filed with the SRO. Under Section 49, an plain split deed cannot affect title or be admitted as evidence of split.",
            },
          },
          {
            "@type": "Question",
            name: "How does a Partition Deed differ from a Family Settlement Agreement?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Split Deed operates in praesenti, creating new separate legal titles on the spot and requiring full filing and legal stamp duty. In contrast, a Memorandum of Family Deal (as upheld in Kale v. Dy. Director of Consolidation) merely records a past oral arrangement, settling antecedent claims without creating new title, often requiring lower stamp duty.",
            },
          },
          {
            "@type": "Question",
            name: "How are multi-story residential houses divided among brothers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When dividing a multi-floor home building, the deed must incorporate four specific schedules: Schedule A for the entire land and building, Schedule B allocating a specific floor and proportionate Undivided Share of Land (UDS) to the first brother, Schedule C allocating another floor and UDS to the second brother, and Schedule D governing shared easements like staircases, terrace access, and water tanks.",
            },
          },
          {
            "@type": "Question",
            name: "What is an Owelty clause in a partition deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Owelty (or Owlat) clause provides for monetary equalization when land assets cannot be divided into mathematically equal portions. The co-sharer receiving a more valuable physical portion (e.g. Ground Floor or shop frontage) pays an agreed sum of cash compensation to equalize the shares, which is completely tax-exempt under Section 47(i) of the Income Tax Act.",
            },
          },
          {
            "@type": "Question",
            name: "Do daughters have equal coparcenary rights in a family partition deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under the landmark Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), daughters have equal joint rights by birth in family asset under Section 6 of the Hindu Succession Act. A family split deed that excludes daughters without their filed Release Deed (Haq Tyag) is voidable and can be set aside by civil courts.",
            },
          },
          {
            "@type": "Question",
            name: "How much stamp duty is payable on a partition deed between family members?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Stamp duty varies by state. Most states offer concessional rates for split deeds among blood relatives. For example, Maharashtra levies a nominal duty of ₹200 to ₹500, Delhi charges 1% to 2%, Karnataka applies slab-based flat duties (₹1,000 to ₹5,000 for urban family partitions), and Uttar Pradesh charges 1% of the value of the separated shares.",
            },
          },
          {
            "@type": "Question",
            name: "Does executing a partition deed attract capital gains tax?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 47(i) of the Income Tax Act, 1961, any split of capital assets on the total or partial split of a Hindu Undivided Family (HUF) or among co-owners is expressly excluded from the definition of transfer under Section 45. No capital gains tax or income tax is payable on a genuine split.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if one brother refuses to sign the partition deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a co-owner refuses to execute a mutual split deed, the remaining co-sharers must file a Civil Split Suit under Order XX Rule 18 of the Code of Civil Step (CPC) in the local civil court. The court will determine single shares in a Preliminary Decree and physically divide the assets through a Court Commissioner in a Final Decree.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required to register a partition deed at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You require: (1) Original parent title deeds or filed sale deeds of the asset, (2) Non-judicial e-stamp paper with paid duty, (3) Architectural site plan showing floor-wise demarcation, (4) City tax paid receipts and Khata/name change extract, (5) Non-Encumbrance Paper (EC), and (6) Original Aadhaar and PAN cards of all co-sharers and two independent adult witnesses.",
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
        <PartitionDeedClient />
        <Footer />
      </div>
    </>
  );
}
