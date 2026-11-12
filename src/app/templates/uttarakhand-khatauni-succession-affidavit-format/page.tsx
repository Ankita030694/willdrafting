import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UttarakhandKhatauniClient from "./UttarakhandKhatauniClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars (54 chars), Meta Description strictly 140-155 chars (150 chars), 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Uttarakhand Khatauni Mutation Affidavit | WillDrafting", // exactly 54 characters
  },
  description:
    "Download official Uttarakhand Khatauni mutation affidavit format for Vaad portal. Includes Bhu-Kanoon land ceiling declarations and Tehsil checklists.", // exactly 150 characters
  keywords: [
    "uttarakhand khatauni mutation affidavit format",
    "uttarakhand vaad portal virasat affidavit format",
    "dehradun tehsil warisan panchnama draft",
    "bhu kanoon compliant succession affidavit",
    "apuni sarkar virasat mutation affidavit uttarakhand",
    "uttarakhand 250 sq meter hill land inheritance",
    "section 154 upzalr uttarakhand legal heir",
    "section 171 uttarakhand khatauni succession order",
    "nainital agricultural land virasat online",
    "section 130a wife co sharer uttarakhand khatauni",
    "bhulekh uttarakhand khatauni name transfer",
    "ama legal solutions uttarakhand revenue lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/uttarakhand-khatauni-succession-affidavit-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/uttarakhand-khatauni-succession-affidavit-format",
      "x-default": "https://www.willdrafting.in/templates/uttarakhand-khatauni-succession-affidavit-format",
    },
  },
  openGraph: {
    title: "Uttarakhand Khatauni Mutation Affidavit | WillDrafting",
    description:
      "Download official Uttarakhand Khatauni mutation affidavit format for Vaad portal. Includes Bhu-Kanoon land ceiling declarations and Tehsil checklists.",
    url: "https://www.willdrafting.in/templates/uttarakhand-khatauni-succession-affidavit-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/uttarakhand-khatauni-succession-affidavit-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Uttarakhand Khatauni Succession Affidavit Format and Bhu-Kanoon Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Uttarakhand Khatauni Mutation Affidavit | WillDrafting",
    description:
      "Download official Uttarakhand Khatauni mutation affidavit format for Vaad portal. Includes Bhu-Kanoon land ceiling declarations and Tehsil checklists.",
    images: [
      "https://www.willdrafting.in/images/uttarakhand-khatauni-succession-affidavit-format-og.jpg",
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

export default function UttarakhandKhatauniAffidavitPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/uttarakhand-khatauni-succession-affidavit-format";
  const imageUrl =
    "https://www.willdrafting.in/images/uttarakhand-khatauni-succession-affidavit-format-og.jpg";

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
        name: "Uttarakhand Khatauni Mutation Affidavit | WillDrafting",
        description:
          "Download official Uttarakhand Khatauni mutation affidavit format for Vaad portal. Includes Bhu-Kanoon land ceiling declarations and Tehsil checklists.",
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
            name: "Uttarakhand Khatauni Succession Affidavit Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        headline: "Uttarakhand Khatauni Mutation Affidavit Format & Bhu-Kanoon Guide",
        name: "Uttarakhand Khatauni Succession Affidavit Format (English & Hindi)",
        url: canonicalUrl,
        description:
          "Official Uttarakhand Khatauni succession affidavit format for Apuni Sarkar and Vaad portal Virasat mutation, including the 250 sq. meter Bhu-Kanoon declaration and Tehsil verification checklist.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        inLanguage: ["en-IN", "hi-IN"],
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        image: imageUrl,
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
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What stamp paper value is needed for an Uttarakhand Khatauni Virasat affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most Uttarakhand Tehsils and Revenue Courts accept a Virasat succession affidavit printed on Rs. 10 non-judicial stamp paper or e-Stamp. Some Dehradun and Nainital notary counters use Rs. 20 or Rs. 50 stamp paper when you add an indemnity line.",
            },
          },
          {
            "@type": "Question",
            name: "Does the 250 sq. meter Bhu-Kanoon limit block legal heirs from inheriting hill land?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Section 154(4) of the adapted UPZA&LR Act and the 2025 Bhu-Kanoon rules cap fresh land purchases by non-residents at 250 sq. meters for homes. Lawful inheritance (Virasat) by legal heirs is not a purchase, though your affidavit must clearly declare this distinction.",
            },
          },
          {
            "@type": "Question",
            name: "Where do I upload the Uttarakhand Khatauni succession affidavit online?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You file your Virasat request online through the Apuni Sarkar portal (eservices.uk.gov.in) under Revenue Department services, or via your Tehsil Revenue Court (Vaad / RCMS) if there is a Will or heir dispute.",
            },
          },
          {
            "@type": "Question",
            name: "Is the Hindu Succession Act or UPZA&LR Section 171 used for Uttarakhand Khatauni mutation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Agricultural land recorded as Bhumidhari follows Section 171 of the UPZA&LR Act as adapted by Uttarakhand. Urban plots, houses, and Section 143 converted non-farm land follow the Hindu Succession Act, 1956 or the owner's personal law.",
            },
          },
          {
            "@type": "Question",
            name: "How does Uttarakhand Section 130-A affect a wife's name in the Khatauni?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Uttarakhand Act 14 of 2021 (Section 130-A), a wife must be entered as a joint co-sharer in her husband's ancestral agricultural land during his lifetime. After his death, her existing co-sharer status and widow share are checked by the Lekhpal.",
            },
          },
          {
            "@type": "Question",
            name: "What documents must I upload with the affidavit on the Vaad or Apuni Sarkar portal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upload the notarized Rs. 10 Khatauni affidavit, death certificate, certified Khatauni copy, Parivar Register Nakal (or family tree), Aadhaar cards of all heirs, and any registered Will if one exists.",
            },
          },
          {
            "@type": "Question",
            name: "How long does Tehsildar Khatauni mutation take in Dehradun or Nainital?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Simple uncontested Virasat (PA-11) entries clear in 15 to 30 days after the Lekhpal report. Contested or Will-based Vaad cases before the Tehsildar require a 35 to 45 day public notice (Ishtehar) and usually finish in 45 to 90 days.",
            },
          },
          {
            "@type": "Question",
            name: "Can an heir living outside Uttarakhand or an NRI file Khatauni Virasat remotely?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An heir living in Delhi, Mumbai, or abroad can sign the affidavit before a Notary or Indian Consulate, or execute a Special Power of Attorney so a relative can upload the forms and attend the Tehsildar hearing.",
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
        <UttarakhandKhatauniClient />
        <Footer />
      </div>
    </>
  );
}
