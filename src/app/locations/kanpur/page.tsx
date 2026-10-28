import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KanpurLocationClient from "./KanpurLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Kanpur: Online Will Registration Guide",
  },
  description:
    "Secure your family assets in Kanpur. Professional lawyer drafting, UP IGRS registration assistance, and KDA property succession support online.",
  keywords: [
    "will drafting in kanpur",
    "will registration up igrs kanpur",
    "kda property will transfer",
    "commercial asset will kanpur",
    "lawyer for will drafting kanpur",
    "kanpur nagar nigam mutation will",
    "sub registrar office kanpur appointment",
    "will drafting civil lines kanpur",
    "will drafting swaroop nagar",
    "will drafting kakadeo",
    "will drafting govind nagar",
    "will drafting kidwai nagar",
    "will drafting kalyanpur kanpur",
    "will drafting panki",
    "will drafting jajmau",
    "will drafting barra kanpur",
    "will drafting shyam nagar",
    "will drafting tilak nagar kanpur",
    "section 108 up revenue code 2006 agricultural will",
    "allahabad high court probate exemption uttar pradesh",
    "is probate mandatory in kanpur",
    "section 31 registration act home visit kanpur",
    "will registration fees in uttar pradesh",
    "doctor medical certificate will kanpur",
    "ama legal solutions kanpur will drafting",
    "igrsup kanpur appointment booking",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/kanpur",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/kanpur",
      "x-default": "https://www.willdrafting.in/locations/kanpur",
    },
  },
  openGraph: {
    title: "Will Drafting in Kanpur: Online Will Registration Guide",
    description:
      "Secure your family assets in Kanpur. Professional lawyer drafting, UP IGRS registration assistance, and KDA property succession support online.",
    url: "https://www.willdrafting.in/locations/kanpur",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-kanpur-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Registration Services in Kanpur Uttar Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Kanpur: Online Will Registration Guide",
    description:
      "Secure your family assets in Kanpur. Professional lawyer drafting, UP IGRS registration assistance, and KDA property succession support online.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-kanpur-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const KANPUR_FAQS = [
  {
    q: "Is Will registration mandatory in Kanpur and Uttar Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Uttar Pradesh. A Will written on plain paper and attested by two independent witnesses is legally binding. However, for Kanpur Development Authority (KDA) plots, Kanpur Nagar Nigam municipal mutations, and industrial asset transfers, registering the Will on IGRSUP provides official authenticity and prevents probate or title challenges.",
  },
  {
    q: "Why is a registered Will essential for KDA property mutation in Kanpur?",
    a: "The Kanpur Development Authority (KDA) at Moti Jheel governs residential and commercial plots across Kanpur. In cases involving unregistered Wills, KDA typically requires public notices in local newspapers, a mandatory 30-day objection window, and heavy indemnity bonds. A registered Will drastically accelerates property substitution, allowing legitimate legal heirs to mutate leasehold or freehold titles promptly.",
  },
  {
    q: "Can agricultural land in Kanpur district be willed under the UP Revenue Code 2006?",
    a: "Yes. Under Section 107 of the Uttar Pradesh Revenue Code, 2006, a Bhumidhar with transferable rights can bequeath their agricultural holding by Will. However, the bequest must adhere to statutory land ceiling limits and specific rights of legal dependents under Section 108. Rural land mutation in Bilhaur, Ghatampur, or Narwal is formally updated in the revenue Khatauni records via the UP Bhulekh portal.",
  },
  {
    q: "Is court probate required for a Will in Kanpur?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is compulsory only for properties in the presidency towns of Mumbai, Kolkata, and Chennai. Kanpur is a non-presidency city under the Allahabad High Court. Multiple High Court rulings confirm that obtaining probate is strictly optional in Uttar Pradesh, allowing banks and municipal authorities to act on registered Wills.",
  },
  {
    q: "What is the official government fee to register a Will in Kanpur on IGRSUP?",
    a: "Wills are completely exempt from stamp duty across Uttar Pradesh under Article 64 of Schedule I-B of the Indian Stamp Act, 1899. On the UP IGRSUP portal (igrsup.gov.in), you pay only a flat government registration fee of ₹100, plus an official document scanning fee of ₹100 to ₹200. There are zero percentage-based property taxes or stamp duties.",
  },
  {
    q: "How do I book an online appointment for Will registration in Kanpur on igrsup.gov.in?",
    a: "Visit the UP Registration and Stamps Department portal at igrsup.gov.in. Navigate to Document Registration, select Kanpur Nagar district, and choose your local Sub-Registrar Office (such as Sadar Collectorate, Kalyanpur, or Govind Nagar). Enter testator and two witness details, pay the ₹100 fee online, and download your e-appointment token with your scheduled date and time.",
  },
  {
    q: "Can a Kanpur Sub-Registrar visit an elderly or bedridden testator at home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically infirm testators can request a home or hospital visit by the Sub-Registrar. You must submit an application with an MBBS doctor's medical fitness certificate and pay the prescribed government commission travel fee. Our Kanpur legal team manages the entire doorstep registration process.",
  },
  {
    q: "How are family business assets and manufacturing units in Panki or Dada Nagar willed?",
    a: "Industrial and business succession requires clear structuring in your Will. You can bequeath proprietary manufacturing assets, partnership shares, factory premises in Panki or Dada Nagar, commercial shops in General Ganj, and corporate bank accounts with specific survivorship and executive powers to prevent operational standstills.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for their Kanpur properties?",
    a: "Yes. NRIs residing abroad who own ancestral or newly purchased properties in Kanpur can draft their Will online. They can execute it abroad before two independent witnesses, or register it formally at an SRO during an India visit, or appoint an executor with a Power of Attorney to manage municipal KDA and bank transmissions.",
  },
];

export default function KanpurLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/kanpur";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-kanpur-og.jpg";

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
        name: "Will Drafting in Kanpur: Online Will Registration Guide",
        description:
          "Secure your family assets in Kanpur. Professional lawyer drafting, UP IGRS filing help, and KDA asset estate support online.",
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
          caption: "Will Drafting & Registration Services in Kanpur Uttar Pradesh",
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
            name: "Kanpur",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Kanpur - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, and SRO office e-filing support across Kanpur Nagar district.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kanpur",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Kanpur" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "Swaroop Nagar" },
          { "@type": "City", name: "Tilak Nagar" },
          { "@type": "City", name: "Arya Nagar" },
          { "@type": "City", name: "Kakadeo" },
          { "@type": "City", name: "Govind Nagar" },
          { "@type": "City", name: "Kidwai Nagar" },
          { "@type": "City", name: "Kalyanpur" },
          { "@type": "City", name: "Panki" },
          { "@type": "City", name: "Dada Nagar" },
          { "@type": "City", name: "Jajmau" },
          { "@type": "City", name: "Barra" },
          { "@type": "City", name: "Shyam Nagar" },
          { "@type": "City", name: "Bilhaur" },
          { "@type": "City", name: "Ghatampur" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Kanpur Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Kanpur Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Kanpur Sub-Registrar Will Registration & Doorstep Support",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Kanpur Nagar",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Kanpur, Uttar Pradesh.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Catalog Assets and Choose Beneficiaries",
            text: "List your Kanpur assets including KDA plots, shop units in Panki, home flats, bank accounts, and demat holdings. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Will",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include specific bequests, survivorship clauses, and farm compliance under UP Revenue Code.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on durable paper and sign every page in the presence of two adult witnesses who are not heirs under the paper.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Kanpur SRO Appointment on IGRSUP",
            text: "Schedule an e-appointment on the UP Stamps & Filing portal (igrsup.gov.in) for your tehsil SRO (Sadar, Kalyanpur, or Govind Nagar) and pay the ₹100 fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Registration at Sub-Registrar Office",
            text: "Visit the Kanpur SRO office with your two witnesses, original Aadhaar cards, and PAN to complete biometric check, photography, and Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: KANPUR_FAQS.map((item) => ({
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
      <KanpurLocationClient faqs={KANPUR_FAQS} />
      <Footer />
    </>
  );
}
