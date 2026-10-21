import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GiftDeedCancellationClient from "./GiftDeedCancellationClient";

export const metadata: Metadata = {
  title: {
    absolute: "Can Gift Deed Be Cancelled by Parents? Section 23 Guide",
  },
  description:
    "Can gift deed be cancelled by parents in India? Learn Section 23 Senior Citizens Act rules, Supreme Court Urmila Dixit ruling, conditions, and Will safeguards.",
  keywords: [
    "can gift deed be cancelled by parents",
    "gift deed cancellation india",
    "Section 23 senior citizens act",
    "revoke gift deed",
    "Urmila Dixit case",
    "gift deed cancellation by senior citizen",
    "senior citizens act 2007 section 23",
    "cancellation of gift deed maintenance tribunal",
    "vachan patra gift deed cancellation",
    "gift deed vs will for parents india",
    "urmila dixit v sunil sharan dixit 2025 insc 20",
    "how to cancel gift deed in india",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/blogs/gift-deed-cancellation-senior-citizens-act-section-23",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/blogs/gift-deed-cancellation-senior-citizens-act-section-23",
      "x-default":
        "https://www.willdrafting.in/blogs/gift-deed-cancellation-senior-citizens-act-section-23",
    },
  },
  openGraph: {
    title: "Can Gift Deed Be Cancelled by Parents? Section 23 Guide",
    description:
      "Can gift deed be cancelled by parents in India? Learn Section 23 Senior Citizens Act rules, Supreme Court Urmila Dixit ruling, conditions, and Will safeguards.",
    url: "https://www.willdrafting.in/blogs/gift-deed-cancellation-senior-citizens-act-section-23",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.willdrafting.in/images/gift-deed-cancellation-senior-citizens-act-section-23.jpg",
        width: 1200,
        height: 630,
        alt: "Can Gift Deed Be Cancelled by Parents Under Senior Citizens Act Section 23",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Can Gift Deed Be Cancelled by Parents? Section 23 Guide",
    description:
      "Can gift deed be cancelled by parents in India? Learn Section 23 Senior Citizens Act rules, Supreme Court Urmila Dixit ruling, conditions, and Will safeguards.",
    images: [
      "https://www.willdrafting.in/images/gift-deed-cancellation-senior-citizens-act-section-23.jpg",
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

export default function GiftDeedCancellationPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/blogs/gift-deed-cancellation-senior-citizens-act-section-23";
  const imageUrl =
    "https://www.willdrafting.in/images/gift-deed-cancellation-senior-citizens-act-section-23.jpg";

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
        name: "Can Gift Deed Be Cancelled by Parents? Section 23 Guide",
        description:
          "Can gift deed be cancelled by parents in India? Learn Section 23 Senior Citizens Act rules, Supreme Court Urmila Dixit ruling, conditions, and Will safeguards.",
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
            name: "Gift Deed Cancellation Under Section 23",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        isPartOf: {
          "@id": `${canonicalUrl}#webpage`,
        },
        headline: "Can Gift Deed Be Cancelled by Parents Under Senior Citizens Act?",
        description:
          "Authoritative guide for senior citizens on cancelling gift deeds under Section 23 of MWPSC Act 2007, Supreme Court Urmila Dixit ruling, and why a Will protects elders better.",
        mainEntityOfPage: canonicalUrl,
        datePublished: "2026-10-21T09:00:00+05:30",
        dateModified: "2026-10-21T11:15:00+05:30",
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
          "@id": "https://www.willdrafting.in/#organization",
        },
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 630,
        },
        articleSection: "Elder Law and Estate Planning",
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can a gift deed be cancelled by parents if the child neglects them?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, if a senior citizen (aged 60+) gifts property subject to the condition of lifelong maintenance and care, and the child fails to provide basic amenities, the Maintenance Tribunal can declare the gift deed null and void.",
            },
          },
          {
            "@type": "Question",
            name: "What did the Supreme Court decide in Urmila Dixit v. Sunil Sharan Dixit (2025)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20, decided January 2, 2025), the Supreme Court ruled that the maintenance condition does not need to be written strictly inside the gift deed itself. Contemporaneous documents such as a signed promissory note (Vachan Patra) or written undertaking executed during the property transfer can be relied upon to void the deed under Section 23.",
            },
          },
          {
            "@type": "Question",
            name: "Can an unconditional gift deed be cancelled under Section 23?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Generally no. As held by the Supreme Court in Sudesh Chhikara v. Ramti Devi (2022), Section 23 requires that the transfer was subject to the condition that the transferee provides basic amenities. If a deed contains no maintenance clause and no contemporaneous written undertaking exists, the Maintenance Tribunal cannot void the transfer. The parent must approach civil court for fraud or seek monthly maintenance.",
            },
          },
          {
            "@type": "Question",
            name: "What is the statutory timeline for the Maintenance Tribunal to decide a cancellation petition?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 5(6) of the Senior Citizens Act, the Maintenance Tribunal is mandated to dispose of the proceedings within 90 days from the date of service of notice to the respondent. In exceptional circumstances, the Tribunal may extend this period by up to 30 days with written reasons.",
            },
          },
          {
            "@type": "Question",
            name: "Can parents evict an abusive child and daughter-in-law from the gifted house?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Once the Maintenance Tribunal voids the gift deed under Section 23(1), the transferee child loses all legal title and becomes an unauthorized occupant. The Tribunal has summary powers to order their eviction and direct the local police administration to restore peaceful physical possession to the elderly parents.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the child sells the gifted property to a third party?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 23(2) of the Act, if a senior citizen has a right to receive maintenance out of an estate and the property is transferred with notice of such right or gratuitously, the right can be enforced against the transferee. However, if sold to a bona fide purchaser for valuable consideration without notice, litigation becomes complex, underscoring why parents should never transfer title during their lifetime.",
            },
          },
          {
            "@type": "Question",
            name: "Can a gift deed executed before 2007 be cancelled under Section 23?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Section 23 explicitly applies only to transfers of property executed after the commencement of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 in that respective state. Transfers executed before the Act came into force can only be challenged in civil court under the Indian Contract Act or Transfer of Property Act.",
            },
          },
          {
            "@type": "Question",
            name: "Why is creating a Will safer for parents than executing a conditional gift deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Will ensures the parent retains 100% legal ownership, possession, and rental income for life. Unlike a gift deed, a Will transfers title only after death and can be revoked or updated unilaterally at any time without going to court, paying stamp duty, or proving child neglect before a tribunal.",
            },
          },
          {
            "@type": "Question",
            name: "Do parents need a lawyer to file a case before the Maintenance Tribunal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 17 of the Senior Citizens Act explicitly bars legal representation by legal practitioners before the Maintenance Tribunal to keep proceedings informal and accessible. However, senior citizens can seek advocate guidance to draft the petition and organize evidence, or be represented by an authorized Maintenance Officer.",
            },
          },
          {
            "@type": "Question",
            name: "Can parents cancel a gift deed if the child pays money but inflicts emotional cruelty?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Section 23 covers both basic amenities and basic physical needs, interpreted liberally by the Supreme Court to include dignified living and emotional security. Depriving an elderly parent of peaceful shelter, verbal harassment, or confining them to an unlivable room constitutes breach of basic amenities under the Act.",
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
      <GiftDeedCancellationClient />
      <Footer />
    </>
  );
}
