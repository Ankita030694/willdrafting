import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BiharDakhilKharijClient from "./BiharDakhilKharijClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Bihar Dakhil Kharij Document Tracker | WillDrafting", // exactly 51 characters
  },
  description:
    "Track mandatory documents for Bihar Dakhil Kharij inheritance mutation on biharbhumi.info. Verify Vanshavali, Jamabandi Panji-2, and Circle rules.", // exactly 146 characters
  keywords: [
    "bihar dakhil kharij inheritance document tracker",
    "biharbhumi succession mutation checklist",
    "vanshavali requirement dakhil kharij",
    "jamabandi panji 2 name change tool",
    "bihar land mutation act 2011 section 6",
    "mukhiya vanshavali validity bihar",
    "dclr appeal under section 7 bihar",
    "circle officer rejection dakhil kharij",
    "biharbhumi portal online application status",
    "varisana dakhil kharij documents bihar",
    "khatiyan jamabandi inheritance mutation",
    "ama legal solutions bihar property lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/bihar-dakhil-kharij-jamabandi-inheritance-tracker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/bihar-dakhil-kharij-jamabandi-inheritance-tracker",
      "x-default": "https://www.willdrafting.in/tools/bihar-dakhil-kharij-jamabandi-inheritance-tracker",
    },
  },
  openGraph: {
    title: "Bihar Dakhil Kharij Document Tracker | WillDrafting",
    description:
      "Track mandatory documents for Bihar Dakhil Kharij inheritance mutation on biharbhumi.info. Verify Vanshavali, Jamabandi Panji-2, and Circle rules.",
    url: "https://www.willdrafting.in/tools/bihar-dakhil-kharij-jamabandi-inheritance-tracker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/bihar-dakhil-kharij-jamabandi-inheritance-tracker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Bihar Dakhil Kharij and Jamabandi Inheritance Document Tracker Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar Dakhil Kharij Document Tracker | WillDrafting",
    description:
      "Track mandatory documents for Bihar Dakhil Kharij inheritance mutation on biharbhumi.info. Verify Vanshavali, Jamabandi Panji-2, and Circle rules.",
    images: ["https://www.willdrafting.in/images/bihar-dakhil-kharij-jamabandi-inheritance-tracker-og.jpg"],
    site: "@willdrafting",
    creator: "@willdrafting",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function BiharDakhilKharijTrackerPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/bihar-dakhil-kharij-jamabandi-inheritance-tracker";
  const imageUrl = "https://www.willdrafting.in/images/bihar-dakhil-kharij-jamabandi-inheritance-tracker-og.jpg";

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
        name: "Bihar Dakhil Kharij Document Tracker | WillDrafting",
        description:
          "Track mandatory documents for Bihar Dakhil Kharij inheritance mutation on biharbhumi.info. Verify Vanshavali, Jamabandi Panji-2, and Circle rules.",
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
            name: "Bihar Dakhil Kharij Document Tracker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Bihar Dakhil Kharij and Jamabandi Inheritance Tracker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free diagnostic tool to evaluate mandatory documents, Vanshavali format validity, Jamabandi Panji-2 rules, and 35-day Circle Office timelines under Bihar Land Mutation Act 2011.",
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
            name: "Is Mukhiya Vanshavali mandatory for Dakhil Kharij in Bihar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A Vanshavali issued solely by a Gram Panchayat Mukhiya has no statutory validity under the Bihar Land Mutation Act 2011. While Circle Officers often ask for it, revenue rules accept an affidavit sworn before an Executive Magistrate or Notary Public, certified by the Panchayat Secretary. In disputed cases, a Succession Certificate from a civil court legally supersedes any local Mukhiya document.",
            },
          },
          {
            "@type": "Question",
            name: "What documents are required for inheritance mutation on biharbhumi.bihar.gov.in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To file Varisana Dakhil Kharij online, you need: (1) Death Certificate of the registered Jamabandi raiyat, (2) Notarized or Magistrate Pedigree Affidavit (Vanshavali), (3) Jamabandi Panji-2 Khata and Khesra details, (4) Self-declaration affidavit in Bihar Bhumi format, (5) NOC or consent affidavit from all legal heirs including daughters, and (6) Latest land rent receipt (Malguzari Rasid).",
            },
          },
          {
            "@type": "Question",
            name: "What is the statutory time limit for Circle Officer to dispose of Dakhil Kharij?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 6 of the Bihar Land Mutation Act 2011, uncontested mutation cases must be completed within 35 working days from filing. If an objection is raised and the case becomes contested, the Circle Officer must conduct formal hearings and dispose of the matter within 75 working days.",
            },
          },
          {
            "@type": "Question",
            name: "What can I do if the Circle Officer rejects my Dakhil Kharij application?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a Circle Officer rejects your application, they must pass a reasoned speaking order in Form 4. Under Section 7 of the Bihar Land Mutation Act 2011, you have the statutory right to file a Mutation Appeal before the Deputy Collector Land Reforms (DCLR) within 30 days of the rejection order date.",
            },
          },
          {
            "@type": "Question",
            name: "How can I update a deceased ancestor's name in Jamabandi Panji-2?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To update deceased raiyat records in Panji-2, apply for inheritance mutation (Varisana Dakhil Kharij) on the Bihar Bhumi portal. If the Jamabandi is missing or damaged, apply first for Jamabandi Parimarjan (correction) with legacy Khatiyan records before filing the inheritance transfer.",
            },
          },
          {
            "@type": "Question",
            name: "Do daughters have equal mutation rights in Bihar ancestral land?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Following the Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma and Section 6 of the Hindu Succession Act, daughters are equal coparceners by birth. The Circle Officer cannot approve an inheritance mutation that excludes married or unmarried daughters without their registered relinquishment deed or signed NOC affidavit.",
            },
          },
          {
            "@type": "Question",
            name: "Is a registered Will sufficient for Dakhil Kharij in Bihar without probate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In Bihar (outside Kolkata, Mumbai, and Chennai), probate is not mandatory for Wills executed by Hindus under Section 213 of the Indian Succession Act. A registered Will accompanied by a death certificate and legal heir notice is legally admissible before the Circle Officer for mutation, provided no co-heir files a contentious civil title suit.",
            },
          },
          {
            "@type": "Question",
            name: "What is the government fee for online Dakhil Kharij in Bihar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There is zero government fee for filing an online Dakhil Kharij application on biharbhumi.bihar.gov.in. The service is provided completely free of cost by the Bihar Revenue & Land Reforms Department. Landholders must beware of middlemen claiming official portal filing charges.",
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
        <BiharDakhilKharijClient />
        <Footer />
      </div>
    </>
  );
}
