import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PunjabLocationClient from "./PunjabLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Punjab: Online Will & NRI Estate Guide",
  },
  description:
    "Draft a valid Will in Punjab. Expert guidance for NRI ancestral property protection, NGDRS Punjab portal registration, and Jamabandi fard mutation.",
  keywords: [
    "will drafting in punjab",
    "nri will punjab",
    "will registration ngdrs punjab",
    "jamabandi punjab will mutation",
    "succession lawyer ludhiana amritsar",
    "punjab and haryana high court probate",
    "online will maker punjab",
    "ancestral property will punjab",
    "gmada mohali property transfer will",
    "glada ludhiana plot will succession",
    "sub registrar office punjab will registration",
    "section 31 registration act home visit punjab",
    "plrs jamabandi fard will mutation",
    "jalandhar doaba nri will drafting",
    "farmland will registration punjab",
    "will drafting advocate amritsar",
    "inteqal mutation registered will punjab",
    "ama legal solutions punjab will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/punjab",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/punjab",
      "x-default": "https://www.willdrafting.in/locations/punjab",
    },
  },
  openGraph: {
    title: "Will Drafting in Punjab: Online Will & NRI Estate Guide",
    description:
      "Draft a valid Will in Punjab. Expert guidance for NRI ancestral property protection, NGDRS Punjab portal registration, and Jamabandi fard mutation.",
    url: "https://www.willdrafting.in/locations/punjab",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-punjab-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and NRI Asset Protection in Punjab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Punjab: Online Will & NRI Estate Guide",
    description:
      "Draft a valid Will in Punjab. Expert guidance for NRI ancestral property protection, NGDRS Punjab portal registration, and Jamabandi fard mutation.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-punjab-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const PUNJAB_FAQS = [
  {
    q: "Is Will registration mandatory in Punjab?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Punjab. An unregistered Will executed on plain white paper is legally valid if signed before two independent adult witnesses. However, registering your Will via the NGDRS Punjab portal enters it into permanent Book III government custody, eliminating fraudulent title challenges, disputed General Power of Attorney sales, and delays during Jamabandi fard mutations.",
  },
  {
    q: "Is probate required for a Will in Punjab under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory solely in the historical presidency towns of Mumbai, Kolkata, and Chennai. The High Court of Punjab & Haryana has conclusively ruled in landmark judgments, including Ram Chand v. Sardara Singh (AIR 1962 P&H 382), that court probate is non-mandatory for Hindu, Sikh, Jain, and Buddhist Wills in Punjab, allowing direct property transfer with a registered Will.",
  },
  {
    q: "How do NRIs draft and register a Will for ancestral property in Punjab?",
    a: "Non-Resident Indians residing in Canada, the UK, the USA, Australia, or elsewhere can draft a custom Punjab Will online detailing their Khasra and Khewat numbers. They can execute the Will before two independent witnesses abroad and have it notarized and apostilled or certified by the Indian Consulate, or complete formal Book III biometric registration before a Punjab Sub-Registrar during their visit to India.",
  },
  {
    q: "What is the official government fee to register a Will on NGDRS Punjab?",
    a: "Testamentary Wills are completely exempt from ad valorem stamp duty across Punjab under the Indian Stamp Act, 1899. At Punjab Sub-Registrar offices, testators pay only a flat statutory registration fee of ₹500 plus modest computer scanning and service charges of approximately ₹100 to ₹200. There is zero percentage-based property market value duty.",
  },
  {
    q: "How is agricultural farmland transferred via Will on the Punjab Jamabandi portal?",
    a: "Upon the testator's demise, the nominated beneficiary submits a certified copy of the registered Will and official death certificate to the Halqa Patwari. The Patwari enters the Inteqal (mutation) in the Parat Patwar and Parat Sarkar under Section 34 of the Punjab Land Revenue Act, 1887. Following formal verification by the Revenue Tehsildar, the updated Jamabandi fard is published on plrs.org.in.",
  },
  {
    q: "How do I book an appointment on the NGDRS Punjab portal (igr.punjab.gov.in)?",
    a: "Appointments are scheduled online through the National Generic Document Registration System (NGDRS Punjab) at igr.punjab.gov.in. You create a citizen login, select your district and jurisdictional Sub-Registrar Office, enter testator and witness KYC details, pay the statutory ₹500 fee online via Cyber Treasury, and select a convenient time slot for biometric execution.",
  },
  {
    q: "Can senior citizens or bedridden individuals in Punjab register a Will at home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, unwell individuals, or bedridden testators can request a home visit by the Sub-Registrar. An MBBS medical practitioner certifies the testator's physical inability to visit the tehsil office along with sound testamentary capacity. The Sub-Registrar attends the residence with portable biometric scanners to complete Book III registration.",
  },
  {
    q: "How does a registered Will simplify GMADA, GLADA, or PDA property mutation?",
    a: "Urban authorities including GMADA (Mohali), GLADA (Ludhiana), and PDA (Patiala) require conclusive documentary proof of succession before re-allotting plots or commercial units. A registered Will provides irrefutable evidence of testamentary intent, expediting transfer of allotment letters and avoiding costly civil court succession petitions.",
  },
  {
    q: "Who can act as attesting witnesses for a Will in Punjab?",
    a: "Any two adult individuals of sound mind holding valid Aadhaar cards or government photo IDs can act as attesting witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any property or bequest under the Will. Family doctors, trusted neighbors, or independent professionals are ideal choices.",
  },
  {
    q: "Can ancestral agricultural land be bequeathed through a Will in Punjab?",
    a: "Under Hindu and customary succession law in Punjab, a person can freely bequeath their self-acquired property and their individual coparcenary share in joint family ancestral property (Section 30 of the Hindu Succession Act, 1956). Clear, advocate-drafted clauses ensure the bequest covers the testator's lawful share without causing partition disputes among surviving coparceners.",
  },
];

export default function PunjabLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/punjab";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-punjab.jpg";

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
        name: "Will Drafting in Punjab: Online Will & NRI Estate Guide",
        description:
          "Draft a valid Will in Punjab. Expert guidance for NRI ancestral property protection, NGDRS Punjab portal registration, and Jamabandi fard mutation.",
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
          caption: "Legal Will Drafting and NRI Asset Protection in Punjab",
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
            name: "Punjab",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Punjab - NRI Estate Planning & NGDRS Registration",
        description:
          "Professional Will drafting, advocate verification, NGDRS Punjab SRO registration, and NRI ancestral farmland protection across Ludhiana, Amritsar, Jalandhar, and SAS Nagar Mohali.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ludhiana",
          addressRegion: "Punjab",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Ludhiana" },
          { "@type": "City", name: "Amritsar" },
          { "@type": "City", name: "Jalandhar" },
          { "@type": "City", name: "SAS Nagar Mohali" },
          { "@type": "City", name: "Patiala" },
          { "@type": "City", name: "Bathinda" },
          { "@type": "City", name: "Hoshiarpur" },
          { "@type": "City", name: "Pathankot" },
          { "@type": "City", name: "Moga" },
          { "@type": "City", name: "Batala" },
          { "@type": "City", name: "Abohar" },
          { "@type": "City", name: "Malerkotla" },
          { "@type": "City", name: "Khanna" },
          { "@type": "City", name: "Phagwara" },
          { "@type": "City", name: "Muktsar" },
          { "@type": "City", name: "Barnala" },
          { "@type": "City", name: "Rajpura" },
          { "@type": "City", name: "Firozpur" },
          { "@type": "City", name: "Kapurthala" },
          { "@type": "City", name: "Sangrur" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Punjab Will Drafting & NGDRS Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Punjab Residents & NRIs",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & NRI Ancestral Farmland Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Punjab Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Punjab",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar across Punjab.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Punjab real estate including Jamabandi agricultural fards, GMADA or GLADA residential plots, industrial manufacturing units, bank deposits, and demat folios. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, NRI protections, survivorship, guardian appointments for minors, and revocation of prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the physical presence of two adult witnesses who hold zero beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book NGDRS Punjab Portal Appointment",
            text: "Schedule your registration appointment on the NGDRS Punjab portal (igr.punjab.gov.in) for your relevant Sub-Registrar Office and remit the flat ₹500 fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Punjab SRO",
            text: "Visit the Sub-Registrar Office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III government registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: PUNJAB_FAQS.map((item) => ({
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
      <PunjabLocationClient faqs={PUNJAB_FAQS} />
      <Footer />
    </>
  );
}
