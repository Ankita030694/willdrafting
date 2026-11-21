import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RajasthanStampDutyClient from "./RajasthanStampDutyClient";

// Screaming Frog Rules: Title 50-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Rajasthan Gift & Release Stamp Duty Tool | WillDrafting", // 55 characters
  },
  description:
    "Calculate Rajasthan Gift Deed (Art. 31) and Release Deed (Art. 48) stamp duty, 33% surcharge, and e-Panjiyan fees. Check family rates online.", // 141 characters
  keywords: [
    "rajasthan gift deed stamp duty calculator",
    "rajasthan release deed stamp duty calculator",
    "article 31 gift deed stamp duty rajasthan",
    "article 48 release deed ancestral property rajasthan 500",
    "rajasthan stamp act 1998 gift deed family members",
    "gift deed to wife daughter stamp duty rajasthan zero",
    "rajasthan stamp duty 33 percent surcharge section 3a 3b",
    "epanjiyan rajasthan gift deed registration fee 4 lakh cap",
    "haq tyag patra stamp duty rajasthan ancestral property",
    "family settlement deed rajasthan 2024 notification zero stamp duty",
    "jaipur gift deed registration process egras dlc rate",
    "willdrafting rajasthan stamp duty calculator",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/rajasthan-gift-deed-release-deed-stamp-duty-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/rajasthan-gift-deed-release-deed-stamp-duty-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/rajasthan-gift-deed-release-deed-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "Rajasthan Gift & Release Stamp Duty Tool | WillDrafting",
    description:
      "Calculate Rajasthan Gift Deed (Art. 31) and Release Deed (Art. 48) stamp duty, 33% surcharge, and e-Panjiyan fees. Check family rates online.",
    url: "https://www.willdrafting.in/tools/rajasthan-gift-deed-release-deed-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/rajasthan-gift-deed-release-deed-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Rajasthan family reviewing Gift and Release Deed stamp duty in Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Rajasthan Gift & Release Stamp Duty Tool | WillDrafting",
    description:
      "Calculate Rajasthan Gift Deed (Art. 31) and Release Deed (Art. 48) stamp duty, 33% surcharge, and e-Panjiyan fees. Check family rates online.",
    images: [
      "https://www.willdrafting.in/images/rajasthan-gift-deed-release-deed-stamp-duty-calculator-og.jpg",
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

export default function RajasthanGiftReleaseStampDutyPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/rajasthan-gift-deed-release-deed-stamp-duty-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/rajasthan-gift-deed-release-deed-stamp-duty-calculator-og.jpg";

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
        name: "Rajasthan Gift & Release Stamp Duty Tool | WillDrafting",
        description:
          "Calculate Rajasthan Gift Deed (Art. 31) and Release Deed (Art. 48) stamp duty, 33% surcharge, and e-Panjiyan fees. Check family rates online.",
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
            name: "Rajasthan Gift & Release Deed Stamp Duty",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Rajasthan Gift Deed & Release Deed Stamp Duty Calculator",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free Rajasthan Stamp Act 1998 calculator for Article 31 Gift Deeds, Article 48 Release Deeds, Article 51 Family Settlements, 33% surcharges, and e-Panjiyan registration fees.",
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
            name: "What is the stamp duty on a Gift Deed to a wife or daughter in Rajasthan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rajasthan Stamp Act notifications (including Notification No. F.4(2)FD/Tax/2022-115), stamp duty on a Gift Deed in favour of a wife or daughter is 0% (Nil). Because base stamp duty is zero, the 33% surcharge under Sections 3-A and 3-B is also Rs 0. For a wife, concessional spousal registration fee rules apply (Rs 1,000 flat under active notifications), while a daughter pays 1% registration fee capped at Rs 4 lakh.",
            },
          },
          {
            "@type": "Question",
            name: "How much is the stamp duty on a Gift Deed to a son, brother, sister, or parents in Rajasthan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For a Gift Deed to a son, husband, brother, sister, or parents aged up to 60 years, Rajasthan charges a reduced base stamp duty of 2.5% on the DLC market value. Adding the 33% combined surcharge (13% Section 3-A infrastructure surcharge plus 20% Section 3-B cow cess) brings effective stamp duty to 3.325%, plus 1% registration fee capped at Rs 4 lakh. Senior parent age concessions (parents above 60 or donor parents above 70 gifting to a son) and Article 51 Family Settlement rules can reduce duty further.",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamp duty on a Release Deed (Haq Tyag Patra) of ancestral property in Rajasthan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 48(a) of the Rajasthan Stamp Act, 1998 read with Finance Department Notification No. F.4(2)FD/Tax/2022-110 dated February 23, 2022, the base stamp duty on a Release Deed of ancestral property among eligible family co-heirs without money is reduced to a flat Rs 500. Statutory surcharges apply only on that Rs 500 base amount, along with applicable registration fees.",
            },
          },
          {
            "@type": "Question",
            name: "How does Rajasthan calculate the 33% surcharge on stamp duty?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rajasthan levies two surcharges on top of base stamp duty, not on property value. Section 3-A levies a 13% basic infrastructure surcharge (revised from 10% via Notification No. F.4(2)FD/Tax/2026-132 dated February 11, 2026). Section 3-B levies a 20% cow conservation and calamity surcharge. Together they add 33% of the base stamp duty amount. If base stamp duty is Rs 0, both surcharges are Rs 0.",
            },
          },
          {
            "@type": "Question",
            name: "What is the maximum registration fee cap for property deeds in Rajasthan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 78 of the Registration Act, 1908 as notified in Rajasthan, the general registration fee is 1% of the DLC market value of the property or released share, capped at a maximum of Rs 4,00,000 for properties valued above Rs 4 crore. Specific family concessions such as a Will (Rs 100 flat), a qualifying Article 51 Family Settlement (Rs 0), or spousal gift concessions lower this fee.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use a Release Deed for self-acquired property or a relative with no prior share?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Article 48 of the Rajasthan Stamp Act and the Supreme Court ruling in Kuppuswami Chettiar v. Arumugam Chettiar (1967), a Release Deed only works when a co-owner gives up a pre-existing share to another existing co-owner. If the property is self-acquired or the recipient holds no prior share, the flat Rs 500 ancestral rate does not apply, and standard conveyance or gift rates apply instead.",
            },
          },
          {
            "@type": "Question",
            name: "How does a Family Settlement Deed (Article 51) compare to a Gift Deed in Rajasthan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Finance Department Notification No. F.4(2)FD/Tax/2024-92 dated July 10, 2024, a Family Settlement Deed in favour of a wife, son, daughter, grandchildren, or daughter-in-law attracts 0% stamp duty and Rs 0 registration fee. For father, mother, husband, brother, or sister, it attracts 1.5% stamp duty and Rs 0 registration fee. Families transferring assets to a son or sibling often save lakhs by checking Article 51 eligibility with a Rajasthan lawyer.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Will cheaper than a Gift Deed or Release Deed in Rajasthan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In Rajasthan, a Will attracts Rs 0 stamp duty and only a Rs 100 flat registration fee at the Sub-Registrar Office, plus nominal scanning charges. Court probate is also not mandatory in Rajasthan for Hindu, Sikh, Jain, and Buddhist Wills. You keep full ownership and rental income for life, unlike a Gift Deed which transfers ownership right away.",
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
        <RajasthanStampDutyClient />
        <Footer />
      </div>
    </>
  );
}
