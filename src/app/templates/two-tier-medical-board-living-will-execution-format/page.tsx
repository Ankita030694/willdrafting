import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TwoTierMedicalBoardClient from "./TwoTierMedicalBoardClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Medical Board Living Will Format India | WillDrafting", // exactly 53 characters
  },
  description:
    "Download Primary & Secondary Medical Board approval format for Advance Medical Directives in India compliant with Supreme Court 2023 modified orders.", // exactly 149 characters
  keywords: [
    "medical board approval living will withdrawal format",
    "primary medical board living will report format",
    "secondary medical board end of life decision draft",
    "passive euthanasia medical board form india",
    "common cause 2023 modified order medical board",
    "icmr dnar guidelines hospital board format india",
    "48 hour medical board timeline living will india",
    "jmfc intimation format life support withdrawal",
    "two tier medical board advance medical directive",
    "hospital ethics protocol passive euthanasia india",
    "surrogate consent end of life care india",
    "ama legal solutions advance medical directive",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/templates/two-tier-medical-board-living-will-execution-format",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/templates/two-tier-medical-board-living-will-execution-format",
      "x-default":
        "https://www.willdrafting.in/templates/two-tier-medical-board-living-will-execution-format",
    },
  },
  openGraph: {
    title: "Medical Board Living Will Format India | WillDrafting",
    description:
      "Download Primary & Secondary Medical Board approval format for Advance Medical Directives in India compliant with Supreme Court 2023 modified orders.",
    url: "https://www.willdrafting.in/templates/two-tier-medical-board-living-will-execution-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/two-tier-medical-board-living-will-execution-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Two-Tier Medical Board Living Will Format under Supreme Court 2023 Order",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Medical Board Living Will Format India | WillDrafting",
    description:
      "Download Primary & Secondary Medical Board approval format for Advance Medical Directives in India compliant with Supreme Court 2023 modified orders.",
    images: [
      "https://www.willdrafting.in/images/two-tier-medical-board-living-will-execution-format-og.jpg",
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

export default function TwoTierMedicalBoardFormatPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/two-tier-medical-board-living-will-execution-format";
  const imageUrl =
    "https://www.willdrafting.in/images/two-tier-medical-board-living-will-execution-format-og.jpg";

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
        name: "Medical Board Living Will Format India | WillDrafting",
        description:
          "Download Primary & Secondary Medical Board approval format for Advance Medical Directives in India compliant with Supreme Court 2023 modified orders.",
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
            name: "Two-Tier Medical Board Living Will Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#article`,
        headline: "Two-Tier Medical Board Living Will Execution Format in India",
        name: "Primary & Secondary Medical Board Living Will Approval Format",
        description:
          "Download Primary & Secondary Medical Board approval format, 48-hour clinical opinion template, and JMFC judicial intimation draft under the Supreme Court 2023 Common Cause order and ICMR DNAR guidelines.",
        url: canonicalUrl,
        fileFormat: "text/html",
        isAccessibleForFree: true,
        inLanguage: "en-IN",
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        image: imageUrl,
        mainEntityOfPage: {
          "@id": `${canonicalUrl}#webpage`,
        },
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Estate & Medical Directive Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
            url: "https://www.amalegalsolutions.com",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the Two-Tier Medical Board process for a Living Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the January 2023 Supreme Court order in Common Cause v. Union of India, two separate panels of doctors must review a terminal patient before stopping life support. First, the hospital forms a Primary Medical Board. Next, a Secondary Medical Board with a district Chief Medical Officer nominee confirms that recovery is impossible.",
            },
          },
          {
            "@type": "Question",
            name: "Who sits on the Primary Medical Board and Secondary Medical Board?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Primary Medical Board has the treating doctor and at least two subject experts with at least 5 years of experience. The Secondary Medical Board has one doctor picked by the district Chief Medical Officer (CMO) and at least two other independent experts with 5 or more years of experience.",
            },
          },
          {
            "@type": "Question",
            name: "How fast must the Primary and Secondary Medical Boards give their opinion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Supreme Court order of 24 January 2023 sets a clear 48-hour benchmark. The Primary Medical Board must record its preliminary clinical opinion preferably within 48 hours of referral. After that, the Secondary Medical Board must examine the patient and give its confirming view preferably within 48 hours.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Judicial Magistrate First Class still need to approve stopping life support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the 2023 modified Supreme Court rules, the Judicial Magistrate First Class (JMFC) does not visit the hospital or give prior permission. Once both medical boards agree and the surrogate signs consent, the hospital simply sends a formal written intimation to the JMFC before withdrawing life support.",
            },
          },
          {
            "@type": "Question",
            name: "What did the Supreme Court change in January 2023 compared to the 2018 order?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In 2018, doctors needed 20 years of experience, the District Collector formed the second board, and a Magistrate had to visit the ICU. In January 2023, the Court cut the doctor experience rule to 5 years, let the hospital form both boards, added a 48-hour deadline, and replaced Magistrate approval with simple intimation.",
            },
          },
          {
            "@type": "Question",
            name: "How do ICMR DNAR guidelines apply alongside a Living Will in an ICU?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The ICMR Consensus Guidelines on Do Not Attempt Resuscitation (DNAR) help doctors document when CPR or breathing machines will only prolong dying without curing the patient. Even when life-support machines stop under a Living Will or DNAR order, doctors must continue pain relief, comfort care, and basic nursing support.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the Primary or Secondary Medical Board refuses to withdraw support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If either board refuses permission or if the two boards disagree, the patient's surrogate, family members, or the hospital may file a writ petition before the High Court under Article 226 of the Constitution. The Chief Justice of the High Court will form a Division Bench to hear and decide the case quickly.",
            },
          },
          {
            "@type": "Question",
            name: "Can hospitals use the same two-tier board process when a patient left no Living Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The Common Cause guidelines also cover terminally ill or permanently unconscious patients who did not sign a Living Will in advance. In such cases, the treating team informs the Primary and Secondary Medical Boards, takes written informed consent from the next of kin, and sends notice to the JMFC.",
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
        <TwoTierMedicalBoardClient />
        <Footer />
      </div>
    </>
  );
}
