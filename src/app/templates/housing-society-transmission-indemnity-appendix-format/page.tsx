import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HousingSocietyTransmissionClient from "./HousingSocietyTransmissionClient";

// Screaming Frog SEO Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Housing Society Share Transfer After Death | WillDrafting", // exactly 57 characters
  },
  description:
    "Download housing society share transfer formats under MCS Act. Includes editable Appendix 15, 16, 17, and 19 indemnity bonds with step-by-step.", // exactly 152 characters
  keywords: [
    "housing society share transfer after death application format",
    "appendix 14 15 16 17 19 maharashtra housing society pdf",
    "society flat transfer application by nominee legal heir format",
    "cooperative housing society share transmission process",
    "appendix 19 indemnity bond format chs flat transfer",
    "appendix 15 nominee membership application maharashtra",
    "appendix 16 flat transfer without nomination legal heir",
    "appendix 17 public notice format housing society death",
    "indrani wahi supreme court nominee rights housing society",
    "section 154b-13 mcs act transmission flat death",
    "housing society illegal transfer fee complaint deputy registrar",
    "ama legal solutions housing society flat transmission",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/housing-society-transmission-indemnity-appendix-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/housing-society-transmission-indemnity-appendix-format",
      "x-default": "https://www.willdrafting.in/templates/housing-society-transmission-indemnity-appendix-format",
    },
  },
  openGraph: {
    title: "Housing Society Share Transfer After Death | WillDrafting",
    description:
      "Download housing society share transfer formats under MCS Act. Includes editable Appendix 15, 16, 17, and 19 indemnity bonds with step-by-step.",
    url: "https://www.willdrafting.in/templates/housing-society-transmission-indemnity-appendix-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/housing-society-transmission-indemnity-appendix-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Housing Society Share Transfer After Death Appendix 15 16 17 and 19 Indemnity Bond Formats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Housing Society Share Transfer After Death | WillDrafting",
    description:
      "Download housing society share transfer formats under MCS Act. Includes editable Appendix 15, 16, 17, and 19 indemnity bonds with step-by-step.",
    images: ["https://www.willdrafting.in/images/housing-society-transmission-indemnity-appendix-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function HousingSocietyTransmissionPage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/housing-society-transmission-indemnity-appendix-format";
  const imageUrl = "https://www.willdrafting.in/images/housing-society-transmission-indemnity-appendix-format-og.jpg";

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
        name: "Housing Society Share Transfer After Death | WillDrafting",
        description:
          "Download housing society share transfer formats under MCS Act. Includes editable Appendix 15, 16, 17, and 19 indemnity bonds with step-by-step.",
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
            name: "Housing Society Transmission Appendix Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Housing Society Transmission and Indemnity Appendix Formats",
        url: canonicalUrl,
        description:
          "Legal form pack and legal templates under Maharashtra Co-operative Societies Act Model Bye-Laws including Appendix 15 Nominee Form.",
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
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Housing Society Transmission Application & Appendix Formats",
        description:
          "Full legal guide and editable appendix templates for transmitting cooperative housing society shares and flat ownership after a.",
        image: imageUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: "en-IN",
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Succession Counsel",
          worksFor: {
            "@type": "LegalService",
            name: "AMA Legal Solutions",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "WillDrafting.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.willdrafting.in/Logofinal.svg",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Does nomination in a housing society make the nominee the absolute owner?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. In the landmark judgment Indrani Wahi v. Registrar of Co-operative Societies (2016) 6 SCC 440, the Supreme Court ruled that a nominee in a cooperative society holds the shares and flat only as a trustee or fiduciary on behalf of all lawful legal heirs. Nomination does not override the personal law of estate or Will bequests in a Will. The society must transfer shares to the nominee, but ownership remains subject to estate rights.",
            },
          },
          {
            "@type": "Question",
            name: "Can a housing society demand transfer fees or donations after a member dies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Strictly NO. Under Maharashtra Government Circular No. CHS 2001/M.No.188/14-C dated 09-08-2001 and Section 79A of the MCS Act, the ₹25,000 transfer premium cap applies only to voluntary sales. For transfer upon death to a nominee or legal heir, the allowable transfer premium is ₹0. The society may only charge a ₹100 entrance fee and ₹500 nominal share transfer fee. Any demand for building funds or donations is illegal.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Appendix 15 and Appendix 16 in Maharashtra?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Appendix 15 is used when the deceased member filed an official nomination form (Appendix 14) during their lifetime, and the nominated person applies for membership. Appendix 16 is used when the deceased member left NO nomination, or the nominee has passed away, requiring the surviving legal heirs to apply with a public notice and indemnity bond.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Succession Certificate or Probate mandatory if no nomination exists?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, a court-issued Estate Paper or Probate is not needed in all cases. Under Model Bye-Law 35 of the Maharashtra Housing Society Bye-Laws, if no nomination exists, the managing committee can admit the legal heir upon receiving Appendix 16, Appendix 17 newspaper notice (14 days without valid objection), Appendix 19 Indemnity Bond on stamp paper, and Appendix 20 consent letters from other heirs.",
            },
          },
          {
            "@type": "Question",
            name: "What is an Appendix 19 Indemnity Bond and how much stamp duty is required?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Appendix 19 is a legal indemnity bond signed by the applicant legal heir or nominee. It indemnifies the society, its committee members, and officers against any future claims, losses, or legal costs arising from the share transfer. In Maharashtra, it must be signed on non-judicial stamp paper of ₹200 or ₹500 (as per the Maharashtra Stamp Act) and attested by a Notary Public.",
            },
          },
          {
            "@type": "Question",
            name: "Why does the society publish a public notice (Appendix 17) in two newspapers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Model Bye-Law 35, when transfer is requested without a filed nomination or probated Will, the society must publish a 14-day public notice in two local newspapers (one in Marathi and one in English) at the applicant's expense. This invites any unknown heirs, creditors, or claimants to submit written objections before the society transfers the share paper.",
            },
          },
          {
            "@type": "Question",
            name: "What should an heir do if the housing society delays transmission beyond 90 days?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 154B-13 and Bye-Law 35, the managing committee must decide on the transfer form within 90 days. If the society fails to decide or unlawfully rejects the form, the applicant can file an appeal before the Deputy Registrar of Co-operative Societies under Section 23(2) of the MCS Act to secure deemed membership.",
            },
          },
          {
            "@type": "Question",
            name: "Can married daughters claim transmission of a deceased father's housing society flat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under the Hindu Succession (Amendment) Act, 2005 and Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), married daughters are coparceners and Class-I legal heirs with equal estate rights. A housing society cannot deny transfer or membership to a daughter, nor can brothers exclude sisters without a filed Release Deed.",
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
      <Navbar />
      <HousingSocietyTransmissionClient />
      <Footer />
    </>
  );
}
