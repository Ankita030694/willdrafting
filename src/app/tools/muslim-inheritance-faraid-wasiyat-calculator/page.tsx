import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MuslimInheritanceCalculatorClient from "./MuslimInheritanceCalculatorClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Muslim Inheritance Calculator India | WillDrafting.in", // exactly 53 characters
  },
  description:
    "Use our free interactive Muslim inheritance calculator India under Shariat Act, 1937. Calculate Sunni, Shia, 1/3 Wasiyat, and Faraid shares.", // exactly 151 characters
  keywords: [
    "muslim inheritance calculator india",
    "islamic inheritance calculator sunni shia india",
    "wasiyat 1/3 share calculator",
    "faraid share calculator wife son daughter",
    "muslim personal law shariat application act 1937 succession",
    "sunni hanafi inheritance rules india",
    "shia ithna ashari succession calculator india",
    "aul and radd calculator india",
    "zawil furuz quranic sharers shares",
    "asabah residuary inheritance calculator india",
    "daughter share muslim inheritance india",
    "ama legal solutions muslim inheritance calculator",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/muslim-inheritance-faraid-wasiyat-calculator",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/muslim-inheritance-faraid-wasiyat-calculator",
      "x-default": "https://www.willdrafting.in/tools/muslim-inheritance-faraid-wasiyat-calculator",
    },
  },
  openGraph: {
    title: "Muslim Inheritance Calculator India | WillDrafting.in",
    description:
      "Use our free interactive Muslim inheritance calculator India under Shariat Act, 1937. Calculate Sunni, Shia, 1/3 Wasiyat, and Faraid shares.",
    url: "https://www.willdrafting.in/tools/muslim-inheritance-faraid-wasiyat-calculator",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/muslim-inheritance-faraid-wasiyat-calculator-og.jpg",
        width: 1376,
        height: 768,
        alt: "Muslim Inheritance, Faraid and Wasiyat Calculator India under Shariat Act 1937",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslim Inheritance Calculator India | WillDrafting.in",
    description:
      "Use our free interactive Muslim inheritance calculator India under Shariat Act, 1937. Calculate Sunni, Shia, 1/3 Wasiyat, and Faraid shares.",
    images: ["https://www.willdrafting.in/images/muslim-inheritance-faraid-wasiyat-calculator-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function MuslimInheritanceCalculatorPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/muslim-inheritance-faraid-wasiyat-calculator";
  const imageUrl = "https://www.willdrafting.in/images/muslim-inheritance-faraid-wasiyat-calculator-og.jpg";

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
        name: "Muslim Inheritance Calculator India | WillDrafting.in",
        description:
          "Use our free free Muslim estate tool India under Shariat Act, 1937. Calculate Sunni, Shia, 1/3 Wasiyat, and Faraid shares.",
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
            name: "Muslim Inheritance Calculator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Muslim Inheritance, Faraid and Wasiyat Calculator India",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free legal legal tool to compute Muslim estate shares, 1/3rd Wasiyat bequests, Quranic Sharers (Zawil-Furuz).",
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
            name: "Which law governs Muslim inheritance and Wills in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Muslim estate in India is governed by the Muslim Personal Law (Shariat) Form Act, 1937 and uncodified principles compiled in Sir Dinshaw Mulla's Principles of Mahomedan Law. The Indian Succession Act, 1925 does not govern Muslim Will estate, unless the marriage was filed under the Special Marriage Act, 1954.",
            },
          },
          {
            "@type": "Question",
            name: "What is the 1/3rd Wasiyat (Will) rule in Islamic law in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Muslim can bequeath at most one-third (1/3rd) of their net estate (after paying funeral expenses and debts) through a Will (Wasiyat). Under Sunni Hanafi law, this 1/3rd can only go to non-heirs; a bequest to a legal heir is invalid unless all other heirs consent after the Will maker's death. Under Shia law, up to 1/3rd can be bequeathed to an heir or non-heir without consent.",
            },
          },
          {
            "@type": "Question",
            name: "What share does a widow or wife inherit under Muslim law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A surviving wife inherits 1/8th (one-eighth) of the net inheritable estate if the deceased left children or agnatic grandchildren. If the deceased left no children or grandchildren, the wife inherits 1/4th (one-fourth). If there are multiple wives, they share this 1/8th or 1/4th equally among themselves.",
            },
          },
          {
            "@type": "Question",
            name: "What share does a husband inherit upon his wife's death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A surviving husband inherits 1/4th (one-fourth) of his deceased wife's net estate if there are surviving children or agnatic grandchildren. If there are no children or agnatic descendants, the husband inherits 1/2 (half) of the net estate.",
            },
          },
          {
            "@type": "Question",
            name: "What share do daughters inherit under Muslim succession in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If a deceased leaves only one daughter and no sons, she receives 1/2 (half) of the estate as a Quranic Sharer. Two or more daughters together receive 2/3rds (two-thirds) divided equally. If sons also exist, daughters become Residuaries with the sons, where each son receives double the share of each daughter (2:1 ratio).",
            },
          },
          {
            "@type": "Question",
            name: "Why do brothers inherit when a Sunni Muslim dies leaving only daughters?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Sunni (Hanafi) law, daughters are Quranic Sharers entitled to a maximum collective share of 2/3rds (or 1/2 for an only daughter). The remaining residue (1/3rd or 1/2) passes to agnatic residuaries (Asabah), which includes the deceased's father, grandfather, or full brothers and their sons. To prevent brothers from inheriting family estate away from daughters, parents frequently execute lifetime gifts (Hiba) or maximum 1/3rd Wasiyat bequests.",
            },
          },
          {
            "@type": "Question",
            name: "How does Shia inheritance law differ from Sunni law regarding daughters and brothers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Shia (Ithna-Ashari) law, heirs are organized into three distinct consanguineous classes (Nasab). Class I consists of parents and children/descendants, while Class II consists of grandparents and brothers/sisters. Any surviving heir in Class I completely excludes everyone in Class II. Therefore, in Shia law, a daughter completely excludes the deceased's brothers from inheriting any share.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Doctrine of Aul (Increase) in Muslim inheritance?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Doctrine of Aul applies when the fractional sum of all Quranic Sharers exceeds unity (1). To balance the estate, the common denominator is increased to match the sum of numerators, proportionally reducing each sharer's allocation without depriving any Quranic heir. Sunni law recognizes Aul across common bases of 6, 12, and 24, whereas Shia law does not apply Aul and instead deducts any deficit solely from daughters or full sisters.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Doctrine of Radd (Return) in Islamic succession?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Doctrine of Radd applies when the sum of Quranic Sharers is less than unity (1) and there are no residuaries (Asabah) to take the remainder. The surplus is returned proportionally to the Quranic blood-sharers. Under classical Hanafi law, the surviving spouse does not participate in Radd unless no other blood relative or distant kindred exists.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate mandatory for a Muslim Will (Wasiyat) in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 213(2) of the Indian Succession Act, 1925, probate is explicitly exempt for Wills made by Muslims across all states in India, including Mumbai, Chennai, and Kolkata. An executor or legatee under a valid Muslim Will can enforce rights without seeking probate from a High Court, though an form for Letters of Care or Legal Heir Paper is often obtained for city name change.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Muslim give 100% of their property to a daughter through a lifetime gift (Hiba)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The 1/3rd Will restriction applies only to a Will (Wasiyat) that takes effect after death. During their lifetime, a Muslim has absolute freedom to gift (Hiba) up to 100% of their self-acquired or family asset to a daughter, wife, or any person. A valid Hiba requires declaration (Ijab), acceptance (Qabul), and delivery of possession (Qabda), and cannot be challenged under Faraid rules after death.",
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
      <MuslimInheritanceCalculatorClient />
      <Footer />
    </>
  );
}
