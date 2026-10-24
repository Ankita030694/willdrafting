import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AndhraPradeshLocationClient from "./AndhraPradeshLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 150 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Andhra Pradesh: Online Will Making Guide",
  },
  description:
    "Draft a legally valid Will in Andhra Pradesh. Expert lawyer drafting, AP IGRS registration guidance, and statewide agricultural & urban asset planning.",
  keywords: [
    "will drafting in andhra pradesh",
    "will registration ap igrs",
    "online will draft andhra",
    "property will lawyer ap",
    "succession planning andhra pradesh",
    "ap igrs will registration portal",
    "meebhoomi portal will mutation",
    "visakhapatnam will drafting",
    "vijayawada will registration",
    "guntur will drafting lawyer",
    "amaravati apcrda will transfer",
    "vmrda plot will succession",
    "tirupati tuda will registration",
    "rajamahendravaram will lawyer",
    "kakinada port will drafting",
    "nellore property will registration",
    "kurnool will drafting advocate",
    "section 31 registration act home visit ap",
    "is probate mandatory in andhra pradesh",
    "andhra pradesh high court probate exemption",
    "1 b adangal will transfer meebhoomi",
    "ama legal solutions andhra pradesh will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/andhra-pradesh",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/andhra-pradesh",
      "x-default": "https://www.willdrafting.in/locations/andhra-pradesh",
    },
  },
  openGraph: {
    title: "Will Drafting in Andhra Pradesh: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Andhra Pradesh. Expert lawyer drafting, AP IGRS registration guidance, and statewide agricultural & urban asset planning.",
    url: "https://www.willdrafting.in/locations/andhra-pradesh",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-andhra-pradesh-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Andhra Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Andhra Pradesh: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Andhra Pradesh. Expert lawyer drafting, AP IGRS registration guidance, and statewide agricultural & urban asset planning.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-andhra-pradesh-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const AP_FAQS = [
  {
    q: "Is Will registration mandatory in Andhra Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Andhra Pradesh. A Will written on plain paper and signed before two independent witnesses is legally valid. However, registering your Will at an AP Sub-Registrar Office places it in permanent Book III government custody. This prevents fraudulent challenges and ensures fast mutation with municipal corporations and the Meebhoomi portal.",
  },
  {
    q: "Is probate required for a Will in Andhra Pradesh under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Andhra Pradesh is a non-presidency state. The Andhra Pradesh High Court at Amaravati has consistently affirmed that court probate is non-mandatory for Hindu, Sikh, Jain, and Buddhist Wills to establish title or transfer property.",
  },
  {
    q: "What is the official government fee to register a Will in Andhra Pradesh?",
    a: "Wills are completely exempt from ad-valorem stamp duty across Andhra Pradesh under the Indian Stamp Act as adopted in the state. At AP Sub-Registrar offices, you only pay a nominal statutory registration fee of approximately ₹100 to ₹200 plus minor scanning and document handling charges. There are no percentage-based property market charges.",
  },
  {
    q: "How are agricultural lands transferred and mutated via the Meebhoomi portal in AP?",
    a: "For agricultural parcels, mutation is processed under the Andhra Pradesh Rights in Land and Pattadar Pass Books Act. Following the testator's demise, the beneficiary submits the registered Will and death certificate to the local Tahsildar or Village Revenue Officer (VRO). The Record of Rights is updated online through the Meebhoomi portal (meebhoomi.ap.gov.in), reflecting on 1-B Adangal and digital e-Pattadar passbooks.",
  },
  {
    q: "How does a registered Will help in transferring properties under APCRDA, VMRDA, or TUDA?",
    a: "Urban development authorities including APCRDA in Amaravati, VMRDA in Visakhapatnam, and TUDA in Tirupati require clear testamentary succession proof to transfer residential plots, commercial units, or leasehold rights. A registered Will serves as conclusive title evidence before single-window municipal portals, preventing lengthy civil court succession disputes.",
  },
  {
    q: "How do I book an AP IGRS online appointment in Andhra Pradesh?",
    a: "Appointments are scheduled digitally through the Andhra Pradesh Registration & Stamps Department portal (registration.ap.gov.in). You select the district SRO, input testator and witness KYC details, upload the draft Will, generate the CFMS Cyber Treasury payment challan, and download a confirmed appointment slot slip.",
  },
  {
    q: "Can senior citizens in Andhra Pradesh register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with medical mobility restrictions can request a home visit by the Sub-Registrar. A registered MBBS doctor certifies that the testator is mentally competent but physically unable to travel. The Sub-Registrar visits your home with portable biometric equipment.",
  },
  {
    q: "How does a registered Will simplify municipal property mutation with GVMC, VMC, and GMC?",
    a: "Municipal bodies like Greater Visakhapatnam Municipal Corporation (GVMC), Vijayawada Municipal Corporation (VMC), and Guntur Municipal Corporation (GMC) require definitive succession evidence for updating property tax registers. A registered Will provides conclusive proof of the deceased testator's bequest, eliminating the need for expensive civil court succession certificates.",
  },
  {
    q: "Who can serve as valid attesting witnesses at AP Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will. Family doctors, trusted neighbors, or long-standing family friends are ideal.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located across Andhra Pradesh?",
    a: "Yes. Many Telugu NRIs residing in the USA, UK, UAE, Australia, or Singapore own apartments, commercial sites, or ancestral lands across Andhra Pradesh. NRIs can draft a legally compliant Will online. They can execute it before two witnesses abroad and have it consular-notarized or apostilled, or register it before an AP Sub-Registrar during their visit to India.",
  },
];

export default function AndhraPradeshLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/andhra-pradesh";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-andhra-pradesh.jpg";

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
        name: "Will Drafting in Andhra Pradesh: Online Will Making Guide",
        description:
          "Draft a legally valid Will in Andhra Pradesh. Expert lawyer drafting, AP IGRS registration guidance, and statewide agricultural & urban asset planning.",
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
          caption: "Legal Will Drafting and Property Succession in Andhra Pradesh",
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
            name: "Andhra Pradesh",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Andhra Pradesh - Estate Planning & AP IGRS Registration",
        description:
          "Professional Will drafting, advocate verification, AP IGRS registration guidance, Meebhoomi land record integration, and doorstep execution support across all 26 districts of Andhra Pradesh.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Amaravati",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Andhra Pradesh" },
          { "@type": "City", name: "Visakhapatnam" },
          { "@type": "City", name: "Vijayawada" },
          { "@type": "City", name: "Guntur" },
          { "@type": "City", name: "Amaravati" },
          { "@type": "City", name: "Tirupati" },
          { "@type": "City", name: "Rajamahendravaram" },
          { "@type": "City", name: "Kakinada" },
          { "@type": "City", name: "Nellore" },
          { "@type": "City", name: "Kurnool" },
          { "@type": "City", name: "Anantapur" },
          { "@type": "City", name: "Kadapa" },
          { "@type": "City", name: "Vizianagaram" },
          { "@type": "City", name: "Eluru" },
          { "@type": "City", name: "Ongole" },
          { "@type": "City", name: "Chittoor" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Andhra Pradesh Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Andhra Pradesh Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & AP Asset Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete AP Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Andhra Pradesh",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Andhra Pradesh.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Andhra Pradesh assets including GVMC or VMC apartments, commercial units, APCRDA or VMRDA plots, Meebhoomi agricultural farmlands, and bank investments. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, survivorship, guardian appointments for minors, and revocation of prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 executive bond or plain paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book AP IGRS Online Appointment",
            text: "Schedule your registration appointment on the AP IGRS portal for your local Sub-Registrar Office and remit the nominal registration fee via CFMS Cyber Treasury challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at AP Sub-Registrar Office",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: AP_FAQS.map((item) => ({
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
      <AndhraPradeshLocationClient faqs={AP_FAQS} />
      <Footer />
    </>
  );
}
