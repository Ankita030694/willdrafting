import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoaInventarioClient from "./GoaInventarioClient";

// Screaming Frog SEO Rules: Title 50-60 chars, Meta Description 140-154 chars, 0 em-dashes
export const metadata: Metadata = {
  title: {
    absolute: "Goa Inventario Legal Heir Format | WillDrafting.in", // 50 characters
  },
  description:
    "Download verified Goa Inventario legal heir declaration format and Cabeça de Casal petition under the Goa Succession & Inventory Act, 2012.", // 141 characters
  keywords: [
    "goa inventario legal heir declaration format",
    "inventario petition draft goa court",
    "head of family cabeca de casal declaration goa",
    "portuguese civil code 1867 partition format",
    "goa succession special notaries and inventory proceeding act 2012",
    "cabeca de casal oath statement goa civil court",
    "relacao de bens estate inventory schedule goa",
    "50 percent legitima reserve calculation goa",
    "communion of assets meeacao goa inheritance",
    "form i and xiv mutation after inventario goa",
    "margao panaji mapusa inventory proceedings format",
    "ama legal solutions goa succession lawyer",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/templates/goa-inventario-declaration-format",
    languages: {
      "en-IN": "https://www.willdrafting.in/templates/goa-inventario-declaration-format",
      "x-default": "https://www.willdrafting.in/templates/goa-inventario-declaration-format",
    },
  },
  openGraph: {
    title: "Goa Inventario Legal Heir Format | WillDrafting.in",
    description:
      "Download verified Goa Inventario legal heir declaration format and Cabeça de Casal petition under the Goa Succession & Inventory Act, 2012.",
    url: "https://www.willdrafting.in/templates/goa-inventario-declaration-format",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/goa-inventario-declaration-format-og.jpg",
        width: 1200,
        height: 675,
        alt: "Goa Inventario Cabeça de Casal Declaration Format and 50% Legítima Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@willdrafting",
    creator: "@willdrafting",
    title: "Goa Inventario Legal Heir Format | WillDrafting.in",
    description:
      "Download verified Goa Inventario legal heir declaration format and Cabeça de Casal petition under the Goa Succession & Inventory Act, 2012.",
    images: [
      "https://www.willdrafting.in/images/goa-inventario-declaration-format-og.jpg",
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

export default function GoaInventarioDeclarationPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/templates/goa-inventario-declaration-format";
  const imageUrl =
    "https://www.willdrafting.in/images/goa-inventario-declaration-format-og.jpg";

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
        name: "Goa Inventario Legal Heir Format | WillDrafting.in",
        description:
          "Download verified Goa Inventario legal heir declaration format and Cabeça de Casal petition under the Goa Succession & Inventory Act, 2012.",
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
            name: "Goa Inventario Declaration Format",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": ["Article", "DigitalDocument"],
        "@id": `${canonicalUrl}#document`,
        headline: "Goa Inventario & Cabeça de Casal Declaration Format",
        name: "Goa Inventario Legal Heir Declaration & Estate Inventory Schedule Format",
        url: canonicalUrl,
        description:
          "Verified Cabeça de Casal declaration format, Section 375 Inventario petition draft, Section 399 estate inventory schedule, and 50% Legítima reserve table under Goa law.",
        fileFormat: "text/html",
        isAccessibleForFree: true,
        inLanguage: "en-IN",
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        image: imageUrl,
        author: {
          "@type": "Person",
          name: "Advocate Anuj Anand Malik",
          jobTitle: "Senior Estate Counsel",
          url: "https://www.willdrafting.in/about-us",
        },
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
            name: "Who can act as Cabeca de Casal in Goa Inventario proceedings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under the Goa Succession, Special Notaries and Inventory Proceeding Act, 2012 and Portuguese Civil Code Articles 2068 to 2070, the surviving spouse holds first priority if married under Communion of Assets. Next come the eldest child living in the house, followed by ascendants or other heirs.",
            },
          },
          {
            "@type": "Question",
            name: "When are Inventario proceedings mandatory in Goa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 366 of the 2012 Act, court Inventario is mandatory whenever the deceased leaves behind a surviving spouse, a minor heir, an absent or NRI heir, a person under legal disability, or unknown heirs. If all heirs are present adults, they may use a Special Notary Deed under Section 15 and Section 346.",
            },
          },
          {
            "@type": "Question",
            name: "What must the Cabeca de Casal declaration on oath include?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 376 of the 2012 Act, the Head of Family declaration must state the date and place of death, marriage regime or antenuptial contract, names and addresses of all forced and testamentary heirs, any Wills or lifetime gifts for collation, and creditors. Under Section 378, courts presume these facts true unless disproved.",
            },
          },
          {
            "@type": "Question",
            name: "How does the 50% Legitima reserve work in Goa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 83 of the 2012 Act and Portuguese Civil Code Articles 1784 to 1785, if a person dies leaving children, 50% of their estate is strictly reserved as Legitima for forced heirs. Only the remaining 50% Quota Disponivel can be gifted or willed freely.",
            },
          },
          {
            "@type": "Question",
            name: "How is Spouse Meeacao calculated before the 50% Legitima?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In a standard Goan marriage under Communion of Assets, each spouse owns an undivided 50% half-share called Meeacao. On one spouse's death, the surviving spouse keeps their 50% Meeacao outright, and only the deceased spouse's remaining 50% enters the estate for Legitima and Quota Disponivel division.",
            },
          },
          {
            "@type": "Question",
            name: "In what order must assets appear in the Goa Estate Inventory Schedule?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Section 399 of the 2012 Act, the Relacao de Bens must list assets in fixed order: credits due to the estate, securities, cash, gold and silver, other movables, livestock, immovable lands with Matriz and Form I & XIV survey numbers, and finally debts owed by the estate.",
            },
          },
          {
            "@type": "Question",
            name: "Can an NRI heir participate in Goa Inventario without traveling?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. An NRI or Portuguese passport holder abroad can execute a Special Power of Attorney before the Indian Embassy, Consulate, or an Apostille notary to appoint a representative in Goa. Because an absent heir triggers Section 366, formal court Inventario protects their share.",
            },
          },
          {
            "@type": "Question",
            name: "How do heirs update Form I and XIV after the final Inventario order?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once the court passes the final partition order under Section 442 confirming the Mapa de Partilha, heirs submit a certified copy of the decree and death certificate to the local Talathi and Mamlatdar to update Form I and XIV land records.",
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
        <GoaInventarioClient />
        <Footer />
      </div>
    </>
  );
}
