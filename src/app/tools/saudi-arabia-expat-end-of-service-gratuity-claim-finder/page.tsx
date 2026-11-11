import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SaudiGratuityClaimClient from "./SaudiGratuityClaimClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Saudi Expat Death Benefits Claim Tool | WillDrafting", // exactly 52 characters
  },
  description:
    "Check mandatory documents and procedures to claim Saudi End of Service Gratuity, bank funds, and Diya compensation for Indian expat legal heirs.", // exactly 144 characters
  keywords: [
    "saudi expat death benefits claim checklist india",
    "saudi end of service gratuity death claim process",
    "diya blood money claim checklist saudi arabia",
    "ksa expat bank account claim nominee india",
    "saudi labor law royal decree m51 article 84 eosb",
    "indian embassy riyadh power of attorney wakkala",
    "mofa apostille saudi arabia indian legal heirs",
    "gosi occupational hazards death compensation india",
    "how to claim dead brother gratuity saudi arabia",
    "indian succession act 1925 cross border claim",
    "saudi bank account deceased claim legal heirs",
    "ama legal solutions cross border estate repatriation",
  ],
  alternates: {
    canonical:
      "https://www.willdrafting.in/tools/saudi-arabia-expat-end-of-service-gratuity-claim-finder",
    languages: {
      "en-IN":
        "https://www.willdrafting.in/tools/saudi-arabia-expat-end-of-service-gratuity-claim-finder",
      "x-default":
        "https://www.willdrafting.in/tools/saudi-arabia-expat-end-of-service-gratuity-claim-finder",
    },
  },
  openGraph: {
    title: "Saudi Expat Death Benefits Claim Tool | WillDrafting",
    description:
      "Check mandatory documents and procedures to claim Saudi End of Service Gratuity, bank funds, and Diya compensation for Indian expat legal heirs.",
    url: "https://www.willdrafting.in/tools/saudi-arabia-expat-end-of-service-gratuity-claim-finder",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/saudi-arabia-expat-end-of-service-gratuity-claim-finder-og.jpg",
        width: 1200,
        height: 675,
        alt: "Saudi Expat Death Benefits & End of Service Gratuity Claim Finder Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saudi Expat Death Benefits Claim Tool | WillDrafting",
    description:
      "Check mandatory documents and procedures to claim Saudi End of Service Gratuity, bank funds, and Diya compensation for Indian expat legal heirs.",
    images: [
      "https://www.willdrafting.in/images/saudi-arabia-expat-end-of-service-gratuity-claim-finder-og.jpg",
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

export default function SaudiExpatGratuityClaimFinderPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/tools/saudi-arabia-expat-end-of-service-gratuity-claim-finder";
  const imageUrl =
    "https://www.willdrafting.in/images/saudi-arabia-expat-end-of-service-gratuity-claim-finder-og.jpg";

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
        name: "Saudi Expat Death Benefits Claim Tool | WillDrafting",
        description:
          "Check mandatory documents and procedures to claim Saudi End of Service Gratuity, bank funds, and Diya compensation for Indian expat legal heirs.",
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
            name: "Saudi Expat Death Benefits Claim Finder",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Saudi Arabia Expat End of Service Gratuity & Death Benefits Claim Finder",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free diagnostic tool to calculate Saudi End of Service Benefits (EOSB) under Royal Decree M/51, generate Embassy Power of Attorney checklists, and trace Diya compensation for Indian legal heirs.",
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
            name: "How can Indian legal heirs claim Saudi End of Service Benefits (EOSB)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Articles 84-88 of Saudi Labor Law (Royal Decree M/51), full End of Service Gratuity is 100% payable upon employee death. Indian legal heirs must obtain a Legal Heir Certificate in India, authenticate it via State Home Department, MEA New Delhi, and the Saudi Embassy, and grant Power of Attorney (Wakkala) to a representative or the Indian Embassy in Riyadh/Jeddah to submit the claim to the Ministry of Human Resources.",
            },
          },
          {
            "@type": "Question",
            name: "Can our family in India claim Diya (blood money) for accidental death in Saudi Arabia?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In cases of fatal road traffic accidents or employer negligence, Sharia courts in Saudi Arabia award Diya (blood money). The standard benchmark for unintentional accidental death is SAR 300,000. Indian heirs must file a Power of Attorney authorizing the Indian Embassy or a Saudi lawyer to represent them before the Traffic Court (Muroor) and General Court.",
            },
          },
          {
            "@type": "Question",
            name: "Does a nominee on a Saudi bank account receive the funds directly?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Saudi banking regulations governed by SAMA (Saudi Central Bank) do not recognize Indian bank nominee nominations or foreign Will executors directly. The deceased expat's account is frozen immediately. Funds are only released through a Sharia Court inheritance distribution order or via a consular-attested Power of Attorney.",
            },
          },
          {
            "@type": "Question",
            name: "How is Saudi End of Service Gratuity calculated upon death?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Article 84, EOSB is calculated as 15 days of last basic wage plus allowances per year for the first 5 years of service, and 30 days of wage per year for every year thereafter. Under Article 87, death entitles heirs to 100% full gratuity without any resignation penalty deductions.",
            },
          },
          {
            "@type": "Question",
            name: "What is the 5-stage attestation pipeline for Indian succession documents in KSA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The five mandatory stages are: (1) Local Revenue Authority / Civil Court in India for Legal Heir Certificate, (2) State Home Department / GAD / NORKA attestation, (3) Ministry of External Affairs (MEA) CPV Division in New Delhi, (4) Royal Embassy of Saudi Arabia in New Delhi or Consulate in Mumbai, and (5) Ministry of Foreign Affairs (MOFA) Tasdeeq in Saudi Arabia accompanied by certified Arabic translation.",
            },
          },
          {
            "@type": "Question",
            name: "Who can represent an Indian family in Saudi Arabia if they cannot travel?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Indian families can appoint either: (1) A trusted blood relative or colleague residing in Saudi Arabia holding a valid Iqama, (2) The Community Welfare / Labour Wing of the Indian Embassy in Riyadh or Consulate General in Jeddah, or (3) A licensed Saudi advocate through an attested Power of Attorney.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the Saudi employer refuses to pay End of Service gratuity?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If an employer fails to settle dues within one week of death under Article 88, the appointed representative or Indian Embassy can file a formal labor dispute via the Qiwa portal and escalate it to the Saudi Labor Court. The Labor Court can issue enforcement orders, freeze employer bank accounts, and attach company assets.",
            },
          },
          {
            "@type": "Question",
            name: "Are funds claimed from Saudi Arabia taxable upon repatriation to India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 56(2)(x) of the Indian Income Tax Act 1961, money received by legal heirs through inheritance, death gratuity, or court compensation is completely exempt from income tax in India. Families must maintain the MOFA-attested paperwork and foreign inward remittance certificate (FIRC).",
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
        <SaudiGratuityClaimClient />
        <Footer />
      </div>
    </>
  );
}
