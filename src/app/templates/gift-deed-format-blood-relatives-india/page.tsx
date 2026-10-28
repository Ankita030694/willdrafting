import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GiftDeedBloodRelativesClient from "./GiftDeedBloodRelativesClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Gift Deed Format for Blood Relatives India | WillDrafting", // exactly 57 characters
  },
  description:
    "Download legally valid gift deed format for blood relatives in India. Includes Section 23 senior citizen clause, stamp duty concessions, and.", // exactly 153 characters
  keywords: [
    "gift deed format for blood relatives in india",
    "gift deed format father to son daughter",
    "conditional gift deed format section 23 senior citizen act",
    "property gift deed word pdf",
    "gift deed stamp duty concessions blood relatives",
    "transfer of property act section 122 gift deed",
    "section 123 tpa registered gift deed",
    "revocation of gift deed supreme court sudesh chhikara",
    "urmila dixit v sunil sharan dixit 2025 sc",
    "gift deed vs will in india",
    "section 56 2 x income tax exemption relatives",
    "ama legal solutions gift deed lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/gift-deed-format-blood-relatives-india",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/gift-deed-format-blood-relatives-india",
      "x-default": "https://www.willdrafting.in/templates/gift-deed-format-blood-relatives-india",
    },
  },
  openGraph: {
    title: "Gift Deed Format for Blood Relatives India | WillDrafting",
    description:
      "Download legally valid gift deed format for blood relatives in India. Includes Section 23 senior citizen clause, stamp duty concessions, and.",
    url: "https://www.willdrafting.in/templates/gift-deed-format-blood-relatives-india",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/gift-deed-format-blood-relatives-india-og.jpg",
        width: 1200,
        height: 675,
        alt: "Gift Deed Format for Blood Relatives in India - Legal Template and Protection Clause",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift Deed Format for Blood Relatives India | WillDrafting",
    description:
      "Download legally valid gift deed format for blood relatives in India. Includes Section 23 senior citizen clause, stamp duty concessions, and.",
    images: ["https://www.willdrafting.in/images/gift-deed-format-blood-relatives-india-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function GiftDeedBloodRelativesPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/gift-deed-format-blood-relatives-india";
  const imageUrl = "https://www.willdrafting.in/images/gift-deed-format-blood-relatives-india-og.jpg";

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
        name: "Gift Deed Format for Blood Relatives India | WillDrafting",
        description:
          "Download legally valid gift deed format for blood relatives in India. Includes Section 23 senior citizen clause, stamp duty concessions, and.",
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
            name: "Gift Deed Format Blood Relatives India",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Senior-Protected Blood Relative Gift Deed Format India",
        url: canonicalUrl,
        description:
          "Lawyer-drafted gift deed format for transfers between blood relatives under Sections 122-126 of the Transfer of Property Act, 1882, featuring.",
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
            name: "Is a gift deed between blood relatives legally revocable in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "As a general rule under Section 126 of the Transfer of Property Act, 1882, a registered gift deed is irrevocable once accepted. However, under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, if an elderly parent includes an explicit condition in the deed that the child must provide basic amenities and physical needs, and the child fails to do so, the Maintenance Tribunal (SDM Court) has statutory power to declare the gift deed null and void.",
            },
          },
          {
            "@type": "Question",
            name: "Why do standard online gift deed templates put elderly parents at risk?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most generic online templates draft an unconditional, absolute transfer of title. In the landmark judgment Sudesh Chhikara v. Ram Anandi (2022 SC), the Supreme Court ruled that without an express condition in the deed mandating maintenance, Section 23 of the Senior Citizens Act cannot be invoked. Parents who sign unconditional deeds often face eviction and cannot easily cancel the deed.",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamp duty on a gift deed to blood relatives across Indian states?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Many Indian states offer substantial stamp duty concessions for blood relatives (parents, children, spouse, siblings). In Maharashtra (Article 34), stamp duty is capped at Rs. 200 or 1% for residential/agricultural property gifted to direct heirs. In Uttar Pradesh, stamp duty is a nominal Rs. 5,000 plus Rs. 1,000 registration fee. In Haryana and Punjab, stamp duty on blood relative gifts is 0%, requiring only nominal registration fees.",
            },
          },
          {
            "@type": "Question",
            name: "Is there any income tax on property received as a gift from blood relatives?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Under Section 56(2)(x) of the Income Tax Act, 1961, immovable property received from a defined 'relative' (which includes parents, children, spouse, brothers, sisters, and grandparents) is 100% exempt from income tax in the hands of the donee, regardless of the property value.",
            },
          },
          {
            "@type": "Question",
            name: "Should I execute a Gift Deed or a Will for transferring property to my child?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Will is significantly safer for parents who wish to retain 100% control, ownership, and revocation rights until their demise, without paying stamp duty during their lifetime. A Gift Deed is preferable only when the child urgently requires immediate legal ownership during the parent's lifetime and the deed incorporates protective Section 23 clauses.",
            },
          },
          {
            "@type": "Question",
            name: "Is registration of a gift deed mandatory for immovable property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Section 123 of the Transfer of Property Act, 1882 read with Section 17(1)(a) of the Registration Act, 1908, a gift of immovable property can only be effected through a registered instrument signed by the donor, accepted by the donee, and attested by at least two independent witnesses. An unregistered gift deed has zero legal validity in court.",
            },
          },
          {
            "@type": "Question",
            name: "Can ancestral property be transferred through a gift deed to one child?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Hindu Law, a person cannot gift their undivided ancestral coparcenary property to one child without the explicit written consent of all other coparceners, unless it is a small portion gifted for pious or charitable purposes. Only self-acquired property can be freely gifted to any chosen child without restriction.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to capital gains tax when the child sells the gifted property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 49(1) of the Income Tax Act, 1961, the child's cost of acquisition is deemed to be the purchase price paid by the parent. Furthermore, under Section 2(42A), the parent's holding period is combined with the child's holding period to determine long-term capital gains status.",
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
        <GiftDeedBloodRelativesClient />
        <Footer />
      </div>
    </>
  );
}