import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArbitrationClauseFamilySettlementClient from "./ArbitrationClauseFamilySettlementClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Family Settlement Arbitration Clause | WillDrafting", // exactly 51 characters
  },
  description:
    "Download verified arbitration and mediation clause format for Indian family settlement agreements. Avoid 20-year civil court property litigation.", // exactly 145 characters
  keywords: [
    "family dispute arbitration clause format india",
    "arbitration clause in family settlement agreement sample",
    "private mediation clause in will format",
    "avoid court litigation family property clause",
    "section 7 arbitration and conciliation act family settlement",
    "mediation act 2023 family property settlement",
    "vidya drolia vs durga trading corp family arbitration",
    "section 8 arbitration act bar civil partition suit",
    "sole arbitrator clause family settlement india",
    "vijay kumar sharma arbitration clause in will",
    "hari sharma singhania family settlement arbitration",
    "family settlement deed lawyer india",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/arbitration-clause-in-family-settlement-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/arbitration-clause-in-family-settlement-format",
      "x-default": "https://www.willdrafting.in/templates/arbitration-clause-in-family-settlement-format",
    },
  },
  openGraph: {
    title: "Family Settlement Arbitration Clause | WillDrafting",
    description:
      "Download verified arbitration and mediation clause format for Indian family settlement agreements. Avoid 20-year civil court property litigation.",
    url: "https://www.willdrafting.in/templates/arbitration-clause-in-family-settlement-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/arbitration-clause-in-family-settlement-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Arbitration and mediation clause format for Indian family settlement agreements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Family Settlement Arbitration Clause | WillDrafting",
    description:
      "Download verified arbitration and mediation clause format for Indian family settlement agreements. Avoid 20-year civil court property litigation.",
    images: ["https://www.willdrafting.in/images/arbitration-clause-in-family-settlement-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ArbitrationClauseFamilySettlementPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/arbitration-clause-in-family-settlement-format";
  const imageUrl = "https://www.willdrafting.in/images/arbitration-clause-in-family-settlement-format-og.jpg";

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
        name: "Family Settlement Arbitration Clause | WillDrafting",
        description:
          "Download verified arbitration and mediation clause format for Indian family settlement agreements. Avoid 20-year civil court property litigation.",
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
            name: "Family Settlement Arbitration Clause",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        name: "Arbitration Clause in Family Settlement Format India",
        headline: "Family Dispute Arbitration Clause Format in India",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Legal clause pack containing pre-litigation mediation and arbitration clause format under Arbitration Act 1996 Section 7, Mediation Act 2023, and Vidya Drolia.",
        image: imageUrl,
        inLanguage: "en-IN",
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can an arbitration clause in a family settlement stop a civil court partition suit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When all family members sign a written family settlement with a valid Section 7 arbitration clause, any brother who files a civil suit can be stopped immediately. Under Section 8 of the Arbitration and Conciliation Act, 1996, you apply before filing your first written reply, and the civil judge must send the dispute to arbitration.",
            },
          },
          {
            "@type": "Question",
            name: "What did the Supreme Court rule in Vidya Drolia about family property arbitration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Vidya Drolia v. Durga Trading Corporation (2021) 2 SCC 1, the Supreme Court set a four-fold test separating private rights in personam from public rights in rem. Private family settlement duties like asset division, owelty cash payouts, and rent sharing are fully arbitrable, while public probate grants and third-party title claims remain with courts.",
            },
          },
          {
            "@type": "Question",
            name: "Can I put a binding arbitration clause directly inside my Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. In Vijay Kumar Sharma v. Raghunandan Sharma (2010) 2 SCC 486, the Supreme Court held that an arbitration clause inside a Will is only a one-sided wish of the Will maker. Since heirs do not sign the Will as a contract, there is no Section 7 agreement. To bind heirs, put the clause in a signed Family Settlement Agreement.",
            },
          },
          {
            "@type": "Question",
            name: "How does the Mediation Act, 2023 help settle family property disputes faster?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 5 of the Mediation Act, 2023, families can run pre-litigation mediation for up to 120 days, extendable by 60 days. Once signed by all parties and the mediator, Section 27 makes the Mediated Settlement Agreement final and enforceable like a civil court decree.",
            },
          },
          {
            "@type": "Question",
            name: "Can one sibling unilaterally pick the sole arbitrator in a family settlement clause?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 12(5) and the Supreme Court ruling in Perkins Eastman Architects v. HSCC (2019), a clause giving one party sole power to pick an arbitrator is legally invalid. Always name a neutral retired judge or an independent institution like DIAC or MCIA, or pick jointly with Section 11 court fallback.",
            },
          },
          {
            "@type": "Question",
            name: "What if a brother claims the family settlement is under-stamped to block arbitration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "He cannot stall referral to arbitration. In Re: Interplay Between Arbitration Agreements and Indian Stamp Act (2023), a 7-Judge Supreme Court bench held that civil courts under Section 8 and High Courts under Section 11 do not stop arbitration over stamp duty flaws. The arbitrator handles any stamp objections.",
            },
          },
          {
            "@type": "Question",
            name: "How fast must a sole arbitrator finish a family settlement dispute in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 29A of the Arbitration and Conciliation Act, 1996, the sole arbitrator must pass the final award within 12 months from when written pleadings close, extendable by 6 months by mutual consent. Under Section 29B Fast-Track rules, the award can come in just 6 months.",
            },
          },
          {
            "@type": "Question",
            name: "Can an arbitration clause cover probate or forged Will challenges?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Vidya Drolia, granting or cancelling probate is a judgment in rem that binds the whole world, so only a probate court can decide if a Will is genuine. However, once heirs compromise and sign a Family Settlement Agreement dividing shares, disputes over that settlement are arbitrable.",
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
        <ArbitrationClauseFamilySettlementClient />
        <Footer />
      </div>
    </>
  );
}
