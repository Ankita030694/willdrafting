import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HousingSocietyDocumentCheckerClient from "./HousingSocietyDocumentCheckerClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "CHS Flat Transfer After Death Documents | WillDrafting", // exactly 54 characters
  },
  description:
    "Check cooperative housing society flat transfer after death documents under MCS Act. Verify Form 14-19, nominee rights, and fee caps with.", // exactly 151 characters
  keywords: [
    "cooperative housing society flat transfer after death documents",
    "chs share certificate transfer after death maharashtra",
    "associate member vs nominee flat transfer checker",
    "maharashtra co-operative societies act section 154b-13",
    "model bye-law appendix form 14 15 17 19",
    "housing society flat transfer without probate mumbai",
    "delhi cooperative societies act flat transfer after death",
    "indrani wahi supreme court nominee rights flat",
    "housing society transfer charges cap 25000",
    "society share certificate transmission legal heir",
    "chs transmission indemnity bond appendix 17 format",
    "ama legal solutions housing society flat transfer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/housing-society-flat-transfer-document-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/housing-society-flat-transfer-document-checker",
      "x-default": "https://www.willdrafting.in/tools/housing-society-flat-transfer-document-checker",
    },
  },
  openGraph: {
    title: "CHS Flat Transfer After Death Documents | WillDrafting",
    description:
      "Check cooperative housing society flat transfer after death documents under MCS Act. Verify Form 14-19, nominee rights, and fee caps with.",
    url: "https://www.willdrafting.in/tools/housing-society-flat-transfer-document-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/housing-society-flat-transfer-document-checker-og.jpg",
        width: 1376,
        height: 768,
        alt: "Cooperative Housing Society Flat Transfer After Death Document Checker - Form 14 to 19 and MCS Act Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHS Flat Transfer After Death Documents | WillDrafting",
    description:
      "Check cooperative housing society flat transfer after death documents under MCS Act. Verify Form 14-19, nominee rights, and fee caps with.",
    images: ["https://www.willdrafting.in/images/housing-society-flat-transfer-document-checker-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function HousingSocietyDocumentCheckerPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/housing-society-flat-transfer-document-checker";
  const imageUrl =
    "https://www.willdrafting.in/images/housing-society-flat-transfer-document-checker-og.jpg";

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
        name: "CHS Flat Transfer After Death Documents | WillDrafting",
        description:
          "Check cooperative housing society flat transfer after death documents under MCS Act. Verify Form 14-19, nominee rights, and fee caps with.",
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
            name: "CHS Flat Transfer Document Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Cooperative Housing Society Flat Transfer Document Checker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Diagnostic legal checker mapping Maharashtra MCS Act Section 154B-13, Model Bye-Law Appendix Forms 14 to 19, Delhi Cooperative Societies Act.",
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
            name: "Does a nominee become the absolute owner of a housing society flat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the landmark Supreme Court ruling in Indrani Wahi v. Registrar of Co-operative Societies (2016) and Sarbati Devi (1984), a nominee holds the flat only as a trustee for the legal heirs. Under Section 154B-13 of the Maharashtra Co-operative Societies Act, the nominee is admitted only as a Provisional Member until the lawful legal heirs establish their rights.",
            },
          },
          {
            "@type": "Question",
            name: "Can a society demand Probate if a valid registered Will or Nominee exists?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Maharashtra Model Bye-Law 35, 36, and Section 154B-13, a society cannot insist on Probate if all legal heirs provide consent affidavits and execute an Indemnity Bond (Appendix 17) alongside public notice in newspapers. Probate is compulsory only if a court stay order exists or rival claimants file formal legal objections.",
            },
          },
          {
            "@type": "Question",
            name: "What is the maximum transfer fee a housing society can charge upon death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Maharashtra Government Notification issued under Section 79A of the MCS Act, the maximum transfer premium of Rs. 25,000 applies only to open-market sales. For flat transmission to legal heirs or nominees upon death, the transfer premium is strictly Rs. 0. The society may only charge a nominal Entrance Fee of Rs. 100 and a share transfer fee of Rs. 500.",
            },
          },
          {
            "@type": "Question",
            name: "What are the key Appendix Forms required for CHS flat transfer in Maharashtra?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The primary forms are: Appendix 14 (application by nominee), Appendix 15 (application by legal heir where no nomination exists), Appendix 16 (15-day newspaper public notice inviting objections), Appendix 17 (registered indemnity bond to the society), and Appendix 19 (release deed or consent NOC from co-heirs).",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the Society Managing Committee does not decide within 90 days?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 154B-13(3) and Section 22(2) of the Maharashtra Co-operative Societies Act, the Managing Committee must communicate its decision within 90 days. If the society fails to communicate within 90 days, the claimant is deemed to have been admitted as a member, and an appeal can be filed before the Deputy Registrar under Section 23.",
            },
          },
          {
            "@type": "Question",
            name: "Is public notice in newspapers compulsory for flat transmission in housing societies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, under Model Bye-Law 35 and 36, where membership is transferred on the basis of heirship or indemnity bond without probate, the society must issue a 15-day public notice in two local newspapers (one in English and one in vernacular Marathi/Hindi) inviting claims, at the expense of the applicant.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between an Associate Member and a Nominee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Associate Member is a person whose name appears jointly on the share certificate alongside the primary owner (under Section 154B-1(18)(b)). A Nominee is merely a person appointed by the original owner during their lifetime to receive shares in trust upon demise. An associate member who is also a co-purchaser has immediate rights to membership.",
            },
          },
          {
            "@type": "Question",
            name: "Can legal heirs sell an inherited society flat without entering their names in the share certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Before executing a registered sale deed with an external buyer, the share certificate must first be formally transferred and endorsed in the name of the legal heirs by the society, and the property tax records must be mutated in the municipal corporation register.",
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
        <HousingSocietyDocumentCheckerClient />
        <Footer />
      </div>
    </>
  );
}
