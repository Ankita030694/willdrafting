import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GiftDeedRevocationClient from "./GiftDeedRevocationClient";

const canonicalUrl =
  "https://www.willdrafting.in/templates/revocation-of-gift-deed-senior-citizens-act-format";
const ogImageUrl =
  "https://www.willdrafting.in/images/revocation-of-gift-deed-senior-citizens-act-format-og.jpg";
const ogImageAlt =
  "Section 23 Senior Citizens Act gift deed cancellation petition format and eviction prayer";

const pageTitle = "Senior Citizen Gift Cancellation Format | WillDrafting";
const pageDescription =
  "Download verified Section 23 Senior Citizens Act petition format to cancel gift deeds and evict abusive children before the Maintenance Tribunal.";

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  keywords: [
    "senior citizen gift deed cancellation application format",
    "section 23 senior citizens act petition format",
    "application to maintenance tribunal for evicting son sample",
    "cancel gift deed to children draft",
    "Sudesh Chhikara gift deed cancellation",
    "Urmila Dixit Supreme Court Section 23",
    "SDO Maintenance Tribunal eviction application",
    "WillDrafting",
  ],
  authors: [{ name: "Advocate Anuj Anand Malik" }],
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-IN": canonicalUrl,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    siteName: "WillDrafting",
    locale: "en_IN",
    type: "article",
    publishedTime: "2026-11-12T00:00:00.000Z",
    modifiedTime: "2026-11-12T00:00:00.000Z",
    authors: ["Advocate Anuj Anand Malik"],
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 675,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogImageUrl,
        alt: ogImageAlt,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const faqItems = [
  {
    question:
      "What must a Section 23 gift deed cancellation plea prove after Sudesh Chhikara?",
    answer:
      "Under Sudesh Chhikara v. Ramti Devi (2022 SC), the parent must prove two facts. First, the gift had a duty to give daily care and basic needs. Second, the child failed or refused to give them.",
  },
  {
    question:
      "Can a parent cancel a gift deed if the care clause is missing from the deed?",
    answer:
      "Yes, in some cases. In Urmila Dixit v. Sunil Sharan Dixit (2025 SC), the Supreme Court held that a same-day Vachan Patra or signed promise can be read with the gift deed.",
  },
  {
    question:
      "How do senior citizens apply to the SDO or Tribunal to evict a son or daughter?",
    answer:
      "A senior citizen aged 60 or more files a short plea under Section 23 and Section 22 rules before the local SDO. Attach the gift deed copy, age proof, and proof of neglect or denial of food.",
  },
  {
    question:
      "Can a lawyer represent a senior citizen before the Maintenance Tribunal under Section 17?",
    answer:
      "Section 17 limits lawyers before the Tribunal. Still, some High Courts allow lawyers, and a parent can get help to draft the plea or use a Conciliation Officer.",
  },
  {
    question:
      "Can the Maintenance Tribunal pass an eviction order with gift deed cancellation?",
    answer:
      "Yes. Under Section 22 state rules and cases like Sunny Paul (Delhi HC) and S. Vanitha (SC), the Tribunal can evict abusive children from a parent's own house.",
  },
  {
    question:
      "What if the daughter-in-law claims a shared home right under the Domestic Violence Act?",
    answer:
      "In S. Vanitha (2020 SC), the court held that Section 23 cannot automatically erase a woman's shared home right. The SDO must weigh both laws and check for genuine claims.",
  },
  {
    question:
      "Can a gift deed signed before the 2007 Act started be cancelled under Section 23?",
    answer:
      "No. Section 23 applies only to gift deeds signed after the 2007 Act began in that state. Older deeds need a regular suit in Civil Court.",
  },
  {
    question:
      "How long does the SDO Tribunal take to cancel a gift deed and fix mutation?",
    answer:
      "Under Section 5(4), the SDO aims to decide cases within 90 days of notice. Once the gift is declared void, give the order to the Sub-Registrar and Tehsildar to fix land records.",
  },
];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.willdrafting.in/#organization",
      name: "WillDrafting",
      url: "https://www.willdrafting.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.willdrafting.in/logo.png",
      },
      sameAs: ["https://x.com/willdrafting"],
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: "en-IN",
      isPartOf: { "@id": "https://www.willdrafting.in/#organization" },
      breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.willdrafting.in/",
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
          name: "Senior Citizen Gift Cancellation Format",
          item: canonicalUrl,
        },
      ],
    },
    {
      "@type": ["Article", "DigitalDocument"],
      "@id": `${canonicalUrl}#article`,
      headline: pageTitle,
      description: pageDescription,
      image: {
        "@type": "ImageObject",
        url: ogImageUrl,
        width: 1200,
        height: 675,
      },
      author: {
        "@type": "Person",
        name: "Advocate Anuj Anand Malik",
        jobTitle: "Founder & Senior Advocate",
        url: "https://www.willdrafting.in/contact",
      },
      publisher: { "@id": "https://www.willdrafting.in/#organization" },
      datePublished: "2026-11-12T00:00:00.000Z",
      dateModified: "2026-11-12T00:00:00.000Z",
      mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
      keywords:
        "senior citizen gift deed cancellation application format, section 23 senior citizens act petition format, application to maintenance tribunal for evicting son sample, cancel gift deed to children draft",
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function RevocationOfGiftDeedSeniorCitizensPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <Navbar />
      <GiftDeedRevocationClient faqItems={faqItems} />
      <Footer />
    </div>
  );
}
