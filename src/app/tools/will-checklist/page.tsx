import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WillChecklistClient from "./WillChecklistClient";

export const metadata: Metadata = {
  title: {
    absolute: "Documents Required for Will in India | WillDrafting",
  },
  description:
    "Checklist of documents required for making a Will in India. Verify asset papers, witness rules, executor details, and draft online with.",
  keywords: [
    "documents required for will in india",
    "will checklist india",
    "what do I need to make a will",
    "will preparation checklist",
    "will documents list",
    "documents for will registration in india",
    "asset checklist for will",
    "executor documents required india",
    "doctor medical fitness certificate for will",
    "section 63 indian succession act checklist",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/will-checklist",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/will-checklist",
      "x-default": "https://www.willdrafting.in/tools/will-checklist",
    },
  },
  openGraph: {
    title: "Documents Required for Will in India | WillDrafting",
    description:
      "Checklist of documents required for making a Will in India. Verify asset papers, witness rules, executor details, and draft online with.",
    url: "https://www.willdrafting.in/tools/will-checklist",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-checklist-og.jpg",
        width: 1200,
        height: 630,
        alt: "Documents Required for Making a Will in India Checklist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documents Required for Will in India | WillDrafting",
    description:
      "Checklist of documents required for making a Will in India. Verify asset papers, witness rules, executor details, and draft online with.",
    images: ["https://www.willdrafting.in/images/will-checklist-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function WillChecklistPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/will-checklist";
  const imageUrl = "https://www.willdrafting.in/images/will-checklist-og.jpg";

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
        name: "Documents Required for Will in India | WillDrafting",
        description:
          "Checklist of papers required for making a Will in India. Verify asset papers, witness rules, executor details, and draft online with.",
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
            item: "https://www.willdrafting.in/service",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Will Checklist India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#app`,
        name: "Indian Will Preparation & Document Verification Checklist Tool",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free checklist tool for Indian estate planning covering 15 asset classes, executor and guardian appointments, Section 63 witness.",
        image: imageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          url: "https://www.linkedin.com/in/iamanujmalik/",
        },
        reviewedBy: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
        publisher: {
          "@id": "https://www.willdrafting.in/#organization",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What documents are legally mandatory to write a Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Indian Succession Act, 1925, no specific paper is legally needed to create a valid Will. You can write your Will on plain white A4 paper. However, to make the Will enforceable and fight-free during probate and city name change, you must compile your Aadhaar or PAN card, filed title deeds for real estate, bank passbook copies, Demat Client Master Reports, and ID proofs for two independent witnesses.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need original property title deeds while drafting a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. You do not need to attach or surrender original title deeds when making a Will. Clear photocopies or digital PDF scans are sufficient to extract essential legal details, including the filed deed number, survey number, Khata/Patta details, exact carpet area, and four-side boundary demarcations.",
            },
          },
          {
            "@type": "Question",
            name: "Is a doctor medical fitness certificate compulsory for making a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While Section 59 of the Indian Succession Act does not explicitly mandate a medical paper, obtaining one from a filed MBBS or MD practitioner is strongly recommended for senior citizens aged 60 and above. The doctor attests that the Will maker is of sound mind, memory, and disposing understanding, effectively eliminating future allegations of dementia or coercion.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required from attesting witnesses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Each witness must provide their full legal name, father's or spouse's name, permanent home address, and a valid government identity number such as Aadhaar, PAN, Voter ID, or Passport. Under Section 67 of the Indian Succession Act, neither witness nor their spouses may be heirs under the Will.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need stamp paper or court fee stamps to make a Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A Will is 100% exempt from stamp duty across India under Schedule I of the Indian Stamp Act, 1899. Writing a Will on non-judicial stamp paper does not add any legal validity. Standard plain white A4 paper is completely valid.",
            },
          },
          {
            "@type": "Question",
            name: "What details are required for bank accounts, mutual funds, and demat shares?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For bank accounts, record the bank name, branch address, account number, and IFSC code. For demat holdings, obtain the Client Master Report (CMR) containing the 16-digit Demat ID and depository name (NSDL or CDSL). For mutual funds, list the Asset Management Company (AMC) name, folio number, and registrar details.",
            },
          },
          {
            "@type": "Question",
            name: "Can a nominee named in bank or insurance papers override my Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court of India in Sarbati Devi (1984) and Shakti Yezdani (Dec 2023) ruled that a nominee is merely a temporary custodian or trustee. The legal ownership passes strictly according to the bequests written in your valid Last Will and Testament.",
            },
          },
          {
            "@type": "Question",
            name: "What documents do I need to register a Will at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Will filing is a choice under Section 18(e) of the Filing Act, 1908. If you choose to register, you need two physical printouts of the Will, original PAN and Aadhaar cards of the Will maker, original identity proofs of two witnesses, two passport-sized photographs of each person, and a doctor's medical fitness paper.",
            },
          },
          {
            "@type": "Question",
            name: "How should digital assets, cryptocurrency, and email accounts be listed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "List the account platform name, username or filed email ID, and public crypto wallet addresses. Never write confidential private keys, master passwords, or recovery seed phrases inside the text of the Will itself, as Wills become public upon probate or filing. Instead, refer to a separate private digital vault entrusted to your digital executor.",
            },
          },
          {
            "@type": "Question",
            name: "What is a residuary clause and why is it essential in a Will checklist?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 102 and Section 103 of the Indian Succession Act, 1925, a residuary clause disposes of any asset not mainly mentioned in the Will or acquired after its signing. Including a residuary clause ensures that forgotten bank accounts or future investments do not trigger partial intestacy or family fights.",
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
      <WillChecklistClient />
      <Footer />
    </>
  );
}
