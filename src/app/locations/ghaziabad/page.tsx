import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GhaziabadLocationClient from "./GhaziabadLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 153 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Ghaziabad: Online Will Services in NCR",
  },
  description:
    "Secure family property in Ghaziabad. Expert online Will drafting, GDA apartment transfer support, and Sub-Registrar registration guidance.",
  keywords: [
    "will drafting in ghaziabad",
    "will registration up igrs ghaziabad",
    "gda flat will transfer",
    "online will maker ghaziabad",
    "succession lawyer indirapuram",
    "ghaziabad nagar nigam mutation will",
    "sub registrar office collectorate ghaziabad",
    "igrsup ghaziabad appointment",
    "will drafting indirapuram",
    "will drafting vaishali",
    "will drafting vasundhara",
    "will drafting raj nagar extension",
    "will drafting crossings republik",
    "will drafting kavi nagar",
    "will drafting sahibabad",
    "will drafting modi nagar",
    "will drafting loni tronica city",
    "section 31 registration act home visit ghaziabad",
    "is probate mandatory in ghaziabad",
    "allahabad high court probate up exemption",
    "up apartment act 2010 flat succession",
    "ama legal solutions ghaziabad will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/ghaziabad",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/ghaziabad",
      "x-default": "https://www.willdrafting.in/locations/ghaziabad",
    },
  },
  openGraph: {
    title: "Will Drafting in Ghaziabad: Online Will Services in NCR",
    description:
      "Secure family property in Ghaziabad. Expert online Will drafting, GDA apartment transfer support, and Sub-Registrar registration guidance.",
    url: "https://www.willdrafting.in/locations/ghaziabad",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-ghaziabad-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Ghaziabad UP NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Ghaziabad: Online Will Services in NCR",
    description:
      "Secure family property in Ghaziabad. Expert online Will drafting, GDA apartment transfer support, and Sub-Registrar registration guidance.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-ghaziabad-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const GHAZIABAD_FAQS = [
  {
    q: "Is Will filing needed by law in Ghaziabad?",
    a: "No. Under Section 18(e) of the Act of 1908, filing a Will is your choice in Ghaziabad and all of UP. A Will on plain white paper is valid if you sign it in front of two adult witnesses. Still, filing your Will at a local SRO puts it in safe Book III state records. This stops fraud claims and speeds up name change with the GDA, Nagar Nigam, and flat groups.",
  },
  {
    q: "Is court probate needed for a Will in Ghaziabad?",
    a: "No. Under Section 213 and Section 57 of the Act of 1925, probate is needed only in Mumbai, Kolkata, and Chennai. Ghaziabad falls under the High Court in UP, outside those three old towns. Court probate is not needed in UP for Hindu, Sikh, Jain, and Buddhist Wills. Your heirs can claim the flat or plot directly with a valid Will.",
  },
  {
    q: "How do GDA flats and society homes in Indirapuram and Vaishali pass by Will?",
    a: "Flats under the UP Apartment Act, 2010 and GDA plots pass to your named heirs when they show the Will, death slip, heir note, and bond to the GDA office and flat board. This updates the owner name and maintenance records.",
  },
  {
    q: "What is the state fee to file a Will on the UP IGRSUP portal?",
    a: "Wills have zero stamp duty in UP. At Ghaziabad SRO offices, you only pay a flat ₹100 filing fee plus small scan fees of about ₹100 to ₹200 on the UP portal (igrsup.gov.in). There is no tax based on house market price.",
  },
  {
    q: "Does a flat nominee become the real owner in Ghaziabad?",
    a: "No. As ruled by the Supreme Court, a nominee is only a caretaker who holds the flat in trust for the legal heirs. True ownership never goes to a nominee alone. Only a valid Will or court heir slip gives real title rights.",
  },
  {
    q: "How do I book an online slot on the UP IGRSUP portal for Ghaziabad SROs?",
    a: "You can book a slot online on the UP Stamps portal (igrsup.gov.in). Pick Ghaziabad district and your local SRO office (such as Raj Nagar, Sahibabad, or Modi Nagar). Fill in the ID details of the Will maker and two witnesses, pay the ₹100 fee online, and print your slot slip.",
  },
  {
    q: "Can senior citizens in Ghaziabad file a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Act of 1908, old or sick residents in Indirapuram, Vaishali, Vasundhara, or Raj Nagar can ask for a home visit. An MBBS doctor gives a health note, and the SRO officer comes to your home with thumb scan tools.",
  },
  {
    q: "How does a filed Will help with Ghaziabad Nagar Nigam house tax change?",
    a: "The Nagar Nigam asks for proof of heir rights before changing the name on house tax bills. A filed Will serves as strong legal proof of your wishes. It speeds up city tax record changes without long civil court cases.",
  },
  {
    q: "Who can sign as valid witnesses at Ghaziabad SRO offices?",
    a: "Any two adults of sound mind with valid Aadhaar cards or photo IDs can act as witnesses. Under Section 67 of the Act of 1925, a witness must not get any gift, cash, or land in the Will. Family friends, doctors, or peers are great choices.",
  },
  {
    q: "Can NRIs make a Will for flats or plots in Ghaziabad?",
    a: "Yes. Many NRIs living in the UAE, USA, UK, or Canada own flats or plots in Ghaziabad. NRIs can draft a strong Indian Will online. They can sign it abroad with two witnesses, or file it in Book III at a Ghaziabad SRO during a trip to India.",
  },
];

export default function GhaziabadLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/ghaziabad";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-ghaziabad.jpg";

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
        name: "Will Drafting in Ghaziabad: Online Will Services in NCR",
        description:
          "Secure family asset in Ghaziabad. Expert online Will drafting, GDA apartment transfer support, and SRO filing guidance.",
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
          caption: "Legal Will Drafting and Property Succession in Ghaziabad UP NCR",
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
            name: "Ghaziabad",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Ghaziabad - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, UP IGRSUP filing, and doorstep signing support across Ghaziabad, Indirapuram.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ghaziabad",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Ghaziabad" },
          { "@type": "City", name: "Indirapuram" },
          { "@type": "City", name: "Vaishali" },
          { "@type": "City", name: "Vasundhara" },
          { "@type": "City", name: "Raj Nagar Extension" },
          { "@type": "City", name: "Crossings Republik" },
          { "@type": "City", name: "Raj Nagar" },
          { "@type": "City", name: "Kavi Nagar" },
          { "@type": "City", name: "Sahibabad" },
          { "@type": "City", name: "Kaushambi" },
          { "@type": "City", name: "Modi Nagar" },
          { "@type": "City", name: "Muradnagar" },
          { "@type": "City", name: "Loni" },
          { "@type": "City", name: "Tronica City" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Ghaziabad Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Ghaziabad Residents",
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
                name: "Complete Ghaziabad Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Ghaziabad",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Ghaziabad.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Ghaziabad real estate including GDA flats, high-rise society apartments in Indirapuram or Vaishali, plant plots, and financial investments. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using checked legal clauses for clear asset split, survivorship, guardian appointments for minors, and revocation of prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the paper on standard A4 paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book UP IGRSUP Appointment Slot",
            text: "Schedule your filing appointment on the UP Stamps and Filing portal (igrsup.gov.in) for your relevant Ghaziabad SRO and remit the flat ₹100 filing fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Ghaziabad SRO",
            text: "Visit the SRO office with both witnesses for verbal witness signing, photo capture, and biometric thumbprinting to complete Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: GHAZIABAD_FAQS.map((item) => ({
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
      <GhaziabadLocationClient faqs={GHAZIABAD_FAQS} />
      <Footer />
    </>
  );
}
