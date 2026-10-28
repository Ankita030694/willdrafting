import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaveatAgainstProbateClient from "./CaveatAgainstProbateClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Caveat Against Probate Format India | WillDrafting.in", // exactly 53 characters
  },
  description:
    "Download legally valid caveat against probate format in India under Section 284 Indian Succession Act with Schedule V form and supporting.", // exactly 154 characters
  keywords: [
    "caveat against probate format india",
    "section 284 indian succession act caveat format",
    "affidavit in support of caveat probate high court",
    "schedule v indian succession act caveat template",
    "how to oppose probate of will in india",
    "section 148a cpc vs section 284 isa caveat",
    "caveatable interest in probate supreme court",
    "bombay high court testamentary caveat form 113",
    "calcutta high court caveat affidavit 14 days",
    "contentious testamentary suit section 295",
    "stop sibling secret probate petition india",
    "ama legal solutions probate caveat lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/caveat-against-probate-format-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/caveat-against-probate-format-india",
      "x-default": "https://www.willdrafting.in/templates/caveat-against-probate-format-india",
    },
  },
  openGraph: {
    title: "Caveat Against Probate Format India | WillDrafting.in",
    description:
      "Download legally valid caveat against probate format in India under Section 284 Indian Succession Act with Schedule V form and supporting.",
    url: "https://www.willdrafting.in/templates/caveat-against-probate-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/caveat-against-probate-format-india-og.jpg",
        width: 1200,
        height: 675,
        alt: "Caveat Against Probate Format India under Section 284 Indian Succession Act Schedule V",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caveat Against Probate Format India | WillDrafting.in",
    description:
      "Download legally valid caveat against probate format in India under Section 284 Indian Succession Act with Schedule V form and supporting.",
    images: ["https://www.willdrafting.in/images/caveat-against-probate-format-india-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function CaveatAgainstProbatePage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/caveat-against-probate-format-india";
  const imageUrl = "https://www.willdrafting.in/images/caveat-against-probate-format-india-og.jpg";

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
        name: "Caveat Against Probate Format India | WillDrafting.in",
        description:
          "Download legally valid caveat against probate format in India under Section 284 Indian Succession Act with Schedule V form and supporting.",
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
            name: "Caveat Against Probate Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        name: "Caveat Against Probate Format India (Section 284 & Schedule V)",
        headline: "Caveat Against Probate Format in India: Section 284 Guide",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Statutory legal template pack containing Section 284 Indian Succession Act Schedule V probate caveat form, supporting affidavit format, and.",
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
            name: "What is a caveat against probate under Section 284 of the Indian Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A probate caveat is a formal statutory notice lodged in the High Court or District Court under Section 284 and Schedule V of the Indian Succession Act, 1925. It directs the court not to grant probate or letters of administration without prior written notice to the caveator.",
            },
          },
          {
            "@type": "Question",
            name: "How does a Section 284 ISA caveat differ from a Section 148A CPC caveat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Section 148A CPC caveat applies to general civil suits and automatically lapses after 90 days. In contrast, a probate caveat under Section 284 ISA is governed by testamentary rules, stays active until petition notice or renewable periods, and requires a mandatory supporting affidavit within 8 to 14 days once citation is served.",
            },
          },
          {
            "@type": "Question",
            name: "What is the strict time limit to file the Affidavit in Support of Caveat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once the propounder serves citation of the probate petition on you, you must file an Affidavit in Support of Caveat within the period set by the court's rules: 8 days in the Bombay High Court (Rule 402) and 14 days in the Calcutta and Delhi High Courts. Failing to file within this window results in the caveat being discharged.",
            },
          },
          {
            "@type": "Question",
            name: "What constitutes a caveatable interest in probate proceedings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Supreme Court rulings in Elizabeth Antony and Krishna Kumar Birla v. Rajendra Singh Lodha, a caveatable interest exists when a person's proprietary or succession rights would be prejudicially affected by probate. Any Class I or Class II legal heir who would inherit on intestacy has an unquestionable caveatable interest.",
            },
          },
          {
            "@type": "Question",
            name: "Can someone claiming independent ownership file a probate caveat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A probate court does not determine title or ownership of property; it only decides whether the Will is genuine and legally valid. A third party claiming that the testator did not own the property cannot lodge a probate caveat. They must file a regular civil title suit under the Code of Civil Procedure.",
            },
          },
          {
            "@type": "Question",
            name: "Can I lodge a caveat before my sibling files a probate petition in court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Section 284(4) of the Indian Succession Act allows a caveat to be entered at any time before probate or letters of administration are granted. You can lodge an anticipatory caveat in the relevant High Court or District Court as soon as you suspect a forged or coerced Will exists.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to the probate petition after an affidavit in support is filed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 295 of the Indian Succession Act, 1925, as soon as a caveat with a valid supporting affidavit is filed, the uncontested petition converts into a Contentious Testamentary Suit. The petition is renumbered as a suit where the propounder becomes the Plaintiff and the caveator becomes the Defendant.",
            },
          },
          {
            "@type": "Question",
            name: "What are the common grounds raised in an Affidavit in Support of Caveat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Common legal grounds include: (1) suspicious circumstances surrounding execution, (2) lack of sound disposing mind or cognitive capacity of the testator, (3) active coercion or undue influence by the propounder, (4) forged signature or fabricated execution, and (5) existence of a valid subsequent Will revoking the earlier document.",
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
        <CaveatAgainstProbateClient />
        <Footer />
      </div>
    </>
  );
}
