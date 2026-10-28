import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodicilFormatIndiaClient from "./CodicilFormatIndiaClient";

export const metadata: Metadata = {
  title: {
    absolute: "Codicil Format in India: Amend a Will | WillDrafting",
  },
  description:
    "Download a legally valid Codicil format in India. Learn Section 63 witness rules, Codicil vs New Will guide, and amend your Will safely at.",
  keywords: [
    "codicil format",
    "how to change a will",
    "codicil vs new will",
    "how to change a will in india",
    "codicil to a will sample",
    "amendment to will",
    "section 2b indian succession act",
    "section 63 codicil execution",
    "section 71 alteration in will",
    "codicil template india pdf",
    "plain paper codicil validity",
    "ama legal solutions codicil format",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/codicil-format-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/codicil-format-india",
      "x-default": "https://www.willdrafting.in/templates/codicil-format-india",
    },
  },
  openGraph: {
    title: "Codicil Format in India: Amend a Will | WillDrafting",
    description:
      "Download a legally valid Codicil format in India. Learn Section 63 witness rules, Codicil vs New Will guide, and amend your Will safely at.",
    url: "https://www.willdrafting.in/templates/codicil-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/codicil-format-india-og.jpg",
        width: 1200,
        height: 630,
        alt: "Codicil Format in India Legally Amend a Will Guide and Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codicil Format in India: Amend a Will | WillDrafting",
    description:
      "Download a legally valid Codicil format in India. Learn Section 63 witness rules, Codicil vs New Will guide, and amend your Will safely at.",
    images: ["https://www.willdrafting.in/images/codicil-format-india-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function CodicilFormatIndiaPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/codicil-format-india";
  const imageUrl = "https://www.willdrafting.in/images/codicil-format-india-og.jpg";

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
        name: "Codicil Format in India: Amend a Will | WillDrafting",
        description:
          "Download a legally valid Codicil format in India. Learn Section 63 witness rules, Codicil vs New Will guide, and amend your Will safely at.",
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
            name: "Codicil Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Legally Execute a Codicil to Amend a Will in India",
        description:
          "Step-by-step statutory procedure to execute a legally binding Codicil on plain paper under Section 63 of the Indian Succession Act, 1925.",
        image: imageUrl,
        totalTime: "PT15M",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Copy of the Original Last Will and Testament",
          },
          {
            "@type": "HowToSupply",
            name: "Plain White A4 Paper (No Stamp Duty Required)",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Fountain or Ballpoint Pen for Physical Signatures",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Identify Specific Clauses to Amend",
            text: "Review the original Will and pinpoint the exact clause numbers requiring amendment, substitution, or revocation.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft the Preamble and Recital",
            text: "Recite the testator's full legal name, the exact date of execution of the original Will, and whether it was registered or executed on plain paper.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Include the Republication Clause",
            text: "Explicitly declare that all other terms of the original Will remain confirmed, ratified, and operative without alteration.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Sign Before Two Independent Witnesses",
            text: "Sign the Codicil in the physical visual presence of two independent adult witnesses who are not beneficiaries under Section 67.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Attach and Store With Original Will",
            text: "Affix the executed Codicil securely to the original Will and deposit both together in safe custody with your named executor.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a Codicil under Indian succession law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 2(b) of the Indian Succession Act, 1925, a codicil is a formal legal instrument made in relation to an existing Will. It explains, alters, or adds to the dispositions of the Will and is legally deemed to form an integral part of that Will.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Codicil require stamp paper or stamp duty in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Just like a Will, a Codicil is completely exempt from stamp duty across India under Schedule I of the Indian Stamp Act, 1899. You can execute a 100% legally enforceable Codicil on standard plain white A4 paper.",
            },
          },
          {
            "@type": "Question",
            name: "How many witnesses are needed to execute a valid Codicil?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 63 of the Indian Succession Act, 1925, a Codicil must be attested by a minimum of two independent adult witnesses. Both witnesses must see the testator sign or acknowledge their signature and sign in the presence of the testator.",
            },
          },
          {
            "@type": "Question",
            name: "Can I simply cross out or handwrite changes on my original Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 71 of the Indian Succession Act, handwritten obliterations, crossed-out sentences, or margin notes made after execution have zero legal effect unless executed with two witnesses. Altering the physical Will invites severe probate challenges. You must execute a formal Codicil or new Will.",
            },
          },
          {
            "@type": "Question",
            name: "Can a beneficiary under the original Will witness the Codicil?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 67 of the Indian Succession Act, any legacy or bequest made to an attesting witness or their spouse becomes completely void. Even if a beneficiary was named in the original Will, having them witness the Codicil can forfeit their rights. Always use independent witnesses.",
            },
          },
          {
            "@type": "Question",
            name: "When should I execute a Codicil instead of making a new Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use a Codicil for minor, specific administrative updates, such as replacing an executor, adding a new bank account, or updating a beneficiary's legal surname. If you are significantly altering property distribution, getting married or divorced, or already have multiple codicils, drafting a fresh Will is much safer.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Codicil need to be registered at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Registration is optional under Section 18(e) of the Registration Act, 1908. An unregistered Codicil on plain paper is legally valid. However, if your original Will was registered, registering the Codicil at the same Sub-Registrar Office prevents contradictory records and strengthens evidentiary proof.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a Codicil contradicts a clause in the original Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the legal principle of implied revocation, where an amended clause in a valid Codicil directly and irreconcilably conflicts with a clause in the original Will, the Codicil takes precedence because it reflects the testator's latest testamentary intention.",
            },
          },
          {
            "@type": "Question",
            name: "Can I make multiple Codicils to the same Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Indian law allows multiple codicils (labeled First Codicil, Second Codicil, etc.). However, executing multiple codicils creates severe risks of contradictory language, missing documents, and prolonged court scrutiny. Estate planning advocates recommend drafting a unified new Will after one or two minor amendments.",
            },
          },
          {
            "@type": "Question",
            name: "Does an executor named in the original Will administer the Codicil?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Unless the Codicil specifically revokes or changes the executor's appointment, the executor named in the original Will retains full authority under Section 211 of the Indian Succession Act to administer both the original Will and all accompanying Codicils as a single consolidated estate.",
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
      <CodicilFormatIndiaClient />
      <Footer />
    </>
  );
}
