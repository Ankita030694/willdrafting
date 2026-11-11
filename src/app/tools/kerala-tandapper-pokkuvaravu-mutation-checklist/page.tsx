import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KeralaPokkuvaravuClient from "./KeralaPokkuvaravuClient";

// Screaming Frog Rules: Title strictly 30-60 chars, Meta Description strictly 70-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Kerala Pokkuvaravu Mutation Checklist | WillDrafting", // 48 characters
  },
  description:
    "Generate an instant document checklist for Kerala Pokkuvaravu and Tandapper mutation after death on Revenue e-Services. Verify Tahsildar rules.", // 143 characters
  keywords: [
    "kerala pokkuvaravu mutation checklist after death",
    "tandapper transfer documents kerala",
    "revenue e-services kerala land mutation checker",
    "village office pokkuvaravu fee",
    "kerala land tax act 1961 transfer of registry rules 1966",
    "thandaper account number transfer kerala",
    "online pokkuvaravu application documents revenue kerala gov in",
    "kerala high court kuruvila v state of kerala section 213",
    "legal heirship certificate pokkuvaravu kerala akshaya",
    "btr resurvey mismatch kerala land mutation",
    "kerala pokkuvaravu rejection appeal rdo sub collector",
    "ama legal solutions kerala property mutation lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/kerala-tandapper-pokkuvaravu-mutation-checklist",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/kerala-tandapper-pokkuvaravu-mutation-checklist",
      "x-default": "https://www.willdrafting.in/tools/kerala-tandapper-pokkuvaravu-mutation-checklist",
    },
  },
  openGraph: {
    title: "Kerala Pokkuvaravu Mutation Checklist | WillDrafting",
    description:
      "Generate an instant document checklist for Kerala Pokkuvaravu and Tandapper mutation after death on Revenue e-Services. Verify Tahsildar rules.",
    url: "https://www.willdrafting.in/tools/kerala-tandapper-pokkuvaravu-mutation-checklist",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/kerala-tandapper-pokkuvaravu-mutation-checklist-og.jpg",
        width: 1200,
        height: 675,
        alt: "Kerala Tandapper and Pokkuvaravu Mutation Document Checklist and Revenue Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kerala Pokkuvaravu Mutation Checklist | WillDrafting",
    description:
      "Generate an instant document checklist for Kerala Pokkuvaravu and Tandapper mutation after death on Revenue e-Services. Verify Tahsildar rules.",
    images: ["https://www.willdrafting.in/images/kerala-tandapper-pokkuvaravu-mutation-checklist-og.jpg"],
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

export default function KeralaPokkuvaravuMutationChecklistPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/kerala-tandapper-pokkuvaravu-mutation-checklist";
  const imageUrl =
    "https://www.willdrafting.in/images/kerala-tandapper-pokkuvaravu-mutation-checklist-og.jpg";

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
        name: "Kerala Pokkuvaravu Mutation Checklist | WillDrafting",
        description:
          "Generate an instant document checklist for Kerala Pokkuvaravu and Tandapper mutation after death on Revenue e-Services. Verify Tahsildar rules.",
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
            name: "Kerala Pokkuvaravu Mutation Checklist",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Kerala Pokkuvaravu & Tandapper Mutation Checklist Tool",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Diagnostic document filter for Kerala Pokkuvaravu land mutation and Thandaper account transfer after owner demise under Kerala Land Tax Act 1961.",
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
            name: "What documents are required for Pokkuvaravu after death in Kerala?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To apply for Pokkuvaravu after death on the Kerala Revenue e-Services portal, you need: (1) Death Certificate of the registered landholder, (2) Legal Heirship Certificate issued by Tahsildar or registered Will Deed, (3) Prior Title Deed (Aadharam/Pattayam), (4) Latest Land Tax Receipt (Karam Raseethu) showing zero arrears, (5) Encumbrance Certificate from SRO, and (6) Aadhaar and identity proofs of all legal heirs.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate compulsory for property mutation under a Will in Kerala?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The High Court of Kerala in Kuruvila v. State of Kerala (2007) and Babu P.C. v. State of Kerala (2020) ruled that Section 213 of the Indian Succession Act does not mandate probate for wills executed outside original presidency jurisdictions. Revenue authorities cannot reject a Pokkuvaravu application simply because probate was not obtained, provided there is no dispute among legal heirs.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Thandaper and Pokkuvaravu in Kerala?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Thandaper (Tandapper) is the revenue ledger account number assigned to a landholder in a specific village, recording all their landholdings and tax liability in the Basic Tax Register (BTR). Pokkuvaravu is the statutory process of transfer of registry under the Transfer of Registry Rules, 1966, which mutates the title and updates or issues a new Thandaper.",
            },
          },
          {
            "@type": "Question",
            name: "How can I find my existing Thandaper account number online?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can find your Thandaper account number by visiting revenue.kerala.gov.in and clicking 'Know Your Thandaper / View BTR'. Select your District, Taluk, Village, Block, and Re-survey Number with Sub-division. The portal will display the registered Thandaper number, registered landholder name, and land extent.",
            },
          },
          {
            "@type": "Question",
            name: "What is the official government fee for Pokkuvaravu in Kerala?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The statutory government mutation fee in Kerala is nominal, ranging between ₹20 and ₹50 depending on the land extent and whether it is rural or urban. Akshaya Centres charge an approved citizen service fee of approximately ₹40 to ₹60 for online form submission, scanning, and upload.",
            },
          },
          {
            "@type": "Question",
            name: "What should I do if the Village Officer rejects my Pokkuvaravu application?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If your application is rejected or delayed, you have a statutory right of appeal under Rule 18 and Rule 21 of the Transfer of Registry Rules, 1966. You can submit an appeal before the Revenue Divisional Officer (RDO) or Sub-Collector within 30 days of the rejection order.",
            },
          },
          {
            "@type": "Question",
            name: "Can NRI legal heirs apply for Pokkuvaravu without coming to Kerala?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. NRI legal heirs can execute a Special Power of Attorney (PoA) authorizing a resident family member or advocate. The PoA must be notarized or attested by the Indian Consulate or Embassy abroad, then adjudicated and stamped by the District Collector or District Registrar in Kerala before submission.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if there is a Re-survey mismatch between Title Deed and BTR?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If the old survey number in your Title Deed does not match the Re-survey number in the Basic Tax Register, you must obtain a Survey Correlation Certificate from the Village Office or file a Form 8 application under the Kerala Survey and Boundaries Act before final Pokkuvaravu approval.",
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
        <KeralaPokkuvaravuClient />
        <Footer />
      </div>
    </>
  );
}
