import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HyderabadLocationClient from "./HyderabadLocationClient";

// Title: Exactly 56 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Hyderabad: Online Will & Asset Planning",
  },
  description:
    "Draft a legally valid Will in Hyderabad. Easy registration via IGRS Telangana, property succession, and experienced advocate review for your family.",
  keywords: [
    "will drafting in hyderabad",
    "will registration igrs telangana",
    "online will draft secunderabad",
    "property will lawyer hyderabad",
    "asset distribution hyderabad",
    "will drafting in banjara hills",
    "will drafting in jubilee hills",
    "will drafting in hitec city",
    "will drafting in gachibowli",
    "will drafting in madhapur",
    "will drafting in kondapur",
    "will drafting in kukatpally",
    "will drafting in secunderabad",
    "will drafting in arredpally",
    "will drafting in dilsukhnagar",
    "will drafting in tellapur",
    "sub registrar office serilingampally will registration",
    "sub registrar office banjara hills will registration",
    "sub registrar office khairatabad will registration",
    "sub registrar office secunderabad will registration",
    "is probate mandatory in hyderabad",
    "is probate mandatory in telangana",
    "ghmc property mutation through will",
    "dharani portal will succession telangana",
    "section 31 registration act home visit hyderabad",
    "will registration fees in telangana",
    "doctor medical certificate will hyderabad",
    "ama legal solutions hyderabad will drafting",
    "telangana high court will succession rules",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/hyderabad",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/hyderabad",
      "x-default": "https://www.willdrafting.in/locations/hyderabad",
    },
  },
  openGraph: {
    title: "Will Drafting in Hyderabad: Online Will & Asset Planning",
    description:
      "Draft a legally valid Will in Hyderabad. Easy registration via IGRS Telangana, property succession, and experienced advocate review for your family.",
    url: "https://www.willdrafting.in/locations/hyderabad",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-hyderabad-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Registration Services in Hyderabad Telangana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Hyderabad: Online Will & Asset Planning",
    description:
      "Draft a legally valid Will in Hyderabad. Easy registration via IGRS Telangana, property succession, and experienced advocate review for your family.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-hyderabad-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const HYDERABAD_FAQS = [
  {
    q: "Is Will registration mandatory in Hyderabad and Telangana?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Telangana. An unregistered Will signed on plain white paper before two independent witnesses is legally valid. However, registering your Will at the local Sub-Registrar Office via IGRS Telangana provides strong legal evidentiary value and streamlines GHMC property mutation.",
  },
  {
    q: "Is court probate required for a Will in Hyderabad?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Hyderabad and Telangana are non-presidency jurisdictions. The Hon'ble High Court for the State of Telangana has confirmed that obtaining court probate is not mandatory for Hindu, Sikh, Jain, and Buddhist Wills.",
  },
  {
    q: "What is the official government fee to register a Will in Hyderabad?",
    a: "Wills are completely exempt from stamp duty across Telangana under the Indian Stamp Act, 1899 (₹0 stamp duty). At the Sub-Registrar Office, you only pay a nominal government registration fee under the IGRS Telangana schedule (typically ₹200 to ₹1,000) along with minor computerized scanning charges. There are no percentage-based property taxes for registering a Will.",
  },
  {
    q: "How do I book an online appointment on the IGRS Telangana portal?",
    a: "Appointments are booked through the official Registration and Stamps Department portal (registration.telangana.gov.in). You select your district (Hyderabad, Ranga Reddy, or Medchal-Malkajgiri), choose your local Sub-Registrar Office, enter testator and witness identification details, pay the nominal fee, and download your e-appointment slip with a designated time slot.",
  },
  {
    q: "Can a Telangana Sub-Registrar visit an elderly testator at home for registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or hospital patients can request a home visit by the Sub-Registrar. You must submit a doctor's medical fitness certificate from a registered MBBS practitioner and pay the prescribed government attendance commission. Our Hyderabad legal team assists with the complete doorstep procedure.",
  },
  {
    q: "How does a registered Will help in transferring GHMC property or HMDA plots?",
    a: "A registered Will serves as conclusive proof of testamentary succession before the Greater Hyderabad Municipal Corporation (GHMC), HMDA, and CDMA. It enables direct mutation of Property Tax Identification Numbers (PTIN) and title records without demanding expensive civil court succession certificates or protracted newspaper notification processes.",
  },
  {
    q: "How does a Will affect agricultural land or farmhouses on the Dharani portal?",
    a: "Telangana manages agricultural lands and peri-urban farmhouses through the Dharani portal (dharani.telangana.gov.in). While a Will legally transfers ownership upon death, succession mutation must be processed through the Tahsildar / Joint Collector. Having a registered Will prepared by experienced advocates ensures that survey numbers and passbook records transition smoothly without boundary disputes.",
  },
  {
    q: "What are the rules for daughters and ancestral property in Telugu families?",
    a: "Telangana and Andhra Pradesh pioneered equal rights for daughters through AP Act 13 of 1986, which was later codified nationally in the Hindu Succession (Amendment) Act 2005. Daughters are coparceners by birth with equal rights in ancestral property (Pithrurjitha Asthi). A testator can only bequeath their undivided share in coparcenary property, while retaining 100% testamentary freedom over self-acquired assets (Swajitha Asthi).",
  },
  {
    q: "Can Cyberabad IT professionals include US RSUs, ESOPs, and crypto in a Hyderabad Will?",
    a: "Yes. Tech professionals living in HITEC City, Gachibowli, or Kondapur holding US stocks, vested Restricted Stock Units (RSUs), ESOPs, mutual funds, and crypto wallets can comprehensively include them in a Will. An advocate-drafted Will aligns nominee designations with beneficiary bequests and appoints a capable executor to oversee smooth asset transmission.",
  },
  {
    q: "Do I need a doctor's medical certificate for Will registration in Hyderabad?",
    a: "While not compulsory for young adults, a doctor's fitness certificate from an MBBS practitioner is strongly recommended for senior testators aged 60 and above. The certificate certifies that the testator is of sound disposing mind and memory, protecting the Will against false future allegations of coercion, fraud, or mental incapacity.",
  },
];

export default function HyderabadLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/hyderabad";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-hyderabad-og.jpg";

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
        name: "Will Drafting in Hyderabad: Online Will & Asset Planning",
        description:
          "Draft a legally valid Will in Hyderabad. Easy registration via IGRS Telangana, property succession, and experienced advocate review for your family.",
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
          caption: "Will Drafting & Property Registration in Hyderabad Telangana",
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
            name: "Hyderabad",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Hyderabad - Estate Planning & IGRS Telangana Registration",
        description:
          "Professional Will drafting, lawyer verification, and Sub-Registrar Office e-registration support across Hyderabad, Secunderabad, and Cyberabad.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "City", name: "Secunderabad" },
          { "@type": "City", name: "Banjara Hills" },
          { "@type": "City", name: "Jubilee Hills" },
          { "@type": "City", name: "HITEC City" },
          { "@type": "City", name: "Gachibowli" },
          { "@type": "City", name: "Madhapur" },
          { "@type": "City", name: "Kondapur" },
          { "@type": "City", name: "Kukatpally" },
          { "@type": "City", name: "Miyapur" },
          { "@type": "City", name: "Begumpet" },
          { "@type": "City", name: "Marredpally" },
          { "@type": "City", name: "Dilsukhnagar" },
          { "@type": "City", name: "LB Nagar" },
          { "@type": "City", name: "Charminar" },
          { "@type": "City", name: "Tellapur" },
          { "@type": "City", name: "Kokapet" },
          { "@type": "City", name: "Shamshabad" },
          { "@type": "City", name: "Malkajgiri" },
          { "@type": "City", name: "Uppal" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Hyderabad Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Hyderabad Residents",
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
                name: "Complete Telangana IGRS Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Hyderabad",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Hyderabad.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Beneficiaries",
            text: "List your Hyderabad real estate including GHMC flats, HMDA plots, bank FDs, demat holdings, and jewellery. Name your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Precision Legal Clauses",
            text: "Draft your Will using our online legal platform or with an experienced estate advocate to include revocation, survivorship, and specific asset bequests.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book IGRS Telangana Portal Slot",
            text: "Book an e-appointment on the IGRS Telangana portal (registration.telangana.gov.in) for your local Sub-Registrar Office and pay the nominal government fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the Sub-Registrar Office with your two witnesses and original IDs for biometric thumb verification, digital photo capture, and official Book-III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: HYDERABAD_FAQS.map((item) => ({
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
      <HyderabadLocationClient faqs={HYDERABAD_FAQS} />
      <Footer />
    </>
  );
}
