import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OpcNomineeTimelineClient from "./OpcNomineeTimelineClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "OPC Nominee Director Death Timeline Tool | WillDrafting", // exactly 55 characters
  },
  description:
    "Calculate exact MCA statutory deadlines and ROC filings (INC-4) for OPC nominee director takeover upon sole member death under Companies Act 2013.", // exactly 146 characters
  keywords: [
    "one person company nominee director death timeline",
    "opc sole director death mca process",
    "form inc 4 inc 3 timeline calculator opc",
    "nominee shareholder takeover opc checklist",
    "companies act 2013 section 3 1 c nominee rules",
    "companies incorporation rules 2014 rule 4 opc",
    "opc bank account freeze sole director death",
    "form dir 12 opc nominee director appointment",
    "opc share transmission sole member demise",
    "mca v3 form inc 4 filing deadline calculator",
    "how to unfreeze opc bank account after founder death",
    "opc nominee consent form inc 3 15 day deadline",
    "ama legal solutions corporate business succession",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/opc-nominee-director-activation-timeline-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/opc-nominee-director-activation-timeline-calculator",
      "x-default": "https://www.willdrafting.in/tools/opc-nominee-director-activation-timeline-calculator",
    },
  },
  openGraph: {
    title: "OPC Nominee Director Death Timeline Tool | WillDrafting",
    description:
      "Calculate exact MCA statutory deadlines and ROC filings (INC-4) for OPC nominee director takeover upon sole member death under Companies Act 2013.",
    url: "https://www.willdrafting.in/tools/opc-nominee-director-activation-timeline-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/opc-nominee-director-activation-timeline-calculator-og.jpg",
        width: 1200,
        height: 675,
        alt: "OPC Nominee Director Activation Timeline Tool MCA Form INC 4 Checklist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "OPC Nominee Director Death Timeline Tool | WillDrafting",
    description:
      "Calculate exact MCA statutory deadlines and ROC filings (INC-4) for OPC nominee director takeover upon sole member death under Companies Act 2013.",
    images: ["https://www.willdrafting.in/images/opc-nominee-director-activation-timeline-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function OpcNomineeTimelinePage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/opc-nominee-director-activation-timeline-calculator";
  const imageUrl = "https://www.willdrafting.in/images/opc-nominee-director-activation-timeline-calculator-og.jpg";

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
        name: "OPC Nominee Director Death Timeline Tool | WillDrafting",
        description:
          "Calculate exact MCA statutory deadlines and ROC filings (INC-4) for OPC nominee director takeover upon sole member death under Companies Act 2013.",
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
            name: "OPC Nominee Director Activation Timeline",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "OPC Nominee Director Activation Timeline Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive statutory countdown calculator and ROC filing checklist for One Person Company (OPC) nominee director activation under Section 3(1)(c) of Companies Act 2013 and Rule 4.",
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
            name: "How many days does an OPC nominee have to take over after the sole member dies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rule 4 of the Companies (Incorporation) Rules, 2014, the nominee automatically becomes the member upon demise. The nominee has two critical statutory deadlines: 15 days from becoming member to designate a new nominee in Form INC-3, and 30 days from the demise for the company to file Form INC-4 with the Registrar of Companies (ROC).",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the deceased sole member was also the sole director of the OPC?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When the sole member who is also the sole director passes away, the company faces immediate operational paralysis. The nominee, upon stepping into the shoes of the sole member, must pass a written resolution appointing themselves or an eligible third party as director. Form DIR-12 must then be filed with the ROC within 30 days of appointment under Section 152.",
            },
          },
          {
            "@type": "Question",
            name: "What documents must be attached to Form INC-4 on the MCA portal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mandatory attachments for Form INC-4 include: 1) Certified copy of the death certificate of the deceased sole member, 2) Form INC-3 containing the written consent of the newly designated nominee, 3) Proof of identity and residential address of the new nominee, 4) Altered Memorandum of Association (MoA) reflecting the updated member and nominee names, and 5) Board or member resolution recording share transmission.",
            },
          },
          {
            "@type": "Question",
            name: "How can the new director unfreeze the OPC corporate bank account?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Banks freeze OPC accounts immediately upon notice of the sole director's death. To restore operations, submit to the bank: 1) Original and certified copy of the death certificate, 2) Certified member resolution appointing the new director, 3) MCA acknowledgment challans for Form INC-4 and Form DIR-12 showing SRN, 4) Updated master data printout from the MCA portal, and 5) Fresh KYC and signing mandate forms for the incoming director.",
            },
          },
          {
            "@type": "Question",
            name: "What is the penalty if Form INC-4 is filed after the 30-day statutory window?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Filing Form INC-4 after 30 days triggers escalating additional fees under Section 403 of the Companies Act, 2013, starting from 2 to 12 times the normal fee plus daily penalties of Rs. 100 per day. Persistent failure also exposes the company and officers in default to ROC adjudication notices and fines under Section 450.",
            },
          },
          {
            "@type": "Question",
            name: "Does a nominee director need a succession certificate or probate to take over?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 3(1)(c) of the Companies Act, 2013, the nominee named in the Memorandum of Association possesses a direct statutory mandate for share transmission. Probate or succession certificates are not required by the ROC to take on record the nominee member, distinguishing corporate succession from personal estate transmission.",
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
      <Navbar />
      <OpcNomineeTimelineClient />
      <Footer />
    </>
  );
}
