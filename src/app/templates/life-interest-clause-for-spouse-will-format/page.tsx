import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LifeInterestClauseClient from "./LifeInterestClauseClient";

// Screaming Frog Rules: Title strictly 50-60 chars, Meta Description strictly 140-155 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Life Interest Clause in Will Format India | WillDrafting.in", // exactly 59 characters
  },
  description:
    "Download legally valid life interest clause in will format india under Hindu Succession Act, 1956. Protect spouse lifetime rights and secure children.", // exactly 151 characters
  keywords: [
    "life interest clause in will format india",
    "life estate clause for wife in will india",
    "how to give wife right to live in house and then to children will format",
    "section 14 2 hindu succession act life interest",
    "section 14 1 vs 14 2 life estate clause",
    "vested remainder to children will clause india",
    "lifetime right of residence will format india",
    "ranvir dewan v rashmi khanna life estate precedent",
    "sadhu singh v gurdwara sahib narike life interest",
    "v tulasamma section 14 1 absolute ownership",
    "hindu will life interest to wife template",
    "ama legal solutions life interest will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/life-interest-clause-for-spouse-will-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/life-interest-clause-for-spouse-will-format",
      "x-default": "https://www.willdrafting.in/templates/life-interest-clause-for-spouse-will-format",
    },
  },
  openGraph: {
    title: "Life Interest Clause in Will Format India | WillDrafting.in",
    description:
      "Download legally valid life interest clause in will format india under Hindu Succession Act, 1956. Protect spouse lifetime rights and secure children.",
    url: "https://www.willdrafting.in/templates/life-interest-clause-for-spouse-will-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/life-interest-clause-for-spouse-will-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Life Interest Clause for Spouse in Will Format India and Section 14(2) Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Interest Clause in Will Format India | WillDrafting.in",
    description:
      "Download legally valid life interest clause in will format india under Hindu Succession Act, 1956. Protect spouse lifetime rights and secure children.",
    images: ["https://www.willdrafting.in/images/life-interest-clause-for-spouse-will-format-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function LifeInterestClausePage() {
  const canonicalUrl = "https://www.willdrafting.in/templates/life-interest-clause-for-spouse-will-format";
  const imageUrl = "https://www.willdrafting.in/images/life-interest-clause-for-spouse-will-format-og.jpg";

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
        name: "Life Interest Clause in Will Format India | WillDrafting.in",
        description:
          "Download legally valid life interest clause in will format india under Hindu Succession Act, 1956. Protect spouse lifetime rights and secure children.",
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
            name: "Life Interest Clause for Spouse",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        "@id": `${canonicalUrl}#document`,
        name: "Supreme Court-Tested Section 14(2) Life Interest Clause Format for Spouse",
        url: canonicalUrl,
        description:
          "Lawyer-vetted spousal life interest clause templates under Section 14(2) of the Hindu Succession Act, 1956, granting lifetime residential and rental usufruct with vested remainder to children.",
        image: imageUrl,
        fileFormat: "text/html",
        hasDigitalDocumentPermission: {
          "@type": "DigitalDocumentPermission",
          permissionType: "https://schema.org/ReadPermission",
          grantee: {
            "@type": "Audience",
            audienceType: "Public",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a life interest clause in a Will under Indian law?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A life interest clause grants a designated beneficiary (such as a spouse or elderly parent) the legal right to possess, reside in, and enjoy income from a property for the duration of their natural life, without conferring absolute ownership. Upon the life tenant's death, the property automatically passes to the remaindermen (typically children) in absolute ownership.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between Section 14(1) and Section 14(2) of the Hindu Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 14(1), any property possessed by a female Hindu in lieu of a pre-existing maintenance right blossoms into full, absolute ownership, rendering any restrictive covenants void. In contrast, Section 14(2) protects limited estates created for the first time by gift, Will, or decree as an independent testamentary disposition. In Section 14(2), the restrictive conditions (such as the inability to sell or mortgage) remain fully binding.",
            },
          },
          {
            "@type": "Question",
            name: "Can a wife sell or mortgage a house if she is bequeathed a life interest?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Provided the life interest clause is drafted in strict compliance with Section 14(2) of the Hindu Succession Act, 1956, and judicial precedents like Sadhu Singh (2006 SC) and Ranvir Dewan (2018 SC), the wife possesses only a limited usufructuary estate. She has no legal authority to sell, gift, mortgage, exchange, or create any permanent charge on the property.",
            },
          },
          {
            "@type": "Question",
            name: "What fatal mistake triggers the Section 14(1) trap in life interest Wills?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The most dangerous drafting error is phrasing the bequest as being 'in lieu of maintenance' or 'in satisfaction of maintenance arrears'. Under the landmark Supreme Court ruling in V. Tulasamma v. Sesha Reddy (1977 SC), this wording links the disposition to an antecedent pre-existing right of maintenance, causing Section 14(1) to convert the limited life estate into 100% absolute ownership, allowing the spouse to alienate the property away from the children.",
            },
          },
          {
            "@type": "Question",
            name: "Can the spouse collect and retain rental income from the property?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, if the Will expressly confers usufructuary rental rights. The clause should clarify that the surviving spouse is entitled to let out authorized portions on short-term leave and license agreements (e.g., up to 11 months) and retain all rental proceeds for their personal maintenance, healthcare, and living expenses.",
            },
          },
          {
            "@type": "Question",
            name: "When does ownership vest in the children under Section 119 of the Indian Succession Act?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 119 of the Indian Succession Act, 1925, the children acquire an immediate 'vested remainder in interest' on the day the testator dies, even though their 'vesting in possession' is deferred until the demise of the life tenant spouse. This prevents the life tenant from disinheriting the children and guarantees the property title belongs irrevocably to the children.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if a child predeceases the parent who holds the life interest?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Because the child held an immediate vested interest from the testator's demise under Section 119, that interest does not lapse if the child dies before the life tenant. Instead, upon the life tenant's subsequent death, the deceased child's share passes to their legal heirs (such as their own children and spouse) per stirpes, unless the Will contains a survivorship substitution clause.",
            },
          },
          {
            "@type": "Question",
            name: "Can the life tenant spouse execute a Will bequeathing the property to third parties?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. As ruled by the Supreme Court in Ranvir Dewan v. Rashmi Khanna (2018 SC), a life tenant under Section 14(2) has no testamentary capacity over the corpus of the property. Any testamentary disposition, gift, or deed of settlement executed by the life tenant purporting to bequeath or transfer the property is void ab initio and non est in law.",
            },
          },
          {
            "@type": "Question",
            name: "Does a Will containing a life interest clause need to be registered at the Sub-Registrar Office?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 18(e) of the Registration Act, 1908, registration of a Will is optional in India. A Will executed on plain white paper before two competent witnesses is legally valid. However, registering a life interest Will before the Sub-Registrar provides strong evidential protection and assists the municipal corporation in recording the life estate and remaindermen correctly in land records.",
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
        <LifeInterestClauseClient />
        <Footer />
      </div>
    </>
  );
}
