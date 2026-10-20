import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarriedDaughterRightsClient from "./MarriedDaughterRightsClient";

export const metadata: Metadata = {
  title: {
    absolute: "Daughter Right in Father Property: Rights | WillDrafting",
  },
  description:
    "Know daughter right in father property in India. Learn ancestral share, Hindu Succession Act rules, Vineeta Sharma verdict, and legal remedies with AMA.",
  keywords: [
    "daughter right in father property",
    "married daughter rights in father property",
    "daughter rights in ancestral property",
    "Vineeta Sharma case",
    "coparcenary daughter",
    "daughter share in property",
    "hindu succession act section 6",
    "hindu succession act section 8",
    "daughter property rights after marriage",
    "can father disinherit daughter india",
    "married daughter rights in mothers property",
    "partition suit by daughter limitation",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/blogs/married-daughter-rights-in-fathers-property",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/blogs/married-daughter-rights-in-fathers-property",
      "x-default":
        "https://www.willdrafting.in/blogs/married-daughter-rights-in-fathers-property",
    },
  },
  openGraph: {
    title: "Daughter Right in Father Property: Rights | WillDrafting",
    description:
      "Know daughter right in father property in India. Learn ancestral share, Hindu Succession Act rules, Vineeta Sharma verdict, and legal remedies with AMA.",
    url: "https://www.willdrafting.in/blogs/married-daughter-rights-in-fathers-property",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/married-daughter-rights-in-fathers-property-og.jpg",
        width: 1200,
        height: 630,
        alt: "Married Daughter Rights in Father Property in India Legal Guide and 2x2 Matrix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daughter Right in Father Property: Rights | WillDrafting",
    description:
      "Know daughter right in father property in India. Learn ancestral share, Hindu Succession Act rules, Vineeta Sharma verdict, and legal remedies with AMA.",
    images: [
      "https://www.willdrafting.in/images/married-daughter-rights-in-fathers-property-og.jpg",
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

export default function MarriedDaughterRightsPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/blogs/married-daughter-rights-in-fathers-property";
  const imageUrl =
    "https://www.willdrafting.in/images/married-daughter-rights-in-fathers-property-og.jpg";

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
        name: "Daughter Right in Father Property: Rights | WillDrafting",
        description:
          "Know daughter right in father property in India. Learn ancestral share, Hindu Succession Act rules, Vineeta Sharma verdict, and legal remedies with AMA.",
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
            name: "Blogs",
            item: "https://www.willdrafting.in/blogs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Married Daughter Rights in Father Property",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
        },
        headline: "Married Daughter Rights in Father Property in India",
        description:
          "A comprehensive statutory legal guide on the rights of married daughters in their father's property under the Hindu Succession Act, the 2005 Amendment, and the landmark Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma.",
        inLanguage: "en-IN",
        mainEntityOfPage: canonicalUrl,
        datePublished: "2026-10-20T09:00:00+05:30",
        dateModified: "2026-10-20T16:00:00+05:30",
        articleSection: "Family Succession & Property Rights",
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 630,
        },
        author: {
          "@type": "Person",
          name: "Advocate Rajeshwar Rao",
          jobTitle: "Senior Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
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
            name: "Does a married daughter have equal rights in her father's ancestral property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 6 of the Hindu Succession Act as amended in 2005, a daughter becomes a coparcener by birth with the exact same rights and liabilities as a son. Her marital status has zero legal impact on her coparcenary entitlement.",
            },
          },
          {
            "@type": "Question",
            name: "Can a father disinherit his married daughter from self-acquired property through a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 30 of the Hindu Succession Act, an individual enjoys absolute testamentary freedom over self-acquired property. A father can bequeath his self-acquired property to anyone he chooses, including excluding daughters, provided the Will is genuine, properly executed, and uncoerced.",
            },
          },
          {
            "@type": "Question",
            name: "Does it matter if the father passed away before the 2005 amendment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Supreme Court in Vineeta Sharma v. Rakesh Sharma (2020) ruled that coparcenary rights are acquired by birth. Therefore, the father does not need to have been alive on September 9, 2005, provided no registered partition or court decree was finalized before December 20, 2004.",
            },
          },
          {
            "@type": "Question",
            name: "Does receiving gold, cash, or gifts at marriage disqualify a daughter from property inheritance?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Gifts received by a woman during wedding celebrations constitute her Stridhan under Section 14 of the Hindu Succession Act. Stridhan belongs entirely to the woman and does not extinguish or reduce her independent statutory inheritance share in her father's ancestral or intestate estate.",
            },
          },
          {
            "@type": "Question",
            name: "Can brothers sell or partition ancestral property without the married sister's signature?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. As an equal coparcener, the daughter holds an undivided share in ancestral property. Any sale deed, transfer, mortgage, or partition executed without her written consent and registered signature is legally voidable and can be challenged in a civil court.",
            },
          },
          {
            "@type": "Question",
            name: "Can a married daughter become the Karta (manager) of a Hindu Undivided Family (HUF)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The Delhi High Court in Mrs. Sujata Sharma v. Shri Manu Gupta (2015) affirmed that since the 2005 amendment conferred equal coparcenary status on daughters, the eldest coparcener of an HUF, whether male or female, married or unmarried, is legally entitled to act as Karta.",
            },
          },
          {
            "@type": "Question",
            name: "What if brothers mutated the father's property exclusively in their names in revenue records?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Revenue mutation (dakhil kharij) is purely for property tax collection purposes and does not create or extinguish legal ownership title. The Supreme Court has repeatedly confirmed that an illegal or unilateral mutation does not strip a daughter of her lawful coparcenary or Class I inheritance rights.",
            },
          },
          {
            "@type": "Question",
            name: "What is a married daughter's right in her father's self-acquired property if he dies without a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If the father dies intestate (without a Will), his self-acquired property devolves equally upon all Class I legal heirs under Section 8 of the Hindu Succession Act. The married daughter inherits an equal per-capita share alongside her mother, brothers, and sisters.",
            },
          },
          {
            "@type": "Question",
            name: "Can a daughter be forced to sign a No Objection Certificate (NOC) or Release Deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Relinquishment of property rights must be completely voluntary. Under Section 17 of the Registration Act, 1908, any relinquishment of immovable property valued over Rs 100 must be executed via a registered deed with appropriate stamp duty. Unregistered affidavits or coerced NOCs have no legal standing to divest title.",
            },
          },
          {
            "@type": "Question",
            name: "What is the time limitation period for a married daughter to file a partition suit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 110 of the Limitation Act, 1963, the limitation period to enforce a right to share in joint family property is 12 years from the date when the exclusion from the property becomes known to the claimant. Prompt legal action upon learning of exclusion is strongly recommended.",
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
      <MarriedDaughterRightsClient />
      <Footer />
    </>
  );
}
