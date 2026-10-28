import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JaipurLocationClient from "./JaipurLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 147 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Jaipur: Online Will & Succession Guide",
  },
  description:
    "Draft a legally binding Will in Jaipur. Expert guidance on ancestral property succession, Rajasthan Sub-Registrar registration, and estate safety.",
  keywords: [
    "will drafting in jaipur",
    "will registration rajasthan epanjiyan",
    "ancestral property will jaipur",
    "succession lawyer jaipur",
    "online will rajasthan",
    "jda property transfer through will",
    "jaipur development authority will mutation",
    "epanjiyan rajasthan appointment jaipur",
    "sub registrar office jaipur will registration",
    "mitakshara coparcenary will rajasthan",
    "is probate mandatory in jaipur",
    "rajasthan high court will succession rules",
    "will drafting in vaishali nagar jaipur",
    "will drafting in malviya nagar jaipur",
    "will drafting in mansarovar jaipur",
    "will drafting in c scheme jaipur",
    "will drafting in raja park jaipur",
    "will drafting in jagatpura jaipur",
    "will drafting in vidhyadhar nagar jaipur",
    "will drafting in bani park jaipur",
    "section 31 registration act home visit jaipur",
    "will registration fees in rajasthan",
    "doctor medical certificate will jaipur",
    "nri will drafting jaipur rajasthan",
    "ama legal solutions jaipur will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/jaipur",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/jaipur",
      "x-default": "https://www.willdrafting.in/locations/jaipur",
    },
  },
  openGraph: {
    title: "Will Drafting in Jaipur: Online Will & Succession Guide",
    description:
      "Draft a legally binding Will in Jaipur. Expert guidance on ancestral property succession, Rajasthan Sub-Registrar registration, and estate safety.",
    url: "https://www.willdrafting.in/locations/jaipur",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-jaipur-og.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and Property Succession in Jaipur Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Jaipur: Online Will & Succession Guide",
    description:
      "Draft a legally binding Will in Jaipur. Expert guidance on ancestral property succession, Rajasthan Sub-Registrar registration, and estate safety.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-jaipur-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const JAIPUR_FAQS = [
  {
    q: "Is Will registration mandatory in Jaipur and Rajasthan?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Rajasthan. A Will written on plain paper and signed before two independent witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office via the ePanjiyan Rajasthan portal provides irrefutable government evidence. It prevents family property disputes and speeds up title mutation before the Jaipur Development Authority (JDA) and Nagar Nigam Jaipur.",
  },
  {
    q: "Is court probate required for a Will in Jaipur?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Jaipur is a non-presidency jurisdiction. The Rajasthan High Court has consistently affirmed that obtaining court probate is not mandatory for Hindu, Sikh, Jain, or Buddhist Wills in Rajasthan to establish testamentary inheritance.",
  },
  {
    q: "How does ancestral coparcenary property get handled in a Jaipur Will?",
    a: "Under Mitakshara Hindu law prevailing in Rajasthan, ancestral family assets belong collectively to all coparceners. A testator cannot bequeath the entire ancestral property or ancestral Haveli. However, under Section 30 of the Hindu Succession Act, 1956, a testator can lawfully bequeath their individual undivided coparcenary interest alongside their self-acquired assets, safeguarding the legal rights of sons and daughters equally.",
  },
  {
    q: "How does a registered Will help in transferring a JDA leasehold or freehold plot?",
    a: "The Jaipur Development Authority (JDA) requires reliable testamentary proof to substitute the deceased owner's name in 99-year lease deeds or freehold pattas. A registered Will serves as authentic proof before the JDA Single Window System (Jaipur Development Authority e-Services), avoiding expensive succession certificate petitions before civil courts.",
  },
  {
    q: "What is the official government fee to register a Will in Rajasthan?",
    a: "Wills are completely exempt from stamp duty across Rajasthan under the Rajasthan Stamp Act, 1998. At Jaipur Sub-Registrar offices, testators only pay a nominal flat registration fee of ₹100, plus official CSI and computer scanning charges of approximately ₹100 to ₹200. There are zero property-valuation percentage taxes.",
  },
  {
    q: "How do I book an online appointment on the ePanjiyan Rajasthan portal?",
    a: "Appointments are scheduled through the Inspector General of Registration and Stamps (IGRS) Rajasthan ePanjiyan portal (epanjiyan.nic.in). You input the testator, executor, and witness details, generate the e-Challan for registration fees on e-GRAS, and select an available time slot at your designated Jaipur Sub-Registrar circle.",
  },
  {
    q: "Can a Jaipur Sub-Registrar visit a senior citizen at home for registration?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or unwell testators can request a home visit (Commission) by the Sub-Registrar in Jaipur. A medical certificate from an MBBS doctor and the official government commission fee must be submitted. Our Jaipur legal team manages the commission petition and doorstep biometric execution.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for their properties in Jaipur?",
    a: "Yes. NRIs owning villas, luxury apartments, or JDA plots in Jaipur can draft their Will online. They can execute it abroad before two independent witnesses, or register it formally during a visit to Jaipur at the local Sub-Registrar office, or appoint an executor or Power of Attorney for local estate representation.",
  },
];

export default function JaipurLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/jaipur";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-jaipur-og.jpg";

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
        name: "Will Drafting in Jaipur: Online Will & Succession Guide",
        description:
          "Draft a legally binding Will in Jaipur. Expert guidance on family asset estate, Rajasthan SRO filing, and estate safety.",
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
          caption: "Will Drafting and Property Succession Services in Jaipur Rajasthan",
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
            name: "Jaipur, Rajasthan",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Jaipur - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, and Rajasthan SRO office ePanjiyan filing support across Jaipur circles.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Jaipur" },
          { "@type": "City", name: "Vaishali Nagar" },
          { "@type": "City", name: "Malviya Nagar" },
          { "@type": "City", name: "Mansarovar" },
          { "@type": "City", name: "C-Scheme" },
          { "@type": "City", name: "Civil Lines" },
          { "@type": "City", name: "Raja Park" },
          { "@type": "City", name: "Bani Park" },
          { "@type": "City", name: "Jagatpura" },
          { "@type": "City", name: "Tonk Road" },
          { "@type": "City", name: "Vidhyadhar Nagar" },
          { "@type": "City", name: "Nirman Nagar" },
          { "@type": "City", name: "Shyam Nagar" },
          { "@type": "City", name: "Chitrakoot" },
          { "@type": "City", name: "Pratap Nagar" },
          { "@type": "City", name: "Sanganer" },
          { "@type": "City", name: "Amer" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Jaipur Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Jaipur Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Ancestral Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Jaipur Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Jaipur Rajasthan",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Jaipur using ePanjiyan Rajasthan.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Catalog Assets and Beneficiaries",
            text: "List your Jaipur assets including JDA plots, freehold houses, family joint shares, bank deposits, and demat folios. Nominate heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Mitakshara & JDA Clauses",
            text: "Draft your Will using our online legal platform or with a senior lawyer to incorporate family joint protections, revocation, and JDA transfer covenants.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on standard white A4 sheets and sign every page in the presence of two independent adult witnesses who are not heirs.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book ePanjiyan Slot & Pay Challan",
            text: "Book an online appointment on the ePanjiyan Rajasthan portal (epanjiyan.nic.in), generate the e-GRAS fee challan of ₹100, and download the booking slip.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Jaipur SRO",
            text: "Visit the designated Jaipur SRO office with witnesses and original photo IDs for biometric check, photo capture, and official Book III deed filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: JAIPUR_FAQS.map((item) => ({
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
      <JaipurLocationClient faqs={JAIPUR_FAQS} />
      <Footer />
    </>
  );
}
