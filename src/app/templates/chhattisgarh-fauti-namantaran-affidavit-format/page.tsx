import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChhattisgarhFautiClient from "./ChhattisgarhFautiClient";

const CANONICAL_URL =
  "https://www.willdrafting.in/templates/chhattisgarh-fauti-namantaran-affidavit-format";
const OG_IMAGE_URL =
  "https://www.willdrafting.in/images/chhattisgarh-fauti-namantaran-affidavit-format-og.jpg";
const PAGE_TITLE = "Chhattisgarh Fauti Namantaran Affidavit | WillDrafting"; // 54 chars
const PAGE_DESCRIPTION =
  "Download official Chhattisgarh Fauti Namantaran affidavit format for Bhuiyan portal. Complete Hindi draft for Khasra B1/P2 mutation in Tehsil office."; // 149 chars

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  keywords: [
    "chhattisgarh fauti namantaran affidavit format",
    "bhuiyan portal succession affidavit cg",
    "raipur tehsil fauti namantaran draft",
    "khasra b1 p2 succession panchnama format",
    "warisan affidavit 50 stamp paper bilaspur tehsil",
    "chhattisgarh land revenue code 1959 section 109 110",
    "fauti namantaran shapath patra hindi cg",
    "15 day istehar objection notice format chhattisgarh",
    "joint bhumiswami entry bhuiyan cg nic in",
    "chhattisgarh rin pustika warisan mutation format",
    "section 165 tribal land succession chhattisgarh",
    "ama legal solutions chhattisgarh revenue lawyer",
  ],
  authors: [{ name: "Advocate Anuj Anand Malik" }],
  creator: "WillDrafting Legal Team",
  publisher: "WillDrafting.in",
  category: "Legal Templates",
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      "en-IN": CANONICAL_URL,
      "x-default": CANONICAL_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 675,
        alt: "Chhattisgarh Fauti Namantaran Affidavit Format and Khasra B1 P2 Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function ChhattisgarhFautiNamantaranPage() {
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
        "@id": `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "en-IN",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL_URL}#breadcrumb`,
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
            name: "Chhattisgarh Fauti Namantaran Affidavit Format",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${CANONICAL_URL}#document`,
        headline: "Chhattisgarh Fauti Namantaran Affidavit Format & Bhuiyan Guide",
        name: "Chhattisgarh Fauti Namantaran Hindi Affidavit, Khasra B1/P2 Schedule & 15-Day Objection Notice",
        url: CANONICAL_URL,
        description:
          "Hindi Fauti Namantaran affidavit format for CG Bhuiyan portal, Khasra B1/P2 schedule, and Section 110 15-day Istehar notice.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        inLanguage: ["en-IN", "hi-IN"],
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        image: OG_IMAGE_URL,
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Estate Counsel",
          url: "https://www.willdrafting.in/about-us",
        },
        creator: {
          "@type": "Organization",
          name: "WillDrafting.in",
        },
        publisher: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${CANONICAL_URL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What stamp paper value is needed for a Fauti Namantaran affidavit in Chhattisgarh?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Schedule I-A Article 4 of the Indian Stamp Act as applied in Chhattisgarh, the statutory floor for a plain affidavit is ₹5. In practice across Raipur, Bilaspur, Durg, and Korba Tehsils, Notaries and Lok Seva Kendras print the Warisan affidavit on ₹50 non-judicial e-stamp paper, or ₹100 when indemnity terms are included.",
            },
          },
          {
            "@type": "Question",
            name: "How do I apply for Fauti Namantaran online on the CG Bhuiyan portal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Visit bhuiyan.cg.nic.in and open the online mutation application section, or apply through a local Choice Centre (CSC) / Lok Seva Kendra. Choose Succession (Fauti), select your District, Tehsil, Village, and Khasra number, upload the death certificate, Vanshavali, B-1/P-II copy, and notarized Hindi affidavit as PDFs, and verify via OTP.",
            },
          },
          {
            "@type": "Question",
            name: "What is the 15-day objection notice (Istehar) under Section 110 CGLRC?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "After receiving the Patwari report under Sections 109 and 110 of the Chhattisgarh Land Revenue Code, 1959, the Tehsildar issues a public Istehar (objection notice) in the village and on the Tehsil board. Any legal heir or co-sharer gets 15 days to file written objections before the joint Bhumiswami entry order is passed.",
            },
          },
          {
            "@type": "Question",
            name: "Must married daughters be included in a Chhattisgarh Fauti Namantaran affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 164 of the Chhattisgarh Land Revenue Code, 1959 read with Section 6 of the Hindu Succession Act and Vineeta Sharma v. Rakesh Sharma (2020), married daughters hold equal inheritance rights in Bhumiswami land. Omitting a daughter without her registered Haq Tyag (Release Deed) makes the mutation voidable.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between B-1 Khatauni and P-II Khasra on Bhuiyan CG?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "B-1 (Kistabandi Khatauni) lists all land plots held by a Bhumiswami in a village under one Khata account, while P-II (Panchsala Khasra) details each specific Khasra plot number, area (Rakba), soil irrigation status, crop details, and loan or court remarks. Both must match your Fauti affidavit before Tehsil approval.",
            },
          },
          {
            "@type": "Question",
            name: "Is there any time limit to report Fauti Namantaran to the Patwari in Chhattisgarh?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 109 of the Chhattisgarh Land Revenue Code, 1959, legal heirs must report acquisition of Bhumiswami rights by inheritance to the village Patwari or Tehsildar within six months of the owner's death. Late reporting is still accepted after inquiry, though a minor statutory fine may apply.",
            },
          },
          {
            "@type": "Question",
            name: "Can agricultural land belonging to a Scheduled Tribe be transferred by Will to a non-tribal in CG?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 165(6) of the Chhattisgarh Land Revenue Code, 1959, Aboriginal Tribe Bhumiswami land cannot be transferred to a non-tribal in notified Scheduled Areas, and requires prior written Collector permission in non-scheduled areas. On death, legal tribal heirs inherit under Section 164.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after the Tehsildar passes the Fauti Namantaran order?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once the Tehsildar approves the order under Section 110(4), the Patwari updates the Bhuiyan portal B-1 and P-II records with all heirs as joint Sah-Khatedar Bhumiswamis. Next, collect your updated Rin Pustika (Kisan Kitab) from the Tehsil or Patwari, and optionally file for Aapsi Batwara under Section 178.",
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
        <ChhattisgarhFautiClient />
        <Footer />
      </div>
    </>
  );
}
