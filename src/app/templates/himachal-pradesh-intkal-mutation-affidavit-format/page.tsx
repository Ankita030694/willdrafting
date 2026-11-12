import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HimachalIntkalAffidavitClient from "./HimachalIntkalAffidavitClient";

const PAGE_URL =
  "https://www.willdrafting.in/templates/himachal-pradesh-intkal-mutation-affidavit-format";
const OG_IMAGE_URL =
  "https://www.willdrafting.in/images/himachal-pradesh-intkal-mutation-affidavit-format-og.jpg";
const PAGE_TITLE = "HP Intkal Mutation Affidavit Format | WillDrafting";
const PAGE_DESCRIPTION =
  "Download free Himachal Pradesh Intkal mutation affidavit format for Himbhoomi portal. Includes Section 118 agriculturist compliance declarations.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  keywords: [
    "himachal pradesh intkal mutation affidavit format",
    "himbhoomi virasat intkal affidavit draft",
    "section 118 hp land reforms heir declaration",
    "shimla tehsil warisan affidavit format",
    "hp agriculturist certificate affidavit format",
    "patwari intkal register virasat himachal pradesh",
  ],
  authors: [{ name: "Lawyer Anuj Anand Malik", url: "https://www.willdrafting.in/about" }],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-IN": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    type: "article",
    publishedTime: "2026-11-12T00:00:00.000Z",
    modifiedTime: "2026-11-12T00:00:00.000Z",
    authors: ["Lawyer Anuj Anand Malik"],
    locale: "en_IN",
    url: PAGE_URL,
    siteName: "WillDrafting",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 675,
        alt: "HP Intkal Mutation Affidavit Format for Himbhoomi and Section 118 compliance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const FAQS = [
  {
    q: "How do I write an Intkal Virasat affidavit for a Shimla apple orchard?",
    a: "Buy a Rs. 20 HP e-Stamp paper under Article 4 of the 2023 Stamp Amendment. Write the late owner's name and death date. Copy the Mohal, Khata, Khatauni, and Khasra numbers from your Himbhoomi Jamabandi. List all Class I heirs to match the Shajra Nasab. Then add the Section 118 heir clause before giving the file to your Patwari.",
  },
  {
    q: "What is the Section 118 farm heir clause in a Himachal Intkal affidavit?",
    a: "Section 118 of the HP Tenancy and Land Reforms Act, 1972 bars land sales to non-farmers without State approval. Your Virasat affidavit must state one clear fact. Either the heir already owns and farms land in HP under Section 2(2), or the land goes to a natural legal heir under Section 118(1).",
  },
  {
    q: "Does a Bona Fide Himachali paper pass Section 118 checks for land mutation?",
    a: "No. A Bona Fide Himachali card on the HP e-District site only proves where you live. It does not prove you own or work farm land. To buy more orchards without State permission, you need a Krishak Praman Patra based on village Jamabandi records.",
  },
  {
    q: "Can a parent leave Himachal farm land to an outsider friend by Will?",
    a: "No. Under Section 118(1) and the Kuldeep Singal v. Rakesh Kumar (2019 HP HC) ruling, Will exemptions protect natural legal heirs only. A Will giving Himachal farm land to a non-heir who is not an HP farmer cannot pass valid mutation without prior State permission.",
  },
  {
    q: "What stamp paper fee is valid for an HP Virasat Intkal affidavit?",
    a: "Under Article 4 of the Indian Stamp (HP Amendment) Act, 2023, affidavit stamp duty rose from Rs. 10 to Rs. 20. Buy a Rs. 20 HP e-Stamp paper from an authorised SHCIL agent or tehsil counter. Get it signed before a Magistrate, Notary, or Oath Commissioner.",
  },
  {
    q: "How do Patwari Parat Intkal and Tehsildar Jalsa-e-Aam work?",
    a: "Under Sections 35 and 37 of the HP Land Revenue Act, 1954, heirs report a death to the village Patwari. The Patwari notes the claim in the Roznamcha diary and Parat Intkal register. After the Kanungo checks the record, the Tehsildar reads the entry at an open Jalsa-e-Aam camp and signs it.",
  },
  {
    q: "What is the time limit to appeal a wrong mutation order in Himachal?",
    a: "If a Tehsildar signs or rejects a mutation wrongly, act fast. Under Sections 14 and 15 of the HP Land Revenue Act, 1954, file an appeal before the Collector within 30 days. Further appeals go to the Commissioner within 60 days and the Financial Commissioner within 90 days.",
  },
  {
    q: "Can married daughters living outside Himachal Pradesh inherit orchard land?",
    a: "Yes. Under the Hindu Succession Act, 1956 and Section 118 natural heir rules, daughters hold equal Class I land rights. Living outside the state after marriage does not cut their share. No heir can lose a share without a valid signed deed or open Tehsil statement.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.willdrafting.in/#organization",
      name: "WillDrafting.in",
      url: "https://www.willdrafting.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.willdrafting.in/icon.png",
      },
      sameAs: ["https://www.amalegalsolutions.com"],
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: { "@id": "https://www.willdrafting.in/#organization" },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      mainEntity: { "@id": `${PAGE_URL}#article` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
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
          name: "HP Intkal Mutation Affidavit Format",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": ["Article", "DigitalDocument"],
      "@id": `${PAGE_URL}#article`,
      headline: "Himachal Pradesh Intkal Mutation Affidavit Format",
      name: "HP Intkal Virasat & Section 118 Agriculturist Affidavit Template",
      description: PAGE_DESCRIPTION,
      datePublished: "2026-11-12",
      dateModified: "2026-11-12",
      inLanguage: "en-IN",
      fileFormat: "text/plain",
      isAccessibleForFree: true,
      url: PAGE_URL,
      image: OG_IMAGE_URL,
      author: {
        "@type": "Person",
        name: "Lawyer Anuj Anand Malik",
        jobTitle: "Founder & Managing Partner, AMA Legal Solutions",
        url: "https://www.willdrafting.in/about",
      },
      publisher: { "@id": "https://www.willdrafting.in/#organization" },
      about: [
        "Himachal Pradesh Land Revenue Act, 1954 Sections 34 to 38",
        "Himachal Pradesh Tenancy and Land Reforms Act, 1972 Section 118",
        "Himbhoomi Intkal Virasat Mutation and Shajra Nasab",
      ],
      hasDigitalDocumentPermission: {
        "@type": "DigitalDocumentPermission",
        permissionType: "https://schema.org/ReadPermission",
        grantee: {
          "@type": "Audience",
          audienceType: "Legal heirs, apple orchard owners, and Himachali families",
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

export default function HimachalPradeshIntkalMutationAffidavitPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HimachalIntkalAffidavitClient faqs={FAQS} />
      <Footer />
    </div>
  );
}
