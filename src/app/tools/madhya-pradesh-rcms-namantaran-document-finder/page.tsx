import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MpRcmsNamantaranClient from "./MpRcmsNamantaranClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "MP RCMS Namantaran Document Checker | WillDrafting", // exactly 50 characters
  },
  description:
    "Find exact documents required for MP RCMS Khasra Namantaran after death under Section 109 MP Land Revenue Code. Generate instant Tehsil checklist.", // exactly 146 characters
  keywords: [
    "mp rcms property mutation documents checker",
    "khasra namantaran documents mp",
    "rcms mp varisan panchnama checklist",
    "bhumiswami mutation fee calculator",
    "fauti namantaran documents madhya pradesh",
    "section 109 mp land revenue code mutation",
    "section 110 mplrc tehsildar inquiry timeline",
    "patwari mauka panchnama namantaran mp",
    "bhumiswami rin pustika name change mp",
    "wasiyat namantaran rcms mp guidelines",
    "tehsildar mutation objection window mp",
    "ama legal solutions mp revenue lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/madhya-pradesh-rcms-namantaran-document-finder",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/madhya-pradesh-rcms-namantaran-document-finder",
      "x-default": "https://www.willdrafting.in/tools/madhya-pradesh-rcms-namantaran-document-finder",
    },
  },
  openGraph: {
    title: "MP RCMS Namantaran Document Checker | WillDrafting",
    description:
      "Find exact documents required for MP RCMS Khasra Namantaran after death under Section 109 MP Land Revenue Code. Generate instant Tehsil checklist.",
    url: "https://www.willdrafting.in/tools/madhya-pradesh-rcms-namantaran-document-finder",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/madhya-pradesh-rcms-namantaran-document-finder-og.jpg",
        width: 1200,
        height: 675,
        alt: "MP RCMS Namantaran Document Finder and Khasra Mutation Tehsil Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "MP RCMS Namantaran Document Checker | WillDrafting",
    description:
      "Find exact documents required for MP RCMS Khasra Namantaran after death under Section 109 MP Land Revenue Code. Generate instant Tehsil checklist.",
    images: ["https://www.willdrafting.in/images/madhya-pradesh-rcms-namantaran-document-finder-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function MpRcmsNamantaranPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/madhya-pradesh-rcms-namantaran-document-finder";
  const imageUrl = "https://www.willdrafting.in/images/madhya-pradesh-rcms-namantaran-document-finder-og.jpg";

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
        name: "MP RCMS Namantaran Document Checker | WillDrafting",
        description:
          "Find exact documents required for MP RCMS Khasra Namantaran after death under Section 109 MP Land Revenue Code. Generate instant Tehsil checklist.",
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
            name: "MP RCMS Namantaran Document Finder",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Madhya Pradesh RCMS Namantaran Document Finder & Checker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free diagnostic tool to find mandatory documents, Patwari panchnama rules, and objection timelines for MP land mutation under Section 109 and 110 MPLRC.",
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
            name: "What documents are mandatory for Fauti Namantaran on RCMS MP portal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mandatory documents include: (1) Official Death Certificate of the deceased Bhumiswami issued by Registrar of Births and Deaths, (2) Current computerized Khasra (Form P-II) and Khatauni (B-1) from MP Bhulekh portal, (3) Bhoo-Adhikar Avam Rin Pustika (or original passbook), (4) Registered or notarized Affidavit (शपथ-पत्र) under Section 109 MPLRC detailing all surviving legal heirs, (5) Samagra Family ID and Aadhaar cards of all legal heirs, and (6) Patwari Varisan Panchnama with village Kotwar and 5 Panch signatures.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Tehsildar mutate land based on a disputed Will in Madhya Pradesh?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under established Madhya Pradesh High Court jurisprudence (including Murari Lal v. State of MP and Kusum Bai v. State of MP), Revenue Courts (Tehsildar / Naib Tehsildar) have summary jurisdiction for fiscal mutation and cannot adjudicate complex questions of title or the validity and attestation of a contested Will under Section 68 of the Indian Evidence Act. If legal heirs object to a Will, the Tehsildar directs the claimant to obtain a declaratory decree from a competent Civil Court.",
            },
          },
          {
            "@type": "Question",
            name: "What is the statutory deadline to report land acquisition under Section 109 MPLRC?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 109(1) of the Madhya Pradesh Land Revenue Code 1959, any person acquiring Bhumiswami rights by succession, survivorship, inheritance, partition, purchase, gift, or Will must report the acquisition to the Patwari or Tehsildar within 6 months. Failure to report within 6 months may attract a penalty up to Rs 500 under Section 109(2), though applications are still accepted with condonation.",
            },
          },
          {
            "@type": "Question",
            name: "What is the duration of the public objection window for MP RCMS Namantaran?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upon registration of the mutation case on the RCMS portal (rcms.mp.gov.in), the Tehsildar issues a public proclamation notice (Ishtehar) inviting objections from co-sharers and the general public within a mandatory window of 15 to 30 days. Under the MP Public Services Guarantee Act (लोक सेवा गारंटी अधिनियम), uncontested mutation orders must be completed within 30 working days.",
            },
          },
          {
            "@type": "Question",
            name: "What role does the Patwari Varisan Panchnama play in MP land mutation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Patwari Varisan Panchnama is the on-ground field inquiry report prepared by the Halka Patwari. The Patwari visits the village, confirms the actual physical possession (मौका कब्जा), lists all Class-I surviving heirs (spouse, sons, unmarried and married daughters, mother), and verifies that no heir has been suppressed. The report must be attested by the village Kotwar and at least five respectable local village residents (Panchs).",
            },
          },
          {
            "@type": "Question",
            name: "Do married daughters have equal rights in ancestral agricultural land in MP?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Following the 2005 central amendment to Section 6 of the Hindu Succession Act and the landmark Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), married daughters possess equal coparcenary and inheritance rights by birth in both agricultural and non-agricultural property. Section 109 of the MP Land Revenue Code mandates recording married daughters as joint Bhumiswamis unless they execute a registered Relinquishment Deed (हकत्याग विलेख).",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between mutation in revenue records and title ownership?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "As held repeatedly by the Supreme Court in landmark rulings including Bhimabai Mahadeo Kambekar v. Arthur Import & Export Co. (2019) and Jitendra Singh v. State of MP (2021), mutation entries in revenue records (Khasra and Khatauni) are maintained solely for fiscal collection of land revenue. Mutation does not create, extinguish, or determine proprietary title. Proprietary title is determined exclusively by registered conveyance deeds or Civil Court decrees.",
            },
          },
          {
            "@type": "Question",
            name: "What can an aggrieved party do if the Tehsildar passes an incorrect mutation order?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 44 of the Madhya Pradesh Land Revenue Code 1959, an aggrieved party can file a first appeal before the Sub-Divisional Officer (SDO Revenue) within 45 days of the order. If the SDO dismisses the appeal, a second appeal lies before the Additional Commissioner within 60 days. Concurrently, if a substantive title dispute exists, the aggrieved heir can file a civil suit for declaration of title and injunction before the Civil Judge.",
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
        <MpRcmsNamantaranClient />
        <Footer />
      </div>
    </>
  );
}
