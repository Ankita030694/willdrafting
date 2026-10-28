import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PatnaLocationClient from "./PatnaLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 146 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Patna: Online Will Registration Guide",
  },
  description:
    "Draft a legally binding Will in Patna. Clear guidance on Bihar land records, Sub-Registrar registration, and ancestral property succession rules.",
  keywords: [
    "will drafting in patna",
    "will registration bihar e-nibandhan",
    "bihar bhumi dakhil kharij will",
    "property succession advocate patna",
    "online will bihar",
    "patna municipal corporation mutation will",
    "patna sub registrar office appointment",
    "will drafting in bailey road patna",
    "will drafting in boring road patna",
    "will drafting in kankarbagh patna",
    "will drafting in rajendra nagar patna",
    "will drafting in patliputra colony patna",
    "will drafting in danapur patna",
    "will drafting in phulwari sharif patna",
    "will drafting in anisabad patna",
    "will drafting in saguna more patna",
    "will drafting in patna city",
    "sub registrar office patna sadar will registration",
    "sub registrar office danapur will registration",
    "sub registrar office phulwari sharif will registration",
    "sub registrar office gulzarbagh patna city",
    "is probate mandatory in bihar",
    "patna high court will succession rules",
    "ancestral khatiyan property will bihar",
    "section 31 registration act home visit patna",
    "will registration fees in bihar",
    "doctor medical certificate will patna",
    "ama legal solutions patna will drafting",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/patna",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/patna",
      "x-default": "https://www.willdrafting.in/locations/patna",
    },
  },
  openGraph: {
    title: "Will Drafting in Patna: Online Will Registration Guide",
    description:
      "Draft a legally binding Will in Patna. Clear guidance on Bihar land records, Sub-Registrar registration, and ancestral property succession rules.",
    url: "https://www.willdrafting.in/locations/patna",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-patna-og.jpg",
        width: 1200,
        height: 675,
        alt: "Online Will Drafting and Property Succession in Patna Bihar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Patna: Online Will Registration Guide",
    description:
      "Draft a legally binding Will in Patna. Clear guidance on Bihar land records, Sub-Registrar registration, and ancestral property succession rules.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-patna-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const PATNA_FAQS = [
  {
    q: "Is Will registration mandatory in Patna and Bihar?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Bihar. A Will executed on plain paper and signed before two independent witnesses is legally binding. However, registering your Will at the local Sub-Registrar Office via the Bihar e-Nibandhan portal provides official evidentiary proof, eliminates allegations of forgery, and facilitates direct land mutation (Dakhil Kharij) on the Bihar Bhumi portal.",
  },
  {
    q: "Is court probate required for a Will in Patna under Bihar law?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Patna is a non-presidency town. The Patna High Court has repeatedly held that obtaining probate is not mandatory for Hindu, Sikh, Jain, or Buddhist Wills to transfer properties, mutate municipal records, or claim bank balances.",
  },
  {
    q: "How does a registered Will help in Bihar Bhumi Dakhil Kharij (online mutation)?",
    a: "In Bihar, mutation (Dakhil Kharij) before the Circle Officer (CO / अंचलाधिकारी) often faces objections from rival claimants. When a Will is registered at the SRO, the registration deed details can be verified through the Bihar e-Nibandhan portal. This satisfies the Circle Officer and Revenue Karamchari under Bihar Land Reforms rules, allowing lawful entry of the beneficiary's name in Register-II (Jamabandi).",
  },
  {
    q: "What is the process for booking an appointment on the Bihar e-Nibandhan portal?",
    a: "Will registration slots are booked online through the Bihar Registration, Excise & Prohibition Department portal (biharregservices.gov.in). You register as a citizen, select your jurisdictional Sub-Registrar office (such as Patna Sadar, Danapur, Phulwari Sharif, or Patna City), enter testator and witness KYC details, generate an e-challan, pay the nominal fee, and download your e-appointment slot token.",
  },
  {
    q: "What are the official government fees and stamp duty for registering a Will in Patna?",
    a: "Wills are 100% exempt from stamp duty across Bihar under the Indian Stamp Act, 1899. At Patna Sub-Registrar offices, testators only pay a nominal government registration fee (typically ₹500 to ₹1,000) and minor portal processing and computer scanning charges of around ₹100 to ₹200. There is zero percentage-based stamp tax on the market valuation of the estate.",
  },
  {
    q: "Can ancestral Khatiyan or agricultural land in Patna district be bequeathed via Will?",
    a: "Under the Mitakshara school of Hindu Law followed in Bihar, a person can freely bequeath their self-acquired land, purchased flats, and earned investments. For ancestral agricultural land, a testator can only bequeath their own undivided share. Having clear survey numbers (Khesra, Khata, Thana numbers) and updated Jamabandi details in the Will prevents partition disputes after the testator's demise.",
  },
  {
    q: "Can a Patna Sub-Registrar visit an elderly or bedridden testator at home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically infirm testators residing anywhere in Patna can request a home visit by the Sub-Registrar commissioner. Our legal team assists in procuring an MBBS doctor's mental fitness certificate, submitting the commission requisition petition, and executing doorstep biometric registration across Bailey Road, Kankarbagh, Boring Road, and Patliputra.",
  },
  {
    q: "How does a registered Will help in transferring Patna Municipal Corporation (PMC) houses or flats?",
    a: "Patna Municipal Corporation (PMC) updates property tax assessment records (Holding Tax Namantaran) on the basis of a registered Will, certified copy of the death certificate, and an affidavit of legal survivorship. Unlike unregistered Wills which PMC revenue officers often refer to protracted legal inquiries, a registered Will enables direct transfer without requiring a separate court succession certificate.",
  },
  {
    q: "Can Non-Resident Biharis (NRIs) make a Will for their properties and bank accounts in Patna?",
    a: "Yes. NRIs and professionals living outside Bihar who own parental kothis, apartments in Boring Road, or commercial plots along Bailey Road can execute an Indian Will online. The Will can be drafted through our platform, signed before two independent witnesses, and notarized abroad with Indian Embassy/Consulate apostille, or registered at a Patna SRO during their visit to India.",
  },
  {
    q: "Can a Will in Patna be drafted in Hindi or English?",
    a: "Yes. A Will in Bihar can be written in English, Hindi, or any language comfortably understood by the testator. If drafted in Hindi (वसीयतनामा), standard legal terminology conforming to the Indian Succession Act is utilized. Patna Sub-Registrar offices accept both English and Hindi testamentary deeds for registration in Book III.",
  },
];

export default function PatnaLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/patna";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-patna-og.jpg";

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
        name: "Will Drafting in Patna: Online Will Registration Guide",
        description:
          "Draft a legally binding Will in Patna. Clear guidance on Bihar land records, SRO filing, and family asset estate rules.",
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
          height: 675,
          caption: "Online Will Drafting and Property Succession in Patna Bihar",
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
            name: "Patna",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Patna - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer check, and SRO office e-filing support across Patna district and Bihar.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Patna" },
          { "@type": "City", name: "Bailey Road" },
          { "@type": "City", name: "Boring Road" },
          { "@type": "City", name: "Kankarbagh" },
          { "@type": "City", name: "Rajendra Nagar" },
          { "@type": "City", name: "Patliputra Colony" },
          { "@type": "City", name: "Danapur" },
          { "@type": "City", name: "Phulwari Sharif" },
          { "@type": "City", name: "Anisabad" },
          { "@type": "City", name: "Fraser Road" },
          { "@type": "City", name: "Exhibition Road" },
          { "@type": "City", name: "Ashiana Nagar" },
          { "@type": "City", name: "Digha" },
          { "@type": "City", name: "Patna City" },
          { "@type": "City", name: "Saguna More" },
          { "@type": "City", name: "Khagaul" },
          { "@type": "City", name: "Bihta" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Patna Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Patna Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Patna Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Patna Bihar",
        description:
          "Five clear steps to create a legally binding Will and register it via Bihar e-Nibandhan before the SRO in Patna.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Catalog Assets, Khatiyan Details & Beneficiaries",
            text: "List your Patna assets including PMC houses, PRDA plots, family Khatiyan shares, bank accounts, and demat folios. Nominate your heirs and executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Bihar Specific Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include clear revocation, survivorship, and specific asset split clauses.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute Before Two Independent Witnesses",
            text: "Print the Will on plain white A4 paper and sign each page in the presence of two independent adult witnesses who are not heirs under the Will.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Book Patna SRO Appointment on Bihar e-Nibandhan",
            text: "Book an e-appointment on the Bihar e-Nibandhan portal (biharregservices.gov.in) for your local SRO office and generate the official e-challan.",
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
        mainEntity: PATNA_FAQS.map((item) => ({
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
      <PatnaLocationClient faqs={PATNA_FAQS} />
      <Footer />
    </>
  );
}
