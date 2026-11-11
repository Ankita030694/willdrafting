import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UaeCrossBorderDecisionToolClient from "./UaeCrossBorderDecisionToolClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "UAE DIFC vs ADJD vs Indian Will Tool | WillDrafting", // exactly 51 characters
  },
  description:
    "Compare costs, jurisdiction, and validity of UAE DIFC wills, ADJD registration, and separate Indian wills for Dubai expats. Instant decision tool.", // exactly 146 characters
  keywords: [
    "uae difc adgm vs indian will decision tool",
    "dubai expat will registration cost comparison",
    "difc wills service centre vs adjd will vs indian will",
    "uae asset protection decision matrix",
    "difc wills and probate registry rules",
    "abu dhabi law no 14 of 2021 non muslim will",
    "adjd non muslim wills registry fees",
    "section 228 indian succession act foreign will resealing",
    "dual concurrent wills uae and india",
    "sharia asset freeze dubai bank accounts expat death",
    "indian expat will drafting dubai abu dhabi",
    "ama legal solutions cross border estate planning",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/uae-adgm-difc-vs-indian-will-cross-border-decision-tool",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/uae-adgm-difc-vs-indian-will-cross-border-decision-tool",
      "x-default":
        "https://www.willdrafting.in/tools/uae-adgm-difc-vs-indian-will-cross-border-decision-tool",
    },
  },
  openGraph: {
    title: "UAE DIFC vs ADJD vs Indian Will Tool | WillDrafting",
    description:
      "Compare costs, jurisdiction, and validity of UAE DIFC wills, ADJD registration, and separate Indian wills for Dubai expats. Instant decision tool.",
    url: "https://www.willdrafting.in/tools/uae-adgm-difc-vs-indian-will-cross-border-decision-tool",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/uae-adgm-difc-vs-indian-will-cross-border-decision-tool-og.jpg",
        width: 1200,
        height: 675,
        alt: "UAE DIFC vs ADJD vs Indian Will Cross-Border Decision Matrix and Cost Comparison Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UAE DIFC vs ADJD vs Indian Will Tool | WillDrafting",
    description:
      "Compare costs, jurisdiction, and validity of UAE DIFC wills, ADJD registration, and separate Indian wills for Dubai expats. Instant decision tool.",
    images: [
      "https://www.willdrafting.in/images/uae-adgm-difc-vs-indian-will-cross-border-decision-tool-og.jpg",
    ],
    site: "@willdrafting",
    creator: "@willdrafting",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function UaeCrossBorderWillDecisionToolPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/uae-adgm-difc-vs-indian-will-cross-border-decision-tool";
  const imageUrl =
    "https://www.willdrafting.in/images/uae-adgm-difc-vs-indian-will-cross-border-decision-tool-og.jpg";

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
        name: "UAE DIFC vs ADJD vs Indian Will Tool | WillDrafting",
        description:
          "Compare costs, jurisdiction, and validity of UAE DIFC wills, ADJD registration, and separate Indian wills for Dubai expats. Instant decision tool.",
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
            name: "UAE DIFC vs ADJD vs Indian Will Tool",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "UAE DIFC ADGM vs Indian Will Cross-Border Decision Tool",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Cross-border legal decision tool comparing DIFC Courts, ADJD non-Muslim wills, and Indian succession wills for UAE expats with Indian assets.",
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
            name: "Can a single DIFC Will cover my property in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While DIFC wills can nominally state worldwide assets, Indian authorities do not execute foreign probate orders directly. Under Section 228 of the Indian Succession Act 1925, your heirs must file an ancillary probate (resealing) petition in an Indian High Court. This process takes 12 to 24 months and requires full court fees. A separate Indian Will avoids this friction completely.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference in cost between a DIFC Will and an ADJD Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A standard DIFC Full Will registration fee is approximately AED 10,000 to AED 15,000 (often reaching AED 20,000+ with drafting). In contrast, an Abu Dhabi Judicial Department (ADJD) Non-Muslim Will registration fee is only approximately AED 950 to AED 1,000 (totaling AED 1,500 to AED 2,500 with drafting and bilingual translation). ADJD offers over 80% cost savings for UAE asset coverage.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to my Dubai bank accounts if I die without a UAE Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under UAE Central Bank regulations, upon notification of death, personal bank accounts (and even joint accounts) are immediately frozen. Without a registered DIFC or ADJD Will, the estate falls under default onshore court procedures governed by Sharia principles. This causes prolonged delays and leaves surviving family members without immediate funds.",
            },
          },
          {
            "@type": "Question",
            name: "Why is the Dual Concurrent Wills strategy considered the gold standard?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Dual Concurrent Wills strategy uses two distinct wills: one registered in the UAE (via ADJD or DIFC) strictly covering UAE assets, and a second Will registered in India under the Indian Succession Act 1925 strictly covering Indian assets. Both wills contain reciprocal non-revocation clauses. This ensures immediate probate in both jurisdictions without costly international resealing.",
            },
          },
          {
            "@type": "Question",
            name: "Does an ADJD Will registered in Abu Dhabi protect properties in Dubai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Abu Dhabi Law No. 14 of 2021 and UAE Federal Decree-Law No. 41 of 2022 on Civil Personal Status for Non-Muslims, a Will registered with the ADJD Non-Muslim Wills Office is legally valid and enforceable across all seven emirates, including Dubai, Sharjah, and Ras Al Khaimah.",
            },
          },
          {
            "@type": "Question",
            name: "Can an Indian Will alone transfer UAE assets after death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. UAE banks and land departments will not automatically accept an Indian probate order. The Indian probate must be consularized, translated into Arabic, legalized by the UAE Ministry of Foreign Affairs (MOFA), and approved by UAE civil courts. This takes months while UAE bank accounts remain frozen.",
            },
          },
          {
            "@type": "Question",
            name: "How does minor child guardianship work under DIFC and ADJD wills?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both DIFC and ADJD non-Muslim wills allow parents to nominate interim and permanent guardians for minor children. This prevents local authorities from placing minors in temporary custody or applying default Sharia guardianship rules in the event of both parents passing away.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if an Indian Will accidentally revokes a UAE Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Many standard Indian Will templates include a blanket clause revoking 'all prior wills and codicils made worldwide'. If an Indian expat signs this template after registering a UAE Will, it legally revokes the UAE Will. Cross-border wills must contain an express non-revocation clause preserving existing foreign wills.",
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
        <UaeCrossBorderDecisionToolClient />
        <Footer />
      </div>
    </>
  );
}
