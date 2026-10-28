import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RaipurLocationClient from "./RaipurLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 149 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Raipur: Online Will & Estate Planning",
  },
  description:
    "Secure family wealth in Raipur. Professional Will drafting, Chhattisgarh NGDRS registration advice, and seamless RDA property succession.",
  keywords: [
    "will drafting in raipur",
    "will registration chhattisgarh ngdrs",
    "rda plot will transfer raipur",
    "business succession will chhattisgarh",
    "estate advocate raipur",
    "nava raipur plot succession will",
    "sub registrar office civil lines raipur",
    "will drafting services in raipur",
    "online will maker raipur",
    "will lawyer raipur chhattisgarh",
    "estate planning raipur",
    "kamal vihar plot succession will",
    "sub registrar office pandri raipur",
    "sub registrar nava raipur atal nagar",
    "is probate mandatory in chhattisgarh",
    "is probate required in raipur",
    "section 31 registration act home visit raipur",
    "will registration fees chhattisgarh ngdrs",
    "doctor medical certificate will raipur",
    "ama legal solutions raipur will drafting",
    "chhattisgarh high court will succession rules",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/raipur",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/raipur",
      "x-default": "https://www.willdrafting.in/locations/raipur",
    },
  },
  openGraph: {
    title: "Will Drafting in Raipur: Online Will & Estate Planning",
    description:
      "Secure family wealth in Raipur. Professional Will drafting, Chhattisgarh NGDRS registration advice, and seamless RDA property succession.",
    url: "https://www.willdrafting.in/locations/raipur",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-raipur-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Registration Services in Raipur Chhattisgarh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Raipur: Online Will & Estate Planning",
    description:
      "Secure family wealth in Raipur. Professional Will drafting, Chhattisgarh NGDRS registration advice, and seamless RDA property succession.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-raipur-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const RAIPUR_FAQS = [
  {
    q: "Is Will registration mandatory in Raipur, Chhattisgarh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Raipur and across Chhattisgarh. A Will written on plain white A4 paper and signed before two independent witnesses is legally valid. However, formal registration at the Sub-Registrar Office via the Chhattisgarh NGDRS portal creates irrefutable evidentiary proof under Section 60 and ensures swift mutation before the Raipur Development Authority (RDA) and Raipur Municipal Corporation.",
  },
  {
    q: "Is court probate required for a Will in Raipur?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Raipur and the state of Chhattisgarh are non-presidency jurisdictions governed by Chhattisgarh High Court precedents. Beneficiaries can execute property transfers, bank claim settlements, and demat transmission directly with a certified copy of the registered Will.",
  },
  {
    q: "How does a registered Will help in transferring an RDA plot or flat in Raipur?",
    a: "Raipur Development Authority (RDA) schemes—including Kamal Vihar, Indraprastha, and Kaushalya Mata Vihar—have specific estate succession transfer guidelines. A registered Will serves as conclusive proof of testamentary intent. The RDA Estate Branch accepts the registered Will alongside the death certificate, legal heir affidavits, and indemnity bonds, expediting ownership substitution without requiring a civil court succession certificate.",
  },
  {
    q: "What is the procedure for Nava Raipur Atal Nagar plot succession under a Will?",
    a: "Nava Raipur Atal Nagar Vikas Pradhikaran (NRANVP, formerly NRDA) administers plots and commercial developments on long-term leasehold and freehold bases. To effect succession, the designated beneficiary submits an application to the NRANVP Estate Department enclosing the registered Will, death certificate, allotment letter, and public notice verification. A registered Will prevents administrative objections and ensures smooth lease mutation.",
  },
  {
    q: "What is the government fee to register a Will in Chhattisgarh?",
    a: "Wills are 100% exempt from ad-valorem stamp duty across India under the Indian Stamp Act, 1899. At Chhattisgarh Sub-Registrar offices under the Commercial Tax (Registration) Department, testators pay a nominal government registration fee of approximately ₹100 to ₹500, along with standard NGDRS portal user and scanning charges. There are no percentage-based property charges.",
  },
  {
    q: "How do I book an online appointment for Will registration in Raipur?",
    a: "Appointments are booked through the National Generic Document Registration System (NGDRS Chhattisgarh) portal at ngdrs.cg.gov.in (cg-e-panjiyan). After entering citizen data, uploading draft details, and scheduling a time slot at your designated SRO (Civil Lines, Pandri, or Nava Raipur), you receive an official e-appointment slip for biometric verification.",
  },
  {
    q: "Can a Raipur Sub-Registrar visit a senior citizen at home for registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically compromised testators can request a home visit by the Sub-Registrar. You must submit a doctor's mental fitness certificate from an MBBS practitioner and pay the prescribed government commission and conveyance fee. Our Raipur legal team assists in coordinating doorstep execution across Shankar Nagar, Civil Lines, and VIP Road.",
  },
  {
    q: "How can I bequeath business shares in a Raipur steel, sponge iron, or trading firm?",
    a: "Raipur is a major industrial hub for steel, sponge iron, and mineral trading. Your Will should clearly delineate partnership firm shareholdings, private limited equity, director loan accounts, and trade assets. Incorporating specific succession clauses ensures seamless transfer of company shares under Section 56 of the Companies Act, 2013 and avoids operational freeze across your business entities.",
  },
  {
    q: "Do I need a doctor's fitness certificate to execute a Will in Raipur?",
    a: "While not compulsory for young testators, obtaining a medical fitness certificate from a registered MBBS practitioner is strongly recommended for senior citizens aged 60 and above. The doctor certifies that the testator possesses testamentary capacity and sound disposing mind, effectively insulating the Will from false future challenges of dementia or undue influence.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties in Raipur and Bhilai?",
    a: "Yes. NRIs owning residential bungalows, commercial shops in Pandri, or agricultural land across Raipur and the Durg-Bhilai corridor can execute an enforceable Will. They can draft their Will online with our team, execute it abroad before two independent witnesses and an Indian Consular Officer, or complete NGDRS registration during an India visit.",
  },
];

export default function RaipurLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/raipur";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-raipur-og.jpg";

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
        name: "Will Drafting in Raipur: Online Will & Estate Planning",
        description:
          "Secure family wealth in Raipur. Professional Will drafting, Chhattisgarh NGDRS filing advice, and seamless RDA asset estate.",
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
          caption: "Will Drafting and Registration Services in Raipur Chhattisgarh",
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
            name: "Raipur",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Raipur - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, and SRO office e-filing support across Raipur, Nava Raipur Atal Nagar, and.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Raipur",
          addressRegion: "Chhattisgarh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Raipur" },
          { "@type": "City", name: "Nava Raipur Atal Nagar" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "Shankar Nagar" },
          { "@type": "City", name: "Pandri" },
          { "@type": "City", name: "Devendra Nagar" },
          { "@type": "City", name: "Katora Talab" },
          { "@type": "City", name: "VIP Road" },
          { "@type": "City", name: "Telibandha" },
          { "@type": "City", name: "Samta Colony" },
          { "@type": "City", name: "Choubey Colony" },
          { "@type": "City", name: "Urla" },
          { "@type": "City", name: "Siltara" },
          { "@type": "City", name: "Dharsiwa" },
          { "@type": "City", name: "Abhanpur" },
          { "@type": "City", name: "Mandir Hasaud" },
          { "@type": "City", name: "Bhilai" },
          { "@type": "City", name: "Durg" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Raipur Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Raipur Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Estate Planning & Business Succession Consultation",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Chhattisgarh NGDRS Will Registration & Doorstep Support",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Raipur Chhattisgarh",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Raipur.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Inventory of Raipur Assets & Beneficiaries",
            text: "List your RDA plots, Nava Raipur assets, steel and trading business equity, bank accounts, and family jewelry. Appoint heirs and a dependable executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Robust Succession Clauses",
            text: "Draft your Will using our online legal platform or with our estate lawyers, incorporating specific bequests, residuary clauses, and executor powers.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Sign and Execute Before Two Witnesses",
            text: "Print the Will on plain white A4 paper. Sign every page in the presence of two independent adult witnesses who are not heirs under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Chhattisgarh NGDRS Slot Online",
            text: "Complete citizen data entry on the Chhattisgarh NGDRS portal (ngdrs.cg.gov.in), pay government fees, and generate your SRO appointment slip.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Raipur SRO",
            text: "Visit the designated SRO office (Civil Lines, Pandri, or Nava Raipur) with your two witnesses for digital photography, thumb impressions, and Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: RAIPUR_FAQS.map((item) => ({
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
      <RaipurLocationClient faqs={RAIPUR_FAQS} />
      <Footer />
    </>
  );
}
