import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodicilToRegisteredWillClient from "./CodicilToRegisteredWillClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars (with .in), Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Codicil to Registered Will Format India | WillDrafting.in", // exactly 57 characters
  },
  description:
    "Download verified Codicil to Will format in India under Indian Succession Act 1925. Amend your registered will without redrafting the entire document.", // exactly 150 characters
  keywords: [
    "codicil to will format in india",
    "how to amend a registered will format",
    "codicil draft sample legal heirs india",
    "add new property to existing will codicil",
    "section 2 b indian succession act codicil",
    "section 62 isa alteration of will",
    "codicil reaffirmation clause sample",
    "sub registrar office book 3 codicil registration",
    "bhagat ram vs suresh kumar codicil proof",
    "codicil vs new will legal differences",
    "amend will after buying new flat india",
    "ama legal solutions will amendment lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/codicil-to-registered-will-amendment-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/codicil-to-registered-will-amendment-format",
      "x-default": "https://www.willdrafting.in/templates/codicil-to-registered-will-amendment-format",
    },
  },
  openGraph: {
    title: "Codicil to Registered Will Format India | WillDrafting.in",
    description:
      "Download verified Codicil to Will format in India under Indian Succession Act 1925. Amend your registered will without redrafting the entire document.",
    url: "https://www.willdrafting.in/templates/codicil-to-registered-will-amendment-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/codicil-to-registered-will-amendment-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Codicil to Registered Will amendment format under Indian Succession Act Section 62 and Book 3 SRO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codicil to Registered Will Format India | WillDrafting.in",
    description:
      "Download verified Codicil to Will format in India under Indian Succession Act 1925. Amend your registered will without redrafting the entire document.",
    images: ["https://www.willdrafting.in/images/codicil-to-registered-will-amendment-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function CodicilToRegisteredWillPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/codicil-to-registered-will-amendment-format";
  const imageUrl = "https://www.willdrafting.in/images/codicil-to-registered-will-amendment-format-og.jpg";

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
        name: "Codicil to Registered Will Format India | WillDrafting.in",
        description:
          "Download verified Codicil to Will format in India under Indian Succession Act 1925. Amend your registered will without redrafting the entire document.",
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
            name: "Codicil to Registered Will Amendment Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        name: "Codicil to Registered Will Amendment Format India (Section 62 ISA)",
        headline: "Codicil to Registered Will Format: Section 62 Amendment Guide",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Lawyer-vetted Codicil to Will format in India under Indian Succession Act 1925 Section 2(b) & 62, featuring original Will reaffirmation clause, SRO Book 3 registration steps, and attestation rules.",
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
            name: "What is a Codicil to a Will under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 2(b) of the Indian Succession Act, 1925, a Codicil is a legal document made in relation to an existing Will that explains, alters, adds to, or revokes specific dispositions. It forms an integral part of the original Will and republishes it as of the Codicil's execution date.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use a Codicil to amend a registered Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 62 of the Indian Succession Act, a testator can alter or amend a registered Will at any time during their lifetime. While registering a Codicil is optional under Section 18 of the Registration Act, registering it at the Sub-Registrar Office where the original Will is recorded in Book 3 prevents disputes.",
            },
          },
          {
            "@type": "Question",
            name: "Why is the Reaffirmation Clause critical in a Codicil?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Reaffirmation Clause explicitly confirms that all other bequests, executor appointments, and provisions of the original Will remain in full force and effect. Without this recital, ambiguous wording might unintentionally revoke or conflict with existing gifts.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need two witnesses to sign a Codicil in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 63 of the Indian Succession Act, 1925, a Codicil requires the exact same attestation formalities as a Will. The testator must sign or affix their mark in the presence of at least two independent adult witnesses, neither of whom should be a beneficiary.",
            },
          },
          {
            "@type": "Question",
            name: "When should I draft a Codicil instead of making a new Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Codicil is ideal for minor, targeted amendments, such as adding a newly purchased apartment or bank account, substituting an executor, or correcting a clerical error. If you are substantially restructuring your estate distribution or changing primary legal heirs, drafting a fresh Will is recommended.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the original Will was registered but the Codicil is unregistered?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Legally, an unregistered Codicil can validly amend a registered Will because Will registration is optional under Section 18 of the Registration Act, 1908. However, an unregistered Codicil modifying a registered Will often invites strict judicial scrutiny and higher evidentiary burden under Section 68 of the BSA.",
            },
          },
          {
            "@type": "Question",
            name: "How is a Codicil cross-referenced at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When registering a Codicil, the Sub-Registrar records the deed in Book 3 (Register of Wills) and enters a cross-reference notation in the margin of the original registered Will, noting the Codicil's Document Number, Volume, and Page numbers.",
            },
          },
          {
            "@type": "Question",
            name: "Can I execute multiple Codicils to the same Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can execute a First Codicil, Second Codicil, and subsequent Codicils. However, having three or more Codicils increases the risk of conflicting clauses and probate delays. In such situations, revoking all earlier instruments and executing a single unified Will is best practice.",
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
        <CodicilToRegisteredWillClient />
        <Footer />
      </div>
    </>
  );
}
