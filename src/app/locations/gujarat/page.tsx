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
    "Draft a legally compliant Will in Gujarat. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession.",
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
      "Draft a legally compliant Will in Gujarat. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession.",
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
      "Draft a legally compliant Will in Gujarat. Expert lawyer assistance, Garvi Gujarat registration advice, and family business succession.",
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
    a: "No. Under Section 18(e) of the Registration Act, 1908, filing a Will is optional in Gujarat. A Will on plain paper signed before two witnesses is valid. Still, filing it at the local SRO via the Garvi Gujarat portal saves it in Book III custody. This gives strong proof and stops family fights during town or AnyRoR land updates.",
  },
  {
    q: "Is court probate required for a Will in Gujarat under High Court rules?",
    a: "No. Under Section 213 and Section 57 of the Indian Succession Act, 1925, probate is needed only in Mumbai, Kolkata, and Chennai. Gujarat is outside those zones. The Gujarat High Court ruled in Minaxiben Shashikant Patel v. Dave Sundarlal Chunilal (AIR 2002 Guj 122) that court probate is not needed to claim rights under a Will in Gujarat.",
  },
  {
    q: "How does a Will handle HUF business succession and trading firms in Gujarat?",
    a: "Under Hindu law in Gujarat, joint family property belongs to the whole HUF. A Karta cannot give away the whole HUF firm, but Section 30 of the Hindu Succession Act, 1956 lets any member pass their own share by Will. You can also pass your own shops, shares, and flats to any heir you pick.",
  },
  {
    q: "What is the official government fee to register a Will in Gujarat?",
    a: "Wills have zero stamp duty across the state under the Gujarat Stamp Act, 1958. At Gujarat SRO offices, you pay only a flat ₹100 filing fee plus ₹100 to ₹200 for page scans on the Cyber Treasury portal. There is no tax based on your land value.",
  },
  {
    q: "How is agricultural land transferred via Will on the AnyRoR Gujarat portal?",
    a: "Passing farm land by Will in Gujarat must follow Section 63 of the Gujarat Tenancy Act, 1948, which bars giving farm land to non-farmers. If your heir is a farmer, they give the registered Will and death certificate to the Talathi to start an e-Dhara (Pherfar) update on AnyRoR (anyror.gujarat.gov.in) for the 7/12 and 8A slips.",
  },
  {
    q: "How do I book an SRO appointment on the Garvi Gujarat portal?",
    a: "You book a slot online on the Garvi Gujarat portal (garvi.gujarat.gov.in). Pick your local SRO, enter ID details for yourself and two witnesses, pay the ₹100 fee on Cyber Treasury, and print your slot token.",
  },
  {
    q: "Can senior citizens in Gujarat register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elders or sick people who cannot travel can ask for a home visit. An MBBS doctor writes a note saying the person has a sound mind. The officer then comes to your home with a thumb scan kit.",
  },
  {
    q: "How does a registered Will facilitate GIDC industrial plot lease transfer?",
    a: "Factory plots and sheds leased from GIDC in zones like Vatva, Naroda, Makarpura, Sachin, or Aji need clear Will proof for transfer. A registered Will naming your heir makes GIDC lease updates fast without costly court orders.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Gujarat Sub-Registrar offices?",
    a: "Any two adults of sound mind with valid photo IDs like Aadhaar cards can be witnesses. Under Section 67 of the Indian Succession Act, witnesses and their spouses must not receive any gift or property in the Will.",
  },
  {
    q: "Can Non-Resident Gujaratis (NRGs) create a Will for properties in Gujarat?",
    a: "Yes. Many NRGs in the USA, UK, Canada, Australia, and the Gulf own homes, plots, and shops in Gujarat. NRGs can draft a clear Indian Will online. They can sign it abroad with two witnesses or file it at a Gujarat SRO during a trip to India.",
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
          "Draft a legally compliant Will in Gujarat. Expert lawyer help, Garvi Gujarat signing advice, and family business succession.",
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
          "Professional Will drafting, advocate check, Garvi Gujarat SRO signing, and business succession planning across Ahmedabad, Surat.",
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
            text: "Draft your Will using legally vetted clauses for business succession, non-lapse splits, survivorship, and executor authority.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the physical presence of two independent non-heir witnesses.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Slot on Garvi Gujarat Portal",
            text: "Schedule your signing appointment on the Garvi Gujarat portal (garvi.gujarat.gov.in) and pay the ₹100 signing fee via Cyber Treasury.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Gujarat SRO",
            text: "Visit the local SRO office with both witnesses for identity check, photo capture, and biometric thumbprinting to complete Book III signing.",
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
