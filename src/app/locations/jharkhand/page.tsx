import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JharkhandLocationClient from "./JharkhandLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 155 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Jharkhand: Online Will Registration Help",
  },
  description:
    "Draft your Will in Jharkhand with legal peace of mind. Complete NGDRS Jharkhand registration advice, CNT/SPT Act land compliance, and RMC mutation support.",
  keywords: [
    "will drafting in jharkhand",
    "will registration ngdrs jharkhand",
    "cnt act will succession",
    "spt act will succession",
    "jharbhoomi mutation will",
    "estate lawyer ranchi",
    "jharkhand high court probate exemption",
    "ngdrs jharkhand e panjiyan appointment",
    "rmc mutation registered will",
    "rrda property will transfer ranchi",
    "tata steel leasehold plot will jamshedpur",
    "jnac property mutation will",
    "sub registrar office kutchery ranchi",
    "sakchi sub registrar jamshedpur",
    "dhanbad municipal corporation will transfer",
    "chas bokaro sub registrar will",
    "deoghar will registration sro",
    "hazaribagh estate lawyer will",
    "section 31 registration act home visit jharkhand",
    "doctor mental fitness certificate will jharkhand",
    "chota nagpur tenancy act section 46 will",
    "santhal parganas tenancy act section 20 will",
    "nri will drafting jharkhand",
    "ama legal solutions jharkhand will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/jharkhand",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/jharkhand",
      "x-default": "https://www.willdrafting.in/locations/jharkhand",
    },
  },
  openGraph: {
    title: "Will Drafting in Jharkhand: Online Will Registration Help",
    description:
      "Draft your Will in Jharkhand with legal peace of mind. Complete NGDRS Jharkhand registration advice, CNT/SPT Act land compliance, and RMC mutation support.",
    url: "https://www.willdrafting.in/locations/jharkhand",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-jharkhand-og.jpg",
        width: 1200,
        height: 630,
        alt: "Will Drafting Services in Jharkhand and Property Succession",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Jharkhand: Online Will Registration Help",
    description:
      "Draft your Will in Jharkhand with legal peace of mind. Complete NGDRS Jharkhand registration advice, CNT/SPT Act land compliance, and RMC mutation support.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-jharkhand-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const JHARKHAND_FAQS = [
  {
    q: "Is Will registration mandatory in Jharkhand?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Jharkhand. A Will written or typed on plain white paper is legally valid if signed before two independent witnesses. However, registering your Will at a Jharkhand Sub-Registrar Office via the NGDRS portal places it in permanent Book III government custody. This protects against fraudulent challenges and accelerates mutation on the Jharbhoomi land portal, RMC records, and Tata Steel land files.",
  },
  {
    q: "Is court probate required for a Will in Jharkhand under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Jharkhand is a non-presidency state. The High Court of Jharkhand at Ranchi has settled that probate is non-mandatory for Hindu, Sikh, Jain, Buddhist, and Christian Wills, allowing direct asset transfer upon presenting a registered Will.",
  },
  {
    q: "What is the official government fee to register a Will in Jharkhand?",
    a: "Testamentary Wills are 100% exempt from ad-valorem stamp duty across Jharkhand under the Indian Stamp Act, 1899 as applicable to the state. At Jharkhand Sub-Registrar offices, testators only pay a nominal statutory registration fee of ₹100 via the NGDRS portal, alongside minor scanning and computer service fees of ₹100 to ₹300. There are zero percentage-based charges tied to property market valuation.",
  },
  {
    q: "How does the Chota Nagpur Tenancy (CNT) Act affect Will succession in Jharkhand?",
    a: "The Chota Nagpur Tenancy Act, 1908 strictly restricts the transfer and alienation of raiyati land belonging to Scheduled Tribes (ST), Scheduled Castes (SC), and Backward Classes (BC) under Section 46 and Section 71A. While testamentary succession to natural legal heirs within the community is recognized, attempts to bequeath tribal tenancy land to non-tribals are legally void. Non-tribal freehold properties in Ranchi, Dhanbad, and Bokaro can be freely bequeathed via Will.",
  },
  {
    q: "How does the Santhal Parganas Tenancy (SPT) Act govern property bequests?",
    a: "Under Section 20 of the Santhal Parganas Tenancy Act, 1949, transfer of raiyati holdings by sale, gift, mortgage, or Will is strictly prohibited unless expressly permitted by recorded customary village law or tenancy records. In urban areas of Deoghar and Jasidih, non-raiyati freehold and municipal lands can be transferred by Will, but rural agricultural lands must comply with SPT revenue checks.",
  },
  {
    q: "How are Tata Steel sub-leasehold plots in Jamshedpur transferred via a registered Will?",
    a: "Jamshedpur possesses a unique land tenure system where the State of Jharkhand leases master acreage to Tata Steel, which then grants long-term residential sub-leases across Bistupur, Circuit House Area, and Kadma. Following the testator's demise, the beneficiary submits the registered Will and death certificate to the Tata Steel Land Department and JNAC for mutation and execution of the substituted sub-lease deed.",
  },
  {
    q: "How is ancestral land mutated on the Jharbhoomi portal following testamentary succession?",
    a: "Land mutation (Dakhil-Kharij) across Jharkhand's 24 districts is administered online through the Jharbhoomi portal (jharbhoomi.jharkhand.gov.in). Beneficiaries submit an online mutation application along with the registered Will, death certificate, and Khatiyan/jamabandi details. The Circle Officer (CO) verifies non-encumbrance and issues the digital mutation order and updated revenue correction slip (Shudhi Patra).",
  },
  {
    q: "How do I book an NGDRS Jharkhand online registration appointment?",
    a: "Appointments are booked through the National Generic Document Registration System (NGDRS Jharkhand) portal at ngdrs.jharkhand.gov.in. The testator or advocate selects the local district Sub-Registrar Office (such as Ranchi Sadar, Sakchi Jamshedpur, or Dhanbad), uploads the draft Will, inputs testator and witness KYC details, pays nominal registration fees via e-Challan, and reserves a confirmed biometric verification time slot.",
  },
  {
    q: "Can senior citizens in Jharkhand register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically vulnerable citizens can request a doorstep Sub-Registrar visit. A registered MBBS doctor issues a medical certificate stating the testator is of sound mind but unable to travel. The Sub-Registrar visits the testator's residence in Ranchi, Jamshedpur, Dhanbad, or other districts with portable biometric equipment to complete registration.",
  },
  {
    q: "How does a registered Will facilitate municipal property tax mutation with RMC and JNAC?",
    a: "Municipal corporations, including Ranchi Municipal Corporation (RMC), Dhanbad Municipal Corporation (DMC), and the Jamshedpur Notified Area Committee (JNAC), require authenticated proof to transfer holding tax records. A registered Will serves as conclusive documentary evidence of succession, eliminating the need for expensive civil court succession certificates or disputed family indemnity affidavits.",
  },
];

export default function JharkhandLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/jharkhand";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-jharkhand.jpg";

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
        name: "Will Drafting in Jharkhand: Online Will Registration Help",
        description:
          "Draft your Will in Jharkhand with legal peace of mind. Complete NGDRS Jharkhand registration advice, CNT/SPT Act land compliance, and RMC mutation support.",
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
          caption: "Will Drafting Services in Jharkhand and Property Succession",
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
            name: "Jharkhand",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Jharkhand - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, NGDRS Jharkhand registration, and Section 31 doorstep execution support across Ranchi, Jamshedpur, Dhanbad, Bokaro, and all Jharkhand districts.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Jharkhand",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Jharkhand" },
          { "@type": "City", name: "Ranchi" },
          { "@type": "City", name: "Jamshedpur" },
          { "@type": "City", name: "Dhanbad" },
          { "@type": "City", name: "Bokaro Steel City" },
          { "@type": "City", name: "Deoghar" },
          { "@type": "City", name: "Hazaribagh" },
          { "@type": "City", name: "Ramgarh" },
          { "@type": "City", name: "Giridih" },
          { "@type": "City", name: "Chaibasa" },
          { "@type": "City", name: "Medininagar" },
          { "@type": "City", name: "Phusro" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Jharkhand Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Jharkhand Residents",
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
                name: "Complete Jharkhand Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Jharkhand",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Jharkhand.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory & Check Tenancy Classification",
            text: "List your Jharkhand real estate including Ranchi municipal apartments, Tata Steel sub-leases in Jamshedpur, Dhanbad commercial shops, and Jharbhoomi land parcels. Verify CNT/SPT tenancy compliance.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, survivorship, executor powers, guardian appointments for minors, and explicit revocation of prior instruments.",
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
            name: "Book NGDRS Jharkhand Appointment Slot",
            text: "Schedule your registration appointment on the NGDRS Jharkhand portal (ngdrs.jharkhand.gov.in) for your relevant district SRO and remit the nominal ₹100 registration fee via e-Challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Jharkhand SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal verification, photo capture, and biometric thumbprinting to complete Book III government registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: JHARKHAND_FAQS.map((item) => ({
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
      <JharkhandLocationClient faqs={JHARKHAND_FAQS} />
      <Footer />
    </>
  );
}
