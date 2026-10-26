import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmritsarLocationClient from "./AmritsarLocationClient";

// Title: Exactly 50 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 151 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Amritsar: Online Will & NRI Guide",
  },
  description:
    "Protect family property in Amritsar. Expert online Will drafting, NGDRS Punjab registration help, and dispute-free succession for NRI ancestral lands.",
  keywords: [
    "will drafting in amritsar",
    "nri will amritsar punjab",
    "will registration ngdrs amritsar",
    "ada plot will transfer amritsar",
    "ancestral land succession punjab",
    "amritsar municipal corporation mutation will",
    "sub registrar office kachehri amritsar",
    "will drafting ranjit avenue",
    "will drafting civil lines amritsar",
    "will drafting mall road amritsar",
    "will drafting green avenue amritsar",
    "will drafting majitha road",
    "will drafting ajnala punjab",
    "will drafting baba bakala",
    "section 31 registration act amritsar",
    "is probate mandatory in amritsar",
    "punjab haryana high court probate amritsar exemption",
    "jamabandi fard will mutation punjab",
    "online will drafting punjab",
    "ama legal solutions amritsar will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/amritsar",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/amritsar",
      "x-default": "https://www.willdrafting.in/locations/amritsar",
    },
  },
  openGraph: {
    title: "Will Drafting in Amritsar: Online Will & NRI Guide",
    description:
      "Protect family property in Amritsar. Expert online Will drafting, NGDRS Punjab registration help, and dispute-free succession for NRI ancestral lands.",
    url: "https://www.willdrafting.in/locations/amritsar",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-amritsar-og.jpg",
        width: 1200,
        height: 630,
        alt: "Will Drafting and NRI Property Succession in Amritsar Punjab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Amritsar: Online Will & NRI Guide",
    description:
      "Protect family property in Amritsar. Expert online Will drafting, NGDRS Punjab registration help, and dispute-free succession for NRI ancestral lands.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-amritsar-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const AMRITSAR_FAQS = [
  {
    q: "Is Will registration mandatory in Amritsar and across Punjab?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Amritsar and across Punjab. An unregistered Will executed on plain paper before two independent witnesses is legally valid. However, registering your Will on the NGDRS Punjab portal places it into permanent Book III government custody, preventing fraudulent property disputes and streamlining property transfer with the Amritsar Development Authority (ADA) and Municipal Corporation Amritsar (MCA).",
  },
  {
    q: "Is probate required for a Will in Amritsar under Punjab & Haryana High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Amritsar is a non-presidency town. Landmark rulings of the Punjab & Haryana High Court, including Ram Chand v. Sardara Singh, affirm that probate is strictly optional in Punjab for Hindu, Sikh, Jain, and Buddhist estates.",
  },
  {
    q: "How do Non-Resident Indians (NRIs) make a Will for properties in Amritsar?",
    a: "NRIs residing in Canada, the UK, the USA, Australia, or elsewhere can draft a custom Punjab Will online covering ADA plots, ancestral farmlands, and commercial properties. NRIs can execute the Will before two independent witnesses abroad and have it notarized and apostilled or authenticated by the Indian Consulate, or complete formal Book III biometric registration before an Amritsar Sub-Registrar during their visit to India.",
  },
  {
    q: "What is the official government fee to register a Will on NGDRS Punjab in Amritsar?",
    a: "Wills are 100% exempt from ad valorem stamp duty across Punjab under the Indian Stamp Act, 1899. At Amritsar Sub-Registrar offices, testators pay only a flat statutory registration fee of ₹500 plus modest computer processing and scanning charges of approximately ₹100 to ₹200. There are no percentage-based property market value charges.",
  },
  {
    q: "How is agricultural farmland transferred via Will under the Punjab Land Revenue Act?",
    a: "Upon the testator's demise, the nominated beneficiary submits a certified copy of the registered Will and death certificate to the Halqa Patwari. The Patwari registers the Inteqal (mutation) in the revenue records under Section 34 of the Punjab Land Revenue Act, 1887. Following formal verification by the Revenue Tehsildar, the updated Jamabandi fard reflects the lawful ownership on plrs.org.in.",
  },
  {
    q: "How does a registered Will help in transferring ADA plots and MCA property records?",
    a: "The Amritsar Development Authority (ADA) and Municipal Corporation Amritsar (MCA) require conclusive documentary proof of succession before substituting ownership on allotment letters and municipal property tax records. A registered Will provides irrefutable proof of testamentary intent, eliminating the need for expensive civil court succession certificates or contentious legal heir affidavits.",
  },
  {
    q: "How do I book an appointment on the NGDRS Punjab portal (igr.punjab.gov.in)?",
    a: "Appointments are booked online through the National Generic Document Registration System (NGDRS Punjab) at igr.punjab.gov.in. You register on the portal, select Amritsar district and your jurisdictional Sub-Registrar Office, enter testator and witness KYC details, pay the statutory fee via Cyber Treasury, and select a confirmed appointment slot for biometric execution.",
  },
  {
    q: "Can senior citizens in Amritsar register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with medical mobility restrictions can request a doorstep visit. An MBBS medical practitioner certifies physical inability to travel alongside testamentary capacity. The Sub-Registrar visits the residence in Ranjit Avenue, Civil Lines, or Mall Road with portable biometric devices.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Amritsar Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as witnesses. Under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any asset or bequest under the Will. Family doctors, trusted neighbors, or independent professionals are ideal choices.",
  },
  {
    q: "How are commercial havelis and shops in the Golden Temple corridor willed?",
    a: "Commercial shops and ancestral havelis around Katra Ahluwalia, Hall Bazaar, and Heritage Street often involve multi-generational coparcenary interests and tenancy rights. A carefully drafted Will specifies individual partitioned shares, business goodwill, and trade inventory, protecting family firms from protracted partition litigation.",
  },
];

export default function AmritsarLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/amritsar";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-amritsar.jpg";

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
        name: "Will Drafting in Amritsar: Online Will & NRI Guide",
        description:
          "Protect family property in Amritsar. Expert online Will drafting, NGDRS Punjab registration help, and dispute-free succession for NRI ancestral lands.",
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
          caption: "Will Drafting and NRI Property Succession in Amritsar Punjab",
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
            name: "Amritsar",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Amritsar - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, NGDRS Punjab registration assistance, and Section 31 doorstep execution support across Amritsar, Ranjit Avenue, Civil Lines, Mall Road, and Ajnala.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Amritsar",
          addressRegion: "Punjab",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Amritsar" },
          { "@type": "City", name: "Ranjit Avenue" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "Mall Road" },
          { "@type": "City", name: "Green Avenue" },
          { "@type": "City", name: "Majitha Road" },
          { "@type": "City", name: "Lawrence Road" },
          { "@type": "City", name: "Court Road" },
          { "@type": "City", name: "Katra Ahluwalia" },
          { "@type": "City", name: "Hall Bazaar" },
          { "@type": "City", name: "Basant Avenue" },
          { "@type": "City", name: "Ajnala" },
          { "@type": "City", name: "Baba Bakala" },
          { "@type": "City", name: "Rayya" },
          { "@type": "City", name: "Attari" },
          { "@type": "City", name: "Verka" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Amritsar Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Amritsar Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & NRI Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Amritsar Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Amritsar",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Amritsar.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Amritsar & NRI Asset Inventory",
            text: "List your Amritsar real estate including ADA residential plots, MCA houses, commercial shops in Hall Bazaar, agricultural land in Ajnala or Majitha, and bank accounts.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, NRI cross-border protections, executor appointment, and revocation of prior wills.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the presence of two adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book NGDRS Punjab Appointment Slot",
            text: "Schedule your registration appointment on the NGDRS Punjab portal (igr.punjab.gov.in) for your relevant Amritsar SRO and pay the flat ₹500 fee via Cyber Treasury.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Amritsar SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: AMRITSAR_FAQS.map((item) => ({
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
      <AmritsarLocationClient faqs={AMRITSAR_FAQS} />
      <Footer />
    </>
  );
}
