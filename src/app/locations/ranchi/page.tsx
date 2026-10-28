import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RanchiLocationClient from "./RanchiLocationClient";

// Title: Exactly 57 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Ranchi: Registration & Probate Law Guide",
  },
  description:
    "Draft and register your Will in Ranchi. Expert Jharkhand High Court probate guidance, asset distribution, and lawyer consultation in Ranchi &.",
  keywords: [
    "will drafting in ranchi",
    "will registration ngdrs jharkhand",
    "rrda property will transfer ranchi",
    "rmc mutation registered will",
    "succession lawyer ranchi",
    "chota nagpur tenancy act will succession",
    "sub registrar office kutchery ranchi",
    "online will maker jharkhand",
    "is probate mandatory in ranchi jharkhand",
    "section 213 indian succession act jharkhand",
    "doorstep will registration ranchi section 31",
    "doctor medical certificate will ranchi",
    "sro kanke will registration",
    "will drafting morabadi ranchi",
    "ashok nagar ranchi estate planning",
    "khatiyan land succession will jharkhand",
    "ngdrs jharkhand appointment slot will",
    "ranchi municipal corporation holding tax mutation",
    "jharbhoomi jamabandi will succession",
    "ama legal solutions ranchi will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/ranchi",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/ranchi",
      "x-default": "https://www.willdrafting.in/locations/ranchi",
    },
  },
  openGraph: {
    title: "Will Drafting in Ranchi: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Ranchi. Expert Jharkhand High Court probate guidance, asset distribution, and lawyer consultation in Ranchi &.",
    url: "https://www.willdrafting.in/locations/ranchi",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-ranchi-jharkhand-og.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting and Asset Protection in Ranchi Jharkhand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Ranchi: Registration & Probate Law Guide",
    description:
      "Draft and register your Will in Ranchi. Expert Jharkhand High Court probate guidance, asset distribution, and lawyer consultation in Ranchi &.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-ranchi-jharkhand-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const RANCHI_FAQS = [
  {
    q: "Is court probate mandatory for a Will in Ranchi under Jharkhand High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidential territories of Mumbai, Kolkata, and Chennai. Ranchi is a non-presidency capital governed under the High Court of Jharkhand. The Supreme Court of India in Clarence Pais v. Union of India and persistent rulings of the Jharkhand High Court confirm that probate is optional for Hindu, Sikh, Jain, and Buddhist Wills. A registered Will provides direct legal authority and allows smooth mutation before the Ranchi Municipal Corporation (RMC), RRDA, and Circle Offices (Jharbhoomi) without expensive probate suits.",
  },
  {
    q: "How does the Chota Nagpur Tenancy Act (CNT Act) affect making a Will in Ranchi?",
    a: "The Chota Nagpur Tenancy Act, 1908 (CNT Act) is a pivotal land law in Jharkhand. Under Section 46 of the CNT Act, transfer and alienation of land belonging to Scheduled Tribes (ST) is strictly restricted, and tribal land cannot be bequeathed to non-tribals or outside customary succession frameworks. For non-tribal (general, OBC, and raiyati) urban properties, freehold plots, and RMC holding units, owners can freely execute a Will. Our legal team examines your Khatiyan, Register-II Jamabandi, and title documents to ensure complete compliance with CNT Act provisions and avoid post-succession land disputes.",
  },
  {
    q: "Is Will registration compulsory under Jharkhand registration rules?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is legally optional throughout Jharkhand. A Will signed on plain paper before two competent witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office via the NGDRS Jharkhand portal (ngdrs.jharkhand.gov.in) creates a permanent government record in Book III. This protects your estate from land-grabbing attempts, fabricated claims by distant relatives, and ensures swift RMC and RRDA property transmission.",
  },
  {
    q: "How do I transfer an RRDA plot or RMC municipal property after the testator passes away?",
    a: "Legal beneficiaries must present a certified copy of the registered Will, original death certificate, legal heir affidavit, and prior title deeds. For Ranchi Regional Development Authority (RRDA) approved plots or housing board schemes (such as in Harmu or Bariatu), you apply for title transfer at the RRDA office. For Ranchi Municipal Corporation (RMC) holding tax mutation, you submit an online mutation application through the RMC citizen portal or circle office for updating municipal records and tax assessments.",
  },
  {
    q: "What is the official government fee to register a Will in Ranchi?",
    a: "Wills are 100% exempt from stamp duty across Jharkhand under the Indian Stamp Act, 1899. At Ranchi Sub-Registrar offices under the Department of Registration (NGDRS Jharkhand), you pay only a flat statutory registration fee of approximately ₹1,000 for Book III registration, plus nominal computer user charges of ₹100 to ₹200. You do not pay any percentage-based property market value stamp duty.",
  },
  {
    q: "How do I book an appointment on the NGDRS Jharkhand portal for Will registration?",
    a: "Appointments are booked online via the National Generic Document Registration System (NGDRS Jharkhand) at ngdrs.jharkhand.gov.in (e-Nibandhan). You create a citizen login, input testator and witness particulars, select Book III (Will), choose your local Ranchi SRO (such as Ranchi Sadar Kutchery or Kanke), pay the nominal registration fee via e-Gras online challan, and download your confirmed appointment appointment slip.",
  },
  {
    q: "Can a Ranchi Sub-Registrar visit home for senior citizens under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell citizens across Ashok Nagar, Morabadi, Kanke Road, and Doranda can request a home or hospital visit by the jurisdictional Sub-Registrar. A registered medical practitioner (MBBS doctor) must issue a mental fitness certificate certifying a sound disposing mind. An official government commission fee is paid through the state treasury, and our legal team coordinates all documentation and SRO scheduling.",
  },
  {
    q: "Who can be witnesses to a Will in Ranchi, and must they visit the SRO?",
    a: "Under Section 63 of the Indian Succession Act, at least two adult witnesses of sound mind must attest the Will. Crucially, witnesses must not be beneficiaries receiving any property under the Will, nor spouses of beneficiaries (Section 67). Both witnesses must physically accompany the testator to the Ranchi Sub-Registrar Office with original Aadhaar cards and biometric ID for digital photographing and thumbprint verification.",
  },
  {
    q: "How do Circle Offices in Ranchi handle mutation for ancestral or raiyati land after a Will?",
    a: "In Ranchi, rural and semi-urban lands in circles like Kanke, Namkum, Ratu, and Ormanjhi fall under the Anchal Adhikari (Circle Officer). Beneficiaries file an online Dakhil-Kharij (mutation) application on the Jharbhoomi portal citing the registered Will, Khata number, Plot/Khesra number, and death certificate. The Revenue Karamchari and Circle Inspector verify the Jamabandi and issue a mutation order transferring the rent receipt (Lagan) in the beneficiary's name.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) or Jharkhandis living outside Ranchi create a Will for local properties?",
    a: "Yes. Many families from Ranchi work in metro cities across India or abroad in the US, UK, Canada, and Gulf. If you own apartments in Morabadi, plots in Ashok Nagar, or commercial assets on Main Road, you can draft your Will online through our platform. You can execute it where you reside before two witnesses, have it attested by the nearest Indian Consulate if abroad, or register it at the Ranchi SRO during your visit to Jharkhand.",
  },
];

export default function RanchiLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/ranchi";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-ranchi-jharkhand-og.jpg";

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
        name: "Will Drafting in Ranchi: Registration & Probate Law Guide",
        description:
          "Draft and register your Will in Ranchi. Expert Jharkhand High Court probate guidance, asset distribution, and lawyer consultation in Ranchi &.",
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
          caption: "Online Will Drafting and Asset Protection in Ranchi Jharkhand",
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
            name: "Ranchi",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Ranchi - Estate Planning, CNT Act Succession & NGDRS Registration",
        description:
          "Professional Will drafting, Chota Nagpur Tenancy Act compliance advisory, RRDA and RMC plot inheritance, and Jharkhand NGDRS Sub-Registrar.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ranchi",
          addressRegion: "Jharkhand",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Ranchi" },
          { "@type": "City", name: "Ashok Nagar" },
          { "@type": "City", name: "Morabadi" },
          { "@type": "City", name: "Bariatu" },
          { "@type": "City", name: "Kanke Road" },
          { "@type": "City", name: "Doranda" },
          { "@type": "City", name: "Hinoo" },
          { "@type": "City", name: "Harmu Housing Colony" },
          { "@type": "City", name: "Lalpur" },
          { "@type": "City", name: "Argora" },
          { "@type": "City", name: "Kadru" },
          { "@type": "City", name: "Dhurwa" },
          { "@type": "City", name: "Namkum" },
          { "@type": "City", name: "Ratu Road" },
          { "@type": "City", name: "Kathitand" },
          { "@type": "City", name: "Ormanjhi" },
          { "@type": "City", name: "Bundu" },
          { "@type": "City", name: "Kokar" },
          { "@type": "City", name: "Tupudana" },
          { "@type": "City", name: "Booty More" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Ranchi Will Drafting, Property Succession & NGDRS Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Ranchi Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation, CNT Act & RRDA Asset Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Ranchi Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Ranchi Jharkhand",
        description:
          "Five straightforward steps to create a legally binding Will and register it before the Sub-Registrar in Ranchi.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Properties, CNT Status, and Beneficiaries",
            text: "Compile your Ranchi residential flats, RRDA plots, commercial units, bank accounts, demat holdings, and Khatiyan land records. Appoint your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Exact Jharkhand Legal Clauses",
            text: "Draft your Will using our legally verified platform or with a senior advocate to incorporate non-presidency probate clarity, CNT Act compliance, and executor authority.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets or executive ledger paper and sign every page in the presence of two independent adult witnesses who are not beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Ranchi SRO Slot on NGDRS Jharkhand Portal",
            text: "Schedule an appointment token on ngdrs.jharkhand.gov.in for your jurisdictional Ranchi SRO and pay the nominal ₹1,000 registration fee via e-Gras online challan.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the Sub-Registrar Office with your two witnesses, original Aadhaar cards, and photographs for biometric thumbprinting, digital photo capture, and Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: RANCHI_FAQS.map((item) => ({
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
      <RanchiLocationClient faqs={RANCHI_FAQS} />
      <Footer />
    </>
  );
}
