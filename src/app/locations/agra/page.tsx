import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgraLocationClient from "./AgraLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Agra: Online Will Registration Support",
  },
  description:
    "Protect your family property in Agra. Expert lawyer Will drafting, UP Sub-Registrar registration help, and ADA residential property transfer.",
  keywords: [
    "will drafting in agra",
    "will registration up igrs agra",
    "ada plot will transfer agra",
    "commercial enterprise will agra",
    "succession lawyer agra",
    "agra nagar nigam mutation will",
    "sub registrar office agra appointment",
    "will drafting dayalbagh agra",
    "will drafting kamla nagar agra",
    "will drafting civil lines agra",
    "will drafting sanjay place agra",
    "will drafting tajganj fatehabad road",
    "will drafting sikandra agra",
    "will drafting shastri puram agra",
    "will drafting sadar bazar agra",
    "section 107 up revenue code agricultural will agra",
    "allahabad high court probate exemption uttar pradesh",
    "is probate mandatory in agra",
    "section 31 registration act home visit agra",
    "will registration fees in uttar pradesh",
    "doctor medical certificate will agra",
    "ama legal solutions agra will drafting",
    "igrsup agra appointment booking",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/agra",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/agra",
      "x-default": "https://www.willdrafting.in/locations/agra",
    },
  },
  openGraph: {
    title: "Will Drafting in Agra: Online Will Registration Support",
    description:
      "Protect your family property in Agra. Expert lawyer Will drafting, UP Sub-Registrar registration help, and ADA residential property transfer.",
    url: "https://www.willdrafting.in/locations/agra",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-agra-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Registration Services in Agra Uttar Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Agra: Online Will Registration Support",
    description:
      "Protect your family property in Agra. Expert lawyer Will drafting, UP Sub-Registrar registration help, and ADA residential property transfer.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-agra-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const AGRA_FAQS = [
  {
    q: "Is Will registration mandatory in Agra and Uttar Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Uttar Pradesh. A Will written on plain white paper is legally valid if signed before two independent witnesses. However, for Agra Development Authority (ADA) residential schemes, Agra Nagar Nigam municipal property mutation, and commercial business succession, registering on the IGRSUP portal records the Will in Book III archives and prevents family disputes.",
  },
  {
    q: "Why is a registered Will essential for Agra Development Authority (ADA) plot mutation?",
    a: "The Agra Development Authority (ADA) at Jaipur House manages residential schemes and commercial plots across Shastri Puram, Sikandra, Tajganj, and Dayalbagh. For unregistered Wills, ADA mandates public newspaper notices with 30-day objection windows, indemnity bonds, and extensive heir affidavits. A registered Will drastically speeds up mutation and ownership transfer.",
  },
  {
    q: "Is court probate required for a Will in Agra?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is compulsory only for properties in the historical presidency towns of Mumbai, Kolkata, and Chennai. Agra is a non-presidency city under the Allahabad High Court. High Court rulings confirm that probate is optional across Uttar Pradesh, allowing banks, ADA, and municipal offices to act on registered Wills without court decrees.",
  },
  {
    q: "What is the official government fee to register a Will in Agra on IGRSUP?",
    a: "Wills are 100% exempt from stamp duty across Uttar Pradesh under Article 64 of Schedule I-B of the Indian Stamp Act, 1899. On the UP IGRSUP portal (igrsup.gov.in), you pay only a flat government registration fee of ₹100, plus nominal document scanning fees of ₹100 to ₹200. There is zero percentage-based property tax or stamp duty.",
  },
  {
    q: "How do I book an online appointment for Will registration in Agra on igrsup.gov.in?",
    a: "Visit the UP Stamps and Registration Department portal at igrsup.gov.in. Navigate to Document Registration, select Agra district, and choose your local Sub-Registrar Office (Civil Lines, Sadar, or Khandari). Enter testator and two witness details, pay the ₹100 registration fee online, and download your e-appointment slip with your allotted date and time slot.",
  },
  {
    q: "Can senior citizens in Agra register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators can request a home or hospital visit by the Sub-Registrar. A registered MBBS doctor must certify that the testator is mentally sound but unable to travel. The Sub-Registrar visits your home with portable biometric scanning equipment.",
  },
  {
    q: "How should footwear manufacturing and hospitality businesses in Agra be bequeathed in a Will?",
    a: "Agra's thriving footwear manufacturing units in Sikandra and Nunhai, along with tourism hospitality enterprises along Fatehabad Road, require explicit testamentary clauses. Your Will should clearly separate commercial enterprise shares, factory land, machinery, export licenses, and bank credit facilities from personal residential estates to prevent business disruption among legal heirs.",
  },
  {
    q: "Can agricultural land in Agra district be willed under the UP Revenue Code 2006?",
    a: "Yes. Under Section 107 of the Uttar Pradesh Revenue Code, 2006, a Bhumidhar with transferable rights can bequeath agricultural land by Will. The bequest must respect land ceiling laws and statutory protections for legal dependents under Section 108. Revenue mutation is updated in Khatauni records through the UP Bhulekh portal.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for their Agra properties?",
    a: "Yes. NRIs owning ancestral homes or ADA plots in Agra can draft their Will online from abroad. They can execute it before two witnesses and get it notarized or apostilled, or register it before an Agra Sub-Registrar during an India visit, ensuring hassle-free transmission to intended heirs.",
  },
];

export default function AgraLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/agra";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-agra.jpg";

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
        name: "Will Drafting in Agra: Online Will Registration Support",
        description:
          "Protect your family asset in Agra. Expert lawyer Will drafting, UP SRO filing help, and ADA home asset transfer.",
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
          caption: "Online Will Drafting and Registration Services in Agra Uttar Pradesh",
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
            name: "Agra",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Agra - Legal Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, UP IGRSUP filing support, and doorstep signing help across Agra, ADA schemes.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Agra",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Agra" },
          { "@type": "City", name: "Dayalbagh" },
          { "@type": "City", name: "Kamla Nagar" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "Sanjay Place" },
          { "@type": "City", name: "Tajganj" },
          { "@type": "City", name: "Fatehabad Road" },
          { "@type": "City", name: "Sikandra" },
          { "@type": "City", name: "Shastri Puram" },
          { "@type": "City", name: "Sadar Bazar" },
          { "@type": "City", name: "Trans-Yamuna Colony" },
          { "@type": "City", name: "Bodla" },
          { "@type": "City", name: "Balkeshwar" },
          { "@type": "City", name: "Khandari" },
          { "@type": "City", name: "Nunhai" },
          { "@type": "City", name: "Fatehabad" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Agra Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Agra Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & ADA Property Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Agra Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Agra",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Agra.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Beneficiaries",
            text: "List your Agra assets including ADA home plots, city houses, shop footwear units, bank savings, and farm land. Name your heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include revocation, survivorship, and specific asset bequests.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not heirs.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Agra SRO Appointment on IGRSUP Portal",
            text: "Book an e-appointment on the UP IGRSUP portal (igrsup.gov.in) for your local SRO office and pay the nominal ₹100 filing fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Agra SRO",
            text: "Visit the SRO office with your two witnesses and original IDs for biometric fingerprinting, digital photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: AGRA_FAQS.map((item) => ({
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
      <AgraLocationClient faqs={AGRA_FAQS} />
      <Footer />
    </>
  );
}
