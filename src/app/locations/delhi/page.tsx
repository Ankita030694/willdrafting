import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DelhiLocationClient from "./DelhiLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Delhi: Online Will Registration Guide",
  },
  description:
    "Draft a legally valid Will in Delhi. Expert lawyer drafting, e-registration guidance at Sub-Registrar offices, and home execution support.",
  keywords: [
    "will drafting in delhi",
    "will drafting in hauz khas",
    "will drafting in vasant kunj",
    "will drafting in south extension",
    "will drafting in greater kailash",
    "will drafting in dwarka",
    "will drafting in rohini",
    "will drafting in pitampura",
    "will drafting in saket",
    "will drafting in lajpat nagar",
    "will drafting in defence colony",
    "will drafting in laxmi nagar",
    "will drafting in preet vihar",
    "will registration delhi sub registrar",
    "online will maker delhi ncr",
    "will lawyer new delhi",
    "succession planning delhi",
    "revenue department delhi will registration",
    "sub registrar e appointment delhi",
    "doris delhi will registration",
    "sub registrar office hauz khas will registration",
    "sub registrar office dwarka will registration",
    "sub registrar office pitampura will registration",
    "is probate mandatory in delhi",
    "dda flat transfer through will",
    "section 31 registration act home visit delhi",
    "will registration fees in delhi",
    "doctor medical certificate will delhi",
    "ama legal solutions delhi will drafting",
    "delhi high court will succession rules",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/delhi",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/delhi",
      "x-default": "https://www.willdrafting.in/locations/delhi",
    },
  },
  openGraph: {
    title: "Will Drafting in Delhi: Online Will Registration Guide",
    description:
      "Draft a legally valid Will in Delhi. Expert lawyer drafting, e-registration guidance at Sub-Registrar offices, and home execution support.",
    url: "https://www.willdrafting.in/locations/delhi",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-delhi-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Registration Services in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Delhi: Online Will Registration Guide",
    description:
      "Draft a legally valid Will in Delhi. Expert lawyer drafting, e-registration guidance at Sub-Registrar offices, and home execution support.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-delhi-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const DELHI_FAQS = [
  {
    q: "Is Will registration mandatory in Delhi?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Delhi. A Will written on plain white paper and signed before two witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office prevents future property disputes and speeds up DDA, MCD, or L&DO title mutation.",
  },
  {
    q: "Is probate required for a Will in Delhi?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Delhi is a non-presidency town. The Delhi High Court has confirmed in multiple rulings that obtaining court probate is not mandatory for Hindu, Sikh, Jain, and Buddhist Wills in Delhi.",
  },
  {
    q: "What is the official government fee to register a Will in Delhi?",
    a: "Wills are completely exempt from stamp duty across India under the Indian Stamp Act, 1899. At Delhi Sub-Registrar offices, you only pay a nominal registration fee of ₹100, plus official scanning and pasting charges of approximately ₹100 to ₹200. There are no percentage-based property taxes for registering a Will.",
  },
  {
    q: "How do I book an online appointment for Will registration in Delhi?",
    a: "Appointments are booked through the Delhi Revenue Department portal (DORIS or e-District Delhi). You select your district Sub-Registrar office, upload required testator and witness details, pay the nominal fee online, and download your e-appointment slip with a designated time slot.",
  },
  {
    q: "Can a Delhi Sub-Registrar visit a senior citizen at home for registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically infirm testators can request a home visit by the Sub-Registrar. You must submit a doctor's medical fitness certificate and pay a government commission fee. Our Delhi legal team manages the complete paperwork for doorstep registration.",
  },
  {
    q: "How does a registered Will help in transferring a DDA flat or builder floor?",
    a: "A registered Will serves as conclusive proof of the testator's intentions before the Delhi Development Authority (DDA), Land and Development Office (L&DO), and Municipal Corporation of Delhi (MCD). It eliminates the need for expensive court succession certificates and streamlines municipal property tax mutation.",
  },
  {
    q: "Do I need a doctor's certificate to register a Will in Delhi?",
    a: "While not compulsory for young testators, a doctor's fitness certificate from an MBBS practitioner is strongly recommended for seniors aged 60 and above. The certificate certifies that the testator is of sound mental mind, protecting the Will against false claims of dementia or coercion.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Delhi NCR properties?",
    a: "Yes. NRIs owning flats, kothis, or plots in Delhi, Noida, or Gurgaon can draft their Will online. They can execute it abroad before two independent witnesses, or complete formal SRO registration during an India visit, or appoint a Power of Attorney for local estate representation.",
  },
];

export default function DelhiLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/delhi";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-delhi-og.jpg";

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
        name: "Will Drafting in Delhi: Online Will Registration Guide",
        description:
          "Draft a legally valid Will in Delhi. Expert lawyer drafting, e-filing guidance at SRO offices, and home signing support.",
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
          caption: "Will Drafting & Registration Services in Delhi NCR",
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
            name: "Delhi NCR",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Delhi - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, and SRO office e-filing support across all 11 revenue districts of Delhi NCR.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "New Delhi",
          addressRegion: "Delhi",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "New Delhi" },
          { "@type": "City", name: "Delhi" },
          { "@type": "City", name: "Hauz Khas" },
          { "@type": "City", name: "Vasant Kunj" },
          { "@type": "City", name: "South Extension" },
          { "@type": "City", name: "Greater Kailash" },
          { "@type": "City", name: "Dwarka" },
          { "@type": "City", name: "Rohini" },
          { "@type": "City", name: "Pitampura" },
          { "@type": "City", name: "Saket" },
          { "@type": "City", name: "Lajpat Nagar" },
          { "@type": "City", name: "Defence Colony" },
          { "@type": "City", name: "Laxmi Nagar" },
          { "@type": "City", name: "Preet Vihar" },
          { "@type": "City", name: "Noida" },
          { "@type": "City", name: "Gurgaon" },
          { "@type": "City", name: "Faridabad" },
          { "@type": "City", name: "Ghaziabad" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Delhi Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Delhi Residents",
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
                name: "Complete Delhi Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Delhi NCR",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Delhi.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Beneficiaries",
            text: "List your Delhi assets including DDA flats, builder floors, bank accounts, and demat holdings. Name your heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include revocation, survivorship, and specific asset clauses.",
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
            name: "Book Delhi SRO Appointment on DORIS",
            text: "Book an e-appointment on the Delhi Revenue Office portal for your local SRO office and pay the nominal ₹100 filing fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the SRO office with your two witnesses and original IDs for biometric fingerprinting, digital photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: DELHI_FAQS.map((item) => ({
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
      <DelhiLocationClient faqs={DELHI_FAQS} />
      <Footer />
    </>
  );
}
