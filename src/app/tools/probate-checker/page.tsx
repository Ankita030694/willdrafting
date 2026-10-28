import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProbateCheckerClient from "./ProbateCheckerClient";

export const metadata: Metadata = {
  title: {
    absolute: "Is Probate Required in India? Free Probate Checker Tool",
  },
  description:
    "Check if probate is required for your Will in India. Use our free diagnostic tool for Mumbai, Chennai, Kolkata rules, bank demands, and.",
  keywords: [
    "is probate required in india",
    "probate required states india",
    "do I need probate",
    "probate checker tool",
    "will probate rules",
    "section 213 indian succession act",
    "section 57 presidential towns probate",
    "letters of administration vs probate",
    "probate mandatory cities india",
    "mumbai high court probate mandatory",
    "bank demanding probate india",
    "ama legal solutions probate checker",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/probate-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/probate-checker",
      "x-default": "https://www.willdrafting.in/tools/probate-checker",
    },
  },
  openGraph: {
    title: "Is Probate Required in India? Free Probate Checker Tool",
    description:
      "Check if probate is required for your Will in India. Use our free diagnostic tool for Mumbai, Chennai, Kolkata rules, bank demands, and.",
    url: "https://www.willdrafting.in/tools/probate-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/probate-checker-og.jpg",
        width: 1200,
        height: 675,
        alt: "Is Probate Required in India Diagnostic Framework and Checker Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Is Probate Required in India? Free Probate Checker Tool",
    description:
      "Check if probate is required for your Will in India. Use our free diagnostic tool for Mumbai, Chennai, Kolkata rules, bank demands, and.",
    images: ["https://www.willdrafting.in/images/probate-checker-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ProbateCheckerPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/probate-checker";
  const imageUrl = "https://www.willdrafting.in/images/probate-checker-og.jpg";

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
        name: "Is Probate Required in India? Free Probate Checker Tool",
        description:
          "Check if probate is required for your Will in India. Use our free diagnostic tool for Mumbai, Chennai, Kolkata rules, bank demands, and.",
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
            name: "Probate Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "Indian Will Probate Requirement Checker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Interactive diagnostic legal tool to calculate whether probate is mandatory, recommended, or unnecessary under Section 57 and Section 213 of.",
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
            name: "What is probate of a Will in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 2(f) of the Indian Succession Act, 1925, probate is an official copy of a Will certified under the seal of a court of competent jurisdiction, accompanied by a grant of administration to the estate of the deceased testator. It establishes conclusive proof of the Will's legal validity and the executor's authority against the entire world.",
            },
          },
          {
            "@type": "Question",
            name: "Where is probate strictly mandatory in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 57 and Section 213 of the Indian Succession Act, 1925, probate is legally mandatory only for Wills made by Hindus, Buddhists, Sikhs, and Jains if the Will was executed within the historic ordinary original civil jurisdiction of Mumbai, Chennai, or Kolkata, or if it relates to immovable property situated in those three cities.",
            },
          },
          {
            "@type": "Question",
            name: "Is probate required for property in Delhi, Bengaluru, or other cities?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Outside Mumbai, Chennai, and Kolkata, probate is not legally mandatory for Hindu, Sikh, Jain, or Buddhist Wills. The Supreme Court in Kanta Yadav v. Om Prakash Yadav (2020) confirmed that Section 213 does not apply in states like Delhi, Haryana, Punjab, Karnataka, or Uttar Pradesh. An unprobated Will is fully valid for property transfer.",
            },
          },
          {
            "@type": "Question",
            name: "Why do banks and housing societies still demand probate in non-mandatory states?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Banks and cooperative housing societies often demand probate or Letters of Administration to protect themselves from rival legal heir claims. While law does not mandate probate in these areas, institutions exercise internal risk caution. Beneficiaries can frequently avoid probate by submitting an Indemnity Bond, NOC from all legal heirs, and a legal opinion.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a Will does not name an executor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 222 of the Indian Succession Act, probate can only be granted to an executor explicitly appointed in the Will. If no executor is named, or if the named executor has died or renounced their duties, beneficiaries must petition for Letters of Administration with Will Annexed under Section 232 or 234.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Probate and Letters of Administration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Probate is granted exclusively to a named executor under a valid Will. Letters of Administration are granted when there is no named executor, the executor cannot act, or the deceased died intestate (without any Will). Both documents give court-certified authority to administer the estate.",
            },
          },
          {
            "@type": "Question",
            name: "Can an unregistered Will written on plain paper be probated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 18 of the Registration Act, 1908, Will registration is optional. An unregistered Will executed on plain A4 paper in compliance with Section 63 (signed by the testator before two witnesses) is 100% valid and can be probated by any competent High Court or District Court.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Probate and a Succession Certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Probate covers both movable and immovable assets specified in a Will. A Succession Certificate is issued under Part X of the Indian Succession Act exclusively for movable debts and securities (such as bank deposits, shares, and mutual funds) when there is no Will or when only movable assets need clearance. A Succession Certificate cannot be issued for real estate.",
            },
          },
          {
            "@type": "Question",
            name: "How much does court fee cost for a probate petition in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Court fees vary by state Court Fees Acts. In Maharashtra (Bombay High Court), probate fees are capped at a maximum of ₹75,000 under Schedule I, Article 11. In other states like West Bengal, Tamil Nadu, and Delhi, court fees are charged on an ad valorem percentage ranging between 2% and 5.5% of net estate value.",
            },
          },
          {
            "@type": "Question",
            name: "Do Non-Resident Indians (NRIs) need an Indian probate for foreign Wills?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. If an NRI leaves a foreign Will probated in the US, UK, Canada, or UAE, Indian institutions will not automatically accept the foreign grant for Indian property. Under Section 228 of the Indian Succession Act, 1925, an ancillary petition for Letters of Administration with authenticated copy of the foreign Will must be filed in an Indian court.",
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
      <ProbateCheckerClient />
      <Footer />
    </>
  );
}
