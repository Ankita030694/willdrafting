import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssamJamabandiClient from "./AssamJamabandiClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Assam Jamabandi Mutation Affidavit | WillDrafting.in", // 52 chars
  },
  description:
    "Download Assam Jamabandi field mutation affidavit format for Dharitree portal under Assam Land and Revenue Regulation 1886. Free legal draft.", // 142 chars
  keywords: [
    "assam jamabandi mutation affidavit format",
    "dharitree portal succession affidavit assam",
    "circle office field mutation draft assam",
    "periodic khiraj patta transfer affidavit",
    "annual patta vs periodic patta assam inheritance",
    "eksona patta conversion myadi patta assam",
    "assam land and revenue regulation 1886 section 50 53",
    "guwahati circle office legal heir affidavit",
    "sewa setu assam next of kin mutation affidavit",
    "lat mandal chitha jamabandi mutation assam",
    "mission basundhara annual patta to periodic patta",
    "assam stamp duty article 4 affidavit 100 rupees",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/assam-jamabandi-succession-affidavit-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/assam-jamabandi-succession-affidavit-format",
      "x-default":
        "https://www.willdrafting.in/templates/assam-jamabandi-succession-affidavit-format",
    },
  },
  openGraph: {
    title: "Assam Jamabandi Mutation Affidavit | WillDrafting.in",
    description:
      "Download Assam Jamabandi field mutation affidavit format for Dharitree portal under Assam Land and Revenue Regulation 1886. Free legal draft.",
    url: "https://www.willdrafting.in/templates/assam-jamabandi-succession-affidavit-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/assam-jamabandi-succession-affidavit-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Assam Jamabandi Succession Affidavit Format for Dharitree Field Mutation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Assam Jamabandi Mutation Affidavit | WillDrafting.in",
    description:
      "Download Assam Jamabandi field mutation affidavit format for Dharitree portal under Assam Land and Revenue Regulation 1886. Free legal draft.",
    images: [
      "https://www.willdrafting.in/images/assam-jamabandi-succession-affidavit-format-og.jpg",
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

export default function AssamJamabandiAffidavitPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/assam-jamabandi-succession-affidavit-format";
  const imageUrl =
    "https://www.willdrafting.in/images/assam-jamabandi-succession-affidavit-format-og.jpg";

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
        name: "Assam Jamabandi Mutation Affidavit | WillDrafting.in",
        description:
          "Download Assam Jamabandi field mutation affidavit format for Dharitree portal under Assam Land and Revenue Regulation 1886. Free legal draft.",
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
            name: "Assam Jamabandi Succession Affidavit Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        headline: "Assam Jamabandi Succession Affidavit Format & Patta Guide",
        name: "Assam Jamabandi Field Mutation Affidavit Format (Dharitree Portal)",
        url: canonicalUrl,
        description:
          "Legal heir and succession affidavit format for Assam Dharitree Jamabandi field mutation under Assam Land and Revenue Regulation, 1886 ss. 50-53, with Periodic vs Annual Patta table and Circle Officer notice template.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        inLanguage: "en-IN",
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
            name: "What stamp paper value is needed for an Assam Jamabandi mutation affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 4 of Schedule I to the Indian Stamp Act as amended in Assam, an affidavit should be printed on Rs. 100 non-judicial stamp paper or e-stamp. Sign it before a Notary Public or First Class Executive Magistrate.",
            },
          },
          {
            "@type": "Question",
            name: "Can Annual Patta or Eksona Patta land in Assam be transferred by Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 11 of the Assam Land and Revenue Regulation, 1886, an Annual Patta holder is only a temporary settlement holder with a one-year renewable right. Annual Patta land cannot be sold, gifted, or bequeathed by Will until it is converted into Periodic Myadi Patta.",
            },
          },
          {
            "@type": "Question",
            name: "How do legal heirs inherit Annual Patta land after the pattadar dies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When an Annual Patta holder dies, legal heirs can ask for limited succession entry for the current settlement year, or apply on Mission Basundhara to convert the Annual Patta into a Periodic Khiraj Myadi Patta. Once converted, full heritable and transferable title vests in the heirs.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Field Mutation and Office Mutation on Dharitree?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Field Mutation applies to uncontested rural inheritance or straightforward transfers where the Lat Mandal checks possession on the plot and updates the Chitha and Jamabandi under Section 53A. Office Mutation goes formally through the Circle Officer under Sections 50 to 53 when there is a Will, urban Guwahati plot, or dispute.",
            },
          },
          {
            "@type": "Question",
            name: "Must married daughters be named in the Assam succession affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under the Hindu Succession Act, 1956 and Indian personal laws, married daughters hold equal inheritance rights in Periodic Myadi Patta land. Leaving out any married daughter or predeceased child branch makes the affidavit invalid and triggers Circle Officer rejection.",
            },
          },
          {
            "@type": "Question",
            name: "How long does the Circle Officer notice period under Section 52 take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "After filing on Sewa Setu or Dharitree, the Circle Officer issues a general notice under Section 52 of the Assam Land and Revenue Regulation, 1886 and Rule 215 of the Assam Land Records Manual. Interested co-pattadars usually get 15 to 30 days to file objections before the mutation order passes.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate compulsory in Assam to mutate Periodic Patta land under a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in Mumbai, Kolkata, and Chennai presidency towns. In Assam, Hindu, Sikh, Jain, and Buddhist Wills can be produced directly before the Circle Officer for office mutation.",
            },
          },
          {
            "@type": "Question",
            name: "Where do I file the Assam Jamabandi succession mutation online?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Applicants submit the Next of Kin certificate, death certificate, and sworn heir affidavit online via the Assam Sewa Setu portal or Mission Basundhara portal, which routes the file to the local Circle Officer and Lat Mandal in Dharitree.",
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
        <AssamJamabandiClient />
        <Footer />
      </div>
    </>
  );
}
