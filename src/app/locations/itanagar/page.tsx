import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItanagarLocationClient from "./ItanagarLocationClient";

// Title: Exactly 51 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 146 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Itanagar: Online Will & Asset Guide",
  },
  description:
    "Draft a valid Will in Itanagar. Clear guidance on customary tribal inheritance, Land Holding Certificates (LHC), and Itanagar DC office registration.",
  keywords: [
    "will drafting in itanagar",
    "will registration itanagar dc office",
    "lhc land succession arunachal",
    "tribal inheritance will itanagar",
    "estate advocate itanagar",
    "gauhati high court itanagar bench will",
    "land holding certificate will arunachal",
    "will drafting naharlagun",
    "will drafting nirjuli",
    "will drafting papum pare",
    "dc office capital complex itanagar registration",
    "customary tribal succession arunachal pradesh",
    "section 31 registration act home visit itanagar",
    "is probate mandatory in itanagar",
    "online will drafting arunachal pradesh",
    "will lawyer bank tinali itanagar",
    "will drafting ganga market itanagar",
    "will drafting niti vihar itanagar",
    "will drafting doimukh",
    "ama legal solutions itanagar will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/itanagar",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/itanagar",
      "x-default": "https://www.willdrafting.in/locations/itanagar",
    },
  },
  openGraph: {
    title: "Will Drafting in Itanagar: Online Will & Asset Guide",
    description:
      "Draft a valid Will in Itanagar. Clear guidance on customary tribal inheritance, Land Holding Certificates (LHC), and Itanagar DC office registration.",
    url: "https://www.willdrafting.in/locations/itanagar",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-itanagar-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Tribal Estate Succession in Itanagar Arunachal Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Itanagar: Online Will & Asset Guide",
    description:
      "Draft a valid Will in Itanagar. Clear guidance on customary tribal inheritance, Land Holding Certificates (LHC), and Itanagar DC office registration.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-itanagar-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const ITANAGAR_FAQS = [
  {
    q: "Is Will registration mandatory in Itanagar?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Itanagar. A Will written on plain white paper signed before two independent witnesses is legally enforceable. However, registering your Will at the Deputy Commissioner (DC) Capital Complex or Sub-Registrar Office in Itanagar or Naharlagun places it in permanent Book III government custody, preventing fraudulent challenges and expediting mutation with the Directorate of Land Management.",
  },
  {
    q: "How does customary tribal law influence Will drafting in Arunachal Pradesh?",
    a: "Arunachal Pradesh is home to diverse indigenous communities including Nyishi, Adi, Galo, and Apatani with deep-rooted customary inheritance traditions. Under customary law, ancestral tribal land is preserved within the clan or community. A Will cannot unlawfully alienate customary tribal community land to non-indigenous persons. However, self-acquired assets, bank deposits, businesses, and residential properties with valid Land Holding Certificates (LHC) can be bequeathed freely.",
  },
  {
    q: "Can non-tribals inherit tribal land or Land Holding Certificates (LHC) through a Will?",
    a: "No. Under the Bengal Eastern Frontier Regulation, 1873 and Arunachal Pradesh land laws, non-tribals or non-indigenous persons cannot acquire ownership or possessory title of tribal land. A testamentary clause purporting to bequeath tribal land or an LHC to a non-tribal is legally unenforceable and void ab initio. Non-tribals can, however, receive bequests of movable assets, corporate shares, and financial portfolios.",
  },
  {
    q: "What is a Land Holding Certificate (LHC) and how is it transferred under a Will?",
    a: "A Land Holding Certificate (LHC) is an official document issued by the Deputy Commissioner under the Arunachal Pradesh Land Settlement and Records provisions certifying lawful possession and ownership rights over specific land parcels. Following the testator's demise, the nominated beneficiary submits the registered Will, death certificate, and LHC extract to the DC Office Capital Complex or Land Management Officer for mutation into government records.",
  },
  {
    q: "Is probate compulsory for a Will executed in Itanagar?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only for Wills executed within or covering properties in the historical presidency towns of Mumbai, Kolkata, and Chennai. The Gauhati High Court Permanent Bench at Naharlagun has established that probate is non-mandatory in Arunachal Pradesh, enabling direct asset transfer and municipal mutation upon producing a validly registered Will.",
  },
  {
    q: "Where do residents of Itanagar Capital Complex register a Will?",
    a: "Registration is conducted before the Sub-Registrar at the Office of the Deputy Commissioner, Capital Complex, located at Itanagar, or the Sub-Divisional Officer (SDO / ADC) at Naharlagun. For Papum Pare district areas such as Doimukh and Yupia, registration is processed at the Sub-Registrar Office at Yupia Administrative Complex.",
  },
  {
    q: "What are the government registration fees for a Will in Itanagar?",
    a: "Wills are exempt from percentage-based ad valorem stamp duty based on property valuation. In Itanagar, registering a Will requires only nominal statutory registration fees and documentation service fees prescribed under the Arunachal Pradesh Registration Rules (typically around ₹100 to ₹500). There are no expensive transfer duty charges on testamentary gifts.",
  },
  {
    q: "Can elderly or physically restricted testators register a Will from home in Itanagar?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically restricted testators residing in Bank Tinali, Niti Vihar, Naharlagun, or Nirjuli can request a home visit (commission). Upon submitting an MBBS doctor's medical fitness certificate, the Sub-Registrar visits the residence to complete identity verification and biometric capture.",
  },
  {
    q: "Who can act as valid attesting witnesses for an Itanagar Will?",
    a: "Any two competent adult individuals of sound mind holding valid government identification (such as Aadhaar Card or Voter ID) can act as attesting witnesses. In accordance with Section 67 of the Indian Succession Act, 1925, attesting witnesses must not be beneficiaries or spouses of beneficiaries named in the Will. Respected community members, family physicians, or trusted colleagues are recommended.",
  },
  {
    q: "How are bank deposits, government pensions, and mutual funds distributed in Itanagar?",
    a: "Financial assets including State Bank of India deposits, pension accumulations, GPF/NPS accounts, and equity mutual funds pass strictly to the legal beneficiary named in the Will. While a bank nomination designates a custodian to receive funds upon death, Supreme Court precedents confirm that true testamentary ownership is determined by the Will, overriding nominal nominee claims.",
  },
];

export default function ItanagarLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/itanagar";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-itanagar.jpg";

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
        name: "Will Drafting in Itanagar: Online Will & Asset Guide",
        description:
          "Draft a valid Will in Itanagar. Clear guidance on customary tribal inheritance, Land Holding Certificates (LHC), and Itanagar DC office registration.",
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
          caption: "Legal Will Drafting and Tribal Estate Succession in Itanagar Arunachal Pradesh",
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
            name: "Itanagar",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Itanagar - Tribal Estate Planning & DC Office Registration",
        description:
          "Professional Will drafting, advocate verification, Land Holding Certificate (LHC) succession, DC Office Capital Complex registration, and doorstep execution support across Itanagar, Naharlagun, Nirjuli, and Papum Pare.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Itanagar",
          addressRegion: "Arunachal Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Itanagar" },
          { "@type": "City", name: "Naharlagun" },
          { "@type": "City", name: "Nirjuli" },
          { "@type": "City", name: "Banderdewa" },
          { "@type": "City", name: "Doimukh" },
          { "@type": "City", name: "Yupia" },
          { "@type": "City", name: "Bank Tinali" },
          { "@type": "City", name: "Ganga Market" },
          { "@type": "City", name: "Niti Vihar" },
          { "@type": "City", name: "Chandranagar" },
          { "@type": "City", name: "Vivek Vihar" },
          { "@type": "City", name: "Chimpu" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Itanagar Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Itanagar Residents",
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
                name: "Complete Itanagar DC Office Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Itanagar",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Deputy Commissioner or Sub-Registrar in Itanagar.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and LHC Records",
            text: "List your Itanagar and Capital Complex real estate including Land Holding Certificates (LHC), commercial establishments, bank deposits, GPF/pensions, and vehicle titles. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses respecting customary tribal protections, clear asset bequests, minor guardianship clauses, and unequivocal revocation of prior instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 sheets and sign each page before two competent adult witnesses who have no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Schedule Appointment with DC Office / Sub-Registrar",
            text: "Book your registration slot with the Office of the Deputy Commissioner, Capital Complex, Itanagar or SDO Naharlagun and remit the nominal statutory registration fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics & Official Attestation",
            text: "Attend the Sub-Registrar office with both witnesses for oral attestation, identity validation, and biometric recording to secure permanent Book III government registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: ITANAGAR_FAQS.map((item) => ({
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
      <ItanagarLocationClient faqs={ITANAGAR_FAQS} />
      <Footer />
    </>
  );
}
