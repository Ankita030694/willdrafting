import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeniorCitizenGiftRevocationClient from "./SeniorCitizenGiftRevocationClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Cancel Gift Deed Eligibility Checker | WillDrafting", // exactly 51 characters
  },
  description:
    "Use our free checker to see if parents can cancel a gift deed under Section 23 Senior Citizens Act. Assess statutory conditions and Supreme.", // exactly 154 characters
  keywords: [
    "can parents cancel gift deed eligibility checker",
    "section 23 senior citizen act gift deed cancellation",
    "maintenance tribunal property recovery checker",
    "urmila dixit v sunil sharan dixit 2025",
    "sudesh chhikara v ramti devi gift deed",
    "can father cancel gift deed to son in india",
    "section 23 maintenance tribunal procedure",
    "gift deed cancellation for senior citizens",
    "eviction of son daughter senior citizen act",
    "maintenance and welfare of parents and senior citizens act 2007",
    "ama legal solutions senior citizen property dispute",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/senior-citizen-section-23-gift-revocation-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/senior-citizen-section-23-gift-revocation-checker",
      "x-default": "https://www.willdrafting.in/tools/senior-citizen-section-23-gift-revocation-checker",
    },
  },
  openGraph: {
    title: "Cancel Gift Deed Eligibility Checker | WillDrafting",
    description:
      "Use our free checker to see if parents can cancel a gift deed under Section 23 Senior Citizens Act. Assess statutory conditions and Supreme.",
    url: "https://www.willdrafting.in/tools/senior-citizen-section-23-gift-revocation-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/senior-citizen-section-23-gift-revocation-checker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Senior Citizen Section 23 Gift Deed Revocation Eligibility Checker India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancel Gift Deed Eligibility Checker | WillDrafting",
    description:
      "Use our free checker to see if parents can cancel a gift deed under Section 23 Senior Citizens Act. Assess statutory conditions and Supreme.",
    images: ["https://www.willdrafting.in/images/senior-citizen-section-23-gift-revocation-checker-og.jpg"],
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
  const canonicalUrl = "https://www.willdrafting.in/tools/senior-citizen-section-23-gift-revocation-checker";
  const imageUrl = "https://www.willdrafting.in/images/senior-citizen-section-23-gift-revocation-checker-og.jpg";

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
        name: "Cancel Gift Deed Eligibility Checker | WillDrafting",
        description:
          "Use our free checker to see if parents can cancel a gift deed under Section 23 Senior Citizens Act. Assess legal conditions and Supreme.",
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
            name: "Section 23 Gift Revocation Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Senior Citizen Section 23 Gift Deed Revocation Checker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free diagnostic tool evaluating the 4 legal conditions under Section 23 of the Maintenance and Welfare of Parents and Senior.",
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
            name: "Can parents cancel a registered gift deed given to their child in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, an elderly parent who transferred asset by gift deed can petition the Maintenance Tribunal to declare the transfer void if the child fails or refuses to provide basic amenities and physical needs.",
            },
          },
          {
            "@type": "Question",
            name: "What are the 4 mandatory conditions required under Section 23(1)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The 4 legal conditions are: (1) The transferor was a Senior Citizen (aged 60 or above) on the date of the transfer, (2) The transfer occurred after the commencement of the Act (post-December 2007), (3) The transfer was subject to the condition (express or contemporaneous) that the child provide basic amenities and physical needs, and (4) The child neglected, refused, or failed to provide such care.",
            },
          },
          {
            "@type": "Question",
            name: "What did the Supreme Court decide in Urmila Dixit v. Sunil Sharan Dixit (2025)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20), the Supreme Court ruled that the Senior Citizens Act is beneficial social legislation that must be interpreted purposively. The Court held that even if the filed gift deed itself lacks an express maintenance clause, contemporaneous papers such as a promissory note (vachan patra) or undertaking establish the conditional transfer under Section 23.",
            },
          },
          {
            "@type": "Question",
            name: "How does the Sudesh Chhikara ruling affect gift deed cancellation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Sudesh Chhikara v. Ramti Devi (2022), the Supreme Court emphasized that both elements of Section 23 must be present: an obligation to maintain the parent and a subsequent failure to do so. A completely unconditional gift deed signed out of pure affection without any written promise of care cannot be cancelled arbitrarily by the Tribunal without civil court proceedings.",
            },
          },
          {
            "@type": "Question",
            name: "Which authority handles Section 23 gift deed cancellation petitions?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Petitions are filed before the Maintenance Tribunal presided over by the Sub-Divisional Magistrate (SDM) or Revenue Divisional Officer (RDO) constituted under Section 7 of the Act. The proceedings are summary in nature, exempt from heavy civil court fees, and designed to be concluded within 90 days.",
            },
          },
          {
            "@type": "Question",
            name: "Can the Maintenance Tribunal evict an abusive child from the parents property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The Supreme Court in S. Vanitha v. Deputy Commissioner, Bengaluru Urban (2020) and various High Courts have held that the Tribunal has inherent power to order the eviction of children or relatives to protect the senior citizen's peaceful possession and right to live with dignity.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the child has already sold the gifted property to a third party?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 23(2) of the Act, if a senior citizen has a right to receive maintenance out of an estate, that right can be enforced against a third-party purchaser if the purchaser had notice of the right, or if the transfer was gratuitous without valuable consideration. However, against a bona fide purchaser for value without notice, recovery through the Tribunal is challenging.",
            },
          },
          {
            "@type": "Question",
            name: "Why is a Will legally safer for parents than executing a lifetime Gift Deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Will is 100% revocable during your entire lifetime. You retain absolute ownership, title, and rental income until your demise. You can alter or revoke your Will at any time without asking for your children's consent. Conversely, a gift deed right away strips you of legal ownership, leaving you vulnerable to abandonment.",
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
        <SeniorCitizenGiftRevocationClient />
        <Footer />
      </div>
    </>
  );
}
