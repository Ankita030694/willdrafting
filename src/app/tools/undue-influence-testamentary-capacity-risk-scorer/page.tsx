import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UndueInfluenceRiskScorerClient from "./UndueInfluenceRiskScorerClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Undue Influence Will Contest Risk Scorer | WillDrafting", // exactly 55 characters
  },
  description:
    "Score undue influence and testamentary capacity risks under Section 61 Indian Succession Act. Assess fiduciary dominance, illness, and court proof.", // exactly 147 characters
  keywords: [
    "undue influence will contest risk assessment india",
    "section 61 indian succession act test",
    "testamentary capacity mental fitness challenge tool",
    "caregiver undue influence will score",
    "section 59 indian succession act sound mind",
    "afsar shaikh v soleman bibi supreme court",
    "kavita kanwar v pamela mehta active participation",
    "h venkatachala iyengar v bn thimmajamma suspicious circumstances",
    "subhas chandra das mushib undue influence test",
    "challenge bedridden parent will full time nurse india",
    "mmse score testamentary capacity medical evidence",
    "order 6 rule 4 cpc particulars undue influence",
    "high court testamentary suit contested will defense",
    "ama legal solutions contested will probate litigation",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/undue-influence-testamentary-capacity-risk-scorer",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/undue-influence-testamentary-capacity-risk-scorer",
      "x-default": "https://www.willdrafting.in/tools/undue-influence-testamentary-capacity-risk-scorer",
    },
  },
  openGraph: {
    title: "Undue Influence Will Contest Risk Scorer | WillDrafting",
    description:
      "Score undue influence and testamentary capacity risks under Section 61 Indian Succession Act. Assess fiduciary dominance, illness, and court proof.",
    url: "https://www.willdrafting.in/tools/undue-influence-testamentary-capacity-risk-scorer",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/undue-influence-testamentary-capacity-risk-scorer-og.jpg",
        width: 1200,
        height: 675,
        alt: "Undue Influence and Testamentary Capacity Risk Scorer Section 61 ISA India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Undue Influence Will Contest Risk Scorer | WillDrafting",
    description:
      "Score undue influence and testamentary capacity risks under Section 61 Indian Succession Act. Assess fiduciary dominance, illness, and court proof.",
    images: ["https://www.willdrafting.in/images/undue-influence-testamentary-capacity-risk-scorer-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function UndueInfluenceRiskScorerPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/undue-influence-testamentary-capacity-risk-scorer";
  const imageUrl = "https://www.willdrafting.in/images/undue-influence-testamentary-capacity-risk-scorer-og.jpg";

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
        name: "Undue Influence Will Contest Risk Scorer | WillDrafting",
        description:
          "Score undue influence and testamentary capacity risks under Section 61 Indian Succession Act. Assess fiduciary dominance, illness, and court proof.",
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
            name: "Undue Influence & Capacity Scorer",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Undue Influence & Testamentary Capacity Risk Scorer India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free diagnostic risk assessment calculator evaluating undue influence, fiduciary dominance, caregiver suspicion, and mental capacity under Sections 59 and 61 of the Indian Succession Act, 1925.",
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
            name: "What constitutes undue influence under Section 61 of the Indian Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 61 of the Indian Succession Act, 1925, a Will or any part of a Will obtained through fraud, coercion, or importunity that deprives the testator of their free agency is completely void. Undue influence requires proving that the testator's mind was overcome by moral or physical coercion, transforming the Will into the desire of the influencer rather than the free volition of the testator.",
            },
          },
          {
            "@type": "Question",
            name: "What is the legal difference between lawful persuasion and unlawful coercion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "As held by the Supreme Court in Subhas Chandra Das Mushib v. Ganga Prasad Das Mushib (1967), mere appeal to affection, tears, family devotion, or fair persuasion does not constitute undue influence. Persuasion is lawful as long as the testator remains a free agent capable of refusing. Coercion or undue influence becomes unlawful only when pressure overbears the independent will of the testator so they execute the document because they cannot resist.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Will leaving property to a full-time nurse or caregiver be challenged?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A deathbed or late-life Will leaving substantial estate to a full-time caregiver while disinheriting natural children creates heavy suspicious circumstances under H. Venkatachala Iyengar v. B.N. Thimmajamma (1959). The propounder must prove the testator understood the nature and effect of the dispositions, was not isolated from family, and had independent legal and medical advice.",
            },
          },
          {
            "@type": "Question",
            name: "What are the essential elements of testamentary capacity under Section 59 ISA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 59 of the Indian Succession Act and the landmark Banks v. Goodfellow test adopted by Indian courts, the testator must possess a sound disposing mind: (1) understanding the nature of the act and its effects, (2) understanding the extent of their property, and (3) comprehending and appreciating the claims of natural heirs to which they ought to give effect.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Kavita Kanwar doctrine regarding active participation by beneficiaries?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Kavita Kanwar v. Pamela Mehta (2021) 11 SCC 209, the Supreme Court affirmed that where a primary beneficiary takes an active, dominating role in the preparation, drafting, engaging of lawyers, and execution of a Will that yields them disproportionate benefits to the exclusion of other natural heirs, this constitutes a grave suspicious circumstance that the propounder must dispel with cogent evidence.",
            },
          },
          {
            "@type": "Question",
            name: "Why does Order 6 Rule 4 CPC require specific particulars in undue influence pleadings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Afsar Shaikh v. Soleman Bibi (1976) 2 SCC 142, the Supreme Court ruled that a general allegation of undue influence is insufficient in law. Under Order 6 Rule 4 of the Code of Civil Procedure (CPC), the caveator must plead specific facts: the nature of the relationship, how the beneficiary held dominance over the testator's mind, the exact coercion or importunity practiced, and how free agency was destroyed.",
            },
          },
          {
            "@type": "Question",
            name: "What medical evidence is most persuasive in proving lack of testamentary capacity?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Contemporaneous medical records created on or near the execution date hold decisive weight. Key evidence includes standardized cognitive assessments like the Mini-Mental State Examination (MMSE < 24) or MoCA, neurological consultation notes documenting advanced dementia or delirium, ICU administration of sedative medications, and testimony of the treating physician versus a generic fitness certificate.",
            },
          },
          {
            "@type": "Question",
            name: "Who bears the burden of proof when a Will is challenged for undue influence?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The initial burden of establishing due execution, attestation under Section 63 ISA, and sound disposing mind under Section 59 lies squarely upon the propounder (H. Venkatachala Iyengar). If suspicious circumstances are present, the propounder must dispel them. However, if due execution and capacity are established, the specific allegation of undue influence under Section 61 must be proven by the party alleging it.",
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
        <UndueInfluenceRiskScorerClient />
        <Footer />
      </div>
    </>
  );
}
