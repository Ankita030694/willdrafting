import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExecutorConsentRenunciationClient from "./ExecutorConsentRenunciationClient";

// Strict Screaming Frog SEO Rules: Title 50-60 chars, Meta Description 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Renunciation of Executorship Format India | WillDrafting.in", // exactly 59 characters
  },
  description:
    "Download renunciation of executorship format India under Section 230 ISA. Includes executor consent letter, court renunciation deed, and legal.", // exactly 147 characters
  keywords: [
    "renunciation of executorship format india",
    "executor consent letter format will india",
    "section 230 indian succession act renunciation format",
    "executor renunciation deed format india",
    "affidavit of renunciation of executorship india",
    "section 229 citation to executor",
    "letters of administration section 232 isa",
    "unwilling executor in will india procedure",
    "renounce executorship before probate india",
    "nri executor renunciation apostille consular attestation",
    "bholanath mullick executor intermeddling precedent",
    "ama legal solutions testamentary advocates",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/templates/executor-consent-and-renunciation-letter-format",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/templates/executor-consent-and-renunciation-letter-format",
      "x-default":
        "https://www.willdrafting.in/templates/executor-consent-and-renunciation-letter-format",
    },
  },
  openGraph: {
    title: "Renunciation of Executorship Format India | WillDrafting.in",
    description:
      "Download renunciation of executorship format India under Section 230 ISA. Includes executor consent letter, court renunciation deed, and legal.",
    url: "https://www.willdrafting.in/templates/executor-consent-and-renunciation-letter-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/executor-consent-and-renunciation-letter-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Renunciation of Executorship Format India - Section 230 Indian Succession Act Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renunciation of Executorship Format India | WillDrafting.in",
    description:
      "Download renunciation of executorship format India under Section 230 ISA. Includes executor consent letter, court renunciation deed, and legal.",
    images: [
      "https://www.willdrafting.in/images/executor-consent-and-renunciation-letter-format-og.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ExecutorConsentRenunciationPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/executor-consent-and-renunciation-letter-format";
  const imageUrl =
    "https://www.willdrafting.in/images/executor-consent-and-renunciation-letter-format-og.jpg";

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
        name: "Renunciation of Executorship Format India | WillDrafting.in",
        description:
          "Download giving up of executorship format India under Section 230 ISA. Includes executor consent letter, court giving up deed, and legal.",
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
            name: "Executor Consent & Renunciation Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline:
          "Renunciation of Executorship Format India: Section 230 Indian Succession Act Guide",
        name: "Renunciation of Executorship Format India | WillDrafting.in",
        description:
          "Legal legal formats and procedural SOP for executor consent and Section 230 giving up under the Indian Succession Act, 1925.",
        image: imageUrl,
        inLanguage: "en-IN",
        mainEntityOfPage: canonicalUrl,
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
        author: {
          "@type": "Organization",
          name: "AMA Legal Solutions Testamentary Law Practice",
          url: "https://www.amalegalsolutions.com",
        },
        datePublished: "2026-10-27T09:00:00+05:30",
        dateModified: "2026-10-27T09:00:00+05:30",
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Executor Consent and Renunciation of Executorship Format India",
        url: canonicalUrl,
        description:
          "Lawyer-vetted templates for Pre-Death Executor Consent Letter and Post-Death Section 230 Court Giving Up Deed under the Indian Succession.",
        image: imageUrl,
        fileFormat: "text/html",
        hasDigitalDocumentPermission: {
          "@type": "DigitalDocumentPermission",
          permissionType: "https://schema.org/ReadPermission",
          grantee: {
            "@type": "Audience",
            audienceType: "Public",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can an executor refuse to act after the testator dies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An single named as executor in a Will is never legally compelled to accept the office. Under Section 230 of the Indian Succession Act, 1925, an executor may renounce executorship either orally in court before the Judge or in writing through a signed giving up declaration.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the named executor renounces executorship?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When an executor formally renounces under Section 230, the court cannot grant probate to them. Instead, under Section 231 and Section 232, the residuary legatees or legal heirs can apply directly for Letters of Care with the Will Annexed, allowing them to administer and distribute the estate.",
            },
          },
          {
            "@type": "Question",
            name: "Can an executor renounce after taking charge of estate assets?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the established legal doctrine of intermeddling (affirmed in In the Goods of Bholanath Mullick), once an executor takes control of estate assets, operates bank accounts, or acts in the care, they have accepted the office and cannot arbitrarily renounce. In such cases, only the High Court can discharge them under Section 301 upon proper accounting.",
            },
          },
          {
            "@type": "Question",
            name: "Why is a Pre-Death Executor Consent Letter recommended during Will drafting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Obtaining a written consent letter while the Will maker is alive confirms that the designated executor is willing and physically capable of handling the responsibility. This prevents unexpected probate delays, family fights, and costly Section 229 court citations after the Will maker passes away.",
            },
          },
          {
            "@type": "Question",
            name: "How does an NRI executor renounce executorship from outside India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An NRI or foreign resident executor must execute the Giving Up Deed before an Indian Consular Officer or have it notarized and apostilled under the Hague Apostille Convention. Upon arrival in India, the paper must be stamped within 3 months under Section 18 of the Indian Stamp Act, 1899 before submission to the probate court.",
            },
          },
          {
            "@type": "Question",
            name: "What is a citation under Section 229 of the Indian Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A citation is a formal notice issued by the court to an executor who has neither applied for probate nor formally renounced. It orders the executor to accept or renounce within a fixed period. If the executor fails to appear after citation, their right is deemed forfeited under Section 231.",
            },
          },
          {
            "@type": "Question",
            name: "Does an executor renunciation need to be registered at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Filing at the SRO office is not needed for an executor giving up under Section 230 ISA. However, signing the giving up on non-judicial stamp paper attested by a public notary or filing an sworn note directly in the Will court is standard judicial practice across Indian High Courts and District Courts.",
            },
          },
          {
            "@type": "Question",
            name: "Can an executor renounce executorship in part and keep the rest?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Giving Up of executorship must be complete and unconditional. An executor cannot accept the office for personal bank deposits while renouncing responsibility for disputed real estate. A partial giving up is invalid under Section 230 of the Indian Succession Act.",
            },
          },
          {
            "@type": "Question",
            name: "What stamp duty applies to an executor renunciation deed in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Stamp duty is governed by respective State Stamp Acts. Typically, an executor giving up declaration is signed on non-judicial stamp paper of ₹100 in Maharashtra and Delhi, or ₹100 to ₹500 in Karnataka, Tamil Nadu, and Uttar Pradesh under the general article for release deeds or sworn notes.",
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
        <ExecutorConsentRenunciationClient />
        <Footer />
      </div>
    </>
  );
}
