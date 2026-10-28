import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmaravatiLocationClient from "./AmaravatiLocationClient";

// Title: Exactly 52 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Amaravati: Online Will Making Guide",
  },
  description:
    "Draft a legally valid Will in Amaravati. Guidance on AP IGRS registration, CRDA plot transfer, and Meebhoomi succession planning with lawyer.",
  keywords: [
    "will drafting in amaravati",
    "will registration ap igrs amaravati",
    "crda plot will transfer",
    "meebhoomi will mutation",
    "estate lawyer amaravati",
    "apcrda land pooling will succession",
    "sub registrar office tullur appointment",
    "online will drafting andhra pradesh",
    "probate exemption andhra pradesh high court",
    "section 31 doorstep will registration amaravati",
    "mangalagiri will drafting lawyer",
    "tadepalli property will succession",
    "velagapudi capital estate planning",
    "guntur amaravati succession advocate",
    "vijayawada amaravati estate lawyer",
    "ap igrs will registration fee",
    "ward sachivalayam will mutation andhra pradesh",
    "ama legal solutions amaravati will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/amaravati",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/amaravati",
      "x-default": "https://www.willdrafting.in/locations/amaravati",
    },
  },
  openGraph: {
    title: "Will Drafting in Amaravati: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Amaravati. Guidance on AP IGRS registration, CRDA plot transfer, and Meebhoomi succession planning with lawyer.",
    url: "https://www.willdrafting.in/locations/amaravati",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-amaravati-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Amaravati Andhra Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Amaravati: Online Will Making Guide",
    description:
      "Draft a legally valid Will in Amaravati. Guidance on AP IGRS registration, CRDA plot transfer, and Meebhoomi succession planning with lawyer.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-amaravati-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const AMARAVATI_FAQS = [
  {
    q: "Is court probate mandatory for a Will in Amaravati under Andhra Pradesh High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidential territories of Mumbai, Kolkata, and Chennai. Amaravati is governed under the jurisdiction of the High Court of Andhra Pradesh at Nelapadu, Amaravati. Landmark Supreme Court rulings such as Clarence Pais v. Union of India and consistent Andhra Pradesh High Court precedents confirm that probate is non-mandatory for Hindu, Jain, Sikh, and Buddhist Wills. A registered Will guarantees undisputed property transfer and revenue record mutation without burdensome civil court probate litigation.",
  },
  {
    q: "Is Will registration mandatory under Andhra Pradesh IGRS rules?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional throughout Andhra Pradesh. An unregistered Will signed on standard white paper before two independent adult witnesses is legally valid. However, registering your Will through the AP IGRS portal (registration.ap.gov.in) places the document into permanent Book III government repository custody. This prevents forged claims by estranged relatives, establishes testamentary authenticity, and ensures immediate recognition during APCRDA plot succession and Meebhoomi revenue mutations.",
  },
  {
    q: "How are APCRDA land pooling scheme (LPS) returnable plots transferred through a Will?",
    a: "Landowners in the Amaravati capital region who surrendered agricultural land under the Land Pooling Scheme (LPS) hold returnable residential and commercial reconstituted plots with Land Pooling Ownership Certificates (LPOC). A testator can explicitly bequeath these LPOC rights, annuity entitlements, and developed plot allocations in their Will. After the testator's demise, the named beneficiary presents the certified registered Will, original death certificate, and Tahsildar Family Member Certificate to the APCRDA Land Administration Wing for formal transmission.",
  },
  {
    q: "What is the official government fee to register a Will in Amaravati?",
    a: "Wills are 100% exempt from ad-valorem stamp duty across Andhra Pradesh and India under the Indian Stamp Act, 1899. At Amaravati Sub-Registrar offices (such as SRO Tullur, SRO Mangalagiri, or SRO Tadepalli), you only pay a flat statutory registration fee of ₹1,000 for Book III registration, plus nominal computer scanning and user charges of approximately ₹100 to ₹200. You do not pay any percentage-based market value stamp duty.",
  },
  {
    q: "How does a registered Will help in Meebhoomi revenue record mutation in Andhra Pradesh?",
    a: "Andhra Pradesh revenue administration relies on the Meebhoomi digital portal (meebhoomi.ap.gov.in) for Adangal/Pahani records, 1-B Record of Rights, and electronic Pattadar Passbooks. Following the demise of a registered landholder, the beneficiary applies for title mutation through the local Ward or Village Sachivalayam. A registered Will serves as conclusive title evidence, allowing the Tahsildar to update the 1-B register and issue a new digital Pattadar Passbook without contentious legal heir disputes.",
  },
  {
    q: "How do I schedule an AP IGRS online appointment for Amaravati Sub-Registrar offices?",
    a: "Appointments are scheduled digitally via the Registration and Stamps Department of Andhra Pradesh portal (registration.ap.gov.in). You select the relevant Sub-Registrar Office (such as SRO Tullur, SRO Mangalagiri, or SRO Tadepalli), upload identity verification details of the testator and two witnesses, generate the e-Challan through the CFMS payment gateway for the ₹1,000 statutory fee, and confirm your preferred appointment time slot.",
  },
  {
    q: "Can senior citizens in Amaravati register their Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically restricted citizens residing in Velagapudi, Tullur, Mangalagiri, Tadepalli, or Guntur can request a doorstep visit. An MBBS doctor provides a medical fitness certificate verifying clear testamentary mental capacity. Upon paying the official government commission fee through the CFMS portal, the Sub-Registrar attends your residence with portable biometric equipment to complete Book III registration.",
  },
  {
    q: "Who can serve as valid attesting witnesses at Amaravati Sub-Registrar offices?",
    a: "Any two adult individuals of sound mind carrying valid Aadhaar cards or government photo IDs can act as attesting witnesses. Crucially, under Section 67 of the Indian Succession Act, witnesses must not be beneficiaries receiving any asset, plot, or bequest under the Will. Family physicians, longtime family friends, or respected community members who have no financial interest in your estate are ideal attesting witnesses.",
  },
  {
    q: "How can business owners and agro-entrepreneurs in the Amaravati belt structure succession?",
    a: "The Amaravati capital region, spanning the Guntur and Vijayawada commercial zones, is home to leading agribusinesses, cold storage units, commercial complexes, and real estate ventures. A customized Will allows founders to clearly designate commercial shop freeholds, private limited company shares, partnership equities, agricultural machinery, and bank credit facilities, preventing operational deadlock and safeguarding enterprise continuity.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make an online Will for plots and flats in Amaravati?",
    a: "Yes. Many NRIs residing in the USA, UK, Canada, Australia, and the Gulf hold high-value APCRDA residential plots and apartments in Amaravati and Mangalagiri. NRIs can draft a comprehensive Will online through our platform. They can execute it before two witnesses abroad and have it notarized or apostilled, or complete Book III registration before an Amaravati Sub-Registrar during their visit to Andhra Pradesh.",
  },
];

export default function AmaravatiLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/amaravati";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-amaravati.jpg";

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
        name: "Will Drafting in Amaravati: Online Will Making Guide",
        description:
          "Draft a legally valid Will in Amaravati. Guidance on AP IGRS signing, CRDA plot transfer, and Meebhoomi estate planning with lawyer.",
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
          caption: "Legal Will Drafting and Asset Estate in Amaravati Andhra Pradesh",
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
            name: "Amaravati",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Amaravati - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer talk, AP IGRS signing, APCRDA plot estate, and Section 31 doorstep signing support.",
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
          { "@type": "City", name: "Amaravati" },
          { "@type": "City", name: "Velagapudi" },
          { "@type": "City", name: "Tullur" },
          { "@type": "City", name: "Nelapadu" },
          { "@type": "City", name: "Mandadam" },
          { "@type": "City", name: "Rayapudi" },
          { "@type": "City", name: "Mangalagiri" },
          { "@type": "City", name: "Tadepalli" },
          { "@type": "City", name: "Undavalli" },
          { "@type": "City", name: "Nowlur" },
          { "@type": "City", name: "Kuragallu" },
          { "@type": "City", name: "Guntur" },
          { "@type": "City", name: "Vijayawada" },
          { "@type": "City", name: "Tenali" },
          { "@type": "City", name: "Ibrahimpatnam" },
          { "@type": "City", name: "Gannavaram" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Amaravati Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Amaravati Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Lawyer Will Talk & APCRDA Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Amaravati SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Amaravati",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the SRO in Amaravati.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Heir Allocations",
            text: "List your Amaravati real estate including APCRDA home and shop returnable plots, farm land in Tullur or Mangalagiri, bank accounts, and demat holdings. Designate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using legally vetted legal clauses tailored to Andhra Pradesh revenue laws, APCRDA LPOC regulations, survivorship terms, and prior instrument revocations.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the paper on standard A4 paper and sign each page in the physical presence of two independent adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book AP IGRS Appointment Slot",
            text: "Schedule your signing appointment on the AP IGRS portal (signing.ap.gov.in) for your areaal Amaravati SRO and pay the flat ₹1,000 legal signing fee via CFMS.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Amaravati SRO",
            text: "Visit the SRO office with both witnesses for verbal witness signing, photo capture, and biometric thumbprinting to complete official Book III signing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: AMARAVATI_FAQS.map((item) => ({
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
      <AmaravatiLocationClient faqs={AMARAVATI_FAQS} />
      <Footer />
    </>
  );
}
