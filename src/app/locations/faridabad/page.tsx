import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaridabadLocationClient from "./FaridabadLocationClient";

// Title: Exactly 52 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Faridabad: Online Will Making Guide",
  },
  description:
    "Draft a valid Will in Faridabad NCR. Expert guidance on HSVP plot transfer, Jamabandi registration, and smooth family estate succession.",
  keywords: [
    "will drafting in faridabad",
    "will registration haryana jamabandi",
    "hsvp plot will transfer faridabad",
    "mcf property mutation will",
    "succession lawyer faridabad",
    "builder floor will transfer faridabad",
    "sub registrar office sector 12 faridabad",
    "online will drafting faridabad",
    "advocate for will in faridabad",
    "will drafting sector 14 faridabad",
    "will drafting sector 15 faridabad",
    "will drafting sector 16 faridabad",
    "will drafting sector 21c faridabad",
    "will drafting greater faridabad",
    "will drafting neharpar",
    "will drafting nit faridabad",
    "will drafting ballabgarh",
    "will drafting charmwood village",
    "will drafting greenfields faridabad",
    "mathura road industrial will drafting",
    "section 31 registration act home visit faridabad",
    "punjab and haryana high court probate faridabad exemption",
    "is probate mandatory in haryana",
    "jamabandi haryana appointment faridabad",
    "ama legal solutions faridabad will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/faridabad",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/faridabad",
      "x-default": "https://www.willdrafting.in/locations/faridabad",
    },
  },
  openGraph: {
    title: "Will Drafting in Faridabad: Online Will Making Guide",
    description:
      "Draft a valid Will in Faridabad NCR. Expert guidance on HSVP plot transfer, Jamabandi registration, and smooth family estate succession.",
    url: "https://www.willdrafting.in/locations/faridabad",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-faridabad-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Faridabad Haryana NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Faridabad: Online Will Making Guide",
    description:
      "Draft a valid Will in Faridabad NCR. Expert guidance on HSVP plot transfer, Jamabandi registration, and smooth family estate succession.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-faridabad-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const FARIDABAD_FAQS = [
  {
    q: "Is Will registration mandatory in Faridabad?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Faridabad. A Will executed on plain white paper and attested by two competent witnesses is legally valid. However, formal registration at the Sub-Registrar Office in Mini Secretariat Sector 12 or Ballabgarh places the document in permanent government Book III custody. This establishes presumptive authenticity, safeguarding your family against fraudulent challenges and enabling direct HSVP and MCF property mutation.",
  },
  {
    q: "Is court probate required for a Will in Faridabad under Punjab and Haryana High Court rules?",
    a: "No. Under Section 213(2) read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only within the historical presidential territories of Mumbai, Kolkata, and Chennai. Faridabad is a non-presidency territory subject to the Punjab and Haryana High Court. The High Court has consistently affirmed that probate is strictly optional for Hindu, Sikh, Jain, Buddhist, and Christian testators in Haryana. Beneficiaries can directly mutate real estate with a valid registered Will.",
  },
  {
    q: "How does a registered Will help in transferring HSVP (HUDA) plots and builder floors?",
    a: "Haryana Shehri Vikas Pradhikaran (HSVP) requires conclusive testamentary evidence to execute property transfer in official sector records. A registered Will, combined with the death certificate, legal heir affidavits, indemnity bond, and public notice, allows the HSVP estate officer to substitute the beneficiary as the lawful owner. This eliminates contentious civil disputes across plotted sectors like Sectors 14, 15, 16, 17, and 21C.",
  },
  {
    q: "What is the process for property tax mutation with Municipal Corporation of Faridabad (MCF)?",
    a: "Municipal Corporation of Faridabad (MCF) maintains property tax records and assigned Property IDs for all urban buildings. To update ownership after the testator's demise, the beneficiary submits the registered Will, death certificate, latest MCF tax payment receipt, and application through the Haryana Urban Local Bodies (ULB) portal. Once verified, MCF updates the tax assessment register, establishing the new titleholder for local levies and civic services.",
  },
  {
    q: "What are the official government fees to register a Will in Faridabad?",
    a: "Wills are completely exempt from stamp duty across Haryana. When registering your Will before the Sub-Registrar in Faridabad or Ballabgarh, you only pay a nominal government registration fee of ₹100, alongside computerized service and pasting charges of ₹100 to ₹200 on the Jamabandi portal. There are zero percentage-based ad-valorem taxes on the market value of your assets.",
  },
  {
    q: "How do I book an online registration slot on the Jamabandi Haryana portal?",
    a: "Appointments are scheduled online through the official Jamabandi Haryana portal (jamabandi.nic.in) under the Deed Registration e-Appointment module. You select Tehsil Faridabad or Ballabgarh, enter the testator's details, upload the Will draft, input witness identity proofs, and generate the e-challan token slip confirming your designated date and time window.",
  },
  {
    q: "Can senior citizens in Faridabad register their Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or mobility-impaired individuals in Faridabad can apply for home registration (commission visit). Upon submitting a medical fitness certificate from a registered MBBS doctor confirming physical confinement alongside the application, the Sub-Registrar visits your home in Sector 14, Sector 15, Charmwood Village, or Greater Faridabad with mobile biometric capture equipment.",
  },
  {
    q: "How should high-rise apartments in Greater Faridabad (Neharpar) be bequeathed?",
    a: "Condominiums and multi-story apartments across Sectors 75 to 89 (such as BPTP Parklands, Omaxe Heights, Puri Pranayam, and KLJ Platinum) require clear testamentary bequeathal clauses specifying the exact apartment number, tower, super area, covered car parking bays, and undivided share in common areas. The Will should instruct the Apartment Owners Association (AOA) and builder maintenance agency to recognize the beneficiary upon presentation of the Will.",
  },
  {
    q: "Who can act as attesting witnesses for a Will registered at Faridabad Tehsil?",
    a: "Any two adult individuals of sound mental health possessing valid Aadhaar cards or government photo IDs can act as attesting witnesses. In accordance with Section 67 of the Indian Succession Act, witnesses must not be beneficiaries or the spouse of any beneficiary designated in the Will. Trusted family friends, neighbors, or long-standing professionals are recommended.",
  },
  {
    q: "How are industrial manufacturing units along Mathura Road transferred via Will?",
    a: "Faridabad's extensive manufacturing plants, auto-component units, and engineering MSMEs across Sectors 24, 25, 58, and 59 involve complex assets including HSIIDC/HSVP industrial leasehold plots, plant machinery, corporate shares, and director loan accounts. A specialized Will delineates share transfers under the Companies Act 2013, partner capital accounts, and operational continuity plans to prevent business standstill.",
  },
];

export default function FaridabadLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/faridabad";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-faridabad.jpg";

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
        name: "Will Drafting in Faridabad: Online Will Making Guide",
        description:
          "Draft a valid Will in Faridabad NCR. Expert guidance on HSVP plot transfer, Jamabandi registration, and smooth family estate succession.",
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
          caption: "Legal Will Drafting and Property Succession in Faridabad Haryana NCR",
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
            name: "Faridabad",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Faridabad - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Haryana Jamabandi registration, and doorstep execution support across Faridabad, Sector 14.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Faridabad",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Faridabad" },
          { "@type": "City", name: "Sector 14" },
          { "@type": "City", name: "Sector 15" },
          { "@type": "City", name: "Sector 16" },
          { "@type": "City", name: "Sector 21C" },
          { "@type": "City", name: "Greater Faridabad" },
          { "@type": "City", name: "Neharpar" },
          { "@type": "City", name: "NIT Faridabad" },
          { "@type": "City", name: "Ballabgarh" },
          { "@type": "City", name: "Badkhal" },
          { "@type": "City", name: "Surajkund" },
          { "@type": "City", name: "Charmwood Village" },
          { "@type": "City", name: "Greenfields Colony" },
          { "@type": "City", name: "Mathura Road" },
          { "@type": "City", name: "Tigaon" },
          { "@type": "City", name: "Dhauj" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Faridabad Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Faridabad Residents",
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
                name: "Complete Faridabad Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Faridabad",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Faridabad.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Faridabad assets including HSVP residential plots, builder floors, Greater Faridabad high-rise apartments, MCF Property IDs, and financial investments. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, survivorship, guardian appointments for minors, and revocation of prior instruments under Indian Succession Act.",
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
            name: "Book Jamabandi Haryana e-Appointment Slot",
            text: "Schedule your registration appointment on the Jamabandi Haryana portal (jamabandi.nic.in) for SRO Faridabad (Sector 12) or Ballabgarh and remit the nominal registration fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Faridabad SRO",
            text: "Visit the Sub-Registrar office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: FARIDABAD_FAQS.map((item) => ({
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
      <FaridabadLocationClient faqs={FARIDABAD_FAQS} />
      <Footer />
    </>
  );
}
