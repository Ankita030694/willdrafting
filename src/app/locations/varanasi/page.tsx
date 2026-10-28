import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaranasiLocationClient from "./VaranasiLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Varanasi: Online Will & Asset Planning",
  },
  description:
    "Draft a legally valid Will in Varanasi. Complete guidance on ancestral property succession, UP IGRSUP registration, and VDA property mutation.",
  keywords: [
    "will drafting in varanasi",
    "will registration up igrs kashi",
    "vda property will transfer",
    "ancestral haveli succession varanasi",
    "estate advocate varanasi",
    "varanasi nagar nigam mutation will",
    "sub registrar office kutchery varanasi",
    "sub registrar office bhelupur",
    "sub registrar office shivpur varanasi",
    "sub registrar office pindra varanasi",
    "will drafting bhelupur varanasi",
    "will drafting sigra varanasi",
    "will drafting mahmoorganj",
    "will drafting lanka varanasi",
    "will drafting sarnath varanasi",
    "will drafting assi ghat",
    "will drafting cantt varanasi",
    "section 108 up revenue code 2006 agricultural will",
    "allahabad high court probate exemption uttar pradesh",
    "is probate mandatory in varanasi",
    "section 31 registration act home visit varanasi",
    "will registration fees in uttar pradesh",
    "doctor medical certificate will varanasi",
    "ama legal solutions varanasi will drafting",
    "igrsup varanasi appointment booking",
    "banaras silk saree trade business succession will",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/varanasi",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/varanasi",
      "x-default": "https://www.willdrafting.in/locations/varanasi",
    },
  },
  openGraph: {
    title: "Will Drafting in Varanasi: Online Will & Asset Planning",
    description:
      "Draft a legally valid Will in Varanasi. Complete guidance on ancestral property succession, UP IGRSUP registration, and VDA property mutation.",
    url: "https://www.willdrafting.in/locations/varanasi",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-varanasi.jpg",
        width: 1024,
        height: 576,
        alt: "Online Will Drafting and Property Protection in Varanasi Uttar Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Varanasi: Online Will & Asset Planning",
    description:
      "Draft a legally valid Will in Varanasi. Complete guidance on ancestral property succession, UP IGRSUP registration, and VDA property mutation.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-varanasi.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const VARANASI_FAQS = [
  {
    q: "Is Will registration mandatory in Varanasi and Uttar Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Uttar Pradesh. A Will written on plain white paper and attested by two independent witnesses is legally valid. However, for Varanasi Development Authority (VDA) plots, ancient family havelis, and Varanasi Nagar Nigam mutations, registering the Will on IGRSUP provides official authenticity and prevents prolonged civil partition disputes.",
  },
  {
    q: "Why is a registered Will essential for VDA property mutation in Varanasi?",
    a: "The Varanasi Development Authority (VDA) governs residential layouts and commercial schemes in Sigra, Bhelupur, Shivpur, and Pandeypur. For unregistered Wills, VDA often mandates public newspaper notices, a 30-day objection period, and substantial indemnity bonds. A registered Will drastically speeds up the mutation process, allowing rightful beneficiaries to substitute their names on official leasehold and freehold records without bureaucratic delays.",
  },
  {
    q: "How does succession planning protect ancient havelis along the Kashi ghats?",
    a: "Old family havelis and pacca houses along Assi, Dashashwamedh, and Chowk often have complex coparcenary lineages spanning generations. Under Hindu law, a testator can only bequeath their separate self-acquired property or their quantified undivided coparcenary share. A customized Will drafted by senior estate lawyers clearly identifies separate portions, sets living rights for surviving spouses, and prevents bitter partition suits among heirs.",
  },
  {
    q: "Can agricultural land in Varanasi district be willed under the UP Revenue Code 2006?",
    a: "Yes. Under Section 107 of the Uttar Pradesh Revenue Code, 2006, a Bhumidhar with transferable rights can bequeath agricultural holdings by Will. However, bequests must respect statutory land ceiling limits and dependent support obligations under Section 108. Rural land mutations across Pindra, Rohania, or Sevapuri are formally recorded in Khatauni records through the UP Bhulekh revenue portal.",
  },
  {
    q: "Is court probate required for a Will in Varanasi?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, court probate is compulsory only in the historical presidency towns of Mumbai, Kolkata, and Chennai. Varanasi is a non-presidency town under the Allahabad High Court jurisdiction. Multiple High Court rulings confirm that probate is optional in UP, allowing banks and local authorities to honor registered Wills directly.",
  },
  {
    q: "What is the official government fee to register a Will in Varanasi on IGRSUP?",
    a: "Wills are completely exempt from stamp duty across Uttar Pradesh under Article 64 of Schedule I-B of the Indian Stamp Act, 1899. On the UP IGRSUP portal (igrsup.gov.in), you pay only a flat government registration fee of ₹100, plus an official document scanning fee of ₹100 to ₹200. There are zero percentage-based property taxes or stamp duties.",
  },
  {
    q: "How do I book an online appointment for Will registration in Varanasi on igrsup.gov.in?",
    a: "Visit the UP Registration and Stamps Department portal at igrsup.gov.in. Navigate to Document Registration, select Varanasi district, and choose your local Sub-Registrar Office (such as Sadar Kutchery, Bhelupur, Shivpur, or Pindra). Enter testator and two witness details, pay the ₹100 fee online, and download your e-appointment token with your scheduled date and time slot.",
  },
  {
    q: "Can a Varanasi Sub-Registrar visit an elderly or bedridden testator at home?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically infirm testators can request a home or hospital visit by the Sub-Registrar. You must submit an application with an MBBS doctor's medical fitness certificate and pay the prescribed government commission travel fee. Our Varanasi legal team manages the entire doorstep registration process.",
  },
  {
    q: "How can Varanasi handloom and silk trade business assets be protected in a Will?",
    a: "Varanasi is world-famous for its Banarasi silk sari manufacturing, wholesale handloom trading in Chowk, and commercial retail establishments. A comprehensive Will can transfer proprietary trade names, partnership capital accounts, inventory stocks, showroom leases, and commercial bank credit limits smoothly to successors, ensuring family businesses operate without commercial disruption.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for their Varanasi ancestral properties?",
    a: "Yes. NRIs residing abroad who own ancestral homes, flats, or commercial spaces in Varanasi can draft their Will online. They can execute it abroad before two independent witnesses, or register it formally at an SRO during an India visit, or appoint an executor with a Power of Attorney to manage municipal VDA and bank transmissions.",
  },
];

export default function VaranasiLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/varanasi";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-varanasi.jpg";

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
        name: "Will Drafting in Varanasi: Online Will & Asset Planning",
        description:
          "Draft a legally valid Will in Varanasi. Complete guidance on family asset estate, UP IGRSUP filing, and VDA asset name change.",
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
          caption: "Will Drafting & Registration Services in Varanasi Uttar Pradesh",
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
            name: "Varanasi",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Varanasi - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, family asset estate, and SRO office e-filing support across.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Varanasi",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Varanasi" },
          { "@type": "City", name: "Kashi" },
          { "@type": "City", name: "Bhelupur" },
          { "@type": "City", name: "Sigra" },
          { "@type": "City", name: "Mahmoorganj" },
          { "@type": "City", name: "Lanka" },
          { "@type": "City", name: "Assi Ghat" },
          { "@type": "City", name: "Shivpur" },
          { "@type": "City", name: "Pandeypur" },
          { "@type": "City", name: "Cantt" },
          { "@type": "City", name: "Orderly Bazar" },
          { "@type": "City", name: "Sarnath" },
          { "@type": "City", name: "Pindra" },
          { "@type": "City", name: "Raja Talab" },
          { "@type": "City", name: "Rohania" },
          { "@type": "City", name: "Chowk" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Varanasi Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Varanasi Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Ancestral Asset Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Varanasi Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Varanasi Uttar Pradesh",
        description:
          "Five clear steps to create a legally binding Will and register it before the SRO in Varanasi.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Beneficiaries",
            text: "List your Varanasi assets including VDA plots, family havelis, handloom businesses, bank accounts, and gold jewelry. Name your heirs and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include revocation, survivorship, and specific asset clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Witnesses",
            text: "Print the Will on plain white A4 paper and sign each page in the presence of two independent adult witnesses who are not heirs.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Varanasi SRO Appointment on IGRSUP",
            text: "Book an e-appointment on the UP IGRSUP portal (igrsup.gov.in) for your local SRO office and pay the nominal ₹100 filing fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometric Verification at Sub-Registrar Office",
            text: "Visit the SRO office with your two witnesses and original IDs for biometric fingerprinting, digital photo capture, and official Book III filing.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: VARANASI_FAQS.map((item) => ({
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
      <VaranasiLocationClient faqs={VARANASI_FAQS} />
      <Footer />
    </>
  );
}
