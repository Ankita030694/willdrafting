import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeniorCitizenRevocationClient from "./SeniorCitizenRevocationClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Senior Citizen Gift Deed Cancellation Tool | WillDrafting", // exactly 57 characters
  },
  description:
    "Evaluate Section 23 Senior Citizens Act gift deed cancellation eligibility. Check maintenance clause conditions, tribunal powers, and case strength.", // exactly 148 characters
  keywords: [
    "senior citizen gift deed cancellation eligibility tool",
    "section 23 senior citizens act checker",
    "can parents take back gifted house",
    "maintenance tribunal eligibility india",
    "sudesh chhikara v ramti devi gift deed",
    "can parents revoke gift deed in india",
    "section 23 maintenance tribunal procedure",
    "s vanitha v deputy commissioner supreme court",
    "eviction of son daughter senior citizen act",
    "maintenance and welfare of parents and senior citizens act 2007",
    "ama legal solutions senior citizen property dispute",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/senior-citizen-gift-deed-revocation-assessment-tool",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/senior-citizen-gift-deed-revocation-assessment-tool",
      "x-default":
        "https://www.willdrafting.in/tools/senior-citizen-gift-deed-revocation-assessment-tool",
    },
  },
  openGraph: {
    title: "Senior Citizen Gift Deed Cancellation Tool | WillDrafting",
    description:
      "Evaluate Section 23 Senior Citizens Act gift deed cancellation eligibility. Check maintenance clause conditions, tribunal powers, and case strength.",
    url: "https://www.willdrafting.in/tools/senior-citizen-gift-deed-revocation-assessment-tool",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/senior-citizen-gift-deed-revocation-assessment-tool-og.jpg",
        width: 1200,
        height: 675,
        alt: "Senior Citizen Gift Deed Cancellation Tool Section 23 Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior Citizen Gift Deed Cancellation Tool | WillDrafting",
    description:
      "Evaluate Section 23 Senior Citizens Act gift deed cancellation eligibility. Check maintenance clause conditions, tribunal powers, and case strength.",
    images: [
      "https://www.willdrafting.in/images/senior-citizen-gift-deed-revocation-assessment-tool-og.jpg",
    ],
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

export default function SeniorCitizenGiftRevocationPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/senior-citizen-gift-deed-revocation-assessment-tool";
  const imageUrl =
    "https://www.willdrafting.in/images/senior-citizen-gift-deed-revocation-assessment-tool-og.jpg";

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
        name: "Senior Citizen Gift Deed Cancellation Tool | WillDrafting",
        description:
          "Evaluate Section 23 Senior Citizens Act gift deed cancellation eligibility. Check maintenance clause conditions, tribunal powers, and case strength.",
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
            name: "Senior Citizen Gift Deed Cancellation Tool",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Senior Citizen Gift Deed Cancellation Eligibility Tool",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free diagnostic micro-tool to evaluate gift deed cancellation under Section 23 Senior Citizens Act, analyzing maintenance clauses, tribunal jurisdiction, and Sudesh Chhikara precedent.",
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
            name: "Can parents cancel a gift deed given to their child in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, a senior citizen who gifted property subject to the condition of basic care and amenities can seek cancellation if the child fails or refuses to provide care. The Maintenance Tribunal headed by the Sub-Divisional Magistrate (SDM) has the statutory power to declare such transfer void as deemed fraud or coercion.",
            },
          },
          {
            "@type": "Question",
            name: "What did the Supreme Court hold in Sudesh Chhikara v. Ramti Devi (2022)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Sudesh Chhikara (2022), the Supreme Court ruled that Section 23(1) requires two conditions: (1) the transfer must be subject to the condition that the transferee shall provide basic amenities and physical needs, and (2) the transferee failed or refused to do so. If the deed contains no express condition of maintenance and is an unconditional gift deed, the condition cannot be assumed automatically, creating a legal hurdle for direct cancellation.",
            },
          },
          {
            "@type": "Question",
            name: "What if my gift deed does not have an express maintenance condition?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Even if your gift deed lacks an express maintenance clause, you are not without legal remedy. Under the Supreme Court ruling in S. Vanitha (2021) and High Court rulings like Sunny Paul, the Maintenance Tribunal can still order the eviction of abusive children, restore exclusive physical possession to the senior citizen, and award monthly maintenance and medical allowances under Section 4 and Section 9.",
            },
          },
          {
            "@type": "Question",
            name: "What is the age requirement to invoke Section 23 of the Senior Citizens Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The transferor must have been at least 60 years of age on the date the gift deed or settlement deed was executed. If the transferor was below 60 years on the deed date, Section 23 summary jurisdiction before the SDM does not apply, and civil court remedies under Section 126 of the Transfer of Property Act must be pursued.",
            },
          },
          {
            "@type": "Question",
            name: "Can gift deeds executed before 2007 be cancelled under Section 23?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Section 23 specifically applies to property transfers made 'after the commencement of this Act' (which came into force in late 2007 or 2008 across various states). Transfers executed prior to the Act cannot be revoked under Section 23, but senior citizens can still seek monthly maintenance or file a civil declaration suit.",
            },
          },
          {
            "@type": "Question",
            name: "How long does the Maintenance Tribunal take to decide a cancellation petition?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 5(6) of the Act, the Maintenance Tribunal is mandated to resolve inquiries within 90 days from the date of service of notice. In practice, SDM summary proceedings take between 3 to 6 months, which is vastly faster than civil court title cancellation suits that typically drag on for 5 to 12 years.",
            },
          },
          {
            "@type": "Question",
            name: "Does a senior citizen need an advocate before the Maintenance Tribunal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 17 of the Act states that no party to a proceeding before a Tribunal shall be represented by a legal practitioner. However, High Courts have held that senior citizens may take legal assistance, engage legal counsel for drafting and advisory, or seek permission from the Tribunal where complex title issues arise.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to the property after the SDM declares the gift deed void?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once the Maintenance Tribunal issues an order declaring the transfer void under Section 23, the order is forwarded to the local Sub-Registrar and Revenue Tehsildar. The Sub-Registrar cancels the registration entry, the revenue mutation is reversed back to the senior citizen's name, and local police can assist in restoring vacant possession.",
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
        <SeniorCitizenRevocationClient />
        <Footer />
      </div>
    </>
  );
}
