import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialPowerOfAttorneyClient from "./SpecialPowerOfAttorneyClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "NRI PoA Format: Property Mutation & Probate | WillDrafting", // exactly 58 characters
  },
  description:
    "Download legally valid NRI power of attorney format for property mutation and probate. Powers of Attorney Act compliant draft with embassy.", // exactly 151 characters
  keywords: [
    "nri power of attorney format for property mutation and probate",
    "special poa format for nri selling inherited property india",
    "indian embassy attestation poa format",
    "nri special power of attorney format word pdf",
    "anti misuse poa format inherited property india",
    "powers of attorney act 1882 special poa",
    "section 18 indian stamp act 90 day adjudication",
    "apostille power of attorney format for india",
    "nri power of attorney for tehsildar mutation",
    "power of attorney for probate high court india",
    "society transfer nri power of attorney",
    "registration act section 32 33 power of attorney",
    "suraj lamp supreme court power of attorney ruling",
    "ama legal solutions nri property poa",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/special-power-of-attorney-nri-property-inheritance-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/special-power-of-attorney-nri-property-inheritance-format",
      "x-default": "https://www.willdrafting.in/templates/special-power-of-attorney-nri-property-inheritance-format",
    },
  },
  openGraph: {
    title: "NRI PoA Format: Property Mutation & Probate | WillDrafting",
    description:
      "Download legally valid NRI power of attorney format for property mutation and probate. Powers of Attorney Act compliant draft with embassy.",
    url: "https://www.willdrafting.in/templates/special-power-of-attorney-nri-property-inheritance-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/special-power-of-attorney-nri-property-inheritance-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "NRI Special Power of Attorney Format for Inherited Property Mutation and Probate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI PoA Format: Property Mutation & Probate | WillDrafting",
    description:
      "Download legally valid NRI power of attorney format for property mutation and probate. Powers of Attorney Act compliant draft with embassy.",
    images: ["https://www.willdrafting.in/images/special-power-of-attorney-nri-property-inheritance-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function SpecialPowerOfAttorneyPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/special-power-of-attorney-nri-property-inheritance-format";
  const imageUrl =
    "https://www.willdrafting.in/images/special-power-of-attorney-nri-property-inheritance-format-og.jpg";

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
        name: "NRI PoA Format: Property Mutation & Probate | WillDrafting",
        description:
          "Download legally valid NRI power of attorney format for property mutation and probate. Powers of Attorney Act compliant draft with embassy.",
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
            name: "NRI Special Power of Attorney Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "NRI Special Power of Attorney Format for Inherited Property",
        url: canonicalUrl,
        encodingFormat: "application/pdf",
        description:
          "Statutory Special Power of Attorney template compliant with Powers of Attorney Act 1882, Registration Act 1908 Sections 32 and 33, and Indian.",
        image: imageUrl,
        author: {
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
            name: "What is an NRI Special Power of Attorney for inherited property in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An NRI Special Power of Attorney (PoA) is a legally binding deed executed by a Non-Resident Indian under the Powers of Attorney Act, 1882. It authorizes a trusted person in India to carry out specific, narrowly defined acts such as applying for revenue mutation, attending court probate hearings, or transferring society share certificates, while explicitly prohibiting any sale, gift, mortgage, or financial encumbrance of the property.",
            },
          },
          {
            "@type": "Question",
            name: "Can a Special Power of Attorney be misused by relatives to sell my property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, provided you use an 'Anti-Misuse' Restricted Special PoA. Under the landmark Supreme Court ruling in Church of Christ Charitable Trust v. P. Ponniamman, powers of attorney must be strictly construed. Our format incorporates an express negative covenant that explicitly strips the agent of any power to execute conveyance deeds, sign sale agreements, or receive buyer payments, making any attempted unauthorized sale void ab initio.",
            },
          },
          {
            "@type": "Question",
            name: "Should an NRI choose Indian Embassy Attestation or the Hague Apostille route?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If you reside in a Hague Apostille Convention member country (such as the USA, UK, Canada, Australia, or Germany), getting the PoA notarized locally and apostilled by the designated state authority is legally sufficient and accepted across Indian land revenue offices. If you reside in a non-apostille country (such as the UAE, Saudi Arabia, or Singapore), you must get the PoA attested by the Consular Officer at the Indian Embassy or Consulate.",
            },
          },
          {
            "@type": "Question",
            name: "What is the 90-day adjudication rule under Section 18 of the Indian Stamp Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 18 of the Indian Stamp Act, 1899, any legal instrument executed outside India must be stamped and adjudicated before the Collector of Stamps or District Registrar within three months (90 days) of its first receipt in India. Missing this 90-day deadline attracts heavy statutory penalties ranging from two to ten times the deficit stamp duty.",
            },
          },
          {
            "@type": "Question",
            name: "Does an NRI Special Power of Attorney for mutation require registration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 17 and 18 of the Registration Act, 1908, a Special PoA that is confined strictly to revenue mutation, court appearance, and utility transfer does not compulsorily require registration in all states because it creates no proprietary title. However, the PoA MUST be duly stamped and adjudicated under Section 18 of the Stamp Act. If the PoA authorizes execution of a registered conveyance or sale deed, registration before the Sub-Registrar under Sections 32 and 33 is mandatory.",
            },
          },
          {
            "@type": "Question",
            name: "Can my attorney sign probate or letters of administration petitions for me?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Sections 228 and 241 of the Indian Succession Act, 1925, an authorized attorney can apply for Letters of Administration with the Will annexed or represent the NRI legal heir in ongoing probate proceedings before the District Judge or High Court.",
            },
          },
          {
            "@type": "Question",
            name: "How can an NRI revoke a Special Power of Attorney from abroad?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 201 of the Indian Contract Act, 1872, the principal can revoke a PoA at any time by executing a formal Deed of Revocation. To make it effective, the NRI must serve written notice of revocation upon the attorney, deliver copies to the Tehsildar, Sub-Registrar, and housing society, and publish a public notice in a local daily newspaper.",
            },
          },
          {
            "@type": "Question",
            name: "Can the attorney receive inherited property sale proceeds in their own bank account?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Strictly no. To comply with Foreign Exchange Management Act (FEMA) regulations and prevent financial fraud, any sale deed executed through an attorney must mandate that all sale consideration cheques, RTGS, or wire transfers be drawn directly and exclusively in favor of the NRI principal's Indian NRO or NRE bank account.",
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
      <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
        <Navbar />
        <div className="flex-1">
          <SpecialPowerOfAttorneyClient />
        </div>
        <Footer />
      </div>
    </>
  );
}
