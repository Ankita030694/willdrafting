import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KarnatakaStampDutyClient from "./KarnatakaStampDutyClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Karnataka Gift & Release Stamp Duty Tool | WillDrafting", // 55 characters
  },
  description:
    "Calculate Karnataka stamp duty and registration fees for family Gift Deeds & Release Deeds on Kaveri 2.0. Verify Article 28(b) & 45(b) slabs.", // 141 characters
  keywords: [
    "karnataka gift deed release deed stamp duty calculator",
    "karnataka gift deed stamp duty family members",
    "kaveri 2.0 gift deed fee",
    "release deed stamp duty bangalore",
    "article 28b karnataka stamp act family gift",
    "article 45b karnataka stamp act release deed",
    "bangalore site gift deed to daughter stamp duty",
    "bbmp e khata gift deed transfer checklist",
    "karnataka registration fee 2 percent 2025",
    "gift deed to daughter in law karnataka stamp duty",
    "gift deed to son in law karnataka stamp duty",
    "willdrafting karnataka stamp duty",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/karnataka-gift-deed-release-deed-stamp-duty-calculator",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/karnataka-gift-deed-release-deed-stamp-duty-calculator",
      "x-default":
        "https://www.willdrafting.in/tools/karnataka-gift-deed-release-deed-stamp-duty-calculator",
    },
  },
  openGraph: {
    title: "Karnataka Gift & Release Stamp Duty Tool | WillDrafting",
    description:
      "Calculate Karnataka stamp duty and registration fees for family Gift Deeds & Release Deeds on Kaveri 2.0. Verify Article 28(b) & 45(b) slabs.",
    url: "https://www.willdrafting.in/tools/karnataka-gift-deed-release-deed-stamp-duty-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/karnataka-gift-deed-release-deed-stamp-duty-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Karnataka Gift and Release Deed Stamp Duty Calculator on Kaveri 2.0",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Karnataka Gift & Release Stamp Duty Tool | WillDrafting",
    description:
      "Calculate Karnataka stamp duty and registration fees for family Gift Deeds & Release Deeds on Kaveri 2.0. Verify Article 28(b) & 45(b) slabs.",
    images: [
      "https://www.willdrafting.in/images/karnataka-gift-deed-release-deed-stamp-duty-calculator-og.jpg",
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

export default function KarnatakaGiftReleaseDutyPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/karnataka-gift-deed-release-deed-stamp-duty-calculator";
  const imageUrl =
    "https://www.willdrafting.in/images/karnataka-gift-deed-release-deed-stamp-duty-calculator-og.jpg";

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
        name: "Karnataka Gift & Release Stamp Duty Tool | WillDrafting",
        description:
          "Calculate Karnataka stamp duty and registration fees for family Gift Deeds & Release Deeds on Kaveri 2.0. Verify Article 28(b) & 45(b) slabs.",
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
            name: "Karnataka Gift & Release Stamp Duty Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Karnataka Gift & Release Deed Stamp Duty Calculator (Kaveri 2.0)",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free Kaveri 2.0 stamp duty and registration fee tool for Karnataka Gift Deeds (Article 28) and Release Deeds (Article 45), with Family Member Checker and BBMP e-Khata checklist.",
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
            name: "What is the exact stamp duty for gifting a Bangalore site to my daughter on Kaveri 2.0?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 28(b) of the Karnataka Stamp Act, 1957, gifting a BBMP or BMRDA site to your daughter attracts a fixed base stamp duty of Rs 5,000, not 5% of market value. Add 10% Section 3B cess (Rs 500) and 2% municipal surcharge (Rs 100) for Rs 5,600 total stamp duty. With a fixed Rs 1,000 family registration fee plus Rs 50 per page scanning fee, your Kaveri 2.0 challan comes to about Rs 7,100 for a 10-page deed.",
            },
          },
          {
            "@type": "Question",
            name: "Who counts as a family member under Article 28(b) of the Karnataka Stamp Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The statutory Explanation to Article 28(b) defines family strictly as father, mother, husband, wife, son, daughter, daughter-in-law, brother, sister, and grandchildren. Anyone outside this exact list pays full non-family conveyance duty on the Kaveri 2.0 guidance value.",
            },
          },
          {
            "@type": "Question",
            name: "Does a gift deed to a son-in-law qualify for the Rs 5,000 family slab in Karnataka?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Even though a son-in-law is tax-free under Section 56(2)(x) of the Income Tax Act, he is excluded from the Explanation to Article 28(b) of the Karnataka Stamp Act. Gifting directly to a son-in-law triggers 5% base stamp duty, 10% cess, 2% urban surcharge (5.6% total), plus 2% registration fee on guidance value. Parents instead gift to their daughter under Article 28(b).",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamp duty and registration fee for a family Release Deed in Bangalore?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 45(b) of the Karnataka Stamp Act, a Release Deed among family co-owners in BBMP, BMRDA, or City Corporation limits carries a fixed Rs 5,000 base stamp duty, plus Rs 500 cess (10%) and Rs 100 surcharge (2%), totaling Rs 5,600. Town Municipal and Town Panchayat areas pay Rs 3,000 base (Rs 3,360 with cess and surcharge), and rural areas pay Rs 1,000 base (Rs 1,130 total), plus nominal family registration and page scanning fees.",
            },
          },
          {
            "@type": "Question",
            name: "When should I use a Release Deed instead of a Gift Deed in Karnataka?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use a Gift Deed when one sole owner transfers full or part title to a family member who holds no prior share in the property. Use a Release Deed (Relinquishment Deed) only when two or more people already co-own or jointly inherit the property and one co-owner gives up their undivided share to another existing co-owner.",
            },
          },
          {
            "@type": "Question",
            name: "What is the non-family gift or release deed stamp duty and registration fee in Karnataka?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For non-family recipients under Article 28(a) or Article 45(a), Karnataka charges conveyance duty at 5% base stamp duty on the Kaveri 2.0 guidance value (of the property or released share), plus 10% cess and 2% urban surcharge (5.60% total) or 3% rural surcharge (5.65% total). Under Revenue Department Notification No. RD/46/MNMU/2025 effective August 31, 2025, standard ad valorem registration fee is 2% of market value.",
            },
          },
          {
            "@type": "Question",
            name: "Is BBMP e-Khata required for a family Gift Deed or Release Deed on Kaveri 2.0?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. For properties inside BBMP limits, a verified digital e-Khata (A-Khata or B-Khata) from the BBMP e-Aasthi portal is needed before Kaveri 2.0 allows registration. After SRO registration with Aadhaar e-KYC, BBMP triggers automatic e-Khata name change in about 7 working days. If filed manually, the BBMP Khata transfer fee is 2% of the stamp duty paid, with a minimum fee of Rs 500.",
            },
          },
          {
            "@type": "Question",
            name: "Can a senior citizen cancel a registered Gift Deed in Karnataka if the child stops caring?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A registered Gift Deed is normally final under Section 126 of the Transfer of Property Act. However, under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, a senior citizen can apply to the Assistant Commissioner Tribunal to cancel the gift if the deed had an express care and maintenance clause that the child breached.",
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
        <KarnatakaStampDutyClient />
        <Footer />
      </div>
    </>
  );
}
