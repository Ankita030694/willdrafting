import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProbateLawyerClient from "./ProbateLawyerClient";

export const metadata: Metadata = {
  title: {
    absolute: "Probate of Will Lawyers India: Get Court Probate Fast",
  },
  description:
    "Hire expert probate lawyers in India. We handle High Court probate petitions, contested Wills, and Letters of Administration with complete legal backing.",
  keywords: [
    "probate of will lawyer",
    "probate services",
    "probate lawyer india",
    "probate petition india",
    "letters of administration lawyer",
    "contested will lawyer",
    "high court probate petition",
    "bombay high court probate lawyer",
    "calcutta high court probate advocate",
    "madras high court probate petition",
    "delhi district court probate",
    "section 213 indian succession act",
    "section 222 executor probate",
    "section 276 probate petition",
    "ama legal solutions probate services",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/service/probate-lawyer",
    languages: {
      "en-IN": "https://www.willdrafting.in/service/probate-lawyer",
      "x-default": "https://www.willdrafting.in/service/probate-lawyer",
    },
  },
  openGraph: {
    title: "Probate of Will Lawyers India: Get Court Probate Fast",
    description:
      "Hire expert probate lawyers in India. We handle High Court probate petitions, contested Wills, and Letters of Administration with complete legal backing.",
    url: "https://www.willdrafting.in/service/probate-lawyer",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/probate-lawyer-og.jpg",
        width: 1376,
        height: 768,
        alt: "Probate of Will Lawyers in India High Court Testamentary Petitions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Probate of Will Lawyers India: Get Court Probate Fast",
    description:
      "Hire expert probate lawyers in India. We handle High Court probate petitions, contested Wills, and Letters of Administration with complete legal backing.",
    images: ["https://www.willdrafting.in/images/probate-lawyer-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ProbateLawyerPage() {
  const canonicalUrl = "https://www.willdrafting.in/service/probate-lawyer";
  const imageUrl = "https://www.willdrafting.in/images/probate-lawyer-og.jpg";

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
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "AMA Legal Solutions Probate & Testamentary Practice",
        url: canonicalUrl,
        logo: "https://www.willdrafting.in/Logofinal.svg",
        image: imageUrl,
        description:
          "Pan-India testamentary legal counsel specializing in High Court and District Court probate petitions, Letters of Administration, and contested Will litigation.",
        priceRange: "₹₹₹",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
          addressLocality: "New Delhi",
          streetAddress: "Barakhamba Road, Connaught Place",
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Probate & Estate Administration Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Uncontested Will Probate Petition",
                description: "End-to-end representation for uncontested probate petitions before High Courts and District Courts.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Contested Will Defense & Caveat Litigation",
                description: "Trial advocacy and defense against caveats, allegations of fraud, coercion, or lack of testamentary capacity.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Letters of Administration",
                description: "Legal representation for estate administration where deceased died intestate or no executor was named.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "NRI Ancillary Probate Under Section 228",
                description: "Validation and court grant for foreign Wills covering immovable or financial assets in India.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Probate of Will Lawyers India: Get Court Probate Fast",
        description:
          "Hire expert probate lawyers in India. We handle High Court probate petitions, contested Wills, and Letters of Administration with complete legal backing.",
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
            name: "Services",
            item: "https://www.willdrafting.in/service",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Probate Lawyer India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the legal definition of probate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 2(f) of the Indian Succession Act, 1925, probate is a certified copy of a Will under a court seal. It gives the named executor the legal right to handle the deceased person's estate and assets.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate mandatory for all Wills across India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 57 and Section 213 of the Indian Succession Act, probate is compulsory only in Mumbai, Kolkata, and Chennai. It applies to Hindu, Buddhist, Sikh, and Jain Wills made in these cities or covering land there. Outside these cities, probate is voluntary by law. Still, banks and buyers often ask for probate before they release large assets.",
            },
          },
          {
            "@type": "Question",
            name: "Who has the legal right to apply for probate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 222, only the executor named in the Will can get probate. If the Will does not name an executor, or if the executor dies, the heirs must apply for Letters of Administration under Section 232 instead.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Probate and Letters of Administration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Probate is granted only to the executor named in a Will. Letters of Administration are granted to legal heirs when there is no Will or when no executor is active. Both orders give legal authority over land, money, and property.",
            },
          },
          {
            "@type": "Question",
            name: "What is the maximum court fee payable for probate in Mumbai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Maharashtra Court Fees Act, probate fees are based on the net value of the estate. Crucially, the fee is capped at a maximum of ₹75,000 in Mumbai. This cap protects families with large estates.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take to obtain a grant of probate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An uncontested probate petition usually takes 5 to 9 months. If a relative files a caveat or objection, the case becomes a contested suit. Contested cases can take 18 to 36 months depending on court schedules.",
            },
          },
          {
            "@type": "Question",
            name: "Can a legal heir challenge a Will during probate proceedings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Any legal heir can file a caveat under Section 284 of the Indian Succession Act within the 30-day notice window. The court then treats the matter as a contested case and checks the Will for genuine consent and sound mind.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI executor apply for probate without traveling to India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An NRI executor can sign a Special Power of Attorney abroad. The document must be apostilled or verified at the Indian Embassy. Their advocate can then file and run the probate petition in India without requiring travel.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the original Will is lost or misplaced?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 237 of the Indian Succession Act, a court can grant probate on a copy of a lost Will. The petitioner must prove that the Will was signed properly and was not destroyed or cancelled by the person.",
            },
          },
          {
            "@type": "Question",
            name: "Do banks and mutual funds always require probate in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Not always. For smaller bank accounts with nominees, banks pay out under RBI rules. But when amounts are high, when family claims clash, or when a Will is unregistered, banks often insist on court probate before paying out.",
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
      <ProbateLawyerClient />
      <Footer />
    </>
  );
}
