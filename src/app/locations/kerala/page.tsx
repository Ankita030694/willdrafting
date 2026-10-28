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
    "Draft a legally binding Will in Kerala. Comprehensive support for Gulf NRI property owners, Christian inheritance law, and PEARLS portal SRO.",
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
      "Draft a legally binding Will in Kerala. Comprehensive support for Gulf NRI property owners, Christian inheritance law, and PEARLS portal SRO.",
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
      "Draft a legally binding Will in Kerala. Comprehensive support for Gulf NRI property owners, Christian inheritance law, and PEARLS portal SRO.",
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
    q: "Is Will registration required by law in Kerala?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, filing a Will at the SRO is optional in Kerala. A Will signed on plain white paper before two witnesses is valid. Still, recording your Will at a Kerala SRO through the PEARLS portal stores it in safe Book III state records. This stops fake title claims and speeds up Thandapper and city house tax transfers.",
  },
  {
    q: "Is court probate needed for a Will in Kerala?",
    a: "No. Under Section 213 and Section 57 of the Indian Succession Act, 1925, court probate is needed only in the old presidency cities of Mumbai, Kolkata, and Chennai. Kerala falls under the Kerala High Court, where probate is not required. Heirs can transfer land, bank funds, and farms directly using a registered Will.",
  },
  {
    q: "How do Christian succession laws apply to Wills in Kerala?",
    a: "After the Supreme Court ruling in Mary Roy v. State of Kerala, Christian succession in Kerala follows Part V of the Indian Succession Act, 1925. Any Christian adult can sign a Will to pass self-earned and family property freely to chosen heirs, daughters, sons, or trusts without equal-share limits.",
  },
  {
    q: "Can Gulf NRIs draft and sign a Will for properties in Kerala?",
    a: "Yes. NRIs living in the UAE, Saudi Arabia, Qatar, Kuwait, Oman, or Bahrain can draft an India Will online. NRIs can sign the Will abroad in front of two adult witnesses, or record it in Book III at a Kerala SRO during a trip to India.",
  },
  {
    q: "What is the state fee to register a Will in Kerala?",
    a: "Wills pay zero stamp duty across Kerala. At the SRO desk, owners pay only a flat ₹100 state fee plus small page scan charges through the Kerala e-Treasury portal. There are no percentage fees based on land value.",
  },
  {
    q: "How does a registered Will help in Thandapper transfer and Pokkuvaravu?",
    a: "After the owner passes away, the heir shows the registered Will and death certificate to the local Village Officer. Under the Kerala Transfer of Registry Rules, 1966, the Village Officer completes Pokkuvaravu (mutation) and moves the Thandapper account on revenue.kerala.gov.in without a slow court case.",
  },
  {
    q: "How do I book a slot on the Kerala PEARLS portal?",
    a: "You can book your slot online on the Kerala PEARLS portal (keralaregistration.gov.in). Pick your local SRO desk, enter owner and witness ID details, pay the state fee online, and print your e-token slip with a confirmed time slot.",
  },
  {
    q: "Can seniors in Kerala register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, seniors or unwell owners who cannot travel can ask for a home visit. An MBBS doctor writes a note confirming a clear mind. The SRO officer then visits your home or hospital room with a hand-held thumb scanner to record the Will.",
  },
  {
    q: "Does a bank nominee become the true owner of property in Kerala?",
    a: "No. Under settled Supreme Court law and RBI rules, a nominee is only a caretaker who receives funds or shares after death. True ownership passes strictly to the legal heirs named in a valid Will.",
  },
  {
    q: "How are rubber, tea, and spice estates in Kerala passed by Will?",
    a: "Large estates in Kottayam, Idukki, or Wayanad can be passed through clear clauses in your Will. The Will should list survey numbers, estate powers, and share rules to meet the Kerala Land Reforms Act and stop family fights.",
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
          "Draft a legally binding Will in Kerala. Full support for Gulf NRI property owners, Christian inheritance law, and PEARLS portal SRO.",
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
          "Professional Will drafting, advocate check, PEARLS portal signing, Gulf NRI estate planning, and doorstep execution support across.",
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
          { "@type": "OfficeArea", name: "Kerala" },
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
            name: "Compile Full Asset Inventory",
            text: "List your Kerala land and flats including apartments in Kochi or Trivandrum, ancestral homes, rubber plantations, bank deposits, and cross-border Gulf assets. Designate heirs and an executor.",
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
            text: "Schedule your signing appointment on the Registration Department Kerala PEARLS portal (keralasigning.gov.in) and pay nominal statutory fees through the e-Treasury portal.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Kerala SRO",
            text: "Attend the SRO office with both witnesses for verbal check, digital photo capture, and biometric thumbprinting to complete permanent Book III signing.",
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
