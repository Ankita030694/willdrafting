import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillFormatIndiaClient from "./WillFormatIndiaClient";

export const metadata: Metadata = {
  title: {
    absolute: "Will Format in India: Free Legal Template | WillDrafting",
  },
  description:
    "Download a legally valid Will format in India. Plain paper template with Section 63 witness rules, property schedules, and lawyer review at.",
  keywords: [
    "will format in india",
    "will format pdf",
    "simple will format",
    "will format for property",
    "will format word",
    "section 63 indian succession act",
    "plain paper will validity india",
    "will drafting format india",
    "free will template india",
    "two witnesses will india",
    "section 67 witness void bequest",
    "online will maker india",
    "ama legal solutions will format",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/will-format-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/will-format-india",
      "hi-IN": "https://www.willdrafting.in/templates/will-format-hindi",
      "mr-IN": "https://www.willdrafting.in/templates/will-format-marathi-mrutyupatra",
      "gu-IN": "https://www.willdrafting.in/templates/will-format-gujarati-vasiyatnama",
      "pa-IN": "https://www.willdrafting.in/templates/will-format-punjabi-vasiyatnama",
      "bn-IN": "https://www.willdrafting.in/templates/will-format-bengali-ichchapatra",
      "ta-IN": "https://www.willdrafting.in/templates/will-format-tamil-uyil-sasanam",
      "te-IN": "https://www.willdrafting.in/templates/will-format-telugu-veelunama",
      "kn-IN": "https://www.willdrafting.in/templates/will-format-kannada-uyilu",
      "ml-IN": "https://www.willdrafting.in/templates/will-format-malayalam-maranapathram",
      "x-default": "https://www.willdrafting.in/templates/will-format-india",
    },
  },
  openGraph: {
    title: "Will Format in India: Free Legal Template | WillDrafting",
    description:
      "Download a legally valid Will format in India. Plain paper template with Section 63 witness rules, property schedules, and lawyer review at.",
    url: "https://www.willdrafting.in/templates/will-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-format-india-og.jpg",
        width: 1200,
        height: 630,
        alt: "Will Format in India Plain Paper Legal Template and Section 63 Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Format in India: Free Legal Template | WillDrafting",
    description:
      "Download a legally valid Will format in India. Plain paper template with Section 63 witness rules, property schedules, and lawyer review at.",
    images: ["https://www.willdrafting.in/images/will-format-india-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillFormatIndiaPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/will-format-india";
  const imageUrl = "https://www.willdrafting.in/images/will-format-india-og.jpg";

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
        name: "Will Format in India: Free Legal Template | WillDrafting",
        description:
          "Download a legally valid Will format in India. Plain paper template with Section 63 witness rules, property schedules, and lawyer review at.",
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
            name: "Will Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Execute a Legally Valid Will in India",
        description:
          "Step-by-step statutory procedure to execute a legally enforceable Will on plain paper in India under Section 63 of the Indian Succession Act.",
        image: imageUrl,
        totalTime: "PT15M",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Plain White A4 Paper (No Stamp Paper Required)",
          },
          {
            "@type": "HowToSupply",
            name: "Schedule of Immovable Property and Bank Details",
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
            name: "Inventory Assets and Debts",
            text: "Compile a clear list of all bank accounts, fixed deposits, Demat folio numbers, real estate titles, and personal liabilities.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Appoint an Independent Executor",
            text: "Nominate a primary executor and an alternate executor who will administer the estate and represent you before institutions.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Draft Specific Bequests and Residuary Clause",
            text: "Designate specific beneficiaries for immovable and movable assets, and add a sweeper residuary clause to cover all future or omitted property.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Print on Standard Plain Paper",
            text: "Print the finalized text on plain white A4 paper. Do not purchase non-judicial stamp paper, as Wills are exempt from stamp duty.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Sign Before Two Independent Witnesses",
            text: "Sign or mark the bottom of every page in the visual presence of two independent adult witnesses who are not beneficiaries or spouses of beneficiaries.",
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Store in Safe Custody",
            text: "Keep the original signed Will in a secure location and notify your named executor where the document is kept.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Is stamp paper legally required for a Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the Indian Stamp Act, 1899 and the Indian Succession Act, 1925, a Will is completely exempt from stamp duty anywhere in India. You can execute a 100% legally binding Will on plain white A4 paper.",
            },
          },
          {
            "@type": "Question",
            name: "How many witnesses are required to execute a valid Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 63(c) of the Indian Succession Act, 1925 strictly mandates a minimum of two adult witnesses. Each witness must see the testator sign or acknowledge their signature, and each witness must sign in the presence of the testator.",
            },
          },
          {
            "@type": "Question",
            name: "Can a family member or beneficiary be an attesting witness?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A family member can be a witness ONLY if they and their spouse receive nothing under the Will. Under Section 67 of the Indian Succession Act, any bequest made to an attesting witness or their spouse is completely void.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Will need to be registered at the Sub-Registrar office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Registration is optional. Under Section 18(e) of the Registration Act, 1908, registering a Will is entirely voluntary. An unregistered Will written on plain paper is just as valid as a registered one.",
            },
          },
          {
            "@type": "Question",
            name: "Can I type my Will on a computer, or must it be handwritten?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both typed and handwritten (holographic) Wills are equally valid in India. A typed document on standard white paper is widely preferred because it eliminates handwriting ambiguities.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Will override bank account and mutual fund nominations?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In Shakti Yezdani v. Jayanand Salgaonkar (2023), the Supreme Court affirmed that a nominee is merely a temporary trustee. The nominee must hand over the funds to the beneficiaries named in the valid Will.",
            },
          },
          {
            "@type": "Question",
            name: "Can I bequeath ancestral property through my Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can only bequeath your own separate undivided coparcenary share in ancestral property under Section 30 of the Hindu Succession Act, 1956. You cannot bequeath the entire ancestral family estate.",
            },
          },
          {
            "@type": "Question",
            name: "Can an executor also be named as a beneficiary in the Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An executor can also be a beneficiary. However, ensure that this beneficiary-executor does NOT sign as an attesting witness, so you do not violate Section 67.",
            },
          },
          {
            "@type": "Question",
            name: "What is a Codicil, and when should I use one instead of a new Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Codicil is a formal legal addendum used to make minor alterations to an existing Will. For major changes in property distribution, drafting a fresh Will that revokes the previous one is safer.",
            },
          },
          {
            "@type": "Question",
            name: "How can I ensure my Will is not challenged in court after my death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Attach a registered medical practitioner's fitness certificate, record a video of the signing, use independent non-beneficiary witnesses, give clear reasons if disinheriting natural heirs, and optionally register the document.",
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
      <WillFormatIndiaClient />
      <Footer />
    </>
  );
}
