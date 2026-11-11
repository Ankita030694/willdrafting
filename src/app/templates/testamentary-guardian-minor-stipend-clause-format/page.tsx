import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestamentaryGuardianStipendClient from "./TestamentaryGuardianStipendClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Testamentary Guardian Clause Format | WillDrafting", // exactly 50 characters
  },
  description:
    "Download testamentary guardian clause format with living stipend for Indian wills. Protect minor child custody under Guardians and Wards Act 1890.", // exactly 146 characters
  keywords: [
    "testamentary guardian clause with stipend format india",
    "appointing legal guardian in will format",
    "minor child living allowance guardian clause",
    "custody of child after parents death will format",
    "single mother will guardian sister format india",
    "guardians and wards act 1890 section 6 7 9",
    "hindu minority and guardianship act section 9 will",
    "inflation linked stipend guardian will clause",
    "override estranged father custody in will india",
    "githa hariharan supreme court mother guardian",
    "schooling fund direction minor child will",
    "ama legal solutions child custody will lawyer",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/templates/testamentary-guardian-minor-stipend-clause-format",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/templates/testamentary-guardian-minor-stipend-clause-format",
      "x-default":
        "https://www.willdrafting.in/templates/testamentary-guardian-minor-stipend-clause-format",
    },
  },
  openGraph: {
    title: "Testamentary Guardian Clause Format | WillDrafting",
    description:
      "Download testamentary guardian clause format with living stipend for Indian wills. Protect minor child custody under Guardians and Wards Act 1890.",
    url: "https://www.willdrafting.in/templates/testamentary-guardian-minor-stipend-clause-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/testamentary-guardian-minor-stipend-clause-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Testamentary Guardian and Minor Stipend Clause Format for Indian Wills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Testamentary Guardian Clause Format | WillDrafting",
    description:
      "Download testamentary guardian clause format with living stipend for Indian wills. Protect minor child custody under Guardians and Wards Act 1890.",
    images: [
      "https://www.willdrafting.in/images/testamentary-guardian-minor-stipend-clause-format-og.jpg",
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

export default function TestamentaryGuardianStipendPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/testamentary-guardian-minor-stipend-clause-format";
  const imageUrl =
    "https://www.willdrafting.in/images/testamentary-guardian-minor-stipend-clause-format-og.jpg";

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
        name: "Testamentary Guardian Clause Format | WillDrafting",
        description:
          "Download testamentary guardian clause format with living stipend for Indian wills. Protect minor child custody under Guardians and Wards Act 1890.",
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
            name: "Testamentary Guardian Clause Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        name: "Testamentary Guardian Clause with Inflation-Linked Stipend Format India",
        headline: "Testamentary Guardian & Minor Stipend Clause Format",
        url: canonicalUrl,
        fileFormat: "text/html",
        description:
          "Indian Will clause format appointing a minor child guardian with an inflation-indexed monthly living stipend, schooling fund direction, and estranged father override recital.",
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
            name: "Can a mother name her sister as testamentary guardian in an Indian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 9(3) and Section 9(4) of the Hindu Minority and Guardianship Act, 1956, a widowed mother can name a guardian by Will. A single or separated mother can also name her sister when the father stays away. In Githa Hariharan v. RBI, the Supreme Court held that a mother acts as natural guardian if the father is absent or uninvolved.",
            },
          },
          {
            "@type": "Question",
            name: "Why must a guardian clause include an inflation-linked monthly stipend?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Raising a child for 10 to 15 years brings rising food, rent, clothes, and bus bills. A fixed rupee sum loses half its worth over time due to inflation. Adding a yearly 7% or 8% CPI rise keeps your child safe. It also stops cash stress for your sister.",
            },
          },
          {
            "@type": "Question",
            name: "How can a single mother block an estranged biological father from custody or money?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Put two clear rules in your Will. First, add a short Welfare and Estrangement Note listing unpaid support, zero visits, and your child's bond with your sister. Courts weigh these facts under Sections 7 and 17 of the Guardians and Wards Act, 1890 and Nil Ratan Kundu v. Abhijit Kundu. Second, put all savings and flats in a private Will trust run by separate trustees so the father cannot touch the funds.",
            },
          },
          {
            "@type": "Question",
            name: "Should the child's guardian also manage the child's bank accounts and property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Keep daily child care separate from money control. Name your sister as Guardian of the Person for daily care. Name a separate Executor or Co-Trustee to hold savings and pay the monthly stipend. This avoids family doubts and bypasses slow District Court sale rules under Section 29 of the Guardians and Wards Act.",
            },
          },
          {
            "@type": "Question",
            name: "Why pay school fees and medical bills separately from the monthly living stipend?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Private school and coaching fees in India often rise 9% to 12% each year. If school fees come out of one fixed monthly stipend, fee hikes cut into food and home care. Ask your Executor to pay school bills and health plans straight to the school or insurer.",
            },
          },
          {
            "@type": "Question",
            name: "Which court hears custody disputes over a testamentary guardian in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 9 of the Guardians and Wards Act, 1890, a custody case goes to the District Court or Family Court where the child normally lives. Under Section 13 of the HMGA and Section 17 of the GWA, child welfare comes first. Courts give strong weight to a late mother's written wishes.",
            },
          },
          {
            "@type": "Question",
            name: "Can an unmarried or adoptive single mother appoint a guardian in her Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under the Supreme Court ruling in ABC v. State (NCT of Delhi) and CARA adoption rules, an unmarried or adoptive single mother is the sole natural guardian. She holds full power to name a primary and backup guardian in her Will without asking the birth father.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the chosen guardian passes away or cannot take custody?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Always name at least one backup or Alternate Guardian in your Will, like a brother or close aunt, on the same stipend terms. If you name only one person and they cannot serve, a court must pick a new guardian under Section 7 of the Guardians and Wards Act, 1890.",
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
        <TestamentaryGuardianStipendClient />
        <Footer />
      </div>
    </>
  );
}
