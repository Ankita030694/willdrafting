import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndoreLocationClient from "./IndoreLocationClient";

// Title: Exactly 54 characters (Target: 50-60 characters, Screaming Frog compliant)
// Description: Exactly 144 characters (Target: 140-155 characters, Screaming Frog compliant)
export const metadata: Metadata = {
  title: {
    absolute: "Will Drafting in Indore: Online Will & Succession Help",
  },
  description:
    "Draft a valid Will in Indore. Complete MP e-registration guidance, ancestral land succession rules, and professional legal consultation online.",
  keywords: [
    "will drafting in indore",
    "will registration mp igrs sampada",
    "property will lawyer indore",
    "ida plot will transfer indore",
    "estate planning madhya pradesh",
    "mp sampada will registration indore",
    "indore sub registrar office appointment",
    "will drafting in vijay nagar indore",
    "will drafting in palasia indore",
    "will drafting in saket indore",
    "will drafting in scheme 54 indore",
    "will drafting in scheme 78 indore",
    "will drafting in super corridor indore",
    "will drafting in rau indore",
    "will drafting in mhow indore",
    "will drafting in sanwer indore",
    "will drafting in depalpur indore",
    "sub registrar office moti bungalow indore",
    "sub registrar office kila maidan indore",
    "sub registrar office bicholi mardana indore",
    "sub registrar office scheme 78 indore",
    "ida plot succession through will indore",
    "imc property tax mutation indore will",
    "is probate mandatory in indore madhya pradesh",
    "section 31 registration act home visit indore",
    "will registration fees in madhya pradesh",
    "doctor medical certificate will indore",
    "ama legal solutions indore will drafting",
    "mp high court indore bench will succession",
  ],
  alternates: {
    canonical: "https://www.willdrafting.in/locations/indore",
    languages: {
      "en-IN": "https://www.willdrafting.in/locations/indore",
      "x-default": "https://www.willdrafting.in/locations/indore",
    },
  },
  openGraph: {
    title: "Will Drafting in Indore: Online Will & Succession Help",
    description:
      "Draft a valid Will in Indore. Complete MP e-registration guidance, ancestral land succession rules, and professional legal consultation online.",
    url: "https://www.willdrafting.in/locations/indore",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/images/will-drafting-in-indore-og.jpg",
        width: 1200,
        height: 675,
        alt: "Legal Will Drafting and Asset Succession in Indore Madhya Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Drafting in Indore: Online Will & Succession Help",
    description:
      "Draft a valid Will in Indore. Complete MP e-registration guidance, ancestral land succession rules, and professional legal consultation online.",
    images: ["https://www.willdrafting.in/images/will-drafting-in-indore-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const INDORE_FAQS = [
  {
    q: "Is Will registration mandatory in Indore and Madhya Pradesh?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is optional in Madhya Pradesh. An unregistered Will written on plain paper and signed before two independent witnesses is legally binding. However, registering your Will at the local Indore Sub-Registrar Office via the MP Sampada 2.0 portal creates an irrefutable public record. It prevents false claims and expedites title transfer before the Indore Development Authority (IDA) and Indore Municipal Corporation (IMC).",
  },
  {
    q: "Is court probate required for a Will in Indore or Madhya Pradesh?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is compulsory only within the historical presidency towns of Mumbai, Kolkata, and Chennai. Madhya Pradesh is a non-presidency jurisdiction. The Madhya Pradesh High Court, including the Indore Bench, has repeatedly held that obtaining court probate or letters of administration is not compulsory to mutate properties or establish legal rights under a Will in Indore.",
  },
  {
    q: "How do I book an online appointment for Will registration on MP Sampada 2.0?",
    a: "Will registration appointments in Indore are scheduled via the Madhya Pradesh Commercial Tax and Registration Department portal, MP Sampada 2.0 (sampada.mpigr.gov.in). You log in, choose your local Sub-Registrar office (such as Moti Bungalow, Kila Maidan, Bicholi Mardana, or Scheme 78), enter testator and witness KYC information, upload the Will draft, pay the nominal government registration fee online, and download your e-appointment slot token.",
  },
  {
    q: "How does a registered Will help in transferring Indore Development Authority (IDA) plots?",
    a: "For residential or commercial plots allotted by the Indore Development Authority (IDA) across Scheme 54, Scheme 78, Scheme 114, Scheme 140, or Super Corridor, a registered Will is crucial. The IDA Estate Section requires a registered Will, certified death certificate, indemnity bond, public notice in local Indore newspapers, and lease rent clearance to transfer leasehold title or convert it to freehold without requiring long civil court disputes.",
  },
  {
    q: "How does property tax mutation work with Indore Municipal Corporation (IMC) after a Will?",
    a: "Indore Municipal Corporation (IMC / Nagar Nigam Indore) handles property tax mutation (Sampattikar Namantaran). The beneficiary submits an online application on the e-Nagar Palika portal or at the respective IMC zonal office, accompanied by the registered Will copy, death certificate, latest property tax receipt, and an ownership affidavit. IMC Revenue Officers inspect the records and update the municipal assessment register in the beneficiary's name within 30 to 45 working days.",
  },
  {
    q: "Can an Indore Sub-Registrar visit an elderly or sick testator at home under Section 31?",
    a: "Yes. Under Section 31 of the Registration Act, 1908, elderly, bedridden, or medically unwell testators can request a home visit by the Sub-Registrar commissioner. Our Indore legal team coordinates the application, procures a mental fitness certificate from an MBBS doctor, arranges the official government commission visit, and executes doorstep biometric registration across Old Palasia, Manoramaganj, Saket, and surrounding areas.",
  },
  {
    q: "What are the official government fees and stamp duty for registering a Will in Indore?",
    a: "Wills are completely exempt from stamp duty across Madhya Pradesh under the Indian Stamp Act, 1899. At Indore Sub-Registrar offices, testators only pay a nominal government registration fee of ₹1,000 via the MP Sampada 2.0 portal, along with minor portal processing charges of approximately ₹100 to ₹200. There is zero percentage-based stamp tax or ad-valorem duty on the value of your estate.",
  },
  {
    q: "How are agricultural farmlands in Indore district transferred under a Will?",
    a: "Agricultural lands in Sanwer, Depalpur, Rau, and Betma are governed by the Madhya Pradesh Land Revenue Code (MPLRC), 1959. A testator holding Bhumiswami title can bequeath agricultural holdings via a valid Will. Following the testator's demise, the beneficiary files for revenue mutation (Fauti Namantaran) before the local Tehsildar with the registered Will, Khasra-Khatoni records, and death certificate, ensuring smooth update of the revenue record of rights.",
  },
  {
    q: "How can Indore business owners in Sarafa, MT Cloth Market, or Pithampur secure their succession?",
    a: "Indore is the commercial capital of Central India. Business owners in Sarafa Bazaar, Maharaja Tukojirao Cloth Market, Siyaganj wholesale trade, and Pithampur industrial corridor should execute a structured Will covering partnership profit shares, commercial showroom titles, private limited company equity, trade inventory, and HUF coparcenary assets. This prevents operational freeze and ensures uninterrupted family business continuity.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) make a Will for their properties and investments in Indore?",
    a: "Yes. NRIs owning luxury villas on Bypass Road, IDA apartments in Scheme 78, or commercial shops on MG Road can execute an enforceable Will for Indian assets. The Will can be drafted online through our legal platform, signed before two independent witnesses, and notarized abroad with Indian Embassy or Consulate attestation, or registered at an Indore SRO during their visit to India.",
  },
];

export default function IndoreLocationPage() {
  const canonicalUrl = "https://www.willdrafting.in/locations/indore";
  const imageUrl = "https://www.willdrafting.in/images/will-drafting-in-indore-og.jpg";

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
        name: "Will Drafting in Indore: Online Will & Succession Help",
        description:
          "Draft a valid Will in Indore. Complete MP e-registration guidance, ancestral land succession rules, and professional legal consultation online.",
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
          caption: "Legal Will Drafting and Asset Succession in Indore Madhya Pradesh",
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
            name: "Indore",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "LegalService",
        "@id": `${canonicalUrl}#legalservice`,
        name: "WillDrafting Indore - Estate Planning & SRO Registration",
        description:
          "Professional Will drafting, advocate consultation, MP Sampada 2.0 registration, and doorstep execution services across Indore district and Malwa region.",
        url: canonicalUrl,
        image: imageUrl,
        telephone: "+91-8700343611",
        email: "hello@willdrafting.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Indore" },
          { "@type": "City", name: "Vijay Nagar" },
          { "@type": "City", name: "Old Palasia" },
          { "@type": "City", name: "New Palasia" },
          { "@type": "City", name: "Manoramaganj" },
          { "@type": "City", name: "Scheme 54" },
          { "@type": "City", name: "Scheme 78" },
          { "@type": "City", name: "Scheme 114" },
          { "@type": "City", name: "Scheme 140" },
          { "@type": "City", name: "Super Corridor" },
          { "@type": "City", name: "Saket" },
          { "@type": "City", name: "Tilak Nagar" },
          { "@type": "City", name: "South Tukoganj" },
          { "@type": "City", name: "MG Road" },
          { "@type": "City", name: "Sarafa Bazaar" },
          { "@type": "City", name: "Bypass Road" },
          { "@type": "City", name: "Bicholi Mardana" },
          { "@type": "City", name: "Rau" },
          { "@type": "City", name: "Rajendra Nagar" },
          { "@type": "City", name: "Mhow" },
          { "@type": "City", name: "Sanwer" },
          { "@type": "City", name: "Depalpur" },
          { "@type": "City", name: "Pithampur" },
        ],
        priceRange: "₹1,990 - ₹9,990",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Indore Will Drafting & Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              price: "1990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Online Lawyer-Drafted Will for Indore Residents",
              },
            },
            {
              "@type": "Offer",
              price: "4990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Senior Advocate Will Consultation & Business Succession Review",
              },
            },
            {
              "@type": "Offer",
              price: "9990",
              priceCurrency: "INR",
              itemOffered: {
                "@type": "Service",
                name: "Complete Indore MP Sampada 2.0 Registration & Doorstep Execution",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: "How to Draft and Register a Will in Indore, Madhya Pradesh",
        description:
          "Five straightforward steps to draft an enforceable Will and register it before the Sub-Registrar in Indore.",
        totalTime: "P3D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Inventory Assets and Designate Beneficiaries",
            text: "List your Indore properties, including IDA plots, residential bungalows, commercial shops in Sarafa or Cloth Market, bank accounts, demat shares, and agricultural lands in Sanwer or Depalpur. Appoint an executor and legal beneficiaries.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Custom Will with MP and IDA Succession Clauses",
            text: "Draft your Will using our online legal platform or with our senior estate advocates to incorporate specific clauses for IDA leasehold transfers, IMC tax records, HUF assets, and dispute-prevention provisions.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Execute in Presence of Two Independent Witnesses",
            text: "Print the Will on plain A4 sheets. The testator and two adult independent witnesses sign each page together. Witnesses must not be named beneficiaries or their spouses.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Slot Booking on MP Sampada 2.0 Registration Portal",
            text: "Book an online appointment on the MP Sampada 2.0 portal for your designated Indore Sub-Registrar office (Moti Bungalow, Kila Maidan, Bicholi Mardana, or Scheme 78) and pay the nominal ₹1,000 registration fee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Biometric Verification and Book III Registration at Indore SRO",
            text: "Visit the Indore Sub-Registrar Office with your two witnesses for digital fingerprinting, iris biometric scanning, and official Book III endorsement, or opt for Section 31 doorstep execution for senior citizens.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: INDORE_FAQS.map((item) => ({
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
      <IndoreLocationClient faqs={INDORE_FAQS} />
      <Footer />
    </>
  );
}
