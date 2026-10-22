import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KolkataLocationClient from "./KolkataLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 149 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Kolkata: Registration & Probate Rules",
  },
  description:
    "Protect ancestral and self-acquired assets in Kolkata. Learn Calcutta High Court probate rules, Will drafting, and registration across West Bengal.",
  keywords: [
    "will drafting in kolkata",
    "calcutta high court probate will",
    "will registration west bengal e-district",
    "ancestral property will kolkata",
    "estate lawyer kolkata",
    "will drafting advocate kolkata",
    "registrar of assurances kolkata will registration",
    "dayabhaga law ancestral property will",
    "section 213 indian succession act kolkata",
    "probate lawyer calcutta high court",
    "dsr alipore will registration",
    "sro bidhannagar will registration",
    "salt lake leasehold flat will kolkata",
    "kmc property mutation with will kolkata",
    "online will maker kolkata",
    "doorstep will registration kolkata section 31",
    "will drafting lawyer ballygunge",
    "will drafting advocate alipore",
    "will drafting in new town kolkata",
    "doctor medical certificate will kolkata",
    "ama legal solutions kolkata will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/kolkata",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/kolkata",
      "x-default": "https://www.willdrafting.in/locations/kolkata",
    },
  },
  openGraph: {
    title: "Will Drafting in Kolkata: Registration & Probate Rules",
    description:
      "Protect ancestral and self-acquired assets in Kolkata. Learn Calcutta High Court probate rules, Will drafting, and registration across West Bengal.",
    url: "https://www.willdrafting.in/locations/kolkata",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-kolkata-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Probate Assistance in Kolkata West Bengal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Kolkata: Registration & Probate Rules",
    description:
      "Protect ancestral and self-acquired assets in Kolkata. Learn Calcutta High Court probate rules, Will drafting, and registration across West Bengal.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-kolkata-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const KOLKATA_FAQS = [
  {
    q: "Is probate mandatory for a Will in Kolkata?",
    a: "Yes. Under Section 213 read with Section 57(a) and 57(b) of the Indian Succession Act, 1925, probate is statutorily compulsory for Hindu, Buddhist, Sikh, and Jain Wills executed within the Ordinary Original Civil Jurisdiction of the Calcutta High Court, or where the Will bequeaths immovable property situated within Kolkata city limits. An executor must secure probate from the Calcutta High Court or the competent District Court (such as Alipore) before establishing legal title or selling the property.",
  },
  {
    q: "Is Will registration mandatory in Kolkata and West Bengal?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across West Bengal. An unregistered Will executed on plain paper and signed before two witnesses is legally valid. However, in Kolkata, registering your Will at the Registrar of Assurances (ARA) or local District Sub-Registrar (DSR) office provides official government proof, minimizes forgery challenges during Calcutta High Court probate, and simplifies KMC mutation.",
  },
  {
    q: "How does Dayabhaga law affect ancestral property Wills in Kolkata?",
    a: "Under the Dayabhaga school of Hindu law prevailing in West Bengal, children do not acquire any birthright in ancestral property. The father or property holder has absolute and unrestricted ownership during their lifetime. This means a testator in Kolkata can freely bequeath ancestral as well as self-acquired property through a Will without coparcenary consent, unlike under Mitakshara law in Northern or Western India.",
  },
  {
    q: "What is the official government fee to register a Will in Kolkata?",
    a: "Wills are 100% exempt from stamp duty across West Bengal under the Indian Stamp Act, 1899. At the Registrar of Assurances Kolkata or District Sub-Registrar offices, testators pay only a flat nominal registration fee of ₹100 to ₹200, plus official scanning and computer processing fees of approximately ₹100 to ₹300. There is zero percentage-based property tax for registering a Will.",
  },
  {
    q: "Can a Kolkata Sub-Registrar visit a senior citizen at home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or medically infirm testators can request a home or hospital visit by the Sub-Registrar. You must submit an MBBS doctor medical fitness certificate and pay the official government commission and conveyance fee. Our Kolkata legal team coordinates the entire requisition and doorstep registration.",
  },
  {
    q: "How does a probated Will help in mutating Kolkata Municipal Corporation (KMC) property?",
    a: "A probated Will serves as conclusive testamentary proof before the Kolkata Municipal Corporation (KMC) Revenue Department. It allows the executor or beneficiaries to update the KMC Assessee Number, obtain fresh property tax bills in their name, and avoid lengthy partition disputes among joint heirs.",
  },
  {
    q: "Can a 999-year leasehold property in Salt Lake (Bidhannagar) be bequeathed in a Will?",
    a: "Yes. Salt Lake properties held under 999-year residential leases from the Urban Development Department (UDD), Government of West Bengal, can be bequeathed to legal heirs. The Will must specifically reference the original lease deed terms. Following probate, beneficiaries apply for leasehold mutation at Nagarayan Bhavan, Salt Lake.",
  },
  {
    q: "Where are the primary Sub-Registrar offices located in the Kolkata metropolitan area?",
    a: "Core city properties are registered at the Office of the Registrar of Assurances (ARA I to IV) at 5, Council House Street / Stephen House, B.B.D. Bagh. South Kolkata and suburban properties are registered at DSR Alipore (Judges Court Road), SRO Behala, or SRO Kasba. Salt Lake and New Town properties fall under SRO Bidhannagar and DSR Barasat.",
  },
  {
    q: "Do I need an MBBS doctor certificate to execute a Will in Kolkata?",
    a: "While not compulsory for younger testators, an MBBS practitioner medical fitness certificate is strongly recommended, especially for testators aged 60 and above. The certificate certifies that the testator was of sound mind, memory, and understanding, protecting the Will against allegations of dementia or undue influence during mandatory Calcutta High Court probate.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Kolkata properties?",
    a: "Yes. NRIs residing in the USA, UK, Canada, UAE, or elsewhere can draft their Will online for Kolkata apartments, ancestral houses, and bank accounts. The Will can be executed abroad before two independent witnesses and notarized or apostilled through the Indian Embassy/Consulate, or registered during a visit to Kolkata.",
  },
];

export default function KolkataLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/kolkata";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-kolkata-og.jpg";

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
        name: "Will Drafting in Kolkata: Registration & Probate Rules",
        description:
          "Protect ancestral and self-acquired assets in Kolkata. Learn Calcutta High Court probate rules, Will drafting, and registration across West Bengal.",
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
          caption: "Online Will Drafting and Probate Assistance in Kolkata",
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
            name: "Kolkata",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Kolkata - Estate Planning, SRO Registration & Calcutta HC Probate",
        description:
          "Professional Will drafting, Dayabhaga ancestral asset guidance, Calcutta High Court probate compliance, and Sub-Registrar registration across Kolkata and Greater West Bengal.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kolkata",
          addressRegion: "West Bengal",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Kolkata" },
          { "@type": "City", name: "Alipore" },
          { "@type": "City", name: "Ballygunge" },
          { "@type": "City", name: "Salt Lake" },
          { "@type": "City", name: "New Town" },
          { "@type": "City", name: "Park Street" },
          { "@type": "City", name: "Shyambazar" },
          { "@type": "City", name: "Behala" },
          { "@type": "City", name: "Jadavpur" },
          { "@type": "City", name: "Kasba" },
          { "@type": "City", name: "Garia" },
          { "@type": "City", name: "Tollygunge" },
          { "@type": "City", name: "Howrah" },
          { "@type": "City", name: "Dum Dum" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Kolkata Will Drafting & Probate Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Kolkata Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Consultation & Calcutta HC Probate Advisory",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Kolkata SRO Registration & Doorstep Service",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft, Register, and Probate a Will in Kolkata",
        description:
          "Five clear steps to create a legally binding Will, register before the Sub-Registrar, and prepare for Calcutta High Court probate in West Bengal.",
        totalTime: "P4D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Catalog Assets Under Dayabhaga Rules",
            text: "List your Kolkata properties including KMC flats, ancestral paras, Salt Lake leaseholds, bank accounts, and demat portfolios. Confirm sole ownership under Dayabhaga law.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Probate Clauses",
            text: "Draft your Will with specialized legal clauses appointing a trusted executor and defining clear bequests tailored to Calcutta High Court probate guidelines.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two adult independent witnesses who are not beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book e-District West Bengal Appointment",
            text: "Book an online appointment on the West Bengal Registration portal (wbregistration.gov.in) for the Registrar of Assurances or your district SRO.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Registration at SRO",
            text: "Visit the SRO with your witnesses for biometric thumb impressions, digital photographs, and official entry into Book III government archives.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: KOLKATA_FAQS.map((item) => ({
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
      <KolkataLocationClient faqs={KOLKATA_FAQS} />
      <Footer />
    </>
  );
}
