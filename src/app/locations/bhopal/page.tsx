import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BhopalLocationClient from "./BhopalLocationClient";

// Title: Exactly 53 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 144 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Bhopal: Online Will & Asset Planning",
  },
  description:
    "Create a legally valid Will in Bhopal. Get expert guidance on MP property transfer, Sub-Registrar registration, and family asset distribution.",
  keywords: [
    "will drafting in bhopal",
    "will registration bhopal sampada",
    "bda property succession will",
    "lawyer for will making bhopal",
    "succession certificate mp",
    "mp sampada registration bhopal",
    "bhopal sub registrar office appointment",
    "will drafting in arera colony",
    "will drafting in mp nagar bhopal",
    "will drafting in kolar road bhopal",
    "will drafting in tt nagar bhopal",
    "will drafting in shamla hills bhopal",
    "will drafting in hoshangabad road bhopal",
    "will drafting in shahpura bhopal",
    "will drafting in ayodhya bypass bhopal",
    "will drafting in bawadiya kalan bhopal",
    "will drafting in koh e fiza bhopal",
    "will drafting in misrod bhopal",
    "sub registrar office mp nagar bhopal",
    "sub registrar office pari bazar bhopal",
    "sub registrar office tt nagar bhopal",
    "sub registrar office kolar road bhopal",
    "bda plot succession through will bhopal",
    "bmc property tax mutation bhopal will",
    "is probate mandatory in bhopal madhya pradesh",
    "section 31 registration act home visit bhopal",
    "will registration fees in madhya pradesh",
    "doctor medical certificate will bhopal",
    "ama legal solutions bhopal will drafting",
    "mp high court will succession rules",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/bhopal",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/bhopal",
      "x-default": "https://www.willdrafting.in/locations/bhopal",
    },
  },
  openGraph: {
    title: "Will Drafting in Bhopal: Online Will & Asset Planning",
    description:
      "Create a legally valid Will in Bhopal. Get expert guidance on MP property transfer, Sub-Registrar registration, and family asset distribution.",
    url: "https://www.willdrafting.in/locations/bhopal",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-bhopal-og.jpg",
        width: 1200,
        height: 675,
        alt: "Online Will Drafting and Estate Succession in Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Bhopal: Online Will & Asset Planning",
    description:
      "Create a legally valid Will in Bhopal. Get expert guidance on MP property transfer, Sub-Registrar registration, and family asset distribution.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-bhopal-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const BHOPAL_FAQS = [
  {
    q: "Is Will registration mandatory in Bhopal and Madhya Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional across Madhya Pradesh. An unregistered Will written on plain white paper and signed before two independent witnesses is legally binding. However, registering your Will at the local Bhopal Sub-Registrar Office via the MP Sampada portal creates a secure government record. It prevents fraudulent claims and speeds up title mutation before the Bhopal Development Authority (BDA) and Bhopal Municipal Corporation (BMC).",
  },
  {
    q: "Is court probate required for a Will in Bhopal?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Bhopal is a non-presidency town. The Madhya Pradesh High Court has consistently held that obtaining court probate is not mandatory for Hindu, Sikh, Jain, or Buddhist Wills to transfer properties or assert legal heir rights in Bhopal.",
  },
  {
    q: "How do I book an online appointment for Will registration on MP Sampada?",
    a: "Will registration appointments in Bhopal are booked through the Madhya Pradesh Commercial Tax and Registration Department portal, MP Sampada (sampada.mpigr.gov.in). You log in, select your local Sub-Registrar office (such as MP Nagar, Pari Bazar, TT Nagar, or Kolar Road), enter testator and witness KYC information, upload the Will draft, pay the nominal government fee online, and download your e-slot booking token.",
  },
  {
    q: "How does a registered Will help in transferring Bhopal Development Authority (BDA) plots?",
    a: "For residential or commercial plots allotted by the Bhopal Development Authority (BDA) in Salaiya, Katara Hills, Misrod, or Aerocity, a registered Will is crucial. The BDA Estate Branch requires a registered Will copy, certified death certificate, indemnity bond, local newspaper publication, and lease rent clearance to transfer leasehold rights or execute freehold conversion deeds without prolonged civil litigation.",
  },
  {
    q: "How does property tax mutation work with Bhopal Municipal Corporation (BMC / Nagar Nigam)?",
    a: "Bhopal Municipal Corporation handles municipal property tax mutation (Sampattikar Namantaran). The beneficiary submits an application online via the MP e-Nagar Palika portal or at the respective BMC zonal office, accompanied by the registered Will, death certificate, latest property tax receipt, and an ownership affidavit. BMC revenue inspectors verify records and update the municipal assessment register in the beneficiary's name within 30 to 45 working days.",
  },
  {
    q: "Can a Bhopal Sub-Registrar visit an elderly or unwell testator at home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically infirm testators can request a home visit by the Sub-Registrar commissioner. Our Bhopal legal team coordinates the application, procures a mental fitness certificate from an MBBS practitioner, arranges the official government commission visit, and executes doorstep biometric registration across Arera Colony, Shamla Hills, Idgah Hills, and Kolar Road.",
  },
  {
    q: "What are the official government fees and stamp duty for registering a Will in Bhopal?",
    a: "Wills are completely exempt from stamp duty across Madhya Pradesh under the Indian Stamp Act, 1899. At Bhopal Sub-Registrar offices, testators only pay a nominal government registration fee of ₹1,000 via the MP Sampada portal, along with minor portal service and scanning charges of approximately ₹100 to ₹200. There is zero percentage-based stamp tax or ad-valorem duty on the estate's market value.",
  },
  {
    q: "How are agricultural farmlands in Bhopal district transferred under a Will?",
    a: "Agricultural lands in Berasia, Phanda, Kolar, and surrounding rural pockets of Bhopal district are governed by the Madhya Pradesh Land Revenue Code (MPLRC), 1959. A testator holding Bhumiswami rights can bequeath agricultural holdings through a valid Will. Following the testator's demise, the beneficiary applies for revenue mutation (Fauti Namantaran) before the local Tehsildar with the registered Will, Khasra-Khatoni records, and death certificate.",
  },
  {
    q: "How does a Will govern properties in MP Housing Board colonies in Bhopal?",
    a: "MP Housing Board (MPHB) colonies across Riviera Town, Shivaji Nagar, Platinum Plaza, and Ayodhya Nagar require verified succession documentation. Presenting a registered Will alongside the original MPHB allotment letter, possession certificate, and no-dues certificate enables direct title transfer in MP Housing Board records without requiring an expensive civil court succession certificate.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for their properties and bank accounts in Bhopal?",
    a: "Yes. NRIs owning duplex homes in Arera Colony, BDA plots, or commercial investments in MP Nagar can execute a legally valid Indian Will. The Will can be drafted online through our platform, signed before two independent witnesses, and notarized abroad with Indian Embassy or Consulate attestation, or registered at a Bhopal Sub-Registrar Office during their visit to India.",
  },
];

export default function BhopalLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/bhopal";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-bhopal-og.jpg";

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
        name: "Will Drafting in Bhopal: Online Will & Asset Planning",
        description:
          "Create a legally valid Will in Bhopal. Get expert guidance on MP property transfer, Sub-Registrar registration, and family asset distribution.",
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
          caption: "Online Will Drafting and Estate Succession in Bhopal",
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
            name: "Bhopal",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Bhopal - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, lawyer verification, and Sub-Registrar Office e-registration support across Bhopal and Madhya Pradesh.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bhopal",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Bhopal" },
          { "@type": "City", name: "Arera Colony" },
          { "@type": "City", name: "MP Nagar" },
          { "@type": "City", name: "Kolar Road" },
          { "@type": "City", name: "TT Nagar" },
          { "@type": "City", name: "Shamla Hills" },
          { "@type": "City", name: "Idgah Hills" },
          { "@type": "City", name: "Shahpura" },
          { "@type": "City", name: "Bawadiya Kalan" },
          { "@type": "City", name: "Hoshangabad Road" },
          { "@type": "City", name: "Misrod" },
          { "@type": "City", name: "Ayodhya Bypass" },
          { "@type": "City", name: "Govindpura" },
          { "@type": "City", name: "Koh-e-Fiza" },
          { "@type": "City", name: "Shahjahanabad" },
          { "@type": "City", name: "Berasia" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Bhopal Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Bhopal Residents",
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
                name: "Complete Bhopal Sub-Registrar Will Registration & Home Visit",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Bhopal",
        description:
          "Five clear steps to create a legally binding Will and register it via MP Sampada before the Sub-Registrar in Bhopal.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "List Your Assets and Beneficiaries",
            text: "List your Bhopal properties including BDA plots, MP Housing Board flats, bank accounts, and demat holdings. Name your beneficiaries and an executor.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Will with Specific Legal Clauses",
            text: "Draft your Will using our online legal platform or with a senior estate lawyer to include revocation, survivorship, and specific asset distribution clauses.",
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
            name: "Book Bhopal SRO Appointment on MP Sampada",
            text: "Book an e-appointment on the MP Sampada portal (sampada.mpigr.gov.in) for your local Sub-Registrar office and pay the nominal ₹1,000 registration fee.",
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
        mainEntity: BHOPAL_FAQS.map((item) => ({
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
      <BhopalLocationClient faqs={BHOPAL_FAQS} />
      <Footer />
    </>
  );
}
