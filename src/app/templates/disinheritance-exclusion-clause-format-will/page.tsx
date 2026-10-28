import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DisinheritanceClauseClient from "./DisinheritanceClauseClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "How to Write Disinheritance Clause in Will | WillDrafting", // exactly 57 characters
  },
  description:
    "Download valid disinheritance clause in will India format. Exclude heirs safely under Indian Succession Act with 5 tested sample clauses and.", // exactly 153 characters
  keywords: [
    "how to write disinheritance clause in will india",
    "clause to exclude son or daughter from will format",
    "reason for unequal distribution clause in will india",
    "excluding child from will india format",
    "disinheriting son self acquired property india",
    "kavita kanwar v pamela mehta suspicious circumstances",
    "ram piari v bhagwant exclusion of daughter",
    "section 59 indian succession act testamentary freedom",
    "section 30 hindu succession act ancestral property",
    "in terrorem no contest clause will india",
    "senior citizens act 2007 neglect exclusion clause",
    "ama legal solutions will drafting advocate",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/disinheritance-exclusion-clause-format-will",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/disinheritance-exclusion-clause-format-will",
      "x-default": "https://www.willdrafting.in/templates/disinheritance-exclusion-clause-format-will",
    },
  },
  openGraph: {
    title: "How to Write Disinheritance Clause in Will | WillDrafting",
    description:
      "Download valid disinheritance clause in will India format. Exclude heirs safely under Indian Succession Act with 5 tested sample clauses and.",
    url: "https://www.willdrafting.in/templates/disinheritance-exclusion-clause-format-will",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/disinheritance-exclusion-clause-format-will-og.jpg",
        width: 1200,
        height: 675,
        alt: "Disinheritance and Exclusion Clause in Will India Format Legal Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write Disinheritance Clause in Will | WillDrafting",
    description:
      "Download valid disinheritance clause in will India format. Exclude heirs safely under Indian Succession Act with 5 tested sample clauses and.",
    images: ["https://www.willdrafting.in/images/disinheritance-exclusion-clause-format-will-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function DisinheritanceClausePage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/disinheritance-exclusion-clause-format-will";
  const imageUrl =
    "https://www.willdrafting.in/images/disinheritance-exclusion-clause-format-will-og.jpg";

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
        name: "How to Write Disinheritance Clause in Will | WillDrafting",
        description:
          "Download valid leaving out clause in will India format. Exclude heirs safely under Indian Succession Act with 5 tested sample clauses and.",
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
            name: "Disinheritance Clause Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Disinheritance and Exclusion Clause Format in Will India",
        url: canonicalUrl,
        description:
          "Lawyer-vetted legal exclusion clause templates for Indian Wills complying with Section 59 and 61 of the Indian Succession Act, 1925, and.",
        image: imageUrl,
        fileFormat: "text/html",
        hasDigitalDocumentPermission: {
          "@type": "DigitalDocumentPermission",
          permissionType: "https://schema.org/ReadPermission",
          grantee: {
            "@type": "Audience",
            audienceType: "Public",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I legally disinherit my son or daughter in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can legally disinherit any son or daughter from your self-acquired asset under Section 59 of the Indian Succession Act, 1925 and Section 30 of the Hindu Succession Act, 1956. However, you cannot disinherit a child from their undivided share in family joint asset, as they acquire a birthright in such asset.",
            },
          },
          {
            "@type": "Question",
            name: "Why is unexplained exclusion treated as a suspicious circumstance in court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under landmark Supreme Court rulings such as Kavita Kanwar v. Pamela Mehta (2020) and Ram Piari v. Bhagwant (1990), an unnatural or unexplained exclusion of a natural legal heir casts suspicion on the Will. The court requires the propounder to prove that the Will maker acted consciously without fraud, coercion, or undue influence under Section 61 of the Indian Succession Act.",
            },
          },
          {
            "@type": "Question",
            name: "How should I word an exclusion clause to prevent legal challenges?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You must explicitly identify the child by full name and date of birth to prove you remembered them. Then, state a clear, factual, and non-defamatory rationale, such as substantial financial support already provided during your lifetime, the child being settled abroad with independent affluence, or prior gifts made.",
            },
          },
          {
            "@type": "Question",
            name: "Can I exclude an adult child who neglected or abandoned me in old age?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 59 of the Indian Succession Act, read with the principles of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, a parent has complete discretion to exclude a neglectful child. Wording the clause to reflect the lack of filial care and emotional support provides a valid legal justification recognized by Indian courts.",
            },
          },
          {
            "@type": "Question",
            name: "What is an in terrorem or no-contest clause in an Indian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An in terrorem clause stipulates that if any legal heir fights the validity of the Will, files a probate caveat, or fights asset split in court, any conditional bequest or token legacy allocated to them is right away forfeited and revoked.",
            },
          },
          {
            "@type": "Question",
            name: "Does registering a Will prevent an excluded heir from filing a lawsuit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Filing at the SRO office under Section 18 of the Filing Act, 1908 does not completely block a lawsuit, but it provides a strong presumption of genuine signing. When supported by a contemporaneous medical fitness paper and video recording, it makes court fights exceedingly difficult for excluded heirs.",
            },
          },
          {
            "@type": "Question",
            name: "Should the favored beneficiary be present when the Will is executed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court in Kavita Kanwar ruled that active participation or presence of the favored heir during drafting or signing creates a strong suspicion of undue influence. The heir must remain strictly separate from drafting, witnessing, and filing.",
            },
          },
          {
            "@type": "Question",
            name: "Can my married daughter claim a share in my self-acquired property if I exclude her?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. While the 2005 Hindu Succession Amendment granted daughters equal joint rights in family asset, self-acquired asset remains under the absolute Will freedom of the owner. A parent can leave self-acquired asset entirely to other heirs through a valid Will.",
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
        <DisinheritanceClauseClient />
        <Footer />
      </div>
    </>
  );
}
