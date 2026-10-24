import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChhattisgarhLocationClient from "./ChhattisgarhLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 154 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Chhattisgarh: Online Will Making Guide",
  },
  description:
    "Draft a legally valid Will in Chhattisgarh. Complete NGDRS e-panjiyan guidance, Bhuiyan land portal mutation, and commercial business succession support.",
  keywords: [
    "will drafting in chhattisgarh",
    "will registration chhattisgarh ngdrs",
    "bhuiyan portal will transfer",
    "online will maker raipur",
    "estate lawyer bilaspur",
    "chhattisgarh high court probate exemption",
    "ngdrs cg e panjiyan appointment",
    "rda plot will transfer raipur",
    "nava raipur plot succession will",
    "bhilai steel plant quarter will succession",
    "chhattisgarh land revenue code namantran",
    "section 170-b tribal land will chhattisgarh",
    "sub registrar office civil lines raipur",
    "bilaspur collectorate sro will registration",
    "durg bhilai sub registrar will appointment",
    "korba estate planning will",
    "raigarh industrial succession will",
    "rajnandgaon will drafting advocate",
    "section 31 registration act home visit chhattisgarh",
    "doctor mental fitness certificate will chhattisgarh",
    "sponge iron business succession will chhattisgarh",
    "csidc industrial lease will transfer",
    "nri will drafting chhattisgarh",
    "ama legal solutions chhattisgarh will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/chhattisgarh",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/chhattisgarh",
      "x-default": "https://www.willdrafting.in/locations/chhattisgarh",
    },
  },
  openGraph: {
    title: "Will Drafting in Chhattisgarh: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Chhattisgarh. Complete NGDRS e-panjiyan guidance, Bhuiyan land portal mutation, and commercial business succession support.",
    url: "https://www.willdrafting.in/locations/chhattisgarh",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-chhattisgarh-og.jpg",
        width: 1200,
        height: 630,
        alt: "Will Drafting Services in Chhattisgarh and Property Succession",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Chhattisgarh: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Chhattisgarh. Complete NGDRS e-panjiyan guidance, Bhuiyan land portal mutation, and commercial business succession support.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-chhattisgarh-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const CHHATTISGARH_FAQS = [
  {
    q: "Is Will registration mandatory in Chhattisgarh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Chhattisgarh. A Will written or typed on plain white paper is legally valid if signed before two independent witnesses. However, registering your Will at a Chhattisgarh Sub-Registrar Office via the NGDRS portal places it in permanent Book III government custody. This protects against fraudulent challenges and accelerates mutation on the Bhuiyan land records portal and municipal records.",
  },
  {
    q: "Is court probate required for a Will in Chhattisgarh under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Chhattisgarh is a non-presidency state. The High Court of Chhattisgarh at Bilaspur has settled that probate is non-mandatory for Hindu, Sikh, Jain, and Buddhist Wills, allowing direct asset transfer upon presenting a registered Will.",
  },
  {
    q: "What is the official government fee to register a Will in Chhattisgarh?",
    a: "Testamentary Wills are 100% exempt from ad-valorem stamp duty across Chhattisgarh under the Indian Stamp Act, 1899 as applicable to the state. At Chhattisgarh Sub-Registrar offices, testators only pay a nominal statutory registration fee of approximately ₹100 to ₹500 via the NGDRS portal, alongside minor scanning and computer service fees. There are zero percentage-based charges tied to property market valuation.",
  },
  {
    q: "How is agricultural land transferred via the Bhuiyan portal using a registered Will?",
    a: "Agricultural land mutation (Namantran) in Chhattisgarh is governed by Section 109 and Section 110 of the Chhattisgarh Land Revenue Code, 1959. Following the testator's demise, the nominated beneficiary submits an application with the registered Will and death certificate to the local Tehsildar or Patwari. The Patwari updates the computerized B-1 (Khatiyan) and P-II (Khasra) records on the official Bhuiyan portal (bhuiyan.cg.nic.in).",
  },
  {
    q: "How does a Will handle RDA schemes and Nava Raipur Atal Nagar smart city plots?",
    a: "Properties allotted by the Raipur Development Authority (RDA) and Nava Raipur Atal Nagar Development Authority (NRDA) include 90-year leasehold and freehold plots. A registered Will directs smooth mutation of leasehold rights and prevents dispute charges. The beneficiary submits the registered Will and certified death certificate to the authority's single-window cell for undisputed substitution of allottee name.",
  },
  {
    q: "Can tribal land in Schedule V areas of Chhattisgarh be bequeathed through a Will?",
    a: "Testators must exercise strict caution. Under Section 170-B of the Chhattisgarh Land Revenue Code, 1959, agricultural land belonging to an Aboriginal Tribe (Scheduled Tribe) cannot be alienated, transferred, or bequeathed to a non-tribal person. A Will attempting to transfer tribal land to a non-tribal is void ab initio. Specialized legal drafting ensures complete compliance with tribal land tenure safeguards.",
  },
  {
    q: "How do I book an NGDRS e-Panjiyan registration appointment in Chhattisgarh?",
    a: "Appointments are booked through the National Generic Document Registration System (NGDRS Chhattisgarh) portal at ngdrs.cg.gov.in. The testator or advocate selects the local district Sub-Registrar Office, uploads the draft Will, inputs testator and witness KYC details, pays nominal registration fees via e-Challan, and reserves a confirmed biometric verification time slot.",
  },
  {
    q: "Can senior citizens in Chhattisgarh register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically vulnerable citizens can request a doorstep Sub-Registrar visit. A registered MBBS doctor issues a medical certificate stating the testator is of sound mind but unable to travel. The Sub-Registrar visits the testator's residence in Raipur, Bilaspur, Durg, or other districts with portable biometric equipment to complete registration.",
  },
  {
    q: "How can industrial enterprises, sponge iron units, and trading firms be bequeathed?",
    a: "Chhattisgarh is a leading industrial and mining hub. Business owners can bequeath private limited shares, partnership stakes, commercial inventory in Pandri or Vyapar Vihar, and CSIDC industrial land leases. Specific testamentary clauses appoint clear corporate successors, mandate operational continuity, and prevent partition litigation among legal heirs.",
  },
  {
    q: "How does a registered Will facilitate municipal property tax mutation in Raipur and Bilaspur?",
    a: "Municipal corporations, including Raipur Municipal Corporation (RMC) and Bilaspur Municipal Corporation (BMC), require authenticated testamentary proof to transfer property tax assessment records. A registered Will serves as conclusive documentary evidence of succession, eliminating the need for expensive civil court succession certificates or disputed family indemnity affidavits.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Chhattisgarh Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind carrying original government photo identity cards (such as Aadhaar or PAN) can serve as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or legacy under the Will. Family doctors, trusted colleagues, or family acquaintances are suitable witnesses.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Chhattisgarh?",
    a: "Yes. NRIs residing in the UAE, USA, UK, Singapore, or elsewhere who own ancestral or acquired properties in Chhattisgarh can draft a customized Will online. They can execute it abroad before two independent witnesses and have it attested at the Indian Consulate or notarized. Alternatively, they can register it before a Chhattisgarh Sub-Registrar during their visit to India.",
  },
];

export default function ChhattisgarhLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/chhattisgarh";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-chhattisgarh.jpg";

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
        name: "Will Drafting in Chhattisgarh: Online Will Making Guide",
        description:
          "Draft a legally valid Will in Chhattisgarh. Complete NGDRS e-panjiyan guidance, Bhuiyan land portal mutation, and commercial business succession support.",
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
          caption: "Will Drafting Services in Chhattisgarh and Property Succession",
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
            name: "Chhattisgarh",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Chhattisgarh - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, NGDRS e-Panjiyan registration, and Section 31 doorstep execution support across Raipur, Bilaspur, Durg, Bhilai, Korba, and all Chhattisgarh districts.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Chhattisgarh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Chhattisgarh" },
          { "@type": "City", name: "Raipur" },
          { "@type": "City", name: "Bilaspur" },
          { "@type": "City", name: "Bhilai" },
          { "@type": "City", name: "Durg" },
          { "@type": "City", name: "Korba" },
          { "@type": "City", name: "Raigarh" },
          { "@type": "City", name: "Rajnandgaon" },
          { "@type": "City", name: "Jagdalpur" },
          { "@type": "City", name: "Ambikapur" },
          { "@type": "City", name: "Nava Raipur Atal Nagar" },
          { "@type": "City", name: "Dhamtari" },
          { "@type": "City", name: "Mahasamund" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Chhattisgarh Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Chhattisgarh Residents",
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
                name: "Complete Chhattisgarh Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Chhattisgarh",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Chhattisgarh.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Chhattisgarh immovable assets including RDA/NRDA plots, Bhuiyan agricultural parcels, and business equity. Designate beneficiaries and an executor.",
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
            text: "Print the document on standard A4 paper and sign each page in the physical presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book NGDRS Chhattisgarh e-Panjiyan Slot",
            text: "Schedule your registration appointment on the NGDRS Chhattisgarh portal for your relevant SRO and remit the nominal registration fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Chhattisgarh SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: CHHATTISGARH_FAQS.map((item) => ({
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
      <ChhattisgarhLocationClient faqs={CHHATTISGARH_FAQS} />
      <Footer />
    </>
  );
}
