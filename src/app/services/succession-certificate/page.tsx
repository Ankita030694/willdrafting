import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuccessionCertificateClient from "./SuccessionCertificateClient";

export const metadata: Metadata = {
  title: {
    absolute: "How to Get Succession Certificate in India: Legal Guide",
  },
  description:
    "Apply for a succession certificate in India with AMA Legal Solutions. We handle petition drafting, court notices, and asset transmission under.",
  keywords: [
    "how to get succession certificate",
    "succession certificate lawyer",
    "succession certificate application",
    "succession certificate procedure",
    "apply for succession certificate",
    "succession certificate india",
    "section 370 indian succession act",
    "section 372 succession petition",
    "succession certificate vs legal heir certificate",
    "succession certificate court fees",
    "debts and securities transmission",
    "bank account succession certificate",
    "shares transmission succession certificate",
    "ama legal solutions succession certificate",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/services/succession-certificate",
    languages: {
      "en-IN": "https://www.willdrafting.in/services/succession-certificate",
      "x-default": "https://www.willdrafting.in/services/succession-certificate",
    },
  },
  openGraph: {
    title: "How to Get Succession Certificate in India: Legal Guide",
    description:
      "Apply for a succession certificate in India with AMA Legal Solutions. We handle petition drafting, court notices, and asset transmission under.",
    url: "https://www.willdrafting.in/services/succession-certificate",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/succession-certificate-og.jpg",
        width: 1376,
        height: 768,
        alt: "Succession Certificate in India Civil Court Petition and Legal Representation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Get Succession Certificate in India: Legal Guide",
    description:
      "Apply for a succession certificate in India with AMA Legal Solutions. We handle petition drafting, court notices, and asset transmission under.",
    images: ["https://www.willdrafting.in/images/succession-certificate-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function SuccessionCertificatePage() {
  const canonicalUrl = "https://www.willdrafting.in/services/succession-certificate";
  const imageUrl = "https://www.willdrafting.in/images/succession-certificate-og.jpg";

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
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "AMA Legal Solutions Succession Certificate & Estate Practice",
        url: canonicalUrl,
        logo: "https://www.willdrafting.in/Logofinal.svg",
        image: imageUrl,
        description:
          "Pan-India civil court advocacy specializing in Succession Certificate petitions under Part X of the Indian Succession Act 1925, court.",
        priceRange: "₹₹₹",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
          addressLocality: "New Delhi",
          streetAddress: "Barakhamba Road, Connaught Place",
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Succession Certificate & Asset Transmission Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Uncontested Succession Certificate Petition",
                description:
                  "Comprehensive representation for drafting petitions, filing before the competent District Judge, newspaper publication, and securing.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Bank & Financial Asset Transmission",
                description:
                  "Legal liaison with commercial banks, mutual fund AMCs, depositories (NSDL/CDSL), and insurance companies to release deceased funds.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Contested Succession & Caveat Litigation",
                description:
                  "Legal defense in civil court against disputed claims by rival claimants, undisclosed heirs, or fraudulent nominee claims.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "NRI Estate Succession Representation",
                description:
                  "Special Power of Attorney based court representation for overseas Indian legal heirs without requiring physical travel to India.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "How to Get Succession Certificate in India: Legal Guide",
        description:
          "Apply for a succession certificate in India with AMA Legal Solutions. We handle petition drafting, court notices, and asset transmission under.",
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
            name: "Services",
            item: "https://www.willdrafting.in/service",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Succession Certificate",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Obtain a Succession Certificate in India",
        description:
          "Statutory procedure under Part X (Sections 370-390) of the Indian Succession Act 1925 to petition the competent District Civil Court and.",
        image: imageUrl,
        totalTime: "P120D",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Death Certificate of the Deceased",
          },
          {
            "@type": "HowToSupply",
            name: "Schedule of Debts, Securities, Bank Accounts & Demat Folios",
          },
          {
            "@type": "HowToSupply",
            name: "No Objection Certificates (NOC) or Affidavits from Non-Applicant Heirs",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "District Civil Court Having Territorial Jurisdiction",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Inventory Debts and Securities",
            text: "Compile an itemized schedule of all movable assets requiring transfer, including bank accounts, fixed deposits, demat shares, mutual fund folios, and government bonds with exact folio numbers and valuation.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Determine Territorial Jurisdiction",
            text: "Establish jurisdiction under Section 371 of the Indian Succession Act based on where the deceased had their ordinary place of residence at the time of death, or where their movable assets are situated.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Draft and Verify Court Petition",
            text: "Draft a formal petition under Section 372 containing details of deceased, date of death, family tree, surviving legal heirs, right of petitioner, and statutory declaration regarding absence of any conflicting Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Issue Citations and Newspaper Publication",
            text: "The District Judge issues notice to all respondents and orders publication of citations in two local newspapers (one English and one vernacular) granting a 30 to 45 day public notice period for objections.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Summary Judicial Inquiry and Hearing",
            text: "Upon expiry of notice period without objections, the court examines petitioners, verifies original death certificate and family tree, and concludes summary inquiry under Section 373.",
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Furnish Judicial Stamp Paper and Surety Bond",
            text: "Deposit requisite ad-valorem state court fees on non-judicial stamp paper, submit surety bond under Section 375 if mandated, and receive the sealed Succession Certificate under Section 377.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a Succession Certificate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Succession Certificate is a formal legal document granted by a competent District Civil Court under Part X (Sections 370-390) of the Indian Succession Act, 1925. It authorizes the legal heirs to collect debts, bank balances, fixed deposits, securities, and provident funds owed to a deceased person who died without leaving a valid Will.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Succession Certificate transfer immovable property like land or flats?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 370 of the Indian Succession Act, a Succession Certificate applies strictly to debts and securities (movable assets such as bank accounts, shares, mutual funds, and debentures). It does not convey title to immovable properties like land, agricultural parcels, or residential apartments. For immovable property, heirs must apply for revenue mutation or Letters of Administration.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a Succession Certificate and a Legal Heir Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Legal Heir Certificate (Varisu) is an administrative document issued by revenue officials (Tehsildar, Revenue Divisional Officer, or Municipal Corporation) primarily to establish family lineage for government dues, family pensions, and municipal mutation. A Succession Certificate is a judicial order issued exclusively by a Civil Court under Section 370 of ISA 1925. Financial institutions like banks, SEBI brokers, and insurance companies require a Succession Certificate when claims exceed statutory thresholds or lack valid nominations.",
            },
          },
          {
            "@type": "Question",
            name: "Which court has jurisdiction to grant a Succession Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 371 of the Indian Succession Act, the petition must be filed before the District Court within whose territorial jurisdiction the deceased ordinarily resided at the time of death. If the deceased had no fixed place of residence in India, the petition may be filed in the District Court where any part of the deceased's movable property is located.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take to obtain a Succession Certificate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An uncontested Succession Certificate petition typically takes between 3 to 6 months from initial filing to final issuance. This timeframe accounts for court notices, mandatory 30 to 45 day public notice publication in daily newspapers, court hearings, and verification of non-applicant heir affidavits. Contested cases where relatives raise caveats can take 12 to 24 months.",
            },
          },
          {
            "@type": "Question",
            name: "How much court fee is payable for a Succession Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Court fees for a Succession Certificate vary by state under respective State Court Fees Acts. Fees generally range between 2% to 7% of the total value of the debts and securities claimed. Certain states impose an upper ceiling (for example, Maharashtra caps the maximum court fee at ₹75,000), while other states like Delhi or Karnataka calculate percentage fees without a cap. Exact amounts can be checked on our Court Fee Calculator.",
            },
          },
          {
            "@type": "Question",
            name: "Can multiple legal heirs file a joint petition for a Succession Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. All legal heirs can jointly file a single petition before the District Court, naming themselves as co-petitioners. Alternatively, one legal heir can apply as the sole petitioner, provided all other surviving legal heirs submit written No Objection Certificates (NOCs) and supporting affidavits consenting to the grant.",
            },
          },
          {
            "@type": "Question",
            name: "Does a nominee override the holder of a Succession Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court of India has settled in multiple judgments (including Ram Chander Talwar v. Devinder Kumar Talwar and Shakti Yezdani v. Jayanand Salgaonkar) that a nominee is merely a temporary custodian or trustee of the funds. A nominee holds the assets for the benefit of the true legal heirs. The holder of a court-issued Succession Certificate has absolute legal authority to claim the funds from the nominee.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI legal heir apply without physically attending court in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Non-Resident Indians (NRIs) can execute a Special Power of Attorney (PoA) in their country of residence, attested by the Indian Embassy or apostilled under the Hague Convention. The designated attorney in India or AMA Legal Solutions advocates can then file the petition, attend hearings, and secure the certificate on their behalf.",
            },
          },
          {
            "@type": "Question",
            name: "Would drafting a Will avoid the need for a Succession Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A Succession Certificate is needed specifically when an individual dies intestate (without a valid Will). When a person leaves a clear Last Will and Testament, designated executors and beneficiaries can claim bank balances, mutual funds, and shares directly or through probate/letters of administration, avoiding the time, court fees, and publication requirements of Part X.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <SuccessionCertificateClient />
      <Footer />
    </>
  );
}
