import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KeralaLocationClient from "./KeralaLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 155 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Kerala: Online Will & NRI Estate Guide",
  },
  description:
    "Draft a legally binding Will in Kerala. Comprehensive support for Gulf NRI property owners, Christian inheritance law, and PEARLS portal SRO registration.",
  keywords: [
    "will drafting in kerala",
    "nri will kerala",
    "will registration kerala pearls portal",
    "christian succession act will kerala",
    "estate lawyer kochi trivandrum",
    "online will kerala",
    "advocate for will drafting kerala",
    "keralaregistration gov in pearls portal",
    "thandapper transfer registered will kerala",
    "pokkuvaravu mutation registered will",
    "gulf nri succession planning kerala",
    "kerala high court probate exemption",
    "plantation estate will drafting kerala",
    "section 31 registration act home visit kerala",
    "will drafting services in ernakulam kochi",
    "will drafting services in thiruvananthapuram",
    "will drafting services in kozhikode calicut",
    "will drafting services in thrissur",
    "will drafting services in kottayam",
    "ama legal solutions kerala will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/kerala",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/kerala",
      "x-default": "https://www.willdrafting.in/locations/kerala",
    },
  },
  openGraph: {
    title: "Will Drafting in Kerala: Online Will & NRI Estate Guide",
    description:
      "Draft a legally binding Will in Kerala. Comprehensive support for Gulf NRI property owners, Christian inheritance law, and PEARLS portal SRO registration.",
    url: "https://www.willdrafting.in/locations/kerala",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-kerala-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Kerala: Online Will & NRI Estate Guide",
    description:
      "Draft a legally binding Will in Kerala. Comprehensive support for Gulf NRI property owners, Christian inheritance law, and PEARLS portal SRO registration.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-kerala-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const KERALA_FAQS = [
  {
    q: "Is Will registration mandatory in Kerala?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Kerala. A Will signed on standard paper before two independent witnesses is legally valid. However, registering your Will at a Kerala Sub-Registrar Office via the PEARLS portal enters it into permanent Book III government custody. This prevents fraudulent title challenges and enables seamless Thandapper mutation and municipal tax transfers.",
  },
  {
    q: "Is probate required for a Will in Kerala under High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Kerala is a non-presidency jurisdiction under the Kerala High Court. Probate is strictly non-compulsory in Kerala, allowing legal heirs to transfer properties, bank deposits, and plantations directly using a registered Will.",
  },
  {
    q: "How do Christian succession laws apply to Wills in Kerala?",
    a: "Following the historic Supreme Court ruling in Mary Roy v. State of Kerala, Christian succession in Kerala is governed by Part V of the Indian Succession Act, 1925. Any Christian individual can execute a Will to distribute self-acquired and ancestral property freely to chosen beneficiaries, daughters, sons, or charitable trusts without statutory discrimination or mandatory equal-share restrictions.",
  },
  {
    q: "Can Gulf NRIs draft and execute a Will for properties in Kerala?",
    a: "Yes. Non-Resident Indians residing in the UAE, Saudi Arabia, Qatar, Kuwait, Oman, or Bahrain can draft an India-specific Will online. NRIs can execute the Will abroad before two adult witnesses and attest it at the Indian Embassy or Consulate, or complete formal Book III registration before a Kerala Sub-Registrar during their visit to India.",
  },
  {
    q: "What is the official government fee to register a Will in Kerala?",
    a: "Testamentary Wills are completely exempt from ad valorem stamp duty across Kerala. At the Sub-Registrar Office, testators pay a nominal statutory registration fee of ₹100 along with modest computer scanning and service charges through the Kerala e-Treasury portal. There are no percentage-based property market value charges.",
  },
  {
    q: "How does a registered Will help in Thandapper transfer and Pokkuvaravu?",
    a: "After the testator's demise, the beneficiary presents the registered Will and death certificate to the jurisdictional Village Officer. Under the Kerala Transfer of Registry Rules, 1966, the Village Officer processes Pokkuvaravu (mutation) and transfers the Thandapper account on the revenue portal (revenue.kerala.gov.in) without requiring costly civil court succession certificates.",
  },
  {
    q: "How do I book an appointment on the Kerala Registration PEARLS portal?",
    a: "Appointments are scheduled online through the Registration Department Kerala PEARLS portal (keralaregistration.gov.in). You select your local Sub-Registrar Office, enter testator and witness KYC details, upload the draft document, remit the registration fees via e-Treasury, and generate an official e-token acknowledgment with a confirmed time slot.",
  },
  {
    q: "Can senior citizens in Kerala register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, senior citizens, bedridden individuals, or persons with mobility restrictions can request a doorstep commission. An MBBS doctor certifies that the testator is mentally lucid but unable to travel. The Sub-Registrar visits the residence or hospital with portable biometric equipment to register the Will.",
  },
  {
    q: "Does a nominee automatically own property or bank accounts in Kerala?",
    a: "No. Under settled Supreme Court law and banking regulations, a nominee acts merely as a temporary custodian to receive funds or society shares. True beneficial ownership passes strictly to the legal beneficiaries named in the deceased's valid Will or through statutory succession laws.",
  },
  {
    q: "How are rubber, tea, and spice plantation estates in Kerala bequeathed?",
    a: "Large plantations in Kottayam, Idukki, or Wayanad can be bequeathed through specific testamentary clauses. The Will should clearly define survey boundaries, estate management powers, partnership shares, and partition terms to comply with the Kerala Land Reforms Act and prevent operational deadlock among heirs.",
  },
];

export default function KeralaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/kerala";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-kerala.jpg";

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
        name: "Will Drafting in Kerala: Online Will & NRI Estate Guide",
        description:
          "Draft a legally binding Will in Kerala. Comprehensive support for Gulf NRI property owners, Christian inheritance law, and PEARLS portal SRO registration.",
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
          caption: "Legal Will Drafting and Property Succession in Kerala",
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
            name: "Kerala",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Kerala - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate verification, PEARLS portal registration, Gulf NRI estate planning, and doorstep execution support across Kerala.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kochi",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Kerala" },
          { "@type": "City", name: "Kochi" },
          { "@type": "City", name: "Ernakulam" },
          { "@type": "City", name: "Thiruvananthapuram" },
          { "@type": "City", name: "Kozhikode" },
          { "@type": "City", name: "Thrissur" },
          { "@type": "City", name: "Kollam" },
          { "@type": "City", name: "Kannur" },
          { "@type": "City", name: "Kottayam" },
          { "@type": "City", name: "Palakkad" },
          { "@type": "City", name: "Alappuzha" },
          { "@type": "City", name: "Malappuram" },
          { "@type": "City", name: "Thalassery" },
          { "@type": "City", name: "Kakkanad" },
          { "@type": "City", name: "Aluva" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Kerala Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Kerala Residents & NRIs",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Gulf Estate Structuring",
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
        name: "How to Draft and Register a Will in Kerala",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Kerala.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Comprehensive Asset Inventory",
            text: "List your Kerala immovable properties including apartments in Kochi or Trivandrum, ancestral homes, rubber plantations, bank deposits, and cross-border Gulf assets. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Tailored Legal Clauses",
            text: "Draft your Will incorporating statutory provisions under the Indian Succession Act, survivorship terms, minor guardianships, and explicit revocation of prior testamentary instruments.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the document on standard A4 paper and sign each page in the physical presence of two independent adult witnesses who hold no beneficial interest under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book PEARLS Portal SRO Slot",
            text: "Schedule your registration appointment on the Registration Department Kerala PEARLS portal (keralaregistration.gov.in) and pay nominal statutory fees through the e-Treasury portal.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Kerala SRO",
            text: "Attend the Sub-Registrar office with both witnesses for verbal verification, digital photo capture, and biometric thumbprinting to complete permanent Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: KERALA_FAQS.map((item) => ({
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
      <KeralaLocationClient faqs={KERALA_FAQS} />
      <Footer />
    </>
  );
}
