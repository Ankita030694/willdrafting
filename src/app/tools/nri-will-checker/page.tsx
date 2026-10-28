import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NriWillCheckerClient from "./NriWillCheckerClient";

export const metadata: Metadata = {
  title: {
    absolute: "Do I Need an Indian Will? NRI Will Checker | WillDrafting",
  },
  description:
    "Do you need a separate Indian Will as an NRI? Use our free diagnostic checker to verify foreign Will validity, FEMA rules, and protect your.",
  keywords: [
    "do i need an indian will",
    "NRI will checker",
    "do NRI need separate will for India",
    "Indian will for NRI",
    "two will strategy NRI",
    "FEMA inheritance rules for NRI",
    "section 228 indian succession act",
    "foreign will probate in india",
    "lex loci rei sitae indian property",
    "nri property inheritance india",
    "nro account repatriation form 15ca 15cb",
    "ama legal solutions nri will",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/tools/nri-will-checker",
    languages: {
      "en-IN": "https://www.willdrafting.in/tools/nri-will-checker",
      "x-default": "https://www.willdrafting.in/tools/nri-will-checker",
    },
  },
  openGraph: {
    title: "Do I Need an Indian Will? NRI Will Checker | WillDrafting",
    description:
      "Do you need a separate Indian Will as an NRI? Use our free diagnostic checker to verify foreign Will validity, FEMA rules, and protect your.",
    url: "https://www.willdrafting.in/tools/nri-will-checker",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/nri-will-checker-og.jpg",
        width: 1200,
        height: 630,
        alt: "NRI Will Checker Diagnostic Tool for Cross-Border Succession and FEMA Compliance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Do I Need an Indian Will? NRI Will Checker | WillDrafting",
    description:
      "Do you need a separate Indian Will as an NRI? Use our free diagnostic checker to verify foreign Will validity, FEMA rules, and protect your.",
    images: ["https://www.willdrafting.in/images/nri-will-checker-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function NriWillCheckerPage() {
  const canonicalUrl = "https://www.willdrafting.in/tools/nri-will-checker";
  const imageUrl = "https://www.willdrafting.in/images/nri-will-checker-og.jpg";

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
        name: "Do I Need an Indian Will? NRI Will Checker | WillDrafting",
        description:
          "Do you need a separate Indian Will as an NRI? Use our free diagnostic checker to verify foreign Will validity, FEMA rules, and protect your.",
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
            name: "NRI Will Checker",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: "NRI Will Requirement Diagnostic Checker",
        url: canonicalUrl,
        applicationCategory: "LegalApplication",
        operatingSystem: "All",
        description:
          "Free cross-border estate diagnostic tool for NRIs, OCIs, and PIOs to determine if a separate Indian Will is legally necessary under.",
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
            name: "Do I need a separate Indian Will if I already have a Will abroad?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Indian real estate follows Indian succession law. Foreign court orders have no direct power over Indian land registries. If you rely only on a foreign Will, your family must apply to an Indian High Court under Section 228 of the Indian Succession Act. This process takes 14 to 30 months. A separate Indian Will avoids this delay completely.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Two-Will Strategy for Non-Resident Indians?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Two-Will Strategy means making two separate Wills. You make one Will for your foreign assets like your home or pension abroad. You make a second Will only for your Indian property and bank accounts. Each Will contains a clause confirming it does not cancel the other. This keeps both estates safe and independent.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI or OCI inherit agricultural land in India through a Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 6(5) of the Foreign Exchange Management Act (FEMA), an NRI or OCI can inherit farm land and farmhouses from a resident Indian. However, FEMA rules say you cannot sell or gift that farmland to another NRI. You can only sell it to an Indian citizen who lives in India.",
            },
          },
          {
            "@type": "Question",
            name: "Does an NRI have to travel to India to sign or register an Indian Will?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. You can sign your Indian Will in your country of residence on plain A4 paper. Under Section 63 of the Indian Succession Act, you only need to sign before two adult witnesses who are physically present with you. Will filing is a choice under Section 18 of the Filing Act. An plain Will on plain paper is 100% legal.",
            },
          },
          {
            "@type": "Question",
            name: "What is Section 228 of the Indian Succession Act, and why is it a problem?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Section 228 applies when a Will is proved in a foreign court. Indian banks and land registries do not accept foreign court decrees directly. Your heirs must file a second case in an Indian court for Letters of Care with Will Annexed. This process requires apostilled court records, newspaper notices, and court hearings that add heavy costs and 1 to 2 years of delays.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI appoint an overseas citizen or foreign resident as executor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, any adult of sound mind can be an executor under Section 222 of the Indian Succession Act. However, an executor living abroad may find it hard to visit Indian banks, tax offices, and land registries. We recommend naming a trusted relative in India or a legal firm as co-executor or alternate executor.",
            },
          },
          {
            "@type": "Question",
            name: "How does an accidental revocation happen between foreign and Indian Wills?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Many foreign Will templates say: 'I revoke all previous Wills made anywhere in the world.' If you sign a foreign Will with this clause, it cancels your Indian Will. To avoid this trap, your foreign Will must cover only foreign assets. Your Indian Will must state clearly that it applies only to assets in India.",
            },
          },
          {
            "@type": "Question",
            name: "How do NRI heirs repatriate money from inherited Indian assets abroad?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Reserve Bank of India allows NRI heirs to send up to 1 million US Dollars abroad each financial year from an NRO account. You can send funds from asset sales, bank deposits, and shares. Your chartered accountant must file Form 15CA and Form 15CB to certify tax compliance before the bank wires the funds.",
            },
          },
          {
            "@type": "Question",
            name: "Is a US Revocable Living Trust effective for real estate located in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Indian land registries and city bodies do not recognize US private living trusts for asset title transfers. Moving Indian real estate into a foreign trust also breaks FEMA regulations. You must use a valid Indian Will to pass on Indian property cleanly.",
            },
          },
          {
            "@type": "Question",
            name: "Does an Indian Will need Indian stamp paper or consular attestation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No Indian stamp paper is needed. Under the Indian Stamp Act, Wills are completely exempt from stamp duty. While getting your signature notarized or checked at an Indian Consulate adds strong proof of identity, it is not needed. Signing before two independent adult witnesses meets all legal rules under Section 63.",
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
      <NriWillCheckerClient />
      <Footer />
    </>
  );
}
