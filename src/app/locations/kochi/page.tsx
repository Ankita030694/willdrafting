import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KochiLocationClient from "./KochiLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 142 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Kochi: Online Will & NRI Estate Guide",
  },
  description:
    "Draft a legally binding Will in Kochi. Comprehensive support for NRI property owners, Christian inheritance law, and Kerala SRO registration.",
  keywords: [
    "will drafting in kochi",
    "nri will kerala cochin",
    "will registration kerala pearls portal",
    "christian succession act will kochi",
    "estate planning lawyer ernakulam",
    "will drafting in marine drive kochi",
    "will drafting in kakkanad",
    "will drafting in panampilly nagar",
    "will drafting in fort kochi",
    "will drafting in tripunithura",
    "will drafting in aluva",
    "will drafting in edappally",
    "will drafting in kadavanthra",
    "sub registrar office ernakulam will appointment",
    "sub registrar office thrikkakara kakkanad",
    "is probate mandatory in kerala",
    "gcda property transfer through will",
    "section 31 registration act home visit kochi",
    "will registration fees in kerala",
    "doctor medical certificate will kochi",
    "ama legal solutions kochi will drafting",
    "kerala high court will succession rules",
    "pokkuvaravu transfer through will ernakulam",
    "mary roy judgment christian succession kerala",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/kochi",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/kochi",
      "x-default": "https://www.willdrafting.in/locations/kochi",
    },
  },
  openGraph: {
    title: "Will Drafting in Kochi: Online Will & NRI Estate Guide",
    description:
      "Draft a legally binding Will in Kochi. Comprehensive support for NRI property owners, Christian inheritance law, and Kerala SRO registration.",
    url: "https://www.willdrafting.in/locations/kochi",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-kochi-og.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and NRI Succession Support in Kochi Ernakulam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Kochi: Online Will & NRI Estate Guide",
    description:
      "Draft a legally binding Will in Kochi. Comprehensive support for NRI property owners, Christian inheritance law, and Kerala SRO registration.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-kochi-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const KOCHI_FAQS = [
  {
    q: "Is Will registration mandatory in Kochi or Kerala?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Kerala. A Will written on plain paper and signed before two independent witnesses is legally valid. However, registering your Will at an Ernakulam Sub-Registrar Office provides undeniable legal proof, prevents forgery allegations, and ensures smooth Pokkuvaravu (property mutation) at local Village Offices.",
  },
  {
    q: "Is probate required for a Will in Kochi or Ernakulam?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is mandatory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Kochi is a non-presidency town under the Kerala High Court. Probate is optional in Kerala for Christians, Hindus, Sikhs, Buddhists, and Jains, allowing direct property transfer with a registered Will unless disputed.",
  },
  {
    q: "How does Christian inheritance law apply to Wills in Kerala?",
    a: "In Kerala, Christian succession is governed by Part V of the Indian Succession Act, 1925, following the landmark Supreme Court ruling in Mary Roy v. State of Kerala (1986). While intestate succession grants equal shares to sons and daughters, Section 59 gives every Christian testator complete freedom to bequeath their self-acquired and separate property through a Will to any chosen beneficiary.",
  },
  {
    q: "Can Gulf NRIs draft and execute an Indian Will from abroad?",
    a: "Yes. Non-Resident Indians (NRIs) residing in the UAE, Qatar, Oman, Saudi Arabia, Kuwait, the UK, or the US can draft their Will online for properties in Kochi. Under Section 63 of the Indian Succession Act, you can sign the Will abroad before two adult witnesses. SRO registration can be completed during your next visit to Kerala or coordinated with legal counsel.",
  },
  {
    q: "How do I book an online appointment on Kerala PEARLS portal?",
    a: "Appointments are booked through the Kerala Registration Department portal (PEARLS at keralaregistration.gov.in). You log in, enter testator and witness details, upload the Will draft, pay the nominal government fee online, and generate an e-token with a designated date and time slot for your local Ernakulam Sub-Registrar Office.",
  },
  {
    q: "What are the government registration fees for a Will in Kerala?",
    a: "Wills are 100% exempt from stamp duty across Kerala under the Kerala Stamp Act, 1959. At the Sub-Registrar Office, you pay only a nominal government registration fee of ₹1,000, plus computer scanning and archiving charges of approximately ₹100 to ₹200. There are no percentage-based property taxes or asset valuation charges.",
  },
  {
    q: "Can a Kerala Sub-Registrar visit an elderly or bedridden testator at home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens or medically infirm individuals can request a home or hospital visit by the Sub-Registrar. You must submit a medical certificate from a registered MBBS doctor and pay the official government commission fee. Our Kochi legal team handles the complete documentation and scheduling.",
  },
  {
    q: "How does a registered Will help in transferring GCDA flats and Kochi property?",
    a: "A registered Will serves as conclusive proof of testamentary succession before the Greater Cochin Development Authority (GCDA), Kochi Municipal Corporation (KMC), and Village Revenue Offices. It enables swift name change in property tax registers and land records (Pokkuvaravu / Thandapper) without requiring prolonged succession certificate procedures.",
  },
  {
    q: "Do I need a doctor's medical fitness certificate for Will registration in Kochi?",
    a: "While not strictly mandatory for young testators, a medical fitness certificate from a registered MBBS practitioner is strongly recommended for seniors aged 60 and above. The certificate confirms that the testator possesses sound testamentary capacity and mental awareness, safeguarding the Will against false claims of dementia or undue influence.",
  },
  {
    q: "What is Pokkuvaravu and how does a registered Will help in Kerala?",
    a: "Pokkuvaravu is the official Kerala revenue process of transferring land title in the Village Office and updating the Thandapper (revenue account) number. When a registered Will is presented alongside the testator's death certificate, Village Officers can update revenue records smoothly, allowing the beneficiary to pay land tax (Kandazhuthu) in their own name.",
  },
];

export default function KochiLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/kochi";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-kochi-og.jpg";

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
        name: "Will Drafting in Kochi: Online Will & NRI Estate Guide",
        description:
          "Draft a legally binding Will in Kochi. Comprehensive support for NRI property owners, Christian inheritance law, and Kerala SRO registration.",
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
          caption: "Online Will Drafting and NRI Succession Support in Kochi Ernakulam",
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
            name: "Kochi Ernakulam",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Kochi - Estate Planning & Kerala SRO Registration",
        description:
          "Professional Will drafting, advocate verification, Gulf NRI estate planning, and Sub-Registrar Office e-registration support across Ernakulam.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kochi",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Kochi" },
          { "@type": "City", name: "Ernakulam" },
          { "@type": "City", name: "Marine Drive" },
          { "@type": "City", name: "Kakkanad" },
          { "@type": "City", name: "Panampilly Nagar" },
          { "@type": "City", name: "Kadavanthra" },
          { "@type": "City", name: "Fort Kochi" },
          { "@type": "City", name: "Mattancherry" },
          { "@type": "City", name: "Tripunithura" },
          { "@type": "City", name: "Edappally" },
          { "@type": "City", name: "Kalamassery" },
          { "@type": "City", name: "Aluva" },
          { "@type": "City", name: "Angamaly" },
          { "@type": "City", name: "Thevara" },
          { "@type": "City", name: "Maradu" },
          { "@type": "City", name: "Vyttila" },
          { "@type": "City", name: "North Paravur" },
          { "@type": "City", name: "Perumbavoor" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Kochi Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Kochi Residents & NRIs",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & NRI Estate Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Kerala PEARLS SRO Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Kochi Ernakulam",
        description:
          "Five clear steps to create a legally binding Will and register it before the Sub-Registrar in Kerala using PEARLS portal.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Catalog Assets, Thandapper Records & Beneficiaries",
            text: "List your Kochi real estate with Village Office survey numbers, Thandapper accounts, bank accounts, Gulf NRI investments, and name your beneficiaries.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Christian & NRI Succession Clauses",
            text: "Draft your Will using our online legal platform or with a senior Kerala estate lawyer to include revocation, survivorship, and cross-border asset clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain A4 paper and sign each page in the presence of two independent adult witnesses who are not beneficiaries under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Kerala SRO Appointment on PEARLS Portal",
            text: "Book an e-token on the Kerala Registration Department PEARLS portal (keralaregistration.gov.in) for your Ernakulam Sub-Registrar Office and pay the nominal ₹1,000 fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the Sub-Registrar office with your two witnesses and original IDs for biometric fingerprinting, digital photo capture, and official Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: KOCHI_FAQS.map((item) => ({
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
      <KochiLocationClient faqs={KOCHI_FAQS} />
      <Footer />
    </>
  );
}
