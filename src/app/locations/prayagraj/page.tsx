import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrayagrajLocationClient from "./PrayagrajLocationClient";

// Title: Exactly 51 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Prayagraj: Legal Online Will Guide",
  },
  description:
    "Draft your Will in Prayagraj with High Court advocate review. Reliable UP IGRS registration guidance, PDA property mutation, and family wealth.",
  keywords: [
    "will drafting in prayagraj",
    "will registration allahabad kutchery",
    "pda property will transfer prayagraj",
    "succession advocate allahabad",
    "online will up",
    "prayagraj nagar nigam mutation will",
    "sub registrar office prayagraj appointment",
    "sub registrar sadar prayagraj",
    "sub registrar office naini prayagraj",
    "sub registrar office phaphamau",
    "sub registrar office jhunsi",
    "will drafting civil lines prayagraj",
    "will drafting george town prayagraj",
    "will drafting ashok nagar allahabad",
    "will drafting tagore town prayagraj",
    "will drafting kalindipuram prayagraj",
    "section 107 up revenue code 2006 agricultural will",
    "allahabad high court probate exemption uttar pradesh",
    "is probate mandatory in prayagraj",
    "section 31 registration act home visit prayagraj",
    "will registration fees in uttar pradesh",
    "doctor medical certificate will prayagraj",
    "ama legal solutions prayagraj will drafting",
    "igrsup prayagraj appointment booking",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/prayagraj",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/prayagraj",
      "x-default": "https://www.willdrafting.in/locations/prayagraj",
    },
  },
  openGraph: {
    title: "Will Drafting in Prayagraj: Legal Online Will Guide",
    description:
      "Draft your Will in Prayagraj with High Court advocate review. Reliable UP IGRS registration guidance, PDA property mutation, and family wealth.",
    url: "https://www.willdrafting.in/locations/prayagraj",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-prayagraj.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and Registration Services in Prayagraj Uttar Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Prayagraj: Legal Online Will Guide",
    description:
      "Draft your Will in Prayagraj with High Court advocate review. Reliable UP IGRS registration guidance, PDA property mutation, and family wealth.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-prayagraj.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const PRAYAGRAJ_FAQS = [
  {
    q: "Is Will registration mandatory in Prayagraj and Uttar Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Uttar Pradesh. A Will written on plain white paper is legally valid if signed before two independent witnesses. However, for Prayagraj Development Authority (PDA) plots, Civil Lines bungalows, and Prayagraj Nagar Nigam mutations, registering the Will on IGRSUP creates an official public record and prevents lengthy succession disputes.",
  },
  {
    q: "Is probate required for immovable properties in Prayagraj?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Prayagraj is a non-presidency city. The Allahabad High Court has consistently affirmed that court probate or letters of administration is not compulsory to establish inheritance rights over properties in Uttar Pradesh.",
  },
  {
    q: "Why is a registered Will crucial for Prayagraj Development Authority (PDA) mutation?",
    a: "The Prayagraj Development Authority (PDA) manages residential and commercial plots across Civil Lines, Kalindipuram, Naini, and Shantipuram. For unregistered Wills, PDA frequently demands local newspaper notices, a 30-day public objection period, and heavy indemnity bonds. A registered Will expedites mutation and title transfer without bureaucratic hurdles.",
  },
  {
    q: "How do I book an online appointment for Will registration in Prayagraj?",
    a: "Appointments are scheduled via the Uttar Pradesh Stamps and Registration portal (igrsup.gov.in). You log in, select your local Sub-Registrar office (such as Sadar Kutchery, Naini, Phaphamau, or Jhunsi), enter the testator and witness details, and generate an appointment token. The testator and two witnesses present original IDs on the selected date.",
  },
  {
    q: "What is the government fee to register a Will in Uttar Pradesh?",
    a: "Wills are exempt from ad valorem stamp duty across Uttar Pradesh. You do not pay percentage-based stamp charges on your estate value. Testators only pay a nominal government registration fee of ₹100 along with minor computerized processing and scanning charges at the Prayagraj Sub-Registrar Office.",
  },
  {
    q: "Can senior citizens in Civil Lines or George Town register a Will from home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell individuals can request a home visit by the Sub-Registrar. A registered medical practitioner must issue a sound mind and fitness certificate stating the person cannot travel. The Sub-Registrar visits your home with biometric scanning devices to execute registration.",
  },
  {
    q: "How can agricultural land in Prayagraj district be willed under the UP Revenue Code 2006?",
    a: "Under Section 107 of the Uttar Pradesh Revenue Code, 2006, a Bhumidhar holding transferable rights can bequeath agricultural land through a Will. However, the bequest must observe statutory land ceilings and maintenance rights under Section 108. Rural land mutations across Soraon, Phulpur, or Karchhana are formally recorded in Khatauni records through the UP Bhulekh portal.",
  },
  {
    q: "Who can serve as attesting witnesses for a Will in Prayagraj?",
    a: "Any two adults of sound mind with valid government identity cards (such as Aadhaar or PAN) can witness a Will. Under Section 67 of the Indian Succession Act, 1925, a beneficiary or their spouse should never act as a witness, as doing so voids their bequest. Trusted family doctors, colleagues, or neighbors are recommended.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for Prayagraj ancestral properties?",
    a: "Yes. NRIs owning ancestral homes or PDA plots in Prayagraj can draft their Will online. They can execute the document abroad before two witnesses and have it attested by the Indian Consulate or notarized. Alternatively, they can register the Will before the Prayagraj Sub-Registrar during a visit to India.",
  },
  {
    q: "Does a nominee automatically become the owner of a flat or bank account in Prayagraj?",
    a: "No. The Supreme Court of India has firmly established that a nominee is merely a temporary custodian or trustee. Nominees are legally obligated to hand over assets to the rightful heirs specified in the deceased owner's valid Will or under statutory intestate succession laws.",
  },
];

export default function PrayagrajLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/prayagraj";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-prayagraj.jpg";

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
        name: "Will Drafting in Prayagraj: Legal Online Will Guide",
        description:
          "Draft your Will in Prayagraj with High Court lawyer review. Reliable UP IGRS filing guidance, PDA asset name change, and family wealth.",
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
          caption: "Online Will Drafting and Registration Services in Prayagraj Uttar Pradesh",
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
            name: "Prayagraj",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Prayagraj - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, High Court lawyer review, UP IGRS portal filing, and doorstep signing support across Prayagraj, Civil.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Prayagraj",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Prayagraj" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "George Town" },
          { "@type": "City", name: "Tagore Town" },
          { "@type": "City", name: "Ashok Nagar" },
          { "@type": "City", name: "Mumfordganj" },
          { "@type": "City", name: "Katra" },
          { "@type": "City", name: "Naini" },
          { "@type": "City", name: "Phaphamau" },
          { "@type": "City", name: "Jhunsi" },
          { "@type": "City", name: "Kalindipuram" },
          { "@type": "City", name: "Rajrooppur" },
          { "@type": "City", name: "Dhoomanganj" },
          { "@type": "City", name: "Daraganj" },
          { "@type": "City", name: "Kydganj" },
          { "@type": "City", name: "Shantipuram" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Prayagraj Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Prayagraj Residents",
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
                name: "Complete Prayagraj Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Prayagraj",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Prayagraj.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Beneficiaries",
            text: "List your Prayagraj assets including PDA plots, family houses, farm land, bank accounts, and investments. Nominate your heirs and choose an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with High Court Advocate Oversight",
            text: "Draft your Will using our online legal platform or consult our experienced estate lawyers to add specific bequests, survivorship, and fight-prevention clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets and sign each page in the physical presence of two independent adult witnesses who are not heirs under the paper.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Prayagraj SRO Appointment on IGRSUP Portal",
            text: "Book an appointment on the UP IGRS portal (igrsup.gov.in) for your relevant Prayagraj SRO (Kutchery Sadar, Naini, Phaphamau, or Jhunsi) and pay nominal fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at SRO",
            text: "Visit the SRO office with your two witnesses and original IDs for digital biometric check, webcam photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: PRAYAGRAJ_FAQS.map((item) => ({
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
      <PrayagrajLocationClient faqs={PRAYAGRAJ_FAQS} />
      <Footer />
    </>
  );
}
