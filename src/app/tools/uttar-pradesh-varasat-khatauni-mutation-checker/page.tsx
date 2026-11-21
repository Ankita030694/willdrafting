import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpVarasatMutationCheckerClient from "./UpVarasatMutationCheckerClient";

// Screaming Frog Rules: Title 50-60 chars (53), Meta Description 140-155 chars (147), 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "UP Varasat & Khatauni Mutation Checker | WillDrafting", // 53 chars
  },
  description:
    "Check UP Varasat Khatauni mutation rules under UP Revenue Code 2006. Verify Section 108 heirs, Section 107 Will rules, forms, and 45-day timelines.", // 147 chars
  keywords: [
    "uttar pradesh varasat khatauni mutation checker",
    "up varasat online application rules",
    "up revenue code 2006 section 33 varasat",
    "section 108 up revenue code legal heirs order",
    "section 107 up revenue code registered will agricultural land",
    "khatauni mutation dakhil kharij uttar pradesh",
    "vaad up nic in varasat rc form 9",
    "upbhulekh khatauni name transfer after death",
    "married daughter right in agricultural land uttar pradesh",
    "up revenue code rules 2016 rule 34 45 days",
    "section 35 appeal sdm 30 days up mutation",
    "section 109 section 110 female bhumidhar succession up",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/uttar-pradesh-varasat-khatauni-mutation-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/uttar-pradesh-varasat-khatauni-mutation-checker",
      "x-default": "https://www.willdrafting.in/tools/uttar-pradesh-varasat-khatauni-mutation-checker",
    },
  },
  openGraph: {
    title: "UP Varasat & Khatauni Mutation Checker | WillDrafting",
    description:
      "Check UP Varasat Khatauni mutation rules under UP Revenue Code 2006. Verify Section 108 heirs, Section 107 Will rules, forms, and 45-day timelines.",
    url: "https://www.willdrafting.in/tools/uttar-pradesh-varasat-khatauni-mutation-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/uttar-pradesh-varasat-khatauni-mutation-checker-og.jpg",
        width: 1200,
        height: 630,
        alt: "Uttar Pradesh Varasat and Khatauni Mutation Checker under UP Revenue Code 2006",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "UP Varasat & Khatauni Mutation Checker | WillDrafting",
    description:
      "Check UP Varasat Khatauni mutation rules under UP Revenue Code 2006. Verify Section 108 heirs, Section 107 Will rules, forms, and 45-day timelines.",
    images: ["https://www.willdrafting.in/images/uttar-pradesh-varasat-khatauni-mutation-checker-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function UpVarasatMutationCheckerPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/uttar-pradesh-varasat-khatauni-mutation-checker";
  const imageUrl =
    "https://www.willdrafting.in/images/uttar-pradesh-varasat-khatauni-mutation-checker-og.jpg";

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
        name: "UP Varasat & Khatauni Mutation Checker | WillDrafting",
        description:
          "Check UP Varasat Khatauni mutation rules under UP Revenue Code 2006. Verify Section 108 heirs, Section 107 Will rules, forms, and 45-day timelines.",
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
            name: "UP Varasat & Khatauni Mutation Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Uttar Pradesh Varasat & Khatauni Mutation Checker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free legal checker for Uttar Pradesh Varasat and Khatauni land mutation under UP Revenue Code 2006 Sections 33, 34, 35, 107, 108, 109, and 110.",
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
            name: "How long does UP Varasat Khatauni mutation take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rule 34(7) of the UP Revenue Code Rules, 2016, the Tehsildar or Revenue Officer aims to finish undisputed mutation cases within 45 days. Contested cases take up to 90 days. If a case goes past this limit, the officer must write down the reasons for delay.",
            },
          },
          {
            "@type": "Question",
            name: "Is a plain-paper unregistered Will valid for farm land in UP?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 107(3) of the UP Revenue Code, 2006, a Will for farm land must be in writing, signed by two witnesses, and registered at the Sub-Registrar Office. Under Section 107(5), an unregistered Will for UP farm land is void.",
            },
          },
          {
            "@type": "Question",
            name: "Do married daughters inherit farm land automatically in Uttar Pradesh?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Not when primary heirs exist. Under Section 108(2) of the UP Revenue Code, 2006, the widow, sons, and unmarried daughters fall in Clause (a). A married daughter sits in Clause (c). She inherits only if no Clause (a) or Clause (b) heir is alive, unless the owner leaves a registered Will.",
            },
          },
          {
            "@type": "Question",
            name: "What is the government fee for online Varasat in UP?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Filing an undisputed natural succession (Varasat) report online under Section 33 on the UP Revenue Board portal carries zero government fee. A small service charge applies only if you file through a local Jan Seva Kendra or CSC.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Bhumidhar with non-transferable rights write a Will in UP?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Section 107(4) of the UP Revenue Code, 2006 clearly bars a Bhumidhar with non-transferable rights and an Asami from leaving land by Will. Only a Bhumidhar with transferable rights can make a registered Will.",
            },
          },
          {
            "@type": "Question",
            name: "Does Khatauni mutation prove final land ownership in court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. In Jitendra Singh v. State of Madhya Pradesh (2021), the Supreme Court held that mutation entries are only for land tax records. They do not grant final title. Section 39 of the UP Revenue Code allows any party to file a title suit under Section 144.",
            },
          },
          {
            "@type": "Question",
            name: "What if my name was left out of the Varasat Khatauni order?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You have two main legal remedies. You can apply to the Tehsildar under Section 33(3) if an undisputed Revenue Inspector order left you out. You can also file an appeal before the Sub-Divisional Officer (SDM) within 30 days under Section 35(2).",
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
        <UpVarasatMutationCheckerClient />
        <Footer />
      </div>
    </>
  );
}
