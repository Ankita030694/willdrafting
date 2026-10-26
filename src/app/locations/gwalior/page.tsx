import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GwaliorLocationClient from "./GwaliorLocationClient";

// Title: Exactly 55 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 152 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Gwalior: Online Will Registration Help",
  },
  description:
    "Draft your Will in Gwalior with expert lawyer review. Reliable MP Sampada registration guidance, GDA property mutation, and family wealth distribution.",
  keywords: [
    "will drafting in gwalior",
    "will registration mp sampada gwalior",
    "gda plot will transfer",
    "heritage property succession gwalior",
    "succession lawyer gwalior",
    "gwalior municipal corporation mutation will",
    "sub registrar office gwalior collectorate",
    "will drafting city center gwalior",
    "will drafting lashkar",
    "will drafting morar",
    "will drafting maharaj bada",
    "will drafting thatipur",
    "will drafting alkapuri gwalior",
    "will drafting patel nagar gwalior",
    "will drafting kampoo gwalior",
    "will drafting dabra",
    "section 31 registration act home visit gwalior",
    "is probate mandatory in gwalior madhya pradesh",
    "mp high court gwalior bench probate exemption",
    "mp land revenue code will mutation gwalior",
    "khasra khatoni fauti namantaran gwalior",
    "ama legal solutions gwalior will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/gwalior",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/gwalior",
      "x-default": "https://www.willdrafting.in/locations/gwalior",
    },
  },
  openGraph: {
    title: "Will Drafting in Gwalior: Online Will Registration Help",
    description:
      "Draft your Will in Gwalior with expert lawyer review. Reliable MP Sampada registration guidance, GDA property mutation, and family wealth distribution.",
    url: "https://www.willdrafting.in/locations/gwalior",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-gwalior-og.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Will Drafting and Property Succession in Gwalior Madhya Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Gwalior: Online Will Registration Help",
    description:
      "Draft your Will in Gwalior with expert lawyer review. Reliable MP Sampada registration guidance, GDA property mutation, and family wealth distribution.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-gwalior-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const GWALIOR_FAQS = [
  {
    q: "Is Will registration mandatory in Gwalior and Madhya Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Gwalior and across Madhya Pradesh. A Will executed on plain white paper and signed in the presence of two independent witnesses is legally enforceable. However, registering your Will at a Gwalior Sub-Registrar Office via the MP Sampada portal enters it into permanent Book III government custody, creating an unimpeachable record that prevents false claims and expedites mutation before the Gwalior Development Authority (GDA) and Gwalior Municipal Corporation.",
  },
  {
    q: "Is court probate required for a Will in Gwalior under MP High Court rules?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Gwalior is a non-presidency jurisdiction. The High Court of Madhya Pradesh (including its Gwalior Bench) has consistently held that court probate is not mandatory for Hindu, Sikh, Jain, and Buddhist Wills to inherit real estate or update municipal revenue records.",
  },
  {
    q: "How do I book an online appointment for Will registration on MP Sampada in Gwalior?",
    a: "Will registration appointments are scheduled through the Madhya Pradesh Commercial Tax and Registration Department portal, MP Sampada (sampada.mpigr.gov.in). You log in, select your jurisdictional Gwalior Sub-Registrar Office (such as SRO 1 Kampoo/Collectorate, SRO 2 City Center, SRO Morar, or SRO Dabra), submit testator and witness identification details, upload the draft PDF, remit the nominal government registration fee online, and download your confirmed e-slot token.",
  },
  {
    q: "How does a registered Will facilitate Gwalior Development Authority (GDA) plot transfer?",
    a: "For residential and commercial plots allotted by the Gwalior Development Authority (GDA) across City Center, Patel Nagar, or Suresh Nagar, a registered Will is crucial. The GDA Estate Branch requires the registered Will, original allotment letter, legal death certificate, public notice publication in local newspapers, and indemnity bond. This enables direct mutation and execution of a freehold conveyance deed without expensive civil litigation.",
  },
  {
    q: "How does property tax mutation work with Gwalior Municipal Corporation (Nagar Nigam)?",
    a: "Gwalior Municipal Corporation conducts municipal property tax record transfer (Sampattikar Namantaran). The beneficiary submits an application via the MP e-Nagar Palika portal or at the respective Nagar Nigam Zonal Office, accompanied by the registered Will, death certificate, latest property tax receipt, and identity proofs. Municipal revenue officers verify the records and issue the updated assessment register in the beneficiary's name within 30 to 45 working days.",
  },
  {
    q: "How are ancestral Havelis and Kothis in Lashkar bequeathed without title disputes?",
    a: "Historic Havelis and Kothis across Lashkar, Maharaj Bada, and Sarafa often involve multi-generational co-parcenary rights. A properly drafted Will distinguishes between the testator's self-acquired share and ancestral coparcenary interest under the Hindu Succession Act, 1956. Incorporating clear floor-wise demarcations, easement access, and structural maintenance obligations avoids contentious partition suits among family members.",
  },
  {
    q: "Can senior citizens in Gwalior register a Will from home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or mobility-impaired testators can request a home visit by the Sub-Registrar. Upon providing a medical fitness certificate from a registered MBBS practitioner certifying testamentary mental clarity and physical inability to travel, the Sub-Registrar visits your home in City Center, Lashkar, Thatipur, or Morar with portable biometric authentication devices.",
  },
  {
    q: "What are the official government fees and stamp duty for registering a Will in Gwalior?",
    a: "Wills are 100% exempt from stamp duty across Madhya Pradesh under the Indian Stamp Act, 1899. At Gwalior Sub-Registrar offices, testators pay only a flat nominal registration fee of ₹1,000 via the MP Sampada portal, along with minor portal service and scanning charges of approximately ₹100 to ₹200. There is zero percentage-based or market-value stamp duty levied on the estate.",
  },
  {
    q: "How are agricultural farmlands in Dabra and Gwalior rural transferred under a Will?",
    a: "Farmland across Dabra, Ghatigaon, Bhitarwar, and rural Gwalior is governed by the Madhya Pradesh Land Revenue Code (MPLRC), 1959. A testator holding Bhumiswami land rights can bequeath agricultural holdings through a Will. Following the testator's demise, the beneficiary files an application for revenue mutation (Fauti Namantaran) before the jurisdictional Tehsildar along with the registered Will and computerized Khasra-Khatoni records.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for properties located in Gwalior?",
    a: "Yes. NRIs residing in the Gulf, North America, Europe, or elsewhere who own ancestral Havelis, GDA plots, or commercial shops in Gwalior can draft an enforceable Indian Will. The instrument can be drafted online through our platform, executed before two independent witnesses, and attested by the local Indian Embassy or apostilled abroad, or formally registered at a Gwalior Sub-Registrar Office during a visit to India.",
  },
];

export default function GwaliorLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/gwalior";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-gwalior.jpg";

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
        name: "Will Drafting in Gwalior: Online Will Registration Help",
        description:
          "Draft your Will in Gwalior with expert lawyer review. Reliable MP Sampada registration guidance, GDA property mutation, and family wealth distribution.",
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
          caption: "Legal Will Drafting and Property Succession in Gwalior Madhya Pradesh",
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
            name: "Gwalior",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Gwalior - Estate Planning & MP Sampada SRO Registration",
        description:
          "Professional Will drafting, advocate verification, MP Sampada portal registration, and Section 31 doorstep execution support across Gwalior, Lashkar, City Center, Morar, and Dabra.",
        url: canonicalUrl,
        image: imageUrl,
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gwalior",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Gwalior" },
          { "@type": "City", name: "City Center" },
          { "@type": "City", name: "Lashkar" },
          { "@type": "City", name: "Morar" },
          { "@type": "City", name: "Maharaj Bada" },
          { "@type": "City", name: "Thatipur" },
          { "@type": "City", name: "Alkapuri" },
          { "@type": "City", name: "Patel Nagar" },
          { "@type": "City", name: "Kampoo" },
          { "@type": "City", name: "Dabra" },
          { "@type": "City", name: "Banmore" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Gwalior Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Gwalior Residents",
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
                name: "Complete Gwalior Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Gwalior",
        description:
          "Five clear legal steps to draft and register an enforceable Will before the Sub-Registrar in Gwalior via MP Sampada.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Compile Asset Inventory and Successors",
            text: "List your Gwalior real estate including GDA residential plots, Lashkar heritage havelis, Dabra farmlands, bank accounts, and demat holdings. Designate beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Customized Legal Clauses",
            text: "Draft your Will using verified statutory clauses for clear asset distribution, survivorship, guardian appointments for minor children, and revocation of prior instruments.",
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
            name: "Book MP Sampada SRO Appointment",
            text: "Schedule your registration appointment on the MP Sampada portal (sampada.mpigr.gov.in) for your relevant Gwalior SRO and remit the flat ₹1,000 registration fee online.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Complete Biometrics at Gwalior SRO",
            text: "Visit the Sub-Registrar Office with both witnesses for verbal attestation, photo capture, and biometric thumbprinting to complete permanent Book III registration.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: GWALIOR_FAQS.map((item) => ({
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
      <GwaliorLocationClient faqs={GWALIOR_FAQS} />
      <Footer />
    </>
  );
}
