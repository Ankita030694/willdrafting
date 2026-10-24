import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GujaratLocationClient from "./GujaratLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Gujarat: Legal Online Will Making Help",
  },
  description:
    "Draft a legally compliant Will in Gujarat. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession planning online.",
  keywords: [
    "will drafting in gujarat",
    "will registration garvi gujarat",
    "huf business succession will gujarat",
    "anyror land will transfer",
    "estate lawyer ahmedabad",
    "online will maker gujarat",
    "gujarat high court probate exemption",
    "gidc plot lease transfer will",
    "garvi gujarat appointment slot",
    "sub registrar office gujarat will registration",
    "section 31 registration act home visit gujarat",
    "gujarat stamp act will exemption",
    "doctor medical certificate will gujarat",
    "nrg will drafting gujarat",
    "surat diamond business succession will",
    "vadodara will drafting advocate",
    "rajkot engineering firm will succession",
    "anyror 7 12 satbara will mutation gujarat",
    "amc property tax mutation will",
    "smc society flat will transfer surat",
    "ama legal solutions gujarat will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/gujarat",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/gujarat",
      "x-default": "https://www.willdrafting.in/locations/gujarat",
    },
  },
  openGraph: {
    title: "Will Drafting in Gujarat: Legal Online Will Making Help",
    description:
      "Draft a legally compliant Will in Gujarat. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession planning online.",
    url: "https://www.willdrafting.in/locations/gujarat",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-gujarat-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Business Succession in Gujarat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Gujarat: Legal Online Will Making Help",
    description:
      "Draft a legally compliant Will in Gujarat. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession planning online.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-gujarat-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const GUJARAT_FAQS = [
  {
    q: "Is Will registration mandatory in Gujarat?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Gujarat. An unregistered Will executed on plain paper and signed before two independent witnesses is legally enforceable. However, registering your Will at the local Sub-Registrar Office via the Garvi Gujarat portal enters the document into official Book III government custody. This creates irrefutable evidence of genuine execution and prevents property disputes during municipal or AnyRoR land record transfers.",
  },
  {
    q: "Is court probate required for a Will in Gujarat under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory solely in the historical presidency towns of Mumbai, Kolkata, and Chennai. Gujarat is a non-presidency jurisdiction. The High Court of Gujarat, through landmark rulings including Minaxiben Shashikant Patel v. Dave Sundarlal Chunilal (AIR 2002 Guj 122) and Kiritbhai Dayabhai Patel v. State of Gujarat, has established that court probate is non-mandatory for establishing rights under a Will in Gujarat.",
  },
  {
    q: "How does a Will handle HUF business succession and trading firms in Gujarat?",
    a: "Under Mitakshara Hindu law applicable across Gujarat, joint coparcenary property belongs to the HUF as a collective entity. While a Karta cannot bequeath the entire undivided HUF business, Section 30 of the Hindu Succession Act, 1956 empowers any coparcener to lawfully bequeath their individual undivided share. Self-acquired proprietary firms, company equity, and commercial real estate can be transferred directly to chosen successors.",
  },
  {
    q: "What is the official government fee to register a Will in Gujarat?",
    a: "Wills are completely exempt from stamp duty across the state under the Gujarat Stamp Act, 1958. At Gujarat Sub-Registrar offices, testators pay only a flat statutory registration fee of one hundred rupees. Modest computer scanning and data processing charges of ₹100 to ₹200 apply through the Cyber Treasury portal. There is zero percentage-based property market value duty.",
  },
  {
    q: "How is agricultural land transferred via Will on the AnyRoR Gujarat portal?",
    a: "Testamentary transfer of agricultural land across Gujarat must strictly conform to Section 63 of the Gujarat Tenancy and Agricultural Lands Act, 1948, which prohibits transfer to non-agriculturists. Provided the beneficiary qualifies as an agriculturist, the registered Will and death certificate are submitted to the Talathi to initiate an e-Dhara (Pherfar) mutation entry on the AnyRoR portal (anyror.gujarat.gov.in) to update the 7/12 and 8A extracts.",
  },
  {
    q: "How do I book an SRO appointment on the Garvi Gujarat portal?",
    a: "Appointments are scheduled online through the official Inspector General of Registration Gujarat portal (garvi.gujarat.gov.in). You select the jurisdictional Sub-Registrar Office, enter the testator and witness KYC information, upload the Will draft, generate the e-Challan for the statutory fee through the Cyber Treasury gateway, and obtain a confirmed appointment token.",
  },
  {
    q: "Can senior citizens in Gujarat register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden persons, or medically unwell testators can request a home visit by the Sub-Registrar. A registered MBBS doctor must certify that the testator is mentally competent but physically unable to travel. The Sub-Registrar visits the residence with portable biometric equipment to complete registration.",
  },
  {
    q: "How does a registered Will facilitate GIDC industrial plot lease transfer?",
    a: "Industrial plots and factory sheds allotted by the Gujarat Industrial Development Corporation (GIDC) in industrial estates such as Vatva, Naroda, Makarpura, Sachin, or Aji require documented testamentary transfer. A registered Will naming the chosen successor enables smooth GIDC lease transmission without requiring expensive civil court succession certificates.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Gujarat Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid government photo IDs such as Aadhaar cards can serve as witnesses. Under Section 67 of the Indian Succession Act, witnesses and their spouses must not be beneficiaries receiving any property or legacy under the Will. Family friends, physicians, or independent professionals are ideal candidates.",
  },
  {
    q: "Can Non-Resident Gujaratis (NRGs) create a Will for properties in Gujarat?",
    a: "Yes. Thousands of Non-Resident Gujaratis (NRGs) living in the USA, UK, Canada, Australia, and the Middle East hold ancestral properties, apartments, and commercial assets in Gujarat. NRGs can draft a compliant Indian Will online. They can execute it abroad before two independent witnesses and have it apostilled, or register it before a Gujarat Sub-Registrar during an India visit.",
  },
];

export default function GujaratLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/gujarat";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-gujarat.jpg";

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
        name: "Will Drafting in Gujarat: Legal Online Will Making Help",
        description:
          "Draft a legally compliant Will in Gujarat. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession planning online.",
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
          caption: "Online Will Drafting and Business Succession in Gujarat",
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
            name: "Gujarat",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Gujarat - Business Succession & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Garvi Gujarat SRO registration, and business succession planning across Ahmedabad, Surat, Vadodara, and Rajkot.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Ahmedabad" },
          { "@type": "City", name: "Surat" },
          { "@type": "City", name: "Vadodara" },
          { "@type": "City", name: "Rajkot" },
          { "@type": "City", name: "Gandhinagar" },
          { "@type": "City", name: "Bhavnagar" },
          { "@type": "City", name: "Jamnagar" },
          { "@type": "City", name: "Bharuch" },
          { "@type": "City", name: "Ankleshwar" },
          { "@type": "City", name: "Junagadh" },
          { "@type": "City", name: "Bhuj" },
          { "@type": "City", name: "Gandhidham" },
          { "@type": "City", name: "Anand" },
          { "@type": "City", name: "Nadiad" },
          { "@type": "City", name: "Mehsana" },
          { "@type": "City", name: "Morbi" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Gujarat Will Drafting & Business Succession Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Gujarat Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Business Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Gujarat Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Gujarat",
        description:
          "Five verified legal steps to draft and register an enforceable Will before the Sub-Registrar in Gujarat.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Business Holdings",
            text: "List residential flats, commercial properties, HUF shares, GIDC leasehold units, AnyRoR agricultural survey numbers, and financial assets.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using legally vetted clauses for business succession, non-lapse distributions, survivorship, and executor authority.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the physical presence of two independent non-beneficiary witnesses.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Slot on Garvi Gujarat Portal",
            text: "Schedule your registration appointment on the Garvi Gujarat portal (garvi.gujarat.gov.in) and pay the ₹100 registration fee via Cyber Treasury.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Gujarat SRO",
            text: "Visit the local Sub-Registrar Office with both witnesses for identity verification, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: GUJARAT_FAQS.map((item) => ({
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
      <GujaratLocationClient faqs={GUJARAT_FAQS} />
      <Footer />
    </>
  );
}
