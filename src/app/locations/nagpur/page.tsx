import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NagpurLocationClient from "./NagpurLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 146 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Nagpur: Legal Online Will Making Help",
  },
  description:
    "Draft your Will in Nagpur with confidence. Professional lawyer consultation, Vidarbha property succession rules, and IGR registration assistance.",
  keywords: [
    "will drafting in nagpur",
    "will registration nagpur sro",
    "vidarbha property succession will",
    "advocate for will drafting nagpur",
    "online will maharashtra",
    "nit plot will transfer nagpur",
    "nmc property mutation will",
    "sub registrar office civil lines nagpur",
    "sub registrar office gandhibagh nagpur",
    "sub registrar office hingna nagpur",
    "sub registrar office kamptee nagpur",
    "bombay high court nagpur bench probate",
    "article 64 maharashtra stamp act nagpur",
    "section 31 registration act nagpur doorstep",
    "dharampeth ramdaspeth dhantoli will lawyer nagpur",
    "agricultural land will vidarbha 7/12 extract",
    "nagpur improvement trust leasehold will transfer",
    "nagpur municipal corporation property tax mutation will",
    "senior citizen will registration at home nagpur",
    "will lawyer wardha road nagpur",
    "ama legal solutions nagpur will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/nagpur",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/nagpur",
      "x-default": "https://www.willdrafting.in/locations/nagpur",
    },
  },
  openGraph: {
    title: "Will Drafting in Nagpur: Legal Online Will Making Help",
    description:
      "Draft your Will in Nagpur with confidence. Professional lawyer consultation, Vidarbha property succession rules, and IGR registration assistance.",
    url: "https://www.willdrafting.in/locations/nagpur",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-nagpur-og.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and Registration Services in Nagpur Maharashtra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Nagpur: Legal Online Will Making Help",
    description:
      "Draft your Will in Nagpur with confidence. Professional lawyer consultation, Vidarbha property succession rules, and IGR registration assistance.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-nagpur-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const NAGPUR_FAQS = [
  {
    q: "Is Will registration mandatory in Nagpur?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Nagpur and across Maharashtra. A Will written on plain paper is legally valid if signed by the testator in the presence of two independent witnesses. However, registering your Will at the local Nagpur Sub-Registrar Office places it in government Book III records. This prevents family disputes and speeds up NIT lease transfers and NMC property tax mutation.",
  },
  {
    q: "Is probate required for a Will in Nagpur under Bombay High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Nagpur is a non-presidency jurisdiction. The Bombay High Court (Nagpur Bench) has repeatedly ruled that court probate is non-compulsory for Hindu, Sikh, Jain, and Buddhist Wills in Nagpur and Vidarbha. Legal heirs can directly mutate title with a registered Will.",
  },
  {
    q: "How do I transfer an NIT (Nagpur Improvement Trust) plot using a Will?",
    a: "To transfer an NIT leasehold plot or flat, the designated beneficiary must submit the registered Will, official death certificate, indemnity bond, affidavit, and an NOC from other legal heirs to the Nagpur Improvement Trust office. Because probate is not mandatory in Nagpur, NIT transfers the lease rights directly based on the registered Will and local verification.",
  },
  {
    q: "What is the official government fee to register a Will in Nagpur?",
    a: "Wills are 100% exempt from stamp duty across Maharashtra under Article 64 of the Maharashtra Stamp Act. At Nagpur Sub-Registrar offices (Civil Lines, Gandhibagh, Hingna, Kamptee), you only pay a flat government registration fee of ₹100, along with nominal scanning and document handling fees of approximately ₹100 to ₹300. There are zero percentage-based property charges.",
  },
  {
    q: "Can a Nagpur Sub-Registrar visit a senior citizen at home for registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators can request a home visit by the Sub-Registrar. An MBBS medical practitioner must issue a fitness certificate certifying mental soundness and physical inability to travel. Our Nagpur legal team coordinates the application, fee deposit, and Sub-Registrar doorstep visit across Dharampeth, Ramdaspeth, Dhantoli, and Wardha Road.",
  },
  {
    q: "How do I update my name in NMC property tax records after inheriting a house in Nagpur?",
    a: "You submit a mutation application (Varasdar Nond) to the respective Nagpur Municipal Corporation (NMC) zonal office (e.g., Dharampeth, Dhantoli, Gandhibagh, Laxmi Nagar zones). You attach a certified copy of the registered Will, death certificate, recent property tax paid receipt, and an affidavit. NMC issues a public notice and mutates the tax index-II into the beneficiary's name.",
  },
  {
    q: "Can agricultural land and orange orchards in Vidarbha be bequeathed in a Will?",
    a: "Yes. Self-acquired agricultural farmland and orchards across Nagpur rural, Saoner, Katol, Kalmeshwar, and Hingna can be bequeathed through a Will. Upon the testator's demise, the beneficiary applies to the Talathi with the registered Will for a Ferfar (mutation entry) to update the 7/12 (Saat Bara) and 8-A revenue records under the Maharashtra Land Revenue Code, 1966.",
  },
  {
    q: "How does the IGR Maharashtra e-Stepin portal work for booking a Will registration slot in Nagpur?",
    a: "Testators book their SRO appointment through the Inspector General of Registration Maharashtra portal (igrmaharashtra.gov.in) using the e-Stepin token system. You select the relevant Nagpur Sub-Registrar Office (e.g., SRO Nagpur 1 Civil Lines or SRO 3 Gandhibagh), enter testator and witness identification details, pay the ₹100 fee online, and download your scheduled token slip.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties in Nagpur?",
    a: "Yes. NRIs owning residential apartments, commercial shops, or ancestral plots in Nagpur can draft an online Will. They can execute it abroad before two independent witnesses and have it attested by the Indian Embassy or apostilled under the Hague Convention. Alternatively, they can execute and register it before a Nagpur Sub-Registrar during their India visit.",
  },
];

export default function NagpurLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/nagpur";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-nagpur-og.jpg";

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
        name: "Will Drafting in Nagpur: Legal Online Will Making Help",
        description:
          "Draft your Will in Nagpur with confidence. Professional lawyer talk, Vidarbha asset estate rules, and IGR filing help.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.willdrafting.in/#website",
          name: "WillDrafting.in",
          url: "https://www.willdrafting.in",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1024,
          height: 576,
          caption: "Will Drafting & Registration Services in Nagpur Vidarbha",
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
            name: "Nagpur",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Nagpur - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer talk, Vidarbha asset estate, and IGR Maharashtra SRO filing support across Nagpur.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nagpur",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Nagpur" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "Dharampeth" },
          { "@type": "City", name: "Ramdaspeth" },
          { "@type": "City", name: "Dhantoli" },
          { "@type": "City", name: "Shivaji Nagar" },
          { "@type": "City", name: "Laxmi Nagar" },
          { "@type": "City", name: "Wardha Road" },
          { "@type": "City", name: "Besa" },
          { "@type": "City", name: "Manish Nagar" },
          { "@type": "City", name: "Mahal" },
          { "@type": "City", name: "Gandhibagh" },
          { "@type": "City", name: "Itwari" },
          { "@type": "City", name: "Hingna" },
          { "@type": "City", name: "Kamptee" },
          { "@type": "City", name: "Trimurti Nagar" },
          { "@type": "City", name: "Pratap Nagar" },
          { "@type": "City", name: "Nandanvan" },
          { "@type": "City", name: "Koradi Road" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Nagpur Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Nagpur Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Advocate Will Consultation for NIT & Vidarbha Property",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Nagpur SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Nagpur Maharashtra",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Nagpur.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Inventory Vidarbha Assets and Select Heirs",
            text: "List your Nagpur assets including NMC houses, NIT leasehold plots, 7/12 farm land, bank deposits, and shares. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Bombay High Court Compliant Clauses",
            text: "Draft your Will using our online legal platform or with an lawyer to include clear bequest clauses, executor appointment, and non-presidency estate declarations.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the physical presence of two adult witnesses who are not heirs under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Nagpur SRO Slot on IGR Maharashtra e-Stepin",
            text: "Book an online token on the IGR Maharashtra e-Stepin portal for your local SRO (Civil Lines, Gandhibagh, Hingna, or Kamptee) and pay the ₹100 government fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Recording at Nagpur Sub-Registrar",
            text: "Visit the SRO office with two witnesses and original Aadhaar cards for biometric thumbprint capture, digital photography, and Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: NAGPUR_FAQS.map((item) => ({
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
      <NagpurLocationClient faqs={NAGPUR_FAQS} />
      <Footer />
    </>
  );
}
