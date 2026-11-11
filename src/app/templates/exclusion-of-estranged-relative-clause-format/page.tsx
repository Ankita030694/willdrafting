import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExclusionOfEstrangedRelativeClient from "./ExclusionOfEstrangedRelativeClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Disinheritance Clause Format for Will | WillDrafting", // exactly 52 characters
  },
  description:
    "Download legally tested disinheritance clause format for Indian wills. Legally exclude estranged relatives while neutralizing court challenge risks.", // exactly 148 characters
  keywords: [
    "how to exclude estranged relative in will format",
    "disinheritance clause for abusive son draft",
    "no-contest in terrorem clause format india",
    "express exclusion of legal heir sample",
    "indian succession act section 30 section 127",
    "kavita kanwar v pamela mehta suspicious circumstances",
    "h venkatachala v thimmajamma will burden of proof",
    "medical sound mind certificate format for will india",
    "disinherit estranged son self acquired house india",
    "in terrorem clause gift over conditional bequest india",
    "senior citizens act 2007 neglect will exclusion",
    "ama legal solutions contested will defense",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/exclusion-of-estranged-relative-clause-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/exclusion-of-estranged-relative-clause-format",
      "x-default": "https://www.willdrafting.in/templates/exclusion-of-estranged-relative-clause-format",
    },
  },
  openGraph: {
    title: "Disinheritance Clause Format for Will | WillDrafting",
    description:
      "Download legally tested disinheritance clause format for Indian wills. Legally exclude estranged relatives while neutralizing court challenge risks.",
    url: "https://www.willdrafting.in/templates/exclusion-of-estranged-relative-clause-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/exclusion-of-estranged-relative-clause-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Exclude estranged relative in Indian Will clause format and medical form",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Disinheritance Clause Format for Will | WillDrafting",
    description:
      "Download legally tested disinheritance clause format for Indian wills. Legally exclude estranged relatives while neutralizing court challenge risks.",
    images: ["https://www.willdrafting.in/images/exclusion-of-estranged-relative-clause-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ExclusionOfEstrangedRelativePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/exclusion-of-estranged-relative-clause-format";
  const imageUrl =
    "https://www.willdrafting.in/images/exclusion-of-estranged-relative-clause-format-og.jpg";

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
        name: "Disinheritance Clause Format for Will | WillDrafting",
        description:
          "Download legally tested disinheritance clause format for Indian wills. Legally exclude estranged relatives while neutralizing court challenge risks.",
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
            name: "Exclusion of Estranged Relative Clause Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        name: "Exclusion of Estranged Relative Clause Format in Indian Wills",
        headline: "How to Exclude an Estranged Relative in an Indian Will",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Tested disinheritance clause with factual recital, in terrorem penalty clause with gift-over, and doctor sound mind certificate form for Indian Wills.",
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
            name: "How can I legally exclude an estranged or abusive son from my self-acquired house?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Name your son clearly in the Will and state calm, true facts explaining why he gets no share. Under Section 59 of the Indian Succession Act and Section 30 of the Hindu Succession Act, you hold full power over self-acquired homes. Also include a full residuary clause so no asset falls into intestacy under Section 30 of the Indian Succession Act.",
            },
          },
          {
            "@type": "Question",
            name: "Why is writing just 'I disinherit him' risky in an Indian probate court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In H. Venkatachala v. B.N. Thimmajamma and Kavita Kanwar v. Pamela Mehta (2020 SC), the Supreme Court held that unexplained exclusion of a natural heir creates suspicious circumstances. Without factual reasons, the court may doubt your free consent or memory and refuse probate.",
            },
          },
          {
            "@type": "Question",
            name: "Are no-contest in terrorem clauses enforceable in India under Section 127 ISA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Indian courts examine in terrorem clauses carefully under Section 127 of the Indian Succession Act. A clause cannot stop an heir from challenging a forged or coerced Will. To stay valid, pair a modest conditional gift with an express gift-over clause that transfers the forfeited sum to named residuary heirs if a baseless suit is filed.",
            },
          },
          {
            "@type": "Question",
            name: "Why does Section 30 of the Indian Succession Act matter when excluding a relative?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 30 of the Indian Succession Act, any asset not covered by your Will passes by intestacy rules. If you disinherit an estranged relative but forget to name a residuary beneficiary for remaining cash or assets, that excluded relative can still claim a statutory share in the undisposed estate.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need a doctor sound mind certificate when excluding a legal heir?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, a same-day doctor sound mind certificate is strongly advised whenever a close relative is excluded. It proves you understood your family, your assets, and your choice on the signing date, neutralizing future claims of dementia or coercion.",
            },
          },
          {
            "@type": "Question",
            name: "Should I write harsh details of abuse inside the Will clause itself?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Keep the wording inside the Will calm, brief, and factual. Mention long separation, lack of care, or prior lifetime gifts without angry insults. Store supporting police complaints, bank transfers, and call records safely in a separate sealed evidence file for your executor.",
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
        <ExclusionOfEstrangedRelativeClient />
        <Footer />
      </div>
    </>
  );
}
