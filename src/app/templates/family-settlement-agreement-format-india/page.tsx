import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FamilySettlementAgreementClient from "./FamilySettlementAgreementClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Family Settlement Agreement Format India | WillDrafting", // exactly 54 characters
  },
  description:
    "Download legally valid family settlement agreement format in India. Access past oral memorandum, deed templates, stamp duty rules, and Kale.", // exactly 151 characters
  keywords: [
    "family settlement agreement format india",
    "memorandum of family settlement format word pdf",
    "family arrangement deed format india",
    "oral family settlement memorandum template",
    "kale v deputy director of consolidation",
    "korukonda chalapathi rao 2021 sc family settlement",
    "section 17 registration act family settlement",
    "partition deed vs family arrangement stamp duty",
    "hindu undivided family settlement deed draft",
    "ancestral property settlement agreement format",
    "past oral partition yadasht format india",
    "ama legal solutions family settlement lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/family-settlement-agreement-format-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/family-settlement-agreement-format-india",
      "x-default": "https://www.willdrafting.in/templates/family-settlement-agreement-format-india",
    },
  },
  openGraph: {
    title: "Family Settlement Agreement Format India | WillDrafting",
    description:
      "Download legally valid family settlement agreement format in India. Access past oral memorandum, deed templates, stamp duty rules, and Kale.",
    url: "https://www.willdrafting.in/templates/family-settlement-agreement-format-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/family-settlement-agreement-format-india-og.jpg",
        width: 1200,
        height: 675,
        alt: "Family Settlement Agreement Format India Legal Templates and Supreme Court Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Settlement Agreement Format India | WillDrafting",
    description:
      "Download legally valid family settlement agreement format in India. Access past oral memorandum, deed templates, stamp duty rules, and Kale.",
    images: ["https://www.willdrafting.in/images/family-settlement-agreement-format-india-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function FamilySettlementAgreementPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/family-settlement-agreement-format-india";
  const imageUrl = "https://www.willdrafting.in/images/family-settlement-agreement-format-india-og.jpg";

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
        name: "Family Settlement Agreement Format India | WillDrafting",
        description:
          "Download legally valid family settlement agreement format in India. Access past oral memorandum, deed templates, stamp duty rules, and Kale.",
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
            name: "Family Settlement Agreement Format India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Family Settlement Agreement & Memorandum Formats India",
        url: canonicalUrl,
        description:
          "Lawyer-vetted family settlement agreement templates for Indian families dividing ancestral and self-acquired properties, featuring past oral.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        image: imageUrl,
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
            name: "What is a Family Settlement Agreement in Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Family Settlement Agreement (or Family Arrangement) is an amicable agreement among family members who possess some antecedent title, claim, or interest in shared or ancestral property. It resolves rival claims, avoids protracted partition litigation, and maintains family peace without creating new titles.",
            },
          },
          {
            "@type": "Question",
            name: "Is registration mandatory for a Family Settlement Agreement in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It depends entirely on the drafting tense and purpose. Under the Supreme Court ruling in Kale v. Deputy Director of Consolidation (1976), if the document merely records an antecedent past oral partition as a Memorandum (Yadasht), it does not create rights in praesenti and does NOT require registration under Section 17(1)(b) of the Registration Act. However, if the agreement itself divides property or extinguishes rights on the spot, registration and full stamp duty are mandatory.",
            },
          },
          {
            "@type": "Question",
            name: "How much stamp duty is payable on a family settlement deed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A registered Operative Partition Deed or Family Settlement Deed attracts full stamp duty under the relevant State Stamp Act (typically 2% to 6% of the market or circle rate value of the separated shares). In contrast, a Memorandum of Past Oral Settlement recorded on non-judicial stamp paper attracts only standard agreement stamp duty (typically Rs. 100 to Rs. 500 depending on state amendments).",
            },
          },
          {
            "@type": "Question",
            name: "What is the five-point test laid down in Kale v. Deputy Director of Consolidation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Supreme Court in Kale v. Deputy Director (AIR 1976 SC 807) held: (1) The settlement must be bona fide to resolve family disputes; (2) The division must be fair and equitable; (3) It must be voluntary without fraud, coercion, or undue influence; (4) It may be oral in the first instance, followed by a written memorandum; and (5) The parties must have antecedent title, claim, or interest in the property.",
            },
          },
          {
            "@type": "Question",
            name: "Can an unregistered family settlement memorandum be used in court?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under the Supreme Court rulings in Korukonda Chalapathi Rao (2021) and Subraya M.N. v. Vittala M.N. (2016), an unregistered memorandum of past oral family settlement is fully admissible under the proviso to Section 49 of the Registration Act for collateral purposes, including proving the nature and character of possession and the severance of joint family status.",
            },
          },
          {
            "@type": "Question",
            name: "Does a family settlement attract capital gains tax under Income Tax Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 47(i) of the Income Tax Act, 1961, any distribution of capital assets on total or partial partition of a Hindu Undivided Family (HUF) or bona fide family arrangement is expressly excluded from the definition of transfer under Section 45. Hence, no capital gains tax is payable when the settlement is executed.",
            },
          },
          {
            "@type": "Question",
            name: "Can a married daughter or sister claim share in a family settlement?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Following the Hindu Succession (Amendment) Act, 2005 and the Supreme Court judgment in Vineeta Sharma v. Rakesh Sharma (2020), daughters have equal coparcenary rights by birth in ancestral property. Any family settlement executed without the free, informed consent and signature of daughters or sisters is vulnerable to being set aside by civil courts.",
            },
          },
          {
            "@type": "Question",
            name: "What is an Owelty clause in a family settlement agreement?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Owelty clause provides for monetary equalization when immovable properties cannot be divided into mathematically equal physical parcels. The party receiving a more valuable physical share pays a specified cash compensation (owelty) to the other parties to equalize their statutory entitlements.",
            },
          },
          {
            "@type": "Question",
            name: "How does the doctrine of estoppel apply to family settlements?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the landmark precedent in Subraya M.N. v. Vittala M.N. (2016), once family members enter into an oral settlement, sign a memorandum, and take possession or benefit of their allotted parcels, the doctrine of estoppel estops them from challenging the settlement or demanding a fresh partition later.",
            },
          },
          {
            "@type": "Question",
            name: "How do you mutate revenue records after executing a family settlement?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Parties submit the family settlement memorandum or registered deed along with a joint affidavit, death certificates of ancestors, and property tax receipts to the local revenue authority (Tehsildar for agricultural land or Municipal Corporation for urban property) to mutate the property card, Khata, or Dakhil Kharij into the respective individual names.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <Navbar />
      <FamilySettlementAgreementClient />
      <Footer />
    </>
  );
}
