import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TamilNaduPattaCheckerClient from "./TamilNaduPattaCheckerClient";

// Screaming Frog Rules: Title 50-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Tamil Nadu Patta Chitta Transfer Checker | WillDrafting", // 55 characters
  },
  description:
    "Check Tamil Nadu Patta & Chitta name transfer after death. Compare Full, Joint & FMB Sub-Division rules, e-Sevai fees, VAO/RI steps & legal heir papers.", // 152 characters
  keywords: [
    "tamil nadu patta transfer after death checker",
    "tamil nadu patta chitta name transfer checker",
    "tneservices patta name transfer documents",
    "legal heir patta transfer tamil nadu",
    "joint patta sub division checker tamil nadu",
    "tamil nadu patta pass book act 1983 section 10",
    "go ms no 478 tamil nadu legal heir certificate varisu",
    "tamil nilam e sevai patta transfer fee 60 400 500 600",
    "patta transfer by will chennai section 213 repealed 2025",
    "fmb subdivision patta transfer vao ri tahsildar workflow",
    "rdo dro patta appeal section 12 section 13 tamil nadu",
    "willdrafting tamil nadu patta chitta checker",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/tamil-nadu-patta-chitta-name-transfer-checker",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/tamil-nadu-patta-chitta-name-transfer-checker",
      "x-default":
        "https://www.willdrafting.in/tools/tamil-nadu-patta-chitta-name-transfer-checker",
    },
  },
  openGraph: {
    title: "Tamil Nadu Patta Chitta Transfer Checker | WillDrafting",
    description:
      "Check Tamil Nadu Patta & Chitta name transfer after death. Compare Full, Joint & FMB Sub-Division rules, e-Sevai fees, VAO/RI steps & legal heir papers.",
    url: "https://www.willdrafting.in/tools/tamil-nadu-patta-chitta-name-transfer-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/tamil-nadu-patta-chitta-name-transfer-checker-og.jpg",
        width: 1200,
        height: 630,
        alt: "Tamil Nadu Patta and Chitta name transfer checker for legal heirs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Tamil Nadu Patta Chitta Transfer Checker | WillDrafting",
    description:
      "Check Tamil Nadu Patta & Chitta name transfer after death. Compare Full, Joint & FMB Sub-Division rules, e-Sevai fees, VAO/RI steps & legal heir papers.",
    images: [
      "https://www.willdrafting.in/images/tamil-nadu-patta-chitta-name-transfer-checker-og.jpg",
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

export default function TamilNaduPattaChittaTransferCheckerPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/tamil-nadu-patta-chitta-name-transfer-checker";
  const imageUrl =
    "https://www.willdrafting.in/images/tamil-nadu-patta-chitta-name-transfer-checker-og.jpg";

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
        name: "Tamil Nadu Patta Chitta Transfer Checker | WillDrafting",
        description:
          "Check Tamil Nadu Patta & Chitta name transfer after death. Compare Full, Joint & FMB Sub-Division rules, e-Sevai fees, VAO/RI steps & legal heir papers.",
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
            name: "Tamil Nadu Patta & Chitta Name Transfer Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Tamil Nadu Patta & Chitta Name Transfer Checker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free checker for Tamil Nadu Patta and Chitta name transfer after death, sale, or Will. Estimates official Tamil Nilam e-Sevai fees, FMB survey timelines, VAO/RI workflow, and required papers.",
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
            name: "Can I transfer Patta in Tamil Nadu using only a registered Will without a Legal Heir Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, in practice the Tahsildar still asks for the Legal Heir Certificate (Varisu Certificate) along with the Death Certificate and Will. Under Section 10(3) of the Tamil Nadu Patta Pass Book Act, 1983 and Revenue Standing Order 31, the Tahsildar must send a notice to all natural legal heirs and hear any objection before changing the Patta.",
            },
          },
          {
            "@type": "Question",
            name: "Is Probate still mandatory in Chennai for Patta transfer based on a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Parliament passed the Repealing and Amending Act, 2025 (assented on December 20, 2025), which omitted Section 213 of the Indian Succession Act, 1925. Statutory mandatory probate no longer applies in Chennai. However, if any legal heir objects to the Will, the Tahsildar will pause mutation and direct the parties to get a Civil Court decree or voluntary probate.",
            },
          },
          {
            "@type": "Question",
            name: "What is the official fee for Tamil Nadu Patta name transfer on e-Sevai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The standard e-Sevai portal service charge is Rs 60 for a Patta transfer without subdivision (NISD). When a survey split and FMB sketch are needed (ISD), official subdivision survey charges under G.O. (Ms) No. 370 apply: Rs 400 in rural areas, Rs 500 in municipalities, and Rs 600 in municipal corporations, plus the Rs 60 e-Sevai fee.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Joint Patta and FMB Sub-Division Patta?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Joint Patta lists all legal heirs together under one survey number without splitting the land on the map. It needs no field survey and usually takes 15 to 30 days. A Sub-Division Patta (ISD) splits a survey number into smaller plots with a new FMB sketch measured by a Firka Surveyor, taking 30 to 60 days.",
            },
          },
          {
            "@type": "Question",
            name: "Can Class-II heirs like brothers or sisters get a Legal Heir Certificate for Patta transfer in Tamil Nadu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Tamil Nadu G.O. (Ms) No. 478 (September 29, 2022) and its fine-tuning under G.O. (Ms) No. 110 (March 13, 2024), Tahsildars process Legal Heir Certificates through e-Sevai for both direct Class-I heirs and eligible Class-II heirs when no Class-I heir survives.",
            },
          },
          {
            "@type": "Question",
            name: "How long does Tamil Nadu Patta transfer take under the 1987 Rules?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Rule 9 of the Tamil Nadu Patta Pass Book Rules, 1987 and Revenue norms, transfers without subdivision (NISD) have a 15-day norm and transfers with subdivision (ISD) have a 30-day norm. Under Rule 4(2), when a formal inquiry notice is issued to heirs, the notice window is 15 to 40 days.",
            },
          },
          {
            "@type": "Question",
            name: "Does Patta transfer happen automatically after registering a deed on TNREGINET?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Auto-mutation via TNREGINET and Tamil Nilam works when a full survey field is transferred by a registered Sale, Gift, or Settlement Deed and the seller holds an exact matching individual Patta. Death inheritance cases, Joint Pattas, and partial plot splits always need a manual e-Sevai application.",
            },
          },
          {
            "@type": "Question",
            name: "What can I do if the Tahsildar rejects my Patta transfer application?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can file a first appeal before the Revenue Divisional Officer (RDO) under Section 12 of the Tamil Nadu Patta Pass Book Act, 1983 (Rule 14). Against an RDO order, you can file a revision before the District Revenue Officer (DRO) under Section 13. If there is a title fight, you must file a declaration suit in a Civil Court under the Proviso to Section 14.",
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
        <TamilNaduPattaCheckerClient />
        <Footer />
      </div>
    </>
  );
}
