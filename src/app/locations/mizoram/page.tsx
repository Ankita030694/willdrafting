import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MizoramLocationClient from "./MizoramLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Mizoram: Online Will & Succession Guide",
  },
  description:
    "Draft a valid Will in Mizoram. Guidance on Mizo customary law, Mizo Inheritance Act provisions, and Land Settlement Certificate (LSC) property.",
  keywords: [
    "will drafting in mizoram",
    "mizo customary inheritance will",
    "mizo marriage and inheritance of property act",
    "will registration aizawl",
    "succession lawyer mizoram",
    "land settlement certificate lsc will transfer",
    "gauhati high court aizawl bench probate",
    "sub registrar office aizawl dc complex",
    "section 31 registration act home visit mizoram",
    "mizoram land revenue act 2013",
    "lunglei will registration",
    "champhai estate succession lawyer",
    "kolasib will drafting",
    "serchhip property succession",
    "lai autonomous district council ladc land will",
    "mara autonomous district council madc will",
    "chakma autonomous district council cadc will",
    "ama legal solutions mizoram will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/mizoram",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/mizoram",
      "x-default": "https://www.willdrafting.in/locations/mizoram",
    },
  },
  openGraph: {
    title: "Will Drafting in Mizoram: Online Will & Succession Guide",
    description:
      "Draft a valid Will in Mizoram. Guidance on Mizo customary law, Mizo Inheritance Act provisions, and Land Settlement Certificate (LSC) property.",
    url: "https://www.willdrafting.in/locations/mizoram",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-mizoram-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Mizoram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Mizoram: Online Will & Succession Guide",
    description:
      "Draft a valid Will in Mizoram. Guidance on Mizo customary law, Mizo Inheritance Act provisions, and Land Settlement Certificate (LSC) property.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-mizoram-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const MIZORAM_FAQS = [
  {
    q: "Is Will registration mandatory in Mizoram?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Mizoram. A Will executed on plain white paper before two independent adult witnesses is legally valid. However, formal registration before the Sub-Registrar in Aizawl, Lunglei, or other district registries enters the document into permanent Book III government custody. This provides decisive protection against coercion allegations and accelerates Land Settlement Certificate (LSC) mutation with the Revenue Department.",
  },
  {
    q: "How does The Mizo Marriage, Divorce and Inheritance of Property Act 2014 affect Wills?",
    a: "The Mizo Marriage, Divorce and Inheritance of Property Act, 2014 reformed traditional succession in Mizoram. Sections 43 to 45 codify the right of every Mizo of sound mind to dispose of self-acquired property through a testamentary Will (Thurochhiah). It allows testators to bequeath property equitably to daughters, sons, or spouses, offering legal flexibility beyond traditional customary ultimogeniture.",
  },
  {
    q: "What is a Land Settlement Certificate (LSC) and how is it transferred under a Will?",
    a: "A Land Settlement Certificate (LSC) is the official title deed issued by the Land Revenue & Settlement Department of Mizoram, conferring permanent, heritable, and transferable rights in urban and settled areas. When an LSC holder bequeaths land in a Will, the beneficiary presents the registered Will and death certificate to the Directorate of Land Revenue & Settlement for ownership mutation (Hming Thlak) without requiring a civil court succession order.",
  },
  {
    q: "Can non-tribals inherit tribal land in Mizoram through a testamentary Will?",
    a: "No. Under Article 371G of the Constitution of India and the Mizoram (Land Revenue) Act, 2013, ownership and transfer of tribal land are strictly restricted to indigenous tribals of Mizoram. A non-tribal individual cannot acquire proprietary title to tribal land or an LSC holding through a testamentary Will. Any clause purporting to transfer tribal land to a non-tribal is legally void and unenforceable.",
  },
  {
    q: "Is court probate compulsory for Wills in Mizoram under Gauhati High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the presidency towns of Mumbai, Kolkata, and Chennai. Mizoram is a non-presidency state under the jurisdiction of the Gauhati High Court (Aizawl Bench). Probate is non-mandatory for Christian, Hindu, and tribal Wills in Mizoram, enabling direct property transfer using a registered Will.",
  },
  {
    q: "What is the government fee to register a Will before a Sub-Registrar in Mizoram?",
    a: "Testamentary Wills are 100% exempt from ad valorem stamp duty across Mizoram because a Will is not a transfer inter vivos. At district Sub-Registrar offices (such as Aizawl DC Office or Lunglei DC Office), testators pay only a flat statutory registration fee of approximately ₹100 to ₹500, along with nominal scanning charges. There are no percentage-based charges tied to property market value.",
  },
  {
    q: "How do Autonomous District Councils (LADC, MADC, CADC) handle Will succession?",
    a: "The Lai, Mara, and Chakma Autonomous District Councils in southern Mizoram exercise autonomous authority under the Sixth Schedule of the Constitution. Within their jurisdictions, land tenure and customary inheritance are governed by Council rules. A well-drafted Will clearly references District Council land passes and Village Council jurisdictions to ensure seamless validation before local administrative and customary revenue authorities.",
  },
  {
    q: "Can elderly or unwell citizens in Mizoram register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly citizens, bedridden individuals, or persons with medical mobility restrictions can request a doorstep SRO visit. An MBBS doctor certifies physical inability to travel. The Sub-Registrar visits your residence in Aizawl, Lunglei, or nearby localities with portable biometric verification equipment.",
  },
  {
    q: "Who can serve as valid attesting witnesses for a Will in Mizoram?",
    a: "Any two adult individuals of sound mind carrying valid government photo identification (such as Aadhaar cards or Voter IDs) can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will. Family friends, church elders, or trusted neighbors make ideal witnesses.",
  },
  {
    q: "Can Non-Resident Mizos (NRMs) or diaspora living outside Mizoram execute a Will?",
    a: "Yes. Mizos living in Delhi, Shillong, Bengaluru, or abroad can draft a customized Will online to protect their ancestral lands and LSC properties back home. The Will can be executed before two witnesses wherever they reside and notarized, or formally registered at their local Mizoram Sub-Registrar Office during a visit to the state.",
  },
];

export default function MizoramLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/mizoram";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-mizoram.jpg";

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
        name: "Will Drafting in Mizoram: Online Will & Succession Guide",
        description:
          "Draft a valid Will in Mizoram. Guidance on Mizo customary law, Mizo Inheritance Act provisions, and Land Settlement Certificate (LSC) property.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 630,
          caption: "Legal Will Drafting and Property Succession in Mizoram",
        },
        breadcrumb: {
          "@id": `${canonicalUrl}#breadcrumb`,
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
            name: "Locations",
            item: "https://www.willdrafting.in/locations",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Mizoram",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Mizoram - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Land Settlement Certificate (LSC) succession, and Sub-Registrar execution support across.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Aizawl",
          addressRegion: "Mizoram",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Mizoram" },
          { "@type": "City", name: "Aizawl" },
          { "@type": "City", name: "Lunglei" },
          { "@type": "City", name: "Champhai" },
          { "@type": "City", name: "Kolasib" },
          { "@type": "City", name: "Serchhip" },
          { "@type": "City", name: "Lawngtlai" },
          { "@type": "City", name: "Siaha" },
          { "@type": "City", name: "Mamit" },
          { "@type": "City", name: "Saitual" },
          { "@type": "City", name: "Khawzawl" },
          { "@type": "City", name: "Hnahthial" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mizoram Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Mizoram Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Mizoram Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Mizoram",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Mizoram.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Mizoram properties including Land Settlement Certificates (LSC), Periodic Pattas, residential houses in Aizawl, agricultural plantations, and financial accounts. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses under The Mizo Marriage, Divorce and Inheritance of Property Act 2014 and Indian Succession Act 1925, detailing survivorship and minor guardianships.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Submit at District Sub-Registrar Office",
            text: "Present the executed Will at your local Mizoram DC Office Sub-Registrar counter and remit the nominal statutory registration fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics & Custody",
            text: "Attend the Sub-Registrar office with both witnesses for verbal verification, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: MIZORAM_FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
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
      <MizoramLocationClient faqs={MIZORAM_FAQS} />
      <Footer />
    </>
  );
}
