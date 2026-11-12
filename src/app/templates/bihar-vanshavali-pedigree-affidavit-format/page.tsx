import React from "react";
import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BiharVanshavaliClient from "./BiharVanshavaliClient";

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Screaming Frog SEO Rules: Title <= 60 chars (48 chars), Description <= 154 chars (146 chars), 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Bihar Vanshavali Affidavit Format | WillDrafting",
  },
  description:
    "Download official Bihar Vanshavali affidavit format on stamp paper for Dakhil Kharij and land mutation on biharbhumi.info. Includes pedigree tree.",
  keywords: [
    "bihar vanshavali affidavit format for mutation",
    "vanshavali praman patra format bihar",
    "circle officer vanshavali affidavit biharbhumi",
    "gram panchayat mukhiya vanshavali draft",
    "bihar vanshavali format in hindi pdf",
    "panchayat sachiv vanshavali form bihar",
    "sarpanch vanshavali praman patra format",
    "prapatra 3 1 vanshavali format bihar land survey",
    "executive magistrate vanshavali affidavit bihar",
    "dakhil kharij vanshavali stamp paper value bihar",
    "bihar land mutation act 2011 section 6",
    "ama legal solutions bihar mutation lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/bihar-vanshavali-pedigree-affidavit-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/bihar-vanshavali-pedigree-affidavit-format",
      "x-default": "https://www.willdrafting.in/templates/bihar-vanshavali-pedigree-affidavit-format",
    },
  },
  openGraph: {
    title: "Bihar Vanshavali Affidavit Format | WillDrafting",
    description:
      "Download official Bihar Vanshavali affidavit format on stamp paper for Dakhil Kharij and land mutation on biharbhumi.info. Includes pedigree tree.",
    url: "https://www.willdrafting.in/templates/bihar-vanshavali-pedigree-affidavit-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/bihar-vanshavali-pedigree-affidavit-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Bihar Vanshavali Affidavit Format on Stamp Paper and Pedigree Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Bihar Vanshavali Affidavit Format | WillDrafting",
    description:
      "Download official Bihar Vanshavali affidavit format on stamp paper for Dakhil Kharij and land mutation on biharbhumi.info. Includes pedigree tree.",
    images: [
      "https://www.willdrafting.in/images/bihar-vanshavali-pedigree-affidavit-format-og.jpg",
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

export default function BiharVanshavaliAffidavitPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/bihar-vanshavali-pedigree-affidavit-format";
  const imageUrl =
    "https://www.willdrafting.in/images/bihar-vanshavali-pedigree-affidavit-format-og.jpg";

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
        name: "Bihar Vanshavali Affidavit Format | WillDrafting",
        description:
          "Download official Bihar Vanshavali affidavit format on stamp paper for Dakhil Kharij and land mutation on biharbhumi.info. Includes pedigree tree.",
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
            name: "Bihar Vanshavali Affidavit Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        headline: "Bihar Vanshavali & Pedigree Affidavit Format for Dakhil Kharij",
        name: "Bihar Vanshavali Pedigree Affidavit Format (Hindi & English)",
        url: canonicalUrl,
        description:
          "Editable Hindi and English Bihar Vanshavali affidavit format on Rs 100 stamp paper with Mukhiya, Sarpanch, and Executive Magistrate countersignature for BiharBhumi Dakhil Kharij.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        inLanguage: ["en-IN", "hi-IN"],
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        image: imageUrl,
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Estate Counsel",
          url: "https://www.willdrafting.in/about-us",
        },
        creator: {
          "@type": "Organization",
          name: "WillDrafting.in",
        },
        publisher: {
          "@type": "LegalService",
          name: "AMA Legal Solutions",
          url: "https://www.amalegalsolutions.com",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What stamp paper value is needed for a Bihar Vanshavali affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Schedule 1-A, Article 4 of the Indian Stamp Act as applied in Bihar, a sworn Vanshavali affidavit needs a Rs 100 non-judicial stamp paper or e-stamp. For the Bihar Special Land Survey, you can also attach plain-paper Prapatra-3(1) alongside your sworn affidavit.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Gram Panchayat Mukhiya Vanshavali alone valid for Dakhil Kharij?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under the Bihar Gram Panchayat Raj Act, 2006 and state circulars, a Mukhiya or Sarpanch slip alone has no full legal power. You must pair your Rs 100 sworn affidavit (signed before a Notary or Executive Magistrate) with Panchayat Secretary inquiry and Sarpanch seal.",
            },
          },
          {
            "@type": "Question",
            name: "How much fee does the Panchayat Secretary charge for Vanshavali in Bihar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Bihar Panchayati Raj Department rules, the Gram Panchayat Secretary charges a flat Rs 10 official fee with a receipt for a fresh Vanshavali. A second copy costs Rs 100. The verification report must be completed within 7 days of filing.",
            },
          },
          {
            "@type": "Question",
            name: "How long does the Circle Officer take for Dakhil Kharij under Section 6?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 6 of the Bihar Land Mutation Act, 2011, the Circle Officer must decide undisputed mutation files within 35 working days. If any heir files an objection, the officer conducts hearings and passes a speaking order within 75 working days.",
            },
          },
          {
            "@type": "Question",
            name: "Must married daughters be named in the Bihar Vanshavali family tree?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 6 of the Hindu Succession Act and the Supreme Court Vineeta Sharma (2020) ruling, married and unmarried daughters hold equal birth shares. Leaving a sister or daughter out makes the Vanshavali false and invites mutation cancellation.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Prapatra-3(1) and a Dakhil Kharij affidavit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Prapatra-3(1) is a self-attested family tree form used for the Bihar Special Land Survey under DLRS rules. In contrast, BiharBhumi online Dakhil Kharij (Form-IA) requires a Rs 100 notarized or Magistrate Vanshavali affidavit plus Panchayat verification.",
            },
          },
          {
            "@type": "Question",
            name: "What can I do if the Circle Officer rejects my Vanshavali mutation file?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "First download the reasoned Form 4 order from BiharBhumi. Under Section 7 of the Bihar Land Mutation Act, 2011, you can file a Mutation Appeal before the Deputy Collector Land Reforms (DCLR) within 30 days of the rejection order.",
            },
          },
          {
            "@type": "Question",
            name: "Can NRIs or out-of-state Biharis file a Vanshavali affidavit without visiting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Any co-heir living in Patna, Delhi, or abroad can sign a Power of Attorney or sworn affidavit before a Notary or Indian Embassy. One local co-heir can then submit the Form-IA file on BiharBhumi with Aadhaar and consent papers.",
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
      <div className={`min-h-screen bg-[#FAF7F0] text-[#172228] antialiased ${notoDevanagari.variable}`}>
        <Navbar />
        <BiharVanshavaliClient />
        <Footer />
      </div>
    </>
  );
}
