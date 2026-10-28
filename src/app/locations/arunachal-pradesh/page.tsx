import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArunachalPradeshLocationClient from "./ArunachalPradeshLocationClient";

// Title: Exactly 52 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Arunachal Pradesh: Online Will Guide",
  },
  description:
    "Draft a valid Will in Arunachal Pradesh. Guidance on customary tribal inheritance practices, Land Holding Certificates (LHC), and legal.",
  keywords: [
    "will drafting in arunachal pradesh",
    "will registration itanagar",
    "tribal land succession arunachal",
    "customary inheritance will arunachal",
    "online will lawyer arunachal",
    "gauhati high court itanagar bench probate",
    "land holding certificate lhc will transfer",
    "sub registrar office itanagar naharlagun",
    "section 31 registration act home visit arunachal",
    "arunachal pradesh land settlement records act 2000",
    "bengal eastern frontier regulation non tribal transfer",
    "pasighat will drafting east siang",
    "tawang bomdila will registration",
    "ziro valley apatani will drafting",
    "tezu namsai estate succession lawyer",
    "advocate for will drafting itanagar",
    "ama legal solutions arunachal pradesh will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/arunachal-pradesh",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/arunachal-pradesh",
      "x-default": "https://www.willdrafting.in/locations/arunachal-pradesh",
    },
  },
  openGraph: {
    title: "Will Drafting in Arunachal Pradesh: Online Will Guide",
    description:
      "Draft a valid Will in Arunachal Pradesh. Guidance on customary tribal inheritance practices, Land Holding Certificates (LHC), and legal.",
    url: "https://www.willdrafting.in/locations/arunachal-pradesh",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-arunachal-pradesh-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Arunachal Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Arunachal Pradesh: Online Will Guide",
    description:
      "Draft a valid Will in Arunachal Pradesh. Guidance on customary tribal inheritance practices, Land Holding Certificates (LHC), and legal.",
    images: [
      "https://www.willdrafting.in/images/will-drafting-in-arunachal-pradesh-og.jpg",
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

const ARUNACHAL_FAQS = [
  {
    q: "Is Will registration mandatory in Arunachal Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Arunachal Pradesh. A Will executed on plain white paper before two independent adult witnesses is legally valid. However, formal registration at the Sub-Registrar or Deputy Commissioner (DC) office enters the document into permanent Book III government records. This provides decisive protection against allegations of coercion and accelerates post-demise Land Holding Certificate (LHC) mutation.",
  },
  {
    q: "How do customary tribal laws affect Will drafting and inheritance in Arunachal Pradesh?",
    a: "In Arunachal Pradesh, customary laws of indigenous tribes (such as Nyishi, Adi, Apatani, Galo, Tagin, Monpa, and Mishmi) govern ancestral and community clan lands. Under customary traditions, ancestral clan lands often follow patrilineal succession. A lawyer-drafted testamentary Will clearly allocates self-acquired properties, Land Holding Certificate (LHC) holdings, commercial establishments, and financial assets, reconciling customary practices with statutory legal succession.",
  },
  {
    q: "Can non-tribals inherit tribal land or LHC holdings through a Will in Arunachal Pradesh?",
    a: "No. Under the Bengal Eastern Frontier Regulation, 1873 and the Arunachal Pradesh (Land Settlement and Records) Act, 2000, land ownership in Arunachal Pradesh is strictly reserved for indigenous Scheduled Tribes (APST). A non-tribal individual cannot acquire proprietary title or transfer rights over tribal land through a testamentary Will. Bequests of land to non-tribals are legally unenforceable under state land statutes.",
  },
  {
    q: "What is a Land Holding Certificate (LHC) and how is it bequeathed in a Will?",
    a: "A Land Holding Certificate (LHC) is an official title instrument issued by the Deputy Commissioner under the Arunachal Pradesh (Land Settlement and Records) Act, 2000, confirming recognized individual possession over a specific land parcel. When drafting a Will, the testator must accurately specify the LHC number, date of issue, issuing DC/ADC office, circle, boundary markers, and plot dimensions to ensure seamless revenue mutation upon demise.",
  },
  {
    q: "Is probate mandatory for a Will in Arunachal Pradesh under Gauhati High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Arunachal Pradesh is a non-presidency jurisdiction falling under the Gauhati High Court (Itanagar Permanent Bench). Probate is non-mandatory for Hindu, Buddhist, Christian, and tribal indigenous Wills in Arunachal Pradesh, allowing direct property transfer with a registered Will.",
  },
  {
    q: "What is the official government fee to register a Will in Arunachal Pradesh?",
    a: "Testamentary Wills are completely exempt from ad valorem stamp duty across Arunachal Pradesh because a Will is not a transfer inter vivos. At Arunachal Sub-Registrar and DC/ADC administrative registry offices, testators pay only a nominal flat registration fee of approximately ₹100 to ₹500 plus modest government data and scanning charges. There is zero percentage-based property market value duty.",
  },
  {
    q: "Can senior citizens in Arunachal Pradesh register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly individuals, bedridden persons, or citizens facing mobility limitations across Arunachal Pradesh can request an official home or hospital visit. Backed by a registered medical practitioner's mental and physical fitness certificate, the Sub-Registrar or registry official visits the testator's residence with portable biometric equipment to complete Book III registration.",
  },
  {
    q: "How does a registered Will simplify bank account, gratuity, and vehicle transfers in Itanagar?",
    a: "In urban centers like Itanagar, Naharlagun, and Pasighat, estates include significant movable assets such as State Bank of India savings, GPF/Gratuity accumulations, fixed deposits, trading licenses, and commercial vehicles. A lawyer-drafted registered Will empowers the named executor to release bank balances and transfer assets without requiring an expensive and time-consuming court Succession Certificate from the District Judge.",
  },
  {
    q: "Who can serve as valid attesting witnesses for a Will in Arunachal Pradesh?",
    a: "Any two adult individuals possessing sound mental capacity and holding valid government identity proof (such as Aadhaar, Voter ID, or Government Service ID) can serve as witnesses. Under Section 67 of the Indian Succession Act, witnesses must be entirely independent; they must not be beneficiaries or spouses of beneficiaries inheriting any property, LHC parcel, or monetary bequest under the Will.",
  },
  {
    q: "Can Arunachalis residing outside the state or serving in the armed forces draft a Will?",
    a: "Yes. Indigenous Arunachalis serving in the Indian Armed Forces, central services, or working in cities like Guwahati, Delhi NCR, or Bengaluru can draft a legally enforceable Will online covering both their LHC parcels in Arunachal Pradesh and movable investments across India. The Will can be executed before two witnesses wherever they are stationed and formally registered before the local Sub-Registrar during their visit home.",
  },
];

export default function ArunachalPradeshLocationPage() {
  const canonicalUrl =
    "https://www.willdrafting.in/locations/arunachal-pradesh";
  const imageUrl =
    "https://www.willdrafting.in/images/will-drafting-in-arunachal-pradesh.jpg";

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
        name: "Will Drafting in Arunachal Pradesh: Online Will Guide",
        description:
          "Draft a valid Will in Arunachal Pradesh. Guidance on local tribal passing assets practices, Land Holding Papers (LHC), and legal.",
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
          caption:
            "Legal Will Drafting and Asset Estate in Arunachal Pradesh",
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
            name: "Arunachal Pradesh",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Arunachal Pradesh - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, Land Holding Paper (LHC) estate compliance, SRO Book III signing, and.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Itanagar",
          addressRegion: "Arunachal Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Itanagar" },
          { "@type": "City", name: "Naharlagun" },
          { "@type": "City", name: "Nirjuli" },
          { "@type": "City", name: "Pasighat" },
          { "@type": "City", name: "Tawang" },
          { "@type": "City", name: "Bomdila" },
          { "@type": "City", name: "Ziro" },
          { "@type": "City", name: "Hapoli" },
          { "@type": "City", name: "Tezu" },
          { "@type": "City", name: "Namsai" },
          { "@type": "City", name: "Roing" },
          { "@type": "City", name: "Aalo" },
          { "@type": "City", name: "Yupia" },
          { "@type": "City", name: "Dirang" },
          { "@type": "City", name: "Changlang" },
          { "@type": "City", name: "Khonsa" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Arunachal Pradesh Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Arunachal Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Lawyer Will Talk & Local Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Arunachal Pradesh SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Arunachal Pradesh",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO or Deputy Commissioner office in Arunachal Pradesh.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Estate Assets & Land Holding Certificates (LHC)",
            text: "List your urban homes, shop buildings, bank investments, and tribal land parcels with exact Land Holding Paper (LHC) numbers, issuing DC office details, circle, and boundary descriptions. Designate trusted heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Local & Legal Compliant Testamentary Clauses",
            text: "Structure your Will with checked legal clauses aligning with the Arunachal Pradesh (Land Deal and Records) Act, 2000, making sure bequests of tribal lands are made to eligible tribal heirs and set uping clear executor powers.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Adult Witnesses with ID",
            text: "Print the paper on standard A4 paper and sign each page in the physical presence of two adult witnesses who receive no legacy or asset under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Schedule Sub-Registrar / DC Office Appointment",
            text: "Coordinate with your areaal Deputy Commissioner (DC) / Additional DC SRO office in Itanagar, Yupia, Pasighat, Tawang, or Ziro and pay nominal government signing charges.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Check & Book III Registration at SRO",
            text: "Attend the SRO office with both witnesses for verbal check, photo capture, and biometric thumbprinting to complete permanent Book III signing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: ARUNACHAL_FAQS.map((item) => ({
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
      <ArunachalPradeshLocationClient faqs={ARUNACHAL_FAQS} />
      <Footer />
    </>
  );
}
